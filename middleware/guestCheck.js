export default function ({ $auth, app, redirect }) {
  if ($auth.loggedIn) {
    const workspace = $auth.$storage.getCookie('currentWorkspace')
    if (workspace) {
      // if no module selected
      if (workspace.module?.length === 0) {
        return redirect({
          name: 'workspace_id-choose-modules',
          params: {
            workspace_id: workspace.id,
          },
        })
      } else {
        redirect({
          name: workspace.user?.redirectPathName,
          params: {
            workspace_id: workspace.id,
          },
        })
      }
    } else {
      return redirect({ name: 'create-workspace' })
    }
  }
}
