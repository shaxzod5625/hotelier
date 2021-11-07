<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Форма аннуляции брони</h3>
      <div class="divider"/>

      <div class="pad-24">
        <label for="input">Тип нумерации</label>
        <el-select
          v-model="numerationType"

          placeholder="Выберите тип нумерации"
        >
          <el-option
            v-for="(numerationType, idx) in numerationTypes"
            :key="idx"
            :value="numerationType.value"
            :label="numerationType.label"
          >
          </el-option>
        </el-select>
      </div>

      <div class="pad-24">
        <label for="input">Обнуление счётчика</label>
        <el-select
          v-model="counterResetType"

          placeholder="Выберите тип обнуления счётчика"
        >
          <el-option
            v-for="(counterResetType, idx) in counterResetTypes"
            :key="idx"
            :value="counterResetType.value"
            :label="counterResetType.label"
          >
          </el-option>
        </el-select>
      </div>

      <div class="pad-24">
        <el-checkbox
          v-model="showRequisites"
        >
          Указать реквизиты
        </el-checkbox>
      </div>

      <div class="pad-24">
        <el-checkbox
          v-model="showNFL"
        >
          Указать ФИО подтверждающего лица
        </el-checkbox>
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
  name: 'BookingCancellationForm',

  data:() => ({
    numerationType: '',
    counterResetType: '',
    showRequisites: true,
    showNFL: false,

    numerationTypes: [
      {label: 'С датой (8-значная)', value: 'date-8'},
      {label: 'С датой (6-значная)', value: 'date-6'},
      {label: 'Обычная (8-значная)', value: 'regular-8'},
      {label: 'Обычная (6-значная)', value: 'regular-6'}
    ],

    counterResetTypes: [
      {label: 'Ежегодно', value: 'yearly'},
      {label: 'Ежемесячно', value: 'monthly'},
      {label: 'Еженедельно', value: 'weekly'},
      {label: 'Ежедневно', value: 'daily'},
    ]
  }),

  methods: {
    closeModal() {
      this.$emit('closeBookingCancelFormModal')
    }
  }
}
</script>

<style>

</style>