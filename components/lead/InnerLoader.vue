<template>
  <div class="innerLoader h-100" :class="[bgWhite && 'white big w-100']">
    <RefreshIcon />
    Loading...
  </div>
</template>
<script>
import RefreshIcon from './Icons/RefreshIcon.vue'
export default {
  components: {
    RefreshIcon,
  },
  props: {
    bgWhite: {
      default: true,
      type: Boolean,
    },
  },
}
</script>
