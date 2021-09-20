<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/employees'}" class="breadcrump">Сотрудники</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Администраторы</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="search-bar-empl">
      <div class="search-div">
        <input type="search" class="search-input" placeholder="Введите имя гостя или номер брони" v-model="input">
        <h4>Количество сотрудников: <span>{{receptionists.length}}</span></h4>
      </div>
      <div class="btn-div">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Receptionists',

  data: () => ({
    input: '',

    receptionists: [
      {
        admin: '1'
      },
      {
        admin: '2'
      },
      {
        admin: '3'
      },
      {
        admin: '4'
      },
    ]
  })
}
</script>