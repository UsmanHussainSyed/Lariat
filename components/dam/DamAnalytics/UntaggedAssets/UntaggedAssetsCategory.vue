<template>
  <div class="tableDetail chartBox mt2">
    <div v-if="untaggedCategoryList" class="updateBtn">
      <a href="javascript:void(0);" class="btn" @click="updateAssetsTag()"
        >Update Tags</a
      >
    </div>
    <div class="common-box" :class="{ 'bg-gray': untaggedCategoryList }">
      <div class="table-list-view">
        <div v-if="untaggedCategoryList" class="thead h-auto">
          <div class="project_task_row">
            <div class="sorting task__wrapper">
              <span>Category &amp; Assets</span>
            </div>
            <div class="sorting task__column">
              <span>Last Modified</span>
            </div>
            <div class="sorting task__column big"></div>
          </div>
        </div>
        <div
          class="customscrollbar no_footer"
          style="max-height: initial; padding: 0px"
        >
          <ContentLoader
            v-if="listLoading && !untaggedCategoryList"
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
          <div v-if="untaggedCategoryList" class="tbody">
            <div id="untaggedAsset" class="untaggedAccordion">
              <div
                v-if="untaggedAssetsByCategoryList.Image.length"
                class="project_task_group"
              >
                <div id="headingImage" class="project_task_header">
                  <div class="column-name">
                    <a
                      data-toggle="collapse"
                      data-target="#collapseImage"
                      aria-expanded="true"
                      aria-controls="collapseImage"
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
                          ></rect>
                          <path
                            id="Path_3404"
                            class="fill-color"
                            d="M880,768.6c-0.5,0-1-0.2-1.3-0.6l-7.1-7.1c-0.7-0.7-0.7-1.9,0-2.7c0.4-0.3,0.8-0.5,1.3-0.5h14.2c1,0,1.9,0.9,1.9,1.9c0,0.5-0.2,1-0.6,1.3l-7.1,7.1C881,768.4,880.5,768.6,880,768.6L880,768.6z M872.9,759.3c-0.2,0-0.3,0.1-0.3,0.3c0,0.1,0,0.2,0.1,0.2l7.1,7.1c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l7.1-7.1c0.1-0.1,0.1-0.3,0-0.4c0,0,0,0,0,0c0-0.1-0.1-0.1-0.2-0.1L872.9,759.3z"
                          ></path>
                        </g>
                      </svg>
                      Images ({{ untaggedAssetsByCategoryList.Image.length }})
                    </a>
                  </div>
                </div>
                <div
                  id="collapseImage"
                  class="collapse show"
                  aria-labelledby="headingImage"
                  data-parent="#untaggedAsset"
                >
                  <div
                    v-for="imageList in untaggedAssetsByCategoryList.Image"
                    :key="imageList.id"
                    class="project_task_list customscrollbar"
                  >
                    <div class="project_task_row">
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div class="categary-image">
                              <img
                                :src="
                                  imageList.thumbnail_file !== null
                                    ? imageList.thumbnail_file
                                    : imageList.preview_image
                                "
                              />
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="top-column">
                              <span>{{ imageList.display_file_name }}</span>
                            </div>
                            <div
                              class="breadcrumbs"
                              v-html="breadcrumbs(imageList.category)"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column">
                        <label>{{
                          $moment(imageList.updated_at).format('Do, MMM YYYY')
                        }}</label>
                      </div>
                      <div class="tb-column task__column big">
                        <FileTagInput
                          name-id="commonTags"
                          :file-ids="[
                            {
                              id: imageList.id,
                              assets_version_id: imageList.assets_version_id,
                            },
                          ]"
                          class="tag-add-box customscrollbar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="untaggedAssetsByCategoryList.Document.length"
                class="project_task_group"
              >
                <div id="headingDocument" class="project_task_header">
                  <div class="column-name">
                    <a
                      data-toggle="collapse"
                      data-target="#collapseDocument"
                      aria-expanded="false"
                      aria-controls="collapseDocument"
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
                          ></rect>
                          <path
                            id="Path_3404"
                            class="fill-color"
                            d="M880,768.6c-0.5,0-1-0.2-1.3-0.6l-7.1-7.1c-0.7-0.7-0.7-1.9,0-2.7c0.4-0.3,0.8-0.5,1.3-0.5h14.2c1,0,1.9,0.9,1.9,1.9c0,0.5-0.2,1-0.6,1.3l-7.1,7.1C881,768.4,880.5,768.6,880,768.6L880,768.6z M872.9,759.3c-0.2,0-0.3,0.1-0.3,0.3c0,0.1,0,0.2,0.1,0.2l7.1,7.1c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l7.1-7.1c0.1-0.1,0.1-0.3,0-0.4c0,0,0,0,0,0c0-0.1-0.1-0.1-0.2-0.1L872.9,759.3z"
                          ></path>
                        </g>
                      </svg>
                      Documents ({{
                        untaggedAssetsByCategoryList.Document.length
                      }})
                    </a>
                  </div>
                </div>
                <div
                  id="collapseDocument"
                  class="collapse"
                  aria-labelledby="headingDocument"
                  data-parent="#untaggedAsset"
                >
                  <div
                    v-for="documentList in untaggedAssetsByCategoryList.Document"
                    :key="documentList.id"
                    class="project_task_list customscrollbar"
                  >
                    <div class="project_task_row">
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div class="categary-image">
                              <img
                                :src="
                                  documentList.thumbnail_file !== null
                                    ? documentList.thumbnail_file
                                    : documentList.preview_image
                                "
                              />
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="top-column">
                              <span>{{ documentList.display_file_name }}</span>
                            </div>

                            <div
                              class="breadcrumbs"
                              v-html="breadcrumbs(documentList.category)"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column">
                        <label>{{
                          $moment(documentList.updated_at).format(
                            'Do, MMM YYYY'
                          )
                        }}</label>
                      </div>
                      <div class="tb-column task__column big">
                        <FileTagInput
                          name-id="commonTags"
                          :file-ids="[
                            {
                              id: documentList.id,
                              assets_version_id: documentList.assets_version_id,
                            },
                          ]"
                          class="tag-add-box customscrollbar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="untaggedAssetsByCategoryList.Video.length"
                class="project_task_group"
              >
                <div id="headingVideo" class="project_task_header">
                  <div class="column-name">
                    <a
                      data-toggle="collapse"
                      data-target="#collapseVideo"
                      aria-expanded="false"
                      aria-controls="collapseVideo"
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
                          ></rect>
                          <path
                            id="Path_3404"
                            class="fill-color"
                            d="M880,768.6c-0.5,0-1-0.2-1.3-0.6l-7.1-7.1c-0.7-0.7-0.7-1.9,0-2.7c0.4-0.3,0.8-0.5,1.3-0.5h14.2c1,0,1.9,0.9,1.9,1.9c0,0.5-0.2,1-0.6,1.3l-7.1,7.1C881,768.4,880.5,768.6,880,768.6L880,768.6z M872.9,759.3c-0.2,0-0.3,0.1-0.3,0.3c0,0.1,0,0.2,0.1,0.2l7.1,7.1c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l7.1-7.1c0.1-0.1,0.1-0.3,0-0.4c0,0,0,0,0,0c0-0.1-0.1-0.1-0.2-0.1L872.9,759.3z"
                          ></path>
                        </g>
                      </svg>
                      Videos ({{ untaggedAssetsByCategoryList.Video.length }})
                    </a>
                  </div>
                </div>
                <div
                  id="collapseVideo"
                  class="collapse"
                  aria-labelledby="headingVideo"
                  data-parent="#untaggedAsset"
                >
                  <div
                    v-for="videoList in untaggedAssetsByCategoryList.Video"
                    :key="videoList.id"
                    class="project_task_list customscrollbar"
                  >
                    <div class="project_task_row">
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div class="categary-image">
                              <img
                                :src="
                                  videoList.thumbnail_file !== null
                                    ? videoList.thumbnail_file
                                    : videoList.preview_image
                                "
                              />
                            </div>
                          </div>
                          <div class="media-body">
                            <div class="top-column">
                              <span>{{ videoList.display_file_name }}</span>
                            </div>
                            <div
                              class="breadcrumbs"
                              v-html="breadcrumbs(videoList.category)"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column">
                        <label>{{
                          $moment(videoList.updated_at).format('Do, MMM YYYY')
                        }}</label>
                      </div>
                      <div class="tb-column task__column big">
                        <FileTagInput
                          name-id="commonTags"
                          :file-ids="[
                            {
                              id: videoList.id,
                              assets_version_id: videoList.assets_version_id,
                            },
                          ]"
                          class="tag-add-box customscrollbar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="untaggedAssetsByCategoryList.Audio.length"
                class="project_task_group"
              >
                <div id="headingAudio" class="project_task_header">
                  <div class="column-name">
                    <a
                      data-toggle="collapse"
                      data-target="#collapseAudio"
                      aria-expanded="false"
                      aria-controls="collapseAudio"
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
                          ></rect>
                          <path
                            id="Path_3404"
                            class="fill-color"
                            d="M880,768.6c-0.5,0-1-0.2-1.3-0.6l-7.1-7.1c-0.7-0.7-0.7-1.9,0-2.7c0.4-0.3,0.8-0.5,1.3-0.5h14.2c1,0,1.9,0.9,1.9,1.9c0,0.5-0.2,1-0.6,1.3l-7.1,7.1C881,768.4,880.5,768.6,880,768.6L880,768.6z M872.9,759.3c-0.2,0-0.3,0.1-0.3,0.3c0,0.1,0,0.2,0.1,0.2l7.1,7.1c0.1,0.1,0.1,0.1,0.2,0.1c0.1,0,0.2,0,0.2-0.1l7.1-7.1c0.1-0.1,0.1-0.3,0-0.4c0,0,0,0,0,0c0-0.1-0.1-0.1-0.2-0.1L872.9,759.3z"
                          ></path>
                        </g>
                      </svg>
                      Audios ({{ untaggedAssetsByCategoryList.Audio.length }})
                    </a>
                  </div>
                </div>
                <div
                  id="collapseAudio"
                  class="collapse"
                  aria-labelledby="headingAudio"
                  data-parent="#untaggedAsset"
                >
                  <div
                    v-for="audioList in untaggedAssetsByCategoryList.Audio"
                    :key="audioList.id"
                    class="project_task_list customscrollbar"
                  >
                    <div class="project_task_row">
                      <div class="tb-column task__wrapper">
                        <div class="media">
                          <div class="media-left">
                            <div class="categary-image">
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
                            <div class="top-column">
                              <span>{{ audioList.display_file_name }}</span>
                            </div>
                            <div
                              class="breadcrumbs"
                              v-html="breadcrumbs(audioList.category)"
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="tb-column task__column">
                        <label>{{
                          $moment(audioList.updated_at).format('Do, MMM YYYY')
                        }}</label>
                      </div>
                      <div class="tb-column task__column big">
                        <FileTagInput
                          name-id="commonTags"
                          :file-ids="[
                            {
                              id: audioList.id,
                              assets_version_id: audioList.assets_version_id,
                            },
                          ]"
                          class="tag-add-box customscrollbar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EmptyState v-if="!listLoading && !untaggedCategoryList" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import EmptyState from '~/components/theme/global/EmptyState'
import FileTagInput from '~/components/dam/FileTagInput'

export default {
  components: {
    ContentLoader,
    EmptyState,
    FileTagInput,
  },
  data() {
    return {
      untaggedAssetsByCategoryList: {
        Audio: [],
        Document: [],
        Image: [],
        Video: [],
      },
      listLoading: false,
      breadcrumb: null,
    }
  },
  computed: {
    untaggedCategoryList() {
      return (
        this.untaggedAssetsByCategoryList.Audio.length ||
        this.untaggedAssetsByCategoryList.Document.length ||
        this.untaggedAssetsByCategoryList.Image.length ||
        this.untaggedAssetsByCategoryList.Video.length
      )
    },
    breadcrumbs: (item1) => (item1) => {
      const breadcrumbs = []

      const recursivePush = (item, array) => {
        if (!item) return

        array.push({
          name: item.folder_name,
          folderId: item.id,
        })

        recursivePush(item.parent, array)
      }

      recursivePush(item1, breadcrumbs)
      const breadcrumbsList = breadcrumbs.reverse()
      const breadcrumbsArray = breadcrumbsList.map(({ name }) => name)
      const breadcrumbsName = breadcrumbsArray.join('/')
      const beforeLastSlashName = breadcrumbsName.substring(
        0,
        breadcrumbsName.lastIndexOf('/') + 1
      )
      const beforeLastWithoutSlashName = beforeLastSlashName.slice(0, -1)

      const afterLastSlashName = breadcrumbsName.substring(
        breadcrumbsName.lastIndexOf('/') + 1
      )
      if (beforeLastWithoutSlashName) {
        return `<span>/${beforeLastWithoutSlashName}</span>/${afterLastSlashName}`
      } else {
        return `/${afterLastSlashName}`
      }
    },
  },
  created() {
    this.getUntaggedAssetsDetails()
  },
  methods: {
    async getUntaggedAssetsDetails() {
      this.listLoading = true

      await this.$axios
        .$post('digital-assets/analytics/untag-assets-by-type-details')
        .then(({ data }) => {
          this.untaggedAssetsByCategoryList = data.assets_list
          this.listLoading = false
        })
        .catch(this.$errorToast)
    },
    updateAssetsTag() {
      this.untaggedAssetsByCategoryList = {
        Audio: [],
        Document: [],
        Image: [],
        Video: [],
      }
      this.getUntaggedAssetsDetails()
      this.$emit('updateTags')
    },
    breadcrumbsAll(item) {
      this.breadcrumb = item
      const breadcrumbs = []

      const recursivePush = (item, array) => {
        if (!item) return

        array.push({
          name: item.folder_name,
          folderId: item.id,
        })

        recursivePush(item.parent, array)
      }

      recursivePush(this.breadcrumb, breadcrumbs)
      const breadcrumbsList = breadcrumbs.reverse()
      const breadcrumbsArray = breadcrumbsList.map(({ name }) => name)
      const breadcrumbsName = breadcrumbsArray.join('/')
      const beforeLastSlashName = breadcrumbsName.substring(
        0,
        breadcrumbsName.lastIndexOf('/') + 1
      )
      const beforeLastWithoutSlashName = beforeLastSlashName.slice(0, -1)

      const afterLastSlashName = breadcrumbsName.substring(
        breadcrumbsName.lastIndexOf('/') + 1
      )
      if (beforeLastWithoutSlashName) {
        return `<span>/${beforeLastWithoutSlashName}</span>/${afterLastSlashName}`
      } else {
        return `/${afterLastSlashName}`
      }
    },
  },
}
</script>
