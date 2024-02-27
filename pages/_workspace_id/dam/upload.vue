<template>
  <div class="body-content dam-container">
    <div
      class="body-content-auto w-100"
      :class="{ 'msg-added': !!completed && successCount }"
    >
      <div
        v-if="completed && successCount"
        :class="{
          'success-msg': completed && successCount,
        }"
      >
        <div class="alert alert-success alert-dismissible">
          Uploading complete. Please click on "<strong>Next</strong>" to
          continue.
        </div>
      </div>
      <div
        v-if="completed || alreadyUploaded || queue.length"
        class="top-bar uploaded-header pb-0"
      >
        <template v-if="completed || queue.length">
          <h2 v-if="successCount == queue.length" class="title p0">
            {{ successCount }} item<template v-if="successCount > 1"
              >s</template
            >
            uploaded
          </h2>
          <h2 v-else class="title p0">
            {{ completed ? 'Uploaded' : 'Uploading' }}
            {{ successCount }}/{{ queue.length }}
            <span> item{{ queue.length > 1 ? 's' : '' }} </span>
          </h2>
        </template>
        <span style="flex: 1"></span>
        <span v-if="alreadyUploaded" class="mx-3">
          Pending action for
          <strong>
            {{ alreadyUploaded }} item<template v-if="alreadyUploaded > 1"
              >s</template
            >
          </strong>
        </span>

        <button
          type="button"
          class="btn next-btn"
          :disabled="nextDisabled"
          :class="{ 'btn-disable': nextDisabled }"
          style="min-width: 120px"
          @click="$router.push(redirectUpload())"
        >
          <SpinLoading v-if="false" />
          <template v-else> Next </template>
        </button>
        <!-- <a href="#" class="btn" style="min-width: 120px"
          >Retry Upload
          <i
            v-tooltip="
              'It seems there is an issue with uploading your files. Please click on this button to retry uploading failed files.'
            "
            class="fa fa-info-circle"
            aria-hidden="true"
          ></i
        ></a> -->
      </div>
      <div
        class="common-box p0 table-list-scrolling scrolling h-100"
        :class="{ completed: completed }"
      >
        <div
          class="upload-sec"
          :class="queue.length ? 'mini-upload' : 'h-100'"
          data-toggle="modal"
          data-target="#upload-file"
          :style="
            storageFull
              ? 'cursor:default;pointer-events:none'
              : `cursor: 'pointer'`
          "
          @drop="onFileDrop"
          @dragenter.prevent
          @dragover.prevent
        >
          <h2>Upload files and folders</h2>
          <div class="upload-innner">
            <svg
              id="Layer_1"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 162 162"
              xml:space="preserve"
              class="upload-big-icon blue"
              :style="{ height: queue.length ? '60px' : '115px' }"
            >
              <g id="Icon_feather-download" transform="translate(-3.5 -3.5)">
                <path
                  id="Path_16"
                  d="M164.5,111.2v35.6c0,9.8-8,17.8-17.8,17.8H22.3c-9.8,0-17.8-8-17.8-17.8v-35.6"
                  class="fill-color"
                ></path>
                <path
                  id="Path_17"
                  d="M40.1,48.9L84.5,4.5l44.4,44.4"
                  class="fill-color"
                ></path>
                <path
                  id="Path_18"
                  d="M84.5,4.5v106.7"
                  class="fill-color"
                ></path>
              </g>
            </svg>
            <h5
              :style="{
                margin: '20px 0',
                fontSize: '14px',
                color: '#6f7070',
                fontWeight: 500,
              }"
            >
              Drop your files and folders to upload or
              <a data-toggle="dropdown" href="javascript:void(0)"> browse. </a>
              <ul
                class="dropdown-menu add-dropdown"
                x-placement="bottom-center"
              >
                <li
                  v-tooltip="
                    storageFull
                      ? 'You have consumed all of your storage quota.'
                      : ''
                  "
                  :style="storageFull ? 'opacity:0.4' : ''"
                >
                  <a
                    class="dropdown-item"
                    :style="{
                      color: '#3f4f6b',
                      padding: '10px 15px',
                      textDecoration: 'none',
                      userSelect: 'none',
                      cursor: storageFull ? 'default' : 'pointer',
                    }"
                    @click.stop="storageFull ? null : $refs.fileInput.click()"
                    ><span
                      :style="{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word',
                        display: 'inline-block',
                        marginRight: '8px',
                      }"
                      ><svg
                        id="Layer_1"
                        class="upload-icon"
                        version="1.1"
                        viewBox="0 0 18 18"
                        x="0px"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        y="0px"
                      >
                        <g
                          id="Group_4436"
                          transform="translate(-375.358 -797.334)"
                        >
                          <path
                            id="Path_3552"
                            class="fill-color"
                            d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                          ></path>
                          <g id="Group_4435">
                            <path
                              id="Path_3553"
                              class="fill-color"
                              d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                            ></path>
                            <path
                              id="Path_3554"
                              class="fill-color"
                              d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                            ></path>
                          </g>
                        </g></svg
                    ></span>
                    Upload Files
                  </a>
                </li>
                <li>
                  <a
                    style="
                      color: #3f4f6b;
                      padding: 10px 15px;
                      text-decoration: none;
                    "
                    class="dropdown-item"
                    @click.stop="$refs.folderInput.click()"
                    ><span
                      :style="{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word',
                        display: 'inline-block',
                        marginRight: '8px',
                      }"
                      ><svg
                        id="Layer_1"
                        class="upload-icon"
                        version="1.1"
                        viewBox="0 0 18 18"
                        x="0px"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        y="0px"
                      >
                        <g
                          id="Group_4436"
                          transform="translate(-375.358 -797.334)"
                        >
                          <path
                            id="Path_3552"
                            class="fill-color"
                            d="M378,815.3c-1.4,0-2.6-1.2-2.6-2.6v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8v3.7c0,0.6,0.5,1,1,1h12.8c0.6,0,1-0.5,1-1v-3.7c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.7,0.3,0.8,0.8v3.7c0,1.4-1.2,2.6-2.6,2.6H378z"
                          ></path>
                          <g id="Group_4435">
                            <path
                              id="Path_3553"
                              class="fill-color"
                              d="M379.2,802.5c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l4-4l4,4c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l0,0l-5.1-5.1L379.2,802.5z"
                            ></path>
                            <path
                              id="Path_3554"
                              class="fill-color"
                              d="M384.4,797.7c-0.4,0-0.8,0.4-0.8,0.8v11c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8v-11C385.1,798,384.8,797.7,384.4,797.7z"
                            ></path>
                          </g>
                        </g></svg
                    ></span>
                    Upload Folder
                  </a>
                </li>
              </ul>
              <p style="margin-top: 4px">
                (Note: It may take some time to fetch your large files for
                upload.)
              </p>
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
                  for="off"
                  class="off"
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
                  for="on"
                  class="on"
                  @click.capture.prevent.stop="autoTag = true"
                >
                  On
                </label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="queue.length > 0" class="mini-upload-list bg-gray">
          <div class="customscrollbar">
            <div class="tbody">
              <chunk-upload
                v-for="(file, index) in queue"
                :key="[file.name, index].join('_')"
                :ref="`chunk_${index}`"
                :file="file"
                :asset-id.sync="file.assetId"
                :is-empty-dir="file.isEmptyDir"
                :ready-to-upload="isReadyToUpload(index)"
                @uploaded="handleUploadedFile(file, index, $event)"
                @delete="deleteFile(index, file.assetId)"
                @error="onUploadError(index, $event)"
                @progress="onUploadProgress(file, index, $event)"
                @retry="retryUpload(file, index)"
              >
              </chunk-upload>
            </div>
          </div>
        </div>
        <!-- footer -->
        <div
          v-if="completed || alreadyUploaded || queue.length"
          class="uploaded-footer"
        >
          <nuxt-link
            v-if="queue.length"
            v-slot="{ navigate }"
            :to="redirectUpload()"
          >
            <button
              type="button"
              class="btn btn-block"
              :disabled="nextDisabled"
              :class="{ 'btn-disable': nextDisabled }"
              style="min-width: 120px"
              @click="navigate"
            >
              <SpinLoading v-if="false" />
              <template v-else> Next </template>
            </button>
          </nuxt-link>
        </div>
        <!-- file input -->
        <input
          ref="fileInput"
          type="file"
          hidden
          multiple
          @change="handleFile"
        />
        <!-- folder input -->
        <input
          ref="folderInput"
          type="file"
          hidden
          multiple
          webkitdirectory
          mozdirectory
          msdirectory
          odirectory
          directory
          allowdirs
          @change="handleFolder"
        />
      </div>
    </div>
    <!--  Uploaded File Choose Modal  -->
    <div id="upload-file" class="modal fade">
      <div
        class="modal-dialog modal-small modal-dialog-scrollable modal-dialog-centered"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Type</h5>
            <button
              ref="modalClose"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"
                ><svg
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
                    />
                    <path
                      id="Path_3425"
                      class="fill-color"
                      d="M87,335.5c-0.2,0-0.4-0.1-0.6-0.2L70,318.9c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1.1,0l16.4,16.4c0.3,0.3,0.3,0.8,0,1.1C87.4,335.5,87.2,335.5,87,335.5z"
                    />
                  </g></svg
              ></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="choose-box">
              <div class="choose-one">
                <a
                  href="javascript:void(0);"
                  @click="
                    storageFull
                      ? $toast.global.error(
                          'You have consumed all of your storage quota.'
                        )
                      : $refs.fileInput.click(),
                      modalClose()
                  "
                >
                  <svg
                    id="Layer_1"
                    class="file-upload-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 44.2 58"
                    xml:space="preserve"
                  >
                    <g id="File" transform="translate(-61)">
                      <path
                        id="Path_40728"
                        class="fill-color"
                        d="M103.2,12L92.3,1.7C91.2,0.6,89.6,0,88,0H67.2C63.8,0,61,2.8,61,6.2v45.5c0,3.4,2.8,6.2,6.2,6.2h31.7c3.4,0,6.2-2.8,6.2-6.2V16.6C105.2,14.9,104.5,13.2,103.2,12L103.2,12z M99.9,13.6h-8.5c-0.3,0-0.6-0.3-0.6-0.6v-8L99.9,13.6z M98.9,54.6H67.2c-1.6,0-2.8-1.3-2.8-2.8V6.2c0-1.6,1.3-2.8,2.8-2.8h20.3V13c0,2.2,1.8,4,4,4h10.3v34.8C101.8,53.3,100.5,54.6,98.9,54.6z"
                      />
                      <path
                        id="Path_40729"
                        class="fill-color"
                        d="M95.2,22.7H70.3c-0.9,0-1.7,0.8-1.7,1.7c0,0.9,0.8,1.7,1.7,1.7h24.9c0.9,0,1.7-0.8,1.7-1.7C96.9,23.4,96.1,22.7,95.2,22.7L95.2,22.7z"
                      />
                      <path
                        id="Path_40730"
                        class="fill-color"
                        d="M95.2,31.7H70.3c-0.9,0-1.7,0.8-1.7,1.7c0,0.9,0.8,1.7,1.7,1.7h24.9c0.9,0,1.7-0.8,1.7-1.7C96.9,32.5,96.1,31.7,95.2,31.7L95.2,31.7z"
                      />
                      <path
                        id="Path_40731"
                        class="fill-color"
                        d="M78.5,40.8h-8.2c-0.9,0-1.7,0.8-1.7,1.7c0,0.9,0.8,1.7,1.7,1.7h8.2c0.9,0,1.7-0.8,1.7-1.7C80.2,41.5,79.5,40.8,78.5,40.8L78.5,40.8z"
                      />
                    </g>
                  </svg>
                </a>
                <span>File</span>
              </div>
              <div class="choose-one">
                <a
                  href="javascript:void(0);"
                  @click="
                    storageFull
                      ? $toast.global.error(
                          'You have consumed all of your storage quota.'
                        )
                      : $refs.folderInput.click(),
                      modalClose()
                  "
                >
                  <svg
                    id="Layer_1"
                    class="folder-upload-icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 57.6 47.5"
                    xml:space="preserve"
                  >
                    <g id="Folder" transform="translate(0 -44.975)">
                      <g id="Group_4058" transform="translate(0 44.975)">
                        <path
                          id="Path_40732"
                          class="fill-color"
                          d="M57.2,11.8c-0.3-0.4-0.8-0.6-1.3-0.6h-6.6V5.4c0-0.9-0.8-1.7-1.7-1.7h-29v-2C18.7,0.8,17.9,0,17,0c0,0,0,0,0,0H1.7C0.8,0,0,0.8,0,1.7c0,0,0,0,0,0v44.1c0,0.9,0.7,1.7,1.7,1.7c0,0,0,0,0,0h50.6c0.9,0,1.6-0.6,1.7-1.5l3.6-32.9C57.7,12.7,57.5,12.2,57.2,11.8z M3.4,3.4h11.9v2c0,0.9,0.8,1.7,1.7,1.7h29v4.2H8.4c-0.8,0-1.5,0.6-1.7,1.4L3.4,29.2V3.4z M50.8,44.1h-47l6.1-29.5h44.2L50.8,44.1z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
                <span>Folder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ChunkUpload from './upload-chunk.vue'
import { getFileExt, isImage, isAudio } from '~/utils'
import '~/assets/css/dam-dropzone.css'
import {
  DropHandler as getDroppedFiles,
  FileHandler,
} from '~/utils/fileHierarchy'

let vue

const isDirty = () => !vue.completed && vue.queue.length > 0

if (process.client) {
  window.onload = function () {
    window.addEventListener('beforeunload', function (e) {
      if (!isDirty()) return undefined

      const confirmationMessage =
        'It looks like you have been editing something. ' +
        'If you leave before saving, your changes will be lost.'

      ;(e || window.event).returnValue = confirmationMessage // Gecko + IE
      return confirmationMessage // Gecko + Webkit, Safari, Chrome etc.
    })
  }
}

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

function getImageIcon(ext) {
  try {
    return require(`~/assets/img/file/${ext}.svg`)
  } catch {
    return GENERAL_ICON
  }
}

export default {
  components: { ChunkUpload },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$nuxt.$emit('pauseUploads')
  //   })
  // },
  beforeRouteLeave(to, from, next) {
    if (!this.completed && this.queue.length) {
      if (confirm('Do you really want to leave? files may not get uploaded!'))
        next()
      else next(false)
    } else next()
  },
  layout: 'damLayout',
  middleware: [
    'authCheck',
    'checkWorkspace',
    'can-access-dam-module',
    'check-if-suspended',
  ],
  data() {
    return {
      queue: [],
      autoTag: this.$store.state.dam.damInstance.settings.auto_tagging,
      loading: false,
      alreadyUploaded: 0,
      parentFolders: new Set(),
    }
  },
  async fetch() {
    this.loading = true
    try {
      const files = await this.$store.dispatch('dam/recentUpload')
      this.loading = false
      this.alreadyUploaded = files
    } catch (error) {}
  },
  computed: {
    isSafari() {
      return this.$browserDetect.isSafari // || this.$browserDetect.isIOS
    },
    isReadyToUpload() {
      return (index) => {
        if (!this.queue.length) return false
        if (!this.isSafari || index === 0) return true
        return this.queue[index - 1].success || this.queue[index - 1].error
      }
    },
    autotagEnabled() {
      // return process.env.DAM_UPLOAD_AUTOTAG_ENABLED === 'true'
      return !!this.$auth.user?.subscription_features
        ?.ai_based_asset_auto_tagging?.enable
    },
    storageFull() {
      return this.$store.state.dam.storage?.percentage >= 100
    },
    storageUsed() {
      return this.$store.state.dam.storage?.used
    },
    storageTotal() {
      return this.$store.state.dam.storage?.total
    },
    storagePercent() {
      return this.$store.state.dam.storage?.percentage
    },
    successCount() {
      return this.queue.filter((e) => e.success && !e.deleted).length
    },
    completed() {
      const successUploads = this.queue.filter((e) => e.success).length
      const errorUploads = this.queue.filter((e) => e.error).length
      return (
        this.queue.length > 0 &&
        // successUploads > 0 &&
        this.queue.length === successUploads + errorUploads
      )
    },
    nextDisabled() {
      const somePending = !this.completed
      const emptyQueue = !this.queue.length
      if (this.alreadyUploaded) {
        return somePending && !emptyQueue
      }
      return !!(somePending || emptyQueue || !this.successCount)
    },
  },
  mounted() {
    vue = this
    axios.post('/s3/updateBucketConfig').catch(console.error)
  },
  methods: {
    retryUpload(file, index) {
      this.queue[index].success = false
      this.queue[index].error = false
      this.queue[index].progress = 0
      this.$refs[`chunk_${index}`][0].startUpload()
    },
    redirectUpload() {
      if (this.nextDisabled) return {}
      const rootFile = !!this.queue.find((e) => !e.parent)
      if (rootFile || !this.queue.length)
        return {
          name: 'workspace_id-dam-uploaded',
          params: { workspace_id: this.$getWorkspaceId() },
        }
      this.$store.dispatch('dam/getFolders').catch(console.error)
      if (this.parentFolders.size === 1)
        return {
          name: 'workspace_id-dam-folders',
          params: { workspace_id: this.$getWorkspaceId() },
          hash: `#${this.parentFolders.values().next().value}`,
        }
      return {
        name: 'workspace_id-dam-folders',
        params: { workspace_id: this.$getWorkspaceId() },
        query: this.queue.length ? { sort_by: 'updated_at' } : {},
      }
    },
    modalClose() {
      this.$refs.modalClose.click()
    },
    onUploadProgress(file, index, progress) {
      this.queue[index].progress = progress
    },
    onUploadError(index) {
      this.queue[index].error = true
      this.queue[index].success = false
      this.queue[index].deleted = false
    },
    async addFilesRecursive(
      { items = [], type, name } = {},
      appendPath,
      parentFolderId,
      rootId
    ) {
      const files = items.filter((e) => e.type === 'file')
      this.queue.push(
        ...(await Promise.all(
          files.map(
            async (fileObj) =>
              await this.transformFileObject(
                fileObj.file,
                [appendPath, fileObj.file.name].join('/'),
                parentFolderId,
                rootId
              )
          )
        ))
      )
      items
        .filter((e) => e.type === 'folder')
        .forEach(async (f) => {
          const {
            data: { id },
          } = await this.createDAMFolder(f.name, parentFolderId)
          this.addFilesRecursive(
            f,
            appendPath ? [appendPath, f.name].join('/') : appendPath,
            id,
            rootId
          )
        })
      if (type === 'folder' && !items.length) {
        this.queue.push(
          this.makeEmptyFolder(name, appendPath + '/', parentFolderId, rootId)
        )
        if (rootId && parentFolderId === rootId)
          this.sendFolderNotification(rootId)
      }
    },
    sendFolderNotification(folderId) {
      if (!this.parentFolders.has(folderId)) return
      this.$axios
        .$post('digital-assets/upload-folder-notification', {
          workspace_id: this.$getWorkspaceId(),
          category_id: folderId,
        })
        .catch((_) => {})
    },
    checkAllInFolder(folderId) {
      if (!this.parentFolders.has(folderId)) return false
      const items = this.queue.filter((e) => e.rootId === folderId)
      const allSettled =
        items.filter((e) => e.success || e.error).length === items.length
      return allSettled && items.length > 0
    },
    async createDAMFolder(folder_name, category_id) {
      const workspace_id = this.$getWorkspaceId()
      if (category_id) {
        return await this.$axios.$post(
          `digital-assets/category/add-sub-category`,
          {
            workspace_id,
            folder_name,
            category_id,
          }
        )
      }
      const { data } = await this.$axios
        .$post(`digital-assets/category/add`, {
          workspace_id,
          folder_name,
        })
        .catch(console.error)
      this.parentFolders.add(data.id)
      return { data }
    },
    async handleFolder(e) {
      e.preventDefault()
      if (this.storageFull) {
        this.$toast.global.error('You have consumed all of your storage quota.')
        return
      }
      const h = FileHandler(e.target.files)
      if (!h?.length) {
        this.$refs.folderInput.value = ''
        return
      }
      const {
        data: { id },
      } = await this.createDAMFolder(h[0].name)
      this.addFilesRecursive(h[0], '', id, id)
      this.$refs.folderInput.value = ''
    },
    async handleFile(e) {
      e.preventDefault()
      if (this.storageFull) {
        this.$toast.global.error('You have consumed all of your storage quota.')
        return
      }
      let files = FileHandler(e.target.files)
      if (!files.length) return
      files = await Promise.all(
        files.map(
          async (fileObject) => await this.transformFileObject(fileObject.file)
        )
      )
      this.queue.push(...files)
      this.$refs.fileInput.value = ''
    },
    async onFileDrop(e) {
      e.preventDefault()
      if (this.storageFull) {
        this.$toast.global.error('You have consumed all of your storage quota.')
        return
      }
      const uploads = await getDroppedFiles(e)
      const files = uploads.filter((e) => e.type === 'file')
      const folders = uploads.filter((e) => e.type === 'folder')
      if (files.length) {
        this.addFilesRecursive({ items: files })
      }
      folders.forEach(async (folder) => {
        const {
          data: { id },
        } = await this.createDAMFolder(folder.name)
        this.addFilesRecursive(folder, folder.name, id, id)
      })
    },
    traverseFileTree(item, path) {
      path = path || ''
      if (item.isFile) {
        item.file((file) => {
          this.handleFile(null, [file], path)
        })
      } else if (item.isDirectory) {
        const dirReader = item.createReader()
        dirReader.readEntries((entries) => {
          entries
            .sort((a) => a.isDirectory - a.isFile)
            .forEach((entry) => {
              this.traverseFileTree(
                entry,
                [path, item.name].filter((e) => e).join('/')
              )
            })
        })
      }
    },
    async handleUploadedFile(file, index, response) {
      const { workspace_id } = this.$route.params
      const signedUrl = await axios
        .get('/s3/get-signed-url', {
          params: {
            assetId: file.assetId,
            workspaceId: workspace_id,
          },
        })
        .catch((e) => {
          console.error(e)
          this.queue[index].success = false
          this.queue[index].error = true
        })
      if (!signedUrl) {
        if (this.checkAllInFolder(this.queue[index]?.rootId))
          this.sendFolderNotification(this.queue[index].rootId)
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
          this.queue[index].success = false
          this.queue[index].error = true
          this.$refs[`chunk_${index}`][0].errorMessage =
            this.$getErrorMessage(e)
        })
      await this.$store.dispatch('dam/updateStorage')
      if (!damUpload) {
        this.queue[index].success = false
        this.queue[index].error = true
        if (this.checkAllInFolder(this.queue[index]?.rootId))
          this.sendFolderNotification(this.queue[index].rootId)
        return
      }
      this.queue[index].success = true
      this.queue[index].error = false
      if (damUpload?.data && response?.thumbnailResponse?.signedUrl) {
        await this.$axios
          .$post('digital-assets/upload-zipfile-preview', {
            workspace_id,
            asset_id: damUpload.data.id,
            compress_file: response.thumbnailResponse.signedUrl,
          })
          .catch(console.error)
      }
      if (this.checkAllInFolder(this.queue[index]?.rootId))
        this.sendFolderNotification(this.queue[index].rootId)
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
    makeEmptyFolder(name, path, parent, rootId) {
      return {
        isEmptyDir: true,
        name,
        assetId: '',
        size: 0,
        ext: null,
        blob: { size: 0 },
        src: '',
        success: true,
        error: false,
        progress: 100,
        deleted: false,
        path,
        parent,
        rootId,
      }
    },
    async transformFileObject(file, path = '', parent, rootId) {
      if (!(file instanceof File)) {
        throw new TypeError('Invalid File', file)
      }
      const ext = getFileExt(file.name)

      let thumbnail = null
      if (this.$isImage(ext)) {
        if (file.type.startsWith('image')) {
          thumbnail = await this.readImgFile(file)
        } else {
          thumbnail = getImageIcon(ext)
        }
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
        path: file.webkitRelativePath || path,
        parent,
        rootId,
      }
    },
    deleteFile(index, assetId) {
      const { success } = this.queue[index]
      const queueItem = this.queue[index]
      this.queue[index].deleted = true
      this.queue.splice(index, 1)

      // update root folders when file is removed from upload queue
      if (!this.queue.length) this.parentFolders = new Set()
      else if (queueItem.parent && this.parentFolders.has(queueItem.parent)) {
        this.parentFolders.delete(queueItem.parent)
      }

      if (!success) return
      this.$axios
        .$post('digital-assets/delete-file', {
          workspace_id: this.$getWorkspaceId(),
          assets_ids: [assetId],
        })
        .catch(console.error)

      axios
        .delete('/s3/delete-asset', {
          data: {
            assetId,
            workspaceId: this.$getWorkspaceId(),
          },
        })
        .catch(console.error)
    },
    getDropHeight() {
      let availableHeight = 0
      const hasFiles = this.queue.length
      if (hasFiles) {
        availableHeight += 390
      }
      if (this.completed) {
        availableHeight += 45
      }
      if (this.alreadyUploaded && hasFiles) {
        availableHeight += hasFiles ? 0 : 110
      } else if (this.alreadyUploaded && !hasFiles) {
        availableHeight = 50
      }
      return `calc(100% - ${availableHeight}px)`
    },
  },
}
</script>

<style>
.top-bar {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;
  padding-left: 1rem;
}
.top-bar button {
  margin: 0 !important;
}

.uploaded-footer {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  left: calc(58px + 1rem);
  z-index: 20;
}

.uploaded-footer .btn:hover {
  background-color: white !important;
}

.no-success-msg {
  height: calc(100vh - 448px) !important;
}

.error-msg {
  height: calc(100vh - 448px) !important;
}

.upload-done {
  height: calc(100vh - 500px) !important;
}

.exists {
  height: calc(100vh - 170px) !important;
}
</style>
