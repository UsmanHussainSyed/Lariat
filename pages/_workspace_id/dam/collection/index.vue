<template>
  <div class="body-content dam-container p0">
    <div class="body-content-auto w-100">
      <div class="collection-tabs w-100">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a href="#my-collection" class="nav-link active" data-toggle="tab">
              Collection ({{ collections.length }})
            </a>
          </li>
        </ul>
        <nuxt-link
          class="btn right-fixed"
          :to="{
            query: { ...$route.query, createCollection: true },
            hash: $route.hash,
          }"
          replace
        >
          Create Collection
        </nuxt-link>
      </div>
      <div class="tab-content w-100">
        <div id="my-collection" class="tab-pane active h-100">
          <div class="common-box-header collection-header">
            <div class="filter-left">
              <nuxt-link
                :to="{
                  name: 'workspace_id-dam',
                  params: { workspace_id: $getWorkspaceId() },
                }"
                class="home-icon"
              >
                <svg
                  id="Layer_1"
                  class="home-icon orange"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 16.2 18"
                  xml:space="preserve"
                >
                  <g id="Group_4409" transform="translate(-871.194 -659.595)">
                    <g id="Path_3470">
                      <path
                        id="Path_3514"
                        class="fill-color"
                        d="M879.3,661.5l6.6,5.1v9.2c0,0.2-0.1,0.3-0.3,0.3H873c-0.2,0-0.3-0.1-0.3-0.3v-9.2L879.3,661.5M879.3,659.6l-8.1,6.3v9.9c0,1,0.8,1.8,1.8,1.8h12.6c1,0,1.8-0.8,1.8-1.8v-9.9L879.3,659.6z"
                      ></path>
                    </g>
                    <g id="Path_3471">
                      <path
                        id="Path_3515"
                        class="fill-color"
                        d="M882,677.3c-0.4,0-0.8-0.3-0.8-0.8v-7.2h-3.9v7.2c0,0.4-0.3,0.8-0.8,0.8s-0.8-0.3-0.8-0.8v-8c0-0.4,0.3-0.8,0.8-0.8h5.4c0.4,0,0.8,0.3,0.8,0.8v8C882.7,677,882.4,677.3,882,677.3z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </nuxt-link>
              <div class="breadcrumb-links">
                <ul>
                  <li>&nbsp;</li>
                  <li><span class="title">Collections</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="common-box bg-gray resource-wrapper grid-list my-collection table-list-scrolling"
          >
            <div class="table-list-view multi-table-view">
              <CollectionListingHeader
                :sort-by="sortBy"
                :sort-order="sortOrder"
                @sort="sortCollections"
              />
              <div class="customscrollbar">
                <ul class="tbody h-auto">
                  <template v-for="collection in collections">
                    <Collection
                      :key="collection.id"
                      :collection="collection"
                      @nameChange="prefetch"
                      @collectionDelete="prefetch"
                      @getCollections="prefetch"
                      @permission-updated="
                        onPermissionUpdated(collection, $event)
                      "
                    />
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Collection from '~/components/dam/AssetList/Collection'
import CollectionListingHeader from '~/components/dam/AssetList/CollectionListingHeader'

export default {
  components: {
    Collection,
    CollectionListingHeader,
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'check-if-suspended',
    'can-access-dam-module',
  ],
  data() {
    return {
      collections: [],
      loading: false,
      sortOrder: 'DESC',
      sortBy: 'updated_at',
    }
  },
  mounted() {
    this.$bus.$on('collectionUpdate', () => {
      this.prefetch()
    })
    this.getCollections()
  },
  methods: {
    sortCollections(field) {
      if (this.sortBy === field) {
        this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC'
      } else this.sortOrder = 'DESC'
      this.sortBy = field
      this.getCollections()
    },
    onPermissionUpdated(collection, permission) {
      let _collection = this.collections.find((e) => e.id === collection.id)
      if (!_collection) return
      _collection = JSON.parse(JSON.stringify(_collection))
      if (permission.type === 'group') {
        _collection.groups = permission.value
      } else _collection.permission = permission.value
      _collection.permission_type = permission.type
      this.collections.splice(
        this.collections.findIndex((e) => e.id === collection.id),
        1,
        _collection
      )
    },
    prefetch() {
      this.getCollections()
    },
    async getCollections() {
      if (this.loading) return
      this.loading = true
      const body = {
        sort_value: this.sortBy,
        sort_by: this.sortOrder,
        workspace_id: this.$getWorkspaceId(),
      }
      await this.$axios
        .$get(`digital-assets/collection/get-all`, {
          params: body,
        })
        .then((response) => {
          if (response.data?.length === 0) {
            this.$router.replace({
              name: 'workspace_id-dam',
              params: { workspace_id: this.$getWorkspaceId() },
            })
          }
          this.collections = response.data
          this.loading = false
        })
        .catch((error) =>
          this.$toast.global.error(this.$getErrorMessage(error))
        )
    },
  },
}
</script>
