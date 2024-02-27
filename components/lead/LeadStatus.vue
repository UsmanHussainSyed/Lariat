<template>
  <div class="status-dropdown" :class="{ 'no-border': !border }">
    <label v-if="label"
      >{{ label }}<font v-if="required" color="#FF732E">*</font></label
    >
    <select v-select2 :value="val" class="status-select" :disabled="disabled">
      <!-- <option data-color="silver" :value="null">Select</option> -->
      <option
        :data-color="i.status_color"
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
          const color = $(obj.element).data('color')
          const text = obj.text

          if (color)
            return window.$(
              `<span class="bg" style="background-color: ${color}"><p>${text}</p></span>`
            )

          return window.$('<p>').text(text)
        }
        function formatState(obj) {
          const color = $(obj.element).data('color')
          const text = obj.text
          const $state = $(
            '<span style="background:' + color + '">' + text + '</span>'
          )
          return $state
        }
        $(el).select2({
          minimumResultsForSearch: 1,
          templateSelection: customTemplate,
          templateResult: formatState,
          dropdownCssClass: 'status-select',
        })
        $(el).on('change', function (e) {
          if (vnode.context.return_object)
            vnode.context.$emit(
              'input',
              vnode.context.items.find(
                (i) => i[vnode.context.item_value].toString() === e.target.value
              )
            )
          else vnode.context.$emit('input', e.target.value)
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
    disabled: {
      type: Boolean,
      default: false,
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
    border: {
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
        .trigger('change')
      if (v !== o) this.$emit('change', this.value)
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
