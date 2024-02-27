<template>
  <div>
    <div v-if="form.email" class="sign-body bg-white">
      <h4>Generate Password</h4>
      <p>You’re generating password as {{ form.email }}</p>
      <form class="form" @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-sm-12">
            <div class="form-group required">
              <label class="control-label">Name</label>
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
                Please provide password
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="isLinkExpire" class="sign-body text-center p1">
      <h2>Invitation link is expired</h2>
    </div>
  </div>
</template>
<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import moment from 'moment-timezone'

export default {
  layout: 'outerLayout',
  data() {
    return {
      loading: false,
      form: {
        name: null,
        password: null,
        password_confirmation: null,
        invitation_token: this.$route.query.invitation_token
          ? decodeURI(this.$route.query.invitation_token)
          : null,
        type: this.$route.query.type ? decodeURI(this.$route.query.type) : null,
        showPass: this.$route.query.showPass
          ? decodeURI(this.$route.query.showPass)
          : null,
        email_token: null,
        email: null,
      },
      isLinkExpire: false,
    }
  },
  async mounted() {
    try {
      const { data, message } = await this.$axios.$post(
        'get-invitation-details',
        {
          invitation_token: this.form.invitation_token,
          type: this.form.type,
          showPass: this.form.showPass,
        }
      )
      if (data.redirect_project) {
        this.$toast.global.success(message)
        await this.$router.push({ path: '/' })
      }
      if (parseInt(data.status) === 1) {
        this.$toast.global.success(message)
        await this.$router.push({ path: '/' })
      } else {
        this.form.invitation_token = data.invitation_token
        this.form.email_token = data.email_token
        this.form.type = data.type
        this.form.email = data.email
        this.form.name = data.name
      }
    } catch (e) {
      this.loading = false
      if (this.$getErrorMessage(e) === 'This link is expired') {
        this.isLinkExpire = true
      }
      this.$toast.error(this.$getErrorMessage(e))
    }
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        this.form.timezone = moment.tz.guess()
        const { message } = await this.$axios.$post(
          'generate-password',
          this.form
        )
        this.loading = false
        this.$toast.global.success(message)
        await this.$router.push('/')
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    form: {
      name: { required },
      password: { required, minLength: minLength(6) },
      password_confirmation: { required, sameAsPassword: sameAs('password') },
    },
  },
}
</script>
