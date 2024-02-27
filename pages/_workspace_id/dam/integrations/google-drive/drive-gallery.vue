<template>
  <div
    class="drive-gallery"
    :class="galleryOpen ? 'drive-gallery--opened' : ''"
  >
    <div v-if="galleryFiles.length" class="media-holder">
      <template v-for="(i, index) in galleryFiles">
        <!-- <img 
          :key="index"
          class="placeholder"
          src="~/assets/img/loading.gif"
        /> -->

        <template v-if="isVideoFile(i) && currentFileIndex === index">
          <video
            v-show="videoLoaded"
            :key="index"
            disablePictureInPicture
            controls
            preload="auto"
            autoplay
            :src="currentMedia.rawUrl"
            style="z-index: 1; width: 100%; position: relative"
            @canplay="videoLoaded = true"
            @error="videoLoaded = true"
          ></video>
          <img
            v-show="!videoLoaded"
            :key="index"
            class="placeholder"
            src="~/assets/img/loading.gif"
          />
        </template>
        <template v-else-if="isAudioFile(i) && currentFileIndex === index">
          <audio
            v-show="audioLoaded"
            :key="index"
            disablePictureInPicture
            controls
            preload="auto"
            autoplay
            :src="currentMedia.rawUrl"
            style="z-index: 1; width: 400px; position: relative"
            @canplay="audioLoaded = true"
            @error="audioLoaded = true"
          ></audio>
          <img
            v-show="!audioLoaded"
            :key="index"
            class="placeholder"
            src="~/assets/img/loading.gif"
          />
        </template>
        <img
          v-else-if="isImageFile(i) && currentFileIndex === index"
          :key="index"
          :src="currentMedia.rawUrl"
          style="z-index: 1; width: 100%"
          class="gallery-item"
        />
        <div
          v-else-if="currentFileIndex === index"
          :key="index"
          class="no-preview-container"
        >
          <object :src="currentMedia.thumbnailLink">
            <div class="no-preview-text">No preview available</div>
            <svg
              id="Layer_1"
              style="height: 160px"
              class="document-icon"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 16.2 18"
              xml:space="preserve"
            >
              <g id="Group_5340" transform="translate(-207.348 -290.319)">
                <path
                  id="Path_3450"
                  class="fill-color"
                  d="M211.9,308.3c-0.9,0-1.6-0.7-1.6-1.6v-12c0-0.9,0.7-1.5,1.6-1.6h5.9c0.6,0.1,1.3,0.3,1.7,0.8c1.3,0.9,2.4,2,3.3,3.2c0.4,0.5,0.7,1,0.8,1.7v7.9c0,0.9-0.7,1.5-1.6,1.6L211.9,308.3z M211.9,294.6c-0.1,0-0.1,0-0.1,0.1v12c0,0.1,0.1,0.1,0.1,0.1H222c0.1,0,0.1,0,0.1-0.1V299l-3.8,0c-0.4,0-0.7-0.3-0.7-0.7v-3.7L211.9,294.6z M219,297.6l2.1,0c-0.3-0.4-0.6-0.8-1-1.1c-0.4-0.3-0.7-0.7-1.1-1l0,0L219,297.6z"
                ></path>
                <path
                  id="Path_3451"
                  class="fill-color"
                  d="M208.6,306.1c-0.7-0.1-1.3-0.8-1.3-1.5v-12.7c0-0.9,0.7-1.6,1.6-1.6h6.5c0.6,0.1,1.2,0.3,1.7,0.8c0.2,0.1,0.3,0.2,0.5,0.4l0.4,0.3l-9.2,0c-0.1,0-0.1,0-0.1,0.1v14.2L208.6,306.1z"
                ></path>
              </g>
            </svg>
          </object>
        </div>
      </template>
    </div>
    <div
      v-if="hasPrev()"
      class="prev"
      title="Previous (Left Arrow)"
      @click="onPrev()"
    >
      <img src="~/assets/img/icon/arrow-right.svg" alt="Previous" />
    </div>
    <div
      v-if="hasNext()"
      class="next"
      title="Next (Right Arrow)"
      @click="onNext()"
    >
      <img src="~/assets/img/icon/arrow-right.svg" alt="Next" />
    </div>
    <div class="close" title="Close (Esc)" @click="onClose()">
      <img src="~/assets/img/icon/close-white.svg" alt="" />
    </div>
    <div class="filename">
      {{ (galleryFiles[currentFileIndex] || {}).name }}
    </div>

    <div class="counter">
      {{ currentFileIndex + 1 }} / {{ galleryFiles.length }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
    ({ redirect, params, query }) => {
      return redirect({
        name: 'workspace_id-dam-integrations',
        params,
        query,
      })
    },
  ],
  props: {
    activeFileId: { type: String, default: '' },
    open: { type: Boolean },
    files: { type: Array, default: () => [] },
  },
  data() {
    return {
      galleryOpen: false,
      galleryFiles: [],
      currentFileIndex: 0,
      currentMedia: null,
      videoLoaded: false,
      audioLoaded: false,
    }
  },
  computed: {
    ...mapGetters({
      DRIVE_ACCESS_TOKEN: 'drive/accessToken',
      DRIVE_REFRESH_TOKEN: 'drive/refreshToken',
      DRIVE_ICON: 'drive/icon',
      DRIVE_USER: 'drive/user',
      DRIVE_SESSION: 'drive/session',
    }),
  },
  watch: {
    open: {
      handler(n) {
        if (n && (this.files || []).length) {
          Object.assign(
            this.galleryFiles,
            JSON.parse(JSON.stringify(this.files))
          )
          this.currentFileIndex = Math.max(
            this.galleryFiles.findIndex((e) => e.id === this.activeFileId),
            0
          )
          this.updateCurrentMedia()
        } else {
          this.galleryFiles = []
        }
        this.galleryOpen = !!n
      },
      immediate: true,
    },
    currentMedia: {
      handler(n) {
        if (n) {
          if (
            !(this.isAudioFile(n) || this.isVideoFile(n) || this.isImageFile(n))
          )
            return
          axios
            .post(
              '/driveapi/download',
              {
                fileId: n.id,
              },
              {
                headers: {
                  access_token: this.DRIVE_ACCESS_TOKEN,
                  refresh_token: this.DRIVE_REFRESH_TOKEN,
                },
              }
            )
            .then((r) => {
              // eslint-disable-next-line
              let that = this
              // for base64
              that.$set(that.currentMedia, 'rawUrl', r.data)

              // for stream
              // fr.readAsDataURL(new Blob([r.data],{type:'video/mp4'}))
              // const fr=new FileReader()
              // let that=this
              // fr.onload=(e)=>{
              //   that.$set(that.currentMedia,'rawUrl',r.data)
              // }
              // fr.readAsDataURL(new Blob([r.data],{type:'video/mp4'}))
            })
        }
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyup)
  },
  destroyed() {
    window.removeEventListener('keyup', this.handleKeyup)
  },
  methods: {
    isImageFile(file) {
      return file.mimeType.toLowerCase().includes('image')
    },
    isVideoFile(file) {
      return file.mimeType.toLowerCase().includes('video')
    },
    isAudioFile(file) {
      return file.mimeType.toLowerCase().includes('audio')
    },
    handleKeyup(e) {
      switch (e.keyCode) {
        case 39:
          this.hasNext() && this.onNext()
          break
        case 37:
          this.hasPrev() && this.onPrev()
          break
        case 27:
          this.onClose()
          break
      }
    },
    hasPrev() {
      return this.currentFileIndex > 0
    },
    hasNext() {
      return this.currentFileIndex < this.galleryFiles.length - 1
    },
    updateCurrentMedia() {
      this.videoLoaded = false
      this.audioLoaded = false
      this.currentMedia = this.galleryFiles[this.currentFileIndex]
    },
    onPrev() {
      this.currentFileIndex = Math.max(this.currentFileIndex - 1, 0)
      this.updateCurrentMedia()
    },
    onNext() {
      this.currentFileIndex = Math.min(
        this.currentFileIndex + 1,
        this.galleryFiles.length - 1
      )
      this.updateCurrentMedia()
    },
    onClose() {
      this.galleryOpen = false
      this.$emit('update:open', false)
      this.galleryFiles = []
      this.currentFileIndex = 0
      this.currentMedia = null
    },
  },
}
</script>

<style scoped>
.drive-gallery {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.9);
  z-index: -1;
  display: none;
}
.drive-gallery.drive-gallery--opened {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadein 0.21s linear both;
}
@keyframes fadein {
  from {
    display: none;
    opacity: 0;
    transform: scale(0);
    z-index: -1;
  }
  to {
    display: block;
    opacity: 1;
    transform: scale(1);
    z-index: 99999;
  }
}
.drive-gallery .media-holder > img.placeholder {
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  max-height: 40px;
  max-width: 40px;
}
.drive-gallery .media-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  min-height: 64px;
  min-width: 64px;
  max-height: 80vh;
  max-width: 80vh;
}
.drive-gallery .prev,
.drive-gallery .next {
  position: absolute;
  height: 64px;
  width: 64px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.drive-gallery .prev > img,
.drive-gallery .next > img {
  height: 80px;
  width: 80px;
}
.drive-gallery .prev {
  left: 16px;
}
.drive-gallery .next {
  right: 16px;
}
.drive-gallery .prev > img {
  transform: rotate(180deg);
}
.drive-gallery .close {
  position: absolute;
  right: 16px;
  top: 16px;
  height: 24px;
  width: 24px;
  cursor: pointer;
}
.filename {
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 2rem;
  color: white;
}
.counter {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 2rem;
  color: white;
}
.no-preview-text {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
}
.no-preview-container {
  z-index: 1;
  min-height: 300px;
  min-width: 300px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
