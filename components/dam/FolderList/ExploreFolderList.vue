<template>
  <div>
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
      class="tbody"
      name="slide-up"
      tag="ul"
    >
      <FolderListItem
        v-for="(folder, i) in folders"
        :key="folder.id"
        :selection="value"
        :style="{ transitionDelay: `${(i % 12) * 50}ms` }"
        :folder="folder"
        @selectedDrop="fromPanel"
        @folderNameChanged="folderNameChanged"
        @permission-updated="onPermissionUpdated(folder, $event)"
      />
    </transition-group>
    <div v-else class="no-data-found my-5 pb-5">
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
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import FolderListItem from './FolderListItem'

export default {
  components: { ContentLoader, FolderListItem },
  props: {
    value: { type: String, default: null },
    parentFolder: { type: Object, default: null },
  },
  data() {
    return {
      loadingModel: this.loading,
      currentFolderName: '',
    }
  },
  computed: {
    foldersLoading() {
      return this.$store.state.dam.foldersLoading
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
  },
  watch: {},
  asyncComputed: {
    async folders() {
      this.cachedFolders = await new Promise((resolve, reject) => {
        const makeFolders = (folders, parent) => {
          const sortFolders = [...folders].sort(
            this.$sortBy('folder_name', false, null, true)
          )

          if (parent)
            this.currentFolderName = parent.folder_name || parent.category_name
          else this.currentFolderName = ''

          resolve(sortFolders)
        }

        const initFolders = (fetchFolder) => {
          if (!fetchFolder) return makeFolders(this.folderList)

          const folder = this.$deepSearch(
            this.folderList,
            'id',
            (_, id) => fetchFolder === id
          )

          if (folder)
            if (folder.sub_category_count === folder.sub_category_data?.length)
              return makeFolders(folder.sub_category_data, folder)

          this.loadingModel = true

          this.$axios
            .$post('digital-assets/category/view', {
              workspace_id: this.$getWorkspaceId(),
              category_id: fetchFolder,
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

        if (this.loading) {
          return makeFolders([])
        }
        if (!this.value || isNaN(this.value)) {
          return makeFolders(this.folderList)
        }

        if (this.parentFolder) {
          if (this.parentFolder?.sub_category_data?.length) {
            makeFolders(this.parentFolder.sub_category_data, this.parentFolder)
          } else {
            initFolders(this.parentFolder.parent_id)
          }
        } else if (!this.value) {
          makeFolders(this.folderList)
        }
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
    onPermissionUpdated(folder, permission) {
      this.$store.commit('dam/updateFolderPermission', { folder, permission })
    },
    folderNameChanged(folder, newName) {
      this.$emit('folderNameChanged', folder, newName)
    },
    getCurrentFolderName() {
      return this.currentFolderName
    },
    fromPanel(folder, type, resourceType) {
      this.$emit('selectFromPanel', folder, type, resourceType)
    },
  },
}
</script>

<style lang="css">
.folder-list.ec-list {
  overflow: hidden !important;
}
.modal-dialog .folder-list.ec-list {
  overflow-y: auto !important;
}
</style>
