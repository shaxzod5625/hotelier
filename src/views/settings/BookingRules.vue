<template>
  <div class="con-page">
    
    <transition name="component-fade" mode="out-in">
      <GuaranteedBooking
        v-if="guaranteedBookingModal"

        @closeGuaranteedBooking="closeGuaranteedBooking"
        @refresh="refresh"
      />

      <NotGuaranteedBooking
        v-if="notguaranteedBookingModal"

        @closeNotGuaranteedBooking="closeNotGuaranteedBooking"
        @refresh="refresh"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Правила бронирования</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="simple-content">
      <div
        class="card-div-50"
      >
        <div class="div-header">
          <div style="width: calc(100% / 3)"></div>
          <h3>Гарантированная бронь</h3>
          <div class="div-icon" style="width: calc(100% / 3)">
            <img
              class="icon-box"
              @click="guaranteedBookingModal = true"
              src="@/assets/icons/Edit.svg"
              alt=""
            >

            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Время бесплатной отмены:</h4>
            </div>

            <div
              class="rule-prop"
              v-if="
                bookingRules.guarantedBooking.period === []
                || bookingRules.guarantedBooking.period === undefined
                || bookingRules.guarantedBooking.period === null
              "
            >
              <h4>Пусто</h4>
            </div>

            <div
              class="rule-prop"
              v-else
            >
              <h4>
                {{bookingRules.guarantedBooking.period[0].freeCancellationPeriod}}
              </h4>
            </div>

          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Штраф за позднюю отмену:</h4>
            </div>

            <div
              class="rule-prop"
              v-if="
                bookingRules.guarantedBooking.period === []
                || bookingRules.guarantedBooking.period === undefined
                || bookingRules.guarantedBooking.period === null
              "
            >
              <h4>Пусто</h4>
            </div>

            <div
              class="rule-prop"
              v-else
            >
              <h4 v-if="bookingRules.guarantedBooking.period[0].penaltyType === 'fixedAmount'">{{bookingRules.guarantedBooking.period[0].fixedSoum}}</h4>
              <h4 v-else>{{bookingRules.guarantedBooking.period[0].penaltyProcent}}</h4>
            </div>

          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Типы гарантии:</h4>
            </div>

            <div
              class="rule-prop"
              v-if="
                bookingRules.guarantedBooking.period === []
                || bookingRules.guarantedBooking.period === undefined
                || bookingRules.guarantedBooking.period === null
              "
            >
              <h4>Пусто</h4>
            </div>

            <div
              class="rule-prop"
              v-else
            >
              <h4 v-if="bookingRules.guarantedBooking.typeOfGuarante.length > 2">
                {{checkedGuaranteeTypes(bookingRules.guarantedBooking.typeOfGuarante[0])}},
                {{checkedGuaranteeTypes(bookingRules.guarantedBooking.typeOfGuarante[1])}},
                (+{{bookingRules.guarantedBooking.typeOfGuarante.length - 2}})
              </h4>
              <h4 v-if="bookingRules.guarantedBooking.typeOfGuarante.length === 2">
                {{checkedGuaranteeTypes(bookingRules.guarantedBooking.typeOfGuarante[0])}},
                {{checkedGuaranteeTypes(bookingRules.guarantedBooking.typeOfGuarante[1])}}
              </h4>
              <h4 v-if="bookingRules.guarantedBooking.typeOfGuarante.length < 2">{{checkedGuaranteeTypes(bookingRules.guarantedBooking.typeOfGuarante[0])}}</h4>
            </div>

          </div>
        </div>
      </div>

      <div
        class="card-div-50"
      >
        <div class="div-header">
          <div style="width: calc(100% / 3)"></div>
          <h3>Не гарантированная бронь</h3>
          <div class="div-icon" style="width: calc(100% / 3)">
            <img
              class="icon-box"
              @click="notguaranteedBookingModal = true"
              src="@/assets/icons/Edit.svg"
              alt=""
            >
          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Время уведомления:</h4>
            </div>

            <div
              class="rule-prop"
              v-if="
                bookingRules.unguarantedBooking.period === ''
                || bookingRules.unguarantedBooking.period === undefined
                || bookingRules.unguarantedBooking.period === null
              "
            >
              <h4>Пусто</h4>
            </div>

            <div
              class="rule-prop"
              v-else
            >
              <h4>{{bookingRules.unguarantedBooking.period}}</h4>
            </div>

          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Период уведомления перед заездом:</h4>
            </div>

            <div
              class="rule-prop"
              v-if="
                bookingRules.unguarantedBooking.displayTime === ''
                || bookingRules.unguarantedBooking.displayTime === undefined
                || bookingRules.unguarantedBooking.displayTime === null
              "
            >
              <h4>Пусто</h4>
            </div>

            <div
              class="rule-prop"
              v-else
            >
              <h4>{{bookingRules.unguarantedBooking.displayTime}}</h4>
            </div>

            

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuaranteedBooking from './bookingRules/GuaranteedBooking.vue'
import NotGuaranteedBooking from './bookingRules/NotGuaranteedBooking.vue'

export default {
  name: 'BookingRules',

  components: {
    GuaranteedBooking, NotGuaranteedBooking
  },

  data:() => ({
    guaranteedBookingModal: false,
    notguaranteedBookingModal: false,

    bookingRules: JSON.parse(window.sessionStorage.rules)
  }),

  computed: {
    
  },

  methods: {
    checkedGuaranteeTypes(type) {
      if(type === 'visa'){return 'Visa'}
      if(type === 'masterCard'){return 'MasterCard'}
      if(type === 'maestro'){return 'Maestro'}
      if(type === 'unionPay'){return 'UnionPay'}
      if(type === 'mir'){return 'Карты МИР'}
      if(type === 'uzCard'){return 'UzCard'}
      if(type === 'humo'){return 'HUMO'}
      if(type === 'corporativeContract'){return 'Корпоративный договор'}
      if(type === 'guaranteeLetter'){return 'Гарантийное письмо'}
      if(type === 'companyAgentGuarantee'){return 'Гарантия агента или компании'}
    },
    
    getBookingRules() {
      this.bookingRules = JSON.parse(window.sessionStorage.rules)
    },

    closeGuaranteedBooking() {
      this.guaranteedBookingModal = false
    },

    closeNotGuaranteedBooking() {
      this.notguaranteedBookingModal = false
    },

    refresh() {
      this.$forceUpdate(this.getBookingRules())
    }
  }
}
</script>

<style>

</style>