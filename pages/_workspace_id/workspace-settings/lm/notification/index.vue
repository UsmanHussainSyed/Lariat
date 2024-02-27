<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Notification Settings</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="workspace-setting-left">
            <div class="general-settings-box h-auto customscrollbar">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <WorkspaceNote />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="email-notification-info pt0 pl0 pr0">
                    <div class="form-group">
                      <div class="media bg-gray p10">
                        <div class="media-body">
                          Turn off System &amp; Email notifications
                        </div>
                        <div class="media-left">
                          <label class="label-switch no-text">
                            <input
                              v-model="systemNotification"
                              type="checkbox"
                              class="switch"
                              value="1"
                              checked=""
                              @change="turnOffSystemNotification"
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="email-notification-info pt0 pl0 pr0">
                    <div class="form-group">
                      <div class="media">
                        <div class="media-body">Overall notification</div>
                        <div class="media-left">
                          <label
                            class="label-switch no-text"
                            :class="[
                              'disabled' && !$_auth().user.lead.isSuperAdmin,
                              systemNotification ? 'disabled' : '',
                            ]"
                          >
                            <input
                              v-model="isOverallTurnedOn"
                              type="checkbox"
                              class="switch"
                              :disabled="
                                !$_auth().user.lead.isSuperAdmin ||
                                systemNotification
                              "
                              @change="updateOverallNotification"
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <div class="notes">
                      <p>
                        Current Status : <strong>{{ status }}</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="email-notification-info pt0 pl0 pr0">
                    <div
                      v-for="notification in leadNotificationList.permissions"
                      :key="notification.id"
                      class="form-group"
                    >
                      <div class="media">
                        <div class="media-body">
                          {{ notification.email_module_name }}
                        </div>
                        <div class="media-left">
                          <label
                            class="label-switch no-text"
                            :class="{ disabled: systemNotification }"
                          >
                            <input
                              v-model="notification.status"
                              type="checkbox"
                              class="switch"
                              value="1"
                              checked=""
                              :disabled="systemNotification"
                              @change="updateEmailNotification(notification)"
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
  </div>
</template>

<script>
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
export default {
  components: {
    WorkspaceNote,
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
  ],
  data: () => ({
    leadNotificationList: [],
    isOverallTurnedOn: false,
    status: '',
    systemNotification: false,
  }),
  created() {
    this.getRolePermissions()
    this.getWorkspaceDetail()
  },
  methods: {
    async turnOffSystemNotification() {
      const { message } = await this.$axios.$post(
        '/update-pause-notification',
        {
          pause_notification: this.systemNotification ? 1 : 0,
        }
      )

      this.$toast.success(message)
    },
    async getWorkspaceDetail() {
      try {
        const { data } = await this.$axios.$get(
          `/view-workspace?workspace_id=${this.$getWorkspaceId()}`
        )
        this.isOverallTurnedOn = data.lm_notification
        this.status = data.lm_notification_text
        this.systemNotification = !!data.pause_notification
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async updateOverallNotification() {
      try {
        const { message } = await this.$axios.$post('/update-lm-notification', {
          url_workspace_id: this.$getWorkspaceId(),
          enable_notification: this.isOverallTurnedOn,
        })
        this.status = this.isOverallTurnedOn ? 'Enabled' : 'Disabled'
        this.$toast.success(message)
      } catch (error) {
        this.$toast.error(error)
      }
    },
    getRolePermissions() {
      this.$axios
        .$get('/email-control/organization-profile-email-setting', {
          params: {
            url_workspace_id: this.$getWorkspaceId(),
          },
        })
        .then(({ data }) => {
          this.leadNotificationList = data.find(
            (module) => module.module_id === 3
          )
        })
    },
    async updateEmailNotification(permission) {
      const module_id = permission.id
      const status = permission.status ? 1 : 0
      try {
        const { message } = await this.$axios.$post(
          '/email-control/email-permission-set-role-wise',
          {
            url_workspace_id: this.$getWorkspaceId(),
            role_id: this.leadNotificationList.role_id,
            email_module_id: module_id,
            status,
            dealership_id: this.leadNotificationList.dealership_id,
          }
        )
        this.$toast.success(message)
      } catch (error) {
        this.$toast.error(error)
      }
    },
  },
}
</script>
