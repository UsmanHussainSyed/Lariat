const initialSortingData = () => ({
  initialData: true,
  files: {
    field: 'display_file_name',
    reverse: false,
  },
  toolbar: { value: 'display_file_name', desc: false },
})

export default {
  data() {
    return {
      sorting: initialSortingData(),
    }
  },

  methods: {
    sort(path, field_name, _primer) {
      if (!field_name) return

      const primer = _primer || ((v) => v)

      const toReverse = true
      this.sorting[path].reverse =
        this.sorting[path].field === field_name
          ? !this.sorting[path].reverse
          : toReverse

      this.sorting[path].field = field_name

      if (path === 'files') {
        this.sorting.toolbar.desc = this.sorting[path].reverse
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
