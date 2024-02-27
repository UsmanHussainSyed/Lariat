<template>
  <div class="body-content p0">
    <div class="general-settings h-100 w-100">
      <AnalyticsLeftMenu />
      <div
        class="general-settings-right h-100"
        :class="{ 'position-relative': !untagAssetAnalyticsAllowed }"
      >
        <template v-if="!untagAssetAnalyticsAllowed">
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
                <div class="btn-group mt20">
                  <a
                    href="javascript:void(0)"
                    @click.stop="
                      $router.push({
                        name: 'workspace_id-workspace-settings-account-billing',
                        params: {
                          showUpgradeModal: true,
                          workspace_id: $getWorkspaceId(),
                        },
                      })
                    "
                    onclick="window.open(this.href, 'chart', 'width=1225, height=770'); return false;"
                    class="btn"
                    >Upgrade</a
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="newAnalytics customscrollbar">
          <div class="success-msg">
            <div class="alert alert-info d-block">
              <svg
                id="Capa_1"
                class="info-icon mr-1"
                style="margin-top: -2px; enable-background: new 0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                xml:space="preserve"
              >
                <path
                  class="fill-color"
                  d="M256,0C114.613,0,0,114.617,0,256c0,141.391,114.613,256,256,256s256-114.609,256-256C512,114.617,397.387,0,256,0zM256,128c17.674,0,32,14.328,32,32c0,17.68-14.326,32-32,32s-32-14.32-32-32C224,142.328,238.326,128,256,128z M304,384h-96c-8.836,0-16-7.156-16-16c0-8.836,7.164-16,16-16h16v-96h-16c-8.836,0-16-7.156-16-16c0-8.836,7.164-16,16-16h64c8.836,0,16,7.164,16,16v112h16c8.836,0,16,7.164,16,16C320,376.844,312.836,384,304,384z"
                />
              </svg>
              This analytics will showcase all the active assets of your DAM
              platform which doesn’t have Tags. You can use this page to add
              Tags in multiple assets at a time. Uncategorised, Archive and
              Deleted assets won’t appear here.
            </div>
          </div>
          <div class="row big-gutters">
            <div class="col-md-12">
              <div class="chartBox mt0">
                <div class="title">
                  <h4>
                    Untagged Assets by Asset Category
                    <i
                      v-tooltip="
                        'Total Number Of Untagged Assets By Asset Type.'
                      "
                      class="fa fa-info-circle"
                      aria-hidden="true"
                    ></i>
                  </h4>
                </div>
                <div class="chart">
                  <!--                  <content-loader
                    v-if="graphLoading && !untaggedAssetsByCategory"
                    :width="300"
                    :height="80"
                    class="normalLoader"
                    :speed="2"
                    :animate="true"
                  >
                    <rect x="6" y="4" rx="1" ry="1" width="300" height="80" />
                  </content-loader>-->
                  <InnerLoader
                    v-if="graphLoading && !untaggedAssetsByCategory"
                    :bg-white="false"
                  />
                  <Bar
                    v-if="untaggedAssetsByCategory"
                    :chart-data="untaggedAssetsByCategoryData"
                    :options="untaggedAssetsByCategoryOptions"
                    class="chart-big"
                    :height="400"
                  ></Bar>
                  <EmptyBarChart
                    v-if="!graphLoading && !untaggedAssetsByCategory"
                    :full-width="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <UntaggedAssetsCategory @updateTags="updateGraphTags" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticsLeftMenu from '~/components/dam/Settings/AnalyticsLeftMenu'
import UntaggedAssetsCategory from '~/components/dam/DamAnalytics/UntaggedAssets/UntaggedAssetsCategory'

import Bar from '~/components/plugins/Bar'
import EmptyBarChart from '~/components/theme/global/EmptyBarChart'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
export default {
  components: {
    AnalyticsLeftMenu,
    UntaggedAssetsCategory,
    Bar,
    EmptyBarChart,
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
      untaggedAssetsByCategory: false,
      untaggedAssetsByCategoryData: null,
      untaggedAssetsByCategoryOptions: {},
      graphLoading: true,
    }
  },
  computed: {
    untagAssetAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.untagged_asset_management
        ?.enable
    },
  },
  created() {
    this.getAllUntaggedAssetsAnalytics()
  },
  methods: {
    async getAllUntaggedAssetsAnalytics() {
      if (!this.untagAssetAnalyticsAllowed) return
      this.graphLoading = true

      await this.$axios
        .$post('digital-assets/analytics/untag-assets-by-type')
        .then(({ data }) => {
          this.untaggedAssetsByCategoryFilter(data)
          this.graphLoading = false
        })
        .catch(this.$errorToast)
    },
    untaggedAssetsByCategoryFilter(group_by_category) {
      if (!this.untagAssetAnalyticsAllowed) return
      const categoryKey = Object.keys(group_by_category)
      const categoryValue = Object.values(group_by_category)
      const privateAssetCount = []
      const publicAssetCount = []
      for (let i = 0; i < categoryValue.length; i++) {
        if (
          categoryValue[i].public > 0 &&
          this.untaggedAssetsByCategory === false
        ) {
          this.untaggedAssetsByCategory = true
        } else if (
          categoryValue[i].private > 0 &&
          this.untaggedAssetsByCategory === false
        ) {
          this.untaggedAssetsByCategory = true
        }
        privateAssetCount.push(categoryValue[i].private)
        publicAssetCount.push(categoryValue[i].public)
      }
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      const gradientImage = ctx.createLinearGradient(0, 400, 0, 100)
      gradientImage.addColorStop(1, '#32ED91')
      gradientImage.addColorStop(0, '#05C768')

      const gradientPrivateImage = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivateImage.addColorStop(1, 'rgba(50, 237, 145, 0.5)')
      gradientPrivateImage.addColorStop(0, 'rgba(5, 199, 104, 0.5)')

      const gradientAudio = ctx.createLinearGradient(0, 400, 0, 100)
      gradientAudio.addColorStop(1, '#66A4F5')
      gradientAudio.addColorStop(0, '#4186E0')

      const gradientPrivateAudio = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivateAudio.addColorStop(1, 'rgba(102, 164, 245, 0.5)')
      gradientPrivateAudio.addColorStop(0, 'rgba(65, 134, 224, 0.5)')

      const gradientVideo = ctx.createLinearGradient(0, 400, 0, 100)
      gradientVideo.addColorStop(1, '#F86C66')
      gradientVideo.addColorStop(0, '#FC4C45')

      const gradientPrivateVideo = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivateVideo.addColorStop(1, 'rgba(248, 108, 102, 0.5)')
      gradientPrivateVideo.addColorStop(0, 'rgba(252, 76, 69, 0.5)')

      const gradientDocument = ctx.createLinearGradient(0, 400, 0, 100)
      gradientDocument.addColorStop(1, '#A769ED')
      gradientDocument.addColorStop(0, '#8E5DC6')

      const gradientPrivateDocument = ctx.createLinearGradient(0, 400, 0, 100)
      gradientPrivateDocument.addColorStop(1, 'rgba(167, 105, 237, 0.5)')
      gradientPrivateDocument.addColorStop(0, 'rgba(142, 93, 198, 0.5)')

      this.untaggedAssetsByCategoryData = {
        labels: categoryKey,
        datasets: [
          {
            label: 'Public',
            data: publicAssetCount,
            backgroundColor: [
              gradientImage,
              gradientAudio,
              gradientVideo,
              gradientDocument,
            ],
          },
          {
            label: 'Private',
            data: privateAssetCount,
            backgroundColor: [
              gradientPrivateImage,
              gradientPrivateAudio,
              gradientPrivateVideo,
              gradientPrivateDocument,
            ],
          },
        ],
      }
      this.untaggedAssetsByCategoryOptions = {
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
                labelString: 'Total no. of assets',
                fontSize: 14,
                fontFamily: 'acumin-pro,sans-serif',
              },
            },
          ],
        },
      }
    },
    updateGraphTags() {
      if (!this.untagAssetAnalyticsAllowed) return
      this.getAllUntaggedAssetsAnalytics()
    },
  },
}
</script>
<style scoped>
.no-permission {
  background-image: url(assets/img/blurred-images/untag-asset-analytics.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
