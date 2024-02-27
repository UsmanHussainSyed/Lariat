<template>
  <ul class="thead">
    <li>
      <div
        class="categary-name sorting flex34"
        :class="sortingClass('name')"
        style="cursor: pointer"
      >
        <div class="blankSpace"></div>
        <span @click="$emit('sort', 'name')"> Collection Name </span>
      </div>
      <div
        class="collection-description sorting flex26"
        style="cursor: default"
      >
        <span>Description</span>
      </div>
      <div
        class="assets sorting flex12"
        :class="sortingClass('updated_at')"
        style="cursor: pointer"
      >
        <span @click="$emit('sort', 'updated_at')"> Last Updated </span>
      </div>
      <div class="update-date sorting flex12" style="cursor: default">
        <span> Owner </span>
      </div>
      <div class="size sorting flex8" style="cursor: default">
        <span> Files </span>
      </div>
      <div
        class="categary-action sorting no-pointer flex8 text-center"
        style="cursor: default"
      >
        Action
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    sortBy: { type: String, default: 'updated_at' },
    sortOrder: { type: String, default: 'DESC' },
  },
  computed: {
    sortingClass() {
      return (sortValue) => {
        return {
          sortarrow: this.sortBy === sortValue,
          active: this.sortBy === sortValue && this.sortOrder === 'ASC',
        }
      }
    },
  },
}
</script>
