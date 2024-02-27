<template>
  <div class="tag-input" :class="{ 'no-remove': imutable || disabled }">
    <input
      data-role="tagsinput"
      :placeholder="value.length ? '' : placeholder"
      :disabled="disabled"
      hidden
      data-lpignore="true"
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
const confirmKeys = [9, 13, 44, 188]

export default {
  props: {
    value: { type: Array, default: () => [] },
    imutable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    clickEvent: { type: Boolean, default: false },
    placeholder: { type: String, default: 'Click here to add tags' },
  },
  data() {
    return {
      doneInit: false,
    }
  },
  watch: {
    disabled(a) {
      window
        .$(this.$el)
        .find('.bootstrap-tagsinput > input')
        .attr('disabled', a)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      const $this = window.$(this.$el)
      const $input = $this.find('[data-role="tagsinput"]')
      const vue = this

      $input.tagsinput({
        freeInput: true,
        tagClass: 'added-tag',
        itemValue: 'id',
        itemText: 'tag_name',
      })

      this.value.forEach((v) =>
        $input.tagsinput('add', v, { preventEmit: true })
      )

      const $tagInput = $this.find('.bootstrap-tagsinput > input')

      $tagInput.attr('disabled', this.disabled)
      $tagInput.on('keydown', (e) => {
        if (confirmKeys.includes(e.keyCode)) {
          e.preventDefault()

          const input = ($tagInput.val() || '').trim()
          if (!input) return

          const index = this.value.findIndex(
            ({ tag_name }) => tag_name.toUpperCase() === input.toUpperCase()
          )

          if (~index) {
            const tagEL = $this.find('.tag.label.label-info')[index]

            window.$(tagEL).hide().fadeIn()

            $tagInput[0].value = ''
            return
          }

          $input.tagsinput('add', {
            tag_name: input,
            id: 'new-' + Math.floor(Math.random() * 1000),
          })

          $tagInput[0].value = ''
        }
      })

      const changed = () =>
        this.$nextTick(() => {
          const tags = $input.tagsinput('items')
          this.$emit('input', tags)

          if (tags.length > 0) $tagInput.attr('placeholder', '')
          else $tagInput.attr('placeholder', this.placeholder)
        })

      $input
        .on('beforeItemRemove', (event) => {
          const { item, options } = event
          if (options && options.preventEmit) return

          const itemToRemove = this.value.find(
            ({ tag_name }) =>
              tag_name.toUpperCase() === item.tag_name.toUpperCase()
          )

          if (!itemToRemove) {
            event.cancel = true
            return
          }

          changed()

          this.$emit('click:removeTag', itemToRemove)
        })
        .on('itemAdded', ({ item, options }) => {
          if (options && options.preventEmit) return
          changed()

          this.$emit('click:addTag', item)
        })

      $this.find('.tag.label.label-info').click(function (ev) {
        ev.tagItemText = window.$(this).text()

        vue.$emit('click:item', ev)
      })

      this.doneInit = true
    },
  },
}
</script>

<style>
.no-remove [data-role='remove'] {
  display: none !important;
}

.added-tag span {
  background: url('~@/assets/img/gray-close.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  height: 12px;
  width: 12px;
}
.tag-input input {
  outline: none !important;
  border: none;
  height: 30px;
  min-width: 0;
  padding: 0 10px;
  border-radius: 4px;
  width: auto !important;
  min-width: 160px;
  margin: 7px 0;
}
</style>
