<template>
  <form class="add-banner" :class="{ hide: edit }" @submit.prevent="onSubmit">
    <div class="center-part-view-subheading pb-3">
      <h4>Add Banner</h4>
      <small class="text-muted">
        Preferred Image size should be 1920&times;500px (Size should be less
        than 20mb)
      </small>
    </div>
    <div class="upload-img-preview">
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          :value="banner.image_name"
          readonly
          placeholder="Select an image"
          :disabled="adding"
          @click.stop="!adding && $refs.fileInput.click()"
        />
        <span class="input-group-btn">
          <span class="btn-file" :class="{ 'btn-disable': adding }">
            Choose File
            <input
              ref="fileInput"
              type="file"
              :disabled="adding"
              accept=".jpg,.jpeg,.png"
              @change="onFileInput"
            />
          </span>
        </span>
      </div>
      <TransitionExpand>
        <div v-if="banner.src" class="input-group prev-img-btn">
          <div style="padding: 0 0 8px; font-weight: 400; font-size: 13px">
            Please note: Use mouse scroll to zoom in/out to scale your image
          </div>
          <div
            ref="editorWrapper"
            class=""
            :style="{
              minHeight: '500px',
              maxHeight: '500px',
              position: 'relative',
              overflow: 'hidden',
            }"
          >
            <cropper
              ref="vueCropper"
              :src="banner.src"
              style="min-height: 500px; max-height: 500px"
              :auto-zoom="true"
              :default-size="defaultSize"
              image-restriction="none"
              background-class="cropper-nobg"
              :canvas="{
                minHeight: 500,
                maxHeight: 500,
                maxWidth: 1920,
              }"
              :stencil-props="{
                handlers: {},
                movable: true,
                scalable: false,
                resizable: false,
              }"
              :resize-image="{
                adjustStencil: false,
                wheel: false,
              }"
            />
            />
            <div v-if="banner.src" class="actions-btn">
              <a href="javascript:void(0);" class="zoomin" @click="zoom(1.1)">
                <span>
                  <svg
                    id="Layer_1"
                    class="zoom-in-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_ionic-ios-search"
                      class="fill-color"
                      d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
                    ></path>
                    <g>
                      <path
                        class="fill-color"
                        d="M10.6,6.3H3.7C3.3,6.3,3,6.6,3,7c0,0.4,0.3,0.7,0.7,0.7h6.9c0.4,0,0.7-0.3,0.7-0.7C11.3,6.6,11,6.3,10.6,6.3z"
                      ></path>
                      <path
                        class="fill-color"
                        d="M7.8,10.5V3.6c0-0.4-0.3-0.7-0.7-0.7c-0.4,0-0.7,0.3-0.7,0.7v6.9c0,0.4,0.3,0.7,0.7,0.7C7.5,11.2,7.8,10.9,7.8,10.5z"
                      ></path>
                    </g>
                  </svg>
                </span>
              </a>
              <a href="javascript:void(0);" class="zoomout" @click="zoom(0.9)">
                <span>
                  <svg
                    id="Layer_1"
                    class="zoom-out-icon white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 18 18"
                    xml:space="preserve"
                  >
                    <path
                      id="Icon_ionic-ios-search"
                      class="fill-color"
                      d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
                    ></path>
                    <path
                      class="fill-color"
                      d="M10.6,6.3H3.7C3.3,6.3,3,6.6,3,7c0,0.4,0.3,0.7,0.7,0.7h6.9c0.4,0,0.7-0.3,0.7-0.7C11.3,6.6,11,6.3,10.6,6.3z"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div class="row mt2 w-100">
            <div class="col-md-6">
              <div class="form-group">
                <input
                  v-model.trim="banner.title"
                  class="form-control"
                  placeholder="Enter banner title here"
                  name="title"
                  maxlength="100"
                  type="text"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <input
                  v-model.trim="banner.url"
                  type="text"
                  name="line"
                  class="form-control"
                  :placeholder="
                    'Enter banner link here (eg. ' + $config.baseUrl + ')'
                  "
                />
                <div v-if="urlValidation" class="input-error">
                  Please Enter valid URL
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <input
                  v-model.trim="banner.description"
                  type="text"
                  name="line"
                  class="form-control"
                  placeholder="Enter banner overlay text (30 characters max)"
                  :maxlength="30"
                />
              </div>
            </div>
            <div class="col-md-12">
              <div class="btn-groups">
                <button
                  type="submit"
                  class="btn"
                  :class="{ 'btn-disable': adding }"
                  :disabled="adding"
                >
                  <template v-if="adding">
                    <SpinLoading />
                    Saving...
                  </template>
                  <span v-else> Save </span>
                </button>
                <button
                  type="reset"
                  class="btn btn-gray ml0"
                  :class="{ 'btn-disable': adding }"
                  :disabled="adding"
                  @click="reset"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionExpand>
    </div>
  </form>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { TransitionExpand } from 'vue-transition-expand'
import 'vue-transition-expand/dist/vue-transition-expand.css'
import FileSaver from 'file-saver'
import routeParams from '~/mixins/routeParams'

const MAX_SIZE = 20971520 // 20mb

class Banner {
  constructor() {
    this.image_name = ''
    this.src = null
    this.blob = null
    this.title = ''
    this.description = ''
    this.url = ''
  }
}

export default {
  components: { TransitionExpand, Cropper },
  mixins: [routeParams],
  props: {
    edit: { type: Boolean, default: false },
  },
  data() {
    return {
      banner: new Banner(),
      adding: false,
      urlValidation: false,
      mime: null,
      imageError: false,
    }
  },
  watch: {
    async 'banner.url'(newValue) {
      if (newValue === '') {
        this.urlValidation = false
      } else {
        const x = await this.urlCheck(newValue)
        if (x === false) {
          this.urlValidation = true
        } else {
          this.urlValidation = false
        }
      }
    },
  },
  methods: {
    zoom(factor) {
      this.$refs.vueCropper.zoom(factor)
    },
    defaultSize() {
      return {
        width: 1920,
        height: 500,
      }
    },
    exportCropper() {
      const { canvas } = this.$refs.vac.getResult()
      canvas.toBlob((blob) => {
        FileSaver.saveAs(blob)
      })
    },
    reset() {
      if (this.$refs.fileInput) this.$refs.fileInput.value = null
      this.banner = new Banner()
    },
    selectFile() {
      this.$refs.fileInput.click()
    },
    onFileInput({ target }) {
      const [file] = target.files

      if (!file) {
        return
      }
      if (!file.type.match('image.*')) {
        this.$toast.global.error('Please choose an image file')
        return
      }
      this.mime = file.type

      if (file.size > MAX_SIZE) {
        this.$toast.error(' Image size should not exceed above 20 MB')
        this.reset()
        return
      }

      const reader = new FileReader()

      reader.onload = ({ target }) => {
        this.banner.src = target.result
        this.banner.blob = file
        this.banner.image_name = file.name

        target.value = null
      }

      reader.onerror = () => {
        this.$toast.error(
          'Failed to load image, try again or try selecting different file.'
        )
        this.reset()
      }

      reader.readAsDataURL(file)
    },
    async urlCheck(bannerData) {
      let bannerURL = bannerData
      if (
        !(bannerURL.startsWith('http://') || bannerURL.startsWith('https://'))
      ) {
        bannerURL = 'http://' + bannerURL.trim()
      }
      if (
        bannerURL === 'http://' ||
        bannerURL === 'https://' ||
        bannerURL.length < 8
      ) {
        return false
      }

      const testURL = bannerURL
      const myInit = {
        method: 'HEAD',
        mode: 'no-cors',
      }

      let myRequest
      try {
        myRequest = new Request(testURL, myInit)
      } catch (e) {
        return false
      }

      return await fetch(myRequest)
        .then(() => {
          return true
        })
        .catch(() => {
          return false
        })
    },
    async onSubmit() {
      if (this.banner.url?.length) {
        if (!(await this.urlCheck(this.banner.url))) {
          this.urlValidation = true
          return
        }
      }

      this.adding = true

      const formData = new FormData()
      formData.append('title', this.banner.title)
      formData.append('instance_id', this.routeInstanceId)
      formData.append('workspace_id', this.routeWorkspaceId)
      formData.append('description', this.banner.description)
      formData.append('url', this.banner.url)
      formData.append('image_name', this.banner.image_name)

      const { canvas } = this.$refs.vueCropper.getResult()
      if (!canvas) {
        this.$toast.global.error('Could not update banner. Please try again.')
        this.adding = false
        return
      }
      canvas.toBlob((_blob) => {
        // source canvas has no background fill, it falls back to black/no-color
        // so dumping source canvas to a new canvas with white background and preparing blob from there
        const cnv = document.createElement('canvas')
        cnv.width = canvas.width
        cnv.height = canvas.height
        const ctx = cnv.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(canvas, 0, 0)
        cnv.toBlob((blob) => {
          formData.append('image', blob)
          this.$axios
            .post('digital-assets/instance/banner/create', formData)
            .then(
              ({ data: { data: banner, message: dataMessage }, message }) => {
                this.$emit('new-banner', banner)
                this.$toast.global.success(message || dataMessage)
                this.reset()
              }
            )
            .catch(this.$errorToast)
            .finally(() => (this.adding = false))
        }, this.banner.blob.type)
      }, this.banner.blob.type)
    },
  },
}
</script>

<style>
.cropper-nobg {
  background: none;
}
.preview-bottom {
  width: 100%;
}
.upload-img-preview .prev-img-btn {
  display: block !important;
  transition: height 240ms cubic-bezier(0.165, 0.84, 0.844, 1) !important;
}
.upload-img-preview .bg-img {
  display: block;
  max-width: 100%;
}
.preview-bottom .title-input {
  width: 100%;
  flex: 1;
}
.preview-bottom .title-input input {
  min-width: 0;
  width: 100%;
}
</style>
