<template>
  <div class="body-content">
    <div class="body-content-left h-100">
      <div class="common-box-header">
        <h2 class="title">
          <nuxt-link
            class="back"
            :to="{
              name: 'workspace_id-lead-dealers',
              params: {
                workspace_id: $_auth().id,
              },
            }"
          >
            <BackIcon />
          </nuxt-link>
          Dealer Detail
        </h2>
      </div>
      <div
        ref="editbox_ref"
        class="box customscrollbar dl-detail-left ld-detail-left p0"
      >
        <ProfileLoader
          v-if="dealerLoading"
          style="min-width: 390px !important; min-height: 700px !important"
        />
        <a class="dl-editicon">
          <EditIcon />
        </a>
        <div class="dl-detail-left-fr">
          <div class="box-heading">
            <img
              :src="
                dealer.dealership_logo !== ''
                  ? dealer.dealership_logo
                  : require('@/assets/img/placeholder.jpg')
              "
              style="height: 100px; width: auto; object-fit: contain"
              alt=""
            />
            <h3>{{ dealer.dealership_name }}</h3>
          </div>
          <div class="dealer-contact">
            <div class="media sc_media">
              <DealerNumberIcon />
              <div class="media-body">
                <h5>Dealership Number</h5>
                <p>{{ dealer.dealership_number }}</p>
              </div>
            </div>
            <div class="media sc_media">
              <EmailIcon />

              <div class="media-body">
                <h5>Email</h5>
                <div
                  class="d-flex flex-wrap align-items-center justify-content-between"
                >
                  <div
                    class="mail-virify"
                    :class="[
                      dealer.email_verified_at === null ? 'worng' : '',
                      dealer.email_verified_at === null ? 'flex90' : 'flex100',
                    ]"
                  >
                    <p>
                      <a :href="'mailto:' + dealer.email">{{ dealer.email }}</a>
                    </p>
                    <VerifiedIcon
                      v-if="dealer.email_verified_at !== null"
                      v-tooltip="
                        'Verified at ' +
                        $moment(dealer.email_verified_at).format('MMM Do YYYY')
                      "
                    />
                    <UnVerifiedIcon />
                  </div>
                  <div
                    v-if="dealer.email_verified_at === null"
                    class="flex10 text-center"
                  >
                    <a href="javascript:" @click="resendDealerVerification">
                      <ResendIcon v-tooltip="'Resend Verification'" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="media sc_media">
              <PhoneIcon />
              <div class="media-body">
                <h5>Contact Number</h5>
                <p>
                  <a :href="'tel:' + dealer.phone || '-'">{{
                    dealer.phone || '-'
                  }}</a>
                </p>
                <h5>Office Number</h5>
                <p>
                  <a :href="'tel:' + dealer.office_phone || '-'">{{
                    dealer.office_phone || '-'
                  }}</a>
                </p>
              </div>
            </div>
            <div class="media sc_media">
              <HomeIcon />
              <div class="media-body">
                <h5>Address</h5>
                <p>
                  {{ dealer.address_line_1 }}<br v-if="dealer.address_line_1" />
                  {{ dealer.address_line_2 }}<br v-if="dealer.address_line_2" />
                  {{ dealer.city }}<br v-if="dealer.city" />
                  {{ dealer.zip_code }}
                </p>
              </div>
            </div>
          </div>
          <div class="dealer-contact dealer-contact2 mt2 pb0">
            <div
              v-if="
                dealer.dealership_rsm_assign &&
                dealer.dealership_rsm_assign.length > 0
              "
              class="row"
            >
              <div
                v-for="cat in getUniqueRsmList"
                :key="cat.category_id"
                class="col-lg-6 mb20"
              >
                <h5 class="mt0">{{ cat.user.name }}</h5>
                <span class="classes bg-blue">{{ cat.category.name }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="primaryContact"
            class="dealer-contact dealer-contact2 mt10"
          >
            <div class="media sc_media">
              <UserIcon />
              <div class="media-body align-self-start">
                <h5>Primary Contact</h5>
              </div>
            </div>
            <div class="media sc_media">
              <img
                v-if="primaryContact.display_profile_image"
                :src="primaryContact.display_profile_image"
                alt=""
                class="rd-img"
                style="width: 18px"
              />
              <div
                v-else
                class="profile-char primaryContact"
                :title="primaryContact.name ? primaryContact.name : '-'"
              >
                {{
                  primaryContact.name && primaryContact.name.trim()
                    ? primaryContact.name.charAt(0).toUpperCase()
                    : primaryContact.name.charAt(0).toUpperCase()
                }}
              </div>
              <div class="media-body align-self-start">
                <h5>{{ primaryContact.name ? primaryContact.name : '-' }}</h5>
                <p>{{ primaryContact.designation }}</p>
              </div>
            </div>
            <div class="media sc_media">
              <EmailIcon />
              <div class="media-body align-self-start">
                <h5>Email</h5>
                <p>
                  <a :href="'mailto:' + primaryContact.email">{{
                    primaryContact.email
                  }}</a>
                </p>
              </div>
            </div>
            <div class="media sc_media">
              <PhoneIcon />
              <div class="media-body align-self-start">
                <h5>Phone</h5>
                <p>
                  <a :href="'tel:' + primaryContact.phone">{{
                    primaryContact.phone
                  }}</a>
                </p>
              </div>
            </div>
          </div>
          <div v-if="dealer.lat && dealer.lon" class="map-part">
            <iframe
              :src="
                'https://maps.google.com/maps?q=' +
                dealer.lat +
                ',' +
                dealer.lon +
                '&hl=en&z=14&amp;output=embed'
              "
              src1="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.342090590568!2d-88.14682488441055!3d34.443463104458374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x888781b6b94e32d7%3A0x76b1f72d9f012107!2sTiffin%20Motorhomes%20Inc.!5e0!3m2!1sen!2sin!4v1611210960164!5m2!1sen!2sin"
              width="350"
              height="260"
              frameborder="0"
              style="border: 0"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </div>
        </div>
        <div class="dl-detail-left-bk">
          <form v-if="form" class="form" @submit.prevent="handleSubmit()">
            <div class="box-heading">
              <div class="row align-items-center">
                <div class="col-lg-5">
                  <div class="pr-img r11">
                    <img
                      :src="
                        form.dealership_logo
                          ? imgUrl(form.dealership_logo)
                          : require('@/assets/img/placeholder.jpg')
                      "
                      alt=""
                      class="img-responsive"
                    />
                  </div>
                </div>
                <div class="col-lg-7">
                  <imageInput @input="onImageUpload">
                    <template slot="activator">
                      <label class="logo-update"
                        >{{
                          form.dealership_logo ? 'Change Image' : 'Upload Image'
                        }}
                      </label>
                    </template>
                  </imageInput>
                </div>
              </div>
              <a
                v-if="form.dealership_logo"
                v-tooltip="'Delete Image'"
                class="dl-editicon"
                @click="removeImage"
              >
                <DeleteIcon />
              </a>
            </div>
            <div class="p1">
              <div class="form-group required">
                <label class="control-label">Dealership Number</label>
                <input
                  v-model="form.dealership_number"
                  type="text"
                  name="dealership-number"
                  class="form-control"
                />
                <div
                  v-if="
                    $v.form.dealership_number.$error &&
                    !$v.form.dealership_number.required
                  "
                  class="input-error"
                >
                  Please provide the number
                </div>
                <div
                  v-if="
                    $v.form.dealership_number.$error &&
                    !$v.form.dealership_number.numeric
                  "
                  class="input-error"
                >
                  Please provide only digits
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Dealership Name</label>
                <input
                  v-model="form.dealership_name"
                  type="text"
                  name="dealership-name"
                  class="form-control"
                />
                <div
                  v-if="
                    $v.form.dealership_name.$error &&
                    !$v.form.dealership_name.required
                  "
                  class="input-error"
                >
                  Please provide name
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  name="dealership-email"
                  class="form-control"
                />
                <div
                  v-if="$v.form.email.$error && !$v.form.email.required"
                  class="input-error"
                >
                  Please provide email
                </div>
                <div
                  v-if="$v.form.email.$error && !$v.form.email.email"
                  class="input-error"
                >
                  Please provide valid email
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Contact Number</label>
                <input
                  v-model="form.phone"
                  type="text"
                  name="dealership-phone"
                  class="form-control"
                />
                <div
                  v-if="$v.form.phone.$error && !$v.form.phone.maxLength"
                  class="input-error"
                >
                  Please provide valid contact number
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Office Number</label>
                <input
                  v-model="form.office_phone"
                  type="text"
                  name="office-phone"
                  class="form-control"
                />
                <div
                  v-if="
                    $v.form.office_phone.$error &&
                    !$v.form.office_phone.required
                  "
                  class="input-error"
                >
                  Please provide office number
                </div>
                <div
                  v-if="
                    $v.form.office_phone.$error && !$v.form.office_phone.numeric
                  "
                  class="input-error"
                >
                  Please provide valid office number
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Address Line 1</label>
                <client-only>
                  <vue-google-autocomplete
                    id="address"
                    ref="autocompleteRef"
                    v-model="form.address_line_1"
                    classname="form-control"
                    placeholder="Enter address line 1"
                    :country="['us', 'ca', 'aus']"
                    @placechanged="getAddressData"
                  >
                  </vue-google-autocomplete>
                </client-only>
                <div
                  v-if="
                    $v.form.address_line_1.$error &&
                    !$v.form.address_line_1.required
                  "
                  class="input-error"
                >
                  Please provide address
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Address Line 2</label>
                <input
                  v-model="form.address_line_2"
                  type="text"
                  name="dealership-address2"
                  class="form-control"
                />
              </div>
              <div class="form-group required">
                <label class="control-label">Zip Code</label>
                <input
                  v-model="form.zip_code"
                  type="text"
                  name="dealership-zipcode"
                  class="form-control"
                />
                <div
                  v-if="$v.form.zip_code.$error && !$v.form.zip_code.required"
                  class="input-error"
                >
                  Please provide zip code
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">City</label>
                <input
                  v-model="form.city"
                  type="text"
                  name="dealership-city"
                  class="form-control"
                />
                <div
                  v-if="$v.form.city.$error && !$v.form.city.required"
                  class="input-error"
                >
                  Please provide city
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">State</label>
                <input
                  v-model="form.state"
                  type="text"
                  name="dealership-state"
                  class="form-control"
                />
                <div
                  v-if="$v.form.state.$error && !$v.form.state.required"
                  class="input-error"
                >
                  Please provide state
                </div>
              </div>
              <div class="form-group required">
                <label class="control-label">Country</label>
                <input
                  v-model="form.country"
                  type="text"
                  name="dealership-country"
                  class="form-control"
                />
                <div
                  v-if="$v.form.country.$error && !$v.form.country.required"
                  class="input-error"
                >
                  Please provide country
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Latitude</label>
                <input
                  :value="form.lat"
                  type="text"
                  name="latitude"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="form-group">
                <label class="control-label">Longitude</label>
                <input
                  :value="form.lon"
                  type="text"
                  name="longitude"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="row xs-gutters">
              <div class="col-7">
                <button type="submit" class="btn btn-blue btn-block">
                  Update Info
                </button>
              </div>
              <div class="col-5">
                <button
                  type="button"
                  class="btn btn-gray dealer-edit-cancel btn-block"
                  @click="cancelEdit()"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="body-content-main h-100">
      <div class="tabs-view h-100">
        <ul class="nav nav-left" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#manage-users"
              @click="loadUserData()"
              >Manage Users</a
            >
          </li>
          <li class="nav-item">
            <a
              ref="leadtab"
              class="nav-link"
              data-toggle="tab"
              href="#leads"
              @click="loadLeads()"
              >Lead Contacts</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#models"
              @click="loadModels()"
              >Models</a
            >
          </li>
          <li
            v-if="userRole.isDealerGroupAdmin || userRole.isSuperAdmin"
            class="nav-item"
          >
            <a
              class="nav-link"
              data-toggle="tab"
              href="#notes"
              @click="loadNotes()"
              >Notes</a
            >
          </li>
          <li v-if="userRole.isSuperAdmin" class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#communication-preferences"
              @click="loadPreferences()"
              >Communication Preferences</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <div id="manage-users" class="tab-pane active">
            <!-- Resend invitation -->
            <transition name="fade">
              <a
                v-if="selections.length"
                href="javascript:void(0);"
                class="resend-invitation btn btn-icon"
                @click.capture="
                  multiSendDialog = false
                  $nextTick(() => (multiSendDialog = true))
                "
              >
                <PlusIcon />
                Resend Invitation
              </a>
            </transition>
            <a
              href="javascript:void(0);"
              class="add-user-form-btn btn btn-icon"
              @click="showUserForm = true"
            >
              <PlusIcon />

              Add New User</a
            >
            <div v-if="showUserForm" class="box p20 add-user-form">
              <div class="add-user-box">
                <text-field
                  v-model="user.name"
                  label="Name"
                  :v="$v.user.name"
                  required
                ></text-field>

                <text-field
                  v-model="user.email"
                  label="Email"
                  :v="$v.user.email"
                  required
                ></text-field>

                <text-field
                  v-model="user.designation"
                  :v="$v.user.designation"
                  label="Job Title"
                  required
                ></text-field>

                <Select
                  v-model="user.role"
                  label="User Role"
                  :items="roles"
                  item_text="name"
                  item_value="id"
                  :v="$v.user.role"
                  :select_first="false"
                  required
                >
                </Select>
                <div
                  v-if="
                    user.role && user.role.toString() === dealerAdmin.toString()
                  "
                  class="form-group text-center"
                >
                  <label class="control-label"></label>
                  <label class="check-label" style="max-width: max-content">
                    Assign Leads
                    <input
                      type="checkbox"
                      name=""
                      @change="
                        $event.target.checked
                          ? (user.is_lead_assign = 1)
                          : (user.is_lead_assign = 0)
                      "
                    />
                    <span class="check-span"></span>
                  </label>
                </div>
                <div class="form-group">
                  <label class="control-label"></label>
                  <button
                    class="btn btn-icon btn-small"
                    href="javascript:;"
                    :disabled="addUserLoading"
                    @click="addUser()"
                  >
                    <i
                      v-if="addUserLoading"
                      class="fa fa-circle-o-notch fa-spin"
                    >
                    </i>
                    <PlusIcon v-else />
                    Add & Send Invite
                  </button>
                  <a
                    href="javascript:void(0);"
                    class="add-user-form-close ml-2"
                    @click="closeForm"
                  >
                    <CloseIcon />
                  </a>
                </div>
              </div>
            </div>
            <div class="common-box bg-gray h-100">
              <div class="table-list-view multi-table-view show-detail">
                <ul class="thead">
                  <li>
                    <div class="favorite sorting flex5">
                      <span>
                        <PrimaryContactIcon v-tooltip="'Primary contact'" />
                      </span>
                    </div>
                    <div
                      class="sorting sortarrow flex25"
                      :class="[
                        userSortValue === 'name' && userSortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleUserSort('name')">Name / Email</span>
                    </div>
                    <div class="sorting flex13">
                      <span>Job Title</span>
                    </div>
                    <div class="sorting flex13">
                      <span>User Role</span>
                    </div>
                    <div class="sorting flex24">
                      <span>Communication Preferences</span>
                    </div>
                    <div class="sorting flex10 text-center">
                      <span>Lead Visibility</span>
                    </div>
                    <div class="sorting flex10">
                      <span>Action</span>
                    </div>
                  </li>
                </ul>
                <!-- end of edit form -->
                <div class="customscrollbar no_footer">
                  <ul v-if="users.length" class="tbody no-hover">
                    <li
                      v-for="(user, index) in users"
                      :key="user.id + '_' + index"
                      :class="user.isEditing ? 'edit-mode' : ''"
                    >
                      <EditForm
                        v-if="user.isEditing"
                        :my-user="user"
                        :add-user-loading="addUserLoading"
                        :roles="roles"
                        @updateUser="updateUser($event)"
                        @closeEditUserForm="closeEditUserForm($event)"
                      />

                      <div class="favorite tb-column flex5">
                        <a
                          href="javascript:void(0);"
                          class="fav-icon active"
                          :style="
                            user.invitation_status && 'cursor:not-allowed'
                          "
                          @click="
                            !user.invitation_status && addToPrimary(user.id)
                          "
                        >
                          <span v-if="user.is_primary_contact">
                            <svg
                              id="Layer_1"
                              v-tooltip="
                                user.invitation_status
                                  ? 'User is not active'
                                  : 'Primary contact'
                              "
                              class="primary-contact-icon orange"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 17.7 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_38927"
                                transform="translate(-1593 -754)"
                              >
                                <path
                                  id="Path_38015"
                                  class="fill-color"
                                  d="M1601.9,763.6c2.7,0,4.8-2.2,4.8-4.8s-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8C1597.1,761.5,1599.2,763.6,1601.9,763.6z"
                                ></path>
                                <path
                                  id="Path_38016"
                                  class="fill-color"
                                  d="M1605.9,765.1h-8.1c-2.7,0-4.8,2.2-4.8,4.8c0,0,0,0,0,0v2h17.7v-2C1610.7,767.3,1608.6,765.2,1605.9,765.1C1605.9,765.1,1605.9,765.1,1605.9,765.1z"
                                ></path>
                              </g>
                            </svg>
                          </span>
                          <span v-else>
                            <svg
                              id="Layer_1"
                              v-tooltip="
                                user.invitation_status
                                  ? 'User is not active'
                                  : 'Primary contact'
                              "
                              :style="
                                user.invitation_status === true
                                  ? `opacity:0.5`
                                  : ''
                              "
                              class="primary-contact-icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 17.7 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_38928"
                                transform="translate(-1626.306 -754)"
                              >
                                <path
                                  id="Path_38013"
                                  class="fill-color"
                                  d="M1635.2,763.6c2.7,0,4.8-2.2,4.8-4.8c0-2.7-2.2-4.8-4.8-4.8c-2.7,0-4.8,2.2-4.8,4.8C1630.4,761.5,1632.5,763.6,1635.2,763.6z M1635.2,755.5c1.8,0,3.3,1.5,3.3,3.3c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3l0,0C1631.9,757,1633.4,755.5,1635.2,755.5C1635.2,755.5,1635.2,755.5,1635.2,755.5z"
                                ></path>
                                <path
                                  id="Path_38014"
                                  class="fill-color"
                                  d="M1639.2,765.1h-8.1c-2.7,0-4.8,2.2-4.8,4.8c0,0,0,0,0,0v2h17.7v-2C1644,767.3,1641.9,765.2,1639.2,765.1C1639.2,765.1,1639.2,765.1,1639.2,765.1z M1642.5,770.5h-14.7V770c0-1.8,1.5-3.3,3.3-3.3h8.1c1.8,0,3.3,1.5,3.3,3.3L1642.5,770.5z"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </a>
                      </div>
                      <div class="name-email tb-column flex25">
                        <div class="media">
                          <div class="media-left">
                            <label
                              class="check-label"
                              :style="
                                user.invitation_status === false
                                  ? `opacity:0.5`
                                  : ''
                              "
                            >
                              <input
                                v-model="user.selected"
                                name="checkbox"
                                class="checkBoxClass"
                                type="checkbox"
                                data-lpignore="true"
                                :disabled="user.invitation_status === false"
                              />
                              <span
                                class="check-span"
                                :class="
                                  user.invitation_status === false
                                    ? 'disabled'
                                    : ''
                                "
                              ></span>
                            </label>
                          </div>
                          <div class="media-body">
                            <div class="top-column">
                              <label>{{ user.name }}</label>
                            </div>
                            <div class="bottom-column">
                              <span v-if="!user.isEditing"
                                ><a :href="'mailto:' + user.email">{{
                                  user.email
                                }}</a></span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column flex13">
                        <div class="top-column">{{ user.designation }}</div>
                      </div>
                      <div class="tb-column flex13">
                        <div class="top-column">
                          {{ user.roles_details.name }}
                        </div>
                      </div>
                      <div class="tb-column flex24">
                        <div class="top-column">
                          <ul class="check-list check-list-inline">
                            <li>
                              <label class="check-label"
                                >Text
                                <input
                                  v-model="user.is_communication_text"
                                  type="checkbox"
                                  name=""
                                  @change="
                                    toggleUserProperty(
                                      $event,
                                      'is_communication_text',
                                      user.id
                                    )
                                  "
                                />
                                <span class="check-span"></span>
                              </label>
                            </li>
                            <li>
                              <label class="check-label"
                                >Email
                                <input
                                  v-model="user.is_communication_email"
                                  type="checkbox"
                                  name=""
                                  @change="
                                    toggleUserProperty(
                                      $event,
                                      'is_communication_email',
                                      user.id
                                    )
                                  "
                                />
                                <span class="check-span"></span>
                              </label>
                            </li>
                            <li>
                              <label class="check-label"
                                >Phone
                                <input
                                  v-model="user.is_communication_phone"
                                  type="checkbox"
                                  name=""
                                  @change="
                                    toggleUserProperty(
                                      $event,
                                      'is_communication_phone',
                                      user.id
                                    )
                                  "
                                />
                                <span class="check-span"></span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="tb-column flex10 text-center">
                        <div class="top-column">
                          <label class="label-switch">
                            <input
                              id="detailView"
                              v-model="user.is_lead_visible"
                              type="checkbox"
                              class="switch"
                              name="detail-view"
                              @change="
                                toggleUserProperty(
                                  $event,
                                  'is_lead_visible',
                                  user.id
                                )
                              "
                            />
                            <span class="lable"></span>
                          </label>
                        </div>
                      </div>
                      <div class="tb-column flex10">
                        <ul class="action">
                          <li v-if="!user.invitation_status">
                            <a href="javascript:void(0);">
                              <ActiveUserIcon v-tooltip="'Active User'" />
                            </a>
                          </li>
                          <li v-else>
                            <a
                              href="javascript:void(0);"
                              @click="userVerification(user)"
                            >
                              <EmailIcon
                                v-tooltip="'Resend Invitation'"
                                :is-active-orange="false"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;" @click="setEditUser(user)">
                              <EditIcon :is-active-orange="false" />
                            </a>
                          </li>
                          <li>
                            <a href="javascript:;" @click="deleteUser(user)">
                              <DeleteIcon v-tooltip="'Delete user'" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                  <client-only>
                    <infinite-loading
                      :identifier="userInfiniteId"
                      @infinite="userInfiniteHandler"
                    >
                      <div slot="spinner"><LeadListLoader /></div>
                      <div slot="no-more"></div>
                      <div slot="no-results">
                        <EmptyState v-if="!users.length">
                          <p>You haven't added any user yet!</p>
                        </EmptyState>
                      </div>
                    </infinite-loading>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
          <div id="leads" class="tab-pane">
            <div class="common-box bg-gray h-100">
              <div class="table-list-view multi-table-view show-detail">
                <ul class="thead">
                  <li>
                    <div
                      class="favorite sorting filtericon flex5"
                      :class="[
                        leadSortBy === 'is_favourite' && leadOrder === 'DESC'
                          ? 'open'
                          : '',
                      ]"
                      @click="toggleLeadSortData('is_favourite')"
                    >
                      <span>
                        <FlagIcon />
                        <FlagIconOrange />
                      </span>
                    </div>
                    <div
                      class="name-email sorting sortarrow flex25"
                      :class="[
                        leadSortBy === 'name' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <div class="blank-space30"></div>
                      <span @click="toggleLeadSortData('name')"
                        >Name / Email</span
                      >
                    </div>
                    <div class="sorting flex10">
                      <span>Phone Number</span>
                    </div>
                    <div
                      class="last-score sorting sortarrow flex8 text-center"
                      :class="[
                        leadSortBy === 'lead_score' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleLeadSortData('lead_score')"
                        >Score
                        <i
                          v-tooltip="leadScoreText"
                          data-v-594610ab=""
                          aria-hidden="true"
                          data-tip="tip-info"
                          class="fa fa-info-circle tip"
                        ></i
                      ></span>
                    </div>
                    <div class="model sorting filterarrow flex14">
                      <span>Model</span>
                      <ul class="dataFilter">
                        <li
                          v-for="item in filterData.model_name"
                          :key="item.id"
                        >
                          <label class="check-label"
                            >{{ item.text }}
                            <input
                              v-model="item.isActive"
                              :disabled="isLoading"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                        <div
                          v-if="!filterData.model_name.length"
                          class="text-center d-flex align-items-center justify-content-center"
                        >
                          <span>No filter data</span>
                        </div>
                      </ul>
                    </div>
                    <div class="sorting filterarrow flex10">
                      <span>Source</span>
                      <ul class="dataFilter">
                        <li
                          v-for="item in filterData.lead_source"
                          :key="item.id"
                        >
                          <label class="check-label"
                            >{{ item.text }}
                            <input
                              v-model="item.isActive"
                              :disabled="isLoading"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                        <div
                          v-if="!filterData.lead_source.length"
                          class="text-center d-flex align-items-center justify-content-center"
                        >
                          <span>No filter data</span>
                        </div>
                      </ul>
                    </div>
                    <div class="lead-status sorting filterarrow flex10">
                      <span
                        >Status
                        <i
                          v-tooltip="{
                            html: true,
                            content: getStatusDescription,
                          }"
                          class="fa fa-info-circle tip"
                          aria-hidden="true"
                          data-tip="tip-info"
                        ></i
                      ></span>
                      <ul class="dataFilter">
                        <li
                          v-for="item in filterData.lead_status"
                          :key="item.id"
                        >
                          <label class="check-label"
                            >{{ item.text }}
                            <input
                              v-model="item.isActive"
                              :disabled="isLoading"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                        <div
                          v-if="!filterData.lead_status.length"
                          class="text-center d-flex align-items-center justify-content-center"
                        >
                          <span>No filter data</span>
                        </div>
                      </ul>
                    </div>

                    <div class="sorting flex8">
                      <span>Action</span>
                    </div>
                    <div
                      class="activity-date sorting sortarrow flex10"
                      :class="[
                        leadSortBy === 'lead_date' && leadOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleLeadSortData('lead_date')"
                        >Last Activity</span
                      >
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <li
                      v-for="(lead, index) in leads"
                      :key="lead.id + '_' + index"
                      :class="[
                        lead.product_data && lead.product_data.length
                          ? 'double-lead'
                          : '',
                      ]"
                    >
                      <div class="favorite tb-column flex5">
                        <a
                          v-if="lead.is_favourite"
                          href="javascript:void(0);"
                          class="fav-icon"
                          @click="addLeadFavourite(lead)"
                        >
                          <svg
                            id="Layer_1"
                            class="flag-fill-icon orange"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 13.5 18"
                            xml:space="preserve"
                          >
                            <path
                              id="Path_3485"
                              class="fill-color"
                              d="M0.7,18C0.3,18,0,17.7,0,17.3V0.7C0,0.3,0.3,0,0.7,0c0.4,0,0.7,0.3,0.7,0.7v0.8h11.3c0.4,0,0.7,0.3,0.7,0.7c0,0,0,0,0,0c0,0.1,0,0.3-0.1,0.4l-2.7,4.1l2.7,4.1c0.2,0.3,0.1,0.8-0.2,1c-0.1,0.1-0.3,0.1-0.4,0.1H1.5v5.3C1.5,17.7,1.2,18,0.7,18L0.7,18L0.7,18z"
                            ></path>
                          </svg>
                        </a>
                        <a
                          v-else
                          href="javascript:void(0);"
                          class="fav-icon"
                          @click="addLeadFavourite(lead)"
                        >
                          <svg
                            id="Layer_1"
                            class="flag-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 12 16"
                            xml:space="preserve"
                          >
                            <path
                              id="Path_3486"
                              class="fill-color"
                              d="M0.6,16C0.3,16,0,15.7,0,15.3V0.6C0,0.3,0.3,0,0.7,0C1,0,1.3,0.3,1.3,0.6v0.7h10C11.7,1.3,12,1.6,12,2c0,0,0,0,0,0c0,0.1,0,0.2-0.1,0.4L9.5,6l2.4,3.6c0.2,0.3,0.1,0.7-0.2,0.9c-0.1,0.1-0.2,0.1-0.4,0.1h-10v4.7C1.3,15.7,1,16,0.6,16L0.6,16L0.6,16z M10.1,9.3l-2-3C8,6.1,8,5.8,8.1,5.6l2-3H1.3v6.7L10.1,9.3z"
                            ></path>
                          </svg>
                        </a>
                      </div>
                      <div class="name-email tb-column flex25">
                        <div class="dealer-num">{{ index + 1 }}</div>
                        <div
                          v-if="lead.logo"
                          v-tooltip="{
                            html: false,
                            content: lead.name,
                          }"
                          class="profile-bg"
                          :style="'background-image: url(' + lead.logo + ')'"
                        ></div>
                        <div v-else class="profile-char" :title="lead.name">
                          {{
                            (lead.name + lead.email)
                              .trim()
                              .charAt(0)
                              .toUpperCase()
                          }}
                        </div>
                        <div>
                          <div class="top-column">
                            <label>
                              <nuxt-link
                                :to="{
                                  name: 'workspace_id-lead-leads-id',
                                  params: {
                                    workspace_id: $_auth().id,
                                    id: lead.lead_id,
                                  },
                                }"
                              >
                                {{ !isBlank(lead.name) ? lead.name : '-' }}
                              </nuxt-link></label
                            >
                          </div>
                          <div class="bottom-column">
                            <span
                              ><a :href="'mailto:' + lead.email">{{
                                lead.email || '-'
                              }}</a></span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="tb-column flex10">
                        <div class="top-column">
                          <label>{{ lead.phone || '-' }}</label>
                        </div>
                      </div>
                      <div class="lead-score tb-column flex8 text-center">
                        <div class="top-column">
                          <div :class="lead.lead_score | leadScoreText">
                            <strong>{{ lead.lead_score }}</strong>
                            <span
                              class="img-responsive img-center"
                              v-html="leadScoreIconSvg(lead.lead_score)"
                            ></span>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="created-date tb-column flex9">
                        <div class="top-column">
                          <label>{{ lead.lead_create_date }}</label>
                        </div>
                      </div> -->
                      <div class="model tb-column flex14">
                        <template v-for="(product, i) of lead.product_data">
                          <template v-if="i <= 1">
                            <div :key="product.product_id" class="top-column">
                              <label>{{ product.product_name || '-' }}</label>
                            </div>
                            <div
                              :key="'B' + product.product_id"
                              class="bottom-column"
                            >
                              <span
                                v-for="variant of product.product_variant_data"
                                :key="variant.id"
                                >{{
                                  variant.variant_options_detailes
                                    ? variant.variant_options_detailes
                                        .option_name + ' '
                                    : '-'
                                }}</span
                              >
                            </div>
                          </template>
                        </template>
                      </div>
                      <div class="lead-source tb-column flex10">
                        <template v-for="(product, i) of lead.product_data">
                          <div
                            v-if="i <= 1"
                            :key="product.product_id"
                            class="top-column img-text"
                          >
                            <svg
                              v-if="
                                product.lead_source &&
                                product.lead_source.toLowerCase() === 'web'
                              "
                              id="Layer_1"
                              class="web-icon blue"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                            >
                              <path
                                id="Icon_ionic-md-globe-2"
                                class="fill-color"
                                d="M9,0C4,0,0,4,0,9s4,9,9,9s9-4,9-9S14,0,9,0z M8.1,16.4c-4.1-0.5-7-4.2-6.5-8.3c0.2-1.5,0.8-2.8,1.7-4c0,0.3,0.1,0.7,0.1,1C3.2,6,3.3,6.9,3.8,7.6C4,8,4.1,8.4,4.2,8.8C4.3,9.2,4.7,9.4,5,9.6c0.6,0.5,1.2,1,1.8,1.4c0.4,0.3,0.7,0.4,0.6,0.9c-0.1,0.4-0.2,0.7-0.3,1c0,0.3,0.2,0.7,0.4,0.9c0.3,0.3,0.6,0.6,1,0.9C8.9,15.2,8.3,15.8,8.1,16.4L8.1,16.4z M14.3,14.3c-1.1,1.1-2.4,1.8-3.9,2.1c0.2-0.5,0.5-0.9,0.9-1.2c0.3-0.3,0.6-0.6,0.8-1c0.2-0.3,0.4-0.7,0.6-1c0.3-0.5-0.7-1.1-1.1-1.3c-0.7-0.3-1.4-0.8-2-1.2c-0.5-0.3-1.4,0.2-2-0.1c-0.7-0.4-1.4-0.8-2-1.4C5.1,8.7,5.1,8.1,5.1,7.4c0.5,0,1.2-0.1,1.6,0.3c0.1,0.1,0.5,0.7,0.7,0.5c0.2-0.2-0.2-0.8-0.2-1C7,6.7,7.7,6.5,8,6.1C8.5,5.7,9.5,5,9.4,4.7s-1-1.2-1.5-1.1C7.8,3.7,7.1,4.4,7,4.5C7,4.3,7,4,7,3.8c0-0.2-0.3-0.3-0.3-0.4c0-0.2,0.7-0.7,0.9-0.9C7.5,2.4,7.1,2.1,6.9,2.1C6.6,2.2,6.3,2.3,6,2.4c0-0.1,0-0.2,0-0.3c0.6-0.3,1.2-0.5,1.9-0.6l0.6,0.2l0.4,0.5l0.4,0.4l0.4,0.1l0.6-0.5l-0.2-0.4V1.6c1.1,0.2,2.2,0.6,3.2,1.2c-0.2,0-0.4,0-0.6,0.1c-0.1,0-0.2-0.1-0.3-0.1C12.7,3.4,13,4,13.3,4.5c0.3,0.6,1,1.3,1.1,1.9c0.1,0.8,0,1.5,0.1,2.4c0.2,0.7,0.5,1.3,1,1.9c0.2,0.1,0.5,0.1,0.8,0.1C15.9,12.1,15.3,13.3,14.3,14.3L14.3,14.3z"
                              />
                            </svg>
                            <svg
                              v-else-if="
                                product.lead_source &&
                                product.lead_source.toLowerCase() === 'phone'
                              "
                              id="Layer_1"
                              class="phone-icon blue align-self-start"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Icon_feather-phone"
                                transform="translate(-741.165 -659.595)"
                              >
                                <path
                                  id="Path_3511"
                                  class="fill-color"
                                  d="M756.8,677.6c-0.1,0-0.1,0-0.2,0c-2.7-0.3-5.2-1.2-7.5-2.7c-2.1-1.3-3.9-3.1-5.2-5.2c-1.5-2.3-2.4-4.8-2.7-7.5c-0.1-1.3,0.8-2.4,2.1-2.6c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0h2.5c1.2,0,2.2,0.9,2.3,2c0.1,0.8,0.3,1.5,0.5,2.2c0.3,0.9,0.1,1.8-0.5,2.5l-0.7,0.7c1,1.6,2.4,3,4,4l0.7-0.7c0.7-0.6,1.6-0.9,2.5-0.5c0.7,0.3,1.4,0.4,2.2,0.5c1.2,0.2,2.1,1.2,2,2.4v2.5C759.1,676.5,758.1,677.6,756.8,677.6L756.8,677.6z M746,661h-2.5c-0.3,0-0.6,0.1-0.7,0.4c-0.2,0.2-0.2,0.5-0.2,0.7c0.3,2.5,1.1,4.8,2.4,6.9c1.2,1.9,2.9,3.6,4.8,4.8c2.1,1.3,4.4,2.2,6.9,2.5c0.3,0,0.6-0.1,0.8-0.3c0.2-0.2,0.3-0.4,0.3-0.7v-2.5c0-0.5-0.3-0.9-0.8-1c-0.9-0.1-1.7-0.3-2.5-0.6c-0.4-0.1-0.8,0-1,0.2l-1.1,1.1c-0.2,0.2-0.6,0.3-0.8,0.1c-2.2-1.2-4-3.1-5.3-5.3c-0.2-0.3-0.1-0.6,0.1-0.8l1.1-1.1c0.3-0.3,0.3-0.7,0.2-1c-0.3-0.8-0.5-1.6-0.6-2.5C746.9,661.3,746.5,661,746,661L746,661z"
                                />
                              </g>
                            </svg>

                            <svg
                              v-else-if="product.lead_source == 'Event'"
                              id="Layer_1"
                              class="event-icon blue"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                            >
                              <g
                                id="Group_4421"
                                transform="translate(-1042.37 -658.583)"
                              >
                                <path
                                  id="Path_3523"
                                  class="fill-color"
                                  d="M1044.9,676.6c-1.3,0-2.4-1.1-2.5-2.4v-11.6c0.1-1.3,1.2-2.4,2.5-2.4h13c1.3,0,2.4,1.1,2.5,2.4v11.6c-0.1,1.4-1.2,2.4-2.5,2.4H1044.9z M1044.9,661.8c-0.5,0-0.9,0.4-1,0.9v11.5c0,0.5,0.5,0.9,1,0.9h12.9c0.5,0,1-0.4,1.1-0.9v-11.5c0-0.5-0.5-0.9-1-0.9L1044.9,661.8z"
                                ></path>
                                <path
                                  id="Path_3524"
                                  class="fill-color"
                                  d="M1055,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1055.8,663.1,1055.5,663.4,1055,663.4z"
                                ></path>
                                <path
                                  id="Path_3525"
                                  class="fill-color"
                                  d="M1047.7,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1048.5,663.1,1048.1,663.4,1047.7,663.4z"
                                ></path>
                                <g id="Group_4420">
                                  <path
                                    id="Path_3526"
                                    class="fill-color"
                                    d="M1049.7,672.5l-3.2-3.2c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l2.2,2.2l5.5-5.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1L1049.7,672.5z"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                            <span v-else>-</span>
                            <label>{{ product.lead_source }}</label>
                          </div>
                        </template>
                      </div>
                      <div class="lead-status tb-column flex10">
                        <template v-for="(product, i) of lead.product_data">
                          <div
                            v-if="i <= 1"
                            :key="product.product_id"
                            class="top-column"
                          >
                            <LeadStatus
                              v-if="leadStatusOptions.length"
                              v-model="product.lead_status"
                              :items="leadStatusOptions"
                              item_text="status_name"
                              item_value="id"
                              @change="changeLeadStatus(lead, product)"
                            ></LeadStatus>
                          </div>
                        </template>
                      </div>

                      <div class="hv-img tb-column flex8">
                        <ul class="action">
                          <li>
                            <client-only>
                              <speech-recognition
                                v-slot="{ started, start, stop }"
                                v-model="annotation"
                                class="dropdown common-dropdown annotation"
                              >
                                <a
                                  v-tooltip="'Annotation'"
                                  class="dropdown-toggle"
                                  :class="{ 'mic-active': started }"
                                  data-toggle="dropdown"
                                  @click="
                                    () => {
                                      started ? stop() : start()
                                    }
                                  "
                                >
                                  <svg
                                    id="Layer_1"
                                    class="annotation-icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 12.4 18"
                                    xml:space="preserve"
                                  >
                                    <g
                                      id="Group_4391"
                                      transform="translate(-320.451 -659.57)"
                                    >
                                      <path
                                        id="Path_3487"
                                        class="fill-color"
                                        d="M326.7,661.1L326.7,661.1c0.5,0,1,0.2,1.3,0.6l0,0l0,0c0.4,0.4,0.6,0.9,0.6,1.4v5.5c0,0.5-0.2,1-0.6,1.4c-0.7,0.7-1.9,0.8-2.7,0l0,0l0,0c-0.4-0.4-0.6-0.9-0.6-1.4V663C324.7,661.9,325.6,661.1,326.7,661.1M326.7,659.6c-0.9,0-1.8,0.4-2.4,1c-0.7,0.6-1,1.5-1,2.4v5.5c0,0.9,0.4,1.8,1,2.4l0,0c1.3,1.3,3.5,1.3,4.8,0c0.7-0.6,1-1.5,1-2.4V663c0-0.9-0.4-1.8-1-2.4l0,0C328.4,659.9,327.6,659.6,326.7,659.6L326.7,659.6z"
                                      ></path>
                                      <path
                                        id="Path_3488"
                                        class="fill-color"
                                        d="M332.2,666.4c-0.4,0-0.7,0.3-0.7,0.7v1.4c0,2.6-2.1,4.8-4.7,4.8c-1.3,0-2.5-0.5-3.4-1.4c-0.9-0.9-1.4-2.1-1.4-3.4v-1.4c0-0.4-0.3-0.7-0.7-0.7s-0.7,0.3-0.7,0.7v1.4c0,3.2,2.3,5.8,5.5,6.2v1.4h-2.7c-0.2,0-0.4,0.1-0.5,0.2c-0.3,0.3-0.3,0.7,0,1c0,0,0,0,0,0c0.1,0.1,0.3,0.2,0.5,0.2h6.9l0,0c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7h-2.7v-1.3c3.2-0.4,5.5-3,5.5-6.2v-1.4C332.9,666.8,332.6,666.4,332.2,666.4z"
                                      ></path>
                                    </g>
                                  </svg>
                                </a>

                                <ul class="dropdown-menu">
                                  <form action="" method="" @submit.prevent>
                                    <div class="form-group">
                                      <textarea
                                        v-model="annotation"
                                        class="form-control"
                                        rows="8"
                                        placeholder="Start Annotation"
                                      ></textarea>
                                    </div>
                                    <div class="from-group mb0">
                                      <button
                                        type="button"
                                        class="btn btn-blue btn-small"
                                        @click="
                                          addLeadNote(annotation, lead.lead_id)
                                          stop()
                                        "
                                      >
                                        Submit
                                      </button>

                                      <button
                                        type="button"
                                        class="btn btn-gray btn-small"
                                        @click="
                                          stop()
                                          annotation = ''
                                        "
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                </ul>
                              </speech-recognition>
                            </client-only>
                          </li>
                        </ul>
                      </div>
                      <div class="activity-date tb-column flex10">
                        <div class="top-column">
                          <label>{{ lead.update_date }}</label>
                        </div>
                        <div class="bottom-column">
                          <span>{{ lead.lead_date }}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <client-only>
                    <infinite-loading
                      v-if="leadsLoaded"
                      :identifier="leadInfiniteId"
                      @infinite="leadsInfiniteHandler"
                    >
                      <div slot="spinner"><LeadListLoader /></div>
                      <div slot="no-more"></div>
                      <div slot="no-results">
                        <EmptyState>
                          <p>You haven't added any lead yet!</p></EmptyState
                        >
                      </div>
                    </infinite-loading>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
          <div id="models" class="tab-pane">
            <div
              v-if="$_auth().user.lead.isSuperAdmin"
              class="common-box h-100 customscrollbar model-list"
            >
              <div
                v-if="!models.length"
                class="col-12 d-flex h-100 justify-content-center align-items-center"
              >
                <i
                  class="fa fa-circle-o-notch fa-spin fa-2x fa-fw text-primary"
                ></i>
              </div>
              <div v-for="model in models" :key="model.id" class="box">
                <div class="clearfix">
                  <h5 class="pull-left">{{ model.name }}</h5>
                </div>
                <div class="row">
                  <div
                    v-for="product in model.product"
                    :key="product.id"
                    class="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <div class="sm-box">
                      <label class="check-label"
                        >{{ product.name }}
                        <input
                          type="checkbox"
                          name=""
                          :checked="
                            products.includes(product.id) ? 'checked' : false
                          "
                          @change="toggleProduct($event, product.id)"
                        />
                        <span class="check-span"></span>
                      </label>
                      <div
                        class="r189 setbg bg-gray"
                        :style="`background-image: url('${
                          product.product_images &&
                          product.product_images.length
                            ? product.product_images[0].product_image
                            : require('@/assets/img/placeholder.jpg')
                        }');background-size: contain;`"
                      ></div>

                      <div class="multiselect">
                        <div
                          class="owner-dropdown owner-multiple dealer-dropdown"
                        >
                          <Select2MultipleWithoutImage
                            v-if="products.includes(product.id)"
                            style="width: 100% !important"
                            :value="
                              rsm_assigned
                                .filter((r) => r.product_id === product.id)
                                .map((r) => r.rsm_id)
                            "
                            :dropdown-css-class="'owner-select'"
                            :options="rsmOption"
                            custom-event
                            placeholder="Select RSM Name"
                            @changeFollower="
                              selectRSM($event, model.id, product.id)
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="common-box h-100 customscrollbar model-list">
              <div
                v-if="!models.length"
                class="col-12 d-flex h-100 justify-content-center align-items-center"
              >
                <i
                  class="fa fa-circle-o-notch fa-spin fa-2x fa-fw text-primary"
                ></i>
              </div>
              <div v-for="model in models" :key="model.id" class="box">
                <div class="clearfix">
                  <h5 class="pull-left">{{ model.name }}</h5>
                </div>
                <div class="row">
                  <template v-for="product in model.product">
                    <div
                      v-if="products.includes(product.id)"
                      :key="product.id"
                      class="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <div class="sm-box">
                        <label class="check-label">{{ product.name }} </label>
                        <img
                          v-if="
                            product.product_images &&
                            product.product_images.length
                          "
                          :src="product.product_images[0].product_image"
                          alt=""
                          class="img-responsive img-center"
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div id="notes" class="tab-pane">
            <div class="row h-100">
              <NoteList
                :notes-infinite-id="notesInfiniteId"
                :notes-loaded="notesLoaded"
                :notes="notes"
                @newNote="showNote = $event"
                @viewNote="viewNote"
                @notesInfiniteHandler="notesInfiniteHandler"
              />
              <NoteView
                v-if="showNote && notes.length"
                :viewed-note="viewedNote"
              />
              <AddNote
                ref="addNoteRef"
                :show-note="showNote"
                @update:note="note = $event"
                @addNote="addNote"
                @showNote="showNote = $event"
              />
            </div>
          </div>
          <div id="communication-preferences" class="tab-pane">
            <div class="row h-100">
              <div class="col-lg-7 col-xl-6 h-100">
                <div class="common-box box h-100 customscrollbar">
                  <h5 class="mt0">Preferred Contact Method</h5>
                  <ul class="check-list mt1">
                    <li v-for="p in preferences" :key="p.id">
                      <label class="check-label"
                        >{{ p.name }}
                        <input
                          type="checkbox"
                          name=""
                          :checked="p.show_check_box"
                          @change="togglePreference(p.id, $event)"
                        />
                        <span class="check-span"></span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      v-model="multiSendDialog"
      @click:confirm-button="userVerification"
    >
      <template slot="header">Resend Selected Invitation</template>

      Are you sure you want to Resend
      <b>{{ selections.length }} selected</b> Users?
    </ConfirmationDialog>
  </div>
</template>

<script>
/* eslint-env jquery */
import { required, email, maxLength } from 'vuelidate/lib/validators'
import TextField from '@/components/lead/TextField.vue'
import Select from '@/components/lead/Select.vue'
import LeadStatus from '@/components/lead/LeadStatus'
import leadMixin from '@/mixins/lead.js'
import SpeechRecognition from '@/components/lead/SpeechRecognition.vue'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import Select2MultipleWithoutImage from '@/components/plugins/Select2MultipleWithoutImage'
import EditForm from '~/components/lead/EditForm'
import imageInput from '~/components/lead/ImageInput'
import { checkIsEqual, clone } from '~/utils/helper.js'
import NoteView from '~/components/lead/LeadDetails/Notes/NoteView.vue'
import AddNote from '~/components/lead/LeadDetails/Notes/AddNote.vue'
import EmptyState from '~/components/theme/global/EmptyState'
import NoteList from '~/components/lead/LeadDetails/Notes/NoteList'
import LeadListLoader from '~/components/lead/skeletons/LeadListLoader.vue'
import ProfileLoader from '~/components/lead/LeadDetails/Loaders/ProfileLoader.vue'
import FlagIconOrange from '~/components/lead/Icons/FlagIconOrange'
import FlagIcon from '~/components/lead/Icons/FlagIcon'
export default {
  components: {
    FlagIconOrange,
    FlagIcon,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
    TextField,
    Select,
    LeadStatus,
    SpeechRecognition,
    Select2MultipleWithoutImage,
    ConfirmationDialog,
    EditForm,
    imageInput,
    EmptyState,
    NoteView,
    AddNote,
    NoteList,
    LeadListLoader,
    ProfileLoader,
  },
  mixins: [leadMixin],
  layout: 'leadLayout',
  middleware: ['authCheck', 'can-access-lead-module'],
  data() {
    return {
      form: null,
      multiSendDialog: false,
      dealerLoading: false,
      dealerImg: null,
      dealer: {},
      models: [],
      products: [],
      user: this.newUser(),
      showUserForm: false,
      roles: [],
      users: [],
      note: '',
      notes: [],
      viewedNote: { user_details: {} },
      showNote: true,
      notesPage: 0,
      notesLoaded: false,
      isLoading: false,
      notesInfiniteId: new Date().getTime(),
      leadInfiniteId: new Date().getTime(),
      userInfiniteId: new Date(),
      usersPage: 0,
      leads: [],
      leadsPage: 0,
      leadsLoaded: false,
      leadOrder: 'ASC',
      leadSortBy: 'name',
      userSortOrder: 'ASC',
      userSortValue: 'name',
      leadStatusOptions: [],
      preferences: [],
      // location: { lat: 37.0902, lng: 95.7129 },
      dealerAdmin: null,
      annotation: '',
      addUserLoading: false,
      rsm_assignment: [],
      rsmOption: [],
      rsm_assigned: [],
      assignmentMessage: '',
      // filters
      filterData: {
        lead_source: [],
        lead_status: [],
        model_name: [],
      },
      filterPayload: {
        modelIds: [],
        statusIds: [],
        sourceIds: [],
      },
    }
  },
  computed: {
    isBlank() {
      return (str) => !str || /^\s*$/.test(str)
    },
    getStatusDescription() {
      if (
        this.leadStatusOptions.length > 0 &&
        typeof document !== 'undefined'
      ) {
        const ul = document.createElement('ul')
        this.leadStatusOptions.forEach((s) => {
          const li = document.createElement('li')
          const strong = document.createElement('strong')
          strong.textContent = s.status_name + ': '
          li.appendChild(strong)
          li.append(s.description ? s.description : '')
          ul.appendChild(li)
        })
        return ul
      }
      return ''
    },
    primaryContact() {
      return this.users.find((u) => u.is_primary_contact)
    },
    userRole() {
      return this.$_auth().user.lead
    },
    selections() {
      return this.users.filter(({ selected }) => selected)
    },
    getUniqueRsmList() {
      const result = []
      const map = new Map()
      for (const item of this.dealer.dealership_rsm_assign) {
        if (!map.has(item.rsm_user_id)) {
          map.set(item.rsm_user_id, true)
          result.push(item)
        }
      }
      return result
    },
  },
  watch: {
    'filterData.lead_source': {
      handler(val, newval) {
        if (checkIsEqual(val, newval)) {
          const tempData = [...this.filterData.lead_source]
          this.filterPayload.sourceIds = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.text)
          this.handleFilterChange()
        }
      },
      deep: true,
      immediate: false,
    },
    'filterData.lead_status': {
      handler(val, newval) {
        if (checkIsEqual(val, newval)) {
          const tempData = [...this.filterData.lead_status]
          this.filterPayload.statusIds = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      deep: true,
      immediate: false,
    },
    'filterData.model_name': {
      handler(val, newval) {
        if (checkIsEqual(val, newval)) {
          const tempData = [...this.filterData.model_name]
          this.filterPayload.modelIds = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      deep: true,
      immediate: false,
    },
  },
  created() {
    this.getDealerInfo()
    this.getColumnFilters()
    this.$axios
      .$post(`/lm/dealership/user/all-role`, {
        workspace_id: this.$route.params.workspace_id,
      })
      .then(({ data }) => {
        this.roles = data.role
        const role = this.roles.find((r) => r.name === 'Dealer Admin')
        this.dealerAdmin = role.id
      })
      .catch((err) => {
        this.$toast.error(this.$getErrorMessage(err))
      })
    this.$axios.$get(`lm/common/list-lead-status`).then(({ data }) => {
      this.leadStatusOptions = data
    })

    this.$axios
      .$post('user/rsm-list', {
        workspace_id: this.$route.params.workspace_id,
      })
      .then((data) => {
        this.rsmOption = data.data
        if (this.$_auth().user.lead.isRSM) {
          this.rsmOption = this.rsmOption.filter((e) => {
            return e.id === this.$auth.user.id
          })
        }
      })
      .catch((err) => {
        this.$toast.error(this.$getErrorMessage(err))
      })
  },
  mounted() {
    this.navigateLeadTab()
    document.addEventListener('change', this.changeAddressIfNotFound)
  },
  beforeDestroy() {
    setTimeout(() => {
      document.removeEventListener('change', this.changeAddressIfNotFound)
    }, 100)
  },
  methods: {
    imgUrl(v) {
      if (v instanceof File) return URL.createObjectURL(v)
      return v
    },
    getColumnFilters() {
      this.$axios
        .$get('/lm/dealership/list-column-header', {
          params: {
            dealership_id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          const leadSource = data.lead_source.map((e, i) => {
            return {
              id: i,
              text: e,
              isActive: false,
            }
          })
          const leadStatus = data.lead_status.map((e, i) => {
            return {
              id: e.id,
              text: e.status_name,
              isActive: false,
            }
          })
          const leadModels = data.model_name.map((e, i) => {
            return {
              id: e.product_id,
              text: e.product_name,
              isActive: false,
            }
          })
          this.filterData.lead_source = leadSource
          this.filterData.lead_status = leadStatus
          this.filterData.model_name = leadModels
        })
        .catch((err) => {
          console.log(err)
        })
    },
    removeImage() {
      // this.dealerImg = null
      // this.form.logo = null
      this.form.dealership_logo = null
    },
    cancelEdit() {
      this.form = { ...this.dealer }
      this.$refs.autocompleteRef.clear()
      this.$refs.autocompleteRef.autocompleteText = this.form.address_line_1
      this.$refs.editbox_ref.scrollTop = 0
    },
    handleSubmit() {
      this.$v.$touch()
      if (this.$v.form.$invalid) {
        return false
      }
      this.$store.dispatch('startOverlay')
      const formData = new FormData()
      Object.keys(this.form).forEach((e) => {
        if (typeof this.form[e] !== 'object' && e !== 'file') {
          formData.append(e, this.form[e])
        } else if (this.form[e] instanceof File) {
          formData.append('logo', this.form[e])
        }
      })
      if (this.form.dealership_logo === null) {
        formData.append('logo', null)
      }
      // console.log(this.form)
      formData.delete('dealership_products')
      formData.append(
        'dealership_products',
        JSON.stringify(this.form.dealership_products)
      )
      formData.delete('dealership_rsm_assign')
      formData.append(
        'rsm_assignment',
        JSON.stringify(this.form.dealership_rsm_assign)
      )
      this.$axios
        .$post('lm/dealership/add', formData)
        .then((response) => {
          this.$toast.global.success('Dealership has been updated successfully')
          this.getDealerInfo()
          this.$nextTick(() => {
            $('.dl-detail-left-fr').show()
            $('.dl-detail-left-bk').hide()
            $('.dl-detail-left a.dl-editicon').show()
            this.$refs.editbox_ref.scrollTop = 0
            this.$store.dispatch('stopOverlay')
          })
        })
        .catch((err) => {
          this.$store.dispatch('stopOverlay')
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    changeAddressIfNotFound() {
      if (this.$refs.autocompleteRef.autocompleteText) {
        this.form.address_line_1 = this.$refs.autocompleteRef.autocompleteText
      } else {
        this.form.address_line_1 = ''
      }
    },
    getAddressData(data) {
      this.form.address_line_1 = ''
      let street = ''
      let route = ''
      if (data.street_number) street += data.street_number + ' '
      if (data.route) {
        route += data.route
      }
      this.form.zip_code = data.postal_code ? data.postal_code : ''
      const address = street + route
      this.form.address_line_1 = address
    },
    onImageUpload(obj) {
      // this.dealerImg = obj.imageURL
      this.form.dealership_logo = obj.imageFile
    },

    navigateLeadTab() {
      const { leads } = this.$route.query
      if (leads) {
        this.$refs.leadtab.click()
      }
    },
    getDealerInfo() {
      this.dealerLoading = true
      this.$axios
        .$get(`/lm/dealership/view`, {
          params: {
            id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.dealer = data
          // deep cloning the same object
          this.form = clone(data)
          // this.dealerImg = data.dealership_logo
          this.products = data.dealership_products.map((p) => p.product_id)
          this.rsm_assigned = data.dealership_rsm_assign.map((rsm) => {
            return { product_id: rsm.product_id, rsm_id: rsm.rsm_user_id }
          })
        })
        .finally(() => {
          this.dealerLoading = false
        })
    },
    closeEditUserForm(user) {
      user.isEditing = false
    },
    async userVerification(params) {
      // resend multiple user invitation
      const wsId = this.$route.params.workspace_id
      try {
        const { message } = await this.$axios.$post(
          `/lm/dealership/user/resend-invite-people?url_workspace_id=${wsId}`,
          {
            workspace_id: wsId,
            user_id: params
              ? [params.user_id]
              : this.selections.map(({ user_id }) => user_id),
          }
        )
        if (!params) {
          this.users.forEach((ev) => (ev.selected = false))
        }
        this.$toast.success(message)
      } catch (error) {
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    closeForm() {
      this.user = this.newUser()
      this.showUserForm = false
      this.showEditUserForm = false
      this.$v.user.$reset()
    },
    addUser() {
      this.$v.user.$touch()

      if (!this.$v.user.$invalid) {
        this.addUserLoading = true
        this.$axios
          .$post('/lm/dealership/user/invite-people', this.user)
          .then((r) => {
            // const status = { invitation_status: true }
            // Object.assign(r.data, status)
            // this.users.unshift(r.data)
            this.loadUserData()
            this.$toast.success(r.message)
            this.user = this.newUser()
            this.$v.user.$reset()
            this.addUserLoading = false
            this.showUserForm = false
          })
          .catch((err) => {
            this.$toast.error(this.$getErrorMessage(err))
            this.addUserLoading = false
          })
      }
    },
    addToPrimary(uid) {
      this.$axios
        .$post('/lm/dealership/user/change-primary-contact', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: uid,
        })
        .then((r) => {
          this.users.forEach((u) => (u.is_primary_contact = false))
          const i = this.users.findIndex((u) => u.id === uid)
          if (r.data.is_primary_contact === false) {
            this.users[i].is_primary_contact = false
            this.$toast.success('Primary contact removed successfully')
          } else {
            this.users[i].is_primary_contact = true
            this.$toast.success(r.message)
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    toggleUserProperty(e, p, uid) {
      this.$axios
        .$post('/lm/dealership/user/update-with-field', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: uid,
          field_name: p,
          field_value: e.target.checked.toString(),
        })
        .then((r) => {
          this.$toast.success(r.message)
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    setEditUser(user) {
      this.users.forEach((user) => (user.isEditing = false))
      user.isEditing = true
    },
    loadModels() {
      this.$axios
        .$get(`/lm/category/list-category-with-products`)
        .then(({ data }) => {
          this.models = data.filter((m) => m.product.length)
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    toggleProduct(e, pid) {
      if (e.target.checked) {
        this.products.push(pid)
        this.addProduct(pid)
        this.assignmentMessage = 'Product has been added into dealership'
      } else {
        this.assignmentMessage = ''
        this.removeProduct(pid)
      }
    },
    addProduct(pid) {
      this.rsm_assignment = this.rsm_assignment.filter(
        (rsm) => rsm.product_id === pid
      )
      this.$axios
        .$post('/lm/dealership/add-dealership-product', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          product_id: pid,
          rsm_assignment: this.rsm_assignment.length
            ? JSON.stringify(this.rsm_assignment)
            : '',
        })
        .then((r) => {
          this.products.push(pid)
          this.$toast.success(this.assignmentMessage)
          this.getDealerInfo()
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    selectRSM(rsms, category_id, product_id) {
      const romove_ids = []
      const romove_ids1 = []
      rsms.forEach((rsm_id) => {
        if (
          !this.rsm_assigned.some(
            (a) => a.rsm_id === rsm_id && a.product_id === product_id
          )
        ) {
          this.rsm_assigned.push({ rsm_id, product_id })
          this.rsm_assignment.push({ rsm_id, category_id, product_id })
        }
      })

      this.rsm_assigned.forEach((rsm, i) => {
        if (rsm.product_id === product_id && !rsms.includes(rsm.rsm_id))
          romove_ids.push(i)
      })
      this.rsm_assignment.forEach((rsm, i) => {
        if (rsm.product_id === product_id && !rsms.includes(rsm.rsm_id))
          romove_ids1.push(i)
      })
      romove_ids.forEach((i) => {
        this.rsm_assigned.splice(i, 1)
      })
      romove_ids1.forEach((i) => {
        this.rsm_assignment.splice(i, 1)
      })
      this.addProduct(product_id)
      this.assignmentMessage = 'RSM has been updated'
    },
    updateUser(user) {
      this.addUserLoading = true
      this.$axios
        .$post('/lm/dealership/user/update', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          designation: user.designation,
          role: user.role,
        })
        .then((r) => {
          this.addUserLoading = false
          const i = this.users.findIndex((u) => u.user_id === user.user_id)
          this.users.splice(i, 1, user)
          user.isEditing = false
          this.$toast.success(r.message)
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
          this.addUserLoading = false
        })
    },
    deleteUser(u) {
      this.$axios
        .$post('/lm/dealership/user/delete', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          dealer_user_id: u.user_id,
        })
        .then((r) => {
          const i = this.users.findIndex((usr) => u.user_id === usr.user_id)
          this.users.splice(i, 1)
          this.$toast.success(r.message)
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    removeProduct(pid) {
      this.$axios
        .$post('/lm/dealership/remove-dealership-product', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          product_id: pid,
        })
        .then((r) => {
          const i = this.products.findIndex((p) => p === pid)
          this.products.splice(i, 1)
          this.$toast.success(r.message)
          this.getDealerInfo()
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    newNote() {
      this.showNote = false
    },
    hideAddNewNote() {
      this.showNote = true
      this.$v.note.$reset()
    },
    addNote(annotation = false) {
      if (annotation && !this.note) return
      this.$v.note.$touch()
      if (this.$v.note.$invalid) {
        return false
      }
      this.$axios
        .$post('/lm/dealership/notes/add', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.dealer.id,
          note: this.note,
        })
        .then((r) => {
          this.note = ''
          this.$refs.addNoteRef.$v.note.$reset()
          this.$refs.addNoteRef.note = ''
          if (this.notes.length) {
            this.notes.unshift(r.data)
            this.$toast.success(r.message)
            this.viewNote(this.notes[0])
          } else {
            this.notesPage = 0
            this.notesInfiniteId += 1
          }
          this.hideAddNewNote()
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    addLeadNote(note, lead_id) {
      if (!note) {
        return false
      }
      this.$axios
        .$post('/lm/leads/notes/add', {
          workspace_id: this.$route.params.workspace_id,
          lead_id,
          note,
        })
        .then((response) => {
          this.$toast.success(response.message)
          this.annotation = ''
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    loadNotes() {
      this.notesLoaded = true
      this.notes = []
      this.notesPage = 0
      this.notesInfiniteId += 1
    },
    handleFilterChange() {
      this.leadsLoaded = true
      this.leads = []
      this.leadsPage = 0
      this.leadInfiniteId += 1
    },
    loadLeads() {
      this.leadsLoaded = true
      this.leads = []
      this.leadsPage = 0
      this.leadInfiniteId += 1
    },
    leadsInfiniteHandler($state) {
      this.isLoading = true
      this.leadsPage += 1
      const filterData = {
        product_id: [],
        lead_source: [],
        status: [],
      }
      if (this.filterPayload.modelIds.length) {
        filterData.product_id = this.filterPayload.modelIds
      } else {
        delete filterData.product_id
      }
      if (this.filterPayload.sourceIds.length) {
        filterData.lead_source = this.filterPayload.sourceIds
      } else {
        delete filterData.lead_source
      }
      if (this.filterPayload.statusIds.length) {
        filterData.status = this.filterPayload.statusIds
      } else {
        delete filterData.status
      }

      this.$axios
        .$post(
          '/lm/dealership/leads/list',
          Object.keys(filterData).length && filterData,
          {
            params: {
              workspace_id: this.$route.params.workspace_id,
              dealership_id: this.$route.params.id,
              page: this.leadsPage,
              sortvalue: this.leadSortBy,
              orderby: this.leadOrder,
            },
          }
        )
        .then(({ data }) => {
          if (
            data.leadList &&
            data.leadList.length &&
            this.leadsPage === data.current_page
          ) {
            this.leads.push(...data.leadList)
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
          this.isLoading = false
        })
        .catch((e) => {
          $state.error(e)
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    notesInfiniteHandler($state) {
      this.notesPage += 1
      this.$axios
        .$get('/lm/dealership/notes/list', {
          params: {
            workspace_id: this.$route.params.workspace_id,
            dealership_id: this.dealer.id,
            page: this.notesPage,
          },
        })
        .then(({ data }) => {
          if (
            data.notesList &&
            data.notesList.length &&
            this.notesPage === data.current_page
          ) {
            this.notes.push(...data.notesList)
            if (this.notesPage === 1) this.viewedNote = this.notes[0]
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((e) => {
          $state.error(e)
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    userInfiniteHandler($state) {
      this.isLoading = true
      this.usersPage += 1
      this.$axios
        .$get(
          `lm/dealership/user/list`,

          {
            params: {
              dealership_id: this.$route.params.id,
              page: this.usersPage,
              orderby: this.userSortOrder,
              sortvalue: this.userSortValue,
            },
          }
        )
        .then(({ data }) => {
          data.userList.forEach((ev) => (ev.selected = false))
          data.userList.forEach((ev) => (ev.isEditing = false))
          if (
            data.userList &&
            data.userList.length &&
            this.usersPage === data.current_page
          ) {
            this.users.push(...data.userList)
            $state.loaded()
            this.isLoading = false
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((e) => {
          $state.error(e)
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    viewNote(note) {
      this.viewedNote = note
      this.showNote = true
    },

    newUser() {
      return {
        name: '',
        phone: '',
        email: '',
        role: '',
        designation: '',
        workspace_id: this.$route.params.workspace_id,
        dealership_id: this.$route.params.id,
        is_lead_assign: 1,
      }
    },
    changeLeadStatus(lead, product) {
      this.$axios
        .$post('lm/leads/update-status', {
          workspace_id: this.$route.params.workspace_id,
          lead_id: lead.lead_id,
          lead_status: product.lead_status,
          product_id: product.product_id,
          dealership_id: product.dealership_id,
        })
        .then((response) => {
          if (response) {
            if (response.error.length <= 0) {
              this.$toast.success('Lead status changed successfully')
            } else {
              for (const err of response.error) {
                this.$toast.error(err)
              }
            }
          } else {
            this.$toast.error('Something went wrong.')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    addLeadFavourite(lead) {
      this.$axios
        .$post('lm/leads/add-lead-favourite', {
          workspace_id: this.$route.params.workspace_id,
          lead_id: lead.lead_id,
          user_id: this.$auth.user.id,
          is_favourite: !lead.is_favourite,
        })
        .then((response) => {
          if (response) {
            if (response.error.length <= 0) {
              lead.is_favourite = !lead.is_favourite
            } else {
              for (const err of response.error) {
                this.$toast.error(err)
              }
            }
          } else {
            this.$toast.error('Something went wrong.')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    // addLeadRead(lead) {
    //   this.$axios
    //     .$post('lm/leads/add-lead-read', {
    //       workspace_id: this.$route.params.workspace_id,
    //       lead_id: lead.lead_id,
    //       user_id: this.$auth.user.id,
    //       is_read: !lead.is_read,
    //     })
    //     .then((response) => {
    //       if (response) {
    //         if (response.error.length <= 0) {
    //           lead.is_read = !lead.is_read
    //         } else {
    //           for (const err of response.error) {
    //             this.$toast.error(err)
    //           }
    //         }
    //       } else {
    //         this.$toast.error('Something went wrong.')
    //       }
    //     })
    //     .catch((err) => {
    //       this.$toast.error(this.$getErrorMessage(err))
    //     })
    // },
    toggleLeadSortData(table) {
      if (this.isLoading) return
      if (this.leadSortBy !== table) {
        this.leadSortBy = table
        this.leadOrder = 'DESC'
      } else {
        this.leadOrder = this.leadOrder === 'ASC' ? 'DESC' : 'ASC'
      }
      this.leadsPage = 0
      this.leads = []
      this.leadInfiniteId += 1
    },
    toggleUserSort(data) {
      // then assign that value
      if (this.isLoading) return
      if (this.userSortValue !== data) {
        this.userSortValue = data
        this.userSortOrder = 'ASC'
      } else {
        // else check is sort order is asc or desc if asc then make desc vice versa
        this.userSortOrder = this.userSortOrder === 'ASC' ? 'DESC' : 'ASC'
      }
      this.loadUserData()
    },
    loadUserData() {
      this.usersPage = 0
      this.users = []
      this.userInfiniteId = new Date()
    },
    loadPreferences() {
      this.$axios
        .$get(
          `/lm/dealership/communication-preferences/list`,

          {
            params: {
              dealership_id: this.$route.params.id,
            },
          }
        )
        .then(({ data }) => {
          this.preferences = data
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    // implement resend invitation for dealer
    resendDealerVerification() {
      // extracting workspace_id and dealerId for sending verification
      const workspaceId = this.$route.params.workspace_id
      const dealerId = this.$route.params.id
      const url = `/lm/dealership/dealership-reinvite`
      // Resend verification api for dealer
      this.$axios
        .$get(url, {
          params: {
            url_workspace_id: workspaceId,
            id: dealerId,
          },
        })
        .then(({ message }) => {
          this.$toast.success(message)
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    togglePreference(pid, e) {
      const action = e.target.checked ? 'add' : 'update'
      this.$axios
        .$post(
          `/lm/dealership/communication-preferences/${action}`,

          {
            dealership_id: this.$route.params.id,
            communication_preferences_id: pid,
          }
        )
        .then(({ message }) => {
          action === 'update'
            ? this.$toast.success(
                'Dealership communication preferences removed successfully'
              )
            : this.$toast.success(message)
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
  },
  validations() {
    return {
      note: { required },
      user: {
        name: { required },
        email: { required, email },
        role: { required },
        designation: { required },
      },
      form: {
        dealership_number: { required },
        dealership_name: { required },
        email: { required, email },
        phone: {
          maxLength: maxLength(20),
        },
        office_phone: {
          maxLength: maxLength(20),
        },
        address_line_1: { required },
        zip_code: { required },
        city: { required },
        state: { required },
        country: { required },
      },
    }
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
.check-label > .check-span.disabled {
  cursor: not-allowed;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
