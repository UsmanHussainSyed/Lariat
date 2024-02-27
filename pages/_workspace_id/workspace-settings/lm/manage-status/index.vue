<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li class="active">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-manage-status',
            }"
          >
            Lead Status Management
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-lm-manage-status-Task-status',
            }"
          >
            Lead Task Status Management
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="workspace-settings customscrollbar">
      <div class="form-group">
        <WorkspaceNote />
      </div>
      <div class="row no-gutters">
        <div class="col-lg-7 col-md-12">
          <form
            @submit.prevent="addleadTaskStatus"
            @keypress.enter.prevent="addleadTaskStatus"
          >
            <div class="row">
              <div class="col-md-4">
                <div class="form-group required">
                  <label class="control-label">Name</label>
                  <input
                    v-model="$v.status_name.$model"
                    type="text"
                    class="form-control"
                    placeholder="Status Name"
                    data-lpignore="true"
                  />
                  <div
                    v-if="$v.status_name.$error && !$v.status_name.required"
                    class="input-error"
                  >
                    Status Name is required
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group required">
                  <label class="control-label">Pick Background Color</label>
                  <div>
                    <Colorpicker v-model="status_color" :color="status_color" />
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <text-field
                  v-model="description"
                  label="Status Description"
                  placeholder="Status Description"
                  :textarea="true"
                  :required="true"
                  :rows="5"
                  :v="$v.description"
                ></text-field>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <button
                    type="submit"
                    class="btn"
                    :class="{ 'btn-disable': loading }"
                    :disabled="loading"
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
      <ContentLoader
        v-if="!myData"
        :speed="1"
        :animate="true"
        :width="400"
        :height="100"
        class="normalLoader"
      >
        <rect x="0" y="-1" rx="0" ry="0" width="400" height="1" />
        <rect x="0" y="15" rx="0" ry="0" width="400" height="1" />
        <rect x="0" y="30" rx="0" ry="0" width="400" height="1" />
        <rect x="0" y="45" rx="0" ry="0" width="400" height="1" />
        <rect x="0" y="60" rx="0" ry="0" width="400" height="1" />
      </ContentLoader>

      <div v-else class="row no-gutters">
        <div class="col-lg-9 col-md-11 col-sm-12">
          <div class="workspace-setting-table status-manage-table">
            <ul class="thead">
              <li>
                <input
                  v-model="search"
                  type="search"
                  class="form-control"
                  name="search"
                  placeholder="Search Lead status"
                  data-lpignore="true"
                />
              </li>
            </ul>
            <div v-if="isSearchTerm" class="search-result mb1">
              <div class="alert alert-info alert-dismissible">
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  @click="search = ''"
                >
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
                Showing results for
                <strong>"{{ search.trim() }}"</strong>
              </div>
            </div>
            <ul class="thead workspace-tabledata-header">
              <li>
                <div class="name sorting">Name</div>
                <div class="description sorting">Description</div>
                <div class="bgcolor sorting">Background Color</div>
                <div class="status sorting">Status Control</div>
              </li>
            </ul>
            <draggable
              v-model="leadTaskStatus"
              tag="ul"
              class="tbody list-animation"
              draggable=".drag"
              handle=".drag-row"
              @change="dragLeadStatus"
            >
              <li
                v-for="(leadStatus, index) in listItems"
                :key="leadStatus.id"
                class="drag"
                :class="{ inactive: !leadStatus.is_active }"
                :style="`--animation-order: ${index + 1}`"
              >
                <div class="workspace-tabledata" :class="{ pl0: isSearchTerm }">
                  <span v-if="!isSearchTerm" class="drag-row">
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
                        <g
                          id="Group_4348"
                          transform="translate(588.166 653.684)"
                        >
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
                  <span
                    v-if="parseInt(leadStatus.is_lock) === 1 && true"
                    class="readonly"
                    >{{ leadStatus.status_name }}</span
                  >
                  <input
                    v-else
                    v-model="leadStatus.status_name"
                    class="form-control"
                    data-lpignore="true"
                    @change="editStatus($event, leadStatus)"
                  />
                  <div class="description">
                    <input
                      v-model="leadStatus.description"
                      class="form-control"
                      data-lpignore="true"
                      placeholder="Description"
                      @change="editStatus($event, leadStatus)"
                    />
                  </div>
                  <div v-if="displayPickerData">
                    <colorpicker
                      v-model="leadStatus.status_color"
                      :color="leadStatus.status_color"
                      @update-color="editStatus($event, leadStatus, 'color')"
                    />
                  </div>
                  <label
                    id="status-control"
                    v-tooltip="
                      parseInt(leadStatus.is_lock) === 1
                        ? 'Status is locked'
                        : parseInt(leadStatus.product_count) > 0
                        ? 'Status is associated with some product'
                        : ''
                    "
                    class="label-switch"
                  >
                    <input
                      v-model="leadStatus.is_active"
                      type="checkbox"
                      :disabled="
                        (parseInt(leadStatus.is_lock) === 1 && true) ||
                        (parseInt(leadStatus.product_count) > 0 && true)
                      "
                      class="switch switch-onoff"
                      name="status-control"
                      @change="editStatus($event, leadStatus)"
                    />
                    <span
                      class="lable"
                      :class="{
                        inactive:
                          (parseInt(leadStatus.is_lock) === 1 && true) ||
                          (parseInt(leadStatus.product_count) > 0 && true),
                      }"
                    ></span>
                  </label>
                  <a
                    v-if="
                      parseInt(leadStatus.is_lock) ||
                      parseInt(leadStatus.lead_task_count) > 0
                    "
                    v-tooltip="'Default Status'"
                    class="lock-icon"
                  >
                    <svg
                      id="_x31__x2C_5"
                      class="locked-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      xml:space="preserve"
                    >
                      <path
                        class="fill-color"
                        d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
                      ></path>
                      <path
                        class="fill-color"
                        d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
                      ></path>
                      <path
                        class="fill-color"
                        d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
                      ></path>
                      <path
                        class="fill-color"
                        d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
                      ></path>
                    </svg>
                  </a>
                  <a
                    v-else
                    href="javascript:void(0);"
                    class="delete-forever"
                    data-toggle="modal"
                    data-target="#delete-task-status"
                    @click="deleteStatus(leadStatus.id)"
                  >
                    <svg
                      id="Layer_1"
                      class="delete-icon h-orange"
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete Task Status"
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
                </div>
              </li>
            </draggable>
            <EmptyState v-if="!listItems.length" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { required } from 'vuelidate/lib/validators'
import { ContentLoader } from 'vue-content-loader'
import Colorpicker from '~/components/plugins/Colorpicker'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import EmptyState from '~/components/theme/global/EmptyState'
import TextField from '~/components/lead/TextField.vue'
export default {
  components: {
    WorkspaceNote,
    draggable,
    ContentLoader,
    Colorpicker,
    EmptyState,
    TextField,
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'block-access-dealerAdmin',
    'can-access-general-settings',
  ],
  data() {
    return {
      description: '',
      myData: null,
      search: '',
      loading: false,
      workspace_id: this.$_auth().id ? this.$_auth().id : null,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      status_name: null,
      status_color: null,
      leadTaskStatus: [],
      displayPickerData: false,
    }
  },
  computed: {
    isSearchTerm() {
      return this.search && this.search.trim()
    },
    listItems() {
      const search = this.search && this.search.trim()

      if (search) {
        return this.leadTaskStatus.filter(({ status_name }) => {
          let regex = null
          try {
            regex = new RegExp(search, 'ig')
          } catch {}

          return regex && regex.test(status_name)
        })
      }

      return this.leadTaskStatus
    },
  },

  mounted() {
    this.getLeadStatusList()
  },
  methods: {
    async deleteStatus(status_id) {
      try {
        const res = await this.$axios.$post('/lm/lead-status/delete', {
          workspace_id: this.$getWorkspaceId(),
          status_id,
        })
        this.$toast.success(res.message)
        this.leadTaskStatus.splice(
          this.leadTaskStatus.findIndex((e) => e.id === status_id),
          1
        )
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    async getLeadStatusList() {
      this.displayPickerData = true
      try {
        const lead_status = await this.$axios.$post(`/lm/lead-status/list`, {
          workspace_id: this.internal_workspace_id,
        })
        this.myData = true
        this.leadTaskStatus.push(...lead_status.data)
      } catch (e) {
        const { data } = e.response || {}
        this.$toast.error((data && data.message) || e.message)
        this.loading = false
      }
    },
    async addleadTaskStatus(e) {
      this.$v.$touch()

      this.status = false
      if (this.$v.$invalid) {
        return
      }
      try {
        this.loading = true
        this.displayPickerData = false

        const { message } = await this.$axios.$post('/lm/lead-status/add', {
          workspace_id: this.internal_workspace_id,
          status_name: this.status_name,
          status_color: this.status_color,
          description: this.description,
          is_active: true,
        })

        this.status_name = ''
        this.description = ''
        this.loading = false
        this.leadTaskStatus = []
        this.getLeadStatusList()
        this.displayPickerData = true
        this.$nextTick(() => {
          this.$v.$reset()
        })
        this.$toast.success(message)
      } catch (e) {
        const { data } = e.response || {}
        this.$toast.error((data && data.message) || e.message)
        this.loading = false
        this.displayPickerData = true
      }
    },

    async editStatus(e, status, f = '') {
      const status_name = status.status_name
      const description = status.description
      let status_color = status.status_color
      const is_active = status.is_active ? 1 : 0
      const status_id = status.id
      if (f === 'color') {
        status_color = e
      }
      if (status_name !== '' && status_color !== '') {
        try {
          const { message, data } = await this.$axios.$post(
            '/lm/lead-status/update',
            {
              workspace_id: this.internal_workspace_id,
              status_name,
              status_color,
              is_active,
              status_id,
              description,
            }
          )
          if (Object.keys(data).length === 0) {
            this.$toast.success(message)
          } else {
            status.status_name = data.status_name
            this.$toast.error(message)
          }
        } catch (e) {
          this.$toast.error(this.$getErrorMessage(e))
          this.loading = false
        }
      }
    },
    async dragLeadStatus() {
      this.leadTaskStatus.map(
        (status, index) => (status.sort_order = index + 1)
      )
      this.displayPickerData = false
      try {
        const { message } = await this.$axios.$post(
          `/lm/lead-status/change-ordering`,
          {
            workspace_id: this.internal_workspace_id,
            data: this.leadTaskStatus,
          }
        )

        this.displayPickerData = true
        this.$toast.success(message)
      } catch (e) {
        const { data } = e.response || {}
        this.$toast.error((data && data.message) || e.message)
      }
    },
  },
  validations: {
    status_name: { required },
    description: { required },
  },
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

#status-control {
  min-width: auto;
  width: auto;
}
.inactive {
  opacity: 0.5;
}
</style>
