<template>
  <Error :error="error" />
</template>

<script>
import Error from '@/components/theme/global/Error'
export default {
  components: { Error },
  layout({ $auth, route }) {
    const workspace = $auth.$storage.getCookie('currentWorkspace')
    if ($auth.loggedIn && workspace) {
      return route.path.includes('workspace-settings')
        ? 'error-layouts/settingsError'
        : 'error-layouts/authError'
    } else if ($auth.loggedIn && !workspace) {
      return 'error-layouts/guestError'
    } else if (!$auth.loggedIn) {
      return 'error-layouts/guestError'
    }
  },
  props: {
    error: {
      type: [Object],
    },
  },
  computed: {
    layout() {
      if (this.$auth.loggedIn) {
        return this.$route.path.includes('workspace-settings')
          ? 'generalSettingsLayout'
          : 'projectLayout'
      } else {
        return 'outerLayout'
      }
    },
  },
}
</script>
