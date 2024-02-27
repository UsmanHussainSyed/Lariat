<template>
  <ContentLoader :speed="1" :animate="true" :width="600" :height="700">
    <rect x="140" y="78" rx="0" ry="0" width="411" height="200" />
    <rect x="140" y="293" rx="0" ry="0" width="411" height="200" />
    <rect x="74" y="3" rx="0" ry="0" width="69" height="66" />
    <rect x="101" y="73" rx="0" ry="0" width="11" height="422" />
    <rect x="109" y="184" rx="0" ry="0" width="42" height="3" />
    <rect x="109" y="389" rx="0" ry="0" width="55" height="4" />
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
