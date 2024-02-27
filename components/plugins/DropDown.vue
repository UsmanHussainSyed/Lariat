<template>
  <select>
    <slot></slot>
  </select>
</template>

<script>
function customTemplate(obj) {
  const text = obj.text === '' || obj.text === null ? obj.email : obj.text
  const image = obj.profile_image

  // for placeholder
  if (obj.id === '') {
    return window.$(`<span>${text}</span>`)
  }
  // for option & not having image
  if (!image) {
    return window.$(
      `<span class="fl-as-imgtxt text-uppercase ${text
        .charAt(0)
        .toLowerCase()}">${text.charAt(0)}</span><p>${text}</p>`
    )
  }
  // for option & having image
  const imgSrc = obj.display_profile_image
  return window.$(`<img src="${imgSrc}"><p>${text}</p>`)
}
export default {
  name: 'DropDown',
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    placeholder: {
      type: String,
      default: 'Select option',
    },
    containerCssClass: {
      type: String,
      default: '',
    },
    dropdownCssClass: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(newVal) {
      window.$(this.$el).val(newVal).trigger('change')
    },
    options(options) {
      window
        .$(this.$el)
        .empty()
        .select2({
          data: options,
          placeholder: this.placeholder,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          templateSelection: customTemplate,
          templateResult: customTemplate,
        })
        .val(this.value)
        .trigger('change')
    },
    disabled(newVal) {
      window.$(this.$el).prop('disabled', newVal)
    },
  },
  mounted() {
    window
      .$(this.$el)
      .select2({
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
      .prop('disabled', this.disabled)
      .on('select2:select', (e) => {
        const data = e.params.data
        this.$emit('changed', data)
        this.$emit('input', data.id)
      })
  },
  destroyed() {
    setTimeout(() => {
      window.$(this.$el).off().select2('destroy')
    }, 50)
  },
}
</script>

<style scoped></style>
