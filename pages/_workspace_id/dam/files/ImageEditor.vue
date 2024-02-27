<template>
  <div class="image-editor__wrapper h-100">
    <div
      :style="{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }"
      class="image-editor h-100"
    >
      <img
        id="image"
        ref="img"
        :src="url"
        crossorigin="anonymous"
        @load="start"
        @loadeddata="start"
        @error="onError"
      />
      <div v-show="processing" class="overlay">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import Jimp from 'jimp'

let cropper

export default {
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  props: {
    src: String,
    mimeType: { type: String, default: 'image/png' },
  },
  data() {
    return {
      url: '',
      dragMode: 'move',
      processing: false,
      destroyed: false,
      imageError: false,
    }
  },
  watch: {
    src: {
      handler(n) {
        if (n) {
          this.imageError = false
          if (cropper) {
            cropper.destroy()
            cropper = null
          }
          this.$emit('image-error', false)
          this.$nextTick(() => (this.url = n))
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.destroyed = true
    if (cropper) {
      cropper.destroy()
      cropper = null
    }
  },
  methods: {
    onError() {
      this.$emit('image-error', true)
      this.imageError = true
      if (cropper) {
        cropper.destroy()
        cropper = null
      }
    },
    start() {
      if (cropper || this.destroyed || this.imageError) return
      const _this = this
      this.$emit('cropper-ready', false)
      cropper = new Cropper(this.$refs.img, {
        aspectRatio: 1,
        center: true,
        autoCrop: false,
        background: false,
        checkCrossOrigin: false,
        dragMode: this.dragMode,
        guides: false,
        responsive: true,
        autoCropArea: 1,
        toggleDragModeOnDblclick: false,
        ready() {
          _this.$emit('cropper-ready', false)
          const { width, height, naturalWidth, naturalHeight } =
            cropper.imageData
          const { maxTop } = cropper.canvasData
          if (width > naturalWidth || height > naturalHeight) {
            cropper.setCanvasData({
              width: naturalWidth,
              height: naturalHeight,
              left: Math.abs(width - naturalWidth) / 2,
              top: Math.abs(maxTop - naturalHeight) / 2,
            })
          }
          cropper.setDragMode(_this.dragMode)
          _this.processing = false
          _this.$nextTick(() => {
            _this.$emit('cropper-ready', true)
          })
        },
      })
    },
    setDragMode(mode) {
      if (!cropper) return
      this.dragMode = mode
      cropper.setDragMode(mode)
    },
    setCropMode(mode) {
      if (!cropper) return
      cropper.setAspectRatio(mode)
    },
    clearCropBox() {
      if (!cropper) return
      cropper.clear()
    },
    save(replace = true, cb) {
      if (!cropper || this.processing) return
      this.processing = true
      const canvas = cropper.getCroppedCanvas(
        this.mimeType === 'image/png' ? {} : { fillColor: '#fff' }
      )
      if (canvas && typeof canvas.toDataURL === 'function') {
        const _url = canvas.toDataURL(this.mimeType)
        if (replace) this.replace(_url)
      }
      this.processing = false
      cb && typeof cb === 'function' && cb()
    },
    replace(url) {
      if (!cropper) return
      this.processing = true
      cropper.replace(url)
      this.url = url
      this.processing = false
    },
    crop() {
      if (!cropper || this.processing) return false
      if (!cropper.cropped) return false
      this.processing = true
      cropper.crop()
      this.processing = false
      return true
    },
    resetAll() {
      this.processing = true
      this.replace(this.src)
      this.$nextTick(() => {
        cropper.setDragMode('move')
        cropper.clear()
        this.processing = false
      })
    },
    export() {
      FileSaver.saveAs(this.url)
    },
    resize(width = Jimp.AUTO, height = Jimp.AUTO) {
      const _this = this
      this.processing = true
      Jimp.read(this.url, async (err, image) => {
        if (err) {
          console.error(err)
          this.processing = false
          return
        }
        const newImage = await image
          .resize(width, height)
          .getBase64Async(this.mimeType)
        _this.replace(newImage)

        this.processing = false
      })
    },
    getCanvasData() {
      if (!cropper) return {}
      return cropper.canvasData
    },
    setCanvasData(data) {
      if (!cropper) return {}
      return cropper.setCanvasData(data)
    },
    getImageData() {
      if (!cropper) return {}
      return cropper.imageData
    },
    rotate(deg) {
      if (!cropper || this.processing) return
      this.processing = true
      cropper.rotateTo(deg)
      this.processing = false
    },
    scale(x = 1, y = 1) {
      if (!cropper || this.processing) return
      this.processing = true
      cropper.scale(x, y)
      this.processing = false
    },
  },
}
</script>
<style scoped>
.image-editor__wrapper {
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-editor {
  position: relative;
}

img#image {
  display: block;
  /* This rule is very important for the cropper to work properly */
  max-width: 100%;
}

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
