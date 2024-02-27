<template>
  <Model
    v-model="model"
    hide-buttons
    :model-footer="!shareUrl"
    :header-text="
      shareUrl ? 'Create Share Link' : `Share selected ${resourceType}`
    "
    content-class="bg-gray"
    :footer-class="'d-flex align-items-center justify-content-between'"
    modal-top-class="sharePopup"
    body-class="customscrollbar"
    :modal-share-url="shareUrl ? '' : 'sharePopup'"
    @shareModalReset="shareModalReset()"
  >
    <div v-if="shareUrl" class="search-folder mb-0 pr-4 pl-4">
      <div class="mt-3 align-items-center" style="display: flex">
        <div style="flex: 1; padding-right: 1rem">
          <input
            type="text"
            :value="shareUrl | normalizedUrl"
            class="form-control m-0"
            spellcheck="false"
            readonly
            onClick="this.setSelectionRange(0, this.value.length)"
          />
        </div>
        <div>
          <button
            v-clipboard="$options.filters.normalizedUrl(shareUrl)"
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
    </div>
    <!-- <div v-else class="search-folder mb-0">
      <ul class="pl-2 dam-share-file-list">
        <li v-for="folder in folders" :key="folder.id">
          <FolderIcon style="filter: brightness(0.5)" />
          <span class="file-name">
            <span v-tooltip="folder.folder_name || folder.category_name">
              {{ folder.folder_name || folder.category_name }}
            </span>
          </span>
        </li>
        <SharePreviewItem
          v-for="file in files"
          :key="file.id"
          :file="file"
          :collection="collection"
        />
      </ul>
    </div> -->

    <div v-else class="share-wrapper customscrollbar" style="min-height: 70px">
      <div
        v-for="folder in folders"
        :key="folder.id"
        class="share-box d-flex align-items-center"
      >
        <FolderIcon />
        <div class="share-name flex-80 pl-2">
          <label
            v-tooltip="{
              html: false,
              content: folder.folder_name || folder.category_name,
            }"
          >
            {{
              (folder.folder_name || folder.category_name)
                | shrinkString(46, 12)
            }}
          </label>
        </div>
        <svg
          v-if="folder.is_public === 1"
          id="_x31__x2C_5"
          v-tooltip="`Folder contains some private assets`"
          class="locked-icon h-orange"
          title=""
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          xml:space="preserve"
        >
          <path
            class="fill-color"
            d="M400,512H112c-26.5,0-48-21.5-48-48V240c0-26.5,21.5-48,48-48h288c26.5,0,48,21.5,48,48v224C448,490.5,426.5,512,400,512zM112,224c-8.8,0-16,7.2-16,16v224c0,8.8,7.2,16,16,16h288c8.8,0,16-7.2,16-16V240c0-8.8-7.2-16-16-16H112z"
          ></path>
          <path
            class="fill-color"
            d="M368,224c-8.8,0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96,43.1-96,96v80c0,8.8-7.2,16-16,16s-16-7.2-16-16v-80C128,57.4,185.4,0,256,0s128,57.4,128,128v80C384,216.8,376.8,224,368,224z"
          ></path>
          <path
            class="fill-color"
            d="M256,362.7c-23.5,0-42.7-19.1-42.7-42.7c0-23.5,19.1-42.7,42.7-42.7s42.7,19.1,42.7,42.7C298.7,343.5,279.5,362.7,256,362.7z M256,309.3c-5.9,0-10.7,4.8-10.7,10.7s4.8,10.7,10.7,10.7c5.9,0,10.7-4.8,10.7-10.7S261.9,309.3,256,309.3z"
          ></path>
          <path
            class="fill-color"
            d="M256,426.7c-8.8,0-16-7.2-16-16V352c0-8.8,7.2-16,16-16c8.8,0,16,7.2,16,16v58.7C272,419.5,264.8,426.7,256,426.7z"
          ></path>
        </svg>
      </div>
      <SharePreviewItem
        v-for="file in files"
        :key="file.id"
        :file="file"
        :collection="collection"
      />
    </div>
    <div v-if="isPrivate.length && !shareMessage && !collection" class="notes">
      <p>
        <strong>Note : </strong
        ><span
          v-if="
            isPrivate.length > 1 &&
            files.length > 1 &&
            isPrivate.length === files.length
          "
          >All the assets that you have selected are private assets, which are
          available for internal use only.</span
        >
        <span
          v-else-if="
            isPrivate.length > 1 || (isPrivate.length === 1 && files.length > 1)
          "
          >Some of the assets that you have selected are private assets, which
          are available for internal use only.</span
        >
        <span v-else-if="isPrivate.length === 1 && files.length === 1"
          >Selected asset is a private asset, which is available for internal
          use only.
        </span>
      </p>
    </div>
    <div
      v-if="isFolderPrivate.length && !shareMessage && !collection"
      class="notes"
    >
      <p>
        <strong>Note : </strong>
        <span
          v-if="
            isFolderPrivate.length > 1 &&
            folders.length > 1 &&
            isFolderPrivate.length === folders.length
          "
          >All the selected folder contains private assets, which are available
          for internal use only.</span
        >
        <span
          v-else-if="
            isFolderPrivate.length > 1 ||
            (isFolderPrivate.length === 1 && folders.length > 1)
          "
          >Some of the folders that you have selected contains private assets,
          which are available for internal use only.</span
        >
        <span v-else-if="isFolderPrivate.length === 1 && folders.length === 1"
          >Selected folder contains private assets, which are available for
          internal use only.</span
        >
      </p>
    </div>
    <div v-if="shareMessage" class="notes">
      <p>
        <strong>Note : </strong>Selection contains private assets, which are
        available for internal use only.
      </p>
    </div>
    <div v-if="collection && isPrivate.length" class="notes">
      <p>
        <strong>Note : </strong>Collection contains private assets, which are
        available for internal use only.
      </p>
    </div>
    <div v-if="!shareUrl" class="advance-share-option hidden">
      <p>Advance share options</p>
      <div class="form-group d-flex align-items-center">
        <span
          v-tooltip="
            !advancedShareAllowed
              ? 'Please upgrade your subscription plan to enable this feature.'
              : ''
          "
        >
          <label
            class="check-label mr1"
            :class="{ disabled: !advancedShareAllowed }"
          >
            Share Label
            <input
              v-model="is_share_title"
              type="checkbox"
              :disabled="!advancedShareAllowed"
            />
            <span class="check-span"></span>
          </label>
        </span>
        <div
          v-if="is_share_title && advancedShareAllowed"
          class="inputDiv label"
        >
          <input
            v-model="title"
            type="text"
            name="share-label"
            class="form-control"
            placeholder="Share label"
            :disabled="!advancedShareAllowed"
          />
        </div>
      </div>
      <div class="form-group d-flex align-items-center">
        <span
          v-tooltip="
            !advancedShareAllowed
              ? 'Please upgrade your subscription plan to enable this feature.'
              : ''
          "
        >
          <label
            class="check-label mr1"
            :class="{ disabled: !advancedShareAllowed }"
          >
            Note To Recipient
            <input
              v-model="is_share_description"
              type="checkbox"
              name=""
              :disabled="!advancedShareAllowed"
            />
            <span class="check-span"></span>
          </label>
        </span>
        <div
          v-if="is_share_description && advancedShareAllowed"
          class="inputDiv recipient"
        >
          <input
            v-model="description"
            type="text"
            name="recipient"
            class="form-control"
            placeholder="Enter a note for the share recipient"
            :disabled="!advancedShareAllowed"
          />
        </div>
      </div>
      <div class="form-group d-flex align-items-center">
        <span
          v-tooltip="
            !advancedShareAllowed
              ? 'Please upgrade your subscription plan to enable this feature.'
              : ''
          "
        >
          <label
            class="check-label mr1"
            :class="{ disabled: !advancedShareAllowed }"
          >
            Password Protect
            <input
              v-model="is_share_password"
              type="checkbox"
              name=""
              :disabled="!advancedShareAllowed"
            />
            <span class="check-span"></span>
          </label>
        </span>
        <div
          v-if="is_share_password && advancedShareAllowed"
          class="inputDiv password"
        >
          <input
            id="pin-field"
            v-model="password"
            type="password"
            name="password"
            class="form-control"
            placeholder="Enter a password"
            autocomplete="off"
            :disabled="!advancedShareAllowed"
          />
          <span toggle="#pin-field" class="toggle-pin fa fa-eye"></span>
        </div>
      </div>
      <div class="form-group d-flex align-items-center">
        <span
          v-tooltip="
            !advancedShareAllowed
              ? 'Please upgrade your subscription plan to enable this feature.'
              : ''
          "
        >
          <label
            class="check-label mr1"
            :class="{ disabled: !advancedShareAllowed }"
          >
            Set Expiration Date
            <input v-model="is_share_expirationDate" type="checkbox" name="" />
            <span class="check-span"></span>
          </label>
        </span>
        <div
          v-if="is_share_expirationDate && advancedShareAllowed"
          class="inputDiv date"
        >
          <DatePicker
            :placeholder="'Select a date'"
            :class-obj="'datepicker form-control'"
            :start-date.sync="expiration"
            :min-date="$moment().add('1', 'day').format('YYYY-MM-DD')"
          />
        </div>
      </div>
      <div class="form-group d-flex align-items-center">
        <span
          v-tooltip="
            !advancedShareAllowed
              ? 'Please upgrade your subscription plan to enable this feature.'
              : ''
          "
        >
          <label
            class="check-label mr1"
            :class="{ disabled: !advancedShareAllowed }"
          >
            Hide Download
            <input
              v-model="hide_download"
              type="checkbox"
              name=""
              value="download"
              :disabled="!advancedShareAllowed"
            />
            <span class="check-span"></span>
          </label>
        </span>
      </div>
    </div>

    <template v-if="!shareUrl" #footer>
      <a href="javascript:void(0);" class="shared-options"
        >Advance share option</a
      >
      <button
        type="button"
        class="btn"
        :class="{ 'btn-disabled': !creating }"
        :disabled="creating"
        @click="
          collection || collectionAssets
            ? createCollectionUrl()
            : createShareUrl()
        "
      >
        {{ creating ? 'Creating...' : 'Create link' }}
      </button>
    </template>
  </Model>
</template>

<script>
import SharePreviewItem from './SharePreviewItem'
import Model from '~/components/plugins/Model'
import damShareUrl from '~/mixins/damShareUrl'
import DatePicker from '~/components/plugins/DatePicker'

export default {
  components: { Model, SharePreviewItem, DatePicker },
  extends: Model,
  mixins: [damShareUrl],
  props: {
    files: { type: Array, default: () => [] },
    folders: { type: Array, default: () => [] },
    type: { type: String, required: true, default: 'file' },
    collection: { type: Boolean, default: false },
    collectionAssets: { type: Boolean, default: false },
    collectionAssetsId: { type: [Number, String], default: null },
  },
  data() {
    return {
      copied: false,
      shareUrl: null,
      creating: false,
      title: null,
      description: null,
      password: null,
      hide_download: 0,
      expiration: null,
      is_share_title: 0,
      is_share_description: 0,
      is_share_password: 0,
      is_share_expirationDate: 0,
    }
  },
  computed: {
    privateCustomizationAllowed() {
      return !!this.$auth.user?.subscription_features
        ?.public_and_private_asset_customisation?.enable
    },
    advancedShareAllowed() {
      return this.$auth.user?.subscription_features?.advance_share_management
        ?.enable
    },
    resourceType() {
      return this.files?.length && this.folders?.length
        ? 'assets'
        : this.files?.length
        ? this.files.length === 1
          ? 'file'
          : 'files'
        : this.folders.length === 1
        ? 'folder'
        : 'folders'
    },
    isFolderPrivate() {
      let privateAssets = null
      privateAssets = this.folders.filter((item) => {
        return item.is_public === 1
      })
      return privateAssets
    },
    isPrivate() {
      let privateAssets = null
      privateAssets = this.files.filter((item) => {
        return item.is_public === 0
      })
      return privateAssets
    },
    shareMessage() {
      return this.isFolderPrivate.length >= 1 && this.isPrivate.length >= 1
    },
    totalFilesFoldersCount() {
      return this.files.length + this.folders.length
    },
  },
  watch: {
    files() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    folders() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    copied(copied) {
      if (copied)
        this.copyBtnResetTimer = setTimeout(() => (this.copied = false), 1500)
    },
  },
  destroyed() {
    if (this.copyBtnResetTimer) clearTimeout(this.copyBtnResetTimer)
  },
  methods: {
    async createCollectionUrl() {
      this.creating = true
      const params = {
        workspace_id: this.$getWorkspaceId(),
        id: this.collectionAssets ? this.collectionAssetsId : this.files[0].id,
        assets: this.collectionAssets ? this.files.map(({ id }) => id) : [],
      }
      if (this.advancedShareAllowed) {
        params.title = this.is_share_title ? this.title : null
        params.description = this.is_share_description ? this.description : null
        params.password = this.is_share_password ? this.password : null
        params.hide_download = this.hide_download === true ? 1 : 0
        params.expiration = this.is_share_expirationDate
          ? this.expiration
          : null
      }
      await this.$axios
        .$post(`digital-assets/collection/generate-share-url`, params)
        .then(({ data }) => {
          this.shareUrl = data.share_url
          this.shareModalReset()
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.creating = false
    },
    async createShareUrl() {
      this.creating = true
      const params = {
        workspace_id: this.$getWorkspaceId(),
        assets: this.files.map(({ id }) => id),
        category: this.folders.map(({ id }) => id),
      }
      if (this.advancedShareAllowed) {
        params.title = this.is_share_title ? this.title : null
        params.description = this.is_share_description ? this.description : null
        params.password = this.is_share_password ? this.password : null
        params.hide_download = this.hide_download === true ? 1 : 0
        params.expiration = this.is_share_expirationDate
          ? this.expiration
          : null
      }
      await this.$axios
        .$post('digital-assets/dashboard/generate-share-assets-url', params)
        .then(({ data }) => {
          this.shareUrl = data.share_url
          this.shareModalReset()
        })
        .catch((e) => this.$toast.global.error(this.$getErrorMessage(e)))

      this.creating = false
    },
    shareModalReset() {
      this.title = null
      this.description = null
      this.password = null
      this.hide_download = 0
      this.expiration = null
      this.is_share_title = 0
      this.is_share_description = 0
      this.is_share_password = 0
      this.is_share_expirationDate = 0
      if (!window.$('div').hasClass('hidden')) {
        window.$('.advance-share-option').toggleClass('hidden')
      }
    },
  },
}
</script>

<style>
.dam-share-file-list {
  max-height: 50vh;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

.dam-share-file-list li {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.dam-share-file-list li:not(:last-child) {
  padding-bottom: 0.25rem;
}

.dam-share-file-list li .file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  padding-left: 0.25rem;
}
.dam-share-file-list li > img,
.dam-share-file-list li > svg {
  height: 18px;
  width: 18px;
  margin-right: 0.5rem;
  object-fit: contain;
}
.copy-button {
  transition: 250ms ease-in-out;
  background-color: #0000 !important;
  border-color: #ff8a01 !important;
  color: #ff8a01;
}
.copy-button.copied {
  background-color: #ff8a01 !important;
  color: white !important;
}
</style>
