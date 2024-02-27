<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Add User</h4>
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
                            <div class="v-center">
                              <img
                                v-if="!imageData"
                                src="~/assets/img/icon/add-user.svg"
                              />
                              <img v-if="imageData != null" :src="imageData" />
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
                          v-model.lazy="$v.form.title.$model"
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
                          v-model.lazy="$v.form.name.$model"
                          type="text"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="$v.form.name.$error && !$v.form.name.required"
                          class="input-error"
                        >
                          Full name is required
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group required">
                        <label class="control-label">Email Address</label>
                        <input
                          v-model.lazy="$v.form.email.$model"
                          type="email"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="$v.form.email.$error && !$v.form.email.required"
                          class="input-error"
                        >
                          Email address is required
                        </div>
                        <div
                          v-if="$v.form.email.$error && !$v.form.email.email"
                          class="input-error"
                        >
                          Please enter valid email address
                        </div>
                        <small v-if="fetchingUserDetail">
                          <i class="fa fa-circle-o-notch fa-spin"></i
                          >&nbsp;checking...</small
                        >
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
                              v-tooltip="
                                !canAddMoreDamAdmin(wpModule, wp)
                                  ? 'Please upgrade your DAM subscription plan to add more admins.'
                                  : ''
                              "
                              class="workspace-box"
                              :class="{
                                disabledModule:
                                  wpModule.admin_authority === false ||
                                  !canAddMoreDamAdmin(wpModule, wp),
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
                                  data-lpignore="true"
                                  :true-value="wpModule.module_id"
                                  :false-value="0"
                                  :disabled="
                                    true && wpModule.admin_authority === false
                                  "
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
                                  :class="{
                                    'radio-label': true,
                                    disabled:
                                      wpRole.name === 'Client' &&
                                      userExists &&
                                      !is_client,
                                  }"
                                  >{{ wpRole.display_name }}
                                  <input
                                    :id="`checkbox_${windex}_${wModuleIndex}_${wRoleIndex}`"
                                    v-model="
                                      form.allowedWorkspace[windex].modules[
                                        wModuleIndex
                                      ].role
                                    "
                                    :name="`checkbox_${windex}_${wModuleIndex}_${wRoleIndex}`"
                                    type="radio"
                                    :value="wpRole.role_id"
                                    :true-value="wpRole.role_id"
                                    data-lpignore="true"
                                    :disabled="
                                      wpRole.name === 'Client' &&
                                      userExists &&
                                      !is_client
                                    "
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
                                <strong>Select Client</strong>
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
                  <a
                    href="javascript:void(0);"
                    class="btn btn-gray previous"
                    @click.prevent="step3Previous()"
                    >Previous</a
                  >
                  <button
                    v-if="!userExists"
                    type="button"
                    :class="{
                      btn: true,
                      'btn-disable': loading,
                    }"
                    :disabled="loading"
                    @click="submit('add')"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Add User
                  </button>
                  <button
                    v-if="userExists"
                    type="button"
                    :class="{
                      btn: true,
                      'btn-disable': loading,
                    }"
                    :disabled="loading"
                    @click="submit('invite')"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Invite User
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
import $ from 'jquery'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import Select2 from '~/components/plugins/Select2'
import Select2WithImage from '~/components/plugins/Select2WithImage'
export default {
  components: { WorkspaceNote, Select2, Select2WithImage },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'can-access-general-settings'],
  data() {
    return {
      loading: false,
      fetchingUserDetail: false,
      userExists: false,
      display_salary: false,
      form: {
        profile_image: null,
        name: null,
        email: '',
        phone: null,
        title: null,
        allowedWorkspace: [],
        workspace_id: this.$_auth().id,
        internal_workspace_id: this.$route.params.workspace_id
          ? this.$route.params.workspace_id
          : this.$_auth().id,
      },
      roles_permissions: [],
      imageData: null,
      step: 1,
      is_client: false,
      wpSubscription: {},
      wpDamAdminCount: 0,
    }
  },
  computed: {
    canAddMoreDamAdmin() {
      return (wpModule, wp) => {
        const isDam = wpModule.module_name === 'DAM'
        const isAdmin = !!wpModule.admin_authority
        const isValidSubscription = isDam && wpModule.subscription_enable
        const hasAdminQuota = this.hasDamAdminQuota(this.wpSubscription)
        return (
          !isDam || (isDam && isAdmin && isValidSubscription && hasAdminQuota)
        )
      }
    },
    isDam() {
      return (wpModule) => {
        return wpModule.module_name === 'DAM'
      }
    },
    hasDamAdminQuota() {
      return (wpSubscription) => {
        if (!this.wpSubscription?.features?.admin_users?.enable) return false
        const maxAllowedAdmins = wpSubscription?.features?.users?.admin
        if ((maxAllowedAdmins + '').trim().toLowerCase() === 'unlimited')
          return true
        if (
          this.wpDamAdminCount > 0 &&
          this.wpDamAdminCount >= parseInt(maxAllowedAdmins)
        )
          return false
        return true
      }
    },
    isValidDamSubscription() {
      return (wp = {}, wpSubscription = {}) => {
        return (
          wp?.workspace_unique_id &&
          wpSubscription?.workspace_id &&
          wp.workspace_unique_id === wpSubscription.workspace_id
        )
      }
    },
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
  watch: {
    '$route.params.workspace_id': {
      handler(n) {
        this.fetchWorkspaceSubscription(n)
        this.fetchDamAdminCount(n)
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    try {
      const { data } = await this.$axios.$get(
        `/user/roles-permissions?workspace_id=${this.form.internal_workspace_id}`
      )
      this.roles_permissions = data.roles_permission.filter((wp) => {
        // wp.module_role = [...wp.module_role.filter((e) => e.module_id === 2)]
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
            })
          } else {
            modulesData.push({ module_id: 0, role: 0 })
          }
        })
        this.form.allowedWorkspace.push({
          workspace_id: 0,
          capacity_hour: null,
          salary: null,
          modules: modulesData,
        })
      })
    } catch (e) {
      const { data } = e.response
      this.loading = false
      this.$toast.error(data.message)
    }
  },
  methods: {
    fetchDamAdminCount(n) {
      if (!n) return
      this.$axios
        .$get('user/dam-admin-count', {
          params: {
            url_workspace_id: n,
          },
        })
        .then((r) => {
          this.wpDamAdminCount = r.data.dam_admin_count
        })
        .catch((_) => {})
    },
    fetchWorkspaceSubscription(wp) {
      if (!wp) {
        this.wpSubscription = {}
        return
      }
      this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.wpSubscription = data))
        .catch((_) => {})
    },
    checkUserExists() {
      if (this.form.email !== '' && !this.$v.form.email.$error) {
        this.fetchingUserDetail = true
        this.$axios
          .$post('user/check-email', {
            workspace_id: this.form.internal_workspace_id,
            email: this.form.email,
          })
          .then((res) => {
            this.is_client = res.is_client
            if (this.is_client === true) {
              this.$toast.error(res.message)
            } else {
              this.userExists = res.status
              this.step++
            }
            this.fetchingUserDetail = false
          })
          .catch((e) => {
            this.$toast.error(this.$getErrorMessage(e))
            this.fetchingUserDetail = false
          })
      }
    },
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
      if (wp.module_id === 1) {
        if (
          wpRole.name === 'Super Admin' ||
          wpRole.name === 'Admin' ||
          wpRole.name === 'User'
        ) {
          for (let i = 0; i < this.form.allowedWorkspace.length; i++) {
            if (
              (this.form.allowedWorkspace[i].workspace_id !== '' ||
                this.form.allowedWorkspace[i].workspace_id !== '0') &&
              windex !== i
            ) {
              for (
                let j = 0;
                j < this.form.allowedWorkspace[i].modules.length;
                j++
              ) {
                if (
                  this.form.allowedWorkspace[i].modules[j].isClientDepartment
                ) {
                  this.form.allowedWorkspace[i].modules[j].role = 0
                  $('#clientSection_' + i + '_' + j).css('display', 'none')
                  $('#depSection_' + i + '_' + j).css('display', 'none')
                  this.form.allowedWorkspace[i].modules[j].client_id = 0
                  this.form.allowedWorkspace[i].modules[j].departments = 0
                  this.form.allowedWorkspace[i].modules[
                    j
                  ].isClientDepartment = false
                  document.getElementById('role_' + i + '_' + j).innerHTML =
                    'Must Select Role'
                }
              }
            }
          }
          $('#clientSection_' + windex + '_' + wModuleIndex).css(
            'display',
            'none'
          )
          $('#depSection_' + windex + '_' + wModuleIndex).css(
            'display',
            'block'
          )
          this.form.allowedWorkspace[windex].modules[wModuleIndex].client_id = 0
          this.form.allowedWorkspace[windex].modules[
            wModuleIndex
          ].departments = 0
          this.form.allowedWorkspace[windex].modules[
            wModuleIndex
          ].isClientDepartment = false
          document.getElementById(
            'dep_' + windex + '_' + wModuleIndex
          ).innerHTML = 'Must Select Work Type'
        }
        if (wpRole.name === 'Client') {
          for (let i = 0; i < this.form.allowedWorkspace.length; i++) {
            if (
              (this.form.allowedWorkspace[i].workspace_id !== '' ||
                this.form.allowedWorkspace[i].workspace_id !== '0') &&
              windex !== i
            ) {
              for (
                let j = 0;
                j < this.form.allowedWorkspace[i].modules.length;
                j++
              ) {
                this.form.allowedWorkspace[i].modules[j].role = 0
                $('#clientSection_' + i + '_' + j).css('display', 'none')
                $('#depSection_' + i + '_' + j).css('display', 'none')
                this.form.allowedWorkspace[i].modules[j].client_id = 0
                this.form.allowedWorkspace[i].modules[j].departments = 0
                this.form.allowedWorkspace[i].modules[
                  j
                ].isClientDepartment = false
                document.getElementById('role_' + i + '_' + j).innerHTML =
                  'Must Select Role'
              }
            }
          }
          $('#clientSection_' + windex + '_' + wModuleIndex).css(
            'display',
            'block'
          )
          let clientDepartmentId = 0
          // eslint-disable-next-line array-callback-return
          wp.department.find((dep, i) => {
            if (dep.client_only === '1') {
              clientDepartmentId = dep.id
            }
          })
          $('#depSection_' + windex + '_' + wModuleIndex).css(
            'display',
            'block'
          )
          this.form.allowedWorkspace[windex].modules[wModuleIndex].departments =
            clientDepartmentId

          this.form.allowedWorkspace[windex].modules[
            wModuleIndex
          ].isClientDepartment = true
          document.getElementById(
            'dep_' + windex + '_' + wModuleIndex
          ).innerHTML = ''
          document.getElementById(
            'client_' + windex + '_' + wModuleIndex
          ).innerHTML = 'Must Select Client'
        }
      }
    },
    departmentChecked(data, windex, wModuleIndex) {
      document.getElementById('dep_' + windex + '_' + wModuleIndex).innerHTML =
        ''
    },
    clientChangeHandler(data, windex, wModuleIndex) {
      this.form.allowedWorkspace[windex].modules[wModuleIndex].client_id =
        data.id
      if (parseInt(data.id) !== 0) {
        document.getElementById(
          'client_' + windex + '_' + wModuleIndex
        ).innerHTML = ''
      } else {
        document.getElementById(
          'client_' + windex + '_' + wModuleIndex
        ).innerHTML = 'Must Select Client'
      }
    },
    step1Next() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.checkUserExists()
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
    async submit(type) {
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('profile_image', this.form.profile_image)
        formData.append('name', this.form.name)
        formData.append('email', this.form.email)
        formData.append('phone', this.form.phone)
        formData.append('title', this.form.title)
        formData.append(
          'allowedWorkspace',
          JSON.stringify(this.form.allowedWorkspace)
        )
        formData.append('workspace_id', this.form.internal_workspace_id)
        if (type === 'add') {
          const { message } = await this.$axios.$post(
            'user/add-new-user',
            formData
          )
          this.$toast.global.success(message)
        }
        if (type === 'invite') {
          await this.$axios.$post('user/invite-user', formData)
          this.$toast.global.success('User invited successfully')
        }

        this.$router.push({
          name: 'workspace_id-workspace-settings-user-list',
          params: { workspace_id: this.form.internal_workspace_id },
        })
      } catch (e) {
        const { data } = e.response
        this.loading = false
        this.$toast.error(data.message)
      }
    },
    profileChange(event) {
      const twoMb = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMb) {
          this.form.profile_image = event.target.files[0]
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
  validations() {
    if (this.userExists) {
      return {
        form: {
          name: { required },
          email: { required, email },
          phone: { maxLength: maxLength(20) },
          title: {},
        },
      }
    }
    if (!this.userExists) {
      return {
        form: {
          name: { required },
          email: { required, email },
          phone: { maxLength: maxLength(20) },
          title: {},
        },
      }
    }
  },
}
</script>

<style scoped></style>
