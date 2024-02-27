<template>
  <highcharts
    ref="chart"
    :constructor-type="'mapChart'"
    class="hc"
    :options="chartOptions"
  ></highcharts>
</template>

<script>
export default {
  props: {
    chartOptions: {
      type: Object,
      required: true,
    },
  },
}
</script>
