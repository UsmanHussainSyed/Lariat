<template>
  <div class="body-content position-relative">
    <div v-if="!assetEmbeddingAllowed" class="common-overaly has-relative">
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
    <div
      class="body-content-auto w-100"
      :class="{ 'common-blur': !assetEmbeddingAllowed }"
    >
      <div
        class="common-box-header d-flex align-items-center justify-content-between"
      >
        <h2 class="title">Embedded URLs</h2>
        <div v-if="total > 0" class="table-filter">
          <ul>
            <li>{{ total }} Embedded URL(s)</li>
            <li>
              <div class="search-by small-wd">
                <Select2
                  :value="per_page"
                  :options="sharedUrlSizeFilter"
                  :attrs="{ minimumResultsForSearch: -1 }"
                  @input="updatePageSize"
                />
              </div>
            </li>
            <li v-show="!!(selectedIds || []).length">
              <a
                :disabled="deleting"
                href="javascript:void(0);"
                class="btn"
                data-toggle="modal"
                :data-target="deleting ? null : '#delete-url'"
                >{{ deleting ? 'Deleting...' : 'Delete Selected' }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="common-box bg-gray">
        <div class="table-list-view table-list-scrolling">
          <EmbedListingHeader
            v-if="(urls || []).length"
            :sort-value="sorting.value"
            :reverse="sorting.desc"
            :selected="allSelected"
            @selection-change="onHeaderSelect"
            @sort="sortList"
          />
          <div class="customscrollbar no_footer">
            <transition-group
              v-if="(urls || []).length"
              tag="ul"
              name="slide-up"
              class="tbody"
            >
              <EmbedListingItem
                v-for="(url, i) in urls"
                :key="url.id"
                :url="url"
                :selected="selectedIds.includes(url.id)"
                :style="`transition-delay: ${i * 25}ms`"
                :deleting="deleting && selectedIds.includes(url.id)"
                @selection-change="updateSelection(url.id, $event)"
                @deleted="onUrlDeleted"
              />
            </transition-group>
            <div v-else>
              <div key="no-data" class="no-data-found">
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
                    <g id="Group_4457" transform="translate(-190.348 -177.624)">
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

                  <p class="my-3">No URLs Found</p>
                </div>
              </div>
            </div>
            <Pagination
              v-if="last_page > 1"
              :last-page="last_page"
              :current-page.sync="current_page"
            />
          </div>
        </div>
      </div>
    </div>
    <!--  Delete URL Modal  -->
    <div id="delete-url" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Embed URL(s)</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"
                ><svg
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
                    />
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    />
                  </g></svg
              ></span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p>
              Are you sure you want to delete the <strong>Embed URLs</strong>?
            </p>
            <div class="btn-group">
              <a
                href="javascript:void(0);"
                class="btn btn-gray"
                data-dismiss="modal"
                >No</a
              >
              <a
                href="javascript:void(0);"
                class="btn"
                data-dismiss="modal"
                @click="deleteUrls"
                >Yes</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmbedListingItem from '~/components/dam/EmbedListing/EmbedListingItem'
import EmbedListingHeader from '~/components/dam/EmbedListing/EmbedListingHeader'
import Pagination from '~/components/dam/AssetList/Pagination'
import Select2 from '~/components/plugins/Select2'

export default {
  components: {
    EmbedListingItem,
    EmbedListingHeader,
    Pagination,
    Select2,
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  asyncData({ $axios, $getWorkspaceId, error, $auth }) {
    return $axios
      .$get(
        `digital-assets/embed-code-list?workspace_id=${$getWorkspaceId()}&total_record=12`
      )
      .then(({ data = {} }) => ({
        current_page: data.current_page,
        last_page: data.last_page,
        total: data.total,
        per_page: data.per_page,
        urls: data.data.map(({ workspace, ...e }) => ({
          ...e,
          userName: $auth?.user?.name || '-',
        })),
      }))
      .catch((e) => error(e))
  },
  data() {
    return {
      deleting: false,
      sorting: {
        value: 'updated_at',
        desc: true,
      },
      selectedIds: [],
      allSelected: false,
      sharedUrlSizeFilter: [
        { text: '12', id: '12' },
        { text: '20', id: '20' },
        { text: '40', id: '40' },
        { text: '80', id: '80' },
        { text: '100', id: '100' },
      ],
    }
  },
  computed: {
    assetEmbeddingAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_embedding?.enable
    },
  },
  watch: {
    'sorting.value'(value) {
      this.sortList(value)
    },
    current_page(page) {
      if (page === -1) {
        this.$router.replace({
          query: null,
          hash: this.hashParam && `#${this.hashParam}`,
        })
      } else {
        this.$router.replace({
          query: { page },
          hash: this.hashParam && `#${this.hashParam}`,
        })
        this.getData()
      }
    },
  },
  methods: {
    updatePageSize(e) {
      this.per_page = e
      this.current_page = 1
      this.$router.replace({
        query: { page: this.current_page },
        hash: this.hashParam && `#${this.hashParam}`,
      })
      this.getData()
    },
    onHeaderSelect(selected) {
      this.selectedIds = selected ? this.urls.map((e) => e.id) : []
      this.allSelected = selected
    },
    getData() {
      if (!this.assetEmbeddingAllowed) return
      this.$axios
        .$get(
          `digital-assets/embed-code-list?workspace_id=${this.$getWorkspaceId()}&page=${
            this.current_page
          }&total_record=${this.per_page || 12}`
        )
        .then(({ data = {} }) => {
          this.allSelected = false
          this.current_page = data.current_page
          this.last_page = data.last_page
          this.total = data.total
          this.per_page = data.per_page
          this.urls = data.data.map(({ workspace, ...e }) => ({
            userName: workspace?.user_email || '-',
            ...e,
          }))
          this.selectedIds = []
          this.allSelected = false
        })
        .catch(console.error)
    },
    onUrlDeleted(urlId) {
      if (!this.assetEmbeddingAllowed) return
      this.urls = this.urls.filter(({ id }) => id !== urlId)
      this.updateSelection(urlId, false)
      if (!this.urls.length) {
        if (this.last_page === this.current_page && this.last_page > 1) {
          this.$router.replace({
            query: { page: this.last_page - 1 },
            hash: this.hashParam && `#${this.hashParam}`,
          })
          this.current_page = this.last_page - 1
        }
        this.getData()
      } else if (this.total > 0) this.total -= 1
    },
    updateSelection(urlId, selection) {
      if (!this.assetEmbeddingAllowed) return
      if (!selection && this.selectedIds.includes(urlId)) {
        this.selectedIds = this.selectedIds.filter((e) => e !== urlId)
      } else if (selection && !this.selectedIds.includes(urlId)) {
        this.selectedIds.push(urlId)
      }
      this.allSelected = this.urls.every((e) => this.selectedIds.includes(e.id))
    },
    sortList(value) {
      if (!this.assetEmbeddingAllowed) return
      let desc = false

      if (this.sorting.value !== value) desc = false
      else desc = !this.sorting.desc

      this.urls = [...this.urls].sort(this.$sortBy(value, desc))
      this.$nextTick(() => {
        this.sorting.value = value
        this.sorting.desc = desc
      })
    },
    deleteUrls() {
      if (!this.assetEmbeddingAllowed) return
      if (!this.selectedIds?.length || this.deleting) return
      this.deleting = true
      this.$axios
        .$post(`digital-assets/remove-embed-code`, {
          workspace_id: this.$getWorkspaceId(),
          asset_version_ids: this.selectedIds,
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.urls = this.urls.filter(
            (url) => !this.selectedIds.includes(url.id)
          )
          if (!this.urls.length) {
            if (this.last_page === this.current_page && this.last_page > 1) {
              this.$router.replace({
                query: { page: this.last_page - 1 },
                hash: this.hashParam && `#${this.hashParam}`,
              })
              this.current_page = this.last_page - 1
            }
            this.getData()
          } else {
            this.total -= this.selectedIds.length
            if (this.total < 0) this.total = 0
          }
          this.selectedIds = []
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
        .finally(() => (this.deleting = false))
    },
  },
}
</script>
