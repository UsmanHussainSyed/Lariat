<template>
  <div
    class="dropbox-gallery"
    :class="galleryOpen ? 'dropbox-gallery--opened' : ''"
  >
    <div v-if="galleryFiles.length" class="media-holder">
      <template v-for="(i, index) in galleryFiles">
        <img
          v-if="!i.link"
          :key="index"
          class="placeholder"
          src="~/assets/img/loading.gif"
        />

        <video
          v-if="isVideoFile(i.path_display) && currentFileIndex === index"
          :key="index"
          disablePictureInPicture
          controls
          :src="i.link"
          style="z-index: 1; width: 100%; position: relative"
        ></video>
        <img
          v-else-if="isImageFile(i.path_display) && currentFileIndex === index"
          :key="index"
          :src="i.link"
          style="z-index: 1; width: 100%"
          class="gallery-item"
        />
        <div
          v-else-if="currentFileIndex === index"
          :key="index"
          class="no-preview-container"
        >
          <object :src="currentMedia">
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
      @click="onPrev()"
      title="Previous (Left Arrow)"
    >
      <img src="~/assets/img/icon/arrow-right.svg" alt="Previous" />
    </div>
    <div
      v-if="hasNext()"
      class="next"
      @click="onNext()"
      title="Next (Right Arrow)"
    >
      <img src="~/assets/img/icon/arrow-right.svg" alt="Next" />
    </div>
    <div class="close" @click="onClose()" title="Close (Esc)">
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
import { supportedImageFormats, supportedVideoFormats } from './utils'
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
    dropboxInstance: { type: Object, default: () => null },
    path: { type: String, default: '' },
  },
  data() {
    return {
      galleryOpen: false,
      galleryFiles: [],
      currentFileIndex: 0,
      currentMedia: null,
    }
  },
  watch: {
    open: {
      handler(n) {
        if (n && this.dropboxInstance && (this.files || []).length) {
          Object.assign(
            this.galleryFiles,
            JSON.parse(JSON.stringify(this.files))
          )
          this.getFiles()
          this.currentFileIndex = Math.max(
            this.galleryFiles.findIndex((e) => e.id === this.activeFileId),
            0
          )
        } else {
          this.galleryFiles = []
        }
        this.galleryOpen = !!n
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
    supportedMedia(ext) {
      // return this.isImageFile(path) || this.isVideoFile(path)
      return true // supportedThumbnails.includes(ext)
    },
    isImageFile(path) {
      const ext = path.substring(path.lastIndexOf('.') + 1)
      return supportedImageFormats.includes(ext.toLowerCase())
    },
    isVideoFile(path) {
      const ext = path.substring(path.lastIndexOf('.') + 1)
      return supportedVideoFormats.includes(ext.toLowerCase())
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
      this.currentMedia = this.galleryFiles[this.currentFileIndex].link
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
    async getFiles() {
      const _files = await Promise.all(
        this.galleryFiles.map(async (e) => {
          const res = await this.dropboxInstance.filesGetTemporaryLink({
            path: e.path_display,
          })
          return {
            ...res.result.metadata,
            link: res.result.link,
          }
        })
      )
      this.$set(this, 'galleryFiles', [..._files])
      this.updateCurrentMedia()
    },
  },
}
</script>

<style scoped>
.dropbox-gallery {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.9);
  z-index: -1;
  display: none;
}
.dropbox-gallery.dropbox-gallery--opened {
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
.dropbox-gallery .media-holder > img.placeholder {
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  max-height: 40px;
  max-width: 40px;
}
.dropbox-gallery .media-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 60px rgba(250, 250, 250, 0.12);
  border-radius: 4px;
  overflow: hidden;
  min-height: 64px;
  min-width: 64px;
  max-height: 80vh;
  max-width: 80vh;
  background: rgba(0, 0, 0, 0.7);
}
.dropbox-gallery .prev,
.dropbox-gallery .next {
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
.dropbox-gallery .prev > img,
.dropbox-gallery .next > img {
  height: 80px;
  width: 80px;
}
.dropbox-gallery .prev {
  left: 16px;
}
.dropbox-gallery .next {
  right: 16px;
}
.dropbox-gallery .prev > img {
  transform: rotate(180deg);
}
.dropbox-gallery .close {
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
