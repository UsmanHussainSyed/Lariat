export default {
  props: { value: Boolean, default: false },
  data() {
    return {
      model: this.value,
    }
  },
  watch: {
    value(value) {
      this.model = value
    },
    model(model) {
      this.$emit('input', model)
    },
  },
}
