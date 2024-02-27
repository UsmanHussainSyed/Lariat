<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li>
          <nuxt-link
            :to="{
              name:
                'workspace_id-workspace-settings-lm-sms-settings-lookup-configuration',
            }"
            >Lookup API</nuxt-link
          >
        </li>
        <li class="active">
          <nuxt-link
            :to="{
              name:
                'workspace_id-workspace-settings-lm-sms-settings-twilio-configuration',
            }"
            >Twilio API</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-8 col-md-12 h-100">
          <div class="general-settings-box customscrollbar h-auto">
            <div class="row">
              <div class="col-md-10">
                <div class="form-group required">
                  <label class="control-label">Twilio SID</label>
                  <input
                    v-model="tsid"
                    type="text"
                    name="sid"
                    class="form-control"
                    placeholder=""
                    required=""
                  />
                  <div v-if="$v.tsid.$error" class="input-error">
                    Twilio SID is required
                  </div>
                </div>
              </div>
              <div class="col-md-10">
                <div class="form-group required">
                  <label class="control-label">Twilio Auth Token</label>
                  <input
                    v-model="auth_token"
                    type="text"
                    name="sid"
                    class="form-control"
                    placeholder=""
                    required=""
                  />
                  <div v-if="$v.auth_token.$error" class="input-error">
                    Twilio Auth Token is required
                  </div>
                </div>
              </div>
              <div class="col-md-10">
                <div class="form-group">
                  <button
                    type="submit"
                    name="submit"
                    class="btn"
                    @click="saveTwilioConfig"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      tsid: '',
      auth_token: '',
    }
  },
  created() {
    this.getAccess()
  },
  methods: {
    getAccess() {
      this.$axios
        .$get('twilio-get')
        .then((res) => {
          this.tsid = res.data.sid
          this.auth_token = res.data.authToken
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveTwilioConfig() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$axios
          .$post('twilio-save', {
            sid: this.tsid,
            authToken: this.auth_token,
          })
          .then(({ message }) => {
            this.$toast.success(message)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
  validations() {
    return {
      tsid: { required },
      auth_token: { required },
    }
  },
}
</script>

<style></style>
