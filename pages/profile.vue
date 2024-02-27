<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <div class="general-settings-right w-100 h-100">
        <div class="general-settings-title email-system-title">
          <ul class="general-settings-tab">
            <li class="active">
              <a href="javascript:void(0);">Profile Setting</a>
            </li>
            <li>
              <nuxt-link
                :to="{
                  name: 'notification-settings-workspace_id-module_id-type',
                  params: {
                    workspace_id: $auth.user.default_workspace_id,
                    module_id: defaultWorkspaceModule,
                    type: 'email',
                  },
                }"
                >Notification Setting</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="workspace-settings profile-setting">
          <div class="row no-gutters h-100">
            <div class="col-lg-7 col-md-12 h-100">
              <div class="workspace-setting-left">
                <div class="general-settings-box customscrollbar pr10">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <div class="img-upload imgwidth-input">
                          <div class="img-upload-img">
                            <span v-if="!logo_preview && !imageData">
                              {{ ifNotImageChar }}
                            </span>
                            <div v-if="imageData != null" class="v-center">
                              <img v-if="imageData != null" :src="imageData" />
                            </div>
                            <div v-if="logo_preview != null" class="v-center">
                              <img
                                v-if="logo_preview != null"
                                :src="logo_preview"
                              />
                            </div>
                          </div>
                          <div class="img-upload-alt">
                            <span>Profile Picture</span>
                            <small class="upload-note"
                              >Upload square picture for best viewing
                              experience</small
                            >
                            <div class="file-select">
                              <div class="file-select-name">
                                Update Profile Picture
                              </div>
                              <div class="file-field-box">
                                <input
                                  id="resume"
                                  type="file"
                                  name="resume"
                                  class
                                  accept=".jpg, .jpeg, .png"
                                  required
                                  data-lpignore="true"
                                  @change="changeProfile"
                                />
                              </div>
                            </div>
                            <span class="last-login"
                              >Last Login:
                              {{
                                (last_login &&
                                  $moment(last_login).format(
                                    `MMM Do 'YY, h:mm a`
                                  )) ||
                                '-'
                              }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group w-75">
                        <label class="control-label">Title</label>
                        <input
                          v-model="title"
                          type="text"
                          class="form-control"
                          data-lpignore="true"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group required w-75">
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
                          Full name is required
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label">Email</label>
                        <span class="input-control">
                          {{ email ? email : '&nbsp;' }}
                        </span>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group w-50">
                        <label class="control-label">Phone</label>
                        <input
                          v-model="phone"
                          type="text"
                          class="form-control"
                          data-lpignore="true"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <div
                        v-for="(wp, index) in userPermissions"
                        :key="index"
                        :class="{
                          'workspace-access-box profile-access-box': true,
                          selected: default_workspace == wp.id,
                        }"
                      >
                        <div class="workspace-access-title">
                          <label
                            class="radio-label"
                            @click="
                              defaultWorkspaceChanged(wp.id, wp.department_id)
                            "
                            >{{ wp.text }}
                            <strong>{{
                              default_workspace == wp.id
                                ? `(Primary Workspace)`
                                : ''
                            }}</strong>
                            <input
                              type="radio"
                              name="profileWorkspace"
                              :checked="default_workspace == wp.id"
                            />
                            <span class="radio-span"></span>
                          </label>
                        </div>
                        <div class="workspace-access-body">
                          <div
                            v-if="wp.user.hasProjectAccess"
                            class="workspace-box"
                          >
                            <div class="row xs-gutters">
                              <div class="col-lg-6">
                                <div class="form-group">
                                  <label class="control-label">Module</label>
                                  <div class="module-name">Projects</div>
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <div class="form-group">
                                  <label class="control-label">Role</label>
                                  <div class="role-name">
                                    {{ slugToString(wp.user.project.role) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <label class="control-label"
                                >Select Work Type
                              </label>
                              <Select2
                                v-model="wp.department_id"
                                :options="getDepartmentsByWorkspaceId(wp.id)"
                                placeholder="Select Work Type"
                                custom-event
                                :disabled="
                                  wp.client_only == 1 ||
                                  (wp.user.project.role !== 'admin' &&
                                    wp.user.project.role !== 'super-admin')
                                "
                                @changeSelect2="departmentChanged(...arguments)"
                              />
                            </div>
                            <div
                              v-if="wp.user.project.role == 'client'"
                              class="form-group"
                            >
                              <label class="control-label"
                                >Select Client
                              </label>
                              <div class="owner-dropdown owner-multiple">
                                <Select2Multiple
                                  v-model="wp.client_ids"
                                  :dropdown-css-class="'owner-select'"
                                  :options="getClientsByWorkspaceId(wp.id)"
                                  placeholder="Add Your Client"
                                  :custom-event="true"
                                  :disabled="true"
                                >
                                </Select2Multiple>
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="wp.user.hasDamAccess"
                            class="workspace-box"
                          >
                            <div class="row xs-gutters">
                              <div class="col-lg-6">
                                <div class="form-group">
                                  <label class="control-label">Module</label>
                                  <div class="module-name">
                                    Digital Asset Management
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <div class="form-group">
                                  <label class="control-label">Role</label>
                                  <div class="role-name">
                                    {{ slugToString(wp.user.dam.role) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="wp.user.hasLeadAccess"
                            class="workspace-box"
                          >
                            <div class="row xs-gutters">
                              <div class="col-lg-6">
                                <div class="form-group">
                                  <label class="control-label">Module</label>
                                  <div class="module-name">Lead Management</div>
                                </div>
                              </div>
                              <div class="col-lg-6">
                                <div class="form-group">
                                  <label class="control-label">Role</label>
                                  <div class="role-name">
                                    {{ slugToString(wp.user.lead.role) }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="$_auth().user.hasGeneralSettingsAccess"
                      class="col-sm-12"
                    >
                      <div class="form-group w-75">
                        <label class="control-label">Time Zone</label>
                        <Select2
                          v-model="timezone"
                          name="timezone"
                          :class="'select'"
                          placeholder="Select TimeZone"
                        >
                          <optgroup
                            v-for="(group, name) in timeZoneData"
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
                    <div v-if="0" class="col-sm-12">
                      <div class="form-group">
                        <label class="check-label"
                          >Get notifications for project updates
                          <input
                            v-model="enable_notification"
                            name="checkbox"
                            class="notification"
                            type="checkbox"
                            true-value="1"
                            false-value="0"
                            data-lpignore="true"
                          />

                          <span class="check-span"></span>
                        </label>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <button
                        type="button"
                        :class="{
                          btn: true,
                          'btn-disable': loading,
                        }"
                        :disabled="loading"
                        @click="submit"
                      >
                        <i
                          v-if="loading"
                          class="fa fa-circle-o-notch fa-spin"
                        ></i>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="workspace-setting-right">
                <div class="general-settings-box customscrollbar">
                  <div
                    v-if="
                      (!$auth.user.social_user &&
                        $auth.user.password_generated) ||
                      ($auth.user.social_user && $auth.user.password_generated)
                    "
                    class="row"
                  >
                    <div class="col-sm-12">
                      <div class="form-group">
                        <h5>Change Password</h5>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group required">
                        <label class="control-label">Old Password</label>
                        <input
                          v-model.lazy="$v.changePasswordForm.old_pass.$model"
                          type="password"
                          name="password"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="
                            $v.changePasswordForm.old_pass.$error &&
                            !$v.changePasswordForm.old_pass.required
                          "
                          class="input-error"
                        >
                          Old password is required
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group required">
                        <label class="control-label">New Password</label>
                        <input
                          v-model="$v.changePasswordForm.password.$model"
                          type="password"
                          name="password"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="
                            $v.changePasswordForm.password.$error &&
                            !$v.changePasswordForm.password.required
                          "
                          class="input-error"
                        >
                          New password is required
                        </div>
                        <div
                          v-if="
                            $v.changePasswordForm.password.$error &&
                            !$v.changePasswordForm.password.minLength
                          "
                          class="input-error"
                        >
                          Password must be at least 6 characters
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group required">
                        <label class="control-label">Confirm Password</label>
                        <input
                          v-model="
                            $v.changePasswordForm.confirm_password.$model
                          "
                          type="password"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div class="input-error">
                          <div
                            v-if="
                              $v.changePasswordForm.confirm_password.$error &&
                              !$v.changePasswordForm.confirm_password.required
                            "
                          >
                            Confirm Password is required
                          </div>
                          <div
                            v-else-if="
                              $v.changePasswordForm.confirm_password.$error &&
                              !$v.changePasswordForm.confirm_password
                                .sameAsPassword
                            "
                          >
                            Passwords must be identical.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <button
                        type="submit"
                        :class="{
                          btn: true,
                          'btn-disable': password_loading,
                        }"
                        :disabled="password_loading"
                        @click="changeUserPassword"
                      >
                        <i
                          v-if="password_loading"
                          class="fa fa-circle-o-notch fa-spin"
                        ></i>

                        Save
                      </button>
                    </div>
                  </div>
                  <div
                    v-if="
                      $auth.user.social_user && !$auth.user.password_generated
                    "
                    class="row"
                  >
                    <div class="col-sm-12">
                      <div class="form-group">
                        <h5>Generate Password</h5>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group required w-75">
                        <label class="control-label">Password</label>
                        <input
                          v-model.lazy="$v.generatePasswordForm.password.$model"
                          type="password"
                          name="password"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="
                            $v.generatePasswordForm.password.$error &&
                            !$v.generatePasswordForm.password.required
                          "
                          class="input-error"
                        >
                          Password is required
                        </div>
                        <div
                          v-if="
                            $v.generatePasswordForm.password.$error &&
                            !$v.generatePasswordForm.password.minLength
                          "
                          class="input-error"
                        >
                          Password must be at least 6 characters
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group required w-75">
                        <label class="control-label">Confirm Password</label>
                        <input
                          v-model.lazy="
                            $v.generatePasswordForm.password_confirmation.$model
                          "
                          type="password"
                          class="form-control"
                          data-lpignore="true"
                        />
                        <div
                          v-if="
                            $v.generatePasswordForm.password_confirmation
                              .$error &&
                            !$v.generatePasswordForm.password_confirmation
                              .required
                          "
                          class="input-error"
                        >
                          Confirm Password is required
                        </div>
                        <div
                          v-else-if="
                            $v.generatePasswordForm.password_confirmation
                              .$error &&
                            !$v.generatePasswordForm.password_confirmation
                              .sameAsPassword
                          "
                          class="input-error"
                        >
                          Password must match with Confirm Password
                        </div>
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <button
                        type="submit"
                        :class="{
                          btn: true,
                          'btn-disable': password_loading,
                        }"
                        :disabled="password_loading"
                        @click="generateUserPassword"
                      >
                        <i
                          v-if="password_loading"
                          class="fa fa-circle-o-notch fa-spin"
                        ></i>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!IS_SUPPORT_PLATFORM" class="col-lg-5 col-md-12 h-100">
              <div class="workspace-setting-right w-100 pl10">
                <div class="general-settings-box customscrollbar">
                  <div v-if="!profileDataLoaded" style="text-align: center">
                    <svg
                      id="Layer_1"
                      class="refresh-icon fa-spin"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4491" transform="translate(-1206 -466)">
                        <rect
                          id="Rectangle_3030"
                          x="1206"
                          y="466"
                          class="fill-white"
                          width="18"
                          height="18"
                        ></rect>
                        <g
                          id="Icon_feather-refresh-cw"
                          transform="translate(-369.921 -994.994)"
                        >
                          <g id="Path_3566">
                            <path
                              id="Path_3569"
                              class="fill-color"
                              d="M1593.2,1469.2h-4.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h3.8v-3.8c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v4.5C1593.9,1468.9,1593.6,1469.2,1593.2,1469.2z"
                            ></path>
                          </g>
                          <g id="Path_3567">
                            <path
                              id="Path_3570"
                              class="fill-color"
                              d="M1576.7,1476.7c-0.4,0-0.7-0.3-0.7-0.7v-4.5c0-0.4,0.3-0.7,0.7-0.7h4.5c0.4,0,0.7,0.3,0.7,0.7s-0.3,0.7-0.7,0.7h-3.8v3.8C1577.4,1476.4,1577.1,1476.7,1576.7,1476.7z"
                            ></path>
                          </g>
                          <g id="Path_3568">
                            <path
                              id="Path_3571"
                              class="fill-color"
                              d="M1584.9,1477.5c-2,0-3.9-0.8-5.3-2.2l-3.5-3.3c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0l3.5,3.3c2.3,2.4,6.2,2.4,8.5,0c0.6-0.6,1.1-1.4,1.4-2.3c0.1-0.4,0.5-0.6,0.9-0.5c0.4,0.1,0.6,0.5,0.5,0.9c0,0,0,0,0,0C1590.9,1475.5,1588.1,1477.5,1584.9,1477.5L1584.9,1477.5z M1593.2,1469.2c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.3c-2.3-2.4-6.2-2.4-8.5,0c-0.6,0.6-1.1,1.4-1.4,2.3c-0.1,0.4-0.6,0.6-0.9,0.4c-0.4-0.1-0.6-0.5-0.4-0.9c1.4-3.9,5.7-5.9,9.6-4.6c1.1,0.4,2,1,2.8,1.8l3.5,3.3c0.3,0.3,0.3,0.7,0,1C1593.6,1469.1,1593.4,1469.2,1593.2,1469.2L1593.2,1469.2z"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <i>&nbsp;Loading...</i>
                  </div>
                  <div v-else class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <h5>Help & Support</h5>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <div
                          :class="[
                            'd-flex',
                            'align-items-center',
                            supportPin ? 'show' : '',
                          ]"
                        >
                          <label class="control-label mb0 mr1"
                            >Generate PIN
                          </label>
                          <button
                            :disabled="gpLoading"
                            class="btn pin-generate-btn"
                            @click="generateAndSaveSupportPin"
                          >
                            {{ gpLoading ? 'Generating...' : 'Generate' }}
                          </button>
                          <div
                            class="pin-generate-box"
                            @click="copySupportLoginPin(supportPin)"
                          >
                            {{ supportPin }}
                          </div>
                          <button
                            v-if="supportPin && !supportSessionsData.length"
                            class="btn btn-danger pin-remove-btn"
                            :disabled="rpLoading"
                            @click="removePin"
                          >
                            {{ rpLoading ? 'Removing..' : 'Remove PIN' }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <hr />
                      <div class="form-group">
                        <div
                          class="d-flex align-items-center justify-content-between"
                        >
                          <h5 class="mb0">
                            Active support sessions
                            <a
                              v-tooltip="'Refresh'"
                              class="ml-2"
                              @click="userProfile()"
                            >
                              <svg
                                id="Layer_1"
                                style="max-height: 16px"
                                class="refresh-icon"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                xml:space="preserve"
                              >
                                <g
                                  id="Group_4491"
                                  transform="translate(-1206 -466)"
                                >
                                  <rect
                                    id="Rectangle_3030"
                                    x="1206"
                                    y="466"
                                    class="fill-white"
                                    width="18"
                                    height="18"
                                  ></rect>
                                  <g
                                    id="Icon_feather-refresh-cw"
                                    transform="translate(-369.921 -994.994)"
                                  >
                                    <g id="Path_3566">
                                      <path
                                        id="Path_3569"
                                        class="fill-color"
                                        d="M1593.2,1469.2h-4.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h3.8v-3.8c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v4.5C1593.9,1468.9,1593.6,1469.2,1593.2,1469.2z"
                                      ></path>
                                    </g>
                                    <g id="Path_3567">
                                      <path
                                        id="Path_3570"
                                        class="fill-color"
                                        d="M1576.7,1476.7c-0.4,0-0.7-0.3-0.7-0.7v-4.5c0-0.4,0.3-0.7,0.7-0.7h4.5c0.4,0,0.7,0.3,0.7,0.7s-0.3,0.7-0.7,0.7h-3.8v3.8C1577.4,1476.4,1577.1,1476.7,1576.7,1476.7z"
                                      ></path>
                                    </g>
                                    <g id="Path_3568">
                                      <path
                                        id="Path_3571"
                                        class="fill-color"
                                        d="M1584.9,1477.5c-2,0-3.9-0.8-5.3-2.2l-3.5-3.3c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0l3.5,3.3c2.3,2.4,6.2,2.4,8.5,0c0.6-0.6,1.1-1.4,1.4-2.3c0.1-0.4,0.5-0.6,0.9-0.5c0.4,0.1,0.6,0.5,0.5,0.9c0,0,0,0,0,0C1590.9,1475.5,1588.1,1477.5,1584.9,1477.5L1584.9,1477.5z M1593.2,1469.2c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.3c-2.3-2.4-6.2-2.4-8.5,0c-0.6,0.6-1.1,1.4-1.4,2.3c-0.1,0.4-0.6,0.6-0.9,0.4c-0.4-0.1-0.6-0.5-0.4-0.9c1.4-3.9,5.7-5.9,9.6-4.6c1.1,0.4,2,1,2.8,1.8l3.5,3.3c0.3,0.3,0.3,0.7,0,1C1593.6,1469.1,1593.4,1469.2,1593.2,1469.2L1593.2,1469.2z"
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </a>
                          </h5>
                          <a
                            v-if="supportSessionsData.length"
                            href="javascript:void(0);"
                            class="link"
                            :class="{ 'pointer-none': tasLoading }"
                            @click="terminateAllSupportSessions"
                            >Terminate All</a
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div v-if="supportSessionsData.length" class="form-group">
                        <div
                          v-for="(session, index) in supportSessionsData"
                          :key="index"
                          class="box session-login-info"
                          :class="{ mt10: index }"
                        >
                          <div class="browser-icon">
                            <div class="icon-box">
                              <ComputerIcon />
                            </div>
                          </div>
                          <div class="browser-login-info">
                            <strong>{{
                              session.system_data.agent
                                ? session.system_data.agent.platform
                                : ''
                            }}</strong>
                            <span>Login: {{ session.login_at }} </span>
                            <span v-if="session.system_data.agent != null"
                              >{{
                                session.system_data.location
                                  ? `${session.system_data.location.city},
                                ${session.system_data.location.state},
                                ${session.system_data.location.country_code} -
                                ${session.system_data.agent.browser} -
                                IP:${session.system_data.location.IPv4}`
                                  : ''
                              }}
                            </span>
                            <span v-else
                              >{{
                                session.system_data.location
                                  ? `${session.system_data.location.city},
                                ${session.system_data.location.state},
                                ${session.system_data.location.country_code} -
                                IP:${session.system_data.location.IPv4}`
                                  : ''
                              }}
                            </span>
                          </div>
                          <div
                            v-if="session.is_active"
                            class="browser-seassion"
                          >
                            <RightIcon />
                            <span>Active Session</span>
                          </div>
                          <div class="browser-btns">
                            <button
                              class="btn btn-danger"
                              :disabled="tsLoading"
                              @click="terminateSupportSession(session)"
                            >
                              Terminate Session
                            </button>
                          </div>
                        </div>
                      </div>
                      <div v-else class="no-seassion">
                        <img src="~/assets/img/no-session.svg" alt="" />
                        <p>You have no any support session available.</p>
                      </div>
                    </div>
                  </div>
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
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { find } from 'lodash'
import Select2 from '~/components/plugins/Select2'
import Select2Multiple from '~/components/plugins/Select2Multiple'

export default {
  components: {
    Select2,
    Select2Multiple,
  },
  layout: 'projectLayout',
  middleware: ['authCheck'],
  data() {
    return {
      workspace_id: this.$_auth().id,
      user_id: this.$auth.user.id ? this.$auth.user.id : null,
      loading: false,
      password_loading: false,
      profileDataLoaded: null,
      title: null,
      form: {
        name: null,
      },
      email: null,
      phone: null,
      timezone: null,
      default_workspace: null,
      logo_preview: null,
      timer: null,
      last_login: null,
      profile_image: null,
      imageData: null,
      ifNotImageChar: '',
      timeZoneData: [],
      allDepartments: [],
      default_department: 0,
      capacity_hour: 0,
      enable_notification: 0,
      changePasswordForm: {
        old_pass: null,
        password: null,
        confirm_password: null,
      },
      generatePasswordForm: {
        password: null,
        password_confirmation: null,
      },
      workspaceDepartments: [],
      workspaceClients: [],

      // support functionality related data vars
      supportPin: null,
      gpLoading: false, // generate pin loading
      rpLoading: false, // remove pin loading
      supportSessionsData: [],
      tsLoading: false, // terminate session loading
      tasLoading: false, // terminate all session loading
    }
  },
  computed: {
    userPermissions() {
      return this.$allowedWorkspaces('id', false).profile.list
    },

    defaultWorkspaceModule() {
      const defaultWorkspace = this.$auth.user.default_workspace_id
      const defaultWorkspaceModules = this.$auth.user.accessibleWorkspaces
        .find(({ id }) => parseInt(id) === parseInt(defaultWorkspace))
        .module.map(({ module_id }) => module_id)
      return defaultWorkspaceModules[0]
    },
    IS_SUPPORT_PLATFORM() {
      return process.env.IS_SUPPORT_PLATFORM
    },
  },
  async mounted() {
    this.loadJS()
    try {
      const { data } = await this.$axios.$get('all-time-zone')
      this.timeZoneData = data
    } catch (e) {
      const { data } = e.response
      this.loading = false
      this.$toast.error(data.message)
    }
    await this.userProfile()
  },

  methods: {
    loadJS() {
      window.$(function () {
        window
          .$('.profile-access-box .workspace-access-title input')
          .on('click', function () {
            if (window.$(this).prop('checked')) {
              window.$('.profile-access-box').removeClass('selected')
              window.$(this).parents('.profile-access-box').addClass('selected')
            }
          })
      })
    },
    async userProfile() {
      try {
        const { data } = await this.$axios.$get(
          `/user/view-profile?workspace_id=${this.workspace_id}`
        )
        this.user_id = data.id
        this.default_workspace = data.default_workspace
        this.title = data.title
        this.form.name = data.name
        this.ifNotImageChar = data.name.charAt(0).toUpperCase()
        this.email = data.email
        this.phone = data.phone
        this.last_login = data.last_login
        this.timezone = data.timezone
        this.allDepartments = data.all_department
        this.default_department = data.departments
        this.logo_preview = data.display_profile_image
        this.capacity_hour = data.capacity_hour
        this.enable_notification = data.enable_notification
        this.workspaceDepartments = data.workspace_department
        this.workspaceClients = data.workspace_department
        this.supportPin = data.support_pin
        this.supportSessionsData = data.support_session_data
        this.profileDataLoaded = true
      } catch (e) {
        const { data } = e.response
        this.loading = false
        this.$toast.error(data.message)
      }
    },
    slugToString(slug) {
      if (slug) {
        const roles = {
          'super-admin': 'Super Admin',
          admin: 'Admin',
          user: 'User',
          client: 'Client',
          rsm: 'RSM',
          'dealer-admin': 'Dealer Admin',
          'dealer-group-admin': 'Dealer Group Admin',
          'sales-person': 'Sales Person',
        }
        return roles[slug]
      }
    },
    getDepartmentsByWorkspaceId(id) {
      const data = find(this.workspaceDepartments, { workspace_unique_id: id })
      if (!data) return []
      return data.department
    },
    getClientsByWorkspaceId(id) {
      const data = find(this.workspaceClients, { workspace_unique_id: id })
      if (!data) return []
      return data.client_data
    },
    departmentChanged(data) {
      this.default_department = data.id
    },
    defaultWorkspaceChanged(workspaceId, departmentId) {
      this.default_workspace = workspaceId
      this.default_department = departmentId
    },
    isNumber(evt) {
      evt = evt || window.event
      const charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    async submit(e) {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return
      }
      try {
        this.loading = true
        const data = await this.$axios.$post('/user/update-profile', {
          user_id: this.user_id,
          name: this.form.name,
          phone: this.phone,
          email: this.email,
          title: this.title,
          timezone: this.timezone,
          default_workspace: this.default_workspace,
          default_department: this.default_department,
        })
        this.loading = false

        this.$toast.global.success(data.message)
        await this.$auth.fetchUser()
      } catch (e) {
        const { data } = e.response
        this.loading = false
        this.$toast.error(data.message)
      }
    },
    async changeProfile(event) {
      // const test_size = 1024
      const twoMB = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMB) {
          this.profile_image = event.target.files[0]
          this.logo_preview = null
          const input = event.target

          if (input.files && input.files[0]) {
            const reader = new FileReader()

            reader.onload = (e) => {
              this.imageData = e.target.result
            }

            reader.readAsDataURL(input.files[0])
          }
          try {
            const formData = new FormData()
            formData.append('profile_image', this.profile_image)
            formData.append('user_id', this.user_id)
            const data = await this.$axios.$post(
              '/user/change-profile-image',
              formData
            )
            this.$auth.fetchUser()
            this.$toast.global.success(data.message)
          } catch (e) {
            const { data } = e.response
            this.$toast.error(data.message)
          }
        } else {
          event.target.value = null
          this.$toast.error('File size should not be more than 2MB')
        }
      }
    },

    async changeUserPassword(e) {
      this.$v.changePasswordForm.$touch()
      if (this.$v.changePasswordForm.$invalid) {
        return
      }
      try {
        this.password_loading = true
        const data = await this.$axios.$post('/user/auth-change-password', {
          old_password: this.changePasswordForm.old_pass,
          password: this.changePasswordForm.password,
          confirm_password: this.changePasswordForm.confirm_password,
        })
        this.changePasswordForm.old_pass = ''
        this.changePasswordForm.password = ''
        this.changePasswordForm.confirm_password = ''
        this.password_loading = false
        this.$toast.global.success(data.message)
        this.$nextTick(() => {
          this.$v.$reset()
        })
      } catch (e) {
        const { data } = e.response
        this.password_loading = false
        this.$toast.error(data.message)
      }
    },
    async generateUserPassword() {
      this.$v.generatePasswordForm.$touch()
      if (this.$v.generatePasswordForm.$invalid) {
        return
      }
      try {
        this.password_loading = true
        const data = await this.$axios.$post(
          '/user/generate-social-user-password',
          this.generatePasswordForm
        )
        this.generatePasswordForm.password = ''
        this.generatePasswordForm.password_confirmation = ''
        this.$auth.fetchUser()
        this.password_loading = false
        this.$toast.global.success(data.message)
        this.$nextTick(() => {
          this.$v.$reset()
        })
      } catch (e) {
        const { data } = e.response
        this.password_loading = false
        this.$toast.error(data.message)
      }
    },
    async generateAndSaveSupportPin() {
      this.gpLoading = true
      try {
        const supportPin = Math.random().toString(36).substr(2, 6).toUpperCase()
        await this.$axios.$post(`user/save-pin`, {
          support_pin: supportPin,
        })
        this.supportPin = supportPin
        this.gpLoading = false
      } catch (e) {
        this.gpLoading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async terminateSupportSession(session) {
      const { id } = session
      try {
        this.tsLoading = true
        await this.$axios.$post(`terminate-token`, {
          support_id: id,
        })
        this.tsLoading = false
        this.supportSessionsData = this.supportSessionsData.filter(
          (data) => parseInt(data.id) !== parseInt(id)
        )
        !this.supportSessionsData.length && (this.supportPin = null)
      } catch (e) {
        this.tsLoading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async terminateAllSupportSessions() {
      try {
        this.tsLoading = true
        this.tasLoading = true
        await this.$axios.$post(`terminate-all-token`)
        this.tasLoading = false
        this.tsLoading = false
        this.supportSessionsData = []
        this.supportPin = null
      } catch (e) {
        this.tasLoading = false
        this.tsLoading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async removePin() {
      this.rpLoading = true
      await this.userProfile()
      if (!this.supportSessionsData.length) {
        try {
          await this.$axios.$get(`user/remove-pin`)
          this.supportPin = null
          this.rpLoading = false
        } catch (e) {
          this.rpLoading = false
          this.$toast.error(this.$getErrorMessage(e))
        }
      } else {
        this.rpLoading = false
      }
    },
    copySupportLoginPin(supportPin) {
      const el = document.createElement('textarea')
      el.innerHTML = supportPin
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.$toast.global.success('PIN copied successfully')
    },
  },
  validations: {
    form: {
      name: { required },
    },
    changePasswordForm: {
      old_pass: { required },
      password: { required, minLength: minLength(6) },
      confirm_password: { required, sameAsPassword: sameAs('password') },
    },

    generatePasswordForm: {
      password: { required, minLength: minLength(6) },
      password_confirmation: { required, sameAsPassword: sameAs('password') },
    },
  },
}
</script>

<style scoped>
.pointer-none {
  pointer-events: none;
}
</style>
