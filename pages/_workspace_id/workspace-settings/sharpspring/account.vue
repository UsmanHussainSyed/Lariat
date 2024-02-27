<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <navigationTab :active-routes="sharpSpringFormRoutes" />
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="form-group">
        <workspace-note />
      </div>
      <div class="row no-gutters">
        <div class="col-lg-6 col-md-12">
          <div
            v-if="showFieldsSyncButton"
            class="col-md-8 mb-3"
            style="
              height: 50px;
              padding: 10px;
              background-color: #eff1f3;
              border-radius: 4px;
            "
          >
            <label class="mt-2"> Sync your SharpSpring Fields</label>
            <button
              :disabled="fieldsSyncLoader || !showFieldsSyncButton"
              class="btn"
              style="position: absolute; right: 10px"
              @click="syncSharpSpringFields"
            >
              <SpinLoading v-if="fieldsSyncLoader" />
              {{ fieldsSyncLoader ? 'Syncing...' : 'Sync Now' }}
            </button>
          </div>
          <form method="post" @submit.prevent>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group required">
                  <label class="control-label">Account Name</label>
                  <input
                    v-model="account.account_name"
                    type="text"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.account.account_name.$error &&
                      !$v.account.account_name.required
                    "
                    class="input-error"
                  >
                    Account Name is required
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group required">
                  <label class="control-label">Account ID</label>
                  <input
                    v-model="account.account_id"
                    type="text"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.account.account_id.$error &&
                      !$v.account.account_id.required
                    "
                    class="input-error"
                  >
                    Account ID is required
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group required">
                  <label class="control-label">Secret</label>
                  <input
                    v-model="account.account_secret"
                    type="text"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.account.account_secret.$error &&
                      !$v.account.account_secret.required
                    "
                    class="input-error"
                  >
                    Secret is required
                  </div>
                </div>
              </div>
              <div v-if="false" class="col-md-8">
                <div class="form-group required">
                  <label class="control-label">Product Field Name</label>
                  <input
                    v-model="account.product_field_name"
                    type="text"
                    class="form-control"
                  />
                  <div
                    v-if="
                      $v.account.product_field_name.$error &&
                      !$v.account.product_field_name.required
                    "
                    class="input-error"
                  >
                    Product Field Name is required
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="form-group required">
                  <label class="control-label">Time Zone</label>
                  <Select2
                    v-model="account.timezone"
                    name="timezone"
                    :class="'select'"
                    placeholder="Select TimeZone"
                  >
                    <optgroup
                      v-for="(group, name) in allTimeZones"
                      :key="name"
                      :label="name"
                    >
                      <option
                        v-for="(option, index) in group"
                        :key="index"
                        :value="option.id"
                      >
                        {{ option.value }}
                      </option>
                    </optgroup>
                  </Select2>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <button
                    type="submit"
                    name="submit"
                    class="btn"
                    :disabled="isLoading"
                    @click="submitAccount()"
                  >
                    <i
                      v-if="isLoading"
                      class="fa fa-circle-o-notch fa-spin"
                    ></i>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import Select2 from '~/components/plugins/Select2'
import routeMixins from '~/mixins/routeMixins'
import navigationTab from '~/components/lead/navigation-tab'
export default {
  components: { WorkspaceNote, Select2, navigationTab },
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
      isLoading: false,
      error: null,
      account: {
        account_name: '',
        account_id: '',
        account_secret: '',
        product_field_name: '',
        timezone: '',
      },
      allTimeZones: [],
      fieldsSyncLoader: false,
    }
  },
  computed: {
    showFieldsSyncButton() {
      return this.account && this.account.account_id !== ''
    },
  },
  beforeMount() {
    this.$axios
      .$get(`all-time-zone`)
      .then(({ data }) => {
        this.allTimeZones = data
      })
      .catch((err) => {
        this.$toast.error(this.$getErrorMessage(err))
      })
    this.$axios
      .$get('lm/sharpspring/account/view')
      .then((data) => {
        this.error = data && data.error
        this.account = data.data ? data.data : {}
      })
      .catch((err) => {
        this.$toast.error(this.$getErrorMessage(err))
      })
    this.account.workspace_id = this.$route.params.workspace_id
  },
  methods: {
    submitAccount() {
      this.isLoading = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isLoading = false
        return false
      }
      this.$axios
        .$post('lm/sharpspring/account/add-update', {
          workspace_id: this.$route.params.workspace_id,
          account_name: this.account.account_name,
          account_id: this.account.account_id,
          account_secret: this.account.account_secret,
          product_field_name: this.account.product_field_name,
          timezone: this.account.timezone,
        })
        .then((response) => {
          if (response.error.length <= 0) {
            this.$toast.global.success(
              'Successfully added Sharpstring account details'
            )
          } else {
            for (const err of response.error) {
              this.$toast.error(err)
            }
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
        .finally(() => (this.isLoading = false))
    },
    async syncSharpSpringFields() {
      try {
        this.fieldsSyncLoader = true
        await this.$axios.$post(`lm/sharpspring/manage-global-fields`, {
          workspace_id: this.$route.params.workspace_id,
        })
        this.fieldsSyncLoader = false
        this.$toast.success(`Fields has been successfully synced`)
      } catch (e) {
        this.fieldsSyncLoader = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
  validations: {
    account: {
      account_name: {
        required,
      },
      account_id: {
        required,
      },
      account_secret: {
        required,
      },
      product_field_name: {},
    },
  },
}
</script>
