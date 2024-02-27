export default function ({ $auth, route, redirect }) {
  if (!$auth.loggedIn) {
    if (route.name !== 'preview_assets') {
      $auth.$storage.setUniversal('trackReferringUrl', true)
      $auth.$storage.setUniversal('referringUrlName', route.name)
      $auth.$storage.setUniversal('referringUrlParams', route.params)
      $auth.$storage.setUniversal('referringUrlQuery', route.query)
    }
    return redirect('/')
  }
}
