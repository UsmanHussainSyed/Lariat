<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h2 class="title">DAM Users</h2>
    </div>
    <div class="workspace-settings"></div>
  </div>
</template>

<script>
export default {
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-module'],
}
</script>
