<template>
  <li>
    <div class="categary-name tb-column flex40">
      <div class="media">
        <div class="media-left">
          <div class="categary-image">
            <img :src="file.thumbnail_file || file.preview_image" alt="" />
          </div>
        </div>
        <div class="media-body">
          <div class="add-label">
            <div class="top-column">
              <span>{{ file.display_file_name }}</span>
            </div>

            <span
              v-if="file.final_deleted == 1"
              class="plan-status alert-danger"
              >Deleted</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="update-by tb-column text-center flex10">
      <div class="top-column">
        <label>{{ file.userName }}</label>
      </div>
    </div>
    <div class="update-date tb-column text-center flex10">
      <div class="top-column">
        <label>{{ $moment(file.updated_at).format('Do, MMM YYYY') }}</label>
      </div>
    </div>
    <div class="asset-size tb-column text-center flex10">
      <div class="top-column">
        <label>{{ $toHumanlySize(file.file_size) }}</label>
      </div>
    </div>
    <div class="total-views tb-column text-center flex10">
      <div class="top-column">
        <label>{{ file.view_count }}</label>
      </div>
    </div>
    <div class="total-download tb-column text-center flex10">
      <div class="top-column">
        <label>{{ file.download_count }}</label>
      </div>
    </div>
    <div class="total-share tb-column text-center flex10">
      <div class="top-column">
        <label>{{ file.share_count }}</label>
      </div>
    </div>
  </li>
</template>

<script>
import fileType from '~/mixins/fileType'

export default {
  mixins: [fileType],
  props: {
    file: { type: Object, default: () => ({}) },
  },
}
</script>
