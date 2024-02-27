<template>
  <div class="uploaded-box">
    <div class="uploaded-left">
      <label :for="`uploaded-${file.id}`" class="check-label">
        <input
          :id="`uploaded-${file.id}`"
          type="checkbox"
          class="form-check-input"
          :checked="selected"
          :disabled="disableAllButton"
          hidden
          @input="!disableAllButton && $emit('click:toggleSelection', file)"
        />
        <span class="check-span"></span>
      </label>
      <div class="uploaded-preview r43">
        <img :src="file.thumbnail_file || previewImage" @error="errorHandle" />
      </div>
      <div class="uploaded-content">
        <div class="editable__box editable-area">
          <label class="editable__label">
            <div class="editable__preview">
              {{ fileName }}
            </div>
            <input
              v-model="fileName"
              type="text"
              autocomplete="off"
              placeholder="File Name"
              class="editable__textarea"
              @blur="changeFileName"
              @keyup.enter="changeFileName"
            />
          </label>
        </div>
        <h6>
          <strong class="filetype">[{{ file.file_type }}]</strong>
          {{ $toHumanlySize(file.file_size) }}
        </h6>
      </div>

      <FileTagInput
        ref="tagInput"
        :name-id="fileName"
        :value="file.tags || []"
        :file-ids="[{ id: file.id, assets_version_id: file.assets_version_id }]"
        class="tag-add-box bg-white"
        :disabled="isFileBeingDeleted || selected || !tagManagementAllowed"
      />
    </div>
    <div class="uploaded-right">
      <div class="d-flex align-items-center justify-content-end">
        <label
          v-tooltip="
            privateCustomizationAllowed
              ? ''
              : 'Please upgrade your subscription plan to enable this feature.'
          "
          class="label-switch justify-content-end"
        >
          <span>Public</span
          ><i
            v-tooltip="{
              html: true,
              content: `<ul>
                          <li>
                              <strong>PUBLIC:</strong> This image can be used per the brand’s licensing guidelines and shared publicly as needed.
                           </li>
                           <li>
                              <strong>PRIVATE:</strong> This image is for internal use only and may require credit per the brand’s licensing guidelines and may not be shared without specific permissions.
                            </li>
                      </ul>`,
            }"
            class="fa fa-info-circle"
            aria-hidden="true"
          ></i>
          <input
            v-model="filePermission"
            type="checkbox"
            class="switch-onoff switch"
            name="detail-view"
            :disabled="!privateCustomizationAllowed"
            :style="privateCustomizationAllowed ? '' : 'pointer-events: none'"
            @change="
              privateCustomizationAllowed
                ? checkAssetPermission('permission')
                : ''
            "
          />
          <span
            class="lable"
            :style="privateCustomizationAllowed ? '' : 'opacity:0.4'"
          ></span>
        </label>
        <label class="label-switch justify-content-end">
          <span>Editorial Use Only</span
          ><i
            v-tooltip="
              'This image cannot be used for commercial advertising purposes.'
            "
            class="fa fa-info-circle"
            aria-hidden="true"
          ></i>
          <input
            v-model="editorial"
            type="checkbox"
            class="switch-onoff switch"
            name="editorial"
            @change="checkAssetPermission('editorial')"
          />
          <span class="lable"></span>
        </label>
      </div>
      <div v-if="(file.activeACL || []).length" class="access-control">
        <label
          v-for="access in file.activeACL"
          :key="access.id"
          class="label-switch justify-content-end"
        >
          <span>{{ access.name }}</span>
          <input
            :checked="access.is_active"
            type="checkbox"
            class="switch-onoff switch"
            @click.prevent.stop="changeStatus(access, $event)"
          />
          <span class="lable"></span>
        </label>
      </div>
      <template v-if="!selected">
        <div class="d-flex align-items-center justify-content-end pr1">
          <a
            v-if="!isFileBeingDeleted"
            class="btn btn-blue"
            :class="{ 'btn-disable': disableAllButton }"
            @click="!disableAllButton && $refs.moveDialog.show()"
          >
            Move
          </a>
          <a v-if="isFileBeingDeleted" disabled>
            <SpinLoading />
          </a>
          <a
            v-else
            :disabled="disableAllButton"
            @click="!disableAllButton && $refs.deleteDialog.show()"
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
              <g id="Group_4351" transform="translate(-443.472 -147.331)">
                <path
                  id="Path_3410"
                  class="fill-color"
                  d="M448.6,165.3c-1.2,0-2.3-0.9-2.4-2.1l-1.1-9.5c0-0.2,0-0.5,0.2-0.6c0.1-0.1,0.3-0.2,0.5-0.2h10.7c0.2,0,0.4,0.1,0.5,0.2c0.2,0.1,0.2,0.4,0.2,0.6l-0.9,9.5c-0.1,1.3-1.2,2.2-2.4,2.2L448.6,165.3z M447.7,163c0,0.4,0.4,0.7,0.8,0.7h5.3c0.5,0,0.8-0.3,0.9-0.8l0.8-8.6h-8.9L447.7,163z"
                />
                <path
                  id="Path_3411"
                  class="fill-color"
                  d="M457.9,151.7h-13.8c-0.4,0-0.7-0.4-0.7-0.9c0-0.4,0.4-0.7,0.8-0.7h4v-1.2c0-0.9,0.7-1.6,1.5-1.6h2.7c0.9,0,1.5,0.7,1.5,1.6c0,0,0,0,0,0v1.2h4.1c0.4,0,0.7,0.4,0.7,0.9C458.7,151.4,458.4,151.7,457.9,151.7L457.9,151.7z M452.4,150.1v-1.2l-2.7,0l0,1.2H452.4z"
                />
              </g>
            </svg>
          </a>
        </div>
      </template>
      <template v-else-if="multiDeleting">
        <a disabled>
          <SpinLoading />
        </a>
      </template>
    </div>

    <client-only>
      <DeleteDialog
        ref="deleteDialog"
        :header-text="`Delete ${$shrinkString(
          fileName + '.' + file.file_type,
          38,
          10
        )}?`"
        @button:yes="deleteFile"
      >
        Are you sure you want to delete this file?
      </DeleteDialog>
      <MoveFolderDialog
        ref="moveDialog"
        :files-to-move="[{ ...file, display_file_name: fileName }]"
        @moveUncatg="$emit('moveUncatg')"
      />
    </client-only>
  </div>
</template>

<script>
import fileType from '~/mixins/fileType'
export default {
  components: {
    MoveFolderDialog: () => import('~/components/dam/Dialogs/MoveFolderDialog'),
    DeleteDialog: () => import('~/components/plugins/DeleteDialog'),
    FileTagInput: () => import('~/components/dam/FileTagInput'),
  },
  mixins: [fileType],
  props: {
    file: { type: Object, required: true },
    multiDeleting: { type: Boolean, default: false },
    multiMoving: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    accessControlList: { type: Array, default: () => [] },
  },
  data() {
    return {
      fileName: this.file.display_file_name.replace(
        `.${this.file.file_type}`,
        ''
      ),
      oldName: this.file.display_file_name.replace(
        `.${this.file.file_type}`,
        ''
      ),
      deleteDialog: false,
      deleting: false,
      filePermission: this.file.is_public,
      editorial: this.file.is_editorial_use,
      changing: false,
    }
  },
  computed: {
    privateCustomizationAllowed() {
      return !!this.$auth.user?.subscription_features
        .public_and_private_asset_customisation?.enable
    },
    tagManagementAllowed() {
      return !!this.$auth.user?.subscription_features?.tag_management?.enable
    },
    isFileBeingDeleted() {
      return this.deleting || (this.multiDeleting && this.selected)
    },
    disableAllButton() {
      return this.multiMoving || this.multiDeleting || this.deleting
    },
  },
  watch: {
    file: {
      handler(n) {
        this.filePermission = this.privateCustomizationAllowed
          ? ~~n?.is_public
          : 1
        this.editorial = n?.is_editorial_use
      },
      deep: true,
    },
  },
  methods: {
    errorHandle(data) {
      try {
        data.target.src = require(`~/assets/img/file/${this.file.file_type.toLowerCase()}.svg`)
      } catch {
        data.target.src = require(`~/assets/img/file/general.svg`)
      }
    },
    changeStatus(accessData, e) {
      e.preventDefault()
      e.stopPropagation()
      const field_value = !accessData.is_active
        ? { add_permission: [accessData.id] }
        : { remove_permission: [accessData.id] }
      this.$axios
        .$post(`digital-assets/update-acl`, {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: [this.file.id],
          field_value,
        })
        .then((response) => {
          this.$toast.global.success(response.message)
          this.$emit('update-acl', {
            aclId: accessData.id,
            value: !accessData.is_active,
          })
        })
        .catch((error) => {
          this.$toast.global.success(error.message)
        })
    },
    checkAssetPermission(actionChange) {
      const data = {
        workspace_id: this.$getWorkspaceId(),
        digital_assets_id: this.file.id,
        field_name:
          actionChange === 'permission' ? 'is_public' : 'is_editorial_use',
        field_value:
          actionChange === 'permission' ? this.filePermission : this.editorial,
      }
      this.$axios
        .$post(`digital-assets/update-with-field`, data)
        .then(({ message }) => this.$toast.global.success(message))
        .catch((error) => this.$toast.global.error(error.message))
    },
    getTags() {
      return this.$refs.tagInput.getTags()
    },
    addTag(tag) {
      this.$refs.tagInput.addTag(tag)
    },
    removeTag(tag) {
      this.$refs.tagInput.removeTag(tag)
    },
    async changeFileName() {
      const fileName = this.fileName.trim()

      if (!fileName) {
        this.fileName = this.oldName
        return
      }

      if (fileName === this.oldName) return

      if (this.changing) {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }

        this.timer = setTimeout(() => this.changeFileName(), 600)
        this.changing = false
        return
      }

      this.changing = true
      await this.$axios
        .$post('/digital-assets/update-with-field', {
          workspace_id: this.$getWorkspaceId(),
          digital_assets_id: this.file.id,
          field_name: 'display_file_name',
          field_value: `${this.fileName}.${this.file.file_type}`,
        })
        .then(({ message }) => {
          this.oldName = fileName
          this.$toast.global.success(message)
        })
        .catch((e) => {
          this.$toast.global.error(this.$getErrorMessage(e))
          this.fileName = this.oldName
        })
      this.changing = true
    },
    deleteFile() {
      if (this.disableAllButton) return

      this.deleting = true
      this.$axios
        .$post('digital-assets/delete-file', {
          workspace_id: this.$getWorkspaceId(),
          assets_ids: [this.file.id],
        })
        .then(() => {
          this.$emit('removed', this.file.id)
          this.$store.dispatch('dam/updateStorage')
        })
        .catch(this.$errorToast)
        .finally(() => (this.deleting = false))
    },
  },
}
</script>

<style>
.uploaded-content h4 {
  position: relative;
}

.editable-box {
  margin-left: -5px;
}
</style>
