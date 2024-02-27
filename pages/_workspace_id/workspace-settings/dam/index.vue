<script>
/* eslint-disable camelcase */

export default {
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  async asyncData({ params: { workspace_id }, redirect, store, error }) {
    const instance = Object.keys(store.state.dam.damInstance).length
      ? store.state.dam.damInstance
      : await store.dispatch('dam/getInstances', workspace_id)

    if (!Object.keys(instance || {}).length)
      return error({ message: 'No dam instance available' })

    redirect({
      name: 'workspace_id-workspace-settings-dam-instance_id',
      params: {
        workspace_id,
        instance_id: instance.id,
      },
    })
  },
}
</script>
