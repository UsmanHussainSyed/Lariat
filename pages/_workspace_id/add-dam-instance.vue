<template>
  <div class="body-content p0">
    <div class="sign-screen customscrollbar h-100 w-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-body bg-white">
              <h4>Create DAM instance</h4>
              <form class="form" @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <div class="img-upload small-img-upload imgwidth-input">
                        <div class="img-upload-img">
                          <div class="v-center">
                            <img
                              :src="
                                logo.src ||
                                require('~/assets/img/icon/building.svg')
                              "
                              alt=""
                              class="favicon"
                            />
                          </div>
                        </div>
                        <div class="img-upload-alt">
                          <span>Brand Logo</span>
                          <div class="file-select" @click="$refs.file.click()">
                            <div class="file-select-name">
                              {{ logo.src ? 'Change Logo' : 'Upload' }}
                            </div>
                            <div class="file-field-box">
                              <input
                                ref="file"
                                type="file"
                                name="logo"
                                :accept="$fileAcceptInputImage"
                                hidden
                                @input="logoChange"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group favicon-input-box">
                      <label class="control-label"
                        >Brand Favicon (Upload square favicon for best viewing
                        experience)</label
                      >
                      <div class="file-upload big">
                        <div class="file-select">
                          <div class="file-select-button" id="fileName">
                            Browse File
                          </div>
                          <div class="file-select-name" id="noFile">
                            {{
                              faviconName === null
                                ? 'No file chosen...'
                                : faviconName
                            }}
                          </div>
                          <input
                            id="chooseFile"
                            ref="favicon"
                            type="file"
                            name="chooseFile"
                            accept=".jpg, .png, .svg, .gif, .jpeg"
                            @change="onFileChange($event.target.files)"
                          />
                        </div>
                        <div class="file-preview-box">
                          <img v-if="faviconIcon" :src="faviconIcon" alt="" />
                          <svg
                            v-else
                            class="web-icon"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 18 18"
                            xml:space="preserve"
                          >
                            <path
                              id="Icon_ionic-md-globe-2"
                              class="fill-color"
                              d="M9,0C4,0,0,4,0,9s4,9,9,9s9-4,9-9S14,0,9,0z M8.1,16.4c-4.1-0.5-7-4.2-6.5-8.3c0.2-1.5,0.8-2.8,1.7-4c0,0.3,0.1,0.7,0.1,1C3.2,6,3.3,6.9,3.8,7.6C4,8,4.1,8.4,4.2,8.8C4.3,9.2,4.7,9.4,5,9.6c0.6,0.5,1.2,1,1.8,1.4c0.4,0.3,0.7,0.4,0.6,0.9c-0.1,0.4-0.2,0.7-0.3,1c0,0.3,0.2,0.7,0.4,0.9c0.3,0.3,0.6,0.6,1,0.9C8.9,15.2,8.3,15.8,8.1,16.4L8.1,16.4z M14.3,14.3c-1.1,1.1-2.4,1.8-3.9,2.1c0.2-0.5,0.5-0.9,0.9-1.2c0.3-0.3,0.6-0.6,0.8-1c0.2-0.3,0.4-0.7,0.6-1c0.3-0.5-0.7-1.1-1.1-1.3c-0.7-0.3-1.4-0.8-2-1.2c-0.5-0.3-1.4,0.2-2-0.1c-0.7-0.4-1.4-0.8-2-1.4C5.1,8.7,5.1,8.1,5.1,7.4c0.5,0,1.2-0.1,1.6,0.3c0.1,0.1,0.5,0.7,0.7,0.5c0.2-0.2-0.2-0.8-0.2-1C7,6.7,7.7,6.5,8,6.1C8.5,5.7,9.5,5,9.4,4.7s-1-1.2-1.5-1.1C7.8,3.7,7.1,4.4,7,4.5C7,4.3,7,4,7,3.8c0-0.2-0.3-0.3-0.3-0.4c0-0.2,0.7-0.7,0.9-0.9C7.5,2.4,7.1,2.1,6.9,2.1C6.6,2.2,6.3,2.3,6,2.4c0-0.1,0-0.2,0-0.3c0.6-0.3,1.2-0.5,1.9-0.6l0.6,0.2l0.4,0.5l0.4,0.4l0.4,0.1l0.6-0.5l-0.2-0.4V1.6c1.1,0.2,2.2,0.6,3.2,1.2c-0.2,0-0.4,0-0.6,0.1c-0.1,0-0.2-0.1-0.3-0.1C12.7,3.4,13,4,13.3,4.5c0.3,0.6,1,1.3,1.1,1.9c0.1,0.8,0,1.5,0.1,2.4c0.2,0.7,0.5,1.3,1,1.9c0.2,0.1,0.5,0.1,0.8,0.1C15.9,12.1,15.3,13.3,14.3,14.3L14.3,14.3z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group required">
                      <label class="control-label">Brand Name</label>
                      <input
                        v-model.trim="$v.brand.name.$model"
                        type="text"
                        class="form-control"
                        placeholder="eg. abc"
                        autocomplete="off"
                      />
                      <div v-if="$v.brand.name.$error" class="input-error">
                        <template v-if="!$v.brand.name.required">
                          Please provide brand name
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <div class="radio-group">
                        <label class="radio-label">
                          Brand URL
                          <input
                            type="radio"
                            value="brand"
                            name="url"
                            :checked="brand.is_domain == 0"
                            @click="selectUrl"
                          />
                          <span class="radio-span"></span>
                        </label>
                        <label
                          v-tooltip="
                            customBrandAllowed
                              ? ''
                              : 'Please upgrade your subscription plan to enable this feature.'
                          "
                          class="radio-label"
                          :style="customBrandAllowed ? '' : 'opacity:0.4'"
                          @click="
                            (e) => {
                              if (!customBrandAllowed) {
                                e.stopPropagation()
                                e.stopImmediatePropagation()
                                e.preventDefault()
                              } else selectUrl(e)
                            }
                          "
                        >
                          Custom URL
                          <input
                            type="radio"
                            value="custom"
                            name="url"
                            :checked="
                              customBrandAllowed && brand.is_domain == 1
                            "
                            :style="
                              customBrandAllowed ? '' : 'pointer-events:none'
                            "
                            @click="customBrandAllowed ? selectUrl : ''"
                          />
                          <span class="radio-span"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div v-if="brand.is_domain == 0" class="col-sm-12">
                    <div class="form-group required">
                      <input
                        type="text"
                        class="form-control"
                        v-model.trim="$v.brand.brandUrl.$model"
                        autocomplete="off"
                      />
                      <div v-if="$v.brand.brandUrl.$error" class="input-error">
                        <template v-if="!$v.brand.brandUrl.required">
                          URL is required.
                        </template>
                        <template v-else-if="!$v.brand.brandUrl.length">
                          URL must must contain 3 characters.
                        </template>
                        <template v-else-if="!$v.brand.brandUrl.format">
                          URL must start with an alphabet and should only
                          contain a-z, 0-9, _ and -.
                        </template>
                      </div>
                      <div v-else class="input-info">
                        <template v-if="!$v.brand.brandUrl.$model"
                          >eg.</template
                        >
                        {{ $config.damBaseUrl }}/<strong
                          v-if="$v.brand.brandUrl.$model"
                          >{{ $v.brand.brandUrl.$model }}</strong
                        ><strong v-else>&lt;Brand_URL&gt;</strong>
                        <!-- <a href="https://dam-dev3.herokuapp.com/peekaboo" target="__blank">https://dam-dev3.herokuapp.com/<strong>peekaboo</strong></a> -->
                      </div>
                    </div>
                  </div>
                  <div v-else class="col-sm-12">
                    <div class="form-group w-100">
                      <input
                        v-model.trim="$v.brand.domainUrl.$model"
                        type="text"
                        class="form-control"
                        autocomplete="off"
                      />
                      <div v-if="$v.brand.domainUrl.$error" class="input-error">
                        <template v-if="!$v.brand.domainUrl.required">
                          URL is required.
                        </template>
                        <template v-else-if="!$v.brand.domainUrl.length">
                          URL must must contain 3 characters.
                        </template>
                        <template v-else-if="!$v.brand.domainUrl.format">
                          URL must start with an alphabet and should only
                          contain a-z, 0-9, _ and -.
                        </template>
                      </div>
                      <div class="input-info">
                        <span
                          >eg. yourdomain.com or brandname.yourdomain.com</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 mt-35">
                    <button
                      type="submit"
                      class="cs-btn-orange btn-block"
                      :class="{ 'btn-disable ': loading }"
                      :disabled="loading"
                    >
                      <i
                        v-if="loading"
                        class="fa fa-circle-o-notch fa-spin"
                      ></i>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- crop company logo -->
    <div id="crop-logo" class="modal fade">
      <div
        class="modal-dialog xlarge modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title">
              Crop Company Logo
            </h5>
            <button
              type="button"
              class="close invitation-dismiss"
              data-dismiss="modal"
              aria-label="Close"
              @click="reset"
            >
              <span aria-hidden="true">
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
              </span>
            </button>
          </div>
          <div class="modal-body">
            <TransitionExpand>
              <div v-if="logo.temp_src" class="input-group prev-img-btn">
                <div
                  ref="editorWrapper"
                  class=""
                  :style="{
                    width: '100%',
                    minHeight: '300px',
                    maxHeight: '300px',
                    position: 'relative',
                    overflow: 'hidden',
                  }"
                >
                  <cropper
                    ref="vueCropper"
                    class="cropper"
                    :src="logo.temp_src"
                    style="min-height: 300px; max-height: 300px"
                    :auto-zoom="true"
                    :default-size="defaultSize"
                    image-restriction="none"
                    background-class="cropper-nobg"
                    :canvas="{
                      minHeight: 64,
                      maxHeight: 64,
                    }"
                    :stencil-props="{
                      handlers: {},
                      movable: true,
                      scalable: false,
                      resizable: true,
                    }"
                    :resize-image="{
                      adjustStencil: true,
                    }"
                  />
                </div>
              </div>
            </TransitionExpand>
            <div class="notes pb0 pt-4">
              <p>
                <strong>Note : </strong>Your logo must be fit in given selected
                area.
              </p>
            </div>
          </div>
          <div class="modal-footer justify-content-start">
            <div class="btn-group">
              <button
                class="btn"
                :class="{ 'btn-disable': uploadingLogo }"
                :disabled="uploadingLogo"
                @click="companyLogoUpdate()"
              >
                <SpinLoading v-if="uploadingLogo" />
                {{ uploadingLogo ? 'Saving...' : 'Save' }}
              </button>
              <button
                type="reset"
                class="btn btn-gray"
                :class="{ 'btn-disable': uploadingLogo }"
                :disabled="uploadingLogo"
                @click="reset"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a id="cropLogoDialog" href="javascript:void(0);" style="display: none">
    </a>
  </div>
</template>

<script>
import { TransitionExpand } from 'vue-transition-expand'
import { required, minLength } from 'vuelidate/lib/validators'
import { Cropper } from 'vue-advanced-cropper'
import $ from 'jquery'
import 'vue-advanced-cropper/dist/style.css'

export default {
  components: {
    TransitionExpand,
    Cropper,
  },
  layout: 'damLayout',
  middleware: ['authCheck', 'check-dam-instance'],
  data() {
    return {
      loading: false,
      logo: { src: null, file: null, temp_src: null },
      brand: { name: '', domainUrl: '', brandUrl: '', is_domain: 0 },
      faviconIcon: null,
      faviconName: null,
      faviconIconStore: null,
      uploadingLogo: false,
    }
  },
  computed: {
    customBrandAllowed() {
      return !!this.$auth.user?.subscription_features?.custom_brand_url?.enable
    },
  },
  watch: {
    '$store.state.dam.companyName': {
      handler(n) {
        this.brand.name = n
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    companyLogoUpdate() {
      this.uploadingLogo = true
      const { canvas } = this.$refs.vueCropper.getResult()
      if (!canvas) {
        this.$toast.global.error('Could not update banner. Please try again.')
        this.uploadingLogo = false
        return
      }
      canvas.toBlob((_blob) => {
        // source canvas has no background fill, it falls back to black/no-color
        // so dumping source canvas to a new canvas with white background and preparing blob from there
        const cnv = document.createElement('canvas')
        cnv.width = canvas.width
        cnv.height = canvas.height
        const ctx = cnv.getContext('2d')
        ctx.fillStyle = 'transparent'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(canvas, 0, 0)
        cnv.toBlob((blob) => {
          const file = new File([blob], 'logo')
          const reader = new FileReader()

          reader.onload = ({ target: { result } }) => {
            this.logo = { file, src: result, temp_src: null }
          }
          reader.readAsDataURL(file)
          this.uploadingLogo = false
          this.reset()
        })
      })
    },
    defaultSize() {
      return {
        width: 540,
        height: 64,
      }
    },
    reset() {
      this.logo.temp_src = null
      $(document).find('.invitation-dismiss').trigger('click')
    },
    onFileChange(file) {
      const imageFile = file[0]
      if (file.length > 0) {
        if (!imageFile.type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
        } else if (imageFile.size > this.maxSize) {
          this.$toast.global.error(
            'Your file is too big! Please select an image under 2MB'
          )
        } else {
          const img = new Image()
          img.src = URL.createObjectURL(imageFile)
          img.onload = () => {
            const width = img.naturalWidth
            const height = img.naturalHeight
            if (width === height) {
              this.faviconName = imageFile.name
              this.faviconIcon = img.src
              this.faviconIconStore = imageFile
            } else {
              this.$toast.global.error('Please upload a Square image.')
            }
          }
        }
      }
    },
    selectUrl(ev) {
      if (ev.target.value === 'brand') {
        this.brand.is_domain = 0
        this.brand.domainUrl = ''
      } else {
        this.brand.is_domain = 1
        this.brand.brandUrl = ''
      }
    },
    async handleSubmit(e) {
      if ((this.$v.$touch(), this.$v.$invalid)) return

      this.loading = true

      const formData = new FormData()
      if (this.brand.is_domain === 0) {
        formData.append('url', this.brand.brandUrl)
      } else {
        formData.append('url', this.brand.domainUrl)
      }
      formData.append('brand_name', this.brand.name)
      formData.append('workspace_id', this.$getWorkspaceId())
      formData.append('is_domain', this.brand.is_domain)

      if (this.logo.file) formData.append('logo', this.logo.file)
      if (this.faviconIcon)
        formData.append('brand_favicon', this.faviconIconStore)

      const response = await this.$axios
        .$post('digital-assets/instance/create', formData)
        .catch((e) => {
          const {
            error: { brand_name = [], url = [] },
            message,
          } = e.response.data
          const _messages =
            brand_name.length || url.length
              ? [brand_name[0], url[0]].filter((e) => e)
              : [message]
          _messages.forEach((_message) => this.$toast.global.error(_message))
        })
        .catch(this.$checkValidation)

      if (response) {
        const { message } = response
        if (message) this.$toast.global.success(message)

        await this.$auth.fetchUser()

        this.$router.replace({
          name: 'workspace_id-dam',
          params: {
            workspace_id: this.$getWorkspaceId(),
            reload: true,
          },
        })
      }

      this.loading = false
    },
    logoChange({ target }) {
      const minSize = 2097152 * 2 // 4 mb
      const {
        files: [file],
      } = target

      if (!file) {
        this.logo = { file: null, src: null }
        return
      }

      if (file.size > minSize) {
        this.$toast.global.error('File size should not be more than 4MB')
        return
      }

      const reader = new FileReader()

      reader.onload = ({ target: { result } }) => {
        this.logo = { file, src: this.logo.src || null, temp_src: result }
        this.removeLogo = false
        target.value = null
        window.$(document).find('#cropLogoDialog').trigger('click')
      }
      reader.readAsDataURL(file)
    },
  },
  validations() {
    if (this.brand.is_domain === 0 || this.brand.is_domain === '0') {
      return {
        brand: {
          name: { required },
          brandUrl: {
            required,
            length: minLength(3),
            format(v) {
              return /^[a-z]{1}[a-z0-9_-]{2,36}$/gi.test(v)
            },
          },
        },
      }
    }
    if (this.brand.is_domain === 1 || this.brand.is_domain === '1') {
      return {
        brand: {
          name: { required },
          domainUrl: {
            required,
            length: minLength(3),
            format(v) {
              return /^[a-z0-9]+[_-]?.[a-z0-9\-_]*(\.[a-z]{1,3}){1,2}$/gi.test(
                v
              )
            },
          },
        },
      }
    }
  },
}
</script>
<style scoped>
.cropper-nobg {
  background: none;
}
.cropper {
  width: 100%;
}
</style>
