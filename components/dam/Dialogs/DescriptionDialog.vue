<template>
  <Model
    v-model="model"
    hide-buttons
    header-text="Description"
    :model-footer="false"
    :layout-class="'large'"
    :centered="true"
  >
    <div class="form-group mb0">
      <label class="control-label">Collection Description</label>
      <textarea
        v-model.trim="description"
        cols="5"
        rows="15"
        class="form-control"
        placeholder="add description here"
        @blur="debounceSearch"
      >
      >
      </textarea>
    </div>
  </Model>
</template>

<script>
import Model from '~/components/plugins/Model'

export default {
  components: { Model },
  extends: Model,
  props: { collection: { type: Object, default: () => ({}) } },
  data() {
    return {
      description: this.collection.description,
    }
  },

  methods: {
    async debounceSearch(event) {
      if (this.description !== this.collection.description) {
        if (this.description === '') {
          this.description = null
        }
        await this.$axios
          .$post(`digital-assets/collection/update/${this.collection.id}`, {
            workspace_id: this.$getWorkspaceId(),
            name: this.collection.name,
            description: this.description,
          })
          .then(() => {
            this.$emit('getCollections')
          })
          .catch((e) => {
            this.$toast.global.error(this.$getErrorMessage(e))
          })
      }
    },
  },
}
</script>
