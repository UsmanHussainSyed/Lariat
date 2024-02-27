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
        <dropbox-breadcrumb
          :cwd="cwd"
          style="padding: 10px 20px; display: flex; align-items: center"
          :breadcrumbs="getBreadCrumbs()"
          @breadcrumb-click="handleBreadcrumbClick"
        >
          <template #item_0="{ item }">
            <li>
              <a
                style="display: flex; align-items: center"
                class="home-icon"
                @click.stop="handleBreadcrumbClick(item)"
              >
                <img src="~/assets/img/dropbox-blue.svg" width="18" />
              </a>
            </li>
          </template>
        </dropbox-breadcrumb>
        <div
          class="modal-body category-list"
          style="padding-top: 0"
          @scroll="onScroll"
        >
          <ul v-if="folders.length">
            <li v-for="folder in folders" :key="folder.id" class="folder-list">
              <div
                class="rename-text"
                @click.stop="switchFolder(folder.path_display)"
              >
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
          <empty-state v-if="!folders.length" dense class="h-100" />
        </div>
        <div class="modal-footer justify-content-start">
          <button
            type="button"
            class="btn"
            data-dismiss="modal"
            :disabled="!canMove()"
            @click.stop="moveFile"
          >
            {{ type === 'move' ? 'Move Here' : 'Copy Here' }}
          </button>
          <button
            type="button"
            class="btn btn-gray"
            data-dismiss="modal"
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
import DropboxBreadcrumb from './dropbox-breadcrumb'
import EmptyState from '@/components/theme/global/EmptyState'
export default {
  components: { EmptyState, DropboxBreadcrumb },
  middleware: [
    'authCheck',
    'checkWorkspace',
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
    dbx: { type: Object, default: null },
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
      const el = e.target
      if (!el) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      if (scrollPercent > 80 && this.hasMore) {
        this.getFoldersNext()
      }
    },
    canMove() {
      return (
        [this.cwd, this.fileData.name].join('/') !== this.fileData.path_display
      )
    },
    moveFile() {
      this.moveProgress = true
      let to_path =
        this.cwd +
        '/' +
        this.fileData.name
          .split('/')
          .filter((e) => e)
          .join('/')
      const that = this
      to_path = to_path.startsWith('/') ? to_path : '/' + to_path
      const promise =
        this.type === 'move'
          ? this.dbx.filesMoveV2({
              from_path: this.fileData.path_display,
              to_path,
              autorename: true,
            })
          : this.dbx.filesCopyV2({
              from_path: this.fileData.path_display,
              to_path,
              autorename: true,
            })
      promise
        .then((res) => {
          that.$emit('moved', res)
          that.$refs.closeBtn.click()
          that.moveError = ''
          this.$toast.global.success(
            `${this.type === 'move' ? 'Moved' : 'Copied'} successfully.`
          )
        })
        .catch((e) => {
          that.moveError = e.error.error_summary
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => (this.moveProgress = false))
    },
    onClose() {
      this.$emit('update:open', false)
    },
    switchFolder(dest) {
      this.cwd = dest
      this.folders = []
      this.cursor = null
      this.hasMore = true
      this.getFolders()
    },
    async getFolders() {
      if (this.fetchingFiles) return
      this.fetchingFiles = true
      try {
        const response = await this.dbx.filesListFolder({
          path: this.cwd,
          limit: 25,
        })
        this.cursor = response.result.cursor
        this.folders = response.result.entries.filter(
          (e) => e['.tag'] === 'folder'
        )
        this.hasMore = response.result.has_more
        this.moveError = ''
        this.fetchingFiles = false
      } catch (e) {
        this.fetchingFiles = false
        this.cursor = null
        this.folders = []
        this.hasMore = false
        this.$toast.error(e)
        this.moveError = e.error
      }
    },
    async getFoldersNext() {
      if (this.fetchingFiles) return
      this.fetchingFiles = true
      try {
        const response = await this.dbx.filesListFolderContinue({
          cursor: this.cursor,
        })
        this.cursor = response.result.cursor
        this.folders.push(
          ...response.result.entries.filter((e) => e['.tag'] === 'folder')
        )
        this.hasMore = response.result.has_more
        this.moveError = ''
        this.fetchingFiles = false
      } catch (e) {
        this.fetchingFiles = false
        this.cursor = null
        this.folders = []
        this.hasMore = false
        this.moveError = e.error
        this.$toast.error(e)
      }
    },
    getBreadCrumbs() {
      const dirs = this.cwd.split('/').filter((e) => e)
      const n = [{ name: 'Home', path: '' }]
      dirs.forEach((v, i) => {
        n.push({ name: v, path: '/' + dirs.slice(0, i + 1).join('/') })
      })
      n[n.length - 1].leaf = true
      return n
    },
    handleBreadcrumbClick(breadcrumb) {
      if ((!breadcrumb.path && breadcrumb.name !== 'Home') || breadcrumb.leaf)
        return
      this.cwd = breadcrumb.path
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
