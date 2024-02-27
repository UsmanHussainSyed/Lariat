<template>
  <div class="tableDetail">
    <div
      class="common-box"
      :class="{ 'bg-gray': mostDownloadedAssetsList.length }"
    >
      <div class="table-list-view table-list-scrolling">
        <ul v-if="mostDownloadedAssetsList.length" class="thead">
          <li>
            <div
              :class="[
                'categary-name sorting flex40',
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
              :class="['asset-type sorting flex10', sortingClass('file_type')]"
            >
              <span
                @click="
                  sortValueModel = 'file_type'
                  sort('files', 'file_type', $sortToUpperCase)
                "
                >Asset Type</span
              >
            </div>
            <div
              :class="['asset-size sorting flex10', sortingClass('file_size')]"
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
          <ContentLoader
            v-if="listLoading && !mostDownloadedAssetsList.length"
            :speed="1"
            :animate="true"
            :width="400"
            :height="100"
            class="normalLoader"
          >
            <rect x="0" y="-1" rx="0" ry="0" width="400" height="13" />
            <rect x="0" y="15" rx="0" ry="0" width="400" height="13" />
            <rect x="0" y="31" rx="0" ry="0" width="400" height="13" />
            <rect x="0" y="47" rx="0" ry="0" width="400" height="13" />
          </ContentLoader>
          <ul v-if="mostDownloadedAssetsList.length" class="tbody">
            <li v-for="file in mostDownloadedAssetsList" :key="file.id">
              <div class="categary-name tb-column flex50">
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
              <div class="asset-type tb-column flex10">
                <div class="top-column">
                  <label>{{ file.file_type }}</label>
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
          </ul>
          <EmptyState v-if="!listLoading && !mostDownloadedAssetsList.length" />
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
      mostDownloadedAssetsList: [],
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    files: {
      get() {
        return this.mostDownloadedAssetsList
      },
      set(value) {
        this.mostDownloadedAssetsList = value
      },
    },
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.getMostDownloadedAssets()
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
    this.getMostDownloadedAssets()
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
    async getMostDownloadedAssets() {
      this.listLoading = true
      await this.$axios
        .$post('digital-assets/analytics/most-download-assets', {
          from_date: this.startDate,
          to_date: this.endDate,
        })
        .then(({ data }) => {
          this.mostDownloadedAssetsList = data
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
  },
}
</script>
