<template>
  <div class="modal">
    <div class="modal-div-2">
      <h3>Ранний заезд</h3>
      <div class="divider"/>

      <div
        class="loop-div"
        v-for="(rule, idx) in checkInRules"
        :key="idx"
      >
        <div class="form-2">
          <div class="w-100-timeSelect">
            <label for="input">Заезд С</label>
            <el-time-select
              class="time"
              v-model="rule.checkInStartTime"
              disabled
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
              placeholder="00:00"
              v-mask="'##:##'"
            >
            </el-time-select>
          </div>

          <div class="w-100-timeSelect">
            <label for="input">Заезд ДО</label>
            <el-time-select
              class="time"
              v-model="rule.checkInStopTime"
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
              placeholder="Введите время"
              v-mask="'##:##'"
            >
            </el-time-select>
          </div>

          <div class="w-100">
            <label for="input">Тип тарификации</label>
            <el-select
              v-model="rule.tarificationType"
              placeholder="Выберите тип тарификации"
            >
              <el-option
                v-for="(type, idx) in tarificationTypes"
                :key="idx"
                :value="type.value"
                :label="type.label"
              />
            </el-select>
          </div>

          <div
            class="w-100"
            v-if="rule.tarificationType === 'fixed'"
          >
            <label for="input">Сумма</label>
            <money
              class="money-input"
              v-model="rule.amount"
              v-bind="money"
              placeholder="Введите сумму"
            />
          </div>

          <div
            v-else
            class="w-100"
          >
            <label for="input">Процент</label>
            <money
              class="money-input"
              v-model="rule.amount"
              v-bind="percent"
              placeholder="Введите процент от проживания"
            />
          </div>
        </div>

        <div class="divider"/>

        <div
          class="input-grid-btns"
          style="margin-bottom: 0"
        >
          <button
            class="ghost-btn-danger"
            @click="removeRule(idx)"
            v-show="idx || ( !idx && checkInRules.length > 1)"
          >
            <img src="@/assets/icons/Minus-sm.svg" alt="">
            Удалить
          </button>

          <button
            class="ghost-btn"
            @click="addRule(idx)"
            v-show="idx == checkInRules.length-1"
          >
            <img src="@/assets/icons/Add-sm.svg" alt="">
            Добавить
          </button>
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

export default {
  name: 'EarlyCheckInPeriod',

  data:() => ({
    checkInRules: [
      {
        checkInStartTime: '',
        checkInStopTime: '',
        tarificationType: 'fixed',
        amount: '',
      }
    ],

    tarificationTypes: [
      {value: 'fixed', label: 'Фиксированная сумма'},
      {value: 'percent', label: 'Процент от проживания'}
    ],

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
      thousands: ' ',
      prefix: '',
      suffix: ' %',
      precision: 0,
      masked: true
    }
  }),

  methods: {
    closeModal() {
      this.$emit('closeEarlyCheckInPeriod')
    },

    addRule () {
      this.checkInRules.push({
        checkInStartTime: '',
        checkInStopTime: '',
        tarificationType: 'fixed',
        amount: '',
      })
    },

    removeRule (idx) {
      this.checkInRules.splice(idx, 1)
    },
  }
}
</script>

<style>

</style>