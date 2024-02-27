import Vue from 'vue'
import Highcharts from 'highcharts'
import Maps from 'highcharts/modules/map'
import HighchartsVue from 'highcharts-vue'
import Exporting from 'highcharts/modules/exporting'
Maps(Highcharts)
Exporting(Highcharts)
Vue.use(HighchartsVue)
