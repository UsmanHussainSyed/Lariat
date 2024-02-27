<template>
  <div>You will be redirected in a moment..</div>
</template>

<script>
export default {
  middleware: ['authCheck', 'checkWorkspace', 'box-auth'],
}
</script>

<style></style>
