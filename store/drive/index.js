import axios from 'axios'

export const state = () => ({
  user: {},
  session: {},
  driveRoot: null,
  currentDrive: 'My Drive',
  accessToken: null,
  refreshToken: null,
  icon: require('~/assets/img/google-drive.svg'),
  disconnected: false,
})
export const mutations = {
  setAccessToken(state, token) {
    state.accessToken = token
  },
  setRefreshToken(state, token) {
    state.refreshToken = token
  },
  setDriveUser(state, payload) {
    state.user = payload
  },
  setDriveSession(state, payload) {
    state.session = payload
  },
  setCurrentDrive(state, payload) {
    state.currentDrive = payload
  },
  setDriveRoot(state, payload) {
    state.driveRoot = payload
  },
  setDisconnected(state, payload) {
    state.disconnected = !!payload
  },
}
export const actions = {
  reAuthDrive({ state, commit, dispatch }, { workspace_id } = {}) {
    if (!workspace_id) {
      throw new Error('Provide workspace id to refresh token')
    }
    // if (!state.refreshToken) return
    return axios
      .post(window.location.origin + '/driveapi/refresh-access', {
        refresh_token: state.refreshToken,
      })
      .then(async (res) => {
        const { token: { access_token, refresh_token } = {} } = res.data
        await this.$axios.$post('digital-assets/update-app-token', {
          workspace_id,
          access_token,
          refresh_token,
          gdrive_connect: 1,
        })
        await dispatch('getTokens', workspace_id)
        await dispatch('getDriveUser', { workspace_id })
      })
      .catch(async (_) => {
        await this.$axios.$post('digital-assets/update-app-token', {
          workspace_id,
          gdrive_connect: 0,
        })
        await dispatch('setDisconnected', true)
        await dispatch('getTokens', workspace_id)
      })
  },
  getDriveUser(context, { workspace_id } = {}) {
    if (!context.state.accessToken) return
    return axios
      .get('https://www.googleapis.com/drive/v3/about?fields=*', {
        headers: {
          Authorization: `Bearer ${context.state.accessToken}`,
        },
      })
      .then((res) => {
        context.commit('setDriveUser', res.data.user)
        context.commit('setDriveSession', res.data)
        context.commit('setDisconnected', false)
      })
      .catch(async (e) => {
        // context.commit('setAccessToken', null)
        // context.commit('setRefreshToken', null)
        const { code, message } = e?.response?.data?.error
        if (code === 401 && message === 'Invalid Credentials') {
          // TODO: need to find proper reason for access_token expration
          await context.dispatch('reAuthDrive', { workspace_id })
        } else {
          this.$toast.error(e?.response?.data?.error)
        }
      })
  },
  getTokens(context, payload) {
    return this.$axios
      .$get(
        'digital-assets/get-app-token?' +
          this.$toQueryString({
            workspace_id: payload,
            timestamp: Date.now(),
          })
      )
      .then(({ data }) => {
        const { google_drive: { access_token, refresh_token } = {} } = data
        context.commit('setAccessToken', access_token)
        context.commit('setRefreshToken', refresh_token)
      })
      .catch((_) => {
        context.commit('setAccessToken', null)
        context.commit('setRefreshToken', null)
      })
  },
  setDisconnected(context, payload) {
    context.commit('setDisconnected', !!payload)
  },
}

export const getters = {
  user: (state) => state.user,
  session: (state) => state.session,
  accessToken: (state) => state.accessToken,
  refreshToken: (state) => state.refreshToken,
  icon: (state) => state.icon,
  driveRoot: (state) => state.driveRoot,
  currentDrive: (state) => state.currentDrive,
  disconnected: (state) => state.disconnected,
}
