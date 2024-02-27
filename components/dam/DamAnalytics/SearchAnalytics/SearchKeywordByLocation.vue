<template>
  <div class="row no-gutters">
    <div class="col-md-8">
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
    <div class="col-md-4">
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
            <ul v-if="searchKeywordLocationBasedList.length" class="thead">
              <li>
                <div class="tag-name sorting flex75">
                  <span>Tag Name</span>
                </div>
                <div class="search-count text-center sorting flex25">
                  <span>Search Count</span>
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <li
                  v-for="(keyword, index) in searchKeywordLocationBasedList"
                  :key="index"
                >
                  <div class="tag-name tb-column flex75">
                    <div class="top-column">
                      <span
                        >Term :
                        <template v-if="keyword.terms != 'keyword'"
                          >{{ keyword.terms }} :</template
                        >'<strong>{{ keyword.search_text }}</strong
                        >'</span
                      >
                    </div>
                  </div>
                  <div class="search-count tb-column text-center flex25">
                    <div class="top-column">
                      <label>{{ keyword.count }}</label>
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
                        v-if="!searchKeywordLocationBasedList.length"
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
export default {
  components: {
    HighlightChart,
    Select2,
    ContentLoader,
    EmptyAnalyticsMap,
    InnerLoader,
    EmptyStateForLocationGraph,
  },
  mixins: [damLocationAnalytics],
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
      searchKeywordLocationBasedList: [],
    }
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.getSearchKeywordByLocation()
        this.resetSearchKeywordLocationBasedList()
      },
    },
  },
  mounted() {
    this.getCountryList()
  },
  methods: {
    countryChangeHandler(data) {
      this.countryId = data.id
      this.countryName = data.text
      this.stateId = null
      this.stateName = ''
      this.getSearchKeywordByLocation()
      this.resetSearchKeywordLocationBasedList()
    },
    getCountryList() {
      this.$axios
        .$get(`digital-assets/analytics/search-country`)
        .then(({ data }) => {
          const found = data.some((el) => el.name === 'United States')
          if (!found)
            data.push({
              id: 'US',
              name: 'United States',
              text: 'United States',
            })
          this.countryList = data
          this.getSearchKeywordByLocation()
        })
        .catch(this.$errorToast)
    },
    async getSearchKeywordByLocation() {
      this.stateList = []
      this.highlightChartOption.series[0].data = []
      this.highlightChartOption.chart.map = null
      this.mapLoading = true
      await this.$axios
        .$post('digital-assets/analytics/search-keywords-by-location', {
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
    resetSearchKeywordLocationBasedList() {
      this.searchKeywordLocationBasedList = []
      this.page = 1
      this.infiniteId += 1
    },
    async infiniteHandler($state) {
      await this.$axios
        .$post(
          `digital-assets/analytics/get-keywords-by-location?page=${this.page}`,
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
              this.searchKeywordLocationBasedList.push(...data.data)
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
      this.resetSearchKeywordLocationBasedList()
    },
  },
}
</script>
