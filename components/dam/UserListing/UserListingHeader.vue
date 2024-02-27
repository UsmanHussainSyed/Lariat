<template>
  <ListingHeaderTemplate>
    <div class="sorting flex20" :class="sortingClass('name')">
      <span @click="$emit('sort', 'name')">Name</span>
    </div>
    <div class="sorting flex25" :class="sortingClass('email')">
      <span @click="$emit('sort', 'email')">Email</span>
    </div>
    <div v-if="!hideActivity" class="sorting flex15 no-pointer">
      <span>Last Login</span>
    </div>
    <div v-if="!hideActivity" class="sorting flex15 no-pointer">
      <span>Last Activity</span>
    </div>
    <div v-if="!hideActivity" class="sorting flex10 no-pointer">
      <span>Activity Logs</span>
    </div>
    <div class="sorting no-pointer flex15">
      <span>Actions</span>
    </div>
  </ListingHeaderTemplate>
</template>

<script>
import ListingHeaderTemplate from '../ListingHeaderTemplate'

export default {
  components: { ListingHeaderTemplate },
  extends: ListingHeaderTemplate,
  props: {
    hideActivity: { type: Boolean, default: false },
  },
}
</script>
