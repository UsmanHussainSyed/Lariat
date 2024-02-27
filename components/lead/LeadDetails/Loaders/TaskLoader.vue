<template>
  <ContentLoader :speed="1" :animate="true" :width="600" :height="700">
    <rect x="0" y="21" rx="0" ry="0" width="679" height="18" />
    <rect x="0" y="43" rx="0" ry="0" width="679" height="18" />
    <rect x="0" y="66" rx="0" ry="0" width="679" height="18" />
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
