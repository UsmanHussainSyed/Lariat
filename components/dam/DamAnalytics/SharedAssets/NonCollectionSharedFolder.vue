<template>
  <li class="collectionImage collectionFolder h-auto open">
    <div class="w-100 d-flex align-items-center">
      <a
        v-if="file.sub_category_count + file.total_assets > 0"
        class="second-lavel"
        :href="`#img${assetsIndex}${url.id}${file.id}`"
        aria-expanded="false"
        data-toggle="collapse"
        @click.prevent="
          getSharedUrlAssetsVersionDetails(assetsIndex, url.id, file)
        "
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
                  require(file.sub_category_count + file.total_assets > 0
                    ? '~/assets/img/folder-icon.svg'
                    : '~/assets/img/folder-icon2.svg')
                "
                alt="Folder Icon"
              />
            </div>
          </div>

          <div class="media-body">
            <div class="top-column">
              <span>{{ file.folder_name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="asset-size tb-column flex15">
        <div class="top-column">
          <label>-</label>
        </div>
      </div>
      <div class="asset-types tb-column flex15">
        <div class="top-column">
          <label>-</label>
        </div>
      </div>
      <div class="total-download tb-column flex10 text-center">
        <div class="top-column">
          <label>-</label>
        </div>
      </div>
    </div>
    <div class="h-auto w-100 mt0">
      <div :id="`img${assetsIndex}${url.id}${file.id}`" class="collapse w-100">
        <div v-if="assetsVersionDynamicIndex == assetsIndex" class="dataLoader">
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
        <div v-else class="common-box bg-gray pl0">
          <ul class="tbody">
            <template v-if="categoryVersionList.length">
              <NonCollectionSharedFolder
                v-for="(_file, assetsIndex) in categoryVersionList"
                :key="_file.id"
                :file="_file"
                :url="url"
                :assets-index="assetsIndex"
              />
            </template>
            <template v-if="assetsVersionList.length">
              <li
                v-for="(versionFile, assetsVersionIndex) in assetsVersionList"
                :key="versionFile.id"
                class="h-auto"
                :class="[
                  versionFile.version_count > 1
                    ? 'collectionImage open'
                    : 'collectionVersion collectionFolder',
                ]"
              >
                <div class="w-100 d-flex align-items-center">
                  <a
                    v-if="versionFile.version_count > 1"
                    class="second-lavel"
                    :href="`#img${assetsVersionIndex}${url.id}${file.id}${versionFile.id}`"
                    aria-expanded="false"
                    data-toggle="collapse"
                    @click.prevent="
                      getAssetsVersionDetails(
                        assetsVersionIndex + versionFile.id,
                        url.id,
                        versionFile
                      )
                    "
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
                              versionFile.thumbnail_file !== null
                                ? versionFile.thumbnail_file
                                : versionFile.preview_image
                            "
                            alt=""
                          />
                        </div>
                      </div>
                      <div class="media-body">
                        <div class="add-label">
                          <div class="top-column">
                            <span>{{ versionFile.display_file_name }}</span>
                          </div>
                          <span
                            v-if="versionFile.is_deleted"
                            class="plan-status alert-danger"
                            >Deleted</span
                          >
                          <span
                            v-else-if="versionFile.is_archive"
                            class="plan-status alert-primary"
                            >Archived</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="asset-size tb-column flex15">
                    <div class="top-column">
                      <label
                        >{{ $toHumanlySize(versionFile.file_size) }}
                      </label>
                    </div>
                  </div>
                  <div class="asset-types tb-column flex15">
                    <div class="top-column">
                      <label>{{ versionFile.file_type }}</label>
                    </div>
                  </div>
                  <div class="total-download tb-column flex10 text-center">
                    <div class="top-column">
                      <label>{{ versionFile.total_download }}</label>
                    </div>
                  </div>
                </div>

                <div class="h-auto w-100 mt0">
                  <div
                    :id="`img${assetsVersionIndex}${url.id}${file.id}${versionFile.id}`"
                    class="collapse w-100"
                  >
                    <div
                      v-if="
                        assetsVersionDynamicIndex ==
                        assetsVersionIndex + versionFile.id
                      "
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
                            <span>Asset Name</span>
                          </div>
                          <div class="version sorting flex8">
                            <span></span>
                          </div>
                          <div class="asset-size sorting flex16">
                            <span>Asset Size</span>
                          </div>
                          <div class="asset-types sorting flex16">
                            <span>Asset Type</span>
                          </div>
                          <div
                            class="total-download sorting flex10 text-center"
                          >
                            <span>Total Download</span>
                          </div>
                        </li>
                      </ul>
                      <ul class="tbody">
                        <li
                          v-for="versionFileAssets in versionFile.assetsVersion2List"
                          :key="versionFileAssets.id"
                          class="collectionVersion h-auto"
                        >
                          <div class="w-100 d-flex align-items-center">
                            <div class="categary-name tb-column flex58">
                              <div class="media">
                                <div class="media-left">
                                  <div class="categary-image">
                                    <img
                                      :src="
                                        versionFileAssets.thumbnail_file !==
                                        null
                                          ? versionFileAssets.thumbnail_file
                                          : versionFileAssets.preview_image
                                      "
                                      alt=""
                                    />
                                  </div>
                                </div>
                                <div class="media-body">
                                  <div class="add-label">
                                    <div class="top-column">
                                      <span>{{
                                        versionFileAssets.display_file_name
                                      }}</span>
                                    </div>
                                    <span
                                      v-if="versionFileAssets.is_deleted"
                                      class="plan-status alert-danger"
                                      >Deleted</span
                                    >
                                    <span
                                      v-else-if="versionFileAssets.is_archive"
                                      class="plan-status alert-primary"
                                      >Archived</span
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="version tb-column flex8">
                              <div class="top-column">
                                <label>V{{ versionFileAssets.version }}</label>
                              </div>
                            </div>
                            <div class="asset-size tb-column flex16">
                              <div class="top-column">
                                <label>{{
                                  $toHumanlySize(versionFileAssets.file_size)
                                }}</label>
                              </div>
                            </div>
                            <div class="asset-types tb-column flex16">
                              <div class="top-column">
                                <label>{{ versionFileAssets.file_type }}</label>
                              </div>
                            </div>
                            <div
                              class="total-download tb-column flex10 text-center"
                            >
                              <div class="top-column">
                                <label>{{
                                  versionFileAssets.total_download
                                }}</label>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
import analytics from '~/mixins/analytics'
import damShareUrl from '~/mixins/damShareUrl'
import NonCollectionSharedFolder from '~/components/dam/DamAnalytics/SharedAssets/NonCollectionSharedFolder'
export default {
  name: 'NonCollectionSharedFolder',
  components: {
    NonCollectionSharedFolder,
  },
  mixins: [analytics, damShareUrl],
  props: {
    file: { type: Object, required: true },
    url: { type: Object, required: true },
    assetsIndex: { type: [String, Number], default: null },
  },
  data() {
    return {
      assetsVersionDynamicIndex: null,
      categoryVersionList: [],
      assetsVersionList: [],
    }
  },
  methods: {
    async getSharedUrlAssetsVersionDetails(assetsIndex, sharedId, file) {
      if (file.sub_category_count + file.total_assets > 0) {
        file.expand = !file.expand
        if (file.expand) {
          this.assetsVersionDynamicIndex = assetsIndex
          await this.$axios
            .$post('digital-assets/analytics/non-collection-share-url-folder', {
              category_id: file.id,
              share_id: sharedId,
            })
            .then(({ data }) => {
              if (data.assets && data.assets.length) {
                this.assetsVersionList = data.assets.map((item) => ({
                  ...item,
                  assetsVersion2List: [],
                  expand: false,
                }))
              }
              if (data.category && data.category.length) {
                this.categoryVersionList = data.category
              }
              this.assetsVersionDynamicIndex = null
            })
            .catch(this.$errorToast)
        }
      }
    },
    async getAssetsVersionDetails(assetsVersionIndex, sharedId, file) {
      file.expand = !file.expand
      if (file.expand) {
        this.assetsVersionDynamicIndex = assetsVersionIndex
        await this.$axios
          .$post('digital-assets/analytics/share-url-assets-version-details', {
            asset_id: file.id,
            share_id: sharedId,
          })
          .then(({ data }) => {
            file.assetsVersion2List = data
            this.assetsVersionDynamicIndex = null
          })
          .catch(this.$errorToast)
      }
    },
  },
}
</script>
