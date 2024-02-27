<template>
  <i v-tooltip="msg" class="fa fa-info-circle" aria-hidden="true" title=""></i>
</template>
<script>
export default {
  name: 'InfoIcon',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
}
</script>
