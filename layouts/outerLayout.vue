<template>
  <div class="main">
    <div class="sign-screen customscrollbar h-100">
      <div class="sign-screen-dtable">
        <div class="sign-screen-dtable-cell">
          <div class="sign-screen-content">
            <div class="sign-heading-text text-center">
              <Logo />
            </div>
            <nuxt />
          </div>
          <TermsAndPolicy />
        </div>
      </div>
    </div>
    <platform-migration-warning />
  </div>
</template>
<script>
import TermsAndPolicy from '~/components/theme/TermsAndPolicy'
import Logo from '~/components/theme/Logo'
import PlatformMigrationWarning from '~/components/platform-migration-warning'
export default {
  components: { Logo, TermsAndPolicy, PlatformMigrationWarning },
}
</script>
<style></style>
