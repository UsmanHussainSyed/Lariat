<template>
  <div :key="key" class="common-overaly has-relative" :class="{ visible }">
    <div class="common-modal">
      <div class="common-modal-header" style="display: flex">
        <h5 style="flex: 1">Customize Iframe</h5>
        <button type="button" class="close" @click="visible = false">
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
      <div class="common-modal-body">
        <div class="row flex-nowrap">
          <div class="col-6 options">
            <div class="option">
              <div>Name</div>
              <input v-model.trim="iFrameOptions.name" type="text" />
            </div>
            <div class="option">
              <div>Width</div>
              <input v-model="iFrameOptions.width" type="number" />&nbsp;px
            </div>
            <div class="option">
              <div>Height</div>
              <input v-model="iFrameOptions.height" type="number" />&nbsp;px
            </div>
            <div class="option">
              <div>Scrollable</div>
              <label class="label-switch" style="margin-left: -6px">
                <input
                  v-model="iFrameOptions.scrollable"
                  type="checkbox"
                  class="switch-onoff switch"
                />
                <span class="lable"></span>
              </label>
            </div>
            <div class="option">
              <div>Border</div>
              <label class="label-switch" style="margin-left: -6px">
                <input
                  v-model="iFrameOptions.borderEnabled"
                  type="checkbox"
                  class="switch-onoff switch"
                />
                <span class="lable"></span>
              </label>
            </div>
            <div v-if="iFrameOptions.borderEnabled" class="option">
              <div>Border Size</div>
              <input
                v-model="iFrameOptions.borderWidth"
                min="0"
                max="50"
                type="number"
              />&nbsp;px
            </div>
            <div v-if="iFrameOptions.borderEnabled" class="option">
              <div>Border Color</div>
              <input v-model="iFrameOptions.borderColor" type="color" />
            </div>
            <div v-if="iFrameOptions.borderEnabled" class="option">
              <div>Border Type</div>
              <input
                v-model="iFrameOptions.borderType"
                readonly
                data-toggle="dropdown"
              />
              <ul
                class="dropdown-menu"
                :style="{
                  willChange: 'transform',
                  height: 'auto',
                  maxHeight: '220px',
                  overflowY: 'auto',
                }"
              >
                <li
                  v-for="type in ['solid', 'dashed', 'dotted']"
                  :key="type"
                  @click="iFrameOptions.borderType = type"
                >
                  <a href="javascript:void(0);" class="dropdown-item">{{
                    type
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col">
            <p>Sample preview.</p>
            <iframe
              ref="iframePreview"
              :src="url"
              :style="iFrameStyle"
              :scrolling="iFrameOptions.scrollable ? 'yes' : 'no'"
            >
              IFrame is not supported by your browser, switch to a different
              browser to enable preview.
            </iframe>
            <div v-if="$refs.iframePreview" class="previewCode customscrollbar">
              {{ iFrameText }}
            </div>
            <div v-if="$refs.iframePreview" class="btn-group mt20">
              <a
                v-clipboard="$refs.iframePreview.outerHTML"
                v-clipboard:success="() => (copied = true)"
                v-clipboard:error="() => $toast.global.error('Copy failed')"
                href="javascript:void(0)"
                class="btn"
                >{{ copied ? 'Copied!' : 'Copy' }}</a
              >
              <a
                href="javascript:void(0)"
                class="btn btn-gray"
                @click.stop="visible = false"
                >Close</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileType from '~/mixins/fileType'
export default {
  name: 'AssetIFrameGenerator',
  mixins: [fileType],
  data() {
    return {
      key: Date.now(),
      file: {},
      visible: false,
      iFrameOptions: {
        scrollable: true,
        height: 150,
        width: 300,
        name: 'iframe',
        borderEnabled: true,
        borderType: 'solid',
        borderWidth: 0,
        borderColor: '#000',
      },
      copied: false,
    }
  },
  computed: {
    url() {
      const { display_file, compress_file, thumbnail_file } = this.file
      const _url = display_file || thumbnail_file || compress_file
      if (
        [
          'doc',
          'docx',
          'rtf',
          'xlsx',
          'xls',
          'pptx',
          'ppt',
          'pps',
          'ppsx',
        ].includes((this.__file_ext || '').toLowerCase())
      )
        return (
          'https://view.officeapps.live.com/op/embed.aspx?src=' +
          encodeURIComponent(this.__url)
        )
      return _url
    },
    iFrameStyle() {
      let styles = ''
      if (this.iFrameOptions.borderEnabled) {
        styles += 'border: '
        styles += this.iFrameOptions.borderWidth + 'px '
        styles += (this.iFrameOptions.borderType || 'solid') + ' '
        styles += (this.iFrameOptions.borderColor || '#000') + ' '
      }
      return styles
    },
    iFrameText() {
      let styles = ''
      if (this.iFrameOptions.borderEnabled) {
        styles += 'border: '
        styles += this.iFrameOptions.borderWidth + 'px '
        styles += (this.iFrameOptions.borderType || 'solid') + ' '
        styles += (this.iFrameOptions.borderColor || '#000') + ' '
      }
      return `<iframe 
        width="${this.iFrameOptions.width || 300}"
        height="${this.iFrameOptions.height || 150}"
        name="${this.iFrameOptions.name}"
        src="${this.url}"
        scrolling="${this.iFrameOptions.scrollable ? 'yes' : 'no'}"
        style="${styles}"
      ></iframe>`
    },
  },
  watch: {
    copied(n) {
      if (n)
        setTimeout(() => {
          this.copied = false
        }, 1500)
    },
    file() {
      this.iFrameOptions.name = this.file.display_file_name
    },
  },
  mounted() {},
  methods: {
    show(file) {
      this.file = file
      this.key = Date.now()
      this.visible = true
    },
  },
}
</script>

<style scoped>
.common-overaly.has-relative {
  display: none;
}
.common-overaly.has-relative.visible {
  display: flex;
  z-index: 99999999;
  position: fixed;
}
.common-modal {
  width: 700px;
  min-width: 700px;
  max-width: 700px;
  box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0.54);
}
.options .option {
  margin-bottom: 1em;
  display: flex;
  flex-wrap: nowrap;
}
.options .option > :first-child {
  width: 30%;
}
.options .option input {
  outline: none;
}
.options .option input[type='text'] {
  border: 1px solid #777;
  border-radius: 3px;
  line-height: 24px;
}
.previewCode {
  word-break: break-all;
  border: 1px solid #aaa;
  border-radius: 3px;
  padding: 8px;
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.08);
  max-height: 200px;
  overflow-y: auto;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
