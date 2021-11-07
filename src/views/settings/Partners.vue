<template>
  <div class="con-page">

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Партнеры</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="simple-content">
      <router-link
        class="card-div"
        tag="div"
        :to="{ name: 'Tour Agencies'}"
      >
        <div class="card-div-head">
          <div class="num-text">
            <h1>32</h1>
            <h4>Всего партнеров</h4>
          </div>
          <div class="vert-divider"/>
          <div class="num-text">
            <h1>18</h1>
            <h4>Активные</h4>
          </div>
        </div>
        <div class="card-body">
          <h3>Туристические агентства</h3>
        </div>
      </router-link>

      <router-link
        class="card-div"
        tag="div"
        :to="{ name: 'Partner Companies'}"
      >
        <div class="card-div-head">
          <div class="num-text">
            <h1>32</h1>
            <h4>Всего партнеров</h4>
          </div>
          <div class="vert-divider"/>
          <div class="num-text">
            <h1>18</h1>
            <h4>Активные</h4>
          </div>
        </div>
        <div class="card-body">
          <h3>Компании - партнёры</h3>
        </div>
      </router-link>

      <router-link
        class="card-div"
        tag="div"
        :to="{ name: 'Agents'}"
      >
        <div class="card-div-head">
          <div class="num-text">
            <h1>32</h1>
            <h4>Всего партнеров</h4>
          </div>
          <div class="vert-divider"/>
          <div class="num-text">
            <h1>18</h1>
            <h4>Активные</h4>
          </div>
        </div>
        <div class="card-body">
          <h3>Агенты</h3>
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Partners',
}
</script>

<style>

</style>