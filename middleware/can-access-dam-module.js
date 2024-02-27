export default async function ({
  $auth,
  route,
  $getUserModulesAndRoles,
  store,
  redirect,
  error,
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
    if (!workspace.user.hasDamAccess) {
      if (route.name !== workspace.user.redirectPathName) {
        return redirect({
          name: workspace.user.redirectPathName,
          params: {
            workspace_id: workspace.id,
          },
        })
      }
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

    if (!instance || !Object.keys(instance)?.length) {
      if ($auth.user.subscription_user) {
        return redirect({
          name: 'workspace_id-add-dam-instance',
          params: { workspace_id: workspace.id },
        })
      }
      redirect({
        name: 'workspace_id-create-dam-instance',
        params: { workspace_id: workspace.id },
      })
    }
  }
}
