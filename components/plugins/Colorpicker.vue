<template>
  <div ref="colorpicker" class="picker">
    <input
      v-model="colorValue"
      :disabled="is_branding"
      type="text"
      class="form-control"
      maxlength="7"
      data-lpignore="true"
      @focus="showPicker()"
      @blur="delayedBlured()"
      @input="updateFromInput"
    />
    <span class="color-picker">
      <span
        class="current-color"
        :style="'background-color: ' + colorValue"
        @click="togglePicker()"
      ></span>
      <compact-picker
        v-if="displayPicker"
        :value="colors"
        @input="updateFromPicker"
      />
    </span>
  </div>
</template>

<script>
import { Compact } from 'vue-color'

export default {
  name: 'Colorpicker',
  components: { 'compact-picker': Compact },
  props: {
    color: { type: [Number, String], default: '#000000', required: false },
    is_branding: { type: Boolean, default: false },
  },
  data() {
    return {
      colors: { hex: '#000000' },
      colorValue: '',
      displayPicker: false,
      inputEmitCall: false,
    }
  },
  watch: {
    color(val) {
      this.colorValue = val
    },
    colorValue(val) {
      const colorData = val && val.trim()

      if (colorData) {
        if (val.slice(0, 1) === '#') {
          this.updateColors(val)
          this.$emit('input', val)
          if (this.inputEmitCall) {
            this.$emit('update-color', val)
            this.inputEmitCall = false
          }
        }
      } else {
        this.updateColors('#000000')
        this.$emit('input', '#000000')
      }
    },
  },
  mounted() {
    this.setColor(this.color || '#000000')
  },
  methods: {
    setColor(color) {
      this.updateColors(color)
      this.colorValue = color
    },
    updateColors(color) {
      let colors
      if (color.slice(0, 1) === '#') {
        colors = { hex: color }
      } else if (color.slice(0, 4) === 'rgba') {
        const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',')
        const hex =
          '#' +
          (
            (1 << 24) +
            (parseInt(rgba[0]) << 16) +
            (parseInt(rgba[1]) << 8) +
            parseInt(rgba[2])
          )
            .toString(16)
            .slice(1)
        colors = { hex, a: rgba[3] }
      }

      this.$nextTick(() => (this.colors = colors))
    },
    showPicker() {
      document.addEventListener('click', this.documentClick)
      this.displayPicker = true
      this.timer && clearTimeout(this.timer)
    },
    hidePicker() {
      document.removeEventListener('click', this.documentClick)
      this.displayPicker = false
    },
    delayedBlured() {
      this.timer = setTimeout(
        () => this.$nextTick(() => this.hidePicker()),
        200
      )
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker()
    },
    updateFromInput() {
      this.inputEmitCall = true

      if (
        this.colorValue.slice(0, 1) === '#' ||
        this.colorValue.slice(0, 4) === 'rgba'
      ) {
        this.updateColors(this.colorValue)
      }
    },
    updateFromPicker(color) {
      this.inputEmitCall = false
      this.updateFromPickercolors = color
      if (color.rgba.a === 1) {
        this.colorValue = color.hex
      } else {
        this.colorValue =
          'rgba(' +
          color.rgba.r +
          ', ' +
          color.rgba.g +
          ', ' +
          color.rgba.b +
          ', ' +
          color.rgba.a +
          ')'
      }
      this.$emit('update-color', this.colorValue)
      this.hidePicker()
    },
    documentClick(e) {
      const el = this.$refs.colorpicker
      const target = e.target
      if (el !== target && !el.contains(target)) {
        this.hidePicker()
      }
    },
  },
}
</script>

<style scoped>
.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}
.picker {
  display: flex;
  justify-content: justify;
}
</style>
