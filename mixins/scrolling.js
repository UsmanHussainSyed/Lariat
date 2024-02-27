import $ from 'jquery'
export default {
  methods: {
    tableListScrolling(classname) {
      if (!classname) {
        const csb = $('.table-list-scrolling .customscrollbar').outerHeight()
        const tb = $('.table-list-scrolling .tbody').outerHeight()
        if (tb > csb) {
          $('.table-list-scrolling').addClass('scrolling')
        } else {
          $('.table-list-scrolling').removeClass('scrolling')
        }
        const csb2 = $(
          '.table-list-scrolling.s2 .customscrollbar'
        ).outerHeight()
        const tb2 = $('.table-list-scrolling.s2 .tbody').outerHeight()
        if (tb2 > csb2) {
          $('.table-list-scrolling.s2').addClass('scrolling')
        } else {
          $('.table-list-scrolling.s2').removeClass('scrolling')
        }
      } else {
        const csbtab = $(
          '.table-list-scrolling.' + classname + ' .customscrollbar'
        ).outerHeight()
        const tbtab = $(
          '.table-list-scrolling.' + classname + ' .tbody'
        ).outerHeight()
        if (tbtab > csbtab) {
          $('.table-list-scrolling.' + classname + '').addClass('scrolling')
        } else {
          $('.table-list-scrolling.' + classname + '').removeClass('scrolling')
        }
      }
    },
    tabActive(tab) {
      $('.common-tabs .nav-item').removeClass('active')
      $('.active_' + tab).addClass('active')
      /* const activeWidth1 = $('.active_' + tab).innerWidth()
      const itemPos = $('.active_' + tab).position()
      $('.selector').css({
        left: itemPos.left + 'px',
        width: activeWidth1 + 'px',
      }) */
      this.totalDraftComment()
    },
    async totalDraftComment() {
      try {
        const { data } = await this.$axios.$get(
          `/dashboard/total-draft-comment`
        )
        this.$store.commit(
          'project/projectserach/setDraftCommentCount',
          data.total_comment_count
        )
      } catch (e) {
        this.$toast.error(this.$getErrorMessage(e))
      }
    },
  },
}
