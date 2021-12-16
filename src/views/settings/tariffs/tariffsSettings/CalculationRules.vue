<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/tariffs'}" class="breadcrump">Тарифы и цены</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/tariffs/configurations'}" class="breadcrump">Конфигурации</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Правила расчёта</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="input-grid">
      <h4>Основные</h4>

      <div class="form-3" style="width: 100%">
        <div class="w-100">
          <label for="input">Основная валюта</label>
          <el-select
            v-model="mainCurrency"
            placeholder="Выберите валюту"
            :class="{invalid: ($v.mainCurrency.$dirty && !$v.mainCurrency.required)}"
          >
            <el-option
              v-for="(currency, idx) in currencies"
              :key="idx"
              :value="currency.value"
              :label="currency.label"
            />
          </el-select>
          <span v-if="$v.mainCurrency.$dirty && !$v.mainCurrency.required" class="validation-error">Пожалуйста, выберите валюту</span>
        </div>

        <div class="w-100">
          <label for="input">Дополнительная валюта</label>
          <el-select
            v-model="additionalCurrency"
            placeholder="Выберите валюту"
            :class="{invalid: ($v.additionalCurrency.$dirty && !$v.additionalCurrency.required)}"
          >
            <el-option
              v-for="(currency, idx) in currencies"
              :key="idx"
              :value="currency.value"
              :label="currency.label"
            />
          </el-select>
          <span v-if="$v.additionalCurrency.$dirty && !$v.additionalCurrency.required" class="validation-error">Пожалуйста, выберите валюту</span>
        </div>

        <div class="w-100">
          <label for="input">Единица измерения</label>
          <el-select
            v-model="measurementUnit"
            placeholder="Выберите единицу измерения"
            :class="{invalid: ($v.measurementUnit.$dirty && !$v.measurementUnit.required)}"
          >
            <el-option
              v-for="(type, idx) in tariffMeasurementTypes"
              :key="idx"
              :value="type.value"
              :label="type.label"
            />
          </el-select>
          <span v-if="$v.measurementUnit.$dirty && !$v.measurementUnit.required" class="validation-error">Пожалуйста, выберите единицу измерения</span>
        </div>

        <div class="w-100">
          <label for="input">Туристический сбор для иностранцев</label>
          <money
            class="money-input"
            v-model="foreignersTourTax"
            placeholder="Введите % от БВР для тур.сбора"
            v-bind="percent"
            :class="{invalid: ($v.foreignersTourTax.$dirty && !$v.foreignersTourTax.required)}"
          />
          <span v-if="$v.foreignersTourTax.$dirty && !$v.foreignersTourTax.required" class="validation-error">Пожалуйста, введите % от БВР для тур.сбора"</span>
        </div>

        <div class="w-100">
          <label for="input">Тип налога</label>
          <el-select
            disabled
            v-model="foreignersTaxType"
            placeholder="Выберите тип налога"
          >
            <el-option
              v-for="(type, idx) in taxTypes"
              :key="idx"
              :value="type.value"
              :label="type.label"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Налог</label>
          <el-input
            disabled
            v-model="foreignersTax"
            placeholder="Введите % налога"
          />
        </div>

        <div class="w-100">
          <label for="input">Туристический сбор для резидентов</label>
          <money
            class="money-input"
            v-model="residentsTourTax"
            placeholder="Введите % от БВР для тур.сбора"
            v-bind="percent"
            :class="{invalid: ($v.residentsTourTax.$dirty && !$v.residentsTourTax.required)}"
          />
          <span v-if="$v.residentsTourTax.$dirty && !$v.residentsTourTax.required" class="validation-error">Пожалуйста, введите % от БВР для тур.сбора"</span>
        </div>

        <div class="w-100">
          <label for="input">Тип налога</label>
          <el-select
            v-model="residentsTaxType"
            placeholder="Выберите тип налога"
            disabled
          >
            <el-option
              v-for="(type, idx) in taxTypes"
              :key="idx"
              :value="type.value"
              :label="type.label"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Налог</label>
          <el-input
            v-model="residentsTax"
            disabled
            placeholder="Введите % налога"
          />
        </div>

      </div>

      <div class="divider-collapse"/>
      <h4>Расчёт для детей</h4>

      <div
        class="form-3"
        style="width: 100%"
        v-for="(child, idx) in children"
        :key="idx"
        :set="v = $v.children.$each[idx]"
      >
        <div class="w-100">
          <label for="input">Возраст С</label>
          <el-input
            v-model="child.childAgeStart"
            placeholder="Введите возраст детей"
            v-mask="'##'"
            :class="{invalid: (v.childAgeStart.$dirty && !v.childAgeStart.required)}"
          />
          <span v-if="v.childAgeStart.$dirty && !v.childAgeStart.required" class="validation-error">Пожалуйста, введите возраст детей"</span>
        </div>

        <div class="w-100">
          <label for="input">Возраст ДО</label>
          <el-input
            v-model="child.childAgeStop"
            placeholder="Введите возраст детей"
            v-mask="'##'"
            :class="{invalid: (v.childAgeStop.$dirty && !v.childAgeStop.required)}"
          />
          <span v-if="v.childAgeStop.$dirty && !v.childAgeStop.required" class="validation-error">Пожалуйста, введите возраст детей"</span>
        </div>

        <div class="w-100">
          <label for="input">Сумма к оплате (% от стоимости номера)</label>
          <money
            class="money-input"
            v-model="child.costPercent"
            placeholder="Введите % от стоимости номера"
            v-bind="percent"
            :class="{invalid: (v.costPercent.$dirty && !v.costPercent.required)}"
          />
          <span v-if="v.costPercent.$dirty && !v.costPercent.required" class="validation-error">Пожалуйста, введите % от стоимости номера"</span>
        </div>

        <div></div>

        <div
          class="input-grid-btns"
          style="margin-bottom: 0"
        >
          <button
            class="ghost-btn-danger"
            @click="removeChildRule(idx)"
            v-show="idx || ( !idx && children.length > 1)"
          >
            <img src="@/assets/icons/Minus-sm.svg" alt="">
            Удалить
          </button>

          <button
            class="ghost-btn"
            @click="addChildRule(idx)"
            v-show="idx == children.length-1"
          >
            <img src="@/assets/icons/Add-sm.svg" alt="">
            Добавить
          </button>
        </div>

      </div>

      <div class="divider-collapse"/>
      <h4>Тип тарификации</h4>
      
      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="calculationType = 'unified'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="unified"
            v-model="calculationType"
          />
          <h3>
            Единая
          </h3>
          <span>
            (Общая тарификация для резидентов и иностранцев)
          </span>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="calculationType = 'doubled'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="doubled"
            v-model="calculationType"
          />
          <h3>
            Двойная
          </h3>
          <span>
            (Отдельная тарификация для резидентов и иностранцев)
          </span>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div class="divider-collapse"/>
      <h4>Резиденты и иностранцы в одной комнате</h4>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCase = 'halfEach'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="halfEach"
            v-model="combinedCase"
          />
          <h3>
            Расчёт по половины суммы от цен по типу размещения по гражданству
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCase = 'residentCost'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="residentCost"
            v-model="combinedCase"
          />
          <h3>
            Расчёт по ценам для резидентов
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCase = 'foreignerCost'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="foreignerCost"
            v-model="combinedCase"
          />
          <h3>
            Расчёт по ценам для иностранцев
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCase = 'individual'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="individual"
            v-model="combinedCase"
          />
          <h3>
            Индивидуальные цены
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div class="divider-collapse"/>
      <h4>Способ расчёта ранних заездов, в случае проживания в номере резидентов и иностранцев одновременно</h4>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCaseEarlyCheckIn = 'halfEach'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="halfEach"
            v-model="combinedCaseEarlyCheckIn"
          />
          <h3>
            Расчёт по половины суммы от цен по типу размещения по гражданству
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCaseEarlyCheckIn = 'residentCost'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="residentCost"
            v-model="combinedCaseEarlyCheckIn"
          />
          <h3>
            Расчёт по ценам для резидентов
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCaseEarlyCheckIn = 'foreignerCost'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="foreignerCost"
            v-model="combinedCaseEarlyCheckIn"
          />
          <h3>
            Расчёт по ценам для иностранцев
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div class="divider-collapse"/>
      <h4>Способ расчёта поздних выездов, в случае проживания в номере резидентов и иностранцев одновременно</h4>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCaseLatelyCheckOut = 'halfEach'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="halfEach"
            v-model="combinedCaseLatelyCheckOut"
          />
          <h3>
            Расчёт по половины суммы от цен по типу размещения по гражданству
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCaseLatelyCheckOut = 'residentCost'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="residentCost"
            v-model="combinedCaseLatelyCheckOut"
          />
          <h3>
            Расчёт по ценам для резидентов
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

      <div
        class="radio-div"
      >
        <div
          class="click"
          @click="combinedCaseLatelyCheckOut = 'foreignerCost'"
        >
          <RadioButton
            style="margin-bottom: 28px"
            value="foreignerCost"
            v-model="combinedCaseLatelyCheckOut"
          />
          <h3>
            Расчёт по ценам для иностранцев
          </h3>
        </div>
        <img src="@/assets/icons/Question-mark.svg" alt="">
      </div>

<!-- //////////// Hidden computed /////////////// -->
<h4>{{setInfo}}</h4>
<!-- //////////////////////////////////////////// -->

      <div class="input-grid-btns">
        <router-link
          tag="button"
          :to="{ name: 'Tariffs Settings'}"
          class="sec-btn"
        >
          Отмена
        </router-link>

        <button
          class="prim-btn"
          @click="editCalculationRules"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from '@/components/RadioButton.vue'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'CalculationRules',

  components: {
    RadioButton
  },

  data:() => ({
    mainCurrency: '',
    additionalCurrency: '',
    measurementUnit: '',
    foreignersTourTax: '',
    foreignersTaxType: '',
    foreignersTax: '',
    residentsTourTax: '',
    residentsTaxType: '',
    residentsTax: '',
    calculationType: 'unified',
    combinedCase: 'halfEach',
    combinedCaseEarlyCheckIn: 'halfEach',
    combinedCaseLatelyCheckOut: 'halfEach',
    children: [{
      childAgeStart: '',
      childAgeStop: '',
      costPercent: ''
    }],

    percent: {
      decimal: '',
      thousands: ' ',
      prefix: '',
      suffix: ' %',
      precision: 0,
      masked: true
    },

    taxTypes: [],
  }),

  validations: {
    mainCurrency: {required},
    additionalCurrency: {required},
    measurementUnit: {required},
    foreignersTourTax: {required},
    residentsTourTax: {required},
    children: {
      $each: {
        childAgeStart: {required},
        childAgeStop: {required},
        costPercent: {required},
      }
    },
  },

  computed: {
    setInfo() {
      const calcRules = JSON.parse(JSON.parse(window.sessionStorage.tariffConfigs).configuration.calculationRules)

      this.mainCurrency = calcRules.mainCurrency
      this.additionalCurrency = calcRules.additionalCurrency
      this.measurementUnit = calcRules.measurementUnit
      this.foreignersTourTax = calcRules.foreignersTourTax
      this.residentsTourTax = calcRules.residentsTourTax
      this.calculationType = calcRules.calculationType
      this.combinedCase = calcRules.combinedCase
      this.combinedCaseEarlyCheckIn = calcRules.combinedCaseEarlyCheckIn
      this.combinedCaseLatelyCheckOut = calcRules.combinedCaseLatelyCheckOut
      this.children = calcRules.children
    },

    currencies() {
      return this.$store.state.currencies
    },

    tariffMeasurementTypes() {
      return this.$store.state.tariffMeasurementTypes
    }
  },

  methods: {
    addChildRule() {
      this.children.push({
        childAgeStart: '',
        childAgeStop: '',
        costPercent: ''
      })
    },

    removeChildRule(idx) {
      this.children.splice(idx, 1)
    },

    async editCalculationRules() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        this.$message.error('Пожалуйста, заполните все необходимые поля');
        return
      }

      const rules = {
        mainCurrency: this.mainCurrency,
        additionalCurrency: this.additionalCurrency,
        measurementUnit: this.measurementUnit,
        foreignersTourTax: this.foreignersTourTax,
        residentsTourTax: this.residentsTourTax,
        calculationType: this.calculationType,
        combinedCase: this.combinedCase,
        combinedCaseEarlyCheckIn: this.combinedCaseEarlyCheckIn,
        combinedCaseLatelyCheckOut: this.combinedCaseLatelyCheckOut,
        children: this.children
      }

      console.log(rules);

      // try {
      //   await this.$store.dispatch('editCalculationRules', rules)
      // } catch {}

      // this.router.push( {path: '/settings/tariffs'} )
      this.$message({
        message: 'Изменения в правилах расчета сохранены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>