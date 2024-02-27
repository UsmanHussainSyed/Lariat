<template>
  <Model
    v-model="model"
    hide-buttons
    :header-text="'Activity Logs'"
    :model-footer="false"
    :layout-class="'large'"
  >
    <div class="notes pt0 pb1">
      <p><strong>Note:</strong> System show only last 30 days activities.</p>
    </div>
    <div class="common-box bg-gray h-auto pl0 pb10">
      <div class="table-list-view workspace-settings small-height p0">
        <ul class="thead">
          <li>
            <div class="sorting flex30">
              <span>Date / Time</span>
            </div>
            <div class="sorting flex70">
              <span>Logs</span>
            </div>
          </li>
        </ul>
        <div v-if="model" class="customscrollbar no_footer">
          <ul class="tbody">
            <li v-for="activity in activities" :key="activity.id">
              <div class="tb-column flex30">
                {{ $moment(activity.created_at).format(`MMM Do 'YY, h:mm a`) }}
              </div>
              <div class="tb-column flex70">
                <div class="d-flex align-items-center">
                  <label v-tooltip="activity.log_details">{{
                    activity.log_details
                  }}</label>
                  <a
                    v-if="activity.activity_url"
                    :href="activity.activity_url"
                    target="_blank"
                  >
                    <svg
                      id="Layer_1"
                      class="external-link-icon blue ml-3"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g>
                        <path
                          class="fill-color"
                          d="M14.8,18H2.1C1,18,0,17,0,15.9V3.2C0,2,1,1.1,2.1,1.1h4.2c0.6,0,1.1,0.4,1.1,1.1S7,3.2,6.4,3.2H2.1v12.7h12.7v-4.2c0-0.6,0.4-1.1,1.1-1.1s1.1,0.4,1.1,1.1v4.2C16.9,17,16,18,14.8,18z"
                        ></path>
                        <path
                          class="fill-color"
                          d="M16.9,7.4c-0.6,0-1.1-0.4-1.1-1.1V2.1h-4.2c-0.6,0-1.1-0.4-1.1-1.1S11,0,11.6,0h5.3C17.6,0,18,0.4,18,1.1v5.3C18,7,17.6,7.4,16.9,7.4z"
                        ></path>
                        <path
                          class="fill-color"
                          d="M9.5,9.5C9.2,9.5,9,9.4,8.8,9.2c-0.4-0.4-0.4-1.1,0-1.5l7.4-7.4c0.4-0.4,1.1-0.4,1.5,0s0.4,1.1,0,1.5l-7.4,7.4C10.1,9.4,9.8,9.5,9.5,9.5L9.5,9.5z"
                        ></path>
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
            <client-only>
              <infinite-loading
                :identifier="infiniteId"
                @infinite="handleFetchActivities"
              >
                <div slot="spinner">
                  <ContentLoader
                    :speed="1"
                    :animate="true"
                    :width="400"
                    :height="100"
                  >
                    <rect x="0" y="-1" rx="0" ry="0" width="400" height="13" />
                    <rect x="0" y="15" rx="0" ry="0" width="400" height="13" />
                    <rect x="0" y="31" rx="0" ry="0" width="400" height="13" />
                    <rect x="0" y="47" rx="0" ry="0" width="400" height="13" />
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

                      <p>No activities found!</p>
                    </div>
                  </div>
                </div>
              </infinite-loading>
            </client-only>
          </ul>
        </div>
      </div>
    </div>
  </Model>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import Model from '~/components/plugins/Model'

export default {
  components: { Model, ContentLoader },
  extends: Model,
  props: {
    selectedUserId: { type: [String, Number], required: true },
  },
  data() {
    return {
      activities: [],
      isLoading: false,
      currentPage: 0,
      lastPage: null,
      infiniteId: new Date(),
    }
  },
  computed: {
    workspace_id() {
      return this.$route.params.workspace_id
    },
  },
  watch: {
    model(model) {
      if (!model) {
        this.reset()
      }
    },
  },
  methods: {
    reset() {
      this.currentPage = 0
      this.lastPage = null
      this.activities = []
    },
    handleFetchActivities($state) {
      this.isLoading = true
      this.currentPage += 1
      this.$axios
        .$get(`digital-assets/instance/user-activity`, {
          params: {
            url_workspace_id: this.workspace_id || this.$getWorkspaceId(),
            workspace_id: this.workspace_id || this.$getWorkspaceId(),
            page: this.currentPage,
            user_id: this.selectedUserId,
          },
        })
        .then(({ data }) => {
          this.lastPage = data.last_page
          if (this.currentPage <= 1) this.activities = []
          if (
            data.data &&
            data.data.length &&
            this.currentPage === data.current_page
          ) {
            this.activities.push(...data.data)
            $state.loaded()
            if (this.lastPage === this.currentPage) $state.complete()
            this.isLoading = false
          } else $state.complete()
          this.isLoading = false
        })
    },
  },
}
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
