export default {
  computed: {
    currentRouteName() {
      return this.$route.name
    },
    routeInstanceId() {
      return (
        this.$route.params.instance_id || this.$store.state.dam.damInstance?.id
      )
    },
    fetchingInstances() {
      return this.$store.state.dam.fetchingInstances
    },
    routeWorkspaceId() {
      return this.$route.params.workspace_id
    },
  },
}
