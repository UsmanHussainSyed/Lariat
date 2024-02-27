const commonMapObj = {
  tooltip: {
    distance: 0,
    followPointer: true,
    followTouchMove: true,
    hideDelay: 200,
    style: {
      padding: 0,
    },
    borderWidth: 0,
    formatter() {
      return `<h3><strong>${this.key}</strong></h3> <br /><h4>Total Activities</h4> : <strong>${this.point.options.value}</strong>`
    },
  },
  colorAxis: {
    labels: {
      enabled: false,
    },
    min: 0,
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click() {
            vue.stateChangeHandler({
              text: this.properties['woe-label'].split(',')[0],
              name: this.properties['woe-label'].split(',')[0],
              id: this.properties['woe-label'].split(',')[0],
            })
          },
        },
      },
    },
  },
  legend: {
    margin: 20,
    title: {
      style: {
        fontWeight: 'normal',
      },
      text: 'The darker color the higher the activities count.',
    },
  },
  title: {
    text: '',
  },
  subtitle: {
    text: '',
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
    },
  },
}
let vue
export default {
  data() {
    return {
      highlightChartOption: {
        ...commonMapObj,
        chart: {
          height: 560,
          map: null,
        },
        series: [
          {
            keys: ['woe-label', 'value'],
            joinBy: 'woe-label',
            name: 'Activities Count',
            animation: {
              duration: 200,
            },
            states: {
              hover: {
                color: '#BADA55',
              },
            },
            dataLabels: {
              enabled: true,
              format: '{point.properties.hc-a2}',
            },
            allAreas: true,
            data: [],
          },
        ],
      },
    }
  },
  mounted() {
    vue = this
  },
}
