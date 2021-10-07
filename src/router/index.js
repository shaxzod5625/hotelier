import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import ('../layouts/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import ('../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/frontdesk',
    name: 'Frontdesk',
    component: () => import ('../views/Frontdesk.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/cashier',
    name: 'Cashier',
    component: () => import ('../views/Cashier.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/folio',
    name: 'Folio',
    // component: () => import ('../views/Folio.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // component: () => import ('../views/Calendar.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    // component: () => import ('../views/Statistics.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    // component: () => import ('../views/Reports.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/room-board',
    name: 'Roomboard',
    // component: () => import ('../views/Roomboard.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/channel-manager',
    name: 'Channel-manager',
    // component: () => import ('../views/Channel-manager.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/settings/',
    name: 'Settings',
    component: () => import ('../views/Settings.vue'),
    
    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/settings/object-registration',
    name: 'Registration',
    component: () => import ('../views/settings/ObjectReg.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/settings/requisites',
    name: 'Requisites',
    component: () => import ('../views/settings/Requisites.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/settings/employees',
    name: 'Employees',
    component: () => import ('../views/settings/Employees.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/settings/employees/receptionists',
    name: 'Receptionists',
    component: () => import ('../views/settings/employees/Receptionists.vue'),

    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/settings/room-fund',
    name: 'Room-fund',
    component: () => import ('../views/settings/Room-fund.vue'),
    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  },
  {
    path: '/settings/room-fund/standart',
    name: 'Room-fund',
    component: () => import ('../views/settings/room-fund/Room-fund_standart'),
    beforeEnter: (to, from, next) => {
      const uid = localStorage.getItem('currentUser')
      if (uid == null) {next({path: '/login'})
      } else {next()}
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
