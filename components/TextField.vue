<template>
  <div class="form-group" :class="{ required: required }">
    <label v-if="label" class="control-label">{{ label }}</label>
    <textarea
      v-if="textarea"
      v-model="val"
      :type="type"
      :rows="rows"
      :cols="cols"
      class="form-control"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <input
      v-else
      v-model="val"
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @keyup="$emit('keyup', $event.target.value)"
    />
    <div v-if="v.$error" class="input-error">
      <div v-if="v.required === false">
        {{ placeholder ? placeholder : 'Field' }} is required
      </div>
      <div v-if="v.email === false">Please provide valid email</div>
      <div v-if="v.integer === false">Only integer values are allowed</div>
      <div v-if="v.numeric === false">Only numbers are allowed</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
    },
    cols: {
      type: Number,
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
      val: this.value,
    }
  },
  watch: {
    value() {
      this.val = this.value
    },
  },
  methods: {},
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
