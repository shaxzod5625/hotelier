<template>
  <div class="con-page">

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Тарифы и цены</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar">
      <TabBar
        :tabs="['Тарифы', 'Архив тарифов']"
        :selected="selected"
        @selected="setSelected"
      >
      </TabBar>

      <div
        class="tabbar-btns"
        v-if="selected === 'Тарифы'"
      >
        <button
          class="sec-btn"
        >
          <img src="@/assets/icons/Add-sm.svg" alt="">
          Создать
        </button>

        <button
          class="prim-btn"
        >
          <img src="@/assets/icons/Settings-sm-white.svg" alt="">
          Настройки
        </button>
      </div>

      <div
        class="tabbar-btns"
        v-if="selected === 'Архив тарифов'"
      >
        <button
          class="prim-btn"
        >
          <img src="@/assets/icons/Settings-sm-white.svg" alt="">
          Настройки
        </button>
      </div>

    </div>


  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import Tab from '@/components/Tab.vue'

export default {
  name: 'Tariffs',

  components: {
    TabBar, Tab
  },

  data:() => ({
    selected: 'Тарифы',

  }),

  methods: {
    setSelected(tab) {
      this.selected = tab;
    },



  }
}
</script>

<style>

</style>