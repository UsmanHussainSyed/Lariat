<template>
  <div class="body-content dam-container p0 position-relative">
    <div v-if="subscriptionFetching" class="overlay">
      <div class="loader"></div>
    </div>
    <template v-else>
      <div v-if="!aiSearchAllowed" class="common-overaly has-relative">
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
      <transition v-else-if="!availableSearchQuota" name="fade">
        <div
          class="alert alert-warning alert-dismissible w-75 text-center"
          style="transform: scale(0.85); margin: auto"
        >
          You have exhausted your search quota for this month for this
          workspace. It will be renewed on next month.
        </div>
      </transition>
      <div
        class="aiGenerate w-100 h-100"
        :style="
          aiSearchAllowed
            ? ''
            : 'filter:grayscale(1) opacity(0.4);pointer-events:none'
        "
      >
        <div class="token_count">
          <div class="token_inner">
            <img :src="require('~/assets/img/dalle/token-icon.svg')" />
            <span>{{ availableSearchQuota }}</span>
          </div>
        </div>
        <div class="aiFilter">
          <div class="row">
            <div class="col-md-6 offset-md-3">
              <div class="ai-search">
                <input
                  v-model="searchText"
                  style="flex: 1; padding: 10px; margin-right: -0.8px"
                  type="text"
                  name="search"
                  :class="{
                    disabled: loading || !aiSearchAllowed,
                  }"
                  :disabled="loading || !aiSearchAllowed"
                  placeholder="Search your thoughts..."
                  autocomplete="off"
                  @keyup.enter="searchImage"
                />
                <a
                  href="javascript:void(0);"
                  class="btn"
                  :class="{
                    disabled:
                      loading || !availableSearchQuota || !aiSearchAllowed,
                  }"
                  :disabled="
                    loading || !availableSearchQuota || !aiSearchAllowed
                  "
                  @click="searchImage"
                  >Generate</a
                >
              </div>
            </div>
          </div>
          <div v-if="imageData && imageData.length" class="btns">
            <a
              href="javascript:void(0);"
              class="btn btn-gray"
              :disabled="downloading"
              :class="{ disabled: downloading }"
              @click="downloadAll()"
              >{{ downloading ? 'Downloading...' : 'Download All' }}</a
            >
            <a
              href="javascript:void(0);"
              class="btn btn-gray"
              :class="{ disabled: savingAllToDam }"
              :disabled="savingAllToDam"
              @click=";(filesToMove = imageData) && $refs.moveDialog.show()"
            >
              {{ savingAllToDam ? 'Saving...' : 'Save All To Dam' }}
            </a>
          </div>
        </div>
        <ul class="aiSearchlist customscrollbar">
          <li v-for="image in imageData" :key="image.url">
            <div class="aiDesign">
              <div class="aiImage">
                <img :src="image.url" alt="" />
              </div>
              <div class="aiHover">
                <a :href="image.url" data-fancybox="mygallery">
                  <svg
                    class="expand-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 16 16"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_awesome-expand"
                      class="fill-color"
                      d="M0,5.3V0.9C0,0.4,0.4,0,0.9,0c0,0,0,0,0,0h4.4c0.2,0,0.4,0.2,0.4,0.4v1.4c0,0.2-0.2,0.4-0.4,0.4h-3v3c0,0.2-0.2,0.4-0.4,0.4H0.4C0.2,5.7,0,5.5,0,5.3z M10.3,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h3v3c0,0.2,0.2,0.4,0.4,0.4h1.4c0.2,0,0.4-0.2,0.4-0.4V0.9C16,0.4,15.6,0,15.1,0c0,0,0,0,0,0h-4.4C10.5,0,10.3,0.2,10.3,0.4z M15.6,10.3h-1.4c-0.2,0-0.4,0.2-0.4,0.4v3h-3c-0.2,0-0.4,0.2-0.4,0.4v1.4c0,0.2,0.2,0.4,0.4,0.4h4.4c0.5,0,0.9-0.4,0.9-0.9c0,0,0,0,0,0v-4.4C16,10.5,15.8,10.3,15.6,10.3L15.6,10.3z M5.7,15.6v-1.4c0-0.2-0.2-0.4-0.4-0.4h-3v-3c0-0.2-0.2-0.4-0.4-0.4H0.4c-0.2,0-0.4,0.2-0.4,0.4v4.4C0,15.6,0.4,16,0.9,16c0,0,0,0,0,0h4.4C5.5,16,5.7,15.8,5.7,15.6z"
                    ></path>
                  </svg>
                </a>
                <div class="dropdown more-options">
                  <button
                    class="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <svg
                      id="Layer_1"
                      class="menu-option-icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 18 18"
                      xml:space="preserve"
                    >
                      <g id="Group_4482" transform="translate(-872 -801)">
                        <rect
                          id="Rectangle_3020"
                          x="872"
                          y="801"
                          class="fill-hide"
                          width="18"
                          height="18"
                        ></rect>
                        <g
                          id="Group_4348"
                          transform="translate(588.166 653.684)"
                        >
                          <circle
                            id="Ellipse_203"
                            class="fill-color"
                            cx="292.8"
                            cy="148.9"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-2"
                            class="fill-color"
                            cx="292.8"
                            cy="163.8"
                            r="1.5"
                          ></circle>
                          <circle
                            id="Ellipse_203-3"
                            class="fill-color"
                            cx="292.8"
                            cy="156.3"
                            r="1.5"
                          ></circle>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <ul class="dropdown-menu">
                    <li @click="download(image)">
                      <a class="dropdown-item" href="javascript:void(0);">
                        <span class="dropdown-item-icon">
                          <svg
                            class="download-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <g
                              id="Group_4359"
                              transform="translate(-153.745 -317.549)"
                            >
                              <path
                                id="Path_3427"
                                class="fill-color"
                                d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                              ></path>
                              <path
                                id="Path_3428"
                                class="fill-color"
                                d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                              ></path>
                              <path
                                id="Path_3429"
                                class="fill-color"
                                d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Download
                      </a>
                    </li>
                    <li
                      @click="
                        ;(filesToMove = [image]) && $refs.moveDialog.show()
                      "
                    >
                      <a class="dropdown-item" href="javascript:void(0);">
                        <span class="dropdown-item-icon">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512 512"
                            xml:space="preserve"
                          >
                            <path
                              class="fill-color"
                              d="M491.4,116.6l-96-96c-3-3-7.1-4.7-11.4-4.6H64c-26.5,0-48,21.5-48,48v384c0,26.5,21.5,48,48,48h384c26.5,0,48-21.5,48-48V128C496,123.7,494.4,119.7,491.4,116.6z M320,48v96H192V48H320z M128,464V352c0-8.8,7.2-16,16-16h224c8.8,0,16,7.2,16,16v112H128z M464,448c0,8.8-7.2,16-16,16h-32V352c0-26.5-21.5-48-48-48H144c-26.5,0-48,21.5-48,48v112H64c-8.8,0-16-7.2-16-16V64c0-8.8,7.2-16,16-16h96v96c0,17.7,14.3,32,32,32h128c17.7,0,32-14.3,32-32V48h25.4l86.6,86.6V448z"
                            />
                          </svg>
                        </span>
                        Save to DAM
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <!-- no data -->
          <div v-if="!loading && !imageData.length" class="aiDesign w-100">
            <div class="no-data-found slide-up-enter-to">
              <div class="inner w-100">
                <img
                  :src="require('~/assets/img/nodata.gif')"
                  style="max-width: 320px"
                />
                <p>No data available.</p>
              </div>
            </div>
          </div>
          <!-- loading -->
          <div
            v-if="loading"
            class="text-center w-100 d-flex justify-content-center align-items-center flex-column"
            style="margin-top: -100px"
          >
            <img
              :src="require('~/assets/img/chatbot-searching.gif')"
              style="width: 200px; margin-bottom: 20px"
            />
            <div>
              <i class="fa fa-circle-o-notch fa-spin"></i>
              &nbsp; Generating results...
            </div>
          </div>
        </ul>
        <MoveFolderDialog
          ref="moveDialog"
          :key="moveDialogKey"
          :files-to-move="filesToMove"
          skip-move-api
          @move-files="onMoveFiles"
        />
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import FileSaver from 'file-saver'
import { v4 as uuidv4 } from 'uuid'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
export default {
  components: { MoveFolderDialog },
  layout: 'damLayout',
  middleware: ['check-if-suspended'],
  data() {
    return {
      imageData: [],
      searchText: '',
      loading: false,
      downloading: false,
      savingAllToDam: false,
      subscription: {},
      filesToMove: [],
      moveDialogKey: 0,
      subscriptionFetching: true,
    }
  },
  computed: {
    aiSearchAllowed() {
      return this.subscription.plan_name !== 'Lite'
    },
    totalSearchQuota() {
      return this.subscription.total_openai_image_count
    },
    availableSearchQuota() {
      return this.subscription.remaining_openai_image_count
    },
  },
  mounted() {
    this.subscriptionFetching = true
    this.$axios
      .$get('digital-assets/subscription/get')
      .then(({ data }) => {
        this.subscription = data
      })
      .catch((_) => {})
      .finally(() => {
        this.subscriptionFetching = false
      })
  },
  methods: {
    searchImage() {
      if (
        !this.searchText?.length ||
        this.loading ||
        !this.aiSearchAllowed ||
        !this.availableSearchQuota
      )
        return
      this.imageData = []
      this.loading = true
      axios
        .post('/generate-image', { text: this.searchText })
        .then((response) => {
          if (response?.data && response.data?.data) {
            this.imageData = (response.data.data || []).map((e, i) => ({
              url: e.url,
              name: this.searchText + '_' + i,
              display_file_name: this.searchText + '_' + i,
              id: uuidv4(),
            }))
            this.loading = false
          }
          if (response.data.error?.message) {
            this.$toast.error(response.data.error.message)
          }
          this.$axios
            .$post('digital-assets/decreased-open-ai-image-count', {
              workspace_id: this.$route.params.workspace_id,
              url_workspace_id: this.$route.params.workspace_id,
              stripe_customer_id: this.stripe_customer_id,
            })
            .then((r) => {
              this.subscription.remaining_openai_image_count = r.data
            })
            .catch()
        })
        .catch((err) => {
          console.log(err.response)
          this.$toast.error(this.$getErrorMessage(err))
        })
        .finally(() => (this.loading = false))
    },
    saveToDam() {
      // this.saveToDame = true
      // const selectedFile = []
      // const rawData = {
      //   display_file: url,
      //   display_file_name: this.searchText,
      //   file_name: this.searchText,
      //   category_id: null,
      // }
      // // auto_tag: 0,
      // this.selectedFileToSave = rawData
      // selectedFile.push(rawData)
      // this.filesToMove = selectedFile
      // this.$refs.moveToFolder.show()
    },
    moveFile() {
      // if (
      //   this.fileSaveLoading ||
      //   this.parentFolderId === 0 ||
      //   !this.parentFolderId ||
      //   !this.selectedFileToSave.display_file
      // )
      //   return
      // this.fileSaveLoading = true
      // this.selectedFileToSave.category_id = this.parentFolderId
      // this.$axios
      //   .$post('/digital-assets/save-to-dam', this.selectedFileToSave)
      //   .then(() => {
      //     this.parentFolderId = null
      //     this.$refs.folderList.reset()
      //     this.$refs.moveToFolder.hide()
      //     this.$toast.success('Asset Successfully Added on DAM.')
      //   })
      //   .catch((err) => {
      //     this.$toast.error(this.$getErrorMessage(err))
      //   })
      //   .finally(() => (this.fileSaveLoading = false))
    },
    hideModel() {},
    saveAllToDam() {
      if (this.savingAllToDam) return
      this.savingAllToDam = true
      // if (
      //   !this.imageData.length ||
      //   !this.filesToMove.length ||
      //   this.fileSaveLoading ||
      //   this.parentFolderId === 0 ||
      //   !this.parentFolderId
      // )
      //   return true
      // this.fileSaveLoading = true
      // this.$axios
      //   .$post('/digital-assets/save-all-images', {
      //     image_data: this.filesToMove,
      //     category_id: this.parentFolderId,
      //   })
      //   .then(() => {
      //     this.parentFolderId = null
      //     this.$refs.folderList.reset()
      //     this.$refs.moveToFolder.hide()
      //     this.$toast.success('Assets Successfully Added on DAM.')
      //     this.fileSaveLoading = false
      //   })
      //   .catch((err) => {
      //     this.$toast.error(this.$getErrorMessage(err))
      //   })
      //   .finally(() => (this.fileSaveLoading = false))
    },
    download(image) {
      axios
        .get('/generate-image/download', {
          headers: {
            uri: [encodeURIComponent(image.url)].join('&!'),
          },
          responseType: 'arraybuffer',
        })
        .then((res) => {
          FileSaver.saveAs(
            new Blob([res.data], { type: res.headers['content-type'] }),
            null
          )
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
    },
    downloadAll() {
      if (this.downloading) return
      this.downloading = true
      const urls = this.imageData.map((e) => e.url)
      axios
        .get('/generate-image/download', {
          responseType: 'blob',
          headers: {
            uri: urls.map((e) => encodeURIComponent(e)).join('&!'),
          },
        })
        .then((response) => {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(
            new Blob([response.data], {
              type: response.headers['content-type'],
            })
          )
          link.download = 'images.zip'
          link.click()
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => {
          this.downloading = false
        })
    },
    onMoveFiles(parent) {
      if (this.filesToMove.length === 1) {
        this.$axios
          .$post('digital-assets/save-to-dam', {
            display_file: this.filesToMove[0].url,
            file_name: this.filesToMove[0].name,
            display_file_name: this.filesToMove[0].display_file_name,
            category_id: parent,
            workspace_id: this.$route.params.workspace_id,
            url_workspace_id: this.$route.params.workspace_id,
          })
          .then((r) => {
            this.$toast.global.success(r.message)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.$refs.moveDialog.hide()
            this.moveDialogKey++
          })
      } else {
        this.savingAllToDam = true
        const image_data = this.filesToMove.map((e) => ({
          display_file: e.url,
          display_file_name: e.display_file_name,
          file_name: e.name,
        }))
        console.log(image_data)
        this.$axios
          .$post('digital-assets/save-all-images', {
            image_data,
            category_id: parent,
            workspace_id: this.$route.params.workspace_id,
            url_workspace_id: this.$route.params.workspace_id,
          })
          .then((r) => {
            this.$toast.global.success(r.message)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.$refs.moveDialog.hide()
            this.moveDialogKey++
            this.savingAllToDam = false
          })
      }
    },
  },
}
</script>

<style scoped>
.form-search {
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
  width: 500px;
  font: bold 13px sans-serif;
  max-width: 70%;
  position: relative;
}

.form-search input {
  width: 60%;
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #ffffff;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
  padding: 14px 15px 14px 40px;
  border: 1px solid #b6c3cd;
  border-right: 0;
  color: #4e565c;
  outline: none;
  -webkit-appearance: none;
}

.form-search button {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #445ea7;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.08);
  color: #ffffff;
  padding: 15px 22px;
  margin-left: -4px;
  cursor: pointer;
  border: none;
  outline: none;
}

.form-search i {
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 16px;
  color: #80a3bd;
}

.product-links a:hover {
  color: #fbb72c;
}

.card-category-2 ul,
.card-category-3 ul,
.card-category-4 ul,
.card-category-5 ul .card-category-6 ul {
  padding: 0;
}
.card-category-2 ul li,
.card-category-3 ul li,
.card-category-4 ul li,
.card-category-5 ul li,
.card-category-6 ul li {
  list-style-type: none;
  display: inline-block;
  vertical-align: top;
}
.card-category-2 ul li,
.card-category-3 ul li {
  margin: 10px 5px;
}

.card-category-1,
.card-category-2,
.card-category-3,
.card-category-4,
.card-category-5,
.card-category-6 {
  font-family: sans-serif;
  margin-bottom: 45px;
  text-align: center;
}
.card-category-1 div,
.card-category-2 div {
  display: inline-block;
}
.card-category-1 > div,
.card-category-2 > div:not(:last-child) {
  margin: 10px 5px;
  text-align: left;
}

/* Image Card */
.img-card {
  width: 300px;
  position: relative;
  border-radius: 5px;
  text-align: left;
  -webkit-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -o-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
}
.img-card .card-image {
  position: relative;
  margin: auto;
  overflow: hidden;
  border-radius: 5px 5px 0px 0px;
  /* height: 300px; */
  min-height: 300px;
}
.img-card .card-image img {
  width: 100%;
  border-radius: 5px 5px 0px 0px;
  -webkit-transition: all 0.8s;
  -moz-transition: all 0.8s;
  -o-transition: all 0.8s;
  transition: all 0.8s;
}
.img-card .card-image:hover img {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
}
.img-card .card-text {
  padding: 0 15px 15px;
  line-height: 1.5;
}
.img-card .card-link {
  padding: 20px 15px 30px;
  width: -webkit-fill-available;
}
.img-card .card-link a {
  text-decoration: none;
  position: relative;
  padding: 10px 0;
}
.img-card .card-link a:after {
  top: 30px;
  content: '';
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  width: 0;
  -webkit-transition: width 0.3s ease 0s, left 0.3s ease 0s;
  -moz-transition: width 0.3s ease 0s, left 0.3s ease 0s;
  -o-transition: width 0.3s ease 0s, left 0.3s ease 0s;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
}
.img-card .card-link a:hover:after {
  width: 100%;
  left: 0;
}
.img-card.iCard-style1 .card-title {
  position: absolute;
  font-family: 'Open Sans', sans-serif;
  z-index: 1;
  top: 10px;
  left: 10px;
  font-size: 30px;
  color: #fff;
}
.img-card.iCard-style1 .card-text {
  color: #795548;
}
.img-card.iCard-style1 .card-link a {
  color: #ff9800;
}
.img-card.iCard-style1 .card-link a:after {
  background: #ff9800;
}
.img-card.iCard-style2 .card-title {
  padding: 15px;
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
}
.img-card.iCard-style2 .card-image {
  margin-bottom: 15px;
}
.img-card.iCard-style2 .card-caption {
  text-align: center;
  top: 80%;
  font-size: 17px;
  color: #fff;
  position: absolute;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  z-index: 1;
}
.img-card.iCard-style2 .card-link a {
  border: 1px solid;
  padding: 8px;
  border-radius: 3px;
  color: black;
  font-size: 13px;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}
.img-card.iCard-style2 .card-link a:hover {
  background: black;
}
.img-card.iCard-style2 .card-link a:hover span {
  color: #fff;
}
.img-card.iCard-style3 {
  text-align: center;
}
.img-card.iCard-style3 .card-title {
  top: 80%;
  font-size: 30px;
  color: #fff;
  position: absolute;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  z-index: 1;
}
.img-card.iCard-style3 .card-text {
  color: #636060;
}
.img-card.iCard-style3 .card-link {
  border-top: 1px solid #e8e8e8;
}
.img-card.iCard-style3 .card-link a {
  color: #585858;
}
.img-card.iCard-style3 .card-link a:after {
  background: #585858;
}
.img-card.iCard-style4 {
  text-align: right;
}
.img-card.iCard-style4 .card-caption {
  position: absolute;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  z-index: 1;
  top: 10px;
  right: 10px;
  color: #fff;
}
.img-card.iCard-style4 .card-title {
  width: 100%;
  padding: 20px 0px 12px 0;
  color: #e91e63;
}
.img-card.iCard-style4 .card-title span {
  font-size: 25px;
  margin-right: 12px;
}
.img-card.iCard-style4 .toggle {
  cursor: pointer;
  padding: 8px 0px 13px 0px;
  width: 55px;
}
.img-card.iCard-style4 .toggle span,
.img-card.iCard-style4 .toggle span:nth-child(2),
.img-card.iCard-style4 .toggle span:nth-child(3) {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #e91e63;
  cursor: pointer;
}
.img-card.iCard-style4 .toggle span:nth-child(1) {
  right: 15px;
}
.img-card.iCard-style4 .toggle span:nth-child(2) {
  right: 27px;
}
.img-card.iCard-style4 .toggle span:nth-child(3) {
  right: 39px;
}
.img-card.iCard-style4 .card-text {
  opacity: 0;
  line-height: 0;
  padding-bottom: 0;
  color: #4c4c4c;
  -webkit-transition: ease-in-out 0.5s;
  -moz-transition: ease-in-out 0.5s;
  -o-transition: ease-in-out 0.5s;
  transition: ease-in-out 0.5s;
}
.img-card.iCard-style4 .toggle.active ~ .card-text {
  opacity: 1;
  line-height: 1.5;
  padding-bottom: 10px;
}
.img-card.iCard-style4 .card-link {
  border-top: 1px solid #e8e8e8;
}
.img-card.iCard-style4 .card-link a {
  color: #e91e63;
}
.img-card.iCard-style4 .card-link a:after {
  background: #e91e63;
}

.action-btn-section {
  margin-top: 20px;
}
.action-btn-section .action-btn {
  height: 35px;
  padding: 5px;
  background-color: #929aa8;
}

.common-box .no-data-found,
.common-box .no-data-found div {
  display: block !important;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}

.overlay > .loader {
  border-left: 2px solid transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-top: 2px solid #0c0c0c40;
  border-bottom: 2px solid #0c0c0c40;
  border-right: 2px solid transparent;
  animation: loader 0.5s linear infinite both;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
