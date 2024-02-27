<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Settings</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="workspace-setting-left addGroups">
            <div class="general-settings-box h-auto customscrollbar">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <WorkspaceNote />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="email-notification-info p0">
                    <div class="form-group">
                      <div class="media">
                        <div class="media-body">Lead Executive Dashboard</div>
                        <div class="media-left">
                          <label class="label-switch no-text">
                            <input
                              v-model="executiveDashboardStatus"
                              type="checkbox"
                              class="switch"
                              :true-value="1"
                              :false-value="0"
                              @change="saveSettings"
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="media">
                        <div class="media-body">Automated Lead Assignment</div>
                        <div class="media-left">
                          <label class="label-switch no-text">
                            <input
                              v-model="automaticLeadAssignment"
                              type="checkbox"
                              class="switch"
                              :true-value="1"
                              :false-value="0"
                              @change="saveAssignmentSetting"
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
import WorkspaceNote from '@/components/theme/settings/WorkspaceNote'
export default {
  components: { WorkspaceNote },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-module',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      executiveDashboardStatus: 0,
      automaticLeadAssignment: 0,
    }
  },
  mounted() {
    this.getSettings()
  },
  methods: {
    async saveAssignmentSetting() {
      try {
        await this.$axios.$post(`automatic-lead-assignment-save`, {
          automaticLeadAssignment: this.automaticLeadAssignment,
        })
        this.$toast.success('Settings saved')
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async getSettings() {
      try {
        const { data } = await this.$axios.$get(`lead-module-settings-get`)
        data.executiveDashboardStatus &&
          (this.executiveDashboardStatus = data.executiveDashboardStatus)
        this.automaticLeadAssignment = data.automaticLeadAssignment
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async saveSettings() {
      try {
        await this.$axios.$post(`lead-module-settings-save`, {
          executiveDashboardStatus: this.executiveDashboardStatus,
        })
        this.$toast.success('Settings saved')
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
}
</script>
