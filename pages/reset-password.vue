<template>
  <div v-if="dataReady" class="sign-body bg-white">
    <h4>Reset Password</h4>
    <p>You’re resetting password as {{ user.email }}</p>
    <form class="form" @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group required">
            <label class="control-label">Password</label>
            <input
              v-model.lazy="$v.user.password.$model"
              type="password"
              class="form-control"
              autofocus
              data-lpignore="true"
            />
            <div
              v-if="$v.user.password.$error && !$v.user.password.required"
              class="input-error"
            >
              Please provide password
            </div>
            <div
              v-if="$v.user.password.$error && !$v.user.password.minLength"
              class="input-error"
            >
              Password must be at least 6 characters
            </div>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="form-group required">
            <label class="control-label">Confirm Password</label>
            <input
              v-model.lazy="$v.user.password_confirmation.$model"
              type="password"
              class="form-control"
              data-lpignore="true"
            />
            <div
              v-if="
                $v.user.password_confirmation.$error &&
                !$v.user.password_confirmation.required
              "
              class="input-error"
            >
              Please provide confirm password
            </div>
            <div
              v-else-if="
                $v.user.password_confirmation.$error &&
                !$v.user.password_confirmation.sameAsPassword
              "
              class="input-error"
            >
              Confirm password must match with password
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
            <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'outerLayout',
  middleware: ['guestCheck'],
  asyncData(ctx) {
    return {
      email: 'dddddd@gmail.com',
    }
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        password_confirmation: '',
        reset_token: '',
        token: this.$route.query.token
          ? decodeURI(this.$route.query.token)
          : '',
      },
      general_msg: '',
      loading: false,
      dataReady: false,
    }
  },
  async mounted() {
    await this.getPasswordDetails()
  },
  methods: {
    loginPage() {
      this.$router.push('/')
    },
    getPasswordDetails() {
      this.$axios
        .$post('reset-password-details', {
          token: this.user.token,
        })
        .then((res) => {
          const data = res.data
          this.user.reset_token = data.reset_token
          this.user.token = data.token
          this.user.email = data.email
          this.dataReady = true
        })
        .catch((e) => {
          this.$nuxt.error({
            statusCode: 410,
            path: this.$route.path,
            message:
              'access to the target resource is no longer available at the origin server',
          })
        })
    },
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.loading = true
      this.$axios
        .$post('reset-password', this.user)
        .then((response) => {
          this.loading = false
          this.$toast.global.success(
            `You have successfully reset your password`
          )
          this.$router.replace('/')
        })
        .catch((e) => {
          this.loading = false
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
  },
  validations: {
    user: {
      password: { required, minLength: minLength(6) },
      password_confirmation: { required, sameAsPassword: sameAs('password') },
    },
  },
}
</script>
