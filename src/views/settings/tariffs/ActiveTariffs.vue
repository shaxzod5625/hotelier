<template>
  <div class="tab-conpage">
    <div class="filter-block" style="height: 54px">
      <div class="search-bar" style="height: 48px">
        <input type="text" placeholder="Введите название тарифа" v-model="search">
      </div>
      <div class="button-bar" style="height: 48px">
        <div class="btns">
          <button
            class="sec-btn"
            @click="archiveTariff(checkedTariffs())"
          >
            <img src="@/assets/icons/Archive-sm.svg" alt="">
            <span>Архивировать</span>
          </button>

          <button
            class="sec-btn"
            @click="printOutTariff(checkedTariffs())"
          >
            <img src="@/assets/icons/Print-sm.svg" alt="">
            <span>Распечатать</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="searchActiveTariff != ''"
      class="list-card"
    >
      <table class="list-table">
        <tr>
          <th>Название тарифа</th>
          <th>Тип тарифа</th>
          <th>Скидка</th>
          <th>Срок тарифа</th>
          <th>Активность</th>
        </tr>
        <tr
          class="content-list"
          v-for="(tariff, idx) in searchActiveTariff"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
                <router-link
                  tag="td"
                  class="category-name-2"
                  :to="{name: 'Editing Tariff', params: {id: tariff.name}}"
                >
                  {{tariff.name}}
                </router-link>
              <td>
                <span
                  v-if="tariff.type === 'main'"
                >
                  Основной
                </span>

                <span
                  v-else
                >
                  Скидочный
                </span>
              </td>
              <td>
                <span
                  v-if="tariff.discount.availability === false"
                >
                  Нет
                </span>

                <span
                  v-else-if="tariff.discount.discountType === 'percent'"
                >
                  - {{tariff.discount.discountAmount + '%'}}
                </span>

                <span
                  v-else-if="tariff.discount.discountType === 'UZS'"
                >
                  - {{(Number(tariff.discount.discountAmount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')}} UZS
                </span>

                <span
                  v-else-if="tariff.discount.discountType === 'individual'"
                >
                  Индивидуальная скидка
                </span>
              </td>
              <td>{{tariff.startTerm}} - {{tariff.stopTerm}}</td>
              <td class="list-last-el">
                <h3
                  class="pending"
                  v-if="tariff.activity === 'pending'"
                >
                  В ожидании
                </h3>

                <h3
                  class="true"
                  v-else-if="tariff.activity === 'active'"
                >
                  Активный
                </h3>

                <h3
                  class="false"
                  v-else
                >
                  Не активен
                </h3>
                <div class="list-icon-box">
                  <img
                    @click="extendingTariffTerm(tariff)"
                    class="icon-box"
                    src="@/assets/icons/Prolongation.svg" alt=""
                  >

                  <router-link
                    :to="{name: 'Editing Tariff', params: {id: tariff.name}}"
                  >
                    <img
                      class="icon-box"
                      src="@/assets/icons/Edit.svg" alt=""
                    >
                  </router-link>

                  <el-checkbox
                    v-model="tariff.checked"
                  />
                </div>
              </td>
            </div>
          </div>
        </tr>
      </table>
    </div>

    <div
      v-else
      class="no-reults"
    >
      <h3>Результатов по поиску <span>"{{search}}"</span> среди услуг не найдено</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ActiveTariffs',

  components: {
  },

  data:() => ({
    search: '',
    checked: '',

  }),

  computed: {
    searchActiveTariff(){
      return this.$store.state.activeTariffs.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  methods: {
    archiveTariff(checkedTariffs) {
      this.$emit('archiveTariff', checkedTariffs)
    },

    printOutTariff(checkedTariffs) {
      this.$emit('printOutTariff', checkedTariffs)
    },

    checkedTariffs(){
      return this.searchActiveTariff.filter(post => {
        return post.checked === true
      })
    },

    extendingTariffTerm(tariff) {
      this.$emit('extendingTariffTerm', tariff)
    },
  }
}
</script>

<style>

</style>