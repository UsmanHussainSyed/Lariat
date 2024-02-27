<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <!-- right part  -->
    <div class="main-right">
      <!-- Top Header -->
      <CoreHeader v-if="$auth.loggedIn" />
      <overlay-loader :is-active="isLoading" :loading-text="getLoadingText" />
      <!-- Main content -->
      <div class="body-content p0">
        <div class="general-settings h-100 w-100">
          <SettingsLeftMenu v-if="$auth.loggedIn" />
          <nuxt v-if="$auth.loggedIn" />
        </div>
      </div>
    </div>
    <platform-migration-warning />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import LeftMenu from '@/components/theme/global/LeftMenu'
import CoreHeader from '@/components/theme/global/CoreHeader'
import SettingsLeftMenu from '@/components/theme/settings/SettingsLeftMenu'
import PlatformMigrationWarning from '~/components/platform-migration-warning'
export default {
  components: {
    SettingsLeftMenu,
    CoreHeader,
    LeftMenu,
    PlatformMigrationWarning,
  },
  computed: {
    ...mapGetters({
      isLoading: 'loading/isLoading',
      getLoadingText: 'loading/getLoadingText',
    }),
  },
}
</script>
