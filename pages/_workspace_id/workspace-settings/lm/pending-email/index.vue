<template>
  <div class="general-settings-right search-filter h-100">
    <div class="general-settings-title">
      <h4>Pending Email</h4>
      <div class="right-side">
        <div class="search-pr">
          <form class="navbar-form search-navbar-form" role="search">
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
                v-model="search"
                class="form-control"
                placeholder="Search..."
                name="srch-term"
                type="text"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="isSearchTerm" class="search-result mb1 p20">
      <div class="alert alert-info alert-dismissible">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          @click="search = ''"
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
        Showing results for
        <strong>"{{ search.trim() }}"</strong>
      </div>
    </div>
    <div class="workspace-settings">
      <div class="common-box bg-gray h-100">
        <div
          class="table-list-view pending-email-table small-height table-list-scrolling scrolling"
        >
          <ul class="thead">
            <li>
              <div class="sorting flex3">
                <span>
                  <label class="check-label">
                    <input
                      v-model="selectAll"
                      type="checkbox"
                      name="selectMail"
                      @input="
                        listItems.forEach((ev) => (ev.selected = !selectAll))
                      "
                    />
                    <span class="check-span"></span>
                  </label>
                </span>
              </div>
              <div
                class="sorting sortarrow flex22"
                :class="[
                  sortData === 'to' && currentSort === 'DESC'
                    ? 'active descending'
                    : '',
                ]"
              >
                <span @click="toggleSortData('to')">Sent To</span>
              </div>
              <div
                class="sorting sortarrow flex20"
                :class="[
                  sortData === 'send_by' && currentSort === 'DESC'
                    ? 'active descending'
                    : '',
                ]"
              >
                <span @click="toggleSortData('send_by')">Sent By</span>
              </div>
              <div class="sorting filterarrow flex15">
                <span>Email Type</span>

                <ul class="dataFilter">
                  <li v-for="filter in pendingEmailfilters" :key="filter.id">
                    <label class="check-label"
                      >{{ filter.name }}
                      <input
                        v-model="filter.isActive"
                        type="checkbox"
                        name=""
                      />
                      <span class="check-span"></span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="sorting flex10">
                <span>Hold At</span>
              </div>
              <div class="sorting flex10">
                <span>Sent At</span>
              </div>
              <div class="sorting text-center flex10">
                <span>Is Sent</span>
              </div>
              <div class="sorting text-center flex10">
                <span>
                  <a
                    href="javascript:void(0);"
                    class="link"
                    @click="sendHoldinvitation"
                    >Send All</a
                  >
                </span>
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody">
              <li v-for="pm in listItems" :key="pm.id">
                <div class="tb-column flex3">
                  <label class="check-label">
                    <input
                      v-model="pm.selected"
                      type="checkbox"
                      name="selectMail"
                    />
                    <span class="check-span"></span>
                  </label>
                </div>
                <div class="tb-column flex22">
                  <a :href="`mailto:${pm.to}`" class="table-a">{{ pm.to }}</a>
                </div>
                <div class="tb-column flex20">
                  <label>{{ pm.send_by || '-' }}</label>
                </div>
                <div class="tb-column flex15">
                  <label>{{ pm.email_type || '-' }}</label>
                </div>
                <div class="tb-column flex10">
                  <label>{{ pm.hold_at || '-' }}</label>
                </div>
                <div class="tb-column flex10">
                  <label>{{ pm.send_at || '-' }}</label>
                </div>
                <div class="tb-column text-center flex10">
                  <label>{{ (pm.is_send && 'Yes') || 'No' }}</label>
                </div>
                <div class="tb-column flex10">
                  <div class="d-flex justify-content-center">
                    <a
                      href="javascript:void(0);"
                      class="btn btn-gray btn-small"
                      @click="sendHoldinvitation(pm.id)"
                      >Send</a
                    >
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
                      :speed="1"
                      :animate="true"
                      :width="400"
                      :height="100"
                      class="normalLoader"
                    >
                      <rect x="0" y="-1" rx="0" ry="0" width="400" height="1" />
                      <rect x="0" y="15" rx="0" ry="0" width="400" height="1" />
                      <rect x="0" y="30" rx="0" ry="0" width="400" height="1" />
                      <rect x="0" y="45" rx="0" ry="0" width="400" height="1" />
                      <rect x="0" y="60" rx="0" ry="0" width="400" height="1" />
                    </ContentLoader>
                  </div>
                  <div slot="no-more"></div>
                  <div slot="no-results">
                    <div
                      v-if="!pendingEmailfilters.length"
                      class="no-data-found"
                    >
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
                            ></path>
                            <path
                              id="Path_3565"
                              class="fill-color"
                              d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                            ></path>
                          </g>
                        </svg>
                        <p>
                          You don't have any <strong>Pending Email</strong> yet!
                        </p>
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
// apis
// /api/v1/lm/common/list-hold-invitation-email?url_workspace_id={{workspace_id}}
// /api/v1/lm/common/send-hold-invitation-email?url_workspace_id={{workspace_id}}
// request
// -----------------
// {
//     "ids": [
//         1,
//         2,
//         3
//     ]
// }
import { ContentLoader } from 'vue-content-loader'
import leadMixin from '~/mixins/lead.js'
import { checkIsEqual } from '~/utils/helper.js'
export default {
  components: {
    ContentLoader,
  },
  mixins: [leadMixin],
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
  ],

  data: () => ({
    isLoading: false,
    sortData: '',
    currentSort: '',
    pendingEmailfilters: [],
    filterData: [],
    infiniteId: +new Date(),
    lastPage: null,
    currentPage: 0,
    search: '',
    pending_mail_list: [],
    selectAll: false,
  }),
  computed: {
    isSearchTerm() {
      return this.search && this.search.trim()
    },
    selections() {
      return this.listItems.filter(({ selected }) => selected)
    },
    listItems() {
      const search = this.search && this.search.trim()

      if (search) {
        return this.pending_mail_list.filter(({ to }) => {
          let regex = null
          try {
            regex = new RegExp(search, 'ig')
          } catch (e) {}

          return regex && regex.test(to)
        })
      }

      return this.pending_mail_list
    },
  },
  watch: {
    pendingEmailfilters: {
      handler(val, newval) {
        if (checkIsEqual(val, newval)) {
          this.filterData = this.pendingEmailfilters
            .filter((i) => i.isActive === true)
            .map((e) => e.id)
          this.handleFilterChange()
        }
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    this.getFiltrData()
  },
  methods: {
    handleFilterChange() {
      this.currentPage = 0
      this.lastPage = null
      this.pending_mail_list = []
      this.infiniteId = new Date()
    },
    async getFiltrData() {
      try {
        const { data } = await this.$axios.$get(
          'lm/common/list-hold-email-type'
        )
        const filters = Object.keys(data).map((e, i) => {
          return Object.assign({
            id: e.toString(),
            name: Object.values(data)[i],
            text: Object.values(data)[i],
            isActive: false,
          })
        })
        this.pendingEmailfilters = filters
      } catch (error) {
        console.log(error)
      }
    },
    async infiniteHandler($state) {
      this.isLoading = true
      this.currentPage += 1
      try {
        const customPayload = new FormData()
        customPayload.append('email_type', JSON.stringify(this.filterData))
        const { data } = await this.$axios.$post(
          `lm/common/list-hold-invitation-email`,
          customPayload,
          {
            params: {
              sortvalue: this.sortData,
              orderby: this.currentSort,
              page: this.currentPage,
            },
          }
        )
        data.data.forEach((ev) => (ev.selected = false))
        this.lastPage = data.last_page
        if (
          data.data &&
          data.data.length &&
          this.currentPage === data.current_page
        ) {
          this.pending_mail_list.push(...data.data)
          $state.loaded()
          if (this.last_page <= this.current_page) $state.complete()
        } else {
          $state.complete()
        }
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    },
    async sendHoldinvitation(id = false) {
      if ((id !== null && typeof id !== 'object') || this.selections.length) {
        try {
          const { message, status, code } = await this.$axios.$post(
            'lm/common/send-hold-invitation-email',
            {
              ids:
                !id.target && id
                  ? [id]
                  : [...this.selections.map(({ id }) => id)],
            }
          )
          if (status || code === 200) {
            this.handleFilterChange()
            this.$toast.success(message)
          }
        } catch (error) {
          this.$toast.error(error.message)
        }
      } else {
        this.$toast.error('Select at least one pending email')
      }
    },
    toggleSortData(data) {
      if (this.sortData !== data) {
        this.sortData = data
        this.currentSort = 'ASC'
      } else {
        this.currentSort = this.currentSort === 'ASC' ? 'DESC' : 'ASC'
      }
      this.pending_mail_list = []
      this.handleFilterChange()
    },
  },
}
</script>
