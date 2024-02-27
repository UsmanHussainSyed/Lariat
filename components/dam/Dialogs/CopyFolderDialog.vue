<template>
  <Model
    v-model="model"
    content-class="bg-gray"
    model-footer
    hide-buttons
    body-class="category-list"
    modal-top-class="modal-copy"
  >
    <template #header>
      <h5 class="modal-title">
        Copy
        <template v-if="filesToMove.length === 1">
          <span class="dam-dialog-title-max-width">
            {{ filesToMove[0].display_file_name }}
          </span>
        </template>
        <template v-else>({{ filesToMove.length }}) items </template>
      </h5>
      <button
        type="button"
        class="close ml-2"
        data-dismiss="modal"
        aria-label="Close"
        @click="hide"
      >
        <span aria-hidden="true"
          ><svg
            id="Layer_1"
            class="close-icon h-red"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4358" transform="translate(-69.745 -317.549)">
              <path
                id="Path_3424"
                class="fill-color"
                d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
              />
              <path
                id="Path_3425"
                class="fill-color"
                d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
              />
            </g></svg
        ></span>
      </button>
    </template>
    <div v-if="selectedFolders.length">
      <transition-group tag="div" name="slide-up" style="margin: 0 -5px 1rem">
        <span
          v-for="folder in selectedFolders"
          :key="folder.id"
          class="added-tag"
        >
          <label :inner-html.prop="folder.folder_name"></label>
          <span @click="removeFolder(folder)">
            <svg
              id="Layer_1"
              class="close-icon h-red"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4358" transform="translate(-69.745 -317.549)">
                <path
                  id="Path_3424"
                  class="fill-color"
                  d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                ></path>
                <path
                  id="Path_3425"
                  class="fill-color"
                  d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                ></path>
              </g>
            </svg>
          </span>
        </span>
      </transition-group>
    </div>
    <FolderList
      ref="folderList"
      :loading="folderLoading"
      :multiple-selection.sync="selectedFolderIds"
      :folder-selection-data.sync="selectedFolderData"
      :parent-id="
        filesToMove.length === 1
          ? filesToMove[0].category_id ||
            (filesToMove[0].category && filesToMove[0].category.id)
          : null
      "
      multiple
    />
    <template #footer>
      <button
        v-if="selectedFolderIds.length"
        type="button"
        class="btn btn-gray"
        @click="selectedFolderIds = []"
      >
        Clear
      </button>
      <div style="flex: 1"></div>
      <button
        v-tooltip="
          storageFull ? 'You have consumed all of your storaage quota.' : ''
        "
        type="button"
        class="btn ml0"
        :class="{
          'btn-disabled': storageFull || !selectedFolderIds.length || loading,
        }"
        :style="
          storageFull || !selectedFolderIds.length || loading
            ? 'cursor:not-allowed; opacity:0.4'
            : ''
        "
        @click="storageFull ? null : copyFiles()"
      >
        <template v-if="loading">
          <i class="fa fa-circle-o-notch fa-spin"></i>
          &nbsp; Copying...
        </template>
        <template v-else>
          Copy
          <template v-if="filesToMove.length > 1">
            ({{ filesToMove.length }}) item<template
              v-if="filesToMove.length > 1"
              >s</template
            >
          </template>
        </template>
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
import Model from '~/components/plugins/Model'
import FolderList from '~/components/dam/FolderList'

export default {
  components: { Model, FolderList },
  extends: Model,
  props: {
    filesToMove: { type: Array, default: () => [] },
    folderLoading: { type: Boolean, default: false },
  },
  data() {
    return {
      loading: false,
      selectedFolderIds: [],
      selectedFolderData: [],
    }
  },
  computed: {
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
    selectedFolders() {
      return this.selectedFolderIds.map((id) =>
        this.$deepSearch(this.folderList, 'id', (_, _id) => _id === id)
      )
    },
    commonFolders() {
      const fileLength = this.filesToMove.length
      if (fileLength === 0) return []

      if (fileLength === 1)
        return this.filesToMove[0].categories?.map(({ id }) => id) || []

      return Object.entries(
        this.filesToMove.reduce((object, { categories }) => {
          if (!categories) return object

          categories.forEach((f) => {
            const index = f.id || f

            if (!object[index]) object[index] = 1
            else object[index] += 1
          })
          return object
        }, {})
      )
        .filter(([_, count]) => count === fileLength)
        .map(([id]) => id)
    },
  },
  watch: {
    model(model) {
      if (!model) {
        this.selectedFolderIds = []
        this.$refs.folderList.reset()
      }
    },
    filesToMove(files) {
      if (!files || !files.length) this.hide()
      else this.selectedFolderIds = this.commonFolders
    },
  },
  methods: {
    removeFolder(folder) {
      this.selectedFolderIds = this.selectedFolderIds.filter(
        (id) => id !== folder.id
      )
    },
    async copyFiles() {
      if (this.loading || !this.selectedFolderIds.length) return

      this.loading = true

      await this.$axios
        .$post('digital-assets/multiple-file-copy-to-multiple-folder', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.filesToMove.map(({ id }) => id),
          category_id: this.selectedFolderIds,
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.$emit('copied', this.selectedFolderData)

          this.selectedFolderIds = []
          this.selectedFolderData = []

          this.hide()

          this.$refs.folderList.reset()
          this.$store.dispatch('dam/updateStorage')
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.loading = false
    },
  },
}
</script>

<style>
.modal-footer {
  flex-wrap: nowrap;
}

.modal-footer .btn {
  min-width: 0 !important;
}
</style>
