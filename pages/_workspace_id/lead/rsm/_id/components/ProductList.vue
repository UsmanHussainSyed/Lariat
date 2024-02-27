<template>
  <li>
    <div class="name-email tb-column flex50">
      <div class="dealer-num">{{ count }}</div>
      <div class="media">
        <div class="media-left">
          <div
            v-tooltip="product.name"
            :class="product.product_image ? 'profile-bg' : 'profile-icon'"
            :style="{
              'background-image': `url('${
                product.product_image
                  ? product.product_image
                  : require('@/assets/img/icon/building.svg')
              }')`,
            }"
          ></div>
        </div>
        <div class="media-body">
          <div class="top-column">
            <label>{{ product.name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="tb-column flex22">
      <div class="top-column">{{ product.category_name }}</div>
    </div>
    <div class="tb-column flex16">
      <div class="top-column">{{ product.model }}</div>
    </div>
    <div class="tb-column flex12 text-center">
      <div class="top-column img-text">
        {{ product.is_active ? 'Active' : 'In-active' }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },
}
</script>

<style></style>
