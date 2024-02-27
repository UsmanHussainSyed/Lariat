export const actions = {
  nuxtClientInit({ commit }, context) {
    window.onNuxtReady(() => {
      let currentVal = this.$auth.loggedIn
      this.$auth.$storage.watchState('loggedIn', (newValue) => {
        this.$auth.$storage.setUniversal('loggedIn', newValue)
        currentVal = this.$auth.loggedIn
      })

      window.addEventListener('storage', async () => {
        this.$auth.$storage.syncUniversal('loggedIn', false)
        if (currentVal !== this.$auth.loggedIn) {
          if (this.$auth.loggedIn) {
            await this.$auth.fetchUser()
          } else {
            commit('auth/SET', { key: 'user', value: false })
          }
        }
        currentVal = this.$auth.loggedIn
      })
    })
  },
  startOverlay(context, [isLoading, loadingText] = [true, 'Loading']) {
    context.commit('loading/mutateLoading', isLoading)
    context.commit('loading/mutateLoadingText', loadingText)
  },
  stopOverlay(context) {
    context.commit('loading/mutateLoading', false)
  },
}
