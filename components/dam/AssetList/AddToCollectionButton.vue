<template>
  <div
    class="collection-box"
    :class="{ saved: flag > 0, open: openCollectionBox }"
    @mouseover="openCollectionBox = true"
    @mouseleave="openCollectionBox = false"
  >
    <button
      class="btn btn-small no-border collection-btn"
      @click.capture.stop="newCollectionToggle()"
    >
      {{ flag > 0 ? 'Remove' : 'Save' }}
    </button>
    <div class="collection-move">
      <a
        data-toggle="modal"
        data-target="#save-collection"
        @click.capture.stop="$emit('saveCollection')"
      >
        <div class="arrow">
          <svg
            id="Layer_1"
            class="arrow-down-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4477" transform="translate(-871 -467)">
              <rect
                id="Rectangle_3015"
                x="871"
                y="467"
                class="fill-hide"
                width="18"
                height="18"
              ></rect>
              <g
                id="Icon_feather-chevron-down-3"
                transform="translate(506.256 149.451)"
              >
                <path
                  id="Path_3435"
                  class="fill-color"
                  d="M373.7,330.8c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l6.5,6.5l6.5-6.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-7,7C374.1,330.7,373.9,330.8,373.7,330.8z"
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <div class="title">
          {{ flag > 0 ? 'Remove From Collection' : 'Save to Collection' }}
        </div>
        <div v-if="inCollection" class="name">
          {{ inCollection.name }}
        </div>
        <div v-else class="name">New Collection</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    file: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      flag: 0,
      openCollectionBox: false,
      count: null,
      adding: 0,
    }
  },
  computed: {
    hasCollection() {
      return this.$store.state.dam.collectionList
    },
    isCollection() {
      return this.$route.name.search('collection')
    },
    inCollection() {
      const data = this.$store.state.dam.collectionList[0]
      const exists = data?.assets_id.includes(this.file.id)
      this.buttonChange(exists, data?.assets_count)
      return data
    },
  },
  created() {
    this.count = this.$store.state.dam.collectionList[0]?.assets_count
  },
  methods: {
    updatedAt(id) {
      this.$store.state.dam.collectionList.map((item, index) => {
        if (item.id === id) {
          this.collectionId = index
        }
        return item
      })
    },
    newCollectionToggle() {
      if (this.hasCollection?.length !== 0) {
        this.addToCollection()
      } else if (this.hasCollection?.length === 0) {
        this.$emit('saveCollection')
      }
    },
    buttonChange(include, newCount) {
      this.flag = 0
      if (include) {
        this.flag++
      } else if (this.count !== newCount) {
        this.flag--
      }
    },
    async addToCollection() {
      if (this.adding) return
      this.adding = 1
      const assetsId = []
      assetsId.push(this.file.id)
      if (this.flag <= 0) {
        await this.$axios
          .$post(
            `digital-assets/collection/${this.inCollection.id}/add-assets`,
            {
              assets_id: assetsId,
            }
          )
          .then((response) => {
            this.$store.dispatch('dam/getCollections')
            this.$toast.global.success(response.message)
          })
          .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
          .finally(() => (this.adding = 0))
      } else if (this.flag > 0) {
        this.$store
          .dispatch('dam/deleteAssets', {
            collectionId: this.inCollection.id,
            assetIds: assetsId,
          })
          .then(() => {
            this.$store.dispatch('dam/getCollections')
          })
          .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))
          .finally(() => (this.adding = 0))
      }
    },
  },
}
</script>
