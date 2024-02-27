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
        <breadcrumb
          class="filter-left"
          style="padding: 10px 20px; display: flex; align-items: center"
          :breadcrumbs="breadcrumbs.map((e) => ({ name: e.name, path: e.id }))"
          @breadcrumb-click="handleBreadcrumbClick"
        >
          <template #item_0="{ item }">
            <li>
              <a
                class="home-icon"
                @click.stop="handleBreadcrumbClick(item, true)"
              >
                <img
                  src="~/assets/img/google-drive.svg"
                  width="18"
                  :style="{ verticalAlign: 'middle' }"
                />
              </a>
            </li>
          </template>
        </breadcrumb>
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
            :disabled="fetchingFiles || !canMove()"
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
import Breadcrumb from './../dropbox-breadcrumb.vue'
import EmptyState from '@/components/theme/global/EmptyState'
export default {
  components: { ContentLoader, EmptyState, Breadcrumb },
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
    access_token: { type: String, default: null },
    refresh_token: { type: String, default: null },
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
    }
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
    onScroll(e) {
      // const el = e.target
      // if (!el) return
      // const scrollPercent =
      //   (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      // if (scrollPercent > 80 && this.hasMore) {
      //   // this.getFoldersNext()
      // }
    },
    canMove() {
      return true // !this.fileData.parents?.includes(this.cwd)
    },
    moveFile() {
      if (this.moveProgress) return
      this.moveProgress = true

      axios
        .post(
          '/driveapi/move',
          {
            fileId: this.fileData.id,
            fileName: this.fileData.name,
            oldParents: this.fileData.parents?.length
              ? [...this.fileData.parents]
              : [],
            newParents: [this.cwd],
          },
          {
            headers: {
              access_token: this.access_token,
              refresh_token: this.refresh_token,
            },
          }
        )
        .then((_) => {
          this.$emit('moved', this.cwd)
          this.$refs.closeBtn.click()
          this.$toast.global.success(
            `${
              this.fileData?.mimeType === 'application/vnd.google-apps.folder'
                ? 'Folder'
                : 'File'
            } moved successfully.`
          )
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => {
          this.moveProgress = false
        })
    },
    copyFile() {
      if (this.moveProgress) return
      this.moveProgress = true

      axios
        .post(
          '/driveapi/copy',
          {
            fileId: this.fileData.id,
            fileName: this.fileData.name,
            oldParents: this.fileData.parents?.length
              ? [...this.fileData.parents]
              : [],
            newParents: [this.cwd],
          },
          {
            headers: {
              access_token: this.access_token,
              refresh_token: this.refresh_token,
            },
          }
        )
        .then((_) => {
          this.$emit('moved', this.cwd)
          this.$refs.closeBtn.click()
          this.$toast.global.success(
            `${
              this.fileData?.mimeType === 'application/vnd.google-apps.folder'
                ? 'Folder'
                : 'File'
            } copied successfully.`
          )
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => {
          this.moveProgress = false
        })
    },
    onClose() {
      this.$emit('update:open', false)
    },
    switchFolder(folder) {
      this.cwd = folder.id
      this.folders = []
      this.getFolders()
    },
    getFolders() {
      if (this.fetchingFiles) return
      this.fetchingFiles = true
      const access_token = this.access_token
      const refresh_token = this.refresh_token
      axios
        .get('/driveapi/list', {
          params: {
            mimeType: 'application/vnd.google-apps.folder',
          },
          headers: {
            access_token,
            refresh_token,
            parent: this.cwd,
          },
        })
        .then(({ data: { files = [], breadcrumbs = [] } = {} }) => {
          this.folders = files.filter((e) => e.id !== this.fileData.id)
          this.breadcrumbs = breadcrumbs
        })
        .catch((e) => this.$toast.error(e))
        .finally(() => {
          this.fetchingFiles = false
        })
    },
    handleBreadcrumbClick(breadcrumb, isRoot) {
      this.cwd = isRoot ? '' : breadcrumb.path
      this.folders = []
      this.getFolders()
    },
  },
}
</script>
<style scoped>
.breadcrumb-links ul li:nth-of-type(2) {
  padding-left: 0;
}
.breadcrumb-links ul li:nth-of-type(2)::before {
  content: none;
  display: none;
}
</style>
