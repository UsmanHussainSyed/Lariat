<template>
  <select multiple="multiple">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable vue/require-default-prop */

function customTemplate(obj) {
  const text = obj.text
  // close icon not found
  // const template = window.$(
  //   '<div>' + text + '<img src="~/assets/img/icon/close.svg" alt="" /></div>'
  // )
  const template = window.$('<div>' + text + '</div>')
  return template
}
export default {
  name: 'Select2MultipleForHeader',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String, Array],
    placeholder: String,
    customEvent: Boolean,
    containerCssClass: String,
    dropdownCssClass: String,

    /* containerCssClass: 'multiple-xxxxxxxxx',
          dropdownCssClass: 'multiple-yyyyyyyyyy', */
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
          // allowClear: true,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          templateSelection: customTemplate,
          templateResult: customTemplate,
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
        // allowClear: true,
        containerCssClass: this.containerCssClass,
        dropdownCssClass: this.dropdownCssClass,
        templateSelection: customTemplate,
        templateResult: customTemplate,
      })
      .val(this.value)
      .trigger('change')

    initSelect2.on('select2:select select2:unselect', (e) => {
      // const data = e.params.data
      if (this.customEvent) {
        this.$emit('changeFollower', initSelect2.val())
      }
      // this.$emit("input", data.id);
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
