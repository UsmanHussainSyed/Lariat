export default function ({ $auth, redirect, route }) {
  const workspace = $auth.$storage.getCookie('currentWorkspace')
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
  } else if (workspace.type === 'child') {
    redirect({
      name: workspace.user.redirectPathName,
      params: {
        workspace_id: workspace.id,
      },
    })
  } else if (!$auth.user.canCreateChildWorkspace) {
    redirect({
      name: workspace.user.redirectPathName,
      params: {
        workspace_id: workspace.id,
      },
    })
  }
}
