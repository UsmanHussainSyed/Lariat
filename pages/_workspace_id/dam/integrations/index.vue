<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <!-- right part  -->
    <div v-if="$auth.loggedIn" class="main-right position-relative">
      <!-- Top Header -->
      <header class="header bg-gray" style="position: relative">
        <div class="header-left">
          <div v-if="headerSearchEnabled" class="main-search">
            <form class="main-search-inner">
              <svg
                id="Layer_1"
                class="search-icon"
                style="pointer-events: none"
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
                ></path>
              </svg>
              <input
                id="main-search"
                v-model="searchText"
                type="text"
                name="main-search"
                class="form-control"
                :placeholder="
                  $route.query.source === 'dropbox'
                    ? 'Search Dropbox'
                    : $route.query.source === 'google_drive'
                    ? 'Search Google Drive'
                    : 'Search Box'
                "
                autocomplete="off"
                @keyup.esc.stop="closeSearch"
              />
            </form>
          </div>
        </div>
        <div class="header-right">
          <ProfileDropDown />
        </div>
        <div
          class="filter-menu"
          :class="{ show: searchMenuActive }"
          style="max-width: 500px; padding: 0px"
        >
          <div class="search-box-header">
            <div v-show="(searchText || '').length" style="font-weight: 300">
              <span v-show="searchResults.length">{{
                searchResults.length
              }}</span
              ><template v-if="searchHasMore">+</template> Results for
              <b>{{ searchText }}</b>
            </div>
            <div style="flex-grow: 1"></div>
            <a class="filter-close" @click="searchMenuActive = false">
              <svg
                id="Layer_1"
                class="close-icon h-red"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
                height="14"
                width="14"
              >
                <g id="Group_4358" transform="translate(-69.745 -317.549)">
                  <path
                    id="Path_3424"
                    class="fill-color"
                    d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                  ></path>
                  <path
                    id="Path_3425"
                    class="fill-color"
                    d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                  ></path>
                </g>
              </svg>
            </a>
          </div>
          <div
            v-if="searchResultLoading"
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'calc(100% - 80px)',
              fontWeight: 300,
            }"
          >
            Searching ...
          </div>
          <template v-else-if="searchResults.length">
            <ul
              v-if="$route.query.source === 'dropbox'"
              class="customscrollbar"
              style="padding: 0; height: calc(100% - 35px)"
            >
              <li
                v-for="result in searchResults"
                :key="result.id"
                class="search-item"
                @click.stop="gotoFile(result)"
              >
                <img
                  :src="result.thumb"
                  width="24"
                  alt=""
                  style="margin-right: 8px"
                />
                <span v-html="result.html"></span>
                <div
                  v-if="relativePath(result.path_display).length"
                  v-tooltip="{
                    html: false,
                    content: 'in ' + relativePath(result.path_display),
                    delay: { show: 300, hide: 100 },
                  }"
                  class="search-item-path"
                >
                  {{ relativePath(result.path_display) }}
                </div>
              </li>
            </ul>
            <ul
              v-else-if="$route.query.source === 'google_drive'"
              class="customscrollbar"
              style="padding: 0; height: calc(100% - 35px)"
            >
              <li
                v-for="result in searchResults"
                :key="result.id"
                class="search-item"
                @click.stop="gotoDriveDirectory(result)"
              >
                <img
                  :ref="`imgthumb${result.id}`"
                  :src="getDriveFileThumb(result)"
                  width="24"
                  alt=""
                  style="margin-right: 8px"
                  @error="getDriveFileThumb(result, true)"
                />
                <span
                  ><span v-html="result.html"></span
                  ><i v-if="!result.ownedByMe" style="font-size: small"
                    >&nbsp;-&nbsp;Shared</i
                  ></span
                >
                <div
                  v-if="result.relativePath"
                  v-tooltip="{
                    html: false,
                    content: 'in ' + result.relativePath,
                    delay: { show: 300, hide: 100 },
                  }"
                  class="search-item-path"
                >
                  {{ result.relativePath }}
                </div>
              </li>
            </ul>
            <ul
              v-else-if="$route.query.source === 'box'"
              class="customscrollbar"
              style="padding: 0; height: calc(100% - 35px)"
            >
              <li
                v-for="result in searchResults"
                :key="result.id"
                class="search-item"
                @click.stop="gotoBox(result)"
              >
                <img
                  :src="
                    result.type === 'folder'
                      ? require('~/assets/img/folder-icon.svg')
                      : result.thumbnail ||
                        require('~/assets/img/file/general.svg')
                  "
                  width="24"
                  alt=""
                  style="margin-right: 8px"
                />
                <span v-html="result.html"></span>
                <div
                  v-if="result.relativePath"
                  v-tooltip="{
                    html: false,
                    content: 'in ' + result.relativePath,
                    delay: { show: 300, hide: 100 },
                  }"
                  class="search-item-path"
                >
                  {{ result.relativePath }}
                </div>
              </li>
            </ul>
          </template>
          <empty-state v-else />
        </div>
      </header>
      <!-- Main content -->
      <div class="body-content dam-container pl0 pr0 position-relative">
        <template v-if="!internalIntegrationEnabled">
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
        <ContentLoader
          v-if="loading"
          :class="{ 'common-blur': !internalIntegrationEnabled }"
          :speed="1"
          :animate="true"
          :height="6 * 70"
          width="100%"
          :style="{
            height: `${6 * 70}px`,
            width: 'calc(100% - 20px)',
            margin: '0 auto',
          }"
        >
          <rect
            v-for="i in 6"
            :key="i"
            x="0"
            :y="(i - 1) * 70 + 10"
            rx="0"
            ry="0"
            width="100%"
            height="60"
          />
        </ContentLoader>
        <template
          v-else-if="
            (DROPBOX_TOKEN && !DROPBOX_DISCONNECTED) ||
            (DRIVE_ACCESS_TOKEN && !DRIVE_DISCONNECTED) ||
            (BOX_ACCESS_TOKEN && !BOX_DISCONNECTED)
          "
        >
          <div
            class="body-content-left h-100"
            :class="{ 'common-blur': !internalIntegrationEnabled }"
          >
            <div class="common-box bg-gray h-100">
              <div class="customscrollbar">
                <div class="asset-overview p0">
                  <a
                    v-if="DROPBOX_TOKEN && !DROPBOX_DISCONNECTED"
                    :class="{ active: selectedSource === 'dropbox' }"
                    @click="selectedSource = 'dropbox'"
                  >
                    <div class="integration">
                      <img
                        :src="DROPBOX_ICON"
                        height="18"
                        style="vertical-align: middle"
                      />
                      <span style="color: #172b4d">DropBox</span>
                    </div>
                    <div class="integration d-flex">
                      <div class="w-50">
                        <div class="asset-text text-left">
                          <span>Usage</span>
                          <ContentLoader
                            v-if="!usedSpace"
                            :speed="1"
                            :animate="true"
                            :height="16"
                            width="100%"
                            :style="{
                              height: `${16}px`,
                              width: 'calc(100% - 5px)',
                              margin: '0 auto',
                              display: 'block',
                            }"
                          >
                            <rect
                              x="0"
                              y="0"
                              rx="0"
                              ry="0"
                              width="100%"
                              height="16"
                            />
                          </ContentLoader>
                          <strong v-else>{{ usedSpace }}</strong>
                        </div>
                      </div>
                      <div class="w-50">
                        <div class="asset-text">
                          <span>Available</span>
                          <ContentLoader
                            v-if="!allocatedSpace"
                            :speed="1"
                            :animate="true"
                            :height="16"
                            width="100%"
                            :style="{
                              height: `${16}px`,
                              width: 'calc(100% - 5px)',
                              margin: '0 auto',
                              display: 'block',
                            }"
                          >
                            <rect
                              x="0"
                              y="0"
                              rx="0"
                              ry="0"
                              width="100%"
                              height="16"
                            />
                          </ContentLoader>
                          <strong v-else>{{ allocatedSpace }}</strong>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    v-if="DRIVE_ACCESS_TOKEN && !DRIVE_DISCONNECTED"
                    :class="{ active: selectedSource === 'google_drive' }"
                    @click="selectedSource = 'google_drive'"
                  >
                    <div class="integration">
                      <img
                        :src="DRIVE_ICON"
                        height="18"
                        style="vertical-align: middle"
                      />
                      <span style="color: #172b4d">Google Drive</span>
                    </div>
                    <div class="integration d-flex">
                      <div class="w-50">
                        <div class="asset-text text-left">
                          <span>Usage</span>
                          <ContentLoader
                            v-if="!DRIVE_SESSION.storageQuota"
                            :speed="1"
                            :animate="true"
                            :height="16"
                            width="100%"
                            :style="{
                              height: `${16}px`,
                              width: 'calc(100% - 5px)',
                              margin: '0 auto',
                              display: 'block',
                            }"
                          >
                            <rect
                              x="0"
                              y="0"
                              rx="0"
                              ry="0"
                              width="100%"
                              height="16"
                            />
                          </ContentLoader>
                          <strong v-else>{{
                            getReadableSize(
                              parseInt(
                                (DRIVE_SESSION.storageQuota || {})
                                  .usageInDrive || 0
                              )
                            )
                          }}</strong>
                        </div>
                      </div>
                      <div class="w-50">
                        <div class="asset-text">
                          <span>Available</span>
                          <ContentLoader
                            v-if="!DRIVE_SESSION.storageQuota"
                            :speed="1"
                            :animate="true"
                            :height="16"
                            width="100%"
                            :style="{
                              height: `${16}px`,
                              width: 'calc(100% - 5px)',
                              margin: '0 auto',
                              display: 'block',
                            }"
                          >
                            <rect
                              x="0"
                              y="0"
                              rx="0"
                              ry="0"
                              width="100%"
                              height="16"
                            />
                          </ContentLoader>
                          <strong v-else>{{
                            getReadableSize(
                              parseInt(
                                (DRIVE_SESSION.storageQuota || {}).limit || 0
                              )
                            )
                          }}</strong>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    v-if="BOX_ACCESS_TOKEN && !BOX_DISCONNECTED"
                    :class="{ active: selectedSource === 'box' }"
                    @click="selectedSource = 'box'"
                  >
                    <div class="integration">
                      <img
                        :src="BOX_ICON"
                        height="18"
                        style="vertical-align: middle"
                      />
                      <span style="color: #172b4d">Box</span>
                    </div>
                    <div class="integration d-flex">
                      <div class="w-50">
                        <div class="asset-text text-left">
                          <span>Usage</span>
                          <ContentLoader
                            v-if="!BOX_SESSION.space_amount"
                            :speed="1"
                            :animate="true"
                            :height="16"
                            width="100%"
                            :style="{
                              height: `${16}px`,
                              width: 'calc(100% - 5px)',
                              margin: '0 auto',
                              display: 'block',
                            }"
                          >
                            <rect
                              x="0"
                              y="0"
                              rx="0"
                              ry="0"
                              width="100%"
                              height="16"
                            />
                          </ContentLoader>
                          <strong v-else>{{
                            getReadableSize(
                              parseInt((BOX_SESSION || {}).space_used || 0)
                            )
                          }}</strong>
                        </div>
                      </div>
                      <div class="w-50">
                        <div class="asset-text">
                          <span>Available</span>
                          <ContentLoader
                            v-if="!BOX_SESSION.space_amount"
                            :speed="1"
                            :animate="true"
                            :height="16"
                            width="100%"
                            :style="{
                              height: `${16}px`,
                              width: 'calc(100% - 5px)',
                              margin: '0 auto',
                              display: 'block',
                            }"
                          >
                            <rect
                              x="0"
                              y="0"
                              rx="0"
                              ry="0"
                              width="100%"
                              height="16"
                            />
                          </ContentLoader>
                          <strong v-else>{{
                            getReadableSize(
                              parseInt((BOX_SESSION || {}).space_amount || 0)
                            )
                          }}</strong>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <dropbox-viewer
            v-if="
              $route.query.source === 'dropbox' &&
              DROPBOX_TOKEN &&
              !DROPBOX_DISCONNECTED
            "
            ref="dropbox"
            :path="searchLocation"
          />
          <drive-viewer
            v-if="
              $route.query.source === 'google_drive' &&
              DRIVE_ACCESS_TOKEN &&
              !DRIVE_DISCONNECTED
            "
            ref="drive"
            @token-expired="onTokenExpire"
            @drive-removed="onDriveRemoved"
          />
          <box-viewer
            v-if="
              $route.query.source === 'box' &&
              BOX_ACCESS_TOKEN &&
              !BOX_DISCONNECTED
            "
            ref="box"
          ></box-viewer>
        </template>
        <empty-state
          v-else
          :class="{ 'common-blur': !internalIntegrationEnabled }"
        >
          <div :class="{ 'common-blur': !internalIntegrationEnabled }">
            <p>You have no integrated apps</p>
            <button
              class="btn btn-connect"
              @click="
                $router.push({
                  name: 'workspace_id-workspace-settings-dam-instance_id-integration',
                  params: {
                    workspace_id: $getWorkspaceId(),
                    instance_id: $store.state.dam.damInstance.id,
                  },
                })
              "
            >
              Connect to a Datasource
            </button>
          </div>
        </empty-state>
      </div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'
import axios from 'axios'
import DriveViewer from './google-drive'
import DropboxViewer from './dropbox'
import BoxViewer from './box'
import { formatBytes } from './utils'
import { _debounce } from '@/utils/helper'
import LeftMenu from '@/components/theme/global/LeftMenu'
import EmptyState from '@/components/theme/global/EmptyState'
import ProfileDropDown from '~/components/theme/global/ProfileDropDown'

const { Dropbox } = require('dropbox')
const GENERAL_ICON = require('~/assets/img/file/general.svg')
const FOLDER_ICON = require('~/assets/img/folder-icon.svg')

export default {
  components: {
    EmptyState,
    DropboxViewer,
    LeftMenu,
    ProfileDropDown,
    ContentLoader,
    DriveViewer,
    BoxViewer,
  },
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  data() {
    return {
      usedSpace: null,
      allocatedSpace: null,
      searchMenuActive: false,
      searchText: '',
      searchResultLoading: true,
      searchResults: [],
      searchLocation: '',
      searchHasMore: false,
      loading: false,
      dbx: null,
      selectedSource: '',
    }
  },
  computed: {
    internalIntegrationEnabled() {
      return (
        this.dropboxEnabled ||
        this.dropboxEntEnabled ||
        this.boxEnabled ||
        this.driveEnabled
      )
    },
    dropboxEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.dropbox_integration?.enable
    },
    dropboxEntEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.dropbox_enterprise_integration?.enable
    },
    boxEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.box_integration?.enable
    },
    driveEnabled() {
      const features = this.$auth.user?.subscription_features
      return features.google_drive_integration?.enable
    },
    relativePath() {
      return (path) => path.substring(0, path.lastIndexOf('/'))
    },
    getReadableSize() {
      return (size) => formatBytes(size, 0)
    },
    headerSearchEnabled() {
      if (!this.internalIntegrationEnabled) return false
      const src = this.$route.query.source
      if (src === 'dropbox') return !!this.DROPBOX_TOKEN && this.dropboxEnabled
      if (src === 'google_drive')
        return !!this.DRIVE_ACCESS_TOKEN && this.driveEnabled
      if (src === 'box') return !!this.BOX_ACCESS_TOKEN && this.boxEnabled
      return false
    },
    ...mapGetters({
      DROPBOX_TOKEN: 'dropbox/token',
      DROPBOX_ICON: 'dropbox/icon',
      DROPBOX_USER: 'dropbox/user',
      DROPBOX_DISCONNECTED: 'dropbox/disconnected',
      DRIVE_ACCESS_TOKEN: 'drive/accessToken',
      DRIVE_REFRESH_TOKEN: 'drive/refreshToken',
      DRIVE_ICON: 'drive/icon',
      DRIVE_USER: 'drive/user',
      DRIVE_SESSION: 'drive/session',
      DRIVE_DISCONNECTED: 'drive/disconnected',
      BOX_USER: 'box/user',
      BOX_ACCESS_TOKEN: 'box/accessToken',
      BOX_REFRESH_TOKEN: 'box/refreshToken',
      BOX_ICON: 'box/icon',
      BOX_SESSION: 'box/session',
      BOX_ACCESS_TOKEN_TTL: 'box/accessTokenTTLMS',
      BOX_ACQUIRED_AT_MS: 'box/acquiredAtMS',
      BOX_DISCONNECTED: 'box/disconnected',
    }),
  },
  watch: {
    searchText: {
      handler(n) {
        this.searchMenuActive = !!n
        if (!(n || '').length) return
        _debounce(() => {
          this.searchResultLoading = true
          if (this.dbx && this.$route.query.source === 'dropbox') {
            this.dbx
              .filesSearchV2({
                query: n,
                match_field_options: {
                  include_highlights: true,
                },
              })
              .then((res) => {
                this.searchHasMore = res.result.has_more
                this.searchResultLoading = false
                this.searchResults = [
                  ...res.result.matches.map((e) => ({
                    ...e.metadata.metadata,
                    html: e.highlight_spans.reduce(
                      (highlight, curr) =>
                        highlight.concat(
                          curr.is_highlighted
                            ? '<u>' + curr.highlight_str + '</u>'
                            : curr.highlight_str
                        ),
                      ''
                    ),
                    thumb:
                      e.metadata.metadata['.tag'] === 'folder'
                        ? require('~/assets/img/folder-icon.svg')
                        : null,
                  })),
                ]
                this.searchResults
                  .filter((e) => e['.tag'] === 'file')
                  .forEach((file) => {
                    this.$refs.dropbox
                      .getThumbnail(file)
                      .then(({ source, thumb }) => {
                        file.thumb =
                          source ||
                          thumb ||
                          require('~/assets/img/file/general.svg')
                      })
                  })
              })
              .catch((e) => {
                this.searchResultLoading = false
              })
          } else if (
            this.DRIVE_ACCESS_TOKEN &&
            this.$route.query.source === 'google_drive'
          ) {
            axios
              .get('/driveapi/list', {
                headers: {
                  access_token: this.DRIVE_ACCESS_TOKEN,
                  refresh_token: this.DRIVE_REFRESH_TOKEN,
                },
                params: {
                  search: n,
                  highlight: true,
                },
              })
              .then(({ data } = {}) => {
                const { files = [], incompleteSearch, nextPageToken } = data
                this.searchHasMore = incompleteSearch || nextPageToken
                this.searchResultLoading = false
                this.searchResults = [...files]
              })
              .catch(() => {
                this.searchResultLoading = false
              })
          } else if (
            this.BOX_ACCESS_TOKEN &&
            this.$route.query.source === 'box'
          ) {
            axios
              .get('/box/search', {
                params: {
                  accessToken: this.BOX_ACCESS_TOKEN,
                  refreshToken: this.BOX_REFRESH_TOKEN,
                  accessTokenTTLMS: this.BOX_ACCESS_TOKEN_TTL,
                  acquiredAtMS: this.BOX_ACQUIRED_AT_MS,
                  search: n,
                  highlight: true,
                },
              })
              .then(({ data } = {}) => {
                const { entries, total_count } = data
                this.searchHasMore = entries.length < total_count
                this.searchResults = [...entries]
                this.searchResultLoading = false
                this.$refs.box.getThumbnails(
                  this.searchResults.filter((e) => e.type === 'file')
                )
              })
              .catch(() => {
                this.searchResultLoading = false
              })
          }
        }, 500)
      },
      immediate: true,
    },
    selectedSource: {
      handler(n) {
        const { name, params, query = {} } = this.$route
        if (query.source !== n) {
          this.searchText = ''
          console.log('pushing route to ', name, n)
          this.$router.push({
            name,
            params,
            query: { source: n },
          })
        }
      },
    },
    $route: {
      handler() {
        this.queryHandler()
      },
      deep: true,
    },
    DROPBOX_DISCONNECTED(n) {
      if (n) {
        this.queryHandler()
      }
    },
  },
  mounted() {
    this.reload()
  },
  methods: {
    queryHandler() {
      const query = { ...this.$route.query }
      const targetSource = this.getQuerySource(query.source)
      if (targetSource && query.source !== targetSource) {
        console.log('queryHandler', query, targetSource)
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: targetSource ? { source: targetSource } : null,
        })
      }
    },
    getDriveFileThumb(file, fallback) {
      let icon
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        icon = FOLDER_ICON
      } else {
        const drive = this.$refs.drive
        if (!drive) icon = GENERAL_ICON
        else {
          try {
            if (drive.hasThumb(file)) {
              if (fallback) {
                delete file.thumbnailLink
              }
              icon = drive.getThumbnails(file)
            } else icon = GENERAL_ICON
          } catch (_) {
            icon = GENERAL_ICON
          }
        }
      }
      if (!fallback) return icon
      this.$refs[`imgthumb${file.id}`][0].src = icon
    },
    /**
     * Called on mount,
     * fetches access tokens and metadata
     * redirects to appropriate source type
     */
    async reload() {
      this.loading = true
      await this.fetchTokens()
      this.fetchMetadata()
      const { query } = this.$route
      const targetSource = await this.getQuerySource(query.source)
      if (query.source !== targetSource) {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: targetSource ? { source: targetSource } : undefined,
        })
        return this.reload()
      }
      this.selectedSource = this.$route.query.source
      if (!this.DROPBOX_TOKEN || this.DROPBOX_DISCONNECTED) {
        this.loading = false
        return
      }
      this.dbx = new Dropbox({ accessToken: this.DROPBOX_TOKEN })
      this.dbx
        .usersGetSpaceUsage()
        .then(
          ({
            result: {
              used,
              allocation: { allocated },
            },
          }) => {
            this.usedSpace = this.getReadableSize(used)
            this.allocatedSpace = this.getReadableSize(allocated)
          }
        )
        .catch((e) => {
          if (e?.status >= 500) this.$toast.error(e)
          this.$store.commit('dropbox/setDropboxToken', null)
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * Fetches access tokens for all integrations
     */
    fetchTokens() {
      return new Promise((resolve) => {
        const { workspace_id } = this.$route.params
        this.$axios
          .$get(
            'digital-assets/get-app-token?' +
              this.$toQueryString({
                workspace_id,
              })
          )
          .then(({ data }) => {
            const { dropbox = {}, google_drive = {}, box = {} } = data
            this.$store.commit('dropbox/setDropboxToken', dropbox.token)
            this.$store.dispatch(
              'dropbox/setDisconnected',
              !dropbox.dropbox_connect
            )

            this.$store.commit(
              'drive/setAccessToken',
              google_drive.access_token
            )
            this.$store.commit(
              'drive/setRefreshToken',
              google_drive.refresh_token
            )
            this.$store.dispatch(
              'drive/setDisconnected',
              !google_drive.gdrive_connect
            )

            this.$store.commit('box/setAccessToken', box.access_token)
            this.$store.commit('box/setRefreshToken', box.refresh_token)
            this.$store.commit(
              'box/setAccessTokenTTLMS',
              box.box_access_token_ttl
            )
            this.$store.commit('box/setAcquiredAtMS', box.box_acquired_at)
            this.$store.dispatch('box/setDisconnected', !box.box_connect)
          })
          .catch(() => {
            this.$store.commit('dropbox/setDropboxToken', null)

            this.$store.commit('drive/setAccessToken', null)
            this.$store.commit('drive/setRefreshToken', null)

            this.$store.commit('box/setAccessToken', null)
            this.$store.commit('box/setRefreshToken', null)
            this.$store.commit('box/setAccessTokenTTLMS', 0)
            this.$store.commit('box/setAcquiredAtMS', 0)
          })
          .finally(() => resolve())
      })
    },
    /**
     * Fetches initial metadata for all integrations
     */
    async fetchMetadata() {
      const { workspace_id } = this.$route.params
      // await this.$store.dispatch('drive/reAuthDrive', { workspace_id })
      await this.$store.dispatch('drive/getDriveUser', { workspace_id })

      await this.$store.dispatch('box/getUser', { workspace_id })
    },
    /**
     * Parses `source` from query
     * @param source string
     * @returns valid & authenticated source type
     */
    getQuerySource(source = '') {
      const defaultSource =
        this.DROPBOX_TOKEN && !this.DROPBOX_DISCONNECTED
          ? 'dropbox'
          : this.DRIVE_ACCESS_TOKEN && !this.DRIVE_DISCONNECTED
          ? 'google_drive'
          : this.BOX_ACCESS_TOKEN && !this.BOX_DISCONNECTED
          ? 'box'
          : undefined

      switch (source) {
        case 'dropbox':
          if (this.DROPBOX_TOKEN && !this.DROPBOX_DISCONNECTED) return 'dropbox'
        // fall through
        case 'google_drive':
          if (this.DRIVE_ACCESS_TOKEN && !this.DRIVE_DISCONNECTED)
            return 'google_drive'
        // fall through
        case 'box':
          if (this.BOX_ACCESS_TOKEN && !this.BOX_DISCONNECTED) return 'box'
        // fall through
        default:
          return defaultSource
      }
    },
    /**
     * Refresh google drive access token
     */
    async onTokenExpire() {
      await this.$store.dispatch('drive/reAuthDrive', {
        workspace_id: this.$route.params.workspace_id,
      })
    },
    /**
     * Refresh google drive access token
     */
    async onDriveRemoved() {
      await this.$store.dispatch('drive/reAuthDrive', {
        workspace_id: this.$route.params.workspace_id,
      })
    },
    /**
     * Dropbox
     * Goes to `file`s parent directory, when a file was clicked from search dialog
     * @param file Object
     */
    gotoFile(file) {
      const path = file.path_display
      this.searchLocation =
        file['.tag'] === 'folder'
          ? path
          : path.substring(0, path.lastIndexOf('/'))
      this.closeSearch()
      if (file['.tag'] === 'file') {
        this.$nextTick(() => {
          this.$refs.dropbox.highlight(file)
        })
      }
    },
    /**
     * Google Drive
     * Goes to `file`s parent directory, when a file was clicked from search dialog
     * @param file Object
     */
    gotoDriveDirectory(file) {
      const path = (file.parents || [])[0]
      const query = {
        source: 'google_drive',
        location: !file.ownedByMe ? 'Shared with me' : 'My Drive',
      }
      if (path) query.path = path
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query,
      })
      this.closeSearch()
      if (file.mimeType !== 'application/vnd.google-apps.folder') {
        this.$nextTick(() => {
          this.$refs.drive.highlight(file)
        })
      }
    },
    /**
     * Box.com
     * Goes to `file`s parent directory, when a file was clicked from search dialog
     * @param file Object
     */
    gotoBox(file) {
      const path = file.parent.id
      const query = {
        source: 'box',
      }
      if (path && path.length && ![0, '0'].includes(path)) query.path = path
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query,
      })
      this.closeSearch()
      if (file.type !== 'folder') {
        this.$nextTick(() => {
          this.$refs.box.highlight(file)
        })
      }
    },
    /**
     * Clears & closes the search modal
     */
    closeSearch() {
      this.searchResults = []
      this.searchResultLoading = false
      this.searchMenuActive = false
      this.searchText = ''
    },
  },
}
</script>
<style scoped>
.search-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  height: 35px;
  max-height: 35px;
  min-height: 35px;
}

.search-item {
  padding: 10px;
  display: flex;
  align-items: center;
  background: white;
  margin-top: 4px;
  cursor: pointer;
  font-size: 1.05rem;
  position: relative;
}
.search-item:hover .search-item-path {
  display: block;
  font-size: 12px;
}
.search-item-path {
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  background: #dcdcdc;
  padding: 3px 6px;
  border-radius: 4px;
  max-width: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: none;
}
.btn.btn-connect {
  height: 34px;
  font-weight: 300;
  font-family: acumin-pro, sans-serif;
  letter-spacing: 0.2px;
  /* box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.275), 0 0 12px 0 rgba(0, 0, 0, 0.075); */
}
.btn.btn-connect:hover {
  box-shadow: none;
}
</style>
