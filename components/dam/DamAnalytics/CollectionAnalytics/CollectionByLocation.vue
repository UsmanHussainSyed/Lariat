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
            <ul v-if="collectionLocationBasedList.length" class="thead">
              <li>
                <div
                  :class="[
                    'categary-name sorting flex55',
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
                  class="totalActivities text-center sorting"
                  :class="[
                    {
                      flex15: collectionTypeName == 'all',
                      flex20: collectionTypeName == ('share' || 'download'),
                    },
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
                  v-if="collectionTypeName != 'share'"
                  class="download text-center sorting"
                  :class="[
                    {
                      flex15: collectionTypeName == 'all',
                      flex25: collectionTypeName == 'download',
                    },
                    sortingClass('total_download'),
                  ]"
                >
                  <span
                    @click="
                      sortValueModel = 'total_download'
                      sort('files', 'total_download', $sortToTypedNumber)
                    "
                    >Total Download</span
                  >
                </div>
                <div
                  v-if="collectionTypeName != 'download'"
                  class="share text-center sorting"
                  :class="[
                    {
                      flex15: collectionTypeName == 'all',
                      flex25: collectionTypeName == 'share',
                    },
                    sortingClass('total_share'),
                  ]"
                >
                  <span
                    @click="
                      sortValueModel = 'total_share'
                      sort('files', 'total_share', $sortToTypedNumber)
                    "
                    >Total Share</span
                  >
                </div>
              </li>
            </ul>
            <div class="customscrollbar no_footer">
              <ul class="tbody">
                <li v-for="file in collectionLocationBasedList" :key="file.id">
                  <!--                  <div class="assetName tb-column flex55">
                    <div class="top-column">
                      <strong>{{ file.display_file_name }}</strong>
                    </div>
                  </div>-->
                  <div class="categary-name tb-column flex55">
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
                  <div
                    class="totalActivities tb-column text-center"
                    :class="{
                      flex15: collectionTypeName == 'all',
                      flex20: collectionTypeName == ('share' || 'download'),
                    }"
                  >
                    <div class="top-column">
                      <label>{{ file.total_assets }}</label>
                    </div>
                  </div>
                  <div
                    v-if="collectionTypeName != 'share'"
                    class="download tb-column text-center"
                    :class="{
                      flex15: collectionTypeName == 'all',
                      flex25: collectionTypeName == 'download',
                    }"
                  >
                    <div class="top-column">
                      <label>{{ file.total_download }}</label>
                    </div>
                  </div>
                  <div
                    v-if="collectionTypeName != 'download'"
                    class="share tb-column text-center flex15"
                  >
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
                        v-if="!collectionLocationBasedList.length"
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
    collectionId: { type: Number, required: true },
    collectionTypeName: { type: String, required: true },
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
      collectionLocationBasedList: [],
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    files: {
      get() {
        return this.collectionLocationBasedList
      },
      set(value) {
        this.collectionLocationBasedList = value
      },
    },
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.getCollectionLocation()
        this.resetCollectionLocationBasedList()
      },
    },
    collectionId: {
      deep: true,
      handler() {
        this.getCollectionLocation()
        this.resetCollectionLocationBasedList()
      },
    },
    collectionTypeName: {
      deep: true,
      handler() {
        this.getCollectionLocation()
        this.resetCollectionLocationBasedList()
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
      this.getCollectionLocation()
      this.resetCollectionLocationBasedList()
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
          this.getCollectionLocation()
        })
        .catch(this.$errorToast)
    },
    async getCollectionLocation() {
      this.stateList = []
      this.highlightChartOption.series[0].data = []
      this.highlightChartOption.chart.map = null
      this.mapLoading = true
      await this.$axios
        .$post('digital-assets/analytics/collection-activity-by-location', {
          from_date: this.startDate,
          to_date: this.endDate,
          country_name: this.countryName,
          collection_id: this.collectionId,
          download_type: this.collectionTypeName,
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
    resetCollectionLocationBasedList() {
      this.collectionLocationBasedList = []
      this.page = 1
      this.infiniteId += 1
    },
    async infiniteHandler($state) {
      await this.$axios
        .$post(
          `digital-assets/analytics/collection-activity-by-location-details?page=${this.page}`,
          {
            from_date: this.startDate,
            to_date: this.endDate,
            country_name: this.countryName,
            state: this.stateName,
            collection_id: this.collectionId,
            download_type: this.collectionTypeName,
          }
        )
        .then(({ data }) => {
          this.lastPage = data.last_page

          if (data.data && data.data.length) {
            if (parseInt(this.page) === parseInt(data.current_page)) {
              this.collectionLocationBasedList.push(...data.data)
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
      this.resetCollectionLocationBasedList()
    },
  },
}
</script>
