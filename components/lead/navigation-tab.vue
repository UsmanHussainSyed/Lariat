<template>
  <ul class="general-settings-tab">
    <li
      v-for="(r, i) in activeRoutes"
      :key="i"
      :class="r.matchRoutes.includes($route.name) ? 'active' : ''"
    >
      <nuxt-link
        :to="{
          name: r.route,
        }"
      >
        {{ r.name }}
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'NavigationTab',
  props: {
    activeRoutes: {
      type: Array,
      required: true,
    },
  },
}
</script>
