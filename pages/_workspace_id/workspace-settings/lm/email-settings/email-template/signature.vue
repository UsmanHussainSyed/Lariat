<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-smtp',
              params: { workspace_id: workspace_id },
            }"
            >SMTP Settings</nuxt-link
          >
        </li>
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
        <li class="active">
          <a href="javascript:void(0);">Email Signature</a>
        </li>
      </ul>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="row">
            <div class="col-md-10">
              <div class="form-group d-flex mt2">
                <label class="label-switch">
                  <span>Enable/Disable : </span>
                  <input
                    v-model="status"
                    type="checkbox"
                    class="switch"
                    :true-value="1"
                    :false-value="0"
                  />
                  <span class="lable"></span>
                </label>
              </div>
            </div>
            <div class="col-md-10">
              <div class="form-group">
                <client-only>
                  <vue-editor
                    ref="editor"
                    v-model="$v.signature.$model"
                    :editor-toolbar="editorToolbar"
                  />
                </client-only>
                <div
                  v-if="$v.signature.$error && !$v.signature.required"
                  class="input-error"
                >
                  Please provide signature
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group mb0">
                <button
                  :disabled="saveLoader"
                  class="btn"
                  @click="saveSignature"
                >
                  <i v-if="saveLoader" class="fa fa-circle-o-notch fa-spin"></i>
                  Save Signature
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
import { required } from 'vuelidate/lib/validators'
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
      signature: '',
      status: 0,
      editorToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' },
        ],
        ['blockquote' /* 'code-block' */],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        /* ['link', 'image', 'video'], */
        ['clean'], // remove formatting button
      ],
      saveLoader: false,
    }
  },
  mounted() {
    this.getSignature()
  },
  methods: {
    async getSignature() {
      try {
        const { data } = await this.$axios.$post(`lm/email-signature/get`)
        this.signature = data.signature || ''
        this.status = data.status || 0
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async saveSignature() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false
        }
        this.saveLoader = true
        await this.$axios.$post(`lm/email-signature/save`, {
          workspace_id: this.workspace_id,
          signature: this.signature,
          status: this.status,
        })
        this.saveLoader = false
        this.$toast.success('Signature saved successfully')
      } catch (e) {
        this.saveLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    signature: { required },
  },
}
</script>

<style scoped></style>
