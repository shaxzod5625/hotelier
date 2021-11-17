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
          <currency-input
            v-model="currentTariff.discount.discountAmount"
            :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки'}"
          />
        </div>

        <div
          class="w-100"
          v-if="currentTariff.discount.discountType === 'percent'"
        >
          <label for="input">Процент скидки</label>
          <percent-input
            :value="currentTariff.discount.discountAmount"
            :options="{ placeholder: 'Введите процент скидки' }"
          />
        </div>

        <div
          class="w-100"
          v-if="currentTariff.discount.discountType === 'individual'"
        >
          <label for="input">Сумма скидки</label>
          <currency-input
            :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки', disabled: 'disabled'}"
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
          v-model="activeName"
          accordion
          v-for="(ctgry, idx) in roomCategories"
          :key="idx"
        >
          <el-collapse-item
            :title="ctgry.catName"
            :name="idx"
            >

            <div class="form-4" style="width: 100%">
              
              <div class="w-100">
                <label for="input" style="opacity: 0">Empty</label>
                <h4 class="cat-name">Общие / Максимальные цены</h4>
              </div>

              <div class="w-100">
                <label for="input">Резидентам</label>
                <currency-input
                  v-model="cost.residentsMax"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <label for="input">Иностранцам</label>
                <currency-input
                  v-model="cost.foreignersMax"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <label for="input">Комбинированный случай</label>
                <currency-input
                  v-model="cost.combinedMax"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>
            </div>


            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 0"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Одноместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 1"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Двухместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 2"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Трёхместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 3"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Четырёхместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 4"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Пятиместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 5"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Шестиместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 6"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Семиместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 7"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Восьмиместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 8"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Девятиместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxBeds(ctgry.catID)) > 9"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Десятиместный</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

            </div>

            <div
              v-if="Math.max(...maxAdditionalBeds(ctgry.catID)) > 0"
              class="form-4"
              style="width: 100%"
            >
              <div class="w-100">
                <h4 class="cat-name">Дополнительная койка</h4>
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.residents"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.foreigners"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                />
              </div>

              <div class="w-100">
                <currency-input
                  v-model="cost.combined"
                  :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
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
        >
          Save
        </button>
      </div>
    </div>

    <div
      v-if="selected === 'Туристические фирмы'"
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
            <currency-input
              v-model="tourCompanyTariff.discountAmount"
              :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки'}"
            />
          </div>

          <div
            class="w-100"
            v-if="tourCompanyTariff.discountType === 'percent'"
          >
            <label for="input">Процент скидки</label>
            <percent-input
              :value="tourCompanyTariff.discountAmount"
              :options="{ placeholder: 'Введите процент скидки' }"
            />
          </div>

          <div
            class="w-100"
            v-if="tourCompanyTariff.discountType === 'individual'"
          >
            <label for="input">Сумма скидки</label>
            <currency-input
              :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки', disabled: 'disabled'}"
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
            v-model="activeName"
            accordion
            v-for="(ctgry, idx) in roomCategories"
            :key="idx"
          >
            <el-collapse-item
              :title="ctgry.catName"
              :name="idx"
              >

              <div class="form-4" style="width: 100%">
                
                <div class="w-100">
                  <label for="input" style="opacity: 0">Empty</label>
                  <h4 class="cat-name">Общие / Максимальные цены</h4>
                </div>

                <div class="w-100">
                  <label for="input">Резидентам</label>
                  <currency-input
                    v-model="tourCompanyTariff.cost.residentsMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <label for="input">Иностранцам</label>
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreignersMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <label for="input">Комбинированный случай</label>
                  <currency-input
                    v-model="tourCompanyTariff.cost.combinedMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>
              </div>


              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 0"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Одноместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 1"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Двухместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 2"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Трёхместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 3"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Четырёхместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 4"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Пятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 5"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Шестиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 6"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Семиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 7"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Восьмиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 8"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Девятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 9"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Десятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residents10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreigners10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combined10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxAdditionalBeds(ctgry.catID)) > 0"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Дополнительная койка</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.residentsAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.foreignersAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="tourCompanyTariff.cost.combinedAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
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
            <currency-input
              v-model="partnerCompaniesTariff.discountAmount"
              :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки'}"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerCompaniesTariff.discountType === 'percent'"
          >
            <label for="input">Процент скидки</label>
            <percent-input
              :value="partnerCompaniesTariff.discountAmount"
              :options="{ placeholder: 'Введите процент скидки' }"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerCompaniesTariff.discountType === 'individual'"
          >
            <label for="input">Сумма скидки</label>
            <currency-input
              :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки', disabled: 'disabled'}"
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
            v-model="activeName"
            accordion
            v-for="(ctgry, idx) in roomCategories"
            :key="idx"
          >
            <el-collapse-item
              :title="ctgry.catName"
              :name="idx"
              >

              <div class="form-4" style="width: 100%">
                
                <div class="w-100">
                  <label for="input" style="opacity: 0">Empty</label>
                  <h4 class="cat-name">Общие / Максимальные цены</h4>
                </div>

                <div class="w-100">
                  <label for="input">Резидентам</label>
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residentsMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <label for="input">Иностранцам</label>
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreignersMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <label for="input">Комбинированный случай</label>
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combinedMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>
              </div>


              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 0"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Одноместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 1"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Двухместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 2"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Трёхместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 3"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Четырёхместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 4"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Пятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 5"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Шестиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 6"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Семиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 7"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Восьмиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 8"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Девятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 9"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Десятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residents10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreigners10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combined10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxAdditionalBeds(ctgry.catID)) > 0"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Дополнительная койка</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.residentsAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.foreignersAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerCompaniesTariff.cost.combinedAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
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
            <currency-input
              v-model="partnerAgentsTariff.discountAmount"
              :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки'}"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerAgentsTariff.discountType === 'percent'"
          >
            <label for="input">Процент скидки</label>
            <percent-input
              :value="partnerAgentsTariff.discountAmount"
              :options="{ placeholder: 'Введите процент скидки' }"
            />
          </div>

          <div
            class="w-100"
            v-if="partnerAgentsTariff.discountType === 'individual'"
          >
            <label for="input">Сумма скидки</label>
            <currency-input
              :options="{ currency: 'UZS', placeholder: 'Введите сумму скидки', disabled: 'disabled'}"
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
            v-model="activeName"
            accordion
            v-for="(ctgry, idx) in roomCategories"
            :key="idx"
          >
            <el-collapse-item
              :title="ctgry.catName"
              :name="idx"
              >

              <div class="form-4" style="width: 100%">
                
                <div class="w-100">
                  <label for="input" style="opacity: 0">Empty</label>
                  <h4 class="cat-name">Общие / Максимальные цены</h4>
                </div>

                <div class="w-100">
                  <label for="input">Резидентам</label>
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residentsMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <label for="input">Иностранцам</label>
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreignersMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <label for="input">Комбинированный случай</label>
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combinedMax"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>
              </div>


              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 0"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Одноместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined1"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 1"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Двухместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined2"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 2"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Трёхместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined3"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 3"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Четырёхместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined4"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 4"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Пятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined5"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 5"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Шестиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined6"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 6"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Семиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined7"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 7"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Восьмиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined8"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 8"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Девятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined9"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxBeds(ctgry.catID)) > 9"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Десятиместный</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residents10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreigners10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combined10"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

              </div>

              <div
                v-if="Math.max(...maxAdditionalBeds(ctgry.catID)) > 0"
                class="form-4"
                style="width: 100%"
              >
                <div class="w-100">
                  <h4 class="cat-name">Дополнительная койка</h4>
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.residentsAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.foreignersAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
                  />
                </div>

                <div class="w-100">
                  <currency-input
                    v-model="partnerAgentsTariff.cost.combinedAdditional"
                    :options="{ currency: 'UZS', placeholder: 'Введите сумму' }"
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
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import Tab from '@/components/Tab.vue'
import CurrencyInput from '../../../components/CurrencyInput.vue'
import PercentInput from '../../../components/PercentInput.vue'

export default {
  name: 'EditingTariff',

  components: {
    TabBar, Tab, CurrencyInput, PercentInput
  },

  data:() => ({
    type: 'main',
    activeName: 0,
    selected: 'Со стойки',
    nowDate: '',
    nowTime: '',
    chosenPartners: [],

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
  },

  methods: {
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
  }
}
</script>

<style>

</style>