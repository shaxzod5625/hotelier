<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Дублирование в активные тарифы</h3>
      <div class="divider"/>

      <h4
        class="cardcount"
        style="margin-top: 24px"
      >
        {{tariff.name}}
      </h4>

      <div class="pad-24">
        <div class="w-100">
          <label for="input">Срок тарифа С</label>
          <div class="w-100-r">
            <el-date-picker
              class="calendar"
              v-model="term.startDate"
              type="date"
              placeholder="Выберите дату"
              format="dd/MM/yyyy"
            >
            </el-date-picker>

            <el-time-select
              class="time"
              v-model="term.startTime"
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
              placeholder="--:--"
              v-mask="'##:##'"
            >
            </el-time-select>
          </div>
        </div>

        <div class="w-100">
          <label for="input">Срок тарифа ДО</label>
          <div class="w-100-r">
            <el-date-picker
              class="calendar"
              v-model="term.stopDate"
              type="date"
              placeholder="Выберите дату"
              format="dd/MM/yyyy"
            >
            </el-date-picker>

            <el-time-select
              class="time"
              v-model="term.stopTime"
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
              placeholder="--:--"
              v-mask="'##:##'"
            >
            </el-time-select>
          </div>
        </div>
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
          Дублировать
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
  name: 'DuplicatingTariff',

  data:() => ({
    term: {
      startDate: '', startTime: '', stopDate: '', stopTime: '', 
    }
  }),

  props: {
    tariff: Object
  },

  methods: {
    closeModal() {
      this.$emit('closeDuplicatingTariff')
    }
  }
}
</script>

<style>

</style>