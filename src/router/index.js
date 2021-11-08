import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    meta: {layout: 'additional', auth: true},
    // component: () => import ('../views/Home.vue'),
    redirect: '/dashboard',
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
    path: '/settings/room-fund',
    name: 'RoomFund',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/RoomFund.vue'),
  },
  {
    path: '/settings/room-fund/:id',
    name: 'Category Window',
    meta: {layout: 'main', auth: true},
    params: true,
    component: () => import ('../views/settings/roomfund/CategoryWindow.vue'),
  },
  {
    path: '/settings/employees/receptionists',
    name: 'Receptionists',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/employees/Receptionists.vue'),
  },
  {
    path: '/settings/employees/managers',
    name: 'Managers',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/employees/Managers.vue'),
  },
  {
    path: '/settings/employees/restaurant-managers',
    name: 'Restaurant Managers',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/employees/RestaurantManagers.vue'),
  },
  {
    path: '/settings/employees/maids',
    name: 'Maids',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/employees/Maids.vue'),
  },
  {
    path: '/settings/employees/waiters',
    name: 'Waiters',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/employees/Waiters.vue'),
  },
  {
    path: '/settings/employees/cooks',
    name: 'Cooks',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/employees/Cooks.vue'),
  },
  {
    path: '/settings/blocks',
    name: 'Blocks',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/Blocks.vue'),
  },
  {
    path: '/settings/blocks/:id',
    name: 'Block Window',
    meta: {layout: 'main', auth: true},
    params: true,
    component: () => import ('../views/settings/blocksAndFloors/BlockWindow.vue'),
  },
  {
    path: '/settings/partners',
    name: 'Partners',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/Partners.vue'),
  },
  {
    path: '/settings/partners/tour-agencies',
    name: 'Tour Agencies',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/partners/TourAgencies.vue'),
  },
  {
    path: '/settings/partners/partner-companies',
    name: 'Partner Companies',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/partners/PartnerCompanies.vue'),
  },
  {
    path: '/settings/partners/agents',
    name: 'Agents',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/partners/Agents.vue'),
  },
  {
    path: '/settings/booking-rules',
    name: 'Booking Rules',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/BookingRules.vue'),
  },
  {
    path: '/settings/document-forms',
    name: 'Document Forms',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/DocumentForms.vue'),
  },
  {
    path: '/settings/document-forms/settings',
    name: 'Document Forms Settings',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/documentForms/DocFormsSettings.vue'),
  },
  {
    path: '/settings/facilities',
    name: 'Facilities',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/Facilities.vue'),
  },
  {
    path: '/settings/tariffs',
    name: 'Tariffs',
    meta: {layout: 'main', auth: true},
    component: () => import ('../views/settings/Tariffs.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && window.sessionStorage.currentUser === undefined) {next({path: '/login'})
  } else if (requireAuth && JSON.parse(window.sessionStorage.currentUser) === "Unauthorized") {
    next({path: '/login'})
  } else if (requireAuth && JSON.parse(window.sessionStorage.currentUser) === 'Invalid Credentials') {
    next({path: '/login'})
  } else if (requireAuth && JSON.parse(window.sessionStorage.currentUser).error === 'invalid password') {
    next({path: '/login'})
  }
  else {next()}
})

export default router