<template>
  <div
    class="input-grid"
  >
    <div
      v-for="(tourCompanyTariff, idx) in tourCompanyTariffs"
      :key="idx"
    >
      <h4>Основные</h4>

      <div
        class="form-3"
        style="width: 100%; margin-top: 0"
      >

        <div class="w-100">
          <label for="input">Партнёры</label>
          <el-select
            v-model="tourCompanyTariff.chosenPartners"
            placeholder="Выберите партнёров"
            multiple
            collapse-tags
          >
            <el-option
              v-for="(partner, idx) in tourCompanies"
              :key="idx"
              :value="partner.name"
              :label="partner.name"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Тип подсчёта скидки</label>
          <el-select
            v-model="tourCompanyTariff.discountType"
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
          v-if="tourCompanyTariff.discountType === 'UZS'"
        >
          <label for="input">Сумма скидки</label>
          <money
            class="money-input"
            v-model="tourCompanyTariff.discountAmount"
            v-bind="money"
          />
        </div>

        <div
          class="w-100"
          v-if="tourCompanyTariff.discountType === 'percent'"
        >
          <label for="input">Процент скидки</label>
          <money
            class="money-input"
            v-model="tourCompanyTariff.discountAmount"
            v-bind="percent"
          />
        </div>

        <div
          class="w-100"
          v-if="tourCompanyTariff.discountType === 'individual'"
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
          v-model="tourCompanyTariff.residentsVAT"
        />

        <el-checkbox
          label="НДС для иностранцев включен в стоимость"
          v-model="tourCompanyTariff.foreignersVAT"
        />

        <el-checkbox
          label="Тур.сбор для резидентов включен в стоимость"
          v-model="tourCompanyTariff.residentsTourTax"
        />

        <el-checkbox
          label="Тур.сбор для иностранцев включен в стоимость"
          v-model="tourCompanyTariff.foreignersTourTax"
        />
      </div>

      <div
        v-if="tourCompanyTariff.discountType === 'individual'"
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
                  @input="rackResidents"
                  class="money-input"
                  v-model="cost.residentsMax"
                  v-bind="money"
                />
              </div>

              <div class="w-100">
                <label for="input">Иностранцам</label>
                <money
                  @input="rackForeigners"
                  class="money-input"
                  v-model="cost.foreignersMax"
                  v-bind="money"
                />
              </div>

              <div class="w-100">
                <label for="input">Комбинированный случай</label>
                <money
                  @input="rackCombined"
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
        <button
          class="ghost-btn-danger"
          @click="removePartners(idx)"
          v-show="idx || ( !idx && tourCompanyTariffs.length > 1)"
        >
          <img src="@/assets/icons/Minus-sm.svg" alt="">
          Удалить
        </button>

        <button
          class="ghost-btn"
          @click="addPartners(idx)"
          v-show="idx == tourCompanyTariffs.length-1"
        >
          <img src="@/assets/icons/Add-sm.svg" alt="">
          Добавить
        </button>
      </div>

    </div>


<!-- /////////// Hidden computed ////////////// -->
<h4 style="display: none">{{stockForInputs}}</h4>
<!-- ////////////////////////////////////////// -->


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
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TourCompanies',

  data:() => ({
    
  }),

  props: {
    tourCompanyTariffs: Array
  },

  computed: {
    stockForInputs() {
      const rooms = JSON.parse(window.sessionStorage.allRoomCats).categories
      const roomsLength = rooms.length
      const rawLooped = []

      for (let i=0; i<roomsLength; i++) {
        rawLooped.push({
          category: rooms[i].category,
          main: Math.max(...rooms[i].rooms.map(room => JSON.parse(room).mainBeds)),
          additional: Math.max(...rooms[i].rooms.map(room => JSON.parse(room).additionalBeds))
        })
      }

      const newLength = rawLooped.length
      const looped = []

      for (let idx=0; idx<newLength; idx++) {
        looped.push({
          category: rawLooped[idx].category,
          settlement: new Array(rawLooped[idx].main).fill({
            type: idx+1,
            residents: '',
            foreigners: '',
            combined: '',
            additionalBed: {
              amount: rawLooped[idx].additional,
              residents: '',
              foreigners: '',
              combined: ''
            }
          }) 
        })
      }

      return looped
    }
  },

  methods: {

  }
}
</script>

<style>

</style>