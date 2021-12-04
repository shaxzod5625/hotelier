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
        <h3 class="cardcount">{{checkList.length}}</h3>
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
        <h3>Выселение</h3>
        <div class="divider"></div>
        <h3 class="cardsectitle">Количество выбранных гостей:</h3>
        <h3 class="cardcount">{{checkList.length}}</h3>
        <h3 class="cardquest">Выселить гостей?</h3>
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

    <ExtendingModal
      @closeExtend="closeExtend"
      v-if="extending"
      :nfl="nfl"
      :checkoutDate="mcheckout"
    />

    <ResidingModal
      @close="close"
      v-if="residing"
      :room="modalRoom"
      :nfl="nfl"
    />

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
      <GuestCard v-for="(guest, idx) in filterReside" :key="idx" @open="open" @checkedBx="checkedBx" @openExtend="openExtend"
      
        :id="guest.id"
        :nfl="guest.nfl"
        :vip="guest.vip"
        :roomcat="guest.roomcat"
        :roomtype="guest.roomtype"
        :roomnum="guest.roomnum"
        :regnum="guest.regnum"
        :citizenship="guest.citizenship"
        :bookingnum="guest.bookingnum"
        :checkin="guest.checkin"
        :checkout="guest.checkout"
        :amounttopay="guest.amounttopay"
        :paymentstatus="guest.paymentstatus"
        :checked="guest.checked"
        :idx="guest.index"
      />
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
import _ from 'lodash'
import ResidingModal from "./resideUtils/ResidingModal.vue"
import ExtendingModal from "./resideUtils/ExtendingModal.vue"
import GuestCard from "./GuestCard.vue"


export default {
  name: 'Reside',

  components: {
    ResidingModal, GuestCard, ExtendingModal
  },
  
  data: () => ({
    search: '',
    filtering: false,
    printout: false,
    checkingout: false,
    residing: false,
    extending: false,
    Category: '',
    Citizenship: '',
    Paymentstatus: '',
    modalRoom: '',
    nfl: '',
    mcheckout: '',

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
      Paymentstatus: 'Оплачен'
    }, {
      Paymentstatus: 'Не оплачен'
    }, {
      Paymentstatus: 'По договору'
    }, {
      Paymentstatus: 'Частично оплачен'
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
      let sorted = (this.searchReside.filter(post => {
        return post.roomcat.toLowerCase().includes(this.Category.toLowerCase())
        && post.citizenship.toLowerCase().includes(this.Citizenship.toLowerCase())
        && post.paymentstatus.toLowerCase().includes(this.Paymentstatus.toLowerCase())
      }))

      return sorted.sort(function(a, b){
        let x = a.nfl.toLowerCase();
        let y = b.nfl.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    },

    checkList(){
      return this.filterReside.filter(post => {
        return post.checked === true
      })
    }
  },

  methods: {
    reset() {
      this.Category = ''
      this.Citizenship = ''
      this.Paymentstatus = ''
    },

    residingModal() {
      this.$emit("guest", this.filterReside.id)
    },

    close() {
      this.residing = false
    },

    open(rn,fio) {
      this.modalRoom = rn
      this.nfl = fio
      this.residing = true
    },

    openExtend(fio, cd) {
      this.nfl = fio
      this.mcheckout = cd
      this.extending = true
    },

    closeExtend() {
      this.extending = false
    },

    checkedBx(cbstatus) {
      let guest = _.find(this.filterReside, {id: cbstatus.idex})
      guest.checked = cbstatus.cbstatus
    }
  }
}
</script>