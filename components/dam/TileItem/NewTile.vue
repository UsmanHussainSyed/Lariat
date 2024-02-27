<template>
  <form class="add-banner" @submit.prevent="onSubmit">
    <div class="center-part-view-subheading pb-3">
      <h4>Add Tile</h4>
      <small class="text-muted">
        Image Size should be less than 2mb and Preferred resolution size is 900
        x 670</small
      >
    </div>
    <div class="upload-img-preview">
      <div class="input-group">
        <input
          class="form-control"
          type="text"
          :value="tile.image_name"
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
        <div v-if="tile.src" class="input-group prev-img-btn">
          <div
            ref="editorWrapper"
            class=""
            :style="{
              minHeight: '670px',
              maxHeight: '670px',
              position: 'relative',
              overflow: 'hidden',
            }"
          >
            <cropper
              ref="vueCropper"
              :src="tile.src"
              style="min-height: 670px; max-height: 670px"
              :auto-zoom="true"
              :default-size="defaultSize"
              image-restriction="none"
              background-class="cropper-nobg"
              :canvas="{
                minHeight: 670,
                maxHeight: 670,
                maxWidth: 900,
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
            <div v-if="tile.src" class="actions-btn">
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
                  class="form-control"
                  placeholder="Enter tile name"
                  name="title"
                  maxlength="30"
                  type="text"
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
                <div
                  v-if="$v.tile.url.$error && !$v.tile.url.required"
                  class="input-error"
                >
                  Please Enter the URL
                </div>
                <div v-if="urlValidation" class="input-error">
                  Please Enter valid URL
                </div>
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
                  <SpinLoading v-show="adding" />
                  {{ adding ? 'Saving...' : 'Save' }}
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
import FileSaver from 'file-saver'
import { required } from 'vuelidate/lib/validators'
import routeParams from '~/mixins/routeParams'

import 'vue-transition-expand/dist/vue-transition-expand.css'

const MAX_SIZE = 2097152 // 2mb

class Tile {
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
  data() {
    return {
      tile: new Tile(),
      adding: false,
      urlValidation: false,
      mime: null,
      imageError: false,
      validationTimer: null,
    }
  },
  watch: {
    'tile.url'(newValue) {
      if (newValue === '') {
        this.urlValidation = false
      } else {
        if (this.validationTimer) {
          clearTimeout(this.validationTimer)
          this.validationTimer = null
        }
        this.validationTimer = setTimeout(async () => {
          const x = await this.urlCheck(newValue)
          if (x === false) {
            this.urlValidation = true
          } else {
            this.urlValidation = false
          }
        }, 1000)
      }
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
      const { canvas } = this.$refs.vac.getResult()
      canvas.toBlob((blob) => {
        FileSaver.saveAs(blob)
      })
    },
    reset() {
      if (this.$refs.fileInput) this.$refs.fileInput.value = null
      this.tile = new Tile()
      this.urlValidation = false
      this.$v.$reset()
    },
    selectFile() {
      this.$refs.fileInput.click()
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
        this.tile.src = target.result
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
    async urlCheck(tileData) {
      let tileURL = tileData
      if (!(tileURL.startsWith('http://') || tileURL.startsWith('https://'))) {
        tileURL = 'http://' + tileURL.trim()
      }
      if (
        tileURL === 'http://' ||
        tileURL === 'https://' ||
        tileURL.length < 8
      ) {
        return false
      }
      const testURL = tileURL
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
      this.$v.$touch()
      if (this.$v.$invalid || this.adding || !this.tile.url) {
        return
      }

      this.adding = true
      if (!(await this.urlCheck(this.tile.url))) {
        this.urlValidation = true
        this.adding = false
        return
      }

      const formData = new FormData()
      formData.append('title', this.tile.title.substring(0, 30))
      formData.append('instance_id', this.routeInstanceId)
      formData.append('workspace_id', this.routeWorkspaceId)
      formData.append('description', this.tile.description)
      formData.append('url', this.tile.url)
      formData.append('image_name', this.tile.image_name)

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
          this.$axios
            .post('digital-assets/tile/create', formData)
            .then(({ data: { data: tile, message: dataMessage }, message }) => {
              this.$toast.global.success(message || dataMessage)
              this.reset()
              this.$axios
                .post('digital-assets/tile/update', {
                  instance_id: tile.instance_id,
                  workspace_id: this.routeWorkspaceId,
                  id: tile.id,
                  title: tile.title,
                  is_active: 1,
                  description: tile.description,
                  url: tile.url,
                })
                .then(({ data: { data: updatedTile } }) => {
                  this.$emit('new-tile', updatedTile)
                })
                .catch((e) => {
                  this.$errorToast(e)
                  this.$emit('new-tile', tile)
                })
            })
            .catch(this.$errorToast)
            .finally(() => (this.adding = false))
        }, this.tile.blob.type)
      }, this.tile.blob.type)
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

<style>
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
.cropper-nobg {
  background: none;
}
</style>
