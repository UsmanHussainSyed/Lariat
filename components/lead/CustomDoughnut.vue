<template>
  <div class="chart-box">
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
let myChart = null
export default {
  props: {
    options: { type: Object, default: () => ({}) },
    chartData: { type: Object, default: () => ({}) },
    chartId: { type: String, required: true },
  },
  data: () => ({
    doughnutInstance: null,
  }),
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const config = {
        type: 'doughnut',
        data: this.chartData,
        options: {
          legend: {
            display: false,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const label = data.labels[tooltipItem.index]
                const value =
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ]
                return [' ' + label.trim() + ': ' + value]
              },
            },
          },
        },
      }
      myChart = new Chart(document.getElementById(this.chartId), config)
      this.doughnutInstance = myChart
    },
  },
}
</script>
