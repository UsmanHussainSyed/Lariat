const initialSortingData = () => ({
  initialData: true,
  files: {
    field: 'display_file_name',
    reverse: false,
  },
  subFolders: {
    field: 'display_file_name',
    reverse: false,
  },
  toolbar: { value: 'display_file_name', desc: false },
  totalAssetCount: '12',
})

export default {
  data() {
    return {
      sorting: initialSortingData(),
    }
  },

  methods: {
    changeEmitAssetCount(data) {
      this.sorting.totalAssetCount = data
      return this.prefetch()
    },
    apiSortValue() {
      return this.sorting.toolbar.value === 'Sort by'
        ? 'updated_at'
        : this.sorting.toolbar.value || 'updated_at'
    },
    apiSortOrder() {
      const order = this.sorting.files.reverse
      return order ? 'DESC' : 'ASC'
    },
    sort(path, field_name, _primer) {
      if (!field_name) return
      let tst = null
      if (
        this.$route.name.search('collection') > -1 ||
        this.$route.name.search('analytics') > -1
      ) {
        if (path === 'subFolders') {
          tst = 2
          return
        } else {
          tst = -1
        }
      } else {
        tst = this.lastPage
      }
      const primer = _primer || ((v) => v)
      const hasPages = tst > 1

      const toReverse = true
      this.sorting[path].reverse =
        this.sorting[path].field === field_name
          ? !this.sorting[path].reverse
          : toReverse

      this.sorting[path].field = field_name
      if (path === 'files') {
        this.sorting.toolbar.desc = this.sorting[path].reverse
      }

      if (hasPages) {
        if (path === 'subFolders') return
        return this.prefetch()
      }

      this[path] = this[path].sort(
        this.$sortBy(
          this.sorting[path].field,
          this.sorting[path].reverse,
          (x) => primer(x, this.sorting[path].reverse)
        )
      )
    },
  },
}
