<template>
  <div class="row big-gutters justify-content-center align-items-center">
    <div class="col-md-4">
      <div class="box box-3">
        <InnerLoader v-if="dashboardLoading" />
        <template v-else>
          <div>
            <h3>{{ totalAssets }}</h3>
            <h4>No. of Assets in Collection</h4>
          </div>
          <svg
            id="Layer_1"
            class="media-assets-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 16 16"
            xml:space="preserve"
          >
            <path
              id="Path_24"
              data-v-4a9a044d=""
              d="M0,16V4.6h1.8V2.3l1.9,0V0H16v11.4h-1.9l0,2.3h-1.9V16L0,16z M11.1,14.7V5.9H1.2v8.7H11.1zM13,12.3V3.7H3v1h9.3v7.7H13z M14.8,10V1.3H4.9v1l9.3,0l0,7.8L14.8,10z"
              class="fill-color"
            ></path>
          </svg>
        </template>
      </div>
    </div>
    <div class="col-md-4">
      <div class="box box-5">
        <InnerLoader v-if="dashboardLoading" />
        <template v-else>
          <div>
            <h3>{{ totalDownloadAssets }}</h3>
            <h4>Total Download Activities</h4>
          </div>
          <svg
            id="Layer_1"
            class="download-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4359" transform="translate(-153.745 -317.549)">
              <path
                id="Path_3427"
                class="fill-color"
                d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
              ></path>
              <path
                id="Path_3428"
                class="fill-color"
                d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
              ></path>
              <path
                id="Path_3429"
                class="fill-color"
                d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
              ></path>
            </g>
          </svg>
        </template>
      </div>
    </div>
    <div class="col-md-4">
      <div class="box box-1">
        <InnerLoader v-if="dashboardLoading" />
        <template v-else>
          <div>
            <h3>{{ totalSharedAssets }}</h3>
            <h4>Total Shared Activities</h4>
          </div>
          <svg
            id="Layer_1"
            class="share-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4473" transform="translate(-871 -230)">
              <rect
                id="Rectangle_3012"
                x="871"
                y="230"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <path
                id="Icon_open-share"
                class="fill-color"
                d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
              ></path>
            </g>
          </svg>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
export default {
  components: {
    InnerLoader,
  },
  props: {
    collectionId: { type: Number, required: true },
    startDate: { type: [Date, String, Object] },
    endDate: { type: [Date, String, Object] },
  },
  data() {
    return {
      dashboardLoading: false,
      totalAssets: null,
      totalDownloadAssets: null,
      totalSharedAssets: null,
    }
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.analyticsCollectionDashboard()
      },
    },
    collectionId: {
      deep: true,
      handler() {
        this.analyticsCollectionDashboard()
      },
    },
  },
  mounted() {
    this.analyticsCollectionDashboard()
  },
  methods: {
    async analyticsCollectionDashboard() {
      this.dashboardLoading = true
      try {
        const { data } = await this.$axios.$post(
          `digital-assets/analytics/collection-activity-summary`,
          {
            from_date: this.startDate,
            to_date: this.endDate,
            collection_id: this.collectionId,
          }
        )
        this.totalAssets = data.total_assets
        this.totalDownloadAssets = data.download_assets
        this.totalSharedAssets = data.shared_assets
        this.dashboardLoading = false
      } catch (e) {
        const { data } = e.response
        this.$toast.error(data.message)
        this.dashboardLoading = false
      }
    },
  },
}
</script>
