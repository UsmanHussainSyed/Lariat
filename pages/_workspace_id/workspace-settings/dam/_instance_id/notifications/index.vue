<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !notificationsEnabled }"
  >
    <div class="overlay" v-if="!subscriptionFetched">
      <div class="loader"></div>
    </div>
    <template v-else-if="!notificationsAllowed">
      <img
        :src="require('~/assets/img/blurred-images/notification-settings.png')"
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
      <div v-if="!notificationsEnabled" class="search-result mt1 pl10 pr10">
        <div class="alert alert-warning alert-dismissible">
          <button v-if="0" type="button" class="close" data-dismiss="alert">
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
          </button>
          Organization admin has disabled Email Notifications
        </div>
      </div>
      <div class="general-settings-title">
        <h4>Notification Settings</h4>
      </div>
      <div class="workspace-settings">
        <div class="row no-gutters h-100">
          <div class="col-lg-10 col-md-12 h-100">
            <div class="general-settings-box dam-notification customscrollbar">
              <div class="email-notification-info p0">
                <div class="form-group">
                  <div class="media bg-gray p10">
                    <div class="media-body">
                      Overall System &amp; Email notifications
                      <strong
                        class="plan-status"
                        :class="[
                          'ml-2',
                          `alert-${
                            notificationsEnabled ? 'primary' : 'danger'
                          }`,
                        ]"
                        >{{
                          notificationsEnabled ? 'Enabled' : 'Disabled'
                        }}</strong
                      >
                    </div>
                    <div class="media-left">
                      <label class="label-switch no-text">
                        <input
                          v-model="notificationsEnabled"
                          type="checkbox"
                          class="switch"
                          :disabled="!!updatingGlobal"
                          @click.capture.stop="updateGlobalNotification"
                        />
                        <span class="lable"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="media">
                    <div class="media-body">
                      <h4 class="mb0"></h4>
                    </div>
                    <div class="media-left">
                      <div class="system">
                        <h4 class="mb0">System</h4>
                      </div>
                      <div class="email">
                        <h4 class="mb0">Email</h4>
                      </div>
                      <div class="recipient">
                        <h4 class="mb0">Recipient</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <template v-for="category in notifications">
                  <h4 :key="category.id" class="title">
                    {{ category.group_name }}
                  </h4>
                  <div :key="category.group_name" class="form-group">
                    <div
                      v-for="item in category.notification"
                      :key="item.id"
                      class="media"
                    >
                      <div class="media-body">
                        <div class="d-flex align-items-center">
                          {{ item.notification_name }}
                          <a
                            v-tooltip="item.notification_text"
                            href="javascript:void(0);"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="New User Creation"
                            ><i class="fa fa-info-circle" aria-hidden="true"></i
                          ></a>
                        </div>
                      </div>
                      <div class="media-left">
                        <div class="system">
                          <label
                            v-if="!item.is_hidden"
                            class="label-switch no-text"
                            :class="{
                              disabled:
                                !notificationsEnabled ||
                                !systemNotificationsAllowed,
                            }"
                          >
                            <input
                              v-model="item.is_system"
                              type="checkbox"
                              class="switch"
                              :disabled="
                                !notificationsEnabled ||
                                !systemNotificationsAllowed
                              "
                              @click.capture.stop="
                                updateNotification(
                                  item.id,
                                  'system',
                                  ~~!item.is_system
                                )
                              "
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                        <div class="email">
                          <label
                            v-if="!item.is_hidden"
                            class="label-switch no-text"
                            :class="{
                              disabled:
                                !notificationsEnabled ||
                                !emailNotificationsAllowed,
                            }"
                          >
                            <input
                              v-model="item.is_email"
                              type="checkbox"
                              class="switch"
                              :disabled="
                                !notificationsEnabled ||
                                !emailNotificationsAllowed
                              "
                              @click.capture.stop="
                                updateNotification(
                                  item.id,
                                  'email',
                                  ~~!item.is_email
                                )
                              "
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                        <div class="recipient">
                          <label>{{ recipients(item) }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="loading">
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
                          <div class="email">
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
                          <div class="recipient">
                            <ContentLoader
                              :speed="2"
                              :animate="true"
                              :height="16"
                              :width="100"
                              :style="{
                                width: '100px',
                                height: '16px',
                                borderRadius: '10px',
                              }"
                            >
                              <rect
                                x="0"
                                :y="0"
                                rx="0"
                                ry="0"
                                width="100"
                                height="16"
                              />
                              />
                            </ContentLoader>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
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
export default {
  components: { ContentLoader },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      updatingGlobal: 0,
      loading: 0,
      subscriptionData: {},
      subscriptionFetched: false,
    }
  },
  computed: {
    recipients() {
      return (item) =>
        item.admin_recipient && item.user_recipient
          ? 'Admin / User'
          : item.admin_recipient
          ? 'Admin'
          : item.user_recipient
          ? 'User'
          : '-'
    },
    workspace_id() {
      return this.$route?.params?.workspace_id || this.$_auth().id
    },
    notifications() {
      const notif = this.$store.state.dam.notifications.notification
      return notif ? JSON.parse(JSON.stringify(notif)) : notif
    },
    notificationsEnabled() {
      return this.$store.state.dam.notifications.notification_status
    },
    notificationsAllowed() {
      return !!this.subscriptionData?.features?.custom_notification_management
        ?.enable
    },
    systemNotificationsAllowed() {
      return (
        this.notificationsAllowed &&
        !!this.subscriptionData?.features?.system_notifications?.enable
      )
    },
    emailNotificationsAllowed() {
      return (
        this.notificationsAllowed &&
        !!this.subscriptionData?.features?.email_notifications?.enable
      )
    },
  },
  async mounted() {
    await this.fetchSubscription()
    if (this.notificationsAllowed) this.$store.dispatch('dam/getNotifications')
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  methods: {
    fetchSubscription() {
      this.subscriptionFetched = false
      return new Promise((resolve) => {
        this.$axios
          .$get('digital-assets/subscription/get')
          .then(({ data }) => (this.subscriptionData = data))
          .catch((e) => {
            this.subscriptionData = {}
          })
          .finally(() => {
            this.subscriptionFetched = true
            resolve()
          })
      })
    },
    updateGlobalNotification() {
      if (!this.notificationsAllowed) return
      if (this.updatingGlobal) return
      this.updatingGlobal = 1
      this.$axios
        .$post('digital-assets/notification/pause-workspace-notification', {
          workspace_id: this.workspace_id,
          dam_notification: ~~!this.notificationsEnabled,
        })
        .then(({ message }) => this.$toast.global.success(message))
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(async () => {
          await this.$store.dispatch('dam/getNotifications')
          this.updatingGlobal = 0
        })
    },
    updateNotification(id, type, status) {
      if (!this.notificationsAllowed) return
      if (type === 'system' && !this.systemNotificationsAllowed) return
      if (type === 'email' && !this.emailNotificationsAllowed) return
      this.$axios
        .$post(
          'digital-assets/notification/set-organization-profile-notification',
          {
            workspace_id: this.workspace_id,
            notification_id: id,
            type,
            status,
          }
        )
        .then(({ message }) => this.$toast.global.success(message))
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(async () => await this.$store.dispatch('dam/getNotifications'))
    },
  },
}
</script>
<style scoped>
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
