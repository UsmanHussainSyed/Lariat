<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Add SharpSpring Form</h4>
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="row no-gutters">
        <div class="col-lg-10">
          <form class="box sharpspring-form" @submit.prevent="submitForm">
            <div class="sharpspring-common-field bg-gray">
              <div class="row">
                <div class="col-md-5">
                  <div class="form-group required">
                    <label class="control-label">Form Title</label>
                    <input
                      v-model="$v.formTitle.$model"
                      type="text"
                      class="form-control"
                      placeholder=""
                      autofocus=""
                    />
                    <div
                      v-if="$v.formTitle.$error && !$v.formTitle.required"
                      class="input-error"
                    >
                      Please enter form title
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group required">
                    <label class="control-label">Form ID</label>
                    <input
                      v-model="$v.sharpSpringFormId.$model"
                      type="text"
                      class="form-control"
                      placeholder=""
                    />
                    <div
                      v-if="
                        $v.sharpSpringFormId.$error &&
                        !$v.sharpSpringFormId.required
                      "
                      class="input-error"
                    >
                      Please enter form ID
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <draggable
              v-model="fields"
              handle=".drag-row"
              ghost-class="ghost"
              :force-fallback="true"
            >
              <div
                v-for="(f, index) in $v.fields.$each.$iter"
                :key="index"
                class="row"
              >
                <span v-if="fields.length > 1" class="drag-row">
                  <svg
                    id="Layer_1"
                    class="menu-option-icon h-orange"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4482" transform="translate(-872 -801)">
                      <rect
                        id="Rectangle_3020"
                        x="872"
                        y="801"
                        class="fill-hide"
                        width="18"
                        height="18"
                      ></rect>
                      <g id="Group_4348" transform="translate(588.166 653.684)">
                        <circle
                          id="Ellipse_203"
                          class="fill-color"
                          cx="292.8"
                          cy="148.9"
                          r="1.5"
                        ></circle>
                        <circle
                          id="Ellipse_203-2"
                          class="fill-color"
                          cx="292.8"
                          cy="163.8"
                          r="1.5"
                        ></circle>
                        <circle
                          id="Ellipse_203-3"
                          class="fill-color"
                          cx="292.8"
                          cy="156.3"
                          r="1.5"
                        ></circle>
                      </g>
                    </g>
                  </svg>
                </span>
                <div class="col-md-5">
                  <div class="form-group required">
                    <label class="control-label">Local Field</label>
                    <ClientSelect2
                      v-model="f.localField.$model"
                      :options="localFields"
                      placeholder="Select field"
                      :custom-field-event="true"
                    >
                      <option value="">Select Task</option>
                    </ClientSelect2>

                    <div
                      v-if="f.localField.$error && !f.localField.required"
                      class="input-error"
                    >
                      Please select the field
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group required">
                    <label class="control-label">SharpSpring Field</label>
                    <select2
                      v-model="f.sharpSpringField.$model"
                      :options="sharpSpringFields"
                      placeholder="Select field"
                    />
                    <div
                      v-if="
                        f.sharpSpringField.$error &&
                        !f.sharpSpringField.required
                      "
                      class="input-error"
                    >
                      Please select the sharpspring field
                    </div>
                  </div>
                </div>
                <div class="col-md-1">
                  <template
                    v-if="parseInt(fields.length) != parseInt(index) + 1"
                  >
                    <a
                      href="javascript:void(0);"
                      class="remove-field"
                      @click="removeField(index)"
                    >
                      <svg
                        id="Layer_1"
                        class="delete-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 15.3 18"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_4351"
                          transform="translate(-443.472 -147.331)"
                        >
                          <path
                            id="Path_3410"
                            class="fill-color"
                            d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                          ></path>
                          <path
                            id="Path_3411"
                            class="fill-color"
                            d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                          ></path>
                        </g>
                      </svg>
                    </a>
                  </template>
                  <template v-else>
                    <a
                      v-if="fields.length > 1"
                      href="javascript:void(0);"
                      class="remove-field"
                      @click="removeField(index)"
                    >
                      <svg
                        id="Layer_1"
                        class="delete-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 15.3 18"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_4351"
                          transform="translate(-443.472 -147.331)"
                        >
                          <path
                            id="Path_3410"
                            class="fill-color"
                            d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                          ></path>
                          <path
                            id="Path_3411"
                            class="fill-color"
                            d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                          ></path>
                        </g>
                      </svg>
                    </a>
                    <a
                      href="javascript:void(0);"
                      class="add-field"
                      @click="addNewField"
                    >
                      <svg
                        id="Layer_1"
                        class="plus-icon white"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_4454"
                          transform="translate(-1005 -577.999)"
                        >
                          <path
                            id="Path_3394"
                            class="fill-color"
                            d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                          ></path>
                          <path
                            id="Path_3395"
                            class="fill-color"
                            d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                          ></path>
                        </g>
                      </svg>
                    </a>
                  </template>
                </div>
              </div>
            </draggable>
            <div class="form-group">
              <label class="check-label">
                Status
                <input
                  v-model="status"
                  type="checkbox"
                  true-value="1"
                  false-value="0"
                />
                <span class="check-span"></span>
              </label>
            </div>
            <div class="form-group mb0">
              <button
                type="submit"
                name="submit"
                class="btn"
                :disabled="loading"
              >
                <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                Add Form
              </button>
              <nuxt-link
                :to="{
                  name: 'workspace_id-workspace-settings-sharpspring-form',
                  params: {
                    workspace_id: $_auth().id,
                  },
                }"
                class="btn btn-gray"
                >Cancel</nuxt-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { required } from 'vuelidate/lib/validators'
import Select2 from '~/components/plugins/Select2'
import ClientSelect2 from '~/components/plugins/ClientSelect2'
const checkNull = (value) => value !== ''
const checkZero = (value) => value.toLowerCase() !== 'select field'
export default {
  components: { ClientSelect2, Select2, draggable },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],
  data() {
    return {
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      formTitle: '',
      sharpSpringFormId: '',
      status: 0,
      fields: [{ localField: '', sharpSpringField: '' }],
      sharpSpringFields: [],
      localFields: [],
      loading: false,
    }
  },
  mounted() {
    this.getStartSpringFields()
    this.getLocalFields()
  },
  methods: {
    async getStartSpringFields() {
      const { data } = await this.$axios.$get(
        `lm/sharpspring/get-global-fields?workspace_id=${this.internal_workspace_id}`
      )
      this.sharpSpringFields = data.field_data
    },
    async getLocalFields() {
      const { data } = await this.$axios.$get(
        `lm/sharpspring/get-column-fields?workspace_id=${this.internal_workspace_id}`
      )
      this.localFields = data.field_data
    },
    addNewField() {
      this.fields.push({ localField: '', sharpSpringField: '' })
    },
    removeField(index) {
      this.fields.splice(index, 1)
    },
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.loading = true
        await this.$axios.$post(`lm/sharpspring/add`, {
          workspace_id: this.internal_workspace_id,
          formTitle: this.formTitle,
          sharpSpringFormId: this.sharpSpringFormId,
          status: this.status,
          fields: this.fields.map((f, index) => ({ ...f, order: index + 1 })),
        })
        this.loading = false
        this.$toast.success(
          `New form&nbsp;<strong>${this.formTitle}</strong>&nbsp;successfully created`
        )
        await this.$router.replace({
          name: 'workspace_id-workspace-settings-sharpspring-form',
          params: {
            workspace_id: this.$_auth().id,
          },
        })
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    formTitle: { required },
    sharpSpringFormId: { required },
    fields: {
      $each: {
        localField: { checkNull, checkZero },
        sharpSpringField: { checkNull, checkZero },
      },
    },
  },
}
</script>
<style scoped>
.ghost {
  opacity: 0;
}
.sortable-chosen {
  /*box-shadow: -2px 0px 0px 2px grey !important;*/
  border: 3px dashed #445ea7 !important;
  border-radius: 5px !important;
  padding: 10px !important;
}
</style>
