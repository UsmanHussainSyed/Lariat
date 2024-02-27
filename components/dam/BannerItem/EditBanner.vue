<template>
  <form class="update-banner" @submit.prevent="EditBanner">
    <div class="center-part-view-subheading pb-3">
      <h4>Update Banner</h4>
      <small class="text-muted"
        >Preferred Image size should be 1920×500px (Size should be less than
        20mb)</small
      >
    </div>
    <div class="upload-img-preview">
      <div class="input-group">
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
        <input
          type="text"
          class="form-control"
          :value="banner.image_name"
          placeholder="Upload image here"
          readonly
          :disabled="adding"
          @click.stop="onUploadClick"
        />
      </div>
      <div class="input-group prev-img-btn">
        <div
          class=""
          :style="{
            minHeight: '500px',
            maxHeight: '500px',
            position: 'relative',
            overflow: 'hidden',
          }"
        >
          <div v-if="!cropperSrc" class="cropper-loader"></div>
          <cropper
            v-else
            ref="vueCropper"
            :src="cropperSrc"
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
          <div v-if="cropperSrc" class="actions-btn">
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
                type="text"
                name="title"
                class="form-control"
                placeholder="Enter banner title here"
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
                :disabled="adding || !cropperSrc"
                class="btn update-banner-btn"
              >
                <SpinLoading v-show="adding" />
                <span> {{ adding ? 'Updating...' : 'Update' }} </span>
              </button>
              <button
                type="reset"
                :class="{ 'btn-disable': adding }"
                :disabled="adding"
                class="btn btn-gray"
                @click.capture.stop="$emit('closeEdit')"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import axios from 'axios'
import routeParams from '~/mixins/routeParams'

const MAX_SIZE = 20971520
export default {
  components: { Cropper },
  mixins: [routeParams],
  data() {
    return {
      banner: {
        image: null,
        title: '',
        blob: null,
        description: '',
        url: '',
        image_name: '',
        instance_id: null,
        id: null,
        is_active: 0,
      },
      adding: false,
      bannerOriginal: null,
      urlValidation: false,
      cropperSrc: null,
      newUpload: false,
    }
  },
  computed: {
    isSame() {
      return this.$isSame(this.banner, this.bannerOriginal)
    },
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
    'banner.image': {
      handler(n) {
        this.cropperSrc = null
        if (!this.newUpload) {
          axios
            .get('/s3/resource?url=' + encodeURIComponent(n))
            .then((r) => {
              this.cropperSrc = r.data
            })
            .catch((e) => {
              this.$toast.global.error(this.$getErrorMessage(e))
              this.cropperSrc = null
              this.$emit('closeEdit')
              this.adding = false
            })
        } else {
          this.cropperSrc = n
        }
      },
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
    onUploadClick() {
      if (this.adding) return
      this.reset()
      this.$refs.fileInput.click()
    },
    reset() {
      if (this.$refs.fileInput) this.$refs.fileInput.value = null
    },
    editBanner(bannerData) {
      if (this.banner.id === bannerData.id) return
      this.newUpload = false
      this.adding = false
      this.banner.title = bannerData.title || ''
      this.banner.image = bannerData.image
      this.banner.description = bannerData.description || ''
      this.banner.url = bannerData.url || ''
      this.banner.image_name = bannerData.image_name
      this.banner.instance_id = bannerData.instance_id
      this.banner.id = bannerData.id
      this.banner.is_active = ~~bannerData.is_active
      this.bannerOriginal = Object.freeze({ ...this.banner })
    },
    onFileInput({ target }) {
      const [file] = target.files

      if (!file) {
        this.reset()
        return
      }
      if (!file.type.match('image.*')) {
        this.$toast.global.error('Please choose an image file')
        this.reset()
        return
      }

      if (file.size > MAX_SIZE) {
        this.$toast.error(' Image size should not exceed above 20 MB')
        this.reset()
        return
      }

      const reader = new FileReader()

      reader.onload = ({ target }) => {
        this.newUpload = true
        this.banner.image = target.result
        this.banner.blob = file
        this.banner.image_name = file.name

        target.value = null
        this.reset()
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
    async EditBanner() {
      if (this.banner.url?.length) {
        if (!(await this.urlCheck(this.banner.url))) {
          this.urlValidation = true
          return
        }
      }
      this.adding = true

      const formData = new FormData()
      formData.append('instance_id', this.banner.instance_id)
      formData.append('workspace_id', this.routeWorkspaceId)
      formData.append('id', this.banner.id)
      formData.append('title', this.banner.title)
      formData.append('is_active', this.banner.is_active)
      formData.append('description', this.banner.description)
      formData.append('url', this.banner.url)

      if (!this.banner.blob) {
        delete this.banner.blob
      }
      const { canvas } = this.$refs.vueCropper.getResult()
      if (!canvas) {
        this.$toast.global.error('Could not update banner. Please try again.')
        this.adding = false
        return
      }
      canvas.toBlob((_blob) => {
        const cnv = document.createElement('canvas')
        cnv.width = canvas.width
        cnv.height = canvas.height
        const ctx = cnv.getContext('2d')
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(canvas, 0, 0)
        cnv.toBlob((blob) => {
          formData.append('image', blob)
          formData.append('image_name', this.banner.image_name)
          this.$axios
            .post('digital-assets/instance/banner/update', formData)
            .then(({ data }) => {
              this.$toast.global.success(data.message)
              this.$emit('closeEdit')
              if (this.banner?.blob) {
                delete this.banner.blob
              }
              const bannerData = data.data
              bannerData.description = bannerData.description || ''
              bannerData.title = bannerData.title || ''
              bannerData.url = bannerData.url || ''
              this.$emit('updateBanner', { ...bannerData })
            })
            .catch((e) => {
              this.$toast.error(this.$getErrorMessage(e))
            })
            .finally(() => (this.adding = false))
        }, _blob.type)
      }) // blob.type)
    },
  },
}
</script>

<style scoped>
.cropper-loader {
  position: relative;
  min-height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}
.cropper-loader::before {
  content: '';
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
