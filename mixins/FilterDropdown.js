import $ from 'jquery'
export default {
  mounted() {
    this.loadJQUERY()
  },
  methods: {
    loadJQUERY() {
      $('.filter-dropdown-toggle').click(function () {
        $(this).parents('.filter-dropdown').toggleClass('open')
      })
      $(document).mouseup(function (e) {
        const container = $('.filter-dropdown')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.removeClass('open')
        }
      })
    },
  },
}
