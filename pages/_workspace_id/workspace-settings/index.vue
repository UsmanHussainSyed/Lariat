<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>General Settings</h4>
    </div>
    <div class="workspace-settings">
      <div class="row no-gutters h-100">
        <div class="col-lg-10 col-md-12 h-100">
          <div class="workspace-setting-left">
            <div class="general-settings-box customscrollbar pr10">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <div class="img-upload imgwidth-input">
                      <div class="img-upload-img">
                        <div
                          v-if="!imageData && !logo_preview"
                          class="v-center"
                        >
                          <img
                            src="~/assets/img/icon/building.svg"
                            class="favicon"
                          />
                        </div>

                        <div v-if="imageData != null" class="v-center">
                          <img v-if="imageData != null" :src="imageData" />
                        </div>
                        <div v-if="logo_preview" class="v-center">
                          <img :src="logo_preview" />
                        </div>
                      </div>
                      <div class="img-upload-alt">
                        <span>Company Logo</span>
                        <!--                        <small class="upload-note"
                          >Preferred resolution required is 540 x 64.
                        </small>-->
                        <div class="file-select">
                          <div
                            class="file-select-name"
                            :class="{ 'btn-disable': uploadingLogo }"
                          >
                            Edit
                          </div>

                          <!--                          <div
                            v-else
                            :style="{
                              fontSize: '13px',
                              fontWeight: 500,
                              cursor: 'default',
                            }"
                          >
                            Uploading logo...
                          </div>-->
                          <div class="file-field-box">
                            <input
                              v-if="!uploadingLogo"
                              ref="fileInput"
                              type="file"
                              name="upload"
                              :disabled="uploadingLogo"
                              accept=".jpg, .png, .svg, .gif, .jpeg"
                              data-lpignore="true"
                              @change="changeLogo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <WorkspaceNote />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group favicon-input-box">
                    <label class="control-label"
                      >Brand Favicon (Upload square favicon for best viewing
                      experience)</label
                    >
                    <div class="file-upload big">
                      <div class="file-select">
                        <div id="fileName" class="file-select-button">
                          Browse File
                        </div>
                        <div id="noFile" class="file-select-name">
                          {{
                            faviconName === null
                              ? 'No file chosen...'
                              : faviconName
                          }}
                        </div>
                        <input
                          id="chooseFile"
                          ref="favicon"
                          type="file"
                          name="chooseFile"
                          accept=".jpg, .png, .svg, .gif, .jpeg"
                          @change="onFileChange($event.target.files)"
                        />
                      </div>
                      <div class="file-preview-box">
                        <img
                          v-if="faviconIcon"
                          :src="faviconIcon"
                          alt="Favicon Icon"
                        />
                        <img
                          v-else
                          src="~/assets/img/lariat-icon.svg"
                          alt="Favicon Icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Company Name</label>
                    <span class="input-control">{{ name }}</span>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group required">
                    <label class="control-label">Email Address</label>
                    <span class="input-control">{{ user_email }}</span>
                    <em class="note"
                      >Do you want to change Workspace Owner?
                      <a
                        href="javascript:void(0);"
                        data-toggle="modal"
                        data-target="#workspace-owner"
                        >Click here</a
                      ></em
                    >
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">Phone</label>
                    <input
                      v-model="$v.user_phone.$model"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                    <div
                      v-if="$v.user_phone.$error && !$v.user_phone.maxLength"
                      class="input-error"
                    >
                      Phone must be less than 20 characters
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">Address Line 1</label>
                    <input
                      v-model="address_line_1"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">Address Line 2</label>
                    <input
                      v-model="address_line_2"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">City</label>
                    <input
                      v-model="city"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">Zip</label>
                    <input
                      v-model="$v.zip_code.$model"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                    <div
                      v-if="$v.zip_code.$error && !$v.zip_code.maxLength"
                      class="input-error"
                    >
                      Zip must be less than 20 characters
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">State</label>
                    <input
                      v-model="state"
                      type="text"
                      class="form-control"
                      data-lpignore="true"
                    />
                  </div>
                </div>
                <div class="col-sm-12">
                  <h5>User Settings</h5>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label class="control-label">Salary</label>
                    <label class="label-switch">
                      <input
                        v-model="display_salary"
                        type="checkbox"
                        class="switch switch-onoff"
                        name="salary"
                      />
                      <span class="lable"></span>
                    </label>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div id="untaggedAsset" class="untaggedAccordion mb-4">
                    <div
                      data-toggle="collapse"
                      data-target="#collapseImage"
                      aria-expanded="false"
                      aria-controls="collapseImage"
                      class="collapsed account-toggle"
                    >
                      <h5>
                        <svg
                          id="Layer_1"
                          class="toggle-icon"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 18 18"
                          xml:space="preserve"
                        >
                          <g id="Group_4481" transform="translate(-871 -754)">
                            <rect
                              id="Rectangle_3019"
                              x="871"
                              y="754"
                              class="fill-hide"
                              width="18"
                              height="18"
                            />
                            <path
                              id="Path_3404"
                              class="fill-color"
                              d="M880,768.6c-0.5,0-1-0.2-1.3-0.6l-7.1-7.1c-0.7-0.7-0.7-1.9,0-2.7c0.4-0.3,0.8-0.5,1.3-0.5h14.2c1,0,1.9,0.9,1.9,1.9c0,0.5-0.2,1-0.6,1.3l-7.1,7.1C881,768.4,880.5,768.6,880,768.6L880,768.6z M872.9,759.3c-0.2,0-0.3,0.1-0.3,0.3c0,0.1,0,0.2,0.1,0.2l7.1,7.1c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l7.1-7.1c0.1-0.1,0.1-0.3,0-0.4c0,0,0,0,0,0c0-0.1-0.1-0.1-0.2-0.1L872.9,759.3z"
                            />
                          </g>
                        </svg>
                        Account Recovery
                      </h5>
                    </div>
                    <div
                      id="collapseImage"
                      class="collapse"
                      aria-labelledby="headingImage"
                      data-parent="#untaggedAsset"
                    >
                      <div class="row">
                        <div class="col-sm-12 pt-4">
                          <div class="form-group">
                            <p>
                              We encourage you to add a Recovery Email and/or
                              Recovery Phone Number in the event you are unable
                              to access your account.
                            </p>
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label class="control-label"
                              >Recovery Email Address</label
                            >
                            <input
                              v-model.lazy="$v.recovery_email.$model"
                              type="text"
                              class="form-control"
                              data-lpignore="true"
                            />
                            <div
                              v-if="
                                $v.recovery_email.$error &&
                                !$v.recovery_email.email
                              "
                              class="input-error"
                            >
                              Please provide recovery email
                            </div>
                            <!-- <div
                              v-if="
                                $v.recovery_email.$error && !$v.recovery_email.email
                              "
                              class="input-error"
                            >
                              Please provide valid email.
                            </div> -->
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div class="form-group mb-0">
                            <label class="control-label">Recovery Phone</label>
                            <input
                              v-model.lazy="recovery_phone"
                              type="text"
                              class="form-control"
                              data-lpignore="true"
                            />
                            <!-- <div
                              v-if="
                                $v.recovery_phone.$error && !$v.recovery_phone.required
                              "
                              class="input-error"
                            >
                              Please provide recovery phone
                            </div> -->
                            <div
                              v-if="
                                $v.recovery_phone.$error &&
                                !$v.recovery_phone.maxLength
                              "
                              class="input-error"
                            >
                              Recovery phone must be less than 20 characters
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <button
                    type="submit"
                    :class="{
                      'btn btn-spiner': true,
                      'btn-disable': loading,
                    }"
                    :disabled="loading"
                    @click="submitHandler"
                  >
                    <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="workspace-setting-right">
            <div class="general-settings-box customscrollbar">
              <div
                v-if="isBrandingDisabled"
                class="common-overaly has-relative"
              >
                <div class="common-modal">
                  <div class="common-modal-header">
                    <h5>Upgrade Plan</h5>
                  </div>
                  <div class="common-modal-body text-center">
                    <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
                    
                  </div>
                </div>
              </div>
              <div
                class="row position-relative"
                :class="{ 'common-blur': isBrandingDisabled }"
              >
                <div class="col-sm-12">
                  <div class="form-group">
                    <h5>Workspace Branding &amp; Whitelabeling</h5>
                  </div>
                </div>
                <div
                  v-if="!isBrandingSection"
                  class="col-sm-12"
                  style="text-align: center"
                >
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
                <template v-else>
                  <div class="col-sm-12">
                    <div class="form-group w-50">
                      <label class="control-label">Primary Color</label>
                      <div :class="{ disabledpicker: is_branding_color }">
                        <Colorpicker
                          v-if="isBrandingSection"
                          v-model="themes_option.primaryColor"
                          :is_branding="is_branding_color"
                          :color="themes_option.primaryColor"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group w-50">
                      <label class="control-label">Secondary Color</label>
                      <div :class="{ disabledpicker: is_branding_color }">
                        <Colorpicker
                          v-if="isBrandingSection"
                          v-model="themes_option.secondaryColor"
                          :is_branding="is_branding_color"
                          :color="themes_option.secondaryColor"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label class="check-label pl-4">
                        <input
                          id="WorkspaceBranding"
                          v-model="is_branding"
                          type="checkbox"
                          name="checkbox"
                          @click="restoreBrand()"
                        />
                        <span class="check-span"></span>
                      </label>
                      <span
                        >Restore Default
                        <i
                          v-tooltip="
                            'Use Restore Default to set the default Lariat Marketing Hub branding. Uncheck it to apply custom branding.'
                          "
                          class="fa fa-info-circle"
                          aria-hidden="true"
                        ></i
                      ></span>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <button
                        type="submit"
                        class="btn"
                        :class="{
                          'btn-disabled': brandLoading,
                        }"
                        :disabled="brandLoading"
                        @click="updateWorkspaceBranding()"
                      >
                        <i
                          v-if="brandLoading"
                          class="fa fa-circle-o-notch fa-spin"
                        ></i>

                        Submit
                      </button>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <component :is="`style`" v-html="css"></component>
                    <div v-if="isBrandingSection" class="form-group">
                      <h4 class="mb-2">Sample Preview</h4>
                      <div class="dam-frontend-header-preview">
                        <ul>
                          <li class="active">
                            <a href="javascript:void(0);">Menu 1</a>
                            <ul class="submenu">
                              <li>
                                <a href="javascript:void(0);">Sub menu 1</a>
                              </li>
                              <li>
                                <a href="javascript:void(0);">Sub menu 2</a>
                              </li>
                            </ul>
                          </li>
                          <li><a href="javascript:void(0);">Menu 2</a></li>
                          <li><a href="javascript:void(0);">Menu 3</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  Workspace Owner Modal  -->
    <div id="workspace-owner" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Change Workspace Owner</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancelChangeOwner"
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
          <div class="modal-body">
            <div class="form-group required">
              <label class="control-label">Choose Workspace Owner</label>
              <div class="owner-dropdown">
                <Select2WithImage
                  v-model="workspaceNewOwnerId"
                  :dropdown-css-class="'owner-select'"
                  :options="workspaceSuperUsers"
                  :custom-event="true"
                  @optionChangeHandler="getWorkspaceNewOwnerData(...arguments)"
                />
              </div>
            </div>
            <div class="btn-groups text-center">
              <button
                class="btn"
                :disabled="enableChangeOwnerButton"
                @click="askForConfirmation"
              >
                OK
              </button>
              <button
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                @click="cancelChangeOwner"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  Confirmation Modal  -->
    <div id="confirmation" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
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
              Are you sure you want to change the current Workspace owner
              <strong>{{ user_email }}</strong> to the new Workspace owner
              <strong>{{ workspaceNewOwnerData.email }} </strong>?
            </p>
            <div class="btn-group">
              <button class="btn" @click="confirmChangeWorkspaceOwner">
                Confirm
              </button>
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                >Cancel</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- crop company logo -->
    <div id="crop-logo" class="modal fade">
      <div
        class="modal-dialog xlarge modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              Cropping Company Logo
            </h5>
            <button
              type="button"
              class="close invitation-dismiss"
              data-dismiss="modal"
              aria-label="Close"
              @click="reset"
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
          <div class="modal-body">
            <TransitionExpand>
              <div v-if="imageData" class="input-group prev-img-btn">
                <div
                  ref="editorWrapper"
                  class=""
                  :style="{
                    width: '100%',
                    minHeight: '300px',
                    maxHeight: '300px',
                    position: 'relative',
                    overflow: 'hidden',
                  }"
                >
                  <cropper
                    ref="vueCropper"
                    class="cropper"
                    :src="imageData"
                    style="min-height: 300px; max-height: 300px"
                    :auto-zoom="true"
                    :default-size="defaultSize"
                    image-restriction="none"
                    background-class="cropper-nobg"
                    :canvas="{
                      minHeight: 64,
                      maxHeight: 64,
                    }"
                    :stencil-props="{
                      handlers: {},
                      movable: true,
                      scalable: false,
                      resizable: true,
                    }"
                    :resize-image="{
                      adjustStencil: true,
                    }"
                  />
                </div>
              </div>
            </TransitionExpand>
            <div class="notes pb0 pt-4">
              <p>
                <strong>Note : </strong>Your logo must be fit in given selected
                area.
              </p>
            </div>
          </div>
          <div class="modal-footer justify-content-start">
            <div class="btn-group">
              <button
                class="btn"
                :class="{ 'btn-disable': uploadingLogo }"
                :disabled="uploadingLogo"
                @click="companyLogoUpdate()"
              >
                <SpinLoading v-if="uploadingLogo" />
                {{ uploadingLogo ? 'Saving...' : 'Save' }}
              </button>
              <button
                type="reset"
                class="btn btn-gray"
                :class="{ 'btn-disable': uploadingLogo }"
                :disabled="uploadingLogo"
                @click="reset"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a id="cropLogoDialog" href="javascript:void(0);" style="display: none">
    </a>
  </div>
</template>

<script>
import { TransitionExpand } from 'vue-transition-expand'
import { email, maxLength } from 'vuelidate/lib/validators'
import { Cropper } from 'vue-advanced-cropper'
import $ from 'jquery'
import Select2WithImage from '~/components/plugins/Select2WithImage'
import WorkspaceNote from '~/components/theme/settings/WorkspaceNote'
import Colorpicker from '~/components/plugins/Colorpicker'
import 'vue-advanced-cropper/dist/style.css'
import routeParams from '~/mixins/routeParams'

export default {
  components: {
    Select2WithImage,
    WorkspaceNote,
    Colorpicker,
    TransitionExpand,
    Cropper,
  },
  mixins: [routeParams],
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'can-access-general-settings'],
  data() {
    return {
      workspaceNewOwnerId: 0,
      workspaceNewOwnerData: { id: '0', name: 'Select User', email: '' },
      workspaceSuperUsers: [],
      loading: false,
      user: {},
      name: null,
      user_email: null,
      user_phone: null,
      address_line_1: null,
      address_line_2: null,
      city: null,
      state: null,
      display_salary: false,
      enable_notification: 0,
      zip_code: null,
      recovery_phone: null,
      recovery_email: null,
      workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      logo: null,
      logo_preview: null,
      uploadingLogo: false,
      imageData: null,
      ifNotImageChar: '',
      faviconIcon: null,
      faviconIconStore: null,
      faviconName: null,
      maxSize: 2097152,
      isBrandingSection: false,
      themes_option: {
        primaryColor: '#070E22',
        secondaryColor: '#ffffff',
      },
      is_branding: 1,
      is_branding_color: true,
      brandLoading: false,
      wpSubscriptions: {},
      fetchingSubscriptionData: false,
      subscriptionFetched: false,
    }
  },
  computed: {
    isBrandingDisabled() {
      return (
        this.hasDam &&
        this.subscriptionFetched &&
        !this.wpSubscriptions?.dam_branding?.enable
      )
    },
    enableChangeOwnerButton() {
      return parseInt(this.workspaceNewOwnerId) === 0
    },
    css() {
      return `
                    .dam-frontend-header-preview {
                      background-color: ${
                        this.themes_option.primaryColor
                          ? this.themes_option.primaryColor
                          : '#070E22'
                      };
                      display: inline-block;
                    }
                    .dam-frontend-header-preview > ul {
                      padding: 20px 15px;
                      display: block;
                      min-width: 240px;
                    }
                    .dam-frontend-header-preview ul > li > a {
                      color: ${
                        this.themes_option.secondaryColor
                          ? this.themes_option.secondaryColor
                          : '#ffffff'
                      };
                      display: flex;
                      padding: 10px 15px;
                      transition: ease-in-out all 0.4s;
                      -webkit-transition: ease-in-out all 0.4s;
                      -ms-transition: ease-in-out all 0.4s;
                      -o-transition: ease-in-out all 0.4s;
                      border-radius: 4px;
                      font-weight: 500;
                    }
                    .dam-frontend-header-preview > ul > li.active > a,
                    .dam-frontend-header-preview > ul > li:hover > a {
                      background-color: ${this.hex2rgba(
                        this.themes_option.secondaryColor
                          ? this.themes_option.secondaryColor
                          : '#ffffff',
                        0.15
                      )};
                    }
                    .dam-frontend-header-preview ul > li:hover > a {
                      color: ${
                        this.themes_option.secondaryColor
                          ? this.themes_option.secondaryColor
                          : '#ffffff'
                      });
                    }
                    .dam-frontend-header-preview ul.submenu {
                      padding: 10px;
                    }
                    .dam-frontend-header-preview ul.submenu li a {
                      color: ${this.hex2rgba(
                        this.themes_option.secondaryColor
                          ? this.themes_option.secondaryColor
                          : '#ffffff',
                        0.7
                      )};
                    }
                    .dam-frontend-header-preview ul.submenu li:hover a {
                      color: ${
                        this.themes_option.secondaryColor
                          ? this.themes_option.secondaryColor
                          : '#ffffff'
                      };
                    }
         `
    },
    internalWorkspace() {
      return this.$auth.user.accessibleWorkspaces.find(
        ({ id }) => parseInt(id) === parseInt(this.internal_workspace_id)
      )
    },
    hasDam() {
      return !!this.internalWorkspace?.module?.find(
        (e) => parseInt(e.module_id) === 2
      )
    },
  },
  mounted() {
    this.getWorkspaceDetail()
    this.getDam()
    this.fetchWPSubscription()
    this.$watch('routeInstanceId', this.fetchWPSubscription)
  },
  methods: {
    fetchWPSubscription() {
      if (!this.routeInstanceId) {
        this.wpSubscriptions = {}
        return
      }
      if (this.fetchingSubscriptionData) return
      this.subscriptionFetched = false
      this.fetchingSubscriptionData = true
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => {
          this.wpSubscriptions = data.features
        })
        .catch((e) => {
          this.wpSubscriptions = {}
        })
        .finally(() => {
          this.fetchingSubscriptionData = false
          this.subscriptionFetched = true
        })
    },
    hex2rgba(hex, code) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return (
          'rgba(' +
          [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
          ',' +
          code +
          ')'
        )
      }
    },
    async getDam() {
      const workspace = this.$auth.user.accessibleWorkspaces.find(
        ({ id }) => parseInt(id) === parseInt(this.workspace_id)
      )
      const user = this.$getUserModulesAndRoles(workspace)
      if (workspace.type.toString() === 'parent' && user.hasDamAccess) {
        await this.$store.dispatch('dam/getInstances', this.workspace_id)
      }
    },
    async getWorkspaceDetail() {
      try {
        const { data } = await this.$axios.$get(
          `/view-workspace?workspace_id=${this.internal_workspace_id}`
        )
        this.name = data.name
        this.ifNotImageChar = data.name.charAt(0).toUpperCase()
        this.user_email = data.user_email
        this.user_phone = data.user_phone
        this.address_line_1 = data.address_line_1
        this.address_line_2 = data.address_line_2
        this.city = data.city
        this.state = data.state
        this.display_salary = data.display_salary
        this.enable_notification = data.enable_notification
        this.zip_code = data.zip_code
        this.recovery_email = data.recovery_email
        this.recovery_phone = data.recovery_phone
        this.logo_preview = data.display_logo
        this.faviconIcon = data.brand_favicon
        this.faviconName = data.favicon_name
        this.themes_option.primaryColor = data.primary_color
          ? data.primary_color
          : '#070E22'
        this.themes_option.secondaryColor = data.secondary_color
          ? data.secondary_color
          : '#ffffff'
        this.is_branding = data.is_branding
        this.is_branding_color = data.is_branding === 1
        this.isBrandingSection = true

        this.getWorkspaceSuperUsers()
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },

    async getWorkspaceSuperUsers() {
      try {
        const { data } = await this.$axios.$get(
          `/get-workspace-user-data?workspace_id=${this.internal_workspace_id}`
        )
        this.workspaceSuperUsers = data.users
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    getWorkspaceNewOwnerData(data) {
      const { id, name, email } = data
      if (email === this.user_email) {
        this.$toast.info('Selected user is already an owner of this Workspace')
      } else {
        this.workspaceNewOwnerId = id === undefined ? 0 : id
        this.workspaceNewOwnerData = { id, name, email }
      }
    },
    askForConfirmation() {
      window.$('#confirmation').modal('show')
    },
    cancelChangeOwner() {
      this.workspaceNewOwnerId = 0
      this.workspaceNewOwnerData = { id: '0', name: 'Select User', email: '' }
    },
    async confirmChangeWorkspaceOwner() {
      if (!parseInt(this.workspaceNewOwnerId)) {
        this.$toast.error('Woops! something went wrong')
        return true
      }
      try {
        window.$('#confirmation').modal('hide')
        window.$('#workspace-owner').modal('hide')
        this.user_email = this.workspaceNewOwnerData.email
        const { message } = await this.$axios.$post(`update-workspace-owner`, {
          workspace_id: this.internal_workspace_id,
          user_id: this.workspaceNewOwnerId,
        })
        this.$toast.global.success(message)
        this.cancelChangeOwner()
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    async submitHandler() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.loading = true
        const { message } = await this.$axios.$post(
          `update-workspace-settings`,
          {
            workspace_id: this.internal_workspace_id,
            company_name: this.name,
            user_phone: this.user_phone,
            address_line_1: this.address_line_1,
            address_line_2: this.address_line_2,
            city: this.city,
            state: this.state,
            display_salary: this.display_salary === true ? 1 : 0,
            enable_notification: Number(this.enable_notification),
            zip_code: this.zip_code,
            recovery_phone: this.recovery_phone,
            recovery_email: this.recovery_email,
          }
        )
        this.loading = false
        this.$toast.global.success(message)
      } catch (e) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    defaultSize() {
      return {
        width: 540,
        height: 64,
      }
    },
    reset() {
      if (this.$refs.fileInput) this.$refs.fileInput.value = null
      this.imageData = null
      $(document).find('.invitation-dismiss').trigger('click')
    },
    changeLogo(event) {
      const twoMB = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMB) {
          this.logo = event.target.files[0]
          const input = event.target
          if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
              this.imageData = e.target.result
              window.$(document).find('#cropLogoDialog').trigger('click')
            }
            reader.readAsDataURL(input.files[0])
          }
        } else {
          event.target.value = null
          this.$toast.error('File size should not be more than 2MB')
        }
      }
    },
    companyLogoUpdate() {
      this.logo_preview = null
      this.uploadingLogo = true
      const formData = new FormData()
      formData.append('workspace_id', this.internal_workspace_id)
      const { canvas } = this.$refs.vueCropper.getResult()
      if (!canvas) {
        this.$toast.global.error('Could not update banner. Please try again.')
        this.uploadingLogo = false
        return
      }
      canvas.toBlob((_blob) => {
        // source canvas has no background fill, it falls back to black/no-color
        // so dumping source canvas to a new canvas with white background and preparing blob from there
        const cnv = document.createElement('canvas')
        cnv.width = canvas.width
        cnv.height = canvas.height
        const ctx = cnv.getContext('2d')
        ctx.fillStyle = 'transparent'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(canvas, 0, 0)
        cnv.toBlob((blob) => {
          formData.append('logo', blob)
          this.$axios
            .post('change-workspace-logo', formData)
            .then(({ data }) => {
              this.$store.dispatch('dam/setBranding', {
                workspace_id: this.internal_workspace_id,
                isSetFavicon: true,
              })
              this.uploadingLogo = false
              this.logo_preview = data.data.display_logo
              this.$toast.global.success(
                data.message || `Organization updated successfully.`
              )
              this.reset()
            })
            .catch((e) => this.$toast.error(this.$getErrorMessage(e)))
            .finally(() => (this.uploadingLogo = false))
        })
      })
    },
    async companyFaviconUpdate() {
      const formData = new FormData()
      formData.append('brand_favicon', this.faviconIconStore)
      formData.append('workspace_id', this.internal_workspace_id)

      try {
        const { message } = await this.$axios.$post(
          '/change-workspace-favicon',
          formData
        )
        this.$store.dispatch('dam/setBranding', {
          workspace_id: this.internal_workspace_id,
          isSetFavicon: true,
        })
        this.$toast.global.success(
          message || `Workspace favicon updated successfully.`
        )
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    onFileChange(file) {
      const imageFile = file[0]
      if (file.length > 0) {
        if (!imageFile.type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
        } else if (imageFile.size > this.maxSize) {
          this.$toast.global.error(
            'Your file is too big! Please select an image under 2MB'
          )
        } else {
          const img = new Image()
          img.src = URL.createObjectURL(imageFile)
          img.onload = () => {
            const width = img.naturalWidth
            const height = img.naturalHeight
            if (width === height) {
              this.faviconName = imageFile.name
              this.faviconIcon = img.src
              this.faviconIconStore = imageFile
              this.companyFaviconUpdate()
            } else {
              this.$toast.global.error('Please upload a Square image.')
            }
          }
        }
      }
    },
    restoreBrand() {
      if (document.getElementById('WorkspaceBranding').checked) {
        this.themes_option.primaryColor = '#070E22'
        this.themes_option.secondaryColor = '#ffffff'
        this.is_branding = 1
        this.is_branding_color = true
      } else {
        this.is_branding = 0
        this.is_branding_color = false
      }
    },
    async updateWorkspaceBranding() {
      if (this.brandLoading) return
      this.brandLoading = true
      try {
        const { message } = await this.$axios.$post(
          '/update-workspace-branding',
          {
            workspace_id: this.internal_workspace_id,
            primary_color: this.themes_option.primaryColor,
            secondary_color: this.themes_option.secondaryColor,
            is_branding: this.is_branding === true ? 1 : 0,
          }
        )
        this.$store.dispatch('dam/setBranding', {
          workspace_id: this.internal_workspace_id,
          isSetFavicon: true,
        })
        this.$toast.global.success(message)
        this.brandLoading = false
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.brandLoading = false
      }
    },
  },
  validations: {
    user_phone: { maxLength: maxLength(20) },
    zip_code: { maxLength: maxLength(20) },
    recovery_email: { email },
    recovery_phone: { maxLength: maxLength(20) },
  },
}
</script>
<style>
.cropper-nobg {
  background: none;
}
.cropper {
  width: 100%;
}
</style>
