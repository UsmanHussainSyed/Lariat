<template>
  <header class="header bg-gray">
    <div class="header-left">
      <a href="/" class="d-flex">
        <img
          :src="require('~/assets/img/header-top-logo.svg')"
          alt=""
          style="max-height: 36px"
        />
      </a>
    </div>
    <div class="header-right">
      <a href="/" class="btn">Login</a>
    </div>
  </header>
</template>
<script>
export default {
  name: 'SubscriptionHeader',
}
</script>

<style></style>
