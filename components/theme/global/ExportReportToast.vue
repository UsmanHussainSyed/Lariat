<template>
  <div
    id="toast"
    :class="['toasts', 'toast--green', showExportReportMessage ? 'show' : '']"
  >
    <div class="toast__icon">
      <svg
        version="1.1"
        class="toast__svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style="enable-background: new 0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <div class="toast__content">
      <p class="toast__message">{{ exportReportMessage }}</p>
    </div>
    <div class="toast__close" @click="closeExportMessage">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExportReportToast',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      timeOut: null,
      timeOutSeconds: 8000,
      exportReportMessage: this.msg,
      showExportReportMessage: this.show,
    }
  },
  watch: {
    show(newVal) {
      this.showExportReportMessage = newVal
      if (newVal) {
        this.timeOut = setTimeout(
          () => (this.showExportReportMessage = false),
          this.timeOutSeconds
        )
      } else {
        clearTimeout(this.timeOut)
      }
    },
    msg(newVal) {
      this.exportReportMessage = newVal
    },
  },
  methods: {
    closeExportMessage() {
      this.showExportReportMessage = false
    },
  },
}
</script>
