<template>
  <div
    class="general-settings-right h-100"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        <button v-if="0" type="button" class="close" data-dismiss="alert">
          <svg
            id="Layer_1"
            class="close-icon h-red"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4358" transform="translate(-69.745 -317.549)">
              <path
                id="Path_3424"
                class="fill-color"
                d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
              ></path>
              <path
                id="Path_3425"
                class="fill-color"
                d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
              ></path>
            </g>
          </svg>
        </button>
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div class="general-settings-title">
      <h4>Reset Password for DAM User</h4>
    </div>
    <div class="workspace-settings">
      <p>
        You are changing the password for this email -
        <strong>{{ user.email }}</strong>
      </p>
      <hr />
      <div class="row no-gutters">
        <div class="col-lg-10 col-md-12">
          <div class="general-settings-box">
            <form class="row small-gutters" @submit.prevent="handleSubmit">
              <div class="col-sm-6">
                <div class="form-group required">
                  <label class="control-label">Password</label>
                  <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    autofocus
                  />
                  <div v-if="$v.user.password.$error" class="input-error">
                    <template v-if="!$v.user.password.required">
                      Please provide password
                    </template>
                    <template v-else-if="!$v.user.password.minLength">
                      Password must be at least 6 characters
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group required">
                  <label class="control-label">Confirm Password</label>
                  <input
                    v-model="user.confirmPassword"
                    type="password"
                    class="form-control"
                  />
                  <div
                    v-if="$v.user.confirmPassword.$error"
                    class="input-error"
                  >
                    <template v-if="!$v.user.confirmPassword.required">
                      Please provide confirm password
                    </template>
                    <template v-else-if="!$v.user.confirmPassword.sameAs">
                      Password must match with confirm password
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-sm-12">
                <button
                  type="submit"
                  class="btn"
                  :class="{ 'btn-disable': loading }"
                >
                  <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>

                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength, sameAs, required } from 'vuelidate/lib/validators'

export default {
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  asyncData({ params, $axios, error, $toQueryString }) {
    const { user_id, workspace_id, instance_id } = params

    return $axios
      .$get(
        `digital-assets/instance/get-user-details?` +
          $toQueryString({ dealer_user_id: user_id, workspace_id, instance_id })
      )
      .then(({ data }) => {
        if (!data) return error({ message: 'User not found', statusCode: 404 })

        return {
          user: { ...data, password: '', confirmPassword: '' },
          user_id,
          workspace_id,
          instance_id,
        }
      })
      .catch((e) => {
        const { data } = e.response || {}

        if (data && data.code === 403)
          return error({ message: 'User not found', statusCode: 404 })

        error(e)
      })
  },
  data() {
    return { loading: false }
  },
  computed: {
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
  },
  mounted() {
    this.$store.dispatch('dam/getNotifications')
  },
  methods: {
    async handleSubmit() {
      if ((this.$v.$touch(), this.$v.$invalid) || this.loading) return

      this.loading = true

      const formData = new FormData()
      formData.append('workspace_id', this.workspace_id)
      formData.append('instance_id', this.instance_id)
      formData.append('id', this.user_id)
      formData.append('password', this.user.password)
      formData.append('name', this.user.name)
      formData.append('phone', this.user.phone)

      await this.$axios
        .$post('digital-assets/instance/update-user', formData)
        .then(({ data, message }) => {
          this.$toast.global.success('Password updated.')

          this.user = { ...data, password: '', confirmPassword: '' }

          this.$nextTick(() => this.$v.$reset())
        })
        .catch(this.$errorToast)
      this.loading = false
    },
  },
  validations: {
    user: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAs: sameAs('password') },
    },
  },
}
</script>
