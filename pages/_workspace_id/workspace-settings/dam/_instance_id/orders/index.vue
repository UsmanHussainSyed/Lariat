<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        <button v-if="0" type="button" class="close" data-dismiss="alert">
          <svg
            id="Layer_1"
            class="close-icon h-red"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4358" transform="translate(-69.745 -317.549)">
              <path
                id="Path_3424"
                class="fill-color"
                d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
              ></path>
              <path
                id="Path_3425"
                class="fill-color"
                d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
              ></path>
            </g>
          </svg>
        </button>
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div class="overlay" v-if="!subscriptionFetched">
      <div class="loader"></div>
    </div>
    <template v-else-if="!orderManagementAllowed">
      <img
        :src="require('~/assets/img/blurred-images/order-settings.png')"
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
    </template>
    <template v-else>
      <div class="general-settings-title">
        <h4>Orders</h4>
        <div class="right-side">
          <Select2
            v-model="selectedDealer"
            :options="dealers"
            placeholder="Select dealer"
          />
          <Select2
            v-model="selectedStatus"
            :options="statusList"
            placeholder="Select order status"
          />
          <DateRangePicker
            ref="dateRangePicker"
            :class-obj="'datepicker form-control'"
            :start-date.sync="start_date"
            :end-date.sync="end_date"
            placeholder="Select date range"
            class="daterange"
            human
            custom-event
            @dateChanged="handleFetch($event)"
          />
          <a
            href="javascript:;"
            class="btn btn-gray btn-icon"
            :class="!orders.length ? 'disabled' : ''"
            @click="orderExport"
          >
            <svg
              id="Layer_1"
              class="export-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4488" transform="translate(-1256 -320)">
                <rect
                  id="Rectangle_3026"
                  x="1256"
                  y="320"
                  class="fill-hide"
                  width="18"
                  height="18"
                ></rect>
                <g id="Group_4354" transform="translate(557.089 174.823)">
                  <path
                    id="Path_3416"
                    class="fill-color"
                    d="M708.2,162.5c1.3,0,2.3-1,2.3-2.3v-3.4c0-0.4-0.3-0.8-0.8-0.8s-0.8,0.3-0.8,0.8v3.4c0,0.4-0.3,0.8-0.7,0.8h-7c-0.4,0-0.7-0.3-0.7-0.8v-12.1c0-0.4,0.3-0.8,0.7-0.8h7c0.4,0,0.7,0.3,0.7,0.8v3c0,0.4,0.3,0.8,0.8,0.8s0.8-0.3,0.8-0.8v-3c0-1.3-1-2.3-2.3-2.3h-7c-1.3,0-2.3,1-2.3,2.3v12.1c0,1.3,1,2.3,2.3,2.3H708.2z"
                  ></path>
                  <path
                    id="Path_3417"
                    class="fill-color"
                    d="M712.8,158.3c-0.2,0-0.4-0.1-0.5-0.2c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l2-2.1h-10.1c-0.4,0-0.7-0.4-0.7-0.8c0-0.4,0.3-0.7,0.7-0.7h10.1l-2-2.1c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0c0.3-0.3,0.8-0.3,1,0c0,0,0,0,0,0l3.3,3.4c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-3.3,3.4C713.2,158.2,713,158.3,712.8,158.3z"
                  ></path>
                </g>
              </g>
            </svg>
            Export to Excel
          </a>
        </div>
      </div>
      <div class="workspace-settings">
        <div class="common-box bg-gray h-100">
          <div class="table-list-view table-list-scrolling">
            <ul class="thead">
              <li>
                <div
                  class="sorting sortarrow flex10"
                  :class="[
                    sortValue === 'id' && sortBy === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="handleSort('id')">Order #</span>
                </div>
                <div class="sorting flex25">
                  <span>Dealer Name</span>
                </div>
                <div class="sorting flex20">
                  <span>Email ID</span>
                </div>
                <div class="sorting flex15">
                  <span>Total Items</span>
                </div>
                <div class="sorting flex10">
                  <span>Total Amount</span>
                </div>
                <div
                  class="sorting flex10 sortarrow"
                  :class="[
                    sortValue === 'created_at' && sortBy === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="handleSort('created_at')"
                    >Order Placed Date</span
                  >
                </div>
                <div
                  class="sorting sortarrow flex10"
                  :class="[
                    sortValue === 'status' && sortBy === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span @click="handleSort('status')">Status</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <li v-for="order in orders" :key="order.id">
                  <div class="tb-column flex10">
                    <nuxt-link
                      class="table-a text-underline"
                      :to="{
                        name: 'workspace_id-workspace-settings-dam-instance_id-orders-id',
                        params: { id: order.id },
                        query: {
                          order_id: order.order_id,
                        },
                      }"
                      >{{ order.order_id }}</nuxt-link
                    >
                  </div>
                  <div class="tb-column flex25">
                    <label>{{ order.user.name }}</label>
                  </div>
                  <div class="tb-column flex20">
                    <a :href="`mailto:${order.user.email}`">{{
                      order.user.email
                    }}</a>
                  </div>
                  <div class="tb-column flex15">
                    <label>{{ order.order_item_count }}</label>
                  </div>
                  <div class="tb-column flex10">
                    <label>{{ getPrice(order.total_amount) }}</label>
                  </div>
                  <div class="tb-column flex10">
                    <label>{{
                      $moment(order.created_at).format('Do MMM, YYYY')
                    }}</label>
                  </div>
                  <div class="tb-column flex10">
                    <span
                      :class="getStatusClass(order.status_id)"
                      class="plan-status"
                      >{{ order.status }}</span
                    >
                  </div>
                </li>
                <client-only>
                  <infinite-loading
                    :identifier="infiniteId"
                    @infinite="orderInfiniteLoad"
                  >
                    <div slot="spinner">
                      <ContentLoader
                        :speed="1"
                        :animate="true"
                        :width="400"
                        :height="100"
                      >
                        <rect
                          x="0"
                          y="0"
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
                    </div>
                    <div slot="no-more"></div>
                    <div slot="no-results">
                      <EmptyState />
                    </div>
                  </infinite-loading>
                </client-only>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import EmptyState from '~/components/theme/global/EmptyState'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import Select2 from '~/components/plugins/Select2'
export default {
  components: {
    EmptyState,
    ContentLoader,
    Select2,
    DateRangePicker,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      start_date: null,
      end_date: null,
      orders: [],
      infiniteId: new Date(),
      currentPage: 0,
      lastPage: null,
      isLoading: false,
      totalProducts: 0,
      sortValue: 'id',
      sortBy: 'DESC',
      statusList: [],
      dealers: [],
      selectedStatus: '',
      selectedDealer: '',
      expiration: null,
      statusColors: [
        {
          id: 1,
          class: 'alert-secondary',
          name: 'In-Progress',
        },
        {
          id: 2,
          class: 'alert-warning',
          name: 'Shipped',
        },
        {
          id: 3,
          class: 'alert-success',
          name: 'Delivered',
        },
        {
          id: 4,
          class: 'alert-danger',
          name: 'Cancelled',
        },
      ],
      subscriptionData: {},
      subscriptionFetched: false,
    }
  },
  computed: {
    orderManagementAllowed() {
      return !!this.subscriptionData?.features?.asset_order_management?.enable
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    getStatusClass() {
      return (statusId) => {
        const status = this.statusColors.find(
          ({ id }) => parseInt(id) === parseInt(statusId)
        )
        if (status) {
          return status.class
        }
        return ''
      }
    },
  },
  watch: {
    selectedStatus() {
      this.handleFetch()
    },
    selectedDealer() {
      this.handleFetch()
    },
    sortBy() {
      this.handleFetch()
    },
  },
  async mounted() {
    this.$store.dispatch('dam/getNotifications')
    await this.fetchSubscription()
    this.getOrderStatus()
    this.getDealerships()
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  methods: {
    fetchSubscription() {
      this.subscriptionFetched = false
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
        .finally(() => {
          this.subscriptionFetched = true
        })
    },
    getPrice(val) {
      let price = ''
      if (!val) return '-'
      if (val) {
        price = '$' + val
      }
      if (val % 1 === 0) {
        price += '.00'
      }
      return price
    },
    handleSort(sortVal) {
      this.sortValue = sortVal
      this.sortBy =
        this.sortBy === 'ASC' ? (this.sortBy = 'DESC') : (this.sortBy = 'ASC')
      this.handleFetch()
    },
    orderExport() {
      if (!this.orders.length || !this.orderManagementAllowed) return
      this.$axios
        .$post('digital-assets/asset-order/export', {
          status: this.selectedStatus,
          start_date: this.start_date,
          end_date: this.end_date,
          sortvalue: this.sortValue,
          orderby: this.sortBy,
          dealer_id: this.selectedDealer,
        })
        .then(({ message, data }) => {
          this.$toast.success(message)
          const a = document.createElement('a')
          a.setAttribute('download', `Order_list.csv`)
          a.href = data.filename
          a.click()
          a.remove()
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    getOrderStatus() {
      if (!this.orderManagementAllowed) return
      this.$axios
        .$get('digital-assets/asset-order/order-status')
        .then(({ data }) => {
          data.unshift({
            name: 'All',
            id: 0,
            text: 'All',
          })
          this.statusList = data
        })
        .catch(console.error)
    },
    getDealerships() {
      if (!this.orderManagementAllowed) return
      this.$axios
        .$get('digital-assets/asset-order/dealer-list')
        .then(({ data }) => {
          data = data.map((dealer) => {
            return {
              text: dealer.name,
              id: dealer.id,
              name: dealer.name,
            }
          })
          data.unshift({
            name: 'All',
            id: 0,
            text: 'All',
          })
          this.dealers = data
        })
        .catch(console.error)
    },
    handleFetch() {
      this.orders = []
      this.currentPage = 0
      this.lastPage = 0
      this.infiniteId = new Date()
    },
    orderInfiniteLoad($state) {
      if (!this.orderManagementAllowed) return
      this.isLoading = true
      this.currentPage += 1
      this.$axios
        .$post('digital-assets/asset-order/list', {
          url_workspace_id:
            this.$route.params.workspace_id || this.$getWorkspaceId(),
          start_date: this.start_date,
          end_date: this.end_date,
          status: this.selectedStatus,
          dealer_id: this.selectedDealer,
          sortvalue: this.sortValue,
          orderby: this.sortBy,
          page: this.currentPage,
        })
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (this.currentPage <= 1) this.orders = []
          if (
            data.data &&
            data.data.length &&
            this.currentPage === data.current_page
          ) {
            this.orders.push(...data.data)
            $state.loaded()
            if (this.lastPage === this.currentPage) $state.complete()
          } else $state.complete()
          this.isLoading = false
          this.totalProducts = data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}

.overlay > .loader {
  border-left: 2px solid transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-top: 2px solid #0c0c0c40;
  border-bottom: 2px solid #0c0c0c40;
  border-right: 2px solid transparent;
  animation: loader 0.5s linear infinite both;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
