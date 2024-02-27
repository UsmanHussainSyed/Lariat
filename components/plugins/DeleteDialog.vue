<template>
  <Model
    v-model="model"
    v-bind="$props"
    centered
    body-class="text-center"
    :layout-class="'modal-small'"
    v-on="$listeners"
  >
    <p>
      <slot>This action is irreversible.</slot>
    </p>
  </Model>
</template>

<script>
import Model from './Model'

export default {
  components: { Model },
  extends: Model,
}
</script>

<style>
.d-dialog .modal-content p {
  word-break: break-word;
}
</style>
