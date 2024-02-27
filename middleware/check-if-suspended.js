export default function ({
  $auth,
  $getUserModulesAndRoles,
  redirect,
  route,
  error,
}) {
  const workspaceId = route.params.workspace_id
  const workspace = $auth.user?.accessibleWorkspaces?.find(
    ({ id }) => parseInt(id) === parseInt(workspaceId)
  )
  const user = $getUserModulesAndRoles(workspace)
  if (workspace?.is_suspended) {
    if (user.dam.isAdmin && route.name !== 'workspace_id-dam') {
      redirect({
        name: 'workspace_id-dam',
        params: { workspace_id: workspaceId },
      })
    } else
      error({
        statusCode: 401,
        path: route.path,
        message: 'You are not authorized to access this page.',
      })
  }
}
