import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    meta: {layout: 'additional', auth: true},
    // component: () => import ('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    meta: {layout: 'additional', auth: false},
    component: () => import ('../views/LoginPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/Dashboard.vue'),
  },
  {
    path: '/frontdesk',
    name: 'Frontdesk',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/Frontdesk.vue'),
  },
  {
    path: '/cashier',
    name: 'Cashier',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/Cashier.vue'),
  },
  {
    path: '/folio',
    name: 'Folio',
    meta: {layout: 'main', auth: true},
    // component: () => import ('../views/Folio.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    meta: {layout: 'main', auth: true},
    // component: () => import ('../views/Calendar.vue'),
  },
  {
    path: '/statistics',
    name: 'Statistics',
    meta: {layout: 'main', auth: true},
    // component: () => import ('../views/Statistics.vue'),
  },
  {
    path: '/reports',
    name: 'Reports',
    meta: {layout: 'main', auth: true},
    // component: () => import ('../views/Reports.vue'),
  },
  {
    path: '/room-board',
    name: 'Roomboard',
    meta: {layout: 'main', auth: true},
    // component: () => import ('../views/Roomboard.vue'),
  },
  {
    path: '/channel-manager',
    name: 'Channel-manager',
    meta: {layout: 'main', auth: true},
    // component: () => import ('../views/Channel-manager.vue'),
  },
  {
    path: '/settings/',
    name: 'Settings',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/Settings.vue'),
  },
  {
    path: '/settings/object-registration',
    name: 'Registration',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/ObjectReg.vue'),
  },
  {
    path: '/settings/requisites',
    name: 'Requisites',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/Requisites.vue'),
  },
  {
    path: '/settings/employees',
    name: 'Employees',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/Employees.vue'),
  },
  {
    path: '/settings/employees/receptionists',
    name: 'Receptionists',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/employees/Receptionists.vue'),
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  const uid = JSON.parse(window.localStorage.currentUser)
  const requireAuth = to.matched.some(record => record.meta.auth)
  console.log(uid);
  if ((uid === "Unauthorized" && requireAuth) || (uid === null && requireAuth)) {next({path: '/login'})
  } else {next()}
})

export default router
