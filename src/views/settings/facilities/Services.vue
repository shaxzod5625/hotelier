<template>
  <div class="con-page">
    <div class="filter-block" style="height: 54px">
      <div class="search-bar" style="height: 48px">
        <input type="text" placeholder="Введите название услуги" v-model="search">
      </div>
      <div class="button-bar" style="height: 48px">
        <div class="btns">
          <button
            class="sec-btn"
            @click="createFacility"
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
          <th>Услуга</th>
          <th>Стоимость</th>
          <th>Единица измерения</th>
          <th>Доступность</th>
        </tr>
        <tr
          class="content-list"
          v-for="(service, idx) in searchService"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
                <td
                  class="category-name-2"
                  @click="editService(service)"
                >
                  {{service.name}}
                </td>
              <td>
                <span
                  v-if="service.cost != 'free'"
                >
                {{(Number(service.cost)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')}} UZS
                </span>

                <span
                  v-else
                >
                  Бесплатно
                </span>
              </td>
              <td>{{service.measurementUnit}}</td>
              <td class="list-last-el">
                <el-switch v-model="service.availability">
                </el-switch>
                <div class="list-icon-box">
                  <img
                    @click="editService(service)"
                    class="icon-box"
                    src="@/assets/icons/Edit.svg" alt=""
                  >
                  <img
                    @click="deleteService(service)"
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
      <h3>Результатов по поиску <span>"{{search}}"</span> среди услуг не найдено</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',

  data:() => ({
    search: '',
  }),

  computed: {
    searchService(){
      return this.$store.state.servicesList.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  methods: {
    createFacility() {
      this.$emit('createFacility')
    },

    editService(service) {
      this.$emit('editFacility', service)
    },

    deleteService(service) {
      this.$emit('deleteFacility', service)
    }
  }
}
</script>

<style>

</style>