<template>
  <div class="note">
    <p>
      <strong class="text-danger">Note : </strong>You are updating under
      <strong>{{ internalWorkspace.name }}</strong> Workspace
    </p>
  </div>
</template>
<script>
export default {
  name: 'WorkspaceNote',
  data() {
    return {
      workspace_id: this.$_auth().id ? this.$_auth().id : null,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
    }
  },
  computed: {
    internalWorkspace() {
      return this.$auth.user.accessibleWorkspaces.find(
        ({ id }) => parseInt(id) === parseInt(this.internal_workspace_id)
      )
    },
  },
}
</script>
