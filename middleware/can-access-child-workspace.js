export default function ({ $auth, redirect }) {
  const workspace = $auth.$storage.getCookie('currentWorkspace')
  if ($auth.loggedIn && workspace.module.length) {
    redirect({
      name: workspace.user.redirectPathName,
      params: {
        workspace_id: workspace.id,
      },
    })
  }
}
