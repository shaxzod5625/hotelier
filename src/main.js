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
import MaskedInput from 'vue-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import money from 'v-money'
import PreLoader from './components/PreLoader'



Vue.use(Vuelidate)
Vue.use(VueAxios, axios)
Vue.use(VueApexCharts)
Vue.use(VueTheMask)
Vue.use(MaskedInput)
Vue.use(createNumberMask)
Vue.use(money, {precision: 0})


Vue.component('PreLoader', {PreLoader})


Vue.directive("uppercase", {
  bind(el, binding, vnode) {
      el.style.textTransform = 'uppercase';
  },
  update(el, binding, vnode) {
      el.style.textTransform = 'uppercase';
  }
});


Vue.component('apexchart', VueApexCharts)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
