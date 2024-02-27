<template>
  <div class="body-content">
    <div class="resizableMain lead-dashboard">
      <div class="resizableRight">
        <div class="common-box-header">
          <h2 class="title">
            RSMs - <strong>{{ totalRsm }}</strong>
          </h2>
          <div class="newAnalytics p0">
            <ul class="assetsType justify-content-end">
              <li>
                <a
                  v-if="rsmList.length"
                  v-tooltip="'Export to CSV'"
                  style="display: flex; align-items: center"
                  @click="exportRsms()"
                >
                  <svg
                    id="Layer_1"
                    class="export-icon mr-1"
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
                  Export
                </a>
              </li>
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
        </div>
        <div class="common-box bg-gray">
          <div class="filter-dropdown">
            <a href="javascript:void(0);" class="filter-dropdown-toggle">
              <svg
                id="Layer_1"
                class="menu-option-icon h-orange"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4482" transform="translate(-872 -801)">
                  <rect
                    id="Rectangle_3020"
                    x="872"
                    y="801"
                    class="fill-hide"
                    width="18"
                    height="18"
                  ></rect>
                  <g id="Group_4348" transform="translate(588.166 653.684)">
                    <circle
                      id="Ellipse_203"
                      class="fill-color"
                      cx="292.8"
                      cy="148.9"
                      r="1.5"
                    ></circle>
                    <circle
                      id="Ellipse_203-2"
                      class="fill-color"
                      cx="292.8"
                      cy="163.8"
                      r="1.5"
                    ></circle>
                    <circle
                      id="Ellipse_203-3"
                      class="fill-color"
                      cx="292.8"
                      cy="156.3"
                      r="1.5"
                    ></circle>
                  </g>
                </g>
              </svg>
            </a>
            <ul class="filter-dropdown-menu">
              <li v-for="(item, index) in active_headers" :key="index">
                <a href="javascript:void(0);"
                  ><label class="check-label">
                    {{ item.name }}
                    <input v-model="item.isActive" type="checkbox" /><span
                      class="check-span"
                    ></span></label
                ></a>
              </li>
            </ul>
          </div>
          <div
            class="table-list-view table-list-scrolling small-height scrolling"
          >
            <ul class="thead">
              <li>
                <div
                  class="name-email sorting sortarrow flex32"
                  :class="[
                    sortData === 'name' && currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <div class="blank-space30"></div>
                  <span
                    v-show="checkHiddenFilter('Name')"
                    @click="toggleSortData('name')"
                    >Name</span
                  >
                </div>
                <div
                  class="sorting sortarrow flex20"
                  :class="[
                    sortData === 'email' && currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span
                    v-show="checkHiddenFilter('Email Id')"
                    @click="toggleSortData('email')"
                    >Email ID</span
                  >
                </div>
                <div class="sorting flex12">
                  <span v-show="checkHiddenFilter('Phone Number')"
                    >Phone Number</span
                  >
                </div>
                <div
                  class="sorting sortarrow flex12 text-center"
                  :class="[
                    sortData === 'total_assign_leads' && currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span
                    v-show="checkHiddenFilter('Assigned Leads')"
                    @click="toggleSortData('total_assign_leads')"
                    >Assigned Leads</span
                  >
                </div>
                <div
                  class="sorting sortarrow flex12 text-center"
                  :class="[
                    sortData === 'total_assign_dealership' &&
                    currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span
                    v-show="checkHiddenFilter('Assigned Dealership')"
                    @click="toggleSortData('total_assign_dealership')"
                    >Dealerships</span
                  >
                </div>
                <div
                  class="sorting sortarrow flex12 text-center"
                  :class="[
                    sortData === 'total_assign_product' &&
                    currentSort === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span
                    v-show="checkHiddenFilter('Products')"
                    @click="toggleSortData('total_assign_product')"
                    >Products</span
                  >
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <li v-for="rsm in rsmList" :key="rsm.id">
                  <div class="name-email tb-column flex32">
                    <div v-show="checkHiddenFilter('Name')" class="media">
                      <div class="media-left pr0">
                        <div
                          v-if="rsm.display_thumb_profile_image"
                          class="profile-bg"
                          :style="{
                            backgroundImage: `url(${rsm.display_thumb_profile_image})`,
                          }"
                        ></div>
                        <div v-else class="profile-char">
                          {{ rsm.name.trim().charAt(0).toUpperCase() }}
                        </div>
                      </div>
                      <div class="media-body">
                        <label
                          ><nuxt-link
                            :to="{
                              name: 'workspace_id-lead-rsm-id',
                              params: {
                                workspace_id: $_auth().id,
                                id: rsm.id,
                              },
                            }"
                            >{{ rsm.name ? rsm.name : '-' }}</nuxt-link
                          ></label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="tb-column flex20">
                    <div
                      v-show="checkHiddenFilter('Email Id')"
                      class="top-column"
                    >
                      <label>{{ rsm.email }}</label>
                    </div>
                  </div>
                  <div class="tb-column flex12">
                    <div
                      v-show="checkHiddenFilter('Phone Number')"
                      class="top-column"
                    >
                      <label>{{ rsm.phone || '-' }}</label>
                    </div>
                  </div>
                  <div class="assigned-lead text-center tb-column flex12">
                    <div
                      v-show="checkHiddenFilter('Assigned Leads')"
                      class="top-column img-text"
                    >
                      <div class="big">
                        <LeadIcon />
                        <span>{{ rsm.total_assign_leads }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="assigned-lead tb-column flex12 text-center">
                    <div
                      v-show="checkHiddenFilter('Assigned Dealership')"
                      class="top-column img-text"
                    >
                      <div class="big">
                        <svg
                          id="Layer_1"
                          class="dealer-icon orange"
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
                        </svg>
                        <span>{{ rsm.total_assign_dealership }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="assigned-lead tb-column flex12 text-center">
                    <div
                      v-show="checkHiddenFilter('Products')"
                      class="top-column img-text"
                    >
                      <div class="big">
                        <svg
                          id="Layer_1"
                          class="product-icon orange"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 21.7 18"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_3399"
                            transform="translate(-609.566 -113.772)"
                          >
                            <path
                              id="Path_3267"
                              class="fill-color"
                              d="M613,123.4c-0.4,0-0.7-0.3-0.7-0.7v-3.7c0-1.4,1.1-2.5,2.5-2.5h5.6c0.4,0,0.7,0.3,0.7,0.7v5.6c0,0.4-0.3,0.7-0.7,0.7H613z M619.8,122.1v-4.3h-4.9c-0.7,0-1.2,0.5-1.2,1.2v0v3.1L619.8,122.1z"
                            ></path>
                            <path
                              id="Path_3268"
                              class="fill-color"
                              d="M616.7,131.8c-1.6,0-3.1-1.2-3.4-2.8h-2.7c-0.6,0-1.1-0.5-1.1-1.1v-9.7c0-2.4,2-4.4,4.4-4.4h16.7c0.4,0,0.7,0.3,0.7,0.7c0,0.4-0.3,0.7-0.7,0.7h-2.1v9.8h2.1c0.4,0,0.7,0.3,0.7,0.7v2.8c0,0.4-0.3,0.7-0.7,0.7h-10.5C619.8,130.6,618.4,131.8,616.7,131.8L616.7,131.8z M616.7,126.2c-1.2,0-2.1,1-2.1,2.1c0,1.2,1,2.1,2.1,2.1c1.2,0,2.1-1,2.1-2.1C618.8,127.2,617.9,126.2,616.7,126.2C616.7,126.2,616.7,126.2,616.7,126.2z M613.3,127.7c0.3-1.6,1.7-2.8,3.4-2.8h5.8v-7.7c0-0.4,0.3-0.7,0.7-0.7h4v-1.5l-13.3,0c-1.7,0-3.1,1.4-3.1,3.1v9.5H613.3z M630,127.7v-1.5h-10.6c0.3,0.4,0.6,0.9,0.7,1.5H630zM627.2,124.9v-7h-3.3v7L627.2,124.9z"
                            ></path>
                          </g>
                        </svg>
                        <span>{{ rsm.total_assign_product }}</span>
                      </div>
                    </div>
                  </div>
                </li>
                <EmptyState v-if="!rsmList.length && !isLoading" />
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
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapGetters } from 'vuex'
import FilterDropdownMixin from '~/mixins/FilterDropdown'
import EmptyState from '~/components/theme/global/EmptyState'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import Select2 from '~/components/lead/Select2'
import AnalyticsMixins from '~/mixins/analyticsMixins'
export default {
  components: {
    EmptyState,
    ContentLoader,
    DateRangePicker,
    Select2,
  },
  mixins: [FilterDropdownMixin, AnalyticsMixins],
  layout: 'leadLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-lead-module'],
  data() {
    return {
      // Filter
      active_headers: [
        { name: 'Name', isActive: true },
        { name: 'Email Id', isActive: true },
        { name: 'Phone Number', isActive: true },
        { name: 'Assigned Leads', isActive: true },
        { name: 'Assigned Dealership', isActive: true },
        { name: 'Products', isActive: true },
      ],
      contentLoaderData: [0, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      sortData: '',
      currentSort: '',
      rsmList: [],
      totalRsm: 0,
      rsmPage: 0,
      isLoading: false,
      rsmInfiniteId: new Date().getTime(),
    }
  },
  computed: {
    ...mapGetters({
      lastDate: 'RSM/getLastDate',
      dStartDate: 'RSM/getStartDate',
      dEndDate: 'RSM/getEndDate',
      activeDate: 'RSM/getActiveDate',
      isDurationApplied: 'RSM/getIsDurationApplied',
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
    checkHiddenFilter() {
      return (name) =>
        this.active_headers.find((e) => e.name === name)?.isActive
    },
  },
  watch: {
    active_headers: {
      handler() {
        window.localStorage.setItem(
          'rsm_headers',
          JSON.stringify(this.active_headers)
        )
      },
      deep: true,
    },
  },
  beforeMount() {
    this.getHinddenFilters()
    if (!this.isDurationApplied) {
      this.getDate()
    }
  },
  methods: {
    rangeDateChanged() {
      this.lastDate = '-2'
      this.handleFilterChange()
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
      this.$store.dispatch('RSM/setDurationApplied', true)
      this.handleFilterChange()
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
      this.$store.dispatch('RSM/setDurationApplied', true)
      this.handleFilterChange()
    },
    getDate() {
      if (this.lastDate > -1) {
        const { startDate, endDate } = this.getDateByDays(this.lastDate)
        this.dStartDate = startDate
        this.dEndDate = endDate
        this.handleFilterChange()
      } else if (this.lastDate === 'all') {
        this.dStartDate = 'all'
        this.dEndDate = 'all'
        this.handleFilterChange()
      }
    },
    exportRsms() {
      this.$axios
        .$post('/lm/rsm-user/list-export', {
          workspace_id: this.$route.params.workspace_id,
          start_date: this.dStartDate,
          end_date: this.dEndDate,
        })
        .then((response) => {
          const link = document.createElement('a')
          link.href = response.data.filename
          link.setAttribute('download', 'rsm.csv')
          document.body.appendChild(link)
          link.click()
        })
    },
    getHinddenFilters() {
      const filter_headers = window.localStorage.getItem('rsm_headers')
      const filters = JSON.parse(filter_headers)
      if (filters) {
        this.active_headers = filters
      }
    },
    toggleSortData(data) {
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'ASC'
      } else {
        this.currentSort = this.currentSort === 'ASC' ? 'DESC' : 'ASC'
      }
      this.handleFilterChange()
    },
    handleFilterChange() {
      this.rsmPage = 0
      this.rsmList = []
      this.rsmInfiniteId = new Date()
    },
    rsmInfiniteHandler($state) {
      this.$store.dispatch('startOverlay')
      this.isLoading = true
      this.rsmPage += 1
      const formData = new FormData()
      formData.append('workspace_id', this.$getWorkspaceId())
      this.$axios
        .$post(`lm/rsm-user/list`, formData, {
          params: {
            sortvalue: this.sortData,
            orderby: this.currentSort,
            page: this.rsmPage,
            start_date: this.dStartDate,
            end_date: this.dEndDate,
          },
        })
        .then(({ data }) => {
          if (this.rsmPage === data.current_page) {
            this.rsmList.push(...data.data)
            this.totalRsm = data.total
            $state.loaded()
            this.isLoading = false
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.$store.dispatch('stopOverlay')
        })
    },
  },
}
</script>

<style></style>
