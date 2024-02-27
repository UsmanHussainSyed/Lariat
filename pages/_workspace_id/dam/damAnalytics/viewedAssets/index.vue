<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div
        v-if="!viewAnalyticsAllowed"
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
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <label class="label-switch no-text">
                    <input
                      v-model="isIncludeVersionHistory"
                      type="checkbox"
                      class="switch"
                      name="version"
                      @click="
                        includeVersionHistory(
                          isIncludeVersionHistory == false ? true : false
                        )
                      "
                    />
                    <span class="lable"></span>
                    <span class="ml-2">Include Version History</span>
                  </label>
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
            <div class="col-md-12">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Viewed by Size
                    <i
                      v-tooltip="
                        'Total View Count of Public & Private Assets, Filtered By Timeframe. (By Default Views For Both DAM Frontend & Admin User Will Be Showcased).'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                  <label class="label-switch no-text">
                    <input
                      v-model="isExcludeAdminData"
                      type="checkbox"
                      class="switch"
                      name="version"
                      @click="
                        viewedSizeExcludeAdminData(
                          isExcludeAdminData == false ? true : false
                        )
                      "
                    />
                    <span class="lable"></span>
                    <span class="ml-2">Exclude Admin Data</span>
                  </label>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.viewBySize && !assetsViewBySize"
                    :bg-white="false"
                  />
                  <Bar
                    v-if="assetsViewBySize"
                    ref="assetsViewBySize"
                    :chart-data="assetsViewBySizeData"
                    :options="assetsViewBySizeOptions"
                    class="chart-big"
                    :height="400"
                  ></Bar>
                  <EmptyBarChart
                    v-if="!graph.viewBySize && !assetsViewBySize"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Viewed by User
                    <i
                      v-tooltip="
                        'Number of assets viewed or accessed by DAM frontend and Admin user within selected timeframe.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div
                  class="chart"
                  :style="userAnalyticsAllowed ? '' : 'padding: 0'"
                >
                  <div v-if="!userAnalyticsAllowed">
                    <img
                      :src="
                        require('~/assets/img/blurred-images/asset-view-by-user.png')
                      "
                      style="display: block"
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
                  <template v-else>
                    <InnerLoader
                      v-if="graph.viewByUser && !assetsViewByUser"
                      :bg-white="false"
                    />
                    <Doughnut
                      v-if="assetsViewByUser"
                      ref="assetsViewByUser"
                      class="chart-small"
                      :chart-data="assetsViewByUserData"
                      :options="assetsViewByUserOptions"
                      :height="300"
                    ></Doughnut>
                    <EmptyPieChart
                      v-if="!graph.viewByUser && !assetsViewByUser"
                    />
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Viewed by Device
                    <i
                      v-tooltip="
                        'Representation of Assets Viewed By Device Bifurcated By Mobile & Web.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                      title=""
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.viewByDevice && !assetsViewByDevice"
                    :bg-white="false"
                  />
                  <Doughnut
                    v-if="assetsViewByDevice"
                    ref="assetsViewByDevice"
                    class="chart-small"
                    :chart-data="assetsViewByDeviceData"
                    :options="assetsViewByDeviceOptions"
                    :height="300"
                  ></Doughnut>
                  <EmptyPieChart
                    v-if="!graph.viewByDevice && !assetsViewByDevice"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="chartBox">
            <div class="title">
              <h4>
                Most Viewed Assets
                <i
                  v-tooltip="
                    'List Of Assets With Highest Views, Filtered By timeframe. (By DAM Frontend Users).'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
            <div class="tableDetail">
              <div
                class="common-box"
                :class="{ 'bg-gray': mostAssetsViewList.length }"
              >
                <div class="table-list-view table-list-scrolling">
                  <ul v-if="mostAssetsViewList.length" class="thead">
                    <li>
                      <div
                        :class="[
                          'categary-name sorting flex50',
                          sortingClass('display_file_name'),
                        ]"
                      >
                        <span
                          @click="
                            sortValueModel = 'display_file_name'
                            sort('files', 'display_file_name', $sortToUpperCase)
                          "
                          >Assets Name</span
                        >
                      </div>
                      <div
                        :class="[
                          'asset-size sorting flex10',
                          sortingClass('file_size'),
                        ]"
                      >
                        <span
                          @click="
                            sortValueModel = 'file_size'
                            sort('files', 'file_size', $sortToTypedNumber)
                          "
                          >Asset Size</span
                        >
                      </div>
                      <div class="update-by sorting flex15">
                        <span>Uploaded By</span>
                      </div>
                      <div
                        :class="[
                          'update-date sorting flex15',
                          sortingClass('updated_at'),
                        ]"
                      >
                        <span
                          @click="
                            sortValueModel = 'updated_at'
                            sort('files', 'updated_at', $sortToTime)
                          "
                          >Last Modified</span
                        >
                      </div>
                      <div
                        :class="[
                          'total-view sorting flex10',
                          sortingClass('view_count'),
                        ]"
                      >
                        <span
                          @click="
                            sortValueModel = 'view_count'
                            sort('files', 'view_count', $sortToTypedNumber)
                          "
                          >Total Views</span
                        >
                      </div>
                    </li>
                  </ul>

                  <div class="customscrollbar no_footer">
                    <ContentLoader
                      v-if="listLoading && !mostAssetsViewList.length"
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
                    <ul v-if="mostAssetsViewList.length" class="tbody">
                      <li v-for="file in mostAssetsViewList" :key="file.id">
                        <div class="categary-name tb-column flex50">
                          <div class="media">
                            <div class="media-left">
                              <div class="categary-image">
                                <img
                                  :src="
                                    file.thumbnail_file || file.preview_image
                                  "
                                  alt=""
                                />
                              </div>
                            </div>
                            <div class="media-body">
                              <div class="add-label">
                                <div class="top-column">
                                  <span>{{ file.display_file_name }}</span>
                                </div>
                                <span
                                  v-if="file.is_deleted"
                                  class="plan-status alert-danger"
                                  >Deleted</span
                                >
                                <span
                                  v-else-if="file.is_archive"
                                  class="plan-status alert-primary"
                                  >Archived</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="asset-size tb-column flex10">
                          <div class="top-column">
                            <label>{{ $toHumanlySize(file.file_size) }}</label>
                          </div>
                        </div>
                        <div class="update-by tb-column flex15">
                          <div class="top-column">
                            <label>{{ file.user.name }}</label>
                          </div>
                        </div>
                        <div class="update-date tb-column flex15">
                          <div class="top-column">
                            <label>{{
                              $moment(file.updated_at).format('Do, MMM YYYY')
                            }}</label>
                          </div>
                        </div>
                        <div class="total-view tb-column flex10">
                          <div class="top-column">
                            <label>{{ file.view_count }}</label>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <EmptyState
                      v-if="!listLoading && !mostAssetsViewList.length"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ViewedAssets
        v-else
        :chart-type="chartType"
        :breadcrumbs-header="breadcrumbsHeader"
        :load-category-list="loadCategoryList"
        :category="categoryBy"
        :start-date="$moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)"
        :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
        :is-exclude-admin-data="isExcludeAdminData"
        :is-include-version-history="isIncludeVersionHistory"
        :permission="permission"
        @backToGraph="backToGraph"
      />
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import ViewedAssets from '~/components/dam/DamAnalytics/ViewedAssets/ViewedAssets'
import AnalyticsDurationFilter from '~/components/dam/DamAnalytics/AnalyticsDurationFilter'
import Bar from '~/components/plugins/Bar'
import Doughnut from '~/components/plugins/Doughnut'
import EmptyBarChart from '~/components/theme/global/EmptyBarChart'
import EmptyPieChart from '~/components/theme/global/EmptyPieChart'
import EmptyState from '~/components/theme/global/EmptyState'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
import analyticsSorting from '~/mixins/analyticsSorting'

export default {
  components: {
    ContentLoader,
    AnalyticsLeftMenu,
    ViewedAssets,
    Bar,
    Doughnut,
    AnalyticsDurationFilter,
    EmptyBarChart,
    EmptyPieChart,
    EmptyState,
    InnerLoader,
  },
  mixins: [analyticsSorting],
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
      isIncludeVersionHistory: false,
      /* assets View by size */
      assetsViewBySize: false,
      assetsViewBySizeData: null,
      assetsViewBySizeOptions: {},
      isExcludeAdminData: false,

      /* assets View by user */
      assetsViewByUser: false,
      assetsViewByUserData: null,
      assetsViewByUserOptions: {},

      /* assets View by device */
      assetsViewByDevice: false,
      assetsViewByDeviceData: null,
      assetsViewByDeviceOptions: {},

      graph: {
        viewBySize: true,
        viewByUser: true,
        viewByDevice: true,
        dates: {
          month: true,
          week: false,
          startDate: this.$moment().subtract('29', 'days'),
          endDate: this.$moment(),
        },
      },
      customStartDate: null,
      customEndDate: null,
      showCustomDate: false,
      SAVE_DATE_FORMAT: 'YYYY-MM-DD',
      DISPLAY_DATE_FORMAT: 'D, MMM YYYY',

      selectedTimeFrameId: 2,
      selectedTimeframeText: 'Month',
      dateType: 'month',
      breadcrumbsHeader: '',
      permission: '',
      /* most assets View */
      mostAssetsViewList: [],
      listLoading: false,
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    viewAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.view_asset_analytics
        ?.enable
    },
    userAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.user_analytics?.enable
    },
    files: {
      get() {
        return this.mostAssetsViewList
      },
      set(value) {
        this.mostAssetsViewList = value
      },
    },
  },
  watch: {
    'sorting.toolbar.value'(sortValue) {
      this.sortValueModel = sortValue
    },
    sortValueModel(sortValueModel) {
      this.sorting.toolbar.value = sortValueModel
    },
  },
  created() {
    if (this.viewAnalyticsAllowed) {
      this.getAllViewedAssetsAnalytics()
    }
  },
  methods: {
    sortingClass(sortValue) {
      return {
        sortarrow: this.sorting.toolbar.value === sortValue,
        descending:
          this.sorting.toolbar.value === sortValue && this.sorting.toolbar.desc,
        active:
          this.sorting.toolbar.value === sortValue && this.sorting.toolbar.desc,
      }
    },
    includeVersionHistory(isVersion) {
      if (!this.viewAnalyticsAllowed) return
      this.isIncludeVersionHistory = isVersion
      const startDate = this.$moment(this.graph.dates.startDate).format(
        this.SAVE_DATE_FORMAT
      )
      const endDate = this.$moment(this.graph.dates.endDate).format(
        this.SAVE_DATE_FORMAT
      )
      this.getGraphData(startDate, endDate)
    },
    viewedSizeExcludeAdminData(isExclude) {
      if (!this.viewAnalyticsAllowed) return
      this.isExcludeAdminData = isExclude
      const startDate = this.$moment(this.graph.dates.startDate).format(
        this.SAVE_DATE_FORMAT
      )
      const endDate = this.$moment(this.graph.dates.endDate).format(
        this.SAVE_DATE_FORMAT
      )
      this.getAssetsViewedBySize(startDate, endDate)
    },
    getAllViewedAssetsAnalytics() {
      if (!this.viewAnalyticsAllowed) return
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
    },
    getGraphData(startDate, endDate) {
      if (!this.viewAnalyticsAllowed) return
      this.getAssetsViewedBySize(startDate, endDate)
      this.getAssetsViewedByUser(startDate, endDate)
      this.getAssetsViewedByDevice(startDate, endDate)
      this.getMostAssetsView(startDate, endDate)
    },
    /* assets View by size */
    async getAssetsViewedBySize(startDate, endDate) {
      if (!this.viewAnalyticsAllowed) return
      this.graph.viewBySize = true
      await this.$axios
        .$post('digital-assets/analytics/assets-view-by-size', {
          from_date: startDate,
          to_date: endDate,
          exclude_admin: this.isExcludeAdminData,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.assetsViewBySizeFilter(data)
          this.graph.viewBySize = false
        })
        .catch(this.$errorToast)
    },
    assetsViewBySizeFilter(assets_view) {
      if (!this.viewAnalyticsAllowed) return
      const assetsViewKey = Object.keys(assets_view)
      const viewBandwidth = []
      assetsViewKey.map((item) => {
        switch (item) {
          case '100kb_less_than':
            viewBandwidth.push('1 Byte - 100 KB')
            break
          case '101kb_to_1mb':
            viewBandwidth.push('101 KB - 1 MB')
            break
          case '1mb_to_10mb':
            viewBandwidth.push('1 MB - 10 MB')
            break
          case '11mb_to_100mb':
            viewBandwidth.push('11 MB - 100 MB')
            break
          case '101mb_to_1gb':
            viewBandwidth.push('101 MB - 1 GB')
            break
          case '1gb_to_grater_than':
            viewBandwidth.push('> 1 GB')
            break
        }
        return item
      })
      const assetsViewValue = Object.values(assets_view)
      const privateAssetCount = []
      const publicAssetCount = []
      for (let i = 0; i < assetsViewValue.length; i++) {
        if (assetsViewValue[i].public > 0 && this.assetsViewBySize === false) {
          this.assetsViewBySize = true
        } else if (
          assetsViewValue[i].private > 0 &&
          this.assetsViewBySize === false
        ) {
          this.assetsViewBySize = true
        }
        privateAssetCount.push(assetsViewValue[i].private)
        publicAssetCount.push(assetsViewValue[i].public)
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientPublic100KB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPublic100KB.addColorStop(1, '#797EFB')
      gradientPublic100KB.addColorStop(0, '#7C5DFA')

      const gradientPrivate100KB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivate100KB.addColorStop(1, 'rgba(121, 126, 251, 0.5)')
      gradientPrivate100KB.addColorStop(0, 'rgba(124, 93, 250, 0.5)')

      const gradientPublic1MB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPublic1MB.addColorStop(1, '#FA7A92')
      gradientPublic1MB.addColorStop(0, '#F95788')

      const gradientPrivate1MB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivate1MB.addColorStop(1, 'rgba(250, 122, 146, 0.5)')
      gradientPrivate1MB.addColorStop(0, 'rgba(249, 87, 136, 0.5)')

      const gradientPublic10MB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPublic10MB.addColorStop(1, '#FDA769')
      gradientPublic10MB.addColorStop(0, '#FD7C40')

      const gradientPrivate10MB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivate10MB.addColorStop(1, 'rgba(253, 167, 105, 0.5)')
      gradientPrivate10MB.addColorStop(0, 'rgba(253, 124, 64, 0.5)')

      const gradientPublic100MB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPublic100MB.addColorStop(1, '#5983FB')
      gradientPublic100MB.addColorStop(0, '#1150FB')

      const gradientPrivate100MB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivate100MB.addColorStop(1, 'rgba(89, 131, 251, 0.5)')
      gradientPrivate100MB.addColorStop(0, 'rgba(17, 80, 251, 0.5)')

      const gradientPublic1GB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPublic1GB.addColorStop(1, '#0CD8C4')
      gradientPublic1GB.addColorStop(0, '#01AF9E')

      const gradientPrivate1GB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivate1GB.addColorStop(1, 'rgba(12, 216, 196, 0.5)')
      gradientPrivate1GB.addColorStop(0, 'rgba(1, 175, 158, 0.5)')

      const gradientPublicG1GB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPublicG1GB.addColorStop(1, '#F8E133')
      gradientPublicG1GB.addColorStop(0, '#E2B90C')

      const gradientPrivateG1GB = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivateG1GB.addColorStop(1, 'rgba(248, 225, 51, 0.5)')
      gradientPrivateG1GB.addColorStop(0, 'rgba(226, 185, 12, 0.5)')
      this.assetsViewBySizeData = {
        labels: viewBandwidth,
        datasets: [
          {
            label: 'Public',
            data: publicAssetCount,
            backgroundColor: [
              gradientPublic100KB,
              gradientPublic1MB,
              gradientPublic10MB,
              gradientPublic100MB,
              gradientPublic1GB,
              gradientPublicG1GB,
            ],
          },
          {
            label: 'Private',
            data: privateAssetCount,
            backgroundColor: [
              gradientPrivate100KB,
              gradientPrivate1MB,
              gradientPrivate10MB,
              gradientPrivate100MB,
              gradientPrivate1GB,
              gradientPrivateG1GB,
            ],
          },
        ],
      }
      this.assetsViewBySizeOptions = {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
          onHover: (event, chartElement) => {
            event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
          },
        },
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
          labels: {
            usePointStyle: true,
            padding: 20,
            fontSize: 14,
            fontFamily: 'acumin-pro,sans-serif',
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
                // stepSize: 10,
                precision: 0,
                reverse: false,
                beginAtZero: true,
              },
              scaleLabel: {
                display: true,
                labelString: 'Total view count',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'assetsViewBySize'
            this.loadCategoryList = 'assetsViewBySize'
            this.breadcrumbsHeader = 'Assets Viewed by Size'
            this.selectedData(e)
          }
        },
      }
    },
    /* assets View by user */
    async getAssetsViewedByUser(startDate, endDate) {
      if (!this.viewAnalyticsAllowed) return
      this.graph.viewByUser = true
      await this.$axios
        .$post('digital-assets/analytics/assets-view-by-user', {
          from_date: startDate,
          to_date: endDate,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.assetsViewByUserFilter(data)
          this.graph.viewByUser = false
        })
        .catch(this.$errorToast)
    },
    assetsViewByUserFilter(view_by_user_type) {
      if (!this.viewAnalyticsAllowed) return
      const deviceKey = Object.keys(view_by_user_type)
      const deviceValue = Object.values(view_by_user_type)
      for (let i = 0; i < deviceValue.length; i++) {
        if (deviceValue[i] > 0 && this.assetsViewByUser === false) {
          this.assetsViewByUser = true
        }
      }
      this.assetsViewByUserData = {
        labels: deviceKey,
        datasets: [
          {
            data: deviceValue,
            backgroundColor: [
              'rgba(69, 94, 167, 0.9)',
              'rgba(255, 138, 1, 0.9)',
            ],
          },
        ],
      }
      this.assetsViewByUserOptions = {
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
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'assetsViewByUser'
            this.loadCategoryList = 'assetsViewByUser'
            this.breadcrumbsHeader = 'Assets Viewed by User'
            this.selectedData(e)
          }
        },
      }
    },
    /* assets View by device */
    async getAssetsViewedByDevice(startDate, endDate) {
      if (!this.viewAnalyticsAllowed) return
      this.graph.viewByDevice = true
      await this.$axios
        .$post('digital-assets/analytics/assets-view-by-device', {
          from_date: startDate,
          to_date: endDate,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.assetsViewByDeviceFilter(data)
          this.graph.viewByDevice = false
        })
        .catch(this.$errorToast)
    },
    assetsViewByDeviceFilter(view_by_device_type) {
      if (!this.viewAnalyticsAllowed) return
      const deviceKey = Object.keys(view_by_device_type)
      const deviceValue = Object.values(view_by_device_type)
      for (let i = 0; i < deviceValue.length; i++) {
        if (deviceValue[i] > 0 && this.assetsViewByDevice === false) {
          this.assetsViewByDevice = true
        }
      }
      this.assetsViewByDeviceData = {
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
      this.assetsViewByDeviceOptions = {
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
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'assetsViewByDevice'
            this.loadCategoryList = 'assetsViewByDevice'
            this.breadcrumbsHeader = 'Assets Viewed by Device'
            this.selectedData(e)
          }
        },
      }
    },
    async getMostAssetsView(startDate, endDate) {
      if (!this.viewAnalyticsAllowed) return
      this.listLoading = true
      await this.$axios
        .$post('digital-assets/analytics/most-assets-view', {
          from_date: startDate,
          to_date: endDate,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.mostAssetsViewList = data
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
    selectedData(evt) {
      if (!this.viewAnalyticsAllowed) return
      let chart = null
      if (this.chartType === 'assetsViewBySize') {
        chart = this.$refs.assetsViewBySize.$data._chart
        const chartIndex = chart.getElementAtEvent(evt)
        this.permission = chartIndex?.[0]?._model?.datasetLabel.toLowerCase()
      }
      if (this.chartType === 'assetsViewByUser') {
        chart = this.$refs.assetsViewByUser.$data._chart
      }
      if (this.chartType === 'assetsViewByDevice') {
        chart = this.$refs.assetsViewByDevice.$data._chart
      }

      const chartIndex = chart.getElementAtEvent(evt)
      this.categoryBy = chartIndex?.[0]?._model?.label.toLowerCase()
      this.loadTable()
    },
    loadTable() {
      this.showGraph = false
    },
    nextTimeFrame() {
      if (!this.viewAnalyticsAllowed) return
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
      if (!this.viewAnalyticsAllowed) return
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
      if (!this.viewAnalyticsAllowed) return
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
      if (!this.viewAnalyticsAllowed) return
      this.selectedTimeframeText = data.text
      this.selectedTimeFrameId = data.id
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
      if (!this.viewAnalyticsAllowed) return
      this.showGraph = true
      this.categoryBy = null
      this.chartType = null
      this.getAllViewedAssetsAnalytics()
    },
  },
}
</script>
<style scoped>
.no-permission {
  background-image: url(assets/img/blurred-images/view-asset-analytics.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
