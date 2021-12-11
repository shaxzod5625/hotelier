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
            :class="{invalid: ($v.numerationType.$dirty && !$v.numerationType.required)}"
          >
            <el-option
              v-for="(type, idx) in numerationTypes"
              :key="idx"
              :value="type.value"
              :label="type.label"
            >
            </el-option>
          </el-select>
          <span v-if="$v.numerationType.$dirty && !$v.numerationType.required" class="validation-error">Пожалуйста, выберите тип нумерации</span>
        </div>

        <div class="w-100">
          <label for="input">Обнуление счётчика</label>
          <el-select
            v-model="counterResetType"
            placeholder="Выберите тип обнуления счётчика"
            :class="{invalid: ($v.counterResetType.$dirty && !$v.counterResetType.required)}"
          >
            <el-option
              v-for="(type, idx) in counterResetTypes"
              :key="idx"
              :value="type.value"
              :label="type.label"
            >
            </el-option>
          </el-select>
          <span v-if="$v.counterResetType.$dirty && !$v.counterResetType.required" class="validation-error">Пожалуйста, выберите тип обнуления счётчика</span>
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


<!-- //////// Hidden computed //////////////// -->
<h4 style="display: none">{{setInfo}}</h4>
<!-- ///////////////////////////////////////// -->


      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="invoiceFormSettingsEdit"
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
import {required} from 'vuelidate/lib/validators'

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

    invoiceFormSettings: JSON.parse(window.sessionStorage.documentFormsSettings).documentFormat.invoice,

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

  validations: {
    numerationType: {required},
    counterResetType: {required}
  },

  computed: {
    setInfo() {
      this.numerationType = JSON.parse(this.invoiceFormSettings).numerationType,
      this.counterResetType = JSON.parse(this.invoiceFormSettings).counterResetType,
      this.selectedOrientation = JSON.parse(this.invoiceFormSettings).selectedOrientation,
      this.showRequisites = JSON.parse(this.invoiceFormSettings).showRequisites,
      this.showDollarRate = JSON.parse(this.invoiceFormSettings).showDollarRate
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeInvoiceFormModal')
    },

    async invoiceFormSettingsEdit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const invoiceFormSettings = {
        numerationType: this.numerationType,
        counterResetType: this.counterResetType,
        selectedOrientation: this.selectedOrientation,
        showRequisites: this.showRequisites,
        showDollarRate: this.showDollarRate,
      }

      try {
        await this.$store.dispatch('invoiceFormSettingsEdit', invoiceFormSettings)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeInvoiceFormModal')
      this.$message({
        message: 'Изменения в настройках формы инвойса сохранены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>