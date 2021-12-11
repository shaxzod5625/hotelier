<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Гарантированная бронь</h3>
      <div class="divider"/>

      <div
        class="form-3"
        v-for="(rule, idx) in rules"
        :key="idx"
        :set="v = $v.rules.$each[idx]"
      >
        <div class="w-100">
          <label for="input">Период бесплатной отмены</label>
          <el-input
            v-model="rule.freeCancellationPeriod"
            placeholder="Введите количество суток"
            v-mask="'#'"
            :class="{invalid: (v.freeCancellationPeriod.$dirty && !v.freeCancellationPeriod.required)}"
          />
          <span v-if="v.freeCancellationPeriod.$dirty && !v.freeCancellationPeriod.required" class="validation-error">Пожалуйста, введите количество суток</span>
        </div>

        <div class="w-100">
          <label for="input">Тип штрафа</label>
          <el-select
            v-model="rule.penaltyType"
            placeholder="Выберите тип штрафа"
          >
            <el-option
              v-for="(penalty, idx) in penaltyTypes"
              :key="idx"
              :label="penalty.label"
              :value="penalty.value"
            >
            </el-option>
          </el-select>
        </div>

        <div
          v-if="rule.penaltyType == 'procent'"
          class="w-100"
        >
          <label for="input">Процент</label>
          <money
            class="money-input"
            v-model="rule.penaltyProcent"
            v-bind="percent"
            placeholder="Введите процент от суммы проживания"
          />
        </div>

        <div
          class="w-100"
          v-else
        >
          <label for="input">Сумма</label>
          <money
            class="money-input"
            v-model="rule.fixedSoum"
            v-bind="money"
          />
        </div>

        <div/>

        <div class="input-grid-btns">
          <button
            class="ghost-btn-danger"
            @click="removeRule(idx)"
            v-show="idx || ( !idx && rules.length > 1)"
          >
            <img src="@/assets/icons/Minus-sm.svg" alt="">
            <span>Удалить</span>
          </button>

          <button
            class="ghost-btn"
            @click="addRule(idx)"
            v-show="idx == rules.length-1"
          >
            <img src="@/assets/icons/Add-sm.svg" alt="">
            <span>Добавить</span>
          </button>
        </div>
        
      </div>

      <div class="divider"/>

      <div class="form-1">
        <div class="w-100">
          <label for="input">Типы гарантии</label>
          <el-select
            v-model="checkedGuaranteeTypes"
            multiple
            collapse-tags
            placeholder="Выберите типы гарантии бронирования"
            :class="{invalid: ($v.checkedGuaranteeTypes.$dirty && !$v.checkedGuaranteeTypes.required)}"
          >
            <el-option
              v-for="(type, idx) in guaranteeTypes"
              :key="idx"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
          <span v-if="$v.checkedGuaranteeTypes.$dirty && !$v.checkedGuaranteeTypes.required" class="validation-error">Пожалуйста, выберите типы гарантии бронирования</span>
        </div>
      </div>

<!-- ///////// Hidden computed /////////////// -->
      <h4 style="display: none">{{setBookingRulesInfo}}</h4>
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
          @click="newBookingRules"
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
  name: 'GuaranteedBooking',

  data:() => ({
    guaranteedBokingRules: JSON.parse(window.sessionStorage.rules).guarantedBooking,

    rules: [
      {
        freeCancellationPeriod: '',
        fixedSoum: '0',
        penaltyProcent: '0',
        penaltyType: 'fixedAmount',
      }
    ],

    penaltyTypes: [
      {label: 'Фиксированная сумма', value: 'fixedAmount'},
      {label: 'Процент от суммы проживания', value: 'procent'},
    ],


    checkAll: false,
    checkedGuaranteeTypes: [],
    guaranteeTypes: [
      {label: 'Visa', value: 'visa'},
      {label: 'MasterCard', value: 'masterCard'},
      {label: 'Maestro', value: 'maestro'},
      {label: 'UnionPay', value: 'unionPay'},
      {label: 'Карты МИР', value: 'mir'},
      {label: 'UzCard', value: 'uzCard'},
      {label: 'HUMO', value: 'humo'},
      {label: 'Корпоративный договор', value: 'corporativeContract'},
      {label: 'Гарантийное письмо', value: 'guaranteeLetter'},
      {label: 'Гарантия агента или компании', value: 'companyAgentGuarantee'}
    ],
    isIndeterminate: false,

    money: {
      decimal: '',
      thousands: ' ',
      prefix: '',
      suffix: ' UZS',
      precision: 0,
      masked: true
    },
    percent: {
      decimal: '',
      thousands: '',
      prefix: '',
      suffix: ' %',
      precision: 0,
      masked: true
    }
  }),

  validations() {
    return {
      checkedGuaranteeTypes: {required},
      rules: {
        $each:{
          freeCancellationPeriod: {required},
          fixedSoum: this.fixedSoumRequired,
          penaltyProcent: this.procentRequired,
          penaltyType: {required}
        }
      }
    }
  },

  computed: {
    setBookingRulesInfo() {
      this.rules = JSON.parse(window.sessionStorage.rules).guarantedBooking.period
      this.checkedGuaranteeTypes = JSON.parse(window.sessionStorage.rules).guarantedBooking.typeOfGuarante
    },

    procentRequired() {
      if(this.penaltyType === 'procent') {
        return {required}
      } else {
        return ''
      }
    },

    fixedSoumRequired() {
      if(this.penaltyType === 'fixedAmount') {
        return {required}
      } else {
        return ''
      }
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeGuaranteedBooking')
    },

    handleCheckAllChange(value) {
      this.checkedGuaranteeTypes = value ? this.guaranteeTypesList : [];
      this.isIndeterminate = false;
      console.log(value);
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.guaranteeTypes.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.guaranteeTypes.length;
      console.log(checkedCount);
      console.log(this.guaranteeTypes.length);
    },

    async newBookingRules() {
      if(this.$v.$invalid) {
        console.log('invalid');
        this.$v.$touch()
        return
      }

      const rules = {
        period: this.rules,
        typeOfGuarante: this.checkedGuaranteeTypes
      }

      try {
        await this.$store.dispatch('newBookingRules', rules)
      } catch {}

      try {
        await this.$store.dispatch('getBookingRulesInfo')
      } catch {}

      this.$emit('refresh')
      this.$emit('closeGuaranteedBooking')
      this.$message({
        message: 'Правила гарантированной бронирования добавлены',
        type: 'success'
      })
    },

    addRule () {
      this.rules.push({
        freeCancellationPeriod: '',
        fixedSoum: '0',
        penaltyProcent: '0',
        penaltyType: 'fixedAmount',
      })
    },

    removeRule (index) {
      this.rules.splice(index, 1)
    },
  }
}
</script>

<style>

</style>