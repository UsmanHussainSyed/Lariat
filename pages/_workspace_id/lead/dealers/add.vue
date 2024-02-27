<template>
  <div class="body-content">
    <div class="body-content-auto w-100">
      <div
        class="common-box-header d-flex align-items-center justify-content-center"
      >
        <h2>Add Dealership</h2>
      </div>
      <div class="common-box p0">
        <div
          class="row no-gutters d-flex align-items-center justify-content-center h-100"
          data-select2-id="40"
        >
          <div class="col-lg-9 h-100" data-select2-id="39">
            <div class="stepsFromBox">
              <div class="stepsFromList">
                <ul class="multiStepFrom">
                  <li
                    style="width: 33.3333%"
                    :class="{
                      active: selectedTabList.includes('dealership_details'),
                    }"
                  >
                    <a
                      href="javascript:void(0);"
                      @click="addSelectedTab('dealership_details')"
                    >
                      <span>Dealership Details</span>
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
                          ['dealership_details', 'contact_details'],
                          'contact_details'
                        )
                      "
                    >
                      <span>Contact Details</span>
                    </a>
                  </li>
                  <li
                    :class="{
                      active: selectedTabList.includes('products'),
                    }"
                    style="width: 33.3333%"
                  >
                    <a
                      href="javascript:void(0);"
                      @click="
                        addSelectedTab(
                          ['dealership_details', 'contact_details', 'products'],
                          'products'
                        )
                      "
                    >
                      <span>Products</span>
                    </a>
                  </li>
                </ul>
                <div
                  ref="customscrollbar"
                  class="stepContentGroup customscrollbar"
                  data-select2-id="38"
                >
                  <div
                    class="stepContent"
                    :style="
                      currentTab === 'dealership_details'
                        ? 'opacity: 1' && 'display: block'
                        : 'opacity: 0; display: none'
                    "
                  >
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <div class="file-upload">
                            <div class="file-upload">
                              <file-drag-and-drop
                                v-slot="{ dragEnter }"
                                accept="image/jpg,image/png,image/jpeg,image/webp"
                                @error="$toast.error('found invalid files')"
                                @input="handleLogoUpload($event)"
                              >
                                <input
                                  ref="logo"
                                  class="file-upload-input"
                                  style="display: none"
                                  type="file"
                                  accept="image/x-png,image/jpeg"
                                  @change="handleLogoUpload($event)"
                                />
                                <div
                                  v-if="!dealerData.logo"
                                  class="image-upload-wrap"
                                  style="cursor: pointer"
                                  :class="{ dragEnter }"
                                  @click="$refs.logo.click()"
                                >
                                  <div class="drag-text">
                                    <svg
                                      id="Layer_1"
                                      class="upload-big-icon blue"
                                      style="height: 60px"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlns:xlink="http://www.w3.org/1999/xlink"
                                      x="0px"
                                      y="0px"
                                      viewBox="0 0 162 162"
                                      xml:space="preserve"
                                    >
                                      <g
                                        id="Icon_feather-download"
                                        transform="translate(-3.5 -3.5)"
                                      >
                                        <path
                                          id="Path_16"
                                          class="fill-color"
                                          d="M164.5,111.2v35.6c0,9.8-8,17.8-17.8,17.8H22.3c-9.8,0-17.8-8-17.8-17.8v-35.6"
                                        ></path>
                                        <path
                                          id="Path_17"
                                          class="fill-color"
                                          d="M40.1,48.9L84.5,4.5l44.4,44.4"
                                        ></path>
                                        <path
                                          id="Path_18"
                                          class="fill-color"
                                          d="M84.5,4.5v106.7"
                                        ></path>
                                      </g>
                                    </svg>
                                    <h3>
                                      Drop logo file to upload or
                                      <span>browse</span>.
                                    </h3>
                                  </div>
                                </div>
                                <div
                                  v-if="dealerData.logo"
                                  class="file-upload-content"
                                  style="display: block"
                                >
                                  <div
                                    class="row upload-preview-wrapper no-gutters"
                                  >
                                    <div class="col-md-6 col-lg-6 col-xl-4">
                                      <div class="upload-preview">
                                        <img
                                          class="file-upload-image"
                                          :src="dealerData.logo | imgUrl"
                                          alt="your image"
                                        />
                                        <div class="preview-action">
                                          <a
                                            href="javascript:void(0);"
                                            @click="$refs.logo.click()"
                                          >
                                            <EditIcon
                                              :is-active-orange="false"
                                              class="white"
                                            />
                                          </a>
                                          <a
                                            href="javascript:void(0);"
                                            @click="dealerData.logo = null"
                                          >
                                            <svg
                                              id="Layer_1"
                                              class="delete-icon h-orange white"
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </file-drag-and-drop>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">Dealership Number</label>
                          <input
                            v-model="dealerData.dealership_number"
                            type="text"
                            name="first-name"
                            class="form-control"
                            placeholder="Dealership Number"
                            :disabled="autoDealerIdStatus"
                          />
                          <div
                            v-if="
                              $v.dealerData.dealership_number.$error &&
                              !$v.dealerData.dealership_number.required
                            "
                            class="input-error"
                          >
                            Please provide dealership number
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">Dealership Name</label>
                          <input
                            v-model="dealerData.dealership_name"
                            type="text"
                            name="first-name"
                            class="form-control"
                            placeholder="Dealership name here"
                          />
                          <div
                            v-if="
                              $v.dealerData.dealership_name.$error &&
                              !$v.dealerData.dealership_name.required
                            "
                            class="input-error"
                          >
                            Please provide dealership name
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">Email Address</label>
                          <input
                            v-model="dealerData.email"
                            type="email"
                            name="email"
                            class="form-control"
                            placeholder="Please enter email"
                          />
                          <div
                            v-if="
                              $v.dealerData.email.$error &&
                              !$v.dealerData.email.required
                            "
                            class="input-error"
                          >
                            Please provide email
                          </div>
                          <div
                            v-if="
                              $v.dealerData.email.$error &&
                              !$v.dealerData.email.email
                            "
                            class="input-error"
                          >
                            Please provide valid email
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">Contact Number</label>
                          <input
                            v-model="dealerData.phone"
                            type="text"
                            name="phone"
                            placeholder="Please enter contact number"
                            class="form-control"
                          />
                          <div
                            v-if="
                              $v.dealerData.phone.$error &&
                              !$v.dealerData.phone.required
                            "
                            class="input-error"
                          >
                            Please provide Contact Number
                          </div>
                          <div
                            v-if="
                              $v.dealerData.phone.$error &&
                              !$v.dealerData.phone.maxLength
                            "
                            class="input-error"
                          >
                            Please provide valid Contact Number
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">Office Number</label>
                          <input
                            v-model="dealerData.office_phone"
                            type="text"
                            name="Office"
                            placeholder="Please enter office number"
                            class="form-control"
                          />
                          <div
                            v-if="
                              $v.dealerData.office_phone.$error &&
                              !$v.dealerData.office_phone.maxLength
                            "
                            class="input-error"
                          >
                            Please provide valid Office Number
                          </div>
                        </div>
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
                    class="stepContent"
                    :style="
                      currentTab === 'contact_details'
                        ? 'opacity: 1' && 'display: block'
                        : 'opacity: 0; display: none'
                    "
                  >
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">Address Line 1</label>
                          <client-only>
                            <vue-google-autocomplete
                              id="address"
                              ref="autocompleteRef"
                              classname="form-control"
                              placeholder="Enter address line 1"
                              :country="['us', 'ca', 'aus']"
                              @placechanged="getAddressData"
                            >
                            </vue-google-autocomplete>
                          </client-only>
                          <div
                            v-if="
                              $v.contact_details.address_line_1.$error &&
                              !$v.contact_details.address_line_1.required
                            "
                            class="input-error"
                          >
                            Address line 1 is required
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">Address Line 2</label>
                          <input
                            v-model="contact_details.address_line_2"
                            type="text"
                            name="addressline2"
                            class="form-control"
                            placeholder="Address Line 2 here"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">Zip Code</label>
                          <input
                            v-model="contact_details.zip_code"
                            type="text"
                            name="zip-code"
                            class="form-control"
                            placeholder="Enter zip-code"
                          />
                          <div
                            v-if="
                              $v.contact_details.zip_code.$error &&
                              !$v.contact_details.zip_code.required
                            "
                            class="input-error"
                          >
                            Please provide Zip Code
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">City</label>
                          <input
                            v-model="contact_details.city"
                            type="text"
                            name="email"
                            class="form-control"
                            placeholder="Enter city"
                          />
                          <div
                            v-if="
                              $v.contact_details.city.$error &&
                              !$v.contact_details.city.required
                            "
                            class="input-error"
                          >
                            Please provide City
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">State</label>
                          <input
                            v-model="contact_details.state"
                            type="text"
                            name="state"
                            class="form-control"
                            placeholder="Enter state"
                          />
                          <div
                            v-if="
                              $v.contact_details.state.$error &&
                              !$v.contact_details.state.required
                            "
                            class="input-error"
                          >
                            Please provide State
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group">
                          <label class="control-label">County</label>
                          <input
                            v-model="contact_details.county"
                            type="text"
                            name="state"
                            class="form-control"
                            placeholder="Enter County"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group required">
                          <label class="control-label">Country</label>
                          <input
                            v-model="contact_details.country"
                            type="text"
                            name="country"
                            class="form-control"
                            placeholder="Enter country"
                          />
                          <div
                            v-if="
                              $v.contact_details.country.$error &&
                              !$v.contact_details.country.required
                            "
                            class="input-error"
                          >
                            Please provide Country
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      href="javascript:void(0);"
                      class="btn btn-gray previous"
                      @click="handlePrevious('dealership_details')"
                      >Previous</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="btn next"
                      @click="handleNext('products')"
                      >Next</a
                    >
                  </div>
                  <div
                    class="stepContent"
                    :style="
                      currentTab === 'products'
                        ? 'opacity: 1' && 'display: block'
                        : 'opacity: 0; display: none'
                    "
                    data-select2-id="37"
                  >
                    <div
                      v-if="products.isLoading"
                      class="searh-result-body customscrollbar"
                    >
                      <ContentLoader
                        :speed="1"
                        :animate="true"
                        :width="400"
                        :height="200"
                        class="normalLoader"
                      >
                        <rect
                          x="0"
                          y="-1"
                          rx="0"
                          ry="0"
                          width="120"
                          height="100"
                        />
                        <rect
                          x="135"
                          y="-1"
                          rx="0"
                          ry="0"
                          width="120"
                          height="100"
                        />
                        <rect
                          x="270"
                          y="-1"
                          rx="0"
                          ry="0"
                          width="120"
                          height="100"
                        />
                      </ContentLoader>
                    </div>
                    <div
                      v-else-if="
                        products.list.length <= 0 && !products.isLoading
                      "
                      class="no-data-found"
                    >
                      <div class="inner w-100">
                        <svg
                          id="Layer_1"
                          class="no-record-icon darkgray"
                          style="height: 150px"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 131.3 156.8"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4457"
                            transform="translate(-190.348 -177.624)"
                          >
                            <path
                              id="Path_3564"
                              class="fill-color"
                              d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                            />
                            <path
                              id="Path_3565"
                              class="fill-color"
                              d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                            />
                          </g>
                        </svg>

                        <p>No Products Found</p>
                      </div>
                    </div>
                    <div v-else class="row">
                      <div
                        v-for="category in products.list"
                        :key="category.id"
                        class="col-sm-12"
                        data-select2-id="35"
                      >
                        <div
                          class="d-flex align-items-center justify-content-between"
                        >
                          <h5>{{ category.name }}</h5>
                          <!-- <div class="pull-right d-flex align-items-center">
                            <strong class="pr10">RSM</strong>
                            <div class="sm-select">
                              <select
                                class="select select2-hidden-accessible"
                                data-select2-id="10"
                                tabindex="-1"
                                aria-hidden="true"
                              >
                                <option data-select2-id="12">
                                  Frank Wyzwany
                                </option>
                                <option data-select2-id="41">
                                  Nick Palm
                                </option></select
                              ><span
                                class="select2 select2-container select2-container--default select2-container--below"
                                dir="ltr"
                                data-select2-id="11"
                                style="width: auto"
                                ><span class="selection"
                                  ><span
                                    class="select2-selection select2-selection--single"
                                    role="combobox"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    tabindex="0"
                                    aria-labelledby="select2-xsu3-container"
                                    ><span
                                      id="select2-xsu3-container"
                                      class="select2-selection__rendered"
                                      role="textbox"
                                      aria-readonly="true"
                                      title="Frank Wyzwany"
                                      >Frank Wyzwany</span
                                    ><span
                                      class="select2-selection__arrow"
                                      role="presentation"
                                      ><b
                                        role="presentation"
                                      ></b></span></span></span
                                ><span
                                  class="dropdown-wrapper"
                                  aria-hidden="true"
                                ></span
                              ></span>
                            </div>
                          </div> -->
                        </div>
                        <div class="model-list">
                          <div
                            v-for="product in category.product"
                            :key="product.id"
                            class="sm-box"
                          >
                            <label class="check-label"
                              >{{ product.name }}
                              <input
                                :id="product.id"
                                v-model="products.selected"
                                :value="{
                                  category_id: category.id,
                                  product_id: product.id,
                                }"
                                type="checkbox"
                                name=""
                                @change="
                                  addProductToSelection(category, product.id)
                                "
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
                                  style="width: 100% !important"
                                  :dropdown-css-class="'owner-select'"
                                  :options="rsmOption"
                                  custom-event
                                  placeholder="Select RSM Name"
                                  @changeFollower="
                                    selectRSM($event, category.id, product.id)
                                  "
                                />
                              </div>
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
                    <button :disabled="loading" class="btn" @click="addDealer">
                      Add Dealer
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
import { ContentLoader } from 'vue-content-loader'
import { required, email, maxLength } from 'vuelidate/lib/validators'
import zipCode from '@/mixins/zipCode'
import FileDragAndDrop from '@/components/lead/FileDragAndDrop.vue'
import Select2MultipleWithoutImage from '@/components/plugins/Select2MultipleWithoutImage'
// const minProduct = (val) => {
//   return val.length > 0
// }
export default {
  components: {
    ContentLoader,
    FileDragAndDrop,
    Select2MultipleWithoutImage,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  filters: {
    imgUrl(v) {
      if (v) return URL.createObjectURL(v)
      return v
    },
  },
  mixins: [zipCode],
  layout: 'leadLayout',
  middleware: ['authCheck', 'can-access-lead-module'],
  data() {
    return {
      loading: false,
      error: [],
      autoDealerIdStatus: false,
      contact_details: {
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        county: '',
        country: '',
        zip_code: '',
      },
      dealerData: {
        dealership_name: '',
        dealership_number: null,
        email: '',
        phone: '',
        office_phone: '',
        // address_line_1: '',
        // address_line_2: '',
        // city: '',
        // state: '',
        // county: '',
        // country: '',
        // zip_code: '',
        is_multi_location: false, // if true : 1 else : 0,
        logo: null,
      },
      rsm_assignment: [],
      currentTab: 'dealership_details',
      selectedTabList: ['dealership_details'],
      categroies: [],
      products: {
        isLoading: false,
        list: [],
        selected: [],
      },
      options: [
        {
          id: 1,
          text: 'United States',
        },
        {
          id: 2,
          text: 'United States',
        },
      ],
      classOption: [],
      rsmOption: [],
    }
  },
  computed: {
    doesHaveClassOption() {
      return this.classOption.length > 0
    },
  },
  beforeMount() {
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
  async mounted() {
    this.products.isLoading = true
    const data = await this.$axios
      .$get('lm/category/list-category-with-products')
      .catch((err) => {
        this.$toast.error(this.$getErrorMessage(err))
      })
    this.error = data && data.error
    this.products.list = []
    for (const product of data.data) {
      if (product.product.length) {
        this.products.list.push(product)
      }
    }
    this.products.isLoading = false
    this.$axios
      .$get('lm/common/dealership-no')
      .then(({ data }) => {
        // console.log(data)
        this.dealerData.dealership_number = data.dealership_number
        this.autoDealerIdStatus = data.dealership_no_status
      })
      .catch((err) => {
        this.$toast.error(this.$getErrorMessage(err))
      })
    document.addEventListener('change', this.changeAddressIfNotFound)
  },
  beforeDestroy() {
    setTimeout(() => {
      document.removeEventListener('change', this.changeAddressIfNotFound)
    }, 100)
  },
  methods: {
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
        this.$v.dealerData.$touch()
        // perform selection
        if (!this.$v.dealerData.$invalid) {
          this.selectionNext(tabName)
        }
      } else if (tabName === 'products') {
        this.$v.contact_details.$touch()
        if (!this.$v.contact_details.$invalid) {
          // perform selection
          this.selectionNext(tabName)
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
        this.$v.dealerData.$touch()
        if (!this.$v.dealerData.$invalid) {
          // perform selection
          this.selection(tabName, currentTab)
        }
      } else if (currentTab === 'products') {
        this.$v.contact_details.$touch()
        if (!this.$v.contact_details.$invalid) {
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
      // this.dealerData.address_line_1 = this.$refs.autocompleteRef.autocompleteText
      this.contact_details.address_line_1 =
        this.$refs.autocompleteRef.autocompleteText
    },
    getAddressData(data) {
      this.contact_details.address_line_1 = ''
      let street = ''
      let route = ''
      if (data.street_number) street += data.street_number + ' '
      if (data.route) {
        route += data.route
      }
      this.contact_details.zip_code = data.postal_code ? data.postal_code : ''
      const address = street + route
      this.contact_details.address_line_1 = address
    },
    addDealer() {
      this.loading = true
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Creating dealer, Please wait...',
      })
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.loading = false
        return false
      }
      try {
        const dealerFormData = new FormData()
        Object.keys(this.dealerData).forEach((e) => {
          if (typeof this.dealerData[e] !== 'object' && e !== 'file') {
            dealerFormData.append(e, this.dealerData[e])
          }
        })
        Object.keys(this.contact_details).forEach((e) => {
          if (typeof this.contact_details[e] !== 'object' && e !== 'file') {
            dealerFormData.append(e, this.contact_details[e])
          }
        })

        this.rsm_assignment = this.rsm_assignment.filter((rsm) => {
          return this.products.selected.some(
            (p) => p.product_id === rsm.product_id
          )
        })

        dealerFormData.append('logo', this.dealerData.logo)

        dealerFormData.append(
          'rsm_assignment',
          JSON.stringify(this.rsm_assignment)
        )
        dealerFormData.append(
          'url_workspace_id',
          this.$route.params.workspace_id
        )
        dealerFormData.set(
          'is_multi_location',
          this.dealerData.is_multi_location === true ? 1 : 0
        )
        dealerFormData.append(
          'products',
          JSON.stringify(this.products.selected)
        )
        this.$axios
          .$post('lm/dealership/add', dealerFormData)
          .then((response) => {
            if (response.error.length <= 0) {
              this.$toast.global.success('Successfully created Dealer')
              return this.$router.push({
                name: 'workspace_id-lead-dealers',
                params: { workspace_id: this.$route.params.workspace_id },
              })
            } else {
              for (const err of response.error) {
                this.$toast.error(err)
              }
            }
          })
          .catch((err) => {
            this.$toast.error(this.$getErrorMessage(err))
          })
          .finally(() => {
            this.$store.dispatch('loading/setOverlay', {
              isLoading: false,
            })
          })
        this.loading = false
      } catch (err) {
        this.loading = false
        this.$toast.error(this.$getErrorMessage(err))
      }
    },
    handleLogoUpload(e) {
      this.dealerData.logo = e.target.files[0]
    },
    selectRSM(rsms, category_id, product_id) {
      const romove_ids = []
      rsms.forEach((rsm_id) => {
        if (
          !this.rsm_assignment.some(
            (a) =>
              a.rsm_id === rsm_id &&
              a.category_id === category_id &&
              a.product_id === product_id
          )
        ) {
          this.rsm_assignment.push({ rsm_id, category_id, product_id })
        }
      })

      this.rsm_assignment.forEach((rsm, i) => {
        if (
          rsm.category_id === category_id &&
          rsm.product_id === product_id &&
          !rsms.includes(rsm.rsm_id)
        )
          romove_ids.push(i)
      })
      romove_ids.forEach((i) => {
        this.rsm_assignment.splice(i, 1)
      })
    },
    addProductToSelection(category, productId) {
      for (let i = 0; i < this.classOption.length; i++) {
        if (this.classOption[i].id === category.id) {
          if (this.classOption[i].product.includes(productId)) {
            if (this.classOption[i].product.length <= 1)
              return this.classOption.splice(i, 1)
            else
              return this.classOption[i].product.splice(
                this.classOption[i].product.indexOf(productId),
                1
              )
          } else {
            return this.classOption[i].product.push(productId)
          }
        }
      }
      this.classOption.push({
        id: category.id,
        text: category.name,
        product: [productId],
      })
    },
  },
  validations: {
    dealerData: {
      dealership_name: {
        required,
      },
      dealership_number: {
        required,
      },
      email: {
        email,
        required,
      },
      phone: {
        maxLength: maxLength(20),
        // required,
      },
      office_phone: {
        maxLength: maxLength(20),
        // required,
      },
      // address_line_1: {
      //   required,
      // },
      // city: {
      //   required,
      // },
      // state: {
      //   required,
      // },
      // country: {
      //   required,
      // },
      // zip_code: {
      //   required,
      // },
    },
    contact_details: {
      address_line_1: {
        required,
      },
      city: {
        required,
      },
      state: {
        required,
      },
      country: {
        required,
      },
      zip_code: {
        required,
      },
    },

    // products: {
    //   selected: {
    //     minProduct,
    //   },
    // },
  },
}
</script>
<style scoped>
.dragEnter {
  border-color: blue !important;
}
</style>
