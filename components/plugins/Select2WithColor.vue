<template>
  <select :class="classObj">
    <slot></slot>
  </select>
</template>
<script>
/* eslint-disable vue/require-default-prop */
function customTemplate(obj) {
  const color = obj.severity_color || obj.status_color
  const tcolor = obj.severity_text_color || obj.status_text_color
  const text = obj.text

  if (color && tcolor)
    return window.$(
      `<span class="bg" style="background-color: ${color}"><p style="color:${tcolor}">${text}</p></span>`
    )

  return window.$('<p>').text(text)
}
function formatState(state) {
  if (!state.id) {
    return state.text
  }
  const color = state.severity_color || state.status_color
  const tcolor = state.severity_text_color || state.status_text_color
  const text = state.text
  const $state = window.$(
    `<span style="background-color: ${color};color:${tcolor}">${text}</span>`
  )
  return $state
}

export default {
  name: 'Select2WithColor',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String],
    placeholder: String,
    customEvent: Boolean,
    model: Boolean,
    containerCssClass: String,
    dropdownCssClass: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    classObj: {
      type: Object,
      default: null,
    },
  },
  watch: {
    value(value) {
      window
        .$(this.$el)
        .select2({
          data: this.options,
          placeholder: this.placeholder,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          dropdownCss: '',
          adaptContainerCssClass: '',
          adaptDropdownCssClass: '',
          templateSelection: customTemplate,
          templateResult: formatState,
        })
        .val(value)
        .trigger('change')
    },
    options(options) {
      window
        .$(this.$el)
        .select2({
          data: this.options,
          placeholder: this.placeholder,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          dropdownCss: '',
          adaptContainerCssClass: '',
          adaptDropdownCssClass: '',
          templateSelection: customTemplate,
          templateResult: formatState,
        })
        .val(this.value)
        .trigger('change')
    },
    disabled(disabled) {
      window.$(this.$el).prop('disabled', disabled)
    },
  },
  mounted() {
    window
      .$(this.$el)
      .select2({
        data: this.options,
        placeholder: this.placeholder,
        containerCssClass: this.containerCssClass,
        dropdownCssClass: this.dropdownCssClass,
        dropdownCss: '',
        adaptContainerCssClass: '',
        adaptDropdownCssClass: '',
        templateSelection: customTemplate,
        templateResult: formatState,
      })
      .val(this.value)
      .trigger('change')
      .on('select2:select', (e) => {
        const data = e.params.data
        this.model && this.$emit('input', data.id)
        if (this.customEvent) {
          this.$emit('optionChangeHandler', data)
        }
      })
      .prop('disabled', this.disabled)
  },
  destroyed() {
    setTimeout(() => {
      window.$(this.$el).off().select2('destroy')
    }, 50)
  },
}
</script>

<style scoped></style>
