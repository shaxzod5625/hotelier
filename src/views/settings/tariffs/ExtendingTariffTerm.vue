<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Продление срока</h3>
      <div class="divider"/>

      <h4
        class="cardcount"
        style="margin-top: 12px"
      >
        {{tariff.name}}
      </h4>

      <h4
        class="cardsectitle"
        style="margin-bottom: 0; margin-top: 24px"
      >
        Продлить срок тарифа:
      </h4>

      <div class="pad-24">
        <div class="w-100">
          <label for="input">Окончание срока</label>
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

      <h4
        class="cardquest"
      >
        Продлить тариф?
      </h4>

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
          ОК
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
  name: 'ExtendingTariffTerm',

  data:() => ({
    term: {
      stopDate: '', stopTime: ''
    }
  }),

  props: {
    tariff: Object
  },

  methods: {
    closeModal() {
      this.$emit('closeExtendingTariffTerm')
    }
  }
}
</script>

<style>

</style>