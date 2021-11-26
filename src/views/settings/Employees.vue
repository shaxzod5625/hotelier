<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Сотрудники</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="con-page-grid">
      <router-link
        class="employee-card"
        v-for="(employeesCard, idx) in employeesAmount"
        :key="idx"
        tag="div"
        :to="employeesCard.path"
        @click.native="getAccesses(employeesCard.name)"
      >
        <div class="employee-card-titleblock">
          <h1>{{employeesCard.count}}</h1>
          <h3>{{employeesCard.title}}</h3>
        </div>
      </router-link>

    </div>
  </div>
</template>


<script>
export default {
  name: 'Employees',

  data: () => ({

    employeecards: [
      {title: 'Менеджеры',
      path: './employees/managers',
      name: 'managers'},

      {title: 'Администраторы',
      path: './employees/receptionists',
      name: 'receptionists'},

      {title: 'Заведующие залом',
      path: './employees/restaurant-managers',
      name: 'restaurantManagers'},

      {title: 'Горничные',
      path: './employees/maids',
      name: 'maids'},

      {title: 'Официанты',
      path: './employees/waiters',
      name: 'waiters'},

      {title: 'Повара',
      path: './employees/cooks',
      name: 'cooks'},
      ]
  }),

  computed: {
    parsed() {
      if(window.sessionStorage.employees !== undefined) {
        const parsedVar = JSON.parse(window.sessionStorage.employees)

        const maids = parsedVar.maids
        const cooks = parsedVar.cooks
        const restaurantManagers = parsedVar.restaurantManagers
        const managers = parsedVar.managers
        const receptionists = parsedVar.receptionists
        const waiters = parsedVar.waiters
        
        const parsedLoop = [{count: managers}, {count: receptionists}, {count: restaurantManagers}, {count: maids}, {count: waiters}, {count: cooks}]
        return parsedLoop
      } else {
        this.$router.push('/login')
      }
    },

    employeesAmount() {
      if(window.sessionStorage.employees !== undefined) {
        const listLoop = this.employeecards.map((item, i) => Object.assign({}, item, this.parsed[i]));
        return listLoop
      } else {this.$router.push('/login')}
    }
  },

  methods: {
    getAccesses(name) {
      if(name === 'managers') {
        this.$store.dispatch('getAccessesManagers', name)
      } else if(name === 'receptionists') {
        this.$store.dispatch('getAccessesReceptionists', name)
      } else if(name === 'restaurantManagers') {
        this.$store.dispatch('getAccessesRestaurantManagers', name)
      } else if(name === 'maids') {
        this.$store.dispatch('getAccessesMaids', name)
      } else if(name === 'waiters') {
        this.$store.dispatch('getAccessesWaiters', name)
      } else if(name === 'cooks') {
        this.$store.dispatch('getAccessesCooks', name)
      }
    }
  }
}
</script>