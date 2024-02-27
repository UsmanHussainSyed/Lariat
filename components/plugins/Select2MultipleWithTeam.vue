<template>
  <select multiple="multiple">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable vue/require-default-prop */

function customTemplate(obj) {
  const image = obj.display_group_icon
  const text = obj.text
  const color = obj.group_color
  const bcolor = obj.group_color

  if (image && text && color) {
    const template = window.$(
      "<div class='bgcolor' style='background-color:" +
        hexToRgbABgc(color) +
        ';border:1px solid ' +
        hexToRgbABc(bcolor) +
        '\'><img src="' +
        image +
        '"><p>' +
        text +
        '</p></div>'
    )
    return template
  } else if (text && color) {
    const template = window.$(
      "<div class='bgcolor' style='background-color:" +
        hexToRgbABgc(color) +
        ';border:1px solid ' +
        hexToRgbABc(bcolor) +
        "'><span class='fl-as-imgtxt text-uppercase " +
        text.charAt(0).toLowerCase() +
        "'>" +
        text.charAt(0) +
        '</span><p>' +
        text +
        '</p></div>'
    )
    return template
  }
}
function hexToRgbABgc(hex) {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.2)'
    )
  }
  throw new Error('Bad Hex')
}
function hexToRgbABc(hex) {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.5)'
    )
  }
  throw new Error('Bad Hex')
}
export default {
  name: 'Select2Multiple',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String, Array],
    placeholder: String,
    customEvent: Boolean,
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
        containerCssClass: this.containerCssClass,
        dropdownCssClass: this.dropdownCssClass,
        templateSelection: customTemplate,
        templateResult: customTemplate,
      })
      .val(this.value)
      .trigger('change')

    initSelect2.on('select2:select select2:unselect', (e) => {
      const data = e.params.data
      let deletedGroupId = ''
      if (!data.selected) {
        deletedGroupId = e.params.data.id
      }
      if (this.customEvent) {
        this.$emit('changeTeamFollower', {
          selectedGroupId: initSelect2.val(),
          deletedGroupId,
          groupData: data,
        })
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
