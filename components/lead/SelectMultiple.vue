<template>
  <div class="form-group" :class="{ required: required }">
    <label v-if="label" class="form-control">{{ label }}</label>
    <select
      ref="select2"
      v-select2
      :value="val"
      :readonly="readonly"
      class="select"
    >
      <option :value="null" disabled>{{ placeholder }}</option>
      <option
        v-for="(i, index) in items"
        :key="index"
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
  name: 'SelectMultiple',
  directives: {
    select2: {
      inserted(el, binding, vnode) {
        $(el).select2({
          multiple: true,
          minimumResultsForSearch: 5,
          placeholder: vnode.context.placeholder,
        })
        $(el).on('change', function (e) {
          if (vnode.context.return_object)
            vnode.context.$emit('change', $(el).select2().val())
          else vnode.context.$emit('change', $(el).select2().val())
        })
      },
    },
  },
  props: {
    placeholder: {
      type: String,
      default: 'Select',
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    value: {
      // type: String,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
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
    value() {
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
    },
  },
}
</script>
