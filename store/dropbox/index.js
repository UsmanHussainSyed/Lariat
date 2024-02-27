export const state = () => ({
  token: null,
  user: {},
  icon: require('~/assets/img/dropbox-blue.svg'),
  disconnected: false,
})
export const mutations = {
  setDropboxToken(state, payload) {
    state.token = payload
  },
  setDropboxUser(state, { name, email, details = {} } = {}) {
    state.user = { name, email, details }
  },
  setDisconnected(state, payload) {
    state.disconnected = !!payload
  },
}
export const actions = {
  getToken(context, payload) {
    return this.$axios
      .$get(
        'digital-assets/get-app-token?' +
          this.$toQueryString({
            workspace_id: payload,
            timestamp: Date.now(),
          })
      )
      .then(({ data }) => {
        context.commit('setDropboxToken', data.dropbox.token)
      })
      .catch((_) => {
        context.commit('setDropboxToken', null)
      })
  },
  setToken({ commit }, { workspace_id, dropbox_token } = {}) {
    return this.$axios
      .$post('digital-assets/update-app-token', {
        workspace_id,
        dropbox_token,
      })
      .then((_) => {
        commit('setDropboxToken', dropbox_token)
      })
      .catch((_) => {
        commit('setDropboxToken', null)
      })
  },
  setUser(context, payload) {
    context.commit('setDropboxUser', payload)
  },
  setDisconnected(context, payload) {
    context.commit('setDisconnected', !!payload)
  },
}

export const getters = {
  token: (state) => state.token,
  user: (state) => state.user,
  icon: (state) => state.icon,
  disconnected: (state) => state.disconnected,
}
