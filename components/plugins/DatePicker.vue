<template>
  <input
    v-tooltip="tooltip"
    type="text"
    :placeholder="placeholder"
    :class="classObj"
    :style="dateStyle"
    data-lpignore="true"
  />
</template>
<script>
import flatpickr from 'flatpickr'
import moment from 'moment-timezone'
export default {
  name: 'DatePicker',
  props: {
    tooltip: {
      type: [String],
      default: '',
    },
    displayFormat: {
      type: [String],
      default: 'MMM D, YY',
    },
    startDate: {
      type: [String, Date],
      default: null,
    },
    colorDate: {
      type: Boolean,
      default: false,
    },
    human: {
      type: Boolean,
      default: false,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    customEvent: {
      type: Boolean,
      default: false,
    },
    disableDate: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default() {
        return []
      },
    },
    classObj: { type: [String, Object], default: null },
    placeholder: { type: [String], default: 'Please select Date' },
    minDate: {
      type: [String, Date],
      default: null,
    },
    maxDate: { type: [String, Date], default: null },
  },
  data() {
    return {
      fp: null,
      defaultDateColor: '#393939',
      previousDateColor: '#ff0000',
      sameOrNextDateColor: '#008000',

      style: {},
      formattedDate: null,
      config: {
        wrap: false, // set wrap to true only when using 'input-group'
        altFormat: 'M	j, Y',
        altInput: false,
        dateFormat: 'Y-m-d',
        monthSelectorType: 'static',
        inline: this.inline,
        shorthandCurrentMonth: true,
        locale: {
          firstDayOfWeek: 1, // start week on Monday
        },
        formatDate: (date, format, locale) =>
          this.dateFormat(date, format, locale),
        onChange: (selectedDates, dateStr, instance) =>
          this.onChange(selectedDates, dateStr, instance),
      },
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    dateStyle() {
      const date = this.formattedDate
      const momentPlus2 = this.$moment().add(2, 'days').local()
      if (this.colorDate) {
        if (this.$moment(date).isBefore(this.$moment(), 'day')) {
          return { color: this.previousDateColor }
        }
        if (this.$moment(date).isSameOrAfter(this.$moment(), 'day')) {
          if (this.$moment(date).isSameOrAfter(momentPlus2, 'day')) {
            return { color: this.defaultDateColor }
          } else {
            return { color: this.sameOrNextDateColor }
          }
        }
      } else {
        return this.style
      }
    },
  },
  watch: {
    startDate(newVal, OldVal) {
      this.fp.setDate(newVal)
      this.formattedDate = newVal
    },
    disableDate(newVal, oldVal) {
      newVal.length && this.fp.set('disable', newVal)
    },
    minDate(newVal, oldVal) {
      this.fp.set('minDate', newVal)
    },
    maxDate(newVal, oldVal) {
      this.fp.set('maxDate', newVal)
    },
  },
  mounted() {
    this.formattedDate = this.startDate
    this.fp = flatpickr(this.$el, this.config)
    this.fp.setDate(this.startDate)
    this.disableDate.length && this.fp.set('disable', this.disableDate)
    this.fp.set('minDate', this.minDate)
    this.fp.set('maxDate', this.maxDate)
  },

  destroyed() {
    this.fp.destroy()
  },
  methods: {
    dateFormat(date, format, locale) {
      if (this.human) {
        return moment(date).calendar(null, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: `${this.displayFormat}`,
          lastDay: '[Yesterday]',
          lastWeek: `${this.displayFormat}`,
          sameElse: `${this.displayFormat}`,
        })
      } else {
        return moment(date).format(`${this.displayFormat}`)
      }
    },
    onChange(selectedDates, dateStr, instance) {
      const startDate = this.$moment(new Date(selectedDates))
        .local()
        .format('YYYY-MM-DD hh:mm:ss')
      this.formattedDate = startDate
      this.$emit('update:startDate', startDate)
      this.customEvent && this.$emit('dateChanged', { startDate })
    },
  },
}
</script>

<style scoped></style>
