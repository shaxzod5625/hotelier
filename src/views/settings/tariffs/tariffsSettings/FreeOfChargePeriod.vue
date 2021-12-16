<template>
  <div class="modal">
    <div class="modal-div-2">
      <h3>Бесплатные периоды</h3>
      <div class="divider"/>

      <h4>Период бесплатного заезда:</h4>

      <div class="form-2">
        <div class="w-100-timeSelect">
          <label for="input">С</label>
          <el-time-select
            class="time"
            v-model="checkInTime"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: startTimeUntil
            }"
            placeholder="Введите время"
            v-mask="'##:##'"
            :class="{invalid: ($v.checkInTime.$dirty && !$v.checkInTime.required)}"
          >
          </el-time-select>
          <span v-if="$v.checkInTime.$dirty && !$v.checkInTime.required" class="validation-error">Пожалуйста, введите время</span>
        </div>

        <div class="w-100-timeSelect">
          <label for="input">ДО</label>
          <el-time-select
            class="time"
            disabled
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            v-model="untilZeroHour"
          >
          </el-time-select>
        </div>
      </div>

      <div class="divider"/>
      
      <h4>Период бесплатного выезда:</h4>

      <div class="form-2">
        <div class="w-100-timeSelect">
          <label for="input">С</label>
          <el-time-select
            class="time"
            disabled
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            v-model="zeroHour"
            v-mask="'##:##'"
          >
          </el-time-select>
        </div>

        <div class="w-100-timeSelect">
          <label for="input">ДО</label>
          <el-time-select
            class="time"
            v-model="checkOutTime"
            :picker-options="{
              start: stopTimefrom,
              step: '00:01',
              end: '23:59'
            }"
            placeholder="Введите время"
            v-mask="'##:##'"
            :class="{invalid: ($v.checkOutTime.$dirty && !$v.checkOutTime.required)}"
          >
          </el-time-select>
          <span v-if="$v.checkOutTime.$dirty && !$v.checkOutTime.required" class="validation-error">Пожалуйста, введите время</span>
        </div>
      </div>

<!-- //////// Hidden computed /////////// -->
      <h4 style="display: none">{{untilZeroHour}}</h4>
      <h4 style="display: none">{{setZeroHour}}</h4>
<!-- //////////////////////////////////// -->

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="editFreeOfChargePeriod"
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
  name: 'FreeOfChargePeriod',

  data:() => ({
    zeroHour: '12:00',
    checkInTime: '',
    checkOutTime: ''
  }),

  validations: {
    checkInTime: {required},
    checkOutTime: {required},
  },

  computed: {
    setZeroHour() {
      this.zeroHour = JSON.parse(window.sessionStorage.tariffConfigs).configuration.zeroHour
    },

    startTimeUntil() {
      let zh = this.zeroHour
      const timeParts = String(zh).split(":")
      const strtTm = Number(timeParts[0]) * 60 + Number(timeParts[1]) - 2

      const hours = Math.floor(strtTm / 60)
      const minutes = strtTm%60

      if (this.zeroHour !== '' && minutes>9) {
        return String(hours+":"+minutes)
      } else if(minutes<10) {
        return String(hours+":"+0+minutes)
      } else {
        return undefined
      }
    },

    stopTimefrom() {
      let zh = this.zeroHour
      const timeParts = String(zh).split(":")
      const strtTm = Number(timeParts[0]) * 60 + Number(timeParts[1]) + 1

      const hours = Math.floor(strtTm / 60)
      const minutes = strtTm%60

      if (this.zeroHour !== '' && minutes>9) {
        return String(hours+":"+minutes)
      } else if(minutes<10) {
        return String(hours+":"+0+minutes)
      } else {
        return undefined
      }
    },

    untilZeroHour() {
      const zh = this.zeroHour
      const timeParts = String(zh).split(":")
      const strtTm = Number(timeParts[0]) * 60 + Number(timeParts[1]) - 1

      const hours = Math.floor(strtTm / 60)
      const minutes = strtTm%60

      if (this.zeroHour !== '' && minutes>9) {
        return String(hours+":"+minutes)
      } else if(minutes<10) {
        return String(hours+":"+0+minutes)
      } else {
        return undefined
      }
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeFreeOfChargePeriod')
    },

    async editFreeOfChargePeriod() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const freeOfChargePeriod = {
        start: this.checkInTime,
        until: this.untilZeroHour,
        from: this.zeroHour,
        stop: this.checkOutTime
      }

      console.log(freeOfChargePeriod)

      // try {
      //   await this.$store.dispatch('editFreeOfChargePeriod', freeOfChargePeriod)
      // } catch {}

      // this.$emit('refresh')
      // this.$emit('closeFreeOfChargePeriod')
      this.$message({
        message: 'Изменения в бесплатных периодах заезда/выезда сохранены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>