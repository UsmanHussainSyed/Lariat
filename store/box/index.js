import axios from 'axios'

export const state = () => ({
  user: {},
  session: {},
  accessToken: null,
  refreshToken: null,
  accessTokenTTLMS: 0,
  acquiredAtMS: 0,
  icon: require('~/assets/img/box.svg'),
  disconnected: false,
})
export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
  },
  setRefreshToken(state, token) {
    state.refreshToken = token
  },
  setAcquiredAtMS(state, val) {
    state.acquiredAtMS = val
  },
  setAccessTokenTTLMS(state, val) {
    state.accessTokenTTLMS = val
  },
  setUser(state, payload) {
    state.user = payload
  },
  setSession(state, payload) {
    state.session = payload
  },
  setDisconnected(state, payload) {
    state.disconnected = !!payload
  },
}
export const actions = {
  revokeToken({ state }) {
    return axios.post(window.location.origin + '/box/revoke-token', {
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      accessTokenTTLMS: state.accessTokenTTLMS,
      acquiredAtMS: state.acquiredAtMS,
    })
  },
  refreshToken({ state, commit, dispatch }, { workspace_id } = {}) {
    if (!workspace_id) {
      throw new Error('Provide workspace id to refresh token')
    }
    return axios
      .post(window.location.origin + '/box/refresh-token', {
        refresh_token: state.refreshToken,
      })
      .then(async (res) => {
        const { access_token, refresh_token } = res.data
        await this.$axios
          .$post('digital-assets/update-app-token', {
            workspace_id,
            box_access_token: access_token,
            box_refresh_token: refresh_token,
            box_connect: 1,
          })
          .then(() => {
            commit('setAccessToken', access_token)
            commit('setRefreshToken', refresh_token)
            dispatch('setDisconnected', false)
          })
          .then(() => {
            dispatch('getUser', { workspace_id })
          })
      })
      .catch(async (e) => {
        await this.$axios.$post('digital-assets/update-app-token', {
          workspace_id,
          box_connect: 0,
        })
        // await dispatch('getTokens', workspace_id)
        await dispatch('setDisconnected', true)
      })
  },
  getUser({ state, commit, dispatch }, { workspace_id } = {}) {
    if (!state.accessToken) return
    return axios
      .get('/box/user', {
        params: {
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          accessTokenTTLMS: state.accessTokenTTLMS,
          acquiredAtMS: state.acquiredAtMS,
        },
      })
      .then((res) => {
        commit('setUser', { name: res.data.name, email: res.data.login })
        commit('setSession', res.data)
        commit('setDisconnected', false)
      })
      .catch(async (e) => {
        if (e?.response?.data?.authExpired) {
          await dispatch('refreshToken', { workspace_id })
        } else {
          // commit('setAccessToken', null)
          // commit('setRefreshToken', null)
          // commit('setAccessTokenTTLMS', 0)
          // commit('setAcquiredAtMS', 0)
          commit('setDisconnected', true)
        }
      })
  },
  getTokens({ commit }, { workspace_id }) {
    return this.$axios
      .$get(
        'digital-assets/get-app-token?' +
          this.$toQueryString({
            workspace_id,
            timestamp: Date.now(),
          })
      )
      .then(({ data }) => {
        const {
          box: {
            access_token,
            refresh_token,
            box_access_token_ttl,
            box_acquired_at,
            box_connect,
          } = {},
        } = data
        commit('setAccessToken', access_token)
        commit('setRefreshToken', refresh_token)
        commit('setAccessTokenTTLMS', box_access_token_ttl)
        commit('setAcquiredAtMS', box_acquired_at)
        commit('setDisconnected', !box_connect)
      })
      .catch((_) => {
        // commit('setAccessToken', null)
        // commit('setRefreshToken', null)
        // commit('setAccessTokenTTLMS', 0)
        // commit('setAcquiredAtMS', 0)
        commit('setDisconnected', false)
      })
  },
  setDisconnected(context, payload) {
    context.commit('setDisconnected', !!payload)
  },
}

export const getters = {
  user: (state) => state?.user,
  session: (state) => state?.session,
  accessToken: (state) => state?.accessToken,
  refreshToken: (state) => state?.refreshToken,
  acquiredAtMS: (state) => state?.acquiredAtMS,
  accessTokenTTLMS: (state) => state?.accessTokenTTLMS,
  icon: (state) => state?.icon,
  disconnected: (state) => state.disconnected,
}
