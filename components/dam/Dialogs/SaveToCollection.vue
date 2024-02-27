<template>
  <Model
    v-model="model"
    hide-buttons
    :header-text="
      chooseCollection ? 'Choose Collection' : 'Save to New Collection'
    "
    :model-footer="false"
    :layout-class="'modal-xsmall'"
  >
    <div class="row xs-gutters">
      <div class="col-md-4">
        <div class="save-image">
          <img
            :src="__image_thumb || __thumb || previewImage"
            :alt="file.display_file_name"
          />
        </div>
      </div>
      <div class="col-md-8">
        <div class="save-collection" :class="{ show: !chooseCollection }">
          <form @submit.prevent="addCollection">
            <div class="form-group">
              <input
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
          <a
            v-if="hasCollection.length !== 0"
            class="link-btn"
            @click="saveToCollection('choose')"
            >Choose Collection</a
          >
        </div>
        <div class="choose-collection" :class="{ show: chooseCollection }">
          <form class="navbar-form search-navbar-form" role="search">
            <div class="input-group">
              <button class="btn-search hidden-xs" type="submit">
                <svg
                  id="Layer_1"
                  class="search-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 18 18"
                  xml:space="preserve"
                >
                  <path
                    id="Icon_ionic-ios-search"
                    class="fill-color"
                    d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
                  ></path>
                </svg>
              </button>
              <input
                v-model="searchCollectionName"
                type="text"
                class="form-control"
                placeholder="Search recent collection"
                name="srch-collection"
              />
            </div>
          </form>
          <ul class="choose-collection-name customscrollbar pl0 pr0">
            <li
              v-for="collection in collectionList"
              :key="collection.id"
              :class="{ disabled: collectionListDisable(collection.assets_id) }"
              @click="saveCollection(collection.id)"
            >
              <div class="collection-name">{{ collection.name }}</div>
              <div class="collection-save">Save</div>
            </li>
            <li v-if="collectionList.length === 0">
              <div class="collection-name">No match found</div>
            </li>
          </ul>
          <a class="link-btn" @click="saveToCollection('save')"
            >Save to New Collection</a
          >
        </div>
      </div>
    </div>
  </Model>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Model from '~/components/plugins/Model'
import fileType from '~/mixins/fileType'

export default {
  components: { Model },
  extends: Model,
  mixins: [fileType],
  props: { file: { type: Object, required: true } },
  data() {
    return {
      collectionName: '',
      loading: false,
      chooseCollection: false,
      searchCollectionName: '',
      saving: 0,
    }
  },
  computed: {
    hasCollection() {
      return this.$store.state.dam.collectionList
    },
    collectionList() {
      let data = []
      data = this.$store.state.dam.collectionList
      if (this.searchCollectionName) {
        data = data.filter((item) => {
          return this.searchCollectionName
            .toLowerCase()
            .split(' ')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      }
      return data
    },
  },
  watch: {
    model(model) {
      if (!model) {
        this.chooseCollection = false
        this.collectionName = ''
        this.$v.$reset()
      }
    },
  },
  methods: {
    collectionListDisable(collectionAssetsId) {
      return collectionAssetsId.includes(this.file.id)
    },
    async saveCollection(id) {
      if (this.saving) return
      this.saving = 1
      const assetsId = []
      assetsId.push(this.file.id)
      await this.$axios
        .$post(`digital-assets/collection/${id}/add-assets`, {
          assets_id: assetsId,
        })
        .then(({ message }) => {
          this.$store.dispatch('dam/getCollections').then(() => {
            this.$toast.global.success(message)
            this.collectionName = ''
            this.$v.$reset()
            this.hide()
          })
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.collectionName = ''
          this.$v.$reset()
        })
        .finally(() => (this.saving = 0))
    },
    saveToCollection(selectionType) {
      this.chooseCollection = !this.chooseCollection
    },
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
          description: null,
        })
        .then((response) => {
          const newCollection = response.data
          this.$store.dispatch('dam/addCollection', newCollection)
          const assetsId = []
          assetsId.push(this.file.id)
          this.$axios
            .$post(`digital-assets/collection/${response.data.id}/add-assets`, {
              assets_id: assetsId,
            })
            .then((response) => {
              this.$store.dispatch('dam/getCollections')
              this.$toast.global.success(response.message)
              this.collectionName = ''
              this.$v.$reset()
              this.hide()
            })
            .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
            .finally(() => (this.loading = false))
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.$v.$reset()
          this.loading = false
        })
    },
  },
  validations: {
    collectionName: { required },
  },
}
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
