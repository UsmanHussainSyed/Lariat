<template>
  <div
    class="body-content dam-container msg-added"
    :class="{ 'uncategorized-msg': selectedFiles.length === files.length }"
  >
    <div class="success-msg">
      <div class="alert alert-warning">
        Please select a folder below or it will be moved into your default
        “<strong>Uncategorized</strong>” folder.
      </div>
    </div>
    <div class="bulk-sec w-100">
      <div class="row h-100">
        <div class="col-lg-7 col-xl-8 h-100 bulk-left">
          <div
            class="common-box-header"
            :style="loading ? 'pointer-events:none;opacity:0' : ''"
          >
            <div class="filter-left">
              <ul>
                <li>
                  <label id="selectall" class="check-label">
                    Select
                    <input
                      type="checkbox"
                      name=""
                      :checked="selectedAll"
                      @click="selectAll"
                    />
                    <span class="check-span"></span>
                  </label>
                </li>
                <li v-if="selectedFileCount">
                  <a
                    :disabled="deleting"
                    @click="!deleting && $refs.deleteDialog.show()"
                  >
                    <svg
                      id="Layer_1"
                      class="delete-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 15.3 18"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4351"
                        transform="translate(-443.472 -147.331)"
                      >
                        <path
                          id="Path_3410"
                          class="fill-color"
                          d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                        ></path>
                        <path
                          id="Path_3411"
                          class="fill-color"
                          d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                        ></path>
                      </g>
                    </svg>
                    Delete
                  </a>
                </li>
                <li v-if="selectedFileCount">
                  <a @click="$refs.moveDialog.show()">
                    <svg
                      id="Layer_1"
                      class="move-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g
                        id="Group_4355"
                        transform="translate(-741.322 -145.174)"
                      >
                        <path
                          id="Path_3418"
                          class="fill-color"
                          d="M744.6,157.4c-0.2,0-0.4-0.1-0.6-0.2l-2.5-2.5c-0.3-0.3-0.3-0.8,0-1.1l2.5-2.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-1.9,1.9l1.9,1.9c0.3,0.3,0.3,0.8,0,1.1C745,157.3,744.8,157.4,744.6,157.4z"
                        ></path>
                        <path
                          id="Path_3419"
                          class="fill-color"
                          d="M747.9,149.2c-0.2,0-0.4-0.1-0.6-0.2c-0.3-0.3-0.3-0.8,0-1.1l2.5-2.5c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l2.5,2.5c0.3,0.3,0.3,0.8,0,1.1c-0.3,0.3-0.8,0.3-1.1,0l-1.9-1.9l-1.9,1.9C748.3,149.1,748.1,149.2,747.9,149.2z"
                        ></path>
                        <path
                          id="Path_3420"
                          class="fill-color"
                          d="M750.3,163.2c-0.2,0-0.4-0.1-0.6-0.2l-2.5-2.5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l1.9,1.9l1.9-1.9c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-2.5,2.5C750.7,163.1,750.5,163.2,750.3,163.2z"
                        ></path>
                        <path
                          id="Path_3421"
                          class="fill-color"
                          d="M756.1,157.4c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l1.9-1.9l-1.9-1.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l2.5,2.5c0.3,0.3,0.3,0.8,0,1.1l-2.5,2.5C756.5,157.3,756.3,157.4,756.1,157.4z"
                        ></path>
                        <path
                          id="Path_3422"
                          class="fill-color"
                          d="M742.1,155c-0.4,0-0.8-0.4-0.8-0.8c0-0.4,0.4-0.8,0.8-0.8h16.4c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8H742.1z"
                        ></path>
                        <path
                          id="Path_3423"
                          class="fill-color"
                          d="M750.3,163.2c-0.4,0-0.8-0.4-0.8-0.8V146c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v16.4C751.1,162.8,750.8,163.2,750.3,163.2z"
                        ></path>
                      </g>
                    </svg>
                    Move to
                  </a>
                </li>
              </ul>
            </div>
            <div class="table-filter">
              <ul>
                <li>
                  <div class="search-by small-wd">
                    <Select2
                      :value="intialCount"
                      :disabled="deleting"
                      :options="assetCountOptions"
                      :attrs="{ minimumResultsForSearch: -1 || loading }"
                      @input=";(currentPage = 1) && fetchUploads()"
                    />
                  </div>
                </li>
                <li>
                  {{ filesData.from }}-{{ filesData.to }} of
                  {{ filesData.total }}
                </li>
                <li>
                  <div class="pagination-button">
                    <a
                      class="left-btn"
                      :class="{ disabled: currentPage === 1 || loading }"
                      :style="
                        loading || currentPage === 1
                          ? 'pointer-events: none'
                          : ''
                      "
                      @click="
                        () => {
                          if (!loading && currentPage > 1) currentPage--
                        }
                      "
                    >
                      <svg
                        id="Layer_1"
                        class="arrow-left-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Group_4475" transform="translate(-871 -421)">
                          <rect
                            id="Rectangle_3013"
                            x="871"
                            y="421"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <g
                            id="Icon_feather-chevron-down"
                            transform="translate(581.631 103.451)"
                          >
                            <path
                              id="Path_3433"
                              class="fill-color"
                              d="M301.9,334.3c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l7-7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-6.5,6.5l6.5,6.5c0.3,0.3,0.3,0.8,0,1.1C302.3,334.2,302.1,334.3,301.9,334.3z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                    <a
                      class="right-btn"
                      :class="{
                        disabled: currentPage >= filesData.last_page || loading,
                      }"
                      :style="
                        loading || currentPage >= filesData.last_page
                          ? 'pointer-events: none'
                          : ''
                      "
                      @click="
                        () => {
                          if (!loading && currentPage < filesData.last_page)
                            currentPage++
                        }
                      "
                    >
                      <svg
                        id="Layer_1"
                        class="arrow-right-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Group_4476" transform="translate(-921 -421)">
                          <rect
                            id="Rectangle_3014"
                            x="921"
                            y="421"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <g
                            id="Icon_feather-chevron-down"
                            transform="translate(925.75 422.25)"
                          >
                            <path
                              id="Path_3433"
                              class="fill-color"
                              d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="
              selectedFiles.length &&
              selectedFiles.length === filesData.data.length
            "
            class="success-msg"
          >
            <div v-if="!entireList" class="alert alert-info text-center">
              All {{ filesData.data.length }} assets on this page are selected.
              <a
                v-if="selectedFiles.length < filesData.total"
                style="cursor: pointer; text-decoration: underline"
                @click="entireList = true"
                >Select all {{ filesData.total }} assets.</a
              >
            </div>
            <div v-if="entireList" class="alert alert-info text-center">
              All {{ filesData.total }} asset(s) are selected.
              <a
                style="cursor: pointer; text-decoration: underline"
                @click="clearSelection"
                >Clear selection</a
              >
            </div>
          </div>
          <div class="common-box bg-gray table-list-scrolling scrolling">
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
                <rect x="0" y="7" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="53" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="99" rx="4" ry="4" width="450" height="40" />
                <rect x="0" y="145" rx="4" ry="4" width="450" height="40" />
              </ContentLoader>
            </div>
            <div v-else class="customscrollbar">
              <transition-group
                tag="div"
                class="uploaded-list p0 tbody"
                name="slide-up"
              >
                <UploadedListItem
                  v-for="file in filesData.data"
                  :ref="`recentFile-${file.id}`"
                  :key="file.id"
                  :file="file"
                  :multi-deleting="deleting"
                  :multi-moving="moving"
                  :selected="selection[file.id]"
                  :access-control-list="accessControlList"
                  @click:toggleSelection="onSelectionChanged"
                  @moveUncatg="fetchUploads()"
                  @update-acl="onAclUpdate(file, $event)"
                  @removed="onItemRemoved"
                />
              </transition-group>
            </div>
          </div>
        </div>

        <div class="col-lg-5 col-xl-4 h-100 bulk-right">
          <div class="table-list-view h-100">
            <h3>Apply to selected files</h3>
            <div class="bg-gray common-box table-list-scrolling">
              <div class="customscrollbar h-100">
                <div class="tbody">
                  <template v-if="selectedFileCount">
                    <h4>
                      Common tags in
                      {{ entireList ? filesData.total : selectedFileCount }}
                      uploaded file<template v-if="selectedFileCount > 1"
                        >s</template
                      >.
                    </h4>
                    <FileTagInput
                      name-id="commonTags"
                      :value="commonTags"
                      :file-ids="
                        entireList
                          ? 'all'
                          : selectedFiles.map(({ id, assets_version_id }) => ({
                              id,
                              assets_version_id,
                            }))
                      "
                      class="tag-add-box bg-white"
                      @addedTag="addTagToFiles"
                      @removedTag="removeTagFromFiles"
                    />
                    <h4>Common bulk actions</h4>
                    <div class="box bg-white">
                      <ul class="overview-table">
                        <li>
                          <span
                            >Permission
                            <i
                              v-tooltip="{
                                html: true,
                                content: `<ul>
                                    <li>
                                      <strong>PUBLIC:</strong> This image can be used per the brand’s licensing guidelines and shared publicly as needed.
                                    </li>
                                    <li>
                                        <strong>PRIVATE:</strong> This image is for internal use only and may require credit per the brand’s licensing guidelines and may not be shared without specific permissions.
                                    </li>
                                        </ul>`,
                              }"
                              class="fa fa-info-circle"
                              aria-hidden="true"
                            ></i
                          ></span>
                          <span>
                            <label
                              v-tooltip="
                                privateCustomizationAllowed
                                  ? ''
                                  : 'Please upgrade your subscription plan to enable this feature.'
                              "
                              class="label-switch justify-content-end"
                              data-toggle="modal"
                              data-target="#permission"
                            >
                              <span>: Public</span>
                              <input
                                v-model="isPublic"
                                type="checkbox"
                                class="switch-onoff switch"
                                value="1"
                                :disabled="!privateCustomizationAllowed"
                                :style="
                                  privateCustomizationAllowed
                                    ? ''
                                    : 'pointer-events: none'
                                "
                                @change="
                                  privateCustomizationAllowed
                                    ? changePublic($event, 'is_public')
                                    : ''
                                "
                              />
                              <span
                                class="lable"
                                :style="
                                  privateCustomizationAllowed
                                    ? ''
                                    : 'opacity:0.4'
                                "
                              ></span>
                            </label>
                          </span>
                        </li>
                        <li>
                          <span
                            >Licensing
                            <i
                              v-tooltip="
                                'This image cannot be used for commercial advertising purposes.'
                              "
                              class="fa fa-info-circle"
                              aria-hidden="true"
                            ></i
                          ></span>
                          <span>
                            <label class="label-switch justify-content-end">
                              <span>: Editorial Use Only</span>
                              <input
                                v-model="isEditorial"
                                type="checkbox"
                                class="switch-onoff switch"
                                name="editorial"
                                value="1"
                                @change="
                                  changePublic($event, 'is_editorial_use')
                                "
                              />
                              <span class="lable"></span>
                            </label>
                          </span>
                        </li>
                        <li
                          v-if="accessControlList.length"
                          style="align-items: start"
                        >
                          <span>ACL Permission</span>
                          <span
                            >:
                            <div class="access-control">
                              <label
                                v-for="access in selectedACL"
                                :key="access.id"
                                class="label-switch justify-content-end"
                              >
                                <span>{{ access.name }}</span>
                                <input
                                  :checked="access.is_active"
                                  type="checkbox"
                                  class="switch-onoff switch"
                                  name="sales"
                                  value="1"
                                  @click.prevent.stop="
                                    changeACL($event, access)
                                  "
                                />
                                <span class="lable"></span>
                              </label>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </template>
                  <div
                    class="common-box h-auto pb-0 category-list"
                    :class="{ pt0: !selectedFileCount }"
                  >
                    <h4 class="d-flex">
                      <span> Select Folder </span>
                      <div class="flex-grow-1"></div>
                      <nuxt-link
                        class="btn btn-gray"
                        :class="{ 'btn-disable': moving }"
                        style="white-space: nowrap; align-items: center"
                        :disabled="moving"
                        :to="{
                          query: { ...$route.query, createFolder: true },
                          hash: $route.hash,
                        }"
                        replace
                      >
                        New Folder
                      </nuxt-link>
                    </h4>
                    <h6 style="transform: translateY(-12px)">
                      Move
                      <strong>{{
                        entireList ? filesData.total : filesToMove.length
                      }}</strong>
                      File<template v-if="filesToMove.length > 1">s</template
                      ><template v-if="folderName">
                        to {{ folderName }}</template
                      >.
                    </h6>
                    <FolderList
                      ref="folderList"
                      v-model="selectedFolderId"
                      style="transform: translateY(-8px)"
                      class="px-0"
                      selection-mode
                    />
                  </div>
                </div>
              </div>
              <div v-if="!showNewFolderButton" class="tfooter bg-gray">
                <div class="row no-gutters">
                  <button
                    type="button"
                    class="btn"
                    :class="{
                      'btn-disabled':
                        (!selectedFolderId && !selectedFileCount) ||
                        (!selectedFolderId && selectedFileCount) ||
                        moving ||
                        deleting,
                    }"
                    :disabled="
                      (!selectedFolderId && !selectedFileCount) ||
                      (!selectedFolderId && selectedFileCount) ||
                      moving ||
                      deleting
                    "
                    @click="moveFile"
                  >
                    <template v-if="!selectedFolderId">Select folder</template>
                    <template v-else-if="moving">
                      <i class="fa fa-circle-o-notch fa-spin"></i>
                      &nbsp; Moving...
                    </template>
                    <template v-else>
                      Move
                      <template v-if="filesToMove.length > 1">
                        ({{
                          entireList ? filesData.total : filesToMove.length
                        }}) items
                      </template>
                      here
                    </template>
                  </button>
                  <nuxt-link
                    :to="`/${$getWorkspaceId()}/dam/upload`"
                    class="btn btn-gray"
                    :class="{
                      'btn-disabled': moving || deleting,
                    }"
                    :disabled="moving || deleting"
                  >
                    Cancel
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <client-only>
      <NewFolderDialog ref="dialog" />
      <MoveFolderDialog
        ref="moveDialog"
        :files-to-move="selectedFiles"
        :marked-all-count="
          entireList && filesData.total > selectedFiles.length
            ? filesData.total
            : 0
        "
        @moveUncatg="
          selectedFolderId = ($event || {}).id
          fetchUploads()
        "
      >
      </MoveFolderDialog>
      <DeleteDialog ref="deleteDialog" @button:yes="deleteSelectedFiles">
        Are you sure you want to delete
        <strong v-if="!entireList">{{ selectedFileCount }} selected </strong>
        <strong v-else>all {{ filesData.total }}</strong> file<template
          v-if="selectedFileCount > 1"
          >s</template
        >?
      </DeleteDialog>
    </client-only>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import Select2 from '~/components/plugins/Select2'
import fileSelection from '~/mixins/fileSelection'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import FolderList from '~/components/dam/FolderList'
import FileTagInput from '~/components/dam/FileTagInput'
import UploadedListItem from '~/components/dam/UploadedListItem'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
import NewFolderDialog from '~/components/dam/Dialogs/NewFolderDialog'

export default {
  components: {
    ContentLoader,
    Select2,
    NewFolderDialog,
    MoveFolderDialog,
    FileTagInput,
    FolderList,
    UploadedListItem,
    DeleteDialog,
  },
  mixins: [fileSelection],
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  data() {
    return {
      accessControlList: [],
      filesData: {},
      currentPage: 1,
      moving: false,
      deleting: false,
      loading: false,
      commonTags: [],
      processingTags: false,
      parentFolder: null,
      selectedFolderId: null,
      test: [],
      assetCountOptions: [
        { text: '25', id: '25' },
        { text: '50', id: '50' },
      ],
      intialCount: '25',
      selectedAll: false,
      entireList: false,
      selectedACL: [],
      aclsMarkedForAll: [],
    }
  },
  computed: {
    privateCustomizationAllowed() {
      return !!this.$auth.user?.subscription_features
        .public_and_private_asset_customisation?.enable
    },
    isPublic() {
      if (!this.privateCustomizationAllowed) return true
      const publicFiles = this.selectedFiles.filter((e) => e.is_public)
      return publicFiles.length === this.selectedFiles?.length
    },
    isEditorial() {
      const editorials = this.selectedFiles.filter((e) => e.is_editorial_use)
      return editorials?.length === this.selectedFiles?.length
    },
    showNewFolderButton() {
      const { folderList, foldersLoading } = this.$store.state.dam
      return !foldersLoading && !folderList?.length
    },
    selectedFileCount() {
      return this.selectedFiles?.length
    },
    fileCount() {
      return this.files?.length
    },
    files() {
      return this.$store.state.dam.recentlyUploadedFiles
    },
    folderName() {
      return (this.selectedFolder || this.parentFolder || {}).folder_name
    },
    folderList() {
      return this.$store.state.dam.folderList
    },
    selectedFolder() {
      if (!this.selectedFolderId || this.selectedFolderId === 0) return null

      return this.$deepSearch(
        this.folderList,
        'id',
        (_, id) => this.selectedFolderId === id
      )
    },
    filesToMove() {
      return [...(this.selectedFiles?.length ? this.selectedFiles : this.files)]
    },
  },
  watch: {
    currentPage: {
      handler(page) {
        if (page > this.filesData.last_page) return
        this.fetchUploads()
      },
      deep: true,
      immediate: true,
    },
    entireList(n) {
      if (n && this.selectedFiles?.length < this.filesData.total) {
        this.commonTags = []
        this.selectedACL.forEach((e) => (e.is_active = 0))
      }
      if (!n) this.aclsMarkedForAll = []
    },
    selectedFiles(selectedFiles) {
      if (this.selectedFileCount === 0) this.commonTags = []
      else {
        const map = {}
        selectedFiles.forEach(({ id }) => {
          this.$refs[`recentFile-${id}`][0]
            .getTags()
            .forEach(({ tag_name }) => {
              if (map[tag_name]) map[tag_name] += 1
              else map[tag_name] = 1
            })
        })
        this.commonTags = Object.entries(map).reduce((array, [text, count]) => {
          if (count === selectedFiles?.length) {
            array.push({
              tag_name: decodeURI(text),
              id: decodeURI(text),
              text: decodeURI(text),
            })
          }
          return array
        }, [])
      }
      this.updateCommonACL()
    },
    files(n) {
      this.selectedFiles = this.selectedFiles || []

      if (this.fileCount === 0) {
        if (this.currentPage > 1) this.currentPage--
        else if (this.selectedFolderId)
          this.$router
            .replace({
              name: 'workspace_id-dam-folders',
              params: { workspace_id: this.$getWorkspaceId() },
              hash: `#${this.selectedFolderId}`,
            })
            .catch(() => {})
        else
          this.$router
            .replace({
              name: 'workspace_id-dam-upload',
              params: { workspace_id: this.$getWorkspaceId() },
            })
            .catch(() => {})
      } else this.selectedFolderId = null
      Object.assign(this.filesData, 'data', n)
    },
  },
  mounted() {
    this.$axios.get(
      `/digital-assets/update-recent-uploaded?workspace_id=${this.$getWorkspaceId()}`
    )
    this.fetchACLs()
    // this.fetchUploads()
  },
  methods: {
    async fetchUploads() {
      if (this.loading) return
      this.loading = true
      const items = (
        await this.$axios.$get('digital-assets/get-recent-uploaded', {
          params: {
            total_record: 25,
            page: this.currentPage,
            workspace_id: this.$getWorkspaceId(),
          },
        })
      ).data
      items.data.forEach((item) => {
        item.activeACL = this.accessControlList.map((acl) => ({
          ...acl,
          is_active: (item.acl_permission || []).includes(acl.id),
        }))
      })
      this.filesData = items
      this.loading = false
    },
    async fetchACLs() {
      this.accessControlList = (
        await this.$axios.$get(`digital-assets/acl/list?type=active`)
      ).data
    },
    onSelectionChanged(file) {
      this.toggleSelection(file)
      this.selectedAll =
        this.filesData?.data?.length === this.selectedFiles?.length
      this.entireList =
        this.entireList &&
        !!this.selectedAll &&
        this.selectedFiles.length < this.filesData.total
    },
    updateCommonACL() {
      if (!this.selectedFileCount) return []
      const updatedFiles = this.files.filter(({ id }) =>
        this.selectedFiles.find((e) => e.id === id)
      )
      const aggregatedACL = updatedFiles.map((e) =>
        e.activeACL.filter(({ is_active }) => !!is_active).map(({ id }) => id)
      )
      this.selectedACL = this.accessControlList.map((acl) => {
        return {
          ...acl,
          is_active: this.entireList
            ? this.aclsMarkedForAll.includes(acl.id)
            : aggregatedACL.every((e) => e.includes(acl.id)),
        }
      })
    },
    async onAclUpdate(file, { aclId, value }) {
      file = JSON.parse(JSON.stringify(file))
      const acl = file.activeACL
      acl.find((e) => e.id === aclId).is_active = value
      file.activeACL = acl

      if (!value) {
        this.aclsMarkedForAll = this.aclsMarkedForAll.filter((e) => aclId !== e)
      }
      const filesData = (
        await this.$axios.$get('digital-assets/get-recent-uploaded', {
          params: {
            total_record: parseInt(this.filesData.per_page),
            page: this.currentPage,
            workspace_id: this.$getWorkspaceId(),
          },
        })
      ).data
      await filesData.data.forEach((data) => {
        data.activeACL = this.accessControlList.map((acl) => ({
          ...acl,
          is_active: (data.acl_permission || []).includes(acl.id),
        }))
      })
      this.filesData = filesData
      this.updateCommonACL()
    },
    changeACL(e, acl) {
      e.preventDefault()
      e.stopPropagation()
      const field_value = !acl.is_active
        ? { add_permission: [acl.id] }
        : { remove_permission: [acl.id] }

      this.$axios
        .$post(`digital-assets/update-acl`, {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.entireList
            ? 'all'
            : this.selectedFiles.map((e) => e.id),
          field_value,
        })
        .then(async (response) => {
          const filesData = (
            await this.$axios.$get('digital-assets/get-recent-uploaded', {
              params: {
                total_record: parseInt(this.filesData.per_page),
                page: this.currentPage,
                workspace_id: this.$getWorkspaceId(),
              },
            })
          ).data
          if (this.entireList) {
            if (!acl.is_active && !this.aclsMarkedForAll.includes(acl.id))
              this.aclsMarkedForAll.push(acl.id)
            if (acl.is_active)
              this.aclsMarkedForAll = this.aclsMarkedForAll.filter(
                (e) => acl.id !== e
              )
          }
          await filesData.data.forEach((data) => {
            data.activeACL = this.accessControlList.map((acl) => ({
              ...acl,
              is_active: (data.acl_permission || []).includes(acl.id),
            }))
          })
          this.filesData = filesData
          this.updateCommonACL()
          this.$toast.global.success(response.message)
        })
    },
    changePublic(e, type) {
      if (type === 'is_public' && !this.privateCustomizationAllowed) return
      this.$axios
        .$post(`digital-assets/update-multiple-field`, {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.entireList
            ? 'all'
            : this.selectedFiles.map((e) => e.id),
          field_name: type,
          field_value: !!e.target.checked,
        })
        .then(async ({ message }) => {
          this.filesData = (
            await this.$axios.$get('digital-assets/get-recent-uploaded', {
              params: {
                total_record: parseInt(this.filesData.per_page),
                page: this.currentPage,
                workspace_id: this.$getWorkspaceId(),
              },
            })
          ).data
          this.filesData.data.forEach((data) => {
            data.activeACL = this.accessControlList.map((acl) => ({
              ...acl,
              is_active: (data.acl_permission || []).includes(acl.id),
            }))
          })
          this.$toast.global.success(message)
        })
        .catch((error) => this.$toast.global.error(error.message))
    },
    clearSelection() {
      this.selectedFiles = []
      this.selectedAll = false
      this.entireList = false
    },
    selectAll(ev) {
      this.selectedAll = !this.selectedAll
      this.entireList = false
      ev.target.checked
        ? (this.selectedFiles = [...this.filesData.data])
        : (this.selectedFiles = [])
    },
    async onItemRemoved(fileId) {
      const total_record = parseInt(this.filesData.per_page)
      const page = this.filesData.page
      this.filesData = (
        await this.$axios.$get('digital-assets/get-recent-uploaded', {
          params: {
            total_record,
            page,
            workspace_id: this.$getWorkspaceId(),
          },
        })
      ).data
      this.filesData.data.forEach((data) => {
        data.activeACL = this.accessControlList.map((acl) => ({
          ...acl,
          is_active: (data.acl_permission || []).includes(acl.id),
        }))
      })
    },
    async deleteSelectedFiles() {
      if (this.deleting) return

      this.deleting = true

      const files = [...this.selectedFiles]
      const fileIds = files.map(({ id }) => id)

      await this.$axios
        .$post('digital-assets/delete-file', {
          workspace_id: this.$getWorkspaceId(),
          assets_ids: this.entireList ? 'all' : fileIds,
        })
        .then(async () => {
          const total_record = parseInt(this.filesData.per_page)
          const page = this.filesData.page
          this.filesData = (
            await this.$axios.$get('digital-assets/get-recent-uploaded', {
              params: {
                total_record,
                page,
                workspace_id: this.$getWorkspaceId(),
              },
            })
          ).data
          this.filesData.data.forEach((data) => {
            data.activeACL = this.accessControlList.map((acl) => ({
              ...acl,
              is_active: (data.acl_permission || []).includes(acl.id),
            }))
          })
          this.clearSelection()
          this.$store.dispatch('dam/updateStorage')
        })
        .catch(this.$errorToast)

      this.deleting = false
    },
    addTagToFiles(tag) {
      this.selectedFiles.forEach(({ id }) =>
        this.$refs[`recentFile-${id}`][0].addTag(tag)
      )
    },
    removeTagFromFiles(tag) {
      this.selectedFiles.forEach(({ id }) =>
        this.$refs[`recentFile-${id}`][0].removeTag(tag)
      )
    },
    async moveFile() {
      if (this.moving || !this.selectedFolderId) return

      this.moving = true
      await this.$store
        .dispatch('dam/moveFilesToCategory', {
          parentFolderId: this.selectedFolderId,
          fileIds:
            this.entireList ||
            (this.filesData?.total && !this.filesToMove.length)
              ? 'all'
              : this.filesToMove.map(({ id }) => id),
        })
        .then(async () => {
          const total_record = parseInt(this.filesData.per_page)
          const page = this.filesData.page
          this.filesData = (
            await this.$axios.$get('digital-assets/get-recent-uploaded', {
              params: {
                total_record,
                page,
                workspace_id: this.$getWorkspaceId(),
              },
            })
          ).data
          this.filesData.data.forEach((data) => {
            data.activeACL = this.accessControlList.map((acl) => ({
              ...acl,
              is_active: (data.acl_permission || []).includes(acl.id),
            }))
          })
          this.clearSelection()
          this.active = false
        })

      this.moving = false
    },
  },
}
</script>

<style>
.slide-move {
  transition: transform 240ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-enter {
  transform: translateY(100%);
  opacity: 0;
}
.slide-leave {
  transform: translateY(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 240ms cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
