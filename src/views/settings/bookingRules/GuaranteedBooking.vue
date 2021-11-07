<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Гарантированная бронь</h3>
      <div class="divider"/>

      <div
        class="form-3"
        v-for="(rule, idx) in rules"
        :key="idx"
      >
        <div class="w-100">
          <label for="input">Период бесплатной отмены</label>
          <el-input
            v-model="rule.freeCancellationPeriod"
            placeholder="Введите количество суток"
            v-mask="'#'"
          >
          </el-input>
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
          <el-input
            v-model="rule.penaltyProcent"
            placeholder="Введите процент от суммы проживания"
            v-mask="'## %'"
          >
          </el-input>
        </div>

        <div
          class="w-100"
          v-else
        >
          <label for="input">Сумма</label>
          <currency-input 
            v-model="rule.fixedSoum" 
            :options="{ currency: 'UZS' }"
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

      <div class="checkbox-group-div">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"><h3 class="checkbox-label">Типы гарантии</h3></el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
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
import CurrencyInput from '../../../components/CurrencyInput.vue'

const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'ShitCity', 'ChinaSucks', 'HongKongSuper']

export default {
  name: 'GuaranteedBooking',

  components: {
    CurrencyInput
  },

  data:() => ({
    rules: [{
      freeCancellationPeriod: '',
      fixedSoum: '',
      penaltyProcent: '',
      penaltyType: 'fixedAmount',},
    ],
      

    penaltyTypes: [
      {label: 'Фиксированная сумма', value: 'fixedAmount'},
      {label: 'Процент от суммы проживания', value: 'procent'},
    ],


    checkAll: false,
    checkedCities: ['Shanghai', 'Beijing'],
    cities: cityOptions,
    isIndeterminate: true,
  }),

  methods: {
    closeModal() {
      this.$emit('closeGuaranteedBooking')
    },

    addRule () {
      this.rules.push({
        freeCancellationPeriod: '',
        fixedSoum: '',
        penaltyProcent: '',
        penaltyType: 'fixedAmount',
      })
    },

    removeRule (index) {
      this.rules.splice(index, 1)
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll === checkedCount === this.cities.length;
      this.isIndeterminate === checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style>

</style>