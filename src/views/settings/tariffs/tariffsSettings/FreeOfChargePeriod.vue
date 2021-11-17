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
              end: '23:59'
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
            v-model="freeOfCharge.checkInStopTime"
            disabled
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            placeholder="11:59"
            v-mask="'##:##'"
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
            v-model="freeOfCharge.checkOutStartTime"
            disabled
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            placeholder="12:00"
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
              start: '00:00',
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
        checkInStartTime: '', checkInStopTime: '',
        checkOutStartTime: '', checkOutStopTime: ''
      }
    ]
  }),

  methods: {
    closeModal() {
      this.$emit('closeFreeOfChargePeriod')
    }
  }
}
</script>

<style>

</style>