<template>
  <div
    id="dam-dropzone"
    class="vue-dropzone dropzone mini-upload-list asset-upload"
    :class="{
      'upload-done': completed,
      exists: !queue.length && alreadyUploaded,
      'no-success-msg': !completed,
    }"
    style="height: 100%"
  >
    <div
      v-if="!queue.length"
      class="dz-message"
      @drop="onFileDrop"
      @dragenter.prevent
      @dragover.prevent
      @click="$refs.fileInput.click()"
    >
      <form
        id="DropZoneFiddle"
        class="versioning"
        :class="{ 'hide-upload': hideUpload }"
        style="border: none; padding: 0"
        @submit.prevent
      >
        <div class="upload-images">
          <!-- <h2>Upload File</h2> -->
          <div class="upload-text">
            <svg
              id="Layer_1"
              class="upload-big-icon blue"
              style="height: 50px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 162 162"
              xml:space="preserve"
            >
              <g id="Icon_feather-download" transform="translate(-3.5 -3.5)">
                <path
                  id="Path_16"
                  class="fill-color"
                  d="M164.5,111.2v35.6c0,9.8-8,17.8-17.8,17.8H22.3c-9.8,0-17.8-8-17.8-17.8v-35.6"
                />
                <path
                  id="Path_17"
                  class="fill-color"
                  d="M40.1,48.9L84.5,4.5l44.4,44.4"
                />
                <path id="Path_18" class="fill-color" d="M84.5,4.5v106.7" />
              </g>
            </svg>

            <h5>
              Drop a file to upload or
              <a class="dz-clickable dz-started"> browse. </a>
            </h5>
            <div v-if="autotagEnabled" class="auto-tag">
              <strong>Autotag</strong>
              <div class="Autotag-selecter">
                <input
                  id="off"
                  type="radio"
                  name="autoTag"
                  :checked="!autoTag"
                  :value="!autoTag"
                />
                <label
                  class="off"
                  for="off"
                  @click.capture.prevent.stop="autoTag = false"
                >
                  Off
                </label>
                <input
                  id="on"
                  type="radio"
                  name="autoTag"
                  :checked="autoTag"
                  :value="autoTag"
                />
                <label
                  class="on"
                  for="on"
                  @click.capture.prevent.stop="autoTag = true"
                >
                  On
                </label>
              </div>
            </div>
          </div>
          <a class="hide-version" @click.stop="closeVersion"> Close </a>
        </div>
      </form>
    </div>
    <chunk-upload
      v-for="(asset, index) in queue"
      v-else
      :key="asset.name + '_' + index"
      :file="asset"
      :asset-id.sync="asset.assetId"
      :extension="file.file_type"
      :hide-folders="false"
      :ready-to-upload="true"
      @uploaded="handleUploadedFile(asset, $event)"
      @delete="deleteFile(asset, $event)"
      @error="onUploadError(index, $event)"
      @progress="onUploadProgress(asset, index, $event)"
    >
    </chunk-upload>
    <input
      ref="fileInput"
      type="file"
      hidden
      :accept="`.${file.file_type}`"
      @change="handleFile"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ChunkUpload from './upload-chunk.vue'
import { getFileExt, isImage, isAudio } from '~/utils'
import '~/assets/css/dam-dropzone.css'

const GENERAL_ICON = require('~/assets/img/file/general.svg')
const VIDEO_ICON = require('~/assets/img/file/video.svg')
const IMAGE_ICON = require('~/assets/img/icon/images.svg')
const AUDIO_ICON = require('~/assets/img/file/audio.svg')

function getGeneralIcon(ext) {
  if (ext)
    if (isImage(ext)) return IMAGE_ICON
    else if (isAudio(ext)) return AUDIO_ICON
    else
      try {
        return require(`~/assets/img/file/${ext}.svg`)
      } catch {}
  return GENERAL_ICON
}

export default {
  components: {
    ChunkUpload,
  },
  props: ['file'],
  data() {
    return {
      completed: false,
      alreadyUploaded: false,
      queue: [],
      hideUpload: false,
      autoTag: this.$store.state.dam.damInstance.settings.auto_tagging,
    }
  },
  computed: {
    autotagEnabled() {
      return !!this.$auth.user?.subscription_features
        ?.ai_based_asset_auto_tagging?.enable
    },
  },
  methods: {
    closeVersion() {
      this.$emit('close')
    },
    async handleUploadedFile(file, ev) {
      this.queue[0].success = true
      const workspace_id = this.$getWorkspaceId()
      const signedUrl = await axios
        .get('/s3/get-signed-url', {
          params: {
            assetId: file.assetId,
            workspaceId: workspace_id,
          },
        })
        .catch(console.error)
      this.$axios
        .$post('digital-assets/version/upload', {
          asset_id: this.file.id,
          auto_tag: this.autotagEnabled && this.autoTag,
          display_file: signedUrl.data,
          display_file_name: file.name,
          file_extension: file.ext,
          file_name: file.assetId,
          file_size: file.blob.size,
          mime_type: file.blob.type,
          workspace_id,
        })
        .then(async ({ data }) => {
          if (ev?.thumbnailResponse?.signedUrl) {
            await this.$axios
              .$post('digital-assets/upload-zipfile-preview', {
                workspace_id,
                asset_id: data.id,
                compress_file: ev.thumbnailResponse.signedUrl,
              })
              .catch(console.error)
              .finally(() => {
                this.$emit('version-uploaded', data)
              })
          } else {
            this.$emit('version-uploaded', data)
          }
        })
        .catch(console.error)
    },
    deleteFile(file) {
      const { suceess } = this.queue[0]
      try {
        this.queue = []
        this.completed = false
        if (suceess) {
          this.$emit('deleted', file)

          axios.delete('/s3/delete-asset', {
            data: {
              assetId: file.assetId,
              workspaceId: this.$getWorkspaceId(),
            },
          })
        }
      } catch (e) {
        console.error(e)
      }
    },
    onUploadError() {},
    onUploadProgress() {},
    async handleFile(e, files = []) {
      const _files =
        e && e.target && e.target.files ? [...e.target.files] : files
      if (!_files.length) return
      const file = await this.transformFileObject(_files[0])
      this.queue = [file]
      this.$refs.fileInput.value = ''
    },
    onFileDrop(e) {
      e.preventDefault()
      const items = e.dataTransfer.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry
          ? items[i].webkitGetAsEntry()
          : items[i].getAsEntry
          ? items[i].getAsEntry()
          : null
        if (item) {
          this.traverseFileTree(item)
        }
      }
    },
    traverseFileTree(item, path) {
      path = path || ''
      if (item.isFile) {
        item.file((file) => {
          this.handleFile(null, [file])
        })
      }
    },
    readImgFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = function () {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })
    },
    async transformFileObject(file) {
      if (!(file instanceof File)) {
        throw new TypeError('Invalid File', file)
      }
      const ext = getFileExt(file.name)

      let thumbnail = null
      if (this.$isImage(ext)) {
        thumbnail = await this.readImgFile(file)
      } else if (ext === 'pdf') {
        thumbnail = require('~/assets/img/file/pdf.svg')
      } else if (file.type.includes('video')) thumbnail = VIDEO_ICON
      else thumbnail = getGeneralIcon(ext)

      return {
        name: file.name,
        assetId: '',
        size: this.$toHumanlySize(file.size),
        ext,
        blob: file,
        src: thumbnail || getGeneralIcon(ext),
        success: false,
        error: false,
        progress: 0,
        deleted: false,
      }
    },
  },
}
</script>
<style scoped>
.asset-upload >>> .folder-path {
  display: none;
}
.asset-upload >>> .uploaded-box {
  width: 100%;
  margin-left: 0;
}
</style>
