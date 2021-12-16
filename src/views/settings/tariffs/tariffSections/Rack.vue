<template>
  <div
    class="input-grid"
  >
    <h4>Основные</h4>

    <div
      class="form-2"
      style="width: 100%; margin-top: 0"
    >
      <div class="w-100-r-label">
        <div class="labels">
          <label class="label-1" for="input">Срок тарифа С</label>
          <label class="label-2" for="input">Начало действия</label>
        </div>

        <div class="w-100-r">
          <el-date-picker
            class="calendar"
            v-model="nowDate"
            type="date"
            placeholder="Выберите дату"
            format="dd/MM/yyyy"
          />

          <el-time-select
            class="time"
            v-model="nowTime"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            placeholder="--:--"
          />
        </div>
      </div>

      <div class="w-100-r-label">
        <div class="labels">
          <label class="label-1" for="input">Срок тарифа ДО</label>
          <label class="label-2" for="input">Конец действия</label>
        </div>

        <div class="w-100-r">
          <el-date-picker
            class="calendar"
            v-model="nowDate"
            type="date"
            placeholder="Выберите дату"
            format="dd/MM/yyyy"
          />

          <el-time-select
            class="time"
            v-model="nowTime"
            :picker-options="{
              start: '00:00',
              step: '00:01',
              end: '23:59'
            }"
            placeholder="--:--"
          />
        </div>
      </div>
    </div>

    <div
      v-if="currentTariff.type !== 'main'"
      class="form-2"
      style="width: 100%; margin-top: 0"
    >

      <div class="w-100">
        <label for="input">Тип подсчёта скидки</label>
        <el-select
          v-model="currentTariff.discount.discountType"
          placeholder="Выберите тип скидки"
        >
          <el-option
            v-for="(discType, idx) in discountTypes"
            :key="idx"
            :value="discType.value"
            :label="discType.label"
          />
        </el-select>
      </div>

      <div
        class="w-100"
        v-if="currentTariff.discount.discountType === 'UZS'"
      >
        <label for="input">Сумма скидки</label>
        <money
          class="money-input"
          v-model="currentTariff.discount.discountAmount"
          v-bind="money"
        />
      </div>

      <div
        class="w-100"
        v-if="currentTariff.discount.discountType === 'percent'"
      >
        <label for="input">Процент скидки</label>
        <money
          class="money-input"
          v-model="currentTariff.discount.discountAmount"
          v-bind="percent"
        />
      </div>

      <div
        class="w-100"
        v-if="currentTariff.discount.discountType === 'individual'"
      >
        <label for="input">Сумма скидки</label>
        <el-input
          v-model="disabled"
          disabled
          placeholder="Введите сумму скидки"
        />
      </div>
    </div>

    <div class="divider-collapse"/>
    <h4>Дополнительно</h4>

    <div
      class="form-2"
      style="width: 100%"
    >
      <el-checkbox
        label="НДС для резидентов включен в стоимость"
      >
      </el-checkbox>

      <el-checkbox label="НДС для иностранцев включен в стоимость">
      </el-checkbox>

      <el-checkbox label="Тур.сбор для резидентов включен в стоимость">
      </el-checkbox>

      <el-checkbox label="Тур.сбор для иностранцев включен в стоимость">
      </el-checkbox>
    </div>

    <div
      v-if="currentTariff.type === 'main' || currentTariff.discount.discountType === 'individual'"
    >
      <div class="divider-collapse"/>
      <h4>Цены</h4>
      <div class="divider-collapse"/>

      <el-collapse
        accordion
        v-for="(stock, idx) in stockForInputs"
        :key="idx"
        v-model="activeName"
      >
        <el-collapse-item
          :title="catName(stock.category)"
          :name="idx"
          >

          <div class="form-4" style="width: 100%">
            
            <div class="w-100">
              <label for="input" style="opacity: 0">Empty</label>
              <h4 class="cat-name">Общие / Максимальные цены</h4>
            </div>

            <div class="w-100">
              <label for="input">Резидентам</label>
              <money
                @blur="rackResidents"
                class="money-input"
                v-model="cost.residentsMax"
                v-bind="money"
              />
            </div>

            <div class="w-100">
              <label for="input">Иностранцам</label>
              <money
                @change="rackForeigners"
                class="money-input"
                v-model="cost.foreignersMax"
                v-bind="money"
              />
            </div>

            <div class="w-100">
              <label for="input">Комбинированный случай</label>
              <money
                @change="rackCombined"
                class="money-input"
                v-model="cost.combinedMax"
                v-bind="money"
              />
            </div>
          </div>

          <div
            v-for="(row, idx) in stock.settlement"
            :key="idx"
          >

            <div
              class="form-4"
              style="width: 100%"
            >

              <div class="w-100">
                <h4 class="cat-name">{{settlementType(idx+1)}}</h4>
              </div>

              <div class="w-100">
                <money
                  class="money-input"
                  v-bind="money"
                  v-model="row.residents"
                />
              </div>

              <div class="w-100">
                <money
                  class="money-input"
                  v-bind="money"
                  v-model="row.foreigners"
                />
              </div>

              <div class="w-100">
                <money
                  class="money-input"
                  v-bind="money"
                  v-model="row.foreigners"
                />
              </div>
            </div>
          </div>
          
          <div
              class="form-4"
              style="width: 100%"
              v-if="stock.settlement[idx].additionalBed.amount > 0"
            >

              <div class="w-100">
                <h4 class="cat-name" style="color: #7710C9">Дополнительная койка</h4>
              </div>

              <div class="w-100">
                <money
                  class="money-input"
                  v-bind="money"
                  v-model="stock.settlement[idx].additionalBed.residents"
                />
              </div>

              <div class="w-100">
                <money
                  class="money-input"
                  v-bind="money"
                  v-model="stock.settlement[idx].additionalBed.foreigners"
                />
              </div>

              <div class="w-100">
                <money
                  class="money-input"
                  v-bind="money"
                  v-model="stock.settlement[idx].additionalBed.combined"
                />
              </div>
            </div>

        </el-collapse-item>
        <div class="divider-collapse"/>
      </el-collapse>
    </div>
    

    <div class="input-grid-btns">
      <router-link
        class="sec-btn"
        tag="button"
        :to="{ name: 'Tariffs'}"
      >
        Cancel
      </router-link>

      <button
        class="prim-btn"
        @click="consoleStock(submit)"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rack',

  data:() => ({
    money: {
      decimal: '',
      thousands: ' ',
      prefix: '',
      suffix: ' UZS',
      precision: 0,
      masked: true
    } 
  }),

  computed: {
    
  },

  methods: {

  }
}
</script>

<style>

</style>