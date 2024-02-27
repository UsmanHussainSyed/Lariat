export default function ({
  $auth,
  $getUserModulesAndRoles,
  route,
  error,
  redirect,
  $_auth,
}) {
  const workspaceId = route.params.workspace_id
  const workspace = $auth.user.accessibleWorkspaces.find(
    ({ id }) => parseInt(id) === parseInt(workspaceId)
  )
  const user = $getUserModulesAndRoles(workspace)
  if (!user.hasDamAccess) {
    error({
      statusCode: 401,
      path: route.path,
      message: 'You are not authorized to access this page.',
    })
  }
}
