<template>
  <div class="modal">
    <div class="modal-div-2">
      <h3>Форма инвойса</h3>
      <div class="divider"/>

      <div class="form-2">
        <div
          class="radio-btn-div"
          @click="selectedOrientation = 'bookOrientation'"
        >
          <div class="img-div">
            <img src="@/assets/Afour-book.svg" alt="">
          </div>
          <label class="radiobtn-label" for="input">1 экземпляр на лист А4</label>
          <RadioButton
            value="bookOrientation"
            v-model="selectedOrientation"
          />
        </div>

        <div
          class="radio-btn-div"
          @click="selectedOrientation = 'albumOrientation'"
        >
          <div class="img-div">
            <img src="@/assets/Afour-album.svg" alt="">
          </div>
          <label class="radiobtn-label" for="input">1 экземпляр на лист А4</label>
          <RadioButton
            value="albumOrientation"
            v-model="selectedOrientation"
          />
        </div>

        <div class="w-100">
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

        <div class="w-100">
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

        <div class="w-100">
          <el-checkbox
            v-model="showRequisites"
          >
            Указать реквизиты
          </el-checkbox>
        </div>

        <div class="w-100">
          <el-checkbox
            v-model="showDollarRate"
          >
            Указать курс доллара США
          </el-checkbox>
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
import RadioButton from '@/components/RadioButton.vue'


export default {
  name: 'InvoiceForm',

  components: {
    RadioButton
  },

  data:() => ({
    numerationType: '',
    counterResetType: '',
    selectedOrientation: 'bookOrientation',
    showRequisites: true,
    showDollarRate: false,


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
      this.$emit('closeInvoiceFormModal')
    }
  }
}
</script>

<style>

</style>