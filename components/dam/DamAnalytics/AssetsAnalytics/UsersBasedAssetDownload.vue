<template>
  <div class="tableDetail">
    <div
      class="common-box"
      :class="{ 'bg-gray': topUserBasedDownloadedAssetsList.length }"
    >
      <div class="table-list-view table-list-scrolling">
        <ul v-if="topUserBasedDownloadedAssetsList.length" class="thead">
          <li>
            <div class="user-name sorting flex30">
              <span>User Name</span>
            </div>
            <div class="user-type sorting flex25">
              <span>User Type</span>
            </div>
            <div
              :class="[
                'user-bandwidth sorting flex25',
                sortingClass('band_width'),
              ]"
            >
              <span
                @click="
                  sortValueModel = 'band_width'
                  sort('files', 'band_width', $sortToTypedNumber)
                "
                >User Bandwidth</span
              >
            </div>
            <div
              :class="[
                'total-download sorting flex20',
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
          <div v-if="!userAnalyticsAllowed">
            <img
              :src="require('~/assets/img/blurred-images/user-analytics.png')"
              style="width: 100%"
            />
            <div class="common-overaly">
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
          </div>
          <template v-else>
            <ContentLoader
              v-if="listLoading && !topUserBasedDownloadedAssetsList.length"
              :speed="1"
              :animate="true"
              :width="300"
              :height="140"
              class="normalLoader"
            >
              <rect x="0" y="-1" rx="0" ry="0" width="400" height="13" />
              <rect x="0" y="15" rx="0" ry="0" width="400" height="13" />
              <rect x="0" y="31" rx="0" ry="0" width="400" height="13" />
              <rect x="0" y="47" rx="0" ry="0" width="400" height="13" />
            </ContentLoader>
            <ul v-if="topUserBasedDownloadedAssetsList.length" class="tbody">
              <li
                v-for="file in topUserBasedDownloadedAssetsList"
                :key="file.id"
              >
                <div class="user-name tb-column flex30">
                  <div class="top-column">
                    <label>{{ file.user.name }}</label>
                  </div>
                </div>
                <div class="user-type tb-column flex25">
                  <div class="top-column">
                    <label>{{
                      file.is_backend_download ? 'Admin' : 'Frontend User'
                    }}</label>
                  </div>
                </div>
                <div class="user-bandwidth tb-column flex25">
                  <div class="top-column">
                    <label>{{ $toHumanlySize(file.band_width) }}</label>
                  </div>
                </div>
                <div class="total-download tb-column flex20">
                  <div class="top-column">
                    <label>{{ file.download_count }}</label>
                  </div>
                </div>
              </li>
            </ul>
            <EmptyState
              v-if="!listLoading && !topUserBasedDownloadedAssetsList.length"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import EmptyState from '~/components/theme/global/EmptyState'
import analyticsSorting from '~/mixins/analyticsSorting'

export default {
  components: {
    ContentLoader,
    EmptyState,
  },
  mixins: [analyticsSorting],
  props: {
    startDate: { type: [Date, String, Object] },
    endDate: { type: [Date, String, Object] },
  },
  data() {
    return {
      listLoading: false,
      topUserBasedDownloadedAssetsList: [],
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    userAnalyticsAllowed() {
      return !!this.$auth.user?.subscription_features?.user_analytics?.enable
    },
    files: {
      get() {
        return this.topUserBasedDownloadedAssetsList
      },
      set(value) {
        this.topUserBasedDownloadedAssetsList = value
      },
    },
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.getTopUserBaseDownloadedAssets()
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
    this.getTopUserBaseDownloadedAssets()
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
    async getTopUserBaseDownloadedAssets() {
      if (!this.userAnalyticsAllowed) return
      this.listLoading = true
      await this.$axios
        .$post('digital-assets/analytics/top-user-based-on-download', {
          from_date: this.startDate,
          to_date: this.endDate,
        })
        .then(({ data }) => {
          this.topUserBasedDownloadedAssetsList = data
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
  },
}
</script>
