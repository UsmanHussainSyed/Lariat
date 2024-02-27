export default async function ({
  $auth,
  route,
  error,
  $getUserModulesAndRoles,
  store,
  redirect,
}) {
  const workspace = $auth.$storage.getCookie('currentWorkspace')
  if (workspace) {
    if (!workspace.module?.length) {
      return redirect({
        name: 'workspace_id-choose-modules',
        params: {
          workspace_id: workspace.id,
        },
      })
    }
    const workspaceId = route.params.workspace_id
    const workspaceData = $auth.user.accessibleWorkspaces.find(
      ({ id }) => parseInt(id) === parseInt(workspaceId)
    )
    const user = $getUserModulesAndRoles(workspaceData)
    if (!user.hasDamAccess) {
      return error({
        status: 401,
        path: route.path,
        message: 'You are not authorized to access this page.',
      })
    }

    const instance = Object.keys(store.state.dam.damInstance)?.length
      ? store.state.dam.damInstance
      : await store.dispatch('dam/getInstances', workspace.id)

    if (instance?.id)
      error({
        status: '409',
        message: 'You already have a dam instance created',
        name: 'workspace.user.redirectPathName',
        params: {
          workspace_id: workspace.id,
        },
      })
  }
}
