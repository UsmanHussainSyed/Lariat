<template>
  <div id="newAnalytics" class="newAnalytics leadAnalytics customscrollbar">
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
    <div
      v-if="isSuperAdmin"
      class="row big-gutters justify-content-center align-items-center"
    >
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
      class="row big-gutters justify-content-center align-items-center"
      :class="{ mt2: isSuperAdmin }"
    >
      <div class="col-md-3">
        <div class="box box-1">
          <InnerLoader v-if="statistics.isStatLoading" />
          <template v-else>
            <h3>{{ statistics.totalLeads }}</h3>
            <h4>
              Total Leads
              <InfoIcon
                msg="Total Leads: Total Number of Leads which are added as inquries (product assignment) under contacts."
              />
            </h4>
          </template>
        </div>
      </div>
      <div v-if="isSuperAdmin" class="col-md-3">
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
      <div v-if="isSuperAdmin" class="col-md-3">
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
      <div v-if="isDealerAdmin || isRSM" class="col-md-3">
        <div class="box box-2">
          <InnerLoader v-if="statistics.isStatLoading" />
          <template v-else>
            <h3>{{ statistics.qualifiedLead }}</h3>
            <h4>
              Qualified Leads
              <InfoIcon
                msg="Qualified Leads: The leads/enquiries which is/are having status as 'Qualified'."
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
      <div v-if="isSuperAdmin" class="col-md-12">
        <div class="chartBox">
          <div class="title">
            <h4>
              Contact Counts
              <i
                v-tooltip="
                  `Contacts: Number of prospects added to the system for the selected time duration (Manually, Imported, via Integration).`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
                title=""
              ></i>
            </h4>
          </div>
          <div v-show="isContactLineChart" class="chart">
            <line-chart
              label="Contacts"
              :labels="lineContactsChartLabels"
              :data="lineContactsChartValues"
            />
          </div>
          <EmptyAnalyticsLine v-if="!isContactLineChart" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="chartBox">
          <div class="title">
            <h4>
              Lead Counts
              <i
                v-tooltip="
                  `Lead Counts: Number of leads added to the system for the selected time duration to the prospects.`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
                title=""
              ></i>
            </h4>
          </div>
          <div v-show="isLineChart" class="chart">
            <line-chart
              label="Leads"
              :labels="lineChartLabels"
              :data="lineChartValues"
            />
          </div>
          <EmptyAnalyticsLine v-if="!isLineChart" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="chartBox">
          <div class="title">
            <h4>
              Lead Count by Product
              <i
                v-tooltip="
                  `Number of leads by-product, assigned for the selected time duration.`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
                title=""
              ></i>
            </h4>
          </div>
          <div class="chart">
            <client-only>
              <div v-if="myProductData" class="row align-items-center">
                <div class="col-sm-6">
                  <client-only>
                    <custom-doughnut
                      v-if="isChart"
                      ref="doughnutRef"
                      chart-id="productChart"
                      :chart-data="myProductData"
                      :options="productOptions"
                    ></custom-doughnut>
                  </client-only>
                </div>
                <div class="col-md-6">
                  <ul v-if="isChart" class="chart-legends">
                    <li
                      v-for="(color, i) in myProductData.datasets[0]
                        .backgroundColor"
                      :id="myProductData.labels[i]"
                      :key="i"
                      class="legend"
                    >
                      <span
                        :style="{ 'background-color': `${color}` }"
                        @click="toggleChartVisiblity(i)"
                      ></span>
                      <span @click="toggleChartVisiblity(i)">
                        {{ myProductData.labels[i] }}
                        <strong
                          >({{ myProductData.datasets[0].data[i] }})</strong
                        >
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="!isChart" class="no-data">
                <div>
                  <svg
                    id="Layer_1"
                    class="pie-chart-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 150 150"
                    xml:space="preserve"
                  >
                    <g id="Pi_chart">
                      <g id="pie_chart" transform="translate(0 0.03)">
                        <path
                          id="Path_40260"
                          class="fill-color"
                          d="M71.8,150C32.2,149.9,0,117.8,0,78.1C0,38.5,29.4,6.3,65.5,6.3c1.3,0,2.4,1.1,2.4,2.4c0,0,0,0,0,0v68.6l43.6,56.1c0.8,1,0.6,2.5-0.4,3.4C99.1,146.8,89.5,150,71.8,150z M62.3,11.2C30.1,13.1,4.8,42.5,4.8,78.1c0,37,30,67,67,67c15.4,0,24-2.6,33.9-10.1l0.6-0.4L63.6,79.6c-0.3-0.4-0.5-0.9-0.5-1.5V11.2L62.3,11.2z"
                        />
                        <path
                          id="Path_40261"
                          class="fill-color"
                          d="M78.2,74.2c-1.3,0-2.4-1.1-2.4-2.4v0V2.4c0-1.3,1.1-2.4,2.4-2.4l0,0c39.7,0,71.8,32.2,71.8,71.8c0,1.3-1.1,2.4-2.4,2.4L78.2,74.2z M80.6,69.4h64.5l0-0.8c-1.6-34.1-29.6-62.1-63.7-63.7l-0.8,0L80.6,69.4z"
                        />
                        <path
                          id="Path_40262"
                          class="fill-color"
                          d="M125.4,137.6h-0.1c-0.7,0-1.3-0.4-1.7-0.9L82.6,86c-0.8-1.1-0.7-2.6,0.4-3.4c0.4-0.3,0.9-0.5,1.5-0.5h63.1c1.3,0,2.4,1.1,2.4,2.4c0,19.9-8.3,38.9-22.9,52.6C126.7,137.4,126.1,137.7,125.4,137.6L125.4,137.6z M125.7,131.6l0.6-0.6c11.3-11.7,18-27.1,18.8-43.4l0-0.8H89.5L125.7,131.6z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>Data not available</span>
                </div>
              </div>
            </client-only>
            <!-- <EmptyAnalytics v-if="!isChart" /> -->
          </div>
        </div>
      </div>
      <div v-if="isSuperAdmin" class="col-md-12">
        <div class="chartBox">
          <div class="title">
            <h4>
              Lead Count by RSMs
              <i
                v-tooltip="
                  `Number of leads/inquiries assigned to the RSMs for the selected time duration.`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
                title=""
              ></i>
            </h4>
          </div>
          <div class="chart">
            <client-only>
              <div v-if="leadRsmData" class="row align-items-center">
                <div class="col-sm-6">
                  <client-only>
                    <custom-doughnut
                      v-if="isRsmChart"
                      ref="rsmDoughnutRef"
                      chart-id="rsmChart"
                      :chart-data="leadRsmData"
                      :options="leadRsmOptions"
                    ></custom-doughnut>
                  </client-only>
                </div>
                <div class="col-md-6">
                  <ul v-if="isRsmChart" class="chart-legends">
                    <li
                      v-for="(color, i) in leadRsmData.datasets[0]
                        .backgroundColor"
                      :id="leadRsmData.labels[i]"
                      :key="i"
                      class="legend"
                    >
                      <span
                        :style="{ 'background-color': `${color}` }"
                        @click="toggleRsmChartVisiblity(i)"
                      ></span>
                      <span @click="toggleRsmChartVisiblity(i)">
                        {{ leadRsmData.labels[i] }}
                        <strong>({{ leadRsmData.datasets[0].data[i] }})</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="!isRsmChart" class="no-data">
                <div>
                  <svg
                    id="Layer_1"
                    class="pie-chart-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 150 150"
                    xml:space="preserve"
                  >
                    <g id="Pi_chart">
                      <g id="pie_chart" transform="translate(0 0.03)">
                        <path
                          id="Path_40260"
                          class="fill-color"
                          d="M71.8,150C32.2,149.9,0,117.8,0,78.1C0,38.5,29.4,6.3,65.5,6.3c1.3,0,2.4,1.1,2.4,2.4c0,0,0,0,0,0v68.6l43.6,56.1c0.8,1,0.6,2.5-0.4,3.4C99.1,146.8,89.5,150,71.8,150z M62.3,11.2C30.1,13.1,4.8,42.5,4.8,78.1c0,37,30,67,67,67c15.4,0,24-2.6,33.9-10.1l0.6-0.4L63.6,79.6c-0.3-0.4-0.5-0.9-0.5-1.5V11.2L62.3,11.2z"
                        />
                        <path
                          id="Path_40261"
                          class="fill-color"
                          d="M78.2,74.2c-1.3,0-2.4-1.1-2.4-2.4v0V2.4c0-1.3,1.1-2.4,2.4-2.4l0,0c39.7,0,71.8,32.2,71.8,71.8c0,1.3-1.1,2.4-2.4,2.4L78.2,74.2z M80.6,69.4h64.5l0-0.8c-1.6-34.1-29.6-62.1-63.7-63.7l-0.8,0L80.6,69.4z"
                        />
                        <path
                          id="Path_40262"
                          class="fill-color"
                          d="M125.4,137.6h-0.1c-0.7,0-1.3-0.4-1.7-0.9L82.6,86c-0.8-1.1-0.7-2.6,0.4-3.4c0.4-0.3,0.9-0.5,1.5-0.5h63.1c1.3,0,2.4,1.1,2.4,2.4c0,19.9-8.3,38.9-22.9,52.6C126.7,137.4,126.1,137.7,125.4,137.6L125.4,137.6z M125.7,131.6l0.6-0.6c11.3-11.7,18-27.1,18.8-43.4l0-0.8H89.5L125.7,131.6z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>Data not available</span>
                </div>
              </div>
            </client-only>
            <!-- <EmptyAnalytics v-if="!isChart" /> -->
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
                  <lead-list-tab
                    ref="leadListTab"
                    :country="country"
                    :state-options="stateOptions"
                    :d-start-date="dStartDate"
                    :d-end-date="dEndDate"
                  />
                </div>
              </div>
              <div
                v-if="country === 'Canada'"
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
                  <lead-list-tab
                    ref="leadListTab"
                    :country="country"
                    :state-options="stateOptions"
                    :d-start-date="dStartDate"
                    :d-end-date="dEndDate"
                  />
                </div>
              </div>
              <div
                v-if="country === 'Australia'"
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
                  <lead-list-tab
                    ref="leadListTab"
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
      <div class="col-md-12">
        <div class="chartBox">
          <div class="title">
            <h4>
              Lead by Product Status
              <i
                v-tooltip="
                  `Number of leads/inquiries with the respective statuses for the selected time duration to the prospects.`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
                title=""
              ></i>
            </h4>
          </div>
          <div class="chart">
            <EmptyAnalytics v-if="isBarLoading || noStatusFound" />
            <barChart
              v-else
              ref="barChart"
              :data="leadProductStatus"
              @onBarChanged="selectProductStatus"
            />
          </div>
        </div>
      </div>
      <div :class="[isDealerAdmin || isRSM ? 'col-md-6' : 'col-md-12']">
        <div class="chartBox">
          <div class="title">
            <h4>
              Top 5 Products
              <i
                v-tooltip="
                  `Top 5 products assigned to the prospects & leads for the selected time duration.`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
              ></i>
            </h4>
          </div>
          <div class="chart">
            <a>
              <barChart
                v-if="!isBarLoading && topProducts.labels.length"
                ref="barChart"
                :data="topProducts"
              />
            </a>
            <EmptyAnalytics v-if="isBarLoading || !topProducts.labels.length" />
          </div>
        </div>
      </div>
      <div v-if="isSuperAdmin || isRSM" class="col-md-6">
        <div class="chartBox">
          <div class="title">
            <h4>
              Top 5 Dealers
              <i
                v-tooltip="
                  `Top 5 Dealers with the most assigned lead counts for the selected time duration.`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
                title=""
              ></i>
            </h4>
          </div>
          <div class="chart">
            <a>
              <barChart
                v-if="!isRsmDealerLoading && topDealers.labels.length"
                ref="barChart"
                :data="topDealers"
              />
            </a>
            <EmptyAnalytics
              v-if="isRsmDealerLoading || !topDealers.labels.length"
            />
          </div>
        </div>
      </div>
      <div v-if="!isRSM" class="col-md-6">
        <div class="chartBox">
          <div class="title">
            <h4>
              Top 5 RSMs
              <i
                v-tooltip="
                  `Top 5 RSMs with the most assigned lead counts for the selected time duration.`
                "
                class="fa fa-info-circle"
                aria-hidden="true"
                title=""
              ></i>
            </h4>
          </div>
          <div class="chart">
            <a>
              <barChart
                v-if="!isRsmDealerLoading && topRsm.labels.length"
                ref="barChart"
                :data="topRsm"
              />
            </a>
            <EmptyAnalytics
              v-if="isRsmDealerLoading || !topRsm.labels.length"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InnerLoader from '../InnerLoader.vue'
import HighlightChart from '~/components/plugins/HighlightChart.vue'
import LineChart from '~/components/lead/LineChart'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import Select2 from '~/components/lead/Select2'
import customDoughnut from '~/components/lead/CustomDoughnut'
import barChart from '~/components/lead/BarChart'
import EmptyAnalytics from '~/components/theme/global/EmptyAnalytics'
import EmptyAnalyticsMap from '~/components/theme/global/EmptyAnalyticsMap'
import EmptyAnalyticsLine from '~/components/theme/global/EmptyAnalyticsLine'
import AnalyticsMixins from '~/mixins/analyticsMixins'
import LeadMixin from '~/mixins/lead'
import LeadListTab from '~/components/lead/analytics/LeadListTab'
export default {
  components: {
    LineChart,
    DateRangePicker,
    Select2,
    customDoughnut,
    barChart,
    EmptyAnalytics,
    HighlightChart,
    InnerLoader,
    LeadListTab,
    EmptyAnalyticsMap,
    EmptyAnalyticsLine,
  },
  mixins: [AnalyticsMixins, LeadMixin],
  data() {
    return {
      lineChartData: null,
      lineChartDataForContacts: null,
      lineChartActive: 'day',
      isChart: false,
      isRsmChart: false,
      isLineChart: false,
      isContactLineChart: false,
      myProductData: null,
      productOptions: null,
      leadRsmOptions: null,
      leadRsmData: null,
      rsmChartData: [],
      chartData: [],
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
      leadProductStatus: {
        labels: [],
        datasets: [
          {
            maxBarThickness: 100,
            label: 'Lead Products Status',
            data: [],
            backgroundColor: [],
            borderWidth: 1,
          },
        ],
      },
      topProducts: {
        labels: [],
        datasets: [
          {
            maxBarThickness: 90,
            label: 'Top Products',
            data: [],
            backgroundColor: [],
            borderWidth: 1,
          },
        ],
      },
      topRsm: {
        labels: [],
        datasets: [
          {
            maxBarThickness: 90,
            label: 'Top RSMs',
            data: [],
            backgroundColor: [],
            borderWidth: 1,
          },
        ],
      },
      topDealers: {
        labels: [],
        datasets: [
          {
            maxBarThickness: 90,
            label: 'Top Dealers',
            data: [],
            backgroundColor: [],
            borderWidth: 1,
          },
        ],
      },
      noStatusFound: false,
      stateOptions: [],
      country: 'United States',
      isRsmDealerLoading: false,
      isBarLoading: false,
      mapLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      // count: 'analytics/getDuration',
      lastDate: 'analytics/getLastDate',
      dStartDate: 'analytics/getStartDate',
      dEndDate: 'analytics/getEndDate',
      status: 'analytics/getStatus',
      statusIds: 'analytics/getStatusList',
      activeDate: 'analytics/getActiveDate',
    }),
    status: {
      set(payload) {
        this.$store.dispatch('analytics/setStatus', payload)
      },
      get() {
        return this.$store.getters['analytics/getStatus']
      },
    },
    activeDate: {
      set(payload) {
        this.$store.dispatch('analytics/setActiveDate', payload)
      },
      get() {
        return this.$store.getters['analytics/getActiveDate']
      },
    },
    lastDate: {
      set(payload) {
        this.$store.dispatch('analytics/setLastDate', payload)
      },
      get() {
        return this.$store.getters['analytics/getLastDate']
      },
    },
    dStartDate: {
      set(payload) {
        this.$store.dispatch('analytics/setStartDate', payload)
      },
      get() {
        return this.$store.getters['analytics/getStartDate']
      },
    },
    dEndDate: {
      set(payload) {
        this.$store.dispatch('analytics/setEndDate', payload)
      },
      get() {
        return this.$store.getters['analytics/getEndDate']
      },
    },
    isSuperAdmin() {
      return this.$_auth().user.lead.isSuperAdmin
    },
    isRSM() {
      return this.$_auth().user.lead.isRSM
    },
    isDealerAdmin() {
      return (
        this.$_auth().user.lead.isDealerAdmin ||
        this.$_auth().user.lead.isDealerGroupAdmin ||
        this.$_auth().user.lead.isSalesPerson
      )
    },
    lineChartLabels() {
      if (this.lineChartData) return this.lineChartData.map((d) => d.date)
      return []
    },
    lineChartValues() {
      if (this.lineChartData) return this.lineChartData.map((d) => d.count)
      return []
    },
    lineContactsChartValues() {
      if (this.lineChartDataForContacts)
        return this.lineChartDataForContacts.map((d) => d.count)
      return []
    },
    lineContactsChartLabels() {
      if (this.lineChartDataForContacts)
        return this.lineChartDataForContacts.map((d) => d.date)
      return []
    },
  },
  watch: {
    country() {
      this.getMapLeads()
      if (this.$refs.leadListTab.currentListTab === '1') {
        this.$refs.leadListTab.handleChangeInfinite()
      } else {
        this.$refs?.leadListTab?.handleAssignmentChange()
      }
    },
  },
  mounted() {
    this.setDateWhenLoad()
  },
  methods: {
    // onLineChanged({ x, y }) {
    //   this.$emit('show-analytics', true)
    //   this.status = '0'
    // },
    selectProductStatus({ x, y }) {
      this.$emit('show-analytics', true)
      this.status = this.statusIds.find((s) => s.status_name === x).status_id
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
    // based on country
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
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    setDateWhenLoad() {
      this.lastDate = '29'
      this.getDate()
    },
    async leadRsmDoughnutData() {
      this.isRsmChart = false
      await this.$axios
        .$post(`lm/dashboard/rsm-pi-chart-lead-count`, {
          start_date: this.dStartDate,
          end_date: this.dEndDate,
        })
        .then(({ data }) => {
          this.rsmChartData = []
          data = data.filter((d) => {
            return d.lead_count > 0
          })
          data.forEach((d) => {
            Object.assign(d, {
              color: this.getRandomColor(),
            })
          })
          this.rsmChartData = data
          if (this.rsmChartData.length) {
            this.rsmDoughNut()
          }
        })
    },
    rsmDoughNut() {
      this.isRsmChart = false
      const la = []
      const col = []
      const da = []
      for (let i = 0; i < this.rsmChartData.length; i++) {
        la.push(this.rsmChartData[i].user_name)
        da.push(this.rsmChartData[i].lead_count)
        col.push(this.rsmChartData[i].color)
      }
      this.leadRsmData = {
        labels: la,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: col,
            data: da,
          },
        ],
      }
      this.leadRsmOptions = {
        responsive: true,
        maintainAspectRatio: false,
        hoverBorderWidth: 20,
        borderWidth: '10px',
        title: {
          display: false,
          text: `lead count`,
        },
      }
      this.isRsmChart = true
      this.$refs.rsmDoughnutRef?.doughnutInstance?.update()
    },
    async doughnutChartData() {
      this.isChart = false
      await this.$axios
        .$post(`lm/dashboard/pi-chart-lead-count`, {
          start_date: this.dStartDate,
          end_date: this.dEndDate,
        })
        .then(({ data }) => {
          this.chartData = []
          for (let i = 0; i < data.length; i++) {
            data[i].product = data[i].product.filter((productD) => {
              return productD.total_lead > 0
            })
            if (data[i].product.length) {
              for (const lead of data[i].product) {
                if (lead.total_lead !== 0) {
                  Object.assign(lead, {
                    color: this.getRandomColor(),
                  })
                }
              }
              this.chartData.push(data[i])
            }
          }
          if (this.chartData.length) {
            this.doughNut()
          }
        })
    },
    doughNut() {
      this.isChart = false
      const la = []
      const col = []
      const da = []
      for (let i = 0; i < this.chartData.length; i++) {
        for (let j = 0; j < this.chartData[i].product.length; j++) {
          la.push(this.chartData[i].product[j].product_name)
          da.push(this.chartData[i].product[j].total_lead)
          col.push(this.chartData[i].product[j].color)
        }
      }
      this.myProductData = {
        labels: la,
        datasets: [
          {
            label: 'Data One',
            backgroundColor: col,
            data: da,
          },
        ],
      }
      this.productOptions = {
        responsive: true,
        maintainAspectRatio: false,
        hoverBorderWidth: 20,
        borderWidth: '10px',
        title: {
          display: false,
          text: `lead count`,
        },
      }
      this.$nextTick(() => {
        this.isChart = true
      })
      this.$refs.doughnutRef?.doughnutInstance?.update()
    },
    toggleChartVisiblity(value) {
      const visibilityData =
        !this.$refs.doughnutRef?.doughnutInstance.getDatasetMeta(0).data[value]
          .hidden
      this.$refs.doughnutRef.doughnutInstance.getDatasetMeta(0).data[
        value
      ].hidden =
        !this.$refs.doughnutRef.doughnutInstance.getDatasetMeta(0).data[value]
          .hidden
      const button = document.getElementById(this.myProductData.labels[value])
      if (visibilityData) {
        button.classList.add('liDisabled')
      } else {
        button.classList.remove('liDisabled')
      }
      this.$refs.doughnutRef.doughnutInstance.update()
    },
    toggleRsmChartVisiblity(value) {
      const visibilityData =
        !this.$refs.rsmDoughnutRef?.doughnutInstance.getDatasetMeta(0).data[
          value
        ].hidden
      this.$refs.rsmDoughnutRef.doughnutInstance.getDatasetMeta(0).data[
        value
      ].hidden =
        !this.$refs.rsmDoughnutRef.doughnutInstance.getDatasetMeta(0).data[
          value
        ].hidden
      const button = document.getElementById(this.leadRsmData.labels[value])
      if (visibilityData) {
        button.classList.add('liDisabled')
      } else {
        button.classList.remove('liDisabled')
      }
      this.$refs.rsmDoughnutRef.doughnutInstance.update()
    },
    getDate() {
      if (this.lastDate > -1) {
        const { startDate, endDate } = this.getDateByDays(this.lastDate)
        const data = {
          startDate,
          endDate,
        }
        this.dStartDate = startDate
        this.dEndDate = endDate
        this.getAllData(data)
      } else if (this.lastDate === 'all') {
        const data = {
          startDate: 'all',
          endDate: 'all',
        }
        this.dStartDate = 'all'
        this.dEndDate = 'all'
        this.getAllData(data)
      } else if (this.lastDate === '-2') {
        this.$nextTick(() => {
          this.$refs.dateRangePicker.$el.click()
        })
      }
    },
    /**
     * @param Object
     * @type startDate endDate
     * @required true
     */
    getAllData(data) {
      this.getLeadStatistics()
      if (this.isSuperAdmin) {
        this.loadLineChartDataForContacts(data)
      }
      this.loadLineChartData(data)
      this.getLeadProductStatus(data)
      this.rangeDateChangedChart(data)
      this.getMapLeads()
      this.getRsmDealers(data)
      if (this.$refs.leadListTab.currentListTab === '1') {
        this.$refs.leadListTab.handleChangeInfinite()
      } else {
        this.$refs?.leadListTab?.handleAssignmentChange()
      }
    },
    rangeDateChanged() {
      this.lastDate = '-2'
      const data = {
        startDate: this.dStartDate,
        endDate: this.dEndDate,
      }
      this.getAllData(data)
    },
    rangeDateChangedChart(data) {
      this.dStartDate = data.startDate
      this.dEndDate = data.endDate
      this.doughnutChartData()
      if (this.isSuperAdmin) {
        this.leadRsmDoughnutData()
      }
    },
    getLeadProductStatus(data) {
      this.isBarLoading = true
      let start_date, end_date
      if (data) {
        start_date = data.startDate
        end_date = data.endDate
      }
      this.$axios
        .$post('lm/dashboard/lead-count-by-top-product-and-status', {
          start_date,
          end_date,
        })
        .then(({ data }) => {
          this.$store.dispatch(
            'analytics/setStatusList',
            data.lead_by_product_status
          )
          // this.statusIds = data.lead_by_product_status
          if (data.lead_by_product_status.every((e) => e.total_lead === 0)) {
            this.noStatusFound = true
          } else {
            this.noStatusFound = false
          }
          const leadProductStatus = data.lead_by_product_status
          this.leadProductStatus.labels = leadProductStatus.map(
            (d) => d.status_name
          )
          this.leadProductStatus.datasets[0].backgroundColor =
            leadProductStatus.map((d) => d.status_color)
          this.leadProductStatus.datasets[0].data = leadProductStatus.map(
            (d) => d.total_lead
          )
          this.topProducts.labels = data.top_product.map((d) => d.product_name)
          this.topProducts.datasets[0].data = data.top_product.map(
            (d) => d.total_leads
          )
          data.top_product.forEach((_, i) => {
            this.topProducts.datasets[0].backgroundColor[i] = '#2B71CD'
          })
          this.isBarLoading = false
        })
    },
    getRsmDealers(data) {
      this.isRsmDealerLoading = true
      let start_date, end_date
      if (data) {
        start_date = data.startDate
        end_date = data.endDate
      }
      this.$axios
        .$post('lm/dashboard/get-top-dealer-and-rsm-lead', {
          start_date,
          end_date,
        })
        .then(({ data }) => {
          this.topRsm.labels = data.top_rsm.map((d) => d.rsm_user_name)
          this.topRsm.datasets[0].data = data.top_rsm.map((d) => d.total_leads)
          data.top_rsm.forEach((_, i) => {
            this.topRsm.datasets[0].backgroundColor[i] = '#2B71CD'
          })
          this.topDealers.labels = data.top_dealer.map((d) => d.dealership_name)
          this.topDealers.datasets[0].data = data.top_dealer.map(
            (d) => d.total_leads
          )
          data.top_dealer.forEach((_, i) => {
            this.topDealers.datasets[0].backgroundColor[i] = '#2B71CD'
          })
          this.isRsmDealerLoading = false
        })
    },
    loadLineChartDataForContacts(data) {
      let start_date, end_date
      this.isContactLineChart = false
      if (data) {
        this.lineChartActive = 'range'
        start_date = data.startDate
        end_date = data.endDate
      }
      this.$axios
        .$post('/lm/dashboard/line-chart-contact-count', {
          start_date,
          end_date,
          type: this.lastDateOptions.find((s) => s.id === this.lastDate).text,
        })
        .then(({ data }) => {
          this.lineChartDataForContacts = data
          if (data.length) {
            this.isContactLineChart = true
          }
        })
    },
    loadLineChartData(data) {
      let start_date, end_date
      this.isLineChart = false
      if (data) {
        this.lineChartActive = 'range'
        start_date = data.startDate
        end_date = data.endDate
      }
      this.$axios
        .$post('lm/dashboard/line-chart-lead-count', {
          start_date,
          end_date,
          type: this.lastDateOptions.find((s) => s.id === this.lastDate).text,
        })
        .then(({ data }) => {
          this.lineChartData = data
          if (data.length) {
            this.isLineChart = true
          }
        })
    },
  },
}
</script>
<style></style>
