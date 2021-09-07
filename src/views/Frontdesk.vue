<template>
  <div class="con-page">

    <div class="modal"
      v-if="modal"
    >
      <div class="form-filter">
        <h3>Фильтрация карточек</h3>
        <div class="divider"></div>
        <label for="select">Категория номера</label>
        <select name="select" id="">
          <option value="qwert"
            v-for="category in catoption"
            :key="category"
            tag="option"
          >
          <h3>{{category.cat}}</h3>
          </option>
        </select>
      </div>
      <div class="modal-back"
        @click="modal = false"
      >
      </div>
    </div>

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
        v-if="selected === 'Проживают'"
      >
        Разместить
      </button>

      <button class="tabbar-btn"
        v-if="selected === 'Заезжают'"
      >
        Разместить
      </button>

      <button class="tabbar-btn"
        v-if="selected === 'Выехали'"
      >
        Разместить
      </button>
      
      <button class="tabbar-btn"
        v-if="selected === 'Брони'"
      >
        Создать бронь
      </button>

    </div>

    <div
      v-if="selected === 'Проживают'"
      class="tab-conpage"
    >
    <div class="filter-block">
      <div class="search-bar">
        <input placeholder="Введите имя гостя или номер брони" v-model="input">
        <h3>Сортировка: <span>Все</span></h3>
      </div>
      <div class="button-bar">
        <div class="btns">
          <button
            class="sec-btn"
            @click="modal = true"
          >
            <img src="@/assets/icons/Filter-sm.svg" alt="">
            <span>Фильтр</span>
          </button>
          <button class="sec-btn">
            <img src="@/assets/icons/Print-sm.svg" alt="">
            <span>Распечатать</span>
          </button>
          <button class="sec-btn">
            <img src="@/assets/icons/Checkout-sm.svg" alt="">
            <span>Выселить</span>
          </button>
        </div>
        <h3>
          Вид: 
          <span>Карточки</span>
          <img src="@/assets/icons/Arrow-dwn.svg" alt="">
        </h3>
      </div>
    </div>
      <Reside/>
    </div>

    <div
      v-if="selected === 'Заезжают'"
      class="tab-conpage"
    >
      <div class="filter-block">
        <div class="search-bar">
          <input placeholder="Введите имя гостя или номер брони" v-model="input">

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
          <input placeholder="Введите имя гостя или номер брони" v-model="input">

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
          <input placeholder="Введите имя гостя или номер брони" v-model="input">

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
              <span>Отменить</span>
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
      <div class="filter-block">
        <div class="search-bar">
          <input placeholder="Введите имя гостя или серию и номер паспорта" v-model="input">

          <h3>Сортировка: <span>Все</span></h3>
        </div>
        <div class="button-bar">
          <div class="btns">
            <button class="sec-btn">
              <img src="@/assets/icons/Filter-sm.svg" alt="">
              <span>Фильтр</span>
            </button>
          </div>
          <h3>
            Вид: 
            <span>Карточки</span>
            <img src="@/assets/icons/Arrow-dwn.svg" alt="">
          </h3>
        </div>
      </div>
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
      input: '',
      modal: false,

    catoption: [
      {cat: 'Lux'},
      {cat: 'Standart'},
      {cat: 'Family'},
      {cat: 'Apartment'},
      {cat: 'Presidential'},
      {cat: 'Studio'},
    ]
  }),

  methods: {
    setSelected(tab) {
      this.selected = tab;
    }
  }
}
</script>