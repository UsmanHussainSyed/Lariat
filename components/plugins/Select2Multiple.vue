<template>
  <select multiple="multiple">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable vue/require-default-prop */

function customTemplate(obj, container) {
  if (this.$auth.user.id === parseInt(obj.id) && this.loginBy) {
    // Add custom attributes to the <option> tag for the selected option
    // window.$(obj.element).attr('locked', 'locked')
    window.$(container).addClass('locked-tag')
    obj.locked = true
  }
  if (
    this.$auth.user.id === parseInt(obj.id) &&
    this.clientBy &&
    this.$_auth().user.project.isClient
  ) {
    // Add custom attributes to the <option> tag for the selected option
    // window.$(obj.element).attr('locked', 'locked')
    window.$(container).addClass('locked-tag')
    obj.locked = true
  }
  if (this.quoteBy === parseInt(obj.id)) {
    window.$(container).addClass('locked-tag')
    obj.locked = true
  }
  const image = obj.display_profile_image
  const text = obj.text
  if (!image) {
    const template = window.$(
      `<span class="fl-as-imgtxt text-uppercase ${text
        .charAt(0)
        .toLowerCase()}">${text.charAt(0)}</span><p>${text}</p>`
    )
    return template
  }
  const imgSrc = image
  const template = window.$('<img src="' + imgSrc + '"><p>' + text + '</p>')
  return template
}
export default {
  name: 'Select2Multiple',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String, Array],
    placeholder: String,
    customEvent: Boolean,
    model: Boolean,
    containerCssClass: String,
    dropdownCssClass: String,
    loginBy: Boolean,
    clientBy: Boolean,
    quoteBy: [Number, String],
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
          templateSelection: customTemplate.bind(this),
          templateResult: customTemplate.bind(this),
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
        templateSelection: customTemplate.bind(this),
        templateResult: customTemplate.bind(this),
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
