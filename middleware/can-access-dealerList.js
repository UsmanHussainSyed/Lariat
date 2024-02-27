export default function ({ $_auth, $auth, redirect }) {
  const workspace = $auth.$storage.getCookie('currentWorkspace')
  if ($_auth().user.lead && !checkIsAccessable($_auth)) {
    redirect({
      name: workspace.user.redirectPathName,
      params: {
        workspace_id: workspace.id,
      },
    })
  }
}
function checkIsAccessable($_auth) {
  if (
    $_auth().user.lead.isSuperAdmin ||
    $_auth().user.lead.isDealerGroupAdmin
  ) {
    return true
  }
  return false
}
