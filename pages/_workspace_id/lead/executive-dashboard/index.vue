<template>
  <div class="body-content p0">
    <div class="newAnalytics leadAnalytics customscrollbar">
      <div class="d-flex align-items-end justify-content-end mb2">
        <ul class="assetsType">
          <li>
            <div class="d-flex align-items-center justify-content-end">
              <div
                v-if="lastDate !== '-2' && lastDate !== 'all'"
                class="report-slide gray-btn"
              >
                <button @click="previousTimeFrame">
                  <svg
                    id="Layer_1"
                    class="arrow-left-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4475" transform="translate(-871 -421)">
                      <rect
                        id="Rectangle_3013"
                        x="871"
                        y="421"
                        class="fill-hide"
                        width="18"
                        height="18"
                      ></rect>
                      <g
                        id="Icon_feather-chevron-down"
                        transform="translate(581.631 103.451)"
                      >
                        <path
                          id="Path_3433"
                          class="fill-color"
                          d="M301.9,334.3c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l7-7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-6.5,6.5l6.5,6.5c0.3,0.3,0.3,0.8,0,1.1C302.3,334.2,302.1,334.3,301.9,334.3z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
                <button @click="nextTimeFrame">
                  <svg
                    id="Layer_1"
                    class="arrow-right-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4476" transform="translate(-921 -421)">
                      <rect
                        id="Rectangle_3014"
                        x="921"
                        y="421"
                        class="fill-hide"
                        width="18"
                        height="18"
                      ></rect>
                      <g
                        id="Icon_feather-chevron-down"
                        transform="translate(925.75 422.25)"
                      >
                        <path
                          id="Path_3433"
                          class="fill-color"
                          d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
              <h2 v-if="lastDate !== 'all'" class="title">
                {{ getDayTitle }} :
                {{ $moment(dStartDate).format(DATE_FORMAT) }} -
                {{ $moment(dEndDate).format(DATE_FORMAT) }}
              </h2>
              <div class="month-range-filter">
                <Select2
                  v-model="lastDate"
                  :options="lastDateOptions"
                  placeholder="Select Day"
                  custom-event
                  @input="getDate($event)"
                />
              </div>
              <div class="report-date">
                <DateRangePicker
                  v-show="lastDate === '-2'"
                  ref="dateRangePicker"
                  :start-date.sync="dStartDate"
                  :end-date.sync="dEndDate"
                  placeholder="Select Date Range"
                  class="daterange"
                  human
                  custom-event
                  @dateChanged="rangeDateChanged($event)"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="row big-gutters justify-content-center align-items-center">
        <div class="col-md-3">
          <div class="box box-1">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.total_contact }}</h3>
              <h4>
                Total Contacts
                <InfoIcon
                  msg="Total Contacts: Total Number of contacts arrived from the integrations (e.g. SharpSpring), added manually or imported during the selected timeframe."
                />
              </h4>
            </template>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box box-5">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.assign_contact }}</h3>
              <h4>
                Assigned Contacts
                <InfoIcon
                  msg="Assigned Contacts: The contacts either assigned to RSM/RSMs and/or Dealer, and/or both."
                />
              </h4>
            </template>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box box-2">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.unassign_contact }}</h3>
              <h4>
                Unassigned Contacts
                <InfoIcon
                  msg="Unassigned Contacts: The contacts, which is/are not assigned to any RSM/RSMsm or Dealer."
                />
              </h4>
            </template>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box box-3">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.unqualified_contact }}</h3>
              <h4>
                Unqualified Contacts
                <InfoIcon
                  msg="Unqualified Contacts: The contacts which is/are not having the checkbox 'Qualified' ticked."
                />
              </h4>
            </template>
          </div>
        </div>
      </div>
      <div
        class="row big-gutters justify-content-center align-items-center mt2"
      >
        <div class="col-md-3">
          <div class="box box-1">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.totalLeads }}</h3>
              <h4>
                Total Leads
                <InfoIcon
                  msg="Total Leads: Total Number of Leads which are added as inquries (product assignment) under contacts. "
                />
              </h4>
            </template>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box box-5">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.assignedLeads }}</h3>
              <h4>
                Assigned Leads
                <InfoIcon
                  msg="Assigned Leads: The leads either assigned to RSM/RSMs and/or Dealer, and/or both."
                />
              </h4>
            </template>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box box-2">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.unAssignedLeads }}</h3>
              <h4>
                Unassigned Leads
                <InfoIcon
                  msg="Unassigned Leads: The leads/inquiries, which is/are not assigned to any RSM/RSMsm or Dealer."
                />
              </h4>
            </template>
          </div>
        </div>
        <div class="col-md-3">
          <div class="box box-3">
            <InnerLoader v-if="statistics.isStatLoading" />
            <template v-else>
              <h3>{{ statistics.unQualifiedLeads }}</h3>
              <h4>
                Unqualified Leads
                <InfoIcon
                  msg="Unqualified Leads: The leads/enquiries which is/are having status as 'Unqualified'."
                />
              </h4>
            </template>
          </div>
        </div>
      </div>
      <div class="row big-gutters">
        <div class="col-md-12">
          <div class="chartBox no-box-shadow">
            <div class="title">
              <h4>
                RSMs Lead List
                <i
                  v-tooltip="`RSMs Lead List`"
                  class="fa fa-info-circle"
                  aria-hidden="true"
                  title=""
                ></i>
              </h4>
            </div>
          </div>
          <div class="tableDetail">
            <div class="common-box bg-gray">
              <div class="table-list-view table-list-scrolling scrolling">
                <ul class="thead">
                  <li>
                    <div
                      class="name-email sorting sortarrow flex55"
                      :class="[
                        rsmSortData === 'name' && rsmCurrentSortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <div class="blank-space30"></div>
                      <span @click="toggleRSMSortData('name')">RSMs Name</span>
                    </div>
                    <div
                      :class="[
                        rsmSortData === 'total_assign_leads' &&
                        rsmCurrentSortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                      class="sorting sortarrow flex15 text-center"
                    >
                      <span @click="toggleRSMSortData('total_assign_leads')"
                        >Total Leads Assigned</span
                      >
                    </div>
                    <div
                      class="sorting sortarrow flex15 text-center"
                      :class="[
                        rsmSortData === 'total_open_leads' &&
                        rsmCurrentSortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleRSMSortData('total_open_leads')"
                        >Open Leads</span
                      >
                    </div>
                    <div
                      class="sorting sortarrow flex15 text-center"
                      :class="[
                        rsmSortData === 'total_close_leads' &&
                        rsmCurrentSortOrder === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span @click="toggleRSMSortData('total_close_leads')"
                        >Closed Leads</span
                      >
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <li v-for="rsm in rsmList" :key="rsm.user_id">
                      <div class="name-email tb-column flex55">
                        <div class="media">
                          <div class="media-left pr0">
                            <div
                              class="profile-char fl-as-imgtxt"
                              :class="rsm.name && rsm.name.charAt(0)"
                            >
                              {{ rsm.name && rsm.name.charAt(0) }}
                            </div>
                          </div>
                          <div class="media-body">
                            <label>
                              <nuxt-link
                                class="table-a"
                                :to="{
                                  name: 'workspace_id-lead-rsm-id',
                                  params: {
                                    workspace_id: $_auth().id,
                                    id: rsm.user_id,
                                  },
                                }"
                                >{{ rsm.name ? rsm.name : '-' }}</nuxt-link
                              >
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="assigned-lead text-center tb-column flex15">
                        <div class="top-column img-text">
                          <div class="big">
                            <svg
                              id="Layer_1"
                              class="lead-icon orange"
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
                            </svg>
                            <span>{{ rsm.total_assign_leads }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="assigned-lead tb-column flex15 text-center">
                        <div class="top-column img-text">
                          <div class="big">
                            <svg
                              id="Layer_1"
                              class="lead-icon orange"
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
                            </svg>
                            <span>{{ rsm.total_open_leads }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="assigned-lead tb-column flex15 text-center">
                        <div class="top-column img-text">
                          <div class="big">
                            <svg
                              id="Layer_1"
                              class="lead-icon orange"
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
                            </svg>
                            <span>{{ rsm.total_close_leads }}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <EmptyState v-if="!isLoading && !rsmList.length" />
                    <client-only>
                      <infinite-loading
                        :identifier="rsmInfiniteId"
                        @infinite="rsmInfiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="200"
                          >
                            <rect
                              v-for="index in 8"
                              :key="index"
                              x="0"
                              :y="contentLoaderData[index]"
                              rx="0"
                              ry="0"
                              width="400"
                              height="15"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results"></div>
                      </infinite-loading>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="chartBox">
            <div class="title">
              <h4>
                Lead Assignment by Location
                <i
                  v-tooltip="
                    `Number of Leads/Inquires assigned to the dealers by location/state for the selected time duration.`
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                  title=""
                ></i>
              </h4>
            </div>
            <div class="stateTabs">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a
                    href="#united-state"
                    data-toggle="tab"
                    class="nav-link active"
                    @click="country = 'United States'"
                    >United State</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#canada"
                    data-toggle="tab"
                    class="nav-link"
                    @click="country = 'Canada'"
                    >Canada</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    href="#australia"
                    data-toggle="tab"
                    class="nav-link"
                    @click="country = 'Australia'"
                    >Australia</a
                  >
                </li>
              </ul>
              <div class="tab-content">
                <div
                  v-if="country === 'United States'"
                  id="united-state"
                  class="tab-pane active"
                >
                  <div class="row no-gutters">
                    <div class="col-md-8">
                      <div class="chart h-100">
                        <InnerLoader v-if="mapLoading" :bg-white="false" />
                        <EmptyAnalyticsMap
                          v-else-if="
                            !mapLoading &&
                            !usaHighlightChartOption.series[0].data.length
                          "
                          class="h-100"
                        />
                        <highlight-chart
                          v-else
                          :chart-options="usaHighlightChartOption"
                        />
                      </div>
                    </div>
                    <DealershipList
                      ref="dealerList"
                      :country="country"
                      :state-options="stateOptions"
                      :d-start-date="dStartDate"
                      :d-end-date="dEndDate"
                    />
                  </div>
                </div>
                <div
                  v-else-if="country === 'Canada'"
                  id="canada"
                  class="tab-pane active"
                >
                  <div class="row no-gutters">
                    <div class="col-md-8">
                      <div class="chart h-100">
                        <InnerLoader v-if="mapLoading" :bg-white="false" />
                        <EmptyAnalyticsMap
                          v-else-if="
                            !mapLoading &&
                            !canadaHighlightChartOption.series[0].data.length
                          "
                          class="h-100"
                        />
                        <highlight-chart
                          v-else
                          :chart-options="canadaHighlightChartOption"
                        />
                      </div>
                    </div>
                    <DealershipList
                      ref="dealerList"
                      :country="country"
                      :state-options="stateOptions"
                      :d-start-date="dStartDate"
                      :d-end-date="dEndDate"
                    />
                  </div>
                </div>
                <div
                  v-else-if="country === 'Australia'"
                  id="australia"
                  class="tab-pane active"
                >
                  <div class="row no-gutters">
                    <div class="col-md-8">
                      <div class="chart h-100">
                        <InnerLoader v-if="mapLoading" :bg-white="false" />
                        <EmptyAnalyticsMap
                          v-else-if="
                            !mapLoading &&
                            !australiaHighlightChartOption.series[0].data.length
                          "
                          class="h-100"
                        />
                        <highlight-chart
                          v-else
                          :chart-options="australiaHighlightChartOption"
                        />
                      </div>
                    </div>
                    <DealershipList
                      ref="dealerList"
                      :country="country"
                      :state-options="stateOptions"
                      :d-start-date="dStartDate"
                      :d-end-date="dEndDate"
                    />
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
// import Moment from 'moment-timezone'
import { mapGetters } from 'vuex'
import InfoIcon from '~/components/svg/InfoIcon.vue'
import InnerLoader from '~/components/lead/InnerLoader.vue'
import HighlightChart from '~/components/plugins/HighlightChart.vue'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import Select2 from '~/components/lead/Select2'
import AnalyticsMixins from '~/mixins/analyticsMixins'
import LeadMixin from '~/mixins/lead'
import EmptyState from '~/components/theme/global/EmptyState'
import DealershipList from '~/components/lead/ExecutiveDashboard/DealershipList.vue'
import EmptyAnalyticsMap from '~/components/theme/global/EmptyAnalyticsMap'
export default {
  components: {
    DateRangePicker,
    Select2,
    ContentLoader,
    HighlightChart,
    EmptyState,
    InnerLoader,
    DealershipList,
    EmptyAnalyticsMap,
    InfoIcon,
  },
  mixins: [AnalyticsMixins, LeadMixin],
  layout: 'leadLayout',
  data() {
    return {
      statistics: {
        isStatLoading: false,
        totalLeads: 0,
        assignedLeads: 0,
        unAssignedLeads: 0,
        unQualifiedLeads: 0,
        qualifiedLead: 0,
        assign_contact: 0,
        total_contact: 0,
        unassign_contact: 0,
        unqualified_contact: 0,
      },
      noStatusFound: false,
      stateOptions: [],
      stateWiseLeads: [],
      leadInfiniteId: +new Date(),
      page: 0,
      last_page: null,
      isLoading: false,
      currentSort: 'ASC',
      sortData: 'name',
      // lastDate: '',
      // dStartDate: Moment().format('YYYY-MM-DD'),
      // dEndDate: Moment().format('YYYY-MM-DD'),
      // activeDate: Moment().format('YYYY-MM-DD'),

      country: 'United States',
      mapLoading: false,

      // Rsm
      rsmList: [],
      rsmInfiniteId: +new Date(),
      rsmPage: 0,
      rsmLastPage: null,
      rsmCurrentSortOrder: 'ASC',
      rsmSortData: 'ASC',
      contentLoaderData: [-1, 15, 31, 47, 63, 79, 95, 111, 127, 143],
    }
  },
  computed: {
    ...mapGetters({
      lastDate: 'RSM/getLastDate',
      dStartDate: 'RSM/getStartDate',
      dEndDate: 'RSM/getEndDate',
      activeDate: 'RSM/getActiveDate',
    }),
    activeDate: {
      set(payload) {
        this.$store.dispatch('RSM/setActiveDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getActiveDate']
      },
    },
    lastDate: {
      set(payload) {
        this.$store.dispatch('RSM/setLastDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getLastDate']
      },
    },
    dStartDate: {
      set(payload) {
        this.$store.dispatch('RSM/setStartDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getStartDate']
      },
    },
    dEndDate: {
      set(payload) {
        this.$store.dispatch('RSM/setEndDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getEndDate']
      },
    },
  },
  watch: {
    country() {
      this.getMapLeads()
      this.$refs.dealerList.handleChangeInfinite()
    },
  },
  mounted() {
    this.setDateWhenLoad()
  },
  methods: {
    rsmChangeHandler() {
      this.rsmPage = 0
      this.rsmLastPage = null
      this.rsmList = []
      this.rsmInfiniteId = new Date()
    },
    previousTimeFrame() {
      if (this.getDayTitle === 'Week') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(7, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(6, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === '30 Days') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(30, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(29, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === 'Year') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(365, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(364, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === 'Quarter') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(90, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(89, 'days')
          .format('YYYY-MM-DD')
      }
      const data = {
        startDate: this.dStartDate,
        endDate: this.dEndDate,
      }
      this.getAllData(data)
    },
    nextTimeFrame() {
      if (this.getDayTitle === 'Week') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(7, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === '30 Days') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(30, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === 'Year') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(365, 'days')
          .format('YYYY-MM-DD')
      }

      if (this.getDayTitle === 'Quarter') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(90, 'days')
          .format('YYYY-MM-DD')
      }
      const data = {
        startDate: this.dStartDate,
        endDate: this.dEndDate,
      }
      this.getAllData(data)
    },
    async getMapLeads() {
      this.mapLoading = true
      const { data } = await this.$axios.$post(
        'lm/dashboard/map-lead-by-date-range',
        {
          start_date: this.dStartDate,
          end_date: this.dEndDate,
          country: this.country,
        }
      )
      this.mapLoading = false
      switch (this.country) {
        case 'United States':
          this.usaHighlightChartOption.series[0].data = data.lead_data.map(
            (e, i) => {
              const data = Object.entries(e).flat()
              return data
            }
          )
          break
        case 'Canada':
          this.canadaHighlightChartOption.series[0].data = data.lead_data.map(
            (e, i) => {
              const data = Object.entries(e).flat()
              return data
            }
          )
          break
        case 'Australia':
          this.australiaHighlightChartOption.series[0].data =
            data.lead_data.map((e, i) => {
              const data = Object.entries(e).flat()
              return data
            })
          break

        default:
          break
      }
      this.stateOptions = data.state_data
    },
    toggleRSMSortData(data) {
      if (this.isLoading) return
      if (this.rsmSortData !== data) {
        this.rsmSortData = data
        this.rsmCurrentSortOrder = 'ASC'
      } else {
        this.rsmCurrentSortOrder =
          this.rsmCurrentSortOrder === 'ASC' ? 'DESC' : 'ASC'
      }
      this.rsmChangeHandler()
    },
    infiniteHandler($state) {
      this.page += 1
      this.isLoading = true
      this.$axios
        .$post(
          `lm/dashboard/state-wise-lead-data`,
          {
            start_date: this.dStartDate,
            end_date: this.dEndDate,
            state_code: this.selectedState || '',
          },
          {
            params: {
              page: this.page,
              sortvalue: this.sortData,
              orderby: this.currentSort,
            },
          }
        )
        .then(({ data }) => {
          this.last_page = data.last_page
          if (data.data && data.data.length) {
            if (this.page === data.current_page) {
              this.stateWiseLeads.push(...data.data)
              $state.loaded()
              if (this.last_page === this.page) {
                $state.complete()
              }
            }
          } else {
            $state.complete()
          }
          this.isLoading = false
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    rsmInfiniteHandler($state) {
      this.rsmPage += 1
      this.isLoading = true
      this.$axios
        .$post(
          `lm/executive-dashboard/rsm-list`,
          {
            start_date: this.dStartDate,
            end_date: this.dEndDate,
          },
          {
            params: {
              page: this.rsmPage,
              sortvalue: this.rsmSortData,
              orderby: this.rsmCurrentSortOrder,
            },
          }
        )
        .then(({ data }) => {
          this.rsmLastPage = data.last_page
          if (data.data && data.data.length) {
            if (this.rsmPage === data.current_page) {
              this.rsmList.push(...data.data)
              $state.loaded()
              if (this.rsmLastPage === this.rsmPage) {
                $state.complete()
              }
            }
          } else {
            $state.complete()
          }
          this.isLoading = false
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    getLeadStatistics() {
      this.statistics.isStatLoading = true
      this.$axios
        .$post('lm/dashboard/get-user-lead-count', {
          start_date: this.dStartDate,
          end_date: this.dEndDate,
        })
        .then(({ data }) => {
          const {
            assign_contact = 0,
            assign_lead = 0,
            total_contact = 0,
            total_lead = 0,
            unassign_contact = 0,
            unassign_lead = 0,
            unqualified_contact = 0,
            unqualified_lead = 0,
            qualified_lead = 0,
          } = data
          this.statistics.totalLeads = total_lead
          this.statistics.assignedLeads = assign_lead
          this.statistics.unAssignedLeads = unassign_lead
          this.statistics.unQualifiedLeads = unqualified_lead
          this.statistics.qualifiedLead = qualified_lead
          this.statistics.assign_contact = assign_contact
          this.statistics.total_contact = total_contact
          this.statistics.unassign_contact = unassign_contact
          this.statistics.unqualified_contact = unqualified_contact
        })
        .catch(console.log)
        .finally(() => {
          this.statistics.isStatLoading = false
        })
    },
    setDateWhenLoad() {
      this.lastDate = '29'
      this.getDate()
    },
    getDate() {
      if (this.lastDate > -1) {
        const { startDate, endDate } = this.getDateByDays(this.lastDate)
        this.dStartDate = startDate
        this.dEndDate = endDate
        this.getAllData()
      } else if (this.lastDate === 'all') {
        this.dStartDate = 'all'
        this.dEndDate = 'all'
        this.getAllData()
      } else if (this.lastDate === '-2') {
        this.$nextTick(() => {
          this.$refs.dateRangePicker.$el.click()
        })
      }
    },
    rangeDateChanged() {
      this.lastDate = '-2'
      this.getAllData()
    },
    getAllData() {
      this.getLeadStatistics()
      this.getMapLeads()
      // this.handleChangeInfinite()
      this.rsmChangeHandler()
      this.$refs.dealerList.handleChangeInfinite()
    },
  },
}
</script>
