<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div v-if="showGraph" class="general-settings-right h-100">
        <div class="newAnalytics customscrollbar">
          <AnalyticsDashboard />
          <div class="row big-gutters">
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Storage Distribution by Category
                    <!-- <i
                      v-tooltip="'Storage Distribution by File Type'"
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i> -->
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.loading && !storageDistributionByFile"
                    :bg-white="false"
                  />
                  <Bar
                    v-if="storageDistributionByFile"
                    ref="storageDistributionByFile"
                    class="chart-small"
                    :chart-data="storageDistributionByFileData"
                    :options="storageDistributionByFileOptions"
                    :height="300"
                  ></Bar>
                  <EmptyBarChart
                    v-if="!storageDistributionByFile && !graph.loading"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Storage Distribution by File Size
                    <!-- <i
                      v-tooltip="'Storage Distribution by Size'"
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i> -->
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.loading && !storageDistributionBySize"
                    :bg-white="false"
                  />
                  <Pie
                    v-if="storageDistributionBySize"
                    ref="storageDistributionBySize"
                    class="chart-small"
                    :chart-data="storageDistributionBySizeData"
                    :options="storageDistributionBySizeOptions"
                    :height="300"
                  ></Pie>
                  <EmptyPieChart
                    v-if="!storageDistributionBySize && !graph.loading"
                  />
                </div>
              </div>
            </div>
          </div>
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
                :parent-class="true"
                @previousTimeFrame="previousTimeFrame"
                @nextTimeFrame="nextTimeFrame"
                @dateChangeHandler="dateChangeHandler"
                @customDateSelected="customDateSelected"
              />
            </div>
            <div class="col-md-12">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Uploaded - {{ totalAssetsUploaded }}
                    <i
                      v-tooltip="
                        'Total Number Of Assets Uploaded Filtered By Timeframe. - ' +
                        totalAssetsUploaded
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.loading && !assetsUploaded"
                    :bg-white="false"
                  />
                  <LineGraph
                    v-if="assetsUploaded"
                    ref="assetsUploaded"
                    class="chart-big"
                    :chart-data="assetsUploadedData"
                    :options="assetsUploadedOptions"
                  ></LineGraph>
                  <EmptyLineGraph
                    v-if="!graph.loading && !assetsUploaded"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Storage -
                    {{ $toHumanlySize(totalAssetsStorage, 1000) }}
                    <i
                      v-tooltip="
                        'Total Storage Size Utilized, Filtered By Timeframe. - ' +
                        $toHumanlySize(totalAssetsStorage, 1000)
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.loading && !assetsStorage"
                    :bg-white="false"
                  />
                  <LineGraph
                    v-if="assetsStorage"
                    ref="assetsStorage"
                    class="chart-big"
                    :chart-data="assetsStorageData"
                    :options="assetsStorageOptions"
                  ></LineGraph>
                  <EmptyLineGraph
                    v-if="!graph.loading && !assetsStorage"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Assets Download -
                    {{ $toHumanlySize(totalAssetsDownloaded, 1000) }}
                    <i
                      v-tooltip="
                        'Total Storage Bandwidth Of the Downloaded Assets, Filtered By Timeframe. Bifurcated by Frontend & Admin User. - ' +
                        $toHumanlySize(totalAssetsDownloaded, 1000)
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <InnerLoader
                    v-if="graph.loading && !assetsDownloaded"
                    :bg-white="false"
                  />
                  <LineGraph
                    v-if="assetsDownloaded"
                    ref="assetsDownloaded"
                    class="chart-big"
                    :chart-data="assetsDownloadedData"
                    :options="assetsDownloadedOptions"
                  ></LineGraph>
                  <EmptyLineGraph
                    v-if="!graph.loading && !assetsDownloaded"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StorageDistribution
        v-if="!showGraph"
        :chart-type="chartType"
        :breadcrumbs-header="breadcrumbsHeader"
        :load-category-list="loadCategoryList"
        :category="categoryBy"
        @backToGraph="backToGraph"
      />
    </div>
  </div>
</template>

<script>
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import StorageDistribution from '~/components/dam/DamAnalytics/DamInsights/StorageDistribution'
import AnalyticsDashboard from '~/components/dam/DamAnalytics/DamInsights/AnalyticsDashboard'
import Bar from '~/components/plugins/Bar'
import Pie from '~/components/plugins/Pie'
import LineGraph from '~/components/plugins/LineGraph'
import EmptyBarChart from '~/components/theme/global/EmptyBarChart'
import EmptyLineGraph from '~/components/theme/global/EmptyLineGraph'
import EmptyPieChart from '~/components/theme/global/EmptyPieChart'
import AnalyticsDurationFilter from '~/components/dam/DamAnalytics/AnalyticsDurationFilter'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'

export default {
  components: {
    AnalyticsLeftMenu,
    StorageDistribution,
    AnalyticsDashboard,
    Bar,
    Pie,
    LineGraph,
    EmptyLineGraph,
    EmptyPieChart,
    EmptyBarChart,
    AnalyticsDurationFilter,
    InnerLoader,
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
      showGraph: true,
      loading: true,
      /* storage distribution by file */
      storageDistributionByFile: false,
      storageDistributionByFileData: null,
      storageDistributionByFileOptions: {},
      /* storage distribution by size */
      storageDistributionBySize: false,
      storageDistributionBySizeData: null,
      storageDistributionBySizeOptions: {},

      /* assets Uploaded */
      assetsUploaded: false,
      assetsUploadedData: null,
      assetsUploadedOptions: {},
      totalAssetsUploaded: 0,

      /* assets Storage */
      assetsStorage: false,
      assetsStorageData: null,
      assetsStorageOptions: {},
      totalAssetsStorage: 0,
      /* assets Downloaded */
      assetsDownloaded: false,
      assetsDownloadedData: null,
      assetsDownloadedOptions: {},
      totalAssetsDownloaded: 0,

      graph: {
        loading: true,
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
    }
  },
  mounted() {
    this.getAllDamInsightsAnalytics()
  },
  methods: {
    getAllDamInsightsAnalytics() {
      this.storageDistributionByFileType()
      this.storageDistributionByFileSize()
      this.getGraphData(
        this.$moment(this.graph.dates.startDate).format(this.SAVE_DATE_FORMAT),
        this.$moment(this.graph.dates.endDate).format(this.SAVE_DATE_FORMAT)
      )
    },
    /* storage distribution by file */
    async storageDistributionByFileType() {
      this.graph.loading = true
      try {
        const { data } = await this.$axios.$get(
          `digital-assets/analytics/storage-distribution-by-file-type`
        )
        this.storageDistributionByCategory(data)
        this.graph.loading = false
      } catch (e) {
        const { data } = e.response
        this.$toast.error(data.message)
      }
    },
    storageDistributionByCategory(group_by_file) {
      const categoryKey = Object.keys(group_by_file)
      const categoryValue = Object.values(group_by_file)
      const totalAssetCount = []
      for (let i = 0; i < categoryValue.length; i++) {
        if (categoryValue[i] > 0 && this.storageDistributionByFile === false) {
          this.storageDistributionByFile = true
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
      this.storageDistributionByFileData = {
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
      this.storageDistributionByFileOptions = {
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
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                1000
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
                callback: (value) => this.$toHumanlyNumericSize(value, 1000),
              },
              scaleLabel: {
                display: true,
                labelString: 'Storage size',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
        onClick: (e, array) => {
          if (array.length) {
            this.chartType = 'storageDistributionByFile'
            this.loadCategoryList = 'storageDistributionByFile'
            this.breadcrumbsHeader = 'Storage Distribution by Category'
            this.selectedData(e)
          }
        },
      }
    },
    /* storage distribution by size */
    async storageDistributionByFileSize() {
      this.graph.loading = true
      try {
        const { data } = await this.$axios.$get(
          `digital-assets/analytics/storage-distribution-by-file-size`
        )
        this.storageDistributionByTotalSize(data)
        this.graph.loading = false
      } catch (e) {
        const { data } = e.response
        this.$toast.error(data.message)
      }
    },
    storageDistributionByTotalSize(group_by_file_size) {
      const assetsFileSizeKey = Object.keys(group_by_file_size)
      const fileSizeBandwidth = []
      assetsFileSizeKey.map((item) => {
        switch (item) {
          case '100kb_less_than':
            fileSizeBandwidth.push('1 Byte - 100 KB')
            break
          case '101kb_to_1mb':
            fileSizeBandwidth.push('101 KB - 1 MB')
            break
          case '1mb_to_10mb':
            fileSizeBandwidth.push('1 MB - 10 MB')
            break
          case '11mb_to_100mb':
            fileSizeBandwidth.push('11 MB - 100 MB')
            break
          case '101mb_to_1gb':
            fileSizeBandwidth.push('101 MB - 1 GB')
            break
          case '1gb_to_grater_than':
            fileSizeBandwidth.push('> 1 GB')
            break
        }
        return item
      })
      const assetsFileSizeValue = Object.values(group_by_file_size)
      const totalAssetCount = []
      for (let i = 0; i < assetsFileSizeValue.length; i++) {
        if (
          assetsFileSizeValue[i] > 0 &&
          this.storageDistributionBySize === false
        ) {
          this.storageDistributionBySize = true
        }
        totalAssetCount.push(assetsFileSizeValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradient100KB = ctx.createLinearGradient(400, 0, 100, 0)
      gradient100KB.addColorStop(1, '#7C5DFA')
      gradient100KB.addColorStop(0, '#797EFB')

      const gradient1MB = ctx.createLinearGradient(400, 0, 100, 0)
      gradient1MB.addColorStop(1, '#F95788')
      gradient1MB.addColorStop(0, '#FA7A92')

      const gradient10MB = ctx.createLinearGradient(400, 0, 100, 0)
      gradient10MB.addColorStop(1, '#FD7C40')
      gradient10MB.addColorStop(0, '#FDA769')

      const gradient100MB = ctx.createLinearGradient(400, 0, 100, 0)
      gradient100MB.addColorStop(1, '#1150FB')
      gradient100MB.addColorStop(0, '#5983FB')

      const gradient1GB = ctx.createLinearGradient(400, 0, 100, 0)
      gradient1GB.addColorStop(1, '#01AF9E')
      gradient1GB.addColorStop(0, '#0CD8C4')

      const gradientG1GB = ctx.createLinearGradient(400, 0, 100, 0)
      gradientG1GB.addColorStop(1, '#E2B90C')
      gradientG1GB.addColorStop(0, '#F8E133')

      this.storageDistributionBySizeData = {
        labels: fileSizeBandwidth,
        datasets: [
          {
            data: totalAssetCount,
            backgroundColor: [
              gradient100KB,
              gradient1MB,
              gradient10MB,
              gradient100MB,
              gradient1GB,
              gradientG1GB,
            ],
          },
        ],
      }
      this.storageDistributionBySizeOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          onHover: (e) => (e.target.style.cursor = 'pointer'),
          position: 'right',
          maxSize: {
            height: 200,
          },
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
            this.chartType = 'storageDistributionBySize'
            this.loadCategoryList = 'storageDistributionBySize'
            this.breadcrumbsHeader = 'Storage Distribution by File Size'
            this.selectedData(e)
          }
        },
      }
    },
    getGraphData(startDate, endDate) {
      this.getAssetsUpload(startDate, endDate)
      this.getAssetsStorage(startDate, endDate)
      this.getAssetsDownload(startDate, endDate)
    },
    /* assets Uploaded */
    async getAssetsUpload(startDate, endDate) {
      this.graph.loading = true
      await this.$axios
        .$post('digital-assets/analytics/assets-upload', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.totalAssetsUploaded = data.total
          this.assetsUploadedFilterByTime(data.graph_data)
          this.graph.loading = false
        })
        .catch(this.$errorToast)
    },
    assetsUploadedFilterByTime(assetsUpload) {
      const categoryKey = Object.keys(assetsUpload)
      const categoryValue = Object.values(assetsUpload)
      const totalAssetCount = []
      for (let i = 0; i < categoryValue.length; i++) {
        if (categoryValue[i] > 0 && this.assetsUploaded === false) {
          this.assetsUploaded = true
        }
        totalAssetCount.push(categoryValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientFill = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill.addColorStop(1, '#7C5DFA')
      gradientFill.addColorStop(0, '#797EFB')

      this.assetsUploadedData = {
        labels: categoryKey,
        datasets: [
          {
            data: totalAssetCount,
            backgroundColor: gradientFill,
          },
        ],
      }
      this.assetsUploadedOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              return 'Total Assets: ' + value
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
                labelString: 'Total no. of Assets',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
      }
    },
    /* assets Storage */
    async getAssetsStorage(startDate, endDate) {
      this.graph.loading = true

      await this.$axios
        .$post('digital-assets/analytics/assets-storage', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.totalAssetsStorage = data.total
          this.assetsStorageFilterByTime(data.graph_data)
          this.graph.loading = false
        })
        .catch(this.$errorToast)
    },
    assetsStorageFilterByTime(assetsStorage) {
      const categoryKey = Object.keys(assetsStorage)
      const categoryValue = Object.values(assetsStorage)
      const totalAssetCount = []
      for (let i = 0; i < categoryValue.length; i++) {
        if (categoryValue[i] > 0 && this.assetsStorage === false) {
          this.assetsStorage = true
        }
        totalAssetCount.push(categoryValue[i])
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientFill = ctx.createLinearGradient(0, 400, 0, 100)
      gradientFill.addColorStop(1, '#F95788')
      gradientFill.addColorStop(0, '#FA7A92')
      this.assetsStorageData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Assets Storage',
            data: totalAssetCount,
            backgroundColor: gradientFill,
          },
        ],
      }
      this.assetsStorageOptions = {
        maintainAspectRatio: false,
        responsive: true,

        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value = this.$toHumanlySize(
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                1000
              )

              return 'Total Storage: ' + value
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
              stacked: true,
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                // stepSize: 10,
                precision: 0,
                reverse: false,
                beginAtZero: true,
                autoSkip: true,
                // callback: (value) => this.$toHumanlySize(value),
                callback: (value) => this.$toHumanlyNumericSize(value, 1000),
              },
              scaleLabel: {
                display: true,
                labelString: 'Total storage size',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
      }
    },
    /* assets Downloaded */
    async getAssetsDownload(startDate, endDate) {
      this.graph.loading = true

      await this.$axios
        .$post('digital-assets/analytics/assets-download', {
          from_date: startDate,
          to_date: endDate,
          date_type: this.dateType,
        })
        .then(({ data }) => {
          this.totalAssetsDownloaded = data.total
          this.assetsDownloadedFilterByTime(data.graph_data)
          this.graph.loading = false
        })
        .catch(this.$errorToast)
    },
    assetsDownloadedFilterByTime(assetsDownloaded) {
      const categoryKey = Object.keys(assetsDownloaded.admin)
      const adminCategoryValue = Object.values(assetsDownloaded.admin)
      const totalAdminAssetSize = []
      for (let i = 0; i < adminCategoryValue.length; i++) {
        if (adminCategoryValue[i] > 0 && this.assetsDownloaded === false) {
          this.assetsDownloaded = true
        }
        totalAdminAssetSize.push(adminCategoryValue[i])
      }
      const userCategoryValue = Object.values(assetsDownloaded.user)

      const totalUserAssetSize = []
      for (let i = 0; i < userCategoryValue.length; i++) {
        if (userCategoryValue[i] > 0 && this.assetsDownloaded === false) {
          this.assetsDownloaded = true
        }
        totalUserAssetSize.push(userCategoryValue[i])
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
      // gradientFill1.addColorStop(0, 'rgba(73, 111, 222, 0.6)')
      this.assetsDownloadedData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Admin',
            data: totalAdminAssetSize,
            backgroundColor: gradientFill,
          },
          {
            label: 'Frontend Users',
            data: totalUserAssetSize,
            backgroundColor: gradientFill1,
          },
        ],
      }
      this.assetsDownloadedOptions = {
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
          onHover(e) {
            const point = this.getElementAtEvent(e)
            if (point.length) e.target.style.cursor = 'pointer'
            else e.target.style.cursor = 'default'
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const value = this.$toHumanlySize(
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              )

              return 'Total Used Bandwidth: ' + value
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
                // callback: (value) => this.$toHumanlySize(value),
                callback: (value) => this.$toHumanlyNumericSize(value, 1000),
              },
              scaleLabel: {
                display: true,
                labelString: 'Total download bandwidth',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
      }
    },
    selectedData(evt) {
      let chart = null
      if (this.chartType === 'storageDistributionByFile') {
        chart = this.$refs.storageDistributionByFile.$data._chart
      } else {
        chart = this.$refs.storageDistributionBySize.$data._chart
      }
      const chartIndex = chart.getElementAtEvent(evt)
      this.categoryBy = chartIndex?.[0]?._model?.label.toLowerCase()

      this.loadTable()
    },
    loadTable() {
      this.showGraph = false
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
      this.chartType = null
      this.getAllDamInsightsAnalytics()
    },
  },
}
</script>
