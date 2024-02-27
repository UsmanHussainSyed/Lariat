<!-- remove this file & all usages after 22/02/2023 -->
<template>
  <div
    v-if="canShowModal"
    class="modal fade show"
    :style="canShowModal ? 'display:block' : 'display:none'"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content modal-md">
        <div class="modal-body">
          <div class="mb2 mt1 text-center">
            <p class="mb-2">
              Project Management service has been moved to our new domain
              <a
                href="https://app.Whitelabeliq.com"
                target="_blank"
                style="color: #007bff"
                >app.whitelabeliq.com</a
              >.
            </p>
            <!-- <p class="mb-2">
              If you are here to access DAM service, kindly close this dialog
              and login.
            </p> -->
          </div>
          <div class="text-center mb1">
            <div class="d-flex align-items-center justify-content-center">
              <a
                href="javascript:void(0)"
                class="btn btn-gray"
                style="background: #f37022; border: none"
                @click="gotoWhiteLabel"
                >Go To WhiteLabelIQ&nbsp;
              </a>
              <!-- <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                aria-label="Close"
                @click="logout"
                >Logout</a
              > -->
            </div>
            <p
              class="m-2"
              :style="{
                fontSize: '0.75rem',
                fontStyle: 'italic',
                letterSpacing: '0.03rem',
              }"
            >
              Clicking on this button will log you out from this platform and
              automatically redirect on app.WhitelabelIQ.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const blockedSettingsRoutes = [
  // 'workspace_id-workspace-settings-sharpspring',
  // 'workspace_id-workspace-settings-sharpspring',
  // 'workspace_id-workspace-settings-sharpspring',
  // 'workspace_id-workspace-settings-sharpspring',
  // 'workspace_id-workspace-settings-dealership-settings',
  // 'workspace_id-workspace-settings-lm',
  'workspace_id-workspace-settings-client',
  'workspace_id-workspace-settings-project',
  'workspace_id-workspace-settings-task',
  'workspace_id-workspace-settings-work-type',
  'workspace_id-workspace-settings-announcements-list',
  'workspace_id-workspace-settings-leave-settings',
  'workspace_id-workspace-settings-template-tags',
]
export default {
  data() {
    return {}
  },
  computed: {
    isPMRoute() {
      return /([0-9]+)\/project\/?([0-9]|[a-z]|[A-Z]?)/gi.test(
        this.$route.fullPath
      )
    },
    canShowModal() {
      return (
        this.$auth.loggedIn &&
        (blockedSettingsRoutes.includes(this.$route.name) || this.isPMRoute)
      )
    },
  },
  methods: {
    logout() {
      this.$logout()
      this.$clearAuthCookies()
    },
    gotoWhiteLabel() {
      this.logout()
      window.location.href = 'https://app.whitelabeliq.com'
    },
  },
}
</script>

<style></style>
