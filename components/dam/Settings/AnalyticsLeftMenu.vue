<template>
  <div class="general-settings-left analyticsMenu customscrollbar h-100">
    <ul>
      <li v-for="(menu, index) in damAnalyticsSettings" :key="index">
        <nuxt-link
          v-if="menu.name == 'Collection Analytics' && isCollection.length != 0"
          :class="{ active: menu.matchRoutes.includes(currentRouteName) }"
          :to="{
            name: menu.routeName,
            params: { workspace_id: internal_workspace_id },
          }"
          >{{ menu.name }}</nuxt-link
        >
        <nuxt-link
          v-if="menu.name != 'Collection Analytics'"
          :class="{ active: menu.matchRoutes.includes(currentRouteName) }"
          :to="{
            name: menu.routeName,
            params: { workspace_id: internal_workspace_id },
          }"
          >{{ menu.name }}</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import routeParams from '~/mixins/routeParams'

export default {
  mixins: [routeParams],
  data() {
    return {
      internal_workspace_id: this.$route.params.workspace_id
        ? this.$route.params.workspace_id
        : this.$_auth().id,
      damAnalyticsSettings: [
        {
          name: 'DAM Insights',
          routeName: 'workspace_id-dam-damAnalytics-damInsights',
          matchRoutes: ['workspace_id-dam-damAnalytics-damInsights'],
        },
        {
          name: 'Viewed Asset Analytics',
          routeName: 'workspace_id-dam-damAnalytics-viewedAssets',
          matchRoutes: ['workspace_id-dam-damAnalytics-viewedAssets'],
        },
        {
          name: 'Downloaded Asset Analytics',
          routeName: 'workspace_id-dam-damAnalytics-downloadedAssets',
          matchRoutes: ['workspace_id-dam-damAnalytics-downloadedAssets'],
        },
        {
          name: 'Shared Asset Analytics',
          routeName: 'workspace_id-dam-damAnalytics-sharedAssets',
          matchRoutes: ['workspace_id-dam-damAnalytics-sharedAssets'],
        },
        {
          name: 'Assets Analytics',
          routeName: 'workspace_id-dam-damAnalytics-assetsAnalytics',
          matchRoutes: ['workspace_id-dam-damAnalytics-assetsAnalytics'],
        },
        {
          name: 'Search Keyword Analytics',
          routeName: 'workspace_id-dam-damAnalytics-searchAnalytics',
          matchRoutes: ['workspace_id-dam-damAnalytics-searchAnalytics'],
        },
        {
          name: 'Untagged Asset Analytics',
          routeName: 'workspace_id-dam-damAnalytics-untaggedAssets',
          matchRoutes: ['workspace_id-dam-damAnalytics-untaggedAssets'],
        },
        {
          name: 'Collection Analytics',
          routeName: 'workspace_id-dam-damAnalytics-collectionAnalytics',
          matchRoutes: ['workspace_id-dam-damAnalytics-collectionAnalytics'],
        },
      ],
    }
  },
  computed: {
    isCollection() {
      return [...this.$store.state.dam.collectionList]
    },
  },
}
</script>
