<template>
  <select :class="classObj">
    <slot></slot>
  </select>
</template>
<script>
/* eslint-disable vue/require-default-prop */

let placeholder = ''
function customTemplate(obj) {
  const image = obj.profile_image
  const text = obj.text === '' || obj.text === null ? obj.email : obj.text

  if (obj.id !== 0) {
    if (!image) {
      const template = window.$(
        `<span class="fl-as-imgtxt text-uppercase ${text
          .charAt(0)
          .toLowerCase()}">${text.charAt(0)}</span><p>${text}</p>`
      )

      return template
    }
    const imgSrc = obj.display_profile_image
    const template = window.$('<img src="' + imgSrc + '"><p>' + text + '</p>')
    return template
  } else {
    const template = window.$(
      '<img src="' + placeholder + '"><p>' + text + '</p>'
    )
    return template
  }
}

export default {
  name: 'Select2WithImage',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String],
    placeholder: String,
    customEvent: Boolean,
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
      const optionsDetails = this.options.find(
        (option, i) => parseInt(option.id) === parseInt(this.value)
      )

      if (!optionsDetails) {
        this.$emit('optionChangeHandler', 0)
        value = 0
      }
      window.$(this.$el).val(value).trigger('change')
    },
    options(options) {
      let value = this.value
      const optionsDetails = this.options.find(
        (option) => parseInt(option.id) === parseInt(this.value)
      )

      if (!optionsDetails) {
        this.$emit('optionChangeHandler', 0)
        value = 0
      }
      window
        .$(this.$el)
        .empty()
        .select2({
          data: options,
          placeholder: this.placeholder,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,

          dropdownCss: '',
          adaptContainerCssClass: '',
          adaptDropdownCssClass: '',
          templateSelection: customTemplate,
          templateResult: customTemplate,
        })
        .val(value)
        .trigger('change')
    },
    disabled(newVal) {
      const initSelect2 = window.$(this.$el)
      initSelect2.prop('disabled', newVal)
    },
  },

  mounted() {
    let value = this.value
    const optionsDetails = this.options.find(
      (option) => parseInt(option.id) === parseInt(this.value)
    )

    if (!optionsDetails) {
      this.$emit('optionChangeHandler', 0)
      value = 0
    }
    placeholder = this.$config.userPlaceHolderImg

    const initSelect2 = window
      .$(this.$el)
      .select2({
        data: this.options,
        placeholder: this.placeholder,
        // allowClear: true,
        containerCssClass: this.containerCssClass,
        dropdownCssClass: this.dropdownCssClass,

        dropdownCss: '',
        adaptContainerCssClass: '',
        adaptDropdownCssClass: '',
        templateSelection: customTemplate,
        templateResult: customTemplate,
      })
      .val(value)
      .trigger('change')

    initSelect2.on('select2:select select2:unselect', (e) => {
      const data = e.params.data
      if (this.customEvent) {
        this.$emit('optionChangeHandler', data)
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
