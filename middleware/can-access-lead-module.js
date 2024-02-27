export default function ({ $auth, route, redirect }) {
  const workspace = $auth.$storage.getCookie('currentWorkspace')
  if (workspace) {
    if (!workspace.module.length) {
      return redirect({
        name: 'workspace_id-choose-modules',
        params: {
          workspace_id: workspace.id,
        },
      })
    }
    if (!workspace.user.hasLeadAccess) {
      if (route.name !== workspace.user.redirectPathName) {
        redirect({
          name: workspace.user.redirectPathName,
          params: {
            workspace_id: workspace.id,
          },
        })
      }
    }
  }
}
