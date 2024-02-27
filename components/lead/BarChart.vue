<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    data() {
      this.renderChart()
    },
  },
  mounted() {
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        enabled: true,
        callbacks: {
          label(tooltipItems) {
            return ` Leads: ${tooltipItems.value}`
          },
        },
      },
      plugins: {},
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              drawOnChartArea: false,
              // zeroLineColor: 'gray',
              // color: 'transparent',
            },
            ticks: {
              callback(value = '') {
                const elipses = value && value.length > 12 ? '...' : ''
                return value && value.substr(0, 12) + elipses // truncate
              },
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              drawOnChartArea: false,
              // zeroLineColor: 'gray',
              // color: 'transparent',
            },

            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      hover: {
        onHover: (event, chartElement) => {
          event.target.style.cursor = chartElement[0] ? 'pointer' : 'default'
        },
      },
      legend: {
        display: false,
        onHover: (e) => (e.target.style.cursor = 'pointer'),
      },
      onClick: this.handleOnClick,
    }
    this.renderChart(this.data, options)
  },
  methods: {
    handleOnClick(c, i) {
      const e = i[0]
      if (e) {
        const x_value = this.data.labels[e._index]
        const y_value = this.data.datasets[0].data[e._index]
        this.$emit('onBarChanged', { x: x_value, y: y_value })
      }
    },
  },
}
</script>

<style></style>
