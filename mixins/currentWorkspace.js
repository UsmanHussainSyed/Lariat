export default {
  data() {
    return {
      auth: this.$_auth(),
    }
  },
  computed: {
    workspaceId() {
      return this.auth ? this.auth.id : this.$route.params.workspace_id
    },
  },
  watch: {
    '$route.params'() {
      this.auth = this.$_auth()
    },
  },
}
