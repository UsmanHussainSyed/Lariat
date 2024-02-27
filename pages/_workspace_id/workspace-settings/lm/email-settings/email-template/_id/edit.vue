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
        <li class="active">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-email-template-list',
              params: { workspace_id: workspace_id },
            }"
            >Email Templates</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-email-settings-email-template-signature',
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
            <h4>Edit Email Template</h4>
            <div class="row">
              <div class="col-md-5">
                <div class="form-group required">
                  <label class="control-label">Name</label>
                  <input
                    v-model.lazy="$v.title.$model"
                    type="text"
                    class="form-control"
                    placeholder=""
                    required=""
                    @focus="setLastFocusedElement('')"
                  />
                  <div
                    v-if="$v.title.$error && !$v.title.required"
                    class="input-error"
                  >
                    Please provide name
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="form-group">
                  <label class="control-label">Description</label>
                  <textarea
                    v-model="description"
                    cols="2"
                    rows="2"
                    name="desc"
                    class="form-control resizeauto"
                    placeholder=""
                    @focus="setLastFocusedElement('')"
                  ></textarea>
                </div>
              </div>
              <div class="col-md-10">
                <div class="form-group">
                  <label class="control-label">Insert Variable</label>
                  <div class="row xs-gutters">
                    <div class="col-md-3">
                      <Select2
                        v-model="selectedField"
                        :options="fields"
                        placeholder="Select Filed"
                      />
                    </div>
                    <div class="col-md-4">
                      <input
                        :value="printVariable"
                        disabled
                        type="text"
                        name="variable-id"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-3">
                      <a
                        href="javascript:void(0);"
                        class="btn btn-gray btn-big"
                        @click="insertVariable"
                        >Insert</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="form-group">
                  <label class="control-label">Subject</label>
                  <input
                    ref="subject"
                    v-model.lazy="$v.subject.$model"
                    type="text"
                    name="subject"
                    class="form-control"
                    placeholder=""
                    @focus="setLastFocusedElement('subject')"
                  />
                  <div
                    v-if="$v.subject.$error && !$v.subject.required"
                    class="input-error"
                  >
                    Please provide subject
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="control-label">Body</label>
                  <textarea
                    ref="editor"
                    v-model.lazy="$v.body.$model"
                    cols="10"
                    rows="12"
                    name="desc"
                    class="form-control resizeauto"
                    @focus="setLastFocusedElement('editor')"
                  ></textarea>
                  <div
                    v-if="$v.body.$error && !$v.body.required"
                    class="input-error"
                  >
                    Please enter template body
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Attachments</label>
                  <div class="file-upload big">
                    <div class="file-select">
                      <div id="fileName" class="file-select-button">
                        Browse File
                      </div>
                      <div id="noFile" class="file-select-name">
                        No file chosen...
                      </div>
                      <input
                        id="chooseFile"
                        ref="file"
                        type="file"
                        name="chooseFile"
                        @change="fileChange"
                      />
                    </div>
                  </div>

                  <div
                    v-for="(att, index) in displayAttachments"
                    :key="index"
                    class="preview-upload mt1 d-flex align-items-center"
                  >
                    <input
                      type="text"
                      name=""
                      :value="att.name"
                      class="form-control"
                      disabled=""
                    />
                    <button
                      type="button"
                      class="btn btn-big btn-danger ml-2"
                      @click="removeAttachment(index)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group mb0">
                  <button
                    class="btn"
                    :disabled="saveLoader"
                    @click="saveTemplate"
                  >
                    <i
                      v-if="saveLoader"
                      class="fa fa-circle-o-notch fa-spin"
                    ></i>
                    Update Email Template
                  </button>
                  <button
                    type="reset"
                    name="reset"
                    class="btn btn-gray"
                    :disabled="saveLoader"
                    @click="cancel"
                  >
                    Cancel
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
import Select2 from '~/components/plugins/Select2'
export default {
  components: { Select2 },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'block-access-dealerAdmin',
    'can-access-general-settings',
  ],
  data() {
    return {
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
      workspace_id: this.$route.params.workspace_id,
      templateId: this.$route.params.id,
      title: '',
      subject: '',
      description: '',
      body: '',
      fields: [],
      selectedField: '',
      printVariable: '',
      saveLoader: false,
      attachments: [],
      deleteAttachments: [],
      displayAttachments: [],
      lastFocusedElement: '',
    }
  },
  watch: {
    selectedField(newVal, oldVal) {
      this.printVariable = `##~${newVal}~##`
    },
  },
  mounted() {
    this.getEmailFields()
    this.getTemplate()
  },
  methods: {
    async getEmailFields() {
      try {
        const { data } = await this.$axios.$post(`lm/email-template/fields`)
        this.fields = data
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async getTemplate() {
      try {
        const { data } = await this.$axios.$post(
          `lm/email-template/get-single-template`,
          {
            templateId: this.templateId,
          }
        )
        this.title = data.title
        this.subject = data.subject
        this.description = data.description
        this.body = data.body
        const displayAttachments = data.attachments.map((atta) => ({
          id: atta.id,
          name: atta.attachment,
          file: null,
          source: 'db',
        }))
        this.displayAttachments = displayAttachments
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async saveTemplate() {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return false
        }
        this.saveLoader = true
        const data = new FormData()
        data.append('title', this.title)
        data.append('subject', this.subject)
        data.append('description', this.description)
        data.append('body', this.body)
        data.append('templateId', this.templateId)
        data.append('deleteAttachments', JSON.stringify(this.deleteAttachments))
        this.attachments.length &&
          this.attachments.forEach((attachment) => {
            data.append('attachments[]', attachment.file)
          })
        await this.$axios.$post(`lm/email-template/update`, data)
        this.saveLoader = false
        this.$toast.success('Email Template saved successfully')
        this.$router.push({
          name: 'workspace_id-workspace-settings-lm-email-settings-email-template-list',
          params: {
            workspace_id: this.workspace_id,
          },
        })
      } catch (e) {
        this.saveLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    setLastFocusedElement(field) {
      this.lastFocusedElement = field
    },
    insertVariable() {
      if (this.lastFocusedElement === 'editor') {
        /* const getSelection = this.$refs.editor.quill.getSelection(true)
        this.$refs.editor.quill.deleteText(getSelection)
        this.$refs.editor.quill.insertText(getSelection, this.printVariable) */

        const curPos = this.$refs.editor.selectionStart
        const x = this.$refs.editor.value
        this.body =
          x.slice(0, curPos) + ' ' + this.printVariable + ' ' + x.slice(curPos)
      } else if (this.lastFocusedElement === 'subject') {
        const curPos = this.$refs.subject.selectionStart
        const x = this.$refs.subject.value
        this.subject =
          x.slice(0, curPos) + ' ' + this.printVariable + ' ' + x.slice(curPos)
      }
    },
    fileChange() {
      const file = this.$refs.file.files[0]
      if (file.size > 1048576 * 25) {
        // 1048576 = 1 byte (in binary)
        this.$toast.error(`File size must 25 MB or below`)
        this.$refs.file.value = ''
        return
      }
      const data = { id: Date.now(), name: file.name, file, source: 'client' }
      this.attachments.push(data)
      this.displayAttachments.push(data)
      // clear file input
      this.$refs.file.value = ''
    },
    removeAttachment(index) {
      if (this.displayAttachments[index].source === 'db') {
        this.deleteAttachments.push(this.displayAttachments[index].id)
      } else if (this.displayAttachments[index].source === 'client') {
        const id = this.displayAttachments[index].id
        this.attachments = this.attachments.filter(
          (attach) => parseInt(attach.id) !== parseInt(id)
        )
      }
      this.displayAttachments.splice(index, 1)
    },

    cancel() {
      this.$router.push({
        name: 'workspace_id-workspace-settings-lm-email-settings-email-template-list',
        params: {
          workspace_id: this.workspace_id,
        },
      })
    },
  },
  validations: {
    title: { required },
    subject: { required },
    body: { required },
  },
}
</script>

<style scoped></style>
