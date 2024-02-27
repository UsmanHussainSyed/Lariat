<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li class="active">
          <nuxt-link
            :to="{
              name:
                'workspace_id-workspace-settings-lm-sms-settings-lookup-configuration',
            }"
            >Lookup API</nuxt-link
          >
        </li>
        <li>
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
                  <label class="control-label">Access Key</label>
                  <input
                    v-model="access_key"
                    type="text"
                    name="access-key"
                    class="form-control"
                    placeholder=""
                    required=""
                  />
                  <div v-if="$v.access_key.$error" class="input-error">
                    Access Key is required
                  </div>
                </div>
              </div>
              <div class="col-md-10">
                <div class="form-group">
                  <button
                    type="submit"
                    name="submit"
                    class="btn"
                    @click="saveAccess"
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
      access_key: '',
    }
  },
  created() {
    this.getAccess()
  },
  methods: {
    getAccess() {
      this.$axios
        .$get('numverify-get')
        .then((res) => {
          this.access_key = res.data.accessKey
        })
        .catch((err) => {
          console.log(err)
        })
    },
    saveAccess() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$axios
          .$post('numverify-save', {
            accessKey: this.access_key,
          })
          .then(({ message }) => {
            this.$toast.success(message)
            this.$v.$reset()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
  },
  validations() {
    return {
      access_key: { required },
    }
  },
}
</script>

<style></style>
