const categories = [
  'video',
  'audio',
  'image',
  'application',
  'archive',
  'uncategorized',
]
export default {
  data() {
    return {
      selectedFiles: [],
      selectedFolders: [],
      parentOfselected: null,
      currentFolder: false,
    }
  },
  computed: {
    selection() {
      return this.selectedFiles.reduce((obj, { id }) => {
        obj[id] = true
        return obj
      }, {})
    },
    folderSelection() {
      return this.selectedFolders.reduce((obj, { id }) => {
        obj[id] = true
        return obj
      }, {})
    },
  },
  methods: {
    selectNone() {
      if (this.resourceType) {
        this.resource = []
        this.resourceType = null
      } else {
        this.selectedFiles = []
        this.selectedFolders = []
      }
    },
    toggleFolderSelection(folder) {
      if (
        folder.parent_id === parseInt(this.hashParam) ||
        (folder.parent_id === null && isNaN(parseInt(this.hashParam)))
      ) {
        this.currentFolder = true
      } else {
        this.currentFolder = false
      }
      const previous = this.selectedFolders[this.selectedFolders.length - 1]
      const fileSelection = this.selectedFiles[this.selectedFiles.length - 1]

      if (
        fileSelection !== undefined &&
        fileSelection?.category_id !== folder?.parent_id
      ) {
        this.selectedFiles = []
      }
      if (previous && previous.parent_id !== folder.parent_id) {
        this.selectedFolders = []
      }
      const index = this.selectedFolders.findIndex(({ id }) => folder.id === id)
      if (~index) {
        this.selectedFolders.splice(index, 1)
      } else {
        this.selectedFolders.push(folder)
      }

      if (this.selectedFolders.length === 0) {
        this.parentOfselected = null
      } else {
        this.parentOfselected = folder.parent_id
      }
    },
    toggleSelection(file) {
      if (
        file.category_id === parseInt(this.hashParam) ||
        categories.includes(this.hashParam)
      ) {
        this.currentFolder = true
      } else {
        this.currentFolder = false
      }
      if (
        !categories.includes(this.hashParam) &&
        this.$route.name.search('collection') === -1 &&
        this.$route.name.search('search') !== -1 &&
        this.$route.name.search('trash') === -1
      ) {
        const previous = this.selectedFiles[this.selectedFiles.length - 1]
        const folderSelection =
          this.selectedFolders[this.selectedFolders.length - 1]

        if (
          folderSelection !== undefined &&
          folderSelection?.parent_id !== file?.category_id
        ) {
          this.selectedFolders = []
        }
        if (previous && previous.category_id !== file.category_id) {
          this.selectedFiles = []
        }
      }
      const index = this.selectedFiles.findIndex(({ id }) => file.id === id)
      if (~index) {
        this.selectedFiles.splice(index, 1)
      } else {
        this.selectedFiles.push(file)
      }

      if (this.selectedFiles.length === 0) {
        this.parentOfselected = null
      } else {
        this.parentOfselected = file.category_id
      }
    },
  },
}
