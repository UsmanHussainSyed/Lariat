<template>
  <Model
    v-model="model"
    hide-buttons
    header-text="Embed files"
    content-class="bg-gray"
  >
    <div class="share-wrapper align-items-center" style="display: flex">
      <div class="embed-box d-flex align-items-center" style="flex: 10">
        <img
          style="height: auto; max-height: 40px"
          class="profile-bg"
          :src="__image_thumb || getPreviewIcon(file.file_type)"
          alt=""
        />
        <input
          v-if="!shareUrl"
          type="text"
          :value="file.display_file_name"
          readonly="readonly"
          class="form-control"
        />
        <input
          v-else
          :value="shareUrl"
          type="text"
          readonly="readonly"
          class="form-control"
        />
      </div>
      <div v-if="shareUrl" style="flex: 1" class="pl1">
        <button
          v-clipboard="shareUrl"
          v-clipboard:success="() => (copied = true)"
          v-clipboard:error="() => $toast.global.error('Copy failed')"
          type="button"
          class="btn btn-big"
          :class="{ copied, 'dam-btn-outline': !copied }"
          :disabled="copied"
        >
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>
    <div class="modal-footer justify-content-end p-0 pt-3">
      <button
        v-if="!shareUrl"
        type="button"
        class="btn"
        :disabled="creating"
        :class="{ 'btn-disabled': !creating }"
        @click="getEmbedLink"
      >
        {{ creating ? 'Creating...' : 'Embed Link' }}
      </button>
    </div>
  </Model>
</template>

<script>
import FileType from '@/mixins/fileType.js'
import Model from '~/components/plugins/Model'
export default {
  components: { Model },
  extends: Model,
  mixins: [FileType],
  props: {
    file: { type: Object, default: Object },
  },
  data() {
    return {
      copied: false,
      shareUrl: null,
      creating: false,
    }
  },
  computed: {
    assetEmbeddingAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_embedding?.enable
    },
  },
  watch: {
    copied(copied) {
      if (copied)
        this.copyBtnResetTimer = setTimeout(() => (this.copied = false), 1500)
    },
  },
  destroyed() {
    if (this.copyBtnResetTimer) clearTimeout(this.copyBtnResetTimer)
  },
  methods: {
    async getEmbedLink() {
      if (!this.assetEmbeddingAllowed) return
      this.shareUrl = null
      this.creating = true
      try {
        const embed_code = await this.$axios.$get(
          `digital-assets/${this.$route.params.id}/generate-embed-code`,
          {
            url_workspace_id: this.$getWorkspaceId(),
          }
        )
        this.shareUrl = embed_code.data.embed_code
        return embed_code.data.embed_code
      } catch (error) {
        this.$toast.global.error(this.$getErrorMessage(error))
      }
      this.creating = false
    },
  },
}
</script>
