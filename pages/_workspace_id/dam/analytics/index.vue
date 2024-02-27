<template>
  <AssetsTab />
</template>

<script>
import AssetsTab from '~/components/dam/Analytics/AssetsTab'
export default {
  components: {
    AssetsTab,
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
}
</script>
