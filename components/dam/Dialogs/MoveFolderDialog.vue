<template>
  <Model
    v-model="model"
    content-class="bg-gray"
    model-footer
    hide-buttons
    body-class="category-list"
    modal-top-class="modal-move"
  >
    <template #header="{ hide }">
      <h5 class="modal-title">
        Move
        <template v-if="filesToMove.length === 1">
          <span
            v-tooltip="{
              html: false,
              content: filesToMove[0].display_file_name,
            }"
          >
            {{ filesToMove[0].display_file_name | shrinkString(38, 8) }}
          </span>
        </template>
        <template v-else-if="markedAllCount"
          >all ({{ markedAllCount }}) items
        </template>
        <template v-else>{{ filesToMove.length }} items </template>
      </h5>
      <div class="add-category-btn">
        <nuxt-link
          :to="{
            query: { ...$route.query, createFolder: true },
            params: $route.params,
            hash: $route.hash,
          }"
          replace
          class="btn btn-icon right"
        >
          <svg
            id="Layer_1"
            class="plus-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4454" transform="translate(-1005 -577.999)">
              <path
                id="Path_3394"
                class="fill-color"
                d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
              />
              <path
                id="Path_3395"
                class="fill-color"
                d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
              />
            </g>
          </svg>
        </nuxt-link>
      </div>
      <button
        type="button"
        class="close ml-2"
        data-dismiss="modal"
        aria-label="Close"
        style="margin-bottom: 2px"
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
    <h6 v-if="folderName" class="title">Move to {{ folderName }}</h6>
    <FolderList
      ref="folderList"
      v-model="parentFolderId"
      :loading="folderLoading"
      :parent-id="
        filesToMove.length === 1
          ? filesToMove[0].category_id ||
            (filesToMove[0].category && filesToMove[0].category.id)
          : null
      "
      selection-mode
      parent-folder-disable
    />

    <template #footer>
      <div style="flex: 1"></div>
      <button
        type="button"
        class="btn ml0"
        :class="{ 'btn-disabled': !parentFolderId || loading }"
        :disabled="!parentFolderId || loading"
        @click="moveFile"
      >
        <template v-if="loading">
          <i class="fa fa-circle-o-notch fa-spin"></i>
          &nbsp; Moving...
        </template>
        <template v-else name="moveBtnLabel">
          Move
          <template v-if="markedAllCount">
            all ({{ markedAllCount }}) items
          </template>
          <template v-else-if="filesToMove.length > 1">
            ({{ filesToMove.length }}) items
          </template>
        </template>
      </button>
      <button
        type="button"
        class="btn btn-gray"
        :disabled="loading"
        :class="{ 'btn-disabled': loading }"
        @click="hideModel"
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
  props: {
    filesToMove: { type: Array, default: () => [] },
    moveToFolder: { type: Boolean, default: false },
    folderLoading: { type: Boolean, default: false },
    markedAllCount: { type: Number, default: 0 },
    skipMoveApi: { type: Boolean, default: false },
  },
  data() {
    return {
      loading: false,
      parentFolderId: null,
    }
  },

  computed: {
    toShowMessage() {
      return (
        !this.$route.path.includes('/uploaded') &&
        this.hashParam !== 'uncategorized'
      )
    },
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
    folderName() {
      return this.parentFolder && this.parentFolder.folder_name
    },
    parentFolder() {
      if (!this.parentFolderId || this.parentFolderId === 0) return null

      return this.$deepSearch(
        this.folderList,
        'id',
        (_, id) => this.parentFolderId === id
      )
    },
  },
  watch: {
    filesToMove(a) {
      this.parentFolderId = null
      this.$refs.folderList.reset()
      if (!a || !a.length) this.model = false
    },
  },
  methods: {
    moveFile() {
      if (this.skipMoveApi) {
        this.$emit('move-files', this.parentFolderId)
        return
      }
      if (this.loading || this.parentFolderId === 0 || !this.parentFolderId)
        return

      this.loading = true

      this.$store
        .dispatch('dam/moveFilesToCategory', {
          mode: this.moveToFolder ? 'MOVE_TO_FOLDER' : null,
          parentFolderId: this.parentFolderId,
          fileIds: this.markedAllCount
            ? 'all'
            : this.filesToMove.map(({ id }) => id),
        })
        .then(() => {
          const folder = this.parentFolder
          this.$emit('moved', folder)
          this.$emit('moveUncatg', folder)
          this.parentFolderId = null
          this.$refs.folderList.reset()
          this.hide()
        })
        .finally(() => (this.loading = false))
    },
    hideModel() {
      this.$emit('resetResource', true)

      this.hide()
    },
  },
  validations: {
    parentFolderId: { required },
  },
}
</script>
