<template>
  <div class="col-md-4">
    <div class="tableDetail">
      <div class="common-box bg-gray">
        <div class="locationTabs">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a
                href="#leads-by-states"
                data-toggle="tab"
                class="nav-link active"
                @click="currentListTab = '1'"
                >Leads by States</a
              >
            </li>
            <li class="nav-item">
              <a
                href="#assignment-by-states"
                data-toggle="tab"
                class="nav-link"
                @click="currentListTab = '2'"
                >Assignment by States</a
              >
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <div id="leads-by-states" class="tab-pane active">
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
                    :class="[
                      sortData === 'state_code' && currentSort === 'DESC'
                        ? 'active descending'
                        : '',
                    ]"
                    class="state sorting sortarrow flex20"
                  >
                    <span @click="toggleSortData('state_code')">State</span>
                  </div>
                  <div class="contact-name sorting flex60">
                    <span>Contact Name</span>
                  </div>
                  <div
                    class="lead-score sorting sortarrow text-center flex20"
                    :class="[
                      sortData === 'lead_score' && currentSort === 'DESC'
                        ? 'active descending'
                        : '',
                    ]"
                  >
                    <span @click="toggleSortData('lead_score')"
                      >Lead Score</span
                    >
                  </div>
                </li>
              </ul>
              <div class="customscrollbar no_footer">
                <ul class="tbody">
                  <li v-for="lead in stateWiseLeads" :key="lead.id">
                    <div class="state tb-column flex20">
                      <div class="top-column">
                        <strong>{{ lead.state_code || '-' }}</strong>
                      </div>
                    </div>
                    <div class="contact-name tb-column flex60">
                      <div class="media">
                        <div class="media-body">
                          <div class="top-column">
                            <nuxt-link
                              :to="{
                                name: 'workspace_id-lead-leads-id',
                                params: {
                                  workspace_id: $_auth().id,
                                  id: lead.id,
                                },
                              }"
                            >
                              <strong>{{
                                !isBlank(lead.name) ? lead.name : lead.email
                              }}</strong>
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="lead-score tb-column flex20 text-center">
                      <div class="top-column">
                        <div
                          :class="
                            getLeadScoreText(lead.lead_score).toLowerCase()
                          "
                        >
                          <strong>{{ lead.lead_score }}</strong>
                          <span
                            class="img-responsive img-center"
                            v-html="leadScoreIconSvg(lead.lead_score)"
                          ></span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <EmptyState v-if="!isLoading && !stateWiseLeads.length" />
                  <client-only>
                    <infinite-loading
                      :identifier="leadInfiniteId"
                      @infinite="leadinfiniteHandler"
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
          <div id="assignment-by-states" class="tab-pane">
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
                      sortData === 'total_lead' && currentSort === 'DESC'
                        ? 'active descending'
                        : '',
                    ]"
                  >
                    <span @click="toggleSortData('total_lead')"
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
                        <label>{{ assignment.total_lead }}</label>
                      </div>
                    </div>
                  </li>
                  <EmptyState
                    v-if="!isLoading && !assignmentWiseDealers.length"
                  />
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
  name: 'LeadListTab',
  components: {
    Select2,
    ContentLoader,
    EmptyState,
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
      // Lead infinite dependencies
      isLoading: false,
      leadInfiniteId: +new Date(),
      leadPage: 0,
      leadLastPade: null,
      // assignment dependencies
      assignmentInfiniteId: +new Date(),
      assignmentPage: 0,
      assignmentLastPage: null,
      currentSort: 'ASC',
      sortData: 'state_code',
      selectedState: 'all',
      stateWiseLeads: [],
      assignmentWiseDealers: [],
      contentLoaderData: [-1, 15, 31, 47, 63, 79, 95, 111, 127, 143],
      currentListTab: '1',
    }
  },
  watch: {
    selectedState() {
      if (this.currentListTab === '1') {
        this.handleChangeInfinite()
      } else {
        this.handleAssignmentChange()
      }
    },
    currentListTab() {
      if (this.currentListTab === '1') {
        this.handleChangeInfinite()
      } else {
        this.handleAssignmentChange()
      }
    },
  },
  methods: {
    leadinfiniteHandler($state) {
      this.leadPage += 1
      this.isLoading = true
      this.$axios
        .$post(
          `lm/dashboard/state-wise-lead-data`,
          {
            start_date: this.dStartDate,
            end_date: this.dEndDate,
            state_code: this.selectedState || '',
            country: this.country,
          },
          {
            params: {
              page: this.leadPage,
              sortvalue: this.sortData,
              orderby: this.currentSort,
            },
          }
        )
        .then(({ data }) => {
          this.leadLastPade = data.last_page
          if (data.data && data.data.length) {
            if (this.leadPage === data.current_page) {
              this.stateWiseLeads.push(...data.data)
              $state.loaded()
              if (this.leadLastPade === this.leadPage) {
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
    assignmentinfiniteHandler($state) {
      this.assignmentPage += 1
      this.isLoading = true
      this.$axios
        .$post(
          `lm/dashboard/assign-by-state-lead-data`,
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
      if (this.currentListTab === '1') {
        this.handleChangeInfinite()
      } else {
        this.handleAssignmentChange()
      }
    },
    handleChangeInfinite() {
      this.leadPage = 0
      this.leadLastPade = null
      this.stateWiseLeads = []
      this.leadInfiniteId = new Date()
    },
    handleAssignmentChange() {
      this.assignmentPage = 0
      this.assignmentPage = null
      this.assignmentWiseDealers = []
      this.assignmentInfiniteId = new Date()
    },
  },
}
</script>

<style></style>
