<template>
  <header class="header bg-gray">
    <div class="header-left"></div>
    <div class="header-right">
      <ProfileDropDown />
    </div>
  </header>
</template>
<script>
import currentWorkspace from '~/mixins/currentWorkspace'
import ProfileDropDown from '~/components/theme/global/ProfileDropDown'
export default {
  name: 'Header',
  components: { ProfileDropDown },
  mixins: [currentWorkspace],
  computed: {},
}
</script>
