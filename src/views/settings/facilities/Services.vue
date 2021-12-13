<template>
  <div class="tab-conpage">
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
        v-if="this.services.length"
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
                    @click="editService(JSON.parse(service))"
                  >
                    {{JSON.parse(service).name}}
                  </td>
                <td>
                  <span
                    v-if="JSON.parse(service).cost !== '0 UZS'"
                  >
                  {{JSON.parse(service).cost}}
                  </span>

                  <span
                    v-else
                  >
                    Бесплатно
                  </span>
                </td>
                <td>{{setMeasurementLabel(JSON.parse(service).measurementUnit)}}</td>
                <td class="list-last-el">
                  <el-switch @change="switchServiceAvailability(JSON.parse(service).availability, JSON.parse(service).id)" v-model="JSON.parse(service).availability">
                  </el-switch>
                  <div class="list-icon-box">
                    <img
                      @click="editService(JSON.parse(service))"
                      class="icon-box"
                      src="@/assets/icons/Edit.svg" alt=""
                    >
                    <img
                      @click="deleteService(JSON.parse(service))"
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
        v-if="this.services.length && !this.searchService.length"
        class="no-reults"
      >
        <h3>Результатов по поиску <span>"{{search}}"</span> среди услуг не найдено</h3>
        <h3 class="advice">Вы можете <span class="new" @click="createFacility">создать</span> новую услуг, которая отсутствует в списке доступных услуг</h3>
      </div>

      <div
        v-if="!this.services.length"
        class="no-reults"
      >
        <h3>Услуги не найдены. Пожалуйста,
          <span class="new" @click="addingFacility">добавьте</span> или
          <span class="new" @click="createFacility">создайте</span>
          услуги</h3>
      </div>

<!-- //////////// Hidden computed //////////// -->
<!-- ///////////////////////////////////////// -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'Services',

  data:() => ({
    search: '',
    allServices: [],


  }),

  props: {
    services: Array
  },

  computed: {
    searchService(){
      return this.services.filter(post => {
        return JSON.parse(post).name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  methods: {
    setMeasurementLabel(unit) {
      if(unit === 'oneTime') {return 'Разовая стоимость'}
      else if(unit === 'perDay') {return 'За один день'}
      else if(unit === 'perUnit') {return 'За каждую вещь'}
      else if(unit === 'perSettlement') {return 'За все время проживания'}
      else if(unit === 'perPiece') {return 'За штуку'}
      else if(unit === 'perPortion') {return 'За порцию'}
    },

    async switchServiceAvailability(activity, id) {
      const facility = {
        id: id,
        availability: !activity
      }

      try {
        await this.$store.dispatch('switchServiceAvailability', facility)
      } catch {}

      this.$emit('refresh')
      this.$message({
        message: 'Доступность услуги изменена',
        type: 'success'
      })
    },

    addingFacility() {
      this.$emit('addingFacility')
    },

    createFacility() {
      this.$emit('createFacility')
    },

    editService(service) {
      this.$emit('editFacility', service)
    },

    deleteService(service) {
      this.$emit('deleteFacility', service)
    },

  }
}
</script>

<style>

</style>