export default function ({ $auth, $getUserModulesAndRoles, route, error }) {
  const workspaceId = route.params.workspace_id
  const workspace = $auth.user.accessibleWorkspaces.find(
    ({ id }) => parseInt(id) === parseInt(workspaceId)
  )
  const user = $getUserModulesAndRoles(workspace)
  if (!user.hasGeneralSettingsAccess || workspace.is_suspended) {
    error({
      statusCode: 401,
      path: route.path,
      message: 'You are not authorized to access this page.',
    })
  }
}
