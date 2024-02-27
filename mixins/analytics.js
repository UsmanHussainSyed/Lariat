const groupByCategories = [
  { text: 'All', id: 'all' },
  { text: 'Images', id: 'image' },
  { text: 'Audios', id: 'audio' },
  { text: 'Videos', id: 'video' },
  { text: 'Documents', id: 'document' },
]
const byCategories = [
  { text: 'All', id: 'all' },
  { text: 'Audios', id: 'audio' },
  { text: 'Documents', id: 'document' },
  { text: 'Images', id: 'image' },
  { text: 'Videos', id: 'video' },
]
const byDevice = [
  { text: 'All', id: 'all' },
  { text: 'Web', id: 'web' },
  { text: 'Mobile', id: 'mobile' },
]
const permissionList = [
  { text: 'All', id: 'all' },
  { text: 'Public', id: 'public' },
  { text: 'Private', id: 'private' },
]
const bySizeAsset = [
  { text: 'All', id: 'all' },
  { text: '1 Byte - 100 KB', id: '1 byte - 100 kb' },
  { text: '101 KB - 1 MB', id: '101 kb - 1 mb' },
  { text: '1 MB - 10 MB', id: '1 mb - 10 mb' },
  { text: '11 MB - 100 MB', id: '11 mb - 100 mb' },
  { text: '101 MB - 1 GB', id: '101 mb - 1 gb' },
  { text: '> 1 GB', id: '> 1 gb' },
]
const sharedUrlTypeList = [
  { text: 'All', id: 'all' },
  { text: 'Collection', id: 'collection shared url' },
  { text: 'Asset', id: 'asset shared url' },
]
const userTypeList = [
  { text: 'All', id: 'all' },
  { text: 'Admin', id: 'admin' },
  { text: 'Frontend User', id: 'frontend users' },
]
const collectionTypeList = [
  { text: 'Collection', id: 'collection' },
  { text: 'Non Collection', id: 'non collection' },
]
const sharedTypeList = [
  { text: 'Shared URL', id: 'shared url' },
  { text: 'Assets', id: 'assets' },
]
export default {
  data() {
    return {
      groupByCategories,
      byCategories,
      byDevice,
      permissionList,
      bySizeAsset,
      sharedUrlTypeList,
      userTypeList,
      collectionTypeList,
      sharedTypeList,
    }
  },
}
