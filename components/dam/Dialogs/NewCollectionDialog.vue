<template>
  <Model
    v-model="model"
    hide-buttons
    header-text="Create New Collection"
    :model-footer="false"
    :layout-class="'modal-medium'"
    :centered="true"
    :body-class="'create-collection text-center'"
  >
    <p>
      Collection are the best place to save images and video clips. Collect,
      curate and comment on your files.
    </p>
    <form @submit.prevent="addCollection">
      <div class="form-group">
        <input
          ref="collectionName"
          v-model.trim="collectionName"
          type="text"
          placeholder="Collection Name"
          class="form-control"
        />
        <div
          v-if="$v.collectionName.$error && !$v.collectionName.required"
          class="input-error"
        >
          Please Enter folder name
        </div>
      </div>
      <div class="form-group mb0">
        <textarea
          v-model.trim="collectionDesc"
          class="form-control"
          cols="4"
          rows="5"
          name="desc"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="btn-group">
        <button
          type="button"
          :class="{ 'btn-disabled': loading || !collectionName.trim() }"
          :disabled="loading || !collectionName.trim()"
          class="btn btn-block text-uppercase"
          @click="addCollection"
        >
          <template v-if="loading">
            <i class="fa fa-circle-o-notch fa-spin"></i>
            &nbsp; Creating...
          </template>
          <template v-else>Save</template>
        </button>
      </div>
    </form>
  </Model>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Model from '~/components/plugins/Model'

export default {
  components: { Model },
  extends: Model,
  data() {
    return {
      collectionName: '',
      collectionDesc: null,
      loading: false,
    }
  },
  computed: {
    isCollection() {
      return this.$route.name.search('collection') > -1
    },
  },
  watch: {
    model(model) {
      if (model) this.$nextTick(() => this.$refs.collectionName?.focus?.())
      else {
        this.collectionName = ''
        this.$v.$reset()
      }
    },
  },
  methods: {
    async addCollection() {
      if (this.loading) return

      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      this.loading = true
      await this.$axios
        .$post(`digital-assets/collection/create`, {
          name: this.collectionName,
          description: this.collectionDesc,
        })
        .then((response) => {
          this.$toast.global.success(response.message)
          this.model = false
          const newCollection = response.data
          this.$store
            .dispatch('dam/addCollection', newCollection)
            .then(() => {
              if (this.isCollection) {
                this.$bus.$emit('collectionUpdate')
              }
              this.collectionName = ''
              this.collectionDesc = null
              this.$v.$reset()
            })
            .catch((error) => {
              this.$toast.global.error(this.$getErrorMessage(error))
              this.collectionName = ''
              this.collectionDesc = null
              this.$v.$reset()
            })
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
        .finally(() => (this.loading = false))
    },
  },
  validations: {
    collectionName: { required },
  },
}
</script>
