<template>
  <div class="general-settings-right h-100">
    <div class="general-settings-title">
      <h4>Edit Group Network</h4>
    </div>
    <Body :create="false" />
  </div>
</template>

<script>
import Body from '~/components/lead/dealerGroupNetwork/Body'
export default {
  components: {
    Body,
  },
  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'block-access-dealerAdmin',
  ],
}
</script>
