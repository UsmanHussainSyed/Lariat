<template>
  <div class="main">
    <!--Left Menu  -->
    <LeftMenu />
    <!-- right part  -->
    <div class="main-right">
      <!-- Top Header -->
      <Header />
      <!-- Main content -->
      <nuxt />
    </div>
  </div>
</template>
<script>
import LeftMenu from '@/components/theme/global/LeftMenu'
import Header from '@/components/theme/global/Header'
export default {
  components: { Header, LeftMenu },
}
</script>
