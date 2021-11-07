<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Добавление договора</h3>
      <div class="divider"/>
      
      <div class="pad-24">
        <label for="select">Номер договора</label>
        <el-input v-model="contractNumber" placeholder="Введите номер договора">
        </el-input>
      </div>

      <div class="pad-24">
        <label for="input">Дата заключения договора</label>
        <el-date-picker
          class="calendar-100"
          v-model="contractStartDate"
          type="date"
          placeholder="Введите дату заключения договора"
          format="dd/MM/yyyy"
        >
        </el-date-picker>
      </div>

      <div class="pad-24">
        <label for="input">Дата окончания срока договора</label>
        <el-date-picker
          class="calendar-100"
          v-model="contractStopDate"
          type="date"
          placeholder="Введите дату окончания срока договора"
          format="dd/MM/yyyy"
        >
        </el-date-picker>
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
          Добавить
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
  name: 'ContractProlongation',

  data:() => ({
    contractNumber: '',
    contractStartDate: '',
    contractStopDate: '',
  }),

  methods: {
    closeModal() {
      this.$emit('closeProlongationModal')
    }
  }
}
</script>

<style>

</style>