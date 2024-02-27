<template>
  <div class="body-content p0">
    <AnalyticsDetails
      v-if="isDetailComponent"
      @show-analytics="isDetailComponent = $event"
    />
    <Analytics v-else @show-analytics="isDetailComponent = $event" />
  </div>
</template>

<script>
import AnalyticsDetails from '~/components/lead/analytics/AnalyticsDetails'
import Analytics from '~/components/lead/analytics/Analytics'
export default {
  components: {
    AnalyticsDetails,
    Analytics,
  },
  layout: 'leadLayout',
  data() {
    return {
      isDetailComponent: false,
    }
  },
}
</script>
<style></style>
