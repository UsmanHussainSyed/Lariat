<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div
        v-if="showGraph"
        class="general-settings-right h-100"
        :class="{ 'position-relative': !collectionAnalyticsAllowed }"
      >
        <template v-if="!collectionAnalyticsAllowed && !loading">
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
        <template v-else>
          <div class="newAnalytics customscrollbar">
            <div class="row big-gutters">
              <div class="col-md-12">
                <div class="chartBox mt0">
                  <div class="title">
                    <h4>
                      Top 5 Collection
                      <i
                        v-tooltip="
                          'Number Of Collections Having Highest Activities.'
                        "
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i>
                    </h4>
                  </div>
                  <div class="chart">
                    <!--                  <content-loader
                      v-if="graph.topCollection && !collection"
                      :width="300"
                      :height="80"
                      class="normalLoader"
                      :speed="2"
                      :animate="true"
                    >
                      <rect x="6" y="4" rx="1" ry="1" width="300" height="80" />
                    </content-loader>-->
                    <InnerLoader
                      v-if="graph.topCollection && !collection"
                      :bg-white="false"
                    />
                    <Bar
                      v-if="collection"
                      ref="collection"
                      :chart-data="collectionData"
                      :options="collectionOptions"
                      class="chart-big"
                      :height="400"
                    ></Bar>
                    <EmptyBarChart
                      v-if="!graph.topCollection && !collection"
                      :full-width="true"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="highlightBox mb2">
                  <div class="d-flex align-items-center">
                    <h2 class="title">Collection Name</h2>
                    <div class="month-range-filter">
                      <Select2
                        :value="collectionId"
                        :options="collectionList"
                        :custom-event="true"
                        placeholder="Collection Name"
                        @changeSelect2="collectionChangeHandler(...arguments)"
                      />
                    </div>
                  </div>
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
            </div>
            <InnerLoader v-if="loading && !collectionId" :bg-white="false" />
            <CollectionDashboard
              v-else
              :collection-id="collectionId"
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />
            <div class="row big-gutters">
              <div class="col-md-6">
                <div class="chartBox">
                  <div class="title">
                    <h4>
                      Collection Activity
                      <i
                        v-tooltip="
                          'Total Number Of Collection Activities, Bifurcated By Downloads & Shares, filtered By timeframe.'
                        "
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i>
                    </h4>
                  </div>
                  <div class="chart">
                    <!--                  <content-loader
                      v-if="graph.collectionActivity && !collectionActivity"
                      :width="300"
                      :height="140"
                      class="normalLoader"
                      :speed="2"
                      :animate="true"
                    >
                      <rect x="6" y="4" rx="1" ry="1" width="300" height="140" />
                    </content-loader>-->
                    <InnerLoader
                      v-if="graph.collectionActivity && !collectionActivity"
                      :bg-white="false"
                    />
                    <LineGraph
                      v-if="collectionActivity"
                      ref="collectionActivity"
                      :chart-data="collectionActivityData"
                      :options="collectionActivityOptions"
                      :height="300"
                      class="chart-small"
                    ></LineGraph>
                    <EmptyLineGraph
                      v-if="!graph.collectionActivity && !collectionActivity"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="chartBox">
                  <div class="title">
                    <h4>
                      Collection by Assets Category
                      <i
                        v-tooltip="
                          'Type and size of assets within selected collection.'
                        "
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i>
                    </h4>
                  </div>
                  <div class="chart">
                    <!--                  <content-loader
                      v-if="graph.collectionByAsset && !collectionByAssetType"
                      :width="300"
                      :height="140"
                      class="normalLoader"
                      :speed="2"
                      :animate="true"
                    >
                      <rect x="6" y="4" rx="1" ry="1" width="300" height="140" />
                    </content-loader>-->
                    <InnerLoader
                      v-if="graph.collectionByAsset && !collectionByAssetType"
                      :bg-white="false"
                    />
                    <Bar
                      v-if="collectionByAssetType"
                      id="group-by"
                      ref="collectionByAssetType"
                      :chart-data="collectionByAssetTypeData"
                      :options="collectionByAssetTypeOptions"
                      :height="300"
                      class="chart-small"
                    ></Bar>
                    <EmptyBarChart
                      v-if="!graph.collectionByAsset && !collectionByAssetType"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row big-gutters">
              <div class="col-md-12">
                <div class="d-flex align-items-center justify-content-end mt2">
                  <h2 class="title">View By</h2>
                  <div class="month-range-filter">
                    <Select2
                      :value="collectionTypeId"
                      :options="collectionTypeList"
                      :custom-event="true"
                      @changeSelect2="collectionTypeChangeHandler(...arguments)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="chartBox mapLocationChart">
                  <div class="title">
                    <h4>
                      Collection activities based on Location
                      <i
                        v-tooltip="
                          'Total Activities Of Collection Occurred, Filtered By Location.'
                        "
                        class="fa fa-info-circle"
                        aria-hidden="true"
                      ></i>
                    </h4>
                  </div>
                  <InnerLoader v-if="loading" :bg-white="false" />
                  <CollectionByLocation
                    v-else-if="locationAnalyticsAllowed"
                    :collection-id="collectionId"
                    :start-date="
                      $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
                    "
                    :end-date="
                      $moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)
                    "
                    :collection-type-name="collectionTypeName"
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
            </div>
            <div
              v-if="collectionTypeName != 'share'"
              class="chartBox no-box-shadow"
            >
              <div class="title">
                <h4>
                  Top Assets Downloaded From "{{ collectionName }}"
                  <i
                    v-tooltip="
                      `List of most downloaded assets by DAM frontend user within selected collection` +
                      ` &quot;` +
                      collectionName +
                      `&quot;`
                    "
                    class="fa fa-info-circle"
                    aria-hidden="true"
                  ></i>
                </h4>
              </div>
            </div>
            <InnerLoader v-if="loading && !collectionId" :bg-white="false" />
            <AssetsDownloadsFromCollectionName
              v-else
              :collection-id="collectionId"
              :collection-type-name="collectionTypeName"
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />
            <div
              v-if="collectionTypeName != 'download'"
              class="chartBox no-box-shadow"
            >
              <div class="title">
                <h4>
                  Top Assets Shared From "{{ collectionName }}"
                  <i
                    v-tooltip="
                      `List of most shared assets within selected collection` +
                      ` &quot;` +
                      collectionName +
                      `&quot;`
                    "
                    class="fa fa-info-circle"
                    aria-hidden="true"
                  ></i>
                </h4>
              </div>
            </div>
            <InnerLoader v-if="loading && !collectionId" :bg-white="false" />
            <AssetsSharedFromCollectionName
              v-else
              :collection-id="collectionId"
              :collection-type-name="collectionTypeName"
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />
            <!--          <div class="chartBox no-box-shadow">
              <div class="title">
                <h4>
                  Top Assets Viewed From "Collection Name"
                  <i
                    v-tooltip="`Top Assets Viewed From` + ` 'Collection Name'`"
                    class="fa fa-info-circle"
                    aria-hidden="true"
                  ></i>
                </h4>
              </div>
            </div>
            <AssetsViewedFromCollectionName
              :collection-id="collectionId"
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />-->
          </div>
        </template>
      </div>
      <CollectionAssetsDetails
        v-if="!showGraph"
        :chart-type="chartType"
        :breadcrumbs-header="breadcrumbsHeader"
        :load-category-list="loadCategoryList"
        :category="categoryBy"
        :activity-type="activityType"
        :collection-id="collectionId"
        :start-date="$moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)"
        :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
        @backToGraph="backToGraph"
      />
    </div>
  </div>
</template>

<script>
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import CollectionDashboard from '~/components/dam/DamAnalytics/CollectionAnalytics/CollectionDashboard'
import AssetsDownloadsFromCollectionName from '~/components/dam/DamAnalytics/CollectionAnalytics/AssetsDownloadsFromCollectionName'
import AssetsSharedFromCollectionName from '~/components/dam/DamAnalytics/CollectionAnalytics/AssetsSharedFromCollectionName'
import CollectionAssetsDetails from '~/components/dam/DamAnalytics/CollectionAnalytics/CollectionAssetsDetails'
import CollectionByLocation from '~/components/dam/DamAnalytics/CollectionAnalytics/CollectionByLocation'

import Bar from '~/components/plugins/Bar'
import LineGraph from '~/components/plugins/LineGraph'
import EmptyBarChart from '~/components/theme/global/EmptyBarChart'
import AnalyticsDurationFilter from '~/components/dam/DamAnalytics/AnalyticsDurationFilter'
import EmptyLineGraph from '~/components/theme/global/EmptyLineGraph'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
import Select2 from '~/components/plugins/Select2'
export default {
  components: {
    AnalyticsLeftMenu,
    CollectionDashboard,
    AssetsDownloadsFromCollectionName,
    AssetsSharedFromCollectionName,
    CollectionByLocation,
    CollectionAssetsDetails,
    Bar,
    LineGraph,
    EmptyBarChart,
    AnalyticsDurationFilter,
    EmptyLineGraph,
    InnerLoader,
    Select2,
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
      chartType: null,
      loadCategoryList: null,
      categoryBy: null,
      activityType: null,
      showGraph: true,
      loading: true,
      /* collection By Asset Type */
      collectionByAssetType: false,
      collectionByAssetTypeData: null,
      collectionByAssetTypeOptions: {},
      /* collection */
      collection: false,
      collectionData: null,
      collectionOptions: {},
      /* storage distribution by size */
      storageDistributionBySize: false,
      storageDistributionBySizeData: null,
      storageDistributionBySizeOptions: {},

      /* assets Uploaded */
      assetsUploaded: false,
      assetsUploadedData: null,
      assetsUploadedOptions: {},

      /* assets Storage */
      assetsStorage: false,
      assetsStorageData: null,
      assetsStorageOptions: {},
      /* collection Activity */
      collectionActivity: false,
      collectionActivityData: null,
      collectionActivityOptions: {},

      graph: {
        topCollection: true,
        collectionByAsset: true,
        collectionActivity: true,
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
      collectionTypeId: '1',
      collectionTypeName: 'all',
      collectionTypeList: [
        {
          id: '1',
          name: 'all',
          text: 'All',
        },
        {
          id: '2',
          name: 'share',
          text: 'Shared Asset Data',
        },
        {
          id: '3',
          name: 'download',
          text: 'Downloaded Asset Data',
        },
      ],
      collectionAnalyticsAllowed: false,
      locationAnalyticsAllowed: false,
      collectionId: null,
      collectionName: null,
      collectionList: [],
    }
  },
  computed: {},
  async mounted() {
    this.loading = true
    await this.checkAccess()
    if (!this.collectionAnalyticsAllowed) {
      this.loading = false
      return
    }
    let collections
    try {
      collections = (
        await this.$axios.$get(`digital-assets/analytics/get-collection`)
      ).data
    } catch (e) {}
    if (!collections?.length) {
      this.loading = false
      return this.$router.replace({
        name: 'workspace_id-dam',
        params: { workspace_id: this.$route.params.workspace_id },
      })
    }
    this.collectionId = collections[0].id
    this.collectionName = collections[0].name
    this.collectionList = collections
    this.getGraphData(
      this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
      this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
    )
    this.collectionFilter()
    this.loading = false
  },
  methods: {
    checkAccess() {
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => {
          this.collectionAnalyticsAllowed =
            data.features.collection_analytics?.enable
          this.locationAnalyticsAllowed =
            data.features.geo_location_based_analytics?.enable
        })
        .catch((_) => {})
    },
    /* collection */
    async collectionFilter() {
      this.graph.topCollection = true
      await this.$axios
        .$post('digital-assets/analytics/top-collection')
        .then(({ data }) => {
          this.topCollectionList(data)
          this.graph.topCollection = false
        })
        .catch(this.$errorToast)
    },
    topCollectionList(collection) {
      const categoryKey = Object.keys(collection)
      const categoryValue = Object.values(collection)
      const totalAssetCount = []
      for (let i = 0; i < categoryValue.length; i++) {
        if (categoryValue[i] > 0 && this.collection === false) {
          this.collection = true
        }
        totalAssetCount.push(categoryValue[i])
      }
      this.collectionData = {
        labels: categoryKey,
        datasets: [
          {
            data: totalAssetCount,
            backgroundColor: 'rgba(32, 99, 155, 0.9)',
          },
        ],
      }
      this.collectionOptions = {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return ['Total Activities: ' + value]
            },
          },
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                drawOnChartArea: false,
              },
              barPercentage: 0.5,
              barThickness: 80,
            },
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                precision: 0,
                reverse: false,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Total no. of Activities',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
      }
    },
    getGraphData(startDate, endDate) {
      this.collectionByAssetTypeFilter(startDate, endDate)
      this.collectionByActivityFilter(startDate, endDate)
    },
    /* collection By Asset Type */
    collectionByAssetTypeFilter(startDate, endDate) {
      this.graph.collectionByAsset = true
      this.$axios
        .$post('digital-assets/analytics/collection-by-assets-type', {
          from_date: startDate,
          to_date: endDate,
          collection_id: this.collectionId,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.collectionByAssetTypeCategory(data)
        })
        .catch(this.$errorToast)
        .finally(() => {
          this.graph.collectionByAsset = false
        })
    },
    collectionByAssetTypeCategory(group_by_file) {
      const categoryKey = Object.keys(group_by_file)
      const categoryValue = Object.values(group_by_file)
      const totalAssetCount = []
      for (let i = 0; i < categoryValue.length; i++) {
        if (categoryValue[i] > 0 && this.collectionByAssetType === false) {
          this.collectionByAssetType = true
        }
        totalAssetCount.push(categoryValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientImage = ctx.createLinearGradient(0, 400, 0, 100)
      gradientImage.addColorStop(1, '#32ED91')
      gradientImage.addColorStop(0, '#05C768')
      const gradientAudio = ctx.createLinearGradient(0, 400, 0, 100)
      gradientAudio.addColorStop(1, '#66A4F5')
      gradientAudio.addColorStop(0, '#4186E0')
      const gradientVideo = ctx.createLinearGradient(0, 400, 0, 100)
      gradientVideo.addColorStop(1, '#F86C66')
      gradientVideo.addColorStop(0, '#FC4C45')
      const gradientDocument = ctx.createLinearGradient(0, 400, 0, 100)
      gradientDocument.addColorStop(1, '#A769ED')
      gradientDocument.addColorStop(0, '#8E5DC6')
      this.collectionByAssetTypeData = {
        labels: categoryKey,
        datasets: [
          {
            data: totalAssetCount,
            backgroundColor: [
              gradientImage,
              gradientAudio,
              gradientVideo,
              gradientDocument,
            ],
          },
        ],
      }
      this.collectionByAssetTypeOptions = {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value = this.$toHumanlySize(
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              )

              return value
            },
          },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                drawOnChartArea: false,
              },
              barPercentage: 0.5,
              barThickness: 80,
            },
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                precision: 0,
                reverse: false,
                beginAtZero: true,
                // callback: (value) => this.$toHumanlySize(value),
                callback: (value) => this.$toHumanlyNumericSize(value),
              },
              scaleLabel: {
                display: true,
                labelString: 'Total size',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'collectionByAssetType'
            this.loadCategoryList = 'collectionByAssetType'
            this.breadcrumbsHeader = 'Collection by Assets Type'
            this.selectedData(e)
          }
        },
      }
    },
    /* collection Activity */
    collectionByActivityFilter(startDate, endDate) {
      this.graph.collectionActivity = true
      this.$axios
        .$post('digital-assets/analytics/collection-activity', {
          from_date: startDate,
          to_date: endDate,
          collection_id: this.collectionId,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.collectionActivityFilter(data)
        })
        .catch(this.$errorToast)
        .finally(() => {
          this.graph.collectionActivity = false
        })
    },
    collectionActivityFilter(collection) {
      const categoryKey = Object.keys(collection.shared_assets)
      const sharedAssetsValue = Object.values(collection.shared_assets)
      const totalSharedAssetSize = []
      for (let i = 0; i < sharedAssetsValue.length; i++) {
        if (sharedAssetsValue[i] > 0 && this.collectionActivity === false) {
          this.collectionActivity = true
        }
        totalSharedAssetSize.push(sharedAssetsValue[i])
      }
      const downloadAssetsValue = Object.values(collection.download_assets)
      const totalDownloadAssetSize = []
      for (let i = 0; i < downloadAssetsValue.length; i++) {
        if (downloadAssetsValue[i] > 0 && this.collectionActivity === false) {
          this.collectionActivity = true
        }
        totalDownloadAssetSize.push(downloadAssetsValue[i])
      }

      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return

      const gradientFillShared = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFillShared.addColorStop(1, 'rgba(124, 93, 250, 0.9)')
      gradientFillShared.addColorStop(0.5, 'rgba(124, 93, 250, 0.75)')
      gradientFillShared.addColorStop(0, 'rgba(124, 93, 250, 0.6)')

      const gradientFillDownload = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFillDownload.addColorStop(1, 'rgba(1, 175, 158, 0.9)')
      gradientFillDownload.addColorStop(0.5, 'rgba(1, 175, 158, 0.75)')
      gradientFillDownload.addColorStop(0, 'rgba(1, 175, 158, 0.6)')
      this.collectionActivityData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Downloads',
            data: totalDownloadAssetSize,
            // data: [40, 39, 10, 40, 39],
            backgroundColor: gradientFillDownload,
          },
          {
            label: 'Shares',
            data: totalSharedAssetSize,
            // data: [0, 55, 32, 10, 2],
            backgroundColor: gradientFillShared,
          },
        ],
      }
      this.collectionActivityOptions = {
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

              return 'Total Activities: ' + value
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
                labelString: 'Total no. of Activities',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'collectionActivity'
            this.loadCategoryList = 'collectionActivity'
            this.breadcrumbsHeader = 'Collection Activity'
            this.selectedData(e)
          }
        },
      }
    },
    selectedData(evt) {
      let chart = null
      if (this.chartType === 'collectionByAssetType') {
        chart = this.$refs.collectionByAssetType.$data._chart
      }
      if (this.chartType === 'collectionActivity') {
        chart = this.$refs.collectionActivity.$data._chart
      }
      const chartIndex = chart.getElementAtEvent(evt)
      if (this.chartType === 'collectionActivity') {
        const chartData = chartIndex?.[0]?._chart.config.data
        const idx = chartIndex[0]._datasetIndex
        const label = chartData.datasets[idx].label
        this.activityType = label.toLowerCase()
        this.categoryBy = 'all'
      } else {
        this.categoryBy = chartIndex?.[0]?._model?.label.toLowerCase()
        this.activityType = 'all'
      }

      this.loadTable()
    },
    loadTable() {
      this.showGraph = false
    },
    collectionChangeHandler(data) {
      this.collectionId = parseInt(data.id)
      this.collectionName = data.name
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
    },
    collectionTypeChangeHandler(data) {
      this.collectionTypeId = data.id
      this.collectionTypeName = data.name
    },
    nextTimeFrame() {
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
      this.showGraph = true
      this.categoryBy = null
      this.activityType = null
      this.permissionBy = null
      this.chartType = null
    },
  },
}
</script>
<style scoped>
.no-permission {
  background-image: url(assets/img/blurred-images/collection-analytics.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
