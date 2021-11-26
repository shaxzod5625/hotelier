<template>
  <div class="con-page">
    
    <transition name="component-fade" mode="out-in">
      <GuaranteedBooking
        v-if="guaranteedBookingModal"

        @closeGuaranteedBooking="closeGuaranteedBooking"
      />

      <NotGuaranteedBooking
        v-if="notguaranteedBookingModal"

        @closeNotGuaranteedBooking="closeNotGuaranteedBooking"
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
            <div class="rule-prop">
              <h4>rule property</h4>
            </div>
          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Штраф за позднюю отмену:</h4>
            </div>
            <div class="rule-prop">
              <h4>rule property</h4>
            </div>
          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Типы гарантии:</h4>
            </div>
            <div class="rule-prop">
              <h4>rule property</h4>
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
            <div class="rule-prop">
              <h4>rule property</h4>
            </div>
          </div>
        </div>

        <div class="div-body">
          <div class="column-2">
            <div class="rule">
              <h4>Период уведомления перед заездом:</h4>
            </div>
            <div class="rule-prop">
              <h4>rule property</h4>
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
  }),

  methods: {
    closeGuaranteedBooking() {
      this.guaranteedBookingModal = false
    },

    closeNotGuaranteedBooking() {
      this.notguaranteedBookingModal = false
    }
  }
}
</script>

<style>

</style>