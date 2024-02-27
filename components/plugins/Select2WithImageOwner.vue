<template>
  <select :class="classObj">
    <slot></slot>
  </select>
</template>

<script>
/* eslint-disable vue/require-default-prop */

let placeholder = ''

function customTemplate(obj) {
  const text = obj.text === '' || obj.text === null ? obj.email : obj.text

  if (obj.loading) return window.$('<p>Searching...</p>')

  if (obj.id === 0) return window.$(`<img src="${placeholder}"><p>${text}</p>`)

  const image = obj.profile_image
  if (image)
    return window.$(`<img src="${obj.display_profile_image}"><p>${text}</p>`)

  return window.$(
    `<span class="fl-as-imgtxt text-uppercase ${text
      .charAt(0)
      .toLowerCase()}">${text.charAt(0)}</span><p>${text}</p>`
  )
}

export default {
  name: 'Select2WithImageOwner',
  props: {
    options: { type: [Array, Object, String, Boolean], default: () => [] },
    value: [Number, String],
    placeholder: String,
    customEvent: Boolean,
    containerCssClass: String,
    dropdownCssClass: String,
    disabled: { type: Boolean, default: false },
    classObj: { type: Object, default: null },
    workspaceid: [Number, String],
    projectid: [Number, String],
    bucketid: [Number, String],
    projecttype: String,
    customBucketOwnerEvent: Boolean,
  },
  data() {
    return {
      loaded: false,
      users: [...this.options],
      term: '',
    }
  },
  watch: {
    value(value) {
      const user = this.users.find(
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
          containerCssClass: this.containerCssClass,
          dropdownCssClass: this.dropdownCssClass,

          dropdownCss: '',
          adaptContainerCssClass: '',
          adaptDropdownCssClass: '',
          templateSelection: customTemplate,
          templateResult: customTemplate,
          async query(query) {
            vue.term = query.term
            const term = vue.term

            if (vue.loaded) {
              let results = vue.users

              if (term) {
                try {
                  const regex = new RegExp(term, 'ig')
                  results = results.filter(
                    ({ text, id, email }) =>
                      regex.test(text) || regex.test(email)
                  )
                } catch {}
              }

              return query.callback({ results })
            }

            if (vue.customBucketOwnerEvent) {
              try {
                const { data } = await vue.$axios.$post(
                  `project/bucket/owner-list`,
                  {
                    workspace_id: vue.workspaceid,
                    bucket_id: vue.bucketid,
                  }
                )
                vue.loaded = true
                const bucketUserList = []
                // eslint-disable-next-line array-callback-return
                data.map((users, index) => {
                  if (users.role !== 'Client') {
                    bucketUserList.push(users)
                  }
                })
                vue.users = bucketUserList
                query.callback({ results: bucketUserList })
              } catch (e) {}
            } else {
              try {
                const { data } = await vue.$axios.$post(
                  `project/get-project-user-list`,
                  {
                    workspace_id: vue.workspaceid,
                    project_id: vue.projectid,
                  }
                )
                vue.loaded = true

                let userList = []
                if (vue.projecttype === 'project') {
                  // eslint-disable-next-line array-callback-return
                  data.project_users.map((users, index) => {
                    if (users.role !== 'Client') {
                      userList.push(users)
                    }
                  })
                } else {
                  userList = data.project_users
                }
                vue.users = userList
                query.callback({ results: userList })
              } catch (e) {}
            }
          },
        })
        .val(value)
        .trigger('change')
    },

    disabled(newVal) {
      window.$(this.$el).prop('disabled', newVal)
    },
  },
  mounted() {
    const vue = this
    placeholder = this.$config.userPlaceHolderImg
    const user = this.users.find(
      (option) => parseInt(option.id) === parseInt(this.value)
    )
    let value = this.value

    if (!user) {
      value = 0
    }

    window
      .$(this.$el)
      .select2({
        data: this.users,
        placeholder: this.placeholder,
        // allowClear: true,
        containerCssClass: this.containerCssClass,
        dropdownCssClass: this.dropdownCssClass,

        dropdownCss: '',
        adaptContainerCssClass: '',
        adaptDropdownCssClass: '',
        templateSelection: customTemplate,
        templateResult: customTemplate,
        async query(query) {
          vue.term = query.term
          const term = vue.term

          if (vue.loaded) {
            let results = vue.users

            if (term) {
              try {
                const regex = new RegExp(term, 'ig')
                results = results.filter(
                  ({ text, id, email }) => regex.test(text) || regex.test(email)
                )
              } catch {}
            }

            return query.callback({ results })
          }

          if (vue.customBucketOwnerEvent) {
            try {
              const { data } = await vue.$axios.$post(
                `project/bucket/owner-list`,
                {
                  workspace_id: vue.workspaceid,
                  bucket_id: vue.bucketid,
                }
              )
              vue.loaded = true
              const bucketUserList = []
              // eslint-disable-next-line array-callback-return
              data.map((users, index) => {
                if (users.role !== 'Client') {
                  bucketUserList.push(users)
                }
              })
              vue.users = bucketUserList
              query.callback({ results: bucketUserList })
            } catch (e) {}
          } else {
            try {
              const { data } = await vue.$axios.$post(
                `project/get-project-user-list`,
                {
                  workspace_id: vue.workspaceid,
                  project_id: vue.projectid,
                }
              )
              vue.loaded = true

              let userList = []
              if (vue.projecttype === 'project') {
                // eslint-disable-next-line array-callback-return
                data.project_users.map((users, index) => {
                  if (users.role !== 'Client') {
                    userList.push(users)
                  }
                })
              } else {
                userList = data.project_users
              }
              vue.users = userList
              query.callback({ results: userList })
            } catch (e) {}
          }
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
