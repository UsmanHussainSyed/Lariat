<template>
  <select>
    <slot></slot>
  </select>
</template>
<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'ClientSelect2',
  props: {
    options: [Array, Object, String],
    value: [Number, String],
    placeholder: String,
    customEvent: Boolean,
    customBucketEvent: Boolean,
    customTaskEvent: Boolean,
    customVariant: Boolean,
    customFieldEvent: Boolean,
    customSubClient: Boolean,
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
    const vue = this
    const initSelect2 = window
      .$(this.$el)
      .select2({
        data: this.options,
        tags: true,
        placeholder: this.placeholder,
        insertTag(data, tag) {
          const orgValue = tag.text
          const orgValueData = vue.$getMarkedText(orgValue, orgValue, 'b')
          if (vue.customBucketEvent) {
            /* if (orgValue.trim().length < '4' || orgValue.trim().length > '10') {
              return
            } */
            tag.text = `Add Bucket Name &nbsp;${orgValueData}`
          } else if (vue.customTaskEvent) {
            tag.text = `Add new task &nbsp;${orgValueData}`
          } else if (vue.customVariant) {
            tag.text = `Add new Variant &nbsp;${orgValueData}`
          } else if (vue.customFieldEvent) {
            tag.text = `New Field &nbsp;${orgValueData}`
          } else if (vue.customSubClient) {
            tag.text = `Add new Sub Client &nbsp;${orgValueData}`
          } else {
            tag.text = `Add new client &nbsp;${orgValueData}`
          }

          if (vue.customFieldEvent) {
            tag.id = `${orgValue}`
          } else {
            tag.id = `~@@##@@~${orgValue}`
          }

          tag.newTag = true
          tag.orgTag = orgValue
          data.push(tag)
        },
        escapeMarkup(markup) {
          return markup
        },
      })
      .val(this.value)
      .trigger('change')

    initSelect2.on('select2:select', (e) => {
      const data = e.params.data
      // data.text = data.text.replace("Add new client &nbsp;", "");
      if (this.customEvent) {
        this.$emit('changeSelect2', data)
      }
      this.$emit('input', data.id)
    })
  },
  updated() {
    const vue = this
    const initSelect2 = window
      .$(this.$el)
      .select2({
        data: this.options,
        tags: true,
        placeholder: this.placeholder,
        insertTag(data, tag) {
          const orgValue = tag.text
          const orgValueData = vue.$getMarkedText(orgValue, orgValue, 'b')
          if (vue.customBucketEvent) {
            /* if (orgValue.trim().length < '4' || orgValue.trim().length > '10') {
              return
            } */
            tag.text = `Add Bucket Name &nbsp;${orgValueData}`
          } else if (vue.customTaskEvent) {
            tag.text = `Add new task &nbsp;${orgValueData}`
          } else if (vue.customFieldEvent) {
            tag.text = `New Field &nbsp;${orgValueData}`
          } else if (vue.customSubClient) {
            tag.text = `Add new Sub Client &nbsp;${orgValueData}`
          } else {
            tag.text = `Add new client &nbsp;${orgValueData}`
          }
          if (vue.customFieldEvent) {
            tag.id = `${orgValue}`
          } else {
            tag.id = `~@@##@@~${orgValue}`
          }

          tag.newTag = true
          tag.orgTag = orgValue
          data.push(tag)
        },
        escapeMarkup(markup) {
          return markup
        },
      })
      .val(this.value)
      .trigger('change')

    initSelect2.on('select2:select', (e) => {
      const data = e.params.data
      // data.text = data.text.replace("Add new client &nbsp;", "");
      if (this.customEvent) {
        this.$emit('changeSelect2', data)
      }
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
