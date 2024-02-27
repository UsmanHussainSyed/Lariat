export default function ({ $auth, redirect, $logout }) {
  const workspace = $auth.$storage.getCookie('currentWorkspace')
  if ($auth.loggedIn && (!workspace || workspace.id === 0)) {
    $logout()
    return redirect('/')
  }
}
