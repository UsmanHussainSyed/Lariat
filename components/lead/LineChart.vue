<script>
import { Line } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
export default {
  extends: Line,
  props: {
    label: {
      type: String,
      default: '',
    },
    chartLabel: {
      type: String,
      default: 'Chart',
    },
    labels: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: '#5e81f4',
    },
  },
  watch: {
    data() {
      // this._chart.destroy()
      this.render()
    },
  },
  mounted() {
    this.addPlugin(ChartDataLabels)
  },
  methods: {
    handleOnClick(c, i) {
      const e = i[0]
      if (e) {
        const x_value = this.labels[e._index]
        const y_value = this.data[e._index]
        this.$emit('onLineChanged', { x: x_value, y: y_value })
      }
    },
    getStepSize() {
      const len = Math.max(...this.data)
      let stepSize
      switch (true) {
        case len > 0 && len <= 250:
          stepSize = 20
          break
        case len > 250 && len <= 500:
          stepSize = 50
          break
        case len > 500 && len <= 1000:
          stepSize = 100
          break
        case len > 1000 && len <= 1500:
          stepSize = 150
          break
        case len > 1500 && len <= 2000:
          stepSize = 200
          break
        case len > 2000 && len <= 2500:
          stepSize = 250
          break
        case len > 2500 && len <= 3000:
          stepSize = 300
          break
        case len > 3000 && len <= 3500:
          stepSize = 350
          break
        case len > 3500 && len <= 4000:
          stepSize = 400
          break
        case len > 4000 && len <= 4500:
          stepSize = 450
          break
        case len > 450:
          stepSize = 500
          break
        default:
          stepSize = 20
      }
      return stepSize
    },
    render() {
      // const ctx = document.createElement('canvas').getContext('2d')
      // if (!ctx) return
      // const gradientFill = ctx.createLinearGradient(0, 400, 0, 100)
      // gradientFill.addColorStop(1, '#5e81f4')
      // gradientFill.addColorStop(0, '#6989F4')
      const vue = this
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: this.chartLabel,
              data: this.data,
              backgroundColor: this.color,
              borderColor: this.color,
              pointBackgroundColor: '#ADD8E6',
              fill: true,
              datalabels: {
                align: 'end',
                anchor: 'end',
              },
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
            callbacks: {
              title(t, d) {
                return `${t[0].label}`
              },
              label(t, d) {
                return ` ${vue.label}: ${t.value}`
              },
            },
          },
          title: {
            display: false,
            text: 'Count',
          },
          legend: {
            display: false,
            legend: {
              onHover(e) {
                e.target.style.cursor = 'pointer'
              },
            },
          },
          hover: {
            onHover(e) {
              const point = this.getElementAtEvent(e)
              if (point.length) e.target.style.cursor = 'pointer'
              else e.target.style.cursor = 'default'
            },
          },
          // elements: {
          //   line: {
          //     tension: 0.3,
          //   },
          // },
          scales: {
            xAxes: [
              {
                // ticks: {
                //   autoskip: true,
                //   autoSkipPadding: 50,
                // },
                gridLines: {
                  drawOnChartArea: false,
                },
                barPercentage: 0.5,
              },
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  stepSize: this.getStepSize(),
                  // padding: 10,
                  precision: 0,
                  reverse: false,
                  // max: Math.max.apply(null, this.data) + 2,
                },
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
          },
          plugins: {
            datalabels: {
              formatter(value) {
                if (value) return value
                return ''
              },
            },
          },
          layout: {
            padding: {
              top: 32,
              right: 16,
              bottom: 16,
              left: 8,
            },
          },
          onClick: this.handleOnClick,
        }
      )
    },
  },
}
</script>
