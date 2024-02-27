<template>
  <header class="header bg-gray">
    <div class="header-left">
      <div v-click-outside="clickedOut" class="main-search">
        <form class="main-search-inner" @submit.prevent>
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
            id="main-search"
            v-model="searchTerm"
            type="text"
            name="main-search"
            class="form-control"
            placeholder="Lariat Marketing Hub"
            @focus="headerSearchActive()"
            @keyup.enter.prevent="searchForInput"
          />
          <div
            class="searh-result"
            :class="[searchActive ? 'active' : null]"
            @mouseover="headerSearchActive()"
          >
            <div class="searh-result-header">
              <h5>Searching in:</h5>
              <div class="simple-dropdown-multiple">
                <Select2MultipleForHeader
                  v-model="searchType"
                  :options="searchTermOptions"
                  placeholder="Select the Search"
                  :custom-event="true"
                  @changeFollower="projectChangeHandler(...arguments)"
                />
              </div>
            </div>
            <div
              v-if="
                !isLoading &&
                data.dealers &&
                !data.dealers.length &&
                data.leads &&
                !data.leads.length
              "
              class="searh-result-body no-data-found"
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
            <div
              v-else-if="!isLoading && (data.dealers || data.leads)"
              class="searh-result-body customscrollbar"
            >
              <div
                v-if="data.dealers && data.dealers.length"
                class="result-group"
              >
                <div class="row no-gutters d-flex align-item-center mb1">
                  <div class="col-md-6">
                    <h5>Dealers</h5>
                  </div>
                  <div class="col-md-6 text-right">
                    <div class="inline-links">
                      <nuxt-link
                        class="text-blue"
                        :to="{
                          name: 'workspace_id-lead-dealers',
                          params: { workspace_id: $_auth().id },
                        }"
                        >View All
                      </nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="common-box">
                  <div class="table-list-view multi-table-view">
                    <ul class="thead">
                      <li>
                        <div class="sorting flex25">
                          <span>Dealer Name</span>
                        </div>
                        <div class="sorting flex20">
                          <span>City, State</span>
                        </div>
                        <div class="sorting flex20">
                          <span>Primary Contact</span>
                        </div>
                        <div class="sorting flex20">
                          <span>Designation</span>
                        </div>
                        <div class="sorting flex15 text-center">
                          <span>Assigned Leads </span>
                        </div>
                      </li>
                    </ul>
                    <div>
                      <ul class="tbody">
                        <li
                          v-for="dealer of data.dealers"
                          :key="dealer.id"
                          style="cursor: pointer"
                          @click="sendToDealer(dealer.id)"
                        >
                          <div class="tb-column flex25">
                            <div class="top-column">
                              <nuxt-link
                                class="text-blue"
                                :to="{
                                  name: getDealerUrl,
                                  params: {
                                    workspace_id: $_auth().id,
                                    id: dealer.id,
                                  },
                                }"
                                ><label style="cursor: pointer">{{
                                  dealer.dealership_name
                                }}</label>
                              </nuxt-link>
                            </div>
                          </div>
                          <div class="tb-column flex20">
                            <div class="top-column">
                              {{ dealer.city + ',' + dealer.state }}
                            </div>
                          </div>
                          <div class="tb-column flex20">
                            <div class="top-column">
                              {{ dealer.primary_contact_name }}
                            </div>
                          </div>
                          <div class="tb-column flex20">
                            <div class="top-column">
                              {{ dealer.primary_contact_role }}
                            </div>
                          </div>
                          <div
                            class="assigned-lead tb-column flex15 text-center"
                          >
                            <div class="top-column img-text">
                              <div class="big">
                                <svg
                                  id="Layer_1"
                                  class="users-icon orange"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  x="0px"
                                  y="0px"
                                  viewBox="0 0 22.9 18"
                                  xml:space="preserve"
                                >
                                  <g
                                    id="Group_4465"
                                    transform="translate(-226 -512)"
                                  >
                                    <rect
                                      id="Rectangle_3003"
                                      x="229"
                                      y="512"
                                      class="fill-hide"
                                      width="18"
                                      height="18"
                                    />
                                    <g
                                      id="Group_4428"
                                      transform="translate(-274.326 368.983)"
                                    >
                                      <path
                                        id="Path_3540"
                                        class="fill-color"
                                        d="M516.9,159v-1.4c0-1.2-1-2.2-2.2-2.2h-5.9c-1.2,0-2.2,1-2.2,2.2v1.4h-1.6v-1.4c0-2.1,1.7-3.7,3.7-3.7h5.9c2.1,0,3.7,1.7,3.7,3.7v1.4H516.9z"
                                      />
                                      <path
                                        id="Path_3541"
                                        class="fill-color"
                                        d="M511.8,152.5c-2.1,0-3.7-1.7-3.7-3.7s1.7-3.7,3.7-3.7c2.1,0,3.7,1.7,3.7,3.7C515.5,150.8,513.9,152.5,511.8,152.5z"
                                      />
                                      <path
                                        id="Path_3542"
                                        class="fill-color"
                                        d="M521.7,155.4v-0.7c0-0.5-0.4-0.9-0.9-0.9h-3.3c-0.5,0-0.9,0.4-0.9,0.9v0.7h-1.6v-0.7c0-1.3,1.1-2.4,2.4-2.4h3.3c1.3,0,2.4,1.1,2.4,2.4v0.7H521.7z"
                                      />
                                      <path
                                        id="Path_3543"
                                        class="fill-color"
                                        d="M519.2,152.2c-1.3,0-2.4-1.1-2.4-2.4s1.1-2.4,2.4-2.4c1.3,0,2.4,1.1,2.4,2.4C521.6,151.1,520.5,152.2,519.2,152.2z"
                                      />
                                      <path
                                        id="Path_3544"
                                        class="fill-color"
                                        d="M506.9,155.4v-0.7c0-0.5-0.4-0.9-0.9-0.9h-3.3c-0.5,0-0.9,0.4-0.9,0.9v0.7h-1.6v-0.7c0-1.3,1.1-2.4,2.4-2.4h3.3c1.3,0,2.4,1.1,2.4,2.4v0.7H506.9z"
                                      />
                                      <path
                                        id="Path_3545"
                                        class="fill-color"
                                        d="M504.4,152.2c-1.3,0-2.4-1.1-2.4-2.4s1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C506.8,151.1,505.7,152.2,504.4,152.2z"
                                      />
                                    </g>
                                  </g>
                                </svg>
                                <nuxt-link
                                  class="text-blue"
                                  :to="{
                                    name: getDealerUrl,
                                    params: {
                                      workspace_id: $_auth().id,
                                      id: dealer.id,
                                    },
                                    query: {
                                      leads: true,
                                    },
                                  }"
                                >
                                  <span>{{ dealer.assign_leads }}</span>
                                </nuxt-link>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="data.leads && data.leads.length" class="result-group">
                <div class="row no-gutters d-flex align-item-center mb1">
                  <div class="col-md-6">
                    <h5>Lead Contact</h5>
                  </div>
                  <div class="col-md-6 text-right">
                    <div class="inline-links">
                      <nuxt-link
                        class="text-blue"
                        :to="{
                          name: 'workspace_id-lead-leads',
                          params: { workspace_id: $_auth().id },
                        }"
                      >
                        View All
                      </nuxt-link>
                    </div>
                  </div>
                </div>
                <div class="common-box">
                  <div class="table-list-view multi-table-view">
                    <ul class="thead">
                      <li>
                        <div class="sorting flex25">
                          <span>Name</span>
                        </div>
                        <div class="sorting flex20">
                          <span>Email</span>
                        </div>
                        <div class="sorting flex20">
                          <span>Model</span>
                        </div>
                        <div class="sorting flex20">
                          <span>Lead Score</span>
                        </div>
                        <div class="sorting flex15">
                          <span>Last Activity</span>
                        </div>
                      </li>
                    </ul>
                    <div>
                      <ul class="tbody">
                        <li
                          v-for="lead of data.leads"
                          :key="lead.id"
                          style="cursor: pointer"
                          @click="sendToLead(lead.id)"
                        >
                          <div class="tb-column flex25">
                            <div class="top-column">
                              <nuxt-link
                                class="text-blue"
                                :to="{
                                  name: 'workspace_id-lead-leads-id',
                                  params: {
                                    workspace_id: $_auth().id,
                                    id: lead.id,
                                  },
                                }"
                                ><label style="cursor: pointer">{{
                                  lead.name
                                }}</label>
                              </nuxt-link>
                            </div>
                          </div>
                          <div class="tb-column flex20">
                            <div class="top-column">{{ lead.email }}</div>
                          </div>
                          <div class="tb-column flex20">
                            <div
                              v-for="product of lead.product_data"
                              :key="product.product_id"
                              class="top-column"
                            >
                              {{ product.product_name }}
                            </div>
                          </div>
                          <div class="tb-column flex20">
                            <div class="top-column">
                              {{ lead.lead_score }}
                            </div>
                          </div>
                          <div
                            class="assigned-lead tb-column flex15 text-center"
                          >
                            <div class="top-column img-text">
                              {{ lead.update_date }}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="searh-result-body customscrollbar">
              <ContentLoader
                v-if="isLoading"
                :speed="1"
                :animate="true"
                :width="400"
                :height="200"
                class="normalLoader"
              >
                <rect x="0" y="-1" rx="0" ry="0" width="400" height="20" />
                <rect x="0" y="20" rx="0" ry="0" width="400" height="20" />
                <rect x="0" y="41" rx="0" ry="0" width="400" height="20" />
              </ContentLoader>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="header-right">
      <DetailViewSwitch v-if="displaySwitch" />
      <LeadSystemNotifications
        v-if="
          $route.name != 'profile' &&
          $route.name != 'notification-settings-workspace_id-module_id-type' &&
          $route.name != 'workspace_id-child-workspace-create' &&
          $route.name != 'workspace_id-child-workspace-choose-modules'
        "
      />
      <div class="dropdown">
        <button
          type="button"
          class="header-btn dropdown-toggle"
          data-toggle="dropdown"
        >
          <svg
            id="Layer_1"
            class="plus-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4454" transform="translate(-1005 -577.999)">
              <path
                id="Path_3394"
                class="fill-color"
                d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
              ></path>
              <path
                id="Path_3395"
                class="fill-color"
                d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
              ></path>
            </g>
          </svg>
        </button>
        <ul class="dropdown-menu">
          <li>
            <nuxt-link
              class="dropdown-item"
              :to="{
                name: 'workspace_id-lead-leads-add',
                params: { workspace_id: $_auth().id },
              }"
            >
              <span class="dropdown-item-icon">
                <svg
                  id="Layer_1"
                  class="lead-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 16.3 18"
                  xml:space="preserve"
                >
                  <path
                    id="Path_3776"
                    class="fill-color"
                    d="M15.2,10.6c-0.8-0.4-1.7-0.3-2.3,0.3l-2.2-1.2c0.1-0.2,0.1-0.4,0.1-0.7c0-0.3,0-0.5-0.1-0.8l2.2-1.3c0.2,0.2,0.5,0.3,0.8,0.4c0.2,0,0.3,0.1,0.5,0.1c1.1,0,2-0.9,2-2c0-0.4-0.1-0.7-0.3-1.1c-0.3-0.5-0.7-0.8-1.2-0.9c-0.5-0.1-1.1-0.1-1.5,0.2c-0.5,0.3-0.8,0.7-0.9,1.2c-0.1,0.3-0.1,0.6,0,0.9L10,7.2C9.7,6.8,9.2,6.6,8.8,6.5V3.9c1.1-0.4,1.6-1.5,1.3-2.5S8.6-0.2,7.5,0.1C6.7,0.4,6.1,1.1,6.1,2c0,0.9,0.5,1.6,1.4,1.9v2.6C7,6.6,6.6,6.9,6.2,7.2L4,6c0.1-0.3,0-0.6,0-0.9C3.8,4.6,3.4,4.1,3,3.9c-0.5-0.3-1-0.3-1.5-0.2c-0.5,0.1-0.9,0.5-1.2,1c-0.5,1-0.2,2.2,0.8,2.7c0.3,0.2,0.6,0.2,1,0.2c0.5,0,1-0.2,1.4-0.5l2.3,1.2C5.6,8.6,5.5,8.8,5.5,9c0,0.3,0,0.5,0.1,0.8l-2.2,1.3c-0.7-0.6-1.6-0.6-2.3-0.2c-0.5,0.3-0.8,0.7-0.9,1.2c-0.3,1.1,0.4,2.2,1.5,2.4c0.2,0,0.3,0.1,0.5,0.1c0.4,0,0.7-0.1,1-0.3C3.6,14,4,13.6,4.1,13.1c0.1-0.3,0.1-0.6,0-0.9l2.2-1.3c0.3,0.3,0.8,0.6,1.2,0.7v2.6c-1.1,0.4-1.6,1.5-1.3,2.5c0.4,1.1,1.5,1.6,2.5,1.3s1.6-1.5,1.3-2.5c-0.2-0.6-0.7-1.1-1.3-1.3v-2.6c0.5-0.1,0.9-0.4,1.3-0.8l2.2,1.2c0,0.1,0,0.2,0,0.3c0,0.7,0.4,1.4,1,1.8c0.3,0.2,0.6,0.2,1,0.2c1.1,0,2-0.9,2-2C16.3,11.6,15.9,10.9,15.2,10.6L15.2,10.6z M13.5,5c0.1-0.2,0.4-0.4,0.6-0.4c0.3,0,0.5,0.1,0.6,0.3c0.1,0.1,0.1,0.2,0.1,0.4c0,0.3-0.1,0.5-0.4,0.6c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3-0.2-0.5-0.3C13.4,5.6,13.4,5.3,13.5,5L13.5,5z M2,6.4c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7c0.1,0,0.2,0,0.4,0.1c0.1,0.1,0.2,0.1,0.3,0.2c0.2,0.2,0.2,0.5,0,0.8C2.5,6.2,2.3,6.4,2,6.4L2,6.4z M2.5,13.2c-0.3,0.2-0.8,0.1-1-0.2c-0.1-0.2-0.1-0.4-0.1-0.6c0-0.2,0.2-0.4,0.3-0.5c0.3-0.2,0.8-0.1,1,0.2c0.1,0.2,0.1,0.5,0,0.7C2.7,13.1,2.6,13.2,2.5,13.2L2.5,13.2z M7.4,2c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7c0,0.1,0,0.3-0.1,0.4c-0.2,0.3-0.6,0.5-1,0.3C7.7,2.6,7.6,2.5,7.5,2.4C7.4,2.2,7.4,2.1,7.4,2L7.4,2z M8.9,16c0,0.4-0.3,0.7-0.7,0.7c-0.4,0-0.7-0.3-0.7-0.7l0,0c0-0.1,0-0.2,0.1-0.3c0.2-0.4,0.6-0.5,1-0.3c0.1,0.1,0.2,0.2,0.3,0.3C8.8,15.7,8.9,15.9,8.9,16L8.9,16z M8.8,10.2c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2c0,0,0,0,0,0C7.1,9.9,6.8,9.5,6.8,9.1c0,0,0,0,0-0.1c0-0.5,0.2-0.9,0.6-1.1c0,0,0.1,0,0.1,0c0.2-0.1,0.4-0.2,0.6-0.2c0.2,0,0.4,0.1,0.6,0.2c0,0,0,0,0,0C9.2,8.1,9.5,8.5,9.5,9c0,0,0,0,0,0C9.5,9.5,9.3,9.9,8.8,10.2C8.8,10.1,8.8,10.2,8.8,10.2L8.8,10.2z M14.9,12.7c-0.2,0.4-0.6,0.5-1,0.3c-0.1-0.1-0.2-0.1-0.3-0.2c0-0.1-0.1-0.1-0.1-0.2c-0.1-0.2,0-0.4,0.1-0.6c0.1-0.2,0.4-0.4,0.6-0.4h0c0.4,0,0.7,0.3,0.7,0.7C15,12.5,15,12.6,14.9,12.7z"
                  ></path>
                </svg> </span
              >Lead
            </nuxt-link>
          </li>
          <li v-if="$_auth().user.lead.isSuperAdmin">
            <nuxt-link
              class="dropdown-item"
              :to="{
                name: 'workspace_id-lead-dealers-add',
                params: { workspace_id: $_auth().id },
              }"
            >
              <span class="dropdown-item-icon">
                <svg
                  id="Layer_1"
                  class="dealer-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 20 16"
                  xml:space="preserve"
                >
                  <path
                    id="Icon_awesome-store-alt"
                    class="fill-color"
                    d="M10,12H4V7H2v8c0,0.6,0.4,1,1,1h8c0.6,0,1-0.4,1-1V7h-2V12z M19.8,4.4l-2.7-4C17,0.2,16.7,0,16.3,0H3.7C3.3,0,3,0.2,2.8,0.4l-2.7,4C-0.1,4.9,0,5.5,0.4,5.8C0.6,5.9,0.8,6,1,6h18c0.6,0,1-0.4,1-1C20,4.8,19.9,4.6,19.8,4.4L19.8,4.4z M16,15.5c0,0.3,0.2,0.5,0.5,0.5h1c0.3,0,0.5-0.2,0.5-0.5V7h-2V15.5z"
                  ></path>
                </svg> </span
              >Dealership
            </nuxt-link>
          </li>
          <li v-if="$_auth().user.lead.isSuperAdmin">
            <nuxt-link
              class="dropdown-item"
              :to="{
                name: 'workspace_id-workspace-settings-lm-products-add',
                params: { workspace_id: $_auth().id },
              }"
            >
              <span class="dropdown-item-icon">
                <svg
                  id="Layer_1"
                  class="product-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 21.7 18"
                  xml:space="preserve"
                >
                  <g id="Group_3399" transform="translate(-609.566 -113.772)">
                    <path
                      id="Path_3267"
                      class="fill-color"
                      d="M613,123.4c-0.4,0-0.7-0.3-0.7-0.7v-3.7c0-1.4,1.1-2.5,2.5-2.5h5.6c0.4,0,0.7,0.3,0.7,0.7v5.6c0,0.4-0.3,0.7-0.7,0.7H613z M619.8,122.1v-4.3h-4.9c-0.7,0-1.2,0.5-1.2,1.2v0v3.1L619.8,122.1z"
                    />
                    <path
                      id="Path_3268"
                      class="fill-color"
                      d="M616.7,131.8c-1.6,0-3.1-1.2-3.4-2.8h-2.7c-0.6,0-1.1-0.5-1.1-1.1v-9.7c0-2.4,2-4.4,4.4-4.4h16.7c0.4,0,0.7,0.3,0.7,0.7c0,0.4-0.3,0.7-0.7,0.7h-2.1v9.8h2.1c0.4,0,0.7,0.3,0.7,0.7v2.8c0,0.4-0.3,0.7-0.7,0.7h-10.5C619.8,130.6,618.4,131.8,616.7,131.8L616.7,131.8z M616.7,126.2c-1.2,0-2.1,1-2.1,2.1c0,1.2,1,2.1,2.1,2.1c1.2,0,2.1-1,2.1-2.1C618.8,127.2,617.9,126.2,616.7,126.2C616.7,126.2,616.7,126.2,616.7,126.2z M613.3,127.7c0.3-1.6,1.7-2.8,3.4-2.8h5.8v-7.7c0-0.4,0.3-0.7,0.7-0.7h4v-1.5l-13.3,0c-1.7,0-3.1,1.4-3.1,3.1v9.5H613.3z M630,127.7v-1.5h-10.6c0.3,0.4,0.6,0.9,0.7,1.5H630zM627.2,124.9v-7h-3.3v7L627.2,124.9z"
                    />
                  </g>
                </svg> </span
              >Product
            </nuxt-link>
          </li>
          <li v-if="$_auth().user.lead.isSuperAdmin">
            <nuxt-link
              class="dropdown-item"
              :to="{
                name: 'workspace_id-workspace-settings-user-add',
                params: { workspace_id: $_auth().id },
              }"
            >
              <span class="dropdown-item-icon">
                <svg
                  id="Layer_1"
                  class="rsm-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="RSM">
                    <path
                      id="investor"
                      class="fill-color"
                      d="M11.8,7.8c1.9-1.5,2.2-4.3,0.6-6.2S8.2-0.6,6.3,1S4.1,5.3,5.6,7.2c0.2,0.2,0.4,0.5,0.6,0.6C3.4,8.4,1.4,11,1.5,13.9v3.6C1.5,17.8,1.7,18,2,18c0,0,0,0,0,0h14.1c0.3,0,0.5-0.2,0.5-0.5l0,0v-3.6C16.7,11,14.7,8.4,11.8,7.8zM9.6,8.8v1.1H8.5V8.8L9.6,8.8z M8.4,10.9h1.2l0.6,2.8l-1.2,1l-1.2-1L8.4,10.9z M5.7,4.4c0-1.8,1.5-3.3,3.3-3.3s3.3,1.5,3.3,3.3s-1.5,3.3-3.3,3.3l0,0C7.2,7.7,5.7,6.2,5.7,4.4z M15.6,17h-13v-3.1c-0.1-2.7,1.9-4.9,4.6-5.1h0.3v1.5l-0.7,3.5c0,0.2,0,0.4,0.2,0.5l1.8,1.5c0.2,0.2,0.5,0.2,0.7,0l1.8-1.5c0.1-0.1,0.2-0.3,0.2-0.5l-0.7-3.5V8.8H11c2.7,0.2,4.7,2.4,4.6,5.1L15.6,17z"
                    ></path>
                  </g>
                </svg> </span
              >RSMs
            </nuxt-link>
          </li>
          <li v-if="$_auth().user.lead.isSuperAdmin">
            <nuxt-link
              class="dropdown-item"
              :to="{
                // eslint-disable-next-line prettier/prettier
                name: 'workspace_id-workspace-settings-lm-dealer-group-network-create',
                params: { workspace_id: $_auth().id },
              }"
            >
              <span class="dropdown-item-icon">
                <svg
                  id="Capa_1"
                  class="dealer-network-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      class="fill-color"
                      d="M15,512h153.1c8.3,0,15-6.7,15-15v-16.7c0-34.7-19.4-64.9-47.9-80.4c10.1-10.7,16.3-25.2,16.3-41.1c0-33.1-26.9-60-60-60s-60,26.9-60,60c0,15.9,6.2,30.4,16.3,41.1C19.4,415.4,0,445.6,0,480.3V497C0,505.3,6.7,512,15,512zM61.5,358.8c0-16.5,13.5-30,30-30s30,13.5,30,30s-13.5,30-30,30S61.5,375.3,61.5,358.8z M91.5,418.8c32.1,0,61.5,25.2,61.5,63.2H30C30,444.1,59.2,418.8,91.5,418.8z"
                    />
                    <path
                      class="fill-color"
                      d="M464.1,399.8c10.1-10.7,16.3-25.2,16.3-41.1c0-33.1-26.9-60-60-60s-60,26.9-60,60c0,15.9,6.2,30.4,16.3,41.1c-28.5,15.5-47.9,45.8-47.9,80.4V497c0,8.3,6.7,15,15,15H497c8.3,0,15-6.7,15-15v-16.7C512,445.6,492.6,415.4,464.1,399.8zM390.5,358.8c0-16.5,13.5-30,30-30s30,13.5,30,30s-13.5,30-30,30S390.5,375.3,390.5,358.8z M482,482H358.9c0-37.9,29.2-63.2,61.5-63.2C452.6,418.8,482,443.9,482,482z"
                    />
                    <path
                      class="fill-color"
                      d="M347.5,198.2v-16.7c0-34.7-19.4-64.9-47.9-80.4C309.8,90.4,316,75.9,316,60c0-33.1-26.9-60-60-60s-60,26.9-60,60c0,15.9,6.2,30.4,16.3,41.1c-28.5,15.5-47.9,45.8-47.9,80.4v16.7c0,8.3,6.7,15,15,15h153.1C340.8,213.2,347.5,206.5,347.5,198.2z M226,60c0-16.5,13.5-30,30-30s30,13.5,30,30s-13.5,30-30,30S226,76.5,226,60z M317.5,183.2h-123c0-37.9,29.2-63.2,61.5-63.2C288.1,120,317.5,145.2,317.5,183.2z"
                    />
                    <path
                      class="fill-color"
                      d="M316.6,379c-19.6,6.4-40.3,9.7-61.4,9.7c-20.4,0-40.4-3-59.4-9.1c-7.9-2.5-16.3,1.9-18.8,9.8s1.9,16.3,9.8,18.8c21.9,6.9,45,10.5,68.5,10.5c24.3,0,48.2-3.8,70.8-11.2c7.9-2.6,12.2-11.1,9.6-18.9S324.5,376.5,316.6,379z"
                    />
                    <path
                      class="fill-color"
                      d="M117.7,124.3c-16.6,16-30.6,34.5-41.9,55.2c-11.6,21.4-19.7,44.1-23.9,67.5c-1.7,9.2,5.4,17.7,14.8,17.7c7.1,0,13.4-5.1,14.7-12.3c3.7-20.3,10.7-40,20.8-58.6c9.7-17.9,22-34.1,36.3-47.9c6-5.7,6.1-15.2,0.4-21.2C133.2,118.7,123.7,118.6,117.7,124.3z"
                    />
                    <path
                      class="fill-color"
                      d="M394.3,124.3c-6-5.8-15.5-5.6-21.2,0.4c-5.7,6-5.6,15.5,0.4,21.2c14.4,13.8,26.6,29.9,36.3,47.9c10.1,18.6,17.1,38.3,20.8,58.6c1.5,8.1,9.3,13.6,17.4,12.1s13.6-9.3,12.1-17.4c-4.3-23.4-12.3-46.2-23.9-67.5C424.9,158.8,410.8,140.3,394.3,124.3z"
                    />
                  </g>
                </svg> </span
              >Dealer Group Network
            </nuxt-link>
          </li>
        </ul>
      </div>
      <ProfileDropDown />
    </div>
  </header>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import Select2MultipleForHeader from '@/components/plugins/Select2ForHeaderSearch'
import ProfileDropDown from '~/components/theme/global/ProfileDropDown'
import DetailViewSwitch from '~/components/theme/global/DetailViewSwitch'
import LeadSystemNotifications from '~/components/theme/global/LeadSystemNotifications'
export default {
  name: 'LeadHeader',
  components: {
    LeadSystemNotifications,
    DetailViewSwitch,
    ProfileDropDown,
    ContentLoader,
    Select2MultipleForHeader,
  },
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // eslint-disable-next-line eqeqeq
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    },
  },
  data() {
    return {
      switchEnableRouts: [
        'workspace_id-project-all-project-list',
        'workspace_id-project-bucket',
        'workspace_id-project-bucket-bucket_id-client_id',
        'workspace_id-lead-leads',
        'workspace_id-lead-dealers',
        'workspace_id-lead',
      ],
      isLoading: false,
      data: {},
      searchTerm: null,
      searchTermOptions: [
        {
          id: 'dealer',
          text: 'Dealers',
          class: 'bg-blue',
        },
        {
          id: 'leads',
          text: 'Lead Contacts',
          class: 'bg-red',
        },
      ],
      searchType: ['dealer', 'leads'],
      searchActive: false,
    }
  },
  computed: {
    displaySwitch() {
      return this.switchEnableRouts.includes(this.$route.name)
    },
    getDealerUrl() {
      return this.$_auth().user.lead.isSuperAdmin
        ? 'workspace_id-lead-dealers-id'
        : 'workspace_id-lead-my-dealership'
    },
  },
  watch: {
    // reseting serch term while navigation
    // $route has access to 2 params to,from
    $route(_, __) {
      this.searchTerm = null
      this.data = {}
    },
  },
  methods: {
    clickedOut() {
      this.searchActive = false
    },
    searchForInput() {
      this.isLoading = true
      this.$axios
        .$post('lm/dashboard/search-lead', {
          workspace_id: this.$route.params.workspace_id,
          search_text: this.searchTerm,
          search_type: this.searchType,
        })
        .then(({ data }) => {
          this.data = data
          this.isLoading = false
        })
        .catch((e) => {
          if (
            this.$getErrorMessage(e) === 'Please enter search text.' &&
            !this.searchTerm
          ) {
            this.data = { dealers: [], leads: [] }
          }
          this.isLoading = false
        })
    },
    headerSearchActive() {
      this.searchActive = true
    },
    sendToDealer(id) {
      this.$router.push({
        name: this.getDealerUrl,
        params: {
          workspace_id: this.$_auth().id,
          id,
        },
      })
      this.searchTerm = null
      // this.searchType = ''
    },
    sendToLead(id) {
      this.$router.push({
        name: 'workspace_id-lead-leads-id',
        params: {
          workspace_id: this.$_auth().id,
          id,
        },
      })
      this.searchTerm = null
    },
    projectChangeHandler(data) {
      this.headerSearchActive()
      this.searchType = data
    },
  },
}
</script>
<style scoped>
.indicate_parent {
  font-weight: bold !important;
}
/* .searh-result .searh-result-header .stts {
  margin-left: 0;
}
.stts {
  padding: 0;
} */
</style>
