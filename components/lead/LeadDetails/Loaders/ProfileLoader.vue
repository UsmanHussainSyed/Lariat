<template>
  <ContentLoader :speed="1" :animate="true" :width="390" :height="700">
    <rect x="52" y="44" rx="0" ry="0" width="106" height="87" />
    <rect x="174" y="97" rx="0" ry="0" width="167" height="12" />
    <rect x="174" y="115" rx="0" ry="0" width="167" height="12" />
    <circle cx="64" cy="206" r="13" />
    <circle cx="64" cy="255" r="13" />
    <circle cx="64" cy="308" r="13" />
    <circle cx="66" cy="355" r="13" />
    <rect x="97" y="201" rx="0" ry="0" width="144" height="10" />
    <rect x="97" y="251" rx="0" ry="0" width="144" height="10" />
    <rect x="98" y="301" rx="0" ry="0" width="144" height="10" />
    <rect x="97" y="349" rx="0" ry="0" width="144" height="10" />
    <rect x="54" y="442" rx="0" ry="0" width="286" height="109" />
    <rect x="58" y="570" rx="0" ry="0" width="286" height="109" />
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
