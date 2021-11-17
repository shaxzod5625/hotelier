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

      <div class="form-3">
        <div class="w-100">
          <label for="input">Основная валюта</label>
          <el-select
            v-model="mainCurrency"
            placeholder="Выберите валюту"
          >
            <el-option
              v-for="(currency, idx) in currencies"
              :key="idx"
              :value="currency.value"
              :label="currency.label"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Дополнительная валюта</label>
          <el-select
            v-model="additionalCurrency"
            placeholder="Выберите валюту"
          >
            <el-option
              v-for="(currency, idx) in currencies"
              :key="idx"
              :value="currency.value"
              :label="currency.label"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Единица измерения</label>
          <el-select
            v-model="measurementUnit"
            placeholder="Выберите единицу измерения"
          >
            <el-option
              v-for="(unit, idx) in measurementUnitTypes"
              :key="idx"
              :value="unit.value"
              :label="unit.label"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Туристический сбор для иностранцев</label>
          <percent-input
            :value="foreignersTourTax"
            :options="{ placeholder: 'Введите % от БВР для тур.сбора' }"
          />
        </div>

        <div class="w-100">
          <label for="input">Тип налога</label>
          <el-select
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
          <percent-input
            :value="foreignersTax"
            :options="{ placeholder: 'Введите % налога' }"
          />
        </div>

        <div class="w-100">
          <label for="input">Туристический сбор для резидентов</label>
          <percent-input
            :value="residentsTourTax"
            :options="{ placeholder: 'Введите % от БВР для тур.сбора' }"
          />
        </div>

        <div class="w-100">
          <label for="input">Тип налога</label>
          <el-select
            v-model="residentsTaxType"
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
          <percent-input
            :value="residentsTax"
            :options="{ placeholder: 'Введите % налога' }"
          />
        </div>

      </div>

      <div class="divider-collapse"/>
      <h4>Расчёт для детей</h4>

      <div
        class="form-3"
        v-for="(child, idx) in children"
        :key="idx"
      >
        <div class="w-100">
          <label for="input">Возраст С</label>
          <el-input
            v-model="child.childAgeStart"
            placeholder="Введите возраст детей"
            v-mask="'##'"
          />
        </div>

        <div class="w-100">
          <label for="input">Возраст ДО</label>
          <el-input
            v-model="child.childAgeStop"
            placeholder="Введите возраст детей"
            v-mask="'##'"
          />
        </div>

        <div class="w-100">
          <label for="input">Сумма к оплате</label>
          <percent-input
            :value="child.costPercent"
            :options="{ placeholder: 'Введите % от стоимости номера' }"
          />
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
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PercentInput from '@/components/PercentInput.vue'
import RadioButton from '@/components/RadioButton.vue'

export default {
  name: 'CalculationRules',

  components: {
    PercentInput, RadioButton
  },

  data:() => ({
    mainCurrency: '',
    additionalCurrency: '',
    measurementUnit: '',
    foreignersTourTax: '',
    foreignersTaxType: '',
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



    currencies: [
      {label: '', value: ''},
      {label: '', value: ''},
      {label: '', value: ''},
      {label: '', value: ''},
    ],

    measurementUnitTypes: [
      {label: '', value: ''},
      {label: '', value: ''},
      {label: '', value: ''},
      {label: '', value: ''},
    ],

    taxTypes: [
      {label: '', value: ''},
      {label: '', value: ''},
      {label: '', value: ''},
      {label: '', value: ''},
    ],
  }),

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
  }
}
</script>

<style>

</style>