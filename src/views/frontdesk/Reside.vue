<template>
  <div class="con-page" style="gap: 24px">

<!-- filtering modal -->
    <div class="modal"
      v-if="filtering"
    >
      <form @submit.prevent="" class="form-filter">
        <h3>Фильтрация</h3>
        <div class="divider"></div>
        <label for="select">Категория номера</label>
        <el-select v-model="Category" placeholder="Выберите категорию">
          <el-option
            v-for="item in filcats"
            :key="item.Category"
            :label="item.Category"
            :value="item.Category">
          </el-option>
        </el-select>

        <label for="select">Гражданство гостя</label>
        <el-select v-model="Citizenship" filterable placeholder="Выберите гражданство">
          <el-option
            v-for="item in filcitizenship"
            :key="item.Citizenship"
            :label="item.Citizenship"
            :value="item.Citizenship">
          </el-option>
        </el-select>

        <label for="select">Статус оплаты</label>
        <el-select v-model="Paymentstatus" placeholder="Выберите статус оплаты">
          <el-option
            v-for="item in filpaymenstatus"
            :key="item.Paymentstatus"
            :label="item.Paymentstatus"
            :value="item.Paymentstatus">
          </el-option>
        </el-select>

        <div class="modal-btns">
          <button
            class="sec-btn"
            @click="reset"
          >
            <span>Сбросить</span>
          </button>

          <button
            class="prim-btn"
            @click="filtering = false"
          >
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


<!-- residing modal -->
    <div class="modal"
      v-if="residing"
    >
      <div class="form-filter">
        <h3>Переселение гостя</h3>
        <div class="divider"></div>
        <h3 class="cardsectitle">Abdullayev Abdulla Abdullayevich</h3>
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

    <div class="filter-block">
      <div class="search-bar">
        <input type="text" placeholder="Введите имя гостя или номер брони" v-model="search">
        <h3>Сортировка: 
          <span v-if="Category === '' && Citizenship === '' && Paymentstatus === ''">Все</span>
          <span v-else>{{Category}}</span>
          <span>{{Citizenship}}</span>
          <span>{{Paymentstatus}}</span>
          <img v-if="Category != '' || Citizenship != '' || Paymentstatus != ''" class="reset-icon" @click="reset" src="@/assets/icons/X-sm.svg" alt="">
        </h3>
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

    <div v-if="filterReside != ''">
      <div class="guest-card"
        v-for="(id, idx) in filterReside"
        :key="idx"
      >
        <div class="card-header">
          <div class="nfl">
            <h3>{{id.nfl}}</h3>
          </div>
          <div class="r-n">
            <h3 class="room-num">{{id.roomcat}} {{id.roomtype}} № {{id.roomnum}}</h3>
          </div>
          <div class="l-ic">
              <img class="card-label" src="@/assets/icons/VIP.svg" alt=""
                v-if="id.vip === true"
              >
            <div class="iconblc">
              <img src="@/assets/icons/Extend.svg" alt="">
              <img
                src="@/assets/icons/Relocate.svg" alt=""
                @click="residing = true"
              >
              <el-checkbox v-model="checked"></el-checkbox>
            </div>
          </div>
        </div>
        <table>
          <tr>
            <th class="pad-l-24">Регистрационный номер</th>
            <th>Гражданство</th>
            <th>Номер брони</th>
            <th>Заезд</th>
            <th>Выезд</th>
            <th>Сумма к оплате</th>
            <th class="pad-r-24">Статус оплаты</th>
          </tr>
          <tr>
            <td class="pad-l-24">{{id.regnum}}</td>
            <td>{{id.citizenship}}</td>
            <td class="bookingnum">{{id.bookingnum}}</td>
            <td>{{id.checkin}}</td>
            <td>{{id.checkout}}</td>
            <td>{{id.amounttopay}}</td>
            <td class="pad-r-24">{{id.paymentstatus}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div
      v-else
      class="no-reults"
    >
      <h3>Результатов по поиску <span>"{{search}}"</span> среди гостей не найдено</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Reside',
  data: () => ({
    search: '',
    filtering: false,
    printout: false,
    checkingout: false,
    residing: false,
    Category: '',
    Citizenship: '',
    Paymentstatus: '',

    filcats: [{
        Category: 'Стандарт',
      }, {
        Category: 'Люкс',
      }, {
        Category: 'Апартаменты',
      }, {
        Category: 'Family',
      }, {
        Category: 'Suite',
      }],

      filcitizenship: [{
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

      filpaymenstatus: [{
        Paymentstatus: 'Оплачено'
      }, {
        Paymentstatus: 'Не оплачено'
      }, {
        Paymentstatus: 'По договору'
      }, {
        Paymentstatus: 'Частично оплачено'
      }],
  }),

  computed: {
    searchReside(){
      return this.$store.state.reside.filter(post => {
        return post.nfl.toLowerCase().includes(this.search.toLowerCase())
        || post.bookingnum.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filterReside(){
      return this.searchReside.filter(post => {
        return post.roomcat.toLowerCase().includes(this.Category.toLowerCase())
        && post.citizenship.toLowerCase().includes(this.Citizenship.toLowerCase())
        && post.paymentstatus.toLowerCase().includes(this.Paymentstatus.toLowerCase())
      })
    }
  },

  methods: {
    reset() {
      this.Category = ''
      this.Citizenship = ''
      this.Paymentstatus = ''
    }
  }
}
</script>