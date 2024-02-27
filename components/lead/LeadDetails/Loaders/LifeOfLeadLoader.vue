<template>
  <ContentLoader :speed="1" :animate="true" :width="600" :height="700">
    <rect x="135" y="73" rx="0" ry="0" width="411" height="90" />
    <rect x="82" y="-10" rx="0" ry="0" width="48" height="42" />
    <rect x="102" y="28" rx="0" ry="0" width="6" height="350" />
    <rect x="107" y="116" rx="0" ry="0" width="42" height="4" />
    <rect x="135" y="182" rx="0" ry="0" width="411" height="90" />
    <rect x="109" y="225" rx="0" ry="0" width="42" height="4" />
    <rect x="136" y="287" rx="0" ry="0" width="411" height="90" />
    <rect x="110" y="330" rx="0" ry="0" width="42" height="4" />
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
