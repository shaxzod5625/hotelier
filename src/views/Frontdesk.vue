<template>
  <div class="con-page">


<!-- filtering modal -->
    <div class="modal"
      v-if="filtering"
    >
      <form class="form-filter">
        <h3>Фильтрация</h3>
        <div class="divider"></div>
        <label for="select">Категория номера</label>
        <el-select v-model="Category" placeholder="Выберите категорию">
          <el-option
            v-for="item in filtercats"
            :key="item.Category"
            :label="item.Category"
            :value="item.Category">
          </el-option>
        </el-select>

        <label for="select">Гражданство гостя</label>
        <el-select v-model="Citizenship" filterable placeholder="Выберите гражданство">
          <el-option
            v-for="item in filtercitizenship"
            :key="item.Citizenship"
            :label="item.Citizenship"
            :value="item.Citizenship">
          </el-option>
        </el-select>

        <label for="select">Статус оплаты</label>
        <el-select v-model="Paymentstatus" placeholder="Выберите статус оплаты">
          <el-option
            v-for="item in filterpaymenstatus"
            :key="item.Paymentstatus"
            :label="item.Paymentstatus"
            :value="item.Paymentstatus">
          </el-option>
        </el-select>

        <div class="modal-btns">
          <button
            class="sec-btn"
            @click="filtering = false"
          >
            <span>Отмена</span>
          </button>

          <button class="prim-btn">
            <span>OK</span>
          </button>
        </div>
      </form>
      <div class="modal-back"
        @click="filtering = false"
      >
      </div>
    </div>


<!-- printout modal -->
    <div class="modal"
      v-if="printout"
    >
      <div class="form-filter">
        <h3>Распечатать карточки</h3>
        <div class="divider"></div>
        <h3 class="cardsectitle">Количество выбранных гостей:</h3>
        <h3 class="cardcount">12</h3>
        <h3 class="cardquest">Распечатать регистрационные карточки?</h3>
        <div class="modal-btns">
          <button
            class="sec-btn"
            @click="printout = false"
          >
            <span>Отмена</span>
          </button>

          <button class="prim-btn">
            <span>OK</span>
          </button>
        </div>
      </div>
      <div class="modal-back"
        @click="printout = false"
      >
      </div>
    </div>


<!-- checkingout modal -->
    <div class="modal"
      v-if="checkingout"
    >
      <div class="form-filter">
        <h3>Распечатать карточки</h3>
        <div class="divider"></div>
        <h3 class="cardsectitle">Количество выбранных гостей:</h3>
        <h3 class="cardcount">12</h3>
        <h3 class="cardquest">Распечатать регистрационные карточки?</h3>
        <div class="modal-btns">
          <button
            class="sec-btn"
            @click="checkingout = false"
          >
            <span>Отмена</span>
          </button>

          <button class="prim-btn">
            <span>OK</span>
          </button>
        </div>
      </div>
      <div class="modal-back"
        @click="checkingout = false"
      >
      </div>
    </div>


<!-- checkingout modal -->
    <div class="modal"
      v-if="residing"
    >
      <div class="form-filter">
        <h3>Распечатать карточки</h3>
        <div class="divider"></div>
        <h3 class="cardsectitle">Количество выбранных гостей:</h3>
        <h3 class="cardcount">12</h3>
        <h3 class="cardquest">Распечатать регистрационные карточки?</h3>
        <div class="modal-btns">
          <button
            class="sec-btn"
            @click="residing = false"
          >
            <span>Отмена</span>
          </button>

          <button class="prim-btn">
            <span>OK</span>
          </button>
        </div>
      </div>
      <div class="modal-back"
        @click="residing = false"
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
            @click="filtering = true"
          >
            <img src="@/assets/icons/Filter-sm.svg" alt="">
            <span>Фильтр</span>
          </button>
          <button
            class="sec-btn"
            @click="printout = true"
          >
            <img src="@/assets/icons/Print-sm.svg" alt="">
            <span>Распечатать</span>
          </button>
          <button
            class="sec-btn"
            @click="checkingout = true"
          >
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
      <Reside @click="residing = true"/>
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
      filtering: false,
      printout: false,
      checkingout: false,
      residing: false,

      filtercats: [{
        Category: 'Lux',
        Citizenship: 'USA',
        Paymentstatus: 'Оплачено'
      }, {
        Category: 'Standart',
        Citizenship: 'Uzbekistan',
        Paymentstatus: 'Не оплачено'
      }, {
        Category: 'Apartments',
        Citizenship: 'Ukraine',
        Paymentstatus: 'По договору'
      }, {
        Category: 'Family',
        Citizenship: 'Kazakhstan',
        Paymentstatus: 'Частично оплачено'
      }, {
        Category: 'Suite',
        Citizenship: 'Japan',
        Paymentstatus: 'Оплачено'
      }],
      Category: '',

      filtercitizenship: [{
        Citizenship: 'USA'
      }, {
        Citizenship: 'Uzbekistan'
      }, {
        Citizenship: 'Ukraine'
      }, {
        Citizenship: 'Kazakhstan'
      }, {
        Citizenship: 'Japan'
      }],
      Citizenship: '',

      filterpaymenstatus: [{
        Paymentstatus: 'Оплачено'
      }, {
        Paymentstatus: 'Не оплачено'
      }, {
        Paymentstatus: 'По договору'
      }, {
        Paymentstatus: 'Частично оплачено'
      }],
      Paymentstatus: ''
  }),

  methods: {
    setSelected(tab) {
      this.selected = tab;
    }
  }
}
</script>