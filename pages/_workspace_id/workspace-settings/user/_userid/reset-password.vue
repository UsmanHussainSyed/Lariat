<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Change Password</h4>
    </div>
    <div class="workspace-settings">
      <strong>{{ form.email }}</strong>
      <p>You are changing the password for this email.</p>
      <hr />
      <div class="row no-gutters">
        <div class="col-lg-10 col-md-12">
          <div class="general-settings-box">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group required">
                  <label class="control-label">Password</label>
                  <input
                    v-model.lazy="$v.form.password.$model"
                    type="password"
                    name="password"
                    class="form-control"
                    data-lpignore="true"
                  />
                  <div
                    v-if="$v.form.password.$error && !$v.form.password.required"
                    class="input-error"
                  >
                    Password is required
                  </div>
                  <div
                    v-if="
                      $v.form.password.$error && !$v.form.password.minLength
                    "
                    class="input-error"
                  >
                    Password must be at least 6 characters
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
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
                      !$v.form.password_confirmation.sameAsPassword
                    "
                    class="input-error"
                  >
                    Passwords must be identical.
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <button
                  type="button"
                  :class="{
                    btn: true,
                    'btn-disable': loading,
                  }"
                  :disabled="loading"
                  @click="submit"
                >
                  <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'can-access-general-settings'],
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        user_id: this.$route.params.userid ? this.$route.params.userid : null,
        workspace_id: this.$_auth().id,
      },
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
    }
  },
  async mounted() {
    try {
      const userData = await this.$axios.$post('/user/details-password', {
        user_id: this.form.user_id,
        workspace_id: this.internal_workspace_id,
      })
      this.form.name = userData.data.name
      this.form.email = userData.data.email
    } catch (e) {
      const { data } = e.response
      if (
        data.message ===
        'You are not authorized person to access this Workspace.'
      ) {
        this.$nuxt.error({
          statusCode: data.code,
          path: this.$route.path,
          message: data.message,
        })
      }
      if (data.code === 403) {
        return this.$router.push({
          name: 'workspace_id-workspace-settings-user-list',
          params: {
            workspace_id: this.internal_workspace_id,
          },
        })
      }
    }
  },
  methods: {
    async submit(e) {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        await this.$axios.$post('user/user-change-password', this.form)

        this.$toast.global.success('Password reset successfully')

        this.$router.push({
          name: 'workspace_id-workspace-settings-user-list',
          params: { workspace_id: this.internal_workspace_id },
        })
      } catch (e) {
        const { data } = e.response
        this.loading = false
        this.$toast.error(data.message)
      }
    },
  },
  validations: {
    form: {
      password: { required, minLength: minLength(6) },
      password_confirmation: { sameAsPassword: sameAs('password') },
    },
  },
}
</script>

<style scoped></style>
