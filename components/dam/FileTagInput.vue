<template>
  <div
    class="tag-input dam-tag-box"
    :class="{
      'no-remove': imutable || disabled || data_disabled,
      'border-0': imutable || disabled || data_disabled,
    }"
  >
    <input
      data-role="tagsinput"
      :placeholder="placeholder"
      :disabled="disabled || data_disabled"
      hidden
    />
  </div>
</template>

<script>
/* eslint-disable camelcase */
const confirmKeys = [9, 13, 44, 188]

export default {
  props: {
    nameId: { type: String },
    value: { type: Array, default: () => [] },
    imutable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    fileIds: { type: Array, required: true },
    clickEvent: { type: Boolean, default: false },
    placeholder: { type: String, default: 'Click here to add tags' },
  },
  data() {
    return {
      doneInit: false,
      data_disabled: false,
    }
  },
  computed: {
    tagManagementAllowed() {
      return !!this.$auth.user.subscription_features?.tag_management?.enable
    },
  },
  watch: {
    value(value) {
      if (!this.doneInit) return

      const newValues = value.map(({ tag_name }) => tag_name)
      let has = this.getTags().map(({ tag_name }) => tag_name)
      const toAdd = newValues.filter((e) => !has.includes(e))
      toAdd.forEach((tag) => this.addTag({ tag_name: tag, id: tag }))
      has = this.getTags().map(({ tag_name }) => tag_name)

      const toRemove = has.filter((e) => !newValues.includes(e))
      toRemove.forEach((tag) => this.removeTag({ tag_name: tag, id: tag }))
    },
    disabled(a) {
      window
        .$(this.$el)
        .find('.bootstrap-tagsinput > input')
        .attr('disabled', a)
    },
    data_disabled(a) {
      window
        .$(this.$el)
        .find('.bootstrap-tagsinput > input')
        .attr('disabled', a)
    },
  },
  mounted() {
    this.$this = window.$(this.$el)
    this.$input = this.$this.find('[data-role="tagsinput"]')

    this.init()
    this.data_disabled = !this.tagManagementAllowed
  },
  methods: {
    getTags() {
      return this.$input.tagsinput('items') || []
    },
    addTag(tag) {
      if (this.tagManagementAllowed && !this.disabled && !this.data_disabled) {
        this.$input.tagsinput(
          'add',
          { ...tag, preventPost: true },
          { preventPost: true }
        )
      }
    },
    removeTag(tag) {
      if (this.tagManagementAllowed && !this.disabled && !this.data_disabled) {
        this.$input.tagsinput(
          'remove',
          { ...tag, preventRemove: true },
          { preventRemove: true }
        )
      }
    },
    init() {
      const vue = this

      const $this = vue.$this
      const $input = vue.$input

      $input.tagsinput({
        freeInput: true,
        trimValue: true,
        tagClass:
          this.nameId === 'commonTagsSelectionBar'
            ? 'added-tag bulkAssetsCloseIcon'
            : 'added-tag tagCloseIcon',
        itemValue: 'id',
        itemText: (item) => {
          return decodeURI(item.tag_name)
        },
      })

      const $tagInput = $this.find('.bootstrap-tagsinput > input')
      $tagInput.attr('disabled', vue.disabled || vue.data_disabled)

      if (vue.doneInit) return

      $tagInput.on('keydown', async (e) => {
        if (confirmKeys.includes(e.keyCode)) {
          e.preventDefault()

          const input = ($tagInput.val() || '').trim()
          if (!input) return

          const index = vue.value.findIndex(
            ({ tag_name }) => tag_name === input
          )

          if (~index) {
            const tagEL = $this.find('.tag.added-tag')[index]

            window.$(tagEL).hide().fadeIn()

            $tagInput[0].value = ''
            return
          }
          let tagResponse = {}
          if (
            this.tagManagementAllowed &&
            !this.disabled &&
            !this.data_disabled
          ) {
            await vue.$axios
              .$post('digital-assets/add-tag-to-multiple-file', {
                workspace_id: vue.$getWorkspaceId(),
                digital_assets_ids: vue.fileIds,
                tag_name: input,
              })
              .then(({ data = [] }) => {
                tagResponse = data[0]
                this.$emit('versionTagsUpdated', tagResponse)
              })
              .catch()

            $input.tagsinput('add', {
              tag_name: encodeURI(tagResponse.tag_name),
              id: tagResponse.id,
            })

            $tagInput[0].value = ''
          }
        }
      })

      vue.value.forEach((v) => {
        v.tag_name = encodeURI(v.tag_name)
        vue.$input.tagsinput(
          'add',
          { ...v, preventPost: true },
          { preventPost: true }
        )
      })

      $input
        .on('beforeItemRemove', (event) => {
          const { item, options } = event

          if (options?.preventRemove) return
          if (
            this.tagManagementAllowed &&
            !this.disabled &&
            !this.data_disabled
          ) {
            vue.$axios
              .$post('digital-assets/delete-tag-from-multiple-file', {
                workspace_id: vue.$getWorkspaceId(),
                digital_assets_ids: vue.fileIds,
                tag_name: decodeURI(item.tag_name) || item,
                tag_id: decodeURI(item.id),
              })
              .catch()

            vue.$emit('removedTag', item)
          }
        })
        .on('itemAdded', ({ item }) => {
          vue.$emit('addedTag', item)
        })

      $this.find('.tag.label.label-info').click(function (ev) {
        ev.tagItemText = window.$(vue).text()

        vue.$emit('click:item', ev)
      })

      vue.doneInit = true
    },
  },
}
</script>

<style>
.dam-tag-box.no-remove [data-role='remove'],
.dam-tag-box.no-remove.tag-input input {
  display: none !important;
}

.dam-tag-box.no-remove .tag.added-tag {
  padding-right: 12px !important;
}
.bulkAssetsCloseIcon.added-tag span {
  background: url('~@/assets/img/icon/close-white.svg');
}
.tagCloseIcon.added-tag span {
  background: url('~@/assets/img/gray-close.svg');
}
.added-tag span {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  top: 50% !important;
  right: 8px;
  transform: translateY(-50%) !important;
  height: 12px;
  width: 12px !important;
}
.tag-input input {
  outline: none !important;
  border: none;
  height: 34px;
  min-width: 0;
  padding: 0 10px;
  border-radius: 4px;
  width: auto !important;
  min-width: min-content;
  margin: 4px 0;
}
</style>
