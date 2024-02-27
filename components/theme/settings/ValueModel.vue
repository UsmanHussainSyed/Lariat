<script>
export default {
  props: { value: Boolean },
  data() {
    return {
      active: this.value,
    }
  },
  watch: {
    value(value) {
      this.active = value
    },
    active(active) {
      this.$emit('input', active)
    },
  },
}
</script>
