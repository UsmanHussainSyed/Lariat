<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <div class="general-settings-right w-100 h-100">
        <div class="general-settings-title email-system-title">
          <ul class="general-settings-tab">
            <li><nuxt-link to="/profile">Profile Setting</nuxt-link></li>
            <li class="active">
              <a href="javascript:void(0)">Notification Setting</a>
            </li>
          </ul>
        </div>

        <div class="workspace-settings email-system-notification">
          <div class="row h-100">
            <div class="col-lg-3 h-100">
              <div class="email-system-tabs">
                <ul class="nav nav-tabs nav-justified">
                  <li class="nav-item">
                    <a
                      href="#emailNoti"
                      data-toggle="tab"
                      :class="{ active: type === 'email' }"
                      @click="emailNotificationClicked"
                      >Email Notification</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      href="#systemNoti"
                      data-toggle="tab"
                      :class="{ active: type === 'system' }"
                      @click="systemNotificationClicked"
                      >System Notification</a
                    >
                  </li>
                </ul>
                <div class="tab-content customscrollbar">
                  <div
                    id="emailNoti"
                    :class="['tab-pane', type === 'email' ? 'active' : '']"
                  >
                    <div
                      v-for="(wp, index) in accessibleWorkspaces"
                      :key="index"
                    >
                      <div class="notification-box">
                        <h4>{{ wp.name }}</h4>
                        <ul>
                          <li
                            v-for="(module, mIndex) in wp.module"
                            :key="mIndex"
                            :class="{
                              active:
                                wp.id == workspace_id &&
                                module.module_id == module_id &&
                                type === 'email',
                            }"
                          >
                            <nuxt-link
                              :to="{
                                name: 'notification-settings-workspace_id-module_id-type',
                                params: {
                                  workspace_id: wp.id,
                                  module_id: module.module_id,
                                  type: 'email',
                                },
                              }"
                              >{{ module.module_name }}</nuxt-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    id="systemNoti"
                    :class="['tab-pane', type === 'system' ? 'active' : '']"
                  >
                    <div
                      v-for="(wp, index) in accessibleWorkspaces"
                      :key="index"
                    >
                      <div class="notification-box">
                        <h4>{{ wp.name }}</h4>
                        <ul>
                          <li
                            v-for="(module, mIndex) in wp.module"
                            :key="mIndex"
                            :class="{
                              active:
                                wp.id == workspace_id &&
                                module.module_id == module_id &&
                                type === 'system',
                            }"
                          >
                            <nuxt-link
                              :to="{
                                name: 'notification-settings-workspace_id-module_id-type',
                                params: {
                                  workspace_id: wp.id,
                                  module_id: module.module_id,
                                  type: 'system',
                                },
                              }"
                              >{{ module.module_name }}</nuxt-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-lg-9 h-100"
              :class="{ 'warning-massage': showAlertMsg }"
            >
              <div v-if="showAlertMsg" class="search-result mb1">
                <div class="alert alert-warning">
                  Organization admin has disabled
                  {{ type === 'email' ? 'Email' : 'System' }} Notifications
                </div>
              </div>
              <div class="email-notification-info customscrollbar">
                <div
                  v-if="loading"
                  :class="{
                    'no-notification': loading && parseInt(module_id) !== 2,
                  }"
                >
                  <div v-for="i in 4" :key="i">
                    <h4 class="title">
                      <ContentLoader
                        :speed="2"
                        :animate="true"
                        :height="16"
                        :width="200"
                        :style="{
                          width: '200px',
                          height: '16px',
                          borderRadius: '10px',
                        }"
                      >
                        <rect
                          x="0"
                          :y="0"
                          rx="0"
                          ry="0"
                          width="200"
                          height="16"
                        />
                        />
                      </ContentLoader>
                    </h4>
                    <div
                      v-for="j in Math.ceil(Math.random() * 2)"
                      :key="j"
                      class="form-group"
                    >
                      <div class="media">
                        <div class="media-body">
                          <div class="d-flex align-items-center">
                            <ContentLoader
                              :speed="2"
                              :animate="true"
                              :height="16"
                              :width="300"
                              :style="{
                                width: '300px',
                                height: '16px',
                                borderRadius: '10px',
                              }"
                            >
                              <rect
                                x="0"
                                :y="0"
                                rx="0"
                                ry="0"
                                width="300"
                                height="16"
                              />
                              />
                            </ContentLoader>
                          </div>
                        </div>
                        <div class="media-left">
                          <div class="system">
                            <ContentLoader
                              :speed="2"
                              :animate="true"
                              :height="16"
                              :width="40"
                              :style="{
                                height: '16px',
                                width: '40px',
                                borderRadius: '10px',
                              }"
                            >
                              <rect
                                x="0"
                                :y="0"
                                rx="0"
                                ry="0"
                                width="40"
                                height="16"
                              />
                              />
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="!notificationList.length"
                  :class="!loading ? 'no-notification h-100' : ''"
                >
                  <svg
                    id="Layer_1"
                    class="no-email-icon darkgray"
                    :class="loading ? 'scale_0' : 'scale_1'"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 13.4"
                    xml:space="preserve"
                  >
                    <g id="Group_5365" transform="translate(-811 -220.001)">
                      <g
                        id="Group_5363"
                        transform="translate(-15.727 -441.881)"
                      >
                        <path
                          id="Path_3512"
                          class="fill-color"
                          d="M835.7,669.4c-0.4,0-0.7-0.1-1-0.3l-7.8-5.8l0.9-1.2l7.8,5.8l0.2,0.1l0-0.1l7.8-5.8l0.9,1.2l-7.8,5.8C836.4,669.3,836.1,669.4,835.7,669.4z"
                        />
                        <path
                          id="Path_3513"
                          class="fill-color"
                          d="M828.4,675.3c-0.9,0-1.6-0.7-1.6-1.6v-10.2c0-0.9,0.7-1.6,1.6-1.6h14.7c0.9,0,1.6,0.7,1.6,1.6v10.2c0,0.9-0.7,1.6-1.6,1.6L828.4,675.3z M828.4,663.4c-0.1,0-0.1,0-0.1,0.1v10.2c0,0.1,0,0.1,0.1,0.1h14.7c0.1,0,0.1,0,0.1-0.1v-10.1c0-0.1,0-0.1-0.1-0.1L828.4,663.4z"
                        />
                      </g>
                      <g id="Group_5364" transform="translate(0 8)">
                        <g id="Ellipse_409" transform="translate(816 215)">
                          <circle class="fill-white" cx="4" cy="4" r="4" />
                          <circle class="st2" cx="4" cy="4" r="3.6" />
                        </g>
                        <g id="Group_4424" transform="translate(818.25 217.25)">
                          <g id="Group_4422" transform="translate(0)">
                            <path
                              id="Path_3527"
                              class="fill-color"
                              d="M0.4,3.5C0.2,3.5,0,3.3,0,3.1C0,3,0,2.9,0.1,2.8l2.7-2.7C3,0,3.2,0,3.4,0.1c0.2,0.2,0.2,0.4,0,0.6L0.7,3.4C0.6,3.5,0.5,3.5,0.4,3.5z"
                            />
                          </g>
                          <g id="Group_4423" transform="translate(0)">
                            <path
                              id="Path_3528"
                              class="fill-color"
                              d="M3.1,3.5c-0.1,0-0.2,0-0.3-0.1L0.1,0.7C0,0.5,0,0.3,0.1,0.1C0.3,0,0.5,0,0.7,0.1l2.7,2.7c0.2,0.2,0.2,0.4,0,0.6C3.3,3.5,3.2,3.5,3.1,3.5L3.1,3.5z"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <p v-if="!loading">
                    No {{ type }} notification is available.
                  </p>
                </div>
                <div
                  v-for="(group, index) in notificationList"
                  :key="index"
                  class="form-group"
                >
                  <h4 class="mb0 mt1">{{ group.group_name }}</h4>
                  <div
                    v-for="(item, i) in group.notification"
                    :key="i"
                    class="form-group"
                  >
                    <div class="media">
                      <div class="media-body">
                        <div class="d-flex align-items-center">
                          {{ item.notification_name }}
                          <a v-tooltip="item.notification_name"
                            ><i class="fa fa-info-circle" aria-hidden="true"></i
                          ></a>
                        </div>
                      </div>
                      <div class="media-left">
                        <label
                          class="label-switch no-text"
                          :class="{
                            disabled:
                              !damOrgNotificationEnabled || item.is_hidden,
                          }"
                        >
                          <input
                            v-model="item.status"
                            type="checkbox"
                            class="switch"
                            @click.capture.prevent.stop="
                              updateDamNotification(item)
                            "
                          />
                          <span class="lable"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader },
  layout: 'projectLayout',
  middleware({ $auth, route, redirect }) {
    if (!$auth.loggedIn) {
      if (route.name !== 'preview_assets') {
        $auth.$storage.setUniversal('trackReferringUrl', true)
        $auth.$storage.setUniversal('referringUrlName', route.name)
        $auth.$storage.setUniversal('referringUrlParams', route.params)
        $auth.$storage.setUniversal('referringUrlQuery', route.query)
      }
      return redirect('/')
    }
  },
  validate({ $auth, params: { type, module_id, workspace_id } }) {
    const validTypes = ['email', 'system']
    const validWorkspaces = $auth.user.accessibleWorkspaces.map(({ id }) => id)
    const validModules = [2] // 1=Projecct, 2=DAM, 3=Lead
    if (
      validTypes.includes(type) &&
      validModules.includes(parseInt(module_id)) &&
      validWorkspaces.includes(workspace_id)
    ) {
      return true
    }
  },
  data() {
    return {
      type: this.$route.params.type,
      module_id: this.$route.params.module_id,
      hash: this.$route.hash,
      notificationList: [],
      showAlertMsg: false,
      loading: false,
    }
  },
  computed: {
    accessibleWorkspaces() {
      let workspaces = JSON.parse(
        JSON.stringify(
          this.$auth.user.accessibleWorkspaces.filter((e) => !e.is_suspended)
        )
      )
      workspaces = [
        ...workspaces.filter((e) =>
          e.module.map((m) => m.module_id).includes(2)
        ),
      ]
      for (const wp of workspaces) {
        wp.module = [{ ...wp.module.find((e) => e.module_id === 2) }]
      }
      return workspaces
    },
    damOrgNotifications() {
      return this.$store.state.dam.notifications.notification
    },
    damOrgNotificationEnabled() {
      return this.$store.state.dam.notifications.notification_status
    },
    workspace_id() {
      return this.$route.params.workspace_id
    },
  },
  watch: {
    damOrgNotificationEnabled: {
      handler(n) {
        if (parseInt(this.module_id) === 2) {
          this.showAlertMsg = !n
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.loading = true
    this.notificationList = []
    this.$store.dispatch('dam/getNotifications')
    this.loading = true
    this.notificationList = []
    this.getDamNotifications().then(() => (this.loading = false))
  },
  methods: {
    emailNotificationClicked() {
      this.$router.push({
        name: 'notification-settings-workspace_id-module_id-type',
        params: {
          workspace_id: this.workspace_id,
          module_id: this.module_id,
          type: 'email',
        },
      })
    },
    systemNotificationClicked() {
      this.$router.push({
        name: 'notification-settings-workspace_id-module_id-type',
        params: {
          workspace_id: this.workspace_id,
          module_id: this.module_id,
          type: 'system',
        },
      })
    },
    getDamNotifications() {
      return new Promise((resolve) => {
        this.$axios
          .$get('digital-assets/notification/user-notification-list', {
            params: {
              workspace_id: this.$route.params.workspace_id,
              type: this.type,
              user_id: this.$auth.user.id,
            },
          })
          .then(({ data }) => (this.notificationList = data))
          .catch((_) => {})
          .finally(() => resolve())
      })
    },
    updateDamNotification(item) {
      this.$axios
        .$post('digital-assets/notification/set-user-profile-notification', {
          workspace_id: this.workspace_id,
          notification_type: this.type,
          notification_id: item.id,
          status: !item.status,
        })
        .then(({ message }) => this.$toast.global.success(message))
        .catch(() => {})
        .finally(() => {
          this.getDamNotifications()
        })
    },
  },
}
</script>

<style scoped>
svg.scale_0 {
  opacity: 0;
}
svg.scale_1 {
  animation: fade-scale 0.2s linear both;
}
@keyframes fade-scale {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
