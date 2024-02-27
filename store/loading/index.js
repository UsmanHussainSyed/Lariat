export const state = () => ({
  isLoading: false,
  LoadingText: null,
})
export const mutations = {
  mutateLoading(state, payload) {
    state.isLoading = payload
  },
  mutateLoadingText(state, payload) {
    state.LoadingText = payload
  },
}
export const actions = {
  setOverlay(context, { isLoading, loadingText } = {}) {
    context.commit('mutateLoading', isLoading)
    context.commit('mutateLoadingText', loadingText)
  },
}

export const getters = {
  isLoading: (state) => state.isLoading,
  getLoadingText: (state) => state.LoadingText,
}
