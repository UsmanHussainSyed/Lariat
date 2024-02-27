<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{
      'warning-massage': !globalNotification,
      'search-filter': search_term,
    }"
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
        :src="
          require('~/assets/img/blurred-images/manage-product-settings.png')
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
    </template>
    <template v-else>
      <div class="general-settings-title">
        <h4>
          Product - <strong>{{ totalProducts }}</strong>
        </h4>
        <div class="right-side">
          <div class="search-pr">
            <form
              class="navbar-form search-navbar-form big"
              role="search"
              @submit.prevent
            >
              <div class="input-group">
                <button class="btn-search hidden-xs" type="submit">
                  <svg
                    id="Layer_1"
                    class="search-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_ionic-ios-search"
                      class="fill-color"
                      d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
                    ></path>
                  </svg>
                </button>
                <input
                  id="srch-term"
                  v-model="search_term"
                  class="form-control"
                  placeholder="Search Product..."
                  name="srch-term"
                  type="text"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-if="search_term" class="search-result mb1 pl10 pr10">
        <div class="alert alert-info alert-dismissible">
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            @click.capture.stop="search_term = ''"
          >
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
          Showing results for <strong>"{{ search_term }}"</strong>
        </div>
      </div>
      <div class="workspace-settings">
        <div class="common-box bg-gray h-100">
          <div class="table-list-view table-list-scrolling">
            <ul class="thead">
              <li>
                <div
                  class="sorting sortarrow flex40"
                  :class="[
                    sortValue === 'name' && sortBy === 'DESC'
                      ? 'active descending'
                      : '',
                  ]"
                >
                  <span
                    @click="
                      sortBy === 'ASC' ? (sortBy = 'DESC') : (sortBy = 'ASC')
                    "
                    >Product Name</span
                  >
                </div>
                <div class="sorting flex30">
                  <span>SKU</span>
                </div>
                <div class="sorting flex20">
                  <span>Last Modified Date</span>
                </div>
                <div class="sorting flex10">
                  <span>Action</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <li v-for="product in assetProduct" :key="product.id">
                  <div class="tb-column flex40">
                    <div class="media">
                      <div class="media-left">
                        <div class="categary-image">
                          <img
                            :src="
                              product.asset.thumbnail_file ||
                              getPreviewIcon(product.asset.file_type)
                            "
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="media-body">
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-dam-files-id',
                            params: {
                              workspace_id: $getWorkspaceId(),
                              id: product.asset_id,
                            },
                            query: {
                              tab: 'manageProduct',
                            },
                          }"
                          class="table-a"
                          >{{ product.asset.display_file_name }}</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                  <div class="tb-column flex30">
                    <label>{{ product.sku_number || '-' }}</label>
                  </div>
                  <div class="tb-column flex20">
                    <label>{{
                      $moment(product.updated_at).format('MMM Do YYYY, h:mm a')
                    }}</label>
                  </div>
                  <div class="tb-column flex10">
                    <ul class="action">
                      <li>
                        <nuxt-link
                          :to="{
                            name: 'workspace_id-workspace-settings-dam-instance_id-product-manage-id-edit',
                            params: { id: product.asset.id },
                          }"
                        >
                          <svg
                            id="Layer_1"
                            v-tooltip="`Manage Product`"
                            class="edit-icon h-orange"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_4350"
                              transform="translate(-397.961 -147.331)"
                            >
                              <path
                                id="Path_3408"
                                class="fill-color"
                                d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
                              ></path>
                              <path
                                id="Path_3409"
                                class="fill-color"
                                d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
                              ></path>
                            </g>
                          </svg>
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </li>
                <client-only>
                  <infinite-loading
                    :identifier="infiniteId"
                    @infinite="assetInfiniteLoad"
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
import { _debounce } from '~/utils/helper'
import FileType from '@/mixins/fileType.js'
export default {
  components: {
    EmptyState,
    ContentLoader,
  },
  mixins: [FileType],
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      search_term: '',
      assetProduct: [],
      infiniteId: new Date(),
      currentPage: 0,
      lastPage: null,
      isLoading: false,
      totalProducts: 0,
      sortValue: 'name',
      sortBy: 'ASC',
      subscriptionData: {},
      subscriptionFetched: false,
    }
  },
  computed: {
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    orderManagementAllowed() {
      return !!this.subscriptionData.features?.asset_order_management?.enable
    },
  },
  watch: {
    search_term() {
      _debounce(() => {
        this.handleFetch()
      }, 500)
    },
    sortBy() {
      this.handleFetch()
    },
  },
  async mounted() {
    this.$store.dispatch('dam/getNotifications')
    await this.fetchSubscription()
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
    handleFetch() {
      this.assetProduct = []
      this.currentPage = 0
      this.lastPage = 0
      this.infiniteId = new Date()
    },
    assetInfiniteLoad($state) {
      this.isLoading = true
      this.currentPage += 1
      this.$axios
        .$post('digital-assets/asset-product/list-asset-product', {
          search: this.search_term,
          sortvalue: this.sortValue,
          orderby: this.sortBy,
          page: this.currentPage,
        })
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (this.currentPage <= 1) this.assetProduct = []
          if (
            data.data &&
            data.data.length &&
            this.currentPage === data.current_page
          ) {
            this.assetProduct.push(...data.data)
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
