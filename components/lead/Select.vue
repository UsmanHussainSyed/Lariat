<template>
  <client-only>
    <div :class="[!disable_form_class && 'form-group', required && 'required']">
      <label v-if="label" class="control-label">{{ label }}</label>
      <select v-select2 :value="val" :readonly="readonly" class="select">
        <option :value="null">{{ placeholder }}</option>
        <option v-for="(i, j) in items" :key="j" :value="i[item_value] || i">
          {{ i[item_text] || i }}
        </option>
      </select>
      <div v-if="v.$error" class="input-error">
        <div v-if="v.required === false">Field is required</div>
      </div>
    </div>
  </client-only>
</template>
<script>
/* eslint-env jquery */
/* eslint-disable vue/prop-name-casing */
export default {
  directives: {
    select2: {
      inserted(el, binding, vnode) {
        $(el).select2({
          minimumResultsForSearch: 1,
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
      unbind(el) {
        $(el).select2('destroy')
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
    placeholder: {
      type: String,
      default: 'Select',
    },
    disable_form_class: {
      type: Boolean,
      default: false,
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
      // immediate: true,
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
    disabled: {
      handler() {
        this.handleDisabled()
      },
      immediate: true,
    },
  },
  mounted() {
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
          if (this.return_object)
            this.$emit(
              'input',
              this.items.find(
                (i) => i[this.item_value].toString() === this.val.toString()
              )
            )
          else this.$emit('input', this.val)
        } else {
          this.val = this.value
            ? this.return_object
              ? this.value[this.item_value]
              : this.value
            : null

          $(this.$el).find('.select').val(this.val).trigger('change')
        }
      }
    },
    handleDisabled() {
      this.$nextTick().then(() => {
        $(this.$el).find('.select').prop('disabled', this.disabled)
      })
    },
  },
}
</script>
