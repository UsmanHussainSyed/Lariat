<template>
  <div>
    <div class="sign-body bg-white">
      <h4>Generate Password</h4>
      <!-- <p>You’re generating password as {{ form.email }}</p> -->
      <form class="form" @submit.prevent="handleSubmit">
        <div class="row">
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
                v-if="$v.form.password.$error && !$v.form.password.required"
                class="input-error"
              >
                Please provide password
              </div>
              <div
                v-if="$v.form.password.$error && !$v.form.password.minLength"
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
                v-model.lazy="$v.form.password_confirmation.$model"
                type="password"
                class="form-control"
                data-lpignore="true"
              />
              <div
                v-if="
                  $v.form.password_confirmation.$error &&
                  !$v.form.password_confirmation.required
                "
                class="input-error"
              >
                Please provide confirm password
              </div>
              <div
                v-else-if="
                  $v.form.password_confirmation.$error &&
                  !$v.form.password_confirmation.sameAsPassword
                "
                class="input-error"
              >
                Password must match with confirm password
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

    <div v-if="isRedirecting" class="sign-body text-center p1">
      <h2>Your account setup is inprogress please wait a moment!</h2>
    </div>
  </div>
</template>
<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'outerLayout',
  data() {
    return {
      loading: false,
      isRedirecting: false,
      form: {
        password: null,
        password_confirmation: null,
        token: this.$route.query.token
          ? decodeURI(this.$route.query.token)
          : null,
      },
    }
  },
  async mounted() {},
  methods: {
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        const { message } = await this.$axios.$post(
          'generate-common-password',
          this.form
        )
        this.isRedirecting = true
        this.$toast.global.success(message)
        setTimeout(async () => {
          this.loading = false
          this.isRedirecting = false
          await this.$router.push('/')
        }, 3000)
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    form: {
      password: { required, minLength: minLength(6) },
      password_confirmation: { required, sameAsPassword: sameAs('password') },
    },
  },
}
</script>
