<template>
  <header class="header bg-gray">
    <div class="header-left"></div>
    <div class="header-right">
      <ProjectSystemNotifications
        v-if="
          $route.name != 'profile' &&
          $route.name != 'notification-settings-workspace_id-module_id-type' &&
          $route.name != 'workspace_id-child-workspace-create' &&
          $route.name != 'workspace_id-child-workspace-choose-modules'
        "
      />
      <ProfileDropDown />
    </div>
  </header>
</template>
<script>
import ProfileDropDown from '~/components/theme/global/ProfileDropDown'
import ProjectSystemNotifications from '~/components/theme/global/ProjectSystemNotifications'
export default {
  name: 'Header',
  components: { ProfileDropDown, ProjectSystemNotifications },
}
</script>
