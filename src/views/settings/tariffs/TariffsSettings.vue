<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <FreeOfChargePeriod
        v-if="freeOfChargePeriod"
        
        @closeFreeOfChargePeriod="closeFreeOfChargePeriod"
        @refresh="refresh"
      />

      <EarlyCheckInPeriod
        v-if="earlyCheckIn"

        @closeEarlyCheckInPeriod="closeEarlyCheckInPeriod"
        @refresh="refresh"
      />

      <LatelyCheckOutPeriod
        v-if="lateCheckOut"

        @closeLateCheckOutPeriod="closeLateCheckOutPeriod"
        @refresh="refresh"
      />

      <ZeroHour
        v-if="zeroHour"

        @closeZeroHour="closeZeroHour"
        @refresh="refresh"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/tariffs'}" class="breadcrump">Тарифы и цены</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Конфигурации</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="con-page-grid">
      <div
        class="tariff-setting-card"
        @click="zeroHour = true"
      >
        <div class="fillingDiv">
          <svg style="margin: 0" width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H24C30.6274 0 36 5.37258 36 12V12H12C5.37258 12 0 6.62742 0 0V0Z" :fill="filling(zeroHour)"/>
          </svg>
        </div>
        <svg  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="setCards[0].svg" ></svg>
        <h3>{{setCards[0].title}}</h3>
      </div>

      <div
        class="tariff-setting-card"
        @click="freeOfChargePeriod = true"
      >
        <div class="fillingDiv">
          <svg style="margin: 0" width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H24C30.6274 0 36 5.37258 36 12V12H12C5.37258 12 0 6.62742 0 0V0Z" :fill="filling(zeroHour)"/>
          </svg>
        </div>
        <svg  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="setCards[1].svg" ></svg>
        <h3>{{setCards[1].title}}</h3>
      </div>

      <div
        class="tariff-setting-card"
        @click="earlyCheckIn = true"
      >
        <div class="fillingDiv">
          <svg style="margin: 0" width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H24C30.6274 0 36 5.37258 36 12V12H12C5.37258 12 0 6.62742 0 0V0Z" :fill="filling(zeroHour)"/>
          </svg>
        </div>
        <svg  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="setCards[2].svg" ></svg>
        <h3>{{setCards[2].title}}</h3>
      </div>

      <div
        class="tariff-setting-card"
        @click="lateCheckOut = true"
      >
        <div class="fillingDiv">
          <svg style="margin: 0" width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H24C30.6274 0 36 5.37258 36 12V12H12C5.37258 12 0 6.62742 0 0V0Z" :fill="filling(zeroHour)"/>
          </svg>
        </div>
        <svg  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="setCards[3].svg" ></svg>
        <h3>{{setCards[3].title}}</h3>
      </div>

      <router-link
        tag="div"
        class="tariff-setting-card"
        :to="{ name: setCards[4].pathName}"
      >
        <div class="fillingDiv">
          <svg style="margin: 0" width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H24C30.6274 0 36 5.37258 36 12V12H12C5.37258 12 0 6.62742 0 0V0Z" :fill="filling(zeroHour)"/>
          </svg>
        </div>
        <svg  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="setCards[4].svg" ></svg>
        <h3>{{setCards[4].title}}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
import FreeOfChargePeriod from './tariffsSettings/FreeOfChargePeriod.vue'
import EarlyCheckInPeriod from './tariffsSettings/EarlyCheckInPeriod.vue'
import LatelyCheckOutPeriod from './tariffsSettings/LatelyCheckOutPeriod.vue'
import ZeroHour from './tariffsSettings/ZeroHour.vue'

export default {
  name: 'TariffsSettings',
  
  components: {
    FreeOfChargePeriod, EarlyCheckInPeriod, LatelyCheckOutPeriod, ZeroHour
  },

  data:() => ({
    freeOfChargePeriod: false,
    earlyCheckIn: false,
    lateCheckOut: false,
    zeroHour: false,

    setCards: [
      {
        title: 'Расчетный час',
        svg: `<path fill-rule="evenodd" clip-rule="evenodd" d="M18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6ZM4 18C4 10.268 10.268 4 18 4C25.732 4 32 10.268 32 18C32 25.732 25.732 32 18 32C10.268 32 4 25.732 4 18ZM18 8C18.5523 8 19 8.44772 19 9V17.5858L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L17 18.4142V9C17 8.44772 17.4477 8 18 8Z" fill="currentColor"/>`,
        pathName: ''
      },
      {
        title: 'Бесплатный период заезда / выезда',
        svg: `<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 10.2929C10.6834 9.90237 11.3166 9.90237 11.7071 10.2929L14.6678 13.2535C15.628 12.9674 16.5116 12.4605 17.4961 11.8862C17.5179 11.8735 17.5398 11.8607 17.5617 11.8479C19.0258 10.9936 20.7285 10 23 10C25.1815 10 26.8171 10.5498 28.1215 11.0715C28.3648 11.1688 28.5847 11.26 28.7902 11.3452C29.1561 11.4969 29.4763 11.6297 29.8017 11.7445C30.2869 11.9158 30.6638 12 31 12C31.5523 12 32 12.4477 32 13V23C32 23.5523 31.5523 24 31 24C30.3363 24 29.7132 23.8342 29.136 23.6305C28.7629 23.4988 28.3559 23.3303 27.9547 23.1643C27.7598 23.0836 27.5663 23.0035 27.3787 22.9285C26.2774 22.488 25.033 22.0713 23.4224 22.0082L25.7071 24.2929C26.0976 24.6834 26.0976 25.3166 25.7071 25.7071C25.3166 26.0976 24.6834 26.0976 24.2929 25.7071L20.9564 22.3707C20.1375 22.6673 19.3587 23.1151 18.5039 23.6138C18.482 23.6265 18.4602 23.6393 18.4382 23.6521C16.9742 24.5064 15.2715 25.5 13 25.5C10.8185 25.5 9.18288 24.9502 7.87853 24.4285C7.63524 24.3312 7.41534 24.24 7.20984 24.1548C6.84392 24.0031 6.52366 23.8703 6.19832 23.7555C5.71306 23.5842 5.33622 23.5 5 23.5C4.44772 23.5 4 23.0523 4 22.5V12.5C4 11.9477 4.44772 11.5 5 11.5C5.66371 11.5 6.28683 11.6658 6.86407 11.8695C7.23724 12.0012 7.64433 12.1697 8.04549 12.3358C8.24038 12.4164 8.43387 12.4965 8.62139 12.5715C9.59763 12.962 10.6864 13.3338 12.0429 13.4571L10.2929 11.7071C9.90237 11.3166 9.90237 10.6834 10.2929 10.2929ZM14.0182 15.4324C13.6917 15.476 13.3527 15.5 13 15.5C10.8185 15.5 9.18294 14.9502 7.87861 14.4285C7.63537 14.3312 7.4155 14.24 7.21003 14.1548C6.84408 14.0031 6.52379 13.8703 6.19843 13.7555C6.13021 13.7314 6.06413 13.7091 6 13.6884V21.6161C6.29821 21.6823 6.5864 21.7715 6.86397 21.8695C7.23709 22.0012 7.64414 22.1697 8.04526 22.3357C8.24019 22.4164 8.43373 22.4965 8.62129 22.5715C9.817 23.0498 11.1815 23.5 13 23.5C14.6945 23.5 15.9749 22.7736 17.4961 21.8862C17.5179 21.8735 17.5398 21.8607 17.5618 21.8479C18.1395 21.5108 18.7544 21.152 19.4268 20.8411L19.2934 20.7076C18.9018 20.895 18.4631 21 18 21C16.3431 21 15 19.6569 15 18C15 17.5369 15.105 17.0982 15.2924 16.7066L14.0182 15.4324ZM20.7076 19.2934C20.895 18.9018 21 18.4631 21 18C21 16.3431 19.6569 15 18 15C17.5369 15 17.0982 15.105 16.7066 15.2924L16.2266 14.8124C17.0363 14.4702 17.7627 14.0463 18.4382 13.6521C18.4602 13.6393 18.482 13.6265 18.5039 13.6138C20.0251 12.7264 21.3055 12 23 12C24.8185 12 26.183 12.4502 27.3787 12.9285C27.5663 13.0035 27.7598 13.0836 27.9547 13.1643C28.3558 13.3303 28.7629 13.4988 29.136 13.6305C29.4136 13.7285 29.7018 13.8177 30 13.8839V21.8116C29.9359 21.7909 29.8699 21.7686 29.8017 21.7445C29.4763 21.6297 29.1561 21.4969 28.7901 21.3452C28.5847 21.26 28.3648 21.1688 28.1215 21.0715C26.8171 20.5498 25.1815 20 23 20C22.4898 20 22.0083 20.0501 21.5518 20.1375L20.7076 19.2934Z" fill="currentColor"/>`,
        pathName: ''
      },
      {
        title: 'Ранний заезд',
        svg: `<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9C4 6.23858 6.23858 4 9 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H9C7.34315 6 6 7.34315 6 9V27C6 28.6569 7.34315 30 9 30H17C17.5523 30 18 30.4477 18 31C18 31.5523 17.5523 32 17 32H9C6.23858 32 4 29.7614 4 27V9ZM27 6C25.3431 6 24 7.34315 24 9C24 10.6569 25.3431 12 27 12C28.6569 12 30 10.6569 30 9C30 7.34315 28.6569 6 27 6ZM22 9C22 6.23858 24.2386 4 27 4C29.7614 4 32 6.23858 32 9C32 11.7614 29.7614 14 27 14C24.2386 14 22 11.7614 22 9ZM27 6.4C27.5523 6.4 28 6.84772 28 7.4V8.58579L28.9071 9.49289C29.2976 9.88342 29.2976 10.5166 28.9071 10.9071C28.5166 11.2976 27.8834 11.2976 27.4929 10.9071L26.2929 9.70711C26.1054 9.51957 26 9.26522 26 9V7.4C26 6.84772 26.4477 6.4 27 6.4ZM19.6247 12.2191C20.056 12.5641 20.1259 13.1934 19.7809 13.6247L17.0806 17H31C31.5523 17 32 17.4477 32 18C32 18.5523 31.5523 19 31 19H17.0806L19.7809 22.3753C20.1259 22.8066 20.056 23.4359 19.6247 23.7809C19.1934 24.1259 18.5641 24.056 18.2191 23.6247L14.2191 18.6247C13.927 18.2595 13.927 17.7405 14.2191 17.3753L18.2191 12.3753C18.5641 11.944 19.1934 11.8741 19.6247 12.2191Z" fill="currentColor"/>`,
        pathName: ''
      },
      {
        title: 'Поздний выезд',
        svg: `<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9C4 6.23858 6.23858 4 9 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H9C7.34315 6 6 7.34315 6 9V27C6 28.6569 7.34315 30 9 30H17C17.5523 30 18 30.4477 18 31C18 31.5523 17.5523 32 17 32H9C6.23858 32 4 29.7614 4 27V9ZM22 6C20.3431 6 19 7.34315 19 9C19 10.6569 20.3431 12 22 12C23.6569 12 25 10.6569 25 9C25 7.34315 23.6569 6 22 6ZM17 9C17 6.23858 19.2386 4 22 4C24.7614 4 27 6.23858 27 9C27 11.7614 24.7614 14 22 14C19.2386 14 17 11.7614 17 9ZM22 6.4C22.5523 6.4 23 6.84772 23 7.4V8.58579L23.9071 9.49289C24.2976 9.88342 24.2976 10.5166 23.9071 10.9071C23.5166 11.2976 22.8834 11.2976 22.4929 10.9071L21.2929 9.70711C21.1054 9.51957 21 9.26522 21 9V7.4C21 6.84772 21.4477 6.4 22 6.4ZM26.3753 12.2191C26.8066 11.8741 27.4359 11.944 27.7809 12.3753L31.7809 17.3753C32.073 17.7405 32.073 18.2595 31.7809 18.6247L27.7809 23.6247C27.4359 24.056 26.8066 24.1259 26.3753 23.7809C25.944 23.4359 25.8741 22.8066 26.2191 22.3753L28.9194 19H15C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17H28.9194L26.2191 13.6247C25.8741 13.1934 25.944 12.5641 26.3753 12.2191Z" fill="currentColor"/>`,
        pathName: ''
      },
      {
        title: 'Правила расчёта',
        svg: `<path fill-rule="evenodd" clip-rule="evenodd" d="M10 4C10.5523 4 11 4.44772 11 5V9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H11V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V11H5C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H9V5C9 4.44772 9.44772 4 10 4ZM20 10C20 9.44772 20.4477 9 21 9H31C31.5523 9 32 9.44772 32 10C32 10.5523 31.5523 11 31 11H21C20.4477 11 20 10.5523 20 10ZM15.7071 20.2929C16.0976 20.6834 16.0976 21.3166 15.7071 21.7071L5.70711 31.7071C5.31658 32.0976 4.68342 32.0976 4.29289 31.7071C3.90237 31.3166 3.90237 30.6834 4.29289 30.2929L14.2929 20.2929C14.6834 19.9024 15.3166 19.9024 15.7071 20.2929ZM20.2929 21.7071C19.9024 21.3166 19.9024 20.6834 20.2929 20.2929C20.6834 19.9024 21.3166 19.9024 21.7071 20.2929L26 24.5858L30.2929 20.2929C30.6834 19.9024 31.3166 19.9024 31.7071 20.2929C32.0976 20.6834 32.0976 21.3166 31.7071 21.7071L27.4142 26L31.7071 30.2929C32.0976 30.6834 32.0976 31.3166 31.7071 31.7071C31.3166 32.0976 30.6834 32.0976 30.2929 31.7071L26 27.4142L21.7071 31.7071C21.3166 32.0976 20.6834 32.0976 20.2929 31.7071C19.9024 31.3166 19.9024 30.6834 20.2929 30.2929L24.5858 26L20.2929 21.7071Z" fill="currentColor"/>
          <path d="M16 30C16 31.1046 15.1046 32 14 32C12.8954 32 12 31.1046 12 30C12 28.8954 12.8954 28 14 28C15.1046 28 16 28.8954 16 30Z" fill="currentColor"/>
          <path d="M8 22C8 23.1046 7.10457 24 6 24C4.89543 24 4 23.1046 4 22C4 20.8954 4.89543 20 6 20C7.10457 20 8 20.8954 8 22Z" fill="currentColor"/>`,
        pathName: 'Calculation Rules'
      },
    ]
  }),

  methods: {
    filling(fillingValue) {
      return '#2161ED'
    },

    closeFreeOfChargePeriod() {
      this.freeOfChargePeriod = false
    },

    closeEarlyCheckInPeriod() {
      this.earlyCheckIn = false
    },

    closeLateCheckOutPeriod() {
      this.lateCheckOut = false
    },

    closeZeroHour() {
      this.zeroHour = false
    },

    async refresh() {
      try {
        await this.$store.dispatch('getTariffsConfiguration')
      } catch {}

    }
  }
}
</script>

<style>

</style>