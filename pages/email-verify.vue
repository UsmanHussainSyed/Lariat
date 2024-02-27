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
      // Getting query string from url and decoding to to proper string
      // email-verify/?token=xQeiRdAB2FeTX2RPNV6iesN7L8KxFAWTV5h0U0t0Onk6mQmRCT
      // getting the token after question mark ?
      // if url doesn't contains token then add null
      invitation_token: this.$route.query.token
        ? decodeURI(this.$route.query.token)
        : null,
    }
  },

  async mounted() {
    this.loading = true
    try {
      const { message } = await this.$axios.$post(`email-verify/token`, {
        token: this.invitation_token,
      })
      this.loading = false
      this.message = message
      this.$toast.global.success(message)
    } catch (e) {
      this.loading = false
      this.message = this.$getErrorMessage(e)
      this.$toast.error(this.$getErrorMessage(e))
    }
  },
}
</script>
