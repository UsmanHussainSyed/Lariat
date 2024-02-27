<template>
  <div style="height: inherit; position: relative">
    <div v-show="processing && !cropperError" class="overlay">
      <div class="loader"></div>
    </div>
    <div v-if="!processing && cropperError" class="cropper-error">
      Could not load that image.
    </div>
    <template v-else>
      <!-- Crop -->
      <div class="edit-box">
        <h5>Crop</h5>
        <div class="crop-box d-flex align-items-center">
          <a
            class="big-box"
            :class="{ active: cropMode === 1 }"
            @click="setCropMode(1)"
          >
            <svg
              id="Layer_1"
              class="aspect-ratio-icon black"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 40 40"
              xml:space="preserve"
            >
              <g id="Rectangle_6295">
                <path
                  class="fill-none"
                  d="M4,0h32c2.2,0,4,1.8,4,4v32c0,2.2-1.8,4-4,4H4c-2.2,0-4-1.8-4-4V4C0,1.8,1.8,0,4,0z"
                ></path>
                <path
                  class="fill-stroke"
                  d="M4,1h32c1.7,0,3,1.3,3,3v32c0,1.7-1.3,3-3,3H4c-1.7,0-3-1.3-3-3V4C1,2.3,2.3,1,4,1z"
                ></path>
              </g>
            </svg>
            <span>1x1</span>
          </a>
          <a
            class="big-box"
            :class="{ active: cropMode === null }"
            @click="setCropMode(null)"
          >
            <svg
              id="Layer_1"
              class="freeform-icon black"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 30 30"
              xml:space="preserve"
            >
              <path
                id="crop_1_"
                class="fill-color"
                d="M0.9,7.9H6v15.2C6,23.6,6.4,24,6.9,24h15.2v5.1c0,0.5,0.5,0.9,1,0.9c0.5,0,0.9-0.4,0.9-0.9V24h5.1c0.5,0,0.9-0.5,0.9-1c0-0.5-0.4-0.9-0.9-0.9H24V6.9C24,6.4,23.6,6,23.1,6H7.9V0.9c0-0.5-0.5-0.9-1-0.9C6.4,0,6,0.4,6,0.9V6H0.9C0.4,6,0,6.4,0,7C0,7.5,0.4,7.9,0.9,7.9z M22.1,7.9v14.3H7.9V7.9H22.1z"
              ></path>
            </svg>
            <span>Freeform</span>
          </a>
          <a class="apply" @click="applyCrop()">Apply</a>
        </div>
      </div>
      <!-- Resize -->
      <div class="edit-box">
        <h5>Resize</h5>
        <div class="resize-box d-flex align-items-center">
          <div
            class="img-edit-input"
            :class="{
              active: resizeFocused === 'width',
            }"
          >
            <span>W</span>
            <input
              v-model.number="width"
              v-tooltip="{
                show: widthError,
                content: widthError,
                trigger: 'focus hover click',
              }"
              type="number"
              name="width"
              class="form-control hide-indicator"
              :class="{ 'input-error': !!widthError }"
              @input.prevent.stop="
                ({ target }) => {
                  let val = parseInt(target.value)
                  if (!val || isNaN(val) || val < 1 || val >= 6000) {
                    widthError = 'Please enter a valid number less than 4000'
                    return
                  }
                  widthError = ''
                  if (resizeLock && resizeFocused === 'width') {
                    heightError = ''
                    height = Math.round(width / resizeRatio)
                  }
                }
              "
              @focus="resizeFocused = 'width'"
            />
          </div>
          <div class="lock-unlock-icon" :class="{ lock: !resizeLock }">
            <a
              v-tooltip="'Unlocked'"
              @click="
                () => {
                  resizeLock = true
                  if (width > 0 && width <= 6000) {
                    height = Math.round(width / resizeRatio)
                  } else if (height > 0 && height <= 6000) {
                    width = Math.round(height * resizeRatio)
                  }
                  widthError = !!(!width || width < 1 || width > 6000)
                  heightError = !!(!height || height < 1 || height > 6000)
                }
              "
            >
              <svg
                id="Layer_1"
                class="unlock-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Unlock">
                  <g
                    id="padlock_updated-01"
                    transform="translate(-73.3 -15.083)"
                  >
                    <path
                      id="Path_40221"
                      class="fill-color"
                      d="M82,25.2c-0.9,0-1.7,0.7-1.7,1.6c0,0,0,0,0,0.1c0,0.7,0.4,1.4,1.1,1.6v1.2c0,0.3,0.3,0.6,0.6,0.6c0.3,0,0.6-0.3,0.6-0.6l0,0v-1.2c0.7-0.2,1.1-0.9,1.1-1.6C83.8,26,83,25.2,82,25.2C82.1,25.2,82.1,25.2,82,25.2z M82,27.5c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6c0.3,0,0.6,0.3,0.6,0.6l0,0C82.6,27.2,82.4,27.4,82,27.5C82.1,27.5,82.1,27.5,82,27.5L82,27.5z"
                    ></path>
                    <path
                      id="Path_40222"
                      class="fill-color"
                      d="M87.1,22.4h-9v-2.2c0-2.2,1.7-3.9,3.9-3.9c0,0,0,0,0,0c3.4,0,3.9,3.5,3.9,3.6c0,0.2,0.2,0.4,0.5,0.4h0.2c0.1,0,0.3,0,0.3-0.1c0.1-0.1,0.1-0.2,0.1-0.3l0,0l0,0c-0.3-2.8-2.8-4.8-5.5-4.5c-2.6,0.3-4.5,2.4-4.6,5v2.2c-0.9,0-1.7,0.7-1.7,1.6c0,0,0,0,0,0.1v7.3c0,0.9,0.7,1.7,1.6,1.7c0,0,0,0,0.1,0h10.1c0.9,0,1.7-0.7,1.7-1.6c0,0,0,0,0-0.1v-7.3C88.8,23.2,88.1,22.4,87.1,22.4C87.1,22.4,87.1,22.4,87.1,22.4z M87.7,31.4c0,0.3-0.2,0.5-0.5,0.6c0,0,0,0-0.1,0H77c-0.3,0-0.5-0.2-0.6-0.5c0,0,0,0,0-0.1v-7.3c0-0.3,0.2-0.5,0.5-0.6c0,0,0,0,0.1,0h10.1c0.3,0,0.5,0.2,0.6,0.5c0,0,0,0,0,0.1L87.7,31.4L87.7,31.4z"
                    ></path>
                  </g>
                </g>
              </svg>
            </a>
            <a v-tooltip="'Locked'" @click="resizeLock = false">
              <svg
                id="Layer_1"
                class="lock-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Lock">
                  <g id="padlock_3_" transform="translate(2.25)">
                    <path
                      id="Path_40218"
                      class="fill-color"
                      d="M6.8,0C4,0,1.7,2.2,1.7,5c0,0,0,0,0,0v2.2C0.8,7.3,0,8,0,8.9C0,9,0,9,0,9v7.3C0,17.2,0.7,18,1.6,18c0,0,0,0,0.1,0h10.1c0.9,0,1.7-0.7,1.7-1.6c0,0,0,0,0-0.1V9c0-0.9-0.7-1.7-1.6-1.7c0,0,0,0-0.1,0V5.1C11.8,2.3,9.6,0,6.8,0C6.8,0,6.8,0,6.8,0z M12.4,9v7.3c0,0.3-0.2,0.5-0.5,0.6c0,0,0,0-0.1,0H1.7c-0.3,0-0.5-0.2-0.6-0.5c0,0,0,0,0-0.1V9c0-0.3,0.2-0.5,0.5-0.6c0,0,0,0,0.1,0h10.1C12.1,8.4,12.4,8.6,12.4,9C12.4,9,12.4,9,12.4,9z M2.8,7.3V5.1c0-2.2,1.8-3.9,4-3.9c2.1,0,3.8,1.7,3.9,3.9v2.2H2.8z"
                    ></path>
                    <path
                      id="Path_40219"
                      class="fill-color"
                      d="M6.8,10.1c-0.9,0-1.7,0.7-1.7,1.6c0,0,0,0,0,0.1c0,0.7,0.4,1.4,1.1,1.6v1.2c0,0.3,0.3,0.6,0.6,0.5c0.3,0,0.5-0.2,0.5-0.5v-1.2c0.7-0.2,1.1-0.9,1.1-1.6C8.5,10.9,7.7,10.1,6.8,10.1C6.8,10.1,6.8,10.1,6.8,10.1z M6.8,12.4c-0.3,0-0.6-0.3-0.6-0.6c0-0.3,0.3-0.6,0.6-0.6c0.3,0,0.6,0.3,0.6,0.6c0,0,0,0,0,0C7.3,12.1,7.1,12.4,6.8,12.4C6.8,12.4,6.8,12.4,6.8,12.4z"
                    ></path>
                  </g>
                </g>
              </svg>
            </a>
          </div>
          <div
            class="img-edit-input"
            :class="{ active: resizeFocused === 'height' }"
          >
            <span>H</span>
            <input
              v-model.number="height"
              v-tooltip="{
                show: heightError,
                content: heightError,
                trigger: 'focus hover click',
              }"
              type="number"
              name="height"
              class="form-control hide-indicator"
              :class="{ 'input-error': !!heightError }"
              @input.prevent.stop="
                ({ target }) => {
                  let val = parseInt(target.value)
                  if (!val || isNaN(val) || val < 1 || val >= 6000) {
                    heightError = 'Please enter a valid number less than 4000'
                    return
                  }
                  heightError = ''
                  if (resizeLock && resizeFocused === 'height') {
                    widthError = ''
                    width = Math.round(resizeRatio * height)
                  }
                }
              "
              @focus="resizeFocused = 'height'"
            />
          </div>
          <a
            class="apply"
            :class="{ disabled: heightError || widthError }"
            :disabled="!!(heightError || widthError)"
            @click="resizeImage()"
            >Apply</a
          >
        </div>
      </div>
      <!-- Rotate -->
      <div class="edit-box">
        <h5>Rotate</h5>
        <div class="rotate-box d-flex align-items-center">
          <a
            class="img-edit-btn"
            :class="{ active: rotationSelected === 'left' }"
            @click="
              rotationSelected = 'left'
              rotateImage(-90)
            "
          >
            <svg
              id="Layer_1"
              class="left-rotate-icon black"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 15 12.4"
              xml:space="preserve"
            >
              <path
                id="rotate-right"
                class="fill-color"
                d="M0,4.4c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0h0l3.7,0c0.4,0,0.7-0.3,0.7-0.7S4.8,3.6,4.4,3.6l-2.3,0c2.4-2.7,6.6-3,9.3-0.6c2.3,2.1,2.9,5.5,1.3,8.2c-0.2,0.3-0.1,0.8,0.3,1c0.3,0.2,0.8,0.1,1-0.3c2.2-3.8,0.9-8.7-2.9-10.9C7.9-0.7,4-0.2,1.4,2.3l0-1.6C1.5,0.3,1.2,0,0.8,0c0,0,0,0,0,0h0C0.4,0,0.1,0.3,0,0.7L0,4.4z"
              ></path>
            </svg>
            <span>Left</span>
          </a>
          <a
            class="img-edit-btn"
            :class="{ active: rotationSelected === 'right' }"
            @click="
              rotationSelected = 'right'
              rotateImage(90)
            "
          >
            <svg
              id="Layer_1"
              class="right-rotate-icon black"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 15 12.4"
              xml:space="preserve"
            >
              <path
                id="rotate-right"
                class="fill-color"
                d="M15,4.4c0,0.4-0.3,0.7-0.7,0.7c0,0,0,0,0,0h0l-3.7,0c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7l0,0l2.3,0c-2.4-2.7-6.6-3-9.3-0.6c-2.3,2.1-2.9,5.5-1.3,8.2c0.2,0.3,0.1,0.8-0.3,1c-0.3,0.2-0.8,0.1-1-0.3C-1.1,8.2,0.2,3.3,4,1.1c3.1-1.8,7-1.3,9.6,1.2l0-1.6c0-0.4,0.3-0.7,0.7-0.7c0,0,0,0,0,0h0C14.6,0,15,0.3,15,0.7L15,4.4z"
              ></path>
            </svg>
            <span>Right</span>
          </a>
          <div
            class="img-edit-input deg-input"
            :class="{ active: rotationSelected === 'custom' }"
          >
            <span>
              <svg
                id="Layer_1"
                class="rotate-deg-icon black"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 15 15"
                xml:space="preserve"
              >
                <path
                  id="rotate_1_"
                  class="fill-color"
                  d="M14.3,6.8c-0.4,0-0.7,0.3-0.7,0.7c0,3.4-2.7,6.2-6.1,6.2S1.3,11,1.3,7.6c0-3.4,2.7-6.2,6.1-6.2c1.8,0,3.5,0.7,4.6,2h-1.8c-0.4,0-0.7,0.3-0.7,0.7s0.3,0.7,0.7,0.7h4.1V0.7C14.3,0.3,14,0,13.6,0C13.3,0,13,0.3,13,0.7v1.7c-2.8-3-7.6-3.1-10.6-0.3s-3.1,7.6-0.3,10.6s7.6,3.1,10.6,0.3c1.5-1.4,2.4-3.4,2.3-5.5C15,7.1,14.7,6.8,14.3,6.8C14.3,6.8,14.3,6.8,14.3,6.8z"
                ></path>
              </svg>
            </span>
            <input
              v-model.number="rotation"
              min="-360"
              max="360"
              type="number"
              name="size-deg"
              class="form-control hide-indicator"
              @keyup.prevent.stop=""
              @focus="rotationSelected = 'custom'"
              @blur="
                ({ target }) => {
                  if (!target.value || isNaN(target.value)) {
                    target.value = rotation = 0
                  }
                }
              "
            />
          </div>
          <a class="apply" @click="rotateImage(rotation)">Apply</a>
        </div>
      </div>
      <!-- flip -->
      <div class="edit-box">
        <h5>Flip</h5>
        <div class="flip-box d-flex align-items-center">
          <a
            class="img-edit-btn"
            :class="{ active: flipPosition === 'y' }"
            @click="flipImage('y')"
          >
            <svg
              id="Layer_1"
              class="vertical-flip-icon black"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="_33-Flip" transform="translate(-2 -2)">
                <path
                  id="Path_3298"
                  class="fill-color"
                  d="M16.8,2H5.2C4.9,2,4.6,2.3,4.6,2.7c0,0.2,0.1,0.3,0.2,0.4l5.8,5.8c0.3,0.3,0.7,0.3,0.9,0c0,0,0,0,0,0l5.8-5.8c0.3-0.3,0.2-0.7,0-0.9C17.1,2.1,17,2,16.8,2z M11,7.5L6.8,3.3h8.5L11,7.5z"
                ></path>
                <path
                  id="Path_3299"
                  class="fill-color"
                  d="M11.5,13.1c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-5.8,5.8c-0.3,0.3-0.2,0.7,0,0.9C4.9,19.9,5,20,5.2,20h11.6c0.4,0,0.6-0.3,0.6-0.7c0-0.2-0.1-0.3-0.2-0.4L11.5,13.1z M6.8,18.7l4.2-4.2l4.2,4.2H6.8z"
                ></path>
                <path
                  id="Path_3300"
                  class="fill-color"
                  d="M19.4,10.4h-1.3c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6c0,0,0,0,0,0h1.3c0.4,0,0.6-0.3,0.6-0.6C20,10.6,19.7,10.4,19.4,10.4z"
                ></path>
                <path
                  id="Path_3301"
                  class="fill-color"
                  d="M15.5,11.6c0.4,0,0.6-0.3,0.6-0.6c0-0.4-0.3-0.6-0.6-0.6h-1.3c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6H15.5z"
                ></path>
                <path
                  id="Path_3302"
                  class="fill-color"
                  d="M11.6,11.6c0.4,0,0.6-0.3,0.6-0.6c0-0.4-0.3-0.6-0.6-0.6h-1.3c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6H11.6z"
                ></path>
                <path
                  id="Path_3303"
                  class="fill-color"
                  d="M7.8,11.6c0.4,0,0.6-0.3,0.6-0.6c0-0.4-0.3-0.6-0.6-0.6H6.5c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6H7.8z"
                ></path>
                <path
                  id="Path_3304"
                  class="fill-color"
                  d="M3.9,10.4H2.6C2.3,10.4,2,10.6,2,11c0,0.4,0.3,0.6,0.6,0.6c0,0,0,0,0,0h1.3c0.4,0,0.6-0.3,0.6-0.6C4.6,10.6,4.3,10.4,3.9,10.4z"
                ></path>
              </g>
            </svg>
            <span>Vertical</span>
          </a>
          <a
            class="img-edit-btn"
            :class="{ active: flipPosition === 'x' }"
            @click="flipImage('x')"
          >
            <svg
              id="Layer_1"
              class="horizontal-flip-icon black"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="_33-Flip" transform="translate(-2 20) rotate(-90)">
                <path
                  id="Path_3298"
                  class="fill-color"
                  d="M16.8,2H5.2C4.9,2,4.6,2.3,4.6,2.7c0,0.2,0.1,0.3,0.2,0.4l5.8,5.8c0.3,0.3,0.7,0.3,0.9,0c0,0,0,0,0,0l5.8-5.8c0.3-0.3,0.2-0.7,0-0.9C17.1,2.1,17,2,16.8,2z M11,7.5L6.8,3.3h8.5L11,7.5z"
                ></path>
                <path
                  id="Path_3299"
                  class="fill-color"
                  d="M11.5,13.1c-0.3-0.3-0.7-0.3-0.9,0c0,0,0,0,0,0l-5.8,5.8c-0.3,0.3-0.2,0.7,0,0.9C4.9,19.9,5,20,5.2,20h11.6c0.4,0,0.6-0.3,0.6-0.7c0-0.2-0.1-0.3-0.2-0.4L11.5,13.1z M6.8,18.7l4.2-4.2l4.2,4.2H6.8z"
                ></path>
                <path
                  id="Path_3300"
                  class="fill-color"
                  d="M19.4,10.4h-1.3c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6c0,0,0,0,0,0h1.3c0.4,0,0.6-0.3,0.6-0.6C20,10.6,19.7,10.4,19.4,10.4z"
                ></path>
                <path
                  id="Path_3301"
                  class="fill-color"
                  d="M15.5,11.6c0.4,0,0.6-0.3,0.6-0.6c0-0.4-0.3-0.6-0.6-0.6h-1.3c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6H15.5z"
                ></path>
                <path
                  id="Path_3302"
                  class="fill-color"
                  d="M11.6,11.6c0.4,0,0.6-0.3,0.6-0.6c0-0.4-0.3-0.6-0.6-0.6h-1.3c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6H11.6z"
                ></path>
                <path
                  id="Path_3303"
                  class="fill-color"
                  d="M7.8,11.6c0.4,0,0.6-0.3,0.6-0.6c0-0.4-0.3-0.6-0.6-0.6H6.5c-0.4,0-0.6,0.3-0.6,0.6c0,0.4,0.3,0.6,0.6,0.6H7.8z"
                ></path>
                <path
                  id="Path_3304"
                  class="fill-color"
                  d="M3.9,10.4H2.6C2.3,10.4,2,10.6,2,11c0,0.4,0.3,0.6,0.6,0.6c0,0,0,0,0,0h1.3c0.4,0,0.6-0.3,0.6-0.6C4.6,10.6,4.3,10.4,3.9,10.4z"
                ></path>
              </g>
            </svg>
            <span>Horizontal</span>
          </a>
        </div>
      </div>
      <!-- export/cancel -->
      <div class="mb-0">
        <a class="btn" @click="exportImage">Export</a>
        <a class="btn btn-gray" @click="resetAll">Reset All</a>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'ImageEditActions',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  props: ['editor', 'cropperError'],
  data() {
    return {
      cropMode: '',
      dragMode: 'move',
      rotation: 0,
      rotationSelected: '',
      resizeLock: true,
      resizeFocused: '',
      flipPosition: '',
      processing: false,
      height: 0,
      width: 0,
      resizeRatio: 1,
      widthError: '',
      heightError: '',
    }
  },
  computed: {
    assetEditAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_edit_modification
        ?.enable
    },
  },
  methods: {
    rotateImage(deg) {
      if (!this.assetEditAllowed) return
      this.editor.clearCropBox()
      this.rotation = 0
      this.processing = true
      this.editor.rotate(deg)
      this.editor.save(true, () => {
        this.update()
        this.$nextTick(() => (this.processing = false))
      })
    },
    update() {
      if (!this.assetEditAllowed) return
      if (this.processing) return
      if (this.editor) {
        this.processing = true
        const { naturalHeight, naturalWidth, aspectRatio } =
          this.editor.getImageData()
        this.height = naturalHeight
        this.width = naturalWidth
        this.resizeRatio = aspectRatio
        this.$nextTick(() => (this.processing = false))
      }
    },
    setCropMode(value) {
      if (!this.assetEditAllowed) return
      if (this.processing) return
      this.editor.clearCropBox()
      if (this.cropMode === value) {
        this.dragMode = this.dragMode === 'move' ? 'crop' : 'move'
        this.editor.setDragMode(this.dragMode)
        this.cropMode = ''
        return
      }
      this.cropMode = value
      this.dragMode = 'crop'
      this.editor.setDragMode(this.dragMode)
      this.editor.setCropMode(this.cropMode)
    },
    applyCrop() {
      if (!this.assetEditAllowed) return
      if (this.processing) return
      if (this.cropMode !== '' && this.dragMode === 'crop') {
        this.processing = true
        const cropApplied = this.editor.crop()
        if (cropApplied) {
          this.editor.save(true, () => {
            this.editor.clearCropBox()
            this.editor.setDragMode(this.dragMode)
            this.editor.setCropMode(this.cropMode)
            this.$nextTick(() => (this.processing = false))
          })
        } else this.processing = false
      }
    },
    exportImage() {
      if (!this.assetEditAllowed) return
      this.editor.export()
    },
    resetAll() {
      if (!this.assetEditAllowed) return
      this.processing = true
      this.cropMode = ''
      this.dragMode = 'move'
      this.editor.setDragMode(this.dragMode)
      this.editor.setCropMode(this.cropMode)
      this.editor.resetAll()
      this.$nextTick(() => (this.processing = false))
    },
    flipImage(direction) {
      if (!this.assetEditAllowed) return
      if (this.processing) return
      this.processing = true
      this.editor.clearCropBox()
      this.processing = true
      this.flipPosition = direction
      if (direction === 'x') {
        this.editor.scale(-1, 1)
      } else {
        this.editor.scale(1, -1)
      }
      this.editor.save(true, () => {
        this.$nextTick(() => (this.processing = false))
      })
    },
    resizeImage() {
      if (!this.assetEditAllowed) return
      if (this.processing) return
      this.processing = true
      this.editor.resize(this.width, this.resizeLock ? undefined : this.height)
      this.$nextTick(() => (this.processing = false))
    },
  },
}
</script>
<style scoped>
input.form-control.input-error {
  border-color: #dc3545;
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

.cropper-error {
  color: #dc3545;
}
</style>
