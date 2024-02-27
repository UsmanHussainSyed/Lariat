<template>
  <div
    class="tag-add-box"
    style="cursor: text"
    @click="$nextTick(() => $refs.taginput.focus())"
  >
    <span v-for="(tag, index) in tags" :key="index" class="added-tag"
      >{{ tag }}
      <span
        ><svg
          id="Layer_1"
          class="close-icon h-red"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
          @click="removeTag(index)"
        >
          <g id="Group_4358" transform="translate(-69.745 -317.549)">
            <path
              id="Path_3424"
              class="fill-color"
              d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
            ></path>
            <path
              id="Path_3425"
              class="fill-color"
              d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
            ></path>
          </g></svg></span
    ></span>

    <input
      ref="taginput"
      type="text"
      name="tag"
      :placeholder="inputTitle"
      @keydown="addTag"
      @keydown.delete="removeBackHandler"
    />
  </div>
</template>

<script>
const possibleKeyCombinations = ['Comma', 'Enter', 'Tab']
export default {
  props: {
    inputTitle: {
      type: String,
      default: 'Add your tags here',
    },
    tags: {
      type: Array,
      required: true,
    },
    isProductTag: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addTag(event) {
      if (possibleKeyCombinations.includes(event.code)) {
        event.preventDefault()
        const value = event.target.value
        if (value !== '' && /\S/.test(value)) {
          // getting the index if there is already a matching tag
          const index = this.tags.findIndex((e) => e === value)
          if (~index) {
            // selecting the tag using the index
            const tag = window.$('.added-tag')[index]
            // performing fadein blink effect to highlight tag is already there
            window.$(tag).hide().fadeIn()
            event.target.value = ''
            return
          }
          if (this.isProductTag) {
            this.checkAliasExist(event.target.value, event)
          } else {
            this.addTagIfNotFound(event)
          }
        }
      }
    },
    addTagIfNotFound(event) {
      const data = []
      data.push(...this.tags, event.target.value.trim())
      this.$emit('update:tags', data)
      event.target.value = ''
    },
    removeTag(index) {
      const data = this.tags
      data.splice(index, 1)
      this.$emit('update:tags', data)
    },
    removeBackHandler(evt) {
      if (evt.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    },
    async checkAliasExist(alias, event) {
      try {
        const {
          data: { is_exist },
        } = await this.$axios.$post('lm/product/alias-exist', {
          alias,
          workspace_id: this.$getWorkspaceId(),
        })
        if (!is_exist) {
          this.addTagIfNotFound(event)
        } else {
          event.target.value = ''
          this.$toast.error('Alias already exist')
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
