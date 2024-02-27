<template>
  <div class="resizableLeft">
    <div class="clickBox" @click="$emit('shrink')">
      <div class="common-box-header">
        <h2 class="title sideShow">
          <a href="javascript:void(0);" class="shrink">
            <svg
              id="Layer_1"
              class="sidebar-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 25 25"
              xml:space="preserve"
            >
              <g id="Group_5300" transform="translate(-90 -90)">
                <path
                  id="Rectangle_1967"
                  class="fill-darkgray"
                  d="M94,90h17c2.2,0,4,1.8,4,4v17c0,2.2-1.8,4-4,4H94c-2.2,0-4-1.8-4-4V94C90,91.8,91.8,90,94,90z"
                />
                <path
                  id="Icon_open-media-skip-backward"
                  class="fill-color"
                  d="M101.5,97l-7.5,5.6l7.5,5.6V97z M101.5,102.6l7.5,5.6V97L101.5,102.6z"
                />
              </g>
            </svg>
            <span>Dealerships</span>
          </a>
        </h2>
        <h2 class="title sideHide">
          <a href="javascript:void(0);" class="shrink">
            <svg
              id="Layer_1"
              class="sidebar-invert-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 25 25"
              xml:space="preserve"
            >
              <g id="Group_5300" transform="translate(-90 -90)">
                <path
                  id="Rectangle_1967"
                  class="fill-white"
                  d="M94,90h17c2.2,0,4,1.8,4,4v17c0,2.2-1.8,4-4,4H94c-2.2,0-4-1.8-4-4V94C90,91.8,91.8,90,94,90z"
                />
                <path
                  id="Icon_open-media-skip-backward"
                  class="fill-color"
                  d="M101.5,97l-7.5,5.6l7.5,5.6V97z M101.5,102.6l7.5,5.6V97L101.5,102.6z"
                />
              </g>
            </svg>
            <span>Dealerships</span>
          </a>
        </h2>
      </div>
      <div class="common-box bg-gray">
        <div
          :class="{ 'show-detail': $auth.user.detail_view == 1 }"
          class="table-list-view multi-table-view table-list-scrolling dealers"
        >
          <ul class="thead">
            <li>
              <div class="name-email sorting filterarrow flex75">
                <span
                  >Dealer Name
                  <i
                    v-tooltip="{
                      html: false,
                      content:
                        'Dealerships are only listed here if they have at least one assigned lead',
                    }"
                    class="fa fa-info-circle tip"
                    aria-hidden="true"
                    data-tip="tip-info"
                  ></i
                ></span>
                <ul class="dataFilter">
                  <li v-for="item in dealerFilter" :key="item.id">
                    <label class="check-label"
                      >{{ item.name }}
                      <input
                        v-if="item.name"
                        v-model="item.isActive"
                        type="checkbox"
                        name=""
                      />
                      <span v-if="item.name" class="check-span"></span>
                    </label>
                  </li>
                  <div
                    v-if="!dealerFilter.length"
                    class="text-center d-flex align-items-center justify-content-center"
                  >
                    <span>No filter data</span>
                  </div>
                </ul>
              </div>
              <!-- <div class="last-lead sorting flex25">
                <span>Last Activity</span>
              </div> -->
              <div
                class="assigned sorting sortarrow flex25 text-center"
                :class="[dealerSortOrder === 'desc' ? 'active descending' : '']"
              >
                <span @click="sortDealers('assign_leads')">Lead Contacts</span>
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody">
              <li
                v-for="dealership in dealerships"
                :key="dealership.name"
                style="cursor: pointer"
                :class="[
                  selectedDealers.includes(dealership.id) ? 'active' : '',
                ]"
                @click.exact="changeSelectedDealer(dealership.id)"
                @click.ctrl="changeMultiSelectedDealer(dealership.id)"
                @click.meta="changeMultiSelectedDealer(dealership.id)"
              >
                <div class="dealer-name tb-column flex75">
                  <div
                    v-if="dealership.dealership_logo"
                    class="profile-bg"
                    :style="
                      'background-image: url(' +
                      dealership.dealership_logo +
                      ')'
                    "
                  ></div>
                  <div v-else class="profile-char">
                    {{ dealership.dealership_name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class="top-column">
                      {{ dealership.dealership_name }}
                    </div>
                    <div class="bottom-column">
                      <span
                        >{{ dealership.city }} , {{ dealership.state }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="assigned-lead tb-column flex25 text-center">
                  <div class="top-column img-text">
                    <div class="big">
                      <LeadIcon />
                      <span>{{ dealership.assign_leads }}</span>
                    </div>
                  </div>
                </div>
              </li>
              <client-only>
                <infinite-loading
                  :identifier="infiniteId"
                  @infinite="loadDealerships"
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
                  </div>
                  <div slot="no-more"></div>
                  <div slot="no-results">
                    <div class="no-data-found">
                      <div class="inner w-100">
                        <svg
                          id="Layer_1"
                          class="no-record-icon darkgray"
                          style="height: 150px"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 131.3 156.8"
                          xml:space="preserve"
                        >
                          <g
                            id="Group_4457"
                            transform="translate(-190.348 -177.624)"
                          >
                            <path
                              id="Path_3564"
                              class="fill-color"
                              d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                            />
                            <path
                              id="Path_3565"
                              class="fill-color"
                              d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                            />
                          </g>
                        </svg>

                        <p>You haven't added any Dealers yet!</p>
                        <nuxt-link
                          v-if="$_auth().user.lead.isSuperAdmin"
                          class="btn btn-icon"
                          :to="{
                            name: 'workspace_id-lead-dealers-add',
                            params: { workspace_id: $_auth().id },
                          }"
                        >
                          <svg
                            id="Layer_1"
                            class="plus-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_4454"
                              transform="translate(-1005 -577.999)"
                            >
                              <path
                                id="Path_3394"
                                class="fill-color"
                                d="M1014,596c-0.4,0-0.8-0.3-0.8-0.8v-16.5c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v16.5C1014.8,595.7,1014.4,596,1014,596z"
                              ></path>
                              <path
                                id="Path_3395"
                                class="fill-color"
                                d="M1005.8,587.5c-0.4,0-0.8-0.3-0.8-0.7c0-0.4,0.3-0.8,0.7-0.8c0,0,0,0,0.1,0h16.5c0.4,0,0.8,0.4,0.7,0.8c0,0.4-0.3,0.7-0.7,0.7H1005.8z"
                              ></path>
                            </g>
                          </svg>
                          Add New Dealers</nuxt-link
                        >
                      </div>
                    </div>
                  </div>
                </infinite-loading>
              </client-only>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import LeadIcon from '~/components/svg/LeadIcon'
import DealerMixin from '~/mixins/lead.js'
export default {
  components: { LeadIcon, ContentLoader },
  mixins: [DealerMixin],
  props: {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    dealerFilter: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedDealer: null,
      isLoading: false,
      currentPage: 0,
      dealerships: [],
      lastPage: null,
      infiniteId: new Date(),
      sortData: 'assign_leads',
      selectedDealers: [],
      dealership_ids: [],
      dealerSortOrder: 'desc',
      isDealerOpen: false,
    }
  },
  watch: {
    selectedDealers() {
      if (!this.selectedDealers.length) {
        this.selectedDealer = null
      }
    },
    dealerFilter: {
      handler(val, newval) {
        if (JSON.stringify(val) === JSON.stringify(newval)) {
          this.dealership_ids = this.dealerFilter
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      immediate: false,
      deep: true,
    },
  },
  methods: {
    handleFilterOpen() {
      this.isDealerOpen = false
    },
    handleFilterChange() {
      this.currentPage = 0
      this.dealerships = []
      this.infiniteId = new Date()
    },
    loadDealerships($state) {
      this.isLoading = true
      this.currentPage += 1
      const reqParams = {
        page: this.currentPage,
        sort_by: this.sortData,
        dealership_id: this.dealership_ids,
        sort_value: this.dealerSortOrder,
        start_date: this.startDate,
        end_date: this.endDate,
      }
      this.$axios
        .$post(`lm/dashboard/dealership`, reqParams)
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (this.currentPage <= 1) this.dealerships = []
          if (
            data.data &&
            data.data.length &&
            this.currentPage === data.current_page
          ) {
            this.dealerships.push(...data.data)
            $state.loaded()
            if (this.lastPage === this.currentPage) $state.complete()
            this.isLoading = false
          } else $state.complete()
          this.isLoading = false
        })
    },
    sortDealers(data) {
      if (this.isLoading) return
      this.dealerSortOrder === 'asc'
        ? (this.dealerSortOrder = 'desc')
        : (this.dealerSortOrder = 'asc')
      this.sortData = data
      this.dealerships = []
      this.currentPage = 0
      this.infiniteId = new Date().getTime()
    },
    changeMultiSelectedDealer(id) {
      // if not selectedDealers array includes id
      // this.selectedDealers = []
      this.selectedDealer = null
      if (!this.selectedDealers.includes(id)) {
        // add new id to array
        this.selectedDealers.push(id)
      } else {
        // else delete id from array
        this.selectedDealers.splice(
          this.selectedDealers.findIndex((i) => i === id),
          1
        )
      }
      const payload = { selectedDealer: this.selectedDealers, timeOut: 500 }
      this.$emit('multipleSelection', payload)
    },
    changeSelectedDealer(id) {
      if (id === this.selectedDealer) {
        this.selectedDealers = []
        this.selectedDealer = null
      } else {
        this.selectedDealers = [id]
      }
      const payload = { selectedDealer: this.selectedDealers, timeOut: 0 }
      this.$emit('selectedId', payload)
      this.selectedDealer = id
    },
  },
}
</script>
