<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Добавление договора</h3>
      <div class="divider"/>
      
      <div class="pad-24">
        <label for="select">Номер договора</label>
        <el-input
          v-model="contractNumber"
          placeholder="Введите номер договора"
          :class="{invalid: ($v.contractNumber.$dirty && !$v.contractNumber.required)}"
        />
        <span v-if="$v.contractNumber.$dirty && !$v.contractNumber.required" class="validation-error">Sometext</span>
      </div>

      <div class="pad-24">
        <label for="input">Дата заключения договора</label>
        <el-date-picker
          class="calendar-100"
          v-model="contractStartDate"
          type="date"
          placeholder="Введите дату заключения договора"
          format="dd/MM/yyyy"
          v-mask="'##/##/####'"
          :class="{invalid: ($v.contractStartDate.$dirty && !$v.contractStartDate.required)}"
        />
        <span v-if="$v.contractStartDate.$dirty && !$v.contractStartDate.required" class="validation-error">Sometext</span>
      </div>

      <div class="pad-24">
        <label for="input">Дата окончания срока договора</label>
        <el-date-picker
          class="calendar-100"
          v-model="contractStopDate"
          type="date"
          placeholder="Введите дату окончания срока договора"
          format="dd/MM/yyyy"
          v-mask="'##/##/####'"
          :class="{invalid: ($v.contractStopDate.$dirty && !$v.contractStopDate.required)}"
        />
        <span v-if="$v.contractStopDate.$dirty && !$v.contractStopDate.required" class="validation-error">Sometext</span>
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
          @click="newContract"
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
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'ContractProlongation',

  data:() => ({
    contractNumber: '',
    contractStartDate: '',
    contractStopDate: '',
  }),

  props: {
    type: String,
    id: String
  },

  validations: {
    contractNumber: {required},
    contractStartDate: {required},
    contractStopDate: {required}
  },

  methods: {
    closeModal() {
      this.$emit('closeProlongationModal')
    },

    async newContract() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      
      const start = new Date(this.contractStartDate)
      const stop = new Date(this.contractStopDate)

      const contract = {
        type: this.type,
        id: this.id,
        contractNumber: this.contractNumber,
        startedDate: start,
        finishedDate: stop
      }

      try {
        await this.$store.dispatch('newContract', contract)
      } catch {}

      try {
        await this.$store.dispatch('getPartnersInfo')
      } catch {}

      this.$emit('refresh')
      this.$emit('closeProlongationModal')
      this.$message({
        message: 'Новый контракт (договор) добавлен в информацию партнера',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>