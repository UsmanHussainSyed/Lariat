export default function (context) {
  context.$axios.onRequest((config) => {
    const urlWorkspaceId = context.route.params.workspace_id
    config.params = config.params || {}
    config.params.url_workspace_id = urlWorkspaceId
  })
  /* context.$axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      context.store.commit('setForceLogin', true)
    }
    if (code === 420) {
      return context.redirect('/401')
    }
  }) */
  context.$axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      context.$clearAuthCookies()
      context.error({
        statusCode: 401,
        path: context.route.path,
        message: 'Session is expired.',
      })
    }
  })
}
