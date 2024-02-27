<template>
  <!-- <div class="overflow-hidden"> -->
  <div
    v-if="foldersLoading || loadingModel"
    style="height: 280px; overflow: hidden"
  >
    <ContentLoader
      :speed="1"
      :width="240"
      :height="400"
      :animate="true"
      class="normalLoader"
    >
      <rect x="0" y="0" rx="2" ry="2" width="240" height="24" />
      <rect x="0" y="30" rx="2" ry="2" width="240" height="24" />
      <rect x="0" y="60" rx="2" ry="2" width="240" height="24" />
      <rect x="0" y="90" rx="2" ry="2" width="240" height="24" />
      <rect x="0" y="120" rx="2" ry="2" width="240" height="24" />
    </ContentLoader>
  </div>
  <transition-group
    v-else-if="folderList.length"
    class="folder-list"
    name="slide-up"
    tag="ul"
  >
    <div v-if="parentFolder" key="back" class="back">
      <a @click="back()">
        <svg
          id="Layer_1"
          class="back-icon blue"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4468" transform="translate(-577 -181)">
            <rect
              id="Rectangle_3007"
              x="577"
              y="181"
              class="fill-hide"
              width="18"
              height="18"
            ></rect>
            <g id="Group_4425" transform="translate(-514.168 -476.583)">
              <path
                id="Icon_material-backspace"
                class="fill-color"
                d="M1107.7,659.8h-11.3c-0.5,0-0.9,0.3-1.2,0.7l-4.1,6.1l4.1,6.1c0.3,0.4,0.7,0.7,1.2,0.7h11.3c0.8,0,1.5-0.7,1.5-1.5v-10.5C1109.2,660.5,1108.5,659.8,1107.7,659.8z"
              ></path>
              <g id="Group_4424">
                <g id="Group_4422">
                  <path
                    id="Path_3527"
                    class="fill-white"
                    d="M1099.7,669.8c-0.4,0-0.7-0.3-0.7-0.8c0-0.2,0.1-0.4,0.2-0.5l5-5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.7,0,1l-5,5C1100.1,669.8,1099.9,669.8,1099.7,669.8z"
                  ></path>
                </g>
                <g id="Group_4423">
                  <path
                    id="Path_3528"
                    class="fill-white"
                    d="M1104.7,669.8c-0.2,0-0.4-0.1-0.5-0.2l-5-5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l5,5c0.3,0.3,0.3,0.8,0,1.1C1105.1,669.8,1104.9,669.8,1104.7,669.8L1104.7,669.8z"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </a>
      {{ parentFolder.folder_name }}
    </div>
    <div key="search" class="main-search w-100">
      <form class="main-search-inner" @submit.prevent>
        <svg
          id="Layer_1"
          class="search-icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <path
            id="Icon_ionic-ios-search"
            class="fill-color"
            d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
          />
        </svg>

        <input
          v-model.trim="search"
          class="form-control"
          placeholder="Search Folder"
        />
      </form>
    </div>
    <!--    :disabled="routeFolder == folder.id"-->
    <FolderListItem
      v-for="(folder, i) in folders"
      :key="folder.id"
      :style="{ transitionDelay: `${(i % 12) * 50}ms` }"
      :folder="folder"
      :selection.sync="model"
      :selection-mode="selectionMode"
      :disabled="
        folder.sub_category_count > 0
          ? false
          : parentFolderDisable != null
          ? parentId == folder.id
          : routeFolder == folder.id
      "
      :parent-folder-disable="parentFolderDisable"
      :route-folder="routeFolder"
      :multiple="multiple"
      :multiple-selection="multipleSelectionModel"
      @click="fetchNextFolder(folder)"
      @click:toggle="toggleSelection"
      @selectedDrop="fromPanel"
      @permission-updated="onFolderPermission(folder, $event)"
    />
  </transition-group>
  <div v-else-if="!newFolder" class="no-data-found my-5">
    <div class="inner w-100">
      <svg
        id="Layer_1"
        class="no-record-icon darkgray"
        style="height: 150px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 131.3 156.8"
        xml:space="preserve"
      >
        <g id="Group_4457" transform="translate(-190.348 -177.624)">
          <path
            id="Path_3564"
            class="fill-color"
            d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
          />
          <path
            id="Path_3565"
            class="fill-color"
            d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
          />
        </g>
      </svg>

      <p class="text-center">You don't have folder created...</p>
      <nuxt-link
        class="btn-comment btn d-flex mx-auto"
        style="white-space: nowrap; align-items: center; width: min-content"
        :to="{
          query: { ...$route.query, createFolder: true },
          hash: $route.hash,
        }"
        replace
      >
        New Folder
      </nuxt-link>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import FolderListItem from './FolderListItem'
import { stringToRegex } from '~/utils'

export default {
  components: { ContentLoader, FolderListItem },
  props: {
    value: { type: [String, Number], default: null },
    selectionMode: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    newFolder: { type: Boolean, default: false },
    parentId: { type: [String, Number], default: null },
    parentFolderDisable: { type: String, default: null },
    multipleSelection: { type: Array, default: () => [] },
    folderSelectionData: { type: Array, default: () => [] },
  },
  data() {
    return {
      model: this.value,
      routeFolder: -1,
      search: '',
      parentFolder: null,
      selectedParentId: null,
      loadingModel: false,
      multipleSelectionModel: [...this.multipleSelection],
      selectionData: [...this.folderSelectionData],
    }
  },
  computed: {
    foldersLoading() {
      return this.$store.state.dam.foldersLoading
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    folders() {
      if (this.search.trim() && this.allFolders)
        return [...this.folderList].filter(({ folder_name }) =>
          stringToRegex(this.search).test(folder_name)
        )
      return this.allFolders
    },
  },
  watch: {
    loadingModel(loadingModel) {
      this.$emit('update:loading', loadingModel)
    },
    hashParam(hashParam) {
      if (!hashParam || isNaN(Number(hashParam)))
        if (this.selectionMode && hashParam && !isNaN(Number(hashParam))) {
          this.model = Number(hashParam)

          if (!this.newFolder) {
            this.routeFolder = Number(hashParam)
            this.model = null
          }
        }
    },
    canGoBack() {
      return !!this.parentFolder?.parent_id
    },
    multipleSelection(val) {
      this.multipleSelectionModel = [...val]
    },
    folderSelectionData(val) {
      this.selectionData = [...val]
    },
    model(val) {
      if (!val && this.parentFolder && this.parentFolder.id !== this.parentId) {
        return (this.model = 0)
      }
      this.$emit('input', val)
    },
    value(val) {
      this.model = val
    },
    parentId() {
      if (this.multiple)
        this.routeFolder = Number(this.parentId || this.hashParam || -1)
    },
  },
  mounted() {
    if (
      this.selectionMode &&
      this.hashParam &&
      !isNaN(Number(this.hashParam))
    ) {
      this.model = Number(this.hashParam)

      if (!this.newFolder) {
        this.routeFolder = Number(this.hashParam)
        this.model = null
      }
    }

    if (this.multiple)
      this.routeFolder = Number(this.parentId || this.hashParam || -1)

    this.$nuxt.$on('update-category', this.onCategoryUpdate)
  },
  beforeDestroy() {
    this.$nuxt.$off('update-category')
  },
  asyncComputed: {
    async allFolders() {
      this.cachedFolders = await new Promise((resolve, reject) => {
        const makeFolders = (folders, parent) => {
          const sortFolders = [...folders].sort(
            this.$sortBy('folder_name', false, null, true)
          )

          this.parentFolder = parent

          resolve(sortFolders)
        }

        const fetchFolder = (folderId) => {
          if (!folderId) return makeFolders(this.folderList)

          const folder = this.$deepSearch(
            this.folderList,
            'id',
            (_, id) => folderId === id
          )

          if (folder)
            if (
              folder.sub_category_count === folder.sub_category_data?.length
            ) {
              return makeFolders(folder.sub_category_data, folder)
            }

          this.loadingModel = true

          this.$axios
            .$post('digital-assets/category/view', {
              workspace_id: this.$getWorkspaceId(),
              category_id: folderId,
            })
            .then(({ data }) => {
              makeFolders(data.sub_category_data, data)
              this.storeUpdated = true

              this.$nextTick(() =>
                this.$store.commit('dam/setFolderItem', data)
              )
            })
            .catch(reject)
        }

        if (this.loading) return makeFolders([])
        if (!this.selectedParentId || this.selectedParentId === -1)
          return makeFolders(this.folderList)

        fetchFolder(this.selectedParentId)
      })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          return []
        })
        .finally(() => (this.loadingModel = false))

      return this.cachedFolders
    },
  },
  methods: {
    onCategoryUpdate({ files = [], folders = [], categoryId } = {}) {
      if (parseInt(categoryId) === parseInt(this.hashParam)) {
        const _folders = folders.filter(
          (f) =>
            !this.allFolders.map((e) => parseInt(e.id)).includes(parseInt(f.id))
        )
        this.allFolders.unshift(..._folders)
      } else {
        const _folders = folders.filter(
          (f) =>
            !this.allFolders.map((e) => parseInt(e.id)).includes(parseInt(f.id))
        )
        this.allFolders.unshift(..._folders)
      }
      if (files.length) {
        const folderIdsToUpdate = new Set(
          files.map((e) => parseInt(e.category_id))
        )
        Array.from(folderIdsToUpdate).forEach((e) => {
          const _folder = this.allFolders.find(
            (f) => parseInt(f.id) === parseInt(e)
          )
          if (_folder && !_folder.sub_category_count) {
            _folder.sub_category_count = 1
          }
        })
      }
      this.$nuxt.$emit('update-overview-data')
    },
    onFolderPermission(folder, permission) {
      this.$store.commit('dam/updateFolderPermission', { folder, permission })
    },
    fetchNextFolder(folder) {
      if (folder.sub_category_count) {
        this.selectedParentId = folder.id
        this.search = ''
        this.model = folder.id
      }
    },
    fromPanel(folder, type, resourceType) {
      this.$emit('selectFromPanel', folder, type, resourceType)
    },
    reset() {
      this.selectedParentId = null
      this.model = null
      this.search = ''
    },
    back() {
      this.selectedParentId = this.parentFolder?.parent_id
      this.model = this.selectedParentId
      this.search = ''
    },
    toggleSelection({ selected, id, parentId }) {
      if (selected) {
        this.multipleSelectionModel.push(id)
        const selectedData = {
          id,
          parentId,
        }
        this.selectionData.push(selectedData)
      } else {
        this.multipleSelectionModel = this.multipleSelectionModel.filter(
          (el) => el !== id
        )
        this.selectionData = this.selectionData.filter((item) => item.id !== id)
      }
      this.$emit('update:multipleSelection', this.multipleSelectionModel)
      this.$emit('update:folderSelectionData', this.selectionData)
    },
  },
}
</script>

<style lang="css">
.modal-dialog .category-list {
  overflow-y: auto !important;
}
</style>
