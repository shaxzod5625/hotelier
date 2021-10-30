import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import './plugins/element.js'
import '@/style/MyStyles.scss'
import VueApexCharts from 'vue-apexcharts'
import VueTheMask from 'vue-the-mask'



Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueApexCharts)
Vue.use(VueTheMask)


Vue.component('apexchart', VueApexCharts)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
