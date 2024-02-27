<template>
  <div id="move" class="modal" data-dismiss="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content bg-gray">
        <div class="modal-header">
          <h5
            id="exampleModalLongTitle"
            class="modal-title"
            style="max-width: calc(100% - 20px); display: flex"
          >
            {{ type === 'move' ? 'Move' : 'Copy' }} &quot;<span
              v-tooltip="{ html: false, content: fileData.name }"
              style="
                white-space: nowrap;
                max-width: calc(100% - 60px);
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ fileData.name }}</span
            >&quot;
          </h5>
          <button
            ref="closeBtn"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="onClose"
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
        </div>
        <div class="breadcrumb-links">
          <ul style="align-items: center">
            <h2
              v-if="parentDetails.id === '0' || !breadcrumbs.length"
              class="title"
              style="padding-left: 0px"
            >
              Box
            </h2>
            <template v-else>
              <li style="cursor: pointer">
                <a class="home-icon" @click.stop="handleBreadcrumbClick('0')">
                  <img alt="" src="~/assets/img/box.svg" width="24" />
                </a>
              </li>
              <li
                v-for="breadcrumb in breadcrumbs.slice(1)"
                :key="breadcrumb.id"
                style="cursor: pointer"
                @click.stop="handleBreadcrumbClick(breadcrumb.id)"
              >
                <span>{{ breadcrumb.name }}</span>
              </li>
              <li>
                <span>{{ parentDetails.name }}</span>
              </li>
            </template>
          </ul>
        </div>
        <div
          class="modal-body category-list"
          style="padding-top: 0"
          @scroll="onScroll"
        >
          <ContentLoader
            v-if="fetchingFiles"
            :speed="1"
            :animate="true"
            :height="6 * 50"
            width="100%"
            :style="{
              height: `${6 * 50}px`,
              width: '100%',
            }"
          >
            <rect
              v-for="i in 6"
              :key="i"
              x="0"
              :y="(i - 1) * 50 + 10"
              rx="0"
              ry="0"
              width="100%"
              height="40"
            />
          </ContentLoader>
          <ul v-else-if="folders.length">
            <li v-for="folder in folders" :key="folder.id" class="folder-list">
              <div class="rename-text" @click.stop="switchFolder(folder)">
                <a>
                  <img
                    src="~/assets/img/folder-icon-default.svg"
                    style="
                      position: absolute;
                      left: 10px;
                      top: 50%;
                      margin-top: -9px;
                    "
                  />
                  {{ folder.name }}
                </a>
              </div>
            </li>
          </ul>
          <empty-state v-else-if="!folders.length" dense class="h-100" />
        </div>
        <div class="modal-footer justify-content-start">
          <button
            type="button"
            class="btn"
            data-dismiss="modal"
            :disabled="fetchingFiles || !canMove"
            @click.stop="type === 'move' ? moveFile() : copyFile()"
          >
            {{ type === 'move' ? 'Move Here' : 'Copy Here' }}
          </button>
          <button
            type="button"
            class="btn btn-gray"
            data-dismiss="modal"
            :disabled="fetchingFiles"
            @click="onClose"
          >
            Cancel
          </button>
          <img
            v-show="moveProgress"
            :src="require('~/assets/img/loading.gif')"
            height="16"
            style="margin-left: 8px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import { mapGetters } from 'vuex'
// import Breadcrumb from './../dropbox-breadcrumb.vue'
import EmptyState from '@/components/theme/global/EmptyState'
export default {
  components: { ContentLoader, EmptyState },
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
    ({ redirect, params, query }) => {
      return redirect({
        name: 'workspace_id-dam-integrations',
        params,
        query,
      })
    },
  ],
  props: {
    open: { type: Boolean, default: false },
    path: { type: String, default: '' },
    fileData: { type: Object, default: null },
    type: { type: String, default: 'move' },
  },
  data() {
    return {
      folders: [],
      cwd: '',
      cursor: null,
      hasMore: true,
      moveError: '',
      fetchingFiles: false,
      moveProgress: false,
      breadcrumbs: [],
      offset: 0,
      total: 0,
      limit: 1000,
      parentDetails: {},
    }
  },
  computed: {
    ...mapGetters({
      BOX_USER: 'box/user',
      BOX_ACCESS_TOKEN: 'box/accessToken',
      BOX_REFRESH_TOKEN: 'box/refreshToken',
      BOX_ICON: 'box/icon',
      BOX_SESSION: 'box/session',
      BOX_ACCESSTOKEN_TTL_MS: 'box/accessTokenTTLMS',
      BOX_ACQUIRED_AT_MS: 'box/acquiredAtMS',
    }),
    canMove() {
      // const sameParent = this.fileData.parent.id === this.cwd
      return true // !sameParent
    },
  },
  watch: {
    path: {
      handler(n) {
        this.cwd = n
      },
      immediate: true,
    },
  },
  mounted() {
    this.getFolders()
  },
  methods: {
    /**
     * Scroll handler inside popup dialog
     */
    onScroll(e) {
      const el = e.target
      if (!el) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      if (scrollPercent > 80 && this.hasMore) {
        this.offset += this.limit
        this.getFolders()
      }
    },
    /**
     * Moves a file/folder to new location inside users Box
     */
    moveFile() {
      if (!this.canMove) return
      this.moveProgress = true

      axios
        .get('/box/move', {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            fileId: this.fileData.id,
            parent: this.cwd,
            fileType: this.fileData.type,
          },
        })
        .then((_) => {
          this.$emit('moved', this.cwd)
          this.$refs.closeBtn.click()
          this.$toast.global.success(
            `${
              this.fileData?.type === 'file' ? 'File' : 'Folder'
            } moved successfully.`
          )
        })
        .catch((e) => {
          if (e.response?.data?.statusCode === 409) {
            this.$toast.global.error(
              `An item named "${this.fileData.name}" already exists in "${this.parentDetails.name}"`
            )
          } else this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.moveProgress = false
        })
    },
    /**
     * Copies a file/folder to new location inside users Box
     */
    copyFile() {
      this.moveProgress = true

      axios
        .get('/box/copy', {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            fileId: this.fileData.id,
            parent: this.cwd,
            fileType: this.fileData.type,
          },
        })
        .then((_) => {
          this.$emit('moved', this.cwd)
          this.$refs.closeBtn.click()
          this.$toast.global.success(
            `${
              this.fileData?.type === 'file' ? 'File' : 'Folder'
            } copied successfully.`
          )
        })
        .catch((e) => {
          if (e.response?.data?.statusCode === 409) {
            this.$toast.global.error(
              `An item named "${this.fileData.name}" already exists in "${this.parentDetails.name}"`
            )
          } else this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.moveProgress = false
        })
    },
    /**
     * Handler for popup close
     */
    onClose() {
      this.$emit('update:open', false)
    },
    /**
     * Destination was changed during move/copy.
     * List contents in that location
     */
    switchFolder(folder) {
      if (this.cwd === folder.id) return
      this.cwd = folder.id
      this.folders = []
      this.offset = 0
      this.hasMore = true
      this.getFolders()
    },
    /**
     * List files & folders
     */
    getFolders() {
      if (this.fetchingFiles || !this.hasMore) return
      this.fetchingFiles = true
      axios
        .get('/box/list-files', {
          params: {
            accessToken: this.BOX_ACCESS_TOKEN,
            refreshToken: this.BOX_REFRESH_TOKEN,
            accessTokenTTLMS: this.BOX_ACCESSTOKEN_TTL_MS,
            acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
            parent: this.cwd,
            offset: this.offset,
            limit: this.limit,
            includeFields: [
              'id',
              'item_collection',
              'path_collection',
              'type',
              'name',
              'permissions',
            ].join(','),
          },
        })
        .then((r) => {
          this.parentDetails = r.data
          this.folders.push(
            ...r.data.item_collection.entries.filter((e) => {
              const ids = this.folders.map((f) => f.id)
              return (
                e.type === 'folder' &&
                !ids.includes(e.id) &&
                !ids.includes(this.fileData.id) &&
                e.id !== this.fileData.id
              )
            })
          )
          this.offset = r.data.item_collection.offset
          this.total = r.data.item_collection.total_count
          this.hasMore =
            this.offset + r.data.item_collection.entries.length < this.total
          this.breadcrumbs = r.data.path_collection.entries
        })
        .catch((e) => {
          this.hasMore = false
          this.$toast.error(e)
        })
        .finally(() => {
          this.fetchingFiles = false
        })
    },
    /**
     * Breadcrumb handler
     */
    handleBreadcrumbClick(parent) {
      if (parent === this.cwd) return
      this.cwd = parent
      this.offset = 0
      this.folders = []
      this.hasMore = true
      this.getFolders()
    },
  },
}
</script>
<style scoped>
.breadcrumb-links {
  padding: 0 20px;
  min-height: 38px;
  align-items: center;
  display: flex;
}
</style>
