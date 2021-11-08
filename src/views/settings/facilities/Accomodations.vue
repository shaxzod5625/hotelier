<template>
  <div class="con-page">
    <div class="filter-block" style="height: 54px">
      <div class="search-bar" style="height: 48px">
        <input type="text" placeholder="Введите название удобства" v-model="search">
      </div>
      <div class="button-bar" style="height: 48px">
        <div class="btns">
          <button
            class="sec-btn"
            @click="createAccomodation"
          >
            <img src="@/assets/icons/Add-sm.svg" alt="">
            <span>Создать</span>
          </button>

          <button class="sec-btn">
            <img src="@/assets/icons/Print-sm.svg" alt="">
            <span>Распечатать</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="searchService != ''"
      class="list-card"
    >
      <table class="list-table">
        <tr>
          <th>Удобство</th>
          <th>Стоимость</th>
          <th>Единица измерения</th>
          <th>Доступность</th>
        </tr>
        <tr
          class="content-list"
          v-for="(accomodation, idx) in searchAccomodation"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
                <td
                  class="category-name-2"
                  @click="editAccomodation(accomodation)"
                >
                  {{accomodation.name}}
                </td>
              <td>
                <span
                  v-if="accomodation.cost != 'free'"
                >
                {{(Number(accomodation.cost)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')}} UZS
                </span>

                <span
                  v-else
                >
                  Бесплатно
                </span>
              </td>
              <td>{{accomodation.measurementUnit}}</td>
              <td class="list-last-el">
                <el-switch v-model="accomodation.availability">
                </el-switch>
                <div class="list-icon-box">
                  <img
                    @click="editAccomodation(accomodation)"
                    class="icon-box"
                    src="@/assets/icons/Edit.svg" alt=""
                  >
                  <img
                    @click="deleteAccomodation(accomodation)"
                    class="icon-box"
                    src="@/assets/icons/Delete.svg" alt=""
                  >
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
      <h3>Результатов по поиску <span>"{{search}}"</span> среди удобств не найдено</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accomodations',

  data:() => ({
    search: '',
  }),

  computed: {
    searchAccomodation(){
      return this.$store.state.facilitiesList.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  methods: {
    createAccomodation() {
      this.$emit('createAccomodation')
    },

    editAccomodation(accomodation) {
      this.$emit('editAccomodation', accomodation)
    },

    deleteAccomodation(accomodation) {
      this.$emit('deleteAccomodation', accomodation)
    }
  }
}
</script>

<style>

</style>