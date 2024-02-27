<template>
  <li :class="{ active: activeVersion }">
    <div class="media">
      <div class="media-left">
        <strong>{{ assetData.version }}</strong>
      </div>
      <div class="media-body">
        <h4 v-if="activeVersion">Current Version</h4>
        <p>{{ assetData.created_by }}</p>
        <span
          >{{ $moment(assetData.created_at).format('Do, MMM YYYY') }} -
          {{ $toHumanlySize(assetData.file_size) }}</span
        >
      </div>
    </div>
    <div class="dropdown more-options">
      <button type="button" class="dropdown-toggle" data-toggle="dropdown">
        <svg
          id="Layer_1"
          class="menu-option-icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4482" transform="translate(-872 -801)">
            <rect
              id="Rectangle_3020"
              x="872"
              y="801"
              class="fill-hide"
              width="18"
              height="18"
            ></rect>
            <g id="Group_4348" transform="translate(588.166 653.684)">
              <circle
                id="Ellipse_203"
                class="fill-color"
                cx="292.8"
                cy="148.9"
                r="1.5"
              ></circle>
              <circle
                id="Ellipse_203-2"
                class="fill-color"
                cx="292.8"
                cy="163.8"
                r="1.5"
              ></circle>
              <circle
                id="Ellipse_203-3"
                class="fill-color"
                cx="292.8"
                cy="156.3"
                r="1.5"
              ></circle>
            </g>
          </g>
        </svg>
      </button>
      <ul class="dropdown-menu">
        <li v-if="versionListData && currentVersion">
          <a
            class="dropdown-item"
            href="javascript:void(0);"
            @click="previewAsset"
          >
            <span class="dropdown-item-icon">
              <svg
                id="Layer_1"
                class="preview-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 17.9 15.1"
                xml:space="preserve"
              >
                <path
                  id="Path_38017"
                  class="fill-color"
                  d="M0.8,4.4C0.3,4.4,0,4.1,0,3.6V2.2C0,1,1,0,2.2,0l0,0h1.4C4,0,4.4,0.3,4.4,0.7S4.1,1.5,3.7,1.5c0,0,0,0-0.1,0H2.2c-0.4,0-0.7,0.3-0.7,0.7v1.4C1.5,4.1,1.2,4.4,0.8,4.4z"
                />
                <path
                  id="Path_38018"
                  class="fill-color"
                  d="M17.1,4.4c-0.4,0-0.8-0.3-0.8-0.8V2.2c0-0.4-0.3-0.7-0.7-0.7h-1.4c-0.4,0-0.8-0.4-0.7-0.8c0-0.4,0.4-0.7,0.8-0.7h1.4c1.2,0,2.2,1,2.2,2.2l0,0v1.4C17.9,4.1,17.6,4.4,17.1,4.4L17.1,4.4z"
                />
                <path
                  id="Path_38021"
                  class="fill-color"
                  d="M9,4.3L9,4.3c0.5,0,1,0.1,1.5,0.2c1.4,0.4,2.5,1.4,3.1,2.8c0.1,0.2,0.1,0.4,0,0.7c-0.7,1.8-2.5,3-4.4,3H9l0,0l0,0l0,0c-2,0-3.7-1.2-4.4-3c-0.1-0.2-0.1-0.4,0-0.6C5.2,5.5,7,4.3,9,4.3 M9,2.9c-2.7,0-5.3,1.8-6.1,4.5c0,0.1-0.1,0.2,0,0.4c0.7,2.7,3.2,4.5,5.9,4.5c0.1,0,0.1,0,0.2,0s0.1,0,0.2,0c2.8,0,5.2-1.8,5.9-4.5c0-0.1,0.1-0.2,0-0.4c-0.6-2-2.2-3.6-4.2-4.2C10.2,3,9.5,2.9,9,2.9L9,2.9z"
                />
                <path
                  id="Path_38022"
                  class="fill-color"
                  d="M9,6.3c-0.7,0-1.3,0.6-1.3,1.3S8.3,8.9,9,8.9s1.3-0.6,1.3-1.3C10.3,6.8,9.6,6.3,9,6.3z"
                />
                <g>
                  <path
                    id="Path_38017_1_"
                    class="fill-color"
                    d="M1.5,11.5v1.4c0,0.4,0.3,0.7,0.7,0.7h1.4c0.1,0,0.1,0,0.1,0c0.4,0,0.7,0.4,0.7,0.8S4,15.1,3.6,15.1H2.2l0,0c-1.2,0-2.2-1-2.2-2.2v-1.4c0-0.5,0.3-0.8,0.8-0.8C1.2,10.7,1.5,11,1.5,11.5z"
                  />
                  <path
                    id="Path_38018_1_"
                    class="fill-color"
                    d="M17.1,10.7c0.5,0,0.8,0.3,0.8,0.8v1.4l0,0c0,1.2-1,2.2-2.2,2.2h-1.4c-0.4,0-0.8-0.3-0.8-0.7c-0.1-0.4,0.3-0.8,0.7-0.8h1.4c0.4,0,0.7-0.3,0.7-0.7v-1.4C16.3,11,16.7,10.7,17.1,10.7L17.1,10.7z"
                  />
                </g>
              </svg>
            </span>
            Preview
          </a>
        </li>
        <li>
          <a
            class="dropdown-item"
            href="javascript:void(0);"
            @click="downloadVersion(assetData.id)"
          >
            <span class="dropdown-item-icon">
              <svg
                id="Layer_1"
                class="download-icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g id="Group_4359" transform="translate(-153.745 -317.549)">
                  <path
                    id="Path_3427"
                    class="fill-color"
                    d="M156.4,335.5c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H156.4z"
                  ></path>
                  <path
                    id="Path_3428"
                    class="fill-color"
                    d="M157.6,325.3c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l4,4l4-4c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.1,5.1L157.6,325.3z"
                  ></path>
                  <path
                    id="Path_3429"
                    class="fill-color"
                    d="M162.7,330.1c-0.4,0-0.8-0.4-0.8-0.8v-11c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8c0,0,0,0,0,0.1v11C163.5,329.7,163.2,330.1,162.7,330.1z"
                  ></path>
                </g>
              </svg>
            </span>
            Download
          </a>
        </li>
        <li v-if="versionListData && currentVersion">
          <a
            class="dropdown-item"
            :class="{ noClick: !onHold }"
            href="javascript:void(0);"
            @click="makeCurrent(assetData.id)"
          >
            <span class="dropdown-item-icon">
              <svg
                id="Layer_1"
                class="make-current"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 18 18"
                xml:space="preserve"
              >
                <g>
                  <path
                    id="Path_3427"
                    class="fill-color"
                    d="M2.6,18C1.2,18,0,16.8,0,15.4v-3.7C0,11.3,0.4,11,0.8,11c0.4,0,0.7,0.3,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H2.6z"
                  />
                  <g>
                    <path
                      id="Path_3428"
                      class="fill-color"
                      d="M14.1,5.1c0.3,0.3,0.3,0.8,0,1.1c-0.3,0.3-0.8,0.3-1.1,0l-4-4l-4,4c-0.3,0.3-0.8,0.3-1.1,0s-0.3-0.8,0-1.1L9,0L14.1,5.1z"
                    />
                    <path
                      id="Path_3429"
                      class="fill-color"
                      d="M9,0.3c0.4,0,0.8,0.4,0.8,0.8v11c0,0.4-0.3,0.8-0.8,0.8c-0.4,0-0.8-0.3-0.8-0.8c0,0,0,0,0-0.1v-11C8.2,0.6,8.6,0.3,9,0.3z"
                    />
                  </g>
                </g>
              </svg>
            </span>
            Make Current
          </a>
        </li>
        <li>
          <a
            class="dropdown-item"
            :class="{ noClick: !onHold }"
            href="javascript:void(0);"
            @click="deleteDialog"
          >
            <span class="dropdown-item-icon">
              <svg
                id="Layer_1"
                class="delete-icon"
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
            </span>
            Delete
          </a>
        </li>
      </ul>
    </div>

    <client-only>
      <DeleteDialog
        ref="deleteDialog"
        @button:yes="deleteVersion(assetData.id, assetData.asset_id)"
      >
        Are you sure you want to delete version
        <strong>{{ assetData.version }}</strong
        >?
      </DeleteDialog>

      <PreviewDialog ref="previewDialog" :asset-preview="assetData">
      </PreviewDialog>
    </client-only>
  </li>
</template>

<script>
import DeleteDialog from '~/components/plugins/DeleteDialog'
import PreviewDialog from '~/components/dam/Dialogs/PreviewDialog'

export default {
  components: {
    DeleteDialog,
    PreviewDialog,
  },
  props: {
    assetData: { type: Object, required: true },
    versionList: { type: Number, required: true },
    fileVersionId: { type: Number, required: true },
    fileVersion: { type: Number, required: true },
    onHold: { type: Boolean, required: true },
  },
  computed: {
    assetVersionAllowed() {
      return !!this.$auth.user?.subscription_features?.asset_versioning?.enable
    },
    currentVersion() {
      return parseInt(this.assetData.version.substring(1)) !== this.fileVersion
    },
    versionListData() {
      return this.versionList > 1
    },
    activeVersion() {
      return (
        this.fileVersionId === this.assetData.id || this.fileVersionId === null
      )
    },
  },
  methods: {
    previewAsset() {
      if (!this.assetVersionAllowed) return
      this.$emit('holdService')
      this.$refs.previewDialog.show()
    },
    makeCurrent(selectedVersion) {
      if (!this.assetVersionAllowed) return
      this.$emit('makeCurrent', selectedVersion)
    },
    downloadVersion(selectedVersion) {
      if (!this.assetVersionAllowed) return
      this.$downloadAsset(
        'Version Asset',
        selectedVersion,
        null,
        this.$route.params.workspace_id
      )
    },
    deleteDialog() {
      if (!this.assetVersionAllowed) return
      this.$refs.deleteDialog.show()
    },
    async deleteVersion(selectedVersion, assetId) {
      if (!this.assetVersionAllowed) return
      if (this.versionListData) {
        await this.$axios
          .$delete(`digital-assets/version/${selectedVersion}/remove`, {
            params: {
              current_version: this.activeVersion,
              asset_id: assetId,
            },
          })
          .then((response) => {
            this.$emit('closeVersionUpload')
            this.$toast.global.success(response.message)
            this.$emit('VersionDeleted')
          })
      } else {
        this.$emit('assetDelete')
      }
    },
  },
}
</script>

<style>
a.noClick {
  pointer-events: none;
  opacity: 0.5;
}
</style>
