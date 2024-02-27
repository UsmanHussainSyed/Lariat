<template>
  <div class="sign-body bg-white">
    <h4>SignUp</h4>
    <p>Enter your account information below.</p>
    <p>Fields marked with an asterisk (*) are required.</p>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group required">
            <label class="control-label">Full Name</label>
            <input
              v-model.lazy="$v.form.name.$model"
              type="text"
              class="form-control"
              autofocus
              data-lpignore="true"
            />
            <div
              v-if="$v.form.name.$error && !$v.form.name.required"
              class="input-error"
            >
              Please provide full name
            </div>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="form-group required">
            <label class="control-label">Email</label>
            <input
              v-model.lazy="$v.form.email.$model"
              type="email"
              class="form-control"
              data-lpignore="true"
            />
            <div
              v-if="$v.form.email.$error && !$v.form.email.required"
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
            SignUp
          </button>
        </div>
        <div class="col-sm-12">
          <h5>
            Already have an account?
            <nuxt-link to="/">Sign In</nuxt-link>
          </h5>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  layout: 'outerLayout',
  middleware: ['guestCheck'],
  data() {
    return {
      loading: false,
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        timezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Calcutta'
            ? 'Asia/Kolkata'
            : Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    }
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.loading = true
        // register user
        await this.$axios.$post('register', this.form)
        // login user
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        // set auth token globally
        this.$setAuthToken()
        // set current workspace
        this.$auth.user.workspace_id &&
          this.$setCurrentWorkspace(this.$auth.user.workspace_id)
        // set redirects after register
        this.$nextStep()
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
        this.loading = false
      }
    },
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_confirmation: { required, sameAsPassword: sameAs('password') },
    },
  },
}
</script>
