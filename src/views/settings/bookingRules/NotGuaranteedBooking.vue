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
        >
        </el-input>
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
        >
        </el-time-select>
      </div>

      <div class="modal-btns">
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
  name: 'NotGuaranteedBooking',

  data:() => ({
    notificationPeriod: '',
    notificationTime: '',
  }),

  methods: {
    closeModal() {
      this.$emit('closeNotGuaranteedBooking')
    }
  }
}
</script>

<style>

</style>