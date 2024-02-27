<template>
  <div class="general-settings-right h-100">
    <div class="newAnalytics tableDetail customscrollbar">
      <div class="breadcrumb-links">
        <ul>
          <li>
            <a @click="$emit('backToGraph')">
              <svg
                id="Layer_1"
                class="back-icon blue mr-1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4468" transform="translate(-577 -181)">
                  <rect
                    id="Rectangle_3007"
                    x="577"
                    y="181"
                    class="fill-hide"
                    width="18"
                    height="18"
                  ></rect>
                  <g id="Group_4425" transform="translate(-514.168 -476.583)">
                    <path
                      id="Icon_material-backspace"
                      class="fill-color"
                      d="M1107.7,659.8h-11.3c-0.5,0-0.9,0.3-1.2,0.7l-4.1,6.1l4.1,6.1c0.3,0.4,0.7,0.7,1.2,0.7h11.3c0.8,0,1.5-0.7,1.5-1.5v-10.5C1109.2,660.5,1108.5,659.8,1107.7,659.8z"
                    ></path>
                    <g id="Group_4424">
                      <g id="Group_4422">
                        <path
                          id="Path_3527"
                          class="fill-white"
                          d="M1099.7,669.8c-0.4,0-0.7-0.3-0.7-0.8c0-0.2,0.1-0.4,0.2-0.5l5-5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.7,0,1l-5,5C1100.1,669.8,1099.9,669.8,1099.7,669.8z"
                        ></path>
                      </g>
                      <g id="Group_4423">
                        <path
                          id="Path_3528"
                          class="fill-white"
                          d="M1104.7,669.8c-0.2,0-0.4-0.1-0.5-0.2l-5-5c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0c0,0,0,0,0,0l5,5c0.3,0.3,0.3,0.8,0,1.1C1105.1,669.8,1104.9,669.8,1104.7,669.8L1104.7,669.8z"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              Downloaded Asset Analytics
            </a>
          </li>

          <li>
            <span>{{ breadcrumbsHeader }}</span>
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-end justify-content-between mb2">
        <ul class="assetsType">
          <li>
            <span>Filter By : </span>
            <div class="search-by">
              <Select2
                class="select2-hidden-accessible"
                :value="categoryBy"
                :options="categoryList"
                :attrs="{ minimumResultsForSearch: -1 }"
                @input="changeCategory"
              />
            </div>
          </li>
        </ul>
        <ul class="assetsTypeBox">
          <li
            :class="{ active: permissionBy == 'all' }"
            @click="assetsPermissionType('all')"
          >
            <div class="icons">
              <svg
                id="Layer_1"
                class="media-assets-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 16 16"
                xml:space="preserve"
              >
                <path
                  id="Path_24"
                  data-v-4a9a044d=""
                  d="M0,16V4.6h1.8V2.3l1.9,0V0H16v11.4h-1.9l0,2.3h-1.9V16L0,16z M11.1,14.7V5.9H1.2v8.7H11.1zM13,12.3V3.7H3v1h9.3v7.7H13z M14.8,10V1.3H4.9v1l9.3,0l0,7.8L14.8,10z"
                  class="fill-color"
                ></path>
              </svg>
            </div>
            <div class="content">
              <span>All Assets</span>
              <label>{{ allAssets }}</label>
            </div>
          </li>
          <li
            :class="{ active: permissionBy == 'public' }"
            @click="assetsPermissionType('public')"
          >
            <div class="icons">
              <svg
                id="Layer_1"
                class="public-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Public">
                  <g id="megaphone" transform="translate(0 -58.855)">
                    <g id="Group_39415" transform="translate(15.363 67.328)">
                      <g id="Group_39414">
                        <path
                          id="Path_40230"
                          class="fill-color"
                          d="M2.1,0H0.5C0.2,0,0,0.2,0,0.5s0.2,0.5,0.5,0.5h1.6c0.3,0,0.5-0.2,0.5-0.5S2.4,0,2.1,0L2.1,0z"
                        />
                      </g>
                    </g>
                    <g id="Group_39417" transform="translate(14.836 69.438)">
                      <g id="Group_39416">
                        <path
                          id="Path_40231"
                          class="fill-color"
                          d="M2,1.2L0.9,0.2c-0.2-0.2-0.5-0.2-0.7,0s-0.2,0.5,0,0.7L1.2,2C1.4,2.2,1.7,2.2,2,2S2.2,1.4,2,1.2z"
                        />
                      </g>
                    </g>
                    <g id="Group_39419" transform="translate(14.836 64.164)">
                      <g id="Group_39418">
                        <path
                          id="Path_40232"
                          class="fill-color"
                          d="M2,0.2c-0.2-0.2-0.5-0.2-0.7,0c0,0,0,0,0,0L0.2,1.2c-0.2,0.2-0.2,0.5,0,0.7s0.5,0.2,0.7,0L2,0.9C2.2,0.7,2.2,0.4,2,0.2C2,0.2,2,0.2,2,0.2z"
                        />
                      </g>
                    </g>
                    <g id="Group_39421" transform="translate(0 61)">
                      <g id="Group_39420">
                        <path
                          id="Path_40233"
                          class="fill-color"
                          d="M12.2,0c-0.8,0-1.4,0.6-1.6,1.3l-0.5,0.5C9.3,2.7,8.1,3.2,6.9,3.2H3.7C3,3.2,2.4,3.6,2.2,4.2H2.1C0.9,4.2,0,5.2,0,6.3c0,1.2,0.9,2.1,2.1,2.1h0.1c0.2,0.4,0.5,0.8,1,1v2.7c0,0.9,0.7,1.6,1.6,1.6c0.9,0,1.6-0.7,1.6-1.6c0,0,0,0,0,0V9.5h0.5c1.2,0,2.4,0.5,3.3,1.3l0.5,0.5c0.1,0.9,0.9,1.5,1.8,1.3c0.8-0.1,1.3-0.8,1.3-1.6V1.6C13.8,0.7,13.1,0,12.2,0z M2.1,7.4c-0.6,0-1-0.5-1-1.1c0-0.6,0.5-1,1-1V7.4z M5.3,12.1c0,0.3-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5V9.5h1.1V12.1z M6.3,8.4H3.7c-0.3,0-0.5-0.2-0.5-0.5V4.7c0-0.3,0.2-0.5,0.5-0.5h2.6L6.3,8.4z M10.6,9.8C9.7,9,8.6,8.6,7.4,8.5V4.2c1.2-0.1,2.3-0.6,3.2-1.4V9.8z M12.7,11.1c0,0.3-0.2,0.5-0.5,0.5l0,0c-0.3,0-0.5-0.2-0.5-0.5V1.6c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5L12.7,11.1z"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div class="content">
              <span>Public</span>
              <label>{{ publicAssets }}</label>
            </div>
          </li>
          <li
            :class="{ active: permissionBy == 'private' }"
            @click="assetsPermissionType('private')"
          >
            <div class="icons">
              <svg
                id="Layer_1"
                class="private-icon white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Private">
                  <g id="padlock_1_" transform="translate(-0.75)">
                    <path
                      id="Path_40234"
                      class="fill-color"
                      d="M14.8,18H4.7C3.8,18,3,17.2,3,16.3V8.4c0-0.9,0.8-1.7,1.7-1.7h10.1c0.9,0,1.7,0.8,1.7,1.7v7.9C16.5,17.2,15.7,18,14.8,18z M4.7,7.9c-0.3,0-0.6,0.3-0.6,0.6v7.9c0,0.3,0.3,0.6,0.6,0.6h10.1c0.3,0,0.6-0.3,0.6-0.6V8.4c0-0.3-0.3-0.6-0.6-0.6L4.7,7.9z"
                    />
                    <path
                      id="Path_40235"
                      class="fill-color"
                      d="M13.7,7.9c-0.3,0-0.6-0.3-0.6-0.6V4.5c0-1.9-1.5-3.4-3.4-3.4S6.4,2.6,6.4,4.5v2.8c0,0.3-0.3,0.6-0.6,0.6c-0.3,0-0.6-0.3-0.6-0.6V4.5C5.2,2,7.3,0,9.8,0s4.5,2,4.5,4.5v2.8C14.2,7.6,14,7.9,13.7,7.9z"
                    />
                    <path
                      id="Path_40236"
                      class="fill-color"
                      d="M9.8,12.8c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5S10.6,12.8,9.8,12.8L9.8,12.8z M9.8,10.9c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4l0,0C10.1,11,10,10.9,9.8,10.9z"
                    />
                    <path
                      id="Path_40237"
                      class="fill-color"
                      d="M9.8,15c-0.3,0-0.6-0.3-0.6-0.6v-2.1c0-0.3,0.3-0.6,0.6-0.5c0.3,0,0.5,0.2,0.5,0.5v2.1C10.3,14.7,10.1,15,9.8,15z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div class="content">
              <span>Private</span>
              <label>{{ privateAssets }}</label>
            </div>
          </li>
        </ul>
      </div>
      <div class="common-box bg-gray">
        <div class="table-list-view table-list-scrolling">
          <ul v-if="downloadSharedUrlAssetsList.length" class="thead">
            <li>
              <div
                :class="[
                  'categary-name sorting flex35',
                  sortingClass('display_file_name'),
                ]"
              >
                <span
                  @click="
                    sortValueModel = 'display_file_name'
                    sort('files', 'display_file_name', $sortToUpperCase)
                  "
                  >Assets Name</span
                >
              </div>
              <div
                :class="[
                  'collectionName sorting flex15',
                  sortingClass('collection_name'),
                ]"
              >
                <span
                  @click="
                    sortValueModel = 'collection_name'
                    sort('files', 'collection_name', $sortToUpperCase)
                  "
                  >Collection Name</span
                >
              </div>
              <div
                :class="[
                  'asset-size sorting flex10',
                  sortingClass('file_size'),
                ]"
              >
                <span
                  @click="
                    sortValueModel = 'file_size'
                    sort('files', 'file_size', $sortToTypedNumber)
                  "
                  >Asset Size</span
                >
              </div>
              <div class="update-by sorting flex15">
                <span>Uploaded By</span>
              </div>
              <div
                :class="[
                  'update-date sorting flex15',
                  sortingClass('updated_at'),
                ]"
              >
                <span
                  @click="
                    sortValueModel = 'updated_at'
                    sort('files', 'updated_at', $sortToTime)
                  "
                  >Last Modified</span
                >
              </div>
              <div
                :class="[
                  'total-download sorting flex10',
                  sortingClass('download_count'),
                ]"
              >
                <span
                  @click="
                    sortValueModel = 'download_count'
                    sort('files', 'download_count', $sortToTypedNumber)
                  "
                  >Total Download</span
                >
              </div>
            </li>
          </ul>
          <div class="customscrollbar no_footer">
            <ul class="tbody">
              <li v-for="file in downloadSharedUrlAssetsList" :key="file.id">
                <div class="categary-name tb-column flex35">
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
                        <span
                          v-if="file.is_deleted"
                          class="plan-status alert-danger"
                          >Deleted</span
                        >
                        <span
                          v-else-if="file.is_archive"
                          class="plan-status alert-primary"
                          >Archived</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="collectionName tb-column flex15">
                  <div class="top-column">
                    <label>{{
                      file.collection_name ? file.collection_name : '-'
                    }}</label>
                  </div>
                </div>
                <div class="asset-size tb-column flex10">
                  <div class="top-column">
                    <label>{{ $toHumanlySize(file.file_size) }}</label>
                  </div>
                </div>
                <div class="update-by tb-column flex15">
                  <div class="top-column">
                    <label>{{ file.user.name }}</label>
                  </div>
                </div>
                <div class="update-date tb-column flex15">
                  <div class="top-column">
                    <label>{{
                      $moment(file.updated_at).format('Do, MMM YYYY')
                    }}</label>
                  </div>
                </div>
                <div class="total-download tb-column flex10">
                  <div class="top-column">
                    <label>{{ file.download_count }}</label>
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
                    <EmptyState v-if="!downloadSharedUrlAssetsList.length" />
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
import Select2 from '~/components/plugins/Select2'
import analytics from '~/mixins/analytics'
import EmptyState from '~/components/theme/global/EmptyState'
import analyticsSorting from '~/mixins/analyticsSorting'

export default {
  components: {
    Select2,
    ContentLoader,
    EmptyState,
  },
  mixins: [analytics, analyticsSorting],
  props: {
    chartType: { type: String, required: true },
    breadcrumbsHeader: { type: String, required: true },
    loadCategoryList: { type: String, required: true },
    category: { type: String, required: true },
    startDate: { type: [Date, String, Object] },
    endDate: { type: [Date, String, Object] },
    isExcludeAdminData: { type: Boolean, default: false },
    isIncludeVersionHistory: { type: Boolean, default: false },
    permission: { type: String, required: false },
  },
  data() {
    return {
      categoryBy: this.category,
      downloadSharedUrlAssetsList: [],
      permissionBy: this.permission ? this.permission : 'all',
      completelyLoaded: false,
      isSortComplete: false,
      infiniteId: +new Date(),
      page: 1,
      lastPage: null,
      allAssets: 0,
      publicAssets: 0,
      privateAssets: 0,
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    categoryList() {
      let x = null
      switch (this.loadCategoryList) {
        case 'assetsDownloadBySharedUrl':
          x = this.sharedUrlTypeList
          break
      }
      return x
    },
    files: {
      get() {
        return this.downloadSharedUrlAssetsList
      },
      set(value) {
        this.downloadSharedUrlAssetsList = value
      },
    },
  },
  watch: {
    'sorting.toolbar.value'(sortValue) {
      this.sortValueModel = sortValue
    },
    sortValueModel(sortValueModel) {
      this.sorting.toolbar.value = sortValueModel
    },
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
    changeCategory(value) {
      this.categoryBy = value
      this.resetDownloadBySharedUrlAssetsList()
    },
    assetsPermissionType(permission) {
      this.permissionBy = permission
      this.resetDownloadBySharedUrlAssetsList()
    },
    resetDownloadBySharedUrlAssetsList() {
      this.downloadSharedUrlAssetsList = []
      this.page = 1
      this.infiniteId += 1
      this.completelyLoaded = false
      this.isSortComplete = false
    },
    async infiniteHandler($state) {
      if (this.completelyLoaded || this.isSortComplete) {
        $state.complete()
        return
      }
      let urlType = this.categoryBy
      if (this.categoryBy === 'collection shared url') {
        urlType = 'collection'
      }
      if (this.categoryBy === 'asset shared url') {
        urlType = 'share'
      }
      await this.$axios
        .$post(
          `digital-assets/analytics/assets-download-by-share-url-details?page=${this.page}`,
          {
            from_date: this.startDate,
            to_date: this.endDate,
            url_type: urlType,
            permission: this.permissionBy,
            include_version: this.isIncludeVersionHistory,
          }
        )
        .then(({ data }) => {
          this.allAssets = data.total
          this.publicAssets = data.public
          this.privateAssets = data.private
          this.lastPage = data.asset_data.last_page

          if (data.asset_data.data && data.asset_data.data.length) {
            if (
              parseInt(this.page) === parseInt(data.asset_data.current_page)
            ) {
              this.downloadSharedUrlAssetsList.push(...data.asset_data.data)
              $state.loaded()
              if (parseInt(this.lastPage) === parseInt(this.page)) {
                this.completelyLoaded = true
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
        .finally(() => this.$nextTick(() => (this.isSortComplete = false)))
    },
  },
}
</script>
