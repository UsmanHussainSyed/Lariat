<template>
  <ContentLoader :speed="1" :animate="true" :width="400" :height="700">
    <rect x="0" y="9" rx="0" ry="0" width="402" height="90" />
    <rect x="0" y="108" rx="0" ry="0" width="411" height="200" />
    <rect x="0" y="329" rx="0" ry="0" width="411" height="200" />
  </ContentLoader>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader,
  },
}
</script>
