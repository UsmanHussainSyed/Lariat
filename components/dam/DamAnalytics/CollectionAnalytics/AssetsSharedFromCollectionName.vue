<template>
  <div v-if="collectionTypeName != 'download'" class="tableDetail">
    <div
      class="common-box"
      :class="{ 'bg-gray': assetsSharedFromCollectionNameList.length }"
    >
      <div class="table-list-view table-list-scrolling">
        <ul v-if="assetsSharedFromCollectionNameList.length" class="thead">
          <li>
            <div
              :class="[
                'categary-name sorting flex62',
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
            <div class="version sorting flex8">
              <span></span>
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
            <div
              :class="[
                'total-shared sorting flex10',
                sortingClass('total_share'),
              ]"
            >
              <span
                @click="
                  sortValueModel = 'total_share'
                  sort('files', 'total_share', $sortToTypedNumber)
                "
                >Total Shared</span
              >
            </div>
          </li>
        </ul>
        <div class="customscrollbar no_footer">
          <ContentLoader
            v-if="listLoading && !assetsSharedFromCollectionNameList.length"
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
          <ul v-if="assetsSharedFromCollectionNameList.length" class="tbody">
            <li
              v-for="file in assetsSharedFromCollectionNameList"
              :key="file.id"
            >
              <div class="categary-name tb-column flex62">
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
              <div class="version tb-column flex8">
                <div class="top-column">
                  <label v-if="file.version != 1">V{{ file.version }}</label>
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
              <div class="total-shared tb-column flex10">
                <div class="top-column">
                  <label>{{ file.total_share }}</label>
                </div>
              </div>
            </li>
          </ul>
          <EmptyState
            v-if="!listLoading && !assetsSharedFromCollectionNameList.length"
          />
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
    collectionId: { type: Number, required: true },
    collectionTypeName: { type: String, required: true },
    startDate: { type: [Date, String, Object] },
    endDate: { type: [Date, String, Object] },
  },
  data() {
    return {
      listLoading: false,
      assetsSharedFromCollectionNameList: [],
      sortValueModel: 'display_file_name',
    }
  },
  computed: {
    files: {
      get() {
        return this.assetsSharedFromCollectionNameList
      },
      set(value) {
        this.assetsSharedFromCollectionNameList = value
      },
    },
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.getAssetsSharedFromCollection()
      },
    },
    collectionId: {
      deep: true,
      handler() {
        this.getAssetsSharedFromCollection()
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
    this.getAssetsSharedFromCollection()
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
    async getAssetsSharedFromCollection() {
      this.listLoading = true
      await this.$axios
        .$post('digital-assets/analytics/top-assets-by-share', {
          from_date: this.startDate,
          to_date: this.endDate,
          collection_id: this.collectionId,
        })
        .then(({ data }) => {
          this.assetsSharedFromCollectionNameList = data.assets
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
  },
}
</script>
