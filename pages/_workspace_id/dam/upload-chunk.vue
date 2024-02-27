<template>
  <div
    class="uploaded-assets"
    :class="{
      'dz-processing': chunk_done < chunk_count,
      'dz-success': chunk_done === chunk_count,
      'dz-complete': hasError() || chunk_done === chunk_count,
      'dz-error': hasError(),
    }"
  >
    <div v-if="!hideFolders" class="folder-path">
      <span class="uploaded-preview r43">
        <img src="~/assets/img/folder-icon.svg" alt="" />
      </span>
      <div class="uploaded-content">
        <div class="folder-url">
          <h4 v-tooltip="tooltipText(file.path)">
            <span>{{ ellipsisPath[0] }}</span>
            {{ ellipsisPath[1] && '/' + ellipsisPath[1] }}
          </h4>
          <span>{{ file.size }}</span>
        </div>
      </div>
    </div>
    <div
      class="uploaded-box"
      :style="file.isEmptyDir ? 'align-self: stretch' : ''"
    >
      <span
        class="upload-progress"
        :style="{
          width: `${(chunk_done / chunk_count) * 100}%`,
        }"
      ></span>
      <div
        class="uploaded-left"
        :style="
          file.isEmptyDir
            ? 'padding-left: 6px;opacity: 0.4;font-size: 13px;'
            : ''
        "
      >
        <template v-if="!file.isEmptyDir">
          <span class="uploaded-preview r43">
            <img
              ref="imageError"
              :alt="file.name"
              :src="zipThumbnail || file.src"
              @error="imageError()"
            />
          </span>
          <div class="uploaded-content">
            <h4>{{ file.name }}</h4>
            <span>{{ file.size }}</span>
          </div>
        </template>
        <template v-else>Empty directory</template>
      </div>
      <div class="uploaded-right">
        <!-- cancel ongoing upload -->
        <a
          v-if="chunk_done < chunk_count"
          v-tooltip="
            storageFull || storageUsed + file.blob.size > storageTotal
              ? 'Remove file'
              : 'Cancel Uploading'
          "
          class="upload-cancel"
          data-toggle="tooltip"
          title=""
          style="
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
          "
          @click="onDelete"
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
            style="max-height: 16px"
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
        </a>
        <!-- delete uploaded file -->
        <!-- <a
          v-else
          v-tooltip="'Delete'"
          class="upload-remove"
          data-dz-remove=""
          style="visibility: visible"
          @click="onDelete"
        >
          <svg
            class="delete-icon h-orange"
            data-toggle="tooltip"
            title=""
            data-original-title="Delete"
            version="1.1"
            id="Layer_1"
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
        </a>-->
        <!-- error icon -->
        <a
          v-if="hasError()"
          v-tooltip="errorMessage + ' Click to retry upload.'"
          @click="retryUpload()"
        >
          <svg
            id="Layer_1"
            class="retry-icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512"
            xml:space="preserve"
          >
            <g id="Solid">
              <path
                class="fill-color"
                d="M464,232L464,232c-13.3,0-24,10.8-24,24c0,0,0,0,0,0c-0.1,101.7-82.6,184-184.2,183.9c-37.7,0-74.4-11.6-105.3-33.2c-83.1-58.2-103.4-173.1-45.2-256.2s173.1-103.4,256.2-45.2c12.6,8.8,24,19.1,34,30.7H328c-13.3,0-24,10.7-24,24s10.7,24,24,24h112c13.3,0,24-10.7,24-24V48c0-13.3-10.7-24-24-24s-24,10.7-24,24v40c-8.4-8-17.4-15.3-26.9-22c-105-73.5-249.6-48-323.1,57S18,372.5,123,446c38.8,27.3,85.1,42,132.6,42c13.7,0,27.3-1.2,40.8-3.6C407.2,464.9,488,368.6,488,256C488,242.7,477.3,232,464,232L464,232z"
              />
            </g>
          </svg>
          <!-- <img
            src="~/assets/img/alert.png"
            style="height: 18px; transform: translateY(5px)"
            alt="Error"
          /> -->
        </a>
        <!-- success icon -->
        <template v-else-if="chunk_done === chunk_count && file.success">
          <i
            v-if="uncategorizedIcon && isNaN(parseInt(file.parent))"
            v-tooltip="
              'This file is uncategorized. It won\'t appear to users until moving into a specific folder.'
            "
            aria-hidden="true"
            class="fa fa-info-circle"
            style="
              font-size: 18px;
              margin-right: 8px;
              transform: translateY(2px);
            "
          ></i>
          <a v-tooltip="'Uploaded'" style="cursor: default">
            <svg
              id="Layer_1"
              class="check-workspace green"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 18 18"
              xml:space="preserve"
            >
              <g id="check-box" transform="translate(421.452 87.185)">
                <circle
                  id="Ellipse_98"
                  class="fill-color"
                  cx="-412.5"
                  cy="-78.2"
                  r="9"
                ></circle>
                <path
                  id="Path_2644"
                  class="st1"
                  d="M-408.6-80.7l-5.1,5.1l-2.6-2.6"
                ></path>
              </g>
            </svg>
          </a>
        </template>
        <!-- uploading -->
        <a
          v-else
          v-tooltip="
            chunk_done < chunk_count ? 'Uploading..' : 'Finishing upload'
          "
        >
          <img
            src="~/assets/img/loading.gif"
            style="height: 18px; transform: translateY(5px)"
            alt="Uploading"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import zipShot from '~/mixins/zipShot'

export default {
  mixins: [zipShot],
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  props: [
    'file',
    'extension',
    'hideFolders',
    'uncategorized-icon',
    'readyToUpload',
  ],
  data() {
    return {
      uploadId: '',
      assetId: '',
      chunk_count: 10,
      chunk_done: 0,
      chunk_size: 10000000, // 10MB
      deleted: false,
      ellipsisPath: [],
      errorMessage: '',
      zipThumbnail: null,
    }
  },
  computed: {
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    storageUsed() {
      return this.$store.state.dam.storage?.used
    },
    storageTotal() {
      return this.$store.state.dam.storage?.total
    },
    tooltipText() {
      return (path = '') => path.substring(0, path.lastIndexOf('/')) || '/'
    },
    makeEllipsis() {
      return (path = '') => {
        const _path = path.substring(0, path.lastIndexOf('/')) || ''
        if (_path === '/' || !_path.length) return ['/']
        if (_path.length <= 50) return [_path]
        const secondLastIndex = _path.lastIndexOf('/') + 1
        return [
          _path.substring(0, secondLastIndex),
          _path.substring(secondLastIndex),
        ]
      }
    },
  },
  watch: {
    readyToUpload: {
      handler(n) {
        if (n && !this.file.success && !this.file.error) {
          this.startUpload()
        }
      },
      deep: true,
      immediate: true,
    },
    file: {
      handler(n) {
        if (n) {
          if (
            !this.extension ||
            (this.extension && this.extension === this.file.ext)
          ) {
            this.ellipsisPath = this.makeEllipsis(n.path)
            if ((this.file.ext || '').toLowerCase() === 'zip') {
              try {
                this.getZipShot({ ext: 'zip', blob: this.file.blob }).then(
                  (src) => (this.zipThumbnail = src)
                )
              } catch (_) {
                // caught
              }
            }
            if (this.storageFull) {
              this.errorMessage = 'You have consumed all of your storage quota.'
            } else if (
              this.file.blob.size + this.storageUsed >
              this.storageTotal
            ) {
              this.errorMessage =
                'Uploading this file will exceed your storage quota.'
            } // else if (!n.isEmptyDir) this.startUpload()
            else {
              this.chunk_size = 10000000
              this.chunk_done = 0
              this.chunk_count = 10
            }
          } else {
            this.errorMessage = this.storageFull
              ? 'You have consumed all of your storage quota.'
              : this.file.blob.size + this.storageUsed > this.storageTotal
              ? 'Uploading this file will exceed your storage quota.'
              : 'Old and new file extension must be same.'
          }
          if (this.errorMessage.length) this.$emit('error')
        }
      },
      immediate: true,
    },
  },
  methods: {
    retryUpload() {
      this.chunk_done = 0
      this.deleted = false
      this.errorMessage = ''
      this.$emit('retry')
    },
    imageError() {
      this.$refs.imageError.src = require('~/assets/img/file/general.svg')
    },
    invalidExtension() {
      return this.extension && this.extension !== this.file.ext
    },
    hasError() {
      return this.invalidExtension() || this.errorMessage.length
    },
    async startUpload() {
      if (!this.readyToUpload) return
      this.errorMessage = ''
      try {
        const resp = await axios.get(`/s3/start-upload`, {
          params: {
            fileType: this.file.blob.type,
            workspaceId: this.$getWorkspaceId(),
          },
        })
        const { uploadId, assetId } = resp.data
        this.uploadId = uploadId
        this.assetId = assetId
        this.chunk_count = Math.floor(this.file.blob.size / this.chunk_size) + 1
        this.chunk_done = 0
        this.$emit('update:asset-id', assetId)
        this.$emit('s3UploadId', uploadId)
        this.$emit('partsCount', this.chunk_count)
        this.$emit('partsDone', this.chunk_done)
        this.uploadMultipartFile()
      } catch (err) {
        console.error(JSON.stringify(err, null, 2))
        this.errorMessage = 'Could not upload asset.'
      }
    },

    async uploadMultipartFile() {
      this.errorMessage = ''
      this.chunk_done = 0
      try {
        this.chunk_count = Math.floor(this.file.blob.size / this.chunk_size) + 1
        const partsArray = []
        let start, end, blob

        for (let index = 1; index < this.chunk_count + 1; index++) {
          if (this.deleted) return
          start = (index - 1) * this.chunk_size
          end = index * this.chunk_size
          blob =
            index < this.chunk_count
              ? this.file.blob.slice(start, end)
              : this.file.blob.slice(start)

          // Get presigned URL for each part
          const getUploadUrlResp = await axios.get(`/s3/get-upload-url`, {
            params: {
              PartNumber: index,
              UploadId: this.uploadId,
              assetId: this.assetId,
              workspaceId: this.$getWorkspaceId(),
            },
          })

          const { presignedUrl } = getUploadUrlResp.data

          const uploadResp = await axios
            .put(presignedUrl, blob, {
              headers: {
                'Content-Type': this.file.type,
              },
            })
            .catch((e) => {
              console.error(e)
              this.errorMessage = 'Could not upload asset.'
              this.$emit('error')
            })
          partsArray.push(uploadResp)
          this.chunk_done = Math.min(this.chunk_done + 1, this.chunk_count)
          this.$emit('progress', (this.chunk_done / this.chunk_count) * 100)
          this.$emit('partsDone', this.chunk_done)
          this.$emit('parts', partsArray)
        }
        this.errorMessage = ''
        if (this.deleted) return
        const uploadPartsArray = await this.joinParts(partsArray)

        const completeUploadResp = await axios.post(`/s3/complete-upload`, {
          Parts: uploadPartsArray,
          UploadId: this.uploadId,
          assetId: this.assetId,
          workspaceId: this.$getWorkspaceId(),
        })
        this.$emit('s3UploadCompleted', true)
        this.errorMessage = this.storageFull
          ? 'You have consumed all of your storage quota.'
          : this.file.blob.size + this.storageUsed > this.storageTotal
          ? 'Uploading this file will exceed your storage quota.'
          : ''
        if (this.errorMessage.length) this.$emit('error')
        let thumbnailResponse
        if (this.file.ext === 'zip' && this.zipThumbnail) {
          thumbnailResponse = await this.uploadThumbnail()
        }
        this.$emit('uploaded', {
          uploadResponse: completeUploadResp.data.data,
          thumbnailResponse,
        })
      } catch (err) {
        console.log(JSON.stringify(err, null, 2))
        this.errorMessage = 'Could not upload asset.'
        this.$emit('error')
      }
    },
    uploadThumbnail() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const { data, headers } = await axios.get(this.zipThumbnail, {
            responseType: 'blob',
          })

          const file = new File([data], this.file.name, {
            type: headers['content-type'],
          })

          const formData = new FormData()
          formData.append('file', file)

          await axios
            .post('/s3/upload', formData, {
              params: {
                workspaceId: this.$getWorkspaceId(),
                compress: true,
                key: this.assetId,
              },
            })
            .then(({ data }) => resolve(data))
        } catch (e) {
          console.error(e)
          reject(e)
        }
      })
    },
    joinParts(parts) {
      let count = 0
      const arr = []
      // eslint-disable-next-line no-async-promise-executor
      return new Promise((resolve) => {
        for (const part of parts) {
          arr.push({
            ETag: part.headers.etag,
            PartNumber: ++count,
          })
        }
        resolve(arr)
      })
    },
    onDelete() {
      this.deleted = true
      this.$emit('delete')
      this.$destroy()
    },
  },
}
</script>
