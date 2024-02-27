<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Dealership Preference</h4>
      <label class="label-switch">
        <span>Is Active</span>
        <input
          id="detailView"
          v-model="isActive"
          type="checkbox"
          class="switch switch-onoff"
          name="detail-view"
          @change="updateActive()"
        />
        <span class="lable"></span>
      </label>
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="workspace-settings-subheading">
        <p>
          Choose your preferred number for creating Dealership. Once selected
          and saved, changes will occur automatically.
        </p>
      </div>
      <div class="form-group">
        <WorkspaceNote />
      </div>
      <div class="row no-gutters">
        <div class="col-lg-6 col-md-12">
          <form @submit.prevent="submit" @keypress.enter.prevent>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group mb10 required">
                  <label class="control-label">Dealership Number</label>
                  <input
                    v-model.trim="$v.dealership_number.$model"
                    type="text"
                    class="form-control"
                    data-lpignore="true"
                    :disabled="!isActive"
                  />
                  <div
                    v-if="
                      $v.dealership_number.$error &&
                      !$v.dealership_number.required
                    "
                    class="input-error"
                  >
                    Required
                  </div>
                  <div
                    v-if="
                      $v.dealership_number.$error &&
                      !$v.dealership_number.numeric
                    "
                    class="input-error"
                  >
                    Dealership Number must be numeric
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn"
                    :class="{ 'btn-disable': loading }"
                    :disabled="loading || !isActive"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
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
import { required, numeric } from 'vuelidate/lib/validators'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
export default {
  components: { WorkspaceNote },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
  ],
  data() {
    return {
      workspace_id: this.$_auth().id ? this.$_auth().id : null,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      loading: null,
      dealership_number: '',
      isActive: false,
    }
  },
  // watch: {
  //   isActive() {
  //     this.updateActive()
  //   },
  // },
  mounted() {
    // this.$setPageTitle('Organization Settings', false)
    this.getDealerNumber()
  },
  methods: {
    async getDealerNumber() {
      try {
        const { data } = await this.$axios.$get('/view-workspace', {
          params: {
            workspace_id: this.$route.params.workspace_id,
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        this.myData = true
        // if (data.dealership_number != null) {
        this.dealership_number = data.dealership_no
        this.isActive = data.dealership_no_status
        // }
      } catch (e) {
        const { data } = e.response
        this.$toast.error(data.message)
        this.loading = false
      }
    },
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        const { message } = await this.$axios.$post(
          'update-workspace-dealership-no',
          {
            workspace_id: this.internal_workspace_id,
            dealership_no: this.dealership_number,
          }
        )
        this.status = true
        this.loading = false
        this.$toast.success(message)
      } catch (e) {
        const { data } = e.response
        this.$toast.error(data.message)
        this.loading = false
      }
    },
    updateActive() {
      this.$axios
        .$post('update-workspace-dealership-no', {
          workspace_id: this.internal_workspace_id,
          dealership_no_status: this.isActive ? 1 : 0,
        })
        .then(({ message }) => {
          this.status = true
          this.loading = false
          this.$toast.success(message)
          this.getDealerNumber()
        })
        .catch((e) => {
          const { data } = e.response
          this.$toast.error(data.message)
          this.loading = false
        })
    },
  },
  validations: {
    dealership_number: {
      required,
      numeric,
    },
  },
}
</script>

<style scoped></style>
