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

      <div class="pad-24">
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
          @click="bookingCancellationFormSettingsEdit"
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

  validations: {
    numerationType: {required},
    counterResetType: {required}
  },

  methods: {
    closeModal() {
      this.$emit('closeBookingCancelFormModal')
    },

    async bookingCancellationFormSettingsEdit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const bookingCancellationFormSettings = {
        numerationType: this.numerationType,
        counterResetType: this.counterResetType,
        showRequisites: this.showRequisites,
        showNFL: this.showNFL
      }

      console.log(bookingCancellationFormSettings);

      // try {
      //   await this.$store.dispatch('bookingCancellationFormSettingsEdit')
      // } catch {}

      // this.$emit('refresh')
      // this.$emit('closeBookingCancelFormModal')
      this.$message({
        message: 'Изменения в настройках формы аннуляции брони сохранены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>