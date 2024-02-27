<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Edit User</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="stepsFromBox">
            <WorkspaceNote />
            <div class="stepsFromList">
              <ul class="multiStepFrom d-flex">
                <li class="active" style="flex: 1">
                  <a @click.prevent="step = 1">
                    <span>User Details</span>
                  </a>
                </li>
                <li :class="{ active: step > 1 }" style="flex: 1">
                  <a @click.prevent="step = 2">
                    <span>Organization Access</span>
                  </a>
                </li>
                <li :class="{ active: step > 2 }" style="flex: 1">
                  <a @click.prevent="step = 3">
                    <span>User Settings</span>
                  </a>
                </li>
              </ul>
              <div class="stepContentGroup customscrollbar">
                <div v-show="step === 1" class="stepContent">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <div class="img-upload imgwidth-input">
                          <div class="img-upload-img">
                            <span
                              v-if="
                                !imageData && !logo_preview && ifNotImageChar
                              "
                              :class="[
                                'profile-char',
                                'fl-as-imgtxt',
                                'bg-gray',
                                ifNotImageChar.toLowerCase(),
                              ]"
                            >
                              {{ ifNotImageChar }}
                            </span>
                            <div class="v-center">
                              <img v-if="imageData != null" :src="imageData" />
                              <img v-if="logo_preview" :src="logo_preview" />
                            </div>
                          </div>
                          <div class="img-upload-alt">
                            <span>Profile Picture </span>
                            <small class="upload-note"
                              >Upload Square picture for best viewing
                              experience</small
                            >
                            <div class="file-select">
                              <div class="file-select-name">Edit</div>
                              <div class="file-field-box">
                                <input
                                  id="resume"
                                  type="file"
                                  name="myfile"
                                  accept=".jpg, .png, .jpeg"
                                  data-lpignore="true"
                                  @change="profileChange"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Title</label>
                        <input
                          v-model="$v.form.title.$model"
                          type="text"
                          class="form-control"
                          data-lpignore="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group required">
                        <label class="control-label">Full Name</label>
                        <input
                          v-model="$v.form.name.$model"
                          type="text"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="$v.form.name.$error && !$v.form.name.required"
                          class="input-error"
                        >
                          full name is required
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Email Address</label>
                        <span class="input-control">
                          {{ form.email ? form.email : '&nbsp;' }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="control-label">Phone</label>
                        <input
                          v-model="$v.form.phone.$model"
                          type="text"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="
                            $v.form.phone.$error && !$v.form.phone.maxLength
                          "
                          class="input-error"
                        >
                          Phone should not be more than 20 characters
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="javascript:void(0);"
                    class="btn next"
                    @click.prevent="step1Next()"
                    >Next</a
                  >
                </div>
                <div v-show="step === 2" class="stepContent">
                  <div class="row">
                    <div class="col-sm-12">
                      <div
                        v-for="(wp, windex) in roles_permissions"
                        :key="windex"
                        class="form-group"
                      >
                        <div class="workspace-access-box">
                          <div class="workspace-access-title">
                            <label class="check-label"
                              >{{ wp.workspace_name }}

                              <input
                                :id="`checkbox_${windex}`"
                                v-model="
                                  form.allowedWorkspace[windex].workspace_id
                                "
                                :name="`checkbox_${windex}`"
                                class="workspaceSelect"
                                type="checkbox"
                                :true-value="wp.workspace_id"
                                false-value="0"
                                data-lpignore="true"
                                @click="workspaceChecked(windex, wp)"
                              />

                              <span class="check-span"></span>
                            </label>
                          </div>
                          <div
                            :id="`moduleSection_${windex}`"
                            class="workspace-access-body"
                            style="display: none"
                          >
                            <div
                              v-for="(wpModule, wModuleIndex) in wp.module_role"
                              :key="wModuleIndex"
                              class="workspace-box"
                              :class="{
                                disabledModule:
                                  wpModule.admin_authority === false,
                              }"
                            >
                              <label class="check-label"
                                >{{ wpModule.module_name }}
                                <input
                                  :id="`checkbox_${windex}_${wModuleIndex}`"
                                  v-model="
                                    form.allowedWorkspace[windex].modules[
                                      wModuleIndex
                                    ].module_id
                                  "
                                  :name="`checkbox_${windex}_${wModuleIndex}`"
                                  class="moduleSelect"
                                  type="checkbox"
                                  :true-value="wpModule.module_id"
                                  :false-value="0"
                                  :disabled="
                                    true && wpModule.admin_authority === false
                                  "
                                  data-lpignore="true"
                                  @click="
                                    moduleChecked(
                                      wpModule.module_id,
                                      windex,
                                      wModuleIndex
                                    )
                                  "
                                />
                                <span class="check-span"></span>
                              </label>
                              <div
                                :id="`roleSection_${windex}_${wModuleIndex}`"
                                class="radio-label-group"
                                style="display: none"
                              >
                                <label
                                  v-for="(wpRole, wRoleIndex) in wpModule.role"
                                  :key="wRoleIndex"
                                  class="radio-label"
                                  :class="{
                                    'radio-label': true,
                                    disabled:
                                      (isClientDisable &&
                                        wpRole.name == 'Client') ||
                                      (isRoleDisable &&
                                        form.allowedWorkspace[windex].modules[
                                          wModuleIndex
                                        ].role != wpRole.role_id &&
                                        wpModule.module_id == 1)
                                        ? true
                                        : false,
                                  }"
                                >
                                  {{ wpRole.display_name }}
                                  <input
                                    :id="`checkbox_${windex}_${wModuleIndex}_${wRoleIndex}`"
                                    v-model="
                                      form.allowedWorkspace[windex].modules[
                                        wModuleIndex
                                      ].role
                                    "
                                    :disabled="
                                      (isClientDisable &&
                                        wpRole.name == 'Client') ||
                                      (isRoleDisable &&
                                        form.allowedWorkspace[windex].modules[
                                          wModuleIndex
                                        ].role != wpRole.role_id &&
                                        wpModule.module_id == 1)
                                        ? true
                                        : false
                                    "
                                    :name="`checkbox_${windex}_${wModuleIndex}_${wRoleIndex}`"
                                    type="radio"
                                    :value="wpRole.role_id"
                                    :true-value="wpRole.role_id"
                                    data-lpignore="true"
                                    @click="
                                      roleChecked(
                                        ...arguments,
                                        windex,
                                        wModuleIndex,
                                        wpRole,
                                        wpModule
                                      )
                                    "
                                  />
                                  <span class="radio-span"></span>
                                </label>
                                <div
                                  :id="`role_${windex}_${wModuleIndex}`"
                                  class="input-error"
                                ></div>
                              </div>
                              <div
                                v-if="wpModule.department.length"
                                :id="`depSection_${windex}_${wModuleIndex}`"
                                style="display: none"
                                class="mt20"
                              >
                                <strong>Select Work Type</strong>
                                <Select2
                                  v-model="
                                    form.allowedWorkspace[windex].modules[
                                      wModuleIndex
                                    ].departments
                                  "
                                  class="select"
                                  :options="wpModule.department"
                                  placeholder="Select Work Type"
                                  :disabled="
                                    form.allowedWorkspace[windex].modules[
                                      wModuleIndex
                                    ].isClientDepartment
                                  "
                                  @input="
                                    departmentChecked(
                                      ...arguments,
                                      windex,
                                      wModuleIndex
                                    )
                                  "
                                ></Select2>
                                <div
                                  :id="`dep_${windex}_${wModuleIndex}`"
                                  class="input-error"
                                ></div>
                              </div>
                              <div
                                v-if="wpModule.client_data.length"
                                :id="`clientSection_${windex}_${wModuleIndex}`"
                                class="mt20"
                                style="display: none"
                              >
                                <strong> Select Client</strong>
                                <div class="owner-dropdown owner-multiple">
                                  <Select2WithImage
                                    v-model="
                                      form.allowedWorkspace[windex].modules[
                                        wModuleIndex
                                      ].client_id
                                    "
                                    :dropdown-css-class="'owner-select'"
                                    :options="wpModule.client_data"
                                    :custom-event="true"
                                    @optionChangeHandler="
                                      clientChangeHandler(
                                        ...arguments,
                                        windex,
                                        wModuleIndex
                                      )
                                    "
                                  >
                                  </Select2WithImage>
                                  <div
                                    :id="`client_${windex}_${wModuleIndex}`"
                                    class="input-error"
                                  ></div>
                                </div>
                              </div>
                              <div
                                v-if="
                                  form.allowedWorkspace[windex].modules[
                                    wModuleIndex
                                  ].module_id === 3
                                "
                                class="mt1"
                              >
                                <label class="check-label"
                                  >Allow Lead Import
                                  <input
                                    v-model="form.allow_lead_import"
                                    class="moduleSelect"
                                    type="checkbox"
                                    data-lpignore="true"
                                  />
                                  <span class="check-span"></span>
                                </label>
                              </div>
                              <div
                                v-if="
                                  form.allowedWorkspace[windex].modules[
                                    wModuleIndex
                                  ].module_id === 3
                                "
                                class="mt1"
                              >
                                <label class="check-label"
                                  >Allow Dealership Import
                                  <input
                                    v-model="form.allow_dealership_import"
                                    class="moduleSelect"
                                    type="checkbox"
                                    data-lpignore="true"
                                  />
                                  <span class="check-span"></span>
                                </label>
                              </div>
                              <div
                                v-if="
                                  form.allowedWorkspace[windex].modules[
                                    wModuleIndex
                                  ].module_id === 3
                                "
                                class="mt1"
                              >
                                <label class="check-label"
                                  >Allow Product Import
                                  <input
                                    v-model="form.allow_product_import"
                                    class="moduleSelect"
                                    type="checkbox"
                                    data-lpignore="true"
                                  />
                                  <span class="check-span"></span>
                                </label>
                              </div>
                              <div
                                v-if="
                                  form.allowedWorkspace[windex].modules[
                                    wModuleIndex
                                  ].module_id === 3
                                "
                                class="mt1"
                              >
                                <label class="check-label"
                                  >Allow to delete Leads
                                  <input
                                    v-model="form.allow_deleting_leads"
                                    class="moduleSelect"
                                    type="checkbox"
                                    data-lpignore="true"
                                  />
                                  <span class="check-span"></span>
                                </label>
                              </div>
                              <div
                                v-if="
                                  form.allowedWorkspace[windex].modules[
                                    wModuleIndex
                                  ].module_id === 3
                                "
                                class="mt1"
                              >
                                <label class="check-label"
                                  >Allow to delete Dealerships
                                  <input
                                    v-model="form.allow_deleting_dealerships"
                                    class="moduleSelect"
                                    type="checkbox"
                                    data-lpignore="true"
                                  />
                                  <span class="check-span"></span>
                                </label>
                              </div>
                              <div
                                v-if="
                                  form.allowedWorkspace[windex].modules[
                                    wModuleIndex
                                  ].module_id === 3
                                "
                                class="mt1"
                              >
                                <label class="check-label"
                                  >Allow to delete Products
                                  <input
                                    v-model="form.allow_deleting_products"
                                    class="moduleSelect"
                                    type="checkbox"
                                    data-lpignore="true"
                                  />
                                  <span class="check-span"></span>
                                </label>
                              </div>
                              <div
                                v-if="
                                  form.allowedWorkspace[windex].modules[
                                    wModuleIndex
                                  ].module_id === 3
                                "
                                class="mt1"
                              >
                                <label class="check-label"
                                  >Delete Options
                                  <input
                                    v-model="form.delete_options"
                                    class="moduleSelect"
                                    type="checkbox"
                                    data-lpignore="true"
                                  />
                                  <span class="check-span"></span>
                                </label>
                              </div>
                            </div>
                            <div
                              :id="`module_${windex}`"
                              class="input-error"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="mb1">
                        <div ref="workspaceMessage" class="input-error"></div>
                      </div>
                    </div>
                  </div>
                  <a
                    href="javascript:void(0);"
                    class="btn btn-gray previous"
                    @click.prevent="step2Previous()"
                    >Previous</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="btn next"
                    @click.prevent="step2Next()"
                    >Next</a
                  >
                </div>
                <div v-show="step === 3" class="stepContent">
                  <div
                    v-for="(aw, awindex) in form.allowedWorkspace"
                    :key="awindex"
                  >
                    <template v-if="aw.workspace_id">
                      <div
                        v-for="(wp, windex) in roles_permissions"
                        :key="windex"
                        class="row"
                      >
                        <div
                          v-if="aw.workspace_id == wp.workspace_id"
                          class="col-sm-12"
                        >
                          <div class="form-group">
                            <div class="workspace-access-box">
                              <div class="workspace-access-title">
                                <label>{{ wp.workspace_name }}</label>
                              </div>
                              <div class="workspace-access-body p1">
                                <div class="row">
                                  <div class="col-sm-6">
                                    <div class="form-group">
                                      <label class="control-label"
                                        >Daily Capacity Hours</label
                                      >
                                      <input
                                        v-model.lazy="
                                          form.allowedWorkspace[windex]
                                            .capacity_hour
                                        "
                                        type="text"
                                        class="form-control"
                                        data-lpignore="true"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div v-if="wp.display_salary" class="row">
                                  <div class="col-sm-6">
                                    <div class="form-group">
                                      <label class="control-label"
                                        >Salary</label
                                      >
                                      <input
                                        v-model.lazy="
                                          form.allowedWorkspace[windex].salary
                                        "
                                        type="text"
                                        class="form-control"
                                        data-lpignore="true"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <!-- <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Holiday Rules</label>
                      <select class="select">
                        <option>Choose Holiday List</option>
                        <option>Choose Holiday List</option>
                        <option>Choose Holiday List</option>
                        <option>Choose Holiday List</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Working Days Rules</label>
                      <select class="select">
                        <option>Choose Working Days</option>
                        <option>Choose Working Days</option>
                        <option>Choose Working Days</option>
                        <option>Choose Working Days</option>
                      </select>
                    </div>
                  </div>
                </div>-->
                  <a
                    href="javascript:void(0);"
                    class="btn btn-gray previous"
                    @click.prevent="step3Previous()"
                    >Previous</a
                  >
                  <button
                    type="button"
                    :class="{
                      btn: true,
                      'btn-disable': loading,
                    }"
                    :disabled="loading"
                    @click="submit"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Update User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Client Change Popup -->
    <div id="client-change" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Client Change</h5>
            <button
              type="button"
              class="close invitation-dismiss"
              data-dismiss="modal"
              aria-label="Close"
              @click="removeClientDialog"
            >
              <span aria-hidden="true">
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
              </span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>
              Are you sure you want to change the Client associated with this
              User? Note: Doing so will update all tasks, attachments, and files
              with the new Client information.
            </p>
            <div class="btn-group">
              <button
                type="button"
                class="btn"
                @click="clientChangeHandlerDialog()"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a
      id="clientChangeDialog"
      style="display: none"
      href="javascript:void(0);"
    ></a>
  </div>
</template>
<script>
import $ from 'jquery'
import { required, maxLength } from 'vuelidate/lib/validators'
import Select2 from '~/components/plugins/Select2'
import Select2WithImage from '~/components/plugins/Select2WithImage'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
export default {
  components: { WorkspaceNote, Select2, Select2WithImage },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'can-access-general-settings'],
  data() {
    return {
      loading: false,
      ifNotImageChar: '',
      display_salary: false,
      form: {
        profile_image: null,
        allow_lead_import: false,
        delete_options: false,
        allow_dealership_import: 0,
        allow_product_import: 0,
        allow_deleting_leads: 0,
        allow_deleting_dealerships: 0,
        allow_deleting_products: 0,
        name: null,
        email: null,
        phone: null,
        title: null,
        role: null,
        allowedWorkspace: [],
        user_id: this.$route.params.userid ? this.$route.params.userid : null,
        internal_workspace_id: this.$route.params.workspace_id
          ? this.$route.params.workspace_id
          : this.$_auth().id,
        workspace_id: this.$_auth().id,
      },
      roles_permissions: [],
      selectedRoles_permissions: [],
      logo_preview: null,
      imageData: null,
      step: 1,
      isClientDisable: false,
      isRoleDisable: false,
      clientWorkspaceIndex: null,
      clientWorkspaceModuleIndex: null,
      clientChangeLoader: false,
    }
  },
  computed: {
    userAvatar() {
      return (
        (!this.imageData &&
          this.form.name !== '' &&
          this.form.name !== null &&
          `https://ui-avatars.com/api/?name=${encodeURI(
            this.form.name
          )}&size=128&background=e9ecef&bold=true`) ||
        null
      )
    },
  },
  async mounted() {
    try {
      const { data } = await this.$axios.$get(
        `/user/roles-permissions?workspace_id=${this.form.internal_workspace_id}`
      )
      this.roles_permissions = data.roles_permission.filter((wp) => {
        wp.module_role = [...wp.module_role.filter((e) => e.module_id === 2)]
        return !!wp.module_role.length
      })
      this.display_salary = data.display_salary
      data.roles_permission.forEach((item, index) => {
        const modulesData = []
        item.module_role.forEach((module, moduleIndex) => {
          if (module.module_id === 1) {
            modulesData.push({
              module_id: 0,
              role: 0,
              departments: 0,
              isClientDepartment: false,
              client_id: 0,
              change_client: false,
              exit_client_id: 0,
            })
          } else {
            modulesData.push({ module_id: 0, role: 0 })
          }
        })
        this.form.allowedWorkspace.push({
          workspace_id: 0,
          workspace_org_id: 0,
          capacity_hour: null,
          salary: null,
          modules: modulesData,
        })
      })

      const userData = await this.$axios.$post('/user/details', {
        user_id: this.form.user_id,
        workspace_id: this.form.internal_workspace_id,
      })
      this.form.name = userData.data.name
      this.ifNotImageChar = (userData.data.name || '').charAt(0).toUpperCase()
      this.form.email = userData.data.email
      this.form.phone = userData.data.phone
      this.form.title = userData.data.title
      this.logo_preview = userData.data.display_profile_image
      this.selectedRoles_permissions = userData.data.allowedWorkspace
      if (this.selectedRoles_permissions.length) {
        this.selectedRoles_permissions.forEach((item, index) => {
          const searchIndex = this.roles_permissions.findIndex(
            (wp) => wp.workspace_id === item.workspace_id
          )
          item.module_role.forEach((module, moduleIndex) => {
            if (module.module_id === 1 && module.role !== null) {
              if (module.role_name !== 'Client') {
                this.isClientDisable = true
              }
              this.form.allowedWorkspace[searchIndex].modules[
                moduleIndex
              ].departments = module.department
              $('#depSection_' + searchIndex + '_' + moduleIndex).css(
                'display',
                'block'
              )
              if (module.isClientDepartment === true) {
                if (module.role_name === 'Client') {
                  this.isRoleDisable = true
                }
                $('#clientSection_' + searchIndex + '_' + moduleIndex).css(
                  'display',
                  'block'
                )
                this.form.allowedWorkspace[searchIndex].modules[
                  moduleIndex
                ].isClientDepartment = module.isClientDepartment
                this.form.allowedWorkspace[searchIndex].modules[
                  moduleIndex
                ].client_id = module.client_id
                this.form.allowedWorkspace[searchIndex].modules[
                  moduleIndex
                ].exit_client_id = module.client_id
              }
            }
            if (module.role !== null) {
              this.form.allowedWorkspace[searchIndex].modules[
                moduleIndex
              ].role = module.role
              this.form.allowedWorkspace[searchIndex].modules[
                moduleIndex
              ].module_id = module.module_id

              $('#moduleSection_' + searchIndex).css('display', 'block')
              $('#roleSection_' + searchIndex + '_' + moduleIndex).css(
                'display',
                'block'
              )
            }

            this.form.allowedWorkspace[searchIndex].workspace_id =
              item.workspace_id
            this.form.allowedWorkspace[searchIndex].workspace_org_id =
              item.workspace_id
            this.form.allowedWorkspace[searchIndex].capacity_hour =
              item.capacity_hour
            this.form.allowedWorkspace[searchIndex].salary = item.salary
          })
        })
      }
    } catch (e) {
      if (e.response) {
        const { data } = e.response
        this.$toast.error(data.message)
      }

      this.loading = false
    }
  },
  methods: {
    workspaceChecked(windex, wp) {
      if (document.getElementById('checkbox_' + windex).checked) {
        $('#moduleSection_' + windex).css('display', 'block')
        this.$refs.workspaceMessage.innerHTML = ''
        document.getElementById('module_' + windex).innerHTML =
          'Must Select Modules'
      } else {
        wp.module_role.forEach((module, moduleIndex) => {
          this.form.allowedWorkspace[windex].modules[moduleIndex].module_id = 0
          this.form.allowedWorkspace[windex].modules[moduleIndex].role = 0
          $('#roleSection_' + windex + '_' + moduleIndex).css('display', 'none') //
          document.getElementById(
            'role_' + windex + '_' + moduleIndex
          ).innerHTML = ''
        })
        document.getElementById('module_' + windex).innerHTML = ''
        $('#moduleSection_' + windex).css('display', 'none')
      }
    },

    moduleChecked(moduleId, windex, wModuleIndex) {
      if (
        document.getElementById('checkbox_' + windex + '_' + wModuleIndex)
          .checked
      ) {
        $('#roleSection_' + windex + '_' + wModuleIndex).css('display', 'block')
        this.$refs.workspaceMessage.innerHTML = ''
        document.getElementById(
          'role_' + windex + '_' + wModuleIndex
        ).innerHTML = 'Must Select Role'
        document.getElementById('module_' + windex).innerHTML = ''
      } else {
        this.form.allowedWorkspace[windex].modules[wModuleIndex].role = 0
        this.form.allowedWorkspace[windex].modules[wModuleIndex].module_id = 0
        document.getElementById(
          'role_' + windex + '_' + wModuleIndex
        ).innerHTML = ''
        document.getElementById('module_' + windex).innerHTML = ''
        $('#roleSection_' + windex + '_' + wModuleIndex).css('display', 'none')
      }
    },
    roleChecked(data, windex, wModuleIndex, wpRole, wp) {
      document.getElementById('role_' + windex + '_' + wModuleIndex).innerHTML =
        ''
    },
    departmentChecked(data, windex, wModuleIndex) {
      document.getElementById('dep_' + windex + '_' + wModuleIndex).innerHTML =
        ''
    },
    clientChangeHandler(data, windex, wModuleIndex) {
      this.form.allowedWorkspace[windex].modules[wModuleIndex].client_id =
        data.id
      this.clientChangeLoader = false
      this.clientWorkspaceIndex = windex
      this.clientWorkspaceModuleIndex = wModuleIndex
      if (parseInt(data.id) !== 0) {
        document.getElementById(
          'client_' + windex + '_' + wModuleIndex
        ).innerHTML = ''
      } else {
        document.getElementById(
          'client_' + windex + '_' + wModuleIndex
        ).innerHTML = 'Must Select Client'
      }
      if (
        parseInt(
          this.form.allowedWorkspace[windex].modules[wModuleIndex]
            .exit_client_id
        ) !== parseInt(data.id) &&
        parseInt(data.id) !== 0
      ) {
        window.$(document).find('#clientChangeDialog').trigger('click')
      } else {
        this.form.allowedWorkspace[windex].modules[
          wModuleIndex
        ].change_client = false
      }
    },
    clientChangeHandlerDialog() {
      this.clientChangeLoader = true
      this.form.allowedWorkspace[this.clientWorkspaceIndex].modules[
        this.clientWorkspaceModuleIndex
      ].change_client = true
      $(document).find('.invitation-dismiss').trigger('click')
    },
    removeClientDialog() {
      if (!this.clientChangeLoader) {
        this.form.allowedWorkspace[this.clientWorkspaceIndex].modules[
          this.clientWorkspaceModuleIndex
        ].change_client = false

        this.form.allowedWorkspace[this.clientWorkspaceIndex].modules[
          this.clientWorkspaceModuleIndex
        ].client_id =
          this.form.allowedWorkspace[this.clientWorkspaceIndex].modules[
            this.clientWorkspaceModuleIndex
          ].exit_client_id

        $(document).find('.invitation-dismiss').trigger('click')
      }
    },
    step1Next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.step++
    },
    step2Next() {
      const checkBoxes = document.querySelectorAll('.workspaceSelect:checked')
      if (!checkBoxes.length) {
        this.$refs.workspaceMessage.innerHTML =
          'Please, check at least one workspace!'
        return
      }
      if (this.form.allowedWorkspace) {
        for (let i = 0; i < this.form.allowedWorkspace.length; i++) {
          if (
            this.form.allowedWorkspace[i].workspace_id !== '' ||
            this.form.allowedWorkspace[i].workspace_id !== '0'
          ) {
            const moduleChecked = document.querySelectorAll(
              '.moduleSelect:checked'
            )
            if (!moduleChecked.length) {
              document.getElementById('module_' + i).innerHTML =
                'Must Select Modules'
              return
            }
            for (
              let j = 0;
              j < this.form.allowedWorkspace[i].modules.length;
              j++
            ) {
              let moduleLength = 0
              if (
                parseInt(this.form.allowedWorkspace[i].workspace_id) !== 0 &&
                this.form.allowedWorkspace[i].modules[j].module_id === 0
              ) {
                moduleLength = moduleLength + 1
              }
              if (
                this.form.allowedWorkspace[i].modules.length === moduleLength
              ) {
                document.getElementById('module_' + i).innerHTML =
                  'Must Select Modules'
                return
              }
              if (this.form.allowedWorkspace[i].modules[j].module_id !== 0) {
                if (this.form.allowedWorkspace[i].modules[j].role === 0) {
                  document.getElementById('role_' + i + '_' + j).innerHTML =
                    'Must Select Role'
                  return
                }
                if (
                  this.form.allowedWorkspace[i].modules[j].departments === 0 &&
                  this.form.allowedWorkspace[i].modules[j].module_id === 1
                ) {
                  document.getElementById('dep_' + i + '_' + j).innerHTML =
                    'Must Select Work Type'
                  return
                }
                if (
                  this.form.allowedWorkspace[i].modules[j].isClientDepartment
                ) {
                  if (
                    parseInt(
                      this.form.allowedWorkspace[i].modules[j].client_id
                    ) === 0 &&
                    this.form.allowedWorkspace[i].modules[j].module_id === 1
                  ) {
                    document.getElementById('client_' + i + '_' + j).innerHTML =
                      'Must Select Client'
                    return
                  }
                }
              }
            }
          }
        }
      }
      this.step++
    },
    step2Previous() {
      this.step--
    },
    step3Previous() {
      this.step--
    },
    goToStep(step) {
      this.step = step
    },
    async submit(e) {
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('profile_image', this.form.profile_image)
        formData.append('name', this.form.name)
        formData.append('phone', this.form.phone)
        formData.append('title', this.form.title)
        formData.append('role', this.form.role)
        formData.append('permissions', this.form.permissions)
        formData.append('workspace_id', this.form.internal_workspace_id)
        formData.append('user_id', this.form.user_id)
        formData.append(
          'allow_lead_import',
          this.form.allow_lead_import === false ? '0' : '1'
        )
        formData.append(
          'allow_dealership_import',
          this.form.allow_dealership_import === false ? '0' : '1'
        )
        formData.append(
          'allow_product_import',
          this.form.allow_product_import === false ? '0' : '1'
        )
        formData.append(
          'allow_deleting_leads',
          this.form.allow_deleting_leads === false ? '0' : '1'
        )
        formData.append(
          'allow_deleting_dealerships',
          this.form.allow_deleting_dealerships === false ? '0' : '1'
        )
        formData.append(
          'allow_deleting_products',
          this.form.allow_deleting_products === false ? '0' : '1'
        )
        formData.append(
          'delete_options',
          this.form.delete_options === false ? '0' : '1'
        )

        formData.append(
          'allowedWorkspace',
          JSON.stringify(this.form.allowedWorkspace)
        )
        const { message } = await this.$axios.$post('user/edit-user', formData)
        this.$toast.global.success(message)
        this.$router.push({
          name: 'workspace_id-workspace-settings-user-list',
          params: { workspace_id: this.form.internal_workspace_id },
        })
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.loading = false
      }
    },
    profileChange(event) {
      const twoMB = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMB) {
          this.form.profile_image = event.target.files[0]
          this.logo_preview = null
          const input = event.target
          if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
              this.imageData = e.target.result
            }
            reader.readAsDataURL(input.files[0])
          }
        } else {
          event.target.value = null
          this.$toast.error('File size should not be more than 2MB')
        }
      }
    },
  },

  validations: {
    form: {
      name: { required },
      email: {},
      phone: { maxLength: maxLength(20) },
      title: {},
    },
  },
}
</script>

<style scoped></style>
