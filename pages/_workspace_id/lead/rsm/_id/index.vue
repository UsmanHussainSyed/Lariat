<template>
  <div class="body-content">
    <div class="body-content-left h-100">
      <div class="common-box-header">
        <h2 class="title">
          <nuxt-link
            class="back"
            :to="{
              name: 'workspace_id-lead-rsm',
              params: {
                workspace_id: $_auth().id,
              },
            }"
          >
            <BackIcon />
          </nuxt-link>
          RSM Details
        </h2>
      </div>
      <div class="box customscrollbar dl-detail-left pr10">
        <ProfileLoader
          v-if="isRsmLoading"
          style="min-width: 390px !important; min-height: 700px !important"
        />
        <div class="box-heading">
          <div class="row align-items-center">
            <div class="col-lg-5">
              <div class="pr-img">
                <img
                  v-if="rsmDetails.display_profile_image"
                  class="img-responsive"
                  :src="rsmDetails.display_profile_image"
                />
                <div v-else class="profile-char bigger">
                  {{ rsmDetails.name.charAt(0).toUpperCase() }}
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <h3>{{ rsmDetails.name }}</h3>
            </div>
          </div>
        </div>
        <div class="dealer-contact">
          <div class="media sc_media">
            <EmailIcon />
            <div class="media-body">
              <h5>Email</h5>
              <div
                class="d-flex flex-wrap align-items-center justify-content-between"
              >
                <div class="flex100 mail-virify">
                  <p>
                    <a :href="`mailto:${rsmDetails.email}`">{{
                      rsmDetails.email
                    }}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="media sc_media">
            <PhoneIcon />
            <div class="media-body">
              <h5>Phone</h5>
              <p>
                <a :href="`tel:${rsmDetails.phone}`">{{
                  rsmDetails.phone || '-'
                }}</a>
              </p>
            </div>
          </div>
        </div>
        <div class="dealer-contact dealer-contact2 mt2">
          <div class="row">
            <div
              v-for="(c, index) in rsmDetails.class"
              :key="c.id"
              class="col-lg-4 mt-2 mb-2"
            >
              <span
                class="classes"
                :class="[index % 2 == 0 ? 'bg-blue' : 'bg-orange']"
                >{{ c.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body-content-main h-100">
      <div class="tabs-view h-100">
        <ul class="nav nav-left" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#leads"
              @click="handleLeadFetch()"
              >Lead Contacts</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#dealership"
              @click="handleDealerFetch()"
              >Dealership</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#models"
              @click="handleProductFetch()"
              >Models</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-toggle="tab"
              href="#notes"
              @click="handleNoteFetching()"
              >Notes</a
            >
          </li>
        </ul>
        <div class="tab-content">
          <div id="leads" class="tab-pane active">
            <div class="newAnalytics p0 rsm_export_filter">
              <ul class="assetsType justify-content-end">
                <li>
                  <a
                    v-if="leads.length"
                    v-tooltip="'Export to CSV'"
                    style="display: flex; align-items: center"
                    @click="exportLeads()"
                  >
                    <svg
                      id="Layer_1"
                      class="export-icon mr-1"
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
                        <g
                          id="Group_4354"
                          transform="translate(557.089 174.823)"
                        >
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
                    Export
                  </a>
                </li>
                <li>
                  <div
                    v-if="lastDate !== '-2' && lastDate !== 'all'"
                    class="report-slide gray-btn"
                  >
                    <button @click="previousTimeFrame">
                      <svg
                        id="Layer_1"
                        class="arrow-left-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Group_4475" transform="translate(-871 -421)">
                          <rect
                            id="Rectangle_3013"
                            x="871"
                            y="421"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <g
                            id="Icon_feather-chevron-down"
                            transform="translate(581.631 103.451)"
                          >
                            <path
                              id="Path_3433"
                              class="fill-color"
                              d="M301.9,334.3c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l7-7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-6.5,6.5l6.5,6.5c0.3,0.3,0.3,0.8,0,1.1C302.3,334.2,302.1,334.3,301.9,334.3z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                    <button @click="nextTimeFrame">
                      <svg
                        id="Layer_1"
                        class="arrow-right-icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 18 18"
                        xml:space="preserve"
                      >
                        <g id="Group_4476" transform="translate(-921 -421)">
                          <rect
                            id="Rectangle_3014"
                            x="921"
                            y="421"
                            class="fill-hide"
                            width="18"
                            height="18"
                          ></rect>
                          <g
                            id="Icon_feather-chevron-down"
                            transform="translate(925.75 422.25)"
                          >
                            <path
                              id="Path_3433"
                              class="fill-color"
                              d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <h2 v-if="lastDate !== 'all'" class="title">
                    {{ getDayTitle }} :
                    {{ $moment(dStartDate).format(DATE_FORMAT) }} -
                    {{ $moment(dEndDate).format(DATE_FORMAT) }}
                  </h2>
                  <div class="month-range-filter">
                    <Select2
                      v-model="lastDate"
                      :options="lastDateOptions"
                      placeholder="Select Day"
                      custom-event
                      @input="getDate($event)"
                    />
                  </div>
                  <div class="report-date">
                    <DateRangePicker
                      v-show="lastDate === '-2'"
                      ref="dateRangePicker"
                      :start-date.sync="dStartDate"
                      :end-date.sync="dEndDate"
                      placeholder="Select Date Range"
                      class="daterange"
                      human
                      custom-event
                      @dateChanged="rangeDateChanged($event)"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div class="common-box bg-gray h-100">
              <div class="table-list-view multi-table-view show-detail">
                <ul class="thead">
                  <li>
                    <div
                      class="name-email sorting sortarrow flex30"
                      :class="[
                        sortData === 'email' && currentSort === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <div class="blank-space30"></div>
                      <span @click="toggleSortData('email', 'lead')"
                        >Name / Email</span
                      >
                    </div>
                    <div class="sorting flex15">
                      <span>Phone Number</span>
                    </div>
                    <div class="model sorting filterarrow flex30">
                      <span>Product</span>
                      <ul class="dataFilter">
                        <li v-for="(item, i) in filterData.modelName" :key="i">
                          <label class="check-label"
                            >{{ item.text }}
                            <input
                              v-model="item.isActive"
                              :disabled="isLoading"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                        <div
                          v-if="!filterData.modelName.length"
                          class="text-center d-flex align-items-center justify-content-center"
                        >
                          <span>No filter data</span>
                        </div>
                      </ul>
                    </div>
                    <div class="dealer sorting filterarrow flex20">
                      <span>Dealer</span>
                      <ul class="dataFilter">
                        <li
                          v-for="(item, i) in filterData.dealershipName"
                          :key="i"
                        >
                          <label class="check-label"
                            >{{ item.text }}
                            <input
                              v-model="item.isActive"
                              :disabled="isLoading"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                        <div
                          v-if="!filterData.dealershipName.length"
                          class="text-center d-flex align-items-center justify-content-center"
                        >
                          <span>No filter data</span>
                        </div>
                      </ul>
                    </div>
                    <div class="lead-status sorting filterarrow flex15">
                      <span
                        >Status
                        <i
                          v-tooltip="{
                            html: true,
                            content: getStatusDescription(leadStatusOptions),
                          }"
                          class="fa fa-info-circle tip"
                          aria-hidden="true"
                          data-tip="tip-info"
                        ></i
                      ></span>
                      <ul class="dataFilter">
                        <li v-for="(item, i) in filterData.leadStatus" :key="i">
                          <label class="check-label"
                            >{{ item.text }}
                            <input
                              v-model="item.isActive"
                              :disabled="isLoading"
                              type="checkbox"
                              name=""
                            />
                            <span class="check-span"></span>
                          </label>
                        </li>
                        <div
                          v-if="!filterData.leadStatus.length"
                          class="text-center d-flex align-items-center justify-content-center"
                        >
                          <span>No filter data</span>
                        </div>
                      </ul>
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <LeadList
                      v-for="(lead, index) in leads"
                      :key="lead.id"
                      :count="index + 1"
                      :lead="lead"
                      :lead-status-options="leadStatusOptions"
                    />
                    <EmptyState v-if="!leads.length && !isLoading" />
                    <client-only>
                      <infinite-loading
                        :identifier="leadsInfiniteId"
                        @infinite="leadListInfiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="100"
                          >
                            <rect
                              v-for="index in 10"
                              :key="index"
                              x="0"
                              :y="contentLoaderData[index]"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results"></div>
                      </infinite-loading>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="dealership" class="tab-pane">
            <div class="common-box bg-gray h-100">
              <div
                class="table-list-view table-list-scrolling multi-table-view show-detail detail-view-on scrolling"
              >
                <ul class="thead">
                  <li>
                    <div
                      class="name-email sorting sortarrow flex40"
                      :class="[
                        sortData === 'dealership_name' && currentSort === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <div class="blank-space30"></div>
                      <span @click="toggleSortData('dealership_name', 'dealer')"
                        >Dealer</span
                      >
                    </div>
                    <div class="last-score sorting flex30">
                      <span>Primary Contact / Designation</span>
                    </div>
                    <div
                      class="last-activity sorting sortarrow flex15 text-center"
                      :class="[
                        sortData === 'total_assign_product' &&
                        currentSort === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span
                        @click="
                          toggleSortData('total_assign_product', 'dealer')
                        "
                        >Products</span
                      >
                    </div>
                    <div
                      class="sorting sortarrow flex15 text-center"
                      :class="[
                        sortData === 'total_assign_leads' &&
                        currentSort === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <span
                        @click="toggleSortData('total_assign_leads', 'dealer')"
                        >Assigned Leads</span
                      >
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <DealerList
                      v-for="(dealer, index) in dealerships"
                      :key="dealer.id"
                      :count="index + 1"
                      :dealer="dealer"
                    />
                    <EmptyState v-if="!dealerships.length && !isLoading" />
                    <client-only>
                      <infinite-loading
                        :identifier="dealersInfiniteId"
                        @infinite="dealershipInfiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="100"
                          >
                            <rect
                              v-for="index in 10"
                              :key="index"
                              x="0"
                              :y="contentLoaderData[index]"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results"></div>
                      </infinite-loading>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="models" class="tab-pane">
            <div class="common-box bg-gray h-100">
              <div class="table-list-view no-bottom-table-view">
                <ul class="thead">
                  <li>
                    <div
                      class="name-email sorting sortarrow flex50"
                      :class="[
                        sortData === 'name' && currentSort === 'DESC'
                          ? 'active descending'
                          : '',
                      ]"
                    >
                      <div class="blank-space30"></div>
                      <span @click="toggleSortData('name', 'product')"
                        >Product Name</span
                      >
                    </div>
                    <div class="sorting flex22">
                      <span>Category</span>
                    </div>
                    <div class="sorting flex16">
                      <span>SKU</span>
                    </div>
                    <div class="sorting flex12">
                      <span>Status</span>
                    </div>
                  </li>
                </ul>
                <div class="customscrollbar no_footer">
                  <ul class="tbody">
                    <ProductList
                      v-for="(product, index) in products"
                      :key="product.id"
                      :product="product"
                      :count="index + 1"
                    />
                    <EmptyState v-if="!products.length && !isLoading" />
                    <client-only>
                      <infinite-loading
                        :identifier="productInfiniteId"
                        @infinite="productListInfiniteHandler"
                      >
                        <div slot="spinner">
                          <ContentLoader
                            :speed="1"
                            :animate="true"
                            :width="400"
                            :height="100"
                          >
                            <rect
                              v-for="index in 10"
                              :key="index"
                              x="0"
                              :y="contentLoaderData[index]"
                              rx="0"
                              ry="0"
                              width="400"
                              height="13"
                            />
                          </ContentLoader>
                        </div>
                        <div slot="no-more"></div>
                        <div slot="no-results"></div>
                      </infinite-loading>
                    </client-only>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="notes" class="tab-pane">
            <div class="row h-100">
              <NoteList
                :notes-infinite-id="notesInfiniteId"
                :notes-loaded="notesLoaded"
                :notes="notes"
                @newNote="showNote = $event"
                @viewNote="viewNote"
                @notesInfiniteHandler="notesInfiniteHandler"
              />
              <NoteView
                v-if="showNote && notes.length"
                :viewed-note="viewedNote"
              />
              <AddNote
                ref="addNoteRef"
                :show-note="showNote"
                @update:note="note = $event"
                @addNote="addNote"
                @showNote="showNote = $event"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import DealerList from './components/DealerList'
import LeadList from './components/LeadList'
import ProductList from './components/ProductList'
import leadMixin from '@/mixins/lead.js'
import EmptyState from '~/components/theme/global/EmptyState'
import DateRangePicker from '~/components/plugins/DateRangePicker'
import Select2 from '~/components/lead/Select2'
import AnalyticsMixins from '~/mixins/analyticsMixins'
import { checkIsEqual } from '~/utils/helper.js'
import NoteList from '~/components/lead/LeadDetails/Notes/NoteList'
import NoteView from '~/components/lead/LeadDetails/Notes/NoteView.vue'
import AddNote from '~/components/lead/LeadDetails/Notes/AddNote.vue'
import ProfileLoader from '~/components/lead/LeadDetails/Loaders/ProfileLoader.vue'
export default {
  components: {
    EmptyState,
    ContentLoader,
    DealerList,
    LeadList,
    ProductList,
    DateRangePicker,
    Select2,
    NoteList,
    NoteView,
    AddNote,
    ProfileLoader,
  },
  mixins: [AnalyticsMixins, leadMixin],
  layout: 'leadLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-lead-module'],
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('lm/common/list-lead-status')
      const leadStatusOptions = data.data.map((data) => {
        return Object.assign(data, { text: data.status_name })
      })
      return { leadStatusOptions }
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      // lastDate: '29',
      // dStartDate: this.$moment().format('YYYY-MM-DD'),
      // dEndDate: this.$moment().format('YYYY-MM-DD'),
      // activeDate: this.$moment().format('YYYY-MM-DD'),
      //   rsm Details
      rsmDetails: {
        display_profile_image: null,
        display_thumb_profile_image: null,
        email: '',
        id: '',
        name: '',
        phone: null,
        profile_image: null,
        text: '',
      },
      contentLoaderData: [0, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      isLoading: false,
      isRsmLoading: false,
      // dealers
      dealersInfiniteId: new Date().getTime(),
      dealerships: [],
      dealerPage: 0,
      totalDealers: 0,
      // Leads
      leadsInfiniteId: new Date().getTime(),
      leads: [],
      leadPage: 0,
      totalLeads: 0,
      // Products
      productInfiniteId: new Date().getTime(),
      products: [],
      productPage: 0,
      totalProducts: 0,
      // sort vars
      sortData: '',
      currentSort: '',
      // notes
      showNote: true,
      notesLoaded: false,
      notes: [],
      viewedNote: { user_details: {} },
      note: '',
      notesPage: 0,
      notesInfiniteId: new Date().getTime(),
      // Filters
      filterData: {
        dealershipName: [],
        leadStatus: [],
        modelName: [],
      },
      filterPayload: {
        dealershipIds: [],
        statusIds: [],
        modelIds: [],
      },
    }
  },
  computed: {
    ...mapGetters({
      lastDate: 'RSM/getLastDate',
      dStartDate: 'RSM/getStartDate',
      dEndDate: 'RSM/getEndDate',
      activeDate: 'RSM/getActiveDate',
    }),
    activeDate: {
      set(payload) {
        this.$store.dispatch('RSM/setActiveDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getActiveDate']
      },
    },
    lastDate: {
      set(payload) {
        this.$store.dispatch('RSM/setLastDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getLastDate']
      },
    },
    dStartDate: {
      set(payload) {
        this.$store.dispatch('RSM/setStartDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getStartDate']
      },
    },
    dEndDate: {
      set(payload) {
        this.$store.dispatch('RSM/setEndDate', payload)
      },
      get() {
        return this.$store.getters['RSM/getEndDate']
      },
    },
  },
  watch: {
    'filterData.dealershipName': {
      handler(val, newval) {
        if (checkIsEqual(val, newval) && !this.columnFilterLoading) {
          const tempData = [...this.filterData.dealershipName]
          this.filterPayload.dealershipIds = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleLeadFilterChange()
        }
      },
      deep: true,
      immediate: false,
    },
    'filterData.leadStatus': {
      handler(val, newval) {
        if (checkIsEqual(val, newval) && !this.columnFilterLoading) {
          const tempData = [...this.filterData.leadStatus]
          this.filterPayload.statusIds = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleLeadFilterChange()
        }
      },
      deep: true,
      immediate: false,
    },
    'filterData.modelName': {
      handler(val, newval) {
        if (checkIsEqual(val, newval) && !this.columnFilterLoading) {
          const tempData = [...this.filterData.modelName]
          this.filterPayload.modelIds = tempData
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleLeadFilterChange()
        }
      },
      deep: true,
      immediate: false,
    },
  },
  created() {
    this.getRsmDetails()
    this.getColumnFilters()
    this.validateDateWhileRefresh()
  },
  methods: {
    validateDateWhileRefresh() {
      if (this.lastDate === '29' && this.dStartDate === this.dEndDate) {
        this.getDate()
      }
    },
    getStatusDescription() {
      if (
        this.leadStatusOptions.length > 0 &&
        typeof document !== 'undefined'
      ) {
        const ul = document.createElement('ul')
        this.leadStatusOptions.forEach((s) => {
          const li = document.createElement('li')
          const strong = document.createElement('strong')
          strong.textContent = s.status_name + ': '
          li.appendChild(strong)
          li.append(s.description ? s.description : '')
          ul.appendChild(li)
        })
        return ul
      }
    },
    previousTimeFrame() {
      if (this.getDayTitle === 'Week') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(7, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(6, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === '30 Days') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(30, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(29, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === 'Year') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(365, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(364, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === 'Quarter') {
        this.dStartDate = this.$moment(this.dStartDate)
          .subtract(90, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dStartDate)
          .add(89, 'days')
          .format('YYYY-MM-DD')
      }
      this.$store.dispatch('RSM/setDurationApplied', true)
      this.handleFilterChange('lead')
    },
    nextTimeFrame() {
      if (this.getDayTitle === 'Week') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(7, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === '30 Days') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(30, 'days')
          .format('YYYY-MM-DD')
      }
      if (this.getDayTitle === 'Year') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(365, 'days')
          .format('YYYY-MM-DD')
      }

      if (this.getDayTitle === 'Quarter') {
        this.dStartDate = this.$moment(this.dEndDate)
          .add(1, 'days')
          .format('YYYY-MM-DD')
        this.dEndDate = this.$moment(this.dEndDate)
          .add(90, 'days')
          .format('YYYY-MM-DD')
      }
      this.$store.dispatch('RSM/setDurationApplied', true)
      this.handleFilterChange('lead')
    },
    rangeDateChanged() {
      this.lastDate = '-2'
      this.resetColumnFilter()
      this.handleFilterChange('lead')
      this.getColumnFilters()
    },
    getDate($evt) {
      if (this.lastDate > -1) {
        const { startDate, endDate } = this.getDateByDays(this.lastDate)
        this.dStartDate = startDate
        this.dEndDate = endDate
        this.resetColumnFilter()
        if ($evt) {
          this.handleFilterChange('lead')
        }
        this.$nextTick(() => {
          this.getColumnFilters()
        })
      } else if (this.lastDate === '-2') {
        this.$nextTick(() => {
          this.$refs.dateRangePicker.$el.click()
        })
      } else if (this.lastDate === 'all') {
        this.dStartDate = 'all'
        this.dEndDate = 'all'
        this.resetColumnFilter()
        if ($evt) {
          this.handleFilterChange('lead')
        }
        this.$nextTick(() => {
          this.getColumnFilters()
        })
      }
    },
    exportLeads() {
      this.$axios
        .$post('/lm/rsm-user/lead-list-export', {
          workspace_id: this.$route.params.workspace_id,
          rsm_user_id: this.$route.params.id,
          start_date: this.dStartDate,
          end_date: this.dEndDate,
        })
        .then((response) => {
          const link = document.createElement('a')
          link.href = response.data.filename
          link.setAttribute('download', 'leads.csv')
          document.body.appendChild(link)
          link.click()
        })
    },
    async getRsmDetails() {
      //   lm/rsm-user/view
      this.isRsmLoading = true
      try {
        const { data } = await this.$axios.post('lm/rsm-user/view', {
          workspace_id: this.$getWorkspaceId(),
          rsm_user_id: this.$route.params.id,
        })
        if (!data.error.length) {
          this.isRsmLoading = false
        }
        this.rsmDetails = data.data
      } catch (error) {
        this.isRsmLoading = false
        this.$toast.error(this.$getErrorMessage(error))
      }
    },
    dealershipInfiniteHandler($state) {
      this.isLoading = true
      this.dealerPage += 1
      const formData = new FormData()
      formData.append('workspace_id', this.$getWorkspaceId())
      formData.append('rsm_user_id', this.$route.params.id)
      this.$axios
        .$post(`lm/rsm-user/dealership-list`, formData, {
          params: {
            sortvalue: this.sortData,
            orderby: this.currentSort,
            page: this.dealerPage,
          },
        })
        .then(({ data }) => {
          if (this.dealerPage === data.current_page) {
            this.dealerships.push(...data.data)
            this.totalDealers = data.total
            $state.loaded()
            this.isLoading = false
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((error) => {
          $state.error(error)
          this.$toast.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    leadListInfiniteHandler($state) {
      this.isLoading = true
      this.leadPage += 1
      const formData = {
        workspace_id: this.$getWorkspaceId(),
        rsm_user_id: this.$route.params.id,
        start_date: this.dStartDate,
        end_date: this.dEndDate,
      }
      if (this.filterPayload.dealershipIds.length) {
        formData.dealership = this.filterPayload.dealershipIds
      } else {
        delete formData.dealership
      }
      if (this.filterPayload.statusIds.length) {
        formData.status = this.filterPayload.statusIds
      } else {
        delete formData.lead_source
      }
      if (this.filterPayload.modelIds.length) {
        formData.product_id = this.filterPayload.modelIds
      } else {
        delete formData.product_id
      }
      this.$axios
        .$post(`lm/rsm-user/lead-list`, formData, {
          params: {
            sortvalue: this.sortData,
            orderby: this.currentSort,
            page: this.leadPage,
          },
        })
        .then(({ data }) => {
          if (this.leadPage === data.current_page) {
            this.leads.push(...data.data)
            this.totalLeads = data.total
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((error) => {
          $state.error(error)
          this.$toast.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    productListInfiniteHandler($state) {
      this.isLoading = true
      this.productPage += 1
      const formData = new FormData()
      formData.append('workspace_id', this.$getWorkspaceId())
      formData.append('rsm_user_id', this.$route.params.id)
      this.$axios
        .$post(`lm/rsm-user/product-list`, formData, {
          params: {
            sortvalue: this.sortData,
            orderby: this.currentSort,
            page: this.productPage,
          },
        })
        .then(({ data }) => {
          if (this.productPage === data.current_page) {
            this.products.push(...data.data)
            this.totalProducts = data.total
            $state.loaded()
            this.isLoading = false
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    notesInfiniteHandler($state) {
      this.notesPage += 1
      const formData = new FormData()
      formData.append('workspace_id', this.$getWorkspaceId())
      formData.append('rsm_user_id', this.$route.params.id)
      this.$axios
        .$post('lm/rsm-user/notes-list', formData, {
          params: {
            page: this.notesPage,
          },
        })
        .then(({ data }) => {
          if (
            data.data &&
            data.data.length &&
            this.notesPage === data.current_page
          ) {
            this.notes.push(...data.data)
            if (this.notesPage === 1) this.viewedNote = this.notes[0]
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
        .catch((e) => {
          $state.error(e)
          this.$toast.error(this.$getErrorMessage(e))
        })
    },
    getColumnFilters() {
      this.columnFilterLoading = true
      this.$axios
        .$post('lm/rsm-user/list-column-header', {
          workspace_id: this.$getWorkspaceId(),
          rsm_user_id: this.$route.params.id,
          start_date: this.dStartDate,
          end_date: this.dEndDate,
        })
        .then(({ data }) => {
          this.filterData.leadStatus = data.lead_status.map((e) => {
            return {
              id: e.id,
              text: e.status_name,
              isActive: false,
            }
          })
          this.filterData.dealershipName = data.dealership_name.map((e) => {
            return {
              id: e.id,
              text: e.dealership_name,
              isActive: false,
            }
          })
          this.filterData.modelName = data.model_name.map((e) => {
            return {
              id: e.product_id,
              text: e.product_name,
              isActive: false,
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.columnFilterLoading = false
        })
    },
    toggleSortData(data, onSortType) {
      if (this.isLoading) return
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'ASC'
      } else {
        this.currentSort = this.currentSort === 'ASC' ? 'DESC' : 'ASC'
      }
      this.handleFilterChange(onSortType)
    },
    handleFilterChange(onSortType) {
      if (onSortType === 'lead') {
        this.handleLeadFetch()
      } else if (onSortType === 'product') {
        this.handleProductFetch()
      } else if (onSortType === 'dealer') {
        this.handleDealerFetch()
      }
    },
    resetColumnFilter() {
      this.filterPayload.dealershipIds = []
      this.filterPayload.statusIds = []
      this.filterPayload.modelIds = []
    },
    handleDealerFetch() {
      this.dealerPage = 0
      this.dealerships = []
      this.dealersInfiniteId = new Date()
    },
    handleLeadFilterChange() {
      this.leadPage = 0
      this.leads = []
      this.leadsInfiniteId = new Date()
    },
    handleLeadFetch() {
      this.leadPage = 0
      this.leads = []
      this.leadsInfiniteId = new Date()
    },
    handleProductFetch() {
      this.productPage = 0
      this.products = []
      this.productInfiniteId = new Date()
    },
    handleNoteFetching() {
      this.notesLoaded = true
      this.notesPage = 0
      this.notes = []
      this.notesInfiniteId += 1
    },
    hideAddNewNote() {
      this.showNote = true
      this.$v.note.$reset()
    },
    addNote(annotation = false) {
      if (annotation && !this.note) return
      this.$v.note.$touch()
      if (this.$v.note.$invalid) {
        return false
      }
      this.$axios
        .$post('lm/rsm-user/add-notes', {
          workspace_id: this.$getWorkspaceId(),
          rsm_user_id: this.$route.params.id,
          note: this.note,
        })
        .then((r) => {
          this.note = ''
          this.$refs.addNoteRef.$v.note.$reset()
          this.$refs.addNoteRef.note = ''
          this.$toast.success(r.message)
          this.hideAddNewNote()
          this.notesPage = 0
          this.notes = []
          this.notesInfiniteId += 1
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    newNote() {
      this.showNote = false
    },
    viewNote(note) {
      this.viewedNote = note
      this.showNote = true
    },
  },
  validations() {
    return {
      note: { required },
    }
  },
}
</script>

<style scoped>
.rsm_export_filter {
  position: absolute;
  top: -44px;
  right: 0;
  z-index: 10;
  width: auto;
}
</style>
