<template>
  <div
    id="link-shared"
    class="tab-pane"
    :class="{ active: displayTab === 'share-link' }"
  >
    <div v-if="!showDetail" class="assets-list-permission h-100">
      <ul class="assetsType justify-content-end">
        <li>
          <div class="search-by">
            <Select2
              :value="isCollection"
              :options="categoriesObject"
              :attrs="{ minimumResultsForSearch: -1 }"
              @input="goToCategory"
            />
          </div>
        </li>
      </ul>
      <div class="common-box bg-gray link-shared-list">
        <div class="table-list-view">
          <div class="thead">
            <div class="project_task_row">
              <div class="sorting task__wrapper">
                <span>Category & Assets</span>
              </div>
              <div class="sorting task__column text-center">
                <span>Number of URLs Generated</span>
              </div>
              <div class="sorting task__column text-center">
                <span>Total Downloads</span>
              </div>
            </div>
          </div>
          <div class="customscrollbar no_footer">
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
            <div v-if="isSame" class="no-data-found">
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
                <p>No data yet!</p>
              </div>
            </div>
            <div v-else class="tbody">
              <div v-if="!isImage" class="project_task_group">
                <div class="project_task_header">
                  <div class="column-name">
                    <a
                      class="accordion-toggle"
                      aria-expanded="true"
                      data-toggle="collapse"
                      href="#images"
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
                      Images
                    </a>
                  </div>
                  <div class="header_cell_right">
                    <div class="tb-column task__column text-center">
                      <label>{{ imageStat.share }}</label>
                    </div>
                    <div class="tb-column task__column text-center">
                      <label>{{ imageStat.download }}</label>
                    </div>
                  </div>
                </div>
                <div class="project_task_list">
                  <div id="images" class="collapse show">
                    <div
                      v-for="imageList in categoryData.image"
                      :key="imageList.id"
                      class="project_task_row"
                    >
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div class="categary-image">
                              <a
                                class="img-link"
                                @click.capture.stop="getAssetDetail(imageList)"
                              >
                                <img
                                  :src="
                                    imageList.thumbnail_file !== null
                                      ? imageList.thumbnail_file
                                      : imageList.preview_image
                                  "
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="add-label">
                              <div class="top-column">
                                <a
                                  @click.capture.stop="
                                    getAssetDetail(imageList)
                                  "
                                  >{{ imageList.display_file_name }}</a
                                >
                              </div>
                              <span
                                v-if="imageList.final_deleted == 1"
                                class="plan-status alert-danger"
                                >Deleted</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>{{ imageList.share_count }}</label>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>
                          {{
                            imageList.download_count
                              ? imageList.download_count
                              : 0
                          }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!isDocument" class="project_task_group">
                <div class="project_task_header">
                  <div class="column-name">
                    <a
                      class="accordion-toggle"
                      aria-expanded="false"
                      data-toggle="collapse"
                      href="#documents"
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
                      Documents
                    </a>
                  </div>
                  <div class="header_cell_right">
                    <div class="tb-column task__column text-center">
                      <label>{{ documentStat.share }}</label>
                    </div>
                    <div class="tb-column task__column text-center">
                      <label>{{ documentStat.download }}</label>
                    </div>
                  </div>
                </div>
                <div class="project_task_list">
                  <div id="documents" class="collapse">
                    <div
                      v-for="documentList in categoryData.document"
                      :key="documentList.id"
                      class="project_task_row"
                    >
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div class="categary-image">
                              <a
                                class="img-link"
                                @click.capture.stop="
                                  getAssetDetail(documentList)
                                "
                              >
                                <img
                                  :src="
                                    documentList.thumbnail_file !== null
                                      ? documentList.thumbnail_file
                                      : documentList.preview_image
                                  "
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="add-label">
                              <div class="top-column">
                                <a
                                  @click.capture.stop="
                                    getAssetDetail(documentList)
                                  "
                                  >{{ documentList.display_file_name }}</a
                                >
                              </div>
                              <span
                                v-if="documentList.final_deleted == 1"
                                class="plan-status alert-danger"
                                >Deleted</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>{{ documentList.share_count }}</label>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>
                          {{
                            documentList.download_count
                              ? documentList.download_count
                              : 0
                          }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!isVideo" class="project_task_group">
                <div class="project_task_header">
                  <div class="column-name">
                    <a
                      class="accordion-toggle"
                      aria-expanded="false"
                      data-toggle="collapse"
                      href="#videos"
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
                      Videos
                    </a>
                  </div>
                  <div class="header_cell_right">
                    <div class="tb-column task__column text-center">
                      <label>{{ videoStat.share }}</label>
                    </div>
                    <div class="tb-column task__column text-center">
                      <label>{{ videoStat.download }}</label>
                    </div>
                  </div>
                </div>
                <div class="project_task_list">
                  <div id="videos" class="collapse">
                    <div
                      v-for="videoList in categoryData.video"
                      :key="videoList.id"
                      class="project_task_row"
                    >
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div
                              class="categary-image"
                              @click.capture.stop="getAssetDetail(videoList)"
                            >
                              <img
                                :src="
                                  videoList.thumbnail_file !== null
                                    ? videoList.thumbnail_file
                                    : videoList.preview_image
                                "
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="add-label">
                              <div class="top-column">
                                <a
                                  @click.capture.stop="
                                    getAssetDetail(videoList)
                                  "
                                  >{{ videoList.display_file_name }}</a
                                >
                              </div>
                              <span
                                v-if="videoList.final_deleted == 1"
                                class="plan-status alert-danger"
                                >Deleted</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>{{ videoList.share_count }}</label>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>
                          {{
                            videoList.download_count
                              ? videoList.download_count
                              : 0
                          }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!isAudio" class="project_task_group">
                <div class="project_task_header">
                  <div class="column-name">
                    <a
                      class="accordion-toggle"
                      aria-expanded="false"
                      data-toggle="collapse"
                      href="#audios"
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
                      Audios
                    </a>
                  </div>
                  <div class="header_cell_right">
                    <div class="tb-column task__column text-center">
                      <label>{{ audioStat.share }}</label>
                    </div>
                    <div class="tb-column task__column text-center">
                      <label>{{ audioStat.download }}</label>
                    </div>
                  </div>
                </div>
                <div class="project_task_list">
                  <div id="audios" class="collapse">
                    <div
                      v-for="audioList in categoryData.audio"
                      :key="audioList.id"
                      class="project_task_row"
                    >
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div
                              class="categary-image"
                              @click.capture.stop="getAssetDetail(audioList)"
                            >
                              <img
                                :src="
                                  audioList.thumbnail_file !== null
                                    ? audioList.thumbnail_file
                                    : audioList.preview_image
                                "
                                alt=""
                              />
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="add-label">
                              <div class="top-column">
                                <a
                                  @click.capture.stop="
                                    getAssetDetail(audioList)
                                  "
                                  >{{ audioList.display_file_name }}</a
                                >
                              </div>
                              <span
                                v-if="audioList.final_deleted == 1"
                                class="plan-status alert-danger"
                                >Deleted</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>{{ audioList.share_count }}</label>
                      </div>
                      <div class="tb-column task__column text-center">
                        <label>
                          {{
                            audioList.download_count
                              ? audioList.download_count
                              : 0
                          }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SharedAsset
      v-show="showDetail"
      :show-detail="showDetail"
      :asset="assetDetail"
      :dates="dates"
      :is-collection="isCollection"
      @closeDetail="getLoadData"
    />
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import Select2 from '~/components/plugins/Select2'
import SharedAsset from '~/components/dam/Analytics/SharedAsset'

export default {
  components: {
    Select2,
    SharedAsset,
    ContentLoader,
  },
  props: {
    displayTab: { type: String, required: true },
    dates: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      categoriesObject: [
        { text: 'All', id: 'all' },
        { text: 'Collection', id: 'collection' },
        { text: 'Non-collection', id: 'non-collection' },
      ],
      showDetail: false,
      categoryData: {
        image: [],
        document: [],
        video: [],
        audio: [],
      },
      categoryDataOriginal: {
        image: [],
        document: [],
        video: [],
        audio: [],
      },
      DATE_FORMAT: 'YYYY-MM-DD',
      isCollection: 'all',
      assetDetail: null,
      loading: false,
    }
  },
  computed: {
    isImage() {
      const x = this.imageStat
      return x.share === 0 && x.view === 0 && x.download === 0
    },
    isDocument() {
      const x = this.documentStat
      return x.share === 0 && x.view === 0 && x.download === 0
    },
    isAudio() {
      const x = this.audioStat
      return x.share === 0 && x.view === 0 && x.download === 0
    },
    isVideo() {
      const x = this.videoStat
      return x.share === 0 && x.view === 0 && x.download === 0
    },
    isSame() {
      return this.isImage && this.isDocument && this.isAudio && this.isVideo
    },
    imageStat() {
      const imageCount = {
        share: 0,
        view: 0,
        download: 0,
      }
      this.categoryData?.image.map((item) => {
        imageCount.view += item.view_count
        imageCount.share += item.share_count
        imageCount.download +=
          item.download_count !== null ? parseInt(item.download_count) : 0
        return item
      })
      return imageCount
    },
    documentStat() {
      const documentCount = {
        share: 0,
        view: 0,
        download: 0,
      }
      this.categoryData?.document.map((item) => {
        documentCount.view += item.view_count
        documentCount.share += item.share_count
        documentCount.download +=
          item.download_count !== null ? parseInt(item.download_count) : 0
        return item
      })
      return documentCount
    },
    audioStat() {
      const audioCount = {
        share: 0,
        view: 0,
        download: 0,
      }
      this.categoryData?.audio.map((item) => {
        audioCount.view += item.view_count
        audioCount.share += item.share_count
        audioCount.download +=
          item.download_count !== null ? parseInt(item.download_count) : 0
        return item
      })
      return audioCount
    },
    videoStat() {
      const videoCount = {
        share: 0,
        view: 0,
        download: 0,
      }
      this.categoryData?.video.map((item) => {
        videoCount.view += item.view_count
        videoCount.share += item.share_count
        videoCount.download +=
          item.download_count !== null ? parseInt(item.download_count) : 0
        return item
      })
      return videoCount
    },
  },
  watch: {
    displayTab() {
      if (this.displayTab === 'share-link') {
        this.loadData()
      }
    },
    dates: {
      deep: true,
      handler() {
        if (this.showDetail !== true) {
          this.loadData()
        }
      },
    },
  },
  methods: {
    getAssetDetail(asset) {
      this.showDetail = true
      this.assetDetail = asset
    },
    getLoadData() {
      this.showDetail = false
      // this.assetDetail = null
      this.loadData()
    },
    async loadData() {
      this.loading = true
      const postData = {
        url_workspace_id: this.$getWorkspaceId(),
        workspace_id: this.$getWorkspaceId(),
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
        .$post(`digital-assets/share-assets-analytics`, postData)
        .then((response) => {
          this.categoryData = response.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    goToCategory(value) {
      this.isCollection = value
      this.loadData()
    },
  },
}
</script>
