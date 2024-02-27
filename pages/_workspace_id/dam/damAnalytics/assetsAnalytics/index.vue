<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div
        v-if="!assetAnalyticsAllowed"
        class="position-relative general-settings-right h-100"
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
      <div v-else class="general-settings-right h-100">
        <div class="newAnalytics customscrollbar">
          <AnalyticsDurationFilter
            :selected-timeframe-text="selectedTimeframeText"
            :from-date="
              $moment(graph.dates.startDate).format(DISPLAY_DATE_FORMAT)
            "
            :to-date="$moment(graph.dates.endDate).format(DISPLAY_DATE_FORMAT)"
            :selected-time-frame-id="selectedTimeFrameId"
            :show-custom-date="showCustomDate"
            :custom-start-date="customStartDate"
            :custom-end-date="customEndDate"
            @previousTimeFrame="previousTimeFrame"
            @nextTimeFrame="nextTimeFrame"
            @dateChangeHandler="dateChangeHandler"
            @customDateSelected="customDateSelected"
          />
          <div class="chartBox">
            <div class="title">
              <h4>
                Most Viewed Assets
                <i
                  v-tooltip="
                    'List Of Assets With Highest Views, Filtered By timeframe.'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
            <MostViewedAssets
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />
          </div>
          <div class="chartBox">
            <div class="title">
              <h4>
                Most Downloaded Assets
                <i
                  v-tooltip="
                    'List Of Assets With Highest Downloads, Filtered By timeframe.'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
            <MostDownloadedAsset
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />
          </div>
          <div class="chartBox">
            <div class="title">
              <h4>
                Most Shared Assets
                <i
                  v-tooltip="
                    'List Of Assets With Highest Shares, Filtered By timeframe.'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
            <MostSharedAsset
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />
          </div>
          <div class="row big-gutters">
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Top Users Based on Assets Downloaded
                    <i
                      v-tooltip="
                        'List Of Top Users With Highest Assets Downloads, Filtered By timeframe.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <UsersBasedAssetDownload
                  :start-date="
                    $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
                  "
                  :end-date="
                    $moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)
                  "
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="chartBox">
                <div class="title">
                  <h4>
                    Top Users Based on Assets Viewed
                    <i
                      v-tooltip="
                        'List Of Top Users With Highest Assets Views, Filtered By timeframe.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <UsersBasedAssetView
                  :start-date="
                    $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
                  "
                  :end-date="
                    $moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)
                  "
                />
              </div>
            </div>
          </div>
          <div class="chartBox mapLocationChart">
            <div class="title">
              <h4>
                Assets Activity Based on Location
                <i
                  v-tooltip="
                    'Total Count Of Assets Accessed Filtered By Location.'
                  "
                  class="fa fa-info-circle"
                  aria-hidden="true"
                ></i>
              </h4>
            </div>
            <AssetActivityBasedOnLocation
              v-if="locationAnalyticsAllowed"
              :start-date="
                $moment(graph.dates.startDate).format(SAVE_DATE_FORMAT)
              "
              :end-date="$moment(graph.dates.endDate).format(SAVE_DATE_FORMAT)"
            />
            <div v-else class="position-relative">
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
    </div>
  </div>
</template>

<script>
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import AnalyticsDurationFilter from '~/components/dam/DamAnalytics/AnalyticsDurationFilter'
import MostViewedAssets from '~/components/dam/DamAnalytics/AssetsAnalytics/MostViewedAssets'
import MostDownloadedAsset from '~/components/dam/DamAnalytics/AssetsAnalytics/MostDownloadedAsset'
import MostSharedAsset from '~/components/dam/DamAnalytics/AssetsAnalytics/MostSharedAsset'
import UsersBasedAssetDownload from '~/components/dam/DamAnalytics/AssetsAnalytics/UsersBasedAssetDownload'
import UsersBasedAssetView from '~/components/dam/DamAnalytics/AssetsAnalytics/UsersBasedAssetView'
import AssetActivityBasedOnLocation from '~/components/dam/DamAnalytics/AssetsAnalytics/AssetActivityBasedOnLocation'

export default {
  components: {
    AnalyticsLeftMenu,
    AnalyticsDurationFilter,
    MostViewedAssets,
    MostDownloadedAsset,
    MostSharedAsset,
    UsersBasedAssetDownload,
    UsersBasedAssetView,
    AssetActivityBasedOnLocation,
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
      customStartDate: null,
      customEndDate: null,
      showCustomDate: false,
      SAVE_DATE_FORMAT: 'YYYY-MM-DD',
      DISPLAY_DATE_FORMAT: 'D, MMM YYYY',
      graph: {
        loading: true,
        dates: {
          month: true,
          week: false,
          startDate: this.$moment().subtract('29', 'days'),
          endDate: this.$moment(),
        },
      },
      selectedTimeFrameId: 2,
      selectedTimeframeText: 'Month',
      dateType: 'month',
    }
  },
  computed: {
    assetAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.trending_analytics
        ?.enable
    },
    locationAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features
        ?.geo_location_based_analytics?.enable
    },
  },
  methods: {
    nextTimeFrame() {
      if (!this.assetAnalyticsAllowed) return
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
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    previousTimeFrame() {
      if (!this.assetAnalyticsAllowed) return
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
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    customDateSelected(data) {
      if (!this.assetAnalyticsAllowed) return
      this.customStartDate = data.customFromDate
      this.customEndDate = data.customToDate
      this.graph.dates.startDate = data.customFromDate
      this.graph.dates.endDate = data.customToDate
      if (this.showGraph === false) {
        this.loadTable()
      }
    },
    dateChangeHandler(data) {
      if (!this.assetAnalyticsAllowed) return
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
  background-image: url(assets/img/blurred-images/asset-analytics.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
