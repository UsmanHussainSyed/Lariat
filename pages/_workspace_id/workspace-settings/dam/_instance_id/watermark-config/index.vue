<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{
      'warning-massage': !globalNotification,
    }"
  >
    <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
      <div class="alert alert-warning alert-dismissible">
        <button v-if="0" type="button" class="close" data-dismiss="alert">
          <svg
            id="Layer_1"
            class="close-icon h-red"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4358" transform="translate(-69.745 -317.549)">
              <path
                id="Path_3424"
                class="fill-color"
                d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
              ></path>
              <path
                id="Path_3425"
                class="fill-color"
                d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
              ></path>
            </g>
          </svg>
        </button>
        Organization admin has disabled Email Notifications
      </div>
    </div>
    <div class="general-settings-title">
      <ul class="general-settings-tab">
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >DAM Settings</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id-product-settings',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >Product &amp; Order Settings</nuxt-link
          >
        </li>
        <li class="active">
          <nuxt-link
            :to="{
              name: 'workspace_id-workspace-settings-dam-instance_id-watermark-config',
              params: {
                instace_id: $route.params.instace_id,
              },
            }"
            >Watermark Configuration</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="workspace-settings">
      <div v-if="!watermarkConfigFetched" class="overlay">
        <div class="loader"></div>
      </div>
      <template v-else-if="!watermarkAllowed">
        <img
          :src="require('~/assets/img/blurred-images/watermark-config.png')"
          style="width: 100%"
        />
        <div class="common-overaly">
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
      </template>
      <template v-else>
        <div class="row no-gutters h-100">
          <div class="col-lg-6 col-md-6 h-100">
            <div class="workspace-setting-left w-100">
              <div class="general-settings-box customscrollbar">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <p>
                        <strong>Please note : </strong>Watermark only be
                        applicable on JPG, JPEG and PNG format assets.
                      </p>
                    </div>
                  </div>
                  <!--  ****************** for future use image and text options ******** -->
                  <!-- <div class="col-sm-12">
                      <div class="form-group">
                        <div class="radio-group">
                          <label class="radio-label">
                            Text
                            <input
                              v-model="watermark.type"
                              type="radio"
                              value="text"
                              name="watermark"
                            />
                            <span class="radio-span"></span>
                          </label>
                          <label class="radio-label">
                            Image
                            <input
                              v-model="watermark.type"
                              type="radio"
                              value="image"
                              name="watermark"
                            />
                            <span class="radio-span"></span>
                          </label>
                        </div>
                      </div>
                    </div> -->
                  <template v-if="watermark.type === 'text'">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label"
                          >Text to Display (Max. 20 Char)</label
                        >
                        <input
                          v-model="watermark.text.value"
                          type="text"
                          maxlength="20"
                          class="form-control"
                          placeholder="Confidential"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label"
                          >Font Size (in Pixels)</label
                        >
                        <input
                          v-model.number="watermark.text.fontSize"
                          type="number"
                          class="form-control"
                          placeholder="40"
                          @change="
                            () => {
                              if (watermark.text.fontSize < 0)
                                watermark.text.fontSize = 0
                            }
                          "
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label">Font Color</label>
                        <div class="picker">
                          <input
                            v-model="watermark.text.fontColor"
                            type="text"
                            class="form-control"
                            placeholder="#000000"
                          />
                          <input
                            v-model="watermark.text.fontColor"
                            type="color"
                            class="color-picker"
                            style="
                              padding: 2px;
                              width: 28px;
                              height: 33px;
                              margin: 4px 5px;
                            "
                          />
                          <!-- <span class="color-picker">
                              <span
                                class="current-color"
                                :style="`background-color: ${watermark.text.fontColor}`"
                              ></span>
                            </span> -->
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label">Opacity (%)</label>
                        <input
                          v-model.number="watermark.text.opacity"
                          type="number"
                          class="form-control"
                          placeholder="50"
                          @change="
                            () => {
                              if (watermark.text.opacity < 0)
                                watermark.text.opacity = 0
                              if (watermark.text.opacity > 100)
                                watermark.text.opacity = 100
                            }
                          "
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label">Position</label>
                        <ul class="position-sets ml5">
                          <li
                            v-for="i in 9"
                            :key="i"
                            :class="{ active: watermark.text.position === i }"
                            @click="watermark.text.position = i"
                          ></li>
                        </ul>
                      </div>
                    </div>
                    <!-- ********************  for future use orientation on watermark field ******************** -->
                    <!-- <div class="col-sm-12">
                        <div class="form-group">
                          <label class="control-label"
                            >Orientation (in degrees)</label
                          >
                          <input
                            v-model.number="watermark.text.orientation"
                            type="number"
                            min="0"
                            max="360"
                            class="form-control"
                            placeholder="0"
                          />
                        </div>
                      </div> -->
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="check-label"
                          >Update old assets
                          <i
                            v-tooltip="{
                              html: true,
                              content: `<p>This will update all the private assets including previously created with the latest configurations & This change is irreversible. This might take some time to affect on your account.</p>`,
                            }"
                            class="fa fa-info-circle"
                            aria-hidden="true"
                          ></i>
                          <input
                            v-model="watermark.is_check"
                            type="checkbox"
                            name=""
                          />
                          <span class="check-span"></span>
                        </label>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <button
                        type="submit"
                        name="submit"
                        class="btn"
                        :class="{ disabled: updating || isTextSaveDisable }"
                        @click="updateWatermark()"
                      >
                        <SpinLoading v-if="updating" /> Submit
                      </button>
                      <button
                        type="reset"
                        name="cancel"
                        class="btn btn-gray"
                        @click="reset()"
                      >
                        Cancel
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label"
                          >Choose Image
                          <i
                            v-tooltip="'Image size should be within 2MB'"
                            class="fa fa-info-circle"
                            aria-hidden="true"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Max File Size Allowable is 2MB. Only Jpg and Png Formats Are Allow."
                          ></i>
                        </label>
                        <div class="file-upload big right-btn">
                          <div class="file-select">
                            <div class="file-select-button">Choose File</div>
                            <div class="file-select-name">
                              {{ watermark.image.name || 'No File choosen' }}
                            </div>
                            <input
                              ref="watermarkImage"
                              type="file"
                              name="chooseFile"
                              accept=".jpg,.jpeg,.png"
                              @change="onImageUpload"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label">Image Size</label>
                        <Select2
                          v-model="watermark.image.size"
                          :options="['Small', 'Medium', 'Original']"
                          class="form-control select"
                          placeholder="Select Project Filter"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label">Opacity (%)</label>
                        <input
                          v-model.number="watermark.image.opacity"
                          type="number"
                          class="form-control"
                          placeholder="50"
                          @change="
                            () => {
                              if (watermark.image.opacity < 0)
                                watermark.image.opacity = 0
                              if (watermark.image.opacity > 100)
                                watermark.image.opacity = 100
                            }
                          "
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label class="control-label">Position</label>
                        <ul class="position-sets ml5">
                          <li
                            v-for="i in 9"
                            :key="i"
                            :class="{
                              active: watermark.image.position === i,
                            }"
                            @click="watermark.image.position = i"
                          ></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <button
                        type="submit"
                        name="submit"
                        class="btn"
                        :class="{ disabled: updating || isImageSaveDisable }"
                        @click="updateWatermark()"
                      >
                        <SpinLoading v-if="updating" /> Submit
                      </button>
                      <button
                        type="reset"
                        name="cancel"
                        class="btn btn-gray"
                        @click="reset()"
                      >
                        Cancel
                      </button>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="Object.keys(watermarkConfig).length"
            class="col-md-6 h-100"
          >
            <h4>Watermark Preview:</h4>
            <div class="position-relative overflow-hidden">
              <img
                class="w-100 d-block"
                :src="require('~/assets/img/watermark-config-background.jpg')"
                alt=""
              />
              <span
                v-if="watermark.type === 'text'"
                class="position-absolute ovrXWj_ki"
                :style="getTextPreviewStyle()"
                >{{ watermark.text.value }}</span
              >
              <div
                v-else-if="watermark.image.src && !watermark.image.error"
                :style="getImagePreviewStyle()"
                class="position-absolute ovrXWj_kj overflow-hidden"
              >
                <img
                  class="d-block"
                  style="max-width: 100%; pointer-events: none"
                  :style="{
                    visibility: watermark.image.naturalWidth
                      ? 'visible'
                      : 'hidden',
                  }"
                  :src="watermark.image.src"
                  @load="onImageLoaded"
                  @error="onImageError"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Select2 from '~/components/plugins/Select2'
export default {
  components: {
    Select2,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
  data() {
    return {
      /**
       * watermark active position data
       * | 1 | 2 | 3 |
       * | 4 | 5 | 6 |
       * | 7 | 8 | 9 |
       */
      watermark: {
        type: 'text',
        text: {
          value: null,
          fontSize: null,
          fontColor: null,
          opacity: null,
          position: 5,
          orientation: 0,
        },
        image: {
          src: null,
          blob: null,
          opacity: null,
          position: 5,
          name: null,
          size: 'Original',
          naturalWidth: null,
          naturalHeight: null,
          error: false,
        },
        is_check: false,
      },
      updating: false,
      watermarkConfig: {},
      subscriptionData: {},
      watermarkConfigFetched: true,
    }
  },
  computed: {
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
    watermarkAllowed() {
      return !!this.subscriptionData.features?.asset_watermark?.enable
    },
    isTextSaveDisable() {
      if (
        this.watermark.text.value &&
        this.watermark.text.fontSize &&
        this.watermark.text.fontColor &&
        this.watermark.text.opacity
      ) {
        return false
      } else return true
    },
    isImageSaveDisable() {
      if (
        this.watermark.image.opacity &&
        this.watermark.image.name &&
        this.watermark.image.size &&
        (this.watermark.image.src || this.watermark.image.blob)
      ) {
        return false
      } else return true
    },
  },
  async mounted() {
    await this.fetchSubscription()
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
    if (this.watermarkAllowed) {
      this.fetchWatermark(true)
    }
  },
  methods: {
    fetchSubscription() {
      this.watermarkConfigFetched = false
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
        .finally(() => {
          this.watermarkConfigFetched = true
        })
    },
    getTextPreviewStyle() {
      let top = 'auto'
      let right = 'auto'
      let bottom = 'auto'
      let left = 'auto'
      let textWidth = 0
      let textHeight = 0
      const span = document.createElement('span')
      span.style = `position:fixed;z-index:-1;font-size:${Number(
        this.watermark.text.fontSize
      )}px;`
      span.textContent = this.watermark.text.value
      document.body.appendChild(span)
      textWidth = span.clientWidth
      textHeight = span.clientHeight

      document.body.removeChild(span)
      switch (Number(this.watermark.text.position)) {
        case 1:
          top = '10px'
          left = '10px'
          break
        case 2:
          top = '10px'
          left = `calc(50% - ${textWidth / 2}px)`
          break
        case 3:
          top = '10px'
          right = '10px'
          break
        case 4:
          top = `calc(50% - ${textHeight / 2}px)`
          left = '10px'
          break
        case 5:
          top = `calc(50% - ${textHeight / 2}px)`
          left = `calc(50% - ${textWidth / 2}px)`
          break
        case 6:
          top = `calc(50% - ${textHeight / 2}px)`
          right = '10px'
          break
        case 7:
          bottom = '10px'
          left = '10px'
          break
        case 8:
          bottom = '10px'
          left = `calc(50% - ${textWidth / 2}px)`
          break
        case 9:
          bottom = '10px'
          right = '10px'
          break
      }
      return {
        fontSize: `${Number(this.watermark.text.fontSize)}px`,
        color: this.watermark.text.fontColor,
        opacity: Number(this.watermark.text.opacity) / 100,
        top,
        left,
        right,
        bottom,
        transformOrigin: 'center center',
        transform: `rotate(-${Number(this.watermark.text.orientation)}deg)`,
        whiteSpace: 'nowrap',
      }
    },
    onImageLoaded() {
      const img = this.$el.querySelector('.ovrXWj_kj > img')
      if (!img) return
      this.watermark.image.naturalWidth = img.naturalWidth
      this.watermark.image.naturalHeight = img.naturalHeight
    },
    onImageError() {
      this.watermark.image.error = true
      this.$toast.global.error('Could not load that image!')
    },
    getImagePreviewStyle() {
      if (this.watermark.image.error) return {}
      let top = 'auto'
      let right = 'auto'
      let bottom = 'auto'
      let left = 'auto'
      let size = 1
      switch (this.watermark.image.size) {
        case 'Small':
          size = 0.1
          break
        case 'Medium':
          size = 0.5
          break
      }
      switch (Number(this.watermark.image.position)) {
        case 1:
          top = 0
          left = 0
          break
        case 2:
          top = 0
          left = `calc(50% - ${
            (this.watermark.image.naturalWidth * size) / 2
          }px)`
          break
        case 3:
          top = 0
          right = 0
          break
        case 4:
          top = `calc(50% - ${
            (this.watermark.image.naturalHeight * size) / 2
          }px)`
          left = 0
          break
        case 5:
          top = `calc(50% - ${
            (this.watermark.image.naturalHeight * size) / 2
          }px)`
          left = `calc(50% - ${
            (this.watermark.image.naturalWidth * size) / 2
          }px)`
          break
        case 6:
          top = `calc(50% - ${
            (this.watermark.image.naturalHeight * size) / 2
          }px)`
          right = 0
          break
        case 7:
          bottom = 0
          left = 0
          break
        case 8:
          bottom = 0
          left = `calc(50% - ${
            (this.watermark.image.naturalWidth * size) / 2
          }px)`
          break
        case 9:
          bottom = 0
          right = 0
          break
      }
      return {
        opacity: Number(this.watermark.image.opacity) / 100,
        top,
        left,
        right,
        bottom,
        transformOrigin: 'center center',
        width: this.watermark.image.naturalWidth
          ? this.watermark.image.naturalWidth * size + 'px'
          : 'auto',
        height: this.watermark.image.naturalHeight
          ? this.watermark.image.naturalHeight * size + 'px'
          : 'auto',
      }
    },
    onImageUpload(e) {
      const file = (e?.target?.files || [])[0]
      if (!file || !(file instanceof File)) {
        this.$toast.global.error('Please select an image file.')
        this.watermark.image.src = null
        this.watermark.image.blob = null
        this.watermark.image.name = null
        this.$refs.watermarkImage.value = ''
        return
      }
      if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
        this.$toast.global.error('Please upload a JPG/JPEG/PNG file.')
        this.watermark.image.src = null
        this.watermark.image.blob = null
        this.watermark.image.name = null
        this.$refs.watermarkImage.value = ''
        return
      }
      // file size should not exceed 2MB
      if (file.size > 2097152) {
        this.$toast.global.error('Image size should not be more than 2 MB')
        this.watermark.image.src = null
        this.watermark.image.blob = null
        this.watermark.image.name = null
        this.$refs.watermarkImage.value = ''
        return
      }
      const reader = new FileReader()

      reader.onload = ({ target }) => {
        this.watermark.image.src = target.result
        this.watermark.image.blob = file
        this.watermark.image.name = file.name
        this.watermark.image.error = false
        target.value = null
      }

      reader.onerror = () => {
        this.$toast.error(
          'Failed to load image, try again or try selecting different file.'
        )
        this.watermark.image.src = null
        this.watermark.image.blob = null
        this.watermark.image.name = null
        this.watermark.image.error = true
        this.$refs.watermarkImage.value = ''
      }

      reader.readAsDataURL(file)
    },
    reset() {
      const numericPosition = (pos) => {
        const index = [
          'top-left',
          'top-center',
          'top-right',
          'center-left',
          'center-center',
          'center-right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ].findIndex((e) => e === pos)
        if (index < 0) return 5
        return index + 1
      }
      // text
      this.watermark.text.value = this.watermarkConfig.text
      this.watermark.text.fontSize = this.watermarkConfig.font_size
      this.watermark.text.fontColor = this.watermarkConfig.font_color
      this.watermark.text.opacity = Number(this.watermarkConfig.opacity)
      this.watermark.text.position = numericPosition(
        this.watermarkConfig.position
      )
      this.watermark.text.orientation =
        this.watermarkConfig.orientation || 'Horizontal'
      // image
      this.watermark.image.error = false
      this.watermark.image.src = this.watermarkConfig.image
      this.watermark.image.blob = null
      this.watermark.image.opacity = Number(this.watermarkConfig.opacity)
      this.watermark.image.position = numericPosition(
        this.watermarkConfig.position
      )
      this.watermark.image.name = this.watermarkConfig.image_name
    },
    async fetchWatermark(updateCurrentSettings) {
      this.watermarkConfigFetched = false
      const numericPosition = (pos) => {
        const index = [
          'top-left',
          'top-center',
          'top-right',
          'center-left',
          'center-center',
          'center-right',
          'bottom-left',
          'bottom-center',
          'bottom-right',
        ].findIndex((e) => e === pos)
        if (index < 0) return 5
        return index + 1
      }
      await this.$axios
        .$get('digital-assets/watermark-setting/get')
        .then(({ data }) => {
          this.watermarkConfig = Object.freeze(
            JSON.parse(JSON.stringify(data || {}))
          )
          if (updateCurrentSettings) this.watermark.type = data.type
          if (data.type === 'text') {
            this.watermark.text.value = data.text
            this.watermark.text.fontSize = data.font_size
            this.watermark.text.fontColor = data.font_color
            this.watermark.text.opacity = Number(data.opacity)
            this.watermark.text.position =
              this.watermarkConfig.type === 'text'
                ? numericPosition(data.position)
                : 5
            this.watermark.text.orientation = data.orientation
          } else {
            this.watermark.image.src = data.image
            this.watermark.image.blob = null
            this.watermark.image.name = data.image_name
            this.watermark.image.opacity = Number(data.opacity)
            this.watermark.image.position =
              this.watermarkConfig.type === 'image'
                ? numericPosition(data.position)
                : 5
          }
        })
        .catch((e) => {
          this.watermarkConfig = Object.freeze({})
          this.$toast.global.error(this.$getErrorMessage(e))
        })
      this.watermarkConfigFetched = true
    },
    updateWatermark() {
      if (this.updating || this.isTextSaveDisable) return
      this.updating = true
      const type = this.watermark.type
      const isChecked = this.watermark.is_check ? 1 : 0
      const position = [
        'top-left',
        'top-center',
        'top-right',
        'center-left',
        'center-center',
        'center-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ][this.watermark[type].position - 1]
      const formData = new FormData()
      formData.append('type', type)
      formData.append('position', position)
      formData.append('is_check', isChecked)
      if (type === 'text') {
        formData.append('text', this.watermark.text.value)
        formData.append('font_color', this.watermark.text.fontColor)
        formData.append('font_size', this.watermark.text.fontSize)
        formData.append('opacity', this.watermark.text.opacity || 0)
        formData.append('orientation', this.watermark.text.orientation || 0)
      } else {
        formData.append('image', this.watermark.image.blob)
        formData.append('opacity', this.watermark.image.opacity || 0)
        const _size = this.watermark.image.size.toLowerCase()
        formData.append('size', _size === 'original' ? 'large' : _size)
      }
      this.$axios
        .$post('digital-assets/watermark-setting/add', formData)
        .then(({ data }) => {
          this.$toast.global.success(
            'Watermark configuration updated successfully.'
          )
          this.fetchWatermark()
        })
        .catch((e) => {
          this.watermarkConfig = Object.freeze({})
          this.$toast.global.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.updating = false
        })
    },
  },
}
</script>

<style scoped>
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
