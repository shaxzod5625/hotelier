<template>
  <div class="con-page">

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/tariffs'}" class="breadcrump">Тарифы и цены</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">{{this.$route.params.id}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar">
      <TabBar
        :tabs="['Со стойки', 'Туристические фирмы', 'Компании-партнеры', 'Агенты',]"
        :selected="selected"
        @selected="setSelected"
      >
      </TabBar>
    </div>

    <div
      v-if="selected === 'Со стойки'"
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
<!-- //////////////////////////////////////////////////////////// -->





<!-- /////////////////// Tour companies ///////////////////////// -->
    <div
      v-if="selected === 'asd фирмы'"
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

    <TourCompanies
      v-if="selected === 'Туристические фирмы'"

      :tourCompanyTariffs="tourCompanyTariffs"
    />
<!-- /////////////////////////////////////////////////////// -->



<!-- //////////////// Company partners ///////////////////// -->
    <div
      v-if="selected === 'Компании-партнеры'"
      class="input-grid"
    >
      <div
        v-for="(partnerCompaniesTariff, idx) in partnerCompaniesTariffs"
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
              v-model="partnerCompaniesTariff.chosenPartners"
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
              v-model="partnerCompaniesTariff.discountType"
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
            v-if="partnerCompaniesTariff.discountType === 'UZS'"
          >
            <label for="input">Сумма скидки</label>
            <money
              class="money-input"
              v-model="partnerCompaniesTariff.discountAmount"
              v-bind="money"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerCompaniesTariff.discountType === 'percent'"
          >
            <label for="input">Процент скидки</label>
            <money
              class="money-input"
              v-model="partnerCompaniesTariff.discountAmount"
              v-bind="percent"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerCompaniesTariff.discountType === 'individual'"
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
            v-model="partnerCompaniesTariff.residentsVAT"
          />

          <el-checkbox
            label="НДС для иностранцев включен в стоимость"
            v-model="partnerCompaniesTariff.foreignersVAT"
          />

          <el-checkbox
            label="Тур.сбор для резидентов включен в стоимость"
            v-model="partnerCompaniesTariff.residentsTourTax"
          />

          <el-checkbox
            label="Тур.сбор для иностранцев включен в стоимость"
            v-model="partnerCompaniesTariff.foreignersTourTax"
          />
        </div>

        <div
          v-if="partnerCompaniesTariff.discountType === 'individual'"
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
            @click="removePartnerCompanies(idx)"
            v-show="idx || ( !idx && partnerCompaniesTariffs.length > 1)"
          >
            <img src="@/assets/icons/Minus-sm.svg" alt="">
            Удалить
          </button>

          <button
            class="ghost-btn"
            @click="addPartnerCompanies(idx)"
            v-show="idx == partnerCompaniesTariffs.length-1"
          >
            <img src="@/assets/icons/Add-sm.svg" alt="">
            Добавить
          </button>
        </div>

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
        >
          Save
        </button>
      </div>
    </div>
<!-- ///////////////////////////////////////////////////// -->


<!-- ////////////////////// Agents /////////////////////// -->
    <div
      v-if="selected === 'Агенты'"
      class="input-grid"
    >
      <div
        v-for="(partnerAgentsTariff, idx) in partnerAgentsTariffs"
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
              v-model="partnerAgentsTariff.chosenPartners"
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
              v-model="partnerAgentsTariff.discountType"
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
            v-if="partnerAgentsTariff.discountType === 'UZS'"
          >
            <label for="input">Сумма скидки</label>
            <money
              class="money-input"
              v-model="partnerAgentsTariff.discountAmount"
              v-bind="money"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerAgentsTariff.discountType === 'percent'"
          >
            <label for="input">Процент скидки</label>
            <money
              class="money-input"
              v-model="partnerAgentsTariff.discountAmount"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerAgentsTariff.discountType === 'individual'"
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
            v-model="partnerAgentsTariff.residentsVAT"
          />

          <el-checkbox
            label="НДС для иностранцев включен в стоимость"
            v-model="partnerAgentsTariff.foreignersVAT"
          />

          <el-checkbox
            label="Тур.сбор для резидентов включен в стоимость"
            v-model="partnerAgentsTariff.residentsTourTax"
          />

          <el-checkbox
            label="Тур.сбор для иностранцев включен в стоимость"
            v-model="partnerAgentsTariff.foreignersTourTax"
          />
        </div>

        <div
          v-if="partnerAgentsTariff.discountType === 'individual'"
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
            @click="removeAgents(idx)"
            v-show="idx || ( !idx && partnerAgentsTariffs.length > 1)"
          >
            <img src="@/assets/icons/Minus-sm.svg" alt="">
            Удалить
          </button>

          <button
            class="ghost-btn"
            @click="addAgents(idx)"
            v-show="idx == partnerAgentsTariffs.length-1"
          >
            <img src="@/assets/icons/Add-sm.svg" alt="">
            Добавить
          </button>
        </div>

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
        >
          Save
        </button>
      </div>
    </div>

    <h4>{{stockForInputs}}</h4>

  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import Tab from '@/components/Tab.vue'
import TourCompanies from './tariffSections/TourComapnies.vue'

export default {
  name: 'EditingTariff',

  components: {
    TabBar, Tab, TourCompanies
  },

  data:() => ({
    disabled: '',
    type: 'main',
    activeName: 0,
    selected: 'Со стойки',
    nowDate: '',
    nowTime: '',
    chosenPartners: [],

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
    },

    tourCompanyTariffs: [
      {
        chosenPartners: [], discountType: 'percent', discountAmount: '', residentsTourTax: true, foreignersTourTax: true, residentsVAT: false, foreignersVAT: false,
        cost: {
          residentsMax: '', foreignersMax: '', combinedMax: '',
          residents1: '', foreigners1: '', combined1: '',
          residents2: '', foreigners2: '', combined2: '',
          residents3: '', foreigners3: '', combined3: '',
          residents4: '', foreigners4: '', combined4: '',
          residents5: '', foreigners5: '', combined5: '',
          residents6: '', foreigners6: '', combined6: '',
          residents7: '', foreigners7: '', combined7: '',
          residents8: '', foreigners8: '', combined8: '',
          residents9: '', foreigners9: '', combined9: '',
          residents10: '', foreigners10: '', combined10: '',
          residentsAddtional: '', foreignersAddtional: '', combinedAddtional: '',
        },
      }
    ],

    partnerCompaniesTariffs: [
      {
        chosenPartners: [], discountType: 'percent', discountAmount: '', residentsTourTax: true, foreignersTourTax: true, residentsVAT: false, foreignersVAT: false,
        cost: {
          residentsMax: '', foreignersMax: '', combinedMax: '',
          residents1: '', foreigners1: '', combined1: '',
          residents2: '', foreigners2: '', combined2: '',
          residents3: '', foreigners3: '', combined3: '',
          residents4: '', foreigners4: '', combined4: '',
          residents5: '', foreigners5: '', combined5: '',
          residents6: '', foreigners6: '', combined6: '',
          residents7: '', foreigners7: '', combined7: '',
          residents8: '', foreigners8: '', combined8: '',
          residents9: '', foreigners9: '', combined9: '',
          residents10: '', foreigners10: '', combined10: '',
          residentsAddtional: '', foreignersAddtional: '', combinedAddtional: '',
        },
      }
    ],

    partnerAgentsTariffs: [
      {
        chosenPartners: [], discountType: 'percent', discountAmount: '', residentsTourTax: true, foreignersTourTax: true, residentsVAT: false, foreignersVAT: false,
        cost: {
          residentsMax: '', foreignersMax: '', combinedMax: '',
          residents1: '', foreigners1: '', combined1: '',
          residents2: '', foreigners2: '', combined2: '',
          residents3: '', foreigners3: '', combined3: '',
          residents4: '', foreigners4: '', combined4: '',
          residents5: '', foreigners5: '', combined5: '',
          residents6: '', foreigners6: '', combined6: '',
          residents7: '', foreigners7: '', combined7: '',
          residents8: '', foreigners8: '', combined8: '',
          residents9: '', foreigners9: '', combined9: '',
          residents10: '', foreigners10: '', combined10: '',
          residentsAddtional: '', foreignersAddtional: '', combinedAddtional: '',
        },
      }
    ],

    cost: [{
      foreigners: '',
      residents: '',
      combined: '',
      foreignersMax: '',
      residentsMax: '',
      combinedMax: '',
      }],

    discountTypes: [
      {label: 'В процентах', value: 'percent'},
      {label: 'В сумах', value: 'UZS'},
      {label: 'Индивидуальные скидки', value: 'individual'}
    ],

    tourCompanies: [
      {name: 'Dolores Travel Services'},
      {name: 'Advantour'},
      {name: 'Olympic Tours'},
      {name: 'Novotuors'},
      {name: 'BCD Travel'},
      {name: 'Travel Ornament'},
      {name: 'HUMO Tours'}
    ]
  }),

  computed: {
    currentTariff() {
      return this.$store.state.activeTariffs.find(trf => trf.name == this.$route.params.id)
    },

    roomCategories() {
      return this.$store.state.roomFund
    },

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
            type: '',
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
    settlementType(indexNum) {
      if(indexNum === 1) {return 'Одноместный'}
      else if(indexNum === 2) {return 'Двухместный'}
      else if(indexNum === 3) {return 'Трёхместный'}
      else if(indexNum === 4) {return 'Четырёхместный'}
      else if(indexNum === 5) {return 'Пятиместный'}
      else if(indexNum === 6) {return 'Шестиместный'}
      else if(indexNum === 7) {return 'Семиместный'}
      else if(indexNum === 8) {return 'Восьмиместный'}
      else if(indexNum === 9) {return 'Девятиместный'}
      else if(indexNum === 10) {return 'Десятиместный'}
    },

    catName(catValue) {
      if(catValue === 'apartment') {return 'Апартаменты'}
      else if(catValue === 'bungalow') {return 'Бунгало'}
      else if(catValue === 'deluxe') {return 'Делюкс'}
      else if(catValue === 'honeymoonRoom') {return 'Для молодоженов'}
      else if(catValue === 'suite') {return 'Люкс'}
      else if(catValue === 'duplex') {return 'Дюплекс'}
      else if(catValue === 'cabana') {return 'Коттедж'}
      else if(catValue === 'juniorSuite') {return 'Полулюкс'}
      else if(catValue === 'residence') {return 'Резиденция'}
      else if(catValue === 'familyRoom') {return 'Семейная комната'}
      else if(catValue === 'standart') {return 'Стандарт'}
      else if(catValue === 'studio') {return 'Студия'}
      else if(catValue === 'chalet') {return 'Шале'}
      else if(catValue === 'economyClass') {return 'Эконом-класс'}
    },

    rackResidents(event) {
      console.log(event);
    },

    rackForeigners(event) {
      console.log(event);
    },

    rackCombined(event) {
      console.log(event);
    },

    setSelected(tab) {
      this.selected = tab;
    },

    maxBeds(currentCat) {
      let rooms = this.$store.state.roomFund.find(cat => cat.catID == currentCat).rooms

      let bedsMaxAmount = rooms.map(beds => beds.mainBeds)
      
      return bedsMaxAmount
    },

    maxAdditionalBeds(currentCat) {
      let rooms = this.$store.state.roomFund.find(cat => cat.catID == currentCat).rooms

      let bedsMaxAmount = rooms.map(beds => beds.additionalBeds)
      
      return bedsMaxAmount
    },

    addPartners () {
      this.tourCompanyTariffs.push({
        chosenPartners: [], discountType: 'percent', discountAmount: '', residentsTourTax: true, foreignersTourTax: true, residentsVAT: false, foreignersVAT: false,
        cost: {
          residentsMax: '', foreignersMax: '', combinedMax: '',
          residents1: '', foreigners1: '', combined1: '',
          residents2: '', foreigners2: '', combined2: '',
          residents3: '', foreigners3: '', combined3: '',
          residents4: '', foreigners4: '', combined4: '',
          residents5: '', foreigners5: '', combined5: '',
          residents6: '', foreigners6: '', combined6: '',
          residents7: '', foreigners7: '', combined7: '',
          residents8: '', foreigners8: '', combined8: '',
          residents9: '', foreigners9: '', combined9: '',
          residents10: '', foreigners10: '', combined10: '',
          residentsAddtional: '', foreignersAddtional: '', combinedAddtional: '',
        }
      })
    },

    addPartnerCompanies () {
      this.partnerCompaniesTariffs.push({
        chosenPartners: [], discountType: 'percent', discountAmount: '', residentsTourTax: true, foreignersTourTax: true, residentsVAT: false, foreignersVAT: false,
        cost: {
          residentsMax: '', foreignersMax: '', combinedMax: '',
          residents1: '', foreigners1: '', combined1: '',
          residents2: '', foreigners2: '', combined2: '',
          residents3: '', foreigners3: '', combined3: '',
          residents4: '', foreigners4: '', combined4: '',
          residents5: '', foreigners5: '', combined5: '',
          residents6: '', foreigners6: '', combined6: '',
          residents7: '', foreigners7: '', combined7: '',
          residents8: '', foreigners8: '', combined8: '',
          residents9: '', foreigners9: '', combined9: '',
          residents10: '', foreigners10: '', combined10: '',
          residentsAddtional: '', foreignersAddtional: '', combinedAddtional: '',
        }
      })
    },

    addAgents () {
      this.partnerAgentsTariffs.push({
        chosenPartners: [], discountType: 'percent', discountAmount: '', residentsTourTax: true, foreignersTourTax: true, residentsVAT: false, foreignersVAT: false,
        cost: {
          residentsMax: '', foreignersMax: '', combinedMax: '',
          residents1: '', foreigners1: '', combined1: '',
          residents2: '', foreigners2: '', combined2: '',
          residents3: '', foreigners3: '', combined3: '',
          residents4: '', foreigners4: '', combined4: '',
          residents5: '', foreigners5: '', combined5: '',
          residents6: '', foreigners6: '', combined6: '',
          residents7: '', foreigners7: '', combined7: '',
          residents8: '', foreigners8: '', combined8: '',
          residents9: '', foreigners9: '', combined9: '',
          residents10: '', foreigners10: '', combined10: '',
          residentsAddtional: '', foreignersAddtional: '', combinedAddtional: '',
        }
      })
    },

    removePartners (idx) {
      this.tourCompanyTariffs.splice(idx, 1)
    },

    removePartnerCompanies (idx) {
      this.partnerCompaniesTariffs.splice(idx, 1)
    },

    removeAgents (idx) {
      this.partnerAgentsTariffs.splice(idx, 1)
    },

    consoleStock(value) {
      console.log(value);
    }
  }
}
</script>

<style>

</style>