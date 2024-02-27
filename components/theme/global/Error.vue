<template>
  <div class="body-content p0">
    <div class="sign-screen customscrollbar h-100 w-100 bg-white">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body page404">
              <div class="error-text">
                <h2>{{ error.statusCode }}</h2>
                <h4 v-if="error.statusCode != 401">{{ errorMessage }}</h4>
                <h4
                  v-if="
                    error.statusCode == 401 && errorMessage != 'Unauthenticated'
                  "
                >
                  {{ errorMessage }}
                </h4>
                <h4
                  v-if="
                    error.statusCode == 401 && errorMessage == 'Unauthenticated'
                  "
                >
                  Session is expired.
                </h4>
                <a @click="backToHome">Back to Home</a>
              </div>
              <div class="error-img">
                <img src="~/assets/img/404-bg.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <platform-migration-warning />
  </div>
</template>
<script>
import PlatformMigrationWarning from '~/components/platform-migration-warning'
export default {
  name: 'Error',
  components: { PlatformMigrationWarning },
  props: {
    error: {
      type: [Object],
    },
  },
  computed: {
    errorMessage() {
      return process.env.NODE_ENV === 'production' &&
        parseInt(this.error.statusCode) !== 404
        ? 'Woops! something went wrong'
        : this.error.message
    },
  },
  methods: {
    async backToHome() {
      const workspace = this.$auth.$storage.getCookie('currentWorkspace')
      if (workspace) {
        this.$router.push('/')
      } else {
        await this.$logout()
        window.location.reload()
      }
    },
  },
}
</script>
