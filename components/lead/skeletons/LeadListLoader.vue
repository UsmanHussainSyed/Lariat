<template>
  <ContentLoader :speed="1" :animate="true" :width="400" :height="100">
    <rect x="0" y="0" rx="0" ry="0" width="400" height="13" />
    <rect x="0" y="15" rx="0" ry="0" width="400" height="13" />
    <rect x="0" y="31" rx="0" ry="0" width="400" height="13" />
    <rect x="0" y="47" rx="0" ry="0" width="400" height="13" />
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
