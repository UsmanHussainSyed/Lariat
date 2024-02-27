<template>
  <select class="multiple-assignee-select" multiple="multiple">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable vue/require-default-prop */
function templateResult(forSelection, obj, container) {
  if (this.lockBy === parseInt(obj.id)) {
    // Add custom attributes to the <option> tag for the selected option
    // window.$(obj.element).attr('locked', 'locked')
    window.$(container).addClass('locked-tag')
    obj.locked = true
  }
  if (this.$auth.user.id === parseInt(obj.id)) {
    // Add custom attributes to the <option> tag for the selected option
    // window.$(obj.element).attr('locked', 'locked')
    window.$(container).addClass('locked-tag')
    obj.locked = true
  }
  const image = obj.display_profile_image
  let text = forSelection ? obj.text.replace('Invite ', '') : obj.text

  const initial = text.charAt(0)
  if (!forSelection) {
    text = this.$getMarkedText(text, this.term, 'b')

    if (obj.invite) return window.$('<p>').html(text)
  }

  if (!image)
    return window.$(
      `<span class="fl-as-imgtxt text-uppercase ${initial.toLowerCase()}">${initial}</span><p>${text}</p>`
    )

  return window.$(`<img src="${image}"><p>${text}</p>`)
}

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export default {
  name: 'Select2MultipleWithInvite',
  props: {
    options: [Array, Object, String, Boolean],
    value: [Number, String, Array],
    placeholder: String,
    customEvent: Boolean,
    containerCssClass: String,
    lockBy: Number,
    dropdownCssClass: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      term: '',
    }
  },
  watch: {
    value(value) {
      window.$(this.$el).val(value).trigger('change')
    },
    options(options) {
      window.$(this.$el).off().select2('destroy')
      this.init()
    },
    disabled(newVal) {
      window.$(this.$el).prop('disabled', newVal)
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
  methods: {
    init() {
      const vue = this
      window
        .$(this.$el)
        .select2({
          multiple: true,
          data: this.options,
          placeholder: this.placeholder,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          templateSelection: templateResult.bind(this, true),
          templateResult: templateResult.bind(this, false),

          query(query) {
            const data = { results: [] }
            vue.term = query.term
            const term = vue.term && vue.term.toLocaleUpperCase()
            const options = [...vue.options]

            if (term) {
              let results
              try {
                const regex = new RegExp(term, 'ig')
                results = options.filter(
                  ({ text, id, email }) => regex.test(text) || regex.test(email)
                )
              } catch (error) {
                results = options
              } finally {
                data.results = results
              }

              if (!data.results.length && emailRegex.test(query.term)) {
                const exists = vue.options.find(
                  ({ email }) => term === email.toLocaleUpperCase()
                )

                if (!exists)
                  data.results.push({
                    id: query.term,
                    text: `Invite ${query.term}`,
                    invite: true,
                  })
              }
            } else {
              data.results = options
            }
            query.callback(data)
          },
        })
        .on('select2:select select2:unselect', function (e) {
          if (vue.customEvent) {
            vue.$emit('changeFollower', window.$(this).val())
          }
        })
        .prop('disabled', this.disabled)
        .val(this.value)
        .trigger('change')
    },
  },
}
</script>

<style scoped></style>
