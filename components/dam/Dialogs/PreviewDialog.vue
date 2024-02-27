<template>
  <Model
    v-model="model"
    hide-buttons
    :header-text="`Preview of ${assetPreview.version}`"
    :model-footer="false"
    :layout-class="'large'"
  >
    <div
      style="text-align: center"
      class="asset-detail-img m0 h-100"
      :style="{ display: previewIcon ? 'block' : 'flex' }"
    >
      <template v-if="isPdf">
        <img
          v-if="previewLoaded"
          ref="docFile"
          class="img-fluid"
          style="object-fit: contain"
          :src="previewFile"
          :alt="assetPreview.display_file_name"
        />
        <iframe
          v-else
          type="application/pdf"
          :src="__url + '#toolbar=0?transparent=0'"
          width="100%"
          height="100%"
          style="height: calc(100vh - 200px)"
          @load="checkPreview"
        ></iframe>
      </template>
      <template v-else-if="isHtml">
        <img
          ref="docFile"
          class="img-fluid"
          style="object-fit: contain"
          :src="previewImage"
          :alt="assetPreview.display_file_name"
          @error="imageErrorHandle"
        />
      </template>
      <template v-else-if="isTxt">
        <img
          v-if="previewLoaded"
          ref="docFile"
          class="img-fluid"
          style="object-fit: contain"
          :src="previewFile"
          :alt="assetPreview.display_file_name"
        />
        <iframe
          v-else
          type="application/txt"
          :src="__url"
          width="100%"
          height="100%"
          style="height: calc(100vh - 200px)"
          @load="checkPreview"
        ></iframe>
      </template>
      <template v-else-if="isDoc">
        <img
          v-if="previewLoaded"
          ref="docFile"
          class="img-fluid"
          style="object-fit: contain"
          :src="previewFile"
          :alt="assetPreview.display_file_name"
        />
        <iframe
          v-else
          :src="`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            __url
          )}`"
          width="100%"
          height="100%"
          frameborder="0"
          style="height: calc(100vh - 200px)"
          @load="checkPreview"
        >
          This is an embedded
          <a target="_blank" href="http://office.com"> Microsoft Office </a>
          document, powered by
          <a target="_blank" href="http://office.com/webapps"> Office Online </a
          >.
        </iframe>
      </template>
      <client-only v-else-if="isVideo">
        <!-- :poster="videoThumbnail" -->
        <video
          ref="video"
          controlsList="nodownload"
          type="video/mp4"
          disablePictureInPicture
          controls
          crossOrigin="anonymous"
          @error="ui.videoError = true"
          @emptied="ui.videoError = true"
        >
          <source :src="__url" type="video/mp4" />
          <object>
            <img
              ref="videoFile"
              :alt="assetPreview.display_file_name"
              :src="previewImage"
              width="640"
              height="360"
              title="No video playback capabilities, please download the video below"
              @error="imageErrorHandle"
            />
          </object>
          Your browser does not support the video tag.
        </video>
      </client-only>
      <div v-else-if="isAudio" style="margin: auto">
        <client-only>
          <av-waveform
            v-if="__url"
            ref="audio"
            :audio-src="__url"
            :canv-width="1200"
            :canv-height="200"
            :playtime-font-size="18"
            :played-line-width="2"
            :playtime-clickable="false"
            :noplayed-line-width="1"
            played-line-color="#ed703d"
            noplayed-line-color="#1a1d2556"
          ></av-waveform>
        </client-only>
      </div>
      <template v-else-if="isImage">
        <img
          ref="sourceImage"
          class="img-fluid"
          style="object-fit: contain"
          :src="previewImage"
          :alt="assetPreview.display_file_name"
          @error="imageErrorHandle"
        />
      </template>
      <div v-else class="m-auto" style="text-align: center">
        <img
          class="img-fluid"
          style="max-height: 128px; object-fit: contain"
          :src="previewImage"
          :alt="assetPreview.display_file_name"
          @error="imageErrorHandle"
        />
        <p class="mt-3">
          {{
            ui.videoError
              ? 'We cannot play this video, yet...'
              : 'No preview available for this file.'
          }}
        </p>
      </div>
      <p v-if="previewIcon" class="mt-3">
        {{ 'No preview available for this file.' }}
      </p>
    </div>
  </Model>
</template>
<script>
import axios from 'axios'
import Model from '~/components/plugins/Model'
import versionFileType from '~/mixins/versionFileType'

function resizeCanvas() {
  const $canvas = window.$('.asset-detail-img canvas')
  const $container = window.$('.asset-detail-img')

  $canvas.outerWidth($container.width())
}

export default {
  components: { Model },
  extends: Model,
  mixins: [versionFileType],
  props: {
    assetPreview: { type: Object, required: true },
  },
  data() {
    return {
      ui: {
        videoError: false,
      },
      previewLoaded: false,
      previewFile: null,
      previewIcon: false,
    }
  },
  watch: {
    model() {
      if (!this.model) {
        this.previewIcon = false
      }
      if (this.model === true && this.isVideo) {
        if (this.isVideo)
          this.$nextTick(() => {
            this.$refs.video.setAttribute('crossOrigin', 'anonymous')
            const playPromise = this.$refs.video.play()

            // In browsers that don’t yet support this functionality,
            // playPromise won’t be defined.
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  this.$refs.video.pause()
                  // Automatic playback started!
                })
                .catch((error) => {
                  console.log(error)
                  this.ui.videoError = true
                  // Automatic playback failed.
                  // Show a UI element to let the user manually start playback.
                })
            }
          })
      } else if (this.model === false && this.isVideo) {
        this.$refs.video.pause()
      } else if (this.model === false && this.isAudio) {
        this.$refs.audio.audio.pause()
      }
    },
  },
  mounted() {
    if (this.isAudio) {
      this.$nextTick(() => {
        window.$(document).ready(function () {
          window.$('.asset-detail-img audio').attr('controlsList', 'nodownload')
          resizeCanvas()
          window.$(window).on('resize', function () {
            resizeCanvas()
          })
        })
      })
    }
  },
  methods: {
    imageErrorHandle(data) {
      if (this.isPdf || this.isTxt || this.isDoc || this.isHtml) {
        this.previewIcon = true
      }
      try {
        data.target.src = require(`~/assets/img/file/${this.assetPreview.file_type.toLowerCase()}.svg`)
      } catch {
        data.target.src = require(`~/assets/img/file/general.svg`)
      }
      setTimeout(() => {
        if (this.assetPreview.file_type.toLowerCase() === 'html') {
          this.$refs.docFile.style.maxHeight = '128px'
        } else if (this.$isVideo(this.assetPreview.file_type)) {
          this.$refs.videoFile.style.maxHeight = '128px'
        } else if (this.$isImage(this.assetPreview.file_type)) {
          this.$refs.sourceImage.style.maxHeight = '128px'
        }
      }, 50)
    },
    errorHandle() {
      if (this.isPdf || this.isTxt || this.isDoc || this.isHtml) {
        this.previewIcon = true
      }
      try {
        this.previewFile = require(`~/assets/img/file/${this.assetPreview.file_type.toLowerCase()}.svg`)
      } catch {
        this.previewFile = require(`~/assets/img/file/general.svg`)
      }
      setTimeout(() => {
        this.$refs.docFile.style.maxHeight = '128px'
      }, 50)
    },
    checkPreview() {
      axios
        .get(this.assetPreview.display_file)
        .then(() => {
          this.previewIcon = false
          return true
        })
        .catch(() => {
          if (this.assetPreview.file_preview_id) {
            if (this.assetPreview.file_preview_status === 'success') {
              this.previewFile = this.assetPreview.compress_file
              this.previewLoaded = true
              this.previewIcon = false
            } else {
              this.previewLoaded = true
              this.errorHandle()
            }
          } else {
            this.previewLoaded = true
            this.errorHandle()
          }
        })
    },
    getThumbnail() {
      return new Promise((resolve) => {
        const video = document.createElement('video')
        const vue = this
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        video.addEventListener(
          'loadeddata',
          function () {
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            video.pause()

            resolve()

            vue.videoThumbnail = canvas.toDataURL('image/jpeg')
          },
          false
        )

        video.muted = true
        video.playsInline = true
        video.setAttribute('crossOrigin', 'anonymous')
        video.setAttribute('src', this.__url)
        video.preload = 'metadata'
        video.play()
      })
    },
  },
}
</script>
