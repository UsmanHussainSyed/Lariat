<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <navigationTab :active-routes="sharpSpringFormRoutes" />
    </div>
    <div id="scroll_comment" class="workspace-settings customscrollbar">
      <div class="row no-gutters">
        <div class="col-lg-8 col-md-12">
          <div v-if="isInvalidImport" class="search-result mb1">
            <div class="alert alert-danger">
              Please select required fields
              <strong>{{ getRequiredFields }}</strong
              >.
            </div>
          </div>
          <ContentLoader
            v-if="fetchLoader"
            :speed="1"
            :animate="true"
            :width="400"
            :height="100"
            class="px-2 normalLoader"
          >
            <rect x="0" y="-1" rx="0" ry="0" width="395" height="20" />
            <rect x="0" y="15" rx="0" ry="0" width="395" height="20" />
            <rect x="0" y="31" rx="0" ry="0" width="395" height="20" />
            <rect x="0" y="47" rx="0" ry="0" width="395" height="20" />
            <rect x="0" y="70" rx="0" ry="0" width="395" height="20" />
            <rect x="0" y="100" rx="0" ry="0" width="395" height="20" />
          </ContentLoader>
          <form
            v-else
            class="box sharpspring-form"
            @submit.prevent="submitForm"
          >
            <div
              v-for="(f, index) in $v.fields.$each.$iter"
              :key="index"
              class="row"
            >
              <div class="col-md-5">
                <div class="form-group required">
                  <label class="control-label">Local Field</label>
                  <select2
                    v-model="f.databaseColumn.$model"
                    :options="localFields"
                    placeholder="Select field"
                    :custom-field-event="true"
                  >
                    <option value="">Select Task</option>
                  </select2>

                  <div
                    v-if="f.databaseColumn.$error && !f.databaseColumn.required"
                    class="input-error"
                  >
                    Please select the Local field
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="form-group required">
                  <label class="control-label">SharpSpring Field</label>
                  <select2
                    v-model="f.sharpSpringColumn.$model"
                    :options="sharpSpringFields"
                    placeholder="Select field"
                  />
                  <div
                    v-if="
                      f.sharpSpringColumn.$error &&
                      !f.sharpSpringColumn.required
                    "
                    class="input-error"
                  >
                    Please select the sharpspring field
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <template v-if="parseInt(fields.length) != parseInt(index) + 1">
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
                      <g id="Group_4454" transform="translate(-1005 -577.999)">
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
            <div class="form-group mb0">
              <button
                type="submit"
                name="submit"
                class="btn"
                :disabled="loading"
              >
                <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                Update Mappings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import routeMixins from '~/mixins/routeMixins'
import navigationTab from '~/components/lead/navigation-tab'
import Select2 from '~/components/plugins/Select2'
// import ClientSelect2 from '~/components/plugins/ClientSelect2'
const checkNull = (value) => value !== ''
const checkZero = (value) => value.toLowerCase() !== 'select field'
export default {
  components: { navigationTab, Select2, ContentLoader },
  mixins: [routeMixins],
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-lead-settings',
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
      fields: [{ databaseColumn: '', sharpSpringColumn: '' }],
      loading: false,
      fetchLoader: false,
      localFields: [],
      sharpSpringFields: [],
      requiredFields: [],
      isInvalidImport: false,
    }
  },
  computed: {
    getRequiredFields() {
      const fields = this.requiredFields.map((e) => e.label)
      return fields.join(' , ')
    },
  },
  async mounted() {
    this.fetchLoader = true
    await this.getSavedFields()
    await this.getLocalFields()
    await this.getSharpSpringFields()
    this.fetchLoader = false
  },
  methods: {
    async getSavedFields() {
      try {
        const { data } = await this.$axios.$get(
          `lm/sharpspring/get-lead-sync-mappings`
        )
        if (data.mappings.length) {
          this.fields = data.mappings
        }
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    async getLocalFields() {
      try {
        const { data } = await this.$axios.$get(
          `lm/sharpspring/get-leads-local-fields`
        )
        this.localFields = data.field_data
        this.requiredFields = data.requiredFields
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    async getSharpSpringFields() {
      try {
        const { data } = await this.$axios.$get(
          `lm/sharpspring/get-global-fields`
        )
        this.sharpSpringFields = data.field_data
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    async submitForm() {
      if (!this.checkIsValidImport()) {
        this.isInvalidImport = true
        window.$('#scroll_comment').animate({
          scrollTop: 0,
        })
        return
      }
      this.isInvalidImport = false
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.loading = true
        const { message } = await this.$axios.$post(
          `lm/sharpspring/save-lead-sync-mappings`,
          {
            mappings: this.fields,
          }
        )
        this.loading = false
        this.$toast.success(message)
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    checkIsValidImport() {
      if (
        this.requiredFields.every((s) =>
          this.fields.some((e) => s.value === e.databaseColumn)
        )
      ) {
        return true
      }
      return false
    },
    addNewField() {
      this.fields.push({ databaseColumn: '', sharpSpringColumn: '' })
    },
    removeField(index) {
      this.fields.splice(index, 1)
    },
  },
  validations: {
    fields: {
      $each: {
        databaseColumn: { checkNull, checkZero },
        sharpSpringColumn: { checkNull, checkZero },
      },
    },
  },
}
</script>
