<template>
  <div
    class="upload-sec"
    :class="{ 'is-dropping': isDropping }"
    @drop="onFileDrop"
    @dragenter="() => $emit('update:isDropping', true)"
    @dragover="() => $emit('update:isDropping', true)"
    @dragstart="() => $emit('update:isDropping', true)"
    @dragend="() => $emit('update:isDropping', false)"
    @dragleave="() => $emit('update:isDropping', false)"
  >
    <h2>Drop to upload</h2>
    <br />
    <p>(Note: It may take some time to fetch your large files for upload.)</p>
  </div>
</template>
<script>
import { DropHandler as getDroppedFiles } from '~/utils/fileHierarchy'

import { getFileExt, isImage, isAudio } from '~/utils'
const GENERAL_ICON = require('~/assets/img/file/general.svg')
const VIDEO_ICON = require('~/assets/img/file/video.svg')
const IMAGE_ICON = require('~/assets/img/icon/images.svg')
const AUDIO_ICON = require('~/assets/img/file/audio.svg')

function getImageIcon(ext) {
  try {
    return require(`~/assets/img/file/${ext}.svg`)
  } catch {
    return GENERAL_ICON
  }
}
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
  props: {
    isDropping: { type: Boolean, default: false },
  },
  data() {
    return {
      queue: [],
      parentFolders: new Set(),
    }
  },
  methods: {
    async onFileDrop(e) {
      e.preventDefault()
      this.$emit('update:isDropping', false)
      if (!this.$route.name.includes('workspace_id-dam')) return
      if (['archive'].includes((this.$route.hash || '#').substring(1))) return
      const uploads = await getDroppedFiles(e)
      const files = uploads.filter((e) => e.type === 'file')
      let category = parseInt(this.$route.hash.substring(1))
      if (isNaN(category)) category = null
      if (files?.length) {
        await this.addFilesRecursive({ items: files }, '', category)
        await this.$store.dispatch('dam/uploads/add', {
          value: true,
          items: this.queue,
        })
      }
      const folders = uploads.filter((e) => e.type === 'folder')
      for await (const folder of folders) {
        const {
          data: { id },
        } = await this.createDAMFolder(folder.name, category)
        await this.addFilesRecursive(folder, folder.name, id, id)
      }
      await this.$store.dispatch('dam/uploads/add', {
        value: true,
        items: this.queue,
      })
    },
    async addFilesRecursive(
      { items = [], type, name } = {},
      appendPath,
      parentFolderId,
      rootId
    ) {
      const files = items.filter((e) => e.type === 'file')
      const queueItems = await Promise.all(
        files.map(
          async (fileObj) =>
            await this.transformFileObject(
              fileObj.file,
              [appendPath, fileObj.file.name].join('/'),
              parentFolderId,
              rootId
            )
        )
      )
      this.queue.push(...queueItems)
      await this.$store.dispatch('dam/uploads/add', {
        value: true,
        items: this.queue,
      })
      this.queue = []
      items
        .filter((e) => e.type === 'folder')
        .forEach(async (f) => {
          const {
            data: { id },
          } = await this.createDAMFolder(f.name, parentFolderId)
          await this.addFilesRecursive(
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
        await this.$store.dispatch('dam/uploads/add', {
          value: true,
          items: this.queue,
        })
        this.queue = []
        if (rootId && parentFolderId === rootId)
          this.sendFolderNotification(rootId)
      }
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
    readImgFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = function () {
          resolve(reader.result)
        }
        reader.readAsDataURL(file)
      })
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
    sendFolderNotification(folderId) {
      if (!this.parentFolders.has(folderId)) return
      this.$axios
        .$post('digital-assets/upload-folder-notification', {
          workspace_id: this.$getWorkspaceId(),
          category_id: folderId,
        })
        .catch((_) => {})
    },
    async createDAMFolder(folder_name, category_id) {
      const workspace_id = this.$getWorkspaceId()
      if (category_id) {
        const folderData = await this.$axios.$post(
          `digital-assets/category/add-sub-category`,
          {
            workspace_id,
            folder_name,
            category_id,
          }
        )
        this.$axios
          .$post('digital-assets/category/view', {
            workspace_id: this.$getWorkspaceId(),
            category_id,
          })
          .then(({ data }) => {
            const params = {
              group_id: data.group_id,
              permission_type: data.permission_type,
              category_id: folderData.data.id,
              workspace_id: this.$getWorkspaceId(),
            }
            if (data.permission_type === 'public')
              params.permission_type = 'public'
            else if (data.permission_type === 'user') {
              params.permission_type = 'user'
              if (data.permission === 'all') {
                params.dam_user_id = 'all'
              } else {
                params.dam_user_id = data.permission
                  .split(',')
                  .filter((e) => e)
                  .map((e) => parseInt(e))
              }
            } else {
              params.permission_type = 'group'
              params.dam_user_id = data.permission
                .split(',')
                .filter((e) => e)
                .map((e) => parseInt(e))
            }
            this.$axios
              .$post('digital-assets/permission/folder-permission', params)
              .then(() => {
                this.$store.commit('dam/setFolderItem', folderData.data)
                const folder = this.$deepSearch(
                  this.$store.state.dam.folderList,
                  'id',
                  (_, id) => parseInt(params.category_id) === parseInt(id)
                )
                this.$store.commit('dam/updateFolderPermission', {
                  folder,
                  permission: {
                    type: params.permission_type,
                    value:
                      params.permission_type === 'group'
                        ? params.dam_user_id.join(',')
                        : Array.isArray(params.dam_user_id)
                        ? params.dam_user_id.join(',')
                        : params.dam_user_id,
                  },
                })
                this.$nuxt.$emit('update-category', {
                  categoryId: parseInt(folder.parent_id),
                  folders: [folder],
                })
              })
              .catch(console.error)
          })
          .catch(console.error)
        if (
          parseInt(folderData.data.category_id) ===
          parseInt(this.$route.hash.substring(1))
        ) {
          this.$nuxt.$emit('update-category', {
            categoryId: parseInt(this.$route.hash.substring(1)),
            folders: [{ ...folderData.data }],
          })
        }
        return folderData
      }
      const { data } = await this.$axios
        .$post(`digital-assets/category/add`, {
          workspace_id,
          folder_name,
        })
        .catch(console.error)
      if (data) {
        this.$store.commit('dam/setFolderItem', data)
        this.parentFolders.add(data.id)
        this.$nuxt.$emit('update-category', {
          folders: [data],
        })
      }
      return { data }
    },
    checkAllInFolder(folderId) {
      if (!this.parentFolders.has(folderId)) return false
      const items = this.queue.filter((e) => e.rootId === folderId)
      const allSettled =
        items.filter((e) => e.success || e.error).length === items.length
      return allSettled && items.length > 0
    },
  },
}
</script>
<style scoped>
.upload-sec {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  align-items: center;
  justify-content: center;
  color: whitesmoke;
  display: none;
  border: none;
}
.upload-sec.is-dropping {
  display: flex;
  flex-direction: column;
}
.upload-sec.is-dropping:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background: rgba(0, 0, 0, 0.675);
}
</style>
