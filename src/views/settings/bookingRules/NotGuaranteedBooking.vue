<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Не гарантированная бронь</h3>
      <div class="divider"/>
      
      <div class="pad-24">
        <label for="select">Уведомить перед заездом</label>
        <el-input
          v-model="notificationPeriod"
          placeholder="Введите количество часов"
          v-mask="'##'"
          :class="{invalid: ($v.notificationPeriod.$dirty && !$v.notificationPeriod.required)}"
        />
        <span v-if="$v.notificationPeriod.$dirty && !$v.notificationPeriod.required" class="validation-error">Пожалуйста, введите количество часов</span>
      </div>

      <div class="pad-24">
        <label for="input">Время уведомления</label>
        <el-time-select
          class="time-100"
          style="width: 100%;"
          v-model="notificationTime"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
          v-mask="'##:##'"
          placeholder="Укажите время уведомления"
          :class="{invalid: ($v.notificationTime.$dirty && !$v.notificationTime.required)}"
        />
        <span v-if="$v.notificationTime.$dirty && !$v.notificationTime.required" class="validation-error">Пожалуйста, укажите время уведомления</span>
      </div>

<!-- ////////////////// Hidden computed //////////////// -->

      <h4 style="display: none">{{setInfo}}</h4>

<!-- ////////////////////////////////////////////////// -->

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="newNotGuaranteedBookingRules"
        >
          Сохранить
        </button>
      </div>
    </div>

    <div
      class="modal-back"
      @click="closeModal"
    />
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'NotGuaranteedBooking',

  data:() => ({
    notGuaranteedBookingInfo: JSON.parse(window.sessionStorage.rules).unguarantedBooking,
    notificationPeriod: '',
    notificationTime: '',
  }),

  validations: {
    notificationPeriod: {required},
    notificationTime: {required},
  },

  computed: {
    setInfo() {
      if(this.notGuaranteedBookingInfo !== {}) {
        this.notificationPeriod = this.notGuaranteedBookingInfo.period
        this.notificationTime = this.notGuaranteedBookingInfo.displayTime
      }
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeNotGuaranteedBooking')
    },

    async newNotGuaranteedBookingRules() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const rules = {
        period: Number(this.notificationPeriod),
        time: this.notificationTime
      }

      try {
        await this.$store.dispatch('newNotGuaranteedBookingRules', rules)
      } catch {}

      try {
        await this.$store.dispatch('getBookingRulesInfo')
      } catch {}

      this.$emit('refresh')
      this.$emit('closeNotGuaranteedBooking')
      this.$message({
        message: 'Правила не гарантированной бронирования добавлены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>