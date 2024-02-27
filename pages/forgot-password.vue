<template>
  <div class="sign-body bg-white">
    <h4>Forgot Password?</h4>
    <p>Enter your email and we will send you a password reset link.</p>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group required">
            <label class="control-label">Email</label>
            <input
              v-model.lazy="$v.form.email.$model"
              type="text"
              class="form-control"
              autofocus
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
          <button
            type="submit"
            :class="{
              'cs-btn-orange btn-block btn-spiner': true,
              'btn-disable': loading,
            }"
            :disabled="loading"
          >
            <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i> Send
            Password Reset Link
          </button>
        </div>
        <div class="col-sm-12">
          <div class="pull-right mt-18 text-right">
            <nuxt-link to="/" class="forgotPass">
              <svg
                id="Capa_1"
                class="back-long-arrow-icon"
                version="1.1"
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
                  />
                </g>
              </svg>
              Back to Login
            </nuxt-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  layout: 'outerLayout',
  middleware: ['guestCheck'],
  data() {
    return {
      form: {
        email: null,
      },
      loading: false,
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
        const response = await this.$axios.$post('forgot-password', this.form)
        this.$toast.global.success(`${response.message}`)
        await this.$router.push('/')
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    form: {
      email: { required, email },
    },
  },
}
</script>

<style></style>
