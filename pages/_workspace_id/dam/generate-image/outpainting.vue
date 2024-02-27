<template>
  <div
    class="body-content dam-container p0"
    :style="{
      height: `calc(100vh - 60px) !important`,
      maxHeight: `calc(100vh - 60px) !important`,
    }"
  >
    <div v-if="!aiSearchAllowed" class="common-overaly has-relative">
      <div class="common-modal">
        <div class="common-modal-header">
          <h5>Upgrade Plan</h5>
        </div>
        <div class="common-modal-body text-center">
          < <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
          
        </div>
      </div>
    </div>
    <div v-else class="body-content-auto w-100">
      <div class="w-100 h-100">
        <div v-if="loading" class="overlay">
          <div class="loader"></div>
        </div>
        <div v-else class="w-100 h-100 canvas-wrapper position-relative">
          <canvas id="canvas"></canvas>
          <div class="toolbar">
            <div class="d-flex align-items-center generate-section h-100">
              <input
                v-model="imageDescription"
                type="text"
                autocomplete="off"
                placeholder="Describe about the portion to fill inside generation frame"
                class="generate-text-input h-100"
                :class="{
                  disabled: generatingImage || !fabricLoaded,
                }"
                :disabled="generatingImage || !fabricLoaded"
              />
              <button
                class="generate-btn h-100"
                :class="{
                  disabled:
                    !imageDescription || generatingImage || !fabricLoaded,
                }"
                :disabled="
                  !imageDescription || generatingImage || !fabricLoaded
                "
                @click="getExtendedImages()"
              >
                <svg
                  v-show="generatingImage"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024"
                  class="spinner-spin"
                  color="currentColor"
                  height="1.2em"
                  width="1.2em"
                  xmlns="http://www.w3.org/2000/svg"
                  style="color: currentcolor"
                >
                  <path
                    d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
                  ></path>
                </svg>
                <span v-show="!generatingImage">Generate</span>
              </button>
            </div>
          </div>
          <div class="editor-tools">
            <div class="editor-tool-sec"></div>
            <div class="editor-tool-sec">
              <div v-show="!generatingImage" class="interactive-tools">
                <!-- select -->
                <button
                  v-if="!placingImageId"
                  v-tooltip="'Select Mode'"
                  :disabled="generatingImage"
                  :class="{
                    disabled: generatingImage,
                    active: selectionMode,
                  }"
                  @click="
                    () => {
                      panningMode = false
                      selectionMode = true
                    }
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.823 2.351a.75.75 0 0 1 .817.043l11.958 8.707a.75.75 0 0 1-.478 1.356l-6.647-.32-3.046 5.917a.75.75 0 0 1-1.413-.264L4.453 3.08a.75.75 0 0 1 .37-.729Zm2.418 12.786 2.119-4.116a.75.75 0 0 1 .703-.406l4.624.223L6.122 4.6l1.119 10.536Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <!-- pan -->
                <button
                  v-if="!placingImageId"
                  v-tooltip="'Pan Mode'"
                  :disabled="generatingImage"
                  :class="{
                    disabled: generatingImage,
                    active: panningMode,
                  }"
                  @click="
                    () => {
                      panningMode = true
                      selectionMode = false
                    }
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.613 1a2.25 2.25 0 0 0-2.247 2.13 2.25 2.25 0 0 0-3.003 2.12v3.544a2.495 2.495 0 0 0-2.116 4.498l2.13 1.23A4.326 4.326 0 0 0 8.687 18.5h4.157a5.018 5.018 0 0 0 5.018-5.018V6.25a2.25 2.25 0 0 0-3.004-2.12 2.25 2.25 0 0 0-3.24-1.9A2.25 2.25 0 0 0 9.613 1Zm-.75 4.248V3.25a.75.75 0 0 1 1.5-.013V8.75h1.5V4.244a.75.75 0 0 1 1.5.006v4.5h1.5v-2.5a.75.75 0 0 1 1.5 0v7.232A3.518 3.518 0 0 1 12.845 17H8.688a2.826 2.826 0 0 1-2.825-2.826v-.527l-2.866-1.654a.994.994 0 0 1 .994-1.722l1.872 1.08V5.25a.75.75 0 0 1 1.5-.013V8.75h1.5V5.248Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <!-- http://fabricjs.com/erasing -->
                <!-- eraser -->
                <!-- <button
                  v-if="!placingImageId"
                  v-tooltip="'Eraser'"
                  :disabled="generatingImage"
                  :class="{ 
                    disabled: generatingImage,
                    active: eraserMode,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10.442 2.013a1.75 1.75 0 0 1 2.475 0l5.58 5.58a1.75 1.75 0 0 1 0 2.475l-4.504 4.505-2.178 2.177H14.5a.75.75 0 0 1 0 1.5h-13a.75.75 0 0 1 0-1.5h4.345l-3.832-3.833a1.75 1.75 0 0 1 0-2.475l8.43-8.43ZM7.967 16.75h1.727l2.177-2.177-5.933-5.934-2.865 2.864a.25.25 0 0 0 0 .354l4.894 4.893Zm4.965-3.238L6.998 7.578l4.505-4.505a.25.25 0 0 1 .354 0l5.58 5.58a.25.25 0 0 1 0 .354l-4.505 4.505Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button> -->
                <!-- add frame -->
                <button
                  v-if="!placingImageId"
                  v-tooltip="'Add Frame'"
                  :disabled="generatingImage"
                  :class="{ disabled: generatingImage }"
                  @click="showFrame()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M4.25 2a.75.75 0 0 0-1.5 0v1.25H1.5a.75.75 0 0 0 0 1.5h1.25V6a.75.75 0 0 0 1.5 0V4.75H5.5a.75.75 0 0 0 0-1.5H4.25V2Zm-1.5 7v6.235c0 .345 0 .661.028.922.031.285.102.591.306.872.108.148.239.279.387.387.281.204.588.275.872.306.26.028.577.028.922.028h9.47c.345 0 .661 0 .922-.028.284-.031.591-.102.872-.306.148-.108.279-.239.387-.387.204-.281.275-.587.306-.872.028-.26.028-.577.028-.922v-9.47c0-.345 0-.661-.028-.922-.031-.284-.102-.591-.306-.872a1.75 1.75 0 0 0-.387-.387c-.281-.204-.588-.275-.872-.306-.26-.028-.577-.028-.922-.028H8.5v1.5h6.2c.392 0 .625.001.796.02.1.01.141.024.153.03.02.014.037.031.052.05a.602.602 0 0 1 .03.154c.018.17.019.404.019.796v9.4c0 .392-.001.625-.02.796a.6.6 0 0 1-.03.153.252.252 0 0 1-.05.052.6.6 0 0 1-.154.03c-.17.018-.404.019-.796.019H5.3c-.392 0-.625-.001-.796-.02a.601.601 0 0 1-.153-.03.251.251 0 0 1-.052-.05.596.596 0 0 1-.03-.154 8.463 8.463 0 0 1-.019-.796V9h-1.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <!-- add image -->
                <button
                  v-if="!placingImageId"
                  v-tooltip="'Upload Image'"
                  :disabled="generatingImage"
                  :class="{ disabled: generatingImage }"
                  @click="$refs.fileInput.click()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M14.75 3a.75.75 0 0 0-1.5 0v2.25H11a.75.75 0 0 0 0 1.5h2.25V9a.75.75 0 0 0 1.5 0V6.75H17a.75.75 0 0 0 0-1.5h-2.25V3ZM9 4.25H4.765c-.345 0-.661 0-.922.028-.284.031-.591.102-.872.306a1.75 1.75 0 0 0-.387.387c-.204.281-.275.588-.306.872-.028.26-.028.577-.028.922v8.47c0 .345 0 .661.028.922.031.285.102.591.306.872.108.148.239.279.387.387.281.204.588.275.872.306.26.028.577.028.922.028h10.47c.345 0 .661 0 .922-.028.285-.031.591-.102.872-.306.148-.108.279-.239.387-.387.204-.281.275-.587.306-.872.028-.26.028-.577.028-.922V11h-1.5v4.2c0 .392-.001.625-.02.796a.6.6 0 0 1-.03.153.252.252 0 0 1-.05.052.6.6 0 0 1-.154.03c-.056.006-.119.01-.192.013L11.03 11.47a.75.75 0 0 0-1.06 0l-.97.97-2.47-2.47a.75.75 0 0 0-1.06 0l-1.72 1.72V6.8c0-.392.001-.625.02-.796.01-.1.024-.141.03-.153a.247.247 0 0 1 .05-.051.598.598 0 0 1 .154-.03c.17-.019.404-.02.796-.02H9v-1.5Zm1.5 8.81 3.19 3.19H4.8c-.392 0-.625-.001-.796-.02a.602.602 0 0 1-.153-.03.251.251 0 0 1-.052-.05.596.596 0 0 1-.03-.154 8.463 8.463 0 0 1-.019-.796v-1.39L6 11.56l2.47 2.47a.75.75 0 0 0 1.06 0l.97-.97Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <!-- save to DAM -->
                <button
                  v-if="!placingImageId"
                  v-tooltip="'Save to DAM'"
                  :disabled="generatingImage"
                  :class="{ disabled: generatingImage }"
                  @click="exportToDAM()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-save"
                  >
                    <path
                      d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                    ></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                </button>
                <!-- download -->
                <button
                  v-if="!placingImageId"
                  v-tooltip="'Download'"
                  :disabled="generatingImage"
                  :class="{ disabled: generatingImage }"
                  @click="downloadCanvas()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-download"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <input
                  ref="fileInput"
                  type="file"
                  hidden
                  accept=".png, .PNG"
                  @change="handleInput"
                />
                <button
                  v-if="placingImageId"
                  v-tooltip="'Remove image'"
                  @click="discardImage()"
                >
                  <img
                    width="10"
                    height="10"
                    :src="require('~/assets/img/close.svg')"
                    alt=""
                  />
                </button>
                <button
                  v-if="placingImageId"
                  v-tooltip="'Place here'"
                  @click="placeImage()"
                >
                  <svg
                    stroke="#000"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    height="2em"
                    width="2em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            <div class="editor-tool-sec">
              <div class="zoom-btns">
                <button
                  v-tooltip="'Zoom Out'"
                  class="zoom-btn-minus"
                  href="javascript:void(0)"
                  :disabled="generatingImage || zoomValue <= MIN_CANVAS_ZOOM"
                  :class="{
                    disabled: generatingImage || zoomValue <= MIN_CANVAS_ZOOM,
                  }"
                  @click="zoomTo(zoomValue - 0.1)"
                >
                  <span>&minus;</span>
                </button>
                <button
                  v-tooltip="'Zoom to 100%'"
                  class="zoom-btn-text"
                  href="javascript:void(0)"
                  @click="zoomTo(1)"
                >
                  <span>{{ zoomText }}%</span>
                </button>
                <button
                  v-tooltip="'Zoom In'"
                  class="zoom-btn-plus"
                  href="javascript:void(0)"
                  :disabled="generatingImage || zoomValue >= MAX_CANVAS_ZOOM"
                  :class="{
                    disabled: generatingImage || zoomValue >= MAX_CANVAS_ZOOM,
                  }"
                  @click="zoomTo(zoomValue + 0.1)"
                >
                  <span>&plus;</span>
                </button>
              </div>
            </div>
          </div>
          <template v-if="!!(frame || {}).visible">
            <!-- <div
              id="frameSize"
              :key="`title_${frameTitleKey}`"
              class="select-frame-title"
              :style="{}"
            >
              Generation frame: 1024 x 1024
            </div> -->
            <div
              v-if="generatedImages.length"
              :key="`toolbar_${frameToolbarKey}`"
              class="select-frame-toolbar"
              :style="{
                top: `${
                  20 +
                  frame.getBoundingRect().top +
                  frame.getBoundingRect().height
                }px`,
                left: `${frame.getBoundingRect().left}px`,
              }"
            >
              <!-- <div class="drag-handle px-1 align-self-stretch d-inline-flex">
              <img
                width="16"
            :src="require('~/assets/img/dalle/draghandle-white.svg')"
              alt=""
              />
            </div>
            <div class="separator"></div> -->
              <button
                class="select-frame-toolbar-btn"
                :class="{ disabled: prevImageDisabled }"
                :disabled="prevImageDisabled"
                @click="prevImage()"
              >
                <img
                  width="16"
                  :src="require('~/assets/img/dalle/arrow-left.svg')"
                  alt=""
                />
              </button>
              <div class="separator"></div>
              <div class="picker-options">
                <div
                  v-for="genImg in generatedImages"
                  :key="genImg.id"
                  class="picker-option"
                  :class="{ selected: genImg.id === currentImage.id }"
                >
                  <div class="picker-option-circle"></div>
                </div>
              </div>
              <div class="separator"></div>
              <button
                class="select-frame-toolbar-btn"
                :class="{ disabled: nextImageDisabled }"
                :disabled="nextImageDisabled"
                @click="nextImage()"
              >
                <img
                  width="16"
                  :src="require('~/assets/img/dalle/arrow-left.svg')"
                  style="transform: scale(-1)"
                  alt=""
                />
              </button>
              <div class="separator"></div>
              <button class="select-frame-toolbar-btn" @click="onCancelImage()">
                Cancel
              </button>
              <div class="separator"></div>
              <button class="select-frame-toolbar-btn" @click="onAcceptImage()">
                Accept
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <client-only>
      <MoveFolderDialog
        ref="moveDialog"
        :key="moveDialogKey"
        :files-to-move="filesToMove"
        skip-move-api
        @move-files="onMoveFiles"
      />
    </client-only>
  </div>
</template>

<!-- eslint-disable no-undef -->
<script>
import axios from 'axios'
import FileSaver from 'file-saver'
import b64ToBlob from 'b64-to-blob'
import { v4 as uuid } from 'uuid'
import MoveFolderDialog from '~/components/dam/Dialogs/MoveFolderDialog'
// let unwatchFrameLeft, unwatchFrameTop

const MIN_CANVAS_ZOOM = 0.1 // renders 10%
const MAX_CANVAS_ZOOM = 5 // renders 500%
const FABRIC_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js'

const resizeHandler = function (e) {
  const wrapper = document.querySelector('.canvas-wrapper')
  this.canvas.setHeight(wrapper.clientHeight)
  this.canvas.setWidth(wrapper.clientWidth)
  this.canvas.renderAll()
  this.canvas.calcOffset()
}

// const loadFabric = () => {
//   console.log(3)
//   return new Promise((resolve, reject) => {
//     if (
//       ![...document.head.getElementsByTagName('script')]
//         .map((e) => e.src)
//         .includes(FABRIC_CDN)
//     ) {
//       const script = document.createElement('script')
//       script.src = FABRIC_CDN
//       script.onload = function () {
//         console.log(5)
//         resolve()
//       }
//       script.onerror = reject
//       document.head.appendChild(script)
//     } else {
//       console.log(4)
//       resolve()
//     }
//   })
// }

export default {
  components: { MoveFolderDialog },
  layout: 'damLayout',
  middleware: ['check-if-suspended'],
  data() {
    return {
      fabricLoaded: false,
      canvas: null,
      scale: 1,
      zoomValue: 1,
      adjustingFrame: false,
      frame: null,
      // fabricImages: [],
      generatedImages: [],
      currentImage: '',
      acceptedImage: '',
      frameTitleKey: 1,
      frameToolbarKey: 1,
      generatingImage: false,
      imageDescription: '',
      loading: true,
      placingImageId: '',
      stripe_customer_id: null,
      subscription: {},
      canvasLastMouseX: null,
      canvasLastMouseY: null,
      isMouseDown: false,
      panningMode: false,
      selectionMode: true,
      moveDialogKey: 1,
      filesToMove: [],
      frameSizeText: null,
    }
  },
  head() {
    return {
      script: [
        {
          src: FABRIC_CDN,
          defer: true,
          callback: () => {
            this.loading = false
            this.fabricLoaded = true
          },
        },
      ],
    }
  },
  computed: {
    MAX_CANVAS_ZOOM() {
      return MAX_CANVAS_ZOOM
    },
    MIN_CANVAS_ZOOM() {
      return MIN_CANVAS_ZOOM
    },
    zoomText() {
      return parseInt(this.zoomValue * 100)
    },
    prevImageDisabled() {
      return this.currentImage.index <= 0
    },
    nextImageDisabled() {
      return this.currentImage.index + 1 >= this.generatedImages.length
    },
    aiSearchAllowed() {
      return this.subscription.plan_name !== 'Lite'
    },
    totalSearchQuota() {
      return this.subscription.total_openai_image_count
    },
    availableSearchQuota() {
      return this.subscription.remaining_openai_image_count
    },
  },
  watch: {
    fabricLoaded: {
      handler(n) {
        if (n) {
          this.$nextTick(() => {
            this.initCanvas()
            this.showFrame()
          })
        }
      },
    },
  },
  mounted() {
    this.$axios
      .$get('digital-assets/subscription/get')
      .then(({ data }) => {
        this.subscription = data
        this.stripe_customer_id = data.stripe_customer_id
      })
      .catch((_) => {})
    window.addEventListener('resize', resizeHandler.bind(this))
  },
  beforeDestroy() {
    window.removeEventListener('resize', resizeHandler.bind(this))
  },
  methods: {
    placeImage() {
      const canvasImg = this.canvas._objects.find(
        (e) => e.id === this.placingImageId
      )
      // this.canvas.setBackgroundImage(
      //   canvasImg._element.currentSrc,
      //   this.canvas.renderAll.bind(this.canvas),
      //   {
      //     originX: 'left',
      //     originY: 'top',
      //     top: canvasImg.top,
      //     left: canvasImg.left,
      //   }
      // )
      // this.canvas.remove(canvasImg)
      canvasImg.selectable = false
      this.placingImageId = ''
      this.showFrame()
    },
    discardImage() {
      const canvasImg = this.canvas._objects.find(
        (e) => e.id === this.placingImageId
      )
      this.canvas.remove(canvasImg)
      this.placingImageId = ''
      this.showFrame()
    },
    prevImage() {
      if (this.prevImageDisabled) return
      this.removeCanvasImageById(this.currentImage.id)
      this.currentImage = this.generatedImages[this.currentImage.index - 1]
      this.renderCurrentImage()
    },
    nextImage() {
      if (this.nextImageDisabled) return
      this.removeCanvasImageById(this.currentImage.id)
      this.currentImage = this.generatedImages[this.currentImage.index + 1]
      this.renderCurrentImage()
    },
    removeCanvasImageById(id) {
      const canvasObj = this.canvas.getObjects('image').find((e) => e.id === id)
      if (canvasObj) this.canvas.remove(canvasObj)
    },
    clearCanvas({ top, left }) {
      // const imageUrl =
      //   'https://t3.ftcdn.net/jpg/02/96/05/52/240_F_296055218_RXc721N9fSYIz3sEV7QALYquMVP31jdJ.jpg'
      // this.canvas.setBackgroundImage(
      //   imageUrl,
      //   this.canvas.renderAll.bind(this.canvas),
      //   {
      //     originX: 'left',
      //     originY: 'top',
      //     top,
      //     left,
      //   }
      // )
    },
    renderCurrentImage() {
      // this.canvas.setBackgroundImage(
      //   this.currentImage.url,
      //   this.canvas.renderAll.bind(this.canvas),
      //   {
      //     originX: 'left',
      //     originY: 'top',
      //     top: this.frame.top,
      //     left: this.frame.left,
      //   }
      // )
      const that = this
      const imgObj = new Image()
      imgObj.src = this.currentImage.url
      imgObj.onload = function () {
        // const id = uuid()
        const img = new fabric.Image(imgObj, {
          hasControls: false,
          hasBorders: false,
          stroke: '',
          borderColor: '',
          strokeWidth: 0,
          opacity: 1,
          selectable: false,
          lockMovementX: true,
          lockMovementY: true,
          originX: 'left',
          originY: 'top',
          top: that.frame.top,
          left: that.frame.left,
        })
        img.id = that.currentImage.id
        that.canvas.add(img)
        // that.placingImageId = id
        // that.hideFrame()
        // that.scaleImageToFit(img, canvas)
        // canvas.centerObject(img)
        // canvas.setActiveObject(img)
        that.canvas.renderAll()
      }
    },
    onAcceptImage() {
      this.acceptedImage = this.currentImage
      this.frame.lockMovementX = false
      this.frame.lockMovementY = false
      this.currentImage = {}
      this.generatedImages = []
    },
    onCancelImage() {
      this.generatedImages = []
      this.removeCanvasImageById(this.currentImage.id)
      this.acceptedImage = {}
      this.currentImage = {}
      this.frame.lockMovementX = false
      this.frame.lockMovementY = false
    },
    initCanvas() {
      this.canvas = new fabric.Canvas('canvas')
      const wrapper = this.$el.querySelector('.canvas-wrapper')
      const rect = wrapper.getBoundingClientRect()
      this.canvas.setDimensions({ width: rect.width, height: rect.height })
      const that = this
      this.canvas.on('mouse:wheel', function (opt) {
        const delta = opt.e.deltaY
        let zoom = that.canvas.getZoom()
        zoom *= 0.999 ** delta
        if (zoom > MAX_CANVAS_ZOOM) zoom = MAX_CANVAS_ZOOM
        if (zoom < MIN_CANVAS_ZOOM) zoom = MIN_CANVAS_ZOOM
        that.zoomTo(zoom, opt.e.offsetX, opt.e.offsetY)
        opt.e.preventDefault()
        opt.e.stopPropagation()
      })
      this.canvas.on('mouse:down', function (opt) {
        // if (opt.e.altKey === true) {
        that.isMouseDown = true
        // this.selection = false
        that.canvasLastMouseX = opt.e.clientX
        that.canvasLastMouseY = opt.e.clientY
        // }
      })
      this.canvas.on('mouse:move', function (opt) {
        if (that.panningMode && that.isMouseDown) {
          const vpt = this.viewportTransform
          vpt[4] += opt.e.clientX - that.canvasLastMouseX
          vpt[5] += opt.e.clientY - that.canvasLastMouseY
          this.requestRenderAll()
          that.canvasLastMouseX = opt.e.clientX
          that.canvasLastMouseY = opt.e.clientY
        }
      })
      this.canvas.on('mouse:up', function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform)
        that.isMouseDown = false
        // that.panningMode = false
        // this.selection = true
      })
      this.zoomTo(this.canvas.getZoom())
      this.canvas.renderAll()
    },
    handleInput(e) {
      const { files } = e?.target
      const file = files[0]
      e.target.value = ''
      if (!file) return
      // if (file.type !== 'image/png') {
      //   this.$toast.global.error('Please add a .png file.')
      //   return
      // }
      if (!file.type.startsWith('image/')) {
        this.$toast.global.error('Please add an image file.')
        return
      }
      const canvas = this.canvas
      const reader = new FileReader()
      const that = this
      reader.onload = function (e1) {
        const imgObj = new Image()
        imgObj.src = e1.target.result
        imgObj.onload = function () {
          const id = uuid()
          const img = new fabric.Image(imgObj, {
            hasControls: false,
            hasBorders: true,
            stroke: 'blue',
            borderColor: 'blue',
            strokeWidth: 1,
            strokeWidthUnscaled: 1,
            strokeUniform: true,
            borderOpacityWhenMoving: 1,
            opacity: 1,
          })
          img.id = id
          canvas.add(img)
          that.placingImageId = id
          that.hideFrame()
          that.scaleImageToFit(img, canvas)
          canvas.centerObject(img)
          canvas.setActiveObject(img)
          canvas.renderAll()
        }
      }
      reader.readAsDataURL(file)
    },
    scaleImageToFit(img, canvas) {
      const { width: imageWidth, height: imageHeight } = img
      let imageScale = canvas.getZoom() // 1
      const maxImageWidth = canvas.width * 0.6
      const maxImageHeight = canvas.height * 0.6
      // scale down x axis
      if (imageWidth > maxImageWidth) {
        imageScale = maxImageWidth / imageWidth
      }
      // scale down y axis
      else if (imageHeight > maxImageHeight) {
        imageScale = maxImageHeight / imageHeight
      }
      canvas.zoomToPoint(
        { x: canvas.width / 2, y: canvas.height / 2 },
        imageScale
      )
      this.zoomValue = imageScale
    },
    scaleFrameToFit(size, canvas) {
      let scale = canvas.getZoom() // 1
      const maxImageWidth = canvas.width * 0.7
      const maxImageHeight = canvas.height * 0.7
      const minDimension =
        maxImageWidth < maxImageHeight ? maxImageWidth : maxImageHeight
      if (size > minDimension) {
        scale = minDimension / size
      }
      canvas.zoomToPoint({ x: canvas.width / 2, y: canvas.height / 2 }, scale)
      this.zoomValue = scale
    },
    zoomTo(zoom, x, y) {
      if (isNaN(zoom)) return
      if (zoom < MIN_CANVAS_ZOOM) zoom = MIN_CANVAS_ZOOM
      if (zoom > MAX_CANVAS_ZOOM) zoom = MAX_CANVAS_ZOOM
      this.canvas.zoomToPoint(
        { x: x || this.canvas.width / 2, y: y || this.canvas.height / 2 },
        zoom
      )
      this.zoomValue = zoom
    },
    showFrame(size = 1024) {
      this.adjustingFrame = true
      if (!this.frame) {
        this.frame = new fabric.Rect({
          height: size,
          width: size,
          fill: 'transparent',
          stroke: 'blue',
          strokeWidth: 1,
          strokeWidthUnscaled: 1,
          strokeUniform: true,
          borderOpacityWhenMoving: 1,
          opacity: 1,
          hasControls: false,
          hasBorders: false,
          borderColor: 'transparent',
        })
        // const that = this
        // this.frame.on('mousedown', function (e){
        //   console.log('md', e)
        // })
        // this.frame.on('mouseup', function (e){
        // console.log('mu', e.transform.target.lineCoords.tl.x)
        // })
        // this.frame.on('moving', function (e) {
        // frameLeft = e.transform.target.lineCoords.tl.x
        // console.log('moving', e, that.frame.left)//.transform.target===that.rect)
        // document.getElementById('frameSize').style.left=e.transform.target.lineCoords.tl.x+'px'
        // that.frameTitleKey++
        // that.frameToolbarKey++
        // that.frameSizeText.left=e.transform.target.left
        // that.frameSizeText.top=e.target.top - 40
        // that.frameSizeText.top=that.frame.left - 40
        // that.canvas.renderAll()
        // })
        this.canvas.add(this.frame)
        // this.canvas.on('object:moving', function (e) {
        // if (e.target === that.frame) {
        //   console.log(e)
        //   that.frameTitleKey++
        //   that.frameToolbarKey++
        // }
        // console.log(e.target===that.frame, that.frame.lineCoords.tl.x, e.target.left)
        // console.log(e.target===that.frame, e.target, e)
        // })
        // this.canvas.on('object:modified', function (e) {
        //   if (e.target === that.frame) {
        //     console.log(e)
        //     that.frameTitleKey++
        //     that.frameToolbarKey++
        //   }
        // })
        // this.frameSizeText = new fabric.Text('Generation frame: 1024 x 1024', {
        //   left: that.frame.left,
        //   top: that.frame.top - 40,
        //   fill: 'blue',
        //   fontSize: 32,
        //   fontWeight: 400,
        //   hasControls: false,
        // })
        // this.canvas.add(this.frameSizeText)
      }
      if (this.canvas.getZoom() === 1) this.scaleFrameToFit(size, this.canvas)
      this.frame.opacity = 1
      this.frame.selectable = true
      this.frame.visible = true
      this.frame.bringToFront()
      this.canvas.centerObject(this.frame)
      this.canvas.setActiveObject(this.frame)
      this.canvas.renderAll()
      // this.frameSizeText.left = this.frame.left
      // this.frameSizeText.top = this.frame.top - 40
      this.canvas.renderAll()
    },
    hideFrame() {
      if (!this.frame) return
      this.frame.opacity = 0
      this.frame.selectable = false
      this.frame.visible = false
    },
    getExtendedImages() {
      if (this.generatingImage) return
      if (!this.imageDescription) {
        this.$toast.global.error('Please provide a description.')
        return
      }
      this.generatingImage = true
      this.frame.lockMovementX = true
      this.frame.lockMovementY = true
      const formData = new FormData()
      formData.append('file', this.exportFrameToBase64())
      formData.append('text', this.imageDescription)
      axios
        .post('/generate-image/extend', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          this.generatedImages = response.data.data.map((e, index) => ({
            url: e.url ? e.url : 'data:image/png;base64,' + e.b64_json,
            id: uuid(),
            index,
          }))
          this.currentImage = this.generatedImages[0]
          this.renderCurrentImage()
          this.$axios
            .$post('digital-assets/decreased-open-ai-image-count', {
              workspace_id: this.$route.params.workspace_id,
              url_workspace_id: this.$route.params.workspace_id,
              stripe_customer_id: this.stripe_customer_id,
            })
            .then((r) => {
              this.subscription.remaining_openai_image_count = r.data
            })
            .catch()
        })
        .catch((error) => {
          this.$toast.global.error(this.$getErrorMessage(error))
        })
        .finally(() => {
          this.generatingImage = false
        })
    },
    getSlicedOriginalImage(W = 1024, H = 1024) {
      const _getBlob = (imgData, w, h, cb) => {
        const _canvas = document.createElement('canvas')
        const _ctx = _canvas.getContext('2d')
        _canvas.width = w
        _canvas.height = h
        _ctx.putImageData(imgData, 0, 0)
        _canvas.toBlob(function (blob) {
          return cb(blob)
        })
      }
      const that = this
      return new Promise((resolve, reject) => {
        const frameCoords = that.frame.getBoundingRect()
        // const scaledFrameWidth=frameCoords.width/that.canvas.getZoom()
        // const scaledFrameHeight=frameCoords.height/that.canvas.getZoom()
        // console.log({scaledFrameWidth, scaledFrameHeight, fw: frameCoords.width, fh: frameCoords.height, z: that.canvas.getZoom()})
        // imagedata inside frame (scaled down)
        const imageData = that.canvas
          .toCanvasElement()
          .getContext('2d')
          .getImageData(
            frameCoords.left,
            frameCoords.top,
            frameCoords.width,
            frameCoords.height
          )

        _getBlob(imageData, W, H, (blob) => {
          console.log({ blob })
          resolve(blob)
        })
      })
    },
    exportFrameToBase64() {
      const that = this
      const frameRect = this.frame.getBoundingRect()
      const params = {
        format: 'png',
        multiplier: 1 / that.canvas.getZoom(),
        left: frameRect.left,
        top: frameRect.top,
        width: frameRect.width,
        height: frameRect.width,
      }
      this.frame.opacity = 0
      const dataUrl = this.canvas.toDataURL(params)
      this.frame.opacity = 1
      return b64ToBlob(dataUrl.substring(22), 'image/png')
    },
    downloadCanvas() {
      const that = this
      // const frameRect = this.frame.getBoundingRect()
      const params = {
        format: 'png',
        multiplier: 1 / that.canvas.getZoom(),
        // left: frameRect.left,
        // top: frameRect.top,
        // width: frameRect.width,
        // height: frameRect.width,
      }
      this.frame.opacity = 0
      const dataUrl = this.canvas.toDataURL(params)
      this.frame.opacity = 1
      FileSaver.saveAs(
        b64ToBlob(dataUrl.substring(22), 'image/png'),
        Date.now() + '.png'
      )
    },
    getMaskImage(W = 1024, H = 1024) {
      const _getImageUrl = (imgData, w, h, cb) => {
        const _canvas = document.createElement('canvas')
        const _ctx = _canvas.getContext('2d')
        _canvas.width = w
        _canvas.height = h
        _ctx.putImageData(imgData, 0, 0)
        // return _canvas.toDataURL() // image URL
        _canvas.toBlob(function (blob) {
          return cb(blob)
        })
      }
      const that = this
      return new Promise((resolve, reject) => {
        const frameCoords = that.frame.getBoundingRect()
        const imageData = that.canvas
          .toCanvasElement()
          .getContext('2d')
          .getImageData(
            frameCoords.left,
            frameCoords.top,
            W, // frameCoords.width,
            H // frameCoords.height
          )
        // console.log(imageData)
        // const img = new Image()
        // img.src = _getImageUrl(imageData, frameCoords.width, frameCoords.height)
        // img.onload = function () {
        //   // resolve(img)
        //   resolve(img.src)
        // }
        // resolve(imageData.data.buffer)
        _getImageUrl(
          imageData,
          W, // frameCoords.width,
          H, // frameCoords.height,
          (blob) => {
            console.log({ blob })
            resolve(blob)
          }
        )
      })
    },
    onMoveFiles(parent) {
      if (this.filesToMove.length === 1) {
        this.$axios
          .$post('digital-assets/save-to-dam', {
            display_file: this.filesToMove[0].url,
            file_name: this.filesToMove[0].name,
            display_file_name: this.filesToMove[0].display_file_name,
            category_id: parent,
            workspace_id: this.$route.params.workspace_id,
            url_workspace_id: this.$route.params.workspace_id,
          })
          .then((r) => {
            this.$toast.global.success(r.message)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.$refs.moveDialog.hide()
            this.moveDialogKey++
          })
      } else {
        this.savingAllToDam = true
        const image_data = this.filesToMove.map((e) => ({
          display_file: e.url,
          display_file_name: e.display_file_name,
          file_name: e.name,
        }))
        this.$axios
          .$post('digital-assets/save-all-images', {
            image_data,
            category_id: parent,
            workspace_id: this.$route.params.workspace_id,
            url_workspace_id: this.$route.params.workspace_id,
          })
          .then((r) => {
            this.$toast.global.success(r.message)
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
          .finally(() => {
            this.$refs.moveDialog.hide()
            this.moveDialogKey++
            this.savingAllToDam = false
          })
      }
    },
    exportToDAM() {
      const fileName = 'Lariat Canvas Export_' + Date.now() + '.png'
      this.filesToMove = [
        {
          url: this.canvas.toDataURL({
            format: 'png',
            multiplier: 1 / this.canvas.getZoom(),
          }),
          name: fileName,
          display_file_name: fileName,
        },
      ]
      this.$refs.moveDialog.show()
    },
  },
}
</script>

<style scoped>
.zoom-btns {
  display: flex;
  gap: 1px;
}
.zoom-btns button {
  margin: 0 !important;
  height: 26px;
  background-color: #ececf1;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 700;
  line-height: 1em;
  font-weight: 700;
  outline: none;
  user-select: none;
}
.zoom-btns button.zoom-btn-text {
  font-weight: 500;
  width: 50px;
  min-width: 50px;
  max-width: 50px;
}
.zoom-btns button.zoom-btn-minus {
  width: 30px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.zoom-btns button.zoom-btn-plus {
  width: 30px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.zoom-btns button.disabled {
  pointer-events: none;
}
.zoom-btns button.disabled * {
  opacity: 0.4;
}
.toolbar {
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  box-shadow: 0 2px 4px 0 rgb(0 0 82 / 15%);
  border-radius: 6px;
  overflow: hidden;
}
.canvas-wrapper {
  background: rgb(0 0 0/1%);
}
.canvas-wrapper:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: url('~/assets/img/dalle/dot.svg');
  background-repeat: repeat;
  background-size: 15px;
}
.select-frame-toolbar {
  position: absolute;
  top: 100px;
  left: 100px;
  align-items: center;
  background: #000;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
  color: white;
  display: flex;
  flex-direction: row;
  height: 36px;
  user-select: none;
}
.separator {
  background: #333;
  height: 100%;
  width: 1px;
}
.select-frame-toolbar-btn.disabled,
.select-frame-toolbar-btn:hover {
  opacity: 0.6;
}
.select-frame-toolbar-btn {
  background: #000;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  margin: 0;
  transition: opacity 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s;
  border: 0;
  outline: 0;
  line-height: 15px;
  font-size: 14px;
  color: white;
}
.drag-handle {
  cursor: grab;
}
.drag-handle:active {
  cursor: grabbing;
}
.picker-options {
  align-items: center;
  padding: 0 9px;
  display: flex;
}
.picker-option {
  cursor: pointer;
  padding: 6px 3px;
}
.picker-option.selected .picker-option-circle {
  background: white;
}
.picker-option-circle {
  background: #333;
  border-radius: 100%;
  height: 6px;
  width: 6px;
}
.select-frame-title {
  color: blue;
  font-size: 14px;
  left: 0;
  line-height: 20px;
  opacity: 1;
  position: absolute;
  transition: opacity 0.2s ease-in-out;
}
.generate-btn {
  display: flex;
  align-items: center;
  background: black;
  font-family: sans-serif;
  border: 0;
  padding-left: 14px;
  padding-right: 16px;
  margin: 0;
  outline: 0;
  user-select: none;
  cursor: pointer;
  color: white;
  letter-spacing: 0.875px;
}
.generate-btn.disabled {
  pointer-events: none;
  background: white;
  color: #aaa;
}
.generate-text-input.disabled {
  pointer-events: none;
  opacity: 0.4;
}
.generate-text-input {
  background: white;
  color: black;
  font-family: sans-serif;
  margin: 0;
  border: 0;
  font-size: 15px;
  border-radius: 6px;
  padding: 13px 14px;
  flex: 1;
  outline: none;
}
.generate-section {
  background: white;
}
.editor-tools {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editor-tool-sec {
  /* flex: 1; */
  display: flex;
  align-items: center;
}
.interactive-tools {
  display: flex;
  gap: 1px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  user-select: none;
  border-radius: 6px;
  overflow: hidden;
}
.interactive-tools button {
  margin: 0;
  border: 0;
  color: #000;
  background: #ececf1;
  outline: 0;
  user-select: none;
  height: 35px;
  width: 35px;
  display: inline-flex;
  transition: opacity 0.3s, box-shadow 0.3s, background-color 0.3s, color 0.3s;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.interactive-tools button.disabled {
  pointer-events: none;
}
.interactive-tools button.disabled * {
  opacity: 0.4;
}
.interactive-tools button.active {
  background: #000;
  color: white;
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

.spinner-spin {
  margin: 0 30px;
  color: #000;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
