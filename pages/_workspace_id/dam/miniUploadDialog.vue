<template>
  <div
    v-show="files.length"
    class="upload-modal"
    :class="{ 'list-open': listOpen }"
  >
    <header
      :style="{
        background: '#444',
        color: '#eff1f3',
        cursor: !listOpen ? 'pointer' : 'default',
      }"
      @click="
        () => {
          if (!listOpen) listOpen = true
        }
      "
    >
      <h5 style="padding-left: 16px; margin-bottom: 4px">
        <template v-if="!completed">Uploading {{ percentDone }}</template>
        <template v-else
          >Uploaded&nbsp;
          <svg
            v-if="percentDone === '100%' && !errorCount"
            id="Layer_1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 18 18"
            xml:space="preserve"
            class="check-workspace green"
          >
            <g id="check-box" transform="translate(421.452 87.185)">
              <circle
                id="Ellipse_98"
                cx="-412.5"
                cy="-78.2"
                r="9"
                class="fill-color"
              ></circle>
              <path
                id="Path_2644"
                d="M-408.6-80.7l-5.1,5.1l-2.6-2.6"
                class="st1"
              ></path>
            </g>
          </svg>
          <img
            v-else
            v-tooltip="
              files.length === 1
                ? files[0].errorMessage
                : errorCount === 1
                ? '1 file failed to upload.'
                : `${errorCount} files failed to upload.`
            "
            src="~/assets/img/alert.png"
            style="height: 18px; transform: translateY(5px)"
            alt=""
        /></template>
      </h5>
      <div style="display: flex">
        <div
          v-tooltip="listOpen ? 'Minimize' : 'Maximize'"
          class="toggle-btn"
          @click.prevent.stop="listOpen = !listOpen"
        >
          <img src="~/assets/img/icon/arrow-down-white.svg" alt="" width="18" />
        </div>
        <div
          v-show="listOpen && completed"
          v-tooltip="'Close'"
          class="close-btn"
          @click="closeDialog()"
        >
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
            style="height: 15px; width: 15px"
          >
            <g id="Group_4358" transform="translate(-69.745 -317.549)">
              <path
                id="Path_3424"
                class="fill-color"
                d="M70.5,335.5c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l16.4-16.4c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1.1c0,0,0,0,0,0l-16.4,16.4C70.9,335.5,70.7,335.5,70.5,335.5z"
              />
              <path
                id="Path_3425"
                class="fill-color"
                d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
              />
            </g>
          </svg>
        </div>
      </div>
    </header>
    <section class="content">
      <div class="customscrollbar" style="padding: 5px 5px 0 5px">
        <chunk-upload
          v-for="(file, i) in files"
          :key="i"
          :ref="`chunk_${i}`"
          :hide-folders="true"
          :uncategorized-icon="true"
          :file="file"
          :asset-id="file.assetId"
          :is-empty-dir="file.isEmptyDir"
          :ready-to-upload="isReadyToUpload(i)"
          @s3UploadId="onFileMutation(file, 's3UploadKey', $event)"
          @partsCount="onFileMutation(file, 'partsCount', $event)"
          @partsDone="onFileMutation(file, 'partsDone', $event)"
          @parts="onFileMutation(file, 'parts', $event)"
          @update:asset-id="onAssetIdUpdate($event, file)"
          @uploaded="handleUploadedFile(file, $event)"
          @s3UploadCompleted="onFileMutation(file, 's3UploadCompleted', $event)"
          @delete="deleteFile(file)"
          @error="onUploadError(file, $event)"
          @progress="onFileMutation(file, 'progress', $event)"
          @retry="retryUpload(file)"
        />
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import ChunkUpload from '~/pages/_workspace_id/dam/upload-chunk'

export default {
  components: {
    ChunkUpload,
  },
  props: {},
  data() {
    return {
      queue: [],
      parentFolders: new Set(),
      listOpen: true,
      shouldPauseUpload: false,
    }
  },
  computed: {
    isSafari() {
      return this.$browserDetect.isSafari // || this.$browserDetect.isIOS
    },
    isReadyToUpload() {
      if (!this.files.length) return false
      return (index) => {
        if (!this.isSafari || index === 0) return true
        return this.files[index - 1].success || this.files[index - 1].error
      }
    },
    completed() {
      const successUploads = this.successCount
      const errorUploads = this.errorCount
      return (
        this.files.length > 0 &&
        this.files.length === successUploads + errorUploads
      )
    },
    files() {
      return this.$store.state.dam.uploads
    },
    successCount() {
      return this.files.filter((e) => e.success && !e.deleted).length
    },
    errorCount() {
      return this.files.filter((e) => e.error && !e.deleted).length
    },
    percentDone() {
      if (!this.files.length) return ''
      let pct = this.files
        .map((e) => parseInt(e.progress))
        .reduce((i, j) => i + j)
      pct = parseInt(pct / this.files.length)
      if (pct > 100) pct = 100
      return pct + '%'
    },
  },
  watch: {
    completed: {
      handler(n) {
        if (n && this.percentDone === '100%') this.listOpen = true
      },
      immediate: true,
    },
  },
  methods: {
    onAssetIdUpdate(assetId, file) {
      this.$store.dispatch('dam/uploads/update', {
        uploadId: file.uploadId,
        mutations: { assetId },
      })
    },
    closeDialog() {
      this.$store.dispatch('dam/uploads/clear')
    },
    retryUpload(file, index) {
      this.queue[index].success = false
      this.queue[index].error = false
      this.queue[index].progress = 0
      this.$refs[`chunk_${index}`][0].startUpload()
    },
    async onFileMutation(file, key, value) {
      await this.$store.dispatch('dam/uploads/update', {
        uploadId: file.uploadId,
        mutations: { [key]: value },
      })
    },
    onUploadError(file, err) {
      this.$store.dispatch('dam/uploads/update', {
        uploadId: file.uploadId,
        mutations: {
          error: true,
          success: false,
          deleted: false,
          errorMessage: err,
        },
      })
    },
    async deleteFile(file) {
      await this.$store.dispatch('dam/uploads/remove', {
        uploadId: file.uploadId,
      })

      // update root folders when file is removed from upload queue
      if (!this.files.length) this.parentFolders = new Set()
      else if (file.parent && this.parentFolders.has(file.parent)) {
        this.parentFolders.delete(file.parent)
      }

      if (!file.success) return
      this.$axios
        .$post('digital-assets/delete-file', {
          workspace_id: this.$getWorkspaceId(),
          assets_ids: [file.assetId],
        })
        .catch(console.error)

      axios
        .delete('/s3/delete-asset', {
          data: {
            assetId: file.assetId,
            workspaceId: this.$getWorkspaceId(),
          },
        })
        .catch(console.error)
    },
    checkAllInFolder(folderId) {
      // if (!this.parentFolders.has(folderId)) return false
      const items = this.files.filter((e) => e.rootId === folderId)
      const allSettled =
        items.filter((e) => e.success || e.error).length === items.length
      return allSettled && items.length > 0
    },
    async handleUploadedFile(file, response) {
      const { workspace_id } = this.$route.params
      const signedUrl = await axios
        .get('/s3/get-signed-url', {
          params: {
            assetId: file.assetId,
            workspaceId: workspace_id,
          },
        })
        .catch(() => {
          this.$store.dispatch('dam/uploads/update', {
            uploadId: file.uploadId,
            mutations: { success: false, error: true },
          })
        })
      if (!signedUrl) {
        if (this.checkAllInFolder(file.rootId))
          this.sendFolderNotification(file.rootId)
        return
      }
      const damUpload = await this.$axios
        .$post(
          `digital-assets/upload`,
          {
            workspace_id,
            file_name: file.assetId,
            display_file_name: file.name,
            display_file: signedUrl.data,
            auto_tag: this.autotagEnabled ? ~~this.autoTag : false,
            mime_type: file.blob.type,
            file_extension: file.ext,
            file_size: file.blob.size,
            category_id: file.parent,
          },
          {
            params: {
              url_workspace_id: workspace_id,
            },
          }
        )
        .catch((e) => {
          console.error(JSON.parse(JSON.stringify(e)))
          this.$store.dispatch('dam/uploads/update', {
            uploadId: file.uploadId,
            mutations: {
              success: false,
              error: true,
              errorMessage: this.$getErrorMessage(e),
            },
          })
        })
      await this.$store.dispatch('dam/updateStorage')
      if (!damUpload) {
        this.$store.dispatch('dam/uploads/update', {
          uploadId: file.uploadId,
          mutations: {
            success: false,
            error: true,
          },
        })
        if (this.checkAllInFolder(file.rootId))
          this.sendFolderNotification(file.rootId)
        return
      }
      this.$store.dispatch('dam/uploads/update', {
        uploadId: file.uploadId,
        mutations: {
          success: true,
          error: false,
        },
      })
      if (damUpload?.data) {
        if (response?.thumbnailResponse?.signedUrl) {
          await this.$axios
            .$post('digital-assets/upload-zipfile-preview', {
              workspace_id,
              asset_id: damUpload.data.id,
              compress_file: response.thumbnailResponse.signedUrl,
            })
            .catch(console.error)
        }
        if (parseInt(file.parent) === parseInt(this.$route.hash.substring(1))) {
          this.$nuxt.$emit('update-category', {
            categoryId: parseInt(file.parent),
            files: [{ ...damUpload.data, is_public: 1 }],
          })
        } else {
          if (!isNaN(parseInt(file.parent))) {
            await this.$axios
              .$post('digital-assets/category/view', {
                workspace_id: this.$getWorkspaceId(),
                category_id: parseInt(file.parent),
              })
              .then(({ data }) => {
                this.$store.commit('dam/setFolderItem', data)
              })
          }
          this.$nuxt.$emit('update-category', {
            categoryId: parseInt(file.parent),
            files: [{ ...damUpload.data, is_public: 1 }],
          })
        }
      }
      if (this.checkAllInFolder(file.rootId)) {
        this.sendFolderNotification(file.rootId)
      }
    },
    sendFolderNotification(folderId) {
      if (isNaN(parseInt(folderId))) return
      this.$axios
        .$post('digital-assets/upload-folder-notification', {
          workspace_id: this.$getWorkspaceId(),
          category_id: folderId,
        })
        .catch((_) => {})
    },
  },
}
</script>
