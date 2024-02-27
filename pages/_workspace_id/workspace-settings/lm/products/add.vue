<template>
  <product-form></product-form>
</template>
<script>
import productForm from '~/components/lead/products/product-form'

export default {
  components: { productForm },

  layout: 'generalSettingsLayout',
  middleware: [
    'authCheck',
    'can-access-lead-settings',
    'can-access-general-settings',
    'block-access-dealerAdmin',
  ],
}
</script>
