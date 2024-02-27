<template>
  <div>
    <label v-if="label" class="form-control"
      >{{ label }}<font v-if="required" color="#FF732E">*</font></label
    >
    <select v-select2 :value="val" class="select">
      <option
        :data-img="i[item_image]"
        v-for="(i, j) in items"
        :key="j"
        :value="i[item_value] || i"
      >
        {{ i[item_text] || i }}
      </option>
    </select>
    <div v-if="v.$error" class="input-error">
      <div v-if="v.required === false">Field is required</div>
    </div>
  </div>
</template>
<script>
/* eslint-env jquery */
export default {
  directives: {
    select2: {
      inserted(el, binding, vnode) {
        function customTemplate(obj) {
          const placeholder = ''
          const image = $(obj.element).data('img')
          const text = obj.text

          if (obj.id !== 0) {
            if (!image) {
              const template = window.$(
                `<span class="fl-as-imgtxt test text-uppercase ${text
                  .trim()
                  .charAt(0)
                  .toLowerCase()}">${text
                  .trim()
                  .charAt(0)}</span><p>${text}</p>`
              )

              return template
            }
            const imgSrc = image
            const template = window.$(
              '<img src="' + imgSrc + '"><p>' + text + '</p>'
            )
            return template
          } else {
            const template = window.$(
              '<img src="' + placeholder + '"><p>' + text + '</p>'
            )
            return template
          }
        }
        $(el).select2({
          minimumResultsForSearch: 1,
          templateSelection: customTemplate,
          templateResult: customTemplate,
          dropdownCssClass: 'assignee-select',
        })
        $(el).on('change', function (e) {
          if (vnode.context.return_object) {
            vnode.context.$emit(
              'input',
              vnode.context.items.find(
                (i) => i[vnode.context.item_value].toString() === e.target.value
              )
            )
            vnode.context.$emit(
              'change',
              vnode.context.items.find(
                (i) => i[vnode.context.item_value].toString() === e.target.value
              )
            )
          } else {
            vnode.context.$emit('change', e.target.value)
            vnode.context.$emit('input', e.target.value)
          }
        })
      },
    },
  },
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      // type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    item_text: {
      type: String,
      default: 'text',
    },
    item_value: {
      type: String,
      default: 'value',
    },
    item_image: {
      type: String,
      default: 'image',
    },
    return_object: {
      type: Boolean,
      default: false,
    },
    select_first: {
      type: Boolean,
      default: true,
    },
    v: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      val: '',
    }
  },
  watch: {
    items: {
      handler() {
        this.init()
      },
      immediate: true,
    },
    value(v, o) {
      $(this.$el)
        .find('.select')
        .val(
          this.value
            ? this.return_object
              ? this.value[this.item_value]
              : this.value
            : null
        )
      if (v !== o) {
        $(this.$el).find('.select').trigger('change')
      }
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.items.length) {
        if (this.select_first) {
          this.val = this.value
            ? this.return_object
              ? this.value[this.item_value]
              : this.value
            : this.items[0][this.item_value] || this.items[0]
        } else {
          this.val = this.value ? this.value : null
        }
      }
      if (this.return_object)
        this.$emit(
          'input',
          this.items.find(
            (i) => i[this.item_value].toString() === this.val.toString()
          )
        )
      else this.$emit('input', this.val)
    },
  },
}
</script>
