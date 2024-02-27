<template>
  <div
    class="common-box bg-gray h-100 position-relative"
    :class="{ 'p-0': !internalIntegrationEnabled }"
  >
    <template v-if="!internalIntegrationEnabled">
      <img
        :src="require('~/assets/img/blurred-images/internal-integration.png')"
        style="width: 100%"
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
    <template v-else>
      <ContentLoader
        v-if="loading"
        :speed="1"
        :animate="true"
        :height="3 * 70"
        width="100%"
        :style="{
          height: `${3 * 70}px`,
          width: 'calc(100% - 20px)',
          margin: '0 10px',
        }"
      >
        <rect
          v-for="i in 3"
          :key="i"
          x="0"
          :y="(i - 1) * 70 + 10"
          rx="0"
          ry="0"
          width="100%"
          height="60"
        />
      </ContentLoader>
      <div
        v-else-if="DROPBOX_TOKEN || DRIVE_ACCESS_TOKEN || BOX_ACCESS_TOKEN"
        class="table-list-view banner-list-structure integration-list-view"
      >
        <ul class="thead">
          <li>
            <div class="preview-head"></div>
            <div class="name-head sorting">
              <span>Integration</span>
            </div>
            <div class="name-head sorting">
              <span>User Details</span>
            </div>
            <div class="action-head sorting">
              <span>Status</span>
            </div>
            <div class="action-head sorting">
              <span>Action</span>
            </div>
          </li>
        </ul>
        <div class="customscrollbar no_footer">
          <ul class="tbody">
            <!-- dropbox -->
            <li
              v-if="DROPBOX_TOKEN"
              v-tooltip="
                dropboxEnabled
                  ? ''
                  : 'Please upgrade your subscription plan to enable this feature'
              "
            >
              <div
                class="banner-box"
                :class="{ 'common-blur': !dropboxEnabled }"
              >
                <div class="preview-container">
                  <div class="preview-images">
                    <img :src="DROPBOX_ICON" width="36" />
                  </div>
                </div>
                <div class="banner-title">
                  <nuxt-link
                    v-if="!DROPBOX_DISCONNECTED"
                    :to="{
                      name: 'workspace_id-dam-integrations',
                      query: { source: 'dropbox' },
                    }"
                    class="table-a"
                    >Dropbox</nuxt-link
                  >
                  <span v-else class="table-a">Dropbox</span>
                </div>
                <div class="banner-title">
                  <template v-if="DROPBOX_USER.email">
                    <label>{{ DROPBOX_USER.name }}</label>
                    <br />
                    <label>{{ DROPBOX_USER.email }}</label>
                  </template>
                  <template v-else>-</template>
                </div>
                <div class="action-head">
                  <span
                    v-if="dropboxEnabled"
                    class="plan-status"
                    :class="[
                      `alert-${DROPBOX_DISCONNECTED ? 'danger' : 'success'}`,
                    ]"
                    >{{
                      DROPBOX_DISCONNECTED ? 'Disconnected' : 'Connected'
                    }}</span
                  >
                </div>
                <div class="action-head">
                  <template v-if="DROPBOX_TOKEN && dropboxEnabled">
                    <a
                      v-if="DROPBOX_DISCONNECTED"
                      class="btn btn-small"
                      :href="encodeURI(DROPBOX_CONNECT_URI)"
                      >Reconnect</a
                    >
                    <a
                      v-else
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#delete-integration"
                      @click="deleteType = 'dropbox'"
                    >
                      <svg
                        id="Layer_1"
                        class="delete-icon h-orange"
                        data-toggle="tooltip"
                        data-original-title="Delete Integration"
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
                    </a>
                  </template>
                  <span v-else>-</span>
                </div>
              </div>
            </li>
            <!-- google drive -->
            <li
              v-if="DRIVE_ACCESS_TOKEN"
              v-tooltip="
                driveEnabled
                  ? ''
                  : 'Please upgrade your subscription plan to enable this feature'
              "
            >
              <div
                class="banner-box"
                :class="{ 'common-blur': !dropboxEnabled }"
              >
                <div class="preview-container">
                  <div class="preview-images">
                    <img
                      :src="DRIVE_ICON"
                      width="36"
                      style="vertical-align: middle"
                    />
                  </div>
                </div>
                <div class="banner-title">
                  <nuxt-link
                    v-if="!DRIVE_DISCONNECTED"
                    :to="{
                      name: 'workspace_id-dam-integrations',
                      query: { source: 'google_drive' },
                    }"
                    class="table-a"
                    >Google Drive</nuxt-link
                  >
                  <span v-else class="table-a">Google Drive</span>
                </div>
                <div class="banner-title">
                  <template v-if="DRIVE_USER.displayName">
                    <label>{{ DRIVE_USER.displayName }}</label
                    ><br />
                    <label>{{ DRIVE_USER.emailAddress }}</label>
                  </template>
                  <template v-else>-</template>
                </div>
                <div class="action-head">
                  <span
                    v-if="driveEnabled"
                    class="plan-status"
                    :class="[
                      `alert-${DRIVE_DISCONNECTED ? 'danger' : 'success'}`,
                    ]"
                    >{{
                      DRIVE_DISCONNECTED ? 'Disconnected' : 'Connected'
                    }}</span
                  >
                </div>
                <div class="action-head">
                  <template v-if="DRIVE_ACCESS_TOKEN && driveEnabled">
                    <img
                      v-if="DRIVE_DISCONNECTED"
                      class="google_connect"
                      height="36"
                      style="cursor: pointer"
                      :src="
                        require('~/assets/img/google_signin_dark_normal_web.png')
                      "
                      @click="$emit('reconnectDrive')"
                    />
                    <a
                      v-else
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#delete-integration"
                      @click="deleteType = 'google_drive'"
                    >
                      <svg
                        id="Layer_1"
                        class="delete-icon h-orange"
                        data-toggle="tooltip"
                        data-original-title="Delete Integration"
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
                    </a>
                  </template>
                  <span v-else>-</span>
                </div>
              </div>
            </li>
            <!-- Box -->
            <li
              v-if="BOX_ACCESS_TOKEN"
              v-tooltip="
                boxEnabled
                  ? ''
                  : 'Please upgrade your subscription plan to enable this feature'
              "
            >
              <div class="banner-box" :class="{ 'common-blur': !boxEnabled }">
                <div class="preview-container">
                  <div class="preview-images">
                    <img
                      :src="BOX_ICON"
                      width="36"
                      style="vertical-align: middle"
                    />
                  </div>
                </div>
                <div class="banner-title">
                  <nuxt-link
                    v-if="!BOX_DISCONNECTED"
                    :to="{
                      name: 'workspace_id-dam-integrations',
                      query: { source: 'box' },
                    }"
                    class="table-a"
                    >Box</nuxt-link
                  >
                  <span v-else class="table-a">Box</span>
                </div>
                <div class="banner-title">
                  <template v-if="BOX_USER.name">
                    <label>{{ BOX_USER.name }}</label
                    ><br />
                    <label>{{ BOX_USER.email }}</label>
                  </template>
                  <template v-else>-</template>
                </div>
                <div class="action-head">
                  <span
                    v-if="boxEnabled"
                    class="plan-status"
                    :class="[
                      `alert-${BOX_DISCONNECTED ? 'danger' : 'success'}`,
                    ]"
                    >{{ BOX_DISCONNECTED ? 'Disconnected' : 'Connected' }}</span
                  >
                </div>
                <div class="action-head">
                  <template v-if="BOX_ACCESS_TOKEN && boxEnabled">
                    <a
                      v-if="BOX_DISCONNECTED"
                      class="btn btn-small"
                      @click="$emit('reconnectBox')"
                      >Reconnect</a
                    >
                    <a
                      v-else
                      href="javascript:void(0);"
                      data-toggle="modal"
                      data-target="#delete-integration"
                      @click="deleteType = 'box'"
                    >
                      <svg
                        id="Layer_1"
                        class="delete-icon h-orange"
                        data-toggle="tooltip"
                        data-original-title="Delete Integration"
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
                    </a>
                  </template>
                  <span v-else>-</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <empty-state v-else></empty-state>
      <div
        id="delete-integration"
        class="modal"
        aria-modal="true"
        role="dialog"
      >
        <div
          class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Integration</h5>
              <button
                ref="deleteModalClose"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
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
                </span>
              </button>
            </div>
            <div v-if="deleteType === 'box'" class="modal-body text-center">
              <p>Are you sure you want to delete the <strong>Box</strong>?</p>
              <div class="btn-group">
                <a
                  href="javascript:void(0);"
                  class="btn btn-gray"
                  data-dismiss="modal"
                  @click="deleteType = ''"
                  >No</a
                >
                <a class="btn" @click.stop="removeBox">Yes</a>
              </div>
            </div>
            <div
              v-else-if="deleteType === 'google_drive'"
              class="modal-body text-center"
            >
              <p>Are you sure you want to delete the <strong>Drive</strong>?</p>
              <div class="btn-group">
                <a
                  href="javascript:void(0);"
                  class="btn btn-gray"
                  data-dismiss="modal"
                  @click="deleteType = ''"
                  >No</a
                >
                <a class="btn" @click.stop="removeDrive">Yes</a>
              </div>
            </div>
            <div v-else class="modal-body text-center">
              <p>
                Are you sure you want to delete the <strong>DropBox</strong>?
              </p>
              <div class="btn-group">
                <a
                  href="javascript:void(0);"
                  class="btn btn-gray"
                  data-dismiss="modal"
                  @click="deleteType = ''"
                  >No</a
                >
                <a class="btn" @click.stop="removeDropbox">Yes</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import axios from 'axios'
import qs from 'qs'
import { mapGetters } from 'vuex'
import EmptyState from '@/components/theme/global/EmptyState.vue'

const { Dropbox } = require('dropbox')

let dbx

export default {
  components: { EmptyState, ContentLoader },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-settings',
    ({ redirect, params, query }) => {
      return redirect({
        name: 'workspace_id-workspace-settings-dam-instance_id-integration',
        params,
        query,
      })
    },
  ],
  props: {
    subscription: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      dropboxSession: {},
      dropbox_token: null,
      loading: false,
      DROPBOX_AUTH_REDIRECT: process.env.DROPBOX_AUTH_REDIRECT,
      DROPBOX_AUTH_VERIFICATION_URI: process.env.DROPBOX_AUTH_VERIFICATION_URI,
      DROPBOX_APP_ID: process.env.DROPBOX_APP_ID,
      DROPBOX_APP_SECRET: process.env.DROPBOX_APP_SECRET,
      deleteType: '',
      removingDrive: false,
      removingDropbox: false,
      DROPBOX_CONNECT_URI:
        process.env.DROPBOX_OAUTH_URI +
        '?client_id=' +
        process.env.DROPBOX_APP_ID +
        '&response_type=code' +
        '&redirect_uri=' +
        process.env.DROPBOX_AUTH_REDIRECT +
        '&state=' +
        [this.$route.params.workspace_id, this.$route.params.instance_id].join(
          '_'
        ),
    }
  },
  computed: {
    ...mapGetters({
      DRIVE_USER: 'drive/user',
      DRIVE_ACCESS_TOKEN: 'drive/accessToken',
      DRIVE_REFRESH_TOKEN: 'drive/refreshToken',
      DRIVE_ICON: 'drive/icon',
      DRIVE_DISCONNECTED: 'drive/disconnected',
      DROPBOX_TOKEN: 'dropbox/token',
      DROPBOX_ICON: 'dropbox/icon',
      DROPBOX_USER: 'dropbox/user',
      DROPBOX_DISCONNECTED: 'dropbox/disconnected',
      BOX_USER: 'box/user',
      BOX_ACCESS_TOKEN: 'box/accessToken',
      BOX_REFRESH_TOKEN: 'box/refreshToken',
      BOX_ICON: 'box/icon',
      BOX_SESSION: 'box/session',
      BOX_DISCONNECTED: 'box/disconnected',
    }),
    internalIntegrationEnabled() {
      return (
        this.dropboxEnabled ||
        this.dropboxEntEnabled ||
        this.boxEnabled ||
        this.driveEnabled
      )
    },
    dropboxEnabled() {
      const features = this.subscription.features
      return features.dropbox_integration?.enable
    },
    dropboxEntEnabled() {
      const features = this.subscription.features
      return features.dropbox_enterprise_integration?.enable
    },
    boxEnabled() {
      const features = this.subscription.features
      return features.box_integration?.enable
    },
    driveEnabled() {
      const features = this.subscription.features
      return features.google_drive_integration?.enable
    },
  },
  async mounted() {
    if (this.internalIntegrationEnabled) {
      await this.$store.dispatch(
        'dropbox/getToken',
        this.$route.params.workspace_id
      )
      this.updateDropboxSession()
      await this.$store.dispatch(
        'drive/getTokens',
        this.$route.params.workspace_id
      )
      this.updateGDriveSession()
      await this.$store.dispatch('box/getTokens', {
        workspace_id: this.$route.params.workspace_id,
      })
      this.updateBoxSession()
    }
  },
  methods: {
    /**
     * Updates session for dropbox
     */
    async updateDropboxSession() {
      const { code, state, referrer } = this.$route.query
      // code, state, referrer is available right after connecting a dropbox account
      if (code && state && referrer === 'DROPBOX') {
        this.authenticateDropbox(code)
      } else {
        const accessToken = this.DROPBOX_TOKEN
        if (!accessToken) return
        dbx = new Dropbox({ accessToken })
        await this.getDropboxUser()
      }
    },
    /**
     * Updates session for dropbox
     */
    async updateGDriveSession() {
      const { code, referrer } = this.$route.query
      // code, state, referrer is available right after connecting a google drive account
      if (code && referrer === 'GOOGLE_DRIVE') {
        await this.authenticateGDrive(code)
      } else if (this.DRIVE_ACCESS_TOKEN) {
        await this.$store.dispatch('drive/getDriveUser', {
          workspace_id: this.$route.params.workspace_id,
        })
      } else if (this.DRIVE_REFRESH_TOKEN) {
        // if there is refresh token but not access token run reAuthdrive
        await this.$store.dispatch('drive/reAuthDrive')
      }
    },
    /**
     * Updates session for box
     */
    async updateBoxSession() {
      const { code, referrer } = this.$route.query
      // code, state, referrer is available right after connecting a box account
      if (code && referrer === 'BOX') {
        this.authenticateBox(code)
      } else if (this.BOX_ACCESS_TOKEN) {
        await this.$store.dispatch('box/getUser', {
          workspace_id: this.$route.params.workspace_id,
        })
      } else if (this.BOX_REFRESH_TOKEN) {
        // await this.$store.dispatch('box/refreshToken')
      }
    },
    /**
     * Removes Dropbox integration
     */
    removeDropbox() {
      if (this.removingDropbox) return
      this.removingDropbox = true
      dbx
        .authTokenRevoke()
        .catch((_) => {})
        .finally(async () => {
          await this.$store.dispatch('dropbox/setToken', {
            workspace_id: this.$route.params.workspace_id,
            dropbox_token: null,
          })
          this.$refs.deleteModalClose.click()
          this.removingDropbox = false
          dbx = null
          this.$toast.global.success('Dropbox removed successfully.')
        })
    },
    /**
     * Removes Google Drive integration
     */
    removeDrive() {
      if (this.removingDrive) return
      this.removingDrive = true
      axios
        .post('/driveapi/remove-access', {
          token: this.DRIVE_ACCESS_TOKEN,
        })
        .then(() =>
          this.$toast.global.success('Google Drive removed successfuly.')
        )
        .catch((e) => {})
        .finally(() => {
          this.$refs.deleteModalClose.click()
          this.$axios.$post('digital-assets/update-app-token', {
            workspace_id: this.$route.params.workspace_id,
            access_token: null,
            refresh_token: null,
            gdrive_connect: 0,
          })
          this.$store.commit('drive/setAccessToken', null)
          this.$store.commit('drive/setRefreshToken', null)
          this.removingDrive = false
        })
    },
    /**
     * Removes Box integration
     */
    removeBox() {
      this.$store
        .dispatch('box/revokeToken', {
          workspace_id: this.$route.params.workspace_id,
        })
        .then(() => this.$toast.global.success('Box removed successfuly.'))
        .catch(console.error)
        .finally(async () => {
          await this.$axios.$post('digital-assets/update-app-token', {
            workspace_id: this.$route.params.workspace_id,
            box_refresh_token: null,
            box_access_token: null,
            box_access_token_ttl: 0,
            box_acquired_at: 0,
            box_connect: 0,
          })
          this.$store.dispatch('box/getTokens', {
            workspace_id: this.$route.params.workspace_id,
          })
          this.$refs.deleteModalClose.click()
        })
    },
    /**
     * Fetches user details for Dropbox
     */
    async getDropboxUser() {
      if (!this.DROPBOX_TOKEN) {
        dbx = null
        await this.$store.dispatch('dropbox/setToken', {
          workspace_id: this.$route.params.workspace_id,
          dropbox_token: null,
        })
        return
      }
      this.loading = true
      dbx
        .usersGetCurrentAccount()
        .then(async (res) => {
          await this.$store.dispatch('dropbox/setUser', {
            name: res.result.name.display_name,
            email: res.result.email,
            details: { ...res.result },
          })
          this.$axios
            .$post('digital-assets/update-app-token', {
              workspace_id: this.$route.params.workspace_id,
              dropbox_connect: 1,
            })
            .finally(() =>
              this.$store.dispatch('dropbox/setDisconnected', false)
            )
        })
        .catch((e) => {
          if (e?.status >= 500) this.$toast.global.error(e)
          this.$axios
            .$post('digital-assets/update-app-token', {
              workspace_id: this.$route.params.workspace_id,
              dropbox_connect: 0,
            })
            .finally(() =>
              this.$store.dispatch('dropbox/setDisconnected', true)
            )
        })
        .finally(() => (this.loading = false))
    },
    /**
     * Verifies Dropbox authentication code
     * @param code short-lived code to get access token
     */
    authenticateDropbox(code) {
      this.loading = true
      axios
        .post(
          this.DROPBOX_AUTH_VERIFICATION_URI,
          qs.stringify({
            code,
            grant_type: 'authorization_code',
            redirect_uri: this.DROPBOX_AUTH_REDIRECT,
          }),
          {
            auth: {
              username: this.DROPBOX_APP_ID,
              password: this.DROPBOX_APP_SECRET,
            },
          }
        )
        .then((res) => {
          this.$store.dispatch('dropbox/setToken', {
            workspace_id: this.$route.params.workspace_id,
            dropbox_token: res.data.access_token,
          })
        })
        .catch((e) => {
          this.$store.dispatch('dropbox/setToken', {
            workspace_id: this.$route.params.workspace_id,
            dropbox_token: null,
          })
          this.$toast.global.error(e)
        })
        .finally(() => {
          this.$nextTick(() => {
            window.location = window.location.pathname
          })
        })
    },
    /**
     * Verifies Google Drive authentication code
     * @param code short-lived code to get access token
     */
    authenticateGDrive(code) {
      this.loading = true
      return axios
        .post(window.location.origin + '/driveapi/exchange-credential', {
          code,
        })
        .then(async (res) => {
          this.$store.commit('drive/setAccessToken', res.data.access_token)
          this.$store.commit('drive/setRefreshToken', res.data.refresh_token)

          await this.$axios.$post('digital-assets/update-app-token', {
            workspace_id: this.$route.params.workspace_id,
            refresh_token: res.data.refresh_token,
            access_token: res.data.access_token,
            gdrive_connect: 1,
          })
        })
        .catch(async (e) => {
          await this.$axios.$post('digital-assets/update-app-token', {
            workspace_id: this.$route.params.workspace_id,
            refresh_token: null,
            access_token: null,
            gdrive_connect: 0,
          })
        })
        .finally(() => {
          this.$nextTick(() => {
            window.location = window.location.pathname
          })
        })
    },
    /**
     * Verifies Box authentication code
     * @param code short-lived code to get access token
     */
    authenticateBox(code) {
      this.loading = true
      axios
        .post(window.location.origin + '/box/grant-me', {
          code,
        })
        .then(async (res) => {
          const { tokenInfo } = res.data
          this.$store.commit('box/setAccessToken', tokenInfo.accessToken)
          this.$store.commit('box/setRefreshToken', tokenInfo.refreshToken)
          this.$store.commit(
            'box/setAccessTokenTTLMS',
            tokenInfo.accessTokenTTLMS
          )
          this.$store.commit('box/setAcquiredAtMS', tokenInfo.acquiredAtMS)

          await this.$axios.$post('digital-assets/update-app-token', {
            workspace_id: this.$route.params.workspace_id,
            box_refresh_token: tokenInfo.refreshToken,
            box_access_token: tokenInfo.accessToken,
            box_access_token_ttl: tokenInfo.accessTokenTTLMS,
            box_acquired_at: tokenInfo.acquiredAtMS,
            box_connect: 1,
          })
        })
        .catch(async (e) => {
          await this.$axios.$post('digital-assets/update-app-token', {
            workspace_id: this.$route.params.workspace_id,
            box_refresh_token: null,
            box_access_token: null,
            box_access_token_ttl: 0,
            box_acquired_at: 0,
            box_connect: 0,
          })
        })
        .finally(() => {
          this.$nextTick(() => {
            window.location = window.location.pathname
          })
        })
    },
  },
}
</script>
<style scoped>
img.google_connect:hover {
  content: url('~/assets/img/google_signin_dark_focus_web.png');
}
img.google_connect:active {
  content: url('~/assets/img/google_signin_dark_pressed_web.png');
}
img.google_connect:focus {
  content: url('~/assets/img/google_signin_dark_pressed_web.png');
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}

.overlay > .loader {
  border-left: 2px solid transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-top: 2px solid #0c0c0c40;
  border-bottom: 2px solid #0c0c0c40;
  border-right: 2px solid transparent;
  animation: loader 0.5s linear infinite both;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
