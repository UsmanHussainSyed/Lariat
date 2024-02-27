<template>
  <ListingHeaderTemplate>
    <div
      class="categary-name sorting flex40"
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
    <div
      class="update-by sorting text-center flex10"
      :class="sortingClass('userName')"
    >
      <span
        @click="
          sortValueModel = 'userName'
          emitSort([['files', 'userName', $sortToUpperCase]])
        "
      >
        Uploaded By
      </span>
    </div>
    <div
      class="update-date sorting text-center flex10"
      :class="sortingClass('updated_at')"
    >
      <span
        @click="
          sortValueModel = 'updated_at'
          emitSort([['files', 'updated_at', $sortToTime]])
        "
      >
        Uploaded Date
      </span>
    </div>
    <div
      class="asset-size sorting text-center flex10"
      :class="sortingClass('file_size')"
    >
      <span
        @click="
          sortValueModel = 'file_size'
          emitSort([['files', 'file_size', $sortToTypedNumber]])
        "
      >
        Asset Size
      </span>
    </div>
    <div
      class="total-views sorting text-center flex10"
      :class="sortingClass('view_count')"
    >
      <span
        @click="
          sortValueModel = 'view_count'
          emitSort([['files', 'view_count', $sortToTypedNumber]])
        "
      >
        Total Views
      </span>
    </div>
    <div
      class="total-download sorting text-center flex10"
      :class="sortingClass('download_count')"
    >
      <span
        @click="
          sortValueModel = 'download_count'
          emitSort([['files', 'download_count', $sortToTypedNumber]])
        "
      >
        Total Downloads
      </span>
    </div>
    <div
      class="total-share sorting text-center flex10"
      :class="sortingClass('share_count')"
    >
      <span
        @click="
          sortValueModel = 'share_count'
          emitSort([['files', 'share_count', $sortToTypedNumber]])
        "
        >Total Share
      </span>
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
    selectedAll: { type: Boolean, default: false },
  },
  methods: {
    emitSort(arg) {
      this.$nextTick(() => this.$emit('sort', arg))
    },
  },
}
</script>
