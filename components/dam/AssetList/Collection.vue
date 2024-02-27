<template>
  <li>
    <div class="categary-name tb-column flex34">
      <div class="categary-image">
        <img :src="collection.preview_image" alt="" />
      </div>
      <div class="top-column" :class="{ editmode: edit }">
        <label
          v-if="!edit"
          style="cursor: pointer"
          @click.capture.stop="collectionDetails"
          >{{ collectionName }}</label
        >
        <span class="edit-name" @click="edit = !edit">
          <img v-if="renaming" src="~/assets/img/loading.gif" width="16" alt />
          <svg
            v-else
            id="Layer_1"
            class="edit-icon h-orange"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
          >
            <g id="Group_4350" transform="translate(-397.961 -147.331)">
              <path
                id="Path_3408"
                class="fill-color"
                d="M400.4,165.3c-1.3,0-2.4-1.1-2.4-2.4v-11.4c0-1.3,1.1-2.4,2.4-2.4h5.7c0.4,0,0.8,0.4,0.8,0.8c0,0.4-0.4,0.8-0.8,0.8h-5.7c-0.5,0-0.8,0.4-0.9,0.8v11.4c0,0.5,0.4,0.8,0.9,0.9h11.4c0.5,0,0.8-0.4,0.9-0.9v-5.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v5.7c0,1.3-1.1,2.4-2.4,2.4L400.4,165.3z"
              />
              <path
                id="Path_3409"
                class="fill-color"
                d="M403.6,160.4c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.2-0.3-0.5-0.2-0.7l0.8-3.3c0-0.1,0.1-0.3,0.2-0.4l7.8-7.8c1-1,2.6-1,3.6,0c1,1,1,2.6,0,3.5l-7.8,7.8c-0.1,0.1-0.2,0.2-0.4,0.2l-3.3,0.8C403.8,160.4,403.7,160.4,403.6,160.4zM413.4,148.9c-0.3,0-0.5,0.1-0.7,0.3l-7.6,7.6l-0.4,1.8l1.8-0.4l7.6-7.6c0.4-0.4,0.4-1,0-1.3C413.9,149,413.7,148.9,413.4,148.9L413.4,148.9z"
              />
            </g>
          </svg>
        </span>
        <svg
          v-if="collection.permission_type !== 'public'"
          id="_x31__x2C_5"
          v-tooltip="
            collection.permission_type === 'group'
              ? 'Restricted to specific groups'
              : collection.permission_type === 'user' &&
                collection.permission === 'all'
              ? 'Restricted to frontend users'
              : 'Restricted to specific users'
          "
          class="locked-icon"
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
        <input
          ref="input"
          v-model="collectionName"
          :disabled="!!renaming"
          autofocus
          autocomplete="off"
          type="text"
          name="coll-name"
          class="form-control"
          @keyup.enter="changeCollectionName()"
          @keyup.esc="changeCollectionName(1)"
          @blur="changeCollectionName(1)"
        />
      </div>
    </div>
    <div
      class="collection-description tb-column flex26"
      @click.capture.stop="$refs.descDialog.show()"
    >
      <div class="top-column">
        <label
          v-if="collection.description !== null"
          data-toggle="modal"
          data-target="#collection-description-modal"
          >{{ collection.description }}</label
        >
        <a
          v-else
          data-toggle="modal"
          data-target="#collection-description-modal"
          >+ Add Collection Description</a
        >
      </div>
    </div>
    <div class="assets tb-column flex12">
      <div class="top-column">
        <label>
          {{ $moment(collection.updated_at).format('Do MMM, YYYY') }}</label
        >
      </div>
    </div>
    <div class="update-date tb-column flex12">
      <div class="top-column">
        <label>{{ collection.user ? collection.user.name : '-' }}</label>
      </div>
    </div>
    <div class="size tb-column flex8">
      <div class="top-column">
        <label>{{ collection.assets_count }}</label>
      </div>
    </div>
    <div class="categary-action tb-column flex8">
      <div class="top-column">
        <div class="categary-actions text-center">
          <a
            data-toggle="modal"
            data-target="#sharePopup"
            :class="{ isEmpty: collection.assets_count === 0 }"
            @click.capture.stop="shareCollection"
          >
            <svg
              id="Layer_1"
              v-tooltip="{
                html: false,
                content: isEmpty,
              }"
              class="share-icon h-orange"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Group_4473" transform="translate(-871 -230)">
                <rect
                  id="Rectangle_3012"
                  x="871"
                  y="230"
                  class="fill-hide"
                  width="18"
                  height="18"
                ></rect>
                <path
                  id="Icon_open-share"
                  class="fill-color"
                  d="M883.9,234.4l3.2,3.1l-3.2,3.4v-2.3h-3.8c-2.1,0-4.3,0.5-6.1,1.6c1.4-2,3.9-3.2,8.4-3.2h1.5L883.9,234.4 M883.1,231.8c-0.4,0-0.7,0.3-0.7,0.7c0,0,0,0,0,0v3c-8.8,0-11.2,4.3-11.4,10.6c0,0.1,0,0.1,0.1,0.1c0.1,0,0.1,0,0.1-0.1c1.4-4,4.6-6,8.9-6h2.3v2.9c0,0.4,0.3,0.7,0.7,0.7c0,0,0,0,0,0c0.2,0,0.4-0.1,0.5-0.2l5.2-5.5c0.3-0.3,0.2-0.7,0-1c0,0,0,0,0,0l-5.2-4.9C883.4,231.9,883.3,231.8,883.1,231.8L883.1,231.8z"
                ></path>
              </g>
            </svg>
          </a>
          <a
            data-toggle="modal"
            data-target="#delete"
            @click.capture.stop="$refs.deleteDialog.show()"
          >
            <svg
              id="Layer_1"
              v-tooltip="{
                html: false,
                content: 'Delete collection',
              }"
              class="delete-icon h-orange"
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
          </a>
          <a
            v-tooltip="
              canUpdatePermission
                ? 'Collection Permissions'
                : 'Please upgrade your subscription plan to enable this feature.'
            "
            :style="canUpdatePermission ? '' : 'opacity:0.4;cursor:not-allowed'"
            @click.capture.stop="
              canUpdatePermission && $refs.permissionDialog.show()
            "
          >
            <svg
              id="Layer_1"
              class="permission-icon h-orange"
              data-toggle="tooltip"
              title=""
              data-original-title="Permission Collection"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="Permission">
                <g id="key" transform="translate(-2.767 -2.751)">
                  <path
                    id="Path_40238"
                    class="fill-color"
                    d="M14.6,2.8c-3.4,0-6.2,2.8-6.2,6.2c0,0.7,0.1,1.5,0.4,2.2L3,17c-0.1,0.1-0.2,0.3-0.2,0.5v2.6c0,0.4,0.3,0.7,0.7,0.7h4.1c0.4,0,0.7-0.3,0.7-0.7v-1.6h1.6c0.4,0,0.7-0.3,0.7-0.7v-1.7h2c0.4,0,0.7-0.3,0.7-0.7v-0.6c3.3,0.8,6.6-1.2,7.5-4.5c0.8-3.3-1.2-6.6-4.5-7.5C15.6,2.8,15.1,2.8,14.6,2.8z M9.8,8.9c0-2.7,2.2-4.8,4.8-4.8c2.7,0,4.8,2.2,4.8,4.8s-2.2,4.8-4.8,4.8c-0.6,0-1.3-0.1-1.9-0.4c-0.3-0.1-0.7,0-0.9,0.4c0,0.1-0.1,0.2-0.1,0.3v0.8h-2c-0.4,0-0.7,0.3-0.7,0.7v1.7H7.6c-0.4,0-0.7,0.3-0.7,0.7v1.6H4.1v-1.6l5.8-5.9c0.3-0.3,0.4-0.7,0.1-1.1C9.9,10.2,9.8,9.6,9.8,8.9L9.8,8.9z M15.8,5.3c-1.4,0-2.4,1.1-2.4,2.5s1.1,2.4,2.5,2.4c1.4,0,2.4-1.1,2.4-2.5C18.2,6.4,17.1,5.3,15.8,5.3L15.8,5.3zM15.8,8.9c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1C16.9,8.4,16.4,8.9,15.8,8.9C15.8,8.9,15.8,8.9,15.8,8.9L15.8,8.9z"
                  ></path>
                </g>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <client-only>
      <ShareAssetDialog
        ref="shareDialog"
        :files="[collection]"
        collection
        type="folder"
      />
      <DeleteDialog ref="deleteDialog" @button:yes="deleteCollection">
        Are you sure to delete collection?
      </DeleteDialog>

      <DescriptionDialog
        ref="descDialog"
        :collection="collection"
        @getCollections="$emit('getCollections')"
      />
      <PermissionDialog
        ref="permissionDialog"
        :collection-id="collection.id"
        :permission="{
          value:
            collection.permission_type === 'group'
              ? collection.groups.map((e) => e.id).join(',')
              : collection.permission,
          type: collection.permission_type,
        }"
        @permission-updated="$emit('permission-updated', $event)"
      />
    </client-only>
  </li>
</template>

<script>
import ShareAssetDialog from '~/components/dam/Dialogs/ShareAssetDialog'
import DeleteDialog from '~/components/plugins/DeleteDialog'
import DescriptionDialog from '~/components/dam/Dialogs/DescriptionDialog'
import PermissionDialog from '~/components/dam/Dialogs/PermissionDialog'

export default {
  components: {
    ShareAssetDialog,
    DeleteDialog,
    DescriptionDialog,
    PermissionDialog,
  },
  props: {
    collection: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      edit: false,
      collectionName: this.collection.name,
      oldName: this.collection.name,
      renaming: false,
    }
  },
  computed: {
    isEmpty() {
      return this.collection.assets_count > 0
        ? 'Share Collection'
        : 'Collection is empty'
    },
    canUpdatePermission() {
      return !!this.$auth.user?.subscription_features
        ?.collection_permission_customisation?.enable
    },
  },
  watch: {
    edit(n) {
      if (n) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        }, 100)
      }
    },
  },
  methods: {
    shareCollection() {
      if (this.collection.assets_count > 0) {
        this.$refs.shareDialog.show()
      }
    },
    collectionDetails() {
      this.$router.push({
        name: 'workspace_id-dam-collection-id',
        params: {
          workspace_id: this.$getWorkspaceId(),
          id: this.collection.id,
        },
      })
    },
    deleteCollection() {
      this.$store
        .dispatch('dam/deleteCollection', this.collection.id)
        .then(() => {
          this.$emit('collectionDelete')
        })
    },
    async changeCollectionName(discard) {
      const collectionName = this.collectionName.trim()

      if (this.renaming) return
      if (discard) {
        this.collectionName = this.oldName
        this.edit = false
        this.renaming = false
        return
      }
      if (!collectionName.length) {
        this.$toast.global.error('The collection name is required.')
        return
      }

      if (collectionName === this.oldName) {
        this.edit = false
        this.renaming = false
        return
      }

      this.renaming = true
      await this.$axios
        .$post(`digital-assets/collection/update/${this.collection.id}`, {
          workspace_id: this.$getWorkspaceId(),
          name: collectionName,
          description: this.collection.description,
        })
        .then(({ data }) => {
          this.$toast.global.success('Collection renamed successfully.')
          this.oldName = this.collectionName.trim()
          this.collectionName = data.name
          this.edit = false
          this.$store
            .dispatch('dam/renameCollection', {
              oldCollection: this.collection,
              newName: collectionName,
            })
            .then(() => {
              this.$emit('nameChange')
            })
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.collectionName = this.oldName
        })
      this.renaming = false
    },
  },
}
</script>

<style scoped>
.isEmpty {
  opacity: 0.4;
}
</style>
