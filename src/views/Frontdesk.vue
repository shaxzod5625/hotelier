<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="breadcrump">Фронтдеск</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="tabbar">
      <TabBar
        :tabs="['Проживают', 'Заезжают', 'Выехали', 'Брони', 'Профили гостей']"
        :selected="selected"
        @selected="setSelected"
      >
      </TabBar>

      <button class="tabbar-btn"
        v-if="selected === 'Брони'"
      >
        Создать бронь
      </button>

      <button class="tabbar-btn"
        v-else
      >
        Разместить
      </button>

    </div>

    <div
      v-if="selected === 'Проживают'"
      class="tab-conpage"
    >
      <Reside/>
    </div>

    <div
      v-if="selected === 'Заезжают'"
      class="tab-conpage"
    >
      <div class="filter-block">
        <div class="search-bar">
          <input type="text" placeholder="Введите имя гостя или номер брони" v-model="search">

          <h3>Сортировка: <span>Все</span></h3>
        </div>
        <div class="button-bar">
          <div class="btns">
            <button class="sec-btn">
              <img src="@/assets/icons/Filter-sm.svg" alt="">
              <span>Фильтр</span>
            </button>
            <button class="sec-btn">
              <img src="@/assets/icons/Print-sm.svg" alt="">
              <span>Распечатать</span>
            </button>
          </div>
          <h3>
            Вид: 
            <span>Карточки</span>
            <img src="@/assets/icons/Arrow-dwn.svg" alt="">
          </h3>
        </div>
      </div>
      <Checkingin/>
    </div>

    <div
      v-if="selected === 'Выехали'"
      class="tab-conpage"
    >
      <div class="filter-block">
        <div class="search-bar">
          <input type="text" placeholder="Введите имя гостя или номер брони" v-model="search">

          <h3>Сортировка: <span>Все</span></h3>
        </div>
        <div class="button-bar">
          <div class="btns">
            <button class="sec-btn">
              <img src="@/assets/icons/Filter-sm.svg" alt="">
              <span>Фильтр</span>
            </button>
            <button class="sec-btn">
              <img src="@/assets/icons/Print-sm.svg" alt="">
              <span>Распечатать</span>
            </button>
          </div>
          <h3>
            Вид: 
            <span>Карточки</span>
            <img src="@/assets/icons/Arrow-dwn.svg" alt="">
          </h3>
        </div>
      </div>
      <Checkedout/>
    </div>

    <div
      v-if="selected === 'Брони'"
      class="tab-conpage"
    >
      <div class="filter-block">
        <div class="search-bar">
          <input type="text" placeholder="Введите имя гостя или номер брони" v-model="search">

          <h3>Сортировка: <span>Все</span></h3>
        </div>
        <div class="button-bar">
          <div class="btns">
            <button class="sec-btn">
              <img src="@/assets/icons/Filter-sm.svg" alt="">
              <span>Фильтр</span>
            </button>
            <button class="sec-btn">
              <img src="@/assets/icons/Print-sm.svg" alt="">
              <span>Распечатать</span>
            </button>
            <button class="sec-btn">
              <img src="@/assets/icons/Cancel-sm.svg" alt="">
              <span>Аннулировать</span>
            </button>
          </div>
          <h3>
            Вид: 
            <span>Карточки</span>
            <img src="@/assets/icons/Arrow-dwn.svg" alt="">
          </h3>
        </div>
      </div>
      <Bookings/>
    </div>

    <div
      v-if="selected === 'Профили гостей'"
      class="tab-conpage"
    >
      <Guestprofile/>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import Tab from '@/components/Tab.vue'
import Reside from '@/views/frontdesk/Reside.vue'
import Checkingin from './frontdesk/Checkingin.vue'
import Checkedout from './frontdesk/Checkedout.vue'
import Bookings from './frontdesk/Bookings.vue'
import Guestprofile from './frontdesk/Guestprofile.vue'


export default {
  name: 'Frontdesk',
  
  components: {
    TabBar, Tab, Reside, Checkingin, Checkedout, Bookings, Guestprofile
  },

  data: () => ({
      selected: 'Проживают',
      input: ''
  }),

  methods: {
    setSelected(tab) {
      this.selected = tab;
    }
  }
}
</script>