<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li class="active"><a href="javascript:void(0);">SMTP Settings</a></li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-imap',
              params: { workspace_id: workspace_id },
            }"
            >IMAP Settings</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name:
                'workspace_id-workspace-settings-lm-email-settings-email-template-list',
              params: { workspace_id: workspace_id },
            }"
            >Email Templates</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name:
                'workspace_id-workspace-settings-lm-email-settings-email-template-signature',
              params: { workspace_id: workspace_id },
            }"
            >Email Signature</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="general-settings-box customscrollbar">
            <div class="row">
              <div class="col-md-8">
                <div class="form-group">
                  <div class="notes">
                    <p>
                      These email configuration will be used for sending email
                      notifications.
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group required">
                  <label class="control-label">From Email</label>
                  <input
                    v-model.lazy="$v.fromEmail.$model"
                    type="email"
                    name="from-email"
                    class="form-control"
                    placeholder=""
                    required=""
                  />
                  <div
                    v-if="$v.fromEmail.$error && !$v.fromEmail.required"
                    class="input-error"
                  >
                    Please provide from email
                  </div>
                  <div
                    v-if="$v.fromEmail.$error && !$v.fromEmail.email"
                    class="input-error"
                  >
                    Please provide valid from email
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group required">
                  <label class="control-label">Server Address (Host Url)</label>
                  <input
                    v-model.lazy="$v.host.$model"
                    type="text"
                    name="smtp-server"
                    class="form-control"
                    placeholder=""
                    required=""
                  />
                  <div
                    v-if="$v.host.$error && !$v.host.required"
                    class="input-error"
                  >
                    Please provide host url
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group required">
                  <label class="control-label">User Name</label>
                  <input
                    v-model.lazy="$v.user.$model"
                    type="text"
                    name="smtp-user"
                    class="form-control"
                    placeholder=""
                    required=""
                  />
                  <div
                    v-if="$v.user.$error && !$v.user.required"
                    class="input-error"
                  >
                    Please provide username
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group required">
                  <label class="control-label">Password</label>
                  <input
                    v-model="$v.password.$model"
                    type="password"
                    name="smtp-pass"
                    class="form-control"
                    placeholder=""
                    required=""
                  />
                  <div
                    v-if="$v.password.$error && !$v.password.required"
                    class="input-error"
                  >
                    Please provide password
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group required">
                  <label class="control-label">Security</label>
                  <div class="radio-group horizontal">
                    <label class="radio-label"
                      >SSL
                      <input
                        v-model="$v.encryption.$model"
                        type="radio"
                        name="smtp-security"
                        value="ssl"
                      />
                      <span class="radio-span"></span>
                    </label>
                    <label class="radio-label"
                      >TLS
                      <input
                        v-model="$v.encryption.$model"
                        type="radio"
                        name="smtp-security"
                        value="tls"
                      />
                      <span class="radio-span"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group required">
                  <label class="control-label">Server Port</label>
                  <input
                    v-model.lazy="$v.port.$model"
                    type="text"
                    name="smtp-port"
                    class="form-control w-25"
                    placeholder=""
                    required=""
                  />
                  <small
                    >In most cases for SSL use 465 and for TLS use 587</small
                  >
                  <div
                    v-if="$v.port.$error && !$v.port.required"
                    class="input-error"
                  >
                    Please provide port
                  </div>
                  <div
                    v-if="$v.port.$error && !$v.port.integer"
                    class="input-error"
                  >
                    Please provide valid port
                  </div>
                </div>
              </div>
              <div v-if="false" class="col-md-7">
                <div class="form-group">
                  <div class="d-flex align-items-center mb-2">
                    <label class="control-label mb0"
                      >Verify security certificate</label
                    >
                    <label class="check-label ml1">
                      Verify
                      <input type="checkbox" name="smtp-verify" checked="" />
                      <span class="check-span"></span>
                    </label>
                  </div>
                  <small
                    >Uncheck if you are getting connection errors because of a
                    self-signed or expired security certificate.</small
                  >
                </div>
              </div>
              <div v-if="enableTest" class="col-md-7">
                <div class="form-group">
                  <button
                    :disabled="testLoader"
                    type="button"
                    class="btn btn-small btn-gray-invert"
                    @click="testSmtp"
                  >
                    <i
                      v-if="testLoader"
                      class="fa fa-circle-o-notch fa-spin"
                    ></i>
                    Test SMTP Connection
                  </button>
                </div>
              </div>
              <div v-if="isVerified" class="col-md-7">
                <div class="form-group">
                  <div class="smtpmsg">Your SMTP is verified</div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="form-group mb0">
                  <button
                    :disabled="saveLoader || testLoader"
                    type="button"
                    name="submit"
                    class="btn"
                    @click="saveSmtp"
                  >
                    <i
                      v-if="saveLoader"
                      class="fa fa-circle-o-notch fa-spin"
                    ></i>
                    Save Changes
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
import { required, email, integer } from 'vuelidate/lib/validators'
export default {
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'block-access-dealerAdmin',
    'can-access-general-settings',
  ],
  data() {
    return {
      workspace_id: this.$route.params.workspace_id,
      fromEmail: '',
      fromName: '',
      user: '',
      password: '',
      host: '',
      port: '',
      encryption: 'ssl',
      encryptionOptions: ['ssl', 'tls', 'starttls'],
      isVerified: 0,
      showTestOption: false,
      saveLoader: false,
      testLoader: false,
    }
  },
  computed: {
    enableTest() {
      return !!(this.showTestOption && parseInt(this.isVerified) === 0)
    },
  },
  mounted() {
    this.getSmtp()
  },
  methods: {
    async getSmtp() {
      try {
        const { data } = await this.$axios.$post(`get-smtp`)
        if (data.smtp) {
          this.fromEmail = data.smtp.fromEmail
          this.fromName = data.smtp.fromName
          this.user = data.smtp.user
          this.password = data.smtp.password
          this.host = data.smtp.host
          this.port = data.smtp.port
          this.encryption = data.smtp.encryption
          this.isVerified = data.smtp.isVerified
          this.showTestOption = true
        }
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async saveSmtp() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.saveLoader = true
        const { data } = await this.$axios.$post(`save-smtp`, {
          host: this.host,
          port: this.port,
          encryption: this.encryption,
          user: this.user,
          password: this.password,
          fromEmail: this.fromEmail,
          fromName: this.fromName,
        })
        this.saveLoader = false
        this.showTestOption = true
        this.isVerified = data.isVerified
        this.$toast.success('SMTP details saved successfully')
      } catch (e) {
        this.saveLoader = false
        this.testLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async testSmtp() {
      try {
        this.testLoader = true
        const { data } = await this.$axios.$post(`test-smtp`, {})
        this.showTestOption = true
        this.isVerified = data.isVerified
        this.testLoader = false
        this.$toast.success('SMTP is successfully verified')
      } catch (e) {
        this.testLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    fromEmail: { required, email },
    user: { required },
    password: { required },
    host: { required },
    port: { required, integer },
    encryption: { required },
  },
}
</script>
