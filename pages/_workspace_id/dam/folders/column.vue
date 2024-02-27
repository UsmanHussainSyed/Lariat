<template>
  <div
    :id="`column-${columnId}`"
    class="column col-md-3 h-100"
    :style="{
      width: '28%',
      minWidth: '28%',
      maxWidth: '28%',
    }"
  >
    <div class="common-box bg-gray h-100 table-list-scrolling">
      <div class="customscrollbar" @scroll="handelScrollAssets($event)">
        <ul
          class="tbody"
          :class="{ 'h-100': isEmpty }"
          :style="clickDisabled ? 'pointer-events:none;opacity:0.675' : ''"
        >
          <Folder
            v-for="folder in folders"
            :key="'folder-' + folder.id"
            :folder="folder"
            mode="columnView"
            :selected="isFolderSelected(folder.id)"
            :level="columnId"
            :class="{ active: parseInt(active) === parseInt(folder.id) }"
            @click:selected="onFolderSelection"
            @permission-updated="onPermissionUpdated(folder, $event)"
            @selectedDrop="onFolderAction"
            @folderNameChanged="onFolderRenamed"
          />
          <Resource
            v-for="file in files"
            :key="'file-' + file.id"
            :file="file"
            mode="columnView"
            :selected="isFileSelected(file.id)"
            @click:selected="onFileSelection"
            @selectedDrop="onResourceAction"
            @fileNameChanged="onResourceNameChange"
            @removeMe="removeResource"
          />
          <template v-if="loading">
            <li
              v-for="loader in Math.floor(Math.random() * 2) + 3"
              :key="loader"
            >
              <ContentLoader
                :speed="2"
                :animate="true"
                :height="16"
                :width="16"
                :style="{
                  height: '16px',
                  width: '16px',
                  borderRadius: '4px',
                  marginLeft: '3px',
                }"
              >
                <rect x="0" :y="0" rx="0" ry="0" width="16" height="16" />
                />
              </ContentLoader>
              <ContentLoader
                :speed="2"
                :animate="true"
                :height="24"
                :width="32"
                :style="{
                  height: '24px',
                  width: '32px',
                  borderRadius: '4px',
                  marginLeft: '10px',
                }"
              >
                <rect x="0" :y="0" rx="0" ry="0" width="32" height="24" />
                />
              </ContentLoader>
              <ContentLoader
                :speed="2"
                :animate="true"
                :height="16"
                :width="150"
                :style="{
                  height: '16px',
                  width: '150px',
                  borderRadius: '4px',
                  marginLeft: '10px',
                }"
              >
                <rect x="0" :y="0" rx="0" ry="0" width="150" height="16" />
                />
              </ContentLoader>
              <ContentLoader
                :speed="2"
                :animate="true"
                :height="16"
                :width="16"
                :style="{
                  height: '16px',
                  width: '16px',
                  borderRadius: '4px',
                  right: '10px',
                  position: 'absolute',
                }"
              >
                <rect x="0" :y="0" rx="0" ry="0" width="16" height="16" />
                />
              </ContentLoader>
            </li>
          </template>
          <template v-else-if="isEmpty">
            <div
              class="inner h-100 w-100"
              :style="{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }"
            >
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
              <br />
              <p>No assets found</p>
            </div>
          </template>
        </ul>
      </div>
    </div>
    <client-only>
      <MoveFolderToFolderDialog
        ref="moveFoldersDialog"
        move-to-folder
        :files-to-move="currentItems"
        @moved="onFolderMoved"
      />
      <DeleteDialog
        ref="deleteDialog"
        @button:yes="resourceType === 'file' ? deleteFile() : deleteFolder()"
      >
        Are you sure you want to delete the asset(s)?
      </DeleteDialog>
      <SelectionBar
        :selected-files="selectedFiles"
        :selected-folders="selectedFolders"
        :selected-all="selectedAll"
        :deleting.sync="deleting"
        @click:select-all="onSelectAll"
        @click:select-none="onSelectNone"
        @moved="onSelectionMoved"
        @copied="onResourceCopied"
        @archieve="onSelectionArchive"
        @deleted="onSelectionDeleted"
      />
      <CopyFolderDialog
        v-if="!storageFull"
        ref="copyDialog"
        :files-to-move="currentItems"
        @copied="onResourceCopied"
      />
      <MoveFolderDialog
        ref="moveDialog"
        :files-to-move="currentItems"
        move-to-folder
        @moved="onFileMoved"
      />
    </client-only>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import Folder from '~/components/dam/AssetList/Folder'
import Resource from '~/components/dam/AssetList/Resource'
import MoveFolderToFolderDialog from '~/components/dam/Dialogs/MoveFolderToFolderDialog'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import SelectionBar from '~/components/dam/SelectionBar'
import CopyFolderDialog from '~/components/dam/Dialogs/CopyFolderDialog'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
export default {
  name: 'Column',
  components: {
    Folder,
    Resource,
    ContentLoader,
    MoveFolderToFolderDialog,
    DeleteDialog,
    SelectionBar,
    CopyFolderDialog,
    MoveFolderDialog,
  },
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  props: {
    columnId: { type: [String, Number], required: true, default: 0 },
    sorting: {
      type: Object,
      required: false,
      default: () => {},
    },
    totalAssetsCount: Number,
    totalFoldersCount: Number,
    'click-disabled': Boolean,
  },
  data() {
    return {
      loading: false,
      currentItems: [],
      resourceType: '',
      deleting: false,
      page: 1,
      noMoreData: false,
    }
  },
  computed: {
    isRoot() {
      return isNaN(this.column.parentId) && !this.hashParam
    },
    isEmpty() {
      return this.files.length + this.folders.length === 0
    },
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    column() {
      return this.$store.state.dam.columnViews[this.columnId] || {}
    },
    folders() {
      return this.column.folders
    },
    files() {
      return this.column.files
    },
    active() {
      return this.column.active
    },
    selectedFiles() {
      return this.column.selectedFiles
    },
    selectedFolders() {
      return this.column.selectedFolders
    },
    parentId() {
      return this.column.parentId
    },
    hashParam() {
      return this.$route.hash?.substring(1)
    },
    isFileSelected() {
      return (fileId) => {
        return this.selectedFiles
          .map((e) => parseInt(e.id))
          .includes(parseInt(fileId))
      }
    },
    isFolderSelected() {
      return (folderId) => {
        return this.selectedFolders
          .map((e) => parseInt(e.id))
          .includes(parseInt(folderId))
      }
    },
    selectionCount() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    selectedAll() {
      return this.selectionCount === this.files.length + this.folders.length
    },
  },
  watch: {
    parentId: {
      handler(n) {
        if (!n && !this.files.length && !this.folders.length) this.getFolders()
        else {
          this.getAssets()
        }
      },
      immediate: true,
    },
    selectedFiles: {
      handler() {
        this.currentItems = []
      },
      deep: true,
      immediate: true,
    },
    selectedFolders: {
      handler() {
        this.currentItems = []
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onPermissionUpdated(folder, permission) {
      this.$store.commit('dam/updateFolderPermission', {
        folder,
        permission,
        columnId: this.columnId,
      })
    },
    onResourceCopied(parents) {
      if (!parents.length) return
      const fileItems = []
      if (this.selectedFiles?.length) {
        for (const file of this.selectedFiles) {
          const _file = Object.assign({}, JSON.parse(JSON.stringify(file)))
          fileItems.push({
            file: _file,
            oldColumnId: this.columnId,
            parents: parents.map(({ id }) => parseInt(id)),
          })
        }
      } else if (this.currentItems?.length) {
        const _file = Object.assign(
          {},
          JSON.parse(JSON.stringify(this.currentItems[0]))
        )
        fileItems.push({
          file: _file,
          oldColumnId: this.columnId,
          parents: parents.map(({ id }) => parseInt(id)),
        })
      }
      if (fileItems.length) this.$emit('files-copied', fileItems)
    },
    onFileSelection(file) {
      let count = 0
      let selectedFiles = [...this.selectedFiles]
      if (selectedFiles.find((f) => parseInt(f.id) === parseInt(file.id))) {
        selectedFiles = selectedFiles.filter(
          (f) => parseInt(f.id) !== parseInt(file.id)
        )
      } else {
        selectedFiles.push(file)
        count = 1
      }
      if (count) {
        this.$emit('selected', this.columnId)
      }
      this.$nextTick(() => {
        this.$store.dispatch('dam/columnViews/update', {
          columnId: this.columnId,
          mutations: {
            selectedFiles,
          },
        })
      })
    },
    onFolderSelection(folder) {
      let count = 0
      let selectedFolders = [...this.selectedFolders]
      if (selectedFolders.find((f) => parseInt(f.id) === parseInt(folder.id))) {
        selectedFolders = selectedFolders.filter(
          (f) => parseInt(f.id) !== parseInt(folder.id)
        )
      } else {
        selectedFolders.push(folder)
        count = 1
      }
      if (count) {
        this.$emit('selected', this.columnId, folder, 'folder')
      }
      this.$nextTick(() => {
        this.$store.dispatch('dam/columnViews/update', {
          columnId: this.columnId,
          mutations: {
            selectedFolders,
          },
        })
      })
    },
    onSelectionDeleted(a, type, selection) {
      const { folderIds = [], fileIds = [] } = selection || {}
      folderIds.forEach((id) => {
        const folder = this.folders?.find(
          (e) => parseInt(e.id) === parseInt(id)
        )
        if (folder) {
          this.$emit('folder-deleted', folder, this.columnId)
        }
      })
      fileIds.forEach((id) => {
        const file = this.files?.find((e) => parseInt(e.id) === parseInt(id))
        if (file) {
          this.$emit('file-deleted', file, this.columnId)
        }
      })
    },
    onSelectionMoved(newParent) {
      const files = this.selectedFiles
      if (!files.length) return
      if (parseInt(files[0].category_id) === parseInt(newParent.id)) {
        return
      }
      this.$emit('items-moved', {
        files,
        folders: [],
        oldColumnId: this.columnId,
        newParent,
      })
    },
    // files only
    // type = archieve
    onSelectionArchive(type, { assets = [] }) {
      if (!assets.length || type !== 'archieve') return
      assets = assets.map((e) => parseInt(e))
      const files = this.files.filter((f) => assets.includes(parseInt(f.id)))
      files.forEach((file) => {
        this.$emit('file-deleted', file, this.columnId)
      })
    },
    onSelectAll() {
      const selectedFiles = this.files
      const selectedFolders = this.folders
      this.$store.dispatch('dam/columnViews/update', {
        columnId: this.columnId,
        mutations: {
          selectedFiles,
          selectedFolders,
        },
      })
    },
    onSelectNone() {
      this.$store.dispatch('dam/columnViews/update', {
        columnId: this.columnId,
        mutations: {
          selectedFiles: [],
          selectedFolders: [],
        },
      })
    },
    onFolderMoved(newParent) {
      // from folder dropdown action only
      if (!this.currentItems?.length) return
      if (
        parseInt(this.currentItems[0].parent_id) === parseInt(newParent?.id)
      ) {
        return
      }
      this.$emit('items-moved', {
        files: [],
        folders: this.currentItems,
        oldColumnId: this.columnId,
        newParent,
      })
    },
    removeResource(file) {
      this.$emit('file-deleted', file, this.columnId)
    },
    onResourceNameChange(file, name) {
      // destructuring & JSON parsing to break vuex mutation dependency on files
      const files = JSON.parse(
        JSON.stringify([
          ...this.files.map((f) => {
            return {
              ...f,
              display_file_name:
                parseInt(f.id) === parseInt(file.id)
                  ? name
                  : f.display_file_name,
            }
          }),
        ])
      )
      this.$store.dispatch('dam/columnViews/update', {
        columnId: this.columnId,
        mutations: { files },
      })
    },
    onResourceAction(file, action, type) {
      if (action === 'delete') {
        this.currentItems = [file]
        this.resourceType = `file`
        this.$refs.deleteDialog.show()
      } else if (action === 'copy') {
        if (!this.storageFull) {
          this.currentItems = [file]
          this.$refs.copyDialog.show()
        }
      } else if (action === 'move') {
        this.currentItems = [file]
        this.$refs.moveDialog.show()
      }
    },
    onFileMoved(newParent) {
      if (!this.currentItems?.length) return
      if (
        parseInt(this.currentItems[0].category_id) === parseInt(newParent.id)
      ) {
        return
      }
      this.$emit('items-moved', {
        files: this.currentItems,
        folders: [],
        oldColumnId: this.columnId,
        newParent,
      })
    },
    onFolderRenamed(folder, newName) {
      const folders = JSON.parse(
        JSON.stringify([
          ...this.folders.map((f) => {
            const name =
              parseInt(f.id) === parseInt(folder.id) ? newName : f.folder_name
            return {
              ...f,
              folder_name: name,
              category_name: name,
            }
          }),
        ])
      )
      this.$store.dispatch('dam/columnViews/update', {
        columnId: this.columnId,
        mutations: { folders },
      })
      this.$emit('renamed', {
        folderId: folder.id,
        newName,
      })
    },
    onFolderAction(folder, action, resourceType) {
      if (action === 'moveFolder') {
        this.currentItems = [folder]
        this.$refs.moveFoldersDialog.show()
      } else if (action === 'download') {
        this.$store.dispatch('dam/downloadMultipleFiles', {
          files: [],
          folders: [folder.id],
        })
      } else if (action === 'delete') {
        this.currentItems = [folder]
        this.resourceType = `folder`
        this.$refs.deleteDialog.show()
      }
    },
    deleteFolder(folder) {
      folder = folder || (this.currentItems || [])[0]
      if (!folder) return
      this.$axios
        .$post('digital-assets/category/delete-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids: [folder.id],
          assets_ids: [],
        })
        .then(({ message }) => {
          this.$toast.global.success(`Folder deleted successfully.`)
          this.$emit('folder-deleted', folder, this.columnId)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    deleteFile(file) {
      file = file || (this.currentItems || [])[0]
      if (!file) return
      this.$axios
        .$post('digital-assets/category/delete-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids: [],
          assets_ids: [file.id],
        })
        .then(({ message }) => {
          this.$toast.global.success(`File deleted successfully.`)
          this.$emit('file-deleted', file, this.columnId)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
    },
    getFolders() {
      this.loading = true
      this.$emit('fetchingData')
      this.$store.dispatch('dam/columnViews/update', {
        columnId: this.columnId,
        mutations: {
          folders: [],
          files: [],
        },
      })
      this.$axios
        .$get('digital-assets/category/list', {
          params: {
            workspace_id: this.$getWorkspaceId(),
          },
        })
        .then(({ data }) => {
          this.$store.dispatch('dam/columnViews/update', {
            columnId: this.columnId,
            mutations: {
              folders: data,
            },
          })
        })
        .finally(() => {
          this.loading = false
          this.$emit('idle')
        })
    },
    async getAssets() {
      if (!this.parentId) return
      this.$emit('fetchingData')
      this.loading = true
      if (this.page === 1) {
        await this.$store.dispatch('dam/columnViews/update', {
          columnId: this.columnId,
          mutations: {
            folders: [],
            files: [],
          },
        })
      }
      this.$axios
        .$get('digital-assets/category/view-files-with-category', {
          params: {
            sort_value: this.sorting?.value || 'display_file_name',
            sort_by: this.sorting?.desc ? 'DESC' : 'ASC',
            workspace_id: this.$getWorkspaceId(),
            category_id: this.parentId,
            page: this.page,
          },
        })
        .then(({ data }) => {
          if (data && data.assets_with_folder) {
            const files = data?.assets_with_folder?.data?.filter((e) =>
              Object.prototype.hasOwnProperty.call(e, 'display_file_name')
            )
            const folders = data?.assets_with_folder?.data?.filter(
              (e) =>
                !Object.prototype.hasOwnProperty.call(e, 'display_file_name')
            )
            if (!folders.length && !files.length) {
              this.$store.dispatch('dam/columnViews/update', {
                columnId: this.columnId,
                mutations: {
                  folders: [],
                  files: [],
                },
              })
            } else {
              this.$store.dispatch('dam/columnViews/update', {
                columnId: this.columnId,
                mutations: {
                  folders: [...this.folders, ...folders],
                  files: [...this.files, ...files],
                  totalAssetsCount: data.totalCounts.assets,
                  totalFoldersCount: data.totalCounts.folders,
                },
              })
            }
            this.page++
            if (!folders.length && !files.length) this.noMoreData = true
            if (
              data?.assets_with_folder?.to === data?.assets_with_folder?.total
            )
              this.noMoreData = true
            this.$emit('total-assets-count', data.totalCounts.assets)
            this.$emit('total-folders-count', data.totalCounts.folders)
          }
        })
        .finally(() => {
          this.loading = false
          this.$emit('assets-updated')
          this.$emit('idle')
        })
    },
    handelScrollAssets(e) {
      if (this.noMoreData || this.loading || this.clickDisabled) return
      const el = e.target
      if (!el) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      if (scrollPercent > 80) {
        this.getAssets()
      }
    },
  },
}
</script>
