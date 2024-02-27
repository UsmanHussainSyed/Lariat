<template>
  <div class="sign-body bg-white">
    <h4>
      <span>You’re signing up as</span>
      <strong>{{ $auth.user.email }}</strong>
    </h4>
    <p>Provide Company Details</p>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-sm-12">
          <div class="form-group">
            <div class="img-upload small-img-upload imgwidth-input">
              <div class="img-upload-img">
                <!-- <div class="v-center">
                   <img src="img/icon/building.svg" alt="">
                </div> -->
                <div v-if="!imageData && !logo_preview" class="v-center">
                  <img src="~/assets/img/icon/building.svg" class="favicon" />
                </div>

                <div v-if="imageData != null" class="v-center">
                  <img v-if="imageData != null" :src="imageData" />
                </div>
                <div v-if="logo_preview" class="v-center">
                  <img :src="logo_preview" />
                </div>
                <!--                <span>S</span>-->
              </div>
              <div class="img-upload-alt">
                <span>Company Logo</span>
                <!--                <small class="upload-note"
                  >Preferred resolution required is 540 x 64.</small
                >-->
                <div class="file-select">
                  <div
                    class="file-select-name"
                    :class="{ 'btn-disable': uploadingLogo }"
                  >
                    Edit
                  </div>
                  <!--                  <div
                    v-else
                    :style="{
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'default',
                    }"
                  >
                    Uploading logo...
                  </div>-->
                  <div class="file-field-box">
                    <input
                      v-if="!uploadingLogo"
                      ref="fileInput"
                      type="file"
                      name="upload"
                      :disabled="uploadingLogo"
                      accept=".jpg, .png, .svg, .gif, .jpeg"
                      data-lpignore="true"
                      @change="changeLogo"
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
              >Company Favicon (Upload square favicon for best viewing
              experience)</label
            >
            <div class="file-upload big">
              <div class="file-select">
                <div id="fileName" class="file-select-button">Browse File</div>
                <div id="noFile" class="file-select-name">
                  {{ faviconName === null ? 'No file chosen...' : faviconName }}
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
                <img v-if="faviconIcon" :src="faviconIcon" alt="Favicon Icon" />
                <img
                  v-else
                  src="~/assets/img/lariat-icon.svg"
                  alt="Favicon Icon"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12">
          <div class="form-group required">
            <label class="control-label">Company Name</label>
            <input
              v-model.lazy="$v.form.name.$model"
              type="text"
              class="form-control"
              autofocus
              data-lpignore="true"
            />
            <div
              v-if="$v.form.name.$error && !$v.form.name.required"
              class="input-error"
            >
              Please provide Organization name
            </div>
          </div>
        </div>
        <div class="col-sm-12 mt-35">
          <button
            type="submit"
            :class="{
              'cs-btn-orange btn-block btn-spiner': true,
              'btn-disable': loading,
            }"
            :disabled="loading"
          >
            <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
            Submit
          </button>
        </div>
      </div>
    </form>
    <!-- crop company logo -->
    <div id="crop-logo" class="modal fade">
      <div
        class="modal-dialog xlarge modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLongTitle" class="modal-title mt-0 text-left">
              Cropping Company Logo
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
              <div v-if="imageData" class="input-group prev-img-btn">
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
                    :src="imageData"
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
import { required } from 'vuelidate/lib/validators'
import { TransitionExpand } from 'vue-transition-expand'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import $ from 'jquery'
export default {
  components: {
    TransitionExpand,
    Cropper,
  },
  layout: 'outerLayout',
  middleware: ['authCheck', 'check-workspace-modules'],
  data() {
    return {
      loading: false,
      form: {
        name: '',
        timezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Calcutta'
            ? 'Asia/Kolkata'
            : Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      logo: null,
      logo_preview: null,
      uploadingLogo: false,
      imageData: null,
      faviconIcon: null,
      faviconIconStore: null,
      faviconName: null,
      maxSize: 2097152,
    }
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      try {
        this.loading = true
        const formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('timezone', this.form.timezone)
        formData.append('is_branding', 1)
        formData.append('logo', this.logo)
        formData.append('brand_favicon', this.faviconIconStore)
        await this.$axios.$post('create-workspace', formData)
        // Force re-fetch user using active strategy.
        await this.$auth.fetchUser()

        const workspaceId = this.$auth.user.workspace_id
        // set current workspace
        this.$auth.user.workspace_id && this.$setCurrentWorkspace(workspaceId)
        // redirect to choose module
        return this.$router.replace({
          name: 'workspace_id-choose-modules',
          params: { workspace_id: workspaceId },
        })
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
        this.loading = false
      }
    },
    defaultSize() {
      return {
        width: 540,
        height: 64,
      }
    },
    reset() {
      if (this.$refs.fileInput) this.$refs.fileInput.value = null
      this.imageData = null
      $(document).find('.invitation-dismiss').trigger('click')
    },
    changeLogo(event) {
      const twoMB = 2097152
      if (event.target.files[0]) {
        if (!event.target.files[0].type.match('image.*')) {
          this.$toast.global.error('Please choose an image file')
          return
        }
        if (event.target.files[0].size < twoMB) {
          this.logo = event.target.files[0]
          const input = event.target
          if (input.files && input.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
              this.imageData = e.target.result
              window.$(document).find('#cropLogoDialog').trigger('click')
            }
            reader.readAsDataURL(input.files[0])
          }
        } else {
          event.target.value = null
          this.$toast.error('File size should not be more than 2MB')
        }
      }
    },
    companyLogoUpdate() {
      this.logo_preview = null
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
          this.logo = blob
          this.logo_preview = URL.createObjectURL(blob)
          this.uploadingLogo = false
          this.reset()
        })
      })
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
  },
  validations: {
    form: {
      name: { required },
    },
  },
}
</script>

<style>
.cropper-nobg {
  background: none;
}
.cropper {
  width: 100%;
}
</style>
