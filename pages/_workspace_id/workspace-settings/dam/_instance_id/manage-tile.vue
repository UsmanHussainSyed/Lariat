<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div class="overlay" v-if="!subscriptionFetched">
      <div class="loader"></div>
    </div>
    <template v-else-if="!tileEnabled">
      <img
        :src="require('~/assets/img/blurred-images/tile.png')"
        style="width: 100%"
      />
      <div class="common-overaly">
        <div class="common-modal">
          <div class="common-modal-header">
            <h5>Upgrade Plan</h5>
          </div>
          <div class="common-modal-body text-center">
            <p>
              You dont have access to use this feature. <br />Please upgrade
              your plan to access it By visiting your account from app.marketinghub.com
            </p>
            
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="!globalNotification" class="search-result mt1 pl10 pr10">
        <div class="alert alert-warning alert-dismissible">
          <button v-if="0" type="button" class="close" data-dismiss="alert">
            <svg
              id="Layer_1"
              class="close-icon h-red"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4358" transform="translate(-69.745 -317.549)">
                <path
                  id="Path_3424"
                  class="fill-color"
                  d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
                ></path>
                <path
                  id="Path_3425"
                  class="fill-color"
                  d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                ></path>
              </g>
            </svg>
          </button>
          Organization admin has disabled Email Notifications
        </div>
      </div>
      <div class="manage-banner h-100">
        <div ref="autoScroll" class="customscrollbar">
          <NewTile v-if="!edit" ref="newTile" @new-tile="newTile" />

          <EditTile
            v-if="edit"
            ref="editTile"
            edit
            @closeEdit="edit = !edit"
            @updateTile="updateTile"
          />
          <div
            class="d-flex align-items-center justify-content-between mb20 pl10 pr10"
          >
            <h4>Tile List</h4>
            <label class="label-switch">
              Slide
              <input
                v-model="isActive"
                type="checkbox"
                class="switch"
                name="tiles-slider"
                @change="changeStatus(isActive)"
              />
              <span class="lable"></span>
            </label>
          </div>
          <div class="common-box bg-gray h-auto">
            <div
              v-if="tiles.length"
              class="table-list-view banner-list-structure"
            >
              <ul class="thead">
                <li>
                  <div class="preview-head"></div>
                  <div class="title-head sorting">
                    <span>Tile Name</span>
                  </div>
                  <div class="head-url sorting">
                    <span>Tile URL</span>
                  </div>
                  <div class="turn-head sorting">
                    <span>Status</span>
                  </div>
                  <div class="action-head sorting">
                    <span>Action</span>
                  </div>
                </li>
              </ul>
              <draggable
                :key="draggableKey"
                v-model="tiles"
                handle=".drag-handler"
              >
                <transition-group
                  v-if="loadTile"
                  tag="ul"
                  class="tbody"
                  name="slide"
                >
                  <TileItem
                    v-for="(tile, index) in tiles"
                    :key="tile.id"
                    :tile="tile"
                    :index="index"
                    @update:tile="Object.assign(tile, $event)"
                    @removeMe="
                      deleteTileObject = tile
                      $nextTick(() => $refs.deleteDialog.show())
                    "
                    @editTile="editTile"
                    @activeTile="activeTile"
                  />
                </transition-group>
              </draggable>
            </div>
            <div v-else key="no-data" class="no-data-found">
              <div class="inner w-100">
                <svg
                  id="Layer_1"
                  class="no-record-icon darkgray"
                  style="height: 150px"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 131.3 156.8"
                  xml:space="preserve"
                >
                  <g id="Group_4457" transform="translate(-190.348 -177.624)">
                    <path
                      id="Path_3564"
                      class="fill-color"
                      d="M285.2,214.4c-1.5,0-2.6,1.2-2.6,2.6c0,1.5,1.2,2.6,2.6,2.6h4.4v4.4c0,1.5,1.2,2.6,2.6,2.6s2.6-1.2,2.6-2.6l0,0l0,0v-4.4h4.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-4.4V210c0-1.5-1.2-2.6-2.6-2.6s-2.6,1.2-2.6,2.6v4.4H285.2z"
                    />
                    <path
                      id="Path_3565"
                      class="fill-color"
                      d="M321.6,199.8c0.3-1.5-9.1-9.6-15.5-16.4c-3.9-3.7-7.4-9-9.5-3.1v15.5c0,3.8,3.1,6.8,6.8,6.8h12.8v95.1c0,0.9-0.7,1.6-1.6,1.6H227c-0.9,0-1.6-0.7-1.6-1.6V184.5c0-0.9,0.7-1.6,1.6-1.6h59.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0H227c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v8.1h-8.1c-3.8,0-6.8,3.1-6.8,6.8v113.2c0,3.8,3.1,6.8,6.8,6.8H285c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8v-8.1h8.1c3.8,0,6.8-3.1,6.8-6.8V200C321.7,199.9,321.7,199.9,321.6,199.8L321.6,199.8z M301.5,312.6c0,0.9-0.7,1.6-1.6,1.6h-65.2c-1.5,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6h51.8v8.1c0,0.9-0.7,1.6-1.6,1.6h-87.8c-0.9,0-1.6-0.7-1.6-1.6V214.3c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h10.4c1.5,0,2.6-1.2,2.6-2.6s-1.2-2.6-2.6-2.6l0,0h-10.4c-0.9,0-1.6-0.7-1.6-1.6V199.4c0-0.9,0.7-1.6,1.6-1.6h8.1v99.9c0,3.8,3.1,6.8,6.8,6.8h74.4L301.5,312.6L301.5,312.6z M303.5,197.3c-0.9,0-1.6-0.7-1.6-1.6v-9.1l10.7,10.7L303.5,197.3z"
                    />
                  </g>
                </svg>

                <p>You don't have any tile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <client-only>
        <DeleteDialog ref="deleteDialog" @button:yes="deleteTile">
          Are you sure you want to delete this Tile?
        </DeleteDialog>
      </client-only>
    </template>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TileItem from '~/components/dam/TileItem'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import NewTile from '~/components/dam/TileItem/NewTile'
import EditTile from '~/components/dam/TileItem/EditTile'

export default {
  components: {
    draggable,
    TileItem,
    DeleteDialog,
    NewTile,
    EditTile,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      deleteBannerObject: null,
      edit: false,
      reorderMessage: false,
      loadTile: false,
      isActive: this.$store.state.dam.damInstance?.is_slider,
      editTileData: false,
      editIsActive: false,
      draggableKey: 0,
      subscriptionData: {},
      subscriptionFetched: false,
      tiles: [],
    }
  },
  computed: {
    tileEnabled() {
      return (
        !this.subscriptionFetched ||
        !!this.subscriptionData?.features?.manage_banner_and_tiles?.enable
      )
    },
    globalNotification() {
      return this.$store.state.dam.notifications.notification_status
    },
  },
  watch: {
    tiles() {
      this.reorder()
    },
  },
  created() {
    this.loadTile = true
    this.$store.dispatch('dam/getNotifications')
  },
  async mounted() {
    await this.fetchSubscription()
    this.fetchTiles()
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  methods: {
    fetchTiles() {
      if (!this.tileEnabled) return
      const { workspace_id, instance_id } = this.$route.params
      this.$axios
        .get(
          'digital-assets/tile/list?' +
            this.$toQueryString({ workspace_id, instance_id })
        )
        .then(({ data }) => {
          this.tiles = Array.isArray(data.data)
            ? data.data.sort(({ position: a }, { position: b }) => a - b)
            : []
        })
        .catch(
          (e) =>
            e?.response?.data?.message !==
              'Please upgrade your plan to access this feature.' &&
            this.$toast.global.error(this.$getErrorMessage(e))
        )
    },
    fetchSubscription() {
      this.subscriptionFetched = false
      return this.$axios
        .$get('digital-assets/subscription/get')
        .then(({ data }) => (this.subscriptionData = data))
        .catch((e) => {
          this.subscriptionData = {}
        })
        .finally(() => {
          this.subscriptionFetched = true
        })
    },
    activeTile(id, isActive) {
      if (!this.tileEnabled) return
      this.tiles = this.tiles.map((item) => {
        if (item.id === id) {
          item.is_active = isActive
          this.editIsActive = true
        }
        return item
      })
    },
    newTile(tile) {
      if (!this.tileEnabled) return
      this.tiles.push(tile)
      this.editTileData = true
    },
    changeStatus(isActive) {
      if (!this.tileEnabled) return
      const { workspace_id, instance_id } = this.$route.params
      this.$axios
        .patch(`digital-assets/tile/update-slider-config`, {
          workspace_id: workspace_id || this.$getWorkspaceId(),
          instance_id,
          is_slider: Number(isActive),
        })
        .then(({ data }) => {
          this.$toast.global.success(data.message)
        })
    },
    updateTile(updatedTileData) {
      if (!this.tileEnabled) return
      this.tiles = this.tiles.map((item) => {
        if (updatedTileData.id === item.id) {
          item = updatedTileData
          this.editTileData = true
        }
        return item
      })
      this.draggableKey++
    },
    editTile(tileData) {
      if (!this.tileEnabled) return
      this.edit = true
      this.$nextTick(() => {
        this.$refs.autoScroll.scrollTop = 0
        this.$refs.editTile.editTile(JSON.parse(JSON.stringify(tileData)))
      })
    },
    deleteTile() {
      if (!this.tileEnabled) return
      this.$axios
        .$delete('digital-assets/tile/delete', {
          data: {
            instance_id: this.instance_id,
            workspace_id: this.workspace_id,
            id: [this.deleteTileObject.id],
          },
        })
        .then(({ message }) => {
          if (
            this.edit &&
            this.$refs.editTile.tile.id === this.deleteTileObject.id
          ) {
            this.edit = false
          }
          this.$toast.global.success(message)
          this.removeTile(this.deleteTileObject.id)
          this.deleteTileObject = null
        })
        .catch(this.$errorToast)
    },
    removeTile(TileId) {
      if (!this.tileEnabled) return
      this.tiles = this.tiles.filter(({ id }) => id !== TileId)
      this.tiles.forEach((tile, i) => (tile.position = i))
      this.editTileData = true
    },
    reorder() {
      if (!this.tileEnabled) return
      if (!this.tiles.length || this.editIsActive) return
      this.loadTile = false
      this.$axios
        .patch('digital-assets/tile/update-order', {
          order: this.tiles.map(({ id }, index) => ({ id, index })),
          instance_id: this.instance_id,
          workspace_id: this.$route.params.workspace_id,
        })
        .then(({ data }) => {
          this.tiles.forEach((tile, i) => (tile.position = i))

          this.loadTile = true
          if (!this.editTileData) {
            this.$toast.global.success(data.message)
          }
        })
        .catch(this.$errorToast)
        .finally(() => {
          this.editTileData = false
          this.draggableKey++
        })
    },
  },
}
</script>
<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb33;
}

.overlay > .loader {
  border-left: 2px solid transparent;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-top: 2px solid #0c0c0c40;
  border-bottom: 2px solid #0c0c0c40;
  border-right: 2px solid transparent;
  animation: loader 0.5s linear infinite both;
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
