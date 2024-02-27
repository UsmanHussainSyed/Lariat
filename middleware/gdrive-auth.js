export default function ({ query, redirect }) {
  const { code, scope, state } = query
  const [workspace_id, instance_id] = state.split('_')
  const _query =
    code && scope
      ? {
          code,
          scope,
          referrer: 'GOOGLE_DRIVE',
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
