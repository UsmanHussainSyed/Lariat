<template>
  <div class="main">
    <div v-if="IS_SUPPORT_PLATFORM" class="row no-gutters h-100">
      <div class="col-sm-6 h-100">
        <div class="sign-screen loginPage supportloginPage h-100">
          <div class="sign-screen-dtable">
            <div class="sign-screen-dtable-cell">
              <div class="sign-screen-content">
                <div class="sign-heading-text text-center">
                  <img
                    src="~/assets/img/lariat-marketing-hub.svg"
                    alt=""
                    class="img-responsive img-center"
                  />
                </div>
                <div class="sign-body bg-white">
                  <p>Login to support portal</p>
                  <form class="form" @submit.prevent="handleSubmit">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group required">
                          <label class="control-label">Email</label>
                          <input
                            v-model.lazy="$v.form.email.$model"
                            placeholder="Enter customer email id"
                            type="email"
                            class="form-control"
                            autofocus
                            data-lpignore="true"
                          />
                          <div
                            v-if="
                              $v.form.email.$error && !$v.form.email.required
                            "
                            class="input-error"
                          >
                            Please provide email
                          </div>
                          <div
                            v-if="$v.form.email.$error && !$v.form.email.email"
                            class="input-error"
                          >
                            Please provide valid email
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group required">
                          <label class="control-label">PIN</label>
                          <input
                            v-model.lazy="$v.form.password.$model"
                            placeholder="Enter 6 digit PIN"
                            type="password"
                            class="form-control"
                            data-lpignore="true"
                          />
                          <div
                            v-if="
                              $v.form.password.$error &&
                              !$v.form.password.required
                            "
                            class="input-error"
                          >
                            Please provide PIN
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <button
                          type="submit"
                          :class="{
                            'cs-btn-orange btn-block btn-spiner': true,
                            'btn-disable': loading,
                          }"
                          :disabled="loading"
                        >
                          <i
                            v-if="loading"
                            class="fa fa-circle-o-notch fa-spin"
                          ></i>
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="signin-with">
                  <a
                    class="cs-btn-blue btn-block"
                    href="javascript:void(0)"
                    @click="googleSignIn"
                  >
                    <img src="~/assets/img/icon/google-icon.svg" alt="" />Sign
                    in with Google
                  </a>
                </div>
              </div>
              <div class="bottom-fix-link-center">
                <a
                  href="https://www.marketinghub.com/terms-conditions/"
                  target="_blank"
                  >Term of use.</a
                >
                <a
                  href="https://www.marketinghub.com/privacy-policy/"
                  target="_blank"
                  >Privacy policy</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 h-100">
        <div
          class="h-100 d-flex align-items-center justify-content-center"
          style="padding-right: 10%"
        >
          <img
            src="~/assets/img/support-portal.svg"
            alt=""
            style="max-width: 100%"
          />
        </div>
      </div>
    </div>
    <div v-else class="row no-gutters h-100">
      <div class="col-sm-6 h-100">
        <div class="sign-screen loginPage customscrollbar h-100">
          <div class="sign-screen-dtable">
            <div class="sign-screen-dtable-cell">
              <div class="sign-screen-content">
                <div class="sign-heading-text text-center">
                  <img
                    src="~/assets/img/lariat-marketing-hub.svg"
                    alt=""
                    class="img-responsive img-center"
                  />
                </div>
                <div class="sign-body">
                  <p>Please login to your account</p>
                  <form class="form" @submit.prevent="handleSubmit">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group required">
                          <label class="control-label">Email</label>
                          <input
                            v-model.lazy="$v.form.email.$model"
                            type="email"
                            class="form-control"
                            autofocus
                            data-lpignore="true"
                          />
                          <div
                            v-if="
                              $v.form.email.$error && !$v.form.email.required
                            "
                            class="input-error"
                          >
                            Please provide email
                          </div>
                          <div
                            v-if="$v.form.email.$error && !$v.form.email.email"
                            class="input-error"
                          >
                            Please provide valid email
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="form-group required">
                          <label class="control-label">Password</label>
                          <input
                            v-model.lazy="$v.form.password.$model"
                            type="password"
                            class="form-control"
                            data-lpignore="true"
                          />
                          <div
                            v-if="
                              $v.form.password.$error &&
                              !$v.form.password.required
                            "
                            class="input-error"
                          >
                            Please provide password
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <button
                          type="submit"
                          :class="{
                            'cs-btn-orange btn-block btn-spiner': true,
                            'btn-disable': loading,
                          }"
                          :disabled="loading"
                        >
                          <i
                            v-if="loading"
                            class="fa fa-circle-o-notch fa-spin"
                          ></i>
                          Login
                        </button>
                      </div>
                      <div class="col-sm-12">
                        <div class="pull-right mt-18 text-right">
                          <nuxt-link class="forgotPass" to="/forgot-password"
                            >Forgot Password</nuxt-link
                          >
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="signin-with mt3">
                  <a
                    class="cs-btn-blue btn-block"
                    href="javascript:void(0)"
                    @click="googleSignIn"
                  >
                    <img src="~/assets/img/icon/google-icon.svg" alt="" />Sign
                    in with Google
                  </a>
                </div>
                <div
                  :style="{
                    maxWidth: '430px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    flexDirection: 'column',
                  }"
                >
                  <p style="margin: 25px 0px">OR</p>
                  <a
                    class="cs-btn-orange"
                    :style="{
                      color: '#ffffff',
                      backgroundColor: '#f37022',
                      borderColor: '#f37022',
                      width: '100%',
                    }"
                    href="https://app.whitelabeliq.com/"
                    >Go to White Label IQ</a
                  >
                </div>
              </div>
              <div class="bottom-fix-link-center">
                <a
                  href="https://www.marketinghub.com/terms-conditions/"
                  target="_blank"
                  >Term of use.</a
                >
                <a
                  href="https://www.marketinghub.com/privacy-policy/"
                  target="_blank"
                  >Privacy policy</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-sm-6 h-100"
        :style="{
          backgroundImage:
            'url(' + require('~/assets/img/lariat-big-icon.jpg') + ')',
        }"
        style="
          background-size: contain;
          background-position: right top;
          background-repeat: no-repeat;
        "
      >
        <!--        <img
          src="~/assets/img/lariat-big-icon.svg"
          alt=""
          style="position: relative; right: -23%; top: -26%; height: 115%"
        />-->
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  middleware: ['guestCheck'],
  asyncData({ req }) {
    const userAgent = req?.headers['user-agent']
    const isIpad = userAgent?.match(/iPad/)
    const isAndroid = userAgent?.match(/Android/)
    const isIphone = userAgent?.match(/iPhone/)
    // CAUTION: fails on browser's device simulator
    return { isIpad, isAndroid, isIphone }
  },
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: null,
      },
      userAgent: null,
      userLocation: null,
    }
  },
  computed: {
    IS_SUPPORT_PLATFORM() {
      return process.env.IS_SUPPORT_PLATFORM
    },
    userAgentAndLocationDetail() {
      return this.IS_SUPPORT_PLATFORM
        ? { location: this.userLocation, agent: this.userAgent }
        : {}
    },
  },
  mounted() {
    if (this.IS_SUPPORT_PLATFORM) this.getBrowserDetail()
    let routeUrl = this.$auth?.$storage?.getUniversal('referringRouteUrl') || ''
    if (routeUrl.startsWith('/')) routeUrl = routeUrl.substring(1)
    const MOBILE_APP_DOMAIN = process.env.MOBILE_APP_DOMAIN

    if ((this.isAndroid || this.isIphone || this.isIpad) && MOBILE_APP_DOMAIN) {
      window.location.href = MOBILE_APP_DOMAIN + routeUrl
    }
  },
  methods: {
    googleSignIn() {
      if (this.checkIfAlreadyLogin()) {
        this.processIfAlreadyLoggedIn()
        return
      }
         window.open(this.$config.googleAuthUrl, "_blank", "width=1000, height=1000"); 
    },

    checkIfAlreadyLogin() {
      const workspace = this.$auth.$storage.getCookie('currentWorkspace')
      return workspace && this.$auth.loggedIn
    },
    processIfAlreadyLoggedIn() {
      this.$toast.show(
        'One Session is already started. We are redirecting you to the running session.'
      )
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    },
    logout() {
      this.$auth.logout()
    },
    async handleSubmit() {
      if (this.checkIfAlreadyLogin()) {
        this.processIfAlreadyLoggedIn()
        return
      }
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.loading = true
        const data = {
          email: this.form.email,
          password: this.form.password,
        }
        if (this.IS_SUPPORT_PLATFORM)
          data.userAgentAndLocation = this.userAgentAndLocationDetail
        await this.$auth.loginWith('local', {
          data,
        })
        // set auth token globally
        this.$setAuthToken()
        // set current workspace
        this.$auth.user.workspace_id &&
          this.$setCurrentWorkspace(this.$auth.user.workspace_id)

        this.$nextStep()
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async getBrowserDetail() {
      try {
        const {
          data: { userLocation, userAgent },
        } = await axios.get(location.origin + '/api/browser-os')
        this.userLocation = userLocation
        this.userAgent = userAgent
      } catch (e) {}
    },
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
}
</script>

<style></style>
