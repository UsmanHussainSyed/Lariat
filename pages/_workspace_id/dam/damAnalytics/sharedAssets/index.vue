<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div
        v-if="!sharedAnalyticsAllowed"
        class="general-settings-right h-100 position-relative"
      >
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
      </div>
      <div v-else-if="showGraph" class="general-settings-right h-100">
        <div class="newAnalytics customscrollbar">
          <div class="row big-gutters">
            <div class="col-md-12">
              <div class="d-flex align-items-center justify-content-end">
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
                  :parent-class="true"
                  @previousTimeFrame="previousTimeFrame"
                  @nextTimeFrame="nextTimeFrame"
                  @dateChangeHandler="dateChangeHandler"
                  @customDateSelected="customDateSelected"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Collection Shared URLs
                    <i
                      v-tooltip="
                        'Total Collection URL’s Shared By The Users, Filtered By Timeframe.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <!--                  <content-loader
                    v-if="graph.collectionShared && !collectionSharedUrl"
                    :width="300"
                    :height="80"
                    class="normalLoader"
                    :speed="2"
                    :animate="true"
                  >
                    <rect x="6" y="4" rx="1" ry="1" width="300" height="80" />
                  </content-loader>-->
                  <InnerLoader
                    v-if="graph.collectionShared && !collectionSharedUrl"
                    :bg-white="false"
                  />
                  <LineGraph
                    v-if="collectionSharedUrl"
                    ref="collectionSharedUrl"
                    :chart-data="collectionSharedUrlData"
                    :options="collectionSharedUrlOptions"
                    class="chart-big"
                  ></LineGraph>
                  <EmptyLineGraph
                    v-if="!graph.collectionShared && !collectionSharedUrl"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Non-Collection Shared URLs
                    <i
                      v-tooltip="
                        'Total Non-Collection URL’s Shared By The Users, Filtered By Timeframe.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <!--                  <content-loader
                    v-if="graph.nonCollectionShared && !nonCollectionSharedUrl"
                    :width="300"
                    :height="80"
                    class="normalLoader"
                    :speed="2"
                    :animate="true"
                  >
                    <rect x="6" y="4" rx="1" ry="1" width="300" height="80" />
                  </content-loader>-->
                  <InnerLoader
                    v-if="graph.nonCollectionShared && !nonCollectionSharedUrl"
                    :bg-white="false"
                  />
                  <LineGraph
                    v-if="nonCollectionSharedUrl"
                    ref="nonCollectionSharedUrl"
                    :chart-data="NonCollectionSharedUrlData"
                    :options="NonCollectionSharedUrlOptions"
                    class="chart-big"
                  ></LineGraph>
                  <EmptyLineGraph
                    v-if="!graph.nonCollectionShared && !nonCollectionSharedUrl"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="chartBox">
            <div class="title">
              <h4>
                Top Shared URLs based on Activities
                <i
                  v-tooltip="
                    'List Of URL’s With Highest Shares, Filtered By timeframe.'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
            <div class="tableDetail">
              <div
                class="common-box"
                :class="{ 'bg-gray': mostSharedUrlList.length }"
              >
                <div class="table-list-view table-list-scrolling">
                  <ul v-if="mostSharedUrlList.length" class="thead">
                    <li>
                      <div class="categary-name sorting flex55">
                        <span>Shared URL</span>
                      </div>
                      <div class="generated-source sorting flex15">
                        <span>Generated Source</span>
                      </div>
                      <div class="generated-by sorting flex10">
                        <span>Generated By</span>
                      </div>
                      <div class="total-click sorting flex10">
                        <span>Total Impressions</span>
                      </div>
                      <div class="total-download sorting flex10">
                        <span>Total Download</span>
                      </div>
                    </li>
                  </ul>
                  <div class="customscrollbar no_footer">
                    <ContentLoader
                      v-if="listLoading && !mostSharedUrlList.length"
                      :speed="1"
                      :animate="true"
                      :width="400"
                      :height="100"
                      class="normalLoader"
                    >
                      <rect
                        x="0"
                        y="-1"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="15"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="31"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                      <rect
                        x="0"
                        y="47"
                        rx="0"
                        ry="0"
                        width="400"
                        height="13"
                      />
                    </ContentLoader>
                    <ul v-if="mostSharedUrlList.length" class="tbody">
                      <li v-for="url in mostSharedUrlList" :key="url.id">
                        <div class="categary-name tb-column flex55">
                          <div class="top-column">
                            <a
                              :href="
                                url.share_url
                                  | normalizedUrl(url.generated_source)
                              "
                              target="_blank"
                              class="table-a"
                            >
                              {{
                                url.share_url
                                  | normalizedUrl(url.generated_source)
                              }}
                            </a>
                          </div>
                        </div>
                        <div class="generated-source tb-column flex15">
                          <div class="top-column">
                            <label>{{
                              url.generated_source | normalizedSource
                            }}</label>
                          </div>
                        </div>
                        <div class="generated-by tb-column flex10">
                          <div class="top-column">
                            <label>{{ url.user ? url.user.name : '-' }}</label>
                          </div>
                        </div>
                        <div class="total-click tb-column flex10">
                          <div class="top-column">
                            <label>{{ url.total_visited }}</label>
                          </div>
                        </div>
                        <div class="total-download tb-column flex10">
                          <div class="top-column">
                            <label>{{ url.total_download }}</label>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <EmptyState
                      v-if="!listLoading && !mostSharedUrlList.length"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SharedAssets
        v-else
        :chart-type="chartType"
        :breadcrumbs-header="breadcrumbsHeader"
        :load-category-list="loadCategoryList"
        :category="categoryBy"
        :category-by-shared="categoryByShared"
        :category-by-collection="categoryByCollection"
        :start-date="$moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)"
        :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
        @backToGraph="backToGraph"
      />
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import LineGraph from '~/components/plugins/LineGraph'
import SharedAssets from '~/components/dam/DamAnalytics/SharedAssets/SharedAssets'

import EmptyLineGraph from '~/components/theme/global/EmptyLineGraph'
import AnalyticsDurationFilter from '~/components/dam/DamAnalytics/AnalyticsDurationFilter'
import EmptyState from '~/components/theme/global/EmptyState'
import damShareUrl from '~/mixins/damShareUrl'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'

export default {
  components: {
    ContentLoader,
    AnalyticsLeftMenu,
    LineGraph,
    SharedAssets,
    EmptyLineGraph,
    AnalyticsDurationFilter,
    EmptyState,
    InnerLoader,
  },
  mixins: [damShareUrl],
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  data() {
    return {
      chartType: null,
      loadCategoryList: null,
      categoryBy: null,
      showGraph: true,
      loading: true,
      /* Collection Shared URLs  */
      collectionSharedUrl: false,
      collectionSharedUrlData: null,
      collectionSharedUrlOptions: {},
      /* Non Collection Shared URLs  */
      nonCollectionSharedUrl: false,
      nonCollectionSharedUrlData: null,
      nonCollectionSharedUrlOptions: {},

      graph: {
        collectionShared: true,
        nonCollectionShared: true,
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
      breadcrumbsHeader: '',
      /* most shared url */
      mostSharedUrlList: [],
      listLoading: false,
      categoryByCollection: null,
      categoryByShared: null,
    }
  },
  computed: {
    sharedAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.share_asset_analytics
        ?.enable
    },
  },
  created() {
    if (this.sharedAnalyticsAllowed) {
      this.getAllSharedAssetsAnalytics()
    }
  },
  methods: {
    getAllSharedAssetsAnalytics() {
      if (!this.sharedAnalyticsAllowed) return
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
    },
    getGraphData(startDate, endDate) {
      if (!this.sharedAnalyticsAllowed) return
      this.getCollectionSharedUrl(startDate, endDate)
      this.getNonCollectionSharedUrl(startDate, endDate)
      this.getMostSharedUrlList(startDate, endDate)
    },
    /* Collection Shared URLs */
    async getCollectionSharedUrl(startDate, endDate) {
      if (!this.sharedAnalyticsAllowed) return
      this.graph.collectionShared = true

      await this.$axios
        .$post('digital-assets/analytics/collection-share-url', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.collectionSharedUrlFilter(data.graph_data)
          this.graph.collectionShared = false
        })
        .catch(this.$errorToast)
    },
    collectionSharedUrlFilter(collectionSharedUrlData) {
      if (!this.sharedAnalyticsAllowed) return
      const categoryKey = Object.keys(collectionSharedUrlData.admin)
      const adminCollectionSharedValue = Object.values(
        collectionSharedUrlData.admin
      )
      const totalAdminCollectionSharedAsset = []
      for (let i = 0; i < adminCollectionSharedValue.length; i++) {
        if (
          adminCollectionSharedValue[i] > 0 &&
          this.collectionSharedUrl === false
        ) {
          this.collectionSharedUrl = true
        }
        totalAdminCollectionSharedAsset.push(adminCollectionSharedValue[i])
      }
      const userCollectionSharedValue = Object.values(
        collectionSharedUrlData.user
      )

      const totalUserCollectionSharedAsset = []
      for (let i = 0; i < userCollectionSharedValue.length; i++) {
        if (
          userCollectionSharedValue[i] > 0 &&
          this.collectionSharedUrl === false
        ) {
          this.collectionSharedUrl = true
        }
        totalUserCollectionSharedAsset.push(userCollectionSharedValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientFill = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill.addColorStop(1, 'rgba(255, 138, 1, 0.9)')
      gradientFill.addColorStop(0.5, 'rgba(255, 138, 1, 0.75)')
      gradientFill.addColorStop(0, 'rgba(255, 138, 1, 0.6)')

      const gradientFill1 = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill1.addColorStop(1, 'rgba(69, 94, 167, 0.9)')
      gradientFill1.addColorStop(0.5, 'rgba(69, 94, 167, 0.75)')
      gradientFill1.addColorStop(0, 'rgba(69, 94, 167, 0.6)')
      this.collectionSharedUrlData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Admin',
            data: totalAdminCollectionSharedAsset,
            backgroundColor: gradientFill,
          },
          {
            label: 'Frontend Users',
            data: totalUserCollectionSharedAsset,
            backgroundColor: gradientFill1,
          },
        ],
      }
      this.collectionSharedUrlOptions = {
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
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return 'Total Shared URL: ' + value
            },
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
              stacked: false,
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                // stepSize: 10,
                precision: 0,
                reverse: false,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Total no. of shared URL',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'collectionSharedUrl'
            this.loadCategoryList = 'collectionSharedUrl'
            this.breadcrumbsHeader = 'Collection Shared URLs'
            this.categoryByCollection = 'collection'
            this.categoryByShared = 'shared url'
            this.selectedData(e)
          }
        },
      }
    },
    /* Non Collection Shared URLs */
    async getNonCollectionSharedUrl(startDate, endDate) {
      if (!this.sharedAnalyticsAllowed) return
      this.graph.nonCollectionShared = true

      await this.$axios
        .$post('digital-assets/analytics/non-collection-share-url', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.NonCollectionSharedUrlFilter(data.graph_data)
          this.graph.nonCollectionShared = false
        })
        .catch(this.$errorToast)
    },
    NonCollectionSharedUrlFilter(nonCollectionSharedUrlData) {
      if (!this.sharedAnalyticsAllowed) return
      const categoryKey = Object.keys(nonCollectionSharedUrlData.admin)
      const adminNonCollectionSharedValue = Object.values(
        nonCollectionSharedUrlData.admin
      )
      const totalAdminNonCollectionSharedAsset = []
      for (let i = 0; i < adminNonCollectionSharedValue.length; i++) {
        if (
          adminNonCollectionSharedValue[i] > 0 &&
          this.nonCollectionSharedUrl === false
        ) {
          this.nonCollectionSharedUrl = true
        }

        totalAdminNonCollectionSharedAsset.push(
          adminNonCollectionSharedValue[i]
        )
      }
      const userNonCollectionSharedValue = Object.values(
        nonCollectionSharedUrlData.user
      )

      const totalUserNonCollectionSharedAsset = []
      for (let i = 0; i < userNonCollectionSharedValue.length; i++) {
        if (
          userNonCollectionSharedValue[i] > 0 &&
          this.nonCollectionSharedUrl === false
        ) {
          this.nonCollectionSharedUrl = true
        }
        totalUserNonCollectionSharedAsset.push(userNonCollectionSharedValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientFill = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill.addColorStop(1, 'rgba(255, 138, 1, 0.9)')
      gradientFill.addColorStop(0.5, 'rgba(255, 138, 1, 0.75)')
      gradientFill.addColorStop(0, 'rgba(255, 138, 1, 0.6)')

      const gradientFill1 = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill1.addColorStop(1, 'rgba(69, 94, 167, 0.9)')
      gradientFill1.addColorStop(0.5, 'rgba(69, 94, 167, 0.75)')
      gradientFill1.addColorStop(0, 'rgba(69, 94, 167, 0.6)')
      this.NonCollectionSharedUrlData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Admin',
            data: totalAdminNonCollectionSharedAsset,
            backgroundColor: gradientFill,
          },
          {
            label: 'Frontend Users',
            data: totalUserNonCollectionSharedAsset,
            backgroundColor: gradientFill1,
          },
        ],
      }
      this.NonCollectionSharedUrlOptions = {
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
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return 'Total Shared URL: ' + value
            },
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
              stacked: false,
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                // stepSize: 10,
                precision: 0,
                reverse: false,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Total no. of shared URL',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'nonCollectionSharedUrl'
            this.loadCategoryList = 'nonCollectionSharedUrl'
            this.breadcrumbsHeader = 'Non Collection Shared URLs'
            this.categoryByCollection = 'non collection'
            this.categoryByShared = 'shared url'
            this.selectedData(e)
          }
        },
      }
    },
    async getMostSharedUrlList(startDate, endDate) {
      if (!this.sharedAnalyticsAllowed) return
      this.listLoading = true
      await this.$axios
        .$post('digital-assets/analytics/most-share-url', {
          from_date: startDate,
          to_date: endDate,
        })
        .then(({ data }) => {
          this.mostSharedUrlList = data
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
    selectedData(evt) {
      if (!this.sharedAnalyticsAllowed) return
      let chart = null

      if (this.chartType === 'collectionSharedUrl') {
        chart = this.$refs.collectionSharedUrl.$data._chart
      }
      if (this.chartType === 'nonCollectionSharedUrl') {
        chart = this.$refs.nonCollectionSharedUrl.$data._chart
      }
      const chartIndex = chart.getElementAtEvent(evt)
      const chartData = chartIndex?.[0]?._chart.config.data
      const idx = chartIndex[0]._datasetIndex
      const label = chartData.datasets[idx].label
      this.categoryBy = label.toLowerCase()

      this.loadTable()
    },
    loadTable() {
      this.showGraph = false
    },
    nextTimeFrame() {
      if (!this.sharedAnalyticsAllowed) return
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
      if (!this.sharedAnalyticsAllowed) return
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
      if (!this.sharedAnalyticsAllowed) return
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
      if (!this.sharedAnalyticsAllowed) return
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
    backToGraph() {
      if (!this.sharedAnalyticsAllowed) return
      this.showGraph = true
      this.categoryBy = null
      this.chartType = null
      this.getAllSharedAssetsAnalytics()
    },
  },
}
</script>
<style scoped>
.no-permission {
  background-image: url(assets/img/blurred-images/shared-asset-analytics.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
