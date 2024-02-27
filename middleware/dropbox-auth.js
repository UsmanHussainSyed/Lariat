export default function ({ query, redirect }) {
  const { code, state } = query
  const [workspace_id, instance_id] = state.split('_')
  const _query =
    code && state
      ? {
          code,
          state,
          referrer: 'DROPBOX',
        }
      : {}
  return redirect({
    name: 'workspace_id-workspace-settings-dam-instance_id-integration',
    params: {
      workspace_id,
      instance_id,
    },
    query: _query,
  })
}
