<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu v-if="$auth.loggedIn" />
    <!-- right part  -->
    <div class="main-right">
      <!-- Top Header -->
      <CoreHeader v-if="$auth.loggedIn" />
      <!-- Main content -->
      <nuxt v-if="$auth.loggedIn" />
    </div>
  </div>
</template>
<script>
import LeftMenu from '@/components/theme/global/LeftMenu'
import CoreHeader from '@/components/theme/global/CoreHeader'
export default {
  components: { CoreHeader, LeftMenu },
}
</script>
