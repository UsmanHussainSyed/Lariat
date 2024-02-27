<template>
  <ul class="thead">
    <li>
      <slot />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    sortValue: { type: String, default: '' },
    reverse: { type: Boolean, default: false },
  },
  data() {
    return {
      sortValueModel: this.sortValue,
    }
  },
  watch: {
    sortValue(sortValue) {
      this.sortValueModel = sortValue
    },
    sortValueModel(sortValueModel) {
      this.$emit('update:sortValue', sortValueModel)
    },
  },
  methods: {
    sortingClass(sortValue) {
      return {
        sortarrow: this.sortValue === sortValue,
        descending: this.sortValue === sortValue && this.reverse,
        active: this.sortValue === sortValue && this.reverse,
      }
    },
  },
}
</script>
