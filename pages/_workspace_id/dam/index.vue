<template>
  <div
    class="body-content dam-container pl0 pr0"
    :class="{ 'show-panal-list': mode === 'columnView' }"
  >
    <div class="body-content-left h-100" >
      <div class="common-box bg-gray h-auto pb-0">
        <AssetOverview
          id="asset-overview"
          :data="dashboardData || {}"
          :loading="overviewLoading"
        />
      </div>
      <div class="common-box-header" style = "display:none">
        <h2 class="title">Folders</h2>
      </div>
      <div style = "display:none"
        class="common-box bg-gray category-list table-list-scrolling"
        :style="loading ? 'pointer-events:none' : ''"
      >
        <div class="customscrollbar pb-0 no-header">
          <h4
            v-if="
              parentFolder &&
              $refs.folderList &&
              $refs.folderList.getCurrentFolderName()
            "
          >
            <nuxt-link
              :to="{
                name: 'workspace_id-dam-folders',
                params: { workspace_id: $getWorkspaceId() },
                hash: `#${parentFolder.parent_id || ''}`,
              }"
              class="back"
            >
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
                  />
                  <g id="Group_4425" transform="translate(-514.168 -476.583)">
                    <path
                      id="Icon_material-backspace"
                      class="fill-color"
                      d="M1107.7,659.8h-11.3c-0.5,0-0.9,0.3-1.2,0.7l-4.1,6.1l4.1,6.1c0.3,0.4,0.7,0.7,1.2,0.7h11.3c0.8,0,1.5-0.7,1.5-1.5v-10.5C1109.2,660.5,1108.5,659.8,1107.7,659.8z"
                    />
                    <g id="Group_4424">
                      <g id="Group_4422">
                        <path
                          id="Path_3527"
                          class="fill-white"
                          d="M1099.7,669.8c-0.4,0-0.7-0.3-0.7-0.8c0-0.2,0.1-0.4,0.2-0.5l5-5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.7,0,1l-5,5C1100.1,669.8,1099.9,669.8,1099.7,669.8z"
                        />
                      </g>
                      <g id="Group_4423">
                        <path
                          id="Path_3528"
                          class="fill-white"
                          d="M1104.7,669.8c-0.2,0-0.4-0.1-0.5-0.2l-5-5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l5,5c0.3,0.3,0.3,0.8,0,1.1C1105.1,669.8,1104.9,669.8,1104.7,669.8L1104.7,669.8z"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </nuxt-link>
            {{ $refs.folderList.getCurrentFolderName() }}
          </h4>
          <ExploreFolderList
            ref="folderList"
            :value="hashParam"
            :loading="gettingFolders"
            :parent-folder="parentFolder"
            @selectFromPanel="dropDown"
            @folderNameChanged="updateFolderName"
          />
        </div>
      </div>
    </div>

    <div
      class="body-content-main h-100 resource-wrapper customscrollbar"
      :class="mode === 'columnView' ? 'panalView' : `grid-${mode}`"
      @scroll="handelScrollAssets($event)"
    >
      <ToolBar
        v-if="
          mode !== 'columnView' || (mode === 'columnView' && columnViewEnabled)
        "
        ref="toolbar"
        :folder="parentFolder"
        :assets-count="totalAssetsCount + totalFoldersCount"
        :selected-all="selectedAll"
        :file-count="totalAssetsCount"
        :subfolder-count="totalFoldersCount"
        :mode.sync="mode"
        :breadcrumb="breadcrumb"
        :deleting.sync="deleting"
        :sorting.sync="sorting.toolbar.value"
        :sorting-desc="sorting.toolbar.desc"
        @sort="onToolbarSort"
        @click:select-all="selectAll"
        @click:select-none="selectNone"
        @emitAssetCount="changeEmitAssetCount"
      />
      <div
        v-if="mode === 'tile' || mode === 'list'"
        class="h-auto common-box bg-gray"
      >
        <div class="table-list-view multi-table-view table-list-scrolling s2">
          <ListingHeader
            key="header"
            :assets-count="totalAssets"
            :selected-all="selectedAll"
            :deleting="deleting"
            :reverse="sorting.toolbar.desc"
            :sort-value.sync="sorting.toolbar.value"
            @click:select-all="selectAll"
            @click:select-none="selectNone"
            @sort="(args) => args.forEach((arg) => sort(...arg))"
          />
          <div class="customscrollbar">
            <transition-group
              key="folder-list"
              class="tbody"
              name="slide-up"
              mode="in-out"
              tag="ul"
            >
              <div
                v-if="!loading && !(files.length + subFolders.length)"
                key="no-data"
                class="no-data-found"
              >
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

                  <template v-if="isFolder">
                    <p>You don't have any asset in this folder.</p>
                    <p>
                      <nuxt-link
                        class="btn btn-gray"
                        :to="{
                          name: 'workspace_id-dam-upload',
                          params: { workspace_id: $getWorkspaceId() },
                        }"
                      >
                        Upload
                      </nuxt-link>
                      <span> or </span>
                      <nuxt-link
                        class="btn"
                        :to="{
                          query: { ...$route.query, createFolder: true },
                          hash: $route.hash,
                        }"
                      >
                        Create folder
                      </nuxt-link>
                    </p>
                  </template>

                  <p v-else class="my-3">No Assets Found</p>
                </div>
              </div>

              <template
                v-for="{ folder, file } in allItems"
                v-else-if="allItems.length"
              >
                <Folder
                  v-if="folder"
                  :key="'folder-' + folder.id"
                  :folder="folder"
                  :mode="mode"
                  :no-view="hashParam === 'uncategorized'"
                  :selected="folderSelection[folder.id]"
                  :last-update="updatedAssetCount"
                  @removeMe="removeFolders"
                  @selectedDrop="dropDown"
                  @click:selected="toggleFolderSelection"
                  @folderNameChanged="updateFolderName"
                  @permission-updated="onPermissionUpdated(folder, $event)"
                />
                <Resource
                  v-else-if="file"
                  :key="'file-' + file.id"
                  :file="file"
                  :no-view="hashParam === 'uncategorized'"
                  :mode="mode"
                  :deleting="deleting"
                  :selected="selection[file.id]"
                  @selectedDrop="dropDown"
                  @removeMe="removeFiles"
                  @click:selected="toggleSelection"
                  @fileNameChanged="updateFileName"
                />
              </template>
            </transition-group>
          </div>
          <div
            v-if="loading"
            style="margin: auto; overflow: hidden; width: 97%"
            class="pb-3"
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
          <div v-if="!totalAssets" class="no-data-found">
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
              <p>No assets found!</p>
            </div>
          </div>
        </div>
      </div>
      <!-- panel view -->
      <div v-if="mode === 'columnView'" class="panalView">
        <column-view
          ref="columnView"
          :sorting="sorting.toolbar"
          :total-assets-count.sync="totalAssetsCount"
          :total-folders-count.sync="totalFoldersCount"
          @folder-renamed="onFolderRenamed"
        />
      </div>
      <!-- end of panel view -->
    </div>
    <SelectionBar
      v-if="!loading && mode !== 'columnView'"
      ref="selectionbar"
      :selected-files="selectedFiles"
      :selected-folders="selectedFolders"
      :selected-all="selectedAll"
      :deleting.sync="deleting"
      :no-view="hashParam === 'uncategorized'"
      @fromTrashMode="removeSelectedAll"
      @copied="updatedFolderData"
      @deleted="removeSelectedAll"
      @moved="selectedFilesRemoval"
      @click:select-all="selectAll"
      @click:select-none="selectNone"
      @archieve="removeArchieved"
    />
    <client-only>
      <MoveFolderDialog
        v-show="resourceType !== 'folder'"
        ref="moveDialog"
        :files-to-move="resource"
        :move-to-folder="!(hashParam === 'uncategorized')"
        @moved="selectedFilesRemoval"
        @resetResource="resetResource"
      />
      <MoveFolderToFolderDialog
        ref="moveFoldersDialog"
        :files-to-move="resource"
        :move-to-folder="!(hashParam === 'uncategorized')"
        @moved="moveSelectedFiles"
        @resetResource="resetResource"
      />
      <CopyFolderDialog
        ref="copyDialog"
        :files-to-move="resource"
        @copied="updatedFolderData"
      />
      <DeleteDialog ref="deleteDialog" @button:yes="deleteFromDrop">
        Are you sure you want to delete the selected asset?
      </DeleteDialog>
    </client-only>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { ContentLoader } from 'vue-content-loader'
import ColumnView from '~/pages/_workspace_id/dam/folders/columnView'
import fileSelection from '~/mixins/fileSelection'
import assetSorting from '~/mixins/assetSorting'
import ToolBar from '~/components/dam/ToolBar'
import SelectionBar from '~/components/dam/SelectionBar'
import Folder from '~/components/dam/AssetList/Folder'
import Resource from '~/components/dam/AssetList/Resource'
import ListingHeader from '~/components/dam/AssetList/ListingHeader'
import ExploreFolderList from '~/components/dam/FolderList/ExploreFolderList'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
import CopyFolderDialog from '~/components/dam/Dialogs/CopyFolderDialog'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import MoveFolderToFolderDialog from '~/components/dam/Dialogs/MoveFolderToFolderDialog'
import AssetOverview from '~/components/dam/AssetOverview'

const categories = ['video', 'audio', 'image', 'application', 'archive']

function makeFolder(array) {
  return [...array].map((folder) => ({
    ...folder,
    total_contain:
      (folder.total_assets || 0) + (folder.sub_category_count || 0),
  }))
}

export default {
  components: {
    ContentLoader,
    ExploreFolderList,
    Folder,
    Resource,
    ToolBar,
    SelectionBar,
    ListingHeader,
    MoveFolderDialog,
    CopyFolderDialog,
    DeleteDialog,
    MoveFolderToFolderDialog,
    ColumnView,
    AssetOverview,
  },
  mixins: [fileSelection, assetSorting],
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  data() {
    return {
      overviewLoading: false,
      dashboardData: null,
      files: [],
      subFolders: [],
      mode: 'tile', // [tile, list] Style
      loading: false,
      gettingFolders: false,
      deleting: false,
      page: 1,
      lastPage: -1,
      localPage: 1,
      breadcrumb: null,
      totalApiAssets: null,
      resource: [],
      resourceType: null,
      parentHistory: [],
      updatedAssetCount: {},
      searching: false,
      noMoreData: false,
      totalAssetsCount: 0,
      totalFoldersCount: 0,
    }
  },
  computed: {
    columnViewEnabled() {
      return !!this.$auth.user?.subscription_features
        ?.n_column_asset_view_architecture?.enable
    },
    isTrash() {
      return this.$route.name.search('trash')
    },
    activeSelection() {
      return this.$store.state.dam.activeSelection
    },
    hashParam() {
      return (this.$route.hash || '').replace('#', '')
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
    isFolder() {
      return (
        !!this.hashParam && !this.inCategory && !isNaN(Number(this.hashParam))
      )
    },
    allItems() {
      return [
        ...this.subFolders.map((ev) => ({ folder: ev })),
        ...this.files.map((ev) => ({ file: ev })),
      ]
    },
    inCategory() {
      return categories.includes(this.hashParam)
    },
    totalAssets() {
      return this.lastPage > 1
        ? this.totalApiAssets
        : this.files.length + this.subFolders.length
    },
    selectedCount() {
      return this.selectedFiles.length + this.selectedFolders.length
    },
    selectedAll() {
      const length = this.files.length + this.subFolders.length
      return !!length && this.selectedCount === length
    },
  },
  asyncComputed: {
    async parentFolder() {
      if (!this.isFolder) return null
      if (this.$route.params.folder_name)
        return {
          ...this.$route.params.folder,
          sub_category_data:
            this.$route.params.sub_category_data | this.subFolders,
        }

      let folder = this.$deepSearch(
        this.folderList,
        'id',
        (_, id) => this.hashParam === id
      )
      if (!folder)
        await this.$axios
          .$post('digital-assets/category/view', {
            workspace_id: this.$getWorkspaceId(),
            category_id: this.hashParam,
          })
          .then(({ data }) => {
            folder = data
          })
          .catch(() => {
            const route = {
              name: this.$route.name,
              params: this.$route.params,
              query: this.$route.query,
            }
            if (this.parentFolder) route.hash = `#${this.parentFolder}`
            this.$router.replace(route)
          })
      return folder || null
    },
  },
  watch: {
    mode: {
      handler() {
        if (this.mode !== 'columnView') {
          if (
            this.selectedFolders.length > 0 &&
            this.selectedFolders[0].parent_id !== parseInt(this.hashParam) &&
            this.hashParam !== ''
          ) {
            this.selectedFolders = []
          }
          if (
            this.selectedFiles.length > 0 &&
            this.selectedFiles[0].category_id !== parseInt(this.hashParam) &&
            this.hashParam !== ''
          ) {
            this.selectedFiles = []
          }
          this.page = 1
          this.files = []
          this.subFolders = []
          this.getData()
          this.$store.dispatch('dam/columnViews/clear', { from: 0 })
        }
        let view = ''
        if (this.mode === 'columnView') view = 'column'
        else if (this.mode === 'list') view = 'list'
        else if (this.mode === 'tile') view = 'tile'
        if (this.hashParam === 'search') view = ''
        const query = { ...this.$route.query }

        if (query.view !== view) {
          query.view = view
          if (this.hashParam === 'search') delete query.view
          this.$router.push({
            name: this.$route.name,
            params: this.$route.params,
            hash: this.$route.hash,
            query,
          })
        }
      },
      deep: true,
      immediate: true,
    },
    '$route.hash'() {
      if (this.hashParam === '') {
        this.$store.dispatch('dam/columnViews/clear', { from: 0 })
      }
    },
    hashParam() {
      if (this.mode === 'columnView') {
        if (this.inCategory) {
          this.$router.replace({
            name: this.$route.name,
            params: this.$route.params,
            hash: this.$route.hash,
            query: { ...this.$route.query, view: 'tile' },
          })
        }
      }
      this.prefetch()
    },
    '$route.query.searchId'() {
      this.prefetch()
    },
    folderList() {
      this.addNotInCurrent()
    },
    parentFolder() {
      this.addNotInCurrent()
    },
    '$route.query.sort_by': {
      immediate: true,
      deep: true,
      handler(n) {
        if (n === 'updated_at') {
          this.sorting.toolbar.value = n
          this.$nextTick(() => {
            this.$refs.toolbar.emitSortParamsArray('updated_at')
            this.getFolders()
          })
        }
      },
    },
    '$route.query': {
      handler(n) {
        if (!n?.view) return
        if (n.view === 'column' && !this.inCategory) this.mode = 'columnView'
        else if (n.view === 'list') this.mode = 'list'
        else this.mode = 'tile'
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getOverviewData()
  },
  mounted() {
    this.getData()
    this.$nuxt.$on(
      'update-category',
      ({ files = [], folders = [], categoryId } = {}) => {
        if (parseInt(categoryId) === parseInt(this.hashParam)) {
          const _files = files.filter(
            (f) =>
              !this.files.map((e) => parseInt(e.id)).includes(parseInt(f.id))
          )
          const _folders = folders.filter(
            (f) =>
              !this.subFolders
                .map((e) => parseInt(e.id))
                .includes(parseInt(f.id))
          )
          const isColumnView = this.$route.query.view === 'column'
          let column
          if (isColumnView) {
            const columns = this.$store.state.dam.columnViews
            column = columns[columns.length - 1]
          }
          for (const file of _files) {
            this.files.unshift(file)
          }
          for (const folder of _folders) {
            this.subFolders.unshift(folder)
          }
          if (column) {
            this.$store.dispatch('dam/columnViews/update', {
              columnId: parseInt(column.columnId),
              mutations: {
                files: [...column.files, ..._files],
                folders: [...column.folders, ..._folders],
              },
            })
          }
        } else if (!categoryId && !this.hashParam?.length) {
          this.subFolders.unshift(...folders)
        }
      }
    )
  },
  beforeDestroy() {
    this.$nuxt.$off('update-category')
  },
  methods: {
    getOverviewData() {
      if (this.overviewLoading) {
        if (this.overviewTimer) {
          clearTimeout(this.overviewTimer)
          this.overviewTimer = null
        }
        this.overviewTimer = setTimeout(() => this.getOverviewData(), 800)
        this.overviewLoading = false
        return
      }
      this.overviewLoading = true
      this.$axios
        .$get(
          `/digital-assets/dashboard/common-data?workspace_id=${this.$getWorkspaceId()}`
        )
        .then(({ data }) => {
          const categoryAlert = JSON.parse(
            localStorage.getItem(`${this.$getWorkspaceId()}`)
          )
          if (categoryAlert !== null) {
            if (
              data.total_uncategorized > 0 &&
              categoryAlert.dismiss === false
            ) {
              categoryAlert.active = true

              localStorage.setItem(
                `${this.$auth.user.workspace_id}`,
                JSON.stringify(categoryAlert)
              )
              this.alertData = categoryAlert
            } else {
              categoryAlert.active = false

              localStorage.setItem(
                `${this.$auth.user.workspace_id}`,
                JSON.stringify(categoryAlert)
              )
              this.alertData = categoryAlert
            }
          } else if (categoryAlert === null) {
            if (data.total_uncategorized > 0) {
              const categoryAlert = {
                active: true,
                dismiss: false,
              }
              localStorage.setItem(
                `${this.$auth.user.workspace_id}`,
                JSON.stringify(categoryAlert)
              )
              this.alertData = categoryAlert
            }
          }
          this.$store.commit('dam/resetNewFolderCount')

          data.loaded = true
          this.dashboardData = data
        })
        .catch(this.$errorToast)
        .finally(() => (this.overviewLoading = false))
    },
    onFolderRenamed(arg) {
      const { folderId, newName } = arg
      this.updateBreadcrumbs(folderId, newName)
    },
    getColumnByFolderId(folderId) {
      const columns = this.$store.state.dam.columnViews
      for (const column of columns) {
        if (!column.folders) continue
        const folderIds = column.folders.map((e) => parseInt(e.id))
        if (folderIds.includes(parseInt(folderId))) {
          return column
        }
      }
    },
    onPermissionUpdated(folder, permission) {
      this.$store.commit('dam/updateFolderPermission', { folder, permission })
    },
    resetResource(data) {
      if (data) {
        this.resource = []
      }
    },
    selectedFilesRemoval(moveTo) {
      if (this.isFolder || this.hashParam === 'uncategorized') {
        this.removeSelectedFiles(moveTo)
      } else {
        this.resource = []
        this.selectedFiles = []
      }
    },
    updatedFolderData(selectedFolderData) {
      const activeSelectionList = this.activeSelection
      selectedFolderData.map(async (item) => {
        if (
          activeSelectionList.includes(item.id) &&
          activeSelectionList.includes(item.parentId)
        ) {
          const indexOfParent = activeSelectionList.indexOf(item.id)

          const body = {
            sort_value: this.apiSortValue(),
            sort_by: this.apiSortOrder(),
            workspace_id: this.$getWorkspaceId(),
            category_id: item.id,
            page: this.currentPage,
          }
          await this.$axios
            .$get(
              'digital-assets/category/view-files-with-category?' +
                this.$toQueryString(body),
              body
            )
            .then(({ data }) => {
              if (parseInt(this.hashParam) === item.id) {
                this.breadcrumb = data.breadcrumb

                const sortValueFolders =
                  this.sorting.subFolders.field === 'display_file_name'
                    ? 'folder_name'
                    : this.sorting.subFolders.field
                const sortValueFiles = this.sorting.files.field
                const order = this.sorting.toolbar.desc

                this.files =
                  data.category_assets.sort(
                    this.$sortBy(sortValueFiles, order, null, true)
                  ) || []
                this.subFolders = makeFolder(
                  data.folder.sort(
                    this.$sortBy(sortValueFolders, order, null, true)
                  ) || []
                )
              }

              const subFolders = makeFolder(
                data.folder.sort(
                  this.$sortBy('folder_name', false, null, true)
                ) || []
              )
              const files =
                data.category_assets.sort(
                  this.$sortBy('display_file_name', false, null, true)
                ) || []

              const folders = [
                ...subFolders.map((ev) => ({ folder: ev })),
                ...files.map((ev) => ({ file: ev })),
              ]

              this.$store.dispatch('dam/updateFolderName', {
                folders,
                indexOfParent,
              })
            })
            .catch((e) => {
              const message = this.$getErrorMessage(e)
              this.$toast.global.error(message)

              if (message === 'Folder not found')
                return this.$router.replace({
                  name: 'workspace_id-dam-folders',
                  params: { workspace_id: this.$getWorkspaceId() },
                })
            })
        }
        return item
      })
      this.selectNone()
    },
    updateFolderName(folderData, newName) {
      this.updateBreadcrumbs(folderData.id, newName)
    },
    updateBreadcrumbs(folderId, newName, root = this.breadcrumb) {
      if (!root) return
      if (root.id === folderId) {
        root.folder_name = newName
        return
      }
      if (root.parent) this.updateBreadcrumbs(folderId, newName, root.parent)
    },
    updateFileName(oldFile, newName) {
      if (this.mode === 'columnView') {
        this.$store.dispatch('dam/renameFiles', { oldFile, newName })
        return
      }
      let files = JSON.parse(JSON.stringify(this.files))
      files = files.map((item) => {
        if (item.id === oldFile.id) {
          item.display_file_name = newName
        }
        return item
      })
      this.files = JSON.parse(JSON.stringify(files))
    },
    dropDown(file, type, resourceType) {
      this.resourceType = resourceType
      this.resource = [file]

      if (type === 'move') {
        this.$refs.moveDialog.show()
      } else if (type === 'moveFolder') {
        this.$refs.moveFoldersDialog.show()
      } else if (type === 'copy') {
        this.$refs.copyDialog.show()
      } else if (type === 'download') {
        this.$refs.selectionbar.downloadSelectedFile(
          this.resource,
          resourceType
        )
      } else if (type === 'delete') {
        this.$refs.deleteDialog.show()
      }
    },
    deleteFromDrop() {
      this.deleting = true
      const fileId = this.resourceType === 'file' ? this.resource[0].id : null
      const folderId =
        this.resourceType === 'folder' ? this.resource[0].id : null
      this.$axios
        .$post('digital-assets/category/delete-category-with-files', {
          workspace_id: this.$getWorkspaceId(),
          category_ids: folderId ? [folderId] : [],
          assets_ids: fileId ? [fileId] : [],
        })
        .then(async ({ message }) => {
          if (folderId && !fileId)
            this.$toast.global.success(`Folder deleted successfully.`)
          else if (message) this.$toast.global.success(message)

          if (folderId) {
            this.$store.dispatch('dam/removeFolderFromList', this.resource[0])
          }

          this.files = this.files.filter(({ id }) => id !== fileId)

          this.subFolders = this.subFolders.filter(({ id }) => id !== folderId)

          this.selectedFiles = this.selectedFiles.filter((e) => e.id !== fileId)
          this.selectedFolders = this.selectedFolders.filter(
            (e) => e.id !== folderId
          )
          if (this.mode === 'columnView') {
            if (folderId) {
              const parentId =
                this.resourceType === 'file'
                  ? this.resource[0].category_id
                  : this.resource[0].parent_id
              const indexSelectedFolderId =
                this.activeSelection.indexOf(folderId)
              const indexOfParent = this.activeSelection.indexOf(parentId)
              if (indexSelectedFolderId > -1) {
                await this.$store.dispatch(
                  'dam/deleteActiveFolder',
                  indexSelectedFolderId
                )
              }
              await this.$store.dispatch('dam/deleteFolder', {
                resourcesIds: [folderId],
                indexOfParent,
              })
            }
          } else {
            if (fileId) this.totalAssetsCount -= 1
            if (folderId) this.totalFoldersCount -= 1
            const tooFewResources =
              (!this.files.length && !this.subFolders.length) ||
              this.files.length + this.subFolders.length < 50
            if (tooFewResources && !this.noMoreData) {
              this.page = 1
              this.loadResources()
            }
          }
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.$nextTick(() => (this.deleting = false))
        })
    },
    prefetch() {
      this.page = 1
      this.localPage = 1
      this.lastPage = -1
      this.deleting = false
      this.noMoreData = false
      this.getData()
    },
    async addNotInCurrent() {
      if (!this.hashParam) {
        const sortValue = this.sorting.subFolders.field
        const sortBy = this.sorting.subFolders.reverse

        this.subFolders = makeFolder(this.folderList)

        this.subFolders.sort(this.$sortBy(sortValue, sortBy, null, true))
        return
      }
      if (this.loading || !this.parentFolder) return

      let folderToTraverse = null
      await this.$nextTick()

      if (this.$route.query.createFolder !== 'true') {
        const sortValue =
          this.sorting.subFolders.field === 'display_file_name'
            ? 'folder_name'
            : this.sorting.subFolders.field
        const sortBy = this.sorting.subFolders.reverse
        if (this.isFolder) {
          folderToTraverse =
            this.parentFolder.sub_category_data.sort(
              this.$sortBy(sortValue, sortBy, null, true)
            ) || []
        } else if (!this.hashParam) folderToTraverse = this.folderList
        else return

        const temp = [...folderToTraverse].map((e) => ({ ...e }))

        this.subFolders = makeFolder(temp)
      }
    },
    selectAll() {
      this.selectedFiles = [...this.files]
      this.selectedFolders = [...this.subFolders]
    },
    removeArchieved(isArchieve) {
      if (this.lastPage > 0) {
        this.selectNone()
        return this.prefetch()
      }

      if (isArchieve === 'archieve') {
        const selectedFile = this.selectedFiles
        const fileIds = selectedFile.map(({ id }) => id)
        this.files = this.files.filter(({ id }) => !fileIds.includes(id))

        const deletionCheck = [...this.activeSelection]
        if (this.parentOfselected !== null && this.resource.length === 0) {
          const resourcesIds = [].concat(fileIds)
          const activeSelectionList = this.$store.state.dam.activeSelection
          const parentId = this.parentOfselected
          const indexOfParent = activeSelectionList.indexOf(parentId)
          this.$store
            .dispatch('dam/deleteFolder', {
              resourcesIds,
              indexOfParent,
            })
            .then(() => {
              if (
                deletionCheck.some((item) => resourcesIds.includes(item)) ===
                true
              ) {
                if (
                  this.$store?.state?.dam?.assetList?.[indexOfParent]
                    ?.length !== 0
                ) {
                  const parentFolderArray =
                    this.$store.state.dam.assetList[indexOfParent]
                  for (let i = 0; i < parentFolderArray.length; i++) {
                    if (parentFolderArray[i].folder !== undefined) {
                      this.$router.replace({
                        name: 'workspace_id-dam-folders',
                        params: {
                          workspace_id: this.$getWorkspaceId(),
                        },
                        hash: `#${parentFolderArray[i].folder.id}`,
                      })
                      break
                    } else if (parentFolderArray[i].file !== undefined) {
                      this.$router.replace({
                        name: 'workspace_id-dam-folders',
                        params: {
                          workspace_id: this.$getWorkspaceId(),
                        },
                        hash: `#${parentId}`,
                      })
                      break
                    }
                  }
                } else if (this.activeSelection.length === 1) {
                  this.$router.replace({
                    name: 'workspace_id-dam-folders',
                    params: {
                      workspace_id: this.$getWorkspaceId(),
                    },
                  })
                } else {
                  this.$router.replace({
                    name: 'workspace_id-dam-folders',
                    params: {
                      workspace_id: this.$getWorkspaceId(),
                    },
                    hash: `#${
                      this.activeSelection[this.activeSelection.length - 1]
                    }`,
                  })
                }
              }
            })
        }
        this.totalAssetsCount -= fileIds.length
      }
      this.selectNone()
    },
    removeSelectedAll(selectionOption, resourceType, assets = {}) {
      if (this.lastPage > 1) {
        return this.prefetch()
      }
      if (this.lastPage > 0 && this.hashParam === 'archive') {
        return this.prefetch()
      }
      let selectedFile = null
      let selectedFolder = null
      if (selectionOption === 'dropDown') {
        if (resourceType.includes('file')) {
          selectedFile = this.resource
          selectedFolder = this.selectedFolders
        } else if (resourceType.includes('folder')) {
          selectedFile = this.selectedFiles
          selectedFolder = this.resource
        }
      } else {
        selectedFile = this.selectedFiles
        selectedFolder = this.selectedFolders
        this.resource = []
      }
      const fileIds = selectedFile.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))

      const folderIds = selectedFolder.map(({ id }) => id)
      this.subFolders = this.subFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )

      const deletionCheck = [...this.activeSelection]
      if (this.parentOfselected !== null && this.resource.length === 0) {
        const resourcesIds = [].concat(folderIds, fileIds)
        const activeSelectionList = this.$store.state.dam.activeSelection
        for (let i = 0; i < activeSelectionList.length; i++) {
          if (folderIds.includes(activeSelectionList[i])) {
            const indexSelectedFolderId = i
            this.$store.dispatch(
              'dam/deleteActiveFolder',
              indexSelectedFolderId
            )
            break
          }
        }
        const parentId = this.parentOfselected
        const indexOfParent = activeSelectionList.indexOf(parentId)
        this.$store
          .dispatch('dam/deleteFolder', {
            resourcesIds,
            indexOfParent,
          })
          .then(() => {
            if (
              deletionCheck.some((item) => resourcesIds.includes(item)) === true
            ) {
              if (
                this.$store?.state?.dam?.assetList?.[indexOfParent]?.length !==
                0
              ) {
                const parentFolderArray =
                  this.$store.state.dam.assetList[indexOfParent]
                for (let i = 0; i < parentFolderArray.length; i++) {
                  if (parentFolderArray[i].folder !== undefined) {
                    this.$router.replace({
                      name: 'workspace_id-dam-folders',
                      params: {
                        workspace_id: this.$getWorkspaceId(),
                      },
                      hash: `#${parentFolderArray[i].folder.id}`,
                    })
                    break
                  } else if (parentFolderArray[i].file !== undefined) {
                    this.$router.replace({
                      name: 'workspace_id-dam-folders',
                      params: {
                        workspace_id: this.$getWorkspaceId(),
                      },
                      hash: `#${parentId}`,
                    })
                    break
                  }
                }
              } else if (this.activeSelection.length === 1) {
                this.$router.replace({
                  name: 'workspace_id-dam-folders',
                  params: {
                    workspace_id: this.$getWorkspaceId(),
                  },
                })
              } else {
                this.$router.replace({
                  name: 'workspace_id-dam-folders',
                  params: {
                    workspace_id: this.$getWorkspaceId(),
                  },
                  hash: `#${
                    this.activeSelection[this.activeSelection.length - 1]
                  }`,
                })
              }
            }
          })
      } else {
        const indexOfFolderList = 0
        let resourcesIds = []
        const activeSelectionList = this.$store.state.dam.activeSelection
        let parentId = 0
        if (this.resourceType !== null) {
          if (this.resourceType === 'file') {
            parentId = this.resource?.[indexOfFolderList]?.category_id
          } else {
            parentId = this.resource?.[indexOfFolderList]?.parent_id
          }
          const resourceFolderIds = this.resource.map(({ id }) => id)
          resourcesIds = [].concat(resourceFolderIds)
        } else {
          parentId = this.parentOfselected
          resourcesIds = [].concat(folderIds)
        }

        if (this.resourceType === 'folder') {
          const indexSelectedFolderId = activeSelectionList.indexOf(
            this.resource[indexOfFolderList].id
          )
          if (indexSelectedFolderId > -1) {
            this.$store.dispatch(
              'dam/deleteActiveFolder',
              indexSelectedFolderId
            )
          }
        }
        const indexOfParent = activeSelectionList.indexOf(parentId)
        this.$store
          .dispatch('dam/deleteFolder', {
            resourcesIds,
            indexOfParent,
          })
          .then(() => {
            if (
              deletionCheck.some((item) => resourcesIds.includes(item)) === true
            ) {
              if (
                this.$store?.state?.dam?.assetList?.[indexOfParent]?.length !==
                0
              ) {
                const parentFolderArray =
                  this.$store.state.dam.assetList[indexOfParent]
                if (indexOfParent === 0) {
                  this.$router.replace({
                    name: 'workspace_id-dam-folders',
                    params: {
                      workspace_id: this.$getWorkspaceId(),
                    },
                  })
                } else {
                  for (let i = 0; i < parentFolderArray.length; i++) {
                    if (parentFolderArray[i].folder !== undefined) {
                      this.$router.replace({
                        name: 'workspace_id-dam-folders',
                        params: {
                          workspace_id: this.$getWorkspaceId(),
                        },
                        hash: `#${parentFolderArray[i].folder.id}`,
                      })
                      break
                    } else if (parentFolderArray[i].file !== undefined) {
                      this.$router.replace({
                        name: 'workspace_id-dam-folders',
                        params: {
                          workspace_id: this.$getWorkspaceId(),
                        },
                        hash: `#${parentId}`,
                      })
                      break
                    }
                  }
                }
              } else if (this.activeSelection.length === 1) {
                this.$router.replace({
                  name: 'workspace_id-dam-folders',
                  params: {
                    workspace_id: this.$getWorkspaceId(),
                  },
                })
              } else {
                this.$router.replace({
                  name: 'workspace_id-dam-folders',
                  params: {
                    workspace_id: this.$getWorkspaceId(),
                  },
                  hash: `#${
                    this.activeSelection[this.activeSelection.length - 1]
                  }`,
                })
              }
            }
          })
      }

      this.selectedFiles = this.selectedFiles.filter(
        (e) => !(assets.fileIds || []).includes(e.id)
      )
      this.selectedFolders = this.selectedFolders.filter(
        (e) => !(assets.folderIds || []).includes(e.id)
      )
      if (fileIds?.length) this.totalAssetsCount -= fileIds.length
      if (folderIds?.length) this.totalFoldersCount -= folderIds.length
      const tooFewResources =
        (!this.files.length && !this.subFolders.length) ||
        this.files.length + this.subFolders.length < 50
      if (tooFewResources && !this.noMoreData) {
        this.page = 1
        this.loadResources()
      }
    },

    removeSelectedFiles(moveTo) {
      let _files = []
      let _folders = []
      if (!this.resourceType) {
        _files = [...this.selectedFiles]
        _folders = [...this.selectedFolders]
      } else {
        const isFileSelected = Object.prototype.hasOwnProperty.call(
          this.resource[0],
          'display_file_name'
        )
        if (isFileSelected) {
          _files = [...this.resource]
        } else {
          _folders = [...this.resource]
        }
      }
      const _fileIds = _files.map((e) => e.id)
      const _folderIds = _folders.map((e) => e.id)
      this.selectedFiles = this.selectedFiles.filter(
        (e) => !_fileIds.includes(e.id)
      )
      this.selectedFolders = this.selectedFolders.filter(
        (e) => !_folderIds.includes(e.id)
      )
      this.files = this.files.filter((e) => !_fileIds.includes(e.id))
      this.subFolders = this.subFolders.filter(
        (e) => !_folderIds.includes(e.id)
      )
      this.totalAssetsCount -= _fileIds.length
      this.totalFoldersCount -= _folderIds.length
      const tooFewResources =
        (!this.files.length && !this.subFolders.length) ||
        this.files.length + this.subFolders.length < 50
      if (tooFewResources && !this.noMoreData) {
        this.page = 1
        this.loadResources()
      }
    },
    async removeSelectedFiles2(moveTo) {
      if (this.lastPage > 1) return this.prefetch()

      const activeSelectionList = this.activeSelection

      let movedFile = this.resourceType ? this.resource : this.selectedFiles
      const fileIds = movedFile.map(({ id }) => id)

      if (this.parentOfselected !== null && this.resource.length === 0) {
        const indexOfOwnParent = activeSelectionList.indexOf(
          this.parentOfselected
        )
        const assetIds = fileIds
        await this.$store.dispatch('dam/moveAssets', {
          indexOfOwnParent,
          assetIds,
        })
      } else {
        const assetIds = []
        assetIds.push(movedFile[0].id)
        const indexOfOwnParent = activeSelectionList.indexOf(
          movedFile[0].category_id
        )
        await this.$store.dispatch('dam/moveAssets', {
          indexOfOwnParent,
          assetIds,
        })
      }
      let categoryId = null
      categoryId = moveTo?.id
      const indexOfParent = activeSelectionList.indexOf(categoryId)
      const body = {
        sort_value: this.apiSortValue(),
        sort_by: this.apiSortOrder(),
        workspace_id: this.$getWorkspaceId(),
        category_id: moveTo.id,
      }
      await this.$axios
        .$get(
          'digital-assets/category/view-files-with-category?' +
            this.$toQueryString(body),
          body
        )
        .then(({ data }) => {
          if (data) {
            if (parseInt(this.hashParam) === moveTo.id) {
              const sortValueFolders =
                this.sorting.subFolders.field === 'display_file_name'
                  ? 'folder_name'
                  : this.sorting.subFolders.field
              const sortValueFiles = this.sorting.files.field
              const order = this.sorting.toolbar.desc

              this.files =
                data.category_assets.sort(
                  this.$sortBy(sortValueFiles, order, null, true)
                ) || []
              this.subFolders = makeFolder(
                data.folder.sort(
                  this.$sortBy(sortValueFolders, order, null, true)
                ) || []
              )
            }
            // update asset count in subfolders of current folder after moving
            else if (
              parseInt(this.hashParam) ===
              data?.category_assets?.[0]?.category?.parent_id
            ) {
              this.subFolders = this.subFolders.map((item) => {
                if (item.id === data?.category_assets?.[0]?.category_id) {
                  item.total_assets = data?.category_assets?.length
                  const id = item.id
                  const updatedTotalCount = data?.category_assets?.length
                  const activeSelectionList =
                    this.$store.state.dam.activeSelection
                  const indexOfParent = activeSelectionList.indexOf(
                    data?.category_assets?.[0]?.category?.parent_id
                  )
                  this.$store.dispatch('dam/updateAssetCount', {
                    id,
                    updatedTotalCount,
                    indexOfParent,
                  })
                }
                return item
              })
            }
            const subFolders = makeFolder(
              data.folder.sort(
                this.$sortBy('folder_name', false, null, true)
              ) || []
            )
            const files =
              data.category_assets.sort(
                this.$sortBy('display_file_name', false, null, true)
              ) || []

            const folders = [
              ...subFolders.map((ev) => ({ folder: ev })),
              ...files.map((ev) => ({ file: ev })),
            ]
            this.$store.dispatch('dam/updateFolderName', {
              folders,
              indexOfParent,
            })
            if (parseInt(this.hashParam) !== moveTo.id) {
              this.files = this.files.filter(({ id }) => !fileIds.includes(id))
            }
            movedFile = []
            this.selectNone()
          }
        })
    },
    // moving of the folders from one folder to another
    async moveSelectedFiles(moveTo) {
      if (this.lastPage > 1) return this.prefetch()

      const activeSelectionList = this.activeSelection
      const movedFile = this.resourceType ? this.resource : this.selectedFiles
      const fileIds = movedFile.map(({ id }) => id)

      if (this.parentOfselected !== null && this.resource.length === 0) {
        const indexOfOwnParent = activeSelectionList.indexOf(
          this.parentOfselected
        )
        const assetIds = fileIds
        await this.$store.dispatch('dam/moveAssets', {
          indexOfOwnParent,
          assetIds,
        })
      } else {
        const assetIds = []
        assetIds.push(movedFile[0].id)
        const indexOfOwnParent = activeSelectionList.indexOf(
          movedFile[0].parent_id
        )
        await this.$store.dispatch('dam/moveAssets', {
          indexOfOwnParent,
          assetIds,
        })
      }
      // if (moveTo) {
      //   let categoryId = null
      //   categoryId = moveTo?.id
      //   const indexOfParent = activeSelectionList.indexOf(categoryId)
      //   const body = {
      //     sort_value: this.apiSortValue(),
      //     sort_by: this.apiSortOrder(),
      //     workspace_id: this.$getWorkspaceId(),
      //     category_id: moveTo.id,
      //   }
      //   await this.$axios
      //     .$get(
      //       'digital-assets/category/view-files-with-category?' +
      //         this.$toQueryString(body),
      //       body
      //     )
      //     .then(({ data }) => {
      //       if (parseInt(this.hashParam) === moveTo.id) {
      //         const sortValueFolders =
      //           this.sorting.subFolders.field === 'display_file_name'
      //             ? 'folder_name'
      //             : this.sorting.subFolders.field
      //         const sortValueFiles = this.sorting.files.field
      //         const order = this.sorting.toolbar.desc

      //         this.files =
      //           data.category_assets.sort(
      //             this.$sortBy(sortValueFiles, order, null, true)
      //           ) || []
      //         this.subFolders = makeFolder(
      //           data.folder.sort(
      //             this.$sortBy(sortValueFolders, order, null, true)
      //           ) || []
      //         )
      //       }
      //       // update asset count in subfolders of current folder after moving
      //       else if (
      //         parseInt(this.hashParam) ===
      //         data?.category_assets?.[0]?.category?.parent_id
      //       ) {
      //         this.subFolders = this.subFolders.map((item) => {
      //           if (item.id === data?.category_assets?.[0]?.category_id) {
      //             item.total_assets = data?.category_assets?.length
      //             const id = item.id
      //             const updatedTotalCount = data?.category_assets?.length
      //             const activeSelectionList =
      //               this.$store.state.dam.activeSelection
      //             const indexOfParent = activeSelectionList.indexOf(
      //               data?.category_assets?.[0]?.category?.parent_id
      //             )
      //             this.$store.dispatch('dam/updateAssetCount', {
      //               id,
      //               updatedTotalCount,
      //               indexOfParent,
      //             })
      //           }
      //           return item
      //         })
      //       }
      //       const subFolders = makeFolder(
      //         data.folder.sort(
      //           this.$sortBy('folder_name', false, null, true)
      //         ) || []
      //       )
      //       const files =
      //         data.category_assets.sort(
      //           this.$sortBy('display_file_name', false, null, true)
      //         ) || []

      //       const folders = [
      //         ...subFolders.map((ev) => ({ folder: ev })),
      //         ...files.map((ev) => ({ file: ev })),
      //       ]
      //       this.$store.dispatch('dam/updateFolderName', {
      //         folders,
      //         indexOfParent,
      //       })
      //     })
      //   if (parseInt(this.hashParam) !== moveTo.id) {
      //     this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      //   }
      //   movedFile = []
      //   this.selectNone()
      // }
    },
    removeFiles(...files) {
      const fileIds = files.map(({ id }) => id)
      this.files = this.files.filter(({ id }) => !fileIds.includes(id))
      this.selectedFiles = []

      this.noData = !this.files.length && !this.subFolders.length
    },

    // delete folders
    removeFolders(...folders) {
      const indexOfFolderList = 0
      const activeSelectionList = this.$store.state.dam.activeSelection
      const parentId = folders?.[indexOfFolderList]?.parent_id
      const indexOfParent = activeSelectionList.indexOf(parentId)
      const folderIds = folders.map(({ id }) => id)
      const resourcesIds = [].concat(folderIds)
      this.$store.dispatch('dam/deleteFolder', { resourcesIds, indexOfParent })

      this.subFolders = this.subFolders.filter(
        ({ id }) => !folderIds.includes(id)
      )
    },
    async getFolders() {
      this.gettingFolders = true
      await this.$store.dispatch('dam/getFolders')
      this.gettingFolders = false
      this.totalAssetsCount = 0
      this.totalFoldersCount = this.folderList.length
    },
    async getData() {
      this.subFolders = []
      this.files = []
      this.noMoreData = false
      this.selectNone()

      if (!this.hashParam) {
        this.$store.dispatch('dam/columnViews/clear', { from: 0 })
        await this.getFolders()
        this.subFolders = makeFolder(this.folderList)
      } else if (this.hashParam === 'search' && this.$route.params.hasFilters)
        await this.getSearchResult({ page: 1 })
      else if (this.isFolder) {
        await this.getFolderData()
      } else if (
        categories.includes(this.hashParam) ||
        this.hashParam === 'uncategorized'
      )
        return this.getCategoryItems()
      else
        return this.$router.replace({
          name: 'workspace_id-dam-folders',
          params: { workspace_id: this.$getWorkspaceId() },
        })
    },
    getCategoryItems() {
      if (this.loading || this.noMoreData) return
      this.loading = true
      const hashParam = this.hashParam
      const body = {
        page: this.page,
        sort_value: this.apiSortValue(),
        sort_by: this.sorting.toolbar.desc ? 'DESC' : 'ASC',
        workspace_id: this.$getWorkspaceId(),
        type: this.hashParam,
        total_record: 50,
      }
      if (this.page === 1) {
        this.files = []
      }

      this.$axios
        .$post(
          'digital-assets/dashboard/view-all-assets-by-type?' +
            this.$toQueryString(body),
          body
        )
        .then(({ data: { data, current_page, last_page, total } }) => {
          if (this.hashParam !== hashParam) return
          this.files.push(...data)
          this.page++
          this.totalAssetsCount = total
          this.totalFoldersCount = 0
          this.noMoreData = this.files.length >= total
        })
        .catch(this.$errorToast)
        .finally(() => {
          this.loading = false
        })
    },
    onToolbarSort(args) {
      if (this.noMoreData || !this.hashParam)
        args.forEach((arg) => this.sort(...arg))
      else if (categories.includes(this.hashParam)) {
        this.sorting.toolbar.desc = !this.sorting.toolbar.desc
        this.page = 1
        this.getCategoryItems()
      } else if (this.hashParam === 'search') {
        this.page = 1
        this.sorting.toolbar.desc = !this.sorting.toolbar.desc
        this.getSearchResult()
      } else {
        this.sorting.toolbar.desc = !this.sorting.toolbar.desc
        if (this.mode === 'columnView') this.$refs.columnView.sortLast()
        else {
          this.page = 1
          this.loadResources()
        }
      }
    },
    getSearchResult(options) {
      if (this.loading || this.noMoreData) return
      this.loading = true
      const page = options?.page || this.page
      const params = {
        ...this.$route.params.searchRequestBody,
        page,
      }
      params.sort_value = params.sort_value || this.apiSortValue()
      params.sort_by =
        params.sort_by || this.sorting.toolbar.desc ? 'DESC' : 'ASC'
      if (page === 1) this.files = []
      this.$axios
        .$post('digital-assets/dashboard/search-assets', params)
        .then(({ data }) => {
          if (data && data.data) {
            this.files.push(...data.data)
            if (!data.data.length || this.files.length === data.total)
              this.noMoreData = true
            this.page++
            this.totalAssetsCount = data.total
            this.totalFoldersCount = 0
          } else {
            this.totalAssetsCount = 0
            this.totalFoldersCount = 0
          }
        })
        .catch(this.$errorToast)
        .finally(() => {
          this.loading = false
        })
    },

    loadResources() {
      if (
        isNaN(parseInt(this.hashParam)) ||
        this.noMoreData ||
        this.mode === 'columnView'
      )
        return
      this.loading = true
      const params = {
        sort_value: this.apiSortValue(),
        sort_by: this.sorting.toolbar.desc ? 'DESC' : 'ASC',
        workspace_id: this.$getWorkspaceId(),
        category_id: this.hashParam,
        page: this.page,
      }
      if (this.page === 1) {
        this.files = []
        this.subFolders = []
      }
      this.$axios
        .$get('digital-assets/category/view-files-with-category', {
          params,
        })
        .then(({ data }) => {
          if (data && data.assets_with_folder) {
            this.breadcrumb = data.breadcrumb
            const files = data?.assets_with_folder?.data?.filter((e) =>
              Object.prototype.hasOwnProperty.call(e, 'display_file_name')
            )
            const folders = data?.assets_with_folder?.data?.filter(
              (e) =>
                !Object.prototype.hasOwnProperty.call(e, 'display_file_name')
            )
            if (this.page === 1) {
              this.subFolders = []
              this.files = []
            }
            this.totalAssetsCount = data.totalCounts.assets
            this.totalFoldersCount = data.totalCounts.folders
            let isSameParent = true
            if (folders.length)
              isSameParent =
                parseInt(folders[0].parent_id) === parseInt(this.hashParam)
            else if (files.length)
              isSameParent =
                parseInt(files[0].category_id) === parseInt(this.hashParam)
            if (isNaN(parseInt(this.hashParam)) || !isSameParent) {
              return
            }
            const existing = [
              ...this.subFolders.map((e) => e.id),
              ...this.files.map((e) => e.id),
            ]
            folders.forEach((e) => {
              if (!existing.includes(e.id)) {
                this.subFolders.push(e)
              }
            })
            files.forEach((e) => {
              if (!existing.includes(e.id)) {
                this.files.push(e)
              }
            })
            this.page++
            if (!folders.length && !files.length) this.noMoreData = true
            if (
              this.subFolders.length + this.files.length ===
              data?.assets_with_folder?.total
            )
              this.noMoreData = true
          }
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.loading = false
        })
    },
    async getFolderData() {
      if (
        !this.inCategory &&
        this.isTrash === -1 &&
        this.hashParam !== 'uncategorized'
      ) {
        this.noMoreData = false
        this.page = 1
        await this.loadResources()
      }
    },
    handelScrollAssets(e) {
      const el = e?.target
      if (this.loading || !el || !this.hashParam) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      if (scrollPercent > 60) {
        if (this.hashParam === 'search') {
          this.getSearchResult()
        } else if (categories.includes(this.hashParam)) {
          this.getCategoryItems()
        } else this.loadResources()
      }
    },
  },
}
</script>

<style>
.folder-transition-move {
  transition: transform 240ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.folder-transition-enter {
  transform: translateY(100%);
  opacity: 0;
}
.folder-transition-leave {
  transform: translateY(0);
  opacity: 1;
}
.folder-transition-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.folder-transition-leave-active {
  transition: none;
}
.folder-transition-enter-active {
  transition: transform 240ms cubic-bezier(0.165, 0.84, 0.44, 1) !important;
}
</style>
