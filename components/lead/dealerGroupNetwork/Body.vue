<template>
  <div class="workspace-settings group-network">
    <div class="row no-gutters">
      <div class="col-md-6">
        <text-field
          v-model="groupData.group_name"
          label="Group Name"
          placeholder="Group Name"
          type="text"
          :v="$v.groupData.group_name"
          required
        ></text-field>
        <h5 class="mt0">Search Dealership</h5>
      </div>
    </div>
    <div class="workspace-setting-left">
      <div class="group-name mb10">
        <div class="d-flex align-items-center justify-content-between">
          <div class="search-pr">
            <form
              class="navbar-form search-navbar-form"
              role="search"
              @submit.prevent
            >
              <div class="input-group">
                <button class="btn-search hidden-xs" type="submit">
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
                </button>
                <input
                  id="srch-term"
                  v-model="dealerShip.filter.search_text"
                  class="form-control"
                  placeholder="Search Dealership"
                  name="srch-term"
                  type="text"
                  @keyup.enter="getDealership"
                />
              </div>
            </form>
          </div>
          <div class="group-name-input">
            <Select
              v-model="dealerShip.filter.city_text"
              class="select"
              :items="searchCitySate.data"
              item_value="id"
              :select_first="false"
              placeholder="Search By City"
              :disable_form_class="true"
            />
          </div>
        </div>
      </div>
      <div class="common-box bg-gray">
        <div class="table-list-view">
          <ul class="thead">
            <li>
              <div
                class="name-email sorting sortarrow flex45"
                :class="[
                  dealerShip.filter.sortvalue === 'dealership_name' &&
                    dealerShip.filter.orderby === 'DESC' &&
                    'active',
                ]"
              >
                <span @click="toggleSortData('dealerShip', 'dealership_name')"
                  >Dealership Name</span
                >
              </div>
              <div
                class="last-score sorting sortarrow flex20"
                :class="[
                  dealerShip.filter.sortvalue === 'city' &&
                    dealerShip.filter.orderby === 'DESC' &&
                    'active',
                ]"
              >
                <span @click="toggleSortData('dealerShip', 'city')">City</span>
              </div>
              <div
                class="sorting sortarrow flex10"
                :class="[
                  dealerShip.filter.sortvalue === 'state' &&
                    dealerShip.filter.orderby === 'DESC' &&
                    'active',
                ]"
              >
                <span @click="toggleSortData('dealerShip', 'state')"
                  >State</span
                >
              </div>
              <div class="sorting flex25 text-center">
                <span>Add To Group Network</span>
              </div>
            </li>
          </ul>

          <div class="customscrollbar no_footer">
            <div v-if="!dealerShip.data.length" class="no-data-found">
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
                  <g id="Group_4457" transform="translate(-190.348 -177.624)">
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

                <p>No Data Found</p>
              </div>
            </div>

            <ul v-else class="tbody">
              <li v-for="dealer in dealerShip.data" :key="dealer.id">
                <div class="name-email tb-column flex45">
                  <div class="media">
                    <div class="media-left">
                      <div
                        class="profile-icon"
                        :style="{
                          backgroundImage: `url(
                        ${
                          dealer.dealership_logo
                            ? dealer.dealership_logo
                            : require('@/assets/img/icon/building.svg')
                        }
                      )`,
                        }"
                      ></div>
                    </div>
                    <div class="media-body">
                      <div>
                        <div class="top-column">
                          <label class="table-a">{{
                            dealer.dealership_name
                          }}</label>
                        </div>
                        <div class="bottom-column">
                          <span>{{ dealer.dealership_number }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="group-name tb-column flex20">
                  <div class="bottom-column">
                    <span>{{ dealer.city }}</span>
                  </div>
                </div>
                <div class="number-of tb-column flex10">
                  <div class="bottom-column">
                    <span>{{ dealer.state }}</span>
                  </div>
                </div>
                <div class="tb-column flex25 text-center">
                  <label class="check-label">
                    <input
                      v-model="groupData.dealership_id"
                      type="checkbox"
                      name="dealerships"
                      :value="dealer.id"
                    />
                    <span class="check-span"></span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataInit" class="workspace-setting-right">
      <div class="h-50 mb10">
        <div class="group-name mb10">
          <div class="d-flex align-items-center justify-content-between">
            <h5>List Admin (*)</h5>
            <div
              v-if="
                $v.groupData.dealer_admin_user.$error &&
                !$v.groupData.dealer_admin_user.required
              "
              class="input-error"
            >
              Please select dealer admin
            </div>
            <div class="group-name-input">
              <div class="search-pr">
                <form
                  class="navbar-form search-navbar-form"
                  role="search"
                  @submit.prevent
                >
                  <div class="input-group">
                    <button class="btn-search hidden-xs" type="submit">
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
                    </button>
                    <input
                      id="srch-admin-term"
                      v-model="adminData.filter.search_text"
                      class="form-control"
                      placeholder="Search User"
                      name="srch-term"
                      type="text"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="common-box bg-gray">
          <div class="table-list-view">
            <ul class="thead">
              <li>
                <div
                  class="name-email sorting sortarrow flex50"
                  :class="[
                    adminData.filter.sortvalue ===
                      'dealership_details.dealership_name' &&
                      adminData.filter.orderby === 'DESC' &&
                      'active',
                  ]"
                >
                  <span
                    @click="
                      toggleSortData(
                        'adminData',
                        'dealership_details.dealership_name'
                      )
                    "
                    >Dealership Name</span
                  >
                </div>
                <div
                  class="last-score sorting sortarrow flex30"
                  :class="[
                    adminData.filter.sortvalue === 'name' &&
                      adminData.filter.orderby === 'DESC' &&
                      'active',
                  ]"
                >
                  <span @click="toggleSortData('adminData', 'name')"
                    >User's Name</span
                  >
                </div>
                <div class="sorting flex20 text-center">
                  <span> Add Group Admin</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <template v-if="dataInit && adminData.data.length > 0">
                  <li v-for="admin in adminData.data" :key="admin.id">
                    <div class="name-email tb-column flex50">
                      <div class="media">
                        <div class="media-left">
                          <div
                            class="profile-icon"
                            :style="{
                              backgroundImage: `url(
                            ${
                              admin.dealership_details.dealership_logo
                                ? admin.dealership_details.dealership_logo
                                : require('@/assets/img/icon/building.svg')
                            }
                          )`,
                            }"
                          ></div>
                        </div>
                        <div class="media-body">
                          <div class="top-column">
                            <label class="table-a">{{
                              admin.dealership_details.dealership_name
                            }}</label>
                          </div>
                          <div class="bottom-column">
                            <span>{{
                              admin.dealership_details.dealership_city
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="group-name tb-column flex40">
                      <div class="media">
                        <div class="media-left">
                          <div
                            class="profile-icon"
                            :style="{
                              backgroundImage: `url(
                            ${
                              admin.user.display_thumb_profile_image
                                ? admin.user.display_thumb_profile_image
                                : require('@/assets/img/icon/building.svg')
                            }
                          )`,
                            }"
                          ></div>
                        </div>
                        <div class="media-body">
                          <div class="top-column">
                            <span>{{ admin.user.name }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tb-column flex10 text-center">
                      <label class="check-label">
                        <input
                          v-model="groupData.dealer_admin_user"
                          type="checkbox"
                          name="admins"
                          :value="admin.user_id"
                        />
                        <span class="check-span"></span>
                      </label>
                    </div>
                  </li>
                </template>
                <div v-else class="no-data-found">
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

                    <p>No Admin Found</p>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="h-50 mt10">
        <div class="group-name mb10">
          <div class="d-flex align-items-center justify-content-between">
            <h5>List Salesperson</h5>
            <!-- <div
              v-if="
                $v.groupData.sales_person_user.$error &&
                !$v.groupData.sales_person_user.required
              "
              class="input-error"
            >
              Please select Sales Person
            </div> -->
            <div class="group-name-input">
              <div class="search-pr">
                <form
                  class="navbar-form search-navbar-form"
                  role="search"
                  @submit.prevent
                >
                  <div class="input-group">
                    <button class="btn-search hidden-xs" type="submit">
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
                    </button>
                    <input
                      id="srch-salesperson-term"
                      v-model="salePersonData.filter.search_text"
                      class="form-control"
                      placeholder="Search User"
                      name="srch-term"
                      type="text"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="common-box bg-gray">
          <div class="table-list-view">
            <ul class="thead">
              <li>
                <div
                  class="name-email sorting sortarrow flex50"
                  :class="[
                    salePersonData.filter.sortvalue ===
                      'dealership_details.dealership_name' &&
                      salePersonData.filter.orderby === 'DESC' &&
                      'active',
                  ]"
                >
                  <span
                    @click="
                      toggleSortData(
                        'salePersonData',
                        'dealership_details.dealership_name'
                      )
                    "
                    >Dealership Name</span
                  >
                </div>
                <div
                  class="last-score sorting sortarrow flex30"
                  :class="[
                    salePersonData.filter.sortvalue === 'name' &&
                      salePersonData.filter.orderby === 'DESC' &&
                      'active',
                  ]"
                >
                  <span @click="toggleSortData('salePersonData', 'name')"
                    >User's Name</span
                  >
                </div>
                <div class="sorting flex20 text-center">
                  <span> Add Group Admin</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <template v-if="dataInit && salePersonData.data.length > 0">
                  <li
                    v-for="salePerson in salePersonData.data"
                    :key="salePerson.id"
                  >
                    <div class="name-email tb-column flex50">
                      <div class="media">
                        <div class="media-left">
                          <div
                            class="profile-icon"
                            :style="{
                              backgroundImage: `url(
                              ${
                                salePerson.dealership_details.dealership_logo
                                  ? salePerson.dealership_details
                                      .dealership_logo
                                  : require('@/assets/img/icon/building.svg')
                              }
                            )`,
                            }"
                          ></div>
                        </div>
                        <div class="media-body">
                          <div>
                            <div class="top-column">
                              <label class="table-a">{{
                                salePerson.dealership_details.dealership_name
                              }}</label>
                            </div>
                            <div class="bottom-column">
                              <span>{{
                                salePerson.dealership_details.dealership_city
                              }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="group-name tb-column flex40">
                      <div class="media">
                        <div class="media-left">
                          <div
                            class="profile-icon"
                            :style="{
                              backgroundImage: `url(
                            ${
                              salePerson.user.display_thumb_profile_image
                                ? salePerson.user.display_thumb_profile_image
                                : require('@/assets/img/icon/building.svg')
                            }
                          )`,
                            }"
                          ></div>
                        </div>
                        <div class="media-body">
                          <div class="top-column">
                            <span>{{ salePerson.user.name }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tb-column flex10 text-center">
                      <label class="check-label">
                        <input
                          v-model="groupData.sales_person_user"
                          type="checkbox"
                          name="salepersons"
                          :value="salePerson.user_id"
                        />
                        <span class="check-span"></span>
                      </label>
                    </div>
                  </li>
                </template>
                <div v-else class="no-data-found">
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

                    <p>No Sales Person Found</p>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-groups mt10">
        <button
          v-if="create"
          class="btn"
          :disabled="isLoading || !groupData.dealer_admin_user.length"
          @click="createGroupNetwork()"
        >
          <i v-if="isLoading" class="fa fa-circle-o-notch fa-spin"></i>
          Create Group Network
        </button>
        <button
          v-else
          class="btn"
          :disabled="isLoading || !groupData.dealership_id.length"
          @click="updateGroupNetwork()"
        >
          <i v-if="isLoading" class="fa fa-circle-o-notch fa-spin"></i>
          Update Group Network
        </button>
        <nuxt-link
          class="btn btn-gray"
          :to="{
            name: 'workspace_id-workspace-settings-lm-dealer-group-network',
            params: { workspace_id: $getWorkspaceId() },
          }"
        >
          Cancel
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { _debounce } from '@/utils/helper'
import Select from '~/components/lead/Select'
import TextField from '~/components/lead/TextField.vue'

export default {
  name: 'Body',
  components: {
    Select,
    TextField,
  },
  props: {
    create: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      groupData: {
        group_id: null,
        group_name: '',
        dealership_id: [],
        dealer_admin_user: [],
        sales_person_user: [],
      },
      searchCitySate: {
        data: [],
        selected: null,
      },
      dealerShip: {
        filter: {
          city_text: '',
          search_text: '',
          sortvalue: '',
          orderby: 'ASC',
        },
        data: [],
      },
      adminData: {
        filter: {
          search_text: '',
          sortvalue: '',
          orderby: 'ASC',
        },
        data: [],
      },
      salePersonData: {
        filter: {
          search_text: '',
          sortvalue: '',
          orderby: 'ASC',
        },
        data: [],
      },
      dataInit: false,
      isLoading: false,
    }
  },
  watch: {
    'groupData.dealership_id'() {
      this.dataInit = false
      this.$v.$reset()
      this.searchSaleUsers()
    },
    'dealerShip.filter.search_text'() {
      _debounce(() => {
        this.getDealership()
      }, 1000)
    },
    'dealerShip.filter.city_text'() {
      this.getDealership()
    },
    'adminData.filter.search_text'() {
      _debounce(() => {
        this.searchSaleUsers()
      }, 1000)
    },
    'salePersonData.filter.search_text'() {
      _debounce(() => {
        this.searchSaleUsers()
      }, 1000)
    },
  },
  created() {
    if (!this.create) {
      this.groupData.group_id = this.$route.params.id
      this.$axios
        .$post('lm/group-network/view', {
          group_id: this.$route.params.id,
        })
        .then((data) => {
          this.dealerShip.data = data.data.dealership_data
          this.salePersonData.data = data.data.sales_person_data
          this.adminData.data = data.data.dealer_admin_data
          this.groupData.group_name = data.data.group_data.group_name
          this.groupData.dealership_id = this.dealerShip.data
            .filter((dealer) => dealer.show_checked)
            .map((dealer) => dealer.id)
          this.groupData.dealer_admin_user = this.adminData.data
            .filter((dealer) => dealer.show_checked)
            .map((dealer) => dealer.user_id)
          this.groupData.sales_person_user = this.salePersonData.data
            .filter((dealer) => dealer.show_checked)
            .map((dealer) => dealer.user_id)
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
          return this.$router.push({
            name: 'workspace_id-workspace-settings-lm-dealer-group-network',
            params: { workspace_id: this.$route.params.workspace_id },
          })
        })
    }
  },
  mounted() {
    if (this.create) this.getDealership()
    this.$axios
      .$post('lm/group-network/get-city-state-for-filter', {
        workspace_id: this.$getWorkspaceId(),
        filter: 'city',
      })
      .then((res) => {
        this.searchCitySate.data = res.data
      })
  },
  methods: {
    getDealership() {
      this.$axios
        .$post('lm/group-network/dealership-list', {
          search_text: this.dealerShip.filter.search_text,
          sortvalue: this.dealerShip.filter.sortvalue,
          orderby: this.dealerShip.filter.orderby,
          city_text: this.dealerShip.filter.city_text,
          group_id: this.$route.params.id || 0,
        })
        .then((res) => {
          if (res.error.length > 0) this.$toast.error(res.error[0])
          this.dealerShip.data = res.data
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    searchSaleUsers() {
      this.$axios
        .$post('lm/group-network/dealer-sales-users', {
          dealership_id: this.groupData.dealership_id,
          search_admin_text: this.adminData.filter.search_text,
          sort_admin_value: this.adminData.filter.sortvalue,
          orderby_admin: this.adminData.filter.orderby,
          search_sales_text: this.salePersonData.filter.search_text,
          sort_sales_value: this.salePersonData.filter.sortvalue,
          orderby_sales: this.salePersonData.filter.orderby,
        })
        .then((res) => {
          if (res.error.length > 0) this.$toast.error(res.error[0])
          this.adminData.data = res.data.dealer_admin_data
          this.salePersonData.data = res.data.sales_person_data
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
        .finally(() => (this.dataInit = true))
    },
    createGroupNetwork() {
      this.isLoading = true
      this.removeUserIfDelereNotSelected()
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isLoading = false
        return false
      }
      this.$axios
        .$post('lm/group-network/add', this.groupData)
        .then((response) => {
          if (response.error.length <= 0) {
            this.$toast.global.success('Successfully created Group Network')
            return this.$router.push({
              name: 'workspace_id-workspace-settings-lm-dealer-group-network',
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
        .finally(() => (this.isLoading = false))
    },
    removeUserIfDelereNotSelected() {
      this.groupData.sales_person_user.forEach((e, i) => {
        if (
          !this.salePersonData.data.filter((f) => f.user.id === e).length > 0
        ) {
          this.groupData.sales_person_user.splice(i, 1)
        }
      })
      this.groupData.dealer_admin_user.forEach((e, i) => {
        if (!this.adminData.data.filter((f) => f.user.id === e).length > 0) {
          this.groupData.dealer_admin_user.splice(i, 1)
        }
      })
    },
    updateGroupNetwork() {
      this.isLoading = true
      this.removeUserIfDelereNotSelected()
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isLoading = false
        return false
      }
      this.$axios
        .$post('lm/group-network/update', this.groupData)
        .then((response) => {
          if (response.error.length <= 0) {
            this.$toast.global.success(response.message)
            return this.$router.push({
              name: 'workspace_id-workspace-settings-lm-dealer-group-network',
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
        .finally(() => (this.isLoading = false))
    },
    toggleSortData(type, data) {
      if (this[type].filter.sortvalue !== data) {
        this[type].filter.sortvalue = data
        this[type].filter.orderby = 'ASC'
      } else {
        this[type].filter.orderby =
          this[type].filter.orderby === 'ASC' ? 'DESC' : 'ASC'
      }
      if (type === 'dealerShip') this.getDealership()
      else this.searchSaleUsers()
    },
  },
  validations: {
    groupData: {
      group_name: {
        required,
      },
      dealership_id: {
        required,
      },
      dealer_admin_user: {
        required,
      },
    },
  },
}
</script>
