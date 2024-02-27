<template>
  <div class="sign-body bg-white">
    <div v-if="loading">Loading</div>
    <p v-else>{{ message }}</p>
  </div>
</template>
<script>
export default {
  layout: 'outerLayout',
  data() {
    return {
      loading: false,
      message: '',
      invitation_token: this.$route.query.invitation_token
        ? decodeURI(this.$route.query.invitation_token)
        : null,
      type: this.$route.query.type ? decodeURI(this.$route.query.type) : null,
    }
  },

  async mounted() {
    this.loading = true
    try {
      const { status, message } = await this.$axios.$post(
        `verify-dealer-user`,
        {
          invitation_token: this.invitation_token,
          type: this.type,
        }
      )
      this.loading = false
      this.message = message
      this.$toast.success(message)
      if (status) {
        await this.$router.replace('/')
      }
    } catch (e) {
      this.loading = false
      this.message = this.$getErrorMessage(e)
      this.$toast.error(this.$getErrorMessage(e))
    }
  },
}
</script>
