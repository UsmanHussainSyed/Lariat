<template>
  <div class="body-content">
    <div class="body-content-auto w-100">
      <div
        class="common-box-header d-flex align-items-center justify-content-center"
      >
        <h2>Add Lead</h2>
      </div>
      <div class="common-box p0">
        <div
          class="row no-gutters d-flex align-items-center justify-content-center h-100"
        >
          <div class="col-lg-9 h-100">
            <div class="stepsFromBox">
              <div class="stepsFromList">
                <ul class="multiStepFrom">
                  <li
                    :class="{
                      active: selectedTabList.includes('personal_details'),
                    }"
                    style="width: 33.3333%"
                  >
                    <a
                      href="javascript:void(0);"
                      @click="addSelectedTab('personal_details')"
                    >
                      <span>Personal Details</span>
                    </a>
                  </li>
                  <li
                    :class="{
                      active: selectedTabList.includes('contact_details'),
                    }"
                    style="width: 33.3333%"
                  >
                    <a
                      href="javascript:void(0);"
                      @click="
                        addSelectedTab(
                          ['personal_details', 'contact_details'],
                          'contact_details'
                        )
                      "
                    >
                      <span>Contact Details</span>
                    </a>
                  </li>
                  <li
                    :class="{
                      active: selectedTabList.includes('rv_details'),
                    }"
                    style="width: 33.3333%"
                  >
                    <a
                      href="javascript:void(0);"
                      @click="
                        addSelectedTab(
                          ['personal_details', 'contact_details', 'rv_details'],
                          'rv_details'
                        )
                      "
                    >
                      <span>Product Assignment</span>
                    </a>
                  </li>
                </ul>
                <div
                  ref="customscrollbar"
                  class="stepContentGroup customscrollbar"
                >
                  <div
                    class="stepContent"
                    style="position: relative"
                    :style="
                      currentTab === 'personal_details'
                        ? 'opacity: 1' && 'display: block'
                        : 'opacity: 0; display: none'
                    "
                  >
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <div class="img-upload imgwidth-input">
                            <div class="img-upload-img">
                              <div class="v-center">
                                <img
                                  v-if="lead.logo"
                                  :src="lead.logo | imgUrl"
                                  alt=""
                                />
                                <img
                                  v-else
                                  :src="require('assets/img/icon/add-user.svg')"
                                  alt=""
                                />
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
                                    ref="leadImageInput"
                                    type="file"
                                    accept="image/*"
                                    @change="addImage($event)"
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
                        <text-field
                          v-model="lead.first_name"
                          label="First name"
                          placeholder="First name"
                          :v="$v.lead.first_name"
                          required
                        ></text-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <text-field
                          v-model="lead.last_name"
                          label="Last name"
                          placeholder="Last name"
                          :v="$v.lead.last_name"
                          required
                        ></text-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <text-field
                          v-model="lead.email"
                          label="Email address"
                          type="email"
                          placeholder="Email address"
                          :v="$v.lead.email"
                          required
                          @input="validateEmail"
                        ></text-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <text-field
                          v-model="lead.phone"
                          label="Contact Number"
                          placeholder="Contact number"
                          :v="$v.lead.phone"
                        ></text-field>
                      </div>
                    </div>
                    <a
                      href="javascript:void(0);"
                      class="btn next"
                      @click="handleNext('contact_details')"
                      >Next</a
                    >
                  </div>
                  <div
                    ref="contact_details"
                    class="stepContent"
                    style="position: relative"
                    :style="
                      currentTab === 'contact_details'
                        ? 'opacity: 1' && 'display: block'
                        : 'opacity: 0; display: none'
                    "
                  >
                    <div class="sc_nav_section">
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group required w-100">
                            <label class="control-label">Address Line 1</label>
                            <client-only>
                              <vue-google-autocomplete
                                id="address"
                                ref="autocompleteRef"
                                classname="form-control"
                                placeholder="Address line 1"
                                :country="['us', 'ca', 'aus']"
                                @placechanged="getAddressData"
                              >
                              </vue-google-autocomplete>
                            </client-only>
                            <div
                              v-if="
                                $v.address_line_1.$error &&
                                !$v.address_line_1.required
                              "
                              class="input-error"
                            >
                              Address lline 1 is required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <text-field
                            v-model="lead.address_line_2"
                            label="Address Line 2"
                            placeholder="Address line 2"
                            :v="$v.lead.address_line_2"
                          ></text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <text-field
                            v-model="lead.city"
                            label="City"
                            placeholder="Please enter city"
                            :v="$v.lead.city"
                          ></text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <text-field
                            v-model="lead.state"
                            label="State"
                            placeholder="State"
                            :v="$v.lead.state"
                          ></text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <Select
                            v-model="lead.country"
                            :items="['United States', 'Canada']"
                            label="Country"
                            :select_first="false"
                            :v="$v.lead.country"
                          ></Select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <text-field
                            v-model="lead.zip_code"
                            label="Zip Code"
                            placeholder="Zip-code"
                            :v="$v.lead.zip_code"
                          ></text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group mb10">
                            <label class="check-label"
                              >Qualified Lead
                              <input
                                v-model="isQualifiedLead"
                                type="checkbox"
                                name=""
                                checked=""
                              />
                              <span class="check-span"></span>
                            </label>
                          </div>
                          <text-field
                            v-if="isQualifiedLead"
                            v-model="lead.qualify_note"
                            label="Remarks"
                            placeholder="Qualification note here..."
                            :textarea="true"
                            :rows="4"
                            :cols="4"
                          ></text-field>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label class="control-label">Lead Score</label>
                            <div class="radio-group">
                              <label class="radio-label text-center">
                                <input
                                  v-model="lead.lead_score"
                                  type="radio"
                                  :value="80"
                                  name="lead-score"
                                />
                                <span
                                  >Hot <br />
                                  <svg
                                    id="Layer_1"
                                    class="hot-icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 25.9 18"
                                    xml:space="preserve"
                                  >
                                    <g
                                      id="Group_4462"
                                      transform="translate(-225 -420)"
                                    >
                                      <rect
                                        id="Rectangle_2994"
                                        x="229"
                                        y="420"
                                        class="fill-hide"
                                        width="18"
                                        height="18"
                                      ></rect>
                                      <g
                                        id="Group_4426"
                                        transform="translate(-135.907 -239.971)"
                                      >
                                        <path
                                          id="Path_3529"
                                          class="fill-color"
                                          d="M361.5,663.3c-0.4-0.1-0.6-0.4-0.6-0.8c0.1-0.3,0.3-0.5,0.6-0.6h24.7c0.4,0.1,0.6,0.4,0.6,0.8c-0.1,0.3-0.3,0.5-0.6,0.6H361.5z"
                                        ></path>
                                        <path
                                          id="Path_3530"
                                          class="fill-color"
                                          d="M373.8,669.1c-3.7,0-6.8-2.9-7-6.6h1.4c0.2,3.1,2.9,5.4,6,5.2c2.8-0.2,5-2.4,5.2-5.2h1.4C380.6,666.2,377.5,669.1,373.8,669.1z"
                                        ></path>
                                        <path
                                          id="Path_3531"
                                          class="fill-color"
                                          d="M373.7,676c-0.4,0-0.7-0.3-0.7-0.7v-3c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7v3C374.4,675.7,374.1,676,373.7,676z"
                                        ></path>
                                        <path
                                          id="Path_3532"
                                          class="fill-color"
                                          d="M383.8,671.5c-0.2,0-0.3-0.1-0.5-0.2l-2.1-2.1c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0l0,0l2.1,2.1c0.3,0.3,0.3,0.7,0,1C384.2,671.5,384,671.5,383.8,671.5z"
                                        ></path>
                                        <path
                                          id="Path_3533"
                                          class="fill-color"
                                          d="M363.9,671.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.2,0.1-0.4,0.2-0.5l2.1-2.1c0.3-0.3,0.7-0.2,1,0.1c0.2,0.3,0.2,0.7,0,0.9l-2.1,2.1C364.2,671.5,364,671.5,363.9,671.5L363.9,671.5z"
                                        ></path>
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                <span class="radio-span"></span>
                              </label>
                              <label class="radio-label text-center">
                                <input
                                  v-model="lead.lead_score"
                                  type="radio"
                                  name="lead-score"
                                  checked=""
                                  :value="45"
                                />
                                <span
                                  >Warm <br />
                                  <svg
                                    id="Layer_1"
                                    class="warm-icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 25.9 18"
                                    xml:space="preserve"
                                  >
                                    <g
                                      id="Group_4462"
                                      transform="translate(-225 -420)"
                                    >
                                      <rect
                                        id="Rectangle_2994"
                                        x="229"
                                        y="420"
                                        class="fill-hide"
                                        width="18"
                                        height="18"
                                      ></rect>
                                      <g
                                        id="Group_4426"
                                        transform="translate(-135.907 -239.971)"
                                      >
                                        <path
                                          id="Path_3529"
                                          class="fill-color"
                                          d="M361.5,663.3c-0.4-0.1-0.6-0.4-0.6-0.8c0.1-0.3,0.3-0.5,0.6-0.6h24.7c0.4,0.1,0.6,0.4,0.6,0.8c-0.1,0.3-0.3,0.5-0.6,0.6H361.5z"
                                        ></path>
                                        <path
                                          id="Path_3530"
                                          class="fill-color"
                                          d="M373.8,669.1c-3.7,0-6.8-2.9-7-6.6h1.4c0.2,3.1,2.9,5.4,6,5.2c2.8-0.2,5-2.4,5.2-5.2h1.4C380.6,666.2,377.5,669.1,373.8,669.1z"
                                        ></path>
                                        <path
                                          id="Path_3531"
                                          class="fill-color"
                                          d="M373.7,676c-0.4,0-0.7-0.3-0.7-0.7v-3c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7v3C374.4,675.7,374.1,676,373.7,676z"
                                        ></path>
                                        <path
                                          id="Path_3532"
                                          class="fill-color"
                                          d="M383.8,671.5c-0.2,0-0.3-0.1-0.5-0.2l-2.1-2.1c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0l0,0l2.1,2.1c0.3,0.3,0.3,0.7,0,1C384.2,671.5,384,671.5,383.8,671.5z"
                                        ></path>
                                        <path
                                          id="Path_3533"
                                          class="fill-color"
                                          d="M363.9,671.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.2,0.1-0.4,0.2-0.5l2.1-2.1c0.3-0.3,0.7-0.2,1,0.1c0.2,0.3,0.2,0.7,0,0.9l-2.1,2.1C364.2,671.5,364,671.5,363.9,671.5L363.9,671.5z"
                                        ></path>
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                <span class="radio-span"></span>
                              </label>
                              <label class="radio-label text-center">
                                <input
                                  v-model="lead.lead_score"
                                  type="radio"
                                  name="lead-score"
                                  :value="15"
                                />
                                <span
                                  >Cold <br />
                                  <svg
                                    id="Layer_1"
                                    class="cold-icon"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 29.9 18"
                                    xml:space="preserve"
                                  >
                                    <g
                                      id="Group_4464"
                                      transform="translate(-223 -466)"
                                    >
                                      <rect
                                        id="Rectangle_3002"
                                        x="229"
                                        y="466"
                                        class="fill-hide"
                                        width="18"
                                        height="18"
                                      ></rect>
                                      <path
                                        id="Path_3539"
                                        class="fill-color"
                                        d="M229.9,481.3l2-3.5l-3,0.8l-0.4-1.4l4.4-1.2l3.8-6.7h-7.7l-3.2,3.2l-1-1l2.2-2.2H223V468h29.9v1.4h-4l2.2,2.2l-1,1l-3.2-3.2h-7.7l3.8,6.7l4.4,1.2l-0.4,1.4l-3-0.8l2,3.5l-1.2,0.7l-2-3.5l-0.8,3l-1.4-0.4l1.2-4.4l-3.9-6.6l-3.8,6.7l1.2,4.4l-1.4,0.4l-0.8-3l-2,3.5L229.9,481.3z"
                                      ></path>
                                    </g>
                                  </svg>
                                </span>
                                <span class="radio-span"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label class="control-label"
                              >Communication Preference</label
                            >
                            <div class="check-group">
                              <label class="check-label">
                                Email
                                <input
                                  v-model="lead.is_communication_email"
                                  type="checkbox"
                                  name="preference"
                                  checked=""
                                />
                                <span class="check-span"></span>
                              </label>
                              <label class="check-label">
                                Text
                                <input
                                  v-model="lead.is_communication_text"
                                  type="checkbox"
                                  name="preference"
                                />
                                <span class="check-span"></span>
                              </label>
                              <label class="check-label">
                                Phone
                                <input
                                  v-model="lead.is_communication_phone"
                                  type="checkbox"
                                  name="preference"
                                />
                                <span class="check-span"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label class="control-label">Product Owner</label>
                            <div class="radio-group">
                              <label class="radio-label">
                                Yes
                                <input
                                  v-model="lead.is_current_owner"
                                  type="radio"
                                  name="owner"
                                  checked=""
                                  :value="1"
                                />
                                <span class="radio-span"></span>
                              </label>
                              <label class="radio-label">
                                No
                                <input
                                  v-model="lead.is_current_owner"
                                  type="radio"
                                  name="owner"
                                  :value="0"
                                />
                                <span class="radio-span"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <label class="control-label">Notes</label>
                            <textarea
                              v-model="lead.lead_note"
                              class="form-control"
                              rows="8"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      href="javascript:void(0);"
                      class="btn btn-gray previous"
                      @click="handlePrevious('personal_details')"
                      >Previous</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="btn next"
                      @click="handleNext('rv_details')"
                      >Next</a
                    >
                  </div>
                  <div
                    class="stepContent"
                    style="position: relative"
                    :style="
                      currentTab === 'rv_details'
                        ? 'opacity: 1' && 'display: block'
                        : 'opacity: 0; display: none'
                    "
                  >
                    <!-- No Data Select Start -->
                    <div ref="rv_details" class="table-list-view">
                      <div class="sc_nav_section">
                        <h5 class="mb1">Product Assignment</h5>
                        <div v-if="lead.products.length" class="box mb10">
                          <div
                            v-for="(p, pindex) in lead.products"
                            :key="p.product_id"
                            class="row dealer-contact-col"
                          >
                            <div class="col-lg-3">
                              <div class="media sc_media mb1">
                                <div class="media-body align-self-center">
                                  <h5>PRODUCT</h5>
                                  <p>{{ p.product_name }}</p>
                                </div>
                              </div>
                            </div>
                            <div
                              v-for="v in getSavedVariantList(p)"
                              :key="v.id"
                              class="col-lg-3"
                            >
                              <div class="media sc_media mb1">
                                <div
                                  v-if="v.variant_display_options.savedOption"
                                  class="media-body align-self-center"
                                >
                                  <h5 style="text-transform: uppercase">
                                    {{ v.variant_name }}
                                  </h5>
                                  <p>
                                    {{ v.variant_display_options.savedOption }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="media sc_media mb1">
                                <div class="media-body align-self-center">
                                  <h5>DEALER</h5>
                                  <p>
                                    {{ dealershipName(p.dealership_id) || '-' }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <a
                              href="javascript:void(0);"
                              class="close-assign"
                              @click="removeAssignment(pindex)"
                            >
                              <svg focusable="false" viewBox="0 0 32 32">
                                <path
                                  d="M18.1,16L27,7.1c0.6-0.6,0.6-1.5,0-2.1s-1.5-0.6-2.1,0L16,13.9l-8.9-9C6.5,4.3,5.6,4.3,5,4.9S4.4,6.4,5,7l8.9,8.9L5,24.8c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"
                                ></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div class="box mb2">
                          <div class="rv-detail-form">
                            <div class="row align-items-end">
                              <div class="col-md-4">
                                <Select
                                  v-model="product"
                                  label="Product"
                                  :items="products"
                                  :select_first="false"
                                  item_text="name"
                                  item_value="id"
                                  return_object
                                ></Select>
                              </div>
                              <div
                                v-for="v in variants"
                                :key="v.id"
                                class="col-md-4 mst-1"
                              >
                                <Select
                                  v-if="v.variant_display_options.isDropdown"
                                  v-once
                                  v-model="
                                    v.variant_display_options.savedOption
                                  "
                                  :label="v.variant_name"
                                  :items="v.variant_display_options.options"
                                  :select_first="false"
                                  item_text="name"
                                  item_value="id"
                                ></Select>
                                <!-- <Select
                                  v-model="selectedVariantOptions[i]"
                                  :label="v.variant_name"
                                  :items="v.product_variant_options"
                                  :select_first="false"
                                  item_text="option_name"
                                  item_value="id"
                                  return_object
                                  @input="selectVariant($event)"
                                ></Select> -->
                              </div>
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label class="control-label"
                                    >Lead Source</label
                                  >
                                  <div class="inline-radio">
                                    <label class="radio-label">
                                      <input
                                        v-model="leadProduct.lead_source"
                                        type="radio"
                                        value="Web"
                                        name="lead-source"
                                      />
                                      <span>
                                        <svg
                                          id="Layer_1"
                                          class="web-icon"
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
                                        Web</span
                                      >
                                      <span class="radio-span"></span>
                                    </label>
                                    <label class="radio-label">
                                      <input
                                        v-model="leadProduct.lead_source"
                                        type="radio"
                                        value="Phone"
                                        name="lead-source"
                                        checked=""
                                      />
                                      <span>
                                        <svg
                                          id="Layer_1"
                                          class="phone-icon"
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

                                        Phone</span
                                      >
                                      <span class="radio-span"></span>
                                    </label>
                                    <label class="radio-label">
                                      <input
                                        v-model="leadProduct.lead_source"
                                        type="radio"
                                        value="Event"
                                        name="lead-source"
                                        checked=""
                                      />
                                      <span>
                                        <svg
                                          id="Layer_1"
                                          class="event-icon"
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
                                            />
                                            <path
                                              id="Path_3524"
                                              class="fill-color"
                                              d="M1055,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1055.8,663.1,1055.5,663.4,1055,663.4z"
                                            />
                                            <path
                                              id="Path_3525"
                                              class="fill-color"
                                              d="M1047.7,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1048.5,663.1,1048.1,663.4,1047.7,663.4z"
                                            />
                                            <g id="Group_4420">
                                              <path
                                                id="Path_3526"
                                                class="fill-color"
                                                d="M1049.7,672.5l-3.2-3.2c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l2.2,2.2l5.5-5.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1L1049.7,672.5z"
                                              />
                                            </g>
                                          </g>
                                        </svg>

                                        Event</span
                                      >
                                      <span class="radio-span"></span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h5 class="mb1">Assign Dealer/RSM</h5>
                        <div class="dlrsm-search mb10">
                          <svg
                            id="Layer_1"
                            class="search-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <path
                              id="Icon_ionic-ios-search"
                              class="fill-color"
                              d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
                            ></path>
                          </svg>
                          <input
                            v-model="searchTerm"
                            type="text"
                            name="dlrsm-search"
                            class="form-control"
                            placeholder="Search Dealer/RSM"
                            :disabled="!product"
                          />
                        </div>
                        <div class="box mb10">
                          <div class="box-title bg-gray-light">
                            <h5>Dealers</h5>
                          </div>
                          <ul class="thead">
                            <li>
                              <div class="sorting sortarrow flex30">
                                <span
                                  :class="[
                                    dealershipOrderBy === 'dealership_name' &&
                                    dealershipOrder === 'DESC'
                                      ? 'active descending'
                                      : '',
                                  ]"
                                  @click="sortDealers('dealership_name')"
                                  >Dealer Name</span
                                >
                              </div>
                              <div class="sorting flex20">
                                <span>City</span>
                              </div>
                              <div class="sorting sortarrow flex15">
                                <span
                                  :class="[
                                    dealershipOrderBy === 'distance' &&
                                    dealershipOrder === 'DESC'
                                      ? 'active descending'
                                      : '',
                                  ]"
                                  @click="sortDealers('distance')"
                                  >Distance</span
                                >
                              </div>
                              <div class="sorting flex17">
                                <span>Time</span>
                              </div>
                              <div class="sorting flex10">
                                <span>Last Lead</span>
                              </div>
                              <div class="sorting flex8">
                                <span>&nbsp;</span>
                              </div>
                            </li>
                          </ul>
                          <ul v-if="!isDealerLoading" class="tbody">
                            <li v-for="d in dealerships" :key="d.id">
                              <div class="tb-column flex30">
                                <div class="media">
                                  <div class="media-left p0">
                                    <div
                                      v-if="d.dealership_logo"
                                      v-tooltip="{
                                        html: false,
                                        content: d.dealership_name,
                                      }"
                                      class="profile-bg"
                                      :style="{
                                        backgroundImage: `url(${d.dealership_logo})`,
                                      }"
                                    ></div>

                                    <div
                                      v-else
                                      v-tooltip="{
                                        html: false,
                                        content: d.dealership_name,
                                      }"
                                      class="profile-char"
                                    >
                                      {{
                                        d.dealership_name
                                          .charAt(0)
                                          .toUpperCase()
                                      }}
                                    </div>
                                  </div>
                                  <div class="media-body">
                                    <div class="top-column">
                                      <label class="table-a">{{
                                        d.dealership_name
                                      }}</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="tb-column flex20">
                                <div class="top-column">
                                  <label>{{ d.city }}</label>
                                </div>
                              </div>
                              <div class="tb-column flex15">
                                <div class="top-column">
                                  <label>{{ d.distance }}</label>
                                </div>
                              </div>
                              <div class="tb-column flex17">
                                <div class="top-column">
                                  <label>{{ d.time }}</label>
                                </div>
                              </div>
                              <div class="tb-column flex10">
                                <div class="top-column">
                                  <label v-if="d.lead_assign_date"
                                    >{{
                                      d.lead_assign_date | leadDateFormatted
                                    }}&nbsp; &nbsp;
                                  </label>
                                  <label v-else> - </label>
                                </div>
                              </div>
                              <div class="tb-column flex8">
                                <div
                                  class="d-flex align-items-center justify-content-end"
                                >
                                  <label class="check-label">
                                    <input
                                      v-model="leadProduct.dealership_id"
                                      type="radio"
                                      :value="d.id"
                                      name="dealers"
                                      @click="handleRemove"
                                    />
                                    <span class="check-span"></span>
                                  </label>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="box mb2">
                          <div class="box-title bg-gray-light">
                            <h5>RSM</h5>
                          </div>
                          <ul class="thead">
                            <li>
                              <div class="sorting sortarrow flex30">
                                <span
                                  :class="[
                                    rsmOrderBy === 'DESC'
                                      ? 'active descending'
                                      : '',
                                  ]"
                                  @click="sortRsm"
                                  >RSM Name</span
                                >
                              </div>
                              <div class="sorting flex62">
                                <span>Designation</span>
                              </div>
                              <div class="sorting flex8">
                                <span>&nbsp;</span>
                              </div>
                            </li>
                          </ul>
                          <ul class="tbody">
                            <li v-for="rsm in rsms" :key="rsm.id">
                              <div class="tb-column flex30">
                                <div class="media">
                                  <div class="media-left p0">
                                    <div
                                      v-if="rsm.display_profile_image"
                                      v-tooltip="{
                                        html: false,
                                        content: rsm.name,
                                      }"
                                      class="profile-bg"
                                      :style="
                                        rsm.display_profile_image
                                          ? 'background-image: url(' +
                                            rsm.display_profile_image +
                                            ');'
                                          : ''
                                      "
                                    ></div>
                                    <div
                                      v-else
                                      v-tooltip="{
                                        html: false,
                                        content: rsm.name,
                                      }"
                                      class="profile-char"
                                    >
                                      {{ rsm.name.charAt(0).toUpperCase() }}
                                    </div>
                                  </div>
                                  <div class="media-body">
                                    <div class="top-column">
                                      <label class="table-a">{{
                                        rsm.name
                                      }}</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="tb-column flex62">
                                <div class="top-column">
                                  <span>RSM</span>
                                </div>
                              </div>
                              <div class="tb-column flex8">
                                <div
                                  class="d-flex align-items-center justify-content-end"
                                >
                                  <label class="check-label">
                                    <input
                                      v-model="leadProduct.rsm_user_id"
                                      type="checkbox"
                                      name=""
                                      :value="rsm.id"
                                    />
                                    <span class="check-span"></span>
                                  </label>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="row mb2">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <button
                                href="javascript:void(0);"
                                :disabled="!product"
                                class="btn"
                                :class="{ disabled: !product }"
                                @click="assignDealer()"
                              >
                                Assign
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      href="javascript:void(0);"
                      class="btn btn-gray previous"
                      @click="handlePrevious('contact_details')"
                      >Previous</a
                    >
                    <button
                      href="javascript:void(0);"
                      class="btn"
                      :disabled="loading"
                      @click="addLead()"
                    >
                      Add Lead
                    </button>
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
import { required, email } from 'vuelidate/lib/validators'
import _ from 'lodash'
import zipCode from '@/mixins/zipCode'
import lead from '~/mixins/lead'
import TextField from '~/components/lead/TextField.vue'
import Select from '~/components/lead/Select.vue'
// import FileDragAndDrop from '~/components/lead/FileDragAndDrop.vue'
import { _debounce } from '~/utils/helper'
export default {
  components: {
    TextField,
    Select,
    // FileDragAndDrop,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  mixins: [zipCode, lead],
  layout: 'leadLayout',
  middleware: ['authCheck', 'can-access-lead-module'],
  data() {
    return {
      isQualifiedLead: false,
      address_line_1: '',
      lead: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        zip_code: '',
        state: '',
        county: '',
        country: '',
        lead_score: 45,
        is_current_owner: 0,
        lead_note: '',
        is_communication_email: false,
        is_communication_phone: false,
        is_communication_text: false,
        dealership_id: [],
        products: [],
        rsm_user_id: [],
        logo: null,
        is_qualify: 0,
        qualify_note: '',
      },
      products: [],
      variants: [],
      selectedVariants: [],
      selectedVariantOptions: [],
      loading: false,
      leadProduct: this.newProduct(),
      product: null,
      rsms: [],
      dealerships: [],
      selectedDealerships: [],
      selectedFloorPlan: null,
      selectedColor: null,
      maxImages: 1,
      searchTerm: '',
      dealershipOrderBy: '',
      dealershipOrder: '',
      rsmOrderBy: 'ASC',
      currentTab: 'personal_details',
      selectedTabList: ['personal_details'],
      isDealerLoading: false,
      automatic_lead_assignment: 0,
    }
  },
  computed: {
    getSavedVariantList() {
      return (product) =>
        product.variant_options.filter(
          (vo) => vo.variant_display_options.savedOption
        )
    },
  },
  watch: {
    product: {
      handler() {
        if (this.product) {
          this.leadProduct.product_id = this.product.id
          this.leadProduct.category_id = this.product.category_id
          this.leadProduct.product_name = this.product.name
          this.leadProduct.variant_options = []

          this.$axios
            .$post(`lm/product/variant/get-by-product`, {
              workspace_id: this.$route.params.workspace_id,
              product_id: this.product.id,
            })
            .then(({ data }) => {
              this.selectedVariantOptions = []
              this.variants = data
            })

          this.loadDealerships()
        } else {
          this.dealerships = []
          this.rsms = []
          this.variants = []
          this.selectedVariantOptions = []
        }
      },
      deep: true,
    },
    searchTerm() {
      _debounce(() => {
        this.loadDealerships()
      }, 500)
    },
    'lead.zip_code': {
      handler() {
        if (this.product)
          _debounce(() => {
            this.loadDealerships()
          }, 1500)
      },
    },
    // 'leadProduct.dealership_id': {
    //   handler(v) {
    //     this.loadRSM(v)
    //   },
    // },
    isQualifiedLead() {
      this.lead.is_qualify = this.isQualifiedLead ? 1 : 0
    },
  },
  created() {
    this.$axios
      .$get(`lm/product/all-products`, {
        params: {
          url_workspace_id: this.$route.params.workspace_id,
        },
      })
      .then(({ data }) => {
        this.products = data
      })
  },
  mounted() {
    document.addEventListener('change', this.changeAddressIfNotFound)
    this.getWorkspaceDetail()
  },
  beforeDestroy() {
    setTimeout(() => {
      document.removeEventListener('change', this.changeAddressIfNotFound)
    }, 100)
  },
  methods: {
    async getWorkspaceDetail() {
      try {
        const { data } = await this.$axios.$get(
          `/view-workspace?workspace_id=${this.$getWorkspaceId()}`
        )
        this.automatic_lead_assignment = data.automatic_lead_assignment
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
    handlePrevious(prevTab) {
      this.selectedTabList.pop()
      this.currentTab = prevTab
      this.scrollToTop()
    },
    scrollToTop() {
      this.$refs.customscrollbar.scrollTop = 0
    },
    handleNext(tabName) {
      if (tabName === 'contact_details') {
        // perform selection
        this.$v.lead.$touch()
        if (!this.$v.lead.$invalid) {
          this.selectionNext(tabName)
        }
      } else if (tabName === 'rv_details') {
        this.$v.address_line_1.$touch()
        if (!this.$v.address_line_1.$invalid) {
          // perform selection
          this.selectionNext(tabName)
        } else if (this.$v.address_line_1.$invalid) {
          this.scrollToTop()
        }
      } else {
        this.selectionNext(tabName)
      }
    },
    selectionNext(tabName) {
      if (!this.selectedTabList.includes(tabName)) {
        this.selectedTabList.push(tabName)
      }
      this.currentTab = tabName
      this.scrollToTop()
    },
    addSelectedTab(tabName, currentTab) {
      if (currentTab === 'contact_details') {
        this.$v.lead.$touch()
        if (!this.$v.lead.$invalid) {
          // perform selection
          this.selection(tabName, currentTab)
        }
      } else if (currentTab === 'rv_details') {
        this.$v.address_line_1.$touch()
        if (!this.$v.address_line_1.$invalid) {
          // perform selection
          this.selection(tabName, currentTab)
        }
      } else {
        this.selection(tabName, currentTab)
      }
    },
    selection(tabName, currentTab) {
      if (Array.isArray(tabName)) {
        this.selectedTabList.length = 0
        this.selectedTabList = tabName
        this.currentTab = currentTab
      } else if (this.selectedTabList.includes(tabName)) {
        this.currentTab = tabName
        this.selectedTabList.length = 0
        this.selectedTabList.push(tabName)
      } else {
        this.currentTab = tabName
        this.selectedTabList.push(tabName)
      }
      this.scrollToTop()
    },
    changeAddressIfNotFound() {
      this.lead.address_line_1 = this.$refs.autocompleteRef.autocompleteText
      this.address_line_1 = this.$refs.autocompleteRef.autocompleteText
    },
    getAddressData(data) {
      this.lead.address_line_1 = ''
      let street = ''
      let route = ''
      if (data.street_number) street += data.street_number + ' '
      if (data.route) {
        route += data.route
      }
      this.lead.zip_code = data.postal_code ? data.postal_code : ''
      const address = street + route
      this.lead.address_line_1 = address
      this.address_line_1 = address
    },
    validateEmail() {
      // checking if email exist or not
      _debounce(() => {
        this.$axios
          .$post('lm/leads/check-lead-email-exist', {
            url_workspace_id: this.$route.params.workspace_id,
            email: this.lead.email,
          })
          .then(({ data }) => {
            const { is_exist } = data
            // if exist email then redirect user to lead page
            if (is_exist) {
              this.$axios
                .$post('lm/dashboard/search-lead', {
                  workspace_id: this.$route.params.workspace_id,
                  search_text: this.lead.email,
                  search_type: ['leads'],
                })
                .then(({ data }) => {
                  const id = data.leads[0]?.id
                  if (id) {
                    this.$router.push({
                      name: 'workspace_id-lead-leads-id',
                      params: {
                        workspace_id: this.$route.params.workspace_id,
                        id,
                      },
                    })
                  }
                })
                .catch((error) => {
                  this.$toast.error(this.$getErrorMessage(error))
                })
            }
          })
          .catch((err) => {
            this.$toast.error(this.$getErrorMessage(err))
          })
      }, 500)
    },
    newProduct() {
      return {
        product_id: 0,
        category_id: 0,
        product_name: '',
        sort_order: null,
        variant_options: [],
        rsm_user_id: [],
        dealership_id: '',
        lead_source: 'Web',
        lead_status: 1,
      }
    },
    addLead() {
      this.$v.lead.$touch()
      this.$v.$touch()
      if (!this.$v.lead.$invalid) {
        this.loading = true
        const lead = { ...this.lead }
        lead.dealership_id = JSON.stringify(lead.dealership_id)
        lead.products = JSON.stringify(lead.products)
        lead.rsm_user_id = JSON.stringify(lead.rsm_user_id)
        this.$axios
          .$post('lm/leads/add', this.createFormData(lead))
          .then(({ data }) => {
            this.loading = false
            this.$toast.success('Lead added successfully')
            this.$router.push({
              name: 'workspace_id-lead-leads',
              params: { workspace_id: this.$route.params.workspace_id },
            })
          })
          .catch((err) => {
            this.$toast.error(this.$getErrorMessage(err))
            this.loading = false
          })
      }
    },
    handleRemove() {
      this.leadProduct.dealership_id = null
      this.leadProduct.rsm_user_id = []
      _debounce(() => {
        this.loadRSM()
      }, 200)
    },
    loadDealerships(sort = false) {
      this.$store.dispatch('startOverlay')
      this.isDealerLoading = true
      const reqParams = {
        product_id: this.product ? this.product.id : '',
        name: this.searchTerm,
        zipcode: this.lead.zip_code,
        lead_id: 0,
      }
      const sortVal = {
        sortvalue: this.dealershipOrderBy,
        orderby: this.dealershipOrder,
      }
      if (sort) {
        Object.assign(reqParams, sortVal)
      }
      this.$axios
        .$post(`lm/leads/dealership-list`, reqParams)
        .then(({ data }) => {
          const dealers = data
          const includeNA = []
          const excludeNA = []
          // eslint-disable-next-line array-callback-return
          dealers.map((dealer) => {
            if (dealer.distance === 'NA') {
              includeNA.push(dealer)
            } else {
              excludeNA.push(dealer)
            }
          })
          this.dealerships = excludeNA
          this.dealerships.push(...includeNA)
          if (this.automatic_lead_assignment) {
            this.leadProduct.dealership_id = this.dealerships[0]?.id
          }
          this.loadRSM()
          this.isDealerLoading = false
          this.$store.dispatch('stopOverlay')
        })
    },
    sortDealers(column) {
      if (this.dealershipOrderBy === column) {
        this.dealershipOrder = this.dealershipOrder === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.dealershipOrderBy = column
        this.dealershipOrder = 'DESC'
      }
      this.loadDealerships(true)
    },
    loadRSM() {
      this.$axios
        .$post('lm/leads/rsm-list-based-dealer', {
          workspace_id: this.$route.params.workspace_id,
          product_id: this.leadProduct.product_id,
          dealership_id: this.leadProduct.dealership_id,
          name: this.searchTerm,
          orderby: this.rsmOrderBy,
        })
        .then((data) => {
          this.rsms = data.data
          if (this.automatic_lead_assignment) {
            data.data.forEach((rsm) => {
              if (!this.leadProduct.rsm_user_id.includes(rsm.id)) {
                this.leadProduct.rsm_user_id.push(rsm.id)
              }
            })
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },

    assignDealer(pindex) {
      if (!this.dealerships.length) {
        this.leadProduct.dealership_id = null
      }
      const selectedRSMs = [...this.leadProduct.rsm_user_id]
      const rsms = this.rsms.reduce((p, a) => {
        const temp = []
        temp.push(...p, a.id)
        return temp
      }, [])
      const tempIds = []
      selectedRSMs.forEach((e, i) => {
        if (!rsms.includes(e)) {
          tempIds.push(i)
        }
      })
      tempIds.forEach((i) => {
        selectedRSMs[i] = null
      })
      this.leadProduct.rsm_user_id = selectedRSMs.filter((e) => e)
      const dealership = this.dealerships.find(
        (d) => d.id === this.leadProduct.dealership_id
      )
      if (dealership) {
        const i = this.selectedDealerships.findIndex(
          (_item) => _item.id === dealership.id
        )
        if (i > -1) this.selectedDealerships[i] = dealership
        // (2)
        else this.selectedDealerships.push(dealership)
      }
      this.scrollToTop()
      this.leadProduct.variant_options = this.variants
      this.leadProduct.sort_order = _.uniqueId()
      this.lead.products.push(this.leadProduct)
      this.leadProduct = this.newProduct()
      this.product = null
      this.floorplans = []
      this.colors = []
      this.selectedFloorPlan = null
      this.selectedColor = null
    },
    removeAssignment(pindex) {
      // const i = this.lead.products.find((_p) => _p.product_id === p.product_id)
      this.lead.products.splice(pindex, 1)
    },
    // unused function
    floorplanName(f) {
      let floorplanName = ''
      if (f && f.length)
        f.forEach((f) => {
          const v = this.selectedFloorPlans.find(
            (fp) => fp.id === f.variant_option_id
          )
          if (v) floorplanName = v.option_name
        })
      return floorplanName
    },
    variantOption(o) {
      let variantOptionName = ''
      const variant = this.selectedVariants.find((v) => v.id === o.variant_id)
      const v = variant.product_variant_options.find(
        (fp) => fp.id === o.variant_option_id
      )
      if (v) variantOptionName = v.option_name
      return variantOptionName
    },
    variantLabel(o) {
      return this.variants.find((v) => v.id === o.variant_id).variant_name
    },
    dealershipName(did) {
      const d = this.selectedDealerships.find((d) => d.id === did)
      if (d) return d.dealership_name
      return ''
    },
    addImage(e) {
      if (e.target.files.length) this.lead.logo = e.target.files[0]
    },
    sortRsm() {
      this.rsmOrderBy = this.rsmOrderBy === 'ASC' ? 'DESC' : 'ASC'
      this.loadRSM()
    },
    createFormData(obj) {
      const formData = new FormData()
      Object.keys(obj).forEach((e) => {
        if (typeof obj[e] !== 'object' && e !== 'file') {
          formData.append(e, obj[e])
        } else if (obj[e] instanceof File) {
          formData.append(e, obj[e])
        } else if (Array.isArray(obj[e])) {
          obj[e].forEach((f) => {
            if (typeof f === 'object' && !(f instanceof File)) {
              Object.keys(f).forEach((k) => {
                formData.append(e + '[][' + k + ']', f[k])
              })
            } else if (f instanceof File) {
              formData.append(e + '[]', f)
            } else {
              formData.append(e + '[]', f)
            }
          })
        }
      })
      return formData
    },
  },
  validations() {
    return {
      lead: {
        first_name: {
          required,
        },
        last_name: {
          required,
        },
        email: {
          required,
          email,
        },
        // address_line_1: {
        //   required,
        // },
      },
      address_line_1: {
        required,
      },
    }
  },
}
</script>
<style scoped>
button:disabled {
  background: #dfe0e3 !important;
  color: grey !important;
}
.dragEnter {
  border-color: blue !important;
}
</style>
