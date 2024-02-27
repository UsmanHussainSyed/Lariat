<template>
  <select>
    <slot></slot>
  </select>
</template>
<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'SelectAndAdd',
  props: {
    options: [Array, Object, String],
    value: [Number, String],
    placeholder: String,
    customEvent: Boolean,
    customEventContext: Boolean,
  },
  watch: {
    value(value) {
      window.$(this.$el).val(value).trigger('change')
    },
    options(options) {
      window.$(this.$el).empty().select2({ data: options })
    },
  },
  mounted() {
    this.init()
  },
  destroyed() {
    setTimeout(() => {
      window.$(this.$el).off().select2('destroy')
    }, 50)
  },
  updated() {
    this.init()
  },
  methods: {
    init() {
      const vue = this
      // selecting the select element
      // then adding jquery select2 to that element
      const initSelect2 = window
        .$(vue.$el)
        .select2({
          data: vue.options,
          // Need to enable tags for custom add tag if not present
          tags: true,
          placeholder: vue.placeholder,
          // Insert tag is jquery select2 callback function
          // that lets you insert values if it is not present in the dropdown
          insertTag(data, tag) {
            const orgValue = tag.text
            const orgValueData = vue.$getMarkedText(orgValue, orgValue, 'b')
            if (vue.customEventContext) {
              tag.text = `Add new ${vue.placeholder} &nbsp;${orgValueData}`
            }
            tag.id = `${orgValue}`
            tag.newTag = true
            tag.orgTag = orgValue
            data.push(tag)
          },
          escapeMarkup(markup) {
            return markup
          },
        })
        .val(vue.value)
        .trigger('change')

      initSelect2.on('select2:select', (e) => {
        const data = e.params.data
        // data.text = data.text.replace("Add new client &nbsp;", "");
        if (vue.customEvent) {
          vue.$emit('ChangeSelectAndAdd', data)
        }
        vue.$emit('input', data.id)
      })
    },
  },
}
</script>

<style scoped></style>
