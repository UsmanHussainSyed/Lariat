<template>
  <select multiple="multiple">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'Select2MultipleWithoutImage',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String, Array],
    placeholder: String,
    customEvent: Boolean,
    model: Boolean,
    containerCssClass: String,
    dropdownCssClass: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(value) {
      window.$(this.$el).val(value).trigger('change')
    },
    options(options) {
      window
        .$(this.$el)
        .empty()
        .select2({
          multiple: true,
          data: this.options,
          placeholder: this.placeholder,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
        })
        .val(this.value)
        .trigger('change')
    },
    disabled(newVal) {
      const initSelect2 = window.$(this.$el)
      initSelect2.prop('disabled', newVal)
    },
  },

  mounted() {
    const initSelect2 = window
      .$(this.$el)
      .select2({
        multiple: true,
        data: this.options,
        placeholder: this.placeholder,
        containerCssClass: this.containerCssClass,
        dropdownCssClass: this.dropdownCssClass,
      })
      .val(this.value)
      .trigger('change')

    initSelect2.on('select2:select select2:unselect', (e) => {
      this.model && this.$emit('input', initSelect2.val())
      if (this.customEvent) {
        this.$emit('changeFollower', initSelect2.val())
      }
    })
    initSelect2.prop('disabled', this.disabled)
  },
  updated() {},
  destroyed() {
    setTimeout(() => {
      window.$(this.$el).off().select2('destroy')
    }, 50)
  },
}
</script>

<style scoped></style>
