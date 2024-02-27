<template>
  <div v-if="showAlertBar" class="search-result mt1 pl10 pr10">
    <div class="alert alert-warning alert-dismissible">
      Organization admin has disabled Email Notifications
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectNotificationAlert',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      internal_workspace_id: this.$route.params.workspace_id,
      showAlertBar: this.show,
    }
  },
  watch: {
    show(newVal) {
      this.showAlertBar = newVal
    },
  },
  mounted() {
    const workspace = this.$auth.user.accessibleWorkspaces.find(
      ({ id }) => parseInt(id) === parseInt(this.internal_workspace_id)
    )
    if (workspace) {
      if (workspace.project_notification_status) {
        this.showAlertBar = false
      } else {
        this.showAlertBar = true
      }
    }
  },
}
</script>

<style scoped></style>
