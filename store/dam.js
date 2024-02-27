/* eslint-disable camelcase */
import axios from 'axios'
import { deepSearch, toQueryString } from '../utils'
import { makeMutations } from '~/utils/helper'

const _state = () => ({
  currentWorkspaceId: 0,
  foldersLoading: false,
  fetchingInstances: false,
  newFolderCount: 0,
  folderList: [],
  recentlyUploadedFiles: [],
  downloadIndicator: {
    pinned: false,
    expanded: false,
    count: 0,
    files: {},
  },
  damInstance: {},
  companyName: '',
  collectionList: [],
  collectionLoading: false,
  collectionId: 0,
  assetList: [],
  startIndex: 0,
  activeSelection: [],
  assetObject: {},
  storage: {
    image: 0,
    audio: 0,
    video: 0,
    document: 0,
    used: 0,
    available: 0,
    total: 0,
    percentage: 0,
  },
  pictureInPicture: {},
  notifications: {},
  columnViews: [],
  uploads: [],
  brandingDetails: null,
})

const crypto = require('crypto')
const _id = () => crypto.randomBytes(64).toString('hex')
export { _state as state }

// const prefixDownloadURl = 'https://cors-anywhere.herokuapp.com/'

export const mutations = {
  ...makeMutations(
    'currentWorkspaceId',
    'foldersLoading',
    'recentlyUploadedFiles',
    'damInstance',
    'companyName',
    'folderList',
    'downloadIndicator.pinned',
    'downloadIndicator.expanded',
    'fetchingInstances',
    'collectionList',
    'collectionLoading',
    'assetList',
    'activeSelection',
    'storage',
    'notifications',
    'brandingDetails'
  ),
  updateStorage(state, { key, value }) {
    state.storage[key] = value
  },
  // update asset count in subfolders of current folder after moving
  updateAssetCount(state, { id, updatedTotalCount, indexOfParent }) {
    state.assetList[indexOfParent] = state.assetList[indexOfParent].map(
      (item) => {
        if (item?.folder?.id === id && item?.folder !== undefined) {
          item.folder.total_assets = updatedTotalCount
          item.folder.total_contain =
            updatedTotalCount + item.folder.sub_category_count
        }
        return item
      }
    )
  },
  // asset detail change
  assetDetialsChange(state, { name, value, fileId, indexOfParent }) {
    state.assetList[indexOfParent] = state.assetList[indexOfParent].map(
      (item) => {
        if (item?.file?.id === fileId && item?.file !== undefined) {
          if (name === 'permission') {
            item.file.is_public = value
          } else if (name === 'editorial') {
            item.file.is_editorial_use = value
          } else if (name === 'tags') {
            item.file.tags.push(value)
          } else if (name === 'removeTags') {
            item.file.tags.splice(value, 1)
          }
        }
        return item
      }
    )
  },
  // refreshed data
  refreshedData(state, { fol, currentFolderId }) {
    if (fol.length !== 0) {
      state.assetList.unshift(fol)
      state.assetObject[currentFolderId] = fol
    }
    if (state.assetList.length > 3) {
      state.startIndex = state.assetList.length - 3
    } else if (state.assetList.length === 3) {
      state.startIndex = 0
    }
  },
  // delete active folder data
  deleteActiveFolder(state, indexSelectedFolderId) {
    state.assetList.splice(indexSelectedFolderId)
  },
  // move assets feature
  removeAssets(state, { indexOfOwnParent, assetIds }) {
    state.assetList[indexOfOwnParent] = state.assetList?.[
      indexOfOwnParent
    ]?.filter((item) => {
      let toBedeleted = null
      if (item?.folder?.id !== undefined) {
        toBedeleted = item?.folder?.id
      } else if (item?.file?.id !== undefined) {
        toBedeleted = item?.file?.id
      }
      return !assetIds.includes(toBedeleted)
    })
  },
  // update folder name in panel view
  updateFolderName(state, { folders, indexOfParent }) {
    const x = state.assetList
    x[indexOfParent] = folders
    state.assetList = JSON.parse(JSON.stringify(x))
  },
  // delete folders form panel view
  deleteFolder(state, { resourcesIds, indexOfParent }) {
    state.assetList[indexOfParent] = state.assetList?.[indexOfParent]?.filter(
      (item) => {
        let toBedeleted = null
        if (item?.folder?.id !== undefined) {
          toBedeleted = item?.folder?.id
        } else if (item?.file?.id !== undefined) {
          toBedeleted = item?.file?.id
        }
        return !resourcesIds.includes(toBedeleted)
      }
    )

    state.activeSelection = state.activeSelection.filter((item) => {
      return !resourcesIds.includes(item)
    })

    if (state.assetList?.[indexOfParent]?.length === 0) {
      state.assetList.splice(indexOfParent, 1)
    }
  },
  deleteFolder2(state, folderId) {
    state.folderList = state.folderList.filter((e) => e.id !== folderId)
  },
  // add folder to panel
  changeFolderPanel(state, { fol, currentFolderId }) {
    state.assetList?.[currentFolderId].unshift(fol)
  },
  // sorting panel
  panelSorting(state, folders) {
    const toBesorted = state.activeSelection?.length - 1
    state.assetList[toBesorted] = folders
  },
  // remove asset list
  removeAssetList(state, parentFolderId) {
    state.assetList = state.assetList.filter((item, index) => {
      return (
        parentFolderId[index] !== undefined &&
        (item[0]?.folder?.parent_id === parentFolderId[index] ||
          item[0]?.file?.parent_id === parentFolderId[index])
      )
    })
  },
  // add folder id to active selection
  addToactiveSelection(state, parentFolderId) {
    if (parentFolderId === null) {
      state.activeSelection.push(parentFolderId)
    } else {
      state.activeSelection = parentFolderId
    }
  },

  // delete asset from collection
  removeAsset(state, { collectionId, assetIds }) {
    state.collectionList = state.collectionList.map((item) => {
      if (item.id === collectionId) {
        for (const asset of assetIds) {
          item.assets_id = item.assets_id.filter((data) => {
            if (data === asset) {
              item.assets_count--
            }
            return data !== asset
          })
        }
      }
      return item
    })
  },
  // delete collection
  updateCollectionList(state, collectionId) {
    const data = state.collectionList.filter((item) => item.id !== collectionId)
    state.collectionList = data
  },
  // add to collection
  addNewCollection(state, newCollection) {
    state.collectionList.unshift(newCollection)
  },
  // folder name updation
  setFolderName(state, { oldFolder, newName }) {
    if (oldFolder.parent_id === null && state.assetList.length) {
      state.assetList[0] = state.assetList?.[0].map((item) => {
        if (item?.folder?.id === oldFolder.id) {
          item.folder.folder_name = newName
          item.folder.category_name = newName
        }
        return item
      })
    }
    const data = state.folderList.map((item) => {
      if (item.id === oldFolder.id) {
        item.folder_name = newName
      }
      return item
    })
    state.folderList = data.sort(this.$sortBy('folder_name', false, null, true))
  },
  updateFolderPermission(state, { folder, permission, columnId }) {
    if (folder.parent_id === null && state.assetList.length) {
      state.assetList[0] = state.assetList?.[0].map((item) => {
        if (item?.folder?.id === folder.id) {
          if (permission.type === 'group') {
            item.folder.groups = permission.value
          } else item.folder.permission = permission.value
          item.folder.permission_type = permission.type
        }
        return item
      })
    }
    const data = state.folderList.map((item) => {
      if (item.id === folder.id) {
        if (permission.type === 'group') {
          item.groups = permission.value
        } else item.permission = permission.value
        item.permission_type = permission.type
      }
      return item
    })
    state.folderList = data.sort(this.$sortBy('folder_name', false, null, true))
    const _columnId = parseInt(columnId)
    if (!isNaN(_columnId)) {
      const column = state.columnViews.find(
        (e) => parseInt(e.columnId) === parseInt(_columnId)
      )
      if (column) {
        column.folders = column.folders.map((item) => {
          if (parseInt(item.id) === parseInt(folder.id)) {
            if (permission.type === 'group') {
              item.groups = permission.value
            } else item.permission = permission.value
            item.permission_type = permission.type
          }
          return item
        })
      }
    }
  },

  // file name updation
  setFileName(state, { oldFile, newName }) {
    if (!state.assetList.length) return
    const listCount = state.assetList.length
    let columnIndex
    for (let i = 0; i < listCount; i++) {
      if (state.assetList[i].find((e) => e.file?.id === oldFile.id)) {
        columnIndex = i
        break
      }
    }
    state.assetList[columnIndex] = state.assetList?.[columnIndex].map(
      (item) => {
        if (item?.file?.id === oldFile.id) {
          item.file.display_file_name = newName
        }
        return item
      }
    )
    state.assetList[columnIndex] = state.assetList[columnIndex].sort(
      this.$sortBy('folder_name', false, null, true)
    )
  },
  // collection name updation
  setCollectionName(state, { oldCollection, newName }) {
    const data = state.collectionList.map((item) => {
      if (item.id === oldCollection.id) {
        item.name = newName
      }
      return item
    })
    state.collectionList = data
  },
  incrementFolderCount(state) {
    state.newFolderCount += 1
  },
  resetNewFolderCount(state) {
    state.newFolderCount = 0
  },
  setFolderItem(state, item) {
    if (!state.folderList.length) return

    if (item.parent_id) {
      const parent = deepSearch(
        state.folderList,
        'id',
        (_, id) => item.parent_id === id
      )

      if (!parent) return

      const folder = deepSearch(
        state.folderList,
        'id',
        (_, id) => item.id === id
      )

      if (folder) Object.assign(folder, item)
      else {
        if (!parent.sub_category_data) parent.sub_category_data = []
        const index = parent.sub_category_data.findIndex(
          ({ id }) => id === item.id
        )

        if (~index) parent.sub_category_data[index] = item
        else parent.sub_category_data.push(item)
        parent.sub_category_count = parent.sub_category_data.length
      }
    } else {
      const folder = deepSearch(
        state.folderList,
        'id',
        (_, id) => item.id === id
      )

      if (!folder) return
      Object.assign(folder, item)
    }

    state.folderList = [...state.folderList]
  },
  setRecentlyUploadedFile(state, item) {
    const temp = [...state.recentlyUploadedFiles]

    const index = temp.findIndex(({ id }) => item.id === id)

    if (~index) temp[index] = item
    else temp.push(item)

    state.recentlyUploadedFiles = temp
  },
  setDownloadingItem(state, { item, id }) {
    if (!state.downloadIndicator.files[id])
      state.downloadIndicator.files[id] = Object.assign({}, item)
    else Object.assign(state.downloadIndicator.files[id], item)

    state.downloadIndicator.count = Object.keys(
      state.downloadIndicator.files
    ).length

    state.downloadIndicator = Object.assign({}, state.downloadIndicator)
  },
  removeDownloadingItem(state, id) {
    delete state.downloadIndicator.files[id]
    state.downloadIndicator.count = Object.keys(
      state.downloadIndicator.files
    ).length
  },
  resetState(state) {
    Object.assign(state, _state())
  },
  pictureInPicture(state, resource) {
    if (Object.keys(state.pictureInPicture).length) {
      state.pictureInPicture.pause()
      state.pictureInPicture.removeEventListener(
        'leavepictureinpicture',
        onPIPExit
      )
    }
    resource.setAttribute(
      'source-route',
      window?.location?.pathname || this.$router.currentRoute.path
    )
    state.pictureInPicture = resource
    state.pictureInPicture.addEventListener('leavepictureinpicture', onPIPExit)
  },
  setNotifications(state, value = {}) {
    state.notifications = value
  },
  addColumnView(state, column) {
    state.columnViews.push(column)
  },
  clearColumnView(state, from = 0) {
    state.columnViews = state.columnViews.slice(0, Math.max(0, from))
  },
  updateColumnView(state, { columnId, mutations = {} }) {
    if (!Object.keys(mutations).length) return
    const columnIndex = state.columnViews.findIndex(
      (e) => e.columnId === columnId
    )
    if (columnIndex < 0) return
    Object.keys(mutations).forEach((key) => {
      if (Object.keys(state.columnViews[columnIndex]).includes(key)) {
        state.columnViews[columnIndex][key] = mutations[key]
      }
    })
  },
  addNewUploads(state, { items }) {
    for (const item of items) {
      item.uploadId = _id()
      state.uploads.push(item)
    }
  },
  updateUpload(state, { uploadId, mutations }) {
    const uploadItem = state.uploads.find((e) => e.uploadId === uploadId)
    Object.keys(mutations).forEach((key) => {
      uploadItem[key] = mutations[key]
    })
  },
  removeUpload(state, { uploadId }) {
    state.uploads = state.uploads.filter((e) => e.uploadId !== uploadId)
  },
  clearAllUploads(state) {
    state.uploads = []
  },
  // pauseUploads(state) {
  //   state.uploads.forEach((e) => (e.uploadPaused = true))
  // },
  // resumeUploads(state) {
  //   state.uploads.forEach((e) => (e.uploadPaused = false))
  // },
}
function onPIPExit(el) {
  if (!el?.target) return
  if (el.target.getAttribute('source-route') !== location.pathname) {
    location.pathname = el.target.getAttribute('source-route')
  }
}
export const actions = {
  shouldResetDamState({ currentWorkspaceId }) {
    const workspace_id =
      this.app.router.current?.params.workspace_id || this.$getWorkspaceId()

    return workspace_id?.toString() !== currentWorkspaceId?.toString()
  },
  async getInstances({ commit, state }, workspace_id) {
    workspace_id =
      workspace_id ||
      this.app.router.current?.params.workspace_id ||
      this.$getWorkspaceId()

    if (!workspace_id) return
    commit('fetchingInstances', true)

    return await this.$axios
      .$get(
        'digital-assets/instance/get?' +
          toQueryString({
            url_workspace_id: workspace_id,
            workspace_id,
          })
      )
      .then(({ data }) => {
        commit('companyName', data.company_name)
        const damInstance = {
          id: data.instance.id,
          text: data.instance.brand_name,
          brandUrl: data.instance.url,
          loginUrl: data.instance.login_url,
          is_domain: data.instance.is_domain,
          urlSlug: data.instance.workspace.url_slug,
          is_slider: data.instance.is_slider,
          settings: data.instance.settings,
          show_dashboard_walkThrough: !!data.dashboard_walkthrough,
        }
        commit('fetchingInstances', false)

        commit('damInstance', damInstance)
        commit('storage', {
          used: data.use_storage,
          total: data.total_storage,
          percentage:
            data.total_storage === 'unlimited'
              ? 1
              : data.storage_percentage > 100
              ? 100
              : data.storage_percentage,
          available:
            data.total_storage === 'unlimited'
              ? 'unlimited'
              : Math.max(data.total_storage - data.use_storage, 0),
          audio: state.storage.audio || 0,
          video: state.storage.video || 0,
          image: state.storage.image || 0,
          document: state.storage.document || 0,
        })
        commit('currentWorkspaceId', data.instance.workspace_id)
        return damInstance
      })
      .catch((_) => {})
      .finally(() => commit('fetchingInstances', false))
  },
  updateStorage({ commit }) {
    return this.$axios
      .$get('digital-assets/storage-analytics')
      .then(({ data }) => {
        const {
          audio_size,
          document_size,
          image_size,
          total_storage,
          use_storage,
          video_size,
        } = data
        const storageItems = {
          image: image_size,
          audio: audio_size,
          video: video_size,
          document: document_size,
          used: use_storage,
          available:
            total_storage === 'unlimited'
              ? 'unlimited'
              : Math.max(total_storage - use_storage, 0),
          total: total_storage,
          percentage:
            total_storage === 'unlimited'
              ? 1
              : Number((use_storage / total_storage) * 100).toFixed(2),
        }
        if (storageItems.percentage > 100) storageItems.percentage = 100
        Object.keys(storageItems).forEach((e) => {
          commit('updateStorage', { key: e, value: storageItems[e] })
        })
      })
  },
  getFolders({ commit, state }) {
    console.log('getfolders')
    commit('foldersLoading', true)
    return this.$axios
      .$get(
        'digital-assets/category/list?' +
          toQueryString({ workspace_id: this.$getWorkspaceId() })
      )
      .then(({ data }) =>
        commit(
          'folderList',
          data.sort(this.$sortBy('folder_name', false, null, true))
        )
      )
      .catch()
      .finally(() => commit('foldersLoading', false))
  },
  async setBranding({ commit }, { workspace_id, isSetFavicon }) {
    await this.$axios
      .$post('get-branding', {
        workspace_id,
      })
      .then(({ data }) => {
        if (isSetFavicon) {
          this.$setPageMetaFavicon(
            data.branding.brand_favicon || '/favicon.png'
          )
        }
        commit('brandingDetails', data)
      })
      .catch(this.$errorToast)
  },
  // update asset count in subfolders of current folder after moving
  updateAssetCount({ commit }, { id, updatedTotalCount, indexOfParent }) {
    commit('updateAssetCount', { id, updatedTotalCount, indexOfParent })
  },
  // panel sort
  panelSorting({ commit }, folders) {
    return commit('panelSorting', folders)
  },
  // add folder id to active selection
  activeSelectionArray({ commit }, parentFolderId) {
    commit('addToactiveSelection', parentFolderId)
  },
  // change parent panel
  changeFolderPanel({ commit }, { fol, currentFolderId }) {
    return commit('changeFolderPanel', { fol, currentFolderId })
  },
  // remove from column
  removeAsset({ commit }, parentFolderId) {
    return commit('removeAssetList', parentFolderId)
  },
  // delete folders from panel view
  deleteFolder({ commit }, { resourcesIds, indexOfParent }) {
    return commit('deleteFolder', { resourcesIds, indexOfParent })
  },
  deleteFolder2({ commit }, folderId) {
    return commit('deleteFolder2', folderId)
  },
  // update folder name in panal view
  updateFolderName({ commit }, { folders, indexOfParent }) {
    commit('updateFolderName', { folders, indexOfParent })
  },
  // move assets
  moveAssets({ commit }, { indexOfOwnParent, assetIds }) {
    return commit('removeAssets', { indexOfOwnParent, assetIds })
  },
  // delete active folder data
  deleteActiveFolder({ commit }, indexSelectedFolderId) {
    commit('deleteActiveFolder', indexSelectedFolderId)
  },
  // refreshed data
  refreshedData({ commit }, { fol, currentFolderId }) {
    commit('refreshedData', { fol, currentFolderId })
  },
  // asset detail change
  assetDetialsChange({ commit }, { name, value, fileId, indexOfParent }) {
    return commit('assetDetialsChange', { name, value, fileId, indexOfParent })
  },

  // collection list
  getCollections({ commit, state }) {
    return this.$axios
      .$get(
        'digital-assets/collection/get-all?' +
          toQueryString({ workspace_id: this.$getWorkspaceId() })
      )
      .then(({ data }) => commit('collectionList', data))
      .catch()
  },
  // add to collection
  addCollection({ commit }, newCollection) {
    commit('addNewCollection', newCollection)
  },
  // delete collection
  deleteCollection({ commit }, collectionId) {
    commit('collectionLoading', true)
    return (
      this.$axios
        .$delete(
          `digital-assets/collection/delete/${collectionId}?` +
            toQueryString({ workspace_id: this.$getWorkspaceId() })
        )
        .then(({ message }) => {
          this.$toast.global.success(message)
          commit('updateCollectionList', collectionId)
        })
        /* .catch(this.$errorToast) */
        .catch()
        .finally(() => commit('collectionLoading', false))
    )
  },
  // folder name updation
  renameFolders({ commit }, { oldFolder, newName }) {
    return commit('setFolderName', { oldFolder, newName })
  },
  // file name updation
  renameFiles({ commit }, { oldFile, newName }) {
    return commit('setFileName', { oldFile, newName })
  },
  // collection name updation
  renameCollection({ commit }, { oldCollection, newName }) {
    commit('setCollectionName', { oldCollection, newName })
  },
  // delete assets from collection
  deleteAssets({ commit }, { collectionId, assetIds }) {
    commit('collectionLoading', true)
    return (
      this.$axios
        .$delete(
          `digital-assets/collection/${collectionId}/remove-assets?` +
            toQueryString({ workspace_id: this.$getWorkspaceId() }),
          {
            params: {
              assets_id: assetIds,
            },
          }
        )
        .then(({ message }) => {
          this.$toast.global.success(message)
          commit('removeAsset', { collectionId, assetIds })
        })
        /* .catch(this.$errorToast) */
        .catch()
        .finally(() => commit('collectionLoading', false))
    )
  },
  recentUpload({ commit }) {
    return this.$axios
      .$get(
        'digital-assets/total-recent?' +
          toQueryString({ workspace_id: this.$getWorkspaceId() })
      )
      .then(({ data }) => {
        return data.total_uploaded
      })
      .catch(this.$errorToast)
  },
  removeFolderFromList({ commit, state }, item) {
    let tempArray = [...state.folderList]

    let parent =
      (item.parent_id &&
        deepSearch(tempArray, 'id', (_, id) => item.parent_id === id)) ||
      null

    if (parent && parent.sub_category_data && parent.sub_category_data.length) {
      parent = Object.assign({}, parent)

      parent.sub_category_data = parent.sub_category_data.filter(
        ({ id }) => id !== item.id
      )
      parent.sub_category_count -= 1
      commit('setFolderItem', parent)
    } else {
      tempArray = tempArray.filter(({ id }) => id !== item.id)
      commit('folderList', tempArray)
    }
  },

  downloadMultipleFiles(
    {
      dispatch,
      commit,
      state: {
        downloadIndicator: { files: stateFiles },
      },
    },
    { files, folders, collection_id, shareMode = false }
  ) {
    const id = btoa(JSON.stringify({ files, folders }))

    if (stateFiles[id] && stateFiles[id].downloading) return

    this.$axios
      .$post('digital-assets/dashboard/download-multiple-files', {
        workspace_id: this.$getWorkspaceId(),
        digital_assets_id: files,
        category_id: folders,
        collection_id,
      })
      .then((response) => {
        if (response.data.url) {
          const item = {
            id,
            url: id,
            name: 'Zipping selected files/folders',
            progress: 0,
            loaded: 0,
            total: 0,
            downloading: false,
          }

          commit('setDownloadingItem', { id, item })
          commit('downloadIndicator.pinned', true)
          commit('downloadIndicator.expanded', true)

          const zipUrl = response.data.url
          const name = response.data.file_name
          const orgUrl = response.data.file_name

          return dispatch('downloadFile', {
            id,
            name,
            url: zipUrl,
            callCountApi: false,
            multiple: true,
            extras: { orgUrl },
          }).then(() => {
            this.$axios.$post('digital-assets/dashboard/delete-file', {
              workspace_id: this.$getWorkspaceId(),
              file_name: orgUrl,
            })
          })
        } else {
          this.$successToast(
            'You will be receiving an email with zip file download link shortly!'
          )
        }
      })
      .catch((e) => {
        this.$errorToast(e)
      })
      .finally(() => {
        commit('removeDownloadingItem', id)
      })
  },
  async downloadMultipleSharedFiles(
    {
      dispatch,
      commit,
      state: {
        downloadIndicator: { files: stateFiles },
      },
    },
    { files, folders, shareId, shareWorkspaceId, shareMode = false }
  ) {
    const id = btoa(JSON.stringify({ files, folders }))

    if (stateFiles[id] && stateFiles[id].downloading) return

    // const baseUrl =
    //   this.$config.backendUrl ||
    //   process.env.BACKEND_URL ||
    //   process.env.BACKAND_URL ||
    //   'http://marcom3-dev.whitelabeliq.net'
    // if (files.length > 1 && !folders.length) {
    const item = {
      id,
      url: id,
      name:
        files.length === 1 && folders.length === 0
          ? ''
          : 'Zipping selected files/folders',
      progress: 0,
      loaded: 0,
      total: 0,
      downloading: false,
    }

    commit('setDownloadingItem', { id, item })
    commit('downloadIndicator.pinned', true)
    commit('downloadIndicator.expanded', true)
    //  }
    let zipUrl = ''
    let name
    let orgUrl
    try {
      const {
        data: { url, file_name },
      } = await this.$axios.$post('share-assets-download', {
        workspace_id: shareWorkspaceId,
        digital_assets_id: files,
        category_id: folders,
        share_id: shareId,
        download_by: 'desktop',
      })
      orgUrl = file_name
      zipUrl = url
      name = file_name
    } catch (e) {
      this.$errorToast(e)
      commit('removeDownloadingItem', id)
      return
    }

    return dispatch('downloadFile', {
      id,
      name,
      url: zipUrl,
      callCountApi: false,
      multiple: true,
      extras: { orgUrl },
    }).then(() => {
      if (files.length !== 1 || folders.length !== 0) {
        this.$axios.$post('delete-file', {
          workspace_id: this.$getWorkspaceId(),
          file_name: orgUrl,
        })
      }
    })
  },
  downloadFile(
    {
      commit,
      state: {
        downloadIndicator: { files: stateFiles },
      },
    },
    {
      id,
      url,
      name,
      collection_id,
      callCountApi = true,
      useModernDownload = false,
      extras = {},
      multiple,
      fallback_route,
      workspace_id,
    }
  ) {
    if (stateFiles[id] && stateFiles[id].downloading) return

    if (!multiple && !useModernDownload) {
      if (collection_id) {
        return this.$downloadCollectionAsset(
          'Digital Assets',
          id,
          collection_id,
          fallback_route,
          workspace_id
        )
      } else {
        return this.$downloadAsset(
          'Digital Assets',
          id,
          fallback_route,
          workspace_id
        )
      }
    }

    const item = {
      url,
      name,
      progress: 0,
      loaded: 0,
      total: 0,
      downloading: true,
      ...extras,
    }

    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    item.source = source

    commit('setDownloadingItem', { id, item })

    return axios
      .get(url, {
        cancelToken: source.token,
        responseType: 'blob',
        headers: {
          ...(multiple
            ? {}
            : {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
              }),
        },
        onDownloadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          item.progress = percentCompleted
          item.loaded = progressEvent.loaded
          item.total = progressEvent.total

          commit('setDownloadingItem', { id, item })
        },
      })
      .then(({ data }) => {
        const url = window.URL.createObjectURL(new Blob([data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()

        commit('removeDownloadingItem', id)

        return item
      })
      .catch((e) => {
        item.downloading = false
        item.errorMessage = this.$getErrorMessage(e)

        commit('removeDownloadingItem', id)
        this.$errorToast(item.errorMessage)
      })
  },
  moveFilesToCategory({ dispatch }, { parentFolderId, fileIds, mode }) {
    const url = 'digital-assets/multiple-file-move-to-folder'

    return this.$axios
      .$post(url, {
        workspace_id: this.$getWorkspaceId(),
        digital_assets_id: fileIds,
        category_id: parentFolderId,
      })
      .then(({ message }) => {
        this.$toast.global.success(message)
      })
      .catch(this.$errorToast)
      .finally(() => (this.loading = false))
  },
  moveFoldersToCategory({ dispatch }, { parentFolderId, moveFolderId }) {
    const url = 'digital-assets/category/move-category' // move folder and add to folder

    return this.$axios
      .$post(url, {
        workspace_id: this.$getWorkspaceId(),
        move_id: parentFolderId,
        id: moveFolderId,
      })
      .then(({ message }) => {
        this.$toast.global.success(message)
      })
      .catch(this.$errorToast)
      .finally(() => (this.loading = false))
  },
  getNotifications({ commit, state }) {
    return new Promise((resolve) => {
      const workspace_id =
        this.app.router.currentRoute?.params.workspace_id ||
        this.$getWorkspaceId()
      this.$axios
        .$get('digital-assets/notification/organization-list', {
          params: {
            workspace_id,
          },
        })
        .then(({ data }) => {
          commit('setNotifications', data)
        })
        .catch((_) => {})
        .finally(() => resolve(state.notifications))
    })
  },
  'columnViews/add'(
    { state, commit },
    {
      parentFolderId,
      folders = [],
      files = [],
      active,
      totalAssetsCount = 0,
      totalFoldersCount = 0,
    }
  ) {
    if (!parentFolderId) commit('clearColumnView', 0)
    commit('addColumnView', {
      parentId: parentFolderId,
      columnId: state.columnViews.length,
      folders,
      files,
      active,
      selectedFiles: [],
      selectedFolders: [],
      // total counts at server side
      totalAssetsCount,
      totalFoldersCount,
    })
  },
  'columnViews/update'({ commit }, { columnId, mutations }) {
    commit('updateColumnView', { columnId, mutations })
  },
  'columnViews/clear'({ commit }, { from }) {
    commit('clearColumnView', from)
  },
  'uploads/add'({ commit }, { items = [] }) {
    if (items.length) commit('addNewUploads', { items })
  },
  'uploads/update'({ state, commit }, { uploadId, mutations = {} }) {
    if (
      uploadId &&
      state.uploads.find((e) => e.uploadId === uploadId) &&
      Object.keys(mutations).length
    )
      commit('updateUpload', { uploadId, mutations })
  },
  'uploads/remove'({ state, commit }, { uploadId }) {
    if (uploadId && state.uploads.find((e) => e.uploadId === uploadId))
      commit('removeUpload', { uploadId })
  },
  'uploads/clear'({ state, commit }) {
    if (state.uploads.length) commit('clearAllUploads')
  },
}
