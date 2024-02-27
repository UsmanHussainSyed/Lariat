export default function ({ $auth, route, app, redirect }) {
  const workspace = $auth.$storage.getCookie('currentWorkspace')
  if (workspace) {
    if (workspace.module?.length === 0) {
      if (
        workspace.type === 'parent' &&
        route.name !== 'workspace_id-choose-modules'
      ) {
        return redirect({
          name: 'workspace_id-choose-modules',
          params: {
            workspace_id: workspace.id,
          },
        })
      }
      if (
        workspace.type === 'child' &&
        route.name !== 'workspace_id-child-workspace-choose-modules'
      ) {
        return redirect({
          name: 'workspace_id-child-workspace-choose-modules',
          params: {
            workspace_id: workspace.id,
          },
        })
      }
    } else if (route.name !== workspace.user?.redirectPathName) {
      redirect({
        name: workspace.user?.redirectPathName,
        params: {
          workspace_id: workspace.id,
        },
      })
    }
  }
}
