<template>
  <div
    class="column-view row h-100 customscrollbar horizontal position-relative"
    style="flex-wrap: nowrap"
  >
    <template v-if="columnViewEnabled">
      <column
        v-for="column in columns"
        :ref="`column_${column.columnId}`"
        :key="column.columnId"
        :column-id="column.columnId"
        :sorting="sorting"
        :total-assets-count="totalAssetsCount"
        :total-folders-count="totalFoldersCount"
        :click-disabled="!!columnsBusy"
        @fetchingData="columnsBusy = true"
        @idle="columnsBusy = false"
        @activate="onFolderClicked"
        @remove="removeColumn"
        @folder-deleted="onFolderDeleted"
        @file-deleted="onFileDeleted"
        @selected="onColumnItemSelected"
        @files-copied="onFilesCopied"
        @items-moved="onItemsMoved"
        @renamed="$emit('folder-renamed', $event)"
        @assets-updated="onColumnAssetsUpdate(column.columnId)"
      />
    </template>
    <template v-else>
      <img
        :src="require('~/assets/img/blurred-images/column-view.png')"
        style="width: 100%; min-height: 600px"
      />
      <div class="common-overaly">
        <div class="common-modal">
          <div class="common-modal-header">
            <h5>Upgrade Plan</h5>
          </div>
          <div class="common-modal-body text-center">
            <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
            
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import Column from './column.vue'
export default {
  name: 'ColumnView',
  components: { Column },
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  props: {
    parentId: {
      type: String,
      required: false,
      default: null,
    },
    sorting: {
      type: Object,
      required: false,
      default: () => {},
    },
    totalAssetsCount: Number,
    totalFoldersCount: Number,
  },
  data() {
    return {
      init: false,
      columnSize: 3,
      columnsBusy: false,
    }
  },
  computed: {
    columnViewEnabled() {
      return !!this.$auth.user?.subscription_features
        ?.n_column_asset_view_architecture?.enable
    },
    columns() {
      return this.$store.state.dam.columnViews
    },
    hashParam() {
      return this.$route.hash?.substring(1)
    },
    columnsCount() {
      return Math.max(3, this.columns.length)
    },
  },
  watch: {
    parentId: {
      handler(n) {
        if (this.init) {
          this.$store.dispatch('dam/columnViews/add', { parentFolderId: n })
        }
      },
      immediate: true,
    },
    hashParam: {
      handler(n) {
        if (this.init) {
          const _column = this.columns.find((e) =>
            e.folders.map((f) => f.id).includes(parseInt(n))
          )
          if (_column) {
            this.onFolderClicked(n, _column.columnId)
          }
        }
      },
      immediate: true,
    },
    'columns.length': {
      immediate: true,
      handler() {
        this.focusColumn()
      },
    },
  },
  async mounted() {
    if (this.hashParam) {
      const columnData = await this.preload(this.hashParam)
      // load root without hash
      if (!columnData.length) {
        return this.$router.replace({
          name: this.$route.name,
          query: this.$route.query,
          params: this.$route.params,
        })
      }
      for (const column of columnData) {
        if (isNaN(column.parent)) {
          this.$store.dispatch('dam/columnViews/add', {
            active: column.active,
          })
        } else {
          this.$store.dispatch('dam/columnViews/add', {
            parentFolderId: parseInt(column.parent),
            active: column.active,
          })
        }
      }
      const lastColumn = columnData[columnData.length - 1]
      if (lastColumn.active) {
        this.$store.dispatch('dam/columnViews/add', {
          parentFolderId: parseInt(lastColumn.active),
        })
      }
    } else {
      this.$store.dispatch('dam/columnViews/add', {})
    }
    this.init = true
  },
  methods: {
    onColumnAssetsUpdate(columnId) {
      if (!this.columns.length) return
      const lastColumn = this.columns[this.columns.length - 1]
      if (lastColumn.columnId === columnId) {
        this.$emit('update:total-assets-count', lastColumn.totalAssetsCount)
        this.$emit('update:total-folders-count', lastColumn.totalFoldersCount)
      }
    },
    sortLast() {
      if (!this.columns.length) return
      const lastColumn = this.columns[this.columns.length - 1]
      this.$nextTick(() => {
        const ref = this.$refs[`column_${lastColumn.columnId}`]
        if (ref && ref[0]) {
          ref[0].page = 1
          ref[0].getAssets()
        }
      })
    },
    focusColumn() {
      if (!this.columns.length) return
      const lastColumn = this.columns[this.columns.length - 1]
      this.$nextTick(() => {
        setTimeout(() => {
          const el = this.$el.querySelector(
            `.column#column-${parseInt(lastColumn.columnId)}`
          )
          el.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
          })
        }, 300)
      })
    },
    async preload(parentId, columns = []) {
      return await this.$axios
        .$post('digital-assets/category/view', {
          category_id: parentId,
          workspace_id: this.$getWorkspaceId(),
        })
        .then(async ({ data }) => {
          columns.unshift({ active: data.id, parent: data.parent_id })
          if (isNaN(parseInt(data.parent_id))) {
            return columns
          }
          return await this.preload(data.parent_id, columns)
        })
        .catch(() => {
          return columns
        })
    },
    async onFilesCopied(items) {
      if (!items?.length) return
      const columnsToUpdate = []
      for (const item of items) {
        for (const parent of item.parents) {
          const parentColumn = this.getColumnByFolderId(parent)
          if (
            parentColumn &&
            parseInt(parentColumn.active) === parseInt(parent)
          ) {
            columnsToUpdate.push({
              columnId: 1 + parseInt(parentColumn.columnId),
              parentFolder: parent,
            })
          }
        }
      }
      for await (const columnData of columnsToUpdate) {
        const { columnId, parentFolder } = columnData
        const column = this.columns.find(
          (e) => parseInt(e.columnId) === parseInt(columnId)
        )
        if (column) {
          await this.$axios
            .$get('digital-assets/category/view-files-with-category', {
              params: {
                sort_value: 'display_file_name',
                sort_by: 'ASC',
                workspace_id: this.$getWorkspaceId(),
                category_id: parentFolder,
              },
            })
            .then(({ data }) => {
              this.$store.dispatch('dam/columnViews/update', {
                columnId: column.columnId,
                mutations: {
                  files: data.category_assets,
                },
              })
            })
            .catch(() => {})
        } else {
          const parentColumn = this.getColumnByFolderId(parentFolder)
          if (parseInt(parentColumn.active) === parseInt(parentFolder)) {
            this.$store.dispatch('dam/columnViews/add', {
              parentFolderId: parentFolder,
            })
          }
        }
      }
      const lastColumn = this.columns[this.columns.length - 1]
      if (
        lastColumn &&
        columnsToUpdate.find((e) => parseInt(e.columnId)) ===
          parseInt(lastColumn.columnId)
      ) {
        this.$emit(
          'update:total-assets-count',
          lastColumn.totalAssetsCount + items.length
        )
      }
    },
    getColumnByFolderId(folderId) {
      for (const column of this.columns) {
        if (!column.folders) continue
        const folderIds = column.folders.map((e) => parseInt(e.id))
        if (folderIds.includes(parseInt(folderId))) {
          return column
        }
      }
    },
    async onItemsMoved({
      files = [],
      folders = [],
      oldColumnId,
      newParent = {},
    }) {
      if (
        !(files.length + folders.length) ||
        isNaN(parseInt(oldColumnId)) ||
        !newParent?.id
      )
        return
      let updateOld = false
      let updateNew = false
      const oldColumn = this.columns.find(
        (e) => parseInt(e.columnId) === parseInt(oldColumnId)
      )
      const parentColumn = this.getColumnByFolderId(newParent.id)
      if (!parentColumn) return
      let newColumn = this.columns.find(
        (e) => parseInt(e.columnId) === parseInt(parentColumn.columnId) + 1
      )
      if (!newColumn && parentColumn.active) {
        await this.$store.dispatch('dam/columnViews/add', {
          parentFolderId: parentColumn.active,
        })
        newColumn = this.columns.find(
          (e) => parseInt(e.parentId) === parseInt(parentColumn.active)
        )
      }
      updateOld = true
      updateNew = true
      if (parseInt(parentColumn.active) !== parseInt(newParent.id)) {
        updateNew = false
      }
      if (updateOld) {
        const mutations = {}
        if (files.length) {
          const fileIds = files.map((e) => parseInt(e.id))
          mutations.files = oldColumn.files.filter(
            (f) => !fileIds.includes(parseInt(f.id))
          )
          mutations.selectedFiles = oldColumn.selectedFiles.filter((e) => {
            return !fileIds.includes(parseInt(e.id))
          })
        }
        if (folders.length) {
          const folderIds = folders.map((e) => parseInt(e.id))
          mutations.folders = oldColumn.folders.filter(
            (f) => !folderIds.includes(parseInt(f.id))
          )
          mutations.selectedFolders = oldColumn.selectedFolders.filter((e) => {
            return !folderIds.includes(parseInt(e.id))
          })
          if (folderIds.includes(parseInt(oldColumn.active))) {
            this.removeColumn(parseInt(oldColumn.columnId))
            if (parseInt(oldColumn.columnId) === 0) {
              // remove route hash
              return this.$router.replace({
                name: this.$route.name,
                params: this.$route.params,
                query: this.$route.query,
              })
            } else {
              const activeParentId = this.columns.find(
                (e) => parseInt(e.columnId) === parseInt(oldColumn.columnId) - 1
              ).active
              this.$router.replace({
                name: this.$route.name,
                params: this.$route.params,
                query: this.$route.query,
                hash: `#${activeParentId}`,
              })
            }
          }
        }
        this.$store.dispatch('dam/columnViews/update', {
          columnId: oldColumnId,
          mutations,
        })
        this.$nextTick(() => {
          const _updated = this.columns.find(
            (e) => parseInt(e.columnId) === parseInt(oldColumn.columnId)
          )
          if (!_updated?.files?.length && !_updated?.folders?.length) {
            // this.removeColumn(parseInt(_updated.columnId) - 1)
          }
        })
      }
      if (updateNew) {
        let _files, _folders
        await this.$axios
          .$get('digital-assets/category/view-files-with-category', {
            params: {
              sort_value: 'display_file_name',
              sort_by: 'ASC',
              workspace_id: this.$getWorkspaceId(),
              category_id: newParent.id,
              page: 1,
            },
          })
          .then(({ data }) => {
            if (data && data.assets_with_folder) {
              _folders = data?.assets_with_folder?.data?.filter(
                (e) =>
                  !Object.prototype.hasOwnProperty.call(e, 'display_file_name')
              )
              _files = data?.assets_with_folder?.data?.filter((e) =>
                Object.prototype.hasOwnProperty.call(e, 'display_file_name')
              )
              this.$store.dispatch('dam/columnViews/update', {
                columnId: newColumn.columnId,
                mutations: {
                  files: _files,
                  folders: _folders,
                },
              })
              this.$emit('update:total-assets-count', data.totalCounts.assets)
              this.$emit('update:total-folders-count', data.totalCounts.folders)
            }
          })
          .catch(() => {})
      }
    },
    onColumnItemSelected(columnId) {
      const otherColumns = this.columns.filter((col) => {
        if (parseInt(columnId) === parseInt(col.columnId)) return false
        return col.selectedFiles.length > 0 || col.selectedFolders.length > 0
      })
      for (const _col of otherColumns) {
        this.$store.dispatch('dam/columnViews/update', {
          columnId: _col.columnId,
          mutations: {
            selectedFiles: [],
            selectedFolders: [],
          },
        })
      }
    },
    onFolderDeleted(folder, columnId) {
      const _column = this.columns.find((c) => c.columnId === columnId)
      if (!_column || !folder) return
      this.$store.dispatch('dam/removeFolderFromList', folder)
      // root folders
      if (
        !folder.parent_id &&
        this.columns[0].folders
          .map((e) => parseInt(e.id))
          .includes(parseInt(folder.id))
      ) {
        this.$store.dispatch('dam/deleteFolder2', folder.id)
        this.$store.dispatch('dam/columnViews/update', {
          columnId,
          mutations: {
            folders: _column.folders.filter(
              (e) => parseInt(e.id) !== parseInt(folder.id)
            ),
            selectedFolders: _column.selectedFolders.filter(
              (f) => parseInt(f.id) !== parseInt(folder.id)
            ),
          },
        })
      } else {
        // nested folders
        this.$store.dispatch('dam/columnViews/update', {
          columnId,
          mutations: {
            folders: _column.folders.filter(
              (e) => parseInt(e.id) !== parseInt(folder.id)
            ),
            selectedFolders: _column.selectedFolders.filter(
              (f) => parseInt(f.id) !== parseInt(folder.id)
            ),
          },
        })
      }
      if (parseInt(_column.active) === parseInt(folder.id)) {
        this.removeColumn(parseInt(columnId))
      } else {
        this.$emit('update:total-folders-count', this.totalFoldersCount - 1)
      }
      if (columnId > 0) {
        const parentColumn = this.columns.find(
          (c) => c.columnId === columnId - 1
        )
        if (
          parentColumn &&
          parseInt(parentColumn.active) !== parseInt(this.hashParam)
        ) {
          this.$router.replace({
            name: this.$route.name,
            params: this.$route.params,
            query: this.$route.query,
            hash: `#${parentColumn.active}`,
          })
        }
      }
    },
    onFileDeleted(file, columnId) {
      const _column = this.columns.find((c) => c.columnId === columnId)
      if (!_column || !file) return
      this.$store.dispatch('dam/columnViews/update', {
        columnId,
        mutations: {
          files: _column.files.filter(
            (e) => parseInt(e.id) !== parseInt(file.id)
          ),
          selectedFiles: _column.selectedFiles.filter(
            (f) => parseInt(f.id) !== parseInt(file.id)
          ),
        },
      })
      this.$emit('update:total-assets-count', this.totalAssetsCount - 1)
    },
    onFolderClicked(folderId, columnId) {
      this.$store.dispatch('dam/columnViews/update', {
        columnId,
        mutations: { active: this.hashParam },
      })
      this.removeColumn(parseInt(columnId))
      this.$nextTick(() => {
        this.$store.dispatch('dam/columnViews/add', {
          parentFolderId: folderId,
        })
      })
    },
    removeColumn(columnId) {
      this.$store.dispatch('dam/columnViews/clear', { from: columnId + 1 })
    },
    sort(sortBy, order) {
      const sortItems = (items, sortBy, sortOrder) => {
        /* eslint-disable no-prototype-builtins */
        if (sortBy[0] === 'total_contain' && sortBy[1] === 'file_type') {
          return items.sort((a, b) => {
            if (
              a.hasOwnProperty('folder_name') &&
              b.hasOwnProperty('folder_name')
            ) {
              return sortOrder === 'desc'
                ? String(b.total_assets).localeCompare(String(a.total_assets))
                : String(a.total_assets).localeCompare(String(b.total_assets))
            } else if (
              a.hasOwnProperty('file_type') &&
              b.hasOwnProperty('file_type')
            ) {
              return sortOrder === 'desc'
                ? String(b.file_type).localeCompare(String(a.file_type))
                : String(a.file_type).localeCompare(String(b.file_type))
            }
            if (sortOrder === 'desc') {
              if (
                a.hasOwnProperty('folder_name') &&
                b.hasOwnProperty('file_type')
              )
                return -1
              else if (
                b.hasOwnProperty('folder_name') &&
                a.hasOwnProperty('file_type')
              )
                return 1
              return 0
            } else {
              if (
                a.hasOwnProperty('folder_name') &&
                b.hasOwnProperty('file_type')
              )
                return 1
              else if (
                b.hasOwnProperty('folder_name') &&
                a.hasOwnProperty('file_type')
              )
                return -1
              return 0
            }
          })
        }
        return items.sort((a, b) => {
          if (a.hasOwnProperty(sortBy) && b.hasOwnProperty(sortBy)) {
            return sortOrder === 'desc'
              ? String(b[sortBy]).localeCompare(String(a[sortBy]))
              : String(a[sortBy]).localeCompare(String(b[sortBy]))
          }
          return 0
        })
      }
      for (const column of this.columns) {
        const folders = Object.assign(
          [],
          JSON.parse(
            JSON.stringify(sortItems([...column.folders], sortBy[0], order))
          )
        )
        const files = Object.assign(
          [],
          JSON.parse(
            JSON.stringify(sortItems([...column.files], sortBy[1], order))
          )
        )
        this.$store.dispatch('dam/columnViews/update', {
          columnId: parseInt(column.columnId),
          mutations: {
            files,
            folders,
          },
        })
      }
    },
  },
}
</script>

<style scoped>
.customscrollbar.horizontal {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
.customscrollbar.horizontal::-webkit-scrollbar-track {
  background-color: transparent;
  cursor: pointer;
}
.customscrollbar.horizontal::-webkit-scrollbar {
  height: 4px;
  background-color: transparent;
  cursor: pointer;
}
.customscrollbar.horizontal::-webkit-scrollbar-thumb {
  background-color: transparent;
  cursor: pointer;
}
.customscrollbar.horizontal:hover::-webkit-scrollbar-track {
  background-color: #d3d3d3;
  cursor: pointer;
}
.customscrollbar.horizontal:hover::-webkit-scrollbar {
  height: 4px;
  background-color: #d3d3d3;
  cursor: pointer;
}
.customscrollbar.horizontal:hover::-webkit-scrollbar-thumb {
  background-color: #697fa5;
  cursor: pointer;
}
</style>
