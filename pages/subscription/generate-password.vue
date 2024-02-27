<template>
  <div class="main">
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <img
                :src="require('~/assets/img/lariat-marketing-hub.svg')"
                alt=""
                class="img-responsive img-center"
              />
            </div>
            <div v-if="verifying" class="sign-body-message">
              Please wait. Preparing you DAM.
            </div>
            <div class="sign-body bg-white" v-else-if="tokenVerified">
              <h4>Generate Password</h4>
              <p>
                You’re generating password as <b>{{ email }}</b>
              </p>
              <form class="form" @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        autofocus
                        required
                        v-model="$v.password.$model"
                      />
                      <div class="input-error" v-if="this.$v.password.$error">
                        Please provide password
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Confirm Password</label>
                      <input
                        type="password"
                        class="form-control"
                        autofocus
                        required
                        v-model="$v.rePassword.$model"
                      />
                      <div
                        v-if="$v.rePassword.$error && !$v.rePassword.required"
                        class="input-error"
                      >
                        Please re-enter password
                      </div>
                      <div
                        v-else-if="
                          $v.rePassword.$error && !$v.rePassword.sameAsPassword
                        "
                        class="input-error"
                      >
                        Password does not match
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <button
                      type="submit"
                      :class="{
                        'cs-btn-orange btn-block': true,
                        'btn-disable': loading,
                        disabled: loading,
                      }"
                      :disabled="loading"
                    >
                      <i
                        v-if="loading"
                        class="fa fa-circle-o-notch fa-spin"
                      ></i>
                      Submit
                    </button>
                  </div>
                  <!-- <div class="col-sm-12">
                    <div class="pull-right mt-18 text-right">
                      <a class="forgotPass" href="index.html">
                        <svg
                          class="back-long-arrow-icon"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512 512"
                          xml:space="preserve"
                        >
                          <g>
                            <path
                              class="fill-color"
                              d="M492,236H68.4l70.2-69.8c7.8-7.8,7.9-20.5,0.1-28.3c-7.8-7.8-20.5-7.9-28.3-0.1L5.9,241.8c0,0,0,0,0,0c-7.8,7.8-7.8,20.5,0,28.3c0,0,0,0,0,0l104.5,104c7.8,7.8,20.5,7.8,28.3-0.1c7.8-7.8,7.8-20.5-0.1-28.3L68.4,276H492c11,0,20-9,20-20C512,245,503,236,492,236z"
                            ></path>
                          </g>
                        </svg>
                        Back to Login
                      </a>
                    </div>
                  </div> -->
                </div>
              </form>
            </div>
            <!-- <div v-else class="sign-body-message">Your token has expired.</div> -->
          </div>
          <div class="bottom-fix-link-center">
            <a href="javascript:void(0);">Term of use.</a>
            <a href="javascript:void(0);">Privacy policy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  asyncData({ $auth, redirect }) {
    if ($auth.loggedIn) {
      return redirect({
        path: '/',
      })
    }
  },
  data() {
    return {
      token: null,
      loading: false,
      verifying: false,
      password: '',
      rePassword: '',
      email: null,
      linkExpired: false,
      tokenVerified: false,
    }
  },
  mounted() {
    this.token = this.$route.query?.token
    if (!this.token) {
      return this.$router.replace({ path: '/' })
    }
    this.verifyToken()
  },
  methods: {
    verifyToken() {
      this.verifying = true
      return new Promise((resolve) => {
        this.$axios
          .$post('subscription/inquiry/details', {
            token: this.$route.query.token,
          })
          .then((r) => {
            this.tokenVerified = true
            this.email = r.data.email
          })
          .catch((e) => {
            this.$toast.global.error('Invalid token.')
            this.tokenVerified = false
          })
          .finally(() => {
            this.verifying = false
            resolve()
          })
      })
    },
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
      this.$axios
        .$post('subscription/create-password', {
          token: this.$route.query.token,
          password: this.password,
        })
        .then((r) => {
          this.$router.replace({ path: '/' })
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  validations: {
    password: { required, minLength: minLength(6) },
    rePassword: { required, sameAsPassword: sameAs('password') },
  },
}
</script>
<style scoped>
.sign-body-message {
  max-width: 480px;
  padding: 20px;
  text-align: center;
  margin: 0 auto;
}
</style>
