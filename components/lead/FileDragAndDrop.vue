<template>
  <div>
    <slot :error="error" :dragEnter="dragEnter" :files="files"> </slot>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  props: {
    accept: {
      type: [Array, String],
      default: '',
    },
    value: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      dragEnter: false,
      error: false,
      files: [],
    }
  },
  computed: {
    acceptedTypes() {
      if (Array.isArray(this.accept)) {
        return this.accept
      } else {
        if (this.accept.trim()) return this.accept.trim().split(',')
        return []
      }
    },
  },
  mounted() {
    $(this.$el)
      .on(
        'drag dragstart dragend dragover dragenter dragleave drop',
        function (e) {
          e.preventDefault()
          e.stopPropagation()
        }
      )
      .on('dragover dragenter', () => {
        this.dragEnter = true
      })
      .on('dragleave dragend drop', () => {
        this.dragEnter = false
      })
      .on('drop', (e) => {
        if (e.originalEvent.dataTransfer.files.length) {
          let v = true
          if (this.acceptedTypes.length) {
            v = Array.from(e.originalEvent.dataTransfer.files).every((f) => {
              return this.acceptedTypes.includes(f.type)
            })
          }
          if (v) {
            this.$emit('input', {
              target: { files: e.originalEvent.dataTransfer.files },
            })
            this.files = e.originalEvent.dataTransfer.files
            this.error = false
          } else {
            this.$emit('error', {
              target: { files: e.originalEvent.dataTransfer.files },
              message: 'found inavlid file type',
            })
            this.files = []
            this.error = true
          }
        } else {
          this.files = []
        }
      })
  },
}
</script>
