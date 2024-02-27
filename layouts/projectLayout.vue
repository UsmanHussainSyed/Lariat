<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <!-- right part  -->
    <div class="main-right">
      <!-- Top Header -->
      <DamHeader v-if="$auth.loggedIn" />
      <!-- Main content -->
      <nuxt v-if="$auth.loggedIn" />
    </div>
    <platform-migration-warning />
  </div>
</template>
<script>
import LeftMenu from '@/components/theme/global/LeftMenu'
import DamHeader from '@/components/theme/global/DamHeader'
import PlatformMigrationWarning from '~/components/platform-migration-warning'
export default {
  components: { DamHeader, LeftMenu, PlatformMigrationWarning },
  computed: {},
  async mounted() {},
}
</script>
