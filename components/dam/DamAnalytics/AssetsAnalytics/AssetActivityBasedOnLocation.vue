<template>
  <div class="row no-gutters">
    <div class="col-md-7">
      <div class="row no-gutters justify-content-center">
        <div class="col-md-4 p10">
          <Select2
            :value="countryId"
            :options="countryList"
            :custom-event="true"
            placeholder="Country List"
            @changeSelect2="countryChangeHandler(...arguments)"
          />
        </div>
      </div>
      <div class="chart">
        <InnerLoader v-if="mapLoading" :bg-white="false" />
        <highlight-chart
          v-else
          v-show="highlightChartOption.series[0].data.length"
          :chart-options="highlightChartOption"
        />
        <EmptyAnalyticsMap
          v-show="!mapLoading && !highlightChartOption.series[0].data.length"
          class="h-100"
        />
      </div>
    </div>
    <div class="col-md-5">
      <div class="tableDetail">
        <div class="common-box bg-gray">
          <Select2
            :value="stateId"
            :options="stateList"
            :custom-event="true"
            placeholder="Select State"
            @changeSelect2="stateChangeHandler(...arguments)"
          />
          <div class="table-list-view table-list-scrolling">
            <ul v-if="assetsLocationBasedList.length" class="thead">
              <li>
                <div
                  :class="[
                    'categary-name sorting flex47',
                    sortingClass('display_file_name'),
                  ]"
                >
                  <span
                    @click="
                      sortValueModel = 'display_file_name'
                      sort('files', 'display_file_name', $sortToUpperCase)
                    "
                    >Asset Name</span
                  >
                </div>
                <div
                  :class="[
                    'totalActivities text-center sorting flex20',
                    sortingClass('total_assets'),
                  ]"
                >
                  <span
                    @click="
                      sortValueModel = 'total_assets'
                      sort('files', 'total_assets', $sortToTypedNumber)
                    "
                    >Total Activities</span
                  >
                </div>
                <div
                  :class="[
                    'view text-center sorting flex10',
                    sortingClass('total_view'),
                  ]"
                >
                  <span
                    @click="
                      sortValueModel = 'total_view'
                      sort('files', 'total_view', $sortToTypedNumber)
                    "
                    >View</span
                  >
                </div>
                <div
                  :class="[
                    'download text-center sorting flex13',
                    sortingClass('total_download'),
                  ]"
                >
                  <span
                    @click="
                      sortValueModel = 'total_download'
                      sort('files', 'total_download', $sortToTypedNumber)
                    "
                    >Download</span
                  >
                </div>
                <div
                  :class="[
                    'share text-center sorting flex10',
                    sortingClass('total_share'),
                  ]"
                >
                  <span
                    @click="
                      sortValueModel = 'total_share'
                      sort('files', 'total_share', $sortToTypedNumber)
                    "
                    >Share</span
                  >
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <li v-for="file in assetsLocationBasedList" :key="file.id">
                  <!--                  <div class="assetName tb-column flex47">
                    <div class="top-column">
                      <strong>{{ file.display_file_name }}</strong>
                    </div>
                  </div>-->
                  <div class="categary-name tb-column flex47">
                    <div class="media">
                      <div class="media-left">
                        <div class="categary-image">
                          <img
                            :src="file.thumbnail_file || file.preview_image"
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="media-body">
                        <div class="add-label">
                          <div class="top-column">
                            <span>{{ file.display_file_name }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="totalActivities tb-column text-center flex20">
                    <div class="top-column">
                      <label>{{ file.total_assets }}</label>
                    </div>
                  </div>
                  <div class="view tb-column text-center flex10">
                    <div class="top-column">
                      <label>{{ file.total_view }}</label>
                    </div>
                  </div>
                  <div class="download tb-column text-center flex13">
                    <div class="top-column">
                      <label>{{ file.total_download }}</label>
                    </div>
                  </div>
                  <div class="share tb-column text-center flex10">
                    <div class="top-column">
                      <label>{{ file.total_share }}</label>
                    </div>
                  </div>
                </li>
                <client-only>
                  <infinite-loading
                    :identifier="infiniteId"
                    @infinite="infiniteHandler"
                  >
                    <div slot="spinner">
                      <ContentLoader
                        v-if="page == 1"
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
                      <div v-else class="no-data-found pb2 pt2">
                        <div class="inner w-100">
                          <p>Loading...</p>
                        </div>
                      </div>
                    </div>
                    <div slot="no-more"></div>
                    <div slot="no-results">
                      <EmptyStateForLocationGraph
                        v-if="!assetsLocationBasedList.length"
                      />
                    </div>
                  </infinite-loading>
                </client-only>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import HighlightChart from '~/components/plugins/HighlightChart.vue'
import damLocationAnalytics from '~/mixins/damLocationAnalytics'
import Select2 from '~/components/plugins/Select2'
import EmptyAnalyticsMap from '~/components/theme/global/EmptyAnalyticsMap'
import InnerLoader from '~/components/dam/DamAnalytics/InnerLoader'
import EmptyStateForLocationGraph from '~/components/dam/DamAnalytics/EmptyStateForLocationGraph'
import analyticsSorting from '~/mixins/analyticsSorting'

export default {
  components: {
    HighlightChart,
    Select2,
    ContentLoader,
    EmptyAnalyticsMap,
    InnerLoader,
    EmptyStateForLocationGraph,
  },
  mixins: [damLocationAnalytics, analyticsSorting],
  props: {
    startDate: { type: [Date, String, Object] },
    endDate: { type: [Date, String, Object] },
  },
  data() {
    return {
      mapLoading: false,
      countryId: 'US',
      countryName: 'United States',
      countryList: [],

      stateId: null,
      stateName: '',
      stateList: [],

      infiniteId: +new Date(),
      page: 1,
      lastPage: null,
      assetsLocationBasedList: [],
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    files: {
      get() {
        return this.assetsLocationBasedList
      },
      set(value) {
        this.assetsLocationBasedList = value
      },
    },
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.getAssetsActivityLocation()
        this.resetAssetsLocationBasedList()
      },
    },
    'sorting.toolbar.value'(sortValue) {
      this.sortValueModel = sortValue
    },
    sortValueModel(sortValueModel) {
      this.sorting.toolbar.value = sortValueModel
    },
  },
  mounted() {
    this.getCountryList()
  },
  methods: {
    sortingClass(sortValue) {
      return {
        sortarrow: this.sorting.toolbar.value === sortValue,
        descending:
          this.sorting.toolbar.value === sortValue && this.sorting.toolbar.desc,
        active:
          this.sorting.toolbar.value === sortValue && this.sorting.toolbar.desc,
      }
    },
    countryChangeHandler(data) {
      this.countryId = data.id
      this.countryName = data.text
      this.stateId = null
      this.stateName = ''
      this.getAssetsActivityLocation()
      this.resetAssetsLocationBasedList()
    },
    getCountryList() {
      this.$axios
        .$get(`digital-assets/country`)
        .then(({ data }) => {
          const found = data.some((el) => el.name === 'United States')
          if (!found)
            data.push({
              id: 'US',
              name: 'United States',
              text: 'United States',
            })
          this.countryList = data
          this.getAssetsActivityLocation()
        })
        .catch(this.$errorToast)
    },
    async getAssetsActivityLocation() {
      this.stateList = []
      this.highlightChartOption.series[0].data = []
      this.highlightChartOption.chart.map = null
      this.mapLoading = true
      await this.$axios
        .$post('digital-assets/analytics/country-hits-count', {
          from_date: this.startDate,
          to_date: this.endDate,
          country_name: this.countryName,
        })
        .then(({ data }) => {
          if (data.country_data && data.country_data.length) {
            this.highlightChartOption.series[0].data = data.country_data.map(
              (e, i) => {
                const stateArray = Object.entries(e).flat()
                const data = [stateArray].map(([key, value]) => {
                  return [
                    key + ', ' + this.countryId + ', ' + this.countryName,
                    value,
                  ]
                })
                return data.flat()
              }
            )
            this.highlightChartOption.chart.map = require('@highcharts/map-collection/countries/' +
              this.countryId.toLowerCase() +
              '/' +
              this.countryId.toLowerCase() +
              '-all.geo.json')
          }
          if (data.state_data && data.state_data.length) {
            this.stateList = data.state_data
          }
          this.mapLoading = false
        })
        .catch(this.$errorToast)
    },
    resetAssetsLocationBasedList() {
      this.assetsLocationBasedList = []
      this.page = 1
      this.infiniteId += 1
    },
    async infiniteHandler($state) {
      await this.$axios
        .$post(
          `digital-assets/analytics/assets-based-on-country?page=${this.page}`,
          {
            from_date: this.startDate,
            to_date: this.endDate,
            country_name: this.countryName,
            state: this.stateName,
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page

          if (data.data && data.data.length) {
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.assetsLocationBasedList.push(...data.data)
              $state.loaded()
              if (parseInt(this.lastPage) === parseInt(this.page)) {
                $state.complete()
              } else {
                this.page += 1
              }
            } else {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        })
        .catch((e) => {
          $state.error()
        })
    },
    stateChangeHandler(data) {
      this.stateId = data.id
      this.stateName = data.text
      this.resetAssetsLocationBasedList()
    },
  },
}
</script>
