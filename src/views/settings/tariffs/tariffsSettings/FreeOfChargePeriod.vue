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
            v-model="freeOfCharge.checkInStartTime"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: startTimeUntil
            }"
            placeholder="Введите время"
            v-mask="'##:##'"
          >
          </el-time-select>
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
            :placeholder="untilZeroHour"
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
            :placeholder="untilZeroHour"
            v-mask="'##:##'"
          >
          </el-time-select>
        </div>

        <div class="w-100-timeSelect">
          <label for="input">ДО</label>
          <el-time-select
            class="time"
            v-model="freeOfCharge.checkOutStopTime"
            :picker-options="{
              start: stopTimefrom,
              step: '00:01',
              end: '23:59'
            }"
            placeholder="Введите время"
            v-mask="'##:##'"
          >
          </el-time-select>
        </div>
      </div>

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
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
export default {
  name: 'FreeOfChargePeriod',

  data:() => ({
    freeOfCharge: [
      {
        zeroHour: '',
        checkInStartTime: '', checkInStopTime: '',
        checkOutStartTime: '', checkOutStopTime: ''
      }
    ]
  }),

  computed: {
    startTimeUntil() {
      let zh = this.freeOfCharge.zeroHour
      const timeParts = String(zh).split(":")
      const strtTm = Number(timeParts[0]) * 60 + Number(timeParts[1]) - 2

      const hours = Math.floor(strtTm / 60)
      const minutes = strtTm%60

      if (this.freeOfCharge.zeroHour !== '') {
        return String(hours+":"+minutes)
      } else {
        return undefined
      }
    },

    stopTimefrom() {
      let zh = this.freeOfCharge.zeroHour
      const timeParts = String(zh).split(":")
      const strtTm = Number(timeParts[0]) * 60 + Number(timeParts[1]) + 1

      const hours = Math.floor(strtTm / 60)
      const minutes = strtTm%60

      if (this.freeOfCharge.zeroHour !== '') {
        return String(hours+":"+minutes)
      } else {
        return undefined
      }
    },

    untilZeroHour() {
      let zh = this.freeOfCharge.zeroHour
      const timeParts = String(zh).split(":")
      const strtTm = Number(timeParts[0]) * 60 + Number(timeParts[1]) - 1

      const hours = Math.floor(strtTm / 60)
      const minutes = strtTm%60

      if (this.freeOfCharge.zeroHour !== '') {
        return String(hours+":"+minutes)
      } else {
        return undefined
      }
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeFreeOfChargePeriod')
    }
  }
}
</script>

<style>

</style>