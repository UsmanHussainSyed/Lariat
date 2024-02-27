<template>
  <div class="tableDetail">
    <div class="common-box" :class="{ 'bg-gray': topKeywordList.length }">
      <div class="table-list-view table-list-scrolling">
        <ul v-if="topKeywordList.length" class="thead">
          <li>
            <div class="tag-name sorting flex70">
              <span>Tag Name</span>
            </div>
            <div class="trend sorting flex15">
              <span>Trend</span>
            </div>
            <div class="search-count sorting text-center flex15">
              <span>Search Count</span>
            </div>
          </li>
        </ul>
        <div class="customscrollbar no_footer">
          <ContentLoader
            v-if="listLoading && !topKeywordList.length"
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
          <ul v-if="topKeywordList.length" class="tbody">
            <li v-for="(keyword, index) in topKeywordList" :key="index">
              <div class="tag-name tb-column flex70">
                <div class="top-column">
                  <span
                    >Term :
                    <template v-if="keyword.terms != 'keyword'"
                      >{{ keyword.terms }} :</template
                    >
                    '<strong>{{ keyword.search_text }}</strong
                    >'</span
                  >
                </div>
              </div>
              <div class="trend tb-column flex15">
                <div class="media">
                  <div class="media-left">
                    <div class="top-column">
                      <label>{{ keyword.trend }}</label>
                    </div>
                  </div>
                  <div class="media-body">
                    <svg
                      v-if="keyword.is_up"
                      id="Layer_1"
                      v-tooltip="'Trend - From Past Month'"
                      class="trend-up-icon green"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      style="enable-background: new 0 0 512 512"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path
                            class="fill-color"
                            d="M505.8,112.9c8.3,8.3,8.3,21.8,0,30.2L303.1,345.8c-8.3,8.3-21.8,8.3-30.2,0l-91.6-91.6L36.4,399.1c-8.3,8.3-21.8,8.3-30.2,0s-8.3-21.8,0-30.2l160-160c8.3-8.3,21.8-8.3,30.2,0l91.6,91.6l187.6-187.6C483.9,104.6,497.4,104.6,505.8,112.9L505.8,112.9z"
                          />
                          <path
                            class="fill-color"
                            d="M341.3,128c0-11.8,9.6-21.3,21.3-21.3h128c11.8,0,21.3,9.6,21.3,21.3v128c0,11.8-9.6,21.3-21.3,21.3c-11.8,0-21.3-9.6-21.3-21.3V149.3H362.7C350.9,149.3,341.3,139.8,341.3,128z"
                          />
                        </g>
                      </g>
                    </svg>
                    <svg
                      v-else
                      id="Layer_1"
                      v-tooltip="'Trend - From Past Month'"
                      class="trend-up-icon red"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      style="enable-background: new 0 0 512 512"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path
                            class="fill-color"
                            d="M6.2,399.1c-8.3-8.3-8.3-21.8,0-30.2l202.7-202.7c8.3-8.3,21.8-8.3,30.2,0l91.6,91.6l144.9-144.9c8.3-8.3,21.8-8.3,30.2,0c8.3,8.3,8.3,21.8,0,30.2l-160,160c-8.3,8.3-21.8,8.3-30.2,0L224,211.5L36.4,399.1C28.1,407.4,14.6,407.4,6.2,399.1L6.2,399.1z"
                          />
                          <path
                            class="fill-color"
                            d="M170.7,384c0,11.8-9.6,21.3-21.3,21.3h-128C9.6,405.3,0,395.8,0,384V256c0-11.8,9.6-21.3,21.3-21.3s21.3,9.6,21.3,21.3v106.7h106.7C161.1,362.7,170.7,372.2,170.7,384z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="search-count tb-column text-center flex15">
                <div class="top-column">
                  <label>{{ keyword.count }}</label>
                </div>
              </div>
            </li>
          </ul>
          <EmptyState v-if="!listLoading && !topKeywordList.length" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import EmptyState from '~/components/theme/global/EmptyState'
export default {
  components: {
    ContentLoader,
    EmptyState,
  },
  props: {
    startDate: { type: [Date, String, Object] },
    endDate: { type: [Date, String, Object] },
  },
  data() {
    return {
      listLoading: false,
      topKeywordList: [],
    }
  },
  watch: {
    startDate: {
      deep: true,
      handler() {
        this.getTopKeywordList()
      },
    },
  },
  mounted() {
    this.getTopKeywordList()
  },
  methods: {
    async getTopKeywordList() {
      this.listLoading = true
      await this.$axios
        .$post('digital-assets/analytics/top-keywords', {
          from_date: this.startDate,
          to_date: this.endDate,
        })
        .then(({ data }) => {
          this.topKeywordList = data
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
  },
}
</script>
