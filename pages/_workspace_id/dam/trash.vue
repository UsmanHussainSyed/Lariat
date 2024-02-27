<template>
  <div class="body-content dam-container trash-page pl0 pr0">
    <div
      class="body-content-main customscrollbar h-100 resource-wrapper w-100"
      :class="[`grid-${mode}`]"
    >
      <transition name="slide-up">
        <TrashToolBar
          :assets-count="totalAssets"
          :mode.sync="mode"
          :deleting.sync="deleting"
          :selected-count="selectedCount"
          :sorting="sortBy"
          :sorting-desc="sortDescending"
          @sort="sort"
          @all-removed="removeAll"
          @all-restored="removeAll"
        />
      </transition>

      <div v-if="!loading" class="search-result mb-3">
        <div class="alert alert-info">
          Assets in trash are deleted forever after 30 days.
        </div>
      </div>
      <div class="common-box bg-gray h-auto">
        <div class="table-list-view multi-table-view category-wrapper">
          <div
            v-if="loading"
            style="margin: auto; overflow: hidden; width: 97%"
          >
            <ContentLoader
              :speed="1"
              :animate="true"
              :width="450"
              :height="200"
              class="normalLoader"
            >
              <template v-if="mode === 'list'">
                <rect x="0" y="7" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="53" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="99" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="145" rx="4" ry="4" width="450" height="40" />
              </template>
              <template v-else>
                <rect x="0" y="15" rx="1" ry="1" width="112.4" height="112.4" />
                <rect
                  x="117.4"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
                <rect
                  x="234.9"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
                <rect
                  x="352.3"
                  y="15"
                  rx="1"
                  ry="1"
                  width="112.4"
                  height="112.4"
                />
              </template>
            </ContentLoader>
          </div>
          <div v-if="!totalAssets" key="no-data" class="no-data-found">
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

              <p>Your trash is empty.</p>
            </div>
          </div>
          <template v-else>
            <TrashHeader
              v-if="!loading"
              key="header"
              :selected-all="selectedAll"
              :deleting="deleting"
              :reverse="sortDescending"
              :sort-value.sync="sortBy"
              @click:select-all="selectAll"
              @click:select-none="selectNone"
              @sort="sort"
            />
            <div class="customscrollbar">
              <transition-group
                key="folder-list"
                class="tbody"
                name="slide-up"
                mode="in-out"
                tag="ul"
              >
                <Folder
                  v-for="(folder, i) in folders"
                  :key="'folder-' + folder.id"
                  :folder="folder"
                  :mode="mode"
                  :style="{
                    'transition-delay': `${(i % 12) * 30}ms !important`,
                  }"
                  trash-mode
                  :selected="
                    selectedFolders.map((e) => e.id).includes(folder.id)
                  "
                  @removeMe="removeFolders"
                  @selectedDrop="dropDown"
                  @click:selected="toggleFolderSelection"
                />
                <Resource
                  v-for="(file, i) in files"
                  :key="'file-' + file.id"
                  :file="file"
                  :style="{
                    'transition-delay': `${
                      ((folders.length + i) % 12) * 30
                    }ms !important`,
                  }"
                  :mode="mode"
                  :deleting="deleting"
                  :selected="selectedFiles.map((e) => e.id).includes(file.id)"
                  trash-mode
                  @removeMe="removeFile"
                  @selectedDrop="dropDown"
                  @click:selected="toggleSelection"
                />
              </transition-group>
            </div>
          </template>
        </div>
      </div>
      <DeleteDialog ref="deleteDialog" @button:yes="deleteFromDrop">
        Are you sure you want to permanently delete the selected asset?
      </DeleteDialog>
      <DeleteDialog ref="restoreDialog" @button:yes="restoreFromDrop">
        Are you sure you want to restore the selected asset?
      </DeleteDialog>
    </div>

    <SelectionBar
      v-if="!loading"
      ref="selectionbar"
      :selected-files="selectedFiles"
      :selected-folders="selectedFolders"
      :selected-all="selectedAll"
      :deleting.sync="deleting"
      :restoring.sync="restoring"
      trash-mode
      @copied="selectNone"
      @fromTrashMode="removeSelectedAll"
      @deleted="removeSelectedAll"
      @moved="removeSelectedFiles"
      @click:select-all="selectAll"
      @click:select-none="selectNone"
    />
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import TrashToolBar from '~/components/dam/TrashToolBar'
import SelectionBar from '~/components/dam/SelectionBar'
import Resource from '~/components/dam/AssetList/Resource'
import Folder from '~/components/dam/AssetList/Folder'
import TrashHeader from '~/components/dam/AssetList/TrashHeader'
import DeleteDialog from '~/components/plugins/DeleteDialog'

export default {
  components: {
    ContentLoader,
    Folder,
    Resource,
    TrashToolBar,
    SelectionBar,
    TrashHeader,
    DeleteDialog,
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  data() {
    return {
      files: [],
      folders: [],
      mode: 'tile', // list Style
      loading: true,
      deleting: false,
      restoring: false,
      resource: [],
      resourceType: null,
      selectedFiles: [],
      selectedFolders: [],
      sortBy: 'display_file_name',
      sortDescending: false,
    }
  },
  computed: {
    totalAssets() {
      return this.files.length + this.folders.length
    },
    selectedCount() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    selectedAll() {
      const length = this.files.length + this.folders.length
      return !!length && this.selectedCount === length
    },
  },
  mounted() {
    this.fetchTrashItems()
  },
  methods: {
    toggleSelection(file) {
      const index = this.selectedFiles.findIndex(({ id }) => file.id === id)
      if (~index) {
        this.selectedFiles.splice(index, 1)
      } else {
        this.selectedFiles.push(file)
      }
    },
    toggleFolderSelection(folder) {
      const index = this.selectedFolders.findIndex(({ id }) => folder.id === id)
      if (~index) {
        this.selectedFolders.splice(index, 1)
      } else {
        this.selectedFolders.push(folder)
      }
    },
    removeAll() {
      this.files = []
      this.folders = []
      this.selectedFiles = []
      this.selectedFolders = []
      this.loading = false
      this.deleting = false
      this.restoring = false
    },
    selectAll() {
      this.selectedFiles = [...this.files]
      this.selectedFolders = [...this.folders]
    },
    removeSelectedFiles() {
      const fileIds = this.selectedFiles.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      this.selectedFiles = []
    },
    removeFile(...files) {
      const fileIds = files.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      this.selectedFiles = this.selectedFiles.filter(
        ({ id }) => !fileIds.includes(id)
      )
    },
    removeFolders(...folders) {
      const folderIds = folders.map(({ id }) => id)
      this.folders = this.folders.filter(({ id }) => !folderIds.includes(id))
      this.selectedFolders = this.selectedFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )
    },
    selectNone() {
      this.selectedFiles = []
      this.selectedFolders = []
    },
    fetchTrashItems() {
      this.folders = []
      this.files = []
      this.loading = true
      return this.$axios
        .$get(
          'digital-assets/category/get-deleted-category-with-files?' +
            this.$toQueryString({
              workspace_id: this.$getWorkspaceId(),
            })
        )
        .then(({ data: { categories, assets } }) => {
          this.folders = (categories || []).map((folder) => ({
            ...folder,
            total_contain:
              (folder.total_assets || 0) + (folder.sub_category_count || 0),
          }))
          this.files = assets || []
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.loading = false
        })
    },
    deleteFromDrop() {
      if (!this.resource?.length) return
      this.deleting = true
      const category_ids =
        this.resourceType === 'folder' ? [this.resource[0].id] : []
      const assets_ids =
        this.resourceType === 'file' ? [this.resource[0].id] : []
      this.$axios
        .$post('digital-assets/category/permanent-delete-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids,
          assets_ids,
        })
        .then(({ message }) => {
          if (message) this.$toast.global.success(message)
          this.$nextTick(() => {
            this.folders = this.folders.filter(
              (e) => e.id !== this.resource[0].id
            )
            this.files = this.files.filter((e) => e.id !== this.resource[0].id)
            this.selectedFolders = this.selectedFolders.filter(
              (e) => e.id !== this.resource[0].id
            )
            this.selectedFiles = this.selectedFiles.filter(
              (e) => e.id !== this.resource[0].id
            )
            this.deleting = false
          })
        })
        .catch((e) => {
          this.deleting = false
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    restoreFromDrop() {
      if (!this.resource?.length) return
      this.restoring = true
      const category_ids =
        this.resourceType === 'folder' ? [this.resource[0].id] : []
      const assets_ids =
        this.resourceType === 'file' ? [this.resource[0].id] : []
      this.$axios
        .$post('digital-assets/category/restore-deleted-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids,
          assets_ids,
        })
        .then(({ message }) => {
          if (message) this.$toast.global.success(message)
          this.$nextTick(() => {
            this.files = this.files.filter(
              ({ id }) => id !== this.resource[0].id
            )
            this.selectedFiles = this.selectedFiles.filter(
              ({ id }) => id !== this.resource[0].id
            )
            this.folders = this.folders.filter(
              ({ id }) => id !== this.resource[0].id
            )
            this.selectedFolders = this.selectedFolders.filter(
              ({ id }) => id !== this.resource[0].id
            )
            this.restoring = false
          })
        })
        .catch((e) => {
          this.restoring = false
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    sort(args) {
      const sortBy = args.sortBy || this.sortBy
      switch (sortBy) {
        case 'display_file_name':
          this.folders = this.folders.sort(
            this.$sortBy('folder_name', !!args.descending, null, true)
          )
          this.files = this.files.sort(
            this.$sortBy('display_file_name', !!args.descending, null, true)
          )
          break
        case 'updated_at':
          this.folders = this.folders.sort(
            this.$sortBy('updated_at', !!args.descending, null, true)
          )
          this.files = this.files.sort(
            this.$sortBy('updated_at', !!args.descending, null, true)
          )
          break
        case 'file_size':
          this.folders = this.folders.sort(
            this.$sortBy('total_contain', !!args.descending)
          )
          this.files = this.files.sort(
            this.$sortBy('file_size', !!args.descending)
          )
          break
        case 'file_type':
          this.folders = this.folders.sort(
            this.$sortBy('total_contain', !!args.descending, null, true)
          )
          this.files = this.files.sort(
            this.$sortBy('file_type', !!args.descending, null, true)
          )
          break
      }
      this.sortBy = sortBy
      this.sortDescending = args.descending
    },
    // ============ TODO ================
    dropDown(file, type, resourceType) {
      this.resourceType = resourceType
      this.resource = [file]
      if (type === 'delete') {
        this.$refs.deleteDialog.show()
      } else if (type === 'restore') {
        this.$refs.restoreDialog.show()
      }
    },
    removeSelectedAll(selectionOption, resourceTypes = []) {
      let selectedFile = null
      let selectedFolder = null
      if (selectionOption === 'dropDown') {
        if (resourceTypes.includes('file')) {
          selectedFile = this.resource
          selectedFolder = this.selectedFolders
        }
        if (resourceTypes.includes('folder')) {
          selectedFile = this.selectedFiles
          selectedFolder = this.resource
        }
      } else {
        selectedFile = this.selectedFiles
        selectedFolder = this.selectedFolders
      }
      const fileIds = selectedFile.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))

      const folderIds = selectedFolder.map(({ id }) => id)
      this.folders = this.folders.filter(({ id }) => !folderIds.includes(id))

      const file_ids = this.selectedFiles.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !file_ids.includes(id))
      this.selectedFiles = this.selectedFiles.filter(
        ({ id }) => !file_ids.includes(id)
      )
      const folder_ids = this.selectedFolders.map(({ id }) => id)
      this.folders = this.folders.filter(({ id }) => !folder_ids.includes(id))
      this.selectedFolders = this.selectedFolders.filter(
        ({ id }) => !folder_ids.includes(id)
      )
    },
  },
}
</script>
