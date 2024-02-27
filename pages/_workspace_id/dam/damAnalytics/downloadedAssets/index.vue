<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div
        v-if="showGraph"
        class="general-settings-right h-100"
        :class="{ 'position-relative': !downloadAnalyticsAllowed }"
      >
        <template v-if="!downloadAnalyticsAllowed">
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
                    Assets Downloaded by Size
                    <i
                      v-tooltip="
                        'Total Downloaded Count of Public & Private Assets, Filtered By Timeframe. (By Default Downloads For Both DAM Frontend & Admin Users Will Be Showcased).'
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
                        downloadSizeExcludeAdminData(
                          isExcludeAdminData == false ? true : false
                        )
                      "
                    />
                    <span class="lable"></span>
                    <span class="ml-2">Exclude Admin Data</span>
                  </label>
                </div>
                <div class="chart">
                  <!--                  <content-loader
                    v-if="graph.downloadBySize && !assetsDownloadBySize"
                    :width="300"
                    :height="80"
                    class="normalLoader"
                    :speed="2"
                    :animate="true"
                  >
                    <rect x="6" y="4" rx="1" ry="1" width="300" height="80" />
                  </content-loader>-->
                  <InnerLoader
                    v-if="graph.downloadBySize && !assetsDownloadBySize"
                    :bg-white="false"
                  />
                  <Bar
                    v-if="assetsDownloadBySize"
                    id="group-by"
                    ref="assetsDownloadBySize"
                    class="chart-big"
                    :chart-data="assetsDownloadBySizeData"
                    :options="assetsDownloadBySizeOptions"
                    :height="400"
                  ></Bar>
                  <EmptyBarChart
                    v-if="!assetsDownloadBySize && !graph.downloadBySize"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Downloaded by User
                    <i
                      v-tooltip="
                        'Number of assets downloaded by DAM frontend and Admin user within selected timeframe.'
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
                      v-if="graph.downloadByUser && !assetsDownloadByUser"
                      :bg-white="false"
                    />
                    <Doughnut
                      v-if="assetsDownloadByUser"
                      ref="assetsDownloadByUser"
                      class="chart-small"
                      :chart-data="assetsDownloadByUserData"
                      :options="assetsDownloadByUserOptions"
                      :height="300"
                    ></Doughnut>
                    <EmptyPieChart
                      v-if="!assetsDownloadByUser && !graph.downloadByUser"
                    />
                  </template>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Downloaded by Device
                    <i
                      v-tooltip="
                        'Representation of Assets Downloaded By Device Bifurcated By Mobile & Web.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <!--                  <content-loader
                    v-if="graph.downloadByDevice && !assetsDownloadByDevice"
                    :width="300"
                    :height="140"
                    class="normalLoader"
                    :speed="2"
                    :animate="true"
                  >
                    <rect x="6" y="4" rx="1" ry="1" width="300" height="140" />
                  </content-loader>-->
                  <InnerLoader
                    v-if="graph.downloadByDevice && !assetsDownloadByDevice"
                    :bg-white="false"
                  />
                  <Doughnut
                    v-if="assetsDownloadByDevice"
                    ref="assetsDownloadByDevice"
                    class="chart-small"
                    :chart-data="assetsDownloadByDeviceData"
                    :options="assetsDownloadByDeviceOptions"
                    :height="300"
                  ></Doughnut>
                  <EmptyPieChart
                    v-if="!assetsDownloadByDevice && !graph.downloadByDevice"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Downloaded by Shared URL
                    <i
                      v-tooltip="
                        'Total Amount/Count of assets and collection downloaded by shared URL within selected timeframe by DAM frontend user.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <!--                  <content-loader
                    v-if="graph.downloadByShared && !assetsDownloadBySharedUrl"
                    :width="300"
                    :height="80"
                    class="normalLoader"
                    :speed="2"
                    :animate="true"
                  >
                    <rect x="6" y="4" rx="1" ry="1" width="300" height="80" />
                  </content-loader>-->
                  <InnerLoader
                    v-if="graph.downloadByShared && !assetsDownloadBySharedUrl"
                    :bg-white="false"
                  />
                  <LineGraph
                    v-if="assetsDownloadBySharedUrl"
                    ref="assetsDownloadBySharedUrl"
                    class="chart-big"
                    :chart-data="assetsDownloadBySharedUrlData"
                    :options="assetsDownloadBySharedUrlOptions"
                  ></LineGraph>
                  <EmptyLineGraph
                    v-if="!graph.downloadByShared && !assetsDownloadBySharedUrl"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="chartBox">
            <div class="title">
              <h4>
                Most Downloaded Assets
                <i
                  v-tooltip="
                    'List Of Assets With Highest Downloads, Filtered By timeframe. (By DAM Frontend Users).'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
            <div class="tableDetail">
              <div
                class="common-box"
                :class="{ 'bg-gray': mostAssetsDownloadList.length }"
              >
                <div class="table-list-view table-list-scrolling">
                  <ul v-if="mostAssetsDownloadList.length" class="thead">
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
                          'total-download sorting flex10',
                          sortingClass('download_count'),
                        ]"
                      >
                        <span
                          @click="
                            sortValueModel = 'download_count'
                            sort('files', 'download_count', $sortToTypedNumber)
                          "
                          >Total Download</span
                        >
                      </div>
                    </li>
                  </ul>
                  <div class="customscrollbar no_footer">
                    <ContentLoader
                      v-if="listLoading && !mostAssetsDownloadList.length"
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
                    <ul v-if="mostAssetsDownloadList.length" class="tbody">
                      <li v-for="file in mostAssetsDownloadList" :key="file.id">
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
                        <div class="total-download tb-column flex10">
                          <div class="top-column">
                            <label>{{ file.download_count }}</label>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <EmptyState
                      v-if="!listLoading && !mostAssetsDownloadList.length"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="downloadAnalyticsAllowed">
        <AssetsDownloadBySharedUrl
          v-if="!showGraph && chartType == 'assetsDownloadBySharedUrl'"
          :chart-type="chartType"
          :breadcrumbs-header="breadcrumbsHeader"
          :load-category-list="loadCategoryList"
          :category="categoryBy"
          :start-date="$moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)"
          :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
          :is-include-version-history="isIncludeVersionHistory"
          :permission="permission"
          @backToGraph="backToGraph"
        />
        <DownloadedAssets
          v-if="!showGraph && chartType != 'assetsDownloadBySharedUrl'"
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
      </template>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import DownloadedAssets from '~/components/dam/DamAnalytics/DownloadedAssets/DownloadedAssets'
import AssetsDownloadBySharedUrl from '~/components/dam/DamAnalytics/DownloadedAssets/AssetsDownloadBySharedUrl'

import Bar from '~/components/plugins/Bar'
import Doughnut from '~/components/plugins/Doughnut'
import LineGraph from '~/components/plugins/LineGraph'
import EmptyBarChart from '~/components/theme/global/EmptyBarChart'
import EmptyLineGraph from '~/components/theme/global/EmptyLineGraph'
import EmptyPieChart from '~/components/theme/global/EmptyPieChart'
import AnalyticsDurationFilter from '~/components/dam/DamAnalytics/AnalyticsDurationFilter'
import EmptyState from '~/components/theme/global/EmptyState'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
import analyticsSorting from '~/mixins/analyticsSorting'

export default {
  components: {
    AnalyticsLeftMenu,
    DownloadedAssets,
    AssetsDownloadBySharedUrl,
    Bar,
    Doughnut,
    LineGraph,
    ContentLoader,
    EmptyBarChart,
    EmptyLineGraph,
    EmptyPieChart,
    AnalyticsDurationFilter,
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
      /* assets download by size */
      assetsDownloadBySize: false,
      assetsDownloadBySizeData: null,
      assetsDownloadBySizeOptions: {},
      isExcludeAdminData: false,

      /* assets download by user */
      assetsDownloadByUser: false,
      assetsDownloadByUserData: null,
      assetsDownloadByUserOptions: {},

      /* assets download by device */
      assetsDownloadByDevice: false,
      assetsDownloadByDeviceData: null,
      assetsDownloadByDeviceOptions: {},

      /* assets Downloaded by shared url */
      assetsDownloadBySharedUrl: false,
      assetsDownloadBySharedUrlData: null,
      assetsDownloadBySharedUrlOptions: {},
      graph: {
        downloadBySize: true,
        downloadByUser: true,
        downloadByDevice: true,
        downloadByShared: true,
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
      permission: '',
      /* most assets View */
      mostAssetsDownloadList: [],
      listLoading: false,
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    downloadAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.download_asset_analytics
        ?.enable
    },
    files: {
      get() {
        return this.mostAssetsDownloadList
      },
      set(value) {
        this.mostAssetsDownloadList = value
      },
    },
    userAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.user_analytics?.enable
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
    this.getAllDownloadedAssetsAnalytics()
  },
  methods: {
    sortingClass(sortValue) {
      if (!this.downloadAnalyticsAllowed) return
      return {
        sortarrow: this.sorting.toolbar.value === sortValue,
        descending:
          this.sorting.toolbar.value === sortValue && this.sorting.toolbar.desc,
        active:
          this.sorting.toolbar.value === sortValue && this.sorting.toolbar.desc,
      }
    },
    includeVersionHistory(isVersion) {
      if (!this.downloadAnalyticsAllowed) return
      this.isIncludeVersionHistory = isVersion
      const startDate = this.$moment(this.graph.dates.startDate).format(
        this.SAVE_DATE_FORMAT
      )
      const endDate = this.$moment(this.graph.dates.endDate).format(
        this.SAVE_DATE_FORMAT
      )
      this.getGraphData(startDate, endDate)
    },
    downloadSizeExcludeAdminData(isExclude) {
      if (!this.downloadAnalyticsAllowed) return
      this.isExcludeAdminData = isExclude
      const startDate = this.$moment(this.graph.dates.startDate).format(
        this.SAVE_DATE_FORMAT
      )
      const endDate = this.$moment(this.graph.dates.endDate).format(
        this.SAVE_DATE_FORMAT
      )
      this.getAssetsDownloadBySize(startDate, endDate)
    },
    getAllDownloadedAssetsAnalytics() {
      if (!this.downloadAnalyticsAllowed) return
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
    },
    getGraphData(startDate, endDate) {
      if (!this.downloadAnalyticsAllowed) return
      this.getAssetsDownloadBySize(startDate, endDate)
      this.getAssetsDownloadByUser(startDate, endDate)
      this.getAssetsDownloadByDevice(startDate, endDate)
      this.getAssetsDownloadBySharedUrl(startDate, endDate)
      this.getMostAssetsDownload(startDate, endDate)
    },
    /* assets download by size */
    async getAssetsDownloadBySize(startDate, endDate) {
      if (!this.downloadAnalyticsAllowed) return
      this.graph.downloadBySize = true
      await this.$axios
        .$post('digital-assets/analytics/assets-download-by-size', {
          from_date: startDate,
          to_date: endDate,
          exclude_admin: this.isExcludeAdminData,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.assetsDownloadBySizeFilter(data)
          this.graph.downloadBySize = false
        })
        .catch(this.$errorToast)
    },
    assetsDownloadBySizeFilter(assets_download) {
      if (!this.downloadAnalyticsAllowed) return
      const assetsDownloadKey = Object.keys(assets_download)
      const downloadBandwidth = []
      assetsDownloadKey.map((item) => {
        switch (item) {
          case '100kb_less_than':
            downloadBandwidth.push('1 Byte - 100 KB')
            break
          case '101kb_to_1mb':
            downloadBandwidth.push('101 KB - 1 MB')
            break
          case '1mb_to_10mb':
            downloadBandwidth.push('1 MB - 10 MB')
            break
          case '11mb_to_100mb':
            downloadBandwidth.push('11 MB - 100 MB')
            break
          case '101mb_to_1gb':
            downloadBandwidth.push('101 MB - 1 GB')
            break
          case '1gb_to_grater_than':
            downloadBandwidth.push('> 1 GB')
            break
        }
        return item
      })
      const assetsDownloadValue = Object.values(assets_download)
      const privateAssetCount = []
      const publicAssetCount = []
      for (let i = 0; i < assetsDownloadValue.length; i++) {
        if (
          assetsDownloadValue[i].public > 0 &&
          this.assetsDownloadBySize === false
        ) {
          this.assetsDownloadBySize = true
        } else if (
          assetsDownloadValue[i].private > 0 &&
          this.assetsDownloadBySize === false
        ) {
          this.assetsDownloadBySize = true
        }
        privateAssetCount.push(assetsDownloadValue[i].private)
        publicAssetCount.push(assetsDownloadValue[i].public)
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
      this.assetsDownloadBySizeData = {
        labels: downloadBandwidth,
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
      this.assetsDownloadBySizeOptions = {
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
          position: 'top',
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
                labelString: 'Total download count',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'assetsDownloadBySize'
            this.loadCategoryList = 'assetsDownloadBySize'
            this.breadcrumbsHeader = 'Assets Downloaded by Size'
            this.selectedData(e)
          }
        },
      }
    },
    /* assets download by user */
    async getAssetsDownloadByUser(startDate, endDate) {
      if (!this.downloadAnalyticsAllowed) return
      this.graph.downloadByUser = true
      await this.$axios
        .$post('digital-assets/analytics/assets-download-by-user', {
          from_date: startDate,
          to_date: endDate,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.assetsDownloadByUserFilter(data)
          this.graph.downloadByUser = false
        })
        .catch(this.$errorToast)
    },
    assetsDownloadByUserFilter(download_by_user_type) {
      if (!this.downloadAnalyticsAllowed) return
      const deviceKey = Object.keys(download_by_user_type)
      const deviceValue = Object.values(download_by_user_type)
      for (let i = 0; i < deviceValue.length; i++) {
        if (deviceValue[i] > 0 && this.assetsDownloadByUser === false) {
          this.assetsDownloadByUser = true
        }
      }
      this.assetsDownloadByUserData = {
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
      this.assetsDownloadByUserOptions = {
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
            this.chartType = 'assetsDownloadByUser'
            this.loadCategoryList = 'assetsDownloadByUser'
            this.breadcrumbsHeader = 'Assets Downloaded by User'
            this.selectedData(e)
          }
        },
      }
    },
    /* assets download by USER */
    async getAssetsDownloadByDevice(startDate, endDate) {
      if (!this.downloadAnalyticsAllowed) return
      this.graph.downloadByDevice = true
      await this.$axios
        .$post('digital-assets/analytics/assets-download-by-device', {
          from_date: startDate,
          to_date: endDate,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.assetsDownloadByDeviceFilter(data)
          this.graph.downloadByDevice = false
        })
        .catch(this.$errorToast)
    },
    assetsDownloadByDeviceFilter(download_by_device_type) {
      if (!this.downloadAnalyticsAllowed) return
      const deviceKey = Object.keys(download_by_device_type)
      const deviceValue = Object.values(download_by_device_type)
      for (let i = 0; i < deviceValue.length; i++) {
        if (deviceValue[i] > 0 && this.assetsDownloadByDevice === false) {
          this.assetsDownloadByDevice = true
        }
      }
      this.assetsDownloadByDeviceData = {
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
      this.assetsDownloadByDeviceOptions = {
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
            this.chartType = 'assetsDownloadByDevice'
            this.loadCategoryList = 'assetsDownloadByDevice'
            this.breadcrumbsHeader = 'Assets Downloaded by Device'
            this.selectedData(e)
          }
        },
      }
    },
    /* assets Downloaded by shared url */
    async getAssetsDownloadBySharedUrl(startDate, endDate) {
      if (!this.downloadAnalyticsAllowed) return
      this.graph.downloadByShared = true

      await this.$axios
        .$post('digital-assets/analytics/assets-download-by-share-url', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.assetsDownloadBySharedUrlFilter(data.graph_data)
          this.graph.downloadByShared = false
        })
        .catch(this.$errorToast)
    },
    assetsDownloadBySharedUrlFilter(assetsDownloadBySharedUrl) {
      if (!this.downloadAnalyticsAllowed) return
      const categoryKey = Object.keys(assetsDownloadBySharedUrl.collection)
      const collectionCategoryValue = Object.values(
        assetsDownloadBySharedUrl.collection
      )
      const totalCollectionAssetSize = []
      for (let i = 0; i < collectionCategoryValue.length; i++) {
        if (
          collectionCategoryValue[i] > 0 &&
          this.assetsDownloadBySharedUrl === false
        ) {
          this.assetsDownloadBySharedUrl = true
        }
        totalCollectionAssetSize.push(collectionCategoryValue[i])
      }
      const shareCategoryValue = Object.values(assetsDownloadBySharedUrl.share)

      const totalShareAssetSize = []
      for (let i = 0; i < shareCategoryValue.length; i++) {
        if (
          shareCategoryValue[i] > 0 &&
          this.assetsDownloadBySharedUrl === false
        ) {
          this.assetsDownloadBySharedUrl = true
        }
        totalShareAssetSize.push(shareCategoryValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientFill = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill.addColorStop(1, 'rgba(16, 196, 179, 0.9)')
      gradientFill.addColorStop(0.5, 'rgba(16, 196, 179, 0.75)')
      gradientFill.addColorStop(0, 'rgba(16, 196, 179, 0.6)')
      // gradientFill.addColorStop(0, 'rgba(10, 224, 204, 0.9)')

      const gradientFill1 = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill1.addColorStop(1, 'rgba(3, 109, 198, 0.9)')
      gradientFill1.addColorStop(0.5, 'rgba(3, 109, 198, 0.75)')
      gradientFill1.addColorStop(0, 'rgba(3, 109, 198, 0.6)')
      // gradientFill1.addColorStop(0, 'rgba(30, 147, 245, 0.9)')
      this.assetsDownloadBySharedUrlData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Collection Shared URL',
            data: totalCollectionAssetSize,
            backgroundColor: gradientFill,
          },
          {
            label: 'Asset Shared URL',
            data: totalShareAssetSize,
            backgroundColor: gradientFill1,
          },
        ],
      }
      this.assetsDownloadBySharedUrlOptions = {
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

              return 'Total Download: ' + value
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
                labelString: 'Total no. of Download',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'assetsDownloadBySharedUrl'
            this.loadCategoryList = 'assetsDownloadBySharedUrl'
            this.breadcrumbsHeader = 'Assets Downloaded by Shared URL'
            this.selectedData(e)
          }
        },
      }
    },
    async getMostAssetsDownload(startDate, endDate) {
      if (!this.downloadAnalyticsAllowed) return
      this.listLoading = true
      await this.$axios
        .$post('digital-assets/analytics/most-assets-download', {
          from_date: startDate,
          to_date: endDate,
          include_version: this.isIncludeVersionHistory,
        })
        .then(({ data }) => {
          this.mostAssetsDownloadList = data
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
    selectedData(evt) {
      if (!this.downloadAnalyticsAllowed) return
      let chart = null
      if (this.chartType === 'assetsDownloadBySize') {
        chart = this.$refs.assetsDownloadBySize.$data._chart
        const chartIndex = chart.getElementAtEvent(evt)
        this.permission = chartIndex?.[0]?._model?.datasetLabel.toLowerCase()
      }
      if (this.chartType === 'assetsDownloadByUser') {
        chart = this.$refs.assetsDownloadByUser.$data._chart
      }
      if (this.chartType === 'assetsDownloadByDevice') {
        chart = this.$refs.assetsDownloadByDevice.$data._chart
      }
      if (this.chartType === 'assetsDownloadBySharedUrl') {
        chart = this.$refs.assetsDownloadBySharedUrl.$data._chart
      }
      const chartIndex = chart.getElementAtEvent(evt)
      if (this.chartType === 'assetsDownloadBySharedUrl') {
        const chartData = chartIndex?.[0]?._chart.config.data
        const idx = chartIndex[0]._datasetIndex
        const label = chartData.datasets[idx].label
        this.categoryBy = label.toLowerCase()
      } else {
        this.categoryBy = chartIndex?.[0]?._model?.label.toLowerCase()
      }
      this.loadTable()
    },
    loadTable() {
      this.showGraph = false
    },
    nextTimeFrame() {
      if (!this.downloadAnalyticsAllowed) return
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
      if (!this.downloadAnalyticsAllowed) return
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
      if (!this.downloadAnalyticsAllowed) return
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
      if (!this.downloadAnalyticsAllowed) return
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
      if (!this.downloadAnalyticsAllowed) return
      this.showGraph = true
      this.categoryBy = null
      this.chartType = null
      this.getAllDownloadedAssetsAnalytics()
    },
  },
}
</script>
<style scoped>
.no-permission {
  background-image: url(assets/img/blurred-images/download-asset-analytics.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
