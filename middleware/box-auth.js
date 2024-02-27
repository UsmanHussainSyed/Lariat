export default function ({ query, redirect }) {
  const { code, state = '' } = query
  const [workspace_id, instance_id] = state.split('_')

  const _query = code
    ? {
        code,
        referrer: 'BOX',
      }
    : {}

  const params = {}

  if (workspace_id) {
    params.workspace_id = workspace_id
  }
  if (instance_id) {
    params.instance_id = instance_id
  }
  return redirect({
    name: 'workspace_id-workspace-settings-dam-instance_id-integration',
    params,
    query: _query,
  })
}
