<template>
  <ul class="thead">
    <li>
      <div
        class="selectbox preview-img no-pointer flex10"
        style="padding: 2px 10px 8px !important"
      >
        <label class="check-label">
          <input
            type="checkbox"
            :checked="selectedAll"
            :disabled="deleting"
            @input="
              (ev) =>
                $emit(
                  `click:${ev.target.checked ? 'select-all' : 'select-none'}`
                )
            "
          />
          <span class="check-span"></span>
        </label>
      </div>
      <div
        class="categary-name sorting flex27"
        :class="sortingClass('display_file_name')"
      >
        <span @click="onSort('display_file_name')"> Asset Name </span>
      </div>
      <div class="assets sorting flex18" :class="sortingClass('file_type')">
        <span @click="onSort('file_type')"> Asset Type </span>
      </div>
      <div
        class="update-date sorting flex18"
        :class="sortingClass('updated_at')"
      >
        <span @click="onSort('updated_at')"> Date </span>
      </div>
      <div class="size sorting flex12" :class="sortingClass('file_size')">
        <span @click="onSort('file_size')"> Size </span>
      </div>
      <div class="categary-action sorting no-pointer flex15 text-right">
        Action
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    deleting: { type: Boolean, default: false },
    selectedAll: { type: Boolean, default: false },
    sortValue: { type: String, default: '' },
    reverse: { type: Boolean, default: false },
  },
  data() {
    return {
      sortValueModel: this.sortValue,
    }
  },
  watch: {
    sortValue(n) {
      this.sortValueModel = n
    },
    sortValueModel(n) {
      this.$emit('update:sortValue', n)
    },
  },
  methods: {
    onSort(value) {
      const sort = {
        sortBy: value,
        descending: !this.reverse,
      }
      this.$emit('sort', sort)
    },
    sortingClass(e) {
      return {
        sortarrow: this.sortValue === e,
        descending: this.sortValue === e && this.reverse,
        active: this.sortValue === e && this.reverse,
      }
    },
  },
}
</script>

<style scoped></style>
