<template>
  <form class="update-banner" @submit.prevent="EditTile">
    <div class="center-part-view-subheading pb-3">
      <h4>Update Tile</h4>
      <small class="text-muted">Size should be less than 2mb</small>
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
          :value="tile.image_name"
          placeholder="Upload image here"
          readonly
          :disabled="adding"
          @click.stop="!adding && $refs.fileInput.click()"
        />
      </div>
      <div class="input-group prev-img-btn">
        <div
          class=""
          :style="{
            minHeight: '670px',
            maxHeight: '670px',
            position: 'relative',
            overflow: 'hidden',
          }"
        >
          <div v-if="!cropperSrc" class="cropper-loader"></div>
          <cropper
            v-else
            ref="vueCropper"
            :src="cropperSrc"
            style="min-height: 670px; max-height: 670px"
            :auto-zoom="true"
            :default-size="defaultSize"
            image-restriction="none"
            background-class="cropper-nobg"
            :canvas="{
              minHeight: 670,
              maxHeight: 670,
              maxWidth: 900,
              minWidth: 900,
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
                v-model.trim="tile.title"
                type="text"
                name="title"
                class="form-control"
                placeholder="Enter tile name"
                maxlength="30"
              />
              <div
                v-if="$v.tile.title.$error && !$v.tile.title.required"
                class="input-error"
              >
                Please enter a title (max 30 characters)
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <input
                v-model.trim="tile.url"
                type="text"
                name="line"
                class="form-control"
                :placeholder="
                  'Enter tile url here (eg. ' + $config.baseUrl + ')'
                "
              />
              <div class="input-error">
                {{
                  $v.tile.url.$error && !$v.tile.url.required
                    ? 'Please enter a URL'
                    : invalidUrl
                    ? 'Please enter a valid URL'
                    : ''
                }}
              </div>
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
                {{ adding ? 'Updating...' : 'Update' }}
              </button>
              <button
                type="reset"
                :class="{ 'btn-disable': adding }"
                :disabled="adding"
                class="btn btn-gray"
                @click="$emit('closeEdit')"
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
import FileSaver from 'file-saver'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import routeParams from '~/mixins/routeParams'

const MAX_SIZE = 2097152
export default {
  components: { Cropper },
  mixins: [routeParams],
  data() {
    return {
      tile: {
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
      tileOriginal: null,
      invalidUrl: false,
      cropper: null,
      imageChange: 0,
      mime: null,
      cropperSrc: null,
      newUpload: false,
    }
  },
  computed: {
    isSame() {
      return this.$isSame(this.tile, this.tileOriginal)
    },
  },
  watch: {
    async 'tile.url'(newValue) {
      if (newValue?.length) {
        this.invalidUrl = false
        return
      }
      this.invalidUrl = !(await this.urlCheck(newValue))
    },
    'tile.image': {
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
        width: 900,
        height: 670,
      }
    },
    exportCropper() {
      const { canvas } = this.$refs.vueCropper.getResult()
      canvas.toBlob((blob) => {
        FileSaver.saveAs(blob)
      })
    },
    reset() {
      if (this.$refs.fileInput) this.$refs.fileInput.value = null
    },
    editTile(tileData) {
      if (this.tile.id === tileData.id) return
      this.newUpload = false
      this.adding = false
      this.tile.title = tileData.title || ''
      this.tile.image = tileData.image
      this.tile.description = tileData.description || ''
      this.tile.url = tileData.url || ''
      this.tile.image_name = tileData.image_name || ''
      this.tile.instance_id = tileData.instance_id
      this.tile.id = tileData.id
      this.tile.is_active = ~~tileData.is_active
      this.tileOriginal = Object.freeze({ ...this.tile })
    },
    onFileInput({ target }) {
      const [file] = target.files

      if (!file) return
      if (!file.type.match('image.*')) {
        this.$toast.global.error('Please choose an image file')
        return
      }

      if (file.size > MAX_SIZE) {
        this.$toast.error(' Image size should not exceed above 2 MB')
        this.reset()
        return
      }
      this.mime = file.type

      const reader = new FileReader()

      reader.onload = ({ target }) => {
        this.newUpload = true
        this.tile.image = target.result
        this.tile.blob = file
        this.tile.image_name = file.name
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
    urlCheck(tileData) {
      return new Promise((resolve) => {
        let tileURL = tileData
        if (
          !(tileURL.startsWith('http://') || tileURL.startsWith('https://'))
        ) {
          tileURL = 'http://' + tileURL.trim()
        }
        if (
          tileURL === 'http://' ||
          tileURL === 'https://' ||
          tileURL.length < 8
        ) {
          return resolve(false)
        }

        fetch(
          new Request(tileURL, {
            method: 'HEAD',
            mode: 'no-cors',
          })
        )
          .then(() => resolve(true))
          .catch(() => resolve(false))
      })
    },
    async EditTile() {
      this.$v.$touch()
      if (this.$v.$invalid || this.adding || !this.tile.url) {
        return
      }

      this.adding = true
      if (this.tile?.url?.length) {
        if (!(await this.urlCheck(this.tile.url))) {
          this.invalidUrl = true
          this.adding = false
          return
        }
      }

      const postData = new FormData()
      postData.append('title', this.tile.title.substring(0, 30))
      postData.append('instance_id', this.routeInstanceId)
      postData.append('workspace_id', this.routeWorkspaceId)
      postData.append('description', this.tile.description)
      postData.append('url', this.tile.url)
      postData.append('id', this.tile.id)
      postData.append('is_active', ~~this.tile.is_active)
      postData.append('image_name', this.tile.image_name)

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
          postData.append('image', blob)
          this.$axios
            .post('digital-assets/tile/update', postData)
            .then(({ data }) => {
              this.$toast.global.success(data.message)
              this.$emit('closeEdit')
              this.$emit('updateTile', data.data)
            })
            .catch((e) => {
              this.$toast.global.error(this.$getErrorMessage(e))
            })
            .finally(() => (this.adding = false))
        }, _blob.type)
      })
    },
  },
  validations: {
    tile: {
      title: { required },
      url: { required },
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
.actions {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  z-index: 999;
}
.actions > a {
  width: 50px;
  height: 50px;
}
</style>
