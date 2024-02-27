import USA_MAP from '@highcharts/map-collection/countries/us/us-all.geo.json'
import CANADA_MAP from '@highcharts/map-collection/countries/ca/ca-all.geo.json'
import AUS_MAP from '@highcharts/map-collection/countries/au/au-all.geo.json'
let vue
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
      return `<h3><strong>${this.key}</strong></h3> <br /><h4>Leads</h4> : <strong>${this.point.options.value}</strong>`
    },
  },
  colorAxis: {
    labels: {
      enabled: false,
    },
    min: 0,
  },
  legend: {
    margin: 20,
    title: {
      style: {
        fontWeight: 'normal',
      },
      text: 'The darker color the higher the lead count.',
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
export default {
  data() {
    return {
      lastDateOptions: [
        {
          id: 'all',
          text: 'All',
        },
        {
          id: '6',
          text: 'Week',
        },
        {
          id: '29',
          text: '30 Days',
        },
        {
          id: '89',
          text: 'Quarter',
        },
        {
          id: '364',
          text: 'Year',
        },
        {
          id: '-2',
          text: 'Custom',
        },
      ],
      usaHighlightChartOption: {
        ...commonMapObj,
        chart: {
          height: 560,
          map: USA_MAP,
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click() {
                  vue.$refs.leadListTab.selectedState = this.properties['hc-a2']
                },
              },
            },
          },
        },
        series: [
          {
            name: 'Lead Count',
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
              format: '{point.properties.postal-code}',
            },
            allAreas: true,
            data: [],
          },
        ],
      },
      canadaHighlightChartOption: {
        ...commonMapObj,
        chart: {
          height: 560,
          map: CANADA_MAP,
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click() {
                  vue.$refs.leadListTab.selectedState = this.properties['hc-a2']
                },
              },
            },
          },
        },
        series: [
          {
            name: 'Lead Count',
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
              format: '{point.properties.postal-code}',
            },
            allAreas: true,
            data: [],
          },
        ],
      },
      australiaHighlightChartOption: {
        ...commonMapObj,
        chart: {
          height: 560,
          map: AUS_MAP,
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click() {
                  vue.$refs.leadListTab.selectedState = this.properties['hc-a2']
                },
              },
            },
          },
        },
        series: [
          {
            name: 'Lead Count',
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
              format: '{point.properties.postal-code}',
            },
            allAreas: true,
            data: [],
          },
        ],
      },
      DATE_FORMAT: 'Do, MMM YYYY',
    }
  },
  computed: {
    isBlank() {
      return (str) => !str || /^\s*$/.test(str)
    },
    getDayTitle() {
      const text = this.lastDateOptions.find(
        (d) => d.id === this.lastDate
      )?.text
      return text || 'custom'
    },
    getDateByDays() {
      return (dateToSubstract) => {
        const endDate = this.$moment().format('YYYY-MM-DD')
        let startDate = ''
        if (dateToSubstract !== 365) {
          startDate = this.$moment()
            .subtract(dateToSubstract, 'days')
            .format('YYYY-MM-DD')
        } else {
          startDate = this.$moment()
            .subtract(dateToSubstract, 'years')
            .format('YYYY-MM-DD')
        }
        return { startDate, endDate }
      }
    },
  },
  mounted() {
    vue = this
  },
}
