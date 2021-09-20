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
        v-for="emplc in employeecards"
        :key="emplc"
        tag="div"
        :to="emplc.path"
      >
        <div class="employee-card-titleblock">
          <h1>{{emplc.count}}</h1>
          <h3>{{emplc.title}}</h3>
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
      count: '4',
      path: './employees/managers'},

      {title: 'Администраторы',
      count: '12',
      path: './employees/receptionists'},

      {title: 'Заведующие залом',
      count: '2',
      path: './employees/restaurant-managers'},

      {title: 'Горничные',
      count: '6',
      path: './employees/maids'},

      {title: 'Официанты',
      count: '22',
      path: './employees/waiters'},

      {title: 'Повара',
      count: '6',
      path: './employees/cooks'},
      ]
  })
}
</script>