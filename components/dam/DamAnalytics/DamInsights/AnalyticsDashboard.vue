<template>
  <div class="row big-gutters justify-content-center align-items-center">
    <div class="col-md-3">
      <div class="box box-1">
        <InnerLoader v-if="dashboardLoading" />
        <template v-else>
          <div>
            <h3>{{ totalAssets }}</h3>
            <h4>
              Total Assets
              <i
                v-tooltip="
                  'Total Number Of Assets Available Including All Versions - [' +
                  totalAssetsIncludingVersion +
                  ']'
                "
                class="fa fa-info-circle"
                aria-hidden="true"
              ></i>
            </h4>
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
    <div class="col-md-3">
      <div class="box box-2">
        <InnerLoader v-if="dashboardLoading" />
        <template v-else>
          <div>
            <h3>{{ $toHumanlySize(totalStorage, 1000) }}</h3>
            <h4>Total Storage</h4>
          </div>
          <svg
            id="Layer_1"
            class="storage-icon white"
            data-v-4a9a044d=""
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 26 16"
            xml:space="preserve"
          >
            <path
              id="Icon_ionic-ios-cloud-outline"
              data-v-4a9a044d=""
              d="M14.6,1.4c1.5,0,3,0.6,4.2,1.6c1.1,1,1.8,2.4,2,3.9l0.1,0.6c0,0.3,0.3,0.5,0.5,0.6l0.6,0.1c0.7,0.1,1.4,0.5,1.9,1.1c0.5,0.6,0.8,1.3,0.8,2.1c0,0.9-0.4,1.7-1,2.3c-0.6,0.6-1.4,1-2.2,1H4.6c-0.8,0-1.7-0.4-2.2-1c-0.6-0.6-1-1.5-1-2.3c0-0.7,0.2-1.4,0.7-2c0.4-0.6,1-1,1.7-1.2l0.5-0.2c0.3-0.1,0.5-0.3,0.5-0.6l0-0.5c0-0.6,0.3-1.2,0.7-1.6C5.9,4.6,6.4,4.4,7,4.4c0.3,0,0.6,0.1,0.8,0.2l0.6,0.2c0.3,0.1,0.6,0,0.8-0.2L9.5,4C10.7,2.4,12.6,1.4,14.6,1.4 M14.6,0c-2.5,0-4.8,1.2-6.3,3.2C7.9,3.1,7.5,3,7,3C5,3,3.4,4.6,3.4,6.6C1.4,7.3,0,9.2,0,11.3c0,2.6,2.1,4.7,4.6,4.7h16.8c2.6-0.1,4.6-2.2,4.6-4.7c0-2.2-1.6-4.2-3.8-4.6C21.7,2.9,18.5,0,14.6,0L14.6,0z"
              class="fill-color"
            ></path>
          </svg>
        </template>
      </div>
    </div>
    <div class="col-md-3">
      <div class="box box-3">
        <InnerLoader v-if="dashboardLoading" />
        <template v-else>
          <div>
            <h3>{{ $toHumanlySize(totalDownloads, 1000) }}</h3>
            <h4>Total Downloads</h4>
          </div>
          <svg
            id="Layer_1"
            class="bandwith-icon white"
            data-v-4a9a044d=""
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 14.7 18"
            xml:space="preserve"
          >
            <g
              id="Group_4376"
              data-v-4a9a044d=""
              transform="translate(-495.992 -288.74)"
            >
              <path
                id="Path_3458"
                data-v-4a9a044d=""
                d="M505.9,306.7c-0.1,0-0.2,0-0.3-0.1c-0.3-0.1-0.5-0.4-0.5-0.7v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v14.6l2.7-2.7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1l-4.1,4.1C506.3,306.7,506.1,306.7,505.9,306.7z"
                class="fill-color"
              ></path>
              <path
                id="Path_3459"
                data-v-4a9a044d=""
                d="M500.8,306.7c-0.4,0-0.8-0.3-0.8-0.8v-14.6l-2.7,2.7c-0.3,0.3-0.8,0.3-1.1,0c-0.3-0.3-0.3-0.8,0-1.1l4.1-4.1c0.1-0.1,0.3-0.2,0.5-0.2c0.1,0,0.2,0,0.3,0.1c0.3,0.1,0.5,0.4,0.5,0.7V306C501.6,306.4,501.2,306.7,500.8,306.7C500.8,306.7,500.8,306.7,500.8,306.7z"
                class="fill-color"
              ></path>
            </g>
          </svg>
        </template>
      </div>
    </div>
    <div class="col-md-3">
      <div class="box box-4">
        <InnerLoader v-if="dashboardLoading" />
        <template v-else>
          <div>
            <h3>{{ totalUsers }}</h3>
            <h4>Total Users</h4>
          </div>
          <svg
            id="Layer_1"
            class="users-icon white"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 22.9 18"
            xml:space="preserve"
          >
            <g id="Group_4465" transform="translate(-226 -512)">
              <rect
                id="Rectangle_3003"
                x="229"
                y="512"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g id="Group_4428" transform="translate(-274.326 368.983)">
                <path
                  id="Path_3540"
                  class="fill-color"
                  d="M516.9,159v-1.4c0-1.2-1-2.2-2.2-2.2h-5.9c-1.2,0-2.2,1-2.2,2.2v1.4h-1.6v-1.4c0-2.1,1.7-3.7,3.7-3.7h5.9c2.1,0,3.7,1.7,3.7,3.7v1.4H516.9z"
                ></path>
                <path
                  id="Path_3541"
                  class="fill-color"
                  d="M511.8,152.5c-2.1,0-3.7-1.7-3.7-3.7s1.7-3.7,3.7-3.7c2.1,0,3.7,1.7,3.7,3.7C515.5,150.8,513.9,152.5,511.8,152.5z"
                ></path>
                <path
                  id="Path_3542"
                  class="fill-color"
                  d="M521.7,155.4v-0.7c0-0.5-0.4-0.9-0.9-0.9h-3.3c-0.5,0-0.9,0.4-0.9,0.9v0.7h-1.6v-0.7c0-1.3,1.1-2.4,2.4-2.4h3.3c1.3,0,2.4,1.1,2.4,2.4v0.7H521.7z"
                ></path>
                <path
                  id="Path_3543"
                  class="fill-color"
                  d="M519.2,152.2c-1.3,0-2.4-1.1-2.4-2.4s1.1-2.4,2.4-2.4c1.3,0,2.4,1.1,2.4,2.4C521.6,151.1,520.5,152.2,519.2,152.2z"
                ></path>
                <path
                  id="Path_3544"
                  class="fill-color"
                  d="M506.9,155.4v-0.7c0-0.5-0.4-0.9-0.9-0.9h-3.3c-0.5,0-0.9,0.4-0.9,0.9v0.7h-1.6v-0.7c0-1.3,1.1-2.4,2.4-2.4h3.3c1.3,0,2.4,1.1,2.4,2.4v0.7H506.9z"
                ></path>
                <path
                  id="Path_3545"
                  class="fill-color"
                  d="M504.4,152.2c-1.3,0-2.4-1.1-2.4-2.4s1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C506.8,151.1,505.7,152.2,504.4,152.2z"
                ></path>
              </g>
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
  data() {
    return {
      dashboardLoading: false,
      totalAssets: null,
      totalAssetsIncludingVersion: '',
      totalStorage: null,
      totalDownloads: null,
      totalUsers: null,
    }
  },
  mounted() {
    this.analyticsDashboard()
  },
  methods: {
    async analyticsDashboard() {
      this.dashboardLoading = true
      try {
        const { data } = await this.$axios.$get(
          `digital-assets/analytics/dashboard`
        )
        this.totalAssets = data.total_assets
        this.totalAssetsIncludingVersion = data.total_assets_including_version
        this.totalStorage = data.storage
        this.totalDownloads = data.bandwidth
        this.totalUsers = data.users
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
