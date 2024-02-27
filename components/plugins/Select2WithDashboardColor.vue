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
  if (state.loading) return window.$('<p>Searching...</p>')
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
    projectId: [Number, String],
    taskStatusType: String,
  },
  data() {
    return {
      loaded: false,
      status: [...this.options],
      term: '',
    }
  },
  watch: {
    value(value) {
      const user = this.status.find(
        (option) => parseInt(option.id) === parseInt(this.value)
      )
      if (!user) {
        value = 0
      }

      window.$(this.$el).val(value).trigger('change')
    },
    options(options) {
      const value = this.value
      const vue = this
      window
        .$(this.$el)
        .empty()
        .select2({
          data: options,
          placeholder: this.placeholder,
          // allowClear: true,
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,
          dropdownCss: '',
          adaptContainerCssClass: '',
          adaptDropdownCssClass: '',
          templateSelection: customTemplate,
          templateResult: formatState,
          async query(query) {
            vue.term = query.term
            const term = vue.term

            if (vue.loaded) {
              let results = vue.status

              if (term) {
                try {
                  const regex = new RegExp(term, 'ig')
                  results = results.filter(({ text, id }) => regex.test(text))
                } catch {}
              }

              return query.callback({ results })
            }

            try {
              const { data } = await vue.$axios.$get(
                `/project/project-status-severity?project_id=${vue.projectId}`
              )
              vue.loaded = true

              let statusList = []
              if (vue.taskStatusType === 'taskStatus') {
                statusList = data.allStatus
              } else {
                statusList = data.allSeverity
              }
              vue.status = statusList
              query.callback({ results: statusList })
            } catch (e) {}
          },
        })
        .val(value)
        .trigger('change')
    },
    disabled(disabled) {
      window.$(this.$el).prop('disabled', disabled)
    },
  },
  mounted() {
    const vue = this

    const user = this.status.find(
      (option) => parseInt(option.id) === parseInt(this.value)
    )
    let value = this.value

    if (!user) {
      value = 0
    }
    window
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
        templateResult: formatState,
        async query(query) {
          vue.term = query.term
          const term = vue.term

          if (vue.loaded) {
            let results = vue.status

            if (term) {
              try {
                const regex = new RegExp(term, 'ig')
                results = results.filter(({ text, id }) => regex.test(text))
              } catch {}
            }

            return query.callback({ results })
          }

          try {
            const { data } = await vue.$axios.$get(
              `/project/project-status-severity?project_id=${vue.projectId}`
            )
            vue.loaded = true

            let statusList = []
            if (vue.taskStatusType === 'taskStatus') {
              statusList = data.allStatus
            } else {
              statusList = data.allSeverity
            }
            vue.status = statusList
            query.callback({ results: statusList })
          } catch (e) {}
        },
      })
      .val(value)
      .trigger('change')
      .on('select2:select select2:unselect', (e) => {
        const data = e.params.data
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
