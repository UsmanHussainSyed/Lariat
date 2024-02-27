<template>
  <div id="quick-note" class="modal fade quick-note-modal">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Description</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
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
          <textarea
            :value="description"
            class="form-control"
            placeholder="Description here..."
            :disabled="disabled"
            @input="$emit('update:description', $event.target.value)"
            @change="$emit('update:description', $event.target.value)"
          ></textarea>
          <div v-if="!disabled" class="annotation">
            <client-only>
              <speech-recognition
                ref="speech"
                v-slot="{ started, start, stop }"
                v-model="speechText"
              >
                <a
                  href="javascript:void(0);"
                  :class="{ 'mic-active': started }"
                  @click="
                    () => {
                      started ? stop() : start()
                    }
                  "
                >
                  <svg
                    id="Layer_1"
                    class="annotation-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 12.4 18"
                    xml:space="preserve"
                  >
                    <g id="Group_4391" transform="translate(-320.451 -659.57)">
                      <path
                        id="Path_3487"
                        class="fill-color"
                        d="M326.7,661.1L326.7,661.1c0.5,0,1,0.2,1.3,0.6l0,0l0,0c0.4,0.4,0.6,0.9,0.6,1.4v5.5c0,0.5-0.2,1-0.6,1.4c-0.7,0.7-1.9,0.8-2.7,0l0,0l0,0c-0.4-0.4-0.6-0.9-0.6-1.4V663C324.7,661.9,325.6,661.1,326.7,661.1M326.7,659.6c-0.9,0-1.8,0.4-2.4,1c-0.7,0.6-1,1.5-1,2.4v5.5c0,0.9,0.4,1.8,1,2.4l0,0c1.3,1.3,3.5,1.3,4.8,0c0.7-0.6,1-1.5,1-2.4V663c0-0.9-0.4-1.8-1-2.4l0,0C328.4,659.9,327.6,659.6,326.7,659.6L326.7,659.6z"
                      ></path>
                      <path
                        id="Path_3488"
                        class="fill-color"
                        d="M332.2,666.4c-0.4,0-0.7,0.3-0.7,0.7v1.4c0,2.6-2.1,4.8-4.7,4.8c-1.3,0-2.5-0.5-3.4-1.4c-0.9-0.9-1.4-2.1-1.4-3.4v-1.4c0-0.4-0.3-0.7-0.7-0.7s-0.7,0.3-0.7,0.7v1.4c0,3.2,2.3,5.8,5.5,6.2v1.4h-2.7c-0.2,0-0.4,0.1-0.5,0.2c-0.3,0.3-0.3,0.7,0,1c0,0,0,0,0,0c0.1,0.1,0.3,0.2,0.5,0.2h6.9l0,0c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7h-2.7v-1.3c3.2-0.4,5.5-3,5.5-6.2v-1.4C332.9,666.8,332.6,666.4,332.2,666.4z"
                      ></path>
                    </g>
                  </svg>
                </a>
              </speech-recognition>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpeechRecognition from '~/components/lead/SpeechRecognition'
export default {
  name: 'QuickNoteModal',
  components: {
    SpeechRecognition,
  },
  props: {
    description: {
      default: '',
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    speechText: {
      set(v) {
        this.$emit('update:description', v)
      },
      get() {
        return this.description
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.$('#quick-note').on('hidden.bs.modal', (e) => {
        this.attachMethod()
      })
    })
  },
  methods: {
    attachMethod() {
      if (!this.disabled) {
        this.$emit('saveDescription')
        this.reset()
      }
    },
    reset() {
      this.$refs.speech.stop()
    },
  },
}
</script>
