<template>
  <div
    class="d-flex align-items-center justify-content-end"
    :class="[parentClass == true ? 'mt2' : '']"
  >
    <div v-if="selectedTimeframeText != 'Custom Date'" class="report-slide">
      <button @click="$emit('previousTimeFrame')">
        <svg
          id="Layer_1"
          class="arrow-left-icon white"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4475" transform="translate(-871 -421)">
            <rect
              id="Rectangle_3013"
              x="871"
              y="421"
              class="fill-hide"
              width="18"
              height="18"
            />
            <g
              id="Icon_feather-chevron-down"
              transform="translate(581.631 103.451)"
            >
              <path
                id="Path_3433"
                class="fill-color"
                d="M301.9,334.3c-0.2,0-0.4-0.1-0.5-0.2l-7-7c-0.3-0.3-0.3-0.8,0-1.1c0,0,0,0,0,0l7-7c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1l-6.5,6.5l6.5,6.5c0.3,0.3,0.3,0.8,0,1.1C302.3,334.2,302.1,334.3,301.9,334.3z"
              />
            </g>
          </g>
        </svg>
      </button>
      <button @click="$emit('nextTimeFrame')">
        <svg
          id="Layer_1"
          class="arrow-right-icon white"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 18 18"
          xml:space="preserve"
        >
          <g id="Group_4476" transform="translate(-921 -421)">
            <rect
              id="Rectangle_3014"
              x="921"
              y="421"
              class="fill-hide"
              width="18"
              height="18"
            />
            <g
              id="Icon_feather-chevron-down"
              transform="translate(925.75 422.25)"
            >
              <path
                id="Path_3433"
                class="fill-color"
                d="M0.8,15.5c0.2,0,0.4-0.1,0.5-0.2l7-7c0.3-0.3,0.3-0.8,0-1.1c0,0,0,0,0,0l-7-7C1-0.1,0.5-0.1,0.2,0.2c-0.3,0.3-0.3,0.8,0,1l6.5,6.5l-6.5,6.5c-0.3,0.3-0.3,0.8,0,1.1C0.4,15.4,0.6,15.5,0.8,15.5z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
    <h2 class="title">
      {{ fromDate }}
      -
      {{ toDate }}
    </h2>
    <div class="month-range-filter">
      <Select2
        :value="selectedTimeFrameId"
        :options="timeFrame"
        :custom-event="true"
        @changeSelect2="dateChangeHandler(...arguments)"
      />
    </div>
    <div class="report-date">
      <DateRangePicker
        v-if="showCustomDate"
        :class-obj="{ daterange: true }"
        :start-date.sync="customFromDate"
        :end-date.sync="customToDate"
        custom-event
        @dateChanged="
          $emit('customDateSelected', { customFromDate, customToDate })
        "
      />
    </div>
  </div>
</template>
<script>
import Select2 from '~/components/plugins/Select2'
import DateRangePicker from '~/components/plugins/DateRangePicker'

export default {
  components: {
    Select2,
    DateRangePicker,
  },
  props: {
    selectedTimeframeText: { type: String, required: true },
    fromDate: { type: [Date, String, Object] },
    toDate: { type: [Date, String, Object] },
    customStartDate: [Object, String],
    customEndDate: [Object, String],
    selectedTimeFrameId: { type: Number, required: true },
    showCustomDate: { type: Boolean, default: false },
    parentClass: { type: Boolean, default: false },
  },
  data() {
    return {
      customFromDate: this.customStartDate,
      customToDate: this.customEndDate,
      timeFrame: [
        {
          id: 1,
          text: 'Week',
          name: 'week',
        },
        {
          id: 2,
          text: 'Month',
          name: 'month',
        },
        {
          id: 4,
          text: 'Quarter',
          name: 'quarter',
        },
        {
          id: 5,
          text: 'Year',
          name: 'year',
        },
        {
          id: 7,
          text: 'Custom Date',
          name: 'custom',
        },
      ],
    }
  },
  methods: {
    dateChangeHandler(data) {
      this.$emit('dateChangeHandler', data)
    },
  },
}
</script>
