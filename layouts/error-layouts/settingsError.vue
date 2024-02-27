<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu />
    <!-- right part  -->
    <div class="main-right">
      <!-- Top Header -->
      <Header />
      <!-- Main content -->
      <div class="body-content p0">
        <div class="general-settings h-100 w-100">
          <SettingsLeftMenu />
          <div class="general-settings-right h-100">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LeftMenu from '@/components/theme/global/LeftMenu'
import Header from '@/components/theme/global/Header'
import SettingsLeftMenu from '@/components/theme/settings/SettingsLeftMenu'
export default {
  components: { SettingsLeftMenu, Header, LeftMenu },
}
</script>
