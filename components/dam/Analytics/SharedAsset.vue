<template>
  <div class="assets-list-permission h-100">
    <h4 class="title">
      <a class="back" @click.capture.stop="$emit('closeDetail')">
        <svg
          id="Layer_1"
          class="back-icon blue"
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
        Back
      </a>
    </h4>
    <div v-if="asset" class="d-flex align-items-center justify-content-between">
      <h4>{{ asset.display_file_name }}</h4>
      <ul class="assetsType justify-content-end">
        <li>
          <div class="search-by">
            <Select2
              :value="isCollection"
              :options="categoriesObject"
              :attrs="{ minimumResultsForSearch: -1 }"
              :disabled="true"
              @input="goToCategory"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="common-box bg-gray">
      <div class="table-list-view table-list-scrolling">
        <ShareLinkHeader
          key="header"
          :reverse="linkList.desc"
          :sort-value.sync="linkList.value"
          @sort="sortList"
        />
        <div class="customscrollbar">
          <div
            v-if="loading"
            style="margin: auto; overflow: hidden; width: 97%"
            class="pb-3"
          >
            <ContentLoader
              :speed="1"
              :animate="true"
              :width="450"
              :height="200"
              class="normalLoader"
            >
              <rect x="0" y="7" rx="4" ry="4" width="450" height="40" />
              <rect x="0" y="53" rx="4" ry="4" width="450" height="40" />
              <rect x="0" y="99" rx="4" ry="4" width="450" height="40" />
              <rect x="0" y="145" rx="4" ry="4" width="450" height="40" />
            </ContentLoader>
          </div>
          <ul v-else class="tbody">
            <template v-if="assetLinkList.length">
              <li v-for="sharedLink in assetLinkList" :key="sharedLink.id">
                <div class="share-url tb-column flex50">
                  <div class="top-column">
                    <div class="share-url">
                      <label>
                        <component
                          :is="
                            sharedLink.is_active == 0 ||
                            sharedLink.deleted_at != null ||
                            sharedLink.is_expired
                              ? 'span'
                              : 'a'
                          "
                          :href="
                            (sharedLink.is_active == 0 ||
                            sharedLink.deleted_at != null ||
                            sharedLink.is_expired
                              ? ''
                              : sharedLink.share_url)
                              | normalizedUrl(sharedLink.generated_source)
                          "
                          :style="{
                            'user-select':
                              sharedLink.is_active == 0 ||
                              sharedLink.deleted_at != null ||
                              sharedLink.is_expired
                                ? 'none'
                                : '',
                          }"
                          target="__blank"
                        >
                          <component
                            :is="
                              sharedLink.is_active == 0 ||
                              sharedLink.deleted_at != null ||
                              sharedLink.is_expired
                                ? 's'
                                : ''
                            "
                          >
                            {{
                              sharedLink.share_url
                                | normalizedUrl(sharedLink.generated_source)
                            }}
                          </component>
                          {{
                            sharedLink.is_active == 0 ||
                            sharedLink.deleted_at != null ||
                            sharedLink.is_expired
                              ? ''
                              : sharedLink.share_url
                                | normalizedUrl(sharedLink.generated_source)
                          }}
                        </component>
                        <span
                          v-if="sharedLink.deleted_at != null"
                          class="ml-3 plan-status alert-danger"
                          >Deleted</span
                        >
                        <span
                          v-else-if="sharedLink.is_active == 0"
                          class="ml-3 plan-status alert-warning"
                          >Revoked</span
                        >
                        <span
                          v-else-if="sharedLink.is_expired"
                          class="ml-3 plan-status alert-secondary"
                          >Expired</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
                <div class="generated-by tb-column text-center flex10">
                  <div class="top-column">
                    <label> {{ sharedLink.userName }}</label>
                  </div>
                </div>
                <div class="generated-date tb-column text-center flex10">
                  <div class="top-column">
                    <label
                      v-tooltip="$moment(sharedLink.created_at).format('LL LT')"
                    >
                      {{
                        $moment(sharedLink.created_at).format('Do MMM, YYYY')
                      }}</label
                    >
                  </div>
                </div>
                <div class="generated-source tb-column text-center flex10">
                  <div class="top-column">
                    <label>{{
                      sharedLink.generated_source | normalizedSource
                    }}</label>
                  </div>
                </div>
                <div class="total-download tb-column text-center flex10">
                  <div class="top-column">
                    <label>{{ sharedLink.total_visited }}</label>
                  </div>
                </div>
                <div class="total-share tb-column text-center flex10">
                  <div class="top-column">
                    <label>{{
                      sharedLink.total_download
                        ? sharedLink.total_download
                        : '0'
                    }}</label>
                  </div>
                </div>
              </li>
            </template>

            <div v-else class="no-data-found">
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
                <p>No assets yet!</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import ShareLinkHeader from '~/components/dam/AssetList/ShareLinkHeader'
import Select2 from '~/components/plugins/Select2'
import damShareUrl from '~/mixins/damShareUrl'

export default {
  components: {
    Select2,
    ContentLoader,
    ShareLinkHeader,
  },
  mixins: [damShareUrl],
  props: {
    asset: { type: Object, default: () => ({}) },
    dates: { type: Object, default: () => ({}) },
    showDetail: { type: Boolean, default: false },
    isCollection: { type: String, required: true },
  },
  data() {
    return {
      linkList: {
        value: 'share_url',
        desc: true,
      },
      categoriesObject: [
        { text: 'All', id: 'all' },
        { text: 'Collection', id: 'collection' },
        { text: 'Non-collection', id: 'non-collection' },
      ],
      DATE_FORMAT: 'YYYY-MM-DD',
      assetLinkList: [],
      loading: false,
    }
  },
  watch: {
    asset: {
      deep: true,
      handler() {
        this.assetDetail()
      },
    },
    dates: {
      deep: true,
      handler() {
        if (this.showDetail === true) {
          this.assetDetail()
        }
      },
    },
    'linkList.value'(value) {
      this.sortList(value)
    },
  },

  methods: {
    sortList(value) {
      let desc = false

      if (this.linkList.value !== value) desc = false
      else desc = !this.linkList.desc

      this.assetLinkList = [...this.assetLinkList].sort(
        this.$sortBy(value, desc)
      )
      this.$nextTick(() => {
        this.linkList.value = value
        this.linkList.desc = desc
      })
    },
    async assetDetail() {
      this.loading = true
      const postData = {
        url_workspace_id: this.$getWorkspaceId(),
        workspace_id: this.$getWorkspaceId(),
        asset_id: this.asset.id,
        start_date:
          this.dates.startDate === 'all'
            ? 'all'
            : this.$moment(this.dates.startDate).format(this.DATE_FORMAT),
        end_date: this.$moment(this.dates.endDate).format(this.DATE_FORMAT),
      }
      if (this.isCollection === 'collection') {
        postData.is_collection = true
      } else if (this.isCollection === 'non-collection') {
        postData.is_collection = false
      } else if (this.isCollection === 'all') {
        if (Object.prototype.hasOwnProperty.call(postData, 'is_collection')) {
          delete postData.is_collection
        }
      }
      await this.$axios
        .$post(`digital-assets/share-link-analytics`, postData)
        .then((response) => {
          this.assetLinkList = response.data.map(({ user, ...e }) => ({
            userName: user?.name || '-',
            ...e,
          }))
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    goToCategory(value) {
      this.linkList = {
        value: 'share_url',
        desc: true,
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.isCollection = value
      this.assetDetail()
    },
  },
}
</script>
