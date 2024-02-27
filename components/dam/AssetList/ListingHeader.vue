<template>
  <ListingHeaderTemplate>
    <div
      class="selectbox preview-img no-pointer flex10"
      :class="{ semicheck: selectedCount != 0 && assetsCount != selectedCount }"
      style="padding: 2px 10px 8px !important"
    >
      <label v-if="shareMode && !shareLinkHideDownload" class="check-label">
        <input
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
      class="categary-name sorting flex27"
      :class="sortingClass('display_file_name')"
    >
      <span
        @click="
          sortValueModel = 'display_file_name'
          emitSort([
            ['subFolders', 'folder_name', $sortToUpperCase],
            ['files', 'display_file_name', $sortToUpperCase],
          ])
        "
      >
        Asset Name
      </span>
    </div>
    <div
      class="assets sorting"
      :class="[
        sortingClass('file_type'),
        hashParam === 'archive' ? 'flex10' : 'flex18',
      ]"
    >
      <span
        @click="
          sortValueModel = 'file_type'
          emitSort([
            ['subFolders', 'total_contain', $sortToTypedNumber],
            ['files', 'file_type', $sortToUpperCase],
          ])
        "
      >
        Asset Type
      </span>
    </div>
    <div
      class="update-date sorting"
      :class="[
        sortingClass('updated_at'),
        hashParam === 'archive' ? 'flex13' : 'flex18',
      ]"
    >
      <span
        @click="
          sortValueModel = 'updated_at'
          emitSort([
            ['subFolders', 'updated_at', $sortToTime],
            ['files', 'updated_at', $sortToTime],
          ])
        "
      >
        {{ hashParam === 'archive' ? 'Archived On' : 'Date' }}
      </span>
    </div>
    <div
      class="size sorting"
      :class="[
        hashParam ? sortingClass('file_size') : '',
        hashParam === 'archive' ? 'flex10' : 'flex12',
      ]"
    >
      <span
        v-if="hashParam"
        @click="
          sortValueModel = 'file_size'
          emitSort([
            ['subFolders', 'total_contain', $sortToTypedNumber],
            ['files', 'file_size', $sortToTypedNumber],
          ])
        "
      >
        Size
      </span>
      <span v-else> Size </span>
    </div>
    <div
      v-if="hashParam === 'archive'"
      class="update-date sorting flex15"
      :class="sortingClass('archived_by')"
    >
      <span
        @click="
          sortValueModel = 'archived_by'
          emitSort([
            ['subFolders', 'updated_at', $sortToTime],
            ['files', 'updated_at', $sortToTime],
          ])
        "
      >
        Archived By
      </span>
    </div>
    <div
      v-if="!shareLinkHideDownload"
      class="categary-action sorting no-pointer flex15 text-right"
    >
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
    selectedCount: { type: [Number, String], default: 0 },
    selectedAll: { type: Boolean, default: false },
    shareMode: { type: Boolean, default: false },
    shareLinkHideDownload: { type: Boolean, default: false },
  },
  computed: {
    hashParam() {
      return this.$route.hash?.replace('#', '')
    },
  },
  methods: {
    emitSort(arg) {
      this.$nextTick(() => this.$emit('sort', arg))
    },
  },
}
</script>

<style scoped></style>
