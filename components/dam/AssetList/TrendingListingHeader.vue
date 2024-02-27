<template>
  <ListingHeaderTemplate>
    <div class="preview-img sorting pb-1 no-pointer flex10">
      <label v-if="!!assetsCount" class="check-label" for="listing-select-all">
        <input
          id="listing-select-all"
          type="checkbox"
          :checked="selectedAll"
          :disabled="deleting"
          @input="
            (ev) =>
              $emit(`click:${ev.target.checked ? 'select-all' : 'select-none'}`)
          "
        />
        <span class="check-span"></span>
      </label>
    </div>
    <div
      class="categary-name sorting flex23"
      :class="sortingClass('display_file_name')"
    >
      <span
        @click="
          sortValueModel = 'display_file_name'
          emitSort([['files', 'display_file_name', $sortToUpperCase]])
        "
      >
        Asset Name
      </span>
    </div>
    <div class="assets sorting flex12" :class="sortingClass('file_type')">
      <span
        @click="
          sortValueModel = 'file_type'
          emitSort([['files', 'file_type', $sortToUpperCase]])
        "
      >
        Asset Type
      </span>
    </div>
    <div
      class="uploaded-by sorting flex14"
      :class="sortingClass('uploaded-by')"
    >
      <span
        @click="
          sortValueModel = 'uploaded-by'
          emitSort([['files', 'uploaded-by', $sortToTime]])
        "
      >
        Uploaded By
      </span>
    </div>
    <div class="update-date sorting flex17" :class="sortingClass('updated_at')">
      <span
        @click="
          sortValueModel = 'updated_at'
          emitSort([['files', 'updated_at', $sortToTime]])
        "
      >
        Last Modified Date
      </span>
    </div>
    <div class="size sorting flex12" :class="sortingClass('file_size')">
      <span
        @click="
          sortValueModel = 'file_size'
          emitSort([['files', 'file_size', $sortToTypedNumber]])
        "
      >
        Asset Size
      </span>
    </div>
    <div class="categary-action sorting no-pointer flex12 text-right">
      Action
    </div>
  </ListingHeaderTemplate>
</template>

<script>
import ListingHeaderTemplate from '../ListingHeaderTemplate'

export default {
  components: { ListingHeaderTemplate },
  extends: ListingHeaderTemplate,
  props: {
    deleting: { type: Boolean, default: false },
    assetsCount: { type: [Number, String], default: 0 },
    selectedAll: { type: Boolean, default: false },
  },
  methods: {
    emitSort(arg) {
      this.$nextTick(() => this.$emit('sort', arg))
    },
  },
}
</script>

<style scoped></style>
