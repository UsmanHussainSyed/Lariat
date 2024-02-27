<template>
  <div class="sign-body bg-white pb0">
    <h3 class="text-center">Please wait..</h3>
    <form class="form" action="" method="post">
      <div class="row">
        <div class="col-sm-12 text-center">
          <a href="javascript:void(0);" class="cs-btn-blue btn-block">
            <img
              src="~/assets/img/icon/google-icon.svg"
              alt="Login With google"
            />We are logging you in...
          </a>
          <img
            src="~/assets/img/icon/preloader.svg"
            alt="Loading..."
            style="text-align: center; margin-top: -35px"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// comment for redeployment
export default {
  layout: 'outerLayout',
  middleware: ['guestCheck'],
  data() {
    return {
      myData: null,
      access_token: this.$route.query.access_token
        ? this.$route.query.access_token
        : null,
      error: null,
    }
  },
  async mounted() {
    if (this.access_token.toString() !== 'null') {
      // this.$auth.setToken('local', `Bearer ${this.access_token}`)
      this.$auth.strategy.token.set(`Bearer ${this.access_token}`)
      // this.$auth.setStrategy('local')

      try {
        await this.$auth.fetchUser()
      } catch (error) {
        this.$toast.error('Signin failed, Please try again')

        await this.$logout()
        return this.$router.replace('/')
      }
      // set auth token globally
      this.$setAuthToken()
      // set current workspace
      this.$auth.user.workspace_id &&
        this.$setCurrentWorkspace(this.$auth.user.workspace_id)

      // set redirects after login
      this.$nextStep()
    } else {
      this.$toast.error('You are not an authorized person to login.')
      return this.$router.push('/')
    }
  },
}
</script>
