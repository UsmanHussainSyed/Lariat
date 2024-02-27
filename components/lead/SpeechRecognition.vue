<template>
  <div>
    <slot :started="started" :start="start" :stop="stop">
      <a class="btn btn-icon" @click="started ? stop() : start()">
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

        Start Annotation</a
      >
    </slot>
  </div>
</template>
<script>
/* global webkitSpeechRecognition */
import axios from 'axios'
const bufferSize = 2048
let AudioContext, context, processor, input
// let globalStream

const constraints = {
  audio: true,
  video: false,
}
export default {
  props: {
    value: {
      default: '',
    },
  },
  data() {
    return {
      started: false,
      recognition: null,
      transcript: this.value,
      socket: null,
      fallback: false,
      recognitionRunning: false,
      id: new Date().getTime(),
    }
  },
  watch: {
    value: {
      handler() {
        this.transcript = this.value ? this.value : ''
      },
      immediate: true,
    },
  },
  created() {
    if (typeof webkitSpeechRecognition !== 'undefined') {
      const SpeechRecognition = webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.recognition.lang = 'en-US'
      // This runs when the speech recognition service starts
      this.recognition.onstart = () => {
        this.started = true
        this.recognitionRunning = true
      }
      this.recognition.onend = () => {
        this.recognitionRunning = false
      }
      this.recognition.onspeechend = () => {
        // when user is done speaking
      }

      // This runs when the speech recognition service returns result
      this.recognition.onresult = (event) => {
        this.transcript += event.results[0][0].transcript + ' '
        // var confidence = event.results[0][0].confidence;
        this.$emit('input', this.transcript)
      }
      this.recognition.addEventListener('end', () => {
        if (this.started) this.recognition.start()
        else this.recognition.stop()
      })
      // start recognition
    } else {
      this.fallback = true
      axios
        .get(location.origin + '/api/speech')
        .then((r) => {})
        .catch(() => {})
    }

    this.$root.$on('stopspeechtotext', (e) => {
      if (e.id !== this.id) {
        this.stop()
      }
    })
  },
  beforeDestroy() {
    this.started = false

    this.stop()
    this.$root.$off('stopspeechtotext')
  },
  methods: {
    start() {
      if (!this.started) {
        if (!this.fallback) {
          if (!this.started && !this.recognitionRunning)
            this.recognition.start()
        } else {
          this.initRecording()
        }
      }

      setTimeout(() => {
        window.$('#quickNoteTextarea').focus()
      }, 200)
      this.$root.$emit('stopspeechtotext', { id: this.id })
    },
    stop() {
      if (this.fallback) {
        if (this.socket) {
          this.socket.disconnect()
        }
        this.socket = null
        if (context && context.state === 'running') context.close()
      } else if (this.recognition) this.recognition.stop()
      this.started = false
      setTimeout(() => {
        window.$('#quickNoteTextarea').focus()
      }, 200)
      // this.$emit('input', this.transcript)
    },
    initRecording() {
      this.started = true
      this.transcript = ''
      this.socket = this.$nuxtSocket({
        name: 'speech',
      })
      this.socket.on('speechData', (event) => {
        if (event.results[0].isFinal)
          this.transcript += event.results[0].alternatives[0].transcript + ' '
        // var confidence = event.results[0][0].confidence;
        this.$emit('input', this.transcript)
      })
      this.socket.emit('startGoogleCloudStream', '')
      AudioContext = window.AudioContext || window.webkitAudioContext
      context = new AudioContext({
        // if Non-interactive, use 'playback' or 'balanced' // https://developer.mozilla.org/en-US/docs/Web/API/AudioContextLatencyCategory
        latencyHint: 'interactive',
      })
      processor = context.createScriptProcessor(bufferSize, 1, 1)
      processor.connect(context.destination)
      context.resume()

      navigator.mediaDevices.getUserMedia(constraints).then(this.handleSuccess)
    },
    handleSuccess(stream) {
      // globalStream = stream
      input = context.createMediaStreamSource(stream)
      input.connect(processor)

      processor.onaudioprocess = (e) => {
        this.microphoneProcess(e)
      }
    },
    microphoneProcess(e) {
      const left = e.inputBuffer.getChannelData(0)
      // var left16 = convertFloat32ToInt16(left); // old 32 to 16 function
      const left16 = downsampleBuffer(left, 44100, 16000)
      this.socket.emit('talk', left16)
    },
  },
}

// helper

function downsampleBuffer(buffer, sampleRate, outSampleRate) {
  if (outSampleRate === sampleRate) {
    return buffer
  }
  if (outSampleRate > sampleRate) {
    throw new Error(
      'downsampling rate show be smaller than original sample rate'
    )
  }
  const sampleRateRatio = sampleRate / outSampleRate
  const newLength = Math.round(buffer.length / sampleRateRatio)
  const result = new Int16Array(newLength)
  let offsetResult = 0
  let offsetBuffer = 0
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio)
    let accum = 0
    let count = 0
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i]
      count++
    }

    // eslint-disable-next-line
    result[offsetResult] = Math.min(1, accum / count) * 0x7fff
    offsetResult++
    offsetBuffer = nextOffsetBuffer
  }
  return result.buffer
}
</script>
