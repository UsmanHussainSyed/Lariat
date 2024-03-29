/* Flatpickr Calendar
flatpickr v4.6.9,, @license MIT
https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css
*/
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((e =
        'undefined' != typeof globalThis
          ? globalThis
          : e || self).flatpickr = t())
})(this, function () {
  'use strict'
  var e = function () {
    return (e =
      Object.assign ||
      function (e) {
        for (var t, n = 1, a = arguments.length; n < a; n++)
          for (var i in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
        return e
      }).apply(this, arguments)
  }
  function t() {
    for (var e = 0, t = 0, n = arguments.length; t < n; t++)
      e += arguments[t].length
    var a = Array(e),
      i = 0
    for (t = 0; t < n; t++)
      for (var o = arguments[t], r = 0, l = o.length; r < l; r++, i++)
        a[i] = o[r]
    return a
  }
  var n = [
      'onChange',
      'onClose',
      'onDayCreate',
      'onDestroy',
      'onKeyDown',
      'onMonthChange',
      'onOpen',
      'onParseConfig',
      'onReady',
      'onValueUpdate',
      'onYearChange',
      'onPreCalendarPosition',
    ],
    a = {
      _disable: [],
      allowInput: !1,
      allowInvalidPreload: !1,
      altFormat: 'F j, Y',
      altInput: !1,
      altInputClass: 'form-control input',
      animate:
        'object' == typeof window &&
        -1 === window.navigator.userAgent.indexOf('MSIE'),
      ariaDateFormat: 'F j, Y',
      autoFillDefaultTime: !0,
      clickOpens: !0,
      closeOnSelect: !0,
      conjunction: ', ',
      dateFormat: 'Y-m-d',
      defaultHour: 12,
      defaultMinute: 0,
      defaultSeconds: 0,
      disable: [],
      disableMobile: !1,
      enableSeconds: !1,
      enableTime: !1,
      errorHandler: function (e) {
        return 'undefined' != typeof console && console.warn(e)
      },
      getWeek: function (e) {
        var t = new Date(e.getTime())
        t.setHours(0, 0, 0, 0),
          t.setDate(t.getDate() + 3 - ((t.getDay() + 6) % 7))
        var n = new Date(t.getFullYear(), 0, 4)
        return (
          1 +
          Math.round(
            ((t.getTime() - n.getTime()) / 864e5 - 3 + ((n.getDay() + 6) % 7)) /
              7
          )
        )
      },
      hourIncrement: 1,
      ignoredFocusElements: [],
      inline: !1,
      locale: 'default',
      minuteIncrement: 5,
      mode: 'single',
      monthSelectorType: 'dropdown',
      nextArrow:
        "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
      noCalendar: !1,
      now: new Date(),
      onChange: [],
      onClose: [],
      onDayCreate: [],
      onDestroy: [],
      onKeyDown: [],
      onMonthChange: [],
      onOpen: [],
      onParseConfig: [],
      onReady: [],
      onValueUpdate: [],
      onYearChange: [],
      onPreCalendarPosition: [],
      plugins: [],
      position: 'auto',
      positionElement: void 0,
      prevArrow:
        "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
      shorthandCurrentMonth: !1,
      showMonths: 1,
      static: !1,
      time_24hr: !1,
      weekNumbers: !1,
      wrap: !1,
    },
    i = {
      weekdays: {
        shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        longhand: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      },
      months: {
        shorthand: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        longhand: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      firstDayOfWeek: 0,
      ordinal: function (e) {
        var t = e % 100
        if (t > 3 && t < 21) return 'th'
        switch (t % 10) {
          case 1:
            return 'st'
          case 2:
            return 'nd'
          case 3:
            return 'rd'
          default:
            return 'th'
        }
      },
      rangeSeparator: ' to ',
      weekAbbreviation: 'Wk',
      scrollTitle: 'Scroll to increment',
      toggleTitle: 'Click to toggle',
      amPM: ['AM', 'PM'],
      yearAriaLabel: 'Year',
      monthAriaLabel: 'Month',
      hourAriaLabel: 'Hour',
      minuteAriaLabel: 'Minute',
      time_24hr: !1,
    },
    o = function (e, t) {
      return void 0 === t && (t = 2), ('000' + e).slice(-1 * t)
    },
    r = function (e) {
      return !0 === e ? 1 : 0
    }
  function l(e, t) {
    var n
    return function () {
      var a = this
      clearTimeout(n),
        (n = setTimeout(function () {
          return e.apply(a, arguments)
        }, t))
    }
  }
  var c = function (e) {
    return e instanceof Array ? e : [e]
  }
  function d(e, t, n) {
    if (!0 === n) return e.classList.add(t)
    e.classList.remove(t)
  }
  function s(e, t, n) {
    var a = window.document.createElement(e)
    return (
      (t = t || ''),
      (n = n || ''),
      (a.className = t),
      void 0 !== n && (a.textContent = n),
      a
    )
  }
  function u(e) {
    for (; e.firstChild; ) e.removeChild(e.firstChild)
  }
  function f(e, t) {
    return t(e) ? e : e.parentNode ? f(e.parentNode, t) : void 0
  }
  function m(e, t) {
    var n = s('div', 'numInputWrapper'),
      a = s('input', 'numInput ' + e),
      i = s('span', 'arrowUp'),
      o = s('span', 'arrowDown')
    if (
      (-1 === navigator.userAgent.indexOf('MSIE 9.0')
        ? (a.type = 'number')
        : ((a.type = 'text'), (a.pattern = '\\d*')),
      void 0 !== t)
    )
      for (var r in t) a.setAttribute(r, t[r])
    return n.appendChild(a), n.appendChild(i), n.appendChild(o), n
  }
  function g(e) {
    try {
      return 'function' == typeof e.composedPath
        ? e.composedPath()[0]
        : e.target
    } catch (t) {
      return e.target
    }
  }
  var p = function () {},
    h = function (e, t, n) {
      return n.months[t ? 'shorthand' : 'longhand'][e]
    },
    v = {
      D: p,
      F: function (e, t, n) {
        e.setMonth(n.months.longhand.indexOf(t))
      },
      G: function (e, t) {
        e.setHours(parseFloat(t))
      },
      H: function (e, t) {
        e.setHours(parseFloat(t))
      },
      J: function (e, t) {
        e.setDate(parseFloat(t))
      },
      K: function (e, t, n) {
        e.setHours(
          (e.getHours() % 12) + 12 * r(new RegExp(n.amPM[1], 'i').test(t))
        )
      },
      M: function (e, t, n) {
        e.setMonth(n.months.shorthand.indexOf(t))
      },
      S: function (e, t) {
        e.setSeconds(parseFloat(t))
      },
      U: function (e, t) {
        return new Date(1e3 * parseFloat(t))
      },
      W: function (e, t, n) {
        var a = parseInt(t),
          i = new Date(e.getFullYear(), 0, 2 + 7 * (a - 1), 0, 0, 0, 0)
        return i.setDate(i.getDate() - i.getDay() + n.firstDayOfWeek), i
      },
      Y: function (e, t) {
        e.setFullYear(parseFloat(t))
      },
      Z: function (e, t) {
        return new Date(t)
      },
      d: function (e, t) {
        e.setDate(parseFloat(t))
      },
      h: function (e, t) {
        e.setHours(parseFloat(t))
      },
      i: function (e, t) {
        e.setMinutes(parseFloat(t))
      },
      j: function (e, t) {
        e.setDate(parseFloat(t))
      },
      l: p,
      m: function (e, t) {
        e.setMonth(parseFloat(t) - 1)
      },
      n: function (e, t) {
        e.setMonth(parseFloat(t) - 1)
      },
      s: function (e, t) {
        e.setSeconds(parseFloat(t))
      },
      u: function (e, t) {
        return new Date(parseFloat(t))
      },
      w: p,
      y: function (e, t) {
        e.setFullYear(2e3 + parseFloat(t))
      },
    },
    D = {
      D: '(\\w+)',
      F: '(\\w+)',
      G: '(\\d\\d|\\d)',
      H: '(\\d\\d|\\d)',
      J: '(\\d\\d|\\d)\\w+',
      K: '',
      M: '(\\w+)',
      S: '(\\d\\d|\\d)',
      U: '(.+)',
      W: '(\\d\\d|\\d)',
      Y: '(\\d{4})',
      Z: '(.+)',
      d: '(\\d\\d|\\d)',
      h: '(\\d\\d|\\d)',
      i: '(\\d\\d|\\d)',
      j: '(\\d\\d|\\d)',
      l: '(\\w+)',
      m: '(\\d\\d|\\d)',
      n: '(\\d\\d|\\d)',
      s: '(\\d\\d|\\d)',
      u: '(.+)',
      w: '(\\d\\d|\\d)',
      y: '(\\d{2})',
    },
    w = {
      Z: function (e) {
        return e.toISOString()
      },
      D: function (e, t, n) {
        return t.weekdays.shorthand[w.w(e, t, n)]
      },
      F: function (e, t, n) {
        return h(w.n(e, t, n) - 1, !1, t)
      },
      G: function (e, t, n) {
        return o(w.h(e, t, n))
      },
      H: function (e) {
        return o(e.getHours())
      },
      J: function (e, t) {
        return void 0 !== t.ordinal
          ? e.getDate() + t.ordinal(e.getDate())
          : e.getDate()
      },
      K: function (e, t) {
        return t.amPM[r(e.getHours() > 11)]
      },
      M: function (e, t) {
        return h(e.getMonth(), !0, t)
      },
      S: function (e) {
        return o(e.getSeconds())
      },
      U: function (e) {
        return e.getTime() / 1e3
      },
      W: function (e, t, n) {
        return n.getWeek(e)
      },
      Y: function (e) {
        return o(e.getFullYear(), 4)
      },
      d: function (e) {
        return o(e.getDate())
      },
      h: function (e) {
        return e.getHours() % 12 ? e.getHours() % 12 : 12
      },
      i: function (e) {
        return o(e.getMinutes())
      },
      j: function (e) {
        return e.getDate()
      },
      l: function (e, t) {
        return t.weekdays.longhand[e.getDay()]
      },
      m: function (e) {
        return o(e.getMonth() + 1)
      },
      n: function (e) {
        return e.getMonth() + 1
      },
      s: function (e) {
        return e.getSeconds()
      },
      u: function (e) {
        return e.getTime()
      },
      w: function (e) {
        return e.getDay()
      },
      y: function (e) {
        return String(e.getFullYear()).substring(2)
      },
    },
    b = function (e) {
      var t = e.config,
        n = void 0 === t ? a : t,
        o = e.l10n,
        r = void 0 === o ? i : o,
        l = e.isMobile,
        c = void 0 !== l && l
      return function (e, t, a) {
        var i = a || r
        return void 0 === n.formatDate || c
          ? t
              .split('')
              .map(function (t, a, o) {
                return w[t] && '\\' !== o[a - 1]
                  ? w[t](e, i, n)
                  : '\\' !== t
                  ? t
                  : ''
              })
              .join('')
          : n.formatDate(e, t, i)
      }
    },
    C = function (e) {
      var t = e.config,
        n = void 0 === t ? a : t,
        o = e.l10n,
        r = void 0 === o ? i : o
      return function (e, t, i, o) {
        if (0 === e || e) {
          var l,
            c = o || r,
            d = e
          if (e instanceof Date) l = new Date(e.getTime())
          else if ('string' != typeof e && void 0 !== e.toFixed) l = new Date(e)
          else if ('string' == typeof e) {
            var s = t || (n || a).dateFormat,
              u = String(e).trim()
            if ('today' === u) (l = new Date()), (i = !0)
            else if (/Z$/.test(u) || /GMT$/.test(u)) l = new Date(e)
            else if (n && n.parseDate) l = n.parseDate(e, s)
            else {
              l =
                n && n.noCalendar
                  ? new Date(new Date().setHours(0, 0, 0, 0))
                  : new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
              for (
                var f = void 0, m = [], g = 0, p = 0, h = '';
                g < s.length;
                g++
              ) {
                var w = s[g],
                  b = '\\' === w,
                  C = '\\' === s[g - 1] || b
                if (D[w] && !C) {
                  h += D[w]
                  var M = new RegExp(h).exec(e)
                  M &&
                    (f = !0) &&
                    m['Y' !== w ? 'push' : 'unshift']({ fn: v[w], val: M[++p] })
                } else b || (h += '.')
                m.forEach(function (e) {
                  var t = e.fn,
                    n = e.val
                  return (l = t(l, n, c) || l)
                })
              }
              l = f ? l : void 0
            }
          }
          if (l instanceof Date && !isNaN(l.getTime()))
            return !0 === i && l.setHours(0, 0, 0, 0), l
          n.errorHandler(new Error('Invalid date provided: ' + d))
        }
      }
    }
  function M(e, t, n) {
    return (
      void 0 === n && (n = !0),
      !1 !== n
        ? new Date(e.getTime()).setHours(0, 0, 0, 0) -
          new Date(t.getTime()).setHours(0, 0, 0, 0)
        : e.getTime() - t.getTime()
    )
  }
  var y = 864e5
  function x(e) {
    var t = e.defaultHour,
      n = e.defaultMinute,
      a = e.defaultSeconds
    if (void 0 !== e.minDate) {
      var i = e.minDate.getHours(),
        o = e.minDate.getMinutes(),
        r = e.minDate.getSeconds()
      t < i && (t = i),
        t === i && n < o && (n = o),
        t === i && n === o && a < r && (a = e.minDate.getSeconds())
    }
    if (void 0 !== e.maxDate) {
      var l = e.maxDate.getHours(),
        c = e.maxDate.getMinutes()
      ;(t = Math.min(t, l)) === l && (n = Math.min(c, n)),
        t === l && n === c && (a = e.maxDate.getSeconds())
    }
    return { hours: t, minutes: n, seconds: a }
  }
  'function' != typeof Object.assign &&
    (Object.assign = function (e) {
      for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n]
      if (!e) throw TypeError('Cannot convert undefined or null to object')
      for (
        var a = function (t) {
            t &&
              Object.keys(t).forEach(function (n) {
                return (e[n] = t[n])
              })
          },
          i = 0,
          o = t;
        i < o.length;
        i++
      ) {
        var r = o[i]
        a(r)
      }
      return e
    })
  function E(p, v) {
    var w = { config: e(e({}, a), T.defaultConfig), l10n: i }
    function E(e) {
      return e.bind(w)
    }
    function k() {
      var e = w.config
      ;(!1 === e.weekNumbers && 1 === e.showMonths) ||
        (!0 !== e.noCalendar &&
          window.requestAnimationFrame(function () {
            if (
              (void 0 !== w.calendarContainer &&
                ((w.calendarContainer.style.visibility = 'hidden'),
                (w.calendarContainer.style.display = 'block')),
              void 0 !== w.daysContainer)
            ) {
              var t = (w.days.offsetWidth + 1) * e.showMonths
              ;(w.daysContainer.style.width = t + 'px'),
                (w.calendarContainer.style.width =
                  t +
                  (void 0 !== w.weekWrapper ? w.weekWrapper.offsetWidth : 0) +
                  'px'),
                w.calendarContainer.style.removeProperty('visibility'),
                w.calendarContainer.style.removeProperty('display')
            }
          }))
    }
    function I(e) {
      if (0 === w.selectedDates.length) {
        var t =
            void 0 === w.config.minDate || M(new Date(), w.config.minDate) >= 0
              ? new Date()
              : new Date(w.config.minDate.getTime()),
          n = x(w.config)
        t.setHours(n.hours, n.minutes, n.seconds, t.getMilliseconds()),
          (w.selectedDates = [t]),
          (w.latestSelectedDateObj = t)
      }
      void 0 !== e &&
        'blur' !== e.type &&
        (function (e) {
          e.preventDefault()
          var t = 'keydown' === e.type,
            n = g(e),
            a = n
          void 0 !== w.amPM &&
            n === w.amPM &&
            (w.amPM.textContent =
              w.l10n.amPM[r(w.amPM.textContent === w.l10n.amPM[0])])
          var i = parseFloat(a.getAttribute('min')),
            l = parseFloat(a.getAttribute('max')),
            c = parseFloat(a.getAttribute('step')),
            d = parseInt(a.value, 10),
            s = e.delta || (t ? (38 === e.which ? 1 : -1) : 0),
            u = d + c * s
          if (void 0 !== a.value && 2 === a.value.length) {
            var f = a === w.hourElement,
              m = a === w.minuteElement
            u < i
              ? ((u = l + u + r(!f) + (r(f) && r(!w.amPM))),
                m && j(void 0, -1, w.hourElement))
              : u > l &&
                ((u = a === w.hourElement ? u - l - r(!w.amPM) : i),
                m && j(void 0, 1, w.hourElement)),
              w.amPM &&
                f &&
                (1 === c ? u + d === 23 : Math.abs(u - d) > c) &&
                (w.amPM.textContent =
                  w.l10n.amPM[r(w.amPM.textContent === w.l10n.amPM[0])]),
              (a.value = o(u))
          }
        })(e)
      var a = w._input.value
      S(), be(), w._input.value !== a && w._debouncedChange()
    }
    function S() {
      if (void 0 !== w.hourElement && void 0 !== w.minuteElement) {
        var e,
          t,
          n = (parseInt(w.hourElement.value.slice(-2), 10) || 0) % 24,
          a = (parseInt(w.minuteElement.value, 10) || 0) % 60,
          i =
            void 0 !== w.secondElement
              ? (parseInt(w.secondElement.value, 10) || 0) % 60
              : 0
        void 0 !== w.amPM &&
          ((e = n),
          (t = w.amPM.textContent),
          (n = (e % 12) + 12 * r(t === w.l10n.amPM[1])))
        var o =
          void 0 !== w.config.minTime ||
          (w.config.minDate &&
            w.minDateHasTime &&
            w.latestSelectedDateObj &&
            0 === M(w.latestSelectedDateObj, w.config.minDate, !0))
        if (
          void 0 !== w.config.maxTime ||
          (w.config.maxDate &&
            w.maxDateHasTime &&
            w.latestSelectedDateObj &&
            0 === M(w.latestSelectedDateObj, w.config.maxDate, !0))
        ) {
          var l =
            void 0 !== w.config.maxTime ? w.config.maxTime : w.config.maxDate
          ;(n = Math.min(n, l.getHours())) === l.getHours() &&
            (a = Math.min(a, l.getMinutes())),
            a === l.getMinutes() && (i = Math.min(i, l.getSeconds()))
        }
        if (o) {
          var c =
            void 0 !== w.config.minTime ? w.config.minTime : w.config.minDate
          ;(n = Math.max(n, c.getHours())) === c.getHours() &&
            a < c.getMinutes() &&
            (a = c.getMinutes()),
            a === c.getMinutes() && (i = Math.max(i, c.getSeconds()))
        }
        O(n, a, i)
      }
    }
    function _(e) {
      var t = e || w.latestSelectedDateObj
      t && O(t.getHours(), t.getMinutes(), t.getSeconds())
    }
    function O(e, t, n) {
      void 0 !== w.latestSelectedDateObj &&
        w.latestSelectedDateObj.setHours(e % 24, t, n || 0, 0),
        w.hourElement &&
          w.minuteElement &&
          !w.isMobile &&
          ((w.hourElement.value = o(
            w.config.time_24hr ? e : ((12 + e) % 12) + 12 * r(e % 12 == 0)
          )),
          (w.minuteElement.value = o(t)),
          void 0 !== w.amPM && (w.amPM.textContent = w.l10n.amPM[r(e >= 12)]),
          void 0 !== w.secondElement && (w.secondElement.value = o(n)))
    }
    function F(e) {
      var t = g(e),
        n = parseInt(t.value) + (e.delta || 0)
      ;(n / 1e3 > 1 || ('Enter' === e.key && !/[^\d]/.test(n.toString()))) &&
        Q(n)
    }
    function A(e, t, n, a) {
      return t instanceof Array
        ? t.forEach(function (t) {
            return A(e, t, n, a)
          })
        : e instanceof Array
        ? e.forEach(function (e) {
            return A(e, t, n, a)
          })
        : (e.addEventListener(t, n, a),
          void w._handlers.push({
            remove: function () {
              return e.removeEventListener(t, n)
            },
          }))
    }
    function N() {
      pe('onChange')
    }
    function P(e, t) {
      var n =
          void 0 !== e
            ? w.parseDate(e)
            : w.latestSelectedDateObj ||
              (w.config.minDate && w.config.minDate > w.now
                ? w.config.minDate
                : w.config.maxDate && w.config.maxDate < w.now
                ? w.config.maxDate
                : w.now),
        a = w.currentYear,
        i = w.currentMonth
      try {
        void 0 !== n &&
          ((w.currentYear = n.getFullYear()), (w.currentMonth = n.getMonth()))
      } catch (e) {
        ;(e.message = 'Invalid date supplied: ' + n), w.config.errorHandler(e)
      }
      t && w.currentYear !== a && (pe('onYearChange'), K()),
        !t ||
          (w.currentYear === a && w.currentMonth === i) ||
          pe('onMonthChange'),
        w.redraw()
    }
    function Y(e) {
      var t = g(e)
      ~t.className.indexOf('arrow') &&
        j(e, t.classList.contains('arrowUp') ? 1 : -1)
    }
    function j(e, t, n) {
      var a = e && g(e),
        i = n || (a && a.parentNode && a.parentNode.firstChild),
        o = he('increment')
      ;(o.delta = t), i && i.dispatchEvent(o)
    }
    function H(e, t, n, a) {
      var i = X(t, !0),
        o = s('span', 'flatpickr-day ' + e, t.getDate().toString())
      return (
        (o.dateObj = t),
        (o.$i = a),
        o.setAttribute('aria-label', w.formatDate(t, w.config.ariaDateFormat)),
        -1 === e.indexOf('hidden') &&
          0 === M(t, w.now) &&
          ((w.todayDateElem = o),
          o.classList.add('today'),
          o.setAttribute('aria-current', 'date')),
        i
          ? ((o.tabIndex = -1),
            ve(t) &&
              (o.classList.add('selected'),
              (w.selectedDateElem = o),
              'range' === w.config.mode &&
                (d(
                  o,
                  'startRange',
                  w.selectedDates[0] && 0 === M(t, w.selectedDates[0], !0)
                ),
                d(
                  o,
                  'endRange',
                  w.selectedDates[1] && 0 === M(t, w.selectedDates[1], !0)
                ),
                'nextMonthDay' === e && o.classList.add('inRange'))))
          : o.classList.add('flatpickr-disabled'),
        'range' === w.config.mode &&
          (function (e) {
            return (
              !('range' !== w.config.mode || w.selectedDates.length < 2) &&
              M(e, w.selectedDates[0]) >= 0 &&
              M(e, w.selectedDates[1]) <= 0
            )
          })(t) &&
          !ve(t) &&
          o.classList.add('inRange'),
        w.weekNumbers &&
          1 === w.config.showMonths &&
          'prevMonthDay' !== e &&
          n % 7 == 1 &&
          w.weekNumbers.insertAdjacentHTML(
            'beforeend',
            "<span class='flatpickr-day'>" + w.config.getWeek(t) + '</span>'
          ),
        pe('onDayCreate', o),
        o
      )
    }
    function L(e) {
      e.focus(), 'range' === w.config.mode && ae(e)
    }
    function W(e) {
      for (
        var t = e > 0 ? 0 : w.config.showMonths - 1,
          n = e > 0 ? w.config.showMonths : -1,
          a = t;
        a != n;
        a += e
      )
        for (
          var i = w.daysContainer.children[a],
            o = e > 0 ? 0 : i.children.length - 1,
            r = e > 0 ? i.children.length : -1,
            l = o;
          l != r;
          l += e
        ) {
          var c = i.children[l]
          if (-1 === c.className.indexOf('hidden') && X(c.dateObj)) return c
        }
    }
    function R(e, t) {
      var n = ee(document.activeElement || document.body),
        a =
          void 0 !== e
            ? e
            : n
            ? document.activeElement
            : void 0 !== w.selectedDateElem && ee(w.selectedDateElem)
            ? w.selectedDateElem
            : void 0 !== w.todayDateElem && ee(w.todayDateElem)
            ? w.todayDateElem
            : W(t > 0 ? 1 : -1)
      void 0 === a
        ? w._input.focus()
        : n
        ? (function (e, t) {
            for (
              var n =
                  -1 === e.className.indexOf('Month')
                    ? e.dateObj.getMonth()
                    : w.currentMonth,
                a = t > 0 ? w.config.showMonths : -1,
                i = t > 0 ? 1 : -1,
                o = n - w.currentMonth;
              o != a;
              o += i
            )
              for (
                var r = w.daysContainer.children[o],
                  l =
                    n - w.currentMonth === o
                      ? e.$i + t
                      : t < 0
                      ? r.children.length - 1
                      : 0,
                  c = r.children.length,
                  d = l;
                d >= 0 && d < c && d != (t > 0 ? c : -1);
                d += i
              ) {
                var s = r.children[d]
                if (
                  -1 === s.className.indexOf('hidden') &&
                  X(s.dateObj) &&
                  Math.abs(e.$i - d) >= Math.abs(t)
                )
                  return L(s)
              }
            w.changeMonth(i), R(W(i), 0)
          })(a, t)
        : L(a)
    }
    function B(e, t) {
      for (
        var n = (new Date(e, t, 1).getDay() - w.l10n.firstDayOfWeek + 7) % 7,
          a = w.utils.getDaysInMonth((t - 1 + 12) % 12, e),
          i = w.utils.getDaysInMonth(t, e),
          o = window.document.createDocumentFragment(),
          r = w.config.showMonths > 1,
          l = r ? 'prevMonthDay hidden' : 'prevMonthDay',
          c = r ? 'nextMonthDay hidden' : 'nextMonthDay',
          d = a + 1 - n,
          u = 0;
        d <= a;
        d++, u++
      )
        o.appendChild(H(l, new Date(e, t - 1, d), d, u))
      for (d = 1; d <= i; d++, u++)
        o.appendChild(H('', new Date(e, t, d), d, u))
      for (
        var f = i + 1;
        f <= 42 - n && (1 === w.config.showMonths || u % 7 != 0);
        f++, u++
      )
        o.appendChild(H(c, new Date(e, t + 1, f % i), f, u))
      var m = s('div', 'dayContainer')
      return m.appendChild(o), m
    }
    function J() {
      if (void 0 !== w.daysContainer) {
        u(w.daysContainer), w.weekNumbers && u(w.weekNumbers)
        for (
          var e = document.createDocumentFragment(), t = 0;
          t < w.config.showMonths;
          t++
        ) {
          var n = new Date(w.currentYear, w.currentMonth, 1)
          n.setMonth(w.currentMonth + t),
            e.appendChild(B(n.getFullYear(), n.getMonth()))
        }
        w.daysContainer.appendChild(e),
          (w.days = w.daysContainer.firstChild),
          'range' === w.config.mode && 1 === w.selectedDates.length && ae()
      }
    }
    function K() {
      if (
        !(w.config.showMonths > 1 || 'dropdown' !== w.config.monthSelectorType)
      ) {
        var e = function (e) {
          return (
            !(
              void 0 !== w.config.minDate &&
              w.currentYear === w.config.minDate.getFullYear() &&
              e < w.config.minDate.getMonth()
            ) &&
            !(
              void 0 !== w.config.maxDate &&
              w.currentYear === w.config.maxDate.getFullYear() &&
              e > w.config.maxDate.getMonth()
            )
          )
        }
        ;(w.monthsDropdownContainer.tabIndex = -1),
          (w.monthsDropdownContainer.innerHTML = '')
        for (var t = 0; t < 12; t++)
          if (e(t)) {
            var n = s('option', 'flatpickr-monthDropdown-month')
            ;(n.value = new Date(w.currentYear, t).getMonth().toString()),
              (n.textContent = h(t, w.config.shorthandCurrentMonth, w.l10n)),
              (n.tabIndex = -1),
              w.currentMonth === t && (n.selected = !0),
              w.monthsDropdownContainer.appendChild(n)
          }
      }
    }
    function U() {
      var e,
        t = s('div', 'flatpickr-month'),
        n = window.document.createDocumentFragment()
      w.config.showMonths > 1 || 'static' === w.config.monthSelectorType
        ? (e = s('span', 'cur-month'))
        : ((w.monthsDropdownContainer = s(
            'select',
            'flatpickr-monthDropdown-months'
          )),
          w.monthsDropdownContainer.setAttribute(
            'aria-label',
            w.l10n.monthAriaLabel
          ),
          A(w.monthsDropdownContainer, 'change', function (e) {
            var t = g(e),
              n = parseInt(t.value, 10)
            w.changeMonth(n - w.currentMonth), pe('onMonthChange')
          }),
          K(),
          (e = w.monthsDropdownContainer))
      var a = m('cur-year', { tabindex: '-1' }),
        i = a.getElementsByTagName('input')[0]
      i.setAttribute('aria-label', w.l10n.yearAriaLabel),
        w.config.minDate &&
          i.setAttribute('min', w.config.minDate.getFullYear().toString()),
        w.config.maxDate &&
          (i.setAttribute('max', w.config.maxDate.getFullYear().toString()),
          (i.disabled =
            !!w.config.minDate &&
            w.config.minDate.getFullYear() === w.config.maxDate.getFullYear()))
      var o = s('div', 'flatpickr-current-month')
      return (
        o.appendChild(e),
        o.appendChild(a),
        n.appendChild(o),
        t.appendChild(n),
        { container: t, yearElement: i, monthElement: e }
      )
    }
    function q() {
      u(w.monthNav),
        w.monthNav.appendChild(w.prevMonthNav),
        w.config.showMonths && ((w.yearElements = []), (w.monthElements = []))
      for (var e = w.config.showMonths; e--; ) {
        var t = U()
        w.yearElements.push(t.yearElement),
          w.monthElements.push(t.monthElement),
          w.monthNav.appendChild(t.container)
      }
      w.monthNav.appendChild(w.nextMonthNav)
    }
    function $() {
      w.weekdayContainer
        ? u(w.weekdayContainer)
        : (w.weekdayContainer = s('div', 'flatpickr-weekdays'))
      for (var e = w.config.showMonths; e--; ) {
        var t = s('div', 'flatpickr-weekdaycontainer')
        w.weekdayContainer.appendChild(t)
      }
      return z(), w.weekdayContainer
    }
    function z() {
      if (w.weekdayContainer) {
        var e = w.l10n.firstDayOfWeek,
          n = t(w.l10n.weekdays.shorthand)
        e > 0 && e < n.length && (n = t(n.splice(e, n.length), n.splice(0, e)))
        for (var a = w.config.showMonths; a--; )
          w.weekdayContainer.children[a].innerHTML =
            "\n      <span class='flatpickr-weekday'>\n        " +
            n.join("</span><span class='flatpickr-weekday'>") +
            '\n      </span>\n      '
      }
    }
    function G(e, t) {
      void 0 === t && (t = !0)
      var n = t ? e : e - w.currentMonth
      ;(n < 0 && !0 === w._hidePrevMonthArrow) ||
        (n > 0 && !0 === w._hideNextMonthArrow) ||
        ((w.currentMonth += n),
        (w.currentMonth < 0 || w.currentMonth > 11) &&
          ((w.currentYear += w.currentMonth > 11 ? 1 : -1),
          (w.currentMonth = (w.currentMonth + 12) % 12),
          pe('onYearChange'),
          K()),
        J(),
        pe('onMonthChange'),
        De())
    }
    function V(e) {
      return (
        !(!w.config.appendTo || !w.config.appendTo.contains(e)) ||
        w.calendarContainer.contains(e)
      )
    }
    function Z(e) {
      if (w.isOpen && !w.config.inline) {
        var t = g(e),
          n = V(t),
          a =
            t === w.input ||
            t === w.altInput ||
            w.element.contains(t) ||
            (e.path &&
              e.path.indexOf &&
              (~e.path.indexOf(w.input) || ~e.path.indexOf(w.altInput))),
          i =
            'blur' === e.type
              ? a && e.relatedTarget && !V(e.relatedTarget)
              : !a && !n && !V(e.relatedTarget),
          o = !w.config.ignoredFocusElements.some(function (e) {
            return e.contains(t)
          })
        i &&
          o &&
          (void 0 !== w.timeContainer &&
            void 0 !== w.minuteElement &&
            void 0 !== w.hourElement &&
            '' !== w.input.value &&
            void 0 !== w.input.value &&
            I(),
          w.close(),
          w.config &&
            'range' === w.config.mode &&
            1 === w.selectedDates.length &&
            (w.clear(!1), w.redraw()))
      }
    }
    function Q(e) {
      if (
        !(
          !e ||
          (w.config.minDate && e < w.config.minDate.getFullYear()) ||
          (w.config.maxDate && e > w.config.maxDate.getFullYear())
        )
      ) {
        var t = e,
          n = w.currentYear !== t
        ;(w.currentYear = t || w.currentYear),
          w.config.maxDate && w.currentYear === w.config.maxDate.getFullYear()
            ? (w.currentMonth = Math.min(
                w.config.maxDate.getMonth(),
                w.currentMonth
              ))
            : w.config.minDate &&
              w.currentYear === w.config.minDate.getFullYear() &&
              (w.currentMonth = Math.max(
                w.config.minDate.getMonth(),
                w.currentMonth
              )),
          n && (w.redraw(), pe('onYearChange'), K())
      }
    }
    function X(e, t) {
      var n
      void 0 === t && (t = !0)
      var a = w.parseDate(e, void 0, t)
      if (
        (w.config.minDate &&
          a &&
          M(a, w.config.minDate, void 0 !== t ? t : !w.minDateHasTime) < 0) ||
        (w.config.maxDate &&
          a &&
          M(a, w.config.maxDate, void 0 !== t ? t : !w.maxDateHasTime) > 0)
      )
        return !1
      if (!w.config.enable && 0 === w.config.disable.length) return !0
      if (void 0 === a) return !1
      for (
        var i = !!w.config.enable,
          o =
            null !== (n = w.config.enable) && void 0 !== n
              ? n
              : w.config.disable,
          r = 0,
          l = void 0;
        r < o.length;
        r++
      ) {
        if ('function' == typeof (l = o[r]) && l(a)) return i
        if (l instanceof Date && void 0 !== a && l.getTime() === a.getTime())
          return i
        if ('string' == typeof l) {
          var c = w.parseDate(l, void 0, !0)
          return c && c.getTime() === a.getTime() ? i : !i
        }
        if (
          'object' == typeof l &&
          void 0 !== a &&
          l.from &&
          l.to &&
          a.getTime() >= l.from.getTime() &&
          a.getTime() <= l.to.getTime()
        )
          return i
      }
      return !i
    }
    function ee(e) {
      return (
        void 0 !== w.daysContainer &&
        -1 === e.className.indexOf('hidden') &&
        -1 === e.className.indexOf('flatpickr-disabled') &&
        w.daysContainer.contains(e)
      )
    }
    function te(e) {
      !(e.target === w._input) ||
        !(w.selectedDates.length > 0 || w._input.value.length > 0) ||
        (e.relatedTarget && V(e.relatedTarget)) ||
        w.setDate(
          w._input.value,
          !0,
          e.target === w.altInput ? w.config.altFormat : w.config.dateFormat
        )
    }
    function ne(e) {
      var t = g(e),
        n = w.config.wrap ? p.contains(t) : t === w._input,
        a = w.config.allowInput,
        i = w.isOpen && (!a || !n),
        o = w.config.inline && n && !a
      if (13 === e.keyCode && n) {
        if (a)
          return (
            w.setDate(
              w._input.value,
              !0,
              t === w.altInput ? w.config.altFormat : w.config.dateFormat
            ),
            t.blur()
          )
        w.open()
      } else if (V(t) || i || o) {
        var r = !!w.timeContainer && w.timeContainer.contains(t)
        switch (e.keyCode) {
          case 13:
            r ? (e.preventDefault(), I(), se()) : ue(e)
            break
          case 27:
            e.preventDefault(), se()
            break
          case 8:
          case 46:
            n && !w.config.allowInput && (e.preventDefault(), w.clear())
            break
          case 37:
          case 39:
            if (r || n) w.hourElement && w.hourElement.focus()
            else if (
              (e.preventDefault(),
              void 0 !== w.daysContainer &&
                (!1 === a ||
                  (document.activeElement && ee(document.activeElement))))
            ) {
              var l = 39 === e.keyCode ? 1 : -1
              e.ctrlKey ? (e.stopPropagation(), G(l), R(W(1), 0)) : R(void 0, l)
            }
            break
          case 38:
          case 40:
            e.preventDefault()
            var c = 40 === e.keyCode ? 1 : -1
            ;(w.daysContainer && void 0 !== t.$i) ||
            t === w.input ||
            t === w.altInput
              ? e.ctrlKey
                ? (e.stopPropagation(), Q(w.currentYear - c), R(W(1), 0))
                : r || R(void 0, 7 * c)
              : t === w.currentYearElement
              ? Q(w.currentYear - c)
              : w.config.enableTime &&
                (!r && w.hourElement && w.hourElement.focus(),
                I(e),
                w._debouncedChange())
            break
          case 9:
            if (r) {
              var d = [w.hourElement, w.minuteElement, w.secondElement, w.amPM]
                  .concat(w.pluginElements)
                  .filter(function (e) {
                    return e
                  }),
                s = d.indexOf(t)
              if (-1 !== s) {
                var u = d[s + (e.shiftKey ? -1 : 1)]
                e.preventDefault(), (u || w._input).focus()
              }
            } else
              !w.config.noCalendar &&
                w.daysContainer &&
                w.daysContainer.contains(t) &&
                e.shiftKey &&
                (e.preventDefault(), w._input.focus())
        }
      }
      if (void 0 !== w.amPM && t === w.amPM)
        switch (e.key) {
          case w.l10n.amPM[0].charAt(0):
          case w.l10n.amPM[0].charAt(0).toLowerCase():
            ;(w.amPM.textContent = w.l10n.amPM[0]), S(), be()
            break
          case w.l10n.amPM[1].charAt(0):
          case w.l10n.amPM[1].charAt(0).toLowerCase():
            ;(w.amPM.textContent = w.l10n.amPM[1]), S(), be()
        }
      ;(n || V(t)) && pe('onKeyDown', e)
    }
    function ae(e) {
      if (
        1 === w.selectedDates.length &&
        (!e ||
          (e.classList.contains('flatpickr-day') &&
            !e.classList.contains('flatpickr-disabled')))
      ) {
        for (
          var t = e
              ? e.dateObj.getTime()
              : w.days.firstElementChild.dateObj.getTime(),
            n = w.parseDate(w.selectedDates[0], void 0, !0).getTime(),
            a = Math.min(t, w.selectedDates[0].getTime()),
            i = Math.max(t, w.selectedDates[0].getTime()),
            o = !1,
            r = 0,
            l = 0,
            c = a;
          c < i;
          c += y
        )
          X(new Date(c), !0) ||
            ((o = o || (c > a && c < i)),
            c < n && (!r || c > r)
              ? (r = c)
              : c > n && (!l || c < l) && (l = c))
        for (var d = 0; d < w.config.showMonths; d++)
          for (
            var s = w.daysContainer.children[d],
              u = function (a, i) {
                var c,
                  d,
                  u,
                  f = s.children[a],
                  m = f.dateObj.getTime(),
                  g = (r > 0 && m < r) || (l > 0 && m > l)
                return g
                  ? (f.classList.add('notAllowed'),
                    ['inRange', 'startRange', 'endRange'].forEach(function (e) {
                      f.classList.remove(e)
                    }),
                    'continue')
                  : o && !g
                  ? 'continue'
                  : ([
                      'startRange',
                      'inRange',
                      'endRange',
                      'notAllowed',
                    ].forEach(function (e) {
                      f.classList.remove(e)
                    }),
                    void (
                      void 0 !== e &&
                      (e.classList.add(
                        t <= w.selectedDates[0].getTime()
                          ? 'startRange'
                          : 'endRange'
                      ),
                      n < t && m === n
                        ? f.classList.add('startRange')
                        : n > t && m === n && f.classList.add('endRange'),
                      m >= r &&
                        (0 === l || m <= l) &&
                        ((d = n),
                        (u = t),
                        (c = m) > Math.min(d, u) && c < Math.max(d, u)) &&
                        f.classList.add('inRange'))
                    ))
              },
              f = 0,
              m = s.children.length;
            f < m;
            f++
          )
            u(f)
      }
    }
    function ie() {
      !w.isOpen || w.config.static || w.config.inline || ce()
    }
    function oe(e) {
      return function (t) {
        var n = (w.config['_' + e + 'Date'] = w.parseDate(
            t,
            w.config.dateFormat
          )),
          a = w.config['_' + ('min' === e ? 'max' : 'min') + 'Date']
        void 0 !== n &&
          (w['min' === e ? 'minDateHasTime' : 'maxDateHasTime'] =
            n.getHours() > 0 || n.getMinutes() > 0 || n.getSeconds() > 0),
          w.selectedDates &&
            ((w.selectedDates = w.selectedDates.filter(function (e) {
              return X(e)
            })),
            w.selectedDates.length || 'min' !== e || _(n),
            be()),
          w.daysContainer &&
            (de(),
            void 0 !== n
              ? (w.currentYearElement[e] = n.getFullYear().toString())
              : w.currentYearElement.removeAttribute(e),
            (w.currentYearElement.disabled =
              !!a && void 0 !== n && a.getFullYear() === n.getFullYear()))
      }
    }
    function re() {
      return w.config.wrap ? p.querySelector('[data-input]') : p
    }
    function le() {
      'object' != typeof w.config.locale &&
        void 0 === T.l10ns[w.config.locale] &&
        w.config.errorHandler(
          new Error('flatpickr: invalid locale ' + w.config.locale)
        ),
        (w.l10n = e(
          e({}, T.l10ns.default),
          'object' == typeof w.config.locale
            ? w.config.locale
            : 'default' !== w.config.locale
            ? T.l10ns[w.config.locale]
            : void 0
        )),
        (D.K =
          '(' +
          w.l10n.amPM[0] +
          '|' +
          w.l10n.amPM[1] +
          '|' +
          w.l10n.amPM[0].toLowerCase() +
          '|' +
          w.l10n.amPM[1].toLowerCase() +
          ')'),
        void 0 ===
          e(e({}, v), JSON.parse(JSON.stringify(p.dataset || {}))).time_24hr &&
          void 0 === T.defaultConfig.time_24hr &&
          (w.config.time_24hr = w.l10n.time_24hr),
        (w.formatDate = b(w)),
        (w.parseDate = C({ config: w.config, l10n: w.l10n }))
    }
    function ce(e) {
      if ('function' != typeof w.config.position) {
        if (void 0 !== w.calendarContainer) {
          pe('onPreCalendarPosition')
          var t = e || w._positionElement,
            n = Array.prototype.reduce.call(
              w.calendarContainer.children,
              function (e, t) {
                return e + t.offsetHeight
              },
              0
            ),
            a = w.calendarContainer.offsetWidth,
            i = w.config.position.split(' '),
            o = i[0],
            r = i.length > 1 ? i[1] : null,
            l = t.getBoundingClientRect(),
            c = window.innerHeight - l.bottom,
            s = 'above' === o || ('below' !== o && c < n && l.top > n),
            u = window.pageYOffset + l.top + (s ? -n - 2 : t.offsetHeight + 2)
          if (
            (d(w.calendarContainer, 'arrowTop', !s),
            d(w.calendarContainer, 'arrowBottom', s),
            !w.config.inline)
          ) {
            var f = window.pageXOffset + l.left,
              m = !1,
              g = !1
            'center' === r
              ? ((f -= (a - l.width) / 2), (m = !0))
              : 'right' === r && ((f -= a - l.width), (g = !0)),
              d(w.calendarContainer, 'arrowLeft', !m && !g),
              d(w.calendarContainer, 'arrowCenter', m),
              d(w.calendarContainer, 'arrowRight', g)
            var p =
                window.document.body.offsetWidth -
                (window.pageXOffset + l.right),
              h = f + a > window.document.body.offsetWidth,
              v = p + a > window.document.body.offsetWidth
            if ((d(w.calendarContainer, 'rightMost', h), !w.config.static))
              if (((w.calendarContainer.style.top = u + 'px'), h))
                if (v) {
                  var D = (function () {
                    for (
                      var e = null, t = 0;
                      t < document.styleSheets.length;
                      t++
                    ) {
                      var n = document.styleSheets[t]
                      try {
                        n.cssRules
                      } catch (e) {
                        continue
                      }
                      e = n
                      break
                    }
                    return null != e
                      ? e
                      : ((a = document.createElement('style')),
                        document.head.appendChild(a),
                        a.sheet)
                    var a
                  })()
                  if (void 0 === D) return
                  var b = window.document.body.offsetWidth,
                    C = Math.max(0, b / 2 - a / 2),
                    M = D.cssRules.length,
                    y = '{left:' + l.left + 'px;right:auto;}'
                  d(w.calendarContainer, 'rightMost', !1),
                    d(w.calendarContainer, 'centerMost', !0),
                    D.insertRule(
                      '.flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after' +
                        y,
                      M
                    ),
                    (w.calendarContainer.style.left = C + 'px'),
                    (w.calendarContainer.style.right = 'auto')
                } else
                  (w.calendarContainer.style.left = 'auto'),
                    (w.calendarContainer.style.right = p + 'px')
              else
                (w.calendarContainer.style.left = f + 'px'),
                  (w.calendarContainer.style.right = 'auto')
          }
        }
      } else w.config.position(w, e)
    }
    function de() {
      w.config.noCalendar || w.isMobile || (K(), De(), J())
    }
    function se() {
      w._input.focus(),
        -1 !== window.navigator.userAgent.indexOf('MSIE') ||
        void 0 !== navigator.msMaxTouchPoints
          ? setTimeout(w.close, 0)
          : w.close()
    }
    function ue(e) {
      e.preventDefault(), e.stopPropagation()
      var t = f(g(e), function (e) {
        return (
          e.classList &&
          e.classList.contains('flatpickr-day') &&
          !e.classList.contains('flatpickr-disabled') &&
          !e.classList.contains('notAllowed')
        )
      })
      if (void 0 !== t) {
        var n = t,
          a = (w.latestSelectedDateObj = new Date(n.dateObj.getTime())),
          i =
            (a.getMonth() < w.currentMonth ||
              a.getMonth() > w.currentMonth + w.config.showMonths - 1) &&
            'range' !== w.config.mode
        if (((w.selectedDateElem = n), 'single' === w.config.mode))
          w.selectedDates = [a]
        else if ('multiple' === w.config.mode) {
          var o = ve(a)
          o ? w.selectedDates.splice(parseInt(o), 1) : w.selectedDates.push(a)
        } else
          'range' === w.config.mode &&
            (2 === w.selectedDates.length && w.clear(!1, !1),
            (w.latestSelectedDateObj = a),
            w.selectedDates.push(a),
            0 !== M(a, w.selectedDates[0], !0) &&
              w.selectedDates.sort(function (e, t) {
                return e.getTime() - t.getTime()
              }))
        if ((S(), i)) {
          var r = w.currentYear !== a.getFullYear()
          ;(w.currentYear = a.getFullYear()),
            (w.currentMonth = a.getMonth()),
            r && (pe('onYearChange'), K()),
            pe('onMonthChange')
        }
        if (
          (De(),
          J(),
          be(),
          i || 'range' === w.config.mode || 1 !== w.config.showMonths
            ? void 0 !== w.selectedDateElem &&
              void 0 === w.hourElement &&
              w.selectedDateElem &&
              w.selectedDateElem.focus()
            : L(n),
          void 0 !== w.hourElement &&
            void 0 !== w.hourElement &&
            w.hourElement.focus(),
          w.config.closeOnSelect)
        ) {
          var l = 'single' === w.config.mode && !w.config.enableTime,
            c =
              'range' === w.config.mode &&
              2 === w.selectedDates.length &&
              !w.config.enableTime
          ;(l || c) && se()
        }
        N()
      }
    }
    ;(w.parseDate = C({ config: w.config, l10n: w.l10n })),
      (w._handlers = []),
      (w.pluginElements = []),
      (w.loadedPlugins = []),
      (w._bind = A),
      (w._setHoursFromDate = _),
      (w._positionCalendar = ce),
      (w.changeMonth = G),
      (w.changeYear = Q),
      (w.clear = function (e, t) {
        void 0 === e && (e = !0)
        void 0 === t && (t = !0)
        ;(w.input.value = ''), void 0 !== w.altInput && (w.altInput.value = '')
        void 0 !== w.mobileInput && (w.mobileInput.value = '')
        ;(w.selectedDates = []),
          (w.latestSelectedDateObj = void 0),
          !0 === t &&
            ((w.currentYear = w._initialDate.getFullYear()),
            (w.currentMonth = w._initialDate.getMonth()))
        if (!0 === w.config.enableTime) {
          var n = x(w.config),
            a = n.hours,
            i = n.minutes,
            o = n.seconds
          O(a, i, o)
        }
        w.redraw(), e && pe('onChange')
      }),
      (w.close = function () {
        ;(w.isOpen = !1),
          w.isMobile ||
            (void 0 !== w.calendarContainer &&
              w.calendarContainer.classList.remove('open'),
            void 0 !== w._input && w._input.classList.remove('active'))
        pe('onClose')
      }),
      (w._createElement = s),
      (w.destroy = function () {
        void 0 !== w.config && pe('onDestroy')
        for (var e = w._handlers.length; e--; ) w._handlers[e].remove()
        if (((w._handlers = []), w.mobileInput))
          w.mobileInput.parentNode &&
            w.mobileInput.parentNode.removeChild(w.mobileInput),
            (w.mobileInput = void 0)
        else if (w.calendarContainer && w.calendarContainer.parentNode)
          if (w.config.static && w.calendarContainer.parentNode) {
            var t = w.calendarContainer.parentNode
            if ((t.lastChild && t.removeChild(t.lastChild), t.parentNode)) {
              for (; t.firstChild; ) t.parentNode.insertBefore(t.firstChild, t)
              t.parentNode.removeChild(t)
            }
          } else w.calendarContainer.parentNode.removeChild(w.calendarContainer)
        w.altInput &&
          ((w.input.type = 'text'),
          w.altInput.parentNode &&
            w.altInput.parentNode.removeChild(w.altInput),
          delete w.altInput)
        w.input &&
          ((w.input.type = w.input._type),
          w.input.classList.remove('flatpickr-input'),
          w.input.removeAttribute('readonly'))
        ;[
          '_showTimeInput',
          'latestSelectedDateObj',
          '_hideNextMonthArrow',
          '_hidePrevMonthArrow',
          '__hideNextMonthArrow',
          '__hidePrevMonthArrow',
          'isMobile',
          'isOpen',
          'selectedDateElem',
          'minDateHasTime',
          'maxDateHasTime',
          'days',
          'daysContainer',
          '_input',
          '_positionElement',
          'innerContainer',
          'rContainer',
          'monthNav',
          'todayDateElem',
          'calendarContainer',
          'weekdayContainer',
          'prevMonthNav',
          'nextMonthNav',
          'monthsDropdownContainer',
          'currentMonthElement',
          'currentYearElement',
          'navigationCurrentMonth',
          'selectedDateElem',
          'config',
        ].forEach(function (e) {
          try {
            delete w[e]
          } catch (e) {}
        })
      }),
      (w.isEnabled = X),
      (w.jumpToDate = P),
      (w.open = function (e, t) {
        void 0 === t && (t = w._positionElement)
        if (!0 === w.isMobile) {
          if (e) {
            e.preventDefault()
            var n = g(e)
            n && n.blur()
          }
          return (
            void 0 !== w.mobileInput &&
              (w.mobileInput.focus(), w.mobileInput.click()),
            void pe('onOpen')
          )
        }
        if (w._input.disabled || w.config.inline) return
        var a = w.isOpen
        ;(w.isOpen = !0),
          a ||
            (w.calendarContainer.classList.add('open'),
            w._input.classList.add('active'),
            pe('onOpen'),
            ce(t))
        !0 === w.config.enableTime &&
          !0 === w.config.noCalendar &&
          (!1 !== w.config.allowInput ||
            (void 0 !== e && w.timeContainer.contains(e.relatedTarget)) ||
            setTimeout(function () {
              return w.hourElement.select()
            }, 50))
      }),
      (w.redraw = de),
      (w.set = function (e, t) {
        if (null !== e && 'object' == typeof e)
          for (var a in (Object.assign(w.config, e), e))
            void 0 !== fe[a] &&
              fe[a].forEach(function (e) {
                return e()
              })
        else
          (w.config[e] = t),
            void 0 !== fe[e]
              ? fe[e].forEach(function (e) {
                  return e()
                })
              : n.indexOf(e) > -1 && (w.config[e] = c(t))
        w.redraw(), be(!0)
      }),
      (w.setDate = function (e, t, n) {
        void 0 === t && (t = !1)
        void 0 === n && (n = w.config.dateFormat)
        if ((0 !== e && !e) || (e instanceof Array && 0 === e.length))
          return w.clear(t)
        me(e, n),
          (w.latestSelectedDateObj =
            w.selectedDates[w.selectedDates.length - 1]),
          w.redraw(),
          P(void 0, t),
          _(),
          0 === w.selectedDates.length && w.clear(!1)
        be(t), t && pe('onChange')
      }),
      (w.toggle = function (e) {
        if (!0 === w.isOpen) return w.close()
        w.open(e)
      })
    var fe = {
      locale: [le, z],
      showMonths: [q, k, $],
      minDate: [P],
      maxDate: [P],
      clickOpens: [
        function () {
          !0 === w.config.clickOpens
            ? (A(w._input, 'focus', w.open), A(w._input, 'click', w.open))
            : (w._input.removeEventListener('focus', w.open),
              w._input.removeEventListener('click', w.open))
        },
      ],
    }
    function me(e, t) {
      var n = []
      if (e instanceof Array)
        n = e.map(function (e) {
          return w.parseDate(e, t)
        })
      else if (e instanceof Date || 'number' == typeof e)
        n = [w.parseDate(e, t)]
      else if ('string' == typeof e)
        switch (w.config.mode) {
          case 'single':
          case 'time':
            n = [w.parseDate(e, t)]
            break
          case 'multiple':
            n = e.split(w.config.conjunction).map(function (e) {
              return w.parseDate(e, t)
            })
            break
          case 'range':
            n = e.split(w.l10n.rangeSeparator).map(function (e) {
              return w.parseDate(e, t)
            })
        }
      else
        w.config.errorHandler(
          new Error('Invalid date supplied: ' + JSON.stringify(e))
        )
      ;(w.selectedDates = w.config.allowInvalidPreload
        ? n
        : n.filter(function (e) {
            return e instanceof Date && X(e, !1)
          })),
        'range' === w.config.mode &&
          w.selectedDates.sort(function (e, t) {
            return e.getTime() - t.getTime()
          })
    }
    function ge(e) {
      return e
        .slice()
        .map(function (e) {
          return 'string' == typeof e ||
            'number' == typeof e ||
            e instanceof Date
            ? w.parseDate(e, void 0, !0)
            : e && 'object' == typeof e && e.from && e.to
            ? {
                from: w.parseDate(e.from, void 0),
                to: w.parseDate(e.to, void 0),
              }
            : e
        })
        .filter(function (e) {
          return e
        })
    }
    function pe(e, t) {
      if (void 0 !== w.config) {
        var n = w.config[e]
        if (void 0 !== n && n.length > 0)
          for (var a = 0; n[a] && a < n.length; a++)
            n[a](w.selectedDates, w.input.value, w, t)
        'onChange' === e &&
          (w.input.dispatchEvent(he('change')),
          w.input.dispatchEvent(he('input')))
      }
    }
    function he(e) {
      var t = document.createEvent('Event')
      return t.initEvent(e, !0, !0), t
    }
    function ve(e) {
      for (var t = 0; t < w.selectedDates.length; t++)
        if (0 === M(w.selectedDates[t], e)) return '' + t
      return !1
    }
    function De() {
      w.config.noCalendar ||
        w.isMobile ||
        !w.monthNav ||
        (w.yearElements.forEach(function (e, t) {
          var n = new Date(w.currentYear, w.currentMonth, 1)
          n.setMonth(w.currentMonth + t),
            w.config.showMonths > 1 || 'static' === w.config.monthSelectorType
              ? (w.monthElements[t].textContent =
                  h(n.getMonth(), w.config.shorthandCurrentMonth, w.l10n) + ' ')
              : (w.monthsDropdownContainer.value = n.getMonth().toString()),
            (e.value = n.getFullYear().toString())
        }),
        (w._hidePrevMonthArrow =
          void 0 !== w.config.minDate &&
          (w.currentYear === w.config.minDate.getFullYear()
            ? w.currentMonth <= w.config.minDate.getMonth()
            : w.currentYear < w.config.minDate.getFullYear())),
        (w._hideNextMonthArrow =
          void 0 !== w.config.maxDate &&
          (w.currentYear === w.config.maxDate.getFullYear()
            ? w.currentMonth + 1 > w.config.maxDate.getMonth()
            : w.currentYear > w.config.maxDate.getFullYear())))
    }
    function we(e) {
      return w.selectedDates
        .map(function (t) {
          return w.formatDate(t, e)
        })
        .filter(function (e, t, n) {
          return (
            'range' !== w.config.mode ||
            w.config.enableTime ||
            n.indexOf(e) === t
          )
        })
        .join(
          'range' !== w.config.mode
            ? w.config.conjunction
            : w.l10n.rangeSeparator
        )
    }
    function be(e) {
      void 0 === e && (e = !0),
        void 0 !== w.mobileInput &&
          w.mobileFormatStr &&
          (w.mobileInput.value =
            void 0 !== w.latestSelectedDateObj
              ? w.formatDate(w.latestSelectedDateObj, w.mobileFormatStr)
              : ''),
        (w.input.value = we(w.config.dateFormat)),
        void 0 !== w.altInput && (w.altInput.value = we(w.config.altFormat)),
        !1 !== e && pe('onValueUpdate')
    }
    function Ce(e) {
      var t = g(e),
        n = w.prevMonthNav.contains(t),
        a = w.nextMonthNav.contains(t)
      n || a
        ? G(n ? -1 : 1)
        : w.yearElements.indexOf(t) >= 0
        ? t.select()
        : t.classList.contains('arrowUp')
        ? w.changeYear(w.currentYear + 1)
        : t.classList.contains('arrowDown') && w.changeYear(w.currentYear - 1)
    }
    return (
      (function () {
        ;(w.element = w.input = p),
          (w.isOpen = !1),
          (function () {
            var t = [
                'wrap',
                'weekNumbers',
                'allowInput',
                'allowInvalidPreload',
                'clickOpens',
                'time_24hr',
                'enableTime',
                'noCalendar',
                'altInput',
                'shorthandCurrentMonth',
                'inline',
                'static',
                'enableSeconds',
                'disableMobile',
              ],
              i = e(e({}, JSON.parse(JSON.stringify(p.dataset || {}))), v),
              o = {}
            ;(w.config.parseDate = i.parseDate),
              (w.config.formatDate = i.formatDate),
              Object.defineProperty(w.config, 'enable', {
                get: function () {
                  return w.config._enable
                },
                set: function (e) {
                  w.config._enable = ge(e)
                },
              }),
              Object.defineProperty(w.config, 'disable', {
                get: function () {
                  return w.config._disable
                },
                set: function (e) {
                  w.config._disable = ge(e)
                },
              })
            var r = 'time' === i.mode
            if (!i.dateFormat && (i.enableTime || r)) {
              var l = T.defaultConfig.dateFormat || a.dateFormat
              o.dateFormat =
                i.noCalendar || r
                  ? 'H:i' + (i.enableSeconds ? ':S' : '')
                  : l + ' H:i' + (i.enableSeconds ? ':S' : '')
            }
            if (i.altInput && (i.enableTime || r) && !i.altFormat) {
              var d = T.defaultConfig.altFormat || a.altFormat
              o.altFormat =
                i.noCalendar || r
                  ? 'h:i' + (i.enableSeconds ? ':S K' : ' K')
                  : d + ' h:i' + (i.enableSeconds ? ':S' : '') + ' K'
            }
            Object.defineProperty(w.config, 'minDate', {
              get: function () {
                return w.config._minDate
              },
              set: oe('min'),
            }),
              Object.defineProperty(w.config, 'maxDate', {
                get: function () {
                  return w.config._maxDate
                },
                set: oe('max'),
              })
            var s = function (e) {
              return function (t) {
                w.config['min' === e ? '_minTime' : '_maxTime'] = w.parseDate(
                  t,
                  'H:i:S'
                )
              }
            }
            Object.defineProperty(w.config, 'minTime', {
              get: function () {
                return w.config._minTime
              },
              set: s('min'),
            }),
              Object.defineProperty(w.config, 'maxTime', {
                get: function () {
                  return w.config._maxTime
                },
                set: s('max'),
              }),
              'time' === i.mode &&
                ((w.config.noCalendar = !0), (w.config.enableTime = !0))
            Object.assign(w.config, o, i)
            for (var u = 0; u < t.length; u++)
              w.config[t[u]] =
                !0 === w.config[t[u]] || 'true' === w.config[t[u]]
            n
              .filter(function (e) {
                return void 0 !== w.config[e]
              })
              .forEach(function (e) {
                w.config[e] = c(w.config[e] || []).map(E)
              }),
              (w.isMobile =
                !w.config.disableMobile &&
                !w.config.inline &&
                'single' === w.config.mode &&
                !w.config.disable.length &&
                !w.config.enable &&
                !w.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                ))
            for (u = 0; u < w.config.plugins.length; u++) {
              var f = w.config.plugins[u](w) || {}
              for (var m in f)
                n.indexOf(m) > -1
                  ? (w.config[m] = c(f[m]).map(E).concat(w.config[m]))
                  : void 0 === i[m] && (w.config[m] = f[m])
            }
            i.altInputClass ||
              (w.config.altInputClass =
                re().className + ' ' + w.config.altInputClass)
            pe('onParseConfig')
          })(),
          le(),
          (function () {
            if (((w.input = re()), !w.input))
              return void w.config.errorHandler(
                new Error('Invalid input element specified')
              )
            ;(w.input._type = w.input.type),
              (w.input.type = 'text'),
              w.input.classList.add('flatpickr-input'),
              (w._input = w.input),
              w.config.altInput &&
                ((w.altInput = s(w.input.nodeName, w.config.altInputClass)),
                (w._input = w.altInput),
                (w.altInput.placeholder = w.input.placeholder),
                (w.altInput.disabled = w.input.disabled),
                (w.altInput.required = w.input.required),
                (w.altInput.tabIndex = w.input.tabIndex),
                (w.altInput.type = 'text'),
                w.input.setAttribute('type', 'hidden'),
                !w.config.static &&
                  w.input.parentNode &&
                  w.input.parentNode.insertBefore(
                    w.altInput,
                    w.input.nextSibling
                  ))
            w.config.allowInput || w._input.setAttribute('readonly', 'readonly')
            w._positionElement = w.config.positionElement || w._input
          })(),
          (function () {
            ;(w.selectedDates = []),
              (w.now = w.parseDate(w.config.now) || new Date())
            var e =
              w.config.defaultDate ||
              (('INPUT' !== w.input.nodeName &&
                'TEXTAREA' !== w.input.nodeName) ||
              !w.input.placeholder ||
              w.input.value !== w.input.placeholder
                ? w.input.value
                : null)
            e && me(e, w.config.dateFormat)
            ;(w._initialDate =
              w.selectedDates.length > 0
                ? w.selectedDates[0]
                : w.config.minDate &&
                  w.config.minDate.getTime() > w.now.getTime()
                ? w.config.minDate
                : w.config.maxDate &&
                  w.config.maxDate.getTime() < w.now.getTime()
                ? w.config.maxDate
                : w.now),
              (w.currentYear = w._initialDate.getFullYear()),
              (w.currentMonth = w._initialDate.getMonth()),
              w.selectedDates.length > 0 &&
                (w.latestSelectedDateObj = w.selectedDates[0])
            void 0 !== w.config.minTime &&
              (w.config.minTime = w.parseDate(w.config.minTime, 'H:i'))
            void 0 !== w.config.maxTime &&
              (w.config.maxTime = w.parseDate(w.config.maxTime, 'H:i'))
            ;(w.minDateHasTime =
              !!w.config.minDate &&
              (w.config.minDate.getHours() > 0 ||
                w.config.minDate.getMinutes() > 0 ||
                w.config.minDate.getSeconds() > 0)),
              (w.maxDateHasTime =
                !!w.config.maxDate &&
                (w.config.maxDate.getHours() > 0 ||
                  w.config.maxDate.getMinutes() > 0 ||
                  w.config.maxDate.getSeconds() > 0))
          })(),
          (w.utils = {
            getDaysInMonth: function (e, t) {
              return (
                void 0 === e && (e = w.currentMonth),
                void 0 === t && (t = w.currentYear),
                1 === e && ((t % 4 == 0 && t % 100 != 0) || t % 400 == 0)
                  ? 29
                  : w.l10n.daysInMonth[e]
              )
            },
          }),
          w.isMobile ||
            (function () {
              var e = window.document.createDocumentFragment()
              if (
                ((w.calendarContainer = s('div', 'flatpickr-calendar')),
                (w.calendarContainer.tabIndex = -1),
                !w.config.noCalendar)
              ) {
                if (
                  (e.appendChild(
                    ((w.monthNav = s('div', 'flatpickr-months')),
                    (w.yearElements = []),
                    (w.monthElements = []),
                    (w.prevMonthNav = s('span', 'flatpickr-prev-month')),
                    (w.prevMonthNav.innerHTML = w.config.prevArrow),
                    (w.nextMonthNav = s('span', 'flatpickr-next-month')),
                    (w.nextMonthNav.innerHTML = w.config.nextArrow),
                    q(),
                    Object.defineProperty(w, '_hidePrevMonthArrow', {
                      get: function () {
                        return w.__hidePrevMonthArrow
                      },
                      set: function (e) {
                        w.__hidePrevMonthArrow !== e &&
                          (d(w.prevMonthNav, 'flatpickr-disabled', e),
                          (w.__hidePrevMonthArrow = e))
                      },
                    }),
                    Object.defineProperty(w, '_hideNextMonthArrow', {
                      get: function () {
                        return w.__hideNextMonthArrow
                      },
                      set: function (e) {
                        w.__hideNextMonthArrow !== e &&
                          (d(w.nextMonthNav, 'flatpickr-disabled', e),
                          (w.__hideNextMonthArrow = e))
                      },
                    }),
                    (w.currentYearElement = w.yearElements[0]),
                    De(),
                    w.monthNav)
                  ),
                  (w.innerContainer = s('div', 'flatpickr-innerContainer')),
                  w.config.weekNumbers)
                ) {
                  var t = (function () {
                      w.calendarContainer.classList.add('hasWeeks')
                      var e = s('div', 'flatpickr-weekwrapper')
                      e.appendChild(
                        s('span', 'flatpickr-weekday', w.l10n.weekAbbreviation)
                      )
                      var t = s('div', 'flatpickr-weeks')
                      return (
                        e.appendChild(t), { weekWrapper: e, weekNumbers: t }
                      )
                    })(),
                    n = t.weekWrapper,
                    a = t.weekNumbers
                  w.innerContainer.appendChild(n),
                    (w.weekNumbers = a),
                    (w.weekWrapper = n)
                }
                ;(w.rContainer = s('div', 'flatpickr-rContainer')),
                  w.rContainer.appendChild($()),
                  w.daysContainer ||
                    ((w.daysContainer = s('div', 'flatpickr-days')),
                    (w.daysContainer.tabIndex = -1)),
                  J(),
                  w.rContainer.appendChild(w.daysContainer),
                  w.innerContainer.appendChild(w.rContainer),
                  e.appendChild(w.innerContainer)
              }
              w.config.enableTime &&
                e.appendChild(
                  (function () {
                    w.calendarContainer.classList.add('hasTime'),
                      w.config.noCalendar &&
                        w.calendarContainer.classList.add('noCalendar')
                    var e = x(w.config)
                    ;(w.timeContainer = s('div', 'flatpickr-time')),
                      (w.timeContainer.tabIndex = -1)
                    var t = s('span', 'flatpickr-time-separator', ':'),
                      n = m('flatpickr-hour', {
                        'aria-label': w.l10n.hourAriaLabel,
                      })
                    w.hourElement = n.getElementsByTagName('input')[0]
                    var a = m('flatpickr-minute', {
                      'aria-label': w.l10n.minuteAriaLabel,
                    })
                    ;(w.minuteElement = a.getElementsByTagName('input')[0]),
                      (w.hourElement.tabIndex = w.minuteElement.tabIndex = -1),
                      (w.hourElement.value = o(
                        w.latestSelectedDateObj
                          ? w.latestSelectedDateObj.getHours()
                          : w.config.time_24hr
                          ? e.hours
                          : (function (e) {
                              switch (e % 24) {
                                case 0:
                                case 12:
                                  return 12
                                default:
                                  return e % 12
                              }
                            })(e.hours)
                      )),
                      (w.minuteElement.value = o(
                        w.latestSelectedDateObj
                          ? w.latestSelectedDateObj.getMinutes()
                          : e.minutes
                      )),
                      w.hourElement.setAttribute(
                        'step',
                        w.config.hourIncrement.toString()
                      ),
                      w.minuteElement.setAttribute(
                        'step',
                        w.config.minuteIncrement.toString()
                      ),
                      w.hourElement.setAttribute(
                        'min',
                        w.config.time_24hr ? '0' : '1'
                      ),
                      w.hourElement.setAttribute(
                        'max',
                        w.config.time_24hr ? '23' : '12'
                      ),
                      w.hourElement.setAttribute('maxlength', '2'),
                      w.minuteElement.setAttribute('min', '0'),
                      w.minuteElement.setAttribute('max', '59'),
                      w.minuteElement.setAttribute('maxlength', '2'),
                      w.timeContainer.appendChild(n),
                      w.timeContainer.appendChild(t),
                      w.timeContainer.appendChild(a),
                      w.config.time_24hr &&
                        w.timeContainer.classList.add('time24hr')
                    if (w.config.enableSeconds) {
                      w.timeContainer.classList.add('hasSeconds')
                      var i = m('flatpickr-second')
                      ;(w.secondElement = i.getElementsByTagName('input')[0]),
                        (w.secondElement.value = o(
                          w.latestSelectedDateObj
                            ? w.latestSelectedDateObj.getSeconds()
                            : e.seconds
                        )),
                        w.secondElement.setAttribute(
                          'step',
                          w.minuteElement.getAttribute('step')
                        ),
                        w.secondElement.setAttribute('min', '0'),
                        w.secondElement.setAttribute('max', '59'),
                        w.secondElement.setAttribute('maxlength', '2'),
                        w.timeContainer.appendChild(
                          s('span', 'flatpickr-time-separator', ':')
                        ),
                        w.timeContainer.appendChild(i)
                    }
                    w.config.time_24hr ||
                      ((w.amPM = s(
                        'span',
                        'flatpickr-am-pm',
                        w.l10n.amPM[
                          r(
                            (w.latestSelectedDateObj
                              ? w.hourElement.value
                              : w.config.defaultHour) > 11
                          )
                        ]
                      )),
                      (w.amPM.title = w.l10n.toggleTitle),
                      (w.amPM.tabIndex = -1),
                      w.timeContainer.appendChild(w.amPM))
                    return w.timeContainer
                  })()
                )
              d(w.calendarContainer, 'rangeMode', 'range' === w.config.mode),
                d(w.calendarContainer, 'animate', !0 === w.config.animate),
                d(w.calendarContainer, 'multiMonth', w.config.showMonths > 1),
                w.calendarContainer.appendChild(e)
              var i =
                void 0 !== w.config.appendTo &&
                void 0 !== w.config.appendTo.nodeType
              if (
                (w.config.inline || w.config.static) &&
                (w.calendarContainer.classList.add(
                  w.config.inline ? 'inline' : 'static'
                ),
                w.config.inline &&
                  (!i && w.element.parentNode
                    ? w.element.parentNode.insertBefore(
                        w.calendarContainer,
                        w._input.nextSibling
                      )
                    : void 0 !== w.config.appendTo &&
                      w.config.appendTo.appendChild(w.calendarContainer)),
                w.config.static)
              ) {
                var l = s('div', 'flatpickr-wrapper')
                w.element.parentNode &&
                  w.element.parentNode.insertBefore(l, w.element),
                  l.appendChild(w.element),
                  w.altInput && l.appendChild(w.altInput),
                  l.appendChild(w.calendarContainer)
              }
              w.config.static ||
                w.config.inline ||
                (void 0 !== w.config.appendTo
                  ? w.config.appendTo
                  : window.document.body
                ).appendChild(w.calendarContainer)
            })(),
          (function () {
            w.config.wrap &&
              ['open', 'close', 'toggle', 'clear'].forEach(function (e) {
                Array.prototype.forEach.call(
                  w.element.querySelectorAll('[data-' + e + ']'),
                  function (t) {
                    return A(t, 'click', w[e])
                  }
                )
              })
            if (w.isMobile)
              return void (function () {
                var e = w.config.enableTime
                  ? w.config.noCalendar
                    ? 'time'
                    : 'datetime-local'
                  : 'date'
                ;(w.mobileInput = s(
                  'input',
                  w.input.className + ' flatpickr-mobile'
                )),
                  (w.mobileInput.tabIndex = 1),
                  (w.mobileInput.type = e),
                  (w.mobileInput.disabled = w.input.disabled),
                  (w.mobileInput.required = w.input.required),
                  (w.mobileInput.placeholder = w.input.placeholder),
                  (w.mobileFormatStr =
                    'datetime-local' === e
                      ? 'Y-m-d\\TH:i:S'
                      : 'date' === e
                      ? 'Y-m-d'
                      : 'H:i:S'),
                  w.selectedDates.length > 0 &&
                    (w.mobileInput.defaultValue = w.mobileInput.value = w.formatDate(
                      w.selectedDates[0],
                      w.mobileFormatStr
                    ))
                w.config.minDate &&
                  (w.mobileInput.min = w.formatDate(w.config.minDate, 'Y-m-d'))
                w.config.maxDate &&
                  (w.mobileInput.max = w.formatDate(w.config.maxDate, 'Y-m-d'))
                w.input.getAttribute('step') &&
                  (w.mobileInput.step = String(w.input.getAttribute('step')))
                ;(w.input.type = 'hidden'),
                  void 0 !== w.altInput && (w.altInput.type = 'hidden')
                try {
                  w.input.parentNode &&
                    w.input.parentNode.insertBefore(
                      w.mobileInput,
                      w.input.nextSibling
                    )
                } catch (e) {}
                A(w.mobileInput, 'change', function (e) {
                  w.setDate(g(e).value, !1, w.mobileFormatStr),
                    pe('onChange'),
                    pe('onClose')
                })
              })()
            var e = l(ie, 50)
            ;(w._debouncedChange = l(N, 300)),
              w.daysContainer &&
                !/iPhone|iPad|iPod/i.test(navigator.userAgent) &&
                A(w.daysContainer, 'mouseover', function (e) {
                  'range' === w.config.mode && ae(g(e))
                })
            A(window.document.body, 'keydown', ne),
              w.config.inline || w.config.static || A(window, 'resize', e)
            void 0 !== window.ontouchstart
              ? A(window.document, 'touchstart', Z)
              : A(window.document, 'mousedown', Z)
            A(window.document, 'focus', Z, { capture: !0 }),
              !0 === w.config.clickOpens &&
                (A(w._input, 'focus', w.open), A(w._input, 'click', w.open))
            void 0 !== w.daysContainer &&
              (A(w.monthNav, 'click', Ce),
              A(w.monthNav, ['keyup', 'increment'], F),
              A(w.daysContainer, 'click', ue))
            if (
              void 0 !== w.timeContainer &&
              void 0 !== w.minuteElement &&
              void 0 !== w.hourElement
            ) {
              var t = function (e) {
                return g(e).select()
              }
              A(w.timeContainer, ['increment'], I),
                A(w.timeContainer, 'blur', I, { capture: !0 }),
                A(w.timeContainer, 'click', Y),
                A([w.hourElement, w.minuteElement], ['focus', 'click'], t),
                void 0 !== w.secondElement &&
                  A(w.secondElement, 'focus', function () {
                    return w.secondElement && w.secondElement.select()
                  }),
                void 0 !== w.amPM &&
                  A(w.amPM, 'click', function (e) {
                    I(e), N()
                  })
            }
            w.config.allowInput && A(w._input, 'blur', te)
          })(),
          (w.selectedDates.length || w.config.noCalendar) &&
            (w.config.enableTime &&
              _(w.config.noCalendar ? w.latestSelectedDateObj : void 0),
            be(!1)),
          k()
        var t = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        !w.isMobile && t && ce(), pe('onReady')
      })(),
      w
    )
  }
  function k(e, t) {
    for (
      var n = Array.prototype.slice.call(e).filter(function (e) {
          return e instanceof HTMLElement
        }),
        a = [],
        i = 0;
      i < n.length;
      i++
    ) {
      var o = n[i]
      try {
        if (null !== o.getAttribute('data-fp-omit')) continue
        void 0 !== o._flatpickr &&
          (o._flatpickr.destroy(), (o._flatpickr = void 0)),
          (o._flatpickr = E(o, t || {})),
          a.push(o._flatpickr)
      } catch (e) {
        console.error(e)
      }
    }
    return 1 === a.length ? a[0] : a
  }
  'undefined' != typeof HTMLElement &&
    'undefined' != typeof HTMLCollection &&
    'undefined' != typeof NodeList &&
    ((HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (
      e
    ) {
      return k(this, e)
    }),
    (HTMLElement.prototype.flatpickr = function (e) {
      return k([this], e)
    }))
  var T = function (e, t) {
    return 'string' == typeof e
      ? k(window.document.querySelectorAll(e), t)
      : e instanceof Node
      ? k([e], t)
      : k(e, t)
  }
  return (
    (T.defaultConfig = {}),
    (T.l10ns = { en: e({}, i), default: e({}, i) }),
    (T.localize = function (t) {
      T.l10ns.default = e(e({}, T.l10ns.default), t)
    }),
    (T.setDefaults = function (t) {
      T.defaultConfig = e(e({}, T.defaultConfig), t)
    }),
    (T.parseDate = C({})),
    (T.formatDate = b({})),
    (T.compareDates = M),
    'undefined' != typeof jQuery &&
      void 0 !== jQuery.fn &&
      (jQuery.fn.flatpickr = function (e) {
        return k(this, e)
      }),
    (Date.prototype.fp_incr = function (e) {
      return new Date(
        this.getFullYear(),
        this.getMonth(),
        this.getDate() + ('string' == typeof e ? parseInt(e, 10) : e)
      )
    }),
    'undefined' != typeof window && (window.flatpickr = T),
    T
  )
})

/*! Select2 4.0.6-rc.1 | https://github.com/select2/select2/blob/master/LICENSE.md */
!(function (a) {
  'function' == typeof define && define.amd
    ? define(['jquery'], a)
    : 'object' == typeof module && module.exports
    ? (module.exports = function (b, c) {
        return (
          void 0 === c &&
            (c =
              'undefined' != typeof window
                ? require('jquery')
                : require('jquery')(b)),
          a(c),
          c
        )
      })
    : a(jQuery)
})(function (a) {
  var b = (function () {
      if (a && a.fn && a.fn.select2 && a.fn.select2.amd)
        var b = a.fn.select2.amd
      var b
      return (
        (function () {
          if (!b || !b.requirejs) {
            b ? (c = b) : (b = {})
            var a, c, d
            !(function (b) {
              function e(a, b) {
                return v.call(a, b)
              }
              function f(a, b) {
                var c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i,
                  j,
                  k,
                  l,
                  m,
                  n,
                  o = b && b.split('/'),
                  p = t.map,
                  q = (p && p['*']) || {}
                if (a) {
                  for (
                    a = a.split('/'),
                      g = a.length - 1,
                      t.nodeIdCompat &&
                        x.test(a[g]) &&
                        (a[g] = a[g].replace(x, '')),
                      '.' === a[0].charAt(0) &&
                        o &&
                        ((n = o.slice(0, o.length - 1)), (a = n.concat(a))),
                      k = 0;
                    k < a.length;
                    k++
                  )
                    if ('.' === (m = a[k])) a.splice(k, 1), (k -= 1)
                    else if ('..' === m) {
                      if (
                        0 === k ||
                        (1 === k && '..' === a[2]) ||
                        '..' === a[k - 1]
                      )
                        continue
                      k > 0 && (a.splice(k - 1, 2), (k -= 2))
                    }
                  a = a.join('/')
                }
                if ((o || q) && p) {
                  for (c = a.split('/'), k = c.length; k > 0; k -= 1) {
                    if (((d = c.slice(0, k).join('/')), o))
                      for (l = o.length; l > 0; l -= 1)
                        if ((e = p[o.slice(0, l).join('/')]) && (e = e[d])) {
                          ;(f = e), (h = k)
                          break
                        }
                    if (f) break
                    !i && q && q[d] && ((i = q[d]), (j = k))
                  }
                  !f && i && ((f = i), (h = j)),
                    f && (c.splice(0, h, f), (a = c.join('/')))
                }
                return a
              }
              function g(a, c) {
                return function () {
                  var d = w.call(arguments, 0)
                  return (
                    'string' != typeof d[0] && 1 === d.length && d.push(null),
                    o.apply(b, d.concat([a, c]))
                  )
                }
              }
              function h(a) {
                return function (b) {
                  return f(b, a)
                }
              }
              function i(a) {
                return function (b) {
                  r[a] = b
                }
              }
              function j(a) {
                if (e(s, a)) {
                  var c = s[a]
                  delete s[a], (u[a] = !0), n.apply(b, c)
                }
                if (!e(r, a) && !e(u, a)) throw new Error('No ' + a)
                return r[a]
              }
              function k(a) {
                var b,
                  c = a ? a.indexOf('!') : -1
                return (
                  c > -1 &&
                    ((b = a.substring(0, c)),
                    (a = a.substring(c + 1, a.length))),
                  [b, a]
                )
              }
              function l(a) {
                return a ? k(a) : []
              }
              function m(a) {
                return function () {
                  return (t && t.config && t.config[a]) || {}
                }
              }
              var n,
                o,
                p,
                q,
                r = {},
                s = {},
                t = {},
                u = {},
                v = Object.prototype.hasOwnProperty,
                w = [].slice,
                x = /\.js$/
              ;(p = function (a, b) {
                var c,
                  d = k(a),
                  e = d[0],
                  g = b[1]
                return (
                  (a = d[1]),
                  e && ((e = f(e, g)), (c = j(e))),
                  e
                    ? (a = c && c.normalize ? c.normalize(a, h(g)) : f(a, g))
                    : ((a = f(a, g)),
                      (d = k(a)),
                      (e = d[0]),
                      (a = d[1]),
                      e && (c = j(e))),
                  { f: e ? e + '!' + a : a, n: a, pr: e, p: c }
                )
              }),
                (q = {
                  require: function (a) {
                    return g(a)
                  },
                  exports: function (a) {
                    var b = r[a]
                    return void 0 !== b ? b : (r[a] = {})
                  },
                  module: function (a) {
                    return { id: a, uri: '', exports: r[a], config: m(a) }
                  },
                }),
                (n = function (a, c, d, f) {
                  var h,
                    k,
                    m,
                    n,
                    o,
                    t,
                    v,
                    w = [],
                    x = typeof d
                  if (
                    ((f = f || a),
                    (t = l(f)),
                    'undefined' === x || 'function' === x)
                  ) {
                    for (
                      c =
                        !c.length && d.length
                          ? ['require', 'exports', 'module']
                          : c,
                        o = 0;
                      o < c.length;
                      o += 1
                    )
                      if (((n = p(c[o], t)), 'require' === (k = n.f)))
                        w[o] = q.require(a)
                      else if ('exports' === k) (w[o] = q.exports(a)), (v = !0)
                      else if ('module' === k) h = w[o] = q.module(a)
                      else if (e(r, k) || e(s, k) || e(u, k)) w[o] = j(k)
                      else {
                        if (!n.p) throw new Error(a + ' missing ' + k)
                        n.p.load(n.n, g(f, !0), i(k), {}), (w[o] = r[k])
                      }
                    ;(m = d ? d.apply(r[a], w) : void 0),
                      a &&
                        (h && h.exports !== b && h.exports !== r[a]
                          ? (r[a] = h.exports)
                          : (m === b && v) || (r[a] = m))
                  } else a && (r[a] = d)
                }),
                (a = c = o = function (a, c, d, e, f) {
                  if ('string' == typeof a)
                    return q[a] ? q[a](c) : j(p(a, l(c)).f)
                  if (!a.splice) {
                    if (((t = a), t.deps && o(t.deps, t.callback), !c)) return
                    c.splice ? ((a = c), (c = d), (d = null)) : (a = b)
                  }
                  return (
                    (c = c || function () {}),
                    'function' == typeof d && ((d = e), (e = f)),
                    e
                      ? n(b, a, c, d)
                      : setTimeout(function () {
                          n(b, a, c, d)
                        }, 4),
                    o
                  )
                }),
                (o.config = function (a) {
                  return o(a)
                }),
                (a._defined = r),
                (d = function (a, b, c) {
                  if ('string' != typeof a)
                    throw new Error(
                      'See almond README: incorrect module build, no module name'
                    )
                  b.splice || ((c = b), (b = [])),
                    e(r, a) || e(s, a) || (s[a] = [a, b, c])
                }),
                (d.amd = { jQuery: !0 })
            })(),
              (b.requirejs = a),
              (b.require = c),
              (b.define = d)
          }
        })(),
        b.define('almond', function () {}),
        b.define('jquery', [], function () {
          var b = a || $
          return (
            null == b &&
              console &&
              console.error &&
              console.error(
                'Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page.'
              ),
            b
          )
        }),
        b.define('select2/utils', ['jquery'], function (a) {
          function b(a) {
            var b = a.prototype,
              c = []
            for (var d in b) {
              'function' == typeof b[d] && 'constructor' !== d && c.push(d)
            }
            return c
          }
          var c = {}
          ;(c.Extend = function (a, b) {
            function c() {
              this.constructor = a
            }
            var d = {}.hasOwnProperty
            for (var e in b) d.call(b, e) && (a[e] = b[e])
            return (
              (c.prototype = b.prototype),
              (a.prototype = new c()),
              (a.__super__ = b.prototype),
              a
            )
          }),
            (c.Decorate = function (a, c) {
              function d() {
                var b = Array.prototype.unshift,
                  d = c.prototype.constructor.length,
                  e = a.prototype.constructor
                d > 0 &&
                  (b.call(arguments, a.prototype.constructor),
                  (e = c.prototype.constructor)),
                  e.apply(this, arguments)
              }
              function e() {
                this.constructor = d
              }
              var f = b(c),
                g = b(a)
              ;(c.displayName = a.displayName), (d.prototype = new e())
              for (var h = 0; h < g.length; h++) {
                var i = g[h]
                d.prototype[i] = a.prototype[i]
              }
              for (
                var j = function (a) {
                    var b = function () {}
                    ;(a in d.prototype) && (b = d.prototype[a])
                    var e = c.prototype[a]
                    return function () {
                      return (
                        Array.prototype.unshift.call(arguments, b),
                        e.apply(this, arguments)
                      )
                    }
                  },
                  k = 0;
                k < f.length;
                k++
              ) {
                var l = f[k]
                d.prototype[l] = j(l)
              }
              return d
            })
          var d = function () {
            this.listeners = {}
          }
          ;(d.prototype.on = function (a, b) {
            ;(this.listeners = this.listeners || {}),
              a in this.listeners
                ? this.listeners[a].push(b)
                : (this.listeners[a] = [b])
          }),
            (d.prototype.trigger = function (a) {
              var b = Array.prototype.slice,
                c = b.call(arguments, 1)
              ;(this.listeners = this.listeners || {}),
                null == c && (c = []),
                0 === c.length && c.push({}),
                (c[0]._type = a),
                a in this.listeners &&
                  this.invoke(this.listeners[a], b.call(arguments, 1)),
                '*' in this.listeners &&
                  this.invoke(this.listeners['*'], arguments)
            }),
            (d.prototype.invoke = function (a, b) {
              for (var c = 0, d = a.length; c < d; c++) a[c].apply(this, b)
            }),
            (c.Observable = d),
            (c.generateChars = function (a) {
              for (var b = '', c = 0; c < a; c++) {
                b += Math.floor(36 * Math.random()).toString(36)
              }
              return b
            }),
            (c.bind = function (a, b) {
              return function () {
                a.apply(b, arguments)
              }
            }),
            (c._convertData = function (a) {
              for (var b in a) {
                var c = b.split('-'),
                  d = a
                if (1 !== c.length) {
                  for (var e = 0; e < c.length; e++) {
                    var f = c[e]
                    ;(f = f.substring(0, 1).toLowerCase() + f.substring(1)),
                      f in d || (d[f] = {}),
                      e == c.length - 1 && (d[f] = a[b]),
                      (d = d[f])
                  }
                  delete a[b]
                }
              }
              return a
            }),
            (c.hasScroll = function (b, c) {
              var d = a(c),
                e = c.style.overflowX,
                f = c.style.overflowY
              return (
                (e !== f || ('hidden' !== f && 'visible' !== f)) &&
                ('scroll' === e ||
                  'scroll' === f ||
                  d.innerHeight() < c.scrollHeight ||
                  d.innerWidth() < c.scrollWidth)
              )
            }),
            (c.escapeMarkup = function (a) {
              var b = {
                '\\': '&#92;',
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#47;',
              }
              return 'string' != typeof a
                ? a
                : String(a).replace(/[&<>"'\/\\]/g, function (a) {
                    return b[a]
                  })
            }),
            (c.appendMany = function (b, c) {
              if ('1.7' === a.fn.jquery.substr(0, 3)) {
                var d = a()
                a.map(c, function (a) {
                  d = d.add(a)
                }),
                  (c = d)
              }
              b.append(c)
            }),
            (c.__cache = {})
          var e = 0
          return (
            (c.GetUniqueElementId = function (a) {
              var b = a.getAttribute('data-select2-id')
              return (
                null == b &&
                  (a.id
                    ? ((b = a.id), a.setAttribute('data-select2-id', b))
                    : (a.setAttribute('data-select2-id', ++e),
                      (b = e.toString()))),
                b
              )
            }),
            (c.StoreData = function (a, b, d) {
              var e = c.GetUniqueElementId(a)
              c.__cache[e] || (c.__cache[e] = {}), (c.__cache[e][b] = d)
            }),
            (c.GetData = function (b, d) {
              var e = c.GetUniqueElementId(b)
              return d
                ? c.__cache[e] && null != c.__cache[e][d]
                  ? c.__cache[e][d]
                  : a(b).data(d)
                : c.__cache[e]
            }),
            (c.RemoveData = function (a) {
              var b = c.GetUniqueElementId(a)
              null != c.__cache[b] && delete c.__cache[b]
            }),
            c
          )
        }),
        b.define('select2/results', ['jquery', './utils'], function (a, b) {
          function c(a, b, d) {
            ;(this.$element = a),
              (this.data = d),
              (this.options = b),
              c.__super__.constructor.call(this)
          }
          return (
            b.Extend(c, b.Observable),
            (c.prototype.render = function () {
              var b = a(
                '<ul class="select2-results__options" role="tree"></ul>'
              )
              return (
                this.options.get('multiple') &&
                  b.attr('aria-multiselectable', 'true'),
                (this.$results = b),
                b
              )
            }),
            (c.prototype.clear = function () {
              this.$results.empty()
            }),
            (c.prototype.displayMessage = function (b) {
              var c = this.options.get('escapeMarkup')
              this.clear(), this.hideLoading()
              var d = a(
                  '<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'
                ),
                e = this.options.get('translations').get(b.message)
              d.append(c(e(b.args))),
                (d[0].className += ' select2-results__message'),
                this.$results.append(d)
            }),
            (c.prototype.hideMessages = function () {
              this.$results.find('.select2-results__message').remove()
            }),
            (c.prototype.append = function (a) {
              this.hideLoading()
              var b = []
              if (null == a.results || 0 === a.results.length)
                return void (
                  0 === this.$results.children().length &&
                  this.trigger('results:message', { message: 'noResults' })
                )
              a.results = this.sort(a.results)
              for (var c = 0; c < a.results.length; c++) {
                var d = a.results[c],
                  e = this.option(d)
                b.push(e)
              }
              this.$results.append(b)
            }),
            (c.prototype.position = function (a, b) {
              b.find('.select2-results').append(a)
            }),
            (c.prototype.sort = function (a) {
              return this.options.get('sorter')(a)
            }),
            (c.prototype.highlightFirstItem = function () {
              var a = this.$results.find(
                  '.select2-results__option[aria-selected]'
                ),
                b = a.filter('[aria-selected=true]')
              b.length > 0
                ? b.first().trigger('mouseenter')
                : a.first().trigger('mouseenter'),
                this.ensureHighlightVisible()
            }),
            (c.prototype.setClasses = function () {
              var c = this
              this.data.current(function (d) {
                var e = a.map(d, function (a) {
                  return a.id.toString()
                })
                c.$results
                  .find('.select2-results__option[aria-selected]')
                  .each(function () {
                    var c = a(this),
                      d = b.GetData(this, 'data'),
                      f = '' + d.id
                    ;(null != d.element && d.element.selected) ||
                    (null == d.element && a.inArray(f, e) > -1)
                      ? c.attr('aria-selected', 'true')
                      : c.attr('aria-selected', 'false')
                  })
              })
            }),
            (c.prototype.showLoading = function (a) {
              this.hideLoading()
              var b = this.options.get('translations').get('searching'),
                c = { disabled: !0, loading: !0, text: b(a) },
                d = this.option(c)
              ;(d.className += ' loading-results'), this.$results.prepend(d)
            }),
            (c.prototype.hideLoading = function () {
              this.$results.find('.loading-results').remove()
            }),
            (c.prototype.option = function (c) {
              var d = document.createElement('li')
              d.className = 'select2-results__option'
              var e = { role: 'treeitem', 'aria-selected': 'false' }
              c.disabled &&
                (delete e['aria-selected'], (e['aria-disabled'] = 'true')),
                null == c.id && delete e['aria-selected'],
                null != c._resultId && (d.id = c._resultId),
                c.title && (d.title = c.title),
                c.children &&
                  ((e.role = 'group'),
                  (e['aria-label'] = c.text),
                  delete e['aria-selected'])
              for (var f in e) {
                var g = e[f]
                d.setAttribute(f, g)
              }
              if (c.children) {
                var h = a(d),
                  i = document.createElement('strong')
                i.className = 'select2-results__group'
                a(i)
                this.template(c, i)
                for (var j = [], k = 0; k < c.children.length; k++) {
                  var l = c.children[k],
                    m = this.option(l)
                  j.push(m)
                }
                var n = a('<ul></ul>', {
                  class:
                    'select2-results__options select2-results__options--nested',
                })
                n.append(j), h.append(i), h.append(n)
              } else this.template(c, d)
              return b.StoreData(d, 'data', c), d
            }),
            (c.prototype.bind = function (c, d) {
              var e = this,
                f = c.id + '-results'
              this.$results.attr('id', f),
                c.on('results:all', function (a) {
                  e.clear(),
                    e.append(a.data),
                    c.isOpen() && (e.setClasses(), e.highlightFirstItem())
                }),
                c.on('results:append', function (a) {
                  e.append(a.data), c.isOpen() && e.setClasses()
                }),
                c.on('query', function (a) {
                  e.hideMessages(), e.showLoading(a)
                }),
                c.on('select', function () {
                  c.isOpen() && (e.setClasses(), e.highlightFirstItem())
                }),
                c.on('unselect', function () {
                  c.isOpen() && (e.setClasses(), e.highlightFirstItem())
                }),
                c.on('open', function () {
                  e.$results.attr('aria-expanded', 'true'),
                    e.$results.attr('aria-hidden', 'false'),
                    e.setClasses(),
                    e.ensureHighlightVisible()
                }),
                c.on('close', function () {
                  e.$results.attr('aria-expanded', 'false'),
                    e.$results.attr('aria-hidden', 'true'),
                    e.$results.removeAttr('aria-activedescendant')
                }),
                c.on('results:toggle', function () {
                  var a = e.getHighlightedResults()
                  0 !== a.length && a.trigger('mouseup')
                }),
                c.on('results:select', function () {
                  var a = e.getHighlightedResults()
                  if (0 !== a.length) {
                    var c = b.GetData(a[0], 'data')
                    'true' == a.attr('aria-selected')
                      ? e.trigger('close', {})
                      : e.trigger('select', { data: c })
                  }
                }),
                c.on('results:previous', function () {
                  var a = e.getHighlightedResults(),
                    b = e.$results.find('[aria-selected]'),
                    c = b.index(a)
                  if (!(c <= 0)) {
                    var d = c - 1
                    0 === a.length && (d = 0)
                    var f = b.eq(d)
                    f.trigger('mouseenter')
                    var g = e.$results.offset().top,
                      h = f.offset().top,
                      i = e.$results.scrollTop() + (h - g)
                    0 === d
                      ? e.$results.scrollTop(0)
                      : h - g < 0 && e.$results.scrollTop(i)
                  }
                }),
                c.on('results:next', function () {
                  var a = e.getHighlightedResults(),
                    b = e.$results.find('[aria-selected]'),
                    c = b.index(a),
                    d = c + 1
                  if (!(d >= b.length)) {
                    var f = b.eq(d)
                    f.trigger('mouseenter')
                    var g =
                        e.$results.offset().top + e.$results.outerHeight(!1),
                      h = f.offset().top + f.outerHeight(!1),
                      i = e.$results.scrollTop() + h - g
                    0 === d
                      ? e.$results.scrollTop(0)
                      : h > g && e.$results.scrollTop(i)
                  }
                }),
                c.on('results:focus', function (a) {
                  a.element.addClass('select2-results__option--highlighted')
                }),
                c.on('results:message', function (a) {
                  e.displayMessage(a)
                }),
                a.fn.mousewheel &&
                  this.$results.on('mousewheel', function (a) {
                    var b = e.$results.scrollTop(),
                      c = e.$results.get(0).scrollHeight - b + a.deltaY,
                      d = a.deltaY > 0 && b - a.deltaY <= 0,
                      f = a.deltaY < 0 && c <= e.$results.height()
                    d
                      ? (e.$results.scrollTop(0),
                        a.preventDefault(),
                        a.stopPropagation())
                      : f &&
                        (e.$results.scrollTop(
                          e.$results.get(0).scrollHeight - e.$results.height()
                        ),
                        a.preventDefault(),
                        a.stopPropagation())
                  }),
                this.$results.on(
                  'mouseup',
                  '.select2-results__option[aria-selected]',
                  function (c) {
                    var d = a(this),
                      f = b.GetData(this, 'data')
                    if ('true' === d.attr('aria-selected'))
                      return void (e.options.get('multiple')
                        ? e.trigger('unselect', { originalEvent: c, data: f })
                        : e.trigger('close', {}))
                    e.trigger('select', { originalEvent: c, data: f })
                  }
                ),
                this.$results.on(
                  'mouseenter',
                  '.select2-results__option[aria-selected]',
                  function (c) {
                    var d = b.GetData(this, 'data')
                    e
                      .getHighlightedResults()
                      .removeClass('select2-results__option--highlighted'),
                      e.trigger('results:focus', { data: d, element: a(this) })
                  }
                )
            }),
            (c.prototype.getHighlightedResults = function () {
              return this.$results.find('.select2-results__option--highlighted')
            }),
            (c.prototype.destroy = function () {
              this.$results.remove()
            }),
            (c.prototype.ensureHighlightVisible = function () {
              var a = this.getHighlightedResults()
              if (0 !== a.length) {
                var b = this.$results.find('[aria-selected]'),
                  c = b.index(a),
                  d = this.$results.offset().top,
                  e = a.offset().top,
                  f = this.$results.scrollTop() + (e - d),
                  g = e - d
                ;(f -= 2 * a.outerHeight(!1)),
                  c <= 2
                    ? this.$results.scrollTop(0)
                    : (g > this.$results.outerHeight() || g < 0) &&
                      this.$results.scrollTop(f)
              }
            }),
            (c.prototype.template = function (b, c) {
              var d = this.options.get('templateResult'),
                e = this.options.get('escapeMarkup'),
                f = d(b, c)
              null == f
                ? (c.style.display = 'none')
                : 'string' == typeof f
                ? (c.innerHTML = e(f))
                : a(c).append(f)
            }),
            c
          )
        }),
        b.define('select2/keys', [], function () {
          return {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46,
          }
        }),
        b.define(
          'select2/selection/base',
          ['jquery', '../utils', '../keys'],
          function (a, b, c) {
            function d(a, b) {
              ;(this.$element = a),
                (this.options = b),
                d.__super__.constructor.call(this)
            }
            return (
              b.Extend(d, b.Observable),
              (d.prototype.render = function () {
                var c = a(
                  '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
                )
                return (
                  (this._tabindex = 0),
                  null != b.GetData(this.$element[0], 'old-tabindex')
                    ? (this._tabindex = b.GetData(
                        this.$element[0],
                        'old-tabindex'
                      ))
                    : null != this.$element.attr('tabindex') &&
                      (this._tabindex = this.$element.attr('tabindex')),
                  c.attr('title', this.$element.attr('title')),
                  c.attr('tabindex', this._tabindex),
                  (this.$selection = c),
                  c
                )
              }),
              (d.prototype.bind = function (a, b) {
                var d = this,
                  e = (a.id, a.id + '-results')
                ;(this.container = a),
                  this.$selection.on('focus', function (a) {
                    d.trigger('focus', a)
                  }),
                  this.$selection.on('blur', function (a) {
                    d._handleBlur(a)
                  }),
                  this.$selection.on('keydown', function (a) {
                    d.trigger('keypress', a),
                      a.which === c.SPACE && a.preventDefault()
                  }),
                  a.on('results:focus', function (a) {
                    d.$selection.attr('aria-activedescendant', a.data._resultId)
                  }),
                  a.on('selection:update', function (a) {
                    d.update(a.data)
                  }),
                  a.on('open', function () {
                    d.$selection.attr('aria-expanded', 'true'),
                      d.$selection.attr('aria-owns', e),
                      d._attachCloseHandler(a)
                  }),
                  a.on('close', function () {
                    d.$selection.attr('aria-expanded', 'false'),
                      d.$selection.removeAttr('aria-activedescendant'),
                      d.$selection.removeAttr('aria-owns'),
                      d.$selection.focus(),
                      window.setTimeout(function () {
                        d.$selection.focus()
                      }, 0),
                      d._detachCloseHandler(a)
                  }),
                  a.on('enable', function () {
                    d.$selection.attr('tabindex', d._tabindex)
                  }),
                  a.on('disable', function () {
                    d.$selection.attr('tabindex', '-1')
                  })
              }),
              (d.prototype._handleBlur = function (b) {
                var c = this
                window.setTimeout(function () {
                  document.activeElement == c.$selection[0] ||
                    a.contains(c.$selection[0], document.activeElement) ||
                    c.trigger('blur', b)
                }, 1)
              }),
              (d.prototype._attachCloseHandler = function (c) {
                a(document.body).on('mousedown.select2.' + c.id, function (c) {
                  var d = a(c.target),
                    e = d.closest('.select2')
                  a('.select2.select2-container--open').each(function () {
                    a(this),
                      this != e[0] &&
                        b.GetData(this, 'element').select2('close')
                  })
                })
              }),
              (d.prototype._detachCloseHandler = function (b) {
                a(document.body).off('mousedown.select2.' + b.id)
              }),
              (d.prototype.position = function (a, b) {
                b.find('.selection').append(a)
              }),
              (d.prototype.destroy = function () {
                this._detachCloseHandler(this.container)
              }),
              (d.prototype.update = function (a) {
                throw new Error(
                  'The `update` method must be defined in child classes.'
                )
              }),
              d
            )
          }
        ),
        b.define(
          'select2/selection/single',
          ['jquery', './base', '../utils', '../keys'],
          function (a, b, c, d) {
            function e() {
              e.__super__.constructor.apply(this, arguments)
            }
            return (
              c.Extend(e, b),
              (e.prototype.render = function () {
                var a = e.__super__.render.call(this)
                return (
                  a.addClass('select2-selection--single'),
                  a.html(
                    '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
                  ),
                  a
                )
              }),
              (e.prototype.bind = function (a, b) {
                var c = this
                e.__super__.bind.apply(this, arguments)
                var d = a.id + '-container'
                this.$selection
                  .find('.select2-selection__rendered')
                  .attr('id', d)
                  .attr('role', 'textbox')
                  .attr('aria-readonly', 'true'),
                  this.$selection.attr('aria-labelledby', d),
                  this.$selection.on('mousedown', function (a) {
                    1 === a.which && c.trigger('toggle', { originalEvent: a })
                  }),
                  this.$selection.on('focus', function (a) {}),
                  this.$selection.on('blur', function (a) {}),
                  a.on('focus', function (b) {
                    a.isOpen() || c.$selection.focus()
                  })
              }),
              (e.prototype.clear = function () {
                var a = this.$selection.find('.select2-selection__rendered')
                a.empty(), a.removeAttr('title')
              }),
              (e.prototype.display = function (a, b) {
                var c = this.options.get('templateSelection')
                return this.options.get('escapeMarkup')(c(a, b))
              }),
              (e.prototype.selectionContainer = function () {
                return a('<span></span>')
              }),
              (e.prototype.update = function (a) {
                if (0 === a.length) return void this.clear()
                var b = a[0],
                  c = this.$selection.find('.select2-selection__rendered'),
                  d = this.display(b, c)
                c.empty().append(d), c.attr('title', b.title || b.text)
              }),
              e
            )
          }
        ),
        b.define(
          'select2/selection/multiple',
          ['jquery', './base', '../utils'],
          function (a, b, c) {
            function d(a, b) {
              d.__super__.constructor.apply(this, arguments)
            }
            return (
              c.Extend(d, b),
              (d.prototype.render = function () {
                var a = d.__super__.render.call(this)
                return (
                  a.addClass('select2-selection--multiple'),
                  a.html('<ul class="select2-selection__rendered"></ul>'),
                  a
                )
              }),
              (d.prototype.bind = function (b, e) {
                var f = this
                d.__super__.bind.apply(this, arguments),
                  this.$selection.on('click', function (a) {
                    f.trigger('toggle', { originalEvent: a })
                  }),
                  this.$selection.on(
                    'click',
                    '.select2-selection__choice__remove',
                    function (b) {
                      if (!f.options.get('disabled')) {
                        var d = a(this),
                          e = d.parent(),
                          g = c.GetData(e[0], 'data')
                        f.trigger('unselect', { originalEvent: b, data: g })
                      }
                    }
                  )
              }),
              (d.prototype.clear = function () {
                var a = this.$selection.find('.select2-selection__rendered')
                a.empty(), a.removeAttr('title')
              }),
              (d.prototype.display = function (a, b) {
                var c = this.options.get('templateSelection')
                return this.options.get('escapeMarkup')(c(a, b))
              }),
              (d.prototype.selectionContainer = function () {
                return a(
                  '<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>'
                )
              }),
              (d.prototype.update = function (a) {
                if ((this.clear(), 0 !== a.length)) {
                  for (var b = [], d = 0; d < a.length; d++) {
                    var e = a[d],
                      f = this.selectionContainer(),
                      g = this.display(e, f)
                    f.append(g),
                      f.attr('title', e.title || e.text),
                      c.StoreData(f[0], 'data', e),
                      b.push(f)
                  }
                  var h = this.$selection.find('.select2-selection__rendered')
                  c.appendMany(h, b)
                }
              }),
              d
            )
          }
        ),
        b.define('select2/selection/placeholder', ['../utils'], function (a) {
          function b(a, b, c) {
            ;(this.placeholder = this.normalizePlaceholder(
              c.get('placeholder')
            )),
              a.call(this, b, c)
          }
          return (
            (b.prototype.normalizePlaceholder = function (a, b) {
              return 'string' == typeof b && (b = { id: '', text: b }), b
            }),
            (b.prototype.createPlaceholder = function (a, b) {
              var c = this.selectionContainer()
              return (
                c.html(this.display(b)),
                c
                  .addClass('select2-selection__placeholder')
                  .removeClass('select2-selection__choice'),
                c
              )
            }),
            (b.prototype.update = function (a, b) {
              var c = 1 == b.length && b[0].id != this.placeholder.id
              if (b.length > 1 || c) return a.call(this, b)
              this.clear()
              var d = this.createPlaceholder(this.placeholder)
              this.$selection.find('.select2-selection__rendered').append(d)
            }),
            b
          )
        }),
        b.define(
          'select2/selection/allowClear',
          ['jquery', '../keys', '../utils'],
          function (a, b, c) {
            function d() {}
            return (
              (d.prototype.bind = function (a, b, c) {
                var d = this
                a.call(this, b, c),
                  null == this.placeholder &&
                    this.options.get('debug') &&
                    window.console &&
                    console.error &&
                    console.error(
                      'Select2: The `allowClear` option should be used in combination with the `placeholder` option.'
                    ),
                  this.$selection.on(
                    'mousedown',
                    '.select2-selection__clear',
                    function (a) {
                      d._handleClear(a)
                    }
                  ),
                  b.on('keypress', function (a) {
                    d._handleKeyboardClear(a, b)
                  })
              }),
              (d.prototype._handleClear = function (a, b) {
                if (!this.options.get('disabled')) {
                  var d = this.$selection.find('.select2-selection__clear')
                  if (0 !== d.length) {
                    b.stopPropagation()
                    var e = c.GetData(d[0], 'data'),
                      f = this.$element.val()
                    this.$element.val(this.placeholder.id)
                    var g = { data: e }
                    if ((this.trigger('clear', g), g.prevented))
                      return void this.$element.val(f)
                    for (var h = 0; h < e.length; h++)
                      if (
                        ((g = { data: e[h] }),
                        this.trigger('unselect', g),
                        g.prevented)
                      )
                        return void this.$element.val(f)
                    this.$element.trigger('change'), this.trigger('toggle', {})
                  }
                }
              }),
              (d.prototype._handleKeyboardClear = function (a, c, d) {
                d.isOpen() ||
                  (c.which != b.DELETE && c.which != b.BACKSPACE) ||
                  this._handleClear(c)
              }),
              (d.prototype.update = function (b, d) {
                if (
                  (b.call(this, d),
                  !(
                    this.$selection.find('.select2-selection__placeholder')
                      .length > 0 || 0 === d.length
                  ))
                ) {
                  var e = a(
                    '<span class="select2-selection__clear">&times;</span>'
                  )
                  c.StoreData(e[0], 'data', d),
                    this.$selection
                      .find('.select2-selection__rendered')
                      .prepend(e)
                }
              }),
              d
            )
          }
        ),
        b.define(
          'select2/selection/search',
          ['jquery', '../utils', '../keys'],
          function (a, b, c) {
            function d(a, b, c) {
              a.call(this, b, c)
            }
            return (
              (d.prototype.render = function (b) {
                var c = a(
                  '<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'
                )
                ;(this.$searchContainer = c), (this.$search = c.find('input'))
                var d = b.call(this)
                return this._transferTabIndex(), d
              }),
              (d.prototype.bind = function (a, d, e) {
                var f = this
                a.call(this, d, e),
                  d.on('open', function () {
                    f.$search.trigger('focus')
                  }),
                  d.on('close', function () {
                    f.$search.val(''),
                      f.$search.removeAttr('aria-activedescendant'),
                      f.$search.trigger('focus')
                  }),
                  d.on('enable', function () {
                    f.$search.prop('disabled', !1), f._transferTabIndex()
                  }),
                  d.on('disable', function () {
                    f.$search.prop('disabled', !0)
                  }),
                  d.on('focus', function (a) {
                    f.$search.trigger('focus')
                  }),
                  d.on('results:focus', function (a) {
                    f.$search.attr('aria-activedescendant', a.id)
                  }),
                  this.$selection.on(
                    'focusin',
                    '.select2-search--inline',
                    function (a) {
                      f.trigger('focus', a)
                    }
                  ),
                  this.$selection.on(
                    'focusout',
                    '.select2-search--inline',
                    function (a) {
                      f._handleBlur(a)
                    }
                  ),
                  this.$selection.on(
                    'keydown',
                    '.select2-search--inline',
                    function (a) {
                      if (
                        (a.stopPropagation(),
                        f.trigger('keypress', a),
                        (f._keyUpPrevented = a.isDefaultPrevented()),
                        a.which === c.BACKSPACE && '' === f.$search.val())
                      ) {
                        var d = f.$searchContainer.prev(
                          '.select2-selection__choice'
                        )
                        if (d.length > 0) {
                          var e = b.GetData(d[0], 'data')
                          f.searchRemoveChoice(e), a.preventDefault()
                        }
                      }
                    }
                  )
                var g = document.documentMode,
                  h = g && g <= 11
                this.$selection.on(
                  'input.searchcheck',
                  '.select2-search--inline',
                  function (a) {
                    if (h)
                      return void f.$selection.off(
                        'input.search input.searchcheck'
                      )
                    f.$selection.off('keyup.search')
                  }
                ),
                  this.$selection.on(
                    'keyup.search input.search',
                    '.select2-search--inline',
                    function (a) {
                      if (h && 'input' === a.type)
                        return void f.$selection.off(
                          'input.search input.searchcheck'
                        )
                      var b = a.which
                      b != c.SHIFT &&
                        b != c.CTRL &&
                        b != c.ALT &&
                        b != c.TAB &&
                        f.handleSearch(a)
                    }
                  )
              }),
              (d.prototype._transferTabIndex = function (a) {
                this.$search.attr('tabindex', this.$selection.attr('tabindex')),
                  this.$selection.attr('tabindex', '-1')
              }),
              (d.prototype.createPlaceholder = function (a, b) {
                this.$search.attr('placeholder', b.text)
              }),
              (d.prototype.update = function (a, b) {
                var c = this.$search[0] == document.activeElement
                if (
                  (this.$search.attr('placeholder', ''),
                  a.call(this, b),
                  this.$selection
                    .find('.select2-selection__rendered')
                    .append(this.$searchContainer),
                  this.resizeSearch(),
                  c)
                ) {
                  this.$element.find('[data-select2-tag]').length
                    ? this.$element.focus()
                    : this.$search.focus()
                }
              }),
              (d.prototype.handleSearch = function () {
                if ((this.resizeSearch(), !this._keyUpPrevented)) {
                  var a = this.$search.val()
                  this.trigger('query', { term: a })
                }
                this._keyUpPrevented = !1
              }),
              (d.prototype.searchRemoveChoice = function (a, b) {
                this.trigger('unselect', { data: b }),
                  this.$search.val(b.text),
                  this.handleSearch()
              }),
              (d.prototype.resizeSearch = function () {
                this.$search.css('width', '25px')
                var a = ''
                if ('' !== this.$search.attr('placeholder'))
                  a = this.$selection
                    .find('.select2-selection__rendered')
                    .innerWidth()
                else {
                  a = 0.75 * (this.$search.val().length + 1) + 'em'
                }
                this.$search.css('width', a)
              }),
              d
            )
          }
        ),
        b.define('select2/selection/eventRelay', ['jquery'], function (a) {
          function b() {}
          return (
            (b.prototype.bind = function (b, c, d) {
              var e = this,
                f = [
                  'open',
                  'opening',
                  'close',
                  'closing',
                  'select',
                  'selecting',
                  'unselect',
                  'unselecting',
                  'clear',
                  'clearing',
                ],
                g = [
                  'opening',
                  'closing',
                  'selecting',
                  'unselecting',
                  'clearing',
                ]
              b.call(this, c, d),
                c.on('*', function (b, c) {
                  if (-1 !== a.inArray(b, f)) {
                    c = c || {}
                    var d = a.Event('select2:' + b, { params: c })
                    e.$element.trigger(d),
                      -1 !== a.inArray(b, g) &&
                        (c.prevented = d.isDefaultPrevented())
                  }
                })
            }),
            b
          )
        }),
        b.define('select2/translation', ['jquery', 'require'], function (a, b) {
          function c(a) {
            this.dict = a || {}
          }
          return (
            (c.prototype.all = function () {
              return this.dict
            }),
            (c.prototype.get = function (a) {
              return this.dict[a]
            }),
            (c.prototype.extend = function (b) {
              this.dict = a.extend({}, b.all(), this.dict)
            }),
            (c._cache = {}),
            (c.loadPath = function (a) {
              if (!(a in c._cache)) {
                var d = b(a)
                c._cache[a] = d
              }
              return new c(c._cache[a])
            }),
            c
          )
        }),
        b.define('select2/diacritics', [], function () {
          return {
            'Ã¢â€™Â¶': 'A',
            'Ã¯Â¼Â¡': 'A',
            'Ãƒâ‚¬': 'A',
            'ÃƒÂ': 'A',
            'Ãƒâ€š': 'A',
            'Ã¡ÂºÂ¦': 'A',
            'Ã¡ÂºÂ¤': 'A',
            'Ã¡ÂºÂª': 'A',
            'Ã¡ÂºÂ¨': 'A',
            'ÃƒÆ’': 'A',
            'Ã„â‚¬': 'A',
            'Ã„â€š': 'A',
            'Ã¡ÂºÂ°': 'A',
            'Ã¡ÂºÂ®': 'A',
            'Ã¡ÂºÂ´': 'A',
            'Ã¡ÂºÂ²': 'A',
            'ÃˆÂ¦': 'A',
            'Ã‡ ': 'A',
            'Ãƒâ€ž': 'A',
            'Ã‡Å¾': 'A',
            'Ã¡ÂºÂ¢': 'A',
            'Ãƒâ€¦': 'A',
            'Ã‡Âº': 'A',
            'Ã‡Â': 'A',
            'Ãˆâ‚¬': 'A',
            'Ãˆâ€š': 'A',
            'Ã¡Âº ': 'A',
            'Ã¡ÂºÂ¬': 'A',
            'Ã¡ÂºÂ¶': 'A',
            'Ã¡Â¸â‚¬': 'A',
            'Ã„â€ž': 'A',
            ÃˆÂº: 'A',
            'Ã¢Â±Â¯': 'A',
            'ÃªÅ“Â²': 'AA',
            'Ãƒâ€ ': 'AE',
            'Ã‡Â¼': 'AE',
            'Ã‡Â¢': 'AE',
            'ÃªÅ“Â´': 'AO',
            'ÃªÅ“Â¶': 'AU',
            'ÃªÅ“Â¸': 'AV',
            'ÃªÅ“Âº': 'AV',
            'ÃªÅ“Â¼': 'AY',
            'Ã¢â€™Â·': 'B',
            'Ã¯Â¼Â¢': 'B',
            'Ã¡Â¸â€š': 'B',
            'Ã¡Â¸â€ž': 'B',
            'Ã¡Â¸â€ ': 'B',
            'Ã‰Æ’': 'B',
            'Ã†â€š': 'B',
            'Ã†Â': 'B',
            'Ã¢â€™Â¸': 'C',
            'Ã¯Â¼Â£': 'C',
            'Ã„â€ ': 'C',
            'Ã„Ë†': 'C',
            'Ã„Å ': 'C',
            'Ã„Å’': 'C',
            'Ãƒâ€¡': 'C',
            'Ã¡Â¸Ë†': 'C',
            'Ã†â€¡': 'C',
            'ÃˆÂ»': 'C',
            'ÃªÅ“Â¾': 'C',
            'Ã¢â€™Â¹': 'D',
            'Ã¯Â¼Â¤': 'D',
            'Ã¡Â¸Å ': 'D',
            'Ã„Å½': 'D',
            'Ã¡Â¸Å’': 'D',
            'Ã¡Â¸Â': 'D',
            'Ã¡Â¸â€™': 'D',
            'Ã¡Â¸Å½': 'D',
            'Ã„Â': 'D',
            'Ã†â€¹': 'D',
            'Ã†Å ': 'D',
            'Ã†â€°': 'D',
            'ÃªÂÂ¹': 'D',
            'Ã‡Â±': 'DZ',
            'Ã‡â€ž': 'DZ',
            'Ã‡Â²': 'Dz',
            'Ã‡â€¦': 'Dz',
            'Ã¢â€™Âº': 'E',
            'Ã¯Â¼Â¥': 'E',
            'ÃƒË†': 'E',
            'Ãƒâ€°': 'E',
            'ÃƒÅ ': 'E',
            'Ã¡Â»â‚¬': 'E',
            'Ã¡ÂºÂ¾': 'E',
            'Ã¡Â»â€ž': 'E',
            'Ã¡Â»â€š': 'E',
            'Ã¡ÂºÂ¼': 'E',
            'Ã„â€™': 'E',
            'Ã¡Â¸â€': 'E',
            'Ã¡Â¸â€“': 'E',
            'Ã„â€': 'E',
            'Ã„â€“': 'E',
            'Ãƒâ€¹': 'E',
            'Ã¡ÂºÂº': 'E',
            'Ã„Å¡': 'E',
            'Ãˆâ€ž': 'E',
            'Ãˆâ€ ': 'E',
            'Ã¡ÂºÂ¸': 'E',
            'Ã¡Â»â€ ': 'E',
            'ÃˆÂ¨': 'E',
            'Ã¡Â¸Å“': 'E',
            'Ã„Ëœ': 'E',
            'Ã¡Â¸Ëœ': 'E',
            'Ã¡Â¸Å¡': 'E',
            'Ã†Â': 'E',
            'Ã†Å½': 'E',
            'Ã¢â€™Â»': 'F',
            'Ã¯Â¼Â¦': 'F',
            'Ã¡Â¸Å¾': 'F',
            'Ã†â€˜': 'F',
            'ÃªÂÂ»': 'F',
            'Ã¢â€™Â¼': 'G',
            'Ã¯Â¼Â§': 'G',
            'Ã‡Â´': 'G',
            'Ã„Å“': 'G',
            'Ã¡Â¸ ': 'G',
            'Ã„Å¾': 'G',
            'Ã„ ': 'G',
            'Ã‡Â¦': 'G',
            'Ã„Â¢': 'G',
            'Ã‡Â¤': 'G',
            'Ã†â€œ': 'G',
            'ÃªÅ¾ ': 'G',
            'ÃªÂÂ½': 'G',
            'ÃªÂÂ¾': 'G',
            'Ã¢â€™Â½': 'H',
            'Ã¯Â¼Â¨': 'H',
            'Ã„Â¤': 'H',
            'Ã¡Â¸Â¢': 'H',
            'Ã¡Â¸Â¦': 'H',
            'ÃˆÅ¾': 'H',
            'Ã¡Â¸Â¤': 'H',
            'Ã¡Â¸Â¨': 'H',
            'Ã¡Â¸Âª': 'H',
            'Ã„Â¦': 'H',
            'Ã¢Â±Â§': 'H',
            'Ã¢Â±Âµ': 'H',
            'ÃªÅ¾Â': 'H',
            'Ã¢â€™Â¾': 'I',
            'Ã¯Â¼Â©': 'I',
            'ÃƒÅ’': 'I',
            'ÃƒÂ': 'I',
            'ÃƒÅ½': 'I',
            'Ã„Â¨': 'I',
            'Ã„Âª': 'I',
            'Ã„Â¬': 'I',
            'Ã„Â°': 'I',
            'ÃƒÂ': 'I',
            'Ã¡Â¸Â®': 'I',
            'Ã¡Â»Ë†': 'I',
            'Ã‡Â': 'I',
            'ÃˆË†': 'I',
            'ÃˆÅ ': 'I',
            'Ã¡Â»Å ': 'I',
            'Ã„Â®': 'I',
            'Ã¡Â¸Â¬': 'I',
            'Ã†â€”': 'I',
            'Ã¢â€™Â¿': 'J',
            'Ã¯Â¼Âª': 'J',
            'Ã„Â´': 'J',
            'Ã‰Ë†': 'J',
            'Ã¢â€œâ‚¬': 'K',
            'Ã¯Â¼Â«': 'K',
            'Ã¡Â¸Â°': 'K',
            'Ã‡Â¨': 'K',
            'Ã¡Â¸Â²': 'K',
            'Ã„Â¶': 'K',
            'Ã¡Â¸Â´': 'K',
            'Ã†Ëœ': 'K',
            'Ã¢Â±Â©': 'K',
            'ÃªÂâ‚¬': 'K',
            'ÃªÂâ€š': 'K',
            'ÃªÂâ€ž': 'K',
            'ÃªÅ¾Â¢': 'K',
            'Ã¢â€œÂ': 'L',
            'Ã¯Â¼Â¬': 'L',
            'Ã„Â¿': 'L',
            'Ã„Â¹': 'L',
            'Ã„Â½': 'L',
            'Ã¡Â¸Â¶': 'L',
            'Ã¡Â¸Â¸': 'L',
            'Ã„Â»': 'L',
            'Ã¡Â¸Â¼': 'L',
            'Ã¡Â¸Âº': 'L',
            'Ã…Â': 'L',
            'ÃˆÂ½': 'L',
            'Ã¢Â±Â¢': 'L',
            'Ã¢Â± ': 'L',
            'ÃªÂË†': 'L',
            'ÃªÂâ€ ': 'L',
            'ÃªÅ¾â‚¬': 'L',
            'Ã‡â€¡': 'LJ',
            'Ã‡Ë†': 'Lj',
            'Ã¢â€œâ€š': 'M',
            'Ã¯Â¼Â­': 'M',
            'Ã¡Â¸Â¾': 'M',
            'Ã¡Â¹â‚¬': 'M',
            'Ã¡Â¹â€š': 'M',
            'Ã¢Â±Â®': 'M',
            'Ã†Å“': 'M',
            'Ã¢â€œÆ’': 'N',
            'Ã¯Â¼Â®': 'N',
            'Ã‡Â¸': 'N',
            'Ã…Æ’': 'N',
            'Ãƒâ€˜': 'N',
            'Ã¡Â¹â€ž': 'N',
            'Ã…â€¡': 'N',
            'Ã¡Â¹â€ ': 'N',
            'Ã…â€¦': 'N',
            'Ã¡Â¹Å ': 'N',
            'Ã¡Â¹Ë†': 'N',
            'Ãˆ ': 'N',
            'Ã†Â': 'N',
            'ÃªÅ¾Â': 'N',
            'ÃªÅ¾Â¤': 'N',
            'Ã‡Å ': 'NJ',
            'Ã‡â€¹': 'Nj',
            'Ã¢â€œâ€ž': 'O',
            'Ã¯Â¼Â¯': 'O',
            'Ãƒâ€™': 'O',
            'Ãƒâ€œ': 'O',
            'Ãƒâ€': 'O',
            'Ã¡Â»â€™': 'O',
            'Ã¡Â»Â': 'O',
            'Ã¡Â»â€“': 'O',
            'Ã¡Â»â€': 'O',
            'Ãƒâ€¢': 'O',
            'Ã¡Â¹Å’': 'O',
            'ÃˆÂ¬': 'O',
            'Ã¡Â¹Å½': 'O',
            'Ã…Å’': 'O',
            'Ã¡Â¹Â': 'O',
            'Ã¡Â¹â€™': 'O',
            'Ã…Å½': 'O',
            'ÃˆÂ®': 'O',
            'ÃˆÂ°': 'O',
            'Ãƒâ€“': 'O',
            ÃˆÂª: 'O',
            'Ã¡Â»Å½': 'O',
            'Ã…Â': 'O',
            'Ã‡â€˜': 'O',
            'ÃˆÅ’': 'O',
            'ÃˆÅ½': 'O',
            'Ã† ': 'O',
            'Ã¡Â»Å“': 'O',
            'Ã¡Â»Å¡': 'O',
            'Ã¡Â» ': 'O',
            'Ã¡Â»Å¾': 'O',
            'Ã¡Â»Â¢': 'O',
            'Ã¡Â»Å’': 'O',
            'Ã¡Â»Ëœ': 'O',
            'Ã‡Âª': 'O',
            'Ã‡Â¬': 'O',
            ÃƒËœ: 'O',
            'Ã‡Â¾': 'O',
            'Ã†â€ ': 'O',
            'Ã†Å¸': 'O',
            'ÃªÂÅ ': 'O',
            'ÃªÂÅ’': 'O',
            'Ã†Â¢': 'OI',
            'ÃªÂÅ½': 'OO',
            'ÃˆÂ¢': 'OU',
            'Ã¢â€œâ€¦': 'P',
            'Ã¯Â¼Â°': 'P',
            'Ã¡Â¹â€': 'P',
            'Ã¡Â¹â€“': 'P',
            'Ã†Â¤': 'P',
            'Ã¢Â±Â£': 'P',
            'ÃªÂÂ': 'P',
            'ÃªÂâ€™': 'P',
            'ÃªÂâ€': 'P',
            'Ã¢â€œâ€ ': 'Q',
            'Ã¯Â¼Â±': 'Q',
            'ÃªÂâ€“': 'Q',
            'ÃªÂËœ': 'Q',
            'Ã‰Å ': 'Q',
            'Ã¢â€œâ€¡': 'R',
            'Ã¯Â¼Â²': 'R',
            'Ã…â€': 'R',
            'Ã¡Â¹Ëœ': 'R',
            'Ã…Ëœ': 'R',
            'ÃˆÂ': 'R',
            'Ãˆâ€™': 'R',
            'Ã¡Â¹Å¡': 'R',
            'Ã¡Â¹Å“': 'R',
            'Ã…â€“': 'R',
            'Ã¡Â¹Å¾': 'R',
            'Ã‰Å’': 'R',
            'Ã¢Â±Â¤': 'R',
            'ÃªÂÅ¡': 'R',
            'ÃªÅ¾Â¦': 'R',
            'ÃªÅ¾â€š': 'R',
            'Ã¢â€œË†': 'S',
            'Ã¯Â¼Â³': 'S',
            'Ã¡ÂºÅ¾': 'S',
            'Ã…Å¡': 'S',
            'Ã¡Â¹Â¤': 'S',
            'Ã…Å“': 'S',
            'Ã¡Â¹ ': 'S',
            'Ã… ': 'S',
            'Ã¡Â¹Â¦': 'S',
            'Ã¡Â¹Â¢': 'S',
            'Ã¡Â¹Â¨': 'S',
            ÃˆËœ: 'S',
            'Ã…Å¾': 'S',
            'Ã¢Â±Â¾': 'S',
            'ÃªÅ¾Â¨': 'S',
            'ÃªÅ¾â€ž': 'S',
            'Ã¢â€œâ€°': 'T',
            'Ã¯Â¼Â´': 'T',
            'Ã¡Â¹Âª': 'T',
            'Ã…Â¤': 'T',
            'Ã¡Â¹Â¬': 'T',
            'ÃˆÅ¡': 'T',
            'Ã…Â¢': 'T',
            'Ã¡Â¹Â°': 'T',
            'Ã¡Â¹Â®': 'T',
            'Ã…Â¦': 'T',
            'Ã†Â¬': 'T',
            'Ã†Â®': 'T',
            'ÃˆÂ¾': 'T',
            'ÃªÅ¾â€ ': 'T',
            'ÃªÅ“Â¨': 'TZ',
            'Ã¢â€œÅ ': 'U',
            'Ã¯Â¼Âµ': 'U',
            'Ãƒâ„¢': 'U',
            'ÃƒÅ¡': 'U',
            'Ãƒâ€º': 'U',
            'Ã…Â¨': 'U',
            'Ã¡Â¹Â¸': 'U',
            'Ã…Âª': 'U',
            'Ã¡Â¹Âº': 'U',
            'Ã…Â¬': 'U',
            'ÃƒÅ“': 'U',
            'Ã‡â€º': 'U',
            'Ã‡â€”': 'U',
            'Ã‡â€¢': 'U',
            'Ã‡â„¢': 'U',
            'Ã¡Â»Â¦': 'U',
            'Ã…Â®': 'U',
            'Ã…Â°': 'U',
            'Ã‡â€œ': 'U',
            'Ãˆâ€': 'U',
            'Ãˆâ€“': 'U',
            'Ã†Â¯': 'U',
            'Ã¡Â»Âª': 'U',
            'Ã¡Â»Â¨': 'U',
            'Ã¡Â»Â®': 'U',
            'Ã¡Â»Â¬': 'U',
            'Ã¡Â»Â°': 'U',
            'Ã¡Â»Â¤': 'U',
            'Ã¡Â¹Â²': 'U',
            'Ã…Â²': 'U',
            'Ã¡Â¹Â¶': 'U',
            'Ã¡Â¹Â´': 'U',
            'Ã‰â€ž': 'U',
            'Ã¢â€œâ€¹': 'V',
            'Ã¯Â¼Â¶': 'V',
            'Ã¡Â¹Â¼': 'V',
            'Ã¡Â¹Â¾': 'V',
            'Ã†Â²': 'V',
            'ÃªÂÅ¾': 'V',
            'Ã‰â€¦': 'V',
            'ÃªÂ ': 'VY',
            'Ã¢â€œÅ’': 'W',
            'Ã¯Â¼Â·': 'W',
            'Ã¡Âºâ‚¬': 'W',
            'Ã¡Âºâ€š': 'W',
            'Ã…Â´': 'W',
            'Ã¡Âºâ€ ': 'W',
            'Ã¡Âºâ€ž': 'W',
            'Ã¡ÂºË†': 'W',
            'Ã¢Â±Â²': 'W',
            'Ã¢â€œÂ': 'X',
            'Ã¯Â¼Â¸': 'X',
            'Ã¡ÂºÅ ': 'X',
            'Ã¡ÂºÅ’': 'X',
            'Ã¢â€œÅ½': 'Y',
            'Ã¯Â¼Â¹': 'Y',
            'Ã¡Â»Â²': 'Y',
            'ÃƒÂ': 'Y',
            'Ã…Â¶': 'Y',
            'Ã¡Â»Â¸': 'Y',
            'ÃˆÂ²': 'Y',
            'Ã¡ÂºÅ½': 'Y',
            'Ã…Â¸': 'Y',
            'Ã¡Â»Â¶': 'Y',
            'Ã¡Â»Â´': 'Y',
            'Ã†Â³': 'Y',
            'Ã‰Å½': 'Y',
            'Ã¡Â»Â¾': 'Y',
            'Ã¢â€œÂ': 'Z',
            'Ã¯Â¼Âº': 'Z',
            'Ã…Â¹': 'Z',
            'Ã¡ÂºÂ': 'Z',
            'Ã…Â»': 'Z',
            'Ã…Â½': 'Z',
            'Ã¡Âºâ€™': 'Z',
            'Ã¡Âºâ€': 'Z',
            'Ã†Âµ': 'Z',
            'ÃˆÂ¤': 'Z',
            'Ã¢Â±Â¿': 'Z',
            'Ã¢Â±Â«': 'Z',
            'ÃªÂÂ¢': 'Z',
            'Ã¢â€œÂ': 'a',
            'Ã¯Â½Â': 'a',
            'Ã¡ÂºÅ¡': 'a',
            'Ãƒ ': 'a',
            'ÃƒÂ¡': 'a',
            'ÃƒÂ¢': 'a',
            'Ã¡ÂºÂ§': 'a',
            'Ã¡ÂºÂ¥': 'a',
            'Ã¡ÂºÂ«': 'a',
            'Ã¡ÂºÂ©': 'a',
            'ÃƒÂ£': 'a',
            'Ã„Â': 'a',
            'Ã„Æ’': 'a',
            'Ã¡ÂºÂ±': 'a',
            'Ã¡ÂºÂ¯': 'a',
            'Ã¡ÂºÂµ': 'a',
            'Ã¡ÂºÂ³': 'a',
            'ÃˆÂ§': 'a',
            'Ã‡Â¡': 'a',
            'ÃƒÂ¤': 'a',
            'Ã‡Å¸': 'a',
            'Ã¡ÂºÂ£': 'a',
            'ÃƒÂ¥': 'a',
            'Ã‡Â»': 'a',
            'Ã‡Å½': 'a',
            'ÃˆÂ': 'a',
            'ÃˆÆ’': 'a',
            'Ã¡ÂºÂ¡': 'a',
            'Ã¡ÂºÂ­': 'a',
            'Ã¡ÂºÂ·': 'a',
            'Ã¡Â¸Â': 'a',
            'Ã„â€¦': 'a',
            'Ã¢Â±Â¥': 'a',
            'Ã‰Â': 'a',
            'ÃªÅ“Â³': 'aa',
            'ÃƒÂ¦': 'ae',
            'Ã‡Â½': 'ae',
            'Ã‡Â£': 'ae',
            'ÃªÅ“Âµ': 'ao',
            'ÃªÅ“Â·': 'au',
            'ÃªÅ“Â¹': 'av',
            'ÃªÅ“Â»': 'av',
            'ÃªÅ“Â½': 'ay',
            'Ã¢â€œâ€˜': 'b',
            'Ã¯Â½â€š': 'b',
            'Ã¡Â¸Æ’': 'b',
            'Ã¡Â¸â€¦': 'b',
            'Ã¡Â¸â€¡': 'b',
            'Ã†â‚¬': 'b',
            'Ã†Æ’': 'b',
            'Ã‰â€œ': 'b',
            'Ã¢â€œâ€™': 'c',
            'Ã¯Â½Æ’': 'c',
            'Ã„â€¡': 'c',
            'Ã„â€°': 'c',
            'Ã„â€¹': 'c',
            'Ã„Â': 'c',
            'ÃƒÂ§': 'c',
            'Ã¡Â¸â€°': 'c',
            'Ã†Ë†': 'c',
            'ÃˆÂ¼': 'c',
            'ÃªÅ“Â¿': 'c',
            'Ã¢â€ â€ž': 'c',
            'Ã¢â€œâ€œ': 'd',
            'Ã¯Â½â€ž': 'd',
            'Ã¡Â¸â€¹': 'd',
            'Ã„Â': 'd',
            'Ã¡Â¸Â': 'd',
            'Ã¡Â¸â€˜': 'd',
            'Ã¡Â¸â€œ': 'd',
            'Ã¡Â¸Â': 'd',
            'Ã„â€˜': 'd',
            'Ã†Å’': 'd',
            'Ã‰â€“': 'd',
            'Ã‰â€”': 'd',
            'ÃªÂÂº': 'd',
            'Ã‡Â³': 'dz',
            'Ã‡â€ ': 'dz',
            'Ã¢â€œâ€': 'e',
            'Ã¯Â½â€¦': 'e',
            'ÃƒÂ¨': 'e',
            'ÃƒÂ©': 'e',
            ÃƒÂª: 'e',
            'Ã¡Â»Â': 'e',
            'Ã¡ÂºÂ¿': 'e',
            'Ã¡Â»â€¦': 'e',
            'Ã¡Â»Æ’': 'e',
            'Ã¡ÂºÂ½': 'e',
            'Ã„â€œ': 'e',
            'Ã¡Â¸â€¢': 'e',
            'Ã¡Â¸â€”': 'e',
            'Ã„â€¢': 'e',
            'Ã„â€”': 'e',
            'ÃƒÂ«': 'e',
            'Ã¡ÂºÂ»': 'e',
            'Ã„â€º': 'e',
            'Ãˆâ€¦': 'e',
            'Ãˆâ€¡': 'e',
            'Ã¡ÂºÂ¹': 'e',
            'Ã¡Â»â€¡': 'e',
            'ÃˆÂ©': 'e',
            'Ã¡Â¸Â': 'e',
            'Ã„â„¢': 'e',
            'Ã¡Â¸â„¢': 'e',
            'Ã¡Â¸â€º': 'e',
            'Ã‰â€¡': 'e',
            'Ã‰â€º': 'e',
            'Ã‡Â': 'e',
            'Ã¢â€œâ€¢': 'f',
            'Ã¯Â½â€ ': 'f',
            'Ã¡Â¸Å¸': 'f',
            'Ã†â€™': 'f',
            'ÃªÂÂ¼': 'f',
            'Ã¢â€œâ€“': 'g',
            'Ã¯Â½â€¡': 'g',
            'Ã‡Âµ': 'g',
            'Ã„Â': 'g',
            'Ã¡Â¸Â¡': 'g',
            'Ã„Å¸': 'g',
            'Ã„Â¡': 'g',
            'Ã‡Â§': 'g',
            'Ã„Â£': 'g',
            'Ã‡Â¥': 'g',
            'Ã‰ ': 'g',
            'ÃªÅ¾Â¡': 'g',
            'Ã¡ÂµÂ¹': 'g',
            'ÃªÂÂ¿': 'g',
            'Ã¢â€œâ€”': 'h',
            'Ã¯Â½Ë†': 'h',
            'Ã„Â¥': 'h',
            'Ã¡Â¸Â£': 'h',
            'Ã¡Â¸Â§': 'h',
            'ÃˆÅ¸': 'h',
            'Ã¡Â¸Â¥': 'h',
            'Ã¡Â¸Â©': 'h',
            'Ã¡Â¸Â«': 'h',
            'Ã¡Âºâ€“': 'h',
            'Ã„Â§': 'h',
            'Ã¢Â±Â¨': 'h',
            'Ã¢Â±Â¶': 'h',
            'Ã‰Â¥': 'h',
            'Ã†â€¢': 'hv',
            'Ã¢â€œËœ': 'i',
            'Ã¯Â½â€°': 'i',
            'ÃƒÂ¬': 'i',
            'ÃƒÂ­': 'i',
            'ÃƒÂ®': 'i',
            'Ã„Â©': 'i',
            'Ã„Â«': 'i',
            'Ã„Â­': 'i',
            'ÃƒÂ¯': 'i',
            'Ã¡Â¸Â¯': 'i',
            'Ã¡Â»â€°': 'i',
            'Ã‡Â': 'i',
            'Ãˆâ€°': 'i',
            'Ãˆâ€¹': 'i',
            'Ã¡Â»â€¹': 'i',
            'Ã„Â¯': 'i',
            'Ã¡Â¸Â­': 'i',
            'Ã‰Â¨': 'i',
            'Ã„Â±': 'i',
            'Ã¢â€œâ„¢': 'j',
            'Ã¯Â½Å ': 'j',
            'Ã„Âµ': 'j',
            'Ã‡Â°': 'j',
            'Ã‰â€°': 'j',
            'Ã¢â€œÅ¡': 'k',
            'Ã¯Â½â€¹': 'k',
            'Ã¡Â¸Â±': 'k',
            'Ã‡Â©': 'k',
            'Ã¡Â¸Â³': 'k',
            'Ã„Â·': 'k',
            'Ã¡Â¸Âµ': 'k',
            'Ã†â„¢': 'k',
            'Ã¢Â±Âª': 'k',
            'ÃªÂÂ': 'k',
            'ÃªÂÆ’': 'k',
            'ÃªÂâ€¦': 'k',
            'ÃªÅ¾Â£': 'k',
            'Ã¢â€œâ€º': 'l',
            'Ã¯Â½Å’': 'l',
            'Ã…â‚¬': 'l',
            'Ã„Âº': 'l',
            'Ã„Â¾': 'l',
            'Ã¡Â¸Â·': 'l',
            'Ã¡Â¸Â¹': 'l',
            'Ã„Â¼': 'l',
            'Ã¡Â¸Â½': 'l',
            'Ã¡Â¸Â»': 'l',
            'Ã…Â¿': 'l',
            'Ã…â€š': 'l',
            'Ã†Å¡': 'l',
            'Ã‰Â«': 'l',
            'Ã¢Â±Â¡': 'l',
            'ÃªÂâ€°': 'l',
            'ÃªÅ¾Â': 'l',
            'ÃªÂâ€¡': 'l',
            'Ã‡â€°': 'lj',
            'Ã¢â€œÅ“': 'm',
            'Ã¯Â½Â': 'm',
            'Ã¡Â¸Â¿': 'm',
            'Ã¡Â¹Â': 'm',
            'Ã¡Â¹Æ’': 'm',
            'Ã‰Â±': 'm',
            'Ã‰Â¯': 'm',
            'Ã¢â€œÂ': 'n',
            'Ã¯Â½Å½': 'n',
            'Ã‡Â¹': 'n',
            'Ã…â€ž': 'n',
            'ÃƒÂ±': 'n',
            'Ã¡Â¹â€¦': 'n',
            'Ã…Ë†': 'n',
            'Ã¡Â¹â€¡': 'n',
            'Ã…â€ ': 'n',
            'Ã¡Â¹â€¹': 'n',
            'Ã¡Â¹â€°': 'n',
            'Ã†Å¾': 'n',
            'Ã‰Â²': 'n',
            'Ã…â€°': 'n',
            'ÃªÅ¾â€˜': 'n',
            'ÃªÅ¾Â¥': 'n',
            'Ã‡Å’': 'nj',
            'Ã¢â€œÅ¾': 'o',
            'Ã¯Â½Â': 'o',
            'ÃƒÂ²': 'o',
            'ÃƒÂ³': 'o',
            'ÃƒÂ´': 'o',
            'Ã¡Â»â€œ': 'o',
            'Ã¡Â»â€˜': 'o',
            'Ã¡Â»â€”': 'o',
            'Ã¡Â»â€¢': 'o',
            ÃƒÂµ: 'o',
            'Ã¡Â¹Â': 'o',
            'ÃˆÂ­': 'o',
            'Ã¡Â¹Â': 'o',
            'Ã…Â': 'o',
            'Ã¡Â¹â€˜': 'o',
            'Ã¡Â¹â€œ': 'o',
            'Ã…Â': 'o',
            'ÃˆÂ¯': 'o',
            'ÃˆÂ±': 'o',
            'ÃƒÂ¶': 'o',
            'ÃˆÂ«': 'o',
            'Ã¡Â»Â': 'o',
            'Ã…â€˜': 'o',
            'Ã‡â€™': 'o',
            'ÃˆÂ': 'o',
            'ÃˆÂ': 'o',
            'Ã†Â¡': 'o',
            'Ã¡Â»Â': 'o',
            'Ã¡Â»â€º': 'o',
            'Ã¡Â»Â¡': 'o',
            'Ã¡Â»Å¸': 'o',
            'Ã¡Â»Â£': 'o',
            'Ã¡Â»Â': 'o',
            'Ã¡Â»â„¢': 'o',
            'Ã‡Â«': 'o',
            'Ã‡Â­': 'o',
            'ÃƒÂ¸': 'o',
            'Ã‡Â¿': 'o',
            'Ã‰â€': 'o',
            'ÃªÂâ€¹': 'o',
            'ÃªÂÂ': 'o',
            'Ã‰Âµ': 'o',
            'Ã†Â£': 'oi',
            'ÃˆÂ£': 'ou',
            'ÃªÂÂ': 'oo',
            'Ã¢â€œÅ¸': 'p',
            'Ã¯Â½Â': 'p',
            'Ã¡Â¹â€¢': 'p',
            'Ã¡Â¹â€”': 'p',
            'Ã†Â¥': 'p',
            'Ã¡ÂµÂ½': 'p',
            'ÃªÂâ€˜': 'p',
            'ÃªÂâ€œ': 'p',
            'ÃªÂâ€¢': 'p',
            'Ã¢â€œ ': 'q',
            'Ã¯Â½â€˜': 'q',
            'Ã‰â€¹': 'q',
            'ÃªÂâ€”': 'q',
            'ÃªÂâ„¢': 'q',
            'Ã¢â€œÂ¡': 'r',
            'Ã¯Â½â€™': 'r',
            'Ã…â€¢': 'r',
            'Ã¡Â¹â„¢': 'r',
            'Ã…â„¢': 'r',
            'Ãˆâ€˜': 'r',
            'Ãˆâ€œ': 'r',
            'Ã¡Â¹â€º': 'r',
            'Ã¡Â¹Â': 'r',
            'Ã…â€”': 'r',
            'Ã¡Â¹Å¸': 'r',
            'Ã‰Â': 'r',
            'Ã‰Â½': 'r',
            'ÃªÂâ€º': 'r',
            'ÃªÅ¾Â§': 'r',
            'ÃªÅ¾Æ’': 'r',
            'Ã¢â€œÂ¢': 's',
            'Ã¯Â½â€œ': 's',
            'ÃƒÅ¸': 's',
            'Ã…â€º': 's',
            'Ã¡Â¹Â¥': 's',
            'Ã…Â': 's',
            'Ã¡Â¹Â¡': 's',
            'Ã…Â¡': 's',
            'Ã¡Â¹Â§': 's',
            'Ã¡Â¹Â£': 's',
            'Ã¡Â¹Â©': 's',
            'Ãˆâ„¢': 's',
            'Ã…Å¸': 's',
            'ÃˆÂ¿': 's',
            'ÃªÅ¾Â©': 's',
            'ÃªÅ¾â€¦': 's',
            'Ã¡Âºâ€º': 's',
            'Ã¢â€œÂ£': 't',
            'Ã¯Â½â€': 't',
            'Ã¡Â¹Â«': 't',
            'Ã¡Âºâ€”': 't',
            'Ã…Â¥': 't',
            'Ã¡Â¹Â­': 't',
            'Ãˆâ€º': 't',
            'Ã…Â£': 't',
            'Ã¡Â¹Â±': 't',
            'Ã¡Â¹Â¯': 't',
            'Ã…Â§': 't',
            'Ã†Â­': 't',
            'ÃŠË†': 't',
            'Ã¢Â±Â¦': 't',
            'ÃªÅ¾â€¡': 't',
            'ÃªÅ“Â©': 'tz',
            'Ã¢â€œÂ¤': 'u',
            'Ã¯Â½â€¢': 'u',
            'ÃƒÂ¹': 'u',
            ÃƒÂº: 'u',
            'ÃƒÂ»': 'u',
            'Ã…Â©': 'u',
            'Ã¡Â¹Â¹': 'u',
            'Ã…Â«': 'u',
            'Ã¡Â¹Â»': 'u',
            'Ã…Â­': 'u',
            'ÃƒÂ¼': 'u',
            'Ã‡Å“': 'u',
            'Ã‡Ëœ': 'u',
            'Ã‡â€“': 'u',
            'Ã‡Å¡': 'u',
            'Ã¡Â»Â§': 'u',
            'Ã…Â¯': 'u',
            'Ã…Â±': 'u',
            'Ã‡â€': 'u',
            'Ãˆâ€¢': 'u',
            'Ãˆâ€”': 'u',
            'Ã†Â°': 'u',
            'Ã¡Â»Â«': 'u',
            'Ã¡Â»Â©': 'u',
            'Ã¡Â»Â¯': 'u',
            'Ã¡Â»Â­': 'u',
            'Ã¡Â»Â±': 'u',
            'Ã¡Â»Â¥': 'u',
            'Ã¡Â¹Â³': 'u',
            'Ã…Â³': 'u',
            'Ã¡Â¹Â·': 'u',
            'Ã¡Â¹Âµ': 'u',
            'ÃŠâ€°': 'u',
            'Ã¢â€œÂ¥': 'v',
            'Ã¯Â½â€“': 'v',
            'Ã¡Â¹Â½': 'v',
            'Ã¡Â¹Â¿': 'v',
            'ÃŠâ€¹': 'v',
            'ÃªÂÅ¸': 'v',
            'ÃŠÅ’': 'v',
            'ÃªÂÂ¡': 'vy',
            'Ã¢â€œÂ¦': 'w',
            'Ã¯Â½â€”': 'w',
            'Ã¡ÂºÂ': 'w',
            'Ã¡ÂºÆ’': 'w',
            'Ã…Âµ': 'w',
            'Ã¡Âºâ€¡': 'w',
            'Ã¡Âºâ€¦': 'w',
            'Ã¡ÂºËœ': 'w',
            'Ã¡Âºâ€°': 'w',
            'Ã¢Â±Â³': 'w',
            'Ã¢â€œÂ§': 'x',
            'Ã¯Â½Ëœ': 'x',
            'Ã¡Âºâ€¹': 'x',
            'Ã¡ÂºÂ': 'x',
            'Ã¢â€œÂ¨': 'y',
            'Ã¯Â½â„¢': 'y',
            'Ã¡Â»Â³': 'y',
            'ÃƒÂ½': 'y',
            'Ã…Â·': 'y',
            'Ã¡Â»Â¹': 'y',
            'ÃˆÂ³': 'y',
            'Ã¡ÂºÂ': 'y',
            'ÃƒÂ¿': 'y',
            'Ã¡Â»Â·': 'y',
            'Ã¡Âºâ„¢': 'y',
            'Ã¡Â»Âµ': 'y',
            'Ã†Â´': 'y',
            'Ã‰Â': 'y',
            'Ã¡Â»Â¿': 'y',
            'Ã¢â€œÂ©': 'z',
            'Ã¯Â½Å¡': 'z',
            'Ã…Âº': 'z',
            'Ã¡Âºâ€˜': 'z',
            'Ã…Â¼': 'z',
            'Ã…Â¾': 'z',
            'Ã¡Âºâ€œ': 'z',
            'Ã¡Âºâ€¢': 'z',
            'Ã†Â¶': 'z',
            'ÃˆÂ¥': 'z',
            'Ã‰â‚¬': 'z',
            'Ã¢Â±Â¬': 'z',
            'ÃªÂÂ£': 'z',
            'ÃŽâ€ ': 'ÃŽâ€˜',
            'ÃŽË†': 'ÃŽâ€¢',
            'ÃŽâ€°': 'ÃŽâ€”',
            'ÃŽÅ ': 'ÃŽâ„¢',
            ÃŽÂª: 'ÃŽâ„¢',
            'ÃŽÅ’': 'ÃŽÅ¸',
            'ÃŽÅ½': 'ÃŽÂ¥',
            'ÃŽÂ«': 'ÃŽÂ¥',
            'ÃŽÂ': 'ÃŽÂ©',
            'ÃŽÂ¬': 'ÃŽÂ±',
            'ÃŽÂ­': 'ÃŽÂµ',
            'ÃŽÂ®': 'ÃŽÂ·',
            'ÃŽÂ¯': 'ÃŽÂ¹',
            'ÃÅ ': 'ÃŽÂ¹',
            'ÃŽÂ': 'ÃŽÂ¹',
            'ÃÅ’': 'ÃŽÂ¿',
            'ÃÂ': 'Ãâ€¦',
            'Ãâ€¹': 'Ãâ€¦',
            'ÃŽÂ°': 'Ãâ€¦',
            'Ãâ€°': 'Ãâ€°',
            'Ãâ€š': 'ÃÆ’',
          }
        }),
        b.define('select2/data/base', ['../utils'], function (a) {
          function b(a, c) {
            b.__super__.constructor.call(this)
          }
          return (
            a.Extend(b, a.Observable),
            (b.prototype.current = function (a) {
              throw new Error(
                'The `current` method must be defined in child classes.'
              )
            }),
            (b.prototype.query = function (a, b) {
              throw new Error(
                'The `query` method must be defined in child classes.'
              )
            }),
            (b.prototype.bind = function (a, b) {}),
            (b.prototype.destroy = function () {}),
            (b.prototype.generateResultId = function (b, c) {
              var d = b.id + '-result-'
              return (
                (d += a.generateChars(4)),
                null != c.id
                  ? (d += '-' + c.id.toString())
                  : (d += '-' + a.generateChars(4)),
                d
              )
            }),
            b
          )
        }),
        b.define(
          'select2/data/select',
          ['./base', '../utils', 'jquery'],
          function (a, b, c) {
            function d(a, b) {
              ;(this.$element = a),
                (this.options = b),
                d.__super__.constructor.call(this)
            }
            return (
              b.Extend(d, a),
              (d.prototype.current = function (a) {
                var b = [],
                  d = this
                this.$element.find(':selected').each(function () {
                  var a = c(this),
                    e = d.item(a)
                  b.push(e)
                }),
                  a(b)
              }),
              (d.prototype.select = function (a) {
                var b = this
                if (((a.selected = !0), c(a.element).is('option')))
                  return (
                    (a.element.selected = !0),
                    void this.$element.trigger('change')
                  )
                if (this.$element.prop('multiple'))
                  this.current(function (d) {
                    var e = []
                    ;(a = [a]), a.push.apply(a, d)
                    for (var f = 0; f < a.length; f++) {
                      var g = a[f].id
                      ;-1 === c.inArray(g, e) && e.push(g)
                    }
                    b.$element.val(e), b.$element.trigger('change')
                  })
                else {
                  var d = a.id
                  this.$element.val(d), this.$element.trigger('change')
                }
              }),
              (d.prototype.unselect = function (a) {
                var b = this
                if (this.$element.prop('multiple')) {
                  if (((a.selected = !1), c(a.element).is('option')))
                    return (
                      (a.element.selected = !1),
                      void this.$element.trigger('change')
                    )
                  this.current(function (d) {
                    for (var e = [], f = 0; f < d.length; f++) {
                      var g = d[f].id
                      g !== a.id && -1 === c.inArray(g, e) && e.push(g)
                    }
                    b.$element.val(e), b.$element.trigger('change')
                  })
                }
              }),
              (d.prototype.bind = function (a, b) {
                var c = this
                ;(this.container = a),
                  a.on('select', function (a) {
                    c.select(a.data)
                  }),
                  a.on('unselect', function (a) {
                    c.unselect(a.data)
                  })
              }),
              (d.prototype.destroy = function () {
                this.$element.find('*').each(function () {
                  b.RemoveData(this)
                })
              }),
              (d.prototype.query = function (a, b) {
                var d = [],
                  e = this
                this.$element.children().each(function () {
                  var b = c(this)
                  if (b.is('option') || b.is('optgroup')) {
                    var f = e.item(b),
                      g = e.matches(a, f)
                    null !== g && d.push(g)
                  }
                }),
                  b({ results: d })
              }),
              (d.prototype.addOptions = function (a) {
                b.appendMany(this.$element, a)
              }),
              (d.prototype.option = function (a) {
                var d
                a.children
                  ? ((d = document.createElement('optgroup')),
                    (d.label = a.text))
                  : ((d = document.createElement('option')),
                    void 0 !== d.textContent
                      ? (d.textContent = a.text)
                      : (d.innerText = a.text)),
                  void 0 !== a.id && (d.value = a.id),
                  a.disabled && (d.disabled = !0),
                  a.selected && (d.selected = !0),
                  a.title && (d.title = a.title)
                var e = c(d),
                  f = this._normalizeItem(a)
                return (f.element = d), b.StoreData(d, 'data', f), e
              }),
              (d.prototype.item = function (a) {
                var d = {}
                if (null != (d = b.GetData(a[0], 'data'))) return d
                if (a.is('option'))
                  d = {
                    id: a.val(),
                    text: a.text(),
                    disabled: a.prop('disabled'),
                    selected: a.prop('selected'),
                    title: a.prop('title'),
                  }
                else if (a.is('optgroup')) {
                  d = {
                    text: a.prop('label'),
                    children: [],
                    title: a.prop('title'),
                  }
                  for (
                    var e = a.children('option'), f = [], g = 0;
                    g < e.length;
                    g++
                  ) {
                    var h = c(e[g]),
                      i = this.item(h)
                    f.push(i)
                  }
                  d.children = f
                }
                return (
                  (d = this._normalizeItem(d)),
                  (d.element = a[0]),
                  b.StoreData(a[0], 'data', d),
                  d
                )
              }),
              (d.prototype._normalizeItem = function (a) {
                a !== Object(a) && (a = { id: a, text: a }),
                  (a = c.extend({}, { text: '' }, a))
                var b = { selected: !1, disabled: !1 }
                return (
                  null != a.id && (a.id = a.id.toString()),
                  null != a.text && (a.text = a.text.toString()),
                  null == a._resultId &&
                    a.id &&
                    null != this.container &&
                    (a._resultId = this.generateResultId(this.container, a)),
                  c.extend({}, b, a)
                )
              }),
              (d.prototype.matches = function (a, b) {
                return this.options.get('matcher')(a, b)
              }),
              d
            )
          }
        ),
        b.define(
          'select2/data/array',
          ['./select', '../utils', 'jquery'],
          function (a, b, c) {
            function d(a, b) {
              var c = b.get('data') || []
              d.__super__.constructor.call(this, a, b),
                this.addOptions(this.convertToOptions(c))
            }
            return (
              b.Extend(d, a),
              (d.prototype.select = function (a) {
                var b = this.$element.find('option').filter(function (b, c) {
                  return c.value == a.id.toString()
                })
                0 === b.length && ((b = this.option(a)), this.addOptions(b)),
                  d.__super__.select.call(this, a)
              }),
              (d.prototype.convertToOptions = function (a) {
                function d(a) {
                  return function () {
                    return c(this).val() == a.id
                  }
                }
                for (
                  var e = this,
                    f = this.$element.find('option'),
                    g = f
                      .map(function () {
                        return e.item(c(this)).id
                      })
                      .get(),
                    h = [],
                    i = 0;
                  i < a.length;
                  i++
                ) {
                  var j = this._normalizeItem(a[i])
                  if (c.inArray(j.id, g) >= 0) {
                    var k = f.filter(d(j)),
                      l = this.item(k),
                      m = c.extend(!0, {}, j, l),
                      n = this.option(m)
                    k.replaceWith(n)
                  } else {
                    var o = this.option(j)
                    if (j.children) {
                      var p = this.convertToOptions(j.children)
                      b.appendMany(o, p)
                    }
                    h.push(o)
                  }
                }
                return h
              }),
              d
            )
          }
        ),
        b.define(
          'select2/data/ajax',
          ['./array', '../utils', 'jquery'],
          function (a, b, c) {
            function d(a, b) {
              ;(this.ajaxOptions = this._applyDefaults(b.get('ajax'))),
                null != this.ajaxOptions.processResults &&
                  (this.processResults = this.ajaxOptions.processResults),
                d.__super__.constructor.call(this, a, b)
            }
            return (
              b.Extend(d, a),
              (d.prototype._applyDefaults = function (a) {
                var b = {
                  data: function (a) {
                    return c.extend({}, a, { q: a.term })
                  },
                  transport: function (a, b, d) {
                    var e = c.ajax(a)
                    return e.then(b), e.fail(d), e
                  },
                }
                return c.extend({}, b, a, !0)
              }),
              (d.prototype.processResults = function (a) {
                return a
              }),
              (d.prototype.query = function (a, b) {
                function d() {
                  var d = f.transport(
                    f,
                    function (d) {
                      var f = e.processResults(d, a)
                      e.options.get('debug') &&
                        window.console &&
                        console.error &&
                        ((f && f.results && c.isArray(f.results)) ||
                          console.error(
                            'Select2: The AJAX results did not return an array in the `results` key of the response.'
                          )),
                        b(f)
                    },
                    function () {
                      ;('status' in d &&
                        (0 === d.status || '0' === d.status)) ||
                        e.trigger('results:message', {
                          message: 'errorLoading',
                        })
                    }
                  )
                  e._request = d
                }
                var e = this
                null != this._request &&
                  (c.isFunction(this._request.abort) && this._request.abort(),
                  (this._request = null))
                var f = c.extend({ type: 'GET' }, this.ajaxOptions)
                'function' == typeof f.url &&
                  (f.url = f.url.call(this.$element, a)),
                  'function' == typeof f.data &&
                    (f.data = f.data.call(this.$element, a)),
                  this.ajaxOptions.delay && null != a.term
                    ? (this._queryTimeout &&
                        window.clearTimeout(this._queryTimeout),
                      (this._queryTimeout = window.setTimeout(
                        d,
                        this.ajaxOptions.delay
                      )))
                    : d()
              }),
              d
            )
          }
        ),
        b.define('select2/data/tags', ['jquery'], function (a) {
          function b(b, c, d) {
            var e = d.get('tags'),
              f = d.get('createTag')
            void 0 !== f && (this.createTag = f)
            var g = d.get('insertTag')
            if (
              (void 0 !== g && (this.insertTag = g),
              b.call(this, c, d),
              a.isArray(e))
            )
              for (var h = 0; h < e.length; h++) {
                var i = e[h],
                  j = this._normalizeItem(i),
                  k = this.option(j)
                this.$element.append(k)
              }
          }
          return (
            (b.prototype.query = function (a, b, c) {
              function d(a, f) {
                for (var g = a.results, h = 0; h < g.length; h++) {
                  var i = g[h],
                    j = null != i.children && !d({ results: i.children }, !0)
                  if (
                    (i.text || '').toUpperCase() ===
                      (b.term || '').toUpperCase() ||
                    j
                  )
                    return !f && ((a.data = g), void c(a))
                }
                if (f) return !0
                var k = e.createTag(b)
                if (null != k) {
                  var l = e.option(k)
                  l.attr('data-select2-tag', !0),
                    e.addOptions([l]),
                    e.insertTag(g, k)
                }
                ;(a.results = g), c(a)
              }
              var e = this
              if ((this._removeOldTags(), null == b.term || null != b.page))
                return void a.call(this, b, c)
              a.call(this, b, d)
            }),
            (b.prototype.createTag = function (b, c) {
              var d = a.trim(c.term)
              return '' === d ? null : { id: d, text: d }
            }),
            (b.prototype.insertTag = function (a, b, c) {
              b.unshift(c)
            }),
            (b.prototype._removeOldTags = function (b) {
              this._lastTag
              this.$element.find('option[data-select2-tag]').each(function () {
                this.selected || a(this).remove()
              })
            }),
            b
          )
        }),
        b.define('select2/data/tokenizer', ['jquery'], function (a) {
          function b(a, b, c) {
            var d = c.get('tokenizer')
            void 0 !== d && (this.tokenizer = d), a.call(this, b, c)
          }
          return (
            (b.prototype.bind = function (a, b, c) {
              a.call(this, b, c),
                (this.$search =
                  b.dropdown.$search ||
                  b.selection.$search ||
                  c.find('.select2-search__field'))
            }),
            (b.prototype.query = function (b, c, d) {
              function e(b) {
                var c = g._normalizeItem(b)
                if (
                  !g.$element.find('option').filter(function () {
                    return a(this).val() === c.id
                  }).length
                ) {
                  var d = g.option(c)
                  d.attr('data-select2-tag', !0),
                    g._removeOldTags(),
                    g.addOptions([d])
                }
                f(c)
              }
              function f(a) {
                g.trigger('select', { data: a })
              }
              var g = this
              c.term = c.term || ''
              var h = this.tokenizer(c, this.options, e)
              h.term !== c.term &&
                (this.$search.length &&
                  (this.$search.val(h.term), this.$search.focus()),
                (c.term = h.term)),
                b.call(this, c, d)
            }),
            (b.prototype.tokenizer = function (b, c, d, e) {
              for (
                var f = d.get('tokenSeparators') || [],
                  g = c.term,
                  h = 0,
                  i =
                    this.createTag ||
                    function (a) {
                      return { id: a.term, text: a.term }
                    };
                h < g.length;

              ) {
                var j = g[h]
                if (-1 !== a.inArray(j, f)) {
                  var k = g.substr(0, h),
                    l = a.extend({}, c, { term: k }),
                    m = i(l)
                  null != m ? (e(m), (g = g.substr(h + 1) || ''), (h = 0)) : h++
                } else h++
              }
              return { term: g }
            }),
            b
          )
        }),
        b.define('select2/data/minimumInputLength', [], function () {
          function a(a, b, c) {
            ;(this.minimumInputLength = c.get('minimumInputLength')),
              a.call(this, b, c)
          }
          return (
            (a.prototype.query = function (a, b, c) {
              if (
                ((b.term = b.term || ''),
                b.term.length < this.minimumInputLength)
              )
                return void this.trigger('results:message', {
                  message: 'inputTooShort',
                  args: {
                    minimum: this.minimumInputLength,
                    input: b.term,
                    params: b,
                  },
                })
              a.call(this, b, c)
            }),
            a
          )
        }),
        b.define('select2/data/maximumInputLength', [], function () {
          function a(a, b, c) {
            ;(this.maximumInputLength = c.get('maximumInputLength')),
              a.call(this, b, c)
          }
          return (
            (a.prototype.query = function (a, b, c) {
              if (
                ((b.term = b.term || ''),
                this.maximumInputLength > 0 &&
                  b.term.length > this.maximumInputLength)
              )
                return void this.trigger('results:message', {
                  message: 'inputTooLong',
                  args: {
                    maximum: this.maximumInputLength,
                    input: b.term,
                    params: b,
                  },
                })
              a.call(this, b, c)
            }),
            a
          )
        }),
        b.define('select2/data/maximumSelectionLength', [], function () {
          function a(a, b, c) {
            ;(this.maximumSelectionLength = c.get('maximumSelectionLength')),
              a.call(this, b, c)
          }
          return (
            (a.prototype.query = function (a, b, c) {
              var d = this
              this.current(function (e) {
                var f = null != e ? e.length : 0
                if (
                  d.maximumSelectionLength > 0 &&
                  f >= d.maximumSelectionLength
                )
                  return void d.trigger('results:message', {
                    message: 'maximumSelected',
                    args: { maximum: d.maximumSelectionLength },
                  })
                a.call(d, b, c)
              })
            }),
            a
          )
        }),
        b.define('select2/dropdown', ['jquery', './utils'], function (a, b) {
          function c(a, b) {
            ;(this.$element = a),
              (this.options = b),
              c.__super__.constructor.call(this)
          }
          return (
            b.Extend(c, b.Observable),
            (c.prototype.render = function () {
              var b = a(
                '<span class="select2-dropdown"><span class="select2-results"></span></span>'
              )
              return (
                b.attr('dir', this.options.get('dir')), (this.$dropdown = b), b
              )
            }),
            (c.prototype.bind = function () {}),
            (c.prototype.position = function (a, b) {}),
            (c.prototype.destroy = function () {
              this.$dropdown.remove()
            }),
            c
          )
        }),
        b.define(
          'select2/dropdown/search',
          ['jquery', '../utils'],
          function (a, b) {
            function c() {}
            return (
              (c.prototype.render = function (b) {
                var c = b.call(this),
                  d = a(
                    '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>'
                  )
                return (
                  (this.$searchContainer = d),
                  (this.$search = d.find('input')),
                  c.prepend(d),
                  c
                )
              }),
              (c.prototype.bind = function (b, c, d) {
                var e = this
                b.call(this, c, d),
                  this.$search.on('keydown', function (a) {
                    e.trigger('keypress', a),
                      (e._keyUpPrevented = a.isDefaultPrevented())
                  }),
                  this.$search.on('input', function (b) {
                    a(this).off('keyup')
                  }),
                  this.$search.on('keyup input', function (a) {
                    e.handleSearch(a)
                  }),
                  c.on('open', function () {
                    e.$search.attr('tabindex', 0),
                      e.$search.focus(),
                      window.setTimeout(function () {
                        e.$search.focus()
                      }, 0)
                  }),
                  c.on('close', function () {
                    e.$search.attr('tabindex', -1),
                      e.$search.val(''),
                      e.$search.blur()
                  }),
                  c.on('focus', function () {
                    c.isOpen() || e.$search.focus()
                  }),
                  c.on('results:all', function (a) {
                    if (null == a.query.term || '' === a.query.term) {
                      e.showSearch(a)
                        ? e.$searchContainer.removeClass('select2-search--hide')
                        : e.$searchContainer.addClass('select2-search--hide')
                    }
                  })
              }),
              (c.prototype.handleSearch = function (a) {
                if (!this._keyUpPrevented) {
                  var b = this.$search.val()
                  this.trigger('query', { term: b })
                }
                this._keyUpPrevented = !1
              }),
              (c.prototype.showSearch = function (a, b) {
                return !0
              }),
              c
            )
          }
        ),
        b.define('select2/dropdown/hidePlaceholder', [], function () {
          function a(a, b, c, d) {
            ;(this.placeholder = this.normalizePlaceholder(
              c.get('placeholder')
            )),
              a.call(this, b, c, d)
          }
          return (
            (a.prototype.append = function (a, b) {
              ;(b.results = this.removePlaceholder(b.results)), a.call(this, b)
            }),
            (a.prototype.normalizePlaceholder = function (a, b) {
              return 'string' == typeof b && (b = { id: '', text: b }), b
            }),
            (a.prototype.removePlaceholder = function (a, b) {
              for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                var e = b[d]
                this.placeholder.id === e.id && c.splice(d, 1)
              }
              return c
            }),
            a
          )
        }),
        b.define('select2/dropdown/infiniteScroll', ['jquery'], function (a) {
          function b(a, b, c, d) {
            ;(this.lastParams = {}),
              a.call(this, b, c, d),
              (this.$loadingMore = this.createLoadingMore()),
              (this.loading = !1)
          }
          return (
            (b.prototype.append = function (a, b) {
              this.$loadingMore.remove(),
                (this.loading = !1),
                a.call(this, b),
                this.showLoadingMore(b) &&
                  this.$results.append(this.$loadingMore)
            }),
            (b.prototype.bind = function (b, c, d) {
              var e = this
              b.call(this, c, d),
                c.on('query', function (a) {
                  ;(e.lastParams = a), (e.loading = !0)
                }),
                c.on('query:append', function (a) {
                  ;(e.lastParams = a), (e.loading = !0)
                }),
                this.$results.on('scroll', function () {
                  var b = a.contains(
                    document.documentElement,
                    e.$loadingMore[0]
                  )
                  if (!e.loading && b) {
                    e.$results.offset().top + e.$results.outerHeight(!1) + 50 >=
                      e.$loadingMore.offset().top +
                        e.$loadingMore.outerHeight(!1) && e.loadMore()
                  }
                })
            }),
            (b.prototype.loadMore = function () {
              this.loading = !0
              var b = a.extend({}, { page: 1 }, this.lastParams)
              b.page++, this.trigger('query:append', b)
            }),
            (b.prototype.showLoadingMore = function (a, b) {
              return b.pagination && b.pagination.more
            }),
            (b.prototype.createLoadingMore = function () {
              var b = a(
                  '<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'
                ),
                c = this.options.get('translations').get('loadingMore')
              return b.html(c(this.lastParams)), b
            }),
            b
          )
        }),
        b.define(
          'select2/dropdown/attachBody',
          ['jquery', '../utils'],
          function (a, b) {
            function c(b, c, d) {
              ;(this.$dropdownParent =
                d.get('dropdownParent') || a(document.body)),
                b.call(this, c, d)
            }
            return (
              (c.prototype.bind = function (a, b, c) {
                var d = this,
                  e = !1
                a.call(this, b, c),
                  b.on('open', function () {
                    d._showDropdown(),
                      d._attachPositioningHandler(b),
                      e ||
                        ((e = !0),
                        b.on('results:all', function () {
                          d._positionDropdown(), d._resizeDropdown()
                        }),
                        b.on('results:append', function () {
                          d._positionDropdown(), d._resizeDropdown()
                        }))
                  }),
                  b.on('close', function () {
                    d._hideDropdown(), d._detachPositioningHandler(b)
                  }),
                  this.$dropdownContainer.on('mousedown', function (a) {
                    a.stopPropagation()
                  })
              }),
              (c.prototype.destroy = function (a) {
                a.call(this), this.$dropdownContainer.remove()
              }),
              (c.prototype.position = function (a, b, c) {
                b.attr('class', c.attr('class')),
                  b.removeClass('select2'),
                  b.addClass('select2-container--open'),
                  b.css({ position: 'absolute', top: -999999 }),
                  (this.$container = c)
              }),
              (c.prototype.render = function (b) {
                var c = a('<span></span>'),
                  d = b.call(this)
                return c.append(d), (this.$dropdownContainer = c), c
              }),
              (c.prototype._hideDropdown = function (a) {
                this.$dropdownContainer.detach()
              }),
              (c.prototype._attachPositioningHandler = function (c, d) {
                var e = this,
                  f = 'scroll.select2.' + d.id,
                  g = 'resize.select2.' + d.id,
                  h = 'orientationchange.select2.' + d.id,
                  i = this.$container.parents().filter(b.hasScroll)
                i.each(function () {
                  b.StoreData(this, 'select2-scroll-position', {
                    x: a(this).scrollLeft(),
                    y: a(this).scrollTop(),
                  })
                }),
                  i.on(f, function (c) {
                    var d = b.GetData(this, 'select2-scroll-position')
                    a(this).scrollTop(d.y)
                  }),
                  a(window).on(f + ' ' + g + ' ' + h, function (a) {
                    e._positionDropdown(), e._resizeDropdown()
                  })
              }),
              (c.prototype._detachPositioningHandler = function (c, d) {
                var e = 'scroll.select2.' + d.id,
                  f = 'resize.select2.' + d.id,
                  g = 'orientationchange.select2.' + d.id
                this.$container.parents().filter(b.hasScroll).off(e),
                  a(window).off(e + ' ' + f + ' ' + g)
              }),
              (c.prototype._positionDropdown = function () {
                var b = a(window),
                  c = this.$dropdown.hasClass('select2-dropdown--above'),
                  d = this.$dropdown.hasClass('select2-dropdown--below'),
                  e = null,
                  f = this.$container.offset()
                f.bottom = f.top + this.$container.outerHeight(!1)
                var g = { height: this.$container.outerHeight(!1) }
                ;(g.top = f.top), (g.bottom = f.top + g.height)
                var h = { height: this.$dropdown.outerHeight(!1) },
                  i = {
                    top: b.scrollTop(),
                    bottom: b.scrollTop() + b.height(),
                  },
                  j = i.top < f.top - h.height,
                  k = i.bottom > f.bottom + h.height,
                  l = { left: f.left, top: g.bottom },
                  m = this.$dropdownParent
                'static' === m.css('position') && (m = m.offsetParent())
                var n = m.offset()
                ;(l.top -= n.top),
                  (l.left -= n.left),
                  c || d || (e = 'below'),
                  k || !j || c ? !j && k && c && (e = 'below') : (e = 'above'),
                  ('above' == e || (c && 'below' !== e)) &&
                    (l.top = g.top - n.top - h.height),
                  null != e &&
                    (this.$dropdown
                      .removeClass(
                        'select2-dropdown--below select2-dropdown--above'
                      )
                      .addClass('select2-dropdown--' + e),
                    this.$container
                      .removeClass(
                        'select2-container--below select2-container--above'
                      )
                      .addClass('select2-container--' + e)),
                  this.$dropdownContainer.css(l)
              }),
              (c.prototype._resizeDropdown = function () {
                var a = { width: this.$container.outerWidth(!1) + 'px' }
                this.options.get('dropdownAutoWidth') &&
                  ((a.minWidth = a.width),
                  (a.position = 'relative'),
                  (a.width = 'auto')),
                  this.$dropdown.css(a)
              }),
              (c.prototype._showDropdown = function (a) {
                this.$dropdownContainer.appendTo(this.$dropdownParent),
                  this._positionDropdown(),
                  this._resizeDropdown()
              }),
              c
            )
          }
        ),
        b.define('select2/dropdown/minimumResultsForSearch', [], function () {
          function a(b) {
            for (var c = 0, d = 0; d < b.length; d++) {
              var e = b[d]
              e.children ? (c += a(e.children)) : c++
            }
            return c
          }
          function b(a, b, c, d) {
            ;(this.minimumResultsForSearch = c.get('minimumResultsForSearch')),
              this.minimumResultsForSearch < 0 &&
                (this.minimumResultsForSearch = 1 / 0),
              a.call(this, b, c, d)
          }
          return (
            (b.prototype.showSearch = function (b, c) {
              return (
                !(a(c.data.results) < this.minimumResultsForSearch) &&
                b.call(this, c)
              )
            }),
            b
          )
        }),
        b.define('select2/dropdown/selectOnClose', ['../utils'], function (a) {
          function b() {}
          return (
            (b.prototype.bind = function (a, b, c) {
              var d = this
              a.call(this, b, c),
                b.on('close', function (a) {
                  d._handleSelectOnClose(a)
                })
            }),
            (b.prototype._handleSelectOnClose = function (b, c) {
              if (c && null != c.originalSelect2Event) {
                var d = c.originalSelect2Event
                if ('select' === d._type || 'unselect' === d._type) return
              }
              var e = this.getHighlightedResults()
              if (!(e.length < 1)) {
                var f = a.GetData(e[0], 'data')
                ;(null != f.element && f.element.selected) ||
                  (null == f.element && f.selected) ||
                  this.trigger('select', { data: f })
              }
            }),
            b
          )
        }),
        b.define('select2/dropdown/closeOnSelect', [], function () {
          function a() {}
          return (
            (a.prototype.bind = function (a, b, c) {
              var d = this
              a.call(this, b, c),
                b.on('select', function (a) {
                  d._selectTriggered(a)
                }),
                b.on('unselect', function (a) {
                  d._selectTriggered(a)
                })
            }),
            (a.prototype._selectTriggered = function (a, b) {
              var c = b.originalEvent
              ;(c && c.ctrlKey) ||
                this.trigger('close', {
                  originalEvent: c,
                  originalSelect2Event: b,
                })
            }),
            a
          )
        }),
        b.define('select2/i18n/en', [], function () {
          return {
            errorLoading: function () {
              return 'The results could not be loaded.'
            },
            inputTooLong: function (a) {
              var b = a.input.length - a.maximum,
                c = 'Please delete ' + b + ' character'
              return 1 != b && (c += 's'), c
            },
            inputTooShort: function (a) {
              return (
                'Please enter ' +
                (a.minimum - a.input.length) +
                ' or more characters'
              )
            },
            loadingMore: function () {
              return 'Loading more resultsÃ¢â‚¬Â¦'
            },
            maximumSelected: function (a) {
              var b = 'You can only select ' + a.maximum + ' item'
              return 1 != a.maximum && (b += 's'), b
            },
            noResults: function () {
              return 'No results found'
            },
            searching: function () {
              return 'SearchingÃ¢â‚¬Â¦'
            },
          }
        }),
        b.define(
          'select2/defaults',
          [
            'jquery',
            'require',
            './results',
            './selection/single',
            './selection/multiple',
            './selection/placeholder',
            './selection/allowClear',
            './selection/search',
            './selection/eventRelay',
            './utils',
            './translation',
            './diacritics',
            './data/select',
            './data/array',
            './data/ajax',
            './data/tags',
            './data/tokenizer',
            './data/minimumInputLength',
            './data/maximumInputLength',
            './data/maximumSelectionLength',
            './dropdown',
            './dropdown/search',
            './dropdown/hidePlaceholder',
            './dropdown/infiniteScroll',
            './dropdown/attachBody',
            './dropdown/minimumResultsForSearch',
            './dropdown/selectOnClose',
            './dropdown/closeOnSelect',
            './i18n/en',
          ],
          function (
            a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y,
            z,
            A,
            B,
            C
          ) {
            function D() {
              this.reset()
            }
            return (
              (D.prototype.apply = function (l) {
                if (
                  ((l = a.extend(!0, {}, this.defaults, l)),
                  null == l.dataAdapter)
                ) {
                  if (
                    (null != l.ajax
                      ? (l.dataAdapter = o)
                      : null != l.data
                      ? (l.dataAdapter = n)
                      : (l.dataAdapter = m),
                    l.minimumInputLength > 0 &&
                      (l.dataAdapter = j.Decorate(l.dataAdapter, r)),
                    l.maximumInputLength > 0 &&
                      (l.dataAdapter = j.Decorate(l.dataAdapter, s)),
                    l.maximumSelectionLength > 0 &&
                      (l.dataAdapter = j.Decorate(l.dataAdapter, t)),
                    l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)),
                    (null == l.tokenSeparators && null == l.tokenizer) ||
                      (l.dataAdapter = j.Decorate(l.dataAdapter, q)),
                    null != l.query)
                  ) {
                    var C = b(l.amdBase + 'compat/query')
                    l.dataAdapter = j.Decorate(l.dataAdapter, C)
                  }
                  if (null != l.initSelection) {
                    var D = b(l.amdBase + 'compat/initSelection')
                    l.dataAdapter = j.Decorate(l.dataAdapter, D)
                  }
                }
                if (
                  (null == l.resultsAdapter &&
                    ((l.resultsAdapter = c),
                    null != l.ajax &&
                      (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)),
                    null != l.placeholder &&
                      (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)),
                    l.selectOnClose &&
                      (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))),
                  null == l.dropdownAdapter)
                ) {
                  if (l.multiple) l.dropdownAdapter = u
                  else {
                    var E = j.Decorate(u, v)
                    l.dropdownAdapter = E
                  }
                  if (
                    (0 !== l.minimumResultsForSearch &&
                      (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)),
                    l.closeOnSelect &&
                      (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)),
                    null != l.dropdownCssClass ||
                      null != l.dropdownCss ||
                      null != l.adaptDropdownCssClass)
                  ) {
                    var F = b(l.amdBase + 'compat/dropdownCss')
                    l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F)
                  }
                  l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y)
                }
                if (null == l.selectionAdapter) {
                  if (
                    (l.multiple
                      ? (l.selectionAdapter = e)
                      : (l.selectionAdapter = d),
                    null != l.placeholder &&
                      (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)),
                    l.allowClear &&
                      (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)),
                    l.multiple &&
                      (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)),
                    null != l.containerCssClass ||
                      null != l.containerCss ||
                      null != l.adaptContainerCssClass)
                  ) {
                    var G = b(l.amdBase + 'compat/containerCss')
                    l.selectionAdapter = j.Decorate(l.selectionAdapter, G)
                  }
                  l.selectionAdapter = j.Decorate(l.selectionAdapter, i)
                }
                if ('string' == typeof l.language)
                  if (l.language.indexOf('-') > 0) {
                    var H = l.language.split('-'),
                      I = H[0]
                    l.language = [l.language, I]
                  } else l.language = [l.language]
                if (a.isArray(l.language)) {
                  var J = new k()
                  l.language.push('en')
                  for (var K = l.language, L = 0; L < K.length; L++) {
                    var M = K[L],
                      N = {}
                    try {
                      N = k.loadPath(M)
                    } catch (a) {
                      try {
                        ;(M = this.defaults.amdLanguageBase + M),
                          (N = k.loadPath(M))
                      } catch (a) {
                        l.debug &&
                          window.console &&
                          console.warn &&
                          console.warn(
                            'Select2: The language file for "' +
                              M +
                              '" could not be automatically loaded. A fallback will be used instead.'
                          )
                        continue
                      }
                    }
                    J.extend(N)
                  }
                  l.translations = J
                } else {
                  var O = k.loadPath(this.defaults.amdLanguageBase + 'en'),
                    P = new k(l.language)
                  P.extend(O), (l.translations = P)
                }
                return l
              }),
              (D.prototype.reset = function () {
                function b(a) {
                  function b(a) {
                    return l[a] || a
                  }
                  return a.replace(/[^\u0000-\u007E]/g, b)
                }
                function c(d, e) {
                  if ('' === a.trim(d.term)) return e
                  if (e.children && e.children.length > 0) {
                    for (
                      var f = a.extend(!0, {}, e), g = e.children.length - 1;
                      g >= 0;
                      g--
                    ) {
                      null == c(d, e.children[g]) && f.children.splice(g, 1)
                    }
                    return f.children.length > 0 ? f : c(d, f)
                  }
                  var h = b(e.text).toUpperCase(),
                    i = b(d.term).toUpperCase()
                  return h.indexOf(i) > -1 ? e : null
                }
                this.defaults = {
                  amdBase: './',
                  amdLanguageBase: './i18n/',
                  closeOnSelect: !0,
                  debug: !1,
                  dropdownAutoWidth: !1,
                  escapeMarkup: j.escapeMarkup,
                  language: C,
                  matcher: c,
                  minimumInputLength: 0,
                  maximumInputLength: 0,
                  maximumSelectionLength: 0,
                  minimumResultsForSearch: 0,
                  selectOnClose: !1,
                  sorter: function (a) {
                    return a
                  },
                  templateResult: function (a) {
                    return a.text
                  },
                  templateSelection: function (a) {
                    return a.text
                  },
                  theme: 'default',
                  width: 'resolve',
                }
              }),
              (D.prototype.set = function (b, c) {
                var d = a.camelCase(b),
                  e = {}
                e[d] = c
                var f = j._convertData(e)
                a.extend(!0, this.defaults, f)
              }),
              new D()
            )
          }
        ),
        b.define(
          'select2/options',
          ['require', 'jquery', './defaults', './utils'],
          function (a, b, c, d) {
            function e(b, e) {
              if (
                ((this.options = b),
                null != e && this.fromElement(e),
                (this.options = c.apply(this.options)),
                e && e.is('input'))
              ) {
                var f = a(this.get('amdBase') + 'compat/inputData')
                this.options.dataAdapter = d.Decorate(
                  this.options.dataAdapter,
                  f
                )
              }
            }
            return (
              (e.prototype.fromElement = function (a) {
                var c = ['select2']
                null == this.options.multiple &&
                  (this.options.multiple = a.prop('multiple')),
                  null == this.options.disabled &&
                    (this.options.disabled = a.prop('disabled')),
                  null == this.options.language &&
                    (a.prop('lang')
                      ? (this.options.language = a.prop('lang').toLowerCase())
                      : a.closest('[lang]').prop('lang') &&
                        (this.options.language = a
                          .closest('[lang]')
                          .prop('lang'))),
                  null == this.options.dir &&
                    (a.prop('dir')
                      ? (this.options.dir = a.prop('dir'))
                      : a.closest('[dir]').prop('dir')
                      ? (this.options.dir = a.closest('[dir]').prop('dir'))
                      : (this.options.dir = 'ltr')),
                  a.prop('disabled', this.options.disabled),
                  a.prop('multiple', this.options.multiple),
                  d.GetData(a[0], 'select2Tags') &&
                    (this.options.debug &&
                      window.console &&
                      console.warn &&
                      console.warn(
                        'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                      ),
                    d.StoreData(a[0], 'data', d.GetData(a[0], 'select2Tags')),
                    d.StoreData(a[0], 'tags', !0)),
                  d.GetData(a[0], 'ajaxUrl') &&
                    (this.options.debug &&
                      window.console &&
                      console.warn &&
                      console.warn(
                        'Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2.'
                      ),
                    a.attr('ajax--url', d.GetData(a[0], 'ajaxUrl')),
                    d.StoreData(a[0], 'ajax-Url', d.GetData(a[0], 'ajaxUrl')))
                var e = {}
                e =
                  b.fn.jquery &&
                  '1.' == b.fn.jquery.substr(0, 2) &&
                  a[0].dataset
                    ? b.extend(!0, {}, a[0].dataset, d.GetData(a[0]))
                    : d.GetData(a[0])
                var f = b.extend(!0, {}, e)
                f = d._convertData(f)
                for (var g in f)
                  b.inArray(g, c) > -1 ||
                    (b.isPlainObject(this.options[g])
                      ? b.extend(this.options[g], f[g])
                      : (this.options[g] = f[g]))
                return this
              }),
              (e.prototype.get = function (a) {
                return this.options[a]
              }),
              (e.prototype.set = function (a, b) {
                this.options[a] = b
              }),
              e
            )
          }
        ),
        b.define(
          'select2/core',
          ['jquery', './options', './utils', './keys'],
          function (a, b, c, d) {
            var e = function (a, d) {
              null != c.GetData(a[0], 'select2') &&
                c.GetData(a[0], 'select2').destroy(),
                (this.$element = a),
                (this.id = this._generateId(a)),
                (d = d || {}),
                (this.options = new b(d, a)),
                e.__super__.constructor.call(this)
              var f = a.attr('tabindex') || 0
              c.StoreData(a[0], 'old-tabindex', f), a.attr('tabindex', '-1')
              var g = this.options.get('dataAdapter')
              this.dataAdapter = new g(a, this.options)
              var h = this.render()
              this._placeContainer(h)
              var i = this.options.get('selectionAdapter')
              ;(this.selection = new i(a, this.options)),
                (this.$selection = this.selection.render()),
                this.selection.position(this.$selection, h)
              var j = this.options.get('dropdownAdapter')
              ;(this.dropdown = new j(a, this.options)),
                (this.$dropdown = this.dropdown.render()),
                this.dropdown.position(this.$dropdown, h)
              var k = this.options.get('resultsAdapter')
              ;(this.results = new k(a, this.options, this.dataAdapter)),
                (this.$results = this.results.render()),
                this.results.position(this.$results, this.$dropdown)
              var l = this
              this._bindAdapters(),
                this._registerDomEvents(),
                this._registerDataEvents(),
                this._registerSelectionEvents(),
                this._registerDropdownEvents(),
                this._registerResultsEvents(),
                this._registerEvents(),
                this.dataAdapter.current(function (a) {
                  l.trigger('selection:update', { data: a })
                }),
                a.addClass('select2-hidden-accessible'),
                a.attr('aria-hidden', 'true'),
                this._syncAttributes(),
                c.StoreData(a[0], 'select2', this),
                a.data('select2', this)
            }
            return (
              c.Extend(e, c.Observable),
              (e.prototype._generateId = function (a) {
                var b = ''
                return (
                  (b =
                    null != a.attr('id')
                      ? a.attr('id')
                      : null != a.attr('name')
                      ? a.attr('name') + '-' + c.generateChars(2)
                      : c.generateChars(4)),
                  (b = b.replace(/(:|\.|\[|\]|,)/g, '')),
                  (b = 'select2-' + b)
                )
              }),
              (e.prototype._placeContainer = function (a) {
                a.insertAfter(this.$element)
                var b = this._resolveWidth(
                  this.$element,
                  this.options.get('width')
                )
                null != b && a.css('width', b)
              }),
              (e.prototype._resolveWidth = function (a, b) {
                var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i
                if ('resolve' == b) {
                  var d = this._resolveWidth(a, 'style')
                  return null != d ? d : this._resolveWidth(a, 'element')
                }
                if ('element' == b) {
                  var e = a.outerWidth(!1)
                  return e <= 0 ? 'auto' : e + 'px'
                }
                if ('style' == b) {
                  var f = a.attr('style')
                  if ('string' != typeof f) return null
                  for (
                    var g = f.split(';'), h = 0, i = g.length;
                    h < i;
                    h += 1
                  ) {
                    var j = g[h].replace(/\s/g, ''),
                      k = j.match(c)
                    if (null !== k && k.length >= 1) return k[1]
                  }
                  return null
                }
                return b
              }),
              (e.prototype._bindAdapters = function () {
                this.dataAdapter.bind(this, this.$container),
                  this.selection.bind(this, this.$container),
                  this.dropdown.bind(this, this.$container),
                  this.results.bind(this, this.$container)
              }),
              (e.prototype._registerDomEvents = function () {
                var b = this
                this.$element.on('change.select2', function () {
                  b.dataAdapter.current(function (a) {
                    b.trigger('selection:update', { data: a })
                  })
                }),
                  this.$element.on('focus.select2', function (a) {
                    b.trigger('focus', a)
                  }),
                  (this._syncA = c.bind(this._syncAttributes, this)),
                  (this._syncS = c.bind(this._syncSubtree, this)),
                  this.$element[0].attachEvent &&
                    this.$element[0].attachEvent(
                      'onpropertychange',
                      this._syncA
                    )
                var d =
                  window.MutationObserver ||
                  window.WebKitMutationObserver ||
                  window.MozMutationObserver
                null != d
                  ? ((this._observer = new d(function (c) {
                      a.each(c, b._syncA), a.each(c, b._syncS)
                    })),
                    this._observer.observe(this.$element[0], {
                      attributes: !0,
                      childList: !0,
                      subtree: !1,
                    }))
                  : this.$element[0].addEventListener &&
                    (this.$element[0].addEventListener(
                      'DOMAttrModified',
                      b._syncA,
                      !1
                    ),
                    this.$element[0].addEventListener(
                      'DOMNodeInserted',
                      b._syncS,
                      !1
                    ),
                    this.$element[0].addEventListener(
                      'DOMNodeRemoved',
                      b._syncS,
                      !1
                    ))
              }),
              (e.prototype._registerDataEvents = function () {
                var a = this
                this.dataAdapter.on('*', function (b, c) {
                  a.trigger(b, c)
                })
              }),
              (e.prototype._registerSelectionEvents = function () {
                var b = this,
                  c = ['toggle', 'focus']
                this.selection.on('toggle', function () {
                  b.toggleDropdown()
                }),
                  this.selection.on('focus', function (a) {
                    b.focus(a)
                  }),
                  this.selection.on('*', function (d, e) {
                    ;-1 === a.inArray(d, c) && b.trigger(d, e)
                  })
              }),
              (e.prototype._registerDropdownEvents = function () {
                var a = this
                this.dropdown.on('*', function (b, c) {
                  a.trigger(b, c)
                })
              }),
              (e.prototype._registerResultsEvents = function () {
                var a = this
                this.results.on('*', function (b, c) {
                  a.trigger(b, c)
                })
              }),
              (e.prototype._registerEvents = function () {
                var a = this
                this.on('open', function () {
                  a.$container.addClass('select2-container--open')
                }),
                  this.on('close', function () {
                    a.$container.removeClass('select2-container--open')
                  }),
                  this.on('enable', function () {
                    a.$container.removeClass('select2-container--disabled')
                  }),
                  this.on('disable', function () {
                    a.$container.addClass('select2-container--disabled')
                  }),
                  this.on('blur', function () {
                    a.$container.removeClass('select2-container--focus')
                  }),
                  this.on('query', function (b) {
                    a.isOpen() || a.trigger('open', {}),
                      this.dataAdapter.query(b, function (c) {
                        a.trigger('results:all', { data: c, query: b })
                      })
                  }),
                  this.on('query:append', function (b) {
                    this.dataAdapter.query(b, function (c) {
                      a.trigger('results:append', { data: c, query: b })
                    })
                  }),
                  this.on('keypress', function (b) {
                    var c = b.which
                    a.isOpen()
                      ? c === d.ESC || c === d.TAB || (c === d.UP && b.altKey)
                        ? (a.close(), b.preventDefault())
                        : c === d.ENTER
                        ? (a.trigger('results:select', {}), b.preventDefault())
                        : c === d.SPACE && b.ctrlKey
                        ? (a.trigger('results:toggle', {}), b.preventDefault())
                        : c === d.UP
                        ? (a.trigger('results:previous', {}),
                          b.preventDefault())
                        : c === d.DOWN &&
                          (a.trigger('results:next', {}), b.preventDefault())
                      : (c === d.ENTER ||
                          c === d.SPACE ||
                          (c === d.DOWN && b.altKey)) &&
                        (a.open(), b.preventDefault())
                  })
              }),
              (e.prototype._syncAttributes = function () {
                this.options.set('disabled', this.$element.prop('disabled')),
                  this.options.get('disabled')
                    ? (this.isOpen() && this.close(),
                      this.trigger('disable', {}))
                    : this.trigger('enable', {})
              }),
              (e.prototype._syncSubtree = function (a, b) {
                var c = !1,
                  d = this
                if (
                  !a ||
                  !a.target ||
                  'OPTION' === a.target.nodeName ||
                  'OPTGROUP' === a.target.nodeName
                ) {
                  if (b)
                    if (b.addedNodes && b.addedNodes.length > 0)
                      for (var e = 0; e < b.addedNodes.length; e++) {
                        var f = b.addedNodes[e]
                        f.selected && (c = !0)
                      }
                    else b.removedNodes && b.removedNodes.length > 0 && (c = !0)
                  else c = !0
                  c &&
                    this.dataAdapter.current(function (a) {
                      d.trigger('selection:update', { data: a })
                    })
                }
              }),
              (e.prototype.trigger = function (a, b) {
                var c = e.__super__.trigger,
                  d = {
                    open: 'opening',
                    close: 'closing',
                    select: 'selecting',
                    unselect: 'unselecting',
                    clear: 'clearing',
                  }
                if ((void 0 === b && (b = {}), a in d)) {
                  var f = d[a],
                    g = { prevented: !1, name: a, args: b }
                  if ((c.call(this, f, g), g.prevented))
                    return void (b.prevented = !0)
                }
                c.call(this, a, b)
              }),
              (e.prototype.toggleDropdown = function () {
                this.options.get('disabled') ||
                  (this.isOpen() ? this.close() : this.open())
              }),
              (e.prototype.open = function () {
                this.isOpen() || this.trigger('query', {})
              }),
              (e.prototype.close = function () {
                this.isOpen() && this.trigger('close', {})
              }),
              (e.prototype.isOpen = function () {
                return this.$container.hasClass('select2-container--open')
              }),
              (e.prototype.hasFocus = function () {
                return this.$container.hasClass('select2-container--focus')
              }),
              (e.prototype.focus = function (a) {
                this.hasFocus() ||
                  (this.$container.addClass('select2-container--focus'),
                  this.trigger('focus', {}))
              }),
              (e.prototype.enable = function (a) {
                this.options.get('debug') &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
                  ),
                  (null != a && 0 !== a.length) || (a = [!0])
                var b = !a[0]
                this.$element.prop('disabled', b)
              }),
              (e.prototype.data = function () {
                this.options.get('debug') &&
                  arguments.length > 0 &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
                  )
                var a = []
                return (
                  this.dataAdapter.current(function (b) {
                    a = b
                  }),
                  a
                )
              }),
              (e.prototype.val = function (b) {
                if (
                  (this.options.get('debug') &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                    ),
                  null == b || 0 === b.length)
                )
                  return this.$element.val()
                var c = b[0]
                a.isArray(c) &&
                  (c = a.map(c, function (a) {
                    return a.toString()
                  })),
                  this.$element.val(c).trigger('change')
              }),
              (e.prototype.destroy = function () {
                this.$container.remove(),
                  this.$element[0].detachEvent &&
                    this.$element[0].detachEvent(
                      'onpropertychange',
                      this._syncA
                    ),
                  null != this._observer
                    ? (this._observer.disconnect(), (this._observer = null))
                    : this.$element[0].removeEventListener &&
                      (this.$element[0].removeEventListener(
                        'DOMAttrModified',
                        this._syncA,
                        !1
                      ),
                      this.$element[0].removeEventListener(
                        'DOMNodeInserted',
                        this._syncS,
                        !1
                      ),
                      this.$element[0].removeEventListener(
                        'DOMNodeRemoved',
                        this._syncS,
                        !1
                      )),
                  (this._syncA = null),
                  (this._syncS = null),
                  this.$element.off('.select2'),
                  this.$element.attr(
                    'tabindex',
                    c.GetData(this.$element[0], 'old-tabindex')
                  ),
                  this.$element.removeClass('select2-hidden-accessible'),
                  this.$element.attr('aria-hidden', 'false'),
                  c.RemoveData(this.$element[0]),
                  this.$element.removeData('select2'),
                  this.dataAdapter.destroy(),
                  this.selection.destroy(),
                  this.dropdown.destroy(),
                  this.results.destroy(),
                  (this.dataAdapter = null),
                  (this.selection = null),
                  (this.dropdown = null),
                  (this.results = null)
              }),
              (e.prototype.render = function () {
                var b = a(
                  '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
                )
                return (
                  b.attr('dir', this.options.get('dir')),
                  (this.$container = b),
                  this.$container.addClass(
                    'select2-container--' + this.options.get('theme')
                  ),
                  c.StoreData(b[0], 'element', this.$element),
                  b
                )
              }),
              e
            )
          }
        ),
        b.define('select2/compat/utils', ['jquery'], function (a) {
          function b(b, c, d) {
            var e,
              f,
              g = []
            ;(e = a.trim(b.attr('class'))),
              e &&
                ((e = '' + e),
                a(e.split(/\s+/)).each(function () {
                  0 === this.indexOf('select2-') && g.push(this)
                })),
              (e = a.trim(c.attr('class'))),
              e &&
                ((e = '' + e),
                a(e.split(/\s+/)).each(function () {
                  0 !== this.indexOf('select2-') &&
                    null != (f = d(this)) &&
                    g.push(f)
                })),
              b.attr('class', g.join(' '))
          }
          return { syncCssClasses: b }
        }),
        b.define(
          'select2/compat/containerCss',
          ['jquery', './utils'],
          function (a, b) {
            function c(a) {
              return null
            }
            function d() {}
            return (
              (d.prototype.render = function (d) {
                var e = d.call(this),
                  f = this.options.get('containerCssClass') || ''
                a.isFunction(f) && (f = f(this.$element))
                var g = this.options.get('adaptContainerCssClass')
                if (((g = g || c), -1 !== f.indexOf(':all:'))) {
                  f = f.replace(':all:', '')
                  var h = g
                  g = function (a) {
                    var b = h(a)
                    return null != b ? b + ' ' + a : a
                  }
                }
                var i = this.options.get('containerCss') || {}
                return (
                  a.isFunction(i) && (i = i(this.$element)),
                  b.syncCssClasses(e, this.$element, g),
                  e.css(i),
                  e.addClass(f),
                  e
                )
              }),
              d
            )
          }
        ),
        b.define(
          'select2/compat/dropdownCss',
          ['jquery', './utils'],
          function (a, b) {
            function c(a) {
              return null
            }
            function d() {}
            return (
              (d.prototype.render = function (d) {
                var e = d.call(this),
                  f = this.options.get('dropdownCssClass') || ''
                a.isFunction(f) && (f = f(this.$element))
                var g = this.options.get('adaptDropdownCssClass')
                if (((g = g || c), -1 !== f.indexOf(':all:'))) {
                  f = f.replace(':all:', '')
                  var h = g
                  g = function (a) {
                    var b = h(a)
                    return null != b ? b + ' ' + a : a
                  }
                }
                var i = this.options.get('dropdownCss') || {}
                return (
                  a.isFunction(i) && (i = i(this.$element)),
                  b.syncCssClasses(e, this.$element, g),
                  e.css(i),
                  e.addClass(f),
                  e
                )
              }),
              d
            )
          }
        ),
        b.define('select2/compat/initSelection', ['jquery'], function (a) {
          function b(a, b, c) {
            c.get('debug') &&
              window.console &&
              console.warn &&
              console.warn(
                'Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2'
              ),
              (this.initSelection = c.get('initSelection')),
              (this._isInitialized = !1),
              a.call(this, b, c)
          }
          return (
            (b.prototype.current = function (b, c) {
              var d = this
              if (this._isInitialized) return void b.call(this, c)
              this.initSelection.call(null, this.$element, function (b) {
                ;(d._isInitialized = !0), a.isArray(b) || (b = [b]), c(b)
              })
            }),
            b
          )
        }),
        b.define(
          'select2/compat/inputData',
          ['jquery', '../utils'],
          function (a, b) {
            function c(a, b, c) {
              ;(this._currentData = []),
                (this._valueSeparator = c.get('valueSeparator') || ','),
                'hidden' === b.prop('type') &&
                  c.get('debug') &&
                  console &&
                  console.warn &&
                  console.warn(
                    'Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead.'
                  ),
                a.call(this, b, c)
            }
            return (
              (c.prototype.current = function (b, c) {
                function d(b, c) {
                  var e = []
                  return (
                    b.selected || -1 !== a.inArray(b.id, c)
                      ? ((b.selected = !0), e.push(b))
                      : (b.selected = !1),
                    b.children && e.push.apply(e, d(b.children, c)),
                    e
                  )
                }
                for (var e = [], f = 0; f < this._currentData.length; f++) {
                  var g = this._currentData[f]
                  e.push.apply(
                    e,
                    d(g, this.$element.val().split(this._valueSeparator))
                  )
                }
                c(e)
              }),
              (c.prototype.select = function (b, c) {
                if (this.options.get('multiple')) {
                  var d = this.$element.val()
                  ;(d += this._valueSeparator + c.id),
                    this.$element.val(d),
                    this.$element.trigger('change')
                } else
                  this.current(function (b) {
                    a.map(b, function (a) {
                      a.selected = !1
                    })
                  }),
                    this.$element.val(c.id),
                    this.$element.trigger('change')
              }),
              (c.prototype.unselect = function (a, b) {
                var c = this
                ;(b.selected = !1),
                  this.current(function (a) {
                    for (var d = [], e = 0; e < a.length; e++) {
                      var f = a[e]
                      b.id != f.id && d.push(f.id)
                    }
                    c.$element.val(d.join(c._valueSeparator)),
                      c.$element.trigger('change')
                  })
              }),
              (c.prototype.query = function (a, b, c) {
                for (var d = [], e = 0; e < this._currentData.length; e++) {
                  var f = this._currentData[e],
                    g = this.matches(b, f)
                  null !== g && d.push(g)
                }
                c({ results: d })
              }),
              (c.prototype.addOptions = function (c, d) {
                var e = a.map(d, function (a) {
                  return b.GetData(a[0], 'data')
                })
                this._currentData.push.apply(this._currentData, e)
              }),
              c
            )
          }
        ),
        b.define('select2/compat/matcher', ['jquery'], function (a) {
          function b(b) {
            function c(c, d) {
              var e = a.extend(!0, {}, d)
              if (null == c.term || '' === a.trim(c.term)) return e
              if (d.children) {
                for (var f = d.children.length - 1; f >= 0; f--) {
                  var g = d.children[f]
                  b(c.term, g.text, g) || e.children.splice(f, 1)
                }
                if (e.children.length > 0) return e
              }
              return b(c.term, d.text, d) ? e : null
            }
            return c
          }
          return b
        }),
        b.define('select2/compat/query', [], function () {
          function a(a, b, c) {
            c.get('debug') &&
              window.console &&
              console.warn &&
              console.warn(
                'Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2.'
              ),
              a.call(this, b, c)
          }
          return (
            (a.prototype.query = function (a, b, c) {
              ;(b.callback = c), this.options.get('query').call(null, b)
            }),
            a
          )
        }),
        b.define('select2/dropdown/attachContainer', [], function () {
          function a(a, b, c) {
            a.call(this, b, c)
          }
          return (
            (a.prototype.position = function (a, b, c) {
              c.find('.dropdown-wrapper').append(b),
                b.addClass('select2-dropdown--below'),
                c.addClass('select2-container--below')
            }),
            a
          )
        }),
        b.define('select2/dropdown/stopPropagation', [], function () {
          function a() {}
          return (
            (a.prototype.bind = function (a, b, c) {
              a.call(this, b, c)
              var d = [
                'blur',
                'change',
                'click',
                'dblclick',
                'focus',
                'focusin',
                'focusout',
                'input',
                'keydown',
                'keyup',
                'keypress',
                'mousedown',
                'mouseenter',
                'mouseleave',
                'mousemove',
                'mouseover',
                'mouseup',
                'search',
                'touchend',
                'touchstart',
              ]
              this.$dropdown.on(d.join(' '), function (a) {
                a.stopPropagation()
              })
            }),
            a
          )
        }),
        b.define('select2/selection/stopPropagation', [], function () {
          function a() {}
          return (
            (a.prototype.bind = function (a, b, c) {
              a.call(this, b, c)
              var d = [
                'blur',
                'change',
                'click',
                'dblclick',
                'focus',
                'focusin',
                'focusout',
                'input',
                'keydown',
                'keyup',
                'keypress',
                'mousedown',
                'mouseenter',
                'mouseleave',
                'mousemove',
                'mouseover',
                'mouseup',
                'search',
                'touchend',
                'touchstart',
              ]
              this.$selection.on(d.join(' '), function (a) {
                a.stopPropagation()
              })
            }),
            a
          )
        }),
        (function (c) {
          'function' == typeof b.define && b.define.amd
            ? b.define('jquery-mousewheel', ['jquery'], c)
            : 'object' == typeof exports
            ? (module.exports = c)
            : c(a)
        })(function (a) {
          function b(b) {
            var g = b || window.event,
              h = i.call(arguments, 1),
              j = 0,
              l = 0,
              m = 0,
              n = 0,
              o = 0,
              p = 0
            if (
              ((b = a.event.fix(g)),
              (b.type = 'mousewheel'),
              'detail' in g && (m = -1 * g.detail),
              'wheelDelta' in g && (m = g.wheelDelta),
              'wheelDeltaY' in g && (m = g.wheelDeltaY),
              'wheelDeltaX' in g && (l = -1 * g.wheelDeltaX),
              'axis' in g &&
                g.axis === g.HORIZONTAL_AXIS &&
                ((l = -1 * m), (m = 0)),
              (j = 0 === m ? l : m),
              'deltaY' in g && ((m = -1 * g.deltaY), (j = m)),
              'deltaX' in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
              0 !== m || 0 !== l)
            ) {
              if (1 === g.deltaMode) {
                var q = a.data(this, 'mousewheel-line-height')
                ;(j *= q), (m *= q), (l *= q)
              } else if (2 === g.deltaMode) {
                var r = a.data(this, 'mousewheel-page-height')
                ;(j *= r), (m *= r), (l *= r)
              }
              if (
                ((n = Math.max(Math.abs(m), Math.abs(l))),
                (!f || n < f) && ((f = n), d(g, n) && (f /= 40)),
                d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
                (j = Math[j >= 1 ? 'floor' : 'ceil'](j / f)),
                (l = Math[l >= 1 ? 'floor' : 'ceil'](l / f)),
                (m = Math[m >= 1 ? 'floor' : 'ceil'](m / f)),
                k.settings.normalizeOffset && this.getBoundingClientRect)
              ) {
                var s = this.getBoundingClientRect()
                ;(o = b.clientX - s.left), (p = b.clientY - s.top)
              }
              return (
                (b.deltaX = l),
                (b.deltaY = m),
                (b.deltaFactor = f),
                (b.offsetX = o),
                (b.offsetY = p),
                (b.deltaMode = 0),
                h.unshift(b, j, l, m),
                e && clearTimeout(e),
                (e = setTimeout(c, 200)),
                (a.event.dispatch || a.event.handle).apply(this, h)
              )
            }
          }
          function c() {
            f = null
          }
          function d(a, b) {
            return (
              k.settings.adjustOldDeltas &&
              'mousewheel' === a.type &&
              b % 120 == 0
            )
          }
          var e,
            f,
            g = [
              'wheel',
              'mousewheel',
              'DOMMouseScroll',
              'MozMousePixelScroll',
            ],
            h =
              'onwheel' in document || document.documentMode >= 9
                ? ['wheel']
                : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
            i = Array.prototype.slice
          if (a.event.fixHooks)
            for (var j = g.length; j; )
              a.event.fixHooks[g[--j]] = a.event.mouseHooks
          var k = (a.event.special.mousewheel = {
            version: '3.1.12',
            setup: function () {
              if (this.addEventListener)
                for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1)
              else this.onmousewheel = b
              a.data(this, 'mousewheel-line-height', k.getLineHeight(this)),
                a.data(this, 'mousewheel-page-height', k.getPageHeight(this))
            },
            teardown: function () {
              if (this.removeEventListener)
                for (var c = h.length; c; )
                  this.removeEventListener(h[--c], b, !1)
              else this.onmousewheel = null
              a.removeData(this, 'mousewheel-line-height'),
                a.removeData(this, 'mousewheel-page-height')
            },
            getLineHeight: function (b) {
              var c = a(b),
                d = c['offsetParent' in a.fn ? 'offsetParent' : 'parent']()
              return (
                d.length || (d = a('body')),
                parseInt(d.css('fontSize'), 10) ||
                  parseInt(c.css('fontSize'), 10) ||
                  16
              )
            },
            getPageHeight: function (b) {
              return a(b).height()
            },
            settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
          })
          a.fn.extend({
            mousewheel: function (a) {
              return a ? this.bind('mousewheel', a) : this.trigger('mousewheel')
            },
            unmousewheel: function (a) {
              return this.unbind('mousewheel', a)
            },
          })
        }),
        b.define(
          'jquery.select2',
          [
            'jquery',
            'jquery-mousewheel',
            './select2/core',
            './select2/defaults',
            './select2/utils',
          ],
          function (a, b, c, d, e) {
            if (null == a.fn.select2) {
              var f = ['open', 'close', 'destroy']
              a.fn.select2 = function (b) {
                if ('object' == typeof (b = b || {}))
                  return (
                    this.each(function () {
                      var d = a.extend(!0, {}, b)
                      new c(a(this), d)
                    }),
                    this
                  )
                if ('string' == typeof b) {
                  var d,
                    g = Array.prototype.slice.call(arguments, 1)
                  return (
                    this.each(function () {
                      var a = e.GetData(this, 'select2')
                      null == a &&
                        window.console &&
                        console.error &&
                        console.error(
                          "The select2('" +
                            b +
                            "') method was called on an element that is not using Select2."
                        ),
                        (d = a[b].apply(a, g))
                    }),
                    a.inArray(b, f) > -1 ? this : d
                  )
                }
                throw new Error('Invalid arguments for Select2: ' + b)
              }
            }
            return (
              null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c
            )
          }
        ),
        { define: b.define, require: b.require }
      )
    })(),
    c = b.require('jquery.select2')
  return (a.fn.select2.amd = b), c
})

/*! jquery-jeditable https://github.com/NicolasCARPi/jquery_jeditable#readme */
!(function ($) {
  'use strict'
  ;($.fn.editableAriaShim = function () {
    return this.attr({ role: 'button', tabindex: 0 }), this
  }),
    ($.fn.editable = function (target, options) {
      if ('disable' !== target)
        if ('enable' !== target) {
          if ('destroy' !== target) {
            var settings = $.extend(
                {},
                $.fn.editable.defaults,
                { target: target },
                options
              ),
              plugin = $.editable.types[settings.type].plugin || function () {},
              submit = $.editable.types[settings.type].submit || function () {},
              buttons =
                $.editable.types[settings.type].buttons ||
                $.editable.types.defaults.buttons,
              content =
                $.editable.types[settings.type].content ||
                $.editable.types.defaults.content,
              element =
                $.editable.types[settings.type].element ||
                $.editable.types.defaults.element,
              reset =
                $.editable.types[settings.type].reset ||
                $.editable.types.defaults.reset,
              destroy =
                $.editable.types[settings.type].destroy ||
                $.editable.types.defaults.destroy,
              callback = settings.callback || function () {},
              intercept =
                settings.intercept ||
                function (s) {
                  return s
                },
              onedit = settings.onedit || function () {},
              onsubmit = settings.onsubmit || function () {},
              onreset = settings.onreset || function () {},
              onerror = settings.onerror || reset
            settings.before
            return (
              settings.tooltip && $(this).attr('title', settings.tooltip),
              this.each(function () {
                var self = this
                $(this).data('event.editable', settings.event),
                  $.trim($(this).html()) || $(this).html(settings.placeholder),
                  'destroy' !== target
                    ? ($(this).on(settings.event, function (e) {
                        if (
                          !0 !== $(this).data('disabled.editable') &&
                          9 !== e.which &&
                          !self.editing &&
                          !1 !== onedit.apply(this, [settings, self, e])
                        ) {
                          if (
                            settings.before &&
                            jQuery.isFunction(settings.before)
                          )
                            settings.before(e)
                          else if (
                            settings.before &&
                            !jQuery.isFunction(settings.before)
                          )
                            throw "The 'before' option needs to be provided as a function!"
                          e.preventDefault(),
                            e.stopPropagation(),
                            settings.tooltip && $(self).removeAttr('title'),
                            $(this)
                              .html()
                              .toLowerCase()
                              .replace(/(;|"|\/)/g, '') ===
                              settings.placeholder
                                .toLowerCase()
                                .replace(/(;|"|\/)/g, '') && $(this).html(''),
                            (self.editing = !0),
                            (self.revert = $(self).text()),
                            $(self).html('')
                          var form = $('<form />')
                          settings.cssclass &&
                            ('inherit' === settings.cssclass
                              ? form.attr('class', $(self).attr('class'))
                              : form.attr('class', settings.cssclass)),
                            settings.style &&
                              ('inherit' === settings.style
                                ? (form.attr('style', $(self).attr('style')),
                                  form.css('display', $(self).css('display')))
                                : form.attr('style', settings.style)),
                            settings.label &&
                              form.append(
                                '<label>' + settings.label + '</label>'
                              ),
                            settings.formid && form.attr('id', settings.formid)
                          var input_content,
                            t,
                            input = element.apply(form, [settings, self])
                          settings.inputcssclass &&
                            ('inherit' === settings.inputcssclass
                              ? input.attr('class', $(self).attr('class'))
                              : input.attr('class', settings.inputcssclass))
                          var isSubmitting = !1
                          if (settings.loadurl) {
                            ;(t = self.setTimeout(function () {
                              input.disabled = !0
                            }, 100)),
                              $(self).html(settings.loadtext)
                            var loaddata = {}
                            ;(loaddata[settings.id] = self.id),
                              $.isFunction(settings.loaddata)
                                ? $.extend(
                                    loaddata,
                                    settings.loaddata.apply(self, [
                                      self.revert,
                                      settings,
                                    ])
                                  )
                                : $.extend(loaddata, settings.loaddata),
                              $.ajax({
                                type: settings.loadtype,
                                url: settings.loadurl,
                                data: loaddata,
                                async: !1,
                                cache: !1,
                                success: function (result) {
                                  self.clearTimeout(t),
                                    (input_content = result),
                                    (input.disabled = !1)
                                },
                              })
                          } else
                            settings.data
                              ? ((input_content = settings.data),
                                $.isFunction(settings.data) &&
                                  (input_content = settings.data.apply(self, [
                                    self.revert,
                                    settings,
                                  ])))
                              : (input_content = self.revert)
                          if (
                            (content.apply(form, [
                              input_content,
                              settings,
                              self,
                            ]),
                            input.attr('name', settings.name),
                            'none' !== settings.width)
                          ) {
                            var adj_width =
                              settings.width -
                              (input.outerWidth(!0) - settings.width)
                            input.width(adj_width)
                          }
                          buttons.apply(form, [settings, self]),
                            settings.showfn &&
                              $.isFunction(settings.showfn) &&
                              form.hide(),
                            $(self).html(''),
                            $(self).append(form),
                            settings.showfn &&
                              $.isFunction(settings.showfn) &&
                              settings.showfn(form),
                            plugin.apply(form, [settings, self]),
                            form
                              .find(':input:visible:enabled:first')
                              .trigger('focus'),
                            settings.select && input.select(),
                            $(this).on('keydown', function (e) {
                              27 === e.which &&
                                (e.preventDefault(),
                                reset.apply(form, [settings, self]))
                            }),
                            'cancel' === settings.onblur
                              ? input.on('blur', function (e) {
                                  t = self.setTimeout(function () {
                                    reset.apply(form, [settings, self])
                                  }, 500)
                                })
                              : 'submit' === settings.onblur
                              ? input.on('blur', function (e) {
                                  t = self.setTimeout(function () {
                                    form.trigger('submit')
                                  }, 200)
                                })
                              : $.isFunction(settings.onblur) &&
                                input.on('blur', function (e) {
                                  !1 ===
                                    settings.onblur.apply(self, [
                                      input.val(),
                                      settings,
                                      form,
                                    ]) && reset.apply(form, [settings, self])
                                }),
                            form.on('submit', function (e) {
                              if (
                                (e.preventDefault(),
                                e.stopPropagation(),
                                isSubmitting)
                              )
                                return !1
                              if (
                                ((isSubmitting = !0),
                                t && self.clearTimeout(t),
                                (isSubmitting =
                                  !1 !==
                                  onsubmit.apply(form, [settings, self])) &&
                                  (isSubmitting =
                                    !1 !==
                                    submit.apply(form, [settings, self])))
                              )
                                if ($.isFunction(settings.target)) {
                                  var responseHandler = function (
                                      value,
                                      complete
                                    ) {
                                      ;(isSubmitting = !1),
                                        !1 !== complete &&
                                          ($(self).html(value),
                                          (self.editing = !1),
                                          callback.apply(self, [
                                            self.innerHTML,
                                            settings,
                                          ]),
                                          $.trim($(self).html()) ||
                                            $(self).html(settings.placeholder))
                                    },
                                    userTarget = settings.target.apply(self, [
                                      input.val(),
                                      settings,
                                      responseHandler,
                                    ])
                                  !1 !== userTarget &&
                                    void 0 !== userTarget &&
                                    responseHandler(userTarget, userTarget)
                                } else {
                                  var submitdata = {}
                                  ;(submitdata[settings.name] = input.val()),
                                    (submitdata[settings.id] = self.id),
                                    $.isFunction(settings.submitdata)
                                      ? $.extend(
                                          submitdata,
                                          settings.submitdata.apply(self, [
                                            self.revert,
                                            settings,
                                            submitdata,
                                          ])
                                        )
                                      : $.extend(
                                          submitdata,
                                          settings.submitdata
                                        ),
                                    'PUT' === settings.method &&
                                      (submitdata._method = 'put'),
                                    $(self).html(settings.indicator)
                                  var ajaxoptions = {
                                    type: 'POST',
                                    complete: function (xhr, status) {
                                      isSubmitting = !1
                                    },
                                    data: submitdata,
                                    dataType: 'html',
                                    url: settings.target,
                                    success: function (result, status) {
                                      ;(result = intercept.apply(self, [
                                        result,
                                        status,
                                      ])),
                                        'html' === ajaxoptions.dataType &&
                                          $(self).html(result),
                                        (self.editing = !1),
                                        callback.apply(self, [
                                          result,
                                          settings,
                                          submitdata,
                                        ]),
                                        $.trim($(self).html()) ||
                                          $(self).html(settings.placeholder)
                                    },
                                    error: function (xhr, status, error) {
                                      onerror.apply(form, [settings, self, xhr])
                                    },
                                  }
                                  $.extend(ajaxoptions, settings.ajaxoptions),
                                    $.ajax(ajaxoptions)
                                }
                              return $(self).attr('title', settings.tooltip), !1
                            })
                        }
                      }),
                      (self.reset = function (form) {
                        self.editing &&
                          !1 !== onreset.apply(form, [settings, self]) &&
                          ($(self).text(self.revert),
                          (self.editing = !1),
                          $.trim($(self).html()) ||
                            $(self).html(settings.placeholder),
                          settings.tooltip &&
                            $(self).attr('title', settings.tooltip))
                      }),
                      (self.destroy = function (form) {
                        $(self)
                          .off($(self).data('event.editable'))
                          .removeData('disabled.editable')
                          .removeData('event.editable'),
                          self.clearTimeouts(),
                          self.editing && reset.apply(form, [settings, self])
                      }),
                      (self.clearTimeout = function (t) {
                        var timeouts = $(self).data('timeouts')
                        if ((clearTimeout(t), timeouts)) {
                          var i = timeouts.indexOf(t)
                          i > -1
                            ? (timeouts.splice(i, 1),
                              timeouts.length <= 0 &&
                                $(self).removeData('timeouts'))
                            : console.warn(
                                'jeditable clearTimeout could not find timeout ' +
                                  t
                              )
                        }
                      }),
                      (self.clearTimeouts = function () {
                        var timeouts = $(self).data('timeouts')
                        if (timeouts) {
                          for (var i = 0, n = timeouts.length; i < n; ++i)
                            clearTimeout(timeouts[i])
                          ;(timeouts.length = 0), $(self).removeData('timeouts')
                        }
                      }),
                      (self.setTimeout = function (callback, time) {
                        var timeouts = $(self).data('timeouts'),
                          t = setTimeout(function () {
                            callback(), self.clearTimeout(t)
                          }, time)
                        return (
                          timeouts ||
                            ((timeouts = []),
                            $(self).data('timeouts', timeouts)),
                          timeouts.push(t),
                          t
                        )
                      }))
                    : destroy.apply($(this).find('form'), [settings, self])
              })
            )
          }
          $(this)
            .off($(this).data('event.editable'))
            .removeData('disabled.editable')
            .removeData('event.editable')
        } else $(this).data('disabled.editable', !1)
      else $(this).data('disabled.editable', !0)
    })
  var _supportInType = function (type) {
    var i = document.createElement('input')
    return i.setAttribute('type', type), 'text' !== i.type ? type : 'text'
  }
  ;($.editable = {
    types: {
      defaults: {
        element: function (settings, original) {
          var input = $('<input type="hidden"></input>')
          return $(this).append(input), input
        },
        content: function (string, settings, original) {
          $(this).find(':input:first').val(string)
        },
        reset: function (settings, original) {
          original.reset(this)
        },
        destroy: function (settings, original) {
          original.destroy(this)
        },
        buttons: function (settings, original) {
          var submit,
            cancel,
            form = this
          ;(settings.submit &&
            (settings.submit.match(/>$/)
              ? (submit = $(settings.submit).on('click', function () {
                  'submit' !== submit.attr('type') && form.trigger('submit')
                }))
              : ((submit = $('<button type="submit" />')).html(settings.submit),
                settings.submitcssclass &&
                  submit.addClass(settings.submitcssclass)),
            $(this).append(submit)),
          settings.cancel) &&
            (settings.cancel.match(/>$/)
              ? (cancel = $(settings.cancel))
              : ((cancel = $('<button type="cancel" />')).html(settings.cancel),
                settings.cancelcssclass &&
                  cancel.addClass(settings.cancelcssclass)),
            $(this).append(cancel),
            $(cancel).on('click', function (event) {
              return (
                ($.isFunction($.editable.types[settings.type].reset)
                  ? $.editable.types[settings.type].reset
                  : $.editable.types.defaults.reset
                ).apply(form, [settings, original]),
                !1
              )
            }))
        },
      },
      text: {
        element: function (settings, original) {
          var input = $('<input />').attr({
            autocomplete: 'off',
            list: settings.list,
            maxlength: settings.maxlength,
            pattern: settings.pattern,
            placeholder: settings.placeholder,
            tooltip: settings.tooltip,
            type: 'text',
          })
          return (
            'none' !== settings.width && input.css('width', settings.width),
            'none' !== settings.height && input.css('height', settings.height),
            settings.size && input.attr('size', settings.size),
            settings.maxlength && input.attr('maxlength', settings.maxlength),
            $(this).append(input),
            input
          )
        },
      },
      textarea: {
        element: function (settings, original) {
          var textarea = $('<textarea></textarea>')
          return (
            settings.rows
              ? textarea.attr('rows', settings.rows)
              : 'none' !== settings.height && textarea.height(settings.height),
            settings.cols
              ? textarea.attr('cols', settings.cols)
              : 'none' !== settings.width && textarea.width(settings.width),
            settings.maxlength &&
              textarea.attr('maxlength', settings.maxlength),
            $(this).append(textarea),
            textarea
          )
        },
      },
      select: {
        element: function (settings, original) {
          var select = $('<select />')
          return (
            settings.multiple && select.attr('multiple', 'multiple'),
            $(this).append(select),
            select
          )
        },
        content: function (data, settings, original) {
          var json
          json = String === data.constructor ? JSON.parse(data) : data
          var key,
            option,
            tuples = []
          if (Array.isArray(json) && json.every(Array.isArray))
            (tuples = json),
              (json = {}),
              tuples.forEach(function (e) {
                json[e[0]] = e[1]
              })
          else for (key in json) tuples.push([key, json[key]])
          settings.sortselectoptions &&
            tuples.sort(function (a, b) {
              return (a = a[1]) < (b = b[1]) ? -1 : a > b ? 1 : 0
            })
          for (var i = 0; i < tuples.length; i++) {
            key = tuples[i][0]
            var value = tuples[i][1]
            json.hasOwnProperty(key) &&
              'selected' !== key &&
              ((option = $('<option />').val(key).append(value)),
              (json.selected !== key && key !== $.trim(original.revert)) ||
                $(option).prop('selected', 'selected'),
              $(this).find('select').append(option))
          }
          if (!settings.submit) {
            var form = this
            $(this)
              .find('select')
              .change(function () {
                form.trigger('submit')
              })
          }
        },
      },
      number: {
        element: function (settings, original) {
          var input = $('<input />').attr({
            maxlength: settings.maxlength,
            placeholder: settings.placeholder,
            min: settings.min,
            max: settings.max,
            step: settings.step,
            tooltip: settings.tooltip,
            type: _supportInType('number'),
          })
          return (
            'none' !== settings.width && input.css('width', settings.width),
            $(this).append(input),
            input
          )
        },
      },
      email: {
        element: function (settings, original) {
          var input = $('<input />').attr({
            maxlength: settings.maxlength,
            placeholder: settings.placeholder,
            tooltip: settings.tooltip,
            type: _supportInType('email'),
          })
          return (
            'none' !== settings.width && input.css('width', settings.width),
            $(this).append(input),
            input
          )
        },
      },
      url: {
        element: function (settings, original) {
          var input = $('<input />').attr({
            maxlength: settings.maxlength,
            pattern: settings.pattern,
            placeholder: settings.placeholder,
            tooltip: settings.tooltip,
            type: _supportInType('url'),
          })
          return (
            'none' !== settings.width && input.css('width', settings.width),
            $(this).append(input),
            input
          )
        },
      },
    },
    addInputType: function (name, input) {
      $.editable.types[name] = input
    },
  }),
    ($.fn.editable.defaults = {
      name: 'value',
      id: 'id',
      type: 'text',
      width: 'auto',
      height: 'auto',
      event: 'click.editable keydown.editable',
      onblur: 'cancel',
      tooltip: 'Click to edit',
      loadtype: 'GET',
      loadtext: 'Loading...',
      sortselectoptions: !1,
      loaddata: {},
      submitdata: {},
      ajaxoptions: {},
    })
})(jQuery)

// ==================================================
// fancyBox v3.5.7
// ==================================================
!(function (t, e, n, o) {
  'use strict'
  function i(t, e) {
    var o,
      i,
      a,
      s = [],
      r = 0
    ;(t && t.isDefaultPrevented()) ||
      (t.preventDefault(),
      (e = e || {}),
      t && t.data && (e = h(t.data.options, e)),
      (o = e.$target || n(t.currentTarget).trigger('blur')),
      ((a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o)) ||
        (e.selector
          ? (s = n(e.selector))
          : ((i = o.attr('data-fancybox') || ''),
            i
              ? ((s = t.data ? t.data.items : []),
                (s = s.length
                  ? s.filter('[data-fancybox="' + i + '"]')
                  : n('[data-fancybox="' + i + '"]')))
              : (s = [o])),
        (r = n(s).index(o)),
        r < 0 && (r = 0),
        (a = n.fancybox.open(s, e, r)),
        (a.$trigger = o)))
  }
  if (((t.console = t.console || { info: function (t) {} }), n)) {
    if (n.fn.fancybox) return void console.info('fancyBox already initialized')
    var a = {
        closeExisting: !1,
        loop: !1,
        gutter: 50,
        keyboard: !0,
        preventCaptionOverlap: !0,
        arrows: !0,
        infobar: !0,
        smallBtn: 'auto',
        toolbar: 'auto',
        buttons: ['zoom', 'slideShow', 'thumbs', 'close'],
        idleTime: 3,
        protect: !1,
        modal: !1,
        image: { preload: !1 },
        ajax: { settings: { data: { fancybox: !0 } } },
        iframe: {
          tpl:
            '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
          preload: !0,
          css: {},
          attr: { scrolling: 'auto' },
        },
        video: {
          tpl:
            '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
          format: '',
          autoStart: !0,
        },
        defaultType: 'image',
        animationEffect: 'zoom',
        animationDuration: 366,
        zoomOpacity: 'auto',
        transitionEffect: 'fade',
        transitionDuration: 366,
        slideClass: '',
        baseClass: '',
        baseTpl:
          '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
        btnTpl: {
          download:
            '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
          zoom:
            '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
          close:
            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
          arrowLeft:
            '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
          arrowRight:
            '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
          smallBtn:
            '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
        },
        parentEl: 'body',
        hideScrollbar: !0,
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: { autoStart: !1 },
        touch: { vertical: !0, momentum: !0 },
        hash: null,
        media: {},
        slideShow: { autoStart: !1, speed: 3e3 },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: '.fancybox-container',
          axis: 'y',
        },
        wheel: 'auto',
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function (t, e) {
          return 'image' === t.type && 'zoom'
        },
        clickSlide: 'close',
        clickOutside: 'close',
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          preventCaptionOverlap: !1,
          idleTime: !1,
          clickContent: function (t, e) {
            return 'image' === t.type && 'toggleControls'
          },
          clickSlide: function (t, e) {
            return 'image' === t.type ? 'toggleControls' : 'close'
          },
          dblclickContent: function (t, e) {
            return 'image' === t.type && 'zoom'
          },
          dblclickSlide: function (t, e) {
            return 'image' === t.type && 'zoom'
          },
        },
        lang: 'en',
        i18n: {
          en: {
            CLOSE: 'Close',
            NEXT: 'Next',
            PREV: 'Previous',
            ERROR:
              'The requested content cannot be loaded. <br/> Please try again later.',
            PLAY_START: 'Start slideshow',
            PLAY_STOP: 'Pause slideshow',
            FULL_SCREEN: 'Full screen',
            THUMBS: 'Thumbnails',
            DOWNLOAD: 'Download',
            SHARE: 'Share',
            ZOOM: 'Zoom',
          },
          de: {
            CLOSE: 'Schlie&szlig;en',
            NEXT: 'Weiter',
            PREV: 'Zur&uuml;ck',
            ERROR:
              'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.',
            PLAY_START: 'Diaschau starten',
            PLAY_STOP: 'Diaschau beenden',
            FULL_SCREEN: 'Vollbild',
            THUMBS: 'Vorschaubilder',
            DOWNLOAD: 'Herunterladen',
            SHARE: 'Teilen',
            ZOOM: 'Vergr&ouml;&szlig;ern',
          },
        },
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function (t) {
        return t && t.hasOwnProperty && t instanceof n
      },
      d = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60)
          }
        )
      })(),
      u = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e)
          }
        )
      })(),
      f = (function () {
        var t,
          n = e.createElement('fakeelement'),
          o = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd',
          }
        for (t in o) if (void 0 !== n.style[t]) return o[t]
        return 'transitionend'
      })(),
      p = function (t) {
        return t && t.length && t[0].offsetHeight
      },
      h = function (t, e) {
        var o = n.extend(!0, {}, t, e)
        return (
          n.each(e, function (t, e) {
            n.isArray(e) && (o[t] = e)
          }),
          o
        )
      },
      g = function (t) {
        var o, i
        return (
          !(!t || t.ownerDocument !== e) &&
          (n('.fancybox-container').css('pointer-events', 'none'),
          (o = {
            x: t.getBoundingClientRect().left + t.offsetWidth / 2,
            y: t.getBoundingClientRect().top + t.offsetHeight / 2,
          }),
          (i = e.elementFromPoint(o.x, o.y) === t),
          n('.fancybox-container').css('pointer-events', ''),
          i)
        )
      },
      b = function (t, e, o) {
        var i = this
        ;(i.opts = h({ index: o }, n.fancybox.defaults)),
          n.isPlainObject(e) && (i.opts = h(i.opts, e)),
          n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)),
          (i.id = i.opts.id || ++c),
          (i.currIndex = parseInt(i.opts.index, 10) || 0),
          (i.prevIndex = null),
          (i.prevPos = null),
          (i.currPos = 0),
          (i.firstRun = !0),
          (i.group = []),
          (i.slides = {}),
          i.addContent(t),
          i.group.length && i.init()
      }
    n.extend(b.prototype, {
      init: function () {
        var o,
          i,
          a = this,
          s = a.group[a.currIndex],
          r = s.opts
        r.closeExisting && n.fancybox.close(!0),
          n('body').addClass('fancybox-active'),
          !n.fancybox.getInstance() &&
            !1 !== r.hideScrollbar &&
            !n.fancybox.isMobile &&
            e.body.scrollHeight > t.innerHeight &&
            (n('head').append(
              '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
                (t.innerWidth - e.documentElement.clientWidth) +
                'px;}</style>'
            ),
            n('body').addClass('compensate-for-scrollbar')),
          (i = ''),
          n.each(r.buttons, function (t, e) {
            i += r.btnTpl[e] || ''
          }),
          (o = n(
            a.translate(
              a,
              r.baseTpl
                .replace('{{buttons}}', i)
                .replace('{{arrows}}', r.btnTpl.arrowLeft + r.btnTpl.arrowRight)
            )
          )
            .attr('id', 'fancybox-container-' + a.id)
            .addClass(r.baseClass)
            .data('FancyBox', a)
            .appendTo(r.parentEl)),
          (a.$refs = { container: o }),
          [
            'bg',
            'inner',
            'infobar',
            'toolbar',
            'stage',
            'caption',
            'navigation',
          ].forEach(function (t) {
            a.$refs[t] = o.find('.fancybox-' + t)
          }),
          a.trigger('onInit'),
          a.activate(),
          a.jumpTo(a.currIndex)
      },
      translate: function (t, e) {
        var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en
        return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
          return void 0 === n[e] ? t : n[e]
        })
      },
      addContent: function (t) {
        var e,
          o = this,
          i = n.makeArray(t)
        n.each(i, function (t, e) {
          var i,
            a,
            s,
            r,
            c,
            l = {},
            d = {}
          n.isPlainObject(e)
            ? ((l = e), (d = e.opts || e))
            : 'object' === n.type(e) && n(e).length
            ? ((i = n(e)),
              (d = i.data() || {}),
              (d = n.extend(!0, {}, d, d.options)),
              (d.$orig = i),
              (l.src = o.opts.src || d.src || i.attr('href')),
              l.type || l.src || ((l.type = 'inline'), (l.src = e)))
            : (l = { type: 'html', src: e + '' }),
            (l.opts = n.extend(!0, {}, o.opts, d)),
            n.isArray(d.buttons) && (l.opts.buttons = d.buttons),
            n.fancybox.isMobile &&
              l.opts.mobile &&
              (l.opts = h(l.opts, l.opts.mobile)),
            (a = l.type || l.opts.type),
            (r = l.src || ''),
            !a &&
              r &&
              ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                ? ((a = 'video'),
                  l.opts.video.format ||
                    (l.opts.video.format =
                      'video/' + ('ogv' === s[1] ? 'ogg' : s[1])))
                : r.match(
                    /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                  )
                ? (a = 'image')
                : r.match(/\.(pdf)((\?|#).*)?$/i)
                ? ((a = 'iframe'),
                  (l = n.extend(!0, l, {
                    contentType: 'pdf',
                    opts: { iframe: { preload: !1 } },
                  })))
                : '#' === r.charAt(0) && (a = 'inline')),
            a ? (l.type = a) : o.trigger('objectNeedsType', l),
            l.contentType ||
              (l.contentType =
                n.inArray(l.type, ['html', 'inline', 'ajax']) > -1
                  ? 'html'
                  : l.type),
            (l.index = o.group.length),
            'auto' == l.opts.smallBtn &&
              (l.opts.smallBtn =
                n.inArray(l.type, ['html', 'inline', 'ajax']) > -1),
            'auto' === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn),
            (l.$thumb = l.opts.$thumb || null),
            l.opts.$trigger &&
              l.index === o.opts.index &&
              ((l.$thumb = l.opts.$trigger.find('img:first')),
              l.$thumb.length && (l.opts.$orig = l.opts.$trigger)),
            (l.$thumb && l.$thumb.length) ||
              !l.opts.$orig ||
              (l.$thumb = l.opts.$orig.find('img:first')),
            l.$thumb && !l.$thumb.length && (l.$thumb = null),
            (l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null)),
            'function' === n.type(l.opts.caption) &&
              (l.opts.caption = l.opts.caption.apply(e, [o, l])),
            'function' === n.type(o.opts.caption) &&
              (l.opts.caption = o.opts.caption.apply(e, [o, l])),
            l.opts.caption instanceof n ||
              (l.opts.caption =
                void 0 === l.opts.caption ? '' : l.opts.caption + ''),
            'ajax' === l.type &&
              ((c = r.split(/\s+/, 2)),
              c.length > 1 &&
                ((l.src = c.shift()), (l.opts.filter = c.shift()))),
            l.opts.modal &&
              (l.opts = n.extend(!0, l.opts, {
                trapFocus: !0,
                infobar: 0,
                toolbar: 0,
                smallBtn: 0,
                keyboard: 0,
                slideShow: 0,
                fullScreen: 0,
                thumbs: 0,
                touch: 0,
                clickContent: !1,
                clickSlide: !1,
                clickOutside: !1,
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
              })),
            o.group.push(l)
        }),
          Object.keys(o.slides).length &&
            (o.updateControls(),
            (e = o.Thumbs) && e.isActive && (e.create(), e.focus()))
      },
      addEvents: function () {
        var e = this
        e.removeEvents(),
          e.$refs.container
            .on('click.fb-close', '[data-fancybox-close]', function (t) {
              t.stopPropagation(), t.preventDefault(), e.close(t)
            })
            .on(
              'touchstart.fb-prev click.fb-prev',
              '[data-fancybox-prev]',
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.previous()
              }
            )
            .on(
              'touchstart.fb-next click.fb-next',
              '[data-fancybox-next]',
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.next()
              }
            )
            .on('click.fb', '[data-fancybox-zoom]', function (t) {
              e[e.isScaledDown() ? 'scaleToActual' : 'scaleToFit']()
            }),
          s.on('orientationchange.fb resize.fb', function (t) {
            t && t.originalEvent && 'resize' === t.originalEvent.type
              ? (e.requestId && u(e.requestId),
                (e.requestId = d(function () {
                  e.update(t)
                })))
              : (e.current &&
                  'iframe' === e.current.type &&
                  e.$refs.stage.hide(),
                setTimeout(
                  function () {
                    e.$refs.stage.show(), e.update(t)
                  },
                  n.fancybox.isMobile ? 600 : 250
                ))
          }),
          r.on('keydown.fb', function (t) {
            var o = n.fancybox ? n.fancybox.getInstance() : null,
              i = o.current,
              a = t.keyCode || t.which
            if (9 == a) return void (i.opts.trapFocus && e.focus(t))
            if (
              !(
                !i.opts.keyboard ||
                t.ctrlKey ||
                t.altKey ||
                t.shiftKey ||
                n(t.target).is('input,textarea,video,audio,select')
              )
            )
              return 8 === a || 27 === a
                ? (t.preventDefault(), void e.close(t))
                : 37 === a || 38 === a
                ? (t.preventDefault(), void e.previous())
                : 39 === a || 40 === a
                ? (t.preventDefault(), void e.next())
                : void e.trigger('afterKeydown', t, a)
          }),
          e.group[e.currIndex].opts.idleTime &&
            ((e.idleSecondsCounter = 0),
            r.on(
              'mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle',
              function (t) {
                ;(e.idleSecondsCounter = 0),
                  e.isIdle && e.showControls(),
                  (e.isIdle = !1)
              }
            ),
            (e.idleInterval = t.setInterval(function () {
              ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime &&
                !e.isDragging &&
                ((e.isIdle = !0), (e.idleSecondsCounter = 0), e.hideControls())
            }, 1e3)))
      },
      removeEvents: function () {
        var e = this
        s.off('orientationchange.fb resize.fb'),
          r.off('keydown.fb .fb-idle'),
          this.$refs.container.off('.fb-close .fb-prev .fb-next'),
          e.idleInterval &&
            (t.clearInterval(e.idleInterval), (e.idleInterval = null))
      },
      previous: function (t) {
        return this.jumpTo(this.currPos - 1, t)
      },
      next: function (t) {
        return this.jumpTo(this.currPos + 1, t)
      },
      jumpTo: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          d,
          u,
          f = this,
          h = f.group.length
        if (!(f.isDragging || f.isClosing || (f.isAnimating && f.firstRun))) {
          if (
            ((t = parseInt(t, 10)),
            !(a = f.current ? f.current.opts.loop : f.opts.loop) &&
              (t < 0 || t >= h))
          )
            return !1
          if (
            ((o = f.firstRun = !Object.keys(f.slides).length),
            (r = f.current),
            (f.prevIndex = f.currIndex),
            (f.prevPos = f.currPos),
            (s = f.createSlide(t)),
            h > 1 &&
              ((a || s.index < h - 1) && f.createSlide(t + 1),
              (a || s.index > 0) && f.createSlide(t - 1)),
            (f.current = s),
            (f.currIndex = s.index),
            (f.currPos = s.pos),
            f.trigger('beforeShow', o),
            f.updateControls(),
            (s.forcedDuration = void 0),
            n.isNumeric(e)
              ? (s.forcedDuration = e)
              : (e = s.opts[o ? 'animationDuration' : 'transitionDuration']),
            (e = parseInt(e, 10)),
            (i = f.isMoved(s)),
            s.$slide.addClass('fancybox-slide--current'),
            o)
          )
            return (
              s.opts.animationEffect &&
                e &&
                f.$refs.container.css('transition-duration', e + 'ms'),
              f.$refs.container.addClass('fancybox-is-open').trigger('focus'),
              f.loadSlide(s),
              void f.preload('image')
            )
          ;(c = n.fancybox.getTranslate(r.$slide)),
            (l = n.fancybox.getTranslate(f.$refs.stage)),
            n.each(f.slides, function (t, e) {
              n.fancybox.stop(e.$slide, !0)
            }),
            r.pos !== s.pos && (r.isComplete = !1),
            r.$slide.removeClass(
              'fancybox-slide--complete fancybox-slide--current'
            ),
            i
              ? ((u = c.left - (r.pos * c.width + r.pos * r.opts.gutter)),
                n.each(f.slides, function (t, o) {
                  o.$slide
                    .removeClass('fancybox-animated')
                    .removeClass(function (t, e) {
                      return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(' ')
                    })
                  var i = o.pos * c.width + o.pos * o.opts.gutter
                  n.fancybox.setTranslate(o.$slide, {
                    top: 0,
                    left: i - l.left + u,
                  }),
                    o.pos !== s.pos &&
                      o.$slide.addClass(
                        'fancybox-slide--' +
                          (o.pos > s.pos ? 'next' : 'previous')
                      ),
                    p(o.$slide),
                    n.fancybox.animate(
                      o.$slide,
                      {
                        top: 0,
                        left:
                          (o.pos - s.pos) * c.width +
                          (o.pos - s.pos) * o.opts.gutter,
                      },
                      e,
                      function () {
                        o.$slide
                          .css({ transform: '', opacity: '' })
                          .removeClass(
                            'fancybox-slide--next fancybox-slide--previous'
                          ),
                          o.pos === f.currPos && f.complete()
                      }
                    )
                }))
              : e &&
                s.opts.transitionEffect &&
                ((d =
                  'fancybox-animated fancybox-fx-' + s.opts.transitionEffect),
                r.$slide.addClass(
                  'fancybox-slide--' + (r.pos > s.pos ? 'next' : 'previous')
                ),
                n.fancybox.animate(
                  r.$slide,
                  d,
                  e,
                  function () {
                    r.$slide
                      .removeClass(d)
                      .removeClass(
                        'fancybox-slide--next fancybox-slide--previous'
                      )
                  },
                  !1
                )),
            s.isLoaded ? f.revealContent(s) : f.loadSlide(s),
            f.preload('image')
        }
      },
      createSlide: function (t) {
        var e,
          o,
          i = this
        return (
          (o = t % i.group.length),
          (o = o < 0 ? i.group.length + o : o),
          !i.slides[t] &&
            i.group[o] &&
            ((e = n('<div class="fancybox-slide"></div>').appendTo(
              i.$refs.stage
            )),
            (i.slides[t] = n.extend(!0, {}, i.group[o], {
              pos: t,
              $slide: e,
              isLoaded: !1,
            })),
            i.updateSlide(i.slides[t])),
          i.slides[t]
        )
      },
      scaleToActual: function (t, e, o) {
        var i,
          a,
          s,
          r,
          c,
          l = this,
          d = l.current,
          u = d.$content,
          f = n.fancybox.getTranslate(d.$slide).width,
          p = n.fancybox.getTranslate(d.$slide).height,
          h = d.width,
          g = d.height
        l.isAnimating ||
          l.isMoved() ||
          !u ||
          'image' != d.type ||
          !d.isLoaded ||
          d.hasError ||
          ((l.isAnimating = !0),
          n.fancybox.stop(u),
          (t = void 0 === t ? 0.5 * f : t),
          (e = void 0 === e ? 0.5 * p : e),
          (i = n.fancybox.getTranslate(u)),
          (i.top -= n.fancybox.getTranslate(d.$slide).top),
          (i.left -= n.fancybox.getTranslate(d.$slide).left),
          (r = h / i.width),
          (c = g / i.height),
          (a = 0.5 * f - 0.5 * h),
          (s = 0.5 * p - 0.5 * g),
          h > f &&
            ((a = i.left * r - (t * r - t)),
            a > 0 && (a = 0),
            a < f - h && (a = f - h)),
          g > p &&
            ((s = i.top * c - (e * c - e)),
            s > 0 && (s = 0),
            s < p - g && (s = p - g)),
          l.updateCursor(h, g),
          n.fancybox.animate(
            u,
            { top: s, left: a, scaleX: r, scaleY: c },
            o || 366,
            function () {
              l.isAnimating = !1
            }
          ),
          l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
      },
      scaleToFit: function (t) {
        var e,
          o = this,
          i = o.current,
          a = i.$content
        o.isAnimating ||
          o.isMoved() ||
          !a ||
          'image' != i.type ||
          !i.isLoaded ||
          i.hasError ||
          ((o.isAnimating = !0),
          n.fancybox.stop(a),
          (e = o.getFitPos(i)),
          o.updateCursor(e.width, e.height),
          n.fancybox.animate(
            a,
            {
              top: e.top,
              left: e.left,
              scaleX: e.width / a.width(),
              scaleY: e.height / a.height(),
            },
            t || 366,
            function () {
              o.isAnimating = !1
            }
          ))
      },
      getFitPos: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$content,
          c = t.$slide,
          l = t.width || t.opts.width,
          d = t.height || t.opts.height,
          u = {}
        return (
          !!(t.isLoaded && r && r.length) &&
          ((e = n.fancybox.getTranslate(s.$refs.stage).width),
          (o = n.fancybox.getTranslate(s.$refs.stage).height),
          (e -=
            parseFloat(c.css('paddingLeft')) +
            parseFloat(c.css('paddingRight')) +
            parseFloat(r.css('marginLeft')) +
            parseFloat(r.css('marginRight'))),
          (o -=
            parseFloat(c.css('paddingTop')) +
            parseFloat(c.css('paddingBottom')) +
            parseFloat(r.css('marginTop')) +
            parseFloat(r.css('marginBottom'))),
          (l && d) || ((l = e), (d = o)),
          (i = Math.min(1, e / l, o / d)),
          (l *= i),
          (d *= i),
          l > e - 0.5 && (l = e),
          d > o - 0.5 && (d = o),
          'image' === t.type
            ? ((u.top =
                Math.floor(0.5 * (o - d)) + parseFloat(c.css('paddingTop'))),
              (u.left =
                Math.floor(0.5 * (e - l)) + parseFloat(c.css('paddingLeft'))))
            : 'video' === t.contentType &&
              ((a =
                t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9),
              d > l / a ? (d = l / a) : l > d * a && (l = d * a)),
          (u.width = l),
          (u.height = d),
          u)
        )
      },
      update: function (t) {
        var e = this
        n.each(e.slides, function (n, o) {
          e.updateSlide(o, t)
        })
      },
      updateSlide: function (t, e) {
        var o = this,
          i = t && t.$content,
          a = t.width || t.opts.width,
          s = t.height || t.opts.height,
          r = t.$slide
        o.adjustCaption(t),
          i &&
            (a || s || 'video' === t.contentType) &&
            !t.hasError &&
            (n.fancybox.stop(i),
            n.fancybox.setTranslate(i, o.getFitPos(t)),
            t.pos === o.currPos && ((o.isAnimating = !1), o.updateCursor())),
          o.adjustLayout(t),
          r.length &&
            (r.trigger('refresh'),
            t.pos === o.currPos &&
              o.$refs.toolbar
                .add(o.$refs.navigation.find('.fancybox-button--arrow_right'))
                .toggleClass(
                  'compensate-for-scrollbar',
                  r.get(0).scrollHeight > r.get(0).clientHeight
                )),
          o.trigger('onUpdate', t, e)
      },
      centerSlide: function (t) {
        var e = this,
          o = e.current,
          i = o.$slide
        !e.isClosing &&
          o &&
          (i.siblings().css({ transform: '', opacity: '' }),
          i
            .parent()
            .children()
            .removeClass('fancybox-slide--previous fancybox-slide--next'),
          n.fancybox.animate(
            i,
            { top: 0, left: 0, opacity: 1 },
            void 0 === t ? 0 : t,
            function () {
              i.css({ transform: '', opacity: '' }),
                o.isComplete || e.complete()
            },
            !1
          ))
      },
      isMoved: function (t) {
        var e,
          o,
          i = t || this.current
        return (
          !!i &&
          ((o = n.fancybox.getTranslate(this.$refs.stage)),
          (e = n.fancybox.getTranslate(i.$slide)),
          !i.$slide.hasClass('fancybox-animated') &&
            (Math.abs(e.top - o.top) > 0.5 || Math.abs(e.left - o.left) > 0.5))
        )
      },
      updateCursor: function (t, e) {
        var o,
          i,
          a = this,
          s = a.current,
          r = a.$refs.container
        s &&
          !a.isClosing &&
          a.Guestures &&
          (r.removeClass(
            'fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan'
          ),
          (o = a.canPan(t, e)),
          (i = !!o || a.isZoomable()),
          r.toggleClass('fancybox-is-zoomable', i),
          n('[data-fancybox-zoom]').prop('disabled', !i),
          o
            ? r.addClass('fancybox-can-pan')
            : i &&
              ('zoom' === s.opts.clickContent ||
                (n.isFunction(s.opts.clickContent) &&
                  'zoom' == s.opts.clickContent(s)))
            ? r.addClass('fancybox-can-zoomIn')
            : s.opts.touch &&
              (s.opts.touch.vertical || a.group.length > 1) &&
              'video' !== s.contentType &&
              r.addClass('fancybox-can-swipe'))
      },
      isZoomable: function () {
        var t,
          e = this,
          n = e.current
        if (n && !e.isClosing && 'image' === n.type && !n.hasError) {
          if (!n.isLoaded) return !0
          if (
            (t = e.getFitPos(n)) &&
            (n.width > t.width || n.height > t.height)
          )
            return !0
        }
        return !1
      },
      isScaledDown: function (t, e) {
        var o = this,
          i = !1,
          a = o.current,
          s = a.$content
        return (
          void 0 !== t && void 0 !== e
            ? (i = t < a.width && e < a.height)
            : s &&
              ((i = n.fancybox.getTranslate(s)),
              (i = i.width < a.width && i.height < a.height)),
          i
        )
      },
      canPan: function (t, e) {
        var o = this,
          i = o.current,
          a = null,
          s = !1
        return (
          'image' === i.type &&
            (i.isComplete || (t && e)) &&
            !i.hasError &&
            ((s = o.getFitPos(i)),
            void 0 !== t && void 0 !== e
              ? (a = { width: t, height: e })
              : i.isComplete && (a = n.fancybox.getTranslate(i.$content)),
            a &&
              s &&
              (s =
                Math.abs(a.width - s.width) > 1.5 ||
                Math.abs(a.height - s.height) > 1.5)),
          s
        )
      },
      loadSlide: function (t) {
        var e,
          o,
          i,
          a = this
        if (!t.isLoading && !t.isLoaded) {
          if (((t.isLoading = !0), !1 === a.trigger('beforeLoad', t)))
            return (t.isLoading = !1), !1
          switch (
            ((e = t.type),
            (o = t.$slide),
            o.off('refresh').trigger('onReset').addClass(t.opts.slideClass),
            e)
          ) {
            case 'image':
              a.setImage(t)
              break
            case 'iframe':
              a.setIframe(t)
              break
            case 'html':
              a.setContent(t, t.src || t.content)
              break
            case 'video':
              a.setContent(
                t,
                t.opts.video.tpl
                  .replace(/\{\{src\}\}/gi, t.src)
                  .replace(
                    '{{format}}',
                    t.opts.videoFormat || t.opts.video.format || ''
                  )
                  .replace('{{poster}}', t.thumb || '')
              )
              break
            case 'inline':
              n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t)
              break
            case 'ajax':
              a.showLoading(t),
                (i = n.ajax(
                  n.extend({}, t.opts.ajax.settings, {
                    url: t.src,
                    success: function (e, n) {
                      'success' === n && a.setContent(t, e)
                    },
                    error: function (e, n) {
                      e && 'abort' !== n && a.setError(t)
                    },
                  })
                )),
                o.one('onReset', function () {
                  i.abort()
                })
              break
            default:
              a.setError(t)
          }
          return !0
        }
      },
      setImage: function (t) {
        var o,
          i = this
        setTimeout(function () {
          var e = t.$image
          i.isClosing ||
            !t.isLoading ||
            (e && e.length && e[0].complete) ||
            t.hasError ||
            i.showLoading(t)
        }, 50),
          i.checkSrcset(t),
          (t.$content = n('<div class="fancybox-content"></div>')
            .addClass('fancybox-is-hidden')
            .appendTo(t.$slide.addClass('fancybox-slide--image'))),
          !1 !== t.opts.preload &&
            t.opts.width &&
            t.opts.height &&
            t.thumb &&
            ((t.width = t.opts.width),
            (t.height = t.opts.height),
            (o = e.createElement('img')),
            (o.onerror = function () {
              n(this).remove(), (t.$ghost = null)
            }),
            (o.onload = function () {
              i.afterLoad(t)
            }),
            (t.$ghost = n(o)
              .addClass('fancybox-image')
              .appendTo(t.$content)
              .attr('src', t.thumb))),
          i.setBigImage(t)
      },
      checkSrcset: function (e) {
        var n,
          o,
          i,
          a,
          s = e.opts.srcset || e.opts.image.srcset
        if (s) {
          ;(i = t.devicePixelRatio || 1),
            (a = t.innerWidth * i),
            (o = s.split(',').map(function (t) {
              var e = {}
              return (
                t
                  .trim()
                  .split(/\s+/)
                  .forEach(function (t, n) {
                    var o = parseInt(t.substring(0, t.length - 1), 10)
                    if (0 === n) return (e.url = t)
                    o && ((e.value = o), (e.postfix = t[t.length - 1]))
                  }),
                e
              )
            })),
            o.sort(function (t, e) {
              return t.value - e.value
            })
          for (var r = 0; r < o.length; r++) {
            var c = o[r]
            if (
              ('w' === c.postfix && c.value >= a) ||
              ('x' === c.postfix && c.value >= i)
            ) {
              n = c
              break
            }
          }
          !n && o.length && (n = o[o.length - 1]),
            n &&
              ((e.src = n.url),
              e.width &&
                e.height &&
                'w' == n.postfix &&
                ((e.height = (e.width / e.height) * n.value),
                (e.width = n.value)),
              (e.opts.srcset = s))
        }
      },
      setBigImage: function (t) {
        var o = this,
          i = e.createElement('img'),
          a = n(i)
        ;(t.$image = a
          .one('error', function () {
            o.setError(t)
          })
          .one('load', function () {
            var e
            t.$ghost ||
              (o.resolveImageSlideSize(
                t,
                this.naturalWidth,
                this.naturalHeight
              ),
              o.afterLoad(t)),
              o.isClosing ||
                (t.opts.srcset &&
                  ((e = t.opts.sizes),
                  (e && 'auto' !== e) ||
                    (e =
                      (t.width / t.height > 1 && s.width() / s.height() > 1
                        ? '100'
                        : Math.round((t.width / t.height) * 100)) + 'vw'),
                  a.attr('sizes', e).attr('srcset', t.opts.srcset)),
                t.$ghost &&
                  setTimeout(function () {
                    t.$ghost && !o.isClosing && t.$ghost.hide()
                  }, Math.min(300, Math.max(1e3, t.height / 1600))),
                o.hideLoading(t))
          })
          .addClass('fancybox-image')
          .attr('src', t.src)
          .appendTo(t.$content)),
          (i.complete || 'complete' == i.readyState) &&
          a.naturalWidth &&
          a.naturalHeight
            ? a.trigger('load')
            : i.error && a.trigger('error')
      },
      resolveImageSlideSize: function (t, e, n) {
        var o = parseInt(t.opts.width, 10),
          i = parseInt(t.opts.height, 10)
        ;(t.width = e),
          (t.height = n),
          o > 0 && ((t.width = o), (t.height = Math.floor((o * n) / e))),
          i > 0 && ((t.width = Math.floor((i * e) / n)), (t.height = i))
      },
      setIframe: function (t) {
        var e,
          o = this,
          i = t.opts.iframe,
          a = t.$slide
        ;(t.$content = n(
          '<div class="fancybox-content' +
            (i.preload ? ' fancybox-is-hidden' : '') +
            '"></div>'
        )
          .css(i.css)
          .appendTo(a)),
          a.addClass('fancybox-slide--' + t.contentType),
          (t.$iframe = e = n(i.tpl.replace(/\{rnd\}/g, new Date().getTime()))
            .attr(i.attr)
            .appendTo(t.$content)),
          i.preload
            ? (o.showLoading(t),
              e.on('load.fb error.fb', function (e) {
                ;(this.isReady = 1), t.$slide.trigger('refresh'), o.afterLoad(t)
              }),
              a.on('refresh.fb', function () {
                var n,
                  o,
                  s = t.$content,
                  r = i.css.width,
                  c = i.css.height
                if (1 === e[0].isReady) {
                  try {
                    ;(n = e.contents()), (o = n.find('body'))
                  } catch (t) {}
                  o &&
                    o.length &&
                    o.children().length &&
                    (a.css('overflow', 'visible'),
                    s.css({
                      width: '100%',
                      'max-width': '100%',
                      height: '9999px',
                    }),
                    void 0 === r &&
                      (r = Math.ceil(
                        Math.max(o[0].clientWidth, o.outerWidth(!0))
                      )),
                    s.css('width', r || '').css('max-width', ''),
                    void 0 === c &&
                      (c = Math.ceil(
                        Math.max(o[0].clientHeight, o.outerHeight(!0))
                      )),
                    s.css('height', c || ''),
                    a.css('overflow', 'auto')),
                    s.removeClass('fancybox-is-hidden')
                }
              }))
            : o.afterLoad(t),
          e.attr('src', t.src),
          a.one('onReset', function () {
            try {
              n(this)
                .find('iframe')
                .hide()
                .unbind()
                .attr('src', '//about:blank')
            } catch (t) {}
            n(this).off('refresh.fb').empty(),
              (t.isLoaded = !1),
              (t.isRevealed = !1)
          })
      },
      setContent: function (t, e) {
        var o = this
        o.isClosing ||
          (o.hideLoading(t),
          t.$content && n.fancybox.stop(t.$content),
          t.$slide.empty(),
          l(e) && e.parent().length
            ? ((e.hasClass('fancybox-content') ||
                e.parent().hasClass('fancybox-content')) &&
                e.parents('.fancybox-slide').trigger('onReset'),
              (t.$placeholder = n('<div>').hide().insertAfter(e)),
              e.css('display', 'inline-block'))
            : t.hasError ||
              ('string' === n.type(e) &&
                (e = n('<div>').append(n.trim(e)).contents()),
              t.opts.filter && (e = n('<div>').html(e).find(t.opts.filter))),
          t.$slide.one('onReset', function () {
            n(this).find('video,audio').trigger('pause'),
              t.$placeholder &&
                (t.$placeholder
                  .after(e.removeClass('fancybox-content').hide())
                  .remove(),
                (t.$placeholder = null)),
              t.$smallBtn && (t.$smallBtn.remove(), (t.$smallBtn = null)),
              t.hasError ||
                (n(this).empty(), (t.isLoaded = !1), (t.isRevealed = !1))
          }),
          n(e).appendTo(t.$slide),
          n(e).is('video,audio') &&
            (n(e).addClass('fancybox-video'),
            n(e).wrap('<div></div>'),
            (t.contentType = 'video'),
            (t.opts.width = t.opts.width || n(e).attr('width')),
            (t.opts.height = t.opts.height || n(e).attr('height'))),
          (t.$content = t.$slide
            .children()
            .filter('div,form,main,video,audio,article,.fancybox-content')
            .first()),
          t.$content.siblings().hide(),
          t.$content.length ||
            (t.$content = t.$slide.wrapInner('<div></div>').children().first()),
          t.$content.addClass('fancybox-content'),
          t.$slide.addClass('fancybox-slide--' + t.contentType),
          o.afterLoad(t))
      },
      setError: function (t) {
        ;(t.hasError = !0),
          t.$slide
            .trigger('onReset')
            .removeClass('fancybox-slide--' + t.contentType)
            .addClass('fancybox-slide--error'),
          (t.contentType = 'html'),
          this.setContent(t, this.translate(t, t.opts.errorTpl)),
          t.pos === this.currPos && (this.isAnimating = !1)
      },
      showLoading: function (t) {
        var e = this
        ;(t = t || e.current) &&
          !t.$spinner &&
          (t.$spinner = n(e.translate(e, e.opts.spinnerTpl))
            .appendTo(t.$slide)
            .hide()
            .fadeIn('fast'))
      },
      hideLoading: function (t) {
        var e = this
        ;(t = t || e.current) &&
          t.$spinner &&
          (t.$spinner.stop().remove(), delete t.$spinner)
      },
      afterLoad: function (t) {
        var e = this
        e.isClosing ||
          ((t.isLoading = !1),
          (t.isLoaded = !0),
          e.trigger('afterLoad', t),
          e.hideLoading(t),
          !t.opts.smallBtn ||
            (t.$smallBtn && t.$smallBtn.length) ||
            (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(
              t.$content
            )),
          t.opts.protect &&
            t.$content &&
            !t.hasError &&
            (t.$content.on('contextmenu.fb', function (t) {
              return 2 == t.button && t.preventDefault(), !0
            }),
            'image' === t.type &&
              n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
          e.adjustCaption(t),
          e.adjustLayout(t),
          t.pos === e.currPos && e.updateCursor(),
          e.revealContent(t))
      },
      adjustCaption: function (t) {
        var e,
          n = this,
          o = t || n.current,
          i = o.opts.caption,
          a = o.opts.preventCaptionOverlap,
          s = n.$refs.caption,
          r = !1
        s.toggleClass('fancybox-caption--separate', a),
          a &&
            i &&
            i.length &&
            (o.pos !== n.currPos
              ? ((e = s.clone().appendTo(s.parent())),
                e.children().eq(0).empty().html(i),
                (r = e.outerHeight(!0)),
                e.empty().remove())
              : n.$caption && (r = n.$caption.outerHeight(!0)),
            o.$slide.css('padding-bottom', r || ''))
      },
      adjustLayout: function (t) {
        var e,
          n,
          o,
          i,
          a = this,
          s = t || a.current
        s.isLoaded &&
          !0 !== s.opts.disableLayoutFix &&
          (s.$content.css('margin-bottom', ''),
          s.$content.outerHeight() > s.$slide.height() + 0.5 &&
            ((o = s.$slide[0].style['padding-bottom']),
            (i = s.$slide.css('padding-bottom')),
            parseFloat(i) > 0 &&
              ((e = s.$slide[0].scrollHeight),
              s.$slide.css('padding-bottom', 0),
              Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i),
              s.$slide.css('padding-bottom', o))),
          s.$content.css('margin-bottom', n))
      },
      revealContent: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$slide,
          c = !1,
          l = !1,
          d = s.isMoved(t),
          u = t.isRevealed
        return (
          (t.isRevealed = !0),
          (e = t.opts[s.firstRun ? 'animationEffect' : 'transitionEffect']),
          (i = t.opts[s.firstRun ? 'animationDuration' : 'transitionDuration']),
          (i = parseInt(
            void 0 === t.forcedDuration ? i : t.forcedDuration,
            10
          )),
          (!d && t.pos === s.currPos && i) || (e = !1),
          'zoom' === e &&
            (t.pos === s.currPos &&
            i &&
            'image' === t.type &&
            !t.hasError &&
            (l = s.getThumbPos(t))
              ? (c = s.getFitPos(t))
              : (e = 'fade')),
          'zoom' === e
            ? ((s.isAnimating = !0),
              (c.scaleX = c.width / l.width),
              (c.scaleY = c.height / l.height),
              (a = t.opts.zoomOpacity),
              'auto' == a &&
                (a = Math.abs(t.width / t.height - l.width / l.height) > 0.1),
              a && ((l.opacity = 0.1), (c.opacity = 1)),
              n.fancybox.setTranslate(
                t.$content.removeClass('fancybox-is-hidden'),
                l
              ),
              p(t.$content),
              void n.fancybox.animate(t.$content, c, i, function () {
                ;(s.isAnimating = !1), s.complete()
              }))
            : (s.updateSlide(t),
              e
                ? (n.fancybox.stop(r),
                  (o =
                    'fancybox-slide--' +
                    (t.pos >= s.prevPos ? 'next' : 'previous') +
                    ' fancybox-animated fancybox-fx-' +
                    e),
                  r.addClass(o).removeClass('fancybox-slide--current'),
                  t.$content.removeClass('fancybox-is-hidden'),
                  p(r),
                  'image' !== t.type && t.$content.hide().show(0),
                  void n.fancybox.animate(
                    r,
                    'fancybox-slide--current',
                    i,
                    function () {
                      r.removeClass(o).css({ transform: '', opacity: '' }),
                        t.pos === s.currPos && s.complete()
                    },
                    !0
                  ))
                : (t.$content.removeClass('fancybox-is-hidden'),
                  u ||
                    !d ||
                    'image' !== t.type ||
                    t.hasError ||
                    t.$content.hide().fadeIn('fast'),
                  void (t.pos === s.currPos && s.complete())))
        )
      },
      getThumbPos: function (t) {
        var e,
          o,
          i,
          a,
          s,
          r = !1,
          c = t.$thumb
        return (
          !(!c || !g(c[0])) &&
          ((e = n.fancybox.getTranslate(c)),
          (o = parseFloat(c.css('border-top-width') || 0)),
          (i = parseFloat(c.css('border-right-width') || 0)),
          (a = parseFloat(c.css('border-bottom-width') || 0)),
          (s = parseFloat(c.css('border-left-width') || 0)),
          (r = {
            top: e.top + o,
            left: e.left + s,
            width: e.width - i - s,
            height: e.height - o - a,
            scaleX: 1,
            scaleY: 1,
          }),
          e.width > 0 && e.height > 0 && r)
        )
      },
      complete: function () {
        var t,
          e = this,
          o = e.current,
          i = {}
        !e.isMoved() &&
          o.isLoaded &&
          (o.isComplete ||
            ((o.isComplete = !0),
            o.$slide.siblings().trigger('onReset'),
            e.preload('inline'),
            p(o.$slide),
            o.$slide.addClass('fancybox-slide--complete'),
            n.each(e.slides, function (t, o) {
              o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1
                ? (i[o.pos] = o)
                : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
            }),
            (e.slides = i)),
          (e.isAnimating = !1),
          e.updateCursor(),
          e.trigger('afterShow'),
          o.opts.video.autoStart &&
            o.$slide
              .find('video,audio')
              .filter(':visible:first')
              .trigger('play')
              .one('ended', function () {
                Document.exitFullscreen
                  ? Document.exitFullscreen()
                  : this.webkitExitFullscreen && this.webkitExitFullscreen(),
                  e.next()
              }),
          o.opts.autoFocus &&
            'html' === o.contentType &&
            ((t = o.$content.find('input[autofocus]:enabled:visible:first')),
            t.length ? t.trigger('focus') : e.focus(null, !0)),
          o.$slide.scrollTop(0).scrollLeft(0))
      },
      preload: function (t) {
        var e,
          n,
          o = this
        o.group.length < 2 ||
          ((n = o.slides[o.currPos + 1]),
          (e = o.slides[o.currPos - 1]),
          e && e.type === t && o.loadSlide(e),
          n && n.type === t && o.loadSlide(n))
      },
      focus: function (t, o) {
        var i,
          a,
          s = this,
          r = [
            'a[href]',
            'area[href]',
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            'select:not([disabled]):not([aria-hidden])',
            'textarea:not([disabled]):not([aria-hidden])',
            'button:not([disabled]):not([aria-hidden])',
            'iframe',
            'object',
            'embed',
            'video',
            'audio',
            '[contenteditable]',
            '[tabindex]:not([tabindex^="-"])',
          ].join(',')
        s.isClosing ||
          ((i =
            !t && s.current && s.current.isComplete
              ? s.current.$slide.find(
                  '*:visible' + (o ? ':not(.fancybox-close-small)' : '')
                )
              : s.$refs.container.find('*:visible')),
          (i = i.filter(r).filter(function () {
            return (
              'hidden' !== n(this).css('visibility') &&
              !n(this).hasClass('disabled')
            )
          })),
          i.length
            ? ((a = i.index(e.activeElement)),
              t && t.shiftKey
                ? (a < 0 || 0 == a) &&
                  (t.preventDefault(), i.eq(i.length - 1).trigger('focus'))
                : (a < 0 || a == i.length - 1) &&
                  (t && t.preventDefault(), i.eq(0).trigger('focus')))
            : s.$refs.container.trigger('focus'))
      },
      activate: function () {
        var t = this
        n('.fancybox-container').each(function () {
          var e = n(this).data('FancyBox')
          e &&
            e.id !== t.id &&
            !e.isClosing &&
            (e.trigger('onDeactivate'), e.removeEvents(), (e.isVisible = !1))
        }),
          (t.isVisible = !0),
          (t.current || t.isIdle) && (t.update(), t.updateControls()),
          t.trigger('onActivate'),
          t.addEvents()
      },
      close: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          u = this,
          f = u.current,
          h = function () {
            u.cleanUp(t)
          }
        return (
          !u.isClosing &&
          ((u.isClosing = !0),
          !1 === u.trigger('beforeClose', t)
            ? ((u.isClosing = !1),
              d(function () {
                u.update()
              }),
              !1)
            : (u.removeEvents(),
              (a = f.$content),
              (o = f.opts.animationEffect),
              (i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0),
              f.$slide.removeClass(
                'fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated'
              ),
              !0 !== t ? n.fancybox.stop(f.$slide) : (o = !1),
              f.$slide.siblings().trigger('onReset').remove(),
              i &&
                u.$refs.container
                  .removeClass('fancybox-is-open')
                  .addClass('fancybox-is-closing')
                  .css('transition-duration', i + 'ms'),
              u.hideLoading(f),
              u.hideControls(!0),
              u.updateCursor(),
              'zoom' !== o ||
                (a &&
                  i &&
                  'image' === f.type &&
                  !u.isMoved() &&
                  !f.hasError &&
                  (l = u.getThumbPos(f))) ||
                (o = 'fade'),
              'zoom' === o
                ? (n.fancybox.stop(a),
                  (s = n.fancybox.getTranslate(a)),
                  (c = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / l.width,
                    scaleY: s.height / l.height,
                    width: l.width,
                    height: l.height,
                  }),
                  (r = f.opts.zoomOpacity),
                  'auto' == r &&
                    (r =
                      Math.abs(f.width / f.height - l.width / l.height) > 0.1),
                  r && (l.opacity = 0),
                  n.fancybox.setTranslate(a, c),
                  p(a),
                  n.fancybox.animate(a, l, i, h),
                  !0)
                : (o && i
                    ? n.fancybox.animate(
                        f.$slide
                          .addClass('fancybox-slide--previous')
                          .removeClass('fancybox-slide--current'),
                        'fancybox-animated fancybox-fx-' + o,
                        i,
                        h
                      )
                    : !0 === t
                    ? setTimeout(h, i)
                    : h(),
                  !0)))
        )
      },
      cleanUp: function (e) {
        var o,
          i,
          a,
          s = this,
          r = s.current.opts.$orig
        s.current.$slide.trigger('onReset'),
          s.$refs.container.empty().remove(),
          s.trigger('afterClose', e),
          s.current.opts.backFocus &&
            ((r && r.length && r.is(':visible')) || (r = s.$trigger),
            r &&
              r.length &&
              ((i = t.scrollX),
              (a = t.scrollY),
              r.trigger('focus'),
              n('html, body').scrollTop(a).scrollLeft(i))),
          (s.current = null),
          (o = n.fancybox.getInstance()),
          o
            ? o.activate()
            : (n('body').removeClass(
                'fancybox-active compensate-for-scrollbar'
              ),
              n('#fancybox-style-noscroll').remove())
      },
      trigger: function (t, e) {
        var o,
          i = Array.prototype.slice.call(arguments, 1),
          a = this,
          s = e && e.opts ? e : a.current
        if (
          (s ? i.unshift(s) : (s = a),
          i.unshift(a),
          n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
          !1 === o)
        )
          return o
        'afterClose' !== t && a.$refs
          ? a.$refs.container.trigger(t + '.fb', i)
          : r.trigger(t + '.fb', i)
      },
      updateControls: function () {
        var t = this,
          o = t.current,
          i = o.index,
          a = t.$refs.container,
          s = t.$refs.caption,
          r = o.opts.caption
        o.$slide.trigger('refresh'),
          r && r.length
            ? ((t.$caption = s), s.children().eq(0).html(r))
            : (t.$caption = null),
          t.hasHiddenControls || t.isIdle || t.showControls(),
          a.find('[data-fancybox-count]').html(t.group.length),
          a.find('[data-fancybox-index]').html(i + 1),
          a
            .find('[data-fancybox-prev]')
            .prop('disabled', !o.opts.loop && i <= 0),
          a
            .find('[data-fancybox-next]')
            .prop('disabled', !o.opts.loop && i >= t.group.length - 1),
          'image' === o.type
            ? a
                .find('[data-fancybox-zoom]')
                .show()
                .end()
                .find('[data-fancybox-download]')
                .attr('href', o.opts.image.src || o.src)
                .show()
            : o.opts.toolbar &&
              a.find('[data-fancybox-download],[data-fancybox-zoom]').hide(),
          n(e.activeElement).is(':hidden,[disabled]') &&
            t.$refs.container.trigger('focus')
      },
      hideControls: function (t) {
        var e = this,
          n = ['infobar', 'toolbar', 'nav']
        ;(!t && e.current.opts.preventCaptionOverlap) || n.push('caption'),
          this.$refs.container.removeClass(
            n
              .map(function (t) {
                return 'fancybox-show-' + t
              })
              .join(' ')
          ),
          (this.hasHiddenControls = !0)
      },
      showControls: function () {
        var t = this,
          e = t.current ? t.current.opts : t.opts,
          n = t.$refs.container
        ;(t.hasHiddenControls = !1),
          (t.idleSecondsCounter = 0),
          n
            .toggleClass('fancybox-show-toolbar', !(!e.toolbar || !e.buttons))
            .toggleClass(
              'fancybox-show-infobar',
              !!(e.infobar && t.group.length > 1)
            )
            .toggleClass('fancybox-show-caption', !!t.$caption)
            .toggleClass(
              'fancybox-show-nav',
              !!(e.arrows && t.group.length > 1)
            )
            .toggleClass('fancybox-is-modal', !!e.modal)
      },
      toggleControls: function () {
        this.hasHiddenControls ? this.showControls() : this.hideControls()
      },
    }),
      (n.fancybox = {
        version: '3.5.7',
        defaults: a,
        getInstance: function (t) {
          var e = n(
              '.fancybox-container:not(".fancybox-is-closing"):last'
            ).data('FancyBox'),
            o = Array.prototype.slice.call(arguments, 1)
          return (
            e instanceof b &&
            ('string' === n.type(t)
              ? e[t].apply(e, o)
              : 'function' === n.type(t) && t.apply(e, o),
            e)
          )
        },
        open: function (t, e, n) {
          return new b(t, e, n)
        },
        close: function (t) {
          var e = this.getInstance()
          e && (e.close(), !0 === t && this.close(t))
        },
        destroy: function () {
          this.close(!0), r.add('body').off('click.fb-start', '**')
        },
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ),
        use3d: (function () {
          var n = e.createElement('div')
          return (
            t.getComputedStyle &&
            t.getComputedStyle(n) &&
            t.getComputedStyle(n).getPropertyValue('transform') &&
            !(e.documentMode && e.documentMode < 11)
          )
        })(),
        getTranslate: function (t) {
          var e
          return (
            !(!t || !t.length) &&
            ((e = t[0].getBoundingClientRect()),
            {
              top: e.top || 0,
              left: e.left || 0,
              width: e.width,
              height: e.height,
              opacity: parseFloat(t.css('opacity')),
            })
          )
        },
        setTranslate: function (t, e) {
          var n = '',
            o = {}
          if (t && e)
            return (
              (void 0 === e.left && void 0 === e.top) ||
                ((n =
                  (void 0 === e.left ? t.position().left : e.left) +
                  'px, ' +
                  (void 0 === e.top ? t.position().top : e.top) +
                  'px'),
                (n = this.use3d
                  ? 'translate3d(' + n + ', 0px)'
                  : 'translate(' + n + ')')),
              void 0 !== e.scaleX && void 0 !== e.scaleY
                ? (n += ' scale(' + e.scaleX + ', ' + e.scaleY + ')')
                : void 0 !== e.scaleX && (n += ' scaleX(' + e.scaleX + ')'),
              n.length && (o.transform = n),
              void 0 !== e.opacity && (o.opacity = e.opacity),
              void 0 !== e.width && (o.width = e.width),
              void 0 !== e.height && (o.height = e.height),
              t.css(o)
            )
        },
        animate: function (t, e, o, i, a) {
          var s,
            r = this
          n.isFunction(o) && ((i = o), (o = null)),
            r.stop(t),
            (s = r.getTranslate(t)),
            t.on(f, function (c) {
              ;(!c ||
                !c.originalEvent ||
                (t.is(c.originalEvent.target) &&
                  'z-index' != c.originalEvent.propertyName)) &&
                (r.stop(t),
                n.isNumeric(o) && t.css('transition-duration', ''),
                n.isPlainObject(e)
                  ? void 0 !== e.scaleX &&
                    void 0 !== e.scaleY &&
                    r.setTranslate(t, {
                      top: e.top,
                      left: e.left,
                      width: s.width * e.scaleX,
                      height: s.height * e.scaleY,
                      scaleX: 1,
                      scaleY: 1,
                    })
                  : !0 !== a && t.removeClass(e),
                n.isFunction(i) && i(c))
            }),
            n.isNumeric(o) && t.css('transition-duration', o + 'ms'),
            n.isPlainObject(e)
              ? (void 0 !== e.scaleX &&
                  void 0 !== e.scaleY &&
                  (delete e.width,
                  delete e.height,
                  t.parent().hasClass('fancybox-slide--image') &&
                    t.parent().addClass('fancybox-is-scaling')),
                n.fancybox.setTranslate(t, e))
              : t.addClass(e),
            t.data(
              'timer',
              setTimeout(function () {
                t.trigger(f)
              }, o + 33)
            )
        },
        stop: function (t, e) {
          t &&
            t.length &&
            (clearTimeout(t.data('timer')),
            e && t.trigger(f),
            t.off(f).css('transition-duration', ''),
            t.parent().removeClass('fancybox-is-scaling'))
        },
      }),
      (n.fn.fancybox = function (t) {
        var e
        return (
          (t = t || {}),
          (e = t.selector || !1),
          e
            ? n('body')
                .off('click.fb-start', e)
                .on('click.fb-start', e, { options: t }, i)
            : this.off('click.fb-start').on(
                'click.fb-start',
                { items: this, options: t },
                i
              ),
          this
        )
      }),
      r.on('click.fb-start', '[data-fancybox]', i),
      r.on('click.fb-start', '[data-fancybox-trigger]', function (t) {
        n('[data-fancybox="' + n(this).attr('data-fancybox-trigger') + '"]')
          .eq(n(this).attr('data-fancybox-index') || 0)
          .trigger('click.fb-start', { $trigger: n(this) })
      }),
      (function () {
        var t = null
        r.on('mousedown mouseup focus blur', '.fancybox-button', function (e) {
          switch (e.type) {
            case 'mousedown':
              t = n(this)
              break
            case 'mouseup':
              t = null
              break
            case 'focusin':
              n('.fancybox-button').removeClass('fancybox-focus'),
                n(this).is(t) ||
                  n(this).is('[disabled]') ||
                  n(this).addClass('fancybox-focus')
              break
            case 'focusout':
              n('.fancybox-button').removeClass('fancybox-focus')
          }
        })
      })()
  }
})(window, document, jQuery),
  (function (t) {
    'use strict'
    var e = {
        youtube: {
          matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: 'transparent',
            enablejsapi: 1,
            html5: 1,
          },
          paramPlace: 8,
          type: 'iframe',
          url: 'https://www.youtube-nocookie.com/embed/$4',
          thumb: 'https://img.youtube.com/vi/$4/hqdefault.jpg',
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1,
          },
          paramPlace: 3,
          type: 'iframe',
          url: '//player.vimeo.com/video/$2',
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: 'image',
          url: '//$1/p/$2/media/?size=l',
        },
        gmap_place: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: 'iframe',
          url: function (t) {
            return (
              '//maps.google.' +
              t[2] +
              '/?ll=' +
              (t[9]
                ? t[9] +
                  '&z=' +
                  Math.floor(t[10]) +
                  (t[12] ? t[12].replace(/^\//, '&') : '')
                : t[12] + ''
              ).replace(/\?/, '&') +
              '&output=' +
              (t[12] && t[12].indexOf('layer=c') > 0 ? 'svembed' : 'embed')
            )
          },
        },
        gmap_search: {
          matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: 'iframe',
          url: function (t) {
            return (
              '//maps.google.' +
              t[2] +
              '/maps?q=' +
              t[5].replace('query=', 'q=').replace('api=1', '') +
              '&output=embed'
            )
          },
        },
      },
      n = function (e, n, o) {
        if (e)
          return (
            (o = o || ''),
            'object' === t.type(o) && (o = t.param(o, !0)),
            t.each(n, function (t, n) {
              e = e.replace('$' + t, n || '')
            }),
            o.length && (e += (e.indexOf('?') > 0 ? '&' : '?') + o),
            e
          )
      }
    t(document).on('objectNeedsType.fb', function (o, i, a) {
      var s,
        r,
        c,
        l,
        d,
        u,
        f,
        p = a.src || '',
        h = !1
      ;(s = t.extend(!0, {}, e, a.opts.media)),
        t.each(s, function (e, o) {
          if ((c = p.match(o.matcher))) {
            if (
              ((h = o.type), (f = e), (u = {}), o.paramPlace && c[o.paramPlace])
            ) {
              ;(d = c[o.paramPlace]),
                '?' == d[0] && (d = d.substring(1)),
                (d = d.split('&'))
              for (var i = 0; i < d.length; ++i) {
                var s = d[i].split('=', 2)
                2 == s.length &&
                  (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, ' ')))
              }
            }
            return (
              (l = t.extend(!0, {}, o.params, a.opts[e], u)),
              (p =
                'function' === t.type(o.url)
                  ? o.url.call(this, c, l, a)
                  : n(o.url, c, l)),
              (r =
                'function' === t.type(o.thumb)
                  ? o.thumb.call(this, c, l, a)
                  : n(o.thumb, c)),
              'youtube' === e
                ? (p = p.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, n, o) {
                    return (
                      '&start=' +
                      ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                    )
                  }))
                : 'vimeo' === e && (p = p.replace('&%23', '#')),
              !1
            )
          }
        }),
        h
          ? (a.opts.thumb ||
              (a.opts.$thumb && a.opts.$thumb.length) ||
              (a.opts.thumb = r),
            'iframe' === h &&
              (a.opts = t.extend(!0, a.opts, {
                iframe: { preload: !1, attr: { scrolling: 'no' } },
              })),
            t.extend(a, {
              type: h,
              src: p,
              origSrc: a.src,
              contentSource: f,
              contentType:
                'image' === h
                  ? 'image'
                  : 'gmap_place' == f || 'gmap_search' == f
                  ? 'map'
                  : 'video',
            }))
          : p && (a.type = a.opts.defaultType)
    })
    var o = {
      youtube: {
        src: 'https://www.youtube.com/iframe_api',
        class: 'YT',
        loading: !1,
        loaded: !1,
      },
      vimeo: {
        src: 'https://player.vimeo.com/api/player.js',
        class: 'Vimeo',
        loading: !1,
        loaded: !1,
      },
      load: function (t) {
        var e,
          n = this
        if (this[t].loaded)
          return void setTimeout(function () {
            n.done(t)
          })
        this[t].loading ||
          ((this[t].loading = !0),
          (e = document.createElement('script')),
          (e.type = 'text/javascript'),
          (e.src = this[t].src),
          'youtube' === t
            ? (window.onYouTubeIframeAPIReady = function () {
                ;(n[t].loaded = !0), n.done(t)
              })
            : (e.onload = function () {
                ;(n[t].loaded = !0), n.done(t)
              }),
          document.body.appendChild(e))
      },
      done: function (e) {
        var n, o, i
        'youtube' === e && delete window.onYouTubeIframeAPIReady,
          (n = t.fancybox.getInstance()) &&
            ((o = n.current.$content.find('iframe')),
            'youtube' === e && void 0 !== YT && YT
              ? (i = new YT.Player(o.attr('id'), {
                  events: {
                    onStateChange: function (t) {
                      0 == t.data && n.next()
                    },
                  },
                }))
              : 'vimeo' === e &&
                void 0 !== Vimeo &&
                Vimeo &&
                ((i = new Vimeo.Player(o)),
                i.on('ended', function () {
                  n.next()
                })))
      },
    }
    t(document).on({
      'afterShow.fb': function (t, e, n) {
        e.group.length > 1 &&
          ('youtube' === n.contentSource || 'vimeo' === n.contentSource) &&
          o.load(n.contentSource)
      },
    })
  })(jQuery),
  (function (t, e, n) {
    'use strict'
    var o = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60)
          }
        )
      })(),
      i = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e)
          }
        )
      })(),
      a = function (e) {
        var n = []
        ;(e = e.originalEvent || e || t.e),
          (e =
            e.touches && e.touches.length
              ? e.touches
              : e.changedTouches && e.changedTouches.length
              ? e.changedTouches
              : [e])
        for (var o in e)
          e[o].pageX
            ? n.push({ x: e[o].pageX, y: e[o].pageY })
            : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY })
        return n
      },
      s = function (t, e, n) {
        return e && t
          ? 'x' === n
            ? t.x - e.x
            : 'y' === n
            ? t.y - e.y
            : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
          : 0
      },
      r = function (t) {
        if (
          t.is(
            'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe'
          ) ||
          n.isFunction(t.get(0).onclick) ||
          t.data('selectable')
        )
          return !0
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
          if ('data-fancybox-' === o[e].nodeName.substr(0, 14)) return !0
        return !1
      },
      c = function (e) {
        var n = t.getComputedStyle(e)['overflow-y'],
          o = t.getComputedStyle(e)['overflow-x'],
          i =
            ('scroll' === n || 'auto' === n) && e.scrollHeight > e.clientHeight,
          a = ('scroll' === o || 'auto' === o) && e.scrollWidth > e.clientWidth
        return i || a
      },
      l = function (t) {
        for (var e = !1; ; ) {
          if ((e = c(t.get(0)))) break
          if (
            ((t = t.parent()),
            !t.length || t.hasClass('fancybox-stage') || t.is('body'))
          )
            break
        }
        return e
      },
      d = function (t) {
        var e = this
        ;(e.instance = t),
          (e.$bg = t.$refs.bg),
          (e.$stage = t.$refs.stage),
          (e.$container = t.$refs.container),
          e.destroy(),
          e.$container.on(
            'touchstart.fb.touch mousedown.fb.touch',
            n.proxy(e, 'ontouchstart')
          )
      }
    ;(d.prototype.destroy = function () {
      var t = this
      t.$container.off('.fb.touch'),
        n(e).off('.fb.touch'),
        t.requestId && (i(t.requestId), (t.requestId = null)),
        t.tapped && (clearTimeout(t.tapped), (t.tapped = null))
    }),
      (d.prototype.ontouchstart = function (o) {
        var i = this,
          c = n(o.target),
          d = i.instance,
          u = d.current,
          f = u.$slide,
          p = u.$content,
          h = 'touchstart' == o.type
        if (
          (h && i.$container.off('mousedown.fb.touch'),
          (!o.originalEvent || 2 != o.originalEvent.button) &&
            f.length &&
            c.length &&
            !r(c) &&
            !r(c.parent()) &&
            (c.is('img') ||
              !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left)))
        ) {
          if (!u || d.isAnimating || u.$slide.hasClass('fancybox-animated'))
            return o.stopPropagation(), void o.preventDefault()
          ;(i.realPoints = i.startPoints = a(o)),
            i.startPoints.length &&
              (u.touch && o.stopPropagation(),
              (i.startEvent = o),
              (i.canTap = !0),
              (i.$target = c),
              (i.$content = p),
              (i.opts = u.opts.touch),
              (i.isPanning = !1),
              (i.isSwiping = !1),
              (i.isZooming = !1),
              (i.isScrolling = !1),
              (i.canPan = d.canPan()),
              (i.startTime = new Date().getTime()),
              (i.distanceX = i.distanceY = i.distance = 0),
              (i.canvasWidth = Math.round(f[0].clientWidth)),
              (i.canvasHeight = Math.round(f[0].clientHeight)),
              (i.contentLastPos = null),
              (i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                top: 0,
                left: 0,
              }),
              (i.sliderStartPos = n.fancybox.getTranslate(f)),
              (i.stagePos = n.fancybox.getTranslate(d.$refs.stage)),
              (i.sliderStartPos.top -= i.stagePos.top),
              (i.sliderStartPos.left -= i.stagePos.left),
              (i.contentStartPos.top -= i.stagePos.top),
              (i.contentStartPos.left -= i.stagePos.left),
              n(e)
                .off('.fb.touch')
                .on(
                  h
                    ? 'touchend.fb.touch touchcancel.fb.touch'
                    : 'mouseup.fb.touch mouseleave.fb.touch',
                  n.proxy(i, 'ontouchend')
                )
                .on(
                  h ? 'touchmove.fb.touch' : 'mousemove.fb.touch',
                  n.proxy(i, 'ontouchmove')
                ),
              n.fancybox.isMobile &&
                e.addEventListener('scroll', i.onscroll, !0),
              (((i.opts || i.canPan) &&
                (c.is(i.$stage) || i.$stage.find(c).length)) ||
                (c.is('.fancybox-image') && o.preventDefault(),
                n.fancybox.isMobile &&
                  c.parents('.fancybox-caption').length)) &&
                ((i.isScrollable = l(c) || l(c.parent())),
                (n.fancybox.isMobile && i.isScrollable) || o.preventDefault(),
                (1 === i.startPoints.length || u.hasError) &&
                  (i.canPan
                    ? (n.fancybox.stop(i.$content), (i.isPanning = !0))
                    : (i.isSwiping = !0),
                  i.$container.addClass('fancybox-is-grabbing')),
                2 === i.startPoints.length &&
                  'image' === u.type &&
                  (u.isLoaded || u.$ghost) &&
                  ((i.canTap = !1),
                  (i.isSwiping = !1),
                  (i.isPanning = !1),
                  (i.isZooming = !0),
                  n.fancybox.stop(i.$content),
                  (i.centerPointStartX =
                    0.5 * (i.startPoints[0].x + i.startPoints[1].x) -
                    n(t).scrollLeft()),
                  (i.centerPointStartY =
                    0.5 * (i.startPoints[0].y + i.startPoints[1].y) -
                    n(t).scrollTop()),
                  (i.percentageOfImageAtPinchPointX =
                    (i.centerPointStartX - i.contentStartPos.left) /
                    i.contentStartPos.width),
                  (i.percentageOfImageAtPinchPointY =
                    (i.centerPointStartY - i.contentStartPos.top) /
                    i.contentStartPos.height),
                  (i.startDistanceBetweenFingers = s(
                    i.startPoints[0],
                    i.startPoints[1]
                  )))))
        }
      }),
      (d.prototype.onscroll = function (t) {
        var n = this
        ;(n.isScrolling = !0), e.removeEventListener('scroll', n.onscroll, !0)
      }),
      (d.prototype.ontouchmove = function (t) {
        var e = this
        return void 0 !== t.originalEvent.buttons &&
          0 === t.originalEvent.buttons
          ? void e.ontouchend(t)
          : e.isScrolling
          ? void (e.canTap = !1)
          : ((e.newPoints = a(t)),
            void (
              (e.opts || e.canPan) &&
              e.newPoints.length &&
              e.newPoints.length &&
              ((e.isSwiping && !0 === e.isSwiping) || t.preventDefault(),
              (e.distanceX = s(e.newPoints[0], e.startPoints[0], 'x')),
              (e.distanceY = s(e.newPoints[0], e.startPoints[0], 'y')),
              (e.distance = s(e.newPoints[0], e.startPoints[0])),
              e.distance > 0 &&
                (e.isSwiping
                  ? e.onSwipe(t)
                  : e.isPanning
                  ? e.onPan()
                  : e.isZooming && e.onZoom()))
            ))
      }),
      (d.prototype.onSwipe = function (e) {
        var a,
          s = this,
          r = s.instance,
          c = s.isSwiping,
          l = s.sliderStartPos.left || 0
        if (!0 !== c)
          'x' == c &&
            (s.distanceX > 0 &&
            (s.instance.group.length < 2 ||
              (0 === s.instance.current.index && !s.instance.current.opts.loop))
              ? (l += Math.pow(s.distanceX, 0.8))
              : s.distanceX < 0 &&
                (s.instance.group.length < 2 ||
                  (s.instance.current.index === s.instance.group.length - 1 &&
                    !s.instance.current.opts.loop))
              ? (l -= Math.pow(-s.distanceX, 0.8))
              : (l += s.distanceX)),
            (s.sliderLastPos = {
              top: 'x' == c ? 0 : s.sliderStartPos.top + s.distanceY,
              left: l,
            }),
            s.requestId && (i(s.requestId), (s.requestId = null)),
            (s.requestId = o(function () {
              s.sliderLastPos &&
                (n.each(s.instance.slides, function (t, e) {
                  var o = e.pos - s.instance.currPos
                  n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left:
                      s.sliderLastPos.left +
                      o * s.canvasWidth +
                      o * e.opts.gutter,
                  })
                }),
                s.$container.addClass('fancybox-is-sliding'))
            }))
        else if (Math.abs(s.distance) > 10) {
          if (
            ((s.canTap = !1),
            r.group.length < 2 && s.opts.vertical
              ? (s.isSwiping = 'y')
              : r.isDragging ||
                !1 === s.opts.vertical ||
                ('auto' === s.opts.vertical && n(t).width() > 800)
              ? (s.isSwiping = 'x')
              : ((a = Math.abs(
                  (180 * Math.atan2(s.distanceY, s.distanceX)) / Math.PI
                )),
                (s.isSwiping = a > 45 && a < 135 ? 'y' : 'x')),
            'y' === s.isSwiping && n.fancybox.isMobile && s.isScrollable)
          )
            return void (s.isScrolling = !0)
          ;(r.isDragging = s.isSwiping),
            (s.startPoints = s.newPoints),
            n.each(r.slides, function (t, e) {
              var o, i
              n.fancybox.stop(e.$slide),
                (o = n.fancybox.getTranslate(e.$slide)),
                (i = n.fancybox.getTranslate(r.$refs.stage)),
                e.$slide
                  .css({
                    transform: '',
                    opacity: '',
                    'transition-duration': '',
                  })
                  .removeClass('fancybox-animated')
                  .removeClass(function (t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(' ')
                  }),
                e.pos === r.current.pos &&
                  ((s.sliderStartPos.top = o.top - i.top),
                  (s.sliderStartPos.left = o.left - i.left)),
                n.fancybox.setTranslate(e.$slide, {
                  top: o.top - i.top,
                  left: o.left - i.left,
                })
            }),
            r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
        }
      }),
      (d.prototype.onPan = function () {
        var t = this
        if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5))
          return void (t.startPoints = t.newPoints)
        ;(t.canTap = !1),
          (t.contentLastPos = t.limitMovement()),
          t.requestId && i(t.requestId),
          (t.requestId = o(function () {
            n.fancybox.setTranslate(t.$content, t.contentLastPos)
          }))
      }),
      (d.prototype.limitMovement = function () {
        var t,
          e,
          n,
          o,
          i,
          a,
          s = this,
          r = s.canvasWidth,
          c = s.canvasHeight,
          l = s.distanceX,
          d = s.distanceY,
          u = s.contentStartPos,
          f = u.left,
          p = u.top,
          h = u.width,
          g = u.height
        return (
          (i = h > r ? f + l : f),
          (a = p + d),
          (t = Math.max(0, 0.5 * r - 0.5 * h)),
          (e = Math.max(0, 0.5 * c - 0.5 * g)),
          (n = Math.min(r - h, 0.5 * r - 0.5 * h)),
          (o = Math.min(c - g, 0.5 * c - 0.5 * g)),
          l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, 0.8) || 0),
          l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, 0.8) || 0),
          d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, 0.8) || 0),
          d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, 0.8) || 0),
          { top: a, left: i }
        )
      }),
      (d.prototype.limitPosition = function (t, e, n, o) {
        var i = this,
          a = i.canvasWidth,
          s = i.canvasHeight
        return (
          n > a
            ? ((t = t > 0 ? 0 : t), (t = t < a - n ? a - n : t))
            : (t = Math.max(0, a / 2 - n / 2)),
          o > s
            ? ((e = e > 0 ? 0 : e), (e = e < s - o ? s - o : e))
            : (e = Math.max(0, s / 2 - o / 2)),
          { top: e, left: t }
        )
      }),
      (d.prototype.onZoom = function () {
        var e = this,
          a = e.contentStartPos,
          r = a.width,
          c = a.height,
          l = a.left,
          d = a.top,
          u = s(e.newPoints[0], e.newPoints[1]),
          f = u / e.startDistanceBetweenFingers,
          p = Math.floor(r * f),
          h = Math.floor(c * f),
          g = (r - p) * e.percentageOfImageAtPinchPointX,
          b = (c - h) * e.percentageOfImageAtPinchPointY,
          m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
          v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
          y = m - e.centerPointStartX,
          x = v - e.centerPointStartY,
          w = l + (g + y),
          $ = d + (b + x),
          S = { top: $, left: w, scaleX: f, scaleY: f }
        ;(e.canTap = !1),
          (e.newWidth = p),
          (e.newHeight = h),
          (e.contentLastPos = S),
          e.requestId && i(e.requestId),
          (e.requestId = o(function () {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
          }))
      }),
      (d.prototype.ontouchend = function (t) {
        var o = this,
          s = o.isSwiping,
          r = o.isPanning,
          c = o.isZooming,
          l = o.isScrolling
        if (
          ((o.endPoints = a(t)),
          (o.dMs = Math.max(new Date().getTime() - o.startTime, 1)),
          o.$container.removeClass('fancybox-is-grabbing'),
          n(e).off('.fb.touch'),
          e.removeEventListener('scroll', o.onscroll, !0),
          o.requestId && (i(o.requestId), (o.requestId = null)),
          (o.isSwiping = !1),
          (o.isPanning = !1),
          (o.isZooming = !1),
          (o.isScrolling = !1),
          (o.instance.isDragging = !1),
          o.canTap)
        )
          return o.onTap(t)
        ;(o.speed = 100),
          (o.velocityX = (o.distanceX / o.dMs) * 0.5),
          (o.velocityY = (o.distanceY / o.dMs) * 0.5),
          r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l)
      }),
      (d.prototype.endSwiping = function (t, e) {
        var o = this,
          i = !1,
          a = o.instance.group.length,
          s = Math.abs(o.distanceX),
          r = 'x' == t && a > 1 && ((o.dMs > 130 && s > 10) || s > 50)
        ;(o.sliderLastPos = null),
          'y' == t && !e && Math.abs(o.distanceY) > 50
            ? (n.fancybox.animate(
                o.instance.current.$slide,
                {
                  top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
                  opacity: 0,
                },
                200
              ),
              (i = o.instance.close(!0, 250)))
            : r && o.distanceX > 0
            ? (i = o.instance.previous(300))
            : r && o.distanceX < 0 && (i = o.instance.next(300)),
          !1 !== i || ('x' != t && 'y' != t) || o.instance.centerSlide(200),
          o.$container.removeClass('fancybox-is-sliding')
      }),
      (d.prototype.endPanning = function () {
        var t,
          e,
          o,
          i = this
        i.contentLastPos &&
          (!1 === i.opts.momentum || i.dMs > 350
            ? ((t = i.contentLastPos.left), (e = i.contentLastPos.top))
            : ((t = i.contentLastPos.left + 500 * i.velocityX),
              (e = i.contentLastPos.top + 500 * i.velocityY)),
          (o = i.limitPosition(
            t,
            e,
            i.contentStartPos.width,
            i.contentStartPos.height
          )),
          (o.width = i.contentStartPos.width),
          (o.height = i.contentStartPos.height),
          n.fancybox.animate(i.$content, o, 366))
      }),
      (d.prototype.endZooming = function () {
        var t,
          e,
          o,
          i,
          a = this,
          s = a.instance.current,
          r = a.newWidth,
          c = a.newHeight
        a.contentLastPos &&
          ((t = a.contentLastPos.left),
          (e = a.contentLastPos.top),
          (i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }),
          n.fancybox.setTranslate(a.$content, i),
          r < a.canvasWidth && c < a.canvasHeight
            ? a.instance.scaleToFit(150)
            : r > s.width || c > s.height
            ? a.instance.scaleToActual(
                a.centerPointStartX,
                a.centerPointStartY,
                150
              )
            : ((o = a.limitPosition(t, e, r, c)),
              n.fancybox.animate(a.$content, o, 150)))
      }),
      (d.prototype.onTap = function (e) {
        var o,
          i = this,
          s = n(e.target),
          r = i.instance,
          c = r.current,
          l = (e && a(e)) || i.startPoints,
          d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
          u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
          f = function (t) {
            var o = c.opts[t]
            if ((n.isFunction(o) && (o = o.apply(r, [c, e])), o))
              switch (o) {
                case 'close':
                  r.close(i.startEvent)
                  break
                case 'toggleControls':
                  r.toggleControls()
                  break
                case 'next':
                  r.next()
                  break
                case 'nextOrClose':
                  r.group.length > 1 ? r.next() : r.close(i.startEvent)
                  break
                case 'zoom':
                  'image' == c.type &&
                    (c.isLoaded || c.$ghost) &&
                    (r.canPan()
                      ? r.scaleToFit()
                      : r.isScaledDown()
                      ? r.scaleToActual(d, u)
                      : r.group.length < 2 && r.close(i.startEvent))
              }
          }
        if (
          (!e.originalEvent || 2 != e.originalEvent.button) &&
          (s.is('img') || !(d > s[0].clientWidth + s.offset().left))
        ) {
          if (
            s.is(
              '.fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container'
            )
          )
            o = 'Outside'
          else if (s.is('.fancybox-slide')) o = 'Slide'
          else {
            if (
              !r.current.$content ||
              !r.current.$content.find(s).addBack().filter(s).length
            )
              return
            o = 'Content'
          }
          if (i.tapped) {
            if (
              (clearTimeout(i.tapped),
              (i.tapped = null),
              Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50)
            )
              return this
            f('dblclick' + o)
          } else
            (i.tapX = d),
              (i.tapY = u),
              c.opts['dblclick' + o] &&
              c.opts['dblclick' + o] !== c.opts['click' + o]
                ? (i.tapped = setTimeout(function () {
                    ;(i.tapped = null), r.isAnimating || f('click' + o)
                  }, 500))
                : f('click' + o)
          return this
        }
      }),
      n(e)
        .on('onActivate.fb', function (t, e) {
          e && !e.Guestures && (e.Guestures = new d(e))
        })
        .on('beforeClose.fb', function (t, e) {
          e && e.Guestures && e.Guestures.destroy()
        })
  })(window, document, jQuery),
  (function (t, e) {
    'use strict'
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        slideShow:
          '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
      },
      slideShow: { autoStart: !1, speed: 3e3, progress: !0 },
    })
    var n = function (t) {
      ;(this.instance = t), this.init()
    }
    e.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function () {
        var t = this,
          n = t.instance,
          o = n.group[n.currIndex].opts.slideShow
        ;(t.$button = n.$refs.toolbar
          .find('[data-fancybox-play]')
          .on('click', function () {
            t.toggle()
          })),
          n.group.length < 2 || !o
            ? t.$button.hide()
            : o.progress &&
              (t.$progress = e(
                '<div class="fancybox-progress"></div>'
              ).appendTo(n.$refs.inner))
      },
      set: function (t) {
        var n = this,
          o = n.instance,
          i = o.current
        i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1)
          ? n.isActive &&
            'video' !== i.contentType &&
            (n.$progress &&
              e.fancybox.animate(
                n.$progress.show(),
                { scaleX: 1 },
                i.opts.slideShow.speed
              ),
            (n.timer = setTimeout(function () {
              o.current.opts.loop || o.current.index != o.group.length - 1
                ? o.next()
                : o.jumpTo(0)
            }, i.opts.slideShow.speed)))
          : (n.stop(), (o.idleSecondsCounter = 0), o.showControls())
      },
      clear: function () {
        var t = this
        clearTimeout(t.timer),
          (t.timer = null),
          t.$progress && t.$progress.removeAttr('style').hide()
      },
      start: function () {
        var t = this,
          e = t.instance.current
        e &&
          (t.$button
            .attr(
              'title',
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP
            )
            .removeClass('fancybox-button--play')
            .addClass('fancybox-button--pause'),
          (t.isActive = !0),
          e.isComplete && t.set(!0),
          t.instance.trigger('onSlideShowChange', !0))
      },
      stop: function () {
        var t = this,
          e = t.instance.current
        t.clear(),
          t.$button
            .attr(
              'title',
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START
            )
            .removeClass('fancybox-button--pause')
            .addClass('fancybox-button--play'),
          (t.isActive = !1),
          t.instance.trigger('onSlideShowChange', !1),
          t.$progress && t.$progress.removeAttr('style').hide()
      },
      toggle: function () {
        var t = this
        t.isActive ? t.stop() : t.start()
      },
    }),
      e(t).on({
        'onInit.fb': function (t, e) {
          e && !e.SlideShow && (e.SlideShow = new n(e))
        },
        'beforeShow.fb': function (t, e, n, o) {
          var i = e && e.SlideShow
          o
            ? i && n.opts.slideShow.autoStart && i.start()
            : i && i.isActive && i.clear()
        },
        'afterShow.fb': function (t, e, n) {
          var o = e && e.SlideShow
          o && o.isActive && o.set()
        },
        'afterKeydown.fb': function (n, o, i, a, s) {
          var r = o && o.SlideShow
          !r ||
            !i.opts.slideShow ||
            (80 !== s && 32 !== s) ||
            e(t.activeElement).is('button,a,input') ||
            (a.preventDefault(), r.toggle())
        },
        'beforeClose.fb onDeactivate.fb': function (t, e) {
          var n = e && e.SlideShow
          n && n.stop()
        },
      }),
      e(t).on('visibilitychange', function () {
        var n = e.fancybox.getInstance(),
          o = n && n.SlideShow
        o && o.isActive && (t.hidden ? o.clear() : o.set())
      })
  })(document, jQuery),
  (function (t, e) {
    'use strict'
    var n = (function () {
      for (
        var e = [
            [
              'requestFullscreen',
              'exitFullscreen',
              'fullscreenElement',
              'fullscreenEnabled',
              'fullscreenchange',
              'fullscreenerror',
            ],
            [
              'webkitRequestFullscreen',
              'webkitExitFullscreen',
              'webkitFullscreenElement',
              'webkitFullscreenEnabled',
              'webkitfullscreenchange',
              'webkitfullscreenerror',
            ],
            [
              'webkitRequestFullScreen',
              'webkitCancelFullScreen',
              'webkitCurrentFullScreenElement',
              'webkitCancelFullScreen',
              'webkitfullscreenchange',
              'webkitfullscreenerror',
            ],
            [
              'mozRequestFullScreen',
              'mozCancelFullScreen',
              'mozFullScreenElement',
              'mozFullScreenEnabled',
              'mozfullscreenchange',
              'mozfullscreenerror',
            ],
            [
              'msRequestFullscreen',
              'msExitFullscreen',
              'msFullscreenElement',
              'msFullscreenEnabled',
              'MSFullscreenChange',
              'MSFullscreenError',
            ],
          ],
          n = {},
          o = 0;
        o < e.length;
        o++
      ) {
        var i = e[o]
        if (i && i[1] in t) {
          for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a]
          return n
        }
      }
      return !1
    })()
    if (n) {
      var o = {
        request: function (e) {
          ;(e = e || t.documentElement),
            e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
        },
        exit: function () {
          t[n.exitFullscreen]()
        },
        toggle: function (e) {
          ;(e = e || t.documentElement),
            this.isFullscreen() ? this.exit() : this.request(e)
        },
        isFullscreen: function () {
          return Boolean(t[n.fullscreenElement])
        },
        enabled: function () {
          return Boolean(t[n.fullscreenEnabled])
        },
      }
      e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
          fullScreen:
            '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
        },
        fullScreen: { autoStart: !1 },
      }),
        e(t).on(n.fullscreenchange, function () {
          var t = o.isFullscreen(),
            n = e.fancybox.getInstance()
          n &&
            (n.current &&
              'image' === n.current.type &&
              n.isAnimating &&
              ((n.isAnimating = !1),
              n.update(!0, !0, 0),
              n.isComplete || n.complete()),
            n.trigger('onFullscreenChange', t),
            n.$refs.container.toggleClass('fancybox-is-fullscreen', t),
            n.$refs.toolbar
              .find('[data-fancybox-fullscreen]')
              .toggleClass('fancybox-button--fsenter', !t)
              .toggleClass('fancybox-button--fsexit', t))
        })
    }
    e(t).on({
      'onInit.fb': function (t, e) {
        var i
        if (!n)
          return void e.$refs.toolbar
            .find('[data-fancybox-fullscreen]')
            .remove()
        e && e.group[e.currIndex].opts.fullScreen
          ? ((i = e.$refs.container),
            i.on(
              'click.fb-fullscreen',
              '[data-fancybox-fullscreen]',
              function (t) {
                t.stopPropagation(), t.preventDefault(), o.toggle()
              }
            ),
            e.opts.fullScreen &&
              !0 === e.opts.fullScreen.autoStart &&
              o.request(),
            (e.FullScreen = o))
          : e && e.$refs.toolbar.find('[data-fancybox-fullscreen]').hide()
      },
      'afterKeydown.fb': function (t, e, n, o, i) {
        e &&
          e.FullScreen &&
          70 === i &&
          (o.preventDefault(), e.FullScreen.toggle())
      },
      'beforeClose.fb': function (t, e) {
        e &&
          e.FullScreen &&
          e.$refs.container.hasClass('fancybox-is-fullscreen') &&
          o.exit()
      },
    })
  })(document, jQuery),
  (function (t, e) {
    'use strict'
    var n = 'fancybox-thumbs'
    e.fancybox.defaults = e.extend(
      !0,
      {
        btnTpl: {
          thumbs:
            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: '.fancybox-container',
          axis: 'y',
        },
      },
      e.fancybox.defaults
    )
    var o = function (t) {
      this.init(t)
    }
    e.extend(o.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function (t) {
        var e = this,
          n = t.group,
          o = 0
        ;(e.instance = t),
          (e.opts = n[t.currIndex].opts.thumbs),
          (t.Thumbs = e),
          (e.$button = t.$refs.toolbar.find('[data-fancybox-thumbs]'))
        for (
          var i = 0, a = n.length;
          i < a && (n[i].thumb && o++, !(o > 1));
          i++
        );
        o > 1 && e.opts
          ? (e.$button.removeAttr('style').on('click', function () {
              e.toggle()
            }),
            (e.isActive = !0))
          : e.$button.hide()
      },
      create: function () {
        var t,
          o = this,
          i = o.instance,
          a = o.opts.parentEl,
          s = []
        o.$grid ||
          ((o.$grid = e(
            '<div class="' + n + ' ' + n + '-' + o.opts.axis + '"></div>'
          ).appendTo(i.$refs.container.find(a).addBack().filter(a))),
          o.$grid.on('click', 'a', function () {
            i.jumpTo(e(this).attr('data-index'))
          })),
          o.$list ||
            (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)),
          e.each(i.group, function (e, n) {
            ;(t = n.thumb),
              t || 'image' !== n.type || (t = n.src),
              s.push(
                '<a href="javascript:void(0);" tabindex="0" data-index="' +
                  e +
                  '"' +
                  (t && t.length
                    ? ' style="background-image:url(' + t + ')"'
                    : 'class="fancybox-thumbs-missing"') +
                  '></a>'
              )
          }),
          (o.$list[0].innerHTML = s.join('')),
          'x' === o.opts.axis &&
            o.$list.width(
              parseInt(o.$grid.css('padding-right'), 10) +
                i.group.length * o.$list.children().eq(0).outerWidth(!0)
            )
      },
      focus: function (t) {
        var e,
          n,
          o = this,
          i = o.$list,
          a = o.$grid
        o.instance.current &&
          ((e = i
            .children()
            .removeClass('fancybox-thumbs-active')
            .filter('[data-index="' + o.instance.current.index + '"]')
            .addClass('fancybox-thumbs-active')),
          (n = e.position()),
          'y' === o.opts.axis &&
          (n.top < 0 || n.top > i.height() - e.outerHeight())
            ? i.stop().animate({ scrollTop: i.scrollTop() + n.top }, t)
            : 'x' === o.opts.axis &&
              (n.left < a.scrollLeft() ||
                n.left > a.scrollLeft() + (a.width() - e.outerWidth())) &&
              i.parent().stop().animate({ scrollLeft: n.left }, t))
      },
      update: function () {
        var t = this
        t.instance.$refs.container.toggleClass(
          'fancybox-show-thumbs',
          this.isVisible
        ),
          t.isVisible
            ? (t.$grid || t.create(),
              t.instance.trigger('onThumbsShow'),
              t.focus(0))
            : t.$grid && t.instance.trigger('onThumbsHide'),
          t.instance.update()
      },
      hide: function () {
        ;(this.isVisible = !1), this.update()
      },
      show: function () {
        ;(this.isVisible = !0), this.update()
      },
      toggle: function () {
        ;(this.isVisible = !this.isVisible), this.update()
      },
    }),
      e(t).on({
        'onInit.fb': function (t, e) {
          var n
          e &&
            !e.Thumbs &&
            ((n = new o(e)), n.isActive && !0 === n.opts.autoStart && n.show())
        },
        'beforeShow.fb': function (t, e, n, o) {
          var i = e && e.Thumbs
          i && i.isVisible && i.focus(o ? 0 : 250)
        },
        'afterKeydown.fb': function (t, e, n, o, i) {
          var a = e && e.Thumbs
          a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
        },
        'beforeClose.fb': function (t, e) {
          var n = e && e.Thumbs
          n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
        },
      })
  })(document, jQuery),
  (function (t, e) {
    'use strict'
    function n(t) {
      var e = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
      }
      return String(t).replace(/[&<>"'`=\/]/g, function (t) {
        return e[t]
      })
    }
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        share:
          '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
      },
      share: {
        url: function (t, e) {
          return (
            (!t.currentHash &&
              'inline' !== e.type &&
              'html' !== e.type &&
              (e.origSrc || e.src)) ||
            window.location
          )
        },
        tpl:
          '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
      },
    }),
      e(t).on('click', '[data-fancybox-share]', function () {
        var t,
          o,
          i = e.fancybox.getInstance(),
          a = i.current || null
        a &&
          ('function' === e.type(a.opts.share.url) &&
            (t = a.opts.share.url.apply(a, [i, a])),
          (o = a.opts.share.tpl
            .replace(
              /\{\{media\}\}/g,
              'image' === a.type ? encodeURIComponent(a.src) : ''
            )
            .replace(/\{\{url\}\}/g, encodeURIComponent(t))
            .replace(/\{\{url_raw\}\}/g, n(t))
            .replace(
              /\{\{descr\}\}/g,
              i.$caption ? encodeURIComponent(i.$caption.text()) : ''
            )),
          e.fancybox.open({
            src: i.translate(i, o),
            type: 'html',
            opts: {
              touch: !1,
              animationEffect: !1,
              afterLoad: function (t, e) {
                i.$refs.container.one('beforeClose.fb', function () {
                  t.close(null, 0)
                }),
                  e.$content.find('.fancybox-share__button').click(function () {
                    return (
                      window.open(this.href, 'Share', 'width=550, height=450'),
                      !1
                    )
                  })
              },
              mobile: { autoFocus: !1 },
            },
          }))
      })
  })(document, jQuery),
  (function (t, e, n) {
    'use strict'
    function o() {
      var e = t.location.hash.substr(1),
        n = e.split('-'),
        o =
          n.length > 1 && /^\+?\d+$/.test(n[n.length - 1])
            ? parseInt(n.pop(-1), 10) || 1
            : 1,
        i = n.join('-')
      return { hash: e, index: o < 1 ? 1 : o, gallery: i }
    }
    function i(t) {
      '' !== t.gallery &&
        n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']")
          .eq(t.index - 1)
          .focus()
          .trigger('click.fb-start')
    }
    function a(t) {
      var e, n
      return (
        !!t &&
        ((e = t.current ? t.current.opts : t.opts),
        '' !==
          (n =
            e.hash ||
            (e.$orig
              ? e.$orig.data('fancybox') || e.$orig.data('fancybox-trigger')
              : '')) && n)
      )
    }
    n.escapeSelector ||
      (n.escapeSelector = function (t) {
        return (t + '').replace(
          /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          function (t, e) {
            return e
              ? '\0' === t
                ? '�'
                : t.slice(0, -1) +
                  '\\' +
                  t.charCodeAt(t.length - 1).toString(16) +
                  ' '
              : '\\' + t
          }
        )
      }),
      n(function () {
        !1 !== n.fancybox.defaults.hash &&
          (n(e).on({
            'onInit.fb': function (t, e) {
              var n, i
              !1 !== e.group[e.currIndex].opts.hash &&
                ((n = o()),
                (i = a(e)) &&
                  n.gallery &&
                  i == n.gallery &&
                  (e.currIndex = n.index - 1))
            },
            'beforeShow.fb': function (n, o, i, s) {
              var r
              i &&
                !1 !== i.opts.hash &&
                (r = a(o)) &&
                ((o.currentHash =
                  r + (o.group.length > 1 ? '-' + (i.index + 1) : '')),
                t.location.hash !== '#' + o.currentHash &&
                  (s && !o.origHash && (o.origHash = t.location.hash),
                  o.hashTimer && clearTimeout(o.hashTimer),
                  (o.hashTimer = setTimeout(function () {
                    'replaceState' in t.history
                      ? (t.history[s ? 'pushState' : 'replaceState'](
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            '#' +
                            o.currentHash
                        ),
                        s && (o.hasCreatedHistory = !0))
                      : (t.location.hash = o.currentHash),
                      (o.hashTimer = null)
                  }, 300))))
            },
            'beforeClose.fb': function (n, o, i) {
              i &&
                !1 !== i.opts.hash &&
                (clearTimeout(o.hashTimer),
                o.currentHash && o.hasCreatedHistory
                  ? t.history.back()
                  : o.currentHash &&
                    ('replaceState' in t.history
                      ? t.history.replaceState(
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            (o.origHash || '')
                        )
                      : (t.location.hash = o.origHash)),
                (o.currentHash = null))
            },
          }),
          n(t).on('hashchange.fb', function () {
            var t = o(),
              e = null
            n.each(n('.fancybox-container').get().reverse(), function (t, o) {
              var i = n(o).data('FancyBox')
              if (i && i.currentHash) return (e = i), !1
            }),
              e
                ? e.currentHash === t.gallery + '-' + t.index ||
                  (1 === t.index && e.currentHash == t.gallery) ||
                  ((e.currentHash = null), e.close())
                : '' !== t.gallery && i(t)
          }),
          setTimeout(function () {
            n.fancybox.getInstance() || i(o())
          }, 50))
      })
  })(window, document, jQuery),
  (function (t, e) {
    'use strict'
    var n = new Date().getTime()
    e(t).on({
      'onInit.fb': function (t, e, o) {
        e.$refs.stage.on(
          'mousewheel DOMMouseScroll wheel MozMousePixelScroll',
          function (t) {
            var o = e.current,
              i = new Date().getTime()
            e.group.length < 2 ||
              !1 === o.opts.wheel ||
              ('auto' === o.opts.wheel && 'image' !== o.type) ||
              (t.preventDefault(),
              t.stopPropagation(),
              o.$slide.hasClass('fancybox-animated') ||
                ((t = t.originalEvent || t),
                i - n < 250 ||
                  ((n = i),
                  e[
                    (-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0
                      ? 'next'
                      : 'previous'
                  ]())))
          }
        )
      },
    })
  })(document, jQuery)
