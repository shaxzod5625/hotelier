import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import ('../views/Dashboard.vue')
  },
  {
    path: '/frontdesk',
    name: 'Frontdesk',
    component: () => import ('../views/Frontdesk.vue')
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: () => import ('../views/Cashier.vue')
  },
  {
    path: '/folio',
    name: 'Folio',
    // component: () => import ('../views/Folio.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // component: () => import ('../views/Calendar.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    // component: () => import ('../views/Statistics.vue')
  },
  {
    path: '/reports',
    name: 'Reports',
    // component: () => import ('../views/Reports.vue')
  },
  {
    path: '/roomboard',
    name: 'Roomboard',
    // component: () => import ('../views/Roomboard.vue')
  },
  {
    path: '/channel-manager',
    name: 'Channel-manager',
    // component: () => import ('../views/Channel-manager.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    // component: () => import ('../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
