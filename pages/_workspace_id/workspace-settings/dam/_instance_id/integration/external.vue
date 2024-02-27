<template>
  <div
    class="common-box bg-gray h-100 position-relative"
    :class="{ 'p-0': !externalIntegrationEnabled }"
  >
    <template v-if="!externalIntegrationEnabled">
      <img
        :src="require('~/assets/img/blurred-images/external-integration.png')"
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
      <div class="table-list-view banner-list-structure integration-list-view">
        <ul class="thead">
          <li>
            <div class="name-head sorting">
              <span>Name</span>
            </div>
            <div class="head-url sorting">
              <span>URL (Website)</span>
            </div>
            <div class="head-url sorting">
              <span>Secret Key</span>
            </div>
            <div class="head-url sorting">
              <span>App Key</span>
            </div>
            <div class="turn-head sorting">
              <span>Enable/Disable</span>
            </div>
            <div class="action-head sorting">
              <span>Action</span>
            </div>
          </li>
        </ul>
        <div class="customscrollbar no_footer">
          <div
            v-if="loading"
            style="margin: auto; overflow: hidden; width: 97%"
            class="pb-3"
          >
            <ContentLoader
              :speed="1"
              :animate="true"
              :width="450"
              :height="200"
              class="normalLoader"
            >
              <rect x="0" y="7" rx="4" ry="4" width="450" height="40" />
              <rect x="0" y="53" rx="4" ry="4" width="450" height="40" />
              <rect x="0" y="99" rx="4" ry="4" width="450" height="40" />
              <!-- <rect x="0" y="145" rx="4" ry="4" width="450" height="40" /> -->
            </ContentLoader>
          </div>
          <ul v-else class="tbody">
            <template v-if="!externalList.length">
              <div key="no-data" class="no-data-found">
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

                  <p class="my-3">No Data Found</p>
                </div>
              </div>
            </template>
            <template v-else>
              <li v-for="externalData in externalList" :key="externalData.id">
                <div class="banner-box">
                  <div class="banner-title">
                    <label>{{ externalData.name }}</label>
                  </div>
                  <div class="head-url">
                    <a target="_blank" :href="remoteUrl(externalData.url)">{{
                      externalData.url
                    }}</a>
                  </div>
                  <div class="head-url">
                    <div class="externalKey">
                      <label>{{ externalData.secrete }}</label>
                      <svg
                        id="Layer_1"
                        v-clipboard="() => externalData.secrete"
                        v-clipboard:success="
                          () =>
                            $toast.global.success(
                              'Secret key copied successfully.'
                            )
                        "
                        v-clipboard:error="
                          () => $toast.global.error(`Oops, couldn't copy.`)
                        "
                        v-tooltip="'Copy Secret Key'"
                        class="copy-link-icon h-orange"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 12 12"
                        xml:space="preserve"
                      >
                        <g
                          id="Icon_ionic-ios-link"
                          transform="translate(-3.375 -3.375)"
                        >
                          <path
                            id="Path_3757"
                            class="fill-color"
                            d="M10.1,11.9L10.1,11.9c-0.1,0-0.2,0.1-0.3,0.1l-1.9,1.9c-0.8,0.8-2.2,0.8-3,0s-0.8-2.2,0-3l0,0l2-2C7,8.8,7.1,8.7,7.2,8.6c0.1-0.1,0.3-0.2,0.4-0.2c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0c0,0,0.1,0,0.1,0c0.5,0,1,0.2,1.4,0.6c0.2,0.2,0.4,0.5,0.5,0.8c0.1,0.2,0.3,0.4,0.6,0.3h0h0c0.2-0.1,0.4-0.3,0.3-0.6c-0.1-0.5-0.4-0.9-0.7-1.2c-0.5-0.4-1-0.7-1.7-0.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3,0-0.5,0.1c0,0-0.1,0-0.1,0C7.4,7.5,7.2,7.6,7,7.7C6.7,7.8,6.5,8,6.2,8.2l-2,2c-0.6,0.6-0.9,1.3-0.9,2.2c0,1.7,1.4,3,3,3c0.8,0,1.6-0.3,2.1-0.9l1.9-1.9c0.2-0.2,0.2-0.5,0-0.6C10.3,11.9,10.2,11.8,10.1,11.9z"
                          ></path>
                          <path
                            id="Path_3758"
                            class="fill-color"
                            d="M14.5,4.3c-1.2-1.2-3.1-1.2-4.3,0L8.4,6.1c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l1.8-1.8c0.8-0.8,2.2-0.8,3,0.1c0.8,0.8,0.8,2.1,0,2.9l-2,2c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.1,0.1-0.3,0.1-0.4,0.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.1,0c-0.8,0-1.5-0.6-1.8-1.3C8.3,8.9,8.1,8.8,7.9,8.9C7.6,8.9,7.5,9.2,7.5,9.4c0,0,0,0,0,0c0.1,0.4,0.4,0.8,0.7,1.1l0,0l0,0c0.5,0.5,1.1,0.8,1.8,0.9c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.3-0.1,0.6-0.3,0.8-0.6l2-2C15.7,7.4,15.7,5.5,14.5,4.3L14.5,4.3z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div class="head-url">
                    <div class="externalKey">
                      <label>{{ externalData.key }}</label>
                      <svg
                        id="Layer_1"
                        v-clipboard="() => externalData.key"
                        v-clipboard:success="
                          () =>
                            $toast.global.success(
                              'App key copied successfully.'
                            )
                        "
                        v-clipboard:error="
                          () => $toast.global.error(`Oops, couldn't copy.`)
                        "
                        v-tooltip="'Copy App Key'"
                        class="copy-link-icon h-orange"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 12 12"
                        xml:space="preserve"
                      >
                        <g
                          id="Icon_ionic-ios-link"
                          transform="translate(-3.375 -3.375)"
                        >
                          <path
                            id="Path_3757"
                            class="fill-color"
                            d="M10.1,11.9L10.1,11.9c-0.1,0-0.2,0.1-0.3,0.1l-1.9,1.9c-0.8,0.8-2.2,0.8-3,0s-0.8-2.2,0-3l0,0l2-2C7,8.8,7.1,8.7,7.2,8.6c0.1-0.1,0.3-0.2,0.4-0.2c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0c0,0,0.1,0,0.1,0c0.5,0,1,0.2,1.4,0.6c0.2,0.2,0.4,0.5,0.5,0.8c0.1,0.2,0.3,0.4,0.6,0.3h0h0c0.2-0.1,0.4-0.3,0.3-0.6c-0.1-0.5-0.4-0.9-0.7-1.2c-0.5-0.4-1-0.7-1.7-0.8c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.3,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3,0-0.5,0.1c0,0-0.1,0-0.1,0C7.4,7.5,7.2,7.6,7,7.7C6.7,7.8,6.5,8,6.2,8.2l-2,2c-0.6,0.6-0.9,1.3-0.9,2.2c0,1.7,1.4,3,3,3c0.8,0,1.6-0.3,2.1-0.9l1.9-1.9c0.2-0.2,0.2-0.5,0-0.6C10.3,11.9,10.2,11.8,10.1,11.9z"
                          ></path>
                          <path
                            id="Path_3758"
                            class="fill-color"
                            d="M14.5,4.3c-1.2-1.2-3.1-1.2-4.3,0L8.4,6.1c-0.2,0.2-0.2,0.5,0,0.7c0.1,0.1,0.2,0.1,0.3,0.1c0.1,0,0.3,0,0.4-0.1l1.8-1.8c0.8-0.8,2.2-0.8,3,0.1c0.8,0.8,0.8,2.1,0,2.9l-2,2c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.2-0.4,0.2c-0.1,0.1-0.3,0.1-0.4,0.1c-0.1,0-0.2,0-0.3,0c0,0-0.1,0-0.1,0c-0.8,0-1.5-0.6-1.8-1.3C8.3,8.9,8.1,8.8,7.9,8.9C7.6,8.9,7.5,9.2,7.5,9.4c0,0,0,0,0,0c0.1,0.4,0.4,0.8,0.7,1.1l0,0l0,0c0.5,0.5,1.1,0.8,1.8,0.9c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.2,0c0.2,0,0.4,0,0.6-0.1c0.2-0.1,0.4-0.1,0.6-0.2c0.3-0.1,0.6-0.3,0.8-0.6l2-2C15.7,7.4,15.7,5.5,14.5,4.3L14.5,4.3z"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div class="turn-head">
                    <label class="label-switch">
                      <input
                        id="detailView"
                        v-model="externalData.is_active"
                        type="checkbox"
                        class="switch"
                        name="detail-view"
                        @change="changeStatus(externalData)"
                      />
                      <span class="lable"></span>
                    </label>
                  </div>
                  <div class="action-head">
                    <a
                      v-tooltip="{
                        html: false,
                        content: 'Delete Integration',
                      }"
                      data-toggle="modal"
                      data-target="#delete-external"
                      @click="showDeleteTypeDialog(externalData)"
                    >
                      <svg
                        id="Layer_1"
                        class="delete-icon h-orange"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 15.3 18"
                        xml:space="preserve"
                      >
                        <g
                          id="Group_4351"
                          transform="translate(-443.472 -147.331)"
                        >
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
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <ConfirmationDialog
        v-model="singleDeleteDialog"
        @click:confirm-button="deleteIntegration(externalDeleteData.id)"
      >
        <template slot="header">Delete External Integration?</template>

        Are you sure you want to delete external integration of
        <b>{{ externalDeleteData.name }}</b> ?
      </ConfirmationDialog>
    </template>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'

export default {
  components: {
    ConfirmationDialog,
    ContentLoader,
  },
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-settings',
    ({ redirect, params, query }) => {
      return redirect({
        name: 'workspace_id-workspace-settings-dam-instance_id-integration',
        params,
        query,
      })
    },
  ],
  data() {
    return {
      loading: false,
      externalList: [],
      singleDeleteDialog: false,
      externalDeleteData: {},
    }
  },
  computed: {
    externalIntegrationEnabled() {
      return !!this.$auth.user?.subscription_features
        .external_website_integration?.enable
    },
    remoteUrl() {
      return (url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) return url
        return 'http://' + url
      }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    // delete dialog of specific external integration
    showDeleteTypeDialog(externalData) {
      if (!this.externalIntegrationEnabled) return
      this.externalDeleteData = externalData
      this.$nextTick(() => (this.singleDeleteDialog = true))
    },
    // get external integration list
    async getList() {
      if (!this.externalIntegrationEnabled) return
      this.loading = true
      await this.$axios.$get(`get-app-secrete`).then(({ data }) => {
        this.externalList = data
        this.loading = false
      })
    },
    // change active status of specific external integration
    changeStatus(externalData) {
      if (!this.externalIntegrationEnabled) return
      this.$axios
        .$patch(`${externalData.id}/update-app-secrete`, {
          workspace_id: this.$getWorkspaceId(),
          is_active: Number(externalData.is_active),
        })
        .then((response) => {
          this.$toast.global.success(response.message)
        })
        .catch((error) => {
          this.$toast.global.error(this.$getErrorMessage(error))
        })
    },
    // delete specific external integration
    deleteIntegration(externalDataId) {
      if (!this.externalIntegrationEnabled) return
      this.$axios
        .$delete(`${externalDataId}/delete-app-secrete?`)
        .then((response) => {
          this.externalList = this.externalList.filter(
            ({ id }) => externalDataId !== id
          )
          this.$toast.global.success('App and Secret key deleted successfully.')
          this.externalDeleteData = {}
          this.$nextTick(() => (this.singleDeleteDialog = false))
        })
        .catch((error) => {
          this.$toast.global.error(this.$getErrorMessage(error))
        })
    },
  },
}
</script>
