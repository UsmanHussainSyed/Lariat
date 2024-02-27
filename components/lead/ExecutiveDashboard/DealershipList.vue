<template>
  <div class="col-md-4">
    <div class="tableDetail">
      <div class="common-box bg-gray">
        <Select2
          v-model="selectedState"
          :options="stateOptions"
          placeholder="Location"
          custom-event
        />
        <div class="table-list-view table-list-scrolling scrolling">
          <ul class="thead">
            <li>
              <div
                class="state sorting sortarrow flex20"
                :class="[
                  sortData === 'state_code' && currentSort === 'DESC'
                    ? 'active descending'
                    : '',
                ]"
              >
                <span @click="toggleSortData('state_code')">State</span>
              </div>
              <div class="dealership sorting flex60">
                <span>Dealership</span>
              </div>
              <div
                class="lead-count sorting sortarrow text-center flex20"
                :class="[
                  sortData === 'total_assign_leads' && currentSort === 'DESC'
                    ? 'active descending'
                    : '',
                ]"
              >
                <span @click="toggleSortData('total_assign_leads')"
                  >Lead Count</span
                >
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody">
              <li
                v-for="assignment in assignmentWiseDealers"
                :key="assignment.id"
              >
                <div class="state tb-column flex20">
                  <div class="top-column">
                    <strong>{{ assignment.state_code || '-' }}</strong>
                  </div>
                </div>
                <div class="dealership tb-column flex60">
                  <div class="top-column">
                    <label>{{ assignment.dealership_name }}</label>
                  </div>
                </div>
                <div class="lead-count tb-column flex20 text-center">
                  <div class="top-column">
                    <label>{{ assignment.total_assign_leads }}</label>
                  </div>
                </div>
              </li>
              <EmptyState v-if="!isLoading && !assignmentWiseDealers.length" />
              <client-only>
                <infinite-loading
                  :identifier="assignmentInfiniteId"
                  @infinite="assignmentinfiniteHandler"
                >
                  <div slot="spinner">
                    <ContentLoader
                      :speed="1"
                      :animate="true"
                      :width="400"
                      :height="200"
                    >
                      <rect
                        v-for="index in 8"
                        :key="index"
                        x="0"
                        :y="contentLoaderData[index]"
                        rx="0"
                        ry="0"
                        width="400"
                        height="15"
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
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import Select2 from '~/components/plugins/Select2'
import EmptyState from '~/components/theme/global/EmptyState'
import LeadMixin from '~/mixins/lead'
import AnalyticsMixins from '~/mixins/analyticsMixins'
export default {
  name: 'DealershipList',
  components: {
    Select2,
    EmptyState,
    ContentLoader,
  },
  mixins: [LeadMixin, AnalyticsMixins],
  props: {
    stateOptions: {
      type: Array,
      required: true,
    },
    dStartDate: {
      type: String,
      required: true,
    },
    dEndDate: {
      type: String,
      required: true,
    },
    country: {
      default: 'United States',
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedState: 'all',
      sortData: 'state_code',
      currentSort: 'ASC',
      assignmentWiseDealers: [],
      assignmentPage: 0,
      assignmentLastPage: null,
      isLoading: false,
      assignmentInfiniteId: +new Date(),
      contentLoaderData: [-1, 15, 31, 47, 63, 79, 95, 111, 127, 143],
    }
  },
  watch: {
    selectedState() {
      this.handleChangeInfinite()
    },
  },
  methods: {
    assignmentinfiniteHandler($state) {
      this.assignmentPage += 1
      this.isLoading = true
      this.$axios
        .$post(
          `lm/executive-dashboard/dealership-list`,
          {
            start_date: this.dStartDate,
            end_date: this.dEndDate,
            state_code: this.selectedState || '',
            country: this.country,
          },
          {
            params: {
              page: this.assignmentPage,
              sortvalue: this.sortData,
              orderby: this.currentSort,
            },
          }
        )
        .then(({ data }) => {
          this.assignmentLastPage = data.last_page
          if (data.data && data.data.length) {
            if (this.assignmentPage === data.current_page) {
              this.assignmentWiseDealers.push(...data.data)
              $state.loaded()
              if (this.assignmentLastPage === this.assignmentPage) {
                $state.complete()
              }
            }
          } else {
            $state.complete()
          }
          this.isLoading = false
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    toggleSortData(data) {
      if (this.isLoading) return
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'ASC'
      } else {
        this.currentSort = this.currentSort === 'ASC' ? 'DESC' : 'ASC'
      }
      this.handleChangeInfinite()
    },
    handleChangeInfinite() {
      this.assignmentPage = 0
      this.assignmentPage = null
      this.assignmentWiseDealers = []
      this.assignmentInfiniteId = new Date()
    },
  },
}
</script>

<style></style>
