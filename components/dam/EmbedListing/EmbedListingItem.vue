<template>
  <li>
    <div class="tb-column flex3">
      <div class="top-column">
        <label class="check-label">
          <input
            type="checkbox"
            :checked="selected"
            @change="$emit('selection-change', !selected)"
          />
          <span class="check-span"></span>
        </label>
      </div>
    </div>
    <div class="share-url tb-column flex71">
      <div class="top-column">
        <div class="media">
          <div class="media-left">
            <div class="categary-image">
              <img
                :src="url.thumbnail_file || getPreviewIcon(url.file_type)"
                alt=""
              />
            </div>
          </div>
          <div class="media-body">
            <label
              ><a :href="url.embed_code" target="__blank">
                {{ url.embed_code }}</a
              ></label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="generated-date tb-column flex10">
      <div class="top-column">
        <label>
          <span
            v-if="url.embed_code_date"
            v-tooltip="$moment(url.embed_code_date).format('LL LT')"
            >{{ $moment(url.embed_code_date).format('Do, MMM YYYY') }}</span
          >
          <span v-else>-</span>
        </label>
      </div>
    </div>
    <div class="generated-source tb-column flex10">
      <div class="top-column">
        <label>{{ url.userName }}</label>
      </div>
    </div>
    <div class="share-actions tb-column flex6">
      <ul class="action justify-content-center">
        <li v-if="deletingModel">
          <SpinLoading />
        </li>
        <li v-else>
          <a @click="$refs.deleteDialog.show()">
            <svg
              id="Layer_1"
              class="delete-icon h-orange"
              data-toggle="tooltip"
              title=""
              data-original-title="Delete Share URL"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 15.3 18"
              xml:space="preserve"
            >
              <g id="Group_4351" transform="translate(-443.472 -147.331)">
                <path
                  id="Path_3410"
                  class="fill-color"
                  d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                ></path>
                <path
                  id="Path_3411"
                  class="fill-color"
                  d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                ></path>
              </g>
            </svg>
          </a>
        </li>
      </ul>
    </div>

    <client-only>
      <DeleteDialog
        ref="deleteDialog"
        header-text="Delete Embed URL"
        @button:yes="deleteUrl"
      >
        Are you sure you want to
        <strong>Delete</strong>
        Embed URL?
      </DeleteDialog>
    </client-only>
  </li>
</template>

<script>
import FileType from '@/mixins/fileType.js'
import DeleteDialog from '~/components/plugins/DeleteDialog'

export default {
  components: { DeleteDialog },
  mixins: [FileType],
  props: {
    url: { type: Object, required: true },
    deleting: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
  },
  data() {
    return {
      deletingModel: this.deleting,
    }
  },
  watch: {
    deletingModel(deletingModel) {
      this.$emit('update:deleting', deletingModel)
    },
    deleting(deleting) {
      this.deletingModel = deleting
    },
  },
  methods: {
    async deleteUrl() {
      if (this.deletingModel) return

      this.deletingModel = true
      await this.$axios
        .$post(`digital-assets/remove-embed-code`, {
          workspace_id: this.$getWorkspaceId(),
          asset_version_ids: [this.url.id],
        })
        .then(({ message }) => {
          this.$toast.global.success(message)
          this.$emit('deleted', this.url.id)
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.deletingModel = false
    },
  },
}
</script>
