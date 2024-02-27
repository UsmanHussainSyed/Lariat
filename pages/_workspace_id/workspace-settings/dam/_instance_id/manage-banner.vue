<template>
  <div
    class="general-settings-right h-100 position-relative"
    :class="{ 'warning-massage': !globalNotification }"
  >
    <div v-if="!subscriptionFetched" class="overlay">
      <div class="loader"></div>
    </div>
    <template v-else-if="!bannerEnabled">
      <img
        :src="require('~/assets/img/blurred-images/banner.png')"
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
          <NewBannerItem
            ref="newBannerItem"
            :edit="edit"
            @new-banner="newBanner"
          />

          <EditBanner
            v-if="edit"
            ref="editBanner"
            edit
            @closeEdit="edit = !edit"
            @updateBanner="updateBanner"
          />
          <div
            class="d-flex align-items-center justify-content-between mb20 pl10 pr10"
          >
            <h4>Banner List</h4>
          </div>
          <div class="common-box bg-gray h-auto">
            <div
              v-if="banners.length"
              class="table-list-view banner-list-structure"
            >
              <ul class="thead">
                <li>
                  <div class="preview-head"></div>
                  <div class="title-head sorting">
                    <span>Banner Title</span>
                  </div>
                  <div class="tile-desc sorting">
                    <span>Banner Overlay Text</span>
                  </div>
                  <div class="head-url sorting">
                    <span>Banner URL</span>
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
                :key="dragKey"
                v-model="banners"
                handle=".drag-handler"
              >
                <transition-group
                  v-if="loadBanner"
                  tag="ul"
                  class="tbody"
                  name="slide"
                >
                  <BannerItem
                    v-for="banner in banners"
                    :key="banner.id"
                    :banner="banner"
                    @update:banner="Object.assign(banner, $event)"
                    @removeMe="
                      deleteBannerObject = banner
                      $nextTick(() => $refs.deleteDialog.show())
                    "
                    @editBanner="editBanner"
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

                <p>
                  You don't have any banner.
                  <!--
                <br />
                <button
                  class="btn btn-icon btn-icon-reverse"
                  @click="$refs.newBannerItem.selectFile()"
                >
                  Upload Banner
                </button> -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <client-only>
        <DeleteDialog ref="deleteDialog" @button:yes="deleteBanner">
          Are you sure you want to delete this Banner?
        </DeleteDialog>
      </client-only>
    </template>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BannerItem from '~/components/dam/BannerItem'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import NewBannerItem from '~/components/dam/BannerItem/NewBannerItem'
import EditBanner from '~/components/dam/BannerItem/EditBanner'

export default {
  components: {
    draggable,
    BannerItem,
    DeleteDialog,
    NewBannerItem,
    EditBanner,
  },
  layout: 'generalSettingsLayout',
  middleware: ['authCheck', 'checkWorkspace', 'can-access-dam-settings'],
  data() {
    return {
      deleteBannerObject: null,
      edit: false,
      reorderMessage: false,
      loadBanner: false,
      editBannerData: false,
      dragKey: 0,
      subscriptionData: {},
      subscriptionFetched: false,
      banners: [],
    }
  },
  computed: {
    bannerEnabled() {
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
    banners() {
      this.reorder()
    },
  },
  created() {
    this.loadBanner = true
    this.$store.dispatch('dam/getNotifications')
  },
  async mounted() {
    await this.fetchSubscription()
    this.fetchBanners()
    this.$watch('$route.params.workspace_id', this.fetchSubscription, {
      deep: true,
      immediate: true,
    })
  },
  methods: {
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
    newBanner(banner) {
      if (!this.bannerEnabled) return
      this.banners.push(banner)
      this.editBannerData = true
      this.dragKey++
    },
    updateBanner(updatedBannerData) {
      if (!this.bannerEnabled) return
      this.banners = this.banners.map((item) => {
        if (updatedBannerData.id === item.id) {
          item = { ...updatedBannerData, position: item.position }
        }
        return item
      })
      this.editBannerData = true
      this.dragKey++
    },
    editBanner(bannerData) {
      if (!this.bannerEnabled) return
      this.edit = true
      this.$nextTick(() => {
        this.$refs.autoScroll.scrollTop = 0
        this.$refs.editBanner.editBanner(bannerData)
      })
    },
    deleteBanner() {
      if (!this.bannerEnabled) return
      const { workspace_id } = this.$route.params
      this.$axios
        .post('digital-assets/instance/banner/delete', {
          instance_id: this.instance_id,
          workspace_id: workspace_id || this.$getWorkspaceId(),
          id: [this.deleteBannerObject.id],
        })
        .then(({ data }) => {
          if (
            this.edit &&
            this.$refs.editBanner.banner.id === this.deleteBannerObject.id
          ) {
            this.edit = false
          }
          this.$toast.global.success(data.message)
          this.removeBanner(this.deleteBannerObject.id)
          this.deleteBannerObject = null
        })
        .catch(this.$errorToast)
      this.$nextTick(() => this.dragKey++)
    },
    removeBanner(bannerId) {
      if (!this.bannerEnabled) return
      this.banners = this.banners.filter(({ id }) => id !== bannerId)
      this.banners.forEach((banner, i) => (banner.position = i))
      this.editBannerData = true
      this.dragKey++
    },
    fetchBanners() {
      if (!this.bannerEnabled) return
      const { workspace_id, instance_id } = this.$route.params
      this.$axios
        .get(
          'digital-assets/instance/banner/all?' +
            this.$toQueryString({ workspace_id, instance_id })
        )
        .then(({ data }) => {
          this.banners = Array.isArray(data.data)
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
    reorder() {
      if (!this.bannerEnabled) return
      if (!this.banners.length) return
      this.loadBanner = false
      this.$axios
        .post('digital-assets/instance/banner/update-ordering', {
          order: this.banners.map(({ id }, index) => ({ id, index })),
          instance_id: this.$route.params.instance_id,
          workspace_id: this.$route.params.workspace_id,
        })
        .then(({ data }) => {
          this.banners.forEach((banner, i) => {
            banner.position = i
            return banner
          })
          this.loadBanner = true

          if (!this.editBannerData) {
            this.$toast.global.success(data.message)
          }

          this.editBannerData = false
        })
        .catch(this.$errorToast)
        .finally(() => this.dragKey++)
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
