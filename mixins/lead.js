import moment from 'moment'
import $ from 'jquery'
import { _coldSvg, _warmSvg, _hotSvg } from './leadScoreConstants'
import { tagStyle } from './lifeOfLeadConstants'

export default {
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // eslint-disable-next-line eqeqeq
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    },
  },
  computed: {
    leadScoreText: () =>
      `Lead score reflects the user's activity. The higher the score, the "hotter" the lead which means they have taken actions that are closer to a sale.`,
    /**
     * Creates List of li By iterating over status
     * @param status Array
     * @returns HTML Element Ul and li
     */
    getHtmlContent() {
      return (status = []) => {
        if (status.length > 0) {
          const ul = document.createElement('ul')
          status.forEach((s) => {
            const li = document.createElement('li')
            const strong = document.createElement('strong')
            strong.textContent = s.status_name + ': '
            li.appendChild(strong)
            li.append(s.description ? s.description : '')
            ul.appendChild(li)
          })
          return ul
        }
      }
    },
  },
  filters: {
    cleanHtnml(html) {
      // eslint-disable-next-line no-useless-escape
      return html && html.replace(`<base target=\"_blank\">`, '')
    },
    Capitalize: (text) =>
      text ? text.charAt(0).toUpperCase() + text.slice(1) : '',
    imgUrl(v) {
      if (v instanceof File) return URL.createObjectURL(v)
      return v
    },
    leadScoreText(val) {
      return val <= 30 ? 'cold' : val <= 60 ? 'warm' : 'hot'
    },
    leadScoreIcon(score) {
      const icon = score <= 30 ? 'cold' : score <= 60 ? 'warm' : 'hot'
      return require('~/assets/img/icon/' + icon + '.svg')
    },
    leadDateFormatted(date) {
      if (date) {
        return moment(date).format('MMM Do YY')
      } else return date
    },
  },
  mounted() {
    this.loadJQUERY()
  },
  methods: {
    leadScoreHtml(score) {
      const html = `${this.leadScoreIconSvg(score)}
        <div class="media-body align-self-center">
        <h5>${this.getLeadScoreText(score) || '-'}</h5>
        <p>${score || '-'}</p>
       </div>`
      return html
    },
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

      $('.table-list-view .filterarrow span').click(function () {
        $('.table-list-view .filterarrow').removeClass('open')
        $(this).parent('.filterarrow').toggleClass('open')
      })
      $(document).mousedown(function (e) {
        const container = $('.filterarrow')
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.removeClass('open')
        }
      })
    },
    leadScoreIconSvg(score) {
      return score <= 30 ? _coldSvg : score <= 60 ? _warmSvg : _hotSvg
    },
    getLeadScoreText(val) {
      return val <= 30 ? 'Cold' : val <= 60 ? 'Warm' : 'Hot'
    },
    // loading life of lead svg icon on life of lead loads
    lifeOfLeadIconSvg(type) {
      // Iterating over tagStyle of life of lead tags to check if the type matches with tagStyle
      for (let i = 0; i < tagStyle.length; i++) {
        // if matched return the svg for current tag
        // if tagStyle[i].type matches with current type cumming from api then
        // we return the types current idex svg
        if (tagStyle[i].type.includes(type)) {
          return tagStyle[i].svg
        }
      }
    },
    // loading life of lead details svg icon on click
    lifeOfLeadDetailIconSvg(type) {
      // Iterating over tagStyle of life of lead tags to check if the type matches with tagStyle
      for (let i = 0; i < tagStyle.length; i++) {
        // if matched return the svg for current tag
        // if tagStyle[i].type matches with current type cumming from api then
        // we return the types current idex svg
        if (tagStyle[i].type.includes(type)) {
          return tagStyle[i].detailsSvg
        }
      }
    },
  },
}
