export default function ({ $auth, route, redirect, store }) {
  if (!$auth.loggedIn) {
    if (route.name !== 'preview_assets') {
      $auth.$storage.setUniversal('trackReferringUrl', true)
      $auth.$storage.setUniversal('referringUrlName', route.name)
      $auth.$storage.setUniversal('referringUrlParams', route.params)
      $auth.$storage.setUniversal('referringUrlQuery', route.query)
      $auth.$storage.setUniversal('referrinRouteUrl', route.fullPath)
    }
    return redirect('/')
  } else if (
    typeof route.params.workspace_id === 'string' &&
    !$auth.user.accessibleWorkspaces
      ?.map(({ id }) => id)
      .includes(route.params.workspace_id)
  ) {
    $auth.$storage.setUniversal('switchWorkspaceId', route.params.workspace_id)
    return redirect('/')
  }
  if ($auth.loggedIn && route.params.workspace_id) {
    store.dispatch('dam/setBranding', {
      workspace_id: route.params.workspace_id
        ? route.params.workspace_id
        : $auth.id,
      isSetFavicon: true,
    })
  }
}
