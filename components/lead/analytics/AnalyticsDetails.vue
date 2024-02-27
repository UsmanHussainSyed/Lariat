<template>
  <div class="newAnalytics leadAnalytics tableDetail customscrollbar w-100">
    <div class="breadcrumb-links">
      <ul>
        <li>
          <a
            class="back"
            href="javascript:;"
            @click="$emit('show-analytics', false)"
          >
            <svg
              id="Layer_1"
              class="back-icon blue mr-1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4468" transform="translate(-577 -181)">
                <rect
                  id="Rectangle_3007"
                  x="577"
                  y="181"
                  class="fill-hide"
                  width="18"
                  height="18"
                ></rect>
                <g id="Group_4425" transform="translate(-514.168 -476.583)">
                  <path
                    id="Icon_material-backspace"
                    class="fill-color"
                    d="M1107.7,659.8h-11.3c-0.5,0-0.9,0.3-1.2,0.7l-4.1,6.1l4.1,6.1c0.3,0.4,0.7,0.7,1.2,0.7h11.3c0.8,0,1.5-0.7,1.5-1.5v-10.5C1109.2,660.5,1108.5,659.8,1107.7,659.8z"
                  ></path>
                  <g id="Group_4424">
                    <g id="Group_4422">
                      <path
                        id="Path_3527"
                        class="fill-white"
                        d="M1099.7,669.8c-0.4,0-0.7-0.3-0.7-0.8c0-0.2,0.1-0.4,0.2-0.5l5-5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.7,0,1l-5,5C1100.1,669.8,1099.9,669.8,1099.7,669.8z"
                      ></path>
                    </g>
                    <g id="Group_4423">
                      <path
                        id="Path_3528"
                        class="fill-white"
                        d="M1104.7,669.8c-0.2,0-0.4-0.1-0.5-0.2l-5-5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l5,5c0.3,0.3,0.3,0.8,0,1.1C1105.1,669.8,1104.9,669.8,1104.7,669.8L1104.7,669.8z"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            Lead Analytics
          </a>
        </li>
        <li><span>Lead by Product Status</span></li>
      </ul>
    </div>
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
        <li>
          <span>Status : </span>
          <div class="status-dropdown search-by">
            <Select2WithColor
              v-model="queryStatus"
              :class-obj="{ 'status-select': true }"
              dropdown-css-class="status-select"
              :options="leadStatusOptions"
              placeholder="Select Lead Status"
              :custom-event="true"
              @optionChangeHandler="changeLeadStatus(...arguments)"
            />
          </div>
        </li>
        <li>
          <div class="dropdown">
            <button
              href="javascript:void(0);"
              class="btn btn-gray btn-icon dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
              :disabled="totalLeads === 0 && true"
            >
              <svg
                id="Layer_1"
                class="export-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4488" transform="translate(-1256 -320)">
                  <rect
                    id="Rectangle_3026"
                    x="1256"
                    y="320"
                    class="fill-hide"
                    width="18"
                    height="18"
                  ></rect>
                  <g id="Group_4354" transform="translate(557.089 174.823)">
                    <path
                      id="Path_3416"
                      class="fill-color"
                      d="M708.2,162.5c1.3,0,2.3-1,2.3-2.3v-3.4c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v3.4c0,0.4-0.3,0.8-0.7,0.8h-7c-0.4,0-0.7-0.3-0.7-0.8v-12.1c0-0.4,0.3-0.8,0.7-0.8h7c0.4,0,0.7,0.3,0.7,0.8v3c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-3c0-1.3-1-2.3-2.3-2.3h-7c-1.3,0-2.3,1-2.3,2.3v12.1c0,1.3,1,2.3,2.3,2.3H708.2z"
                    ></path>
                    <path
                      id="Path_3417"
                      class="fill-color"
                      d="M712.8,158.3c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l2-2.1h-10.1c-0.4,0-0.7-0.4-0.7-0.8c0-0.4,0.3-0.7,0.7-0.7h10.1l-2-2.1c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0c0.3-0.3,0.8-0.3,1,0c0,0,0,0,0,0l3.3,3.4c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.3,3.4C713.2,158.2,713,158.3,712.8,158.3z"
                    ></path>
                  </g>
                </g>
              </svg>
              <span>Export</span>
            </button>
            <ul
              class="dropdown-menu common-dropdown"
              style="will-change: transform"
            >
              <li>
                <a
                  class="dropdown-item"
                  href="javascript:void(0);"
                  @click="exportType = 'csv'"
                  >CSV</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="javascript:void(0);"
                  @click="exportType = 'xlsx'"
                  >EXCEL</a
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="report-info-right flex20 text-right"></div>
    <div class="common-box bg-gray">
      <div class="table-list-view table-list-scrolling scrolling">
        <ul class="thead">
          <li>
            <div class="contact-name sorting flex40">
              <span>Contact Name</span>
            </div>
            <div class="created-date sorting flex15">
              <span>Created Date</span>
            </div>
            <div class="product sorting flex15">
              <span>Product</span>
            </div>
            <div class="dealer sorting flex20">
              <span>Dealer</span>
            </div>
            <div class="status sorting flex10">
              <span>Status</span>
            </div>
          </li>
        </ul>
        <div class="customscrollbar no_footer">
          <ul class="tbody">
            <li v-for="lead in leads" :key="lead.id">
              <div class="contact-name tb-column flex40">
                <div class="media">
                  <div class="media-left">
                    <div
                      v-tooltip="lead.first_name || lead.email"
                      class="profile-char fl-as-imgtxt h mr0"
                    >
                      {{
                        lead.first_name
                          ? lead.first_name.charAt(0).toUpperCase()
                          : lead.email
                          ? lead.email.charAt(0).toUpperCase()
                          : ''
                      }}
                    </div>
                  </div>
                  <div class="media-body">
                    <div class="top-column">
                      <nuxt-link
                        class="dealer-num"
                        :to="{
                          name: 'workspace_id-lead-leads-id',
                          params: {
                            workspace_id: $_auth().id,
                            id: lead.id,
                          },
                        }"
                      >
                        <strong>{{
                          !isBlank(lead.name) ? lead.name : lead.email
                        }}</strong>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="created-date tb-column flex15">
                <div class="top-column">
                  <label>{{ lead.created_at_format }}</label>
                </div>
              </div>
              <div class="product tb-column flex15">
                <div class="top-column">
                  <label v-if="lead.products.length">{{
                    lead.products[0].product_name || '-'
                  }}</label>
                  <label v-else> - </label>
                </div>
              </div>
              <div class="dealer tb-column flex20">
                <div class="top-column">
                  <label v-if="lead.products.length">{{
                    lead.products[0].dealership_name || '-'
                  }}</label>
                  <label v-else> - </label>
                </div>
              </div>
              <div class="status tb-column flex10">
                <div class="top-column">
                  <lead-status
                    v-if="lead.products.length && lead.products[0].lead_status"
                    :value="lead.products[0].lead_status"
                    class="search-by"
                    :items="leadStatusOptions"
                    item_text="status_name"
                    item_value="id"
                    item_color="status_color"
                    :disabled="true"
                    :select_first="false"
                  >
                  </lead-status>
                  <label v-else> - </label>
                </div>
              </div>
            </li>
            <EmptyState v-if="!leads.length && !isLoading" />
            <client-only>
              <infinite-loading
                :identifier="leadInfiniteId"
                @infinite="leadInfiniteHandler"
              >
                <div slot="spinner">
                  <ContentLoader
                    :speed="1"
                    :animate="true"
                    :width="400"
                    :height="1000"
                  >
                    <rect
                      v-for="index in 10"
                      :key="index"
                      x="0"
                      :y="contentLoaderData[index]"
                      rx="0"
                      ry="0"
                      width="400"
                      height="13"
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
    <div v-if="exported" id="toast" class="toasts toast--green show">
      <div class="toast__icon">
        <svg
          version="1.1"
          class="toast__svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <g>
              <path
                d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <div class="toast__content">
        <p class="toast__message">
          Thank you for exporting your Leads! It will be emailed to you once it
          has been successfully generated.
        </p>
      </div>
      <div class="toast__close" @click="exported = false">
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
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'
import LeadStatus from '~/components/lead/LeadStatus.vue'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import Select2WithColor from '~/components/plugins/Select2WithColor.vue'
import Select2 from '~/components/lead/Select2'
import EmptyState from '~/components/theme/global/EmptyState'
import AnalyticsMixins from '~/mixins/analyticsMixins'
export default {
  components: {
    LeadStatus,
    DateRangePicker,
    Select2,
    EmptyState,
    ContentLoader,
    Select2WithColor,
  },
  mixins: [AnalyticsMixins],
  layout: 'leadLayout',
  data() {
    return {
      leadStatusOptions: [],
      contentLoaderData: [-1, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      leads: [],
      isLoading: false,
      leadInfiniteId: new Date().getTime(),
      leadPage: 0,
      totalLeads: 0,
      exportType: '',
      exported: false,
    }
  },
  computed: {
    ...mapGetters({
      // count: 'analytics/getDuration',
      queryStatus: 'analytics/getStatus',
      lastDate: 'analytics/getLastDate',
      dStartDate: 'analytics/getStartDate',
      dEndDate: 'analytics/getEndDate',
      activeDate: 'analytics/getActiveDate',
    }),
    activeDate: {
      set(payload) {
        this.$store.dispatch('analytics/setActiveDate', payload)
      },
      get() {
        return this.$store.getters['analytics/getActiveDate']
      },
    },
    count: {
      set(payload) {
        this.$store.dispatch('analytics/setDuration', payload)
      },
      get() {
        return this.$store.getters['analytics/getDuration']
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
    queryStatus: {
      set(payload) {
        this.$store.dispatch('analytics/setStatus', payload)
      },
      get() {
        return this.$store.getters['analytics/getStatus']
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
  },
  watch: {
    queryStatus(o, v) {
      if (v) {
        this.handleInfiniteChange()
      }
    },
    exportType() {
      this.$axios
        .$post('lm/dashboard/export-lead-by-date-range', {
          start_date: this.dStartDate,
          end_date: this.dEndDate,
          type: this.exportType,
          status: this.queryStatus,
        })
        .then(({ message }) => {
          console.log(message)
        })
        .finally(() => {
          this.exported = true
          window.setTimeout(() => {
            this.exported = false
          }, 5000)
        })
    },
  },
  created() {
    this.getLeadStatus()
  },
  methods: {
    changeLeadStatus(args) {
      this.queryStatus = args.id
    },
    rangeDateChanged() {
      this.lastDate = '-2'
      this.handleInfiniteChange()
    },
    handleInfiniteChange() {
      this.leadPage = 0
      this.leads = []
      this.totalLeads = 0
      this.leadInfiniteId = new Date().getTime()
    },
    leadInfiniteHandler($state) {
      this.isLoading = true
      this.$store.dispatch('startOverlay')
      this.leadPage += 1
      const FilterForm = new FormData()
      FilterForm.append('start_date', this.dStartDate)
      FilterForm.append('end_date', this.dEndDate)
      this.queryStatus !== '0' &&
        this.queryStatus &&
        FilterForm.append('status', this.queryStatus)
      this.$axios
        .$post('lm/dashboard/get-lead-by-date-range', FilterForm, {
          params: {
            page: this.leadPage,
          },
        })
        .then(({ data }) => {
          if (this.leadPage === data.current_page) {
            this.leads.push(...data.data)
            this.totalLeads = data.total
            $state.loaded()
            this.isLoading = false
            this.$store.dispatch('stopOverlay')
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
    },
    getLeadStatus() {
      this.$axios.$get('lm/common/list-lead-status').then((data) => {
        this.error = data && data.error
        this.leadStatusOptions = data && data.data.length && data.data
        this.leadStatusOptions.unshift({
          selected: true,
          status_color: '#000000',
          id: '0',
          status_name: 'All',
          text: 'All',
          status_text_color: '#FFFFFF	',
        })
        this.leadStatusOptions = this.leadStatusOptions.map((data) =>
          Object.assign(data, {
            text: data.status_name,
            status_text_color: '#FFFFFF',
          })
        )
      })
    },
    getDate() {
      if (this.lastDate > -1) {
        const { startDate, endDate } = this.getDateByDays(this.lastDate)
        this.dStartDate = startDate
        this.dEndDate = endDate
        this.handleInfiniteChange()
      } else if (this.lastDate === 'all') {
        this.dStartDate = 'all'
        this.dEndDate = 'all'
        this.handleInfiniteChange()
      } else if (this.lastDate === '-2') {
        this.$nextTick(() => {
          this.$refs.dateRangePicker.$el.click()
        })
      }
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
      this.handleInfiniteChange()
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
      this.handleInfiniteChange()
    },
  },
}
</script>
