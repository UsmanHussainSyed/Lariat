<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div
        class="general-settings-right h-100"
        :class="{ 'position-relative': !searchKeywordAnalyticsAllowed }"
      >
        <template v-if="!searchKeywordAnalyticsAllowed">
          <div class="w-100 h-100 no-permission"></div>
          <div class="common-overaly">
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
        </template>
        <div v-else class="newAnalytics customscrollbar">
          <div class="row big-gutters">
            <div class="col-md-12">
              <AnalyticsDurationFilter
                :selected-timeframe-text="selectedTimeframeText"
                :from-date="
                  $moment(graph.dates.startDate).format(DISPLAY_DATE_FORMAT)
                "
                :to-date="
                  $moment(graph.dates.endDate).format(DISPLAY_DATE_FORMAT)
                "
                :selected-time-frame-id="selectedTimeFrameId"
                :show-custom-date="showCustomDate"
                :custom-start-date="customStartDate"
                :custom-end-date="customEndDate"
                @previousTimeFrame="previousTimeFrame"
                @nextTimeFrame="nextTimeFrame"
                @dateChangeHandler="dateChangeHandler"
                @customDateSelected="customDateSelected"
              />
            </div>
          </div>
          <div class="chartBox no-box-shadow">
            <div class="title">
              <h4>
                Top 20 Keywords
                <i
                  v-tooltip="
                    'List of maximum searched keyword by DAM frontend users within selected timeframe.'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
          </div>
          <TopKeywords
            :start-date="
              $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
            "
            :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
          />
          <div class="row big-gutters">
            <div class="col-md-12">
              <div class="chartBox mapLocationChart">
                <div class="title">
                  <h4>
                    Search Keyword by Location
                    <i
                      v-tooltip="
                        'Number of keywords searched by location within selected timeframe by DAM frontend users.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <SearchKeywordByLocation
                  v-if="locationAnalyticsAllowed"
                  :start-date="
                    $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
                  "
                  :end-date="
                    $moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)
                  "
                />
                <div v-else class="row no-gutters position-relative">
                  <img
                    :src="
                      require('~/assets/img/blurred-images/asset-activity-by-location.png')
                    "
                    style="width: 100%"
                  />
                  <div class="common-overaly">
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
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Search Keyword by Device
                    <i
                      v-tooltip="
                        'Total Number Of Keywords Search By Device Bifurcated By Mobile & Web.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.searchKeywordDevice && !searchKeyWordByDevice"
                    :bg-white="false"
                  />
                  <Doughnut
                    v-if="searchKeyWordByDevice"
                    :chart-data="searchKeyWordByDeviceData"
                    :options="searchKeyWordByDeviceOptions"
                    :height="300"
                    class="chart-small"
                  ></Doughnut>
                  <EmptyPieChart
                    v-if="!searchKeyWordByDevice && !graph.searchKeywordDevice"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Search Keyword Insights
                    <i
                      v-tooltip="
                        'Number of total and unique searched keyword within selected timeframe by DAM frontend users.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.uniqueSearchKeyword && !searchKeywordByAll"
                    :bg-white="false"
                  />
                  <LineGraph
                    v-if="searchKeywordByAll"
                    :chart-data="searchKeywordByAllData"
                    :options="searchKeywordByAllOptions"
                    :height="300"
                    class="chart-small"
                  ></LineGraph>
                  <EmptyLineGraph
                    v-if="!graph.uniqueSearchKeyword && !searchKeywordByAll"
                  />
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
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import Doughnut from '~/components/plugins/Doughnut'
import LineGraph from '~/components/plugins/LineGraph'
import TopKeywords from '~/components/dam/DamAnalytics/SearchAnalytics/TopKeywords'
import SearchKeywordByLocation from '~/components/dam/DamAnalytics/SearchAnalytics/SearchKeywordByLocation'
import AnalyticsDurationFilter from '~/components/dam/DamAnalytics/AnalyticsDurationFilter'
import EmptyLineGraph from '~/components/theme/global/EmptyLineGraph'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
import EmptyPieChart from '~/components/theme/global/EmptyPieChart'

export default {
  components: {
    AnalyticsLeftMenu,
    Doughnut,
    LineGraph,
    TopKeywords,
    SearchKeywordByLocation,
    AnalyticsDurationFilter,
    EmptyLineGraph,
    InnerLoader,
    EmptyPieChart,
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  data() {
    return {
      loading: true,

      /* search keyword by device */
      searchKeyWordByDevice: false,
      searchKeyWordByDeviceData: null,
      searchKeyWordByDeviceOptions: {},

      /* search keyword by all */
      searchKeywordByAll: false,
      searchKeywordByAllData: null,
      searchKeywordByAllOptions: {},

      graph: {
        uniqueSearchKeyword: true,
        searchKeywordDevice: true,
        dates: {
          month: true,
          week: false,
          startDate: this.$moment().subtract('29', 'days'),
          endDate: this.$moment(),
        },
      },
      todayDate: this.$moment(),
      activeDate: this.$moment(),
      customStartDate: null,
      customEndDate: null,
      showCustomDate: false,
      SAVE_DATE_FORMAT: 'YYYY-MM-DD',
      DISPLAY_DATE_FORMAT: 'D, MMM YYYY',

      selectedTimeFrameId: 2,
      selectedTimeframeText: 'Month',
      dateType: 'month',
    }
  },
  computed: {
    searchKeywordAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.search_keyword_analytics
        ?.enable
    },
    locationAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features
        ?.geo_location_based_analytics?.enable
    },
  },
  created() {
    // this.graphInit({ month: true })
    if (!this.searchKeywordAnalyticsAllowed) return
    this.getGraphData(
      this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
      this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
    )
  },
  methods: {
    getGraphData(startDate, endDate) {
      if (!this.searchKeywordAnalyticsAllowed) return
      this.searchKeyWordByDeviceFilter(startDate, endDate)
      this.searchKeywordByAllFilter(startDate, endDate)
    },
    /* search keyword by device */
    async searchKeyWordByDeviceFilter(startDate, endDate) {
      if (!this.searchKeywordAnalyticsAllowed) return
      this.graph.searchKeywordDevice = true
      await this.$axios
        .$post('digital-assets/analytics/search-keywords-by-device', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.getSearchKeyWordByDevice(data)
          this.graph.searchKeywordDevice = false
        })
        .catch(this.$errorToast)
    },
    getSearchKeyWordByDevice(download_by_device_type) {
      if (!this.searchKeywordAnalyticsAllowed) return
      const deviceKey = Object.keys(download_by_device_type)
      const deviceValue = Object.values(download_by_device_type)
      for (let i = 0; i < deviceValue.length; i++) {
        if (deviceValue[i] > 0 && this.searchKeyWordByDevice === false) {
          this.searchKeyWordByDevice = true
        }
      }
      this.searchKeyWordByDeviceData = {
        labels: deviceKey,
        datasets: [
          {
            data: deviceValue,
            backgroundColor: [
              'rgba(45, 190, 119, 0.9)',
              'rgba(0, 95, 213, 0.9)',
            ],
          },
        ],
      }
      this.searchKeyWordByDeviceOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
          position: 'bottom',
          labels: {
            boxWidth: 18,
            padding: 20,
            fontSize: 14,
            fontFamily: 'acumin-pro,sans-serif',
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const label = data.labels[tooltipItem.index]
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return [' ' + label.trim() + ': ' + value]
            },
          },
        },
      }
    },
    /* search keyword */
    async searchKeywordByAllFilter(startDate, endDate) {
      if (!this.searchKeywordAnalyticsAllowed) return
      this.graph.uniqueSearchKeyword = true
      await this.$axios
        .$post('digital-assets/analytics/search-keywords', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.getSearchKeyword(data)
          this.graph.uniqueSearchKeyword = false
        })
        .catch(this.$errorToast)
    },
    getSearchKeyword(searchKeyword) {
      if (!this.searchKeywordAnalyticsAllowed) return
      const categoryKey = Object.keys(searchKeyword.total_search)
      const totalSearchValue = Object.values(searchKeyword.total_search)
      const totalSearchValueCount = []
      for (let i = 0; i < totalSearchValue.length; i++) {
        if (totalSearchValue[i] > 0 && this.searchKeywordByAll === false) {
          this.searchKeywordByAll = true
        }
        totalSearchValueCount.push(totalSearchValue[i])
      }
      const uniqueSearchValue = Object.values(searchKeyword.unique_search)
      const totalUniqueSearchValueCount = []
      for (let i = 0; i < uniqueSearchValue.length; i++) {
        if (uniqueSearchValue[i] > 0 && this.searchKeywordByAll === false) {
          this.searchKeywordByAll = true
        }
        totalUniqueSearchValueCount.push(uniqueSearchValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return

      const gradientFillSearch = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFillSearch.addColorStop(1, 'rgba(165, 228, 45, 0.9)')
      gradientFillSearch.addColorStop(0.5, 'rgba(165, 228, 45, 0.75)')
      gradientFillSearch.addColorStop(0, 'rgba(165, 228, 45, 0.6)')
      // gradientFillSearch.addColorStop(0, 'rgba(167, 234, 40, 0.9)')

      const gradientFillUniqueSearch = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFillUniqueSearch.addColorStop(1, 'rgba(45, 190, 119, 0.9)')
      gradientFillUniqueSearch.addColorStop(0.5, 'rgba(45, 190, 119, 0.75)')
      gradientFillUniqueSearch.addColorStop(0, 'rgba(45, 190, 119, 0.6)')
      // gradientFillUniqueSearch.addColorStop(0, 'rgba(50, 221, 137, 0.9)')

      this.searchKeywordByAllData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Total Searched Keyword',
            data: totalSearchValueCount,
            backgroundColor: gradientFillSearch,
          },
          {
            label: 'Unique Searched Keyword',
            data: totalUniqueSearchValueCount,
            backgroundColor: gradientFillUniqueSearch,
          },
        ],
      }
      this.searchKeywordByAllOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20,
            fontSize: 14,
            fontFamily: 'acumin-pro,sans-serif',
          },
        },
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              barPercentage: 0.5,
            },
          ],
          yAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
              stacked: false,
              ticks: {
                // stepSize: 10,
                precision: 0,
                reverse: false,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Total no. of searched keyword',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
      }
    },
    loadTable() {
      this.showGraph = false
    },
    nextTimeFrame() {
      if (!this.searchKeywordAnalyticsAllowed) return
      if (this.selectedTimeframeText === 'Week') {
        this.graph.dates.startDate = this.$moment(this.graph.dates.endDate).add(
          1,
          'days'
        )
        this.graph.dates.endDate = this.$moment(this.graph.dates.endDate).add(
          7,
          'days'
        )
      }
      if (this.selectedTimeframeText === 'Month') {
        this.graph.dates.startDate = this.$moment(this.graph.dates.endDate).add(
          1,
          'days'
        )
        this.graph.dates.endDate = this.$moment(this.graph.dates.endDate).add(
          30,
          'days'
        )
      }
      if (this.selectedTimeframeText === 'Year') {
        this.graph.dates.startDate = this.$moment(this.graph.dates.endDate).add(
          1,
          'days'
        )
        this.graph.dates.endDate = this.$moment(this.graph.dates.endDate).add(
          365,
          'days'
        )
      }
      if (this.selectedTimeframeText === 'Quarter') {
        this.graph.dates.startDate = this.$moment(this.graph.dates.endDate).add(
          1,
          'days'
        )
        this.graph.dates.endDate = this.$moment(this.graph.dates.endDate).add(
          90,
          'days'
        )
      }
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    previousTimeFrame() {
      if (!this.searchKeywordAnalyticsAllowed) return
      if (this.selectedTimeframeText === 'Week') {
        this.graph.dates.startDate = this.$moment(
          this.graph.dates.startDate
        ).subtract(7, 'days')
        this.graph.dates.endDate = this.$moment(this.graph.dates.startDate).add(
          6,
          'days'
        )
      }
      if (this.selectedTimeframeText === 'Month') {
        this.graph.dates.startDate = this.$moment(
          this.graph.dates.startDate
        ).subtract(30, 'days')
        this.graph.dates.endDate = this.$moment(this.graph.dates.startDate).add(
          29,
          'days'
        )
      }
      if (this.selectedTimeframeText === 'Year') {
        this.graph.dates.startDate = this.$moment(
          this.graph.dates.startDate
        ).subtract(365, 'days')
        this.graph.dates.endDate = this.$moment(this.graph.dates.startDate).add(
          364,
          'days'
        )
      }
      if (this.selectedTimeframeText === 'Quarter') {
        this.graph.dates.startDate = this.$moment(
          this.graph.dates.startDate
        ).subtract(90, 'days')
        this.graph.dates.endDate = this.$moment(this.graph.dates.startDate).add(
          89,
          'days'
        )
      }
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    customDateSelected(data) {
      if (!this.searchKeywordAnalyticsAllowed) return
      this.customStartDate = data.customFromDate
      this.customEndDate = data.customToDate
      this.graph.dates.startDate = data.customFromDate
      this.graph.dates.endDate = data.customToDate
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    dateChangeHandler(data) {
      if (!this.searchKeywordAnalyticsAllowed) return
      this.selectedTimeframeText = data.text
      this.selectedTimeFrameId = parseInt(data.id)
      this.dateType = data.name
      this.graph.dates.endDate = this.$moment()

      if (data.text === 'Week') {
        this.graph.dates.startDate = this.$moment().subtract('6', 'days')
      }

      if (data.text === 'Month') {
        this.graph.dates.startDate = this.$moment().subtract('29', 'days')
      }

      if (data.text === 'Year') {
        this.graph.dates.startDate = this.$moment().subtract('364', 'days')
      }

      if (data.text === 'Quarter') {
        this.graph.dates.startDate = this.$moment().subtract('89', 'days')
      }

      if (data.text === 'Custom Date') {
        this.customStartDate = this.graph.dates.startDate
        this.customEndDate = this.graph.dates.endDate
        this.showCustomDate = true
      }
      if (this.selectedTimeframeText !== 'Custom Date') {
        this.showCustomDate = false
        this.getGraphData(
          this.$moment(this.graph.dates.startDate).format(
            this.SAVE_DATE_FORMAT
          ),
          this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
        )
      }
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
  },
}
</script>
<style scoped>
.no-permission {
  background-image: url(assets/img/blurred-images/search-keyword-analytics.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
