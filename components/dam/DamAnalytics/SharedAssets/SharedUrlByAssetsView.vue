<template>
  <div class="common-box bg-gray">
    <div class="table-list-view small-height table-list-scrolling">
      <ul class="thead">
        <li>
          <div class="categary-name sorting flex60">
            <span>Asset Name</span>
          </div>
          <div class="asset-size sorting flex15">
            <span>Asset Size</span>
          </div>
          <div class="asset-types sorting flex15">
            <span>Asset Type</span>
          </div>
          <div class="total-download sorting flex10">
            <span>Total Download</span>
          </div>
        </li>
      </ul>
      <div class="customscrollbar no_footer">
        <ContentLoader
          v-if="listLoading && !sharedUrlViewByAssetsList.length"
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
        <ul v-if="sharedUrlViewByAssetsList.length" class="tbody">
          <li
            v-for="(file, assetsIndex) in sharedUrlViewByAssetsList"
            :key="file.id"
            class="collectionImage h-auto open"
          >
            <div class="w-100 d-flex align-items-center">
              <a
                class="second-lavel"
                :href="`#img${assetsIndex}${file.id}`"
                aria-expanded="false"
                data-toggle="collapse"
                @click.prevent="getSharedUrlList(assetsIndex, file)"
              >
                <svg
                  id="Layer_1"
                  class="toggle-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <g id="Group_4481" transform="translate(-871 -754)">
                    <rect
                      id="Rectangle_3019"
                      x="871"
                      y="754"
                      class="fill-hide"
                      width="18"
                      height="18"
                    />
                    <path
                      id="Path_3404"
                      class="fill-color"
                      d="M880,768.6c-0.5,0-1-0.2-1.3-0.6l-7.1-7.1c-0.7-0.7-0.7-1.9,0-2.7c0.4-0.3,0.8-0.5,1.3-0.5h14.2c1,0,1.9,0.9,1.9,1.9c0,0.5-0.2,1-0.6,1.3l-7.1,7.1C881,768.4,880.5,768.6,880,768.6L880,768.6z M872.9,759.3c-0.2,0-0.3,0.1-0.3,0.3c0,0.1,0,0.2,0.1,0.2l7.1,7.1c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l7.1-7.1c0.1-0.1,0.1-0.3,0-0.4c0,0,0,0,0,0c0-0.1-0.1-0.1-0.2-0.1L872.9,759.3z"
                    />
                  </g>
                </svg>
              </a>
              <div class="categary-name tb-column flex60">
                <div class="media">
                  <div class="media-left">
                    <div class="categary-image">
                      <img
                        :src="
                          file.thumbnail_file !== null
                            ? file.thumbnail_file
                            : file.preview_image
                        "
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
              <div class="asset-size tb-column flex15">
                <div class="top-column">
                  <label>{{ $toHumanlySize(file.file_size) }}</label>
                </div>
              </div>
              <div class="asset-types tb-column flex15">
                <div class="top-column">
                  <label>{{ file.file_type }}</label>
                </div>
              </div>
              <div class="total-download tb-column flex10">
                <div class="top-column">
                  <label>{{ file.download_count }}</label>
                </div>
              </div>
            </div>
            <div class="h-auto w-100 mt0">
              <div :id="`img${assetsIndex}${file.id}`" class="collapse w-100">
                <div
                  v-if="assetsDynamicIndex == assetsIndex"
                  class="dataLoader"
                >
                  <svg
                    id="Layer_1"
                    class="refresh-icon fa-spin"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4491" transform="translate(-1206 -466)">
                      <rect
                        id="Rectangle_3030"
                        x="1206"
                        y="466"
                        class="fill-white"
                        width="18"
                        height="18"
                      ></rect>
                      <g
                        id="Icon_feather-refresh-cw"
                        transform="translate(-369.921 -994.994)"
                      >
                        <g id="Path_3566">
                          <path
                            id="Path_3569"
                            class="fill-color"
                            d="M1593.2,1469.2h-4.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h3.8v-3.8c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7v4.5C1593.9,1468.9,1593.6,1469.2,1593.2,1469.2z"
                          ></path>
                        </g>
                        <g id="Path_3567">
                          <path
                            id="Path_3570"
                            class="fill-color"
                            d="M1576.7,1476.7c-0.4,0-0.7-0.3-0.7-0.7v-4.5c0-0.4,0.3-0.7,0.7-0.7h4.5c0.4,0,0.7,0.3,0.7,0.7s-0.3,0.7-0.7,0.7h-3.8v3.8C1577.4,1476.4,1577.1,1476.7,1576.7,1476.7z"
                          ></path>
                        </g>
                        <g id="Path_3568">
                          <path
                            id="Path_3571"
                            class="fill-color"
                            d="M1584.9,1477.5c-2,0-3.9-0.8-5.3-2.2l-3.5-3.3c-0.3-0.3-0.3-0.7,0-1c0.3-0.3,0.7-0.3,1,0l3.5,3.3c2.3,2.4,6.2,2.4,8.5,0c0.6-0.6,1.1-1.4,1.4-2.3c0.1-0.4,0.5-0.6,0.9-0.5c0.4,0.1,0.6,0.5,0.5,0.9c0,0,0,0,0,0C1590.9,1475.5,1588.1,1477.5,1584.9,1477.5L1584.9,1477.5z M1593.2,1469.2c-0.2,0-0.4-0.1-0.5-0.2l-3.5-3.3c-2.3-2.4-6.2-2.4-8.5,0c-0.6,0.6-1.1,1.4-1.4,2.3c-0.1,0.4-0.6,0.6-0.9,0.4c-0.4-0.1-0.6-0.5-0.4-0.9c1.4-3.9,5.7-5.9,9.6-4.6c1.1,0.4,2,1,2.8,1.8l3.5,3.3c0.3,0.3,0.3,0.7,0,1C1593.6,1469.1,1593.4,1469.2,1593.2,1469.2L1593.2,1469.2z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Loading...
                </div>
                <div v-else class="common-box bg-gray">
                  <ul class="thead">
                    <li>
                      <div class="categary-name sorting flex50">
                        <span>Shared URL</span>
                      </div>
                      <!--                      <div class="collection sorting flex10">
                        <span>URL Type</span>
                      </div>-->
                      <div class="user-type sorting flex10">
                        <span>Generated By</span>
                      </div>
                      <div class="generated-date sorting flex10">
                        <span>Generated Date</span>
                      </div>
                      <div class="generated-source sorting flex10">
                        <span>Generated Source</span>
                      </div>
                      <!--                      <div class="no-asset sorting flex10">
                        <span>Number of Asset</span>
                      </div>-->
                      <div class="url-count sorting flex10">
                        <span>Total Impressions</span>
                      </div>
                      <div class="total-download sorting flex10">
                        <span>Total Download</span>
                      </div>
                    </li>
                  </ul>
                  <ul class="tbody">
                    <li
                      v-for="url in file.sharedUrlList"
                      :key="url.id"
                      class="collectionURL h-auto open"
                    >
                      <div class="w-100 d-flex align-items-center">
                        <div class="categary-name tb-column flex50">
                          <div class="top-column">
                            <span>{{
                              url.share_url
                                | normalizedUrl(url.generated_source)
                            }}</span>
                          </div>
                        </div>
                        <!--                        <div class="collection tb-column flex10">
                          <div class="top-column">
                            <label>{{
                              collectionsType == 'collection'
                                ? 'Collection'
                                : 'Non Collection'
                            }}</label>
                          </div>
                        </div>-->
                        <div class="user-type tb-column flex10">
                          <div class="top-column">
                            <label>{{ url.user ? url.user.name : '-' }}</label>
                          </div>
                        </div>
                        <div class="generated-date tb-column flex10">
                          <div class="top-column">
                            <label>{{
                              $moment(url.created_at).format('Do, MMM YYYY')
                            }}</label>
                          </div>
                        </div>
                        <div class="generated-source tb-column flex10">
                          <div class="top-column">
                            <label>{{
                              url.generated_source | normalizedSource
                            }}</label>
                          </div>
                        </div>
                        <!--                        <div class="no-asset tb-column flex10">
                          <div class="top-column">
                            <label>{{ url.total_assets }}</label>
                          </div>
                        </div>-->
                        <div class="url-count tb-column flex10">
                          <div class="top-column">
                            <label>{{ url.total_visited }}</label>
                          </div>
                        </div>
                        <div class="total-download tb-column flex10">
                          <div class="top-column">
                            <label>{{ url.download_count }}</label>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <EmptyState v-if="!listLoading && !sharedUrlViewByAssetsList.length" />
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import EmptyState from '~/components/theme/global/EmptyState'
import damShareUrl from '~/mixins/damShareUrl'

export default {
  components: {
    ContentLoader,
    EmptyState,
  },
  mixins: [damShareUrl],
  props: {
    collectionChartType: { type: String, required: true },
    categoryBy: { type: String, required: true },
    startDate: { type: [Date, String, Object] },
    endDate: { type: [Date, String, Object] },
    collectionsType: { type: String, required: false },
  },
  data() {
    return {
      categoryFilterBy: this.categoryBy,
      sharedUrlViewByAssetsList: [],
      collectionType: this.collectionChartType,
      collectionsTypeFilter: this.collectionsType,
      viewedBy: this.categoryByShared,
      assetsDynamicIndex: null,
      listLoading: false,
    }
  },
  watch: {
    categoryBy: {
      deep: true,
      handler(val) {
        this.categoryFilterBy = val
        this.sharedUrlViewByAssetsList = []
        this.sharedUrlViewByAssets()
      },
    },

    collectionsType: {
      deep: true,
      handler(val) {
        if (val === 'collection') {
          this.collectionType = 'collectionSharedUrl'
        } else {
          this.collectionType = 'nonCollectionSharedUrl'
        }
        this.collectionsTypeFilter = val
        this.sharedUrlViewByAssetsList = []
        this.sharedUrlViewByAssets()
      },
    },
  },
  mounted() {
    this.sharedUrlViewByAssets()
  },
  methods: {
    sharedUrlViewByAssets() {
      if (this.collectionType === 'collectionSharedUrl') {
        this.getCollectionSharedUrlByAssetsList()
      }
      if (this.collectionType === 'nonCollectionSharedUrl') {
        this.getNonCollectionSharedUrlByAssetsList()
      }
    },
    async getCollectionSharedUrlByAssetsList() {
      let userType = this.categoryFilterBy
      if (this.categoryFilterBy === 'frontend users') {
        userType = 'frontend_user'
      }
      this.listLoading = true
      await this.$axios
        .$post(`digital-assets/analytics/collection-share-url-view-by-assets`, {
          from_date: this.startDate,
          to_date: this.endDate,
          user_type: userType,
        })
        .then(({ data }) => {
          if (data && data.length) {
            this.sharedUrlViewByAssetsList.push(
              ...data.map((item) => ({
                ...item,
                sharedUrlList: [],
                expand: false,
              }))
            )
          }
          this.listLoading = false
        })
        .catch((e) => {})
    },
    async getNonCollectionSharedUrlByAssetsList() {
      let userType = this.categoryFilterBy
      if (this.categoryFilterBy === 'frontend users') {
        userType = 'frontend_user'
      }
      this.listLoading = true
      await this.$axios
        .$post(
          `digital-assets/analytics/non-collection-share-url-view-by-assets`,
          {
            from_date: this.startDate,
            to_date: this.endDate,
            user_type: userType,
          }
        )
        .then(({ data }) => {
          if (data && data.length) {
            this.sharedUrlViewByAssetsList.push(
              ...data.map((item) => ({
                ...item,
                sharedUrlList: [],
                expand: false,
              }))
            )
          }
          this.listLoading = false
        })
        .catch((e) => {})
    },
    async getSharedUrlList(index, url) {
      this.sharedUrlViewByAssetsList[index].expand =
        !this.sharedUrlViewByAssetsList[index].expand
      let userType = this.categoryFilterBy
      if (this.categoryFilterBy === 'frontend users') {
        userType = 'frontend_user'
      }
      if (this.sharedUrlViewByAssetsList[index].expand) {
        !this.sharedUrlViewByAssetsList[index].sharedUrlList.length &&
          (this.assetsDynamicIndex = index)
        await this.$axios
          .$post(
            this.collectionsTypeFilter === 'collection'
              ? 'digital-assets/analytics/collection-assets-share-link'
              : 'digital-assets/analytics/non-collection-assets-share-link',
            {
              from_date: this.startDate,
              to_date: this.endDate,
              user_type: userType,
              asset_id: url.id,
            }
          )
          .then(({ data }) => {
            this.sharedUrlViewByAssetsList[index].sharedUrlList = data
            this.assetsDynamicIndex = null
          })
          .catch(this.$errorToast)
      }
    },
  },
}
</script>
