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
            @click="deletingTariffs(checkedTariffs())"
          >
            <img src="@/assets/icons/Delete-sm.svg" alt="">
            <span>Удалить</span>
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
        </tr>
        <tr
          class="content-list"
          v-for="(tariff, idx) in searchActiveTariff"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
                <td
                  class="category-name-2"
                  @click="unarchivingTariff(tariff)"
                >
                  {{tariff.name}}
                </td>
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
              <td
                class="list-last-el"
              >
                {{tariff.startTerm}} - {{tariff.stopTerm}}

                <div class="list-icon-box">
                  <img
                    @click="duplicatingTariff(tariff)"
                    class="icon-box"
                    src="@/assets/icons/Duplicating.svg" alt=""
                  >

                  <img
                    class="icon-box"
                    src="@/assets/icons/Unarchiving.svg" alt=""
                    @click="unarchivingTariff(tariff)"
                  >

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
  name: 'ArchivedTariffs',

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
    deletingTariffs(checkedTariffs) {
      this.$emit('deletingTariffs', checkedTariffs)
    },

    printOutTariff(checkedTariffs) {
      this.$emit('printOutTariff', checkedTariffs)
    },

    checkedTariffs(){
      return this.searchActiveTariff.filter(post => {
        return post.checked === true
      })
    },

    duplicatingTariff(tariff) {
      this.$emit('duplicatingTariff', tariff)
    },

    unarchivingTariff(tariff) {
      this.$emit('unarchivingTariff', tariff)
    }
  }
}
</script>

<style>

</style>