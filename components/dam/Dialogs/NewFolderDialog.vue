<template>
  <Model
    v-model="model"
    content-class="bg-gray"
    model-footer
    hide-buttons
    header-text="Add Folder"
    body-class="category-list folder-height"
  >
    <div class="add-folder">
      <div class="search-folder">
        <p v-if="folderName" class="dam-dialog-title">
          Create <strong>{{ folderName }}</strong>
          <span v-if="parentFolder">
            in <strong>{{ parentFolder.folder_name }}</strong>
          </span>
        </p>
        <form @submit.prevent="addFolder">
          <input
            ref="folderName"
            v-model.trim="folderName"
            class="form-control"
            placeholder="Type Folder Name"
          />
        </form>
        <div
          v-if="$v.folderName.$error && !$v.folderName.required"
          class="input-error"
        >
          Please Enter folder name
        </div>
      </div>
    </div>
    <h4 v-if="folderList && folderList.length" style="margin-top: 10px">
      Select Parent Folder
    </h4>

    <FolderList
      ref="folderList"
      v-model="parentFolderId"
      :loading="folderLoading"
      selection-mode
      new-folder
    />

    <template #footer>
      <button
        type="button"
        class="btn"
        :class="{ 'btn-disabled': loading || !folderName.trim() }"
        :disabled="loading || !folderName.trim()"
        @click="addFolder"
      >
        <template v-if="loading">
          <i class="fa fa-circle-o-notch fa-spin"></i>
          &nbsp; Creating...
        </template>
        <template v-else>Add Folder</template>
      </button>
      <button
        type="button"
        class="btn btn-gray"
        :class="{ 'btn-disabled': loading }"
        :disabled="loading"
        @click="hide"
      >
        Cancel
      </button>
    </template>
  </Model>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Model from '~/components/plugins/Model'
import FolderList from '~/components/dam/FolderList'

export default {
  components: { Model, FolderList },
  extends: Model,
  props: { folderLoading: { type: Boolean, default: false } },
  data() {
    return {
      folderName: '',
      parentFolderId: 0,
      loading: false,
    }
  },
  computed: {
    workspaceId() {
      return this.$getWorkspaceId()
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
    parentFolder() {
      return (
        this.parentFolderId &&
        this.$deepSearch(
          this.folderList,
          'id',
          (_, id) => this.parentFolderId === id
        )
      )
    },
  },
  watch: {
    model(model) {
      if (model) this.$nextTick(() => this.$refs.folderName?.focus?.())
      else {
        this.folderName = ''
        this.parentFolderId = 0
        this.$refs.folderList.reset()
        this.$v.$reset()
      }
    },
  },
  methods: {
    addFolder() {
      if (this.loading) return

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.loading = true

      const body = {
        workspace_id: this.workspaceId,
        folder_name: this.folderName.trim() || 'Untitled Folder',
        category_id: this.parentFolderId || 0,
      }
      let url = 'digital-assets/category/add'

      if (body.category_id !== 0) {
        url = 'digital-assets/category/add-sub-category'
        body.sub_category_id = 0
      }

      this.$axios
        .$post(url, body)
        .then(({ data }) => {
          this.$store.commit('dam/setFolderItem', data)
          if (body.category_id === 0) {
            this.$store.commit('dam/folderList', [...this.folderList, data])
            this.$store.dispatch('dam/columnViews/update', {
              columnId: 0,
              mutations: {
                folders: this.folderList,
              },
            })
          } else {
            let parentColumn, _columnId
            const _columns = this.$store.state.dam.columnViews
            for (const _column of _columns) {
              if (_column.folders.find((f) => f.id === body.category_id)) {
                _columnId = _column.columnId + 1
                parentColumn = _column
                break
              }
            }
            if (
              parentColumn &&
              parseInt(parentColumn.active) === parseInt(body.category_id)
            ) {
              if (_columnId) {
                if (_columns.find((e) => e.columnId === _columnId)) {
                  this.$store.dispatch('dam/columnViews/update', {
                    columnId: _columnId,
                    mutations: {
                      folders: [
                        ..._columns.find((e) => e.columnId === _columnId)
                          .folders,
                        data,
                      ],
                    },
                  })
                } else {
                  this.$store.dispatch('dam/columnViews/add', {
                    parentFolderId: body.category_id,
                    folders: [data],
                  })
                }
              }
            }
          }

          this.$store.commit('dam/incrementFolderCount')

          this.model = false
          this.folderName = ''
          this.parentFolderId = 0
          this.$refs.folderList.reset()
          this.$v.$reset()
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => (this.loading = false))
    },
  },

  validations: {
    folderName: { required },
  },
}
</script>
