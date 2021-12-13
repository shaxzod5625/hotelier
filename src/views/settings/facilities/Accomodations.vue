<template>
  <div class="tab-conpage">
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
        v-if="this.accomodations.length"
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
                    @click="editAccomodation(JSON.parse(accomodation))"
                  >
                    {{JSON.parse(accomodation).name}}
                  </td>
                <td>
                  <span
                    v-if="JSON.parse(accomodation).cost !== '0 UZS'"
                  >
                  {{JSON.parse(accomodation).cost}}
                  </span>

                  <span
                    v-else
                  >
                    Бесплатно
                  </span>
                </td>
                <td>{{setMeasurementLabel(JSON.parse(accomodation).measurementUnit)}}</td>
                <td class="list-last-el">
                  <el-switch @change="switchAvailability(JSON.parse(accomodation).availability, JSON.parse(accomodation).id)" v-model="JSON.parse(accomodation).availability">
                  </el-switch>
                  <div class="list-icon-box">
                    <img
                      @click="editAccomodation(JSON.parse(accomodation))"
                      class="icon-box"
                      src="@/assets/icons/Edit.svg" alt=""
                    >
                    <img
                      @click="deleteAccomodation(JSON.parse(accomodation))"
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
        v-if="this.accomodations.length && !this.searchAccomodation.length"
        class="no-reults"
      >
        <h3>Результатов по поиску <span>"{{search}}"</span> среди удобств не найдено</h3>
        <h3 class="advice">Вы можете <span class="new" @click="createAccomodation">создать</span> новое удобство, которое отсутствует в списке доступных удобств</h3>
      </div>

      <div
        v-if="!this.accomodations.length"
        class="no-reults"
      >
        <h3>Удобства не найдены. Пожалуйста,
          <span class="new" @click="addingAccomodation">добавьте</span> или
          <span class="new" @click="createAccomodation">создайте</span>
          удобства</h3>
      </div>

<!-- ////////// Hidden computed //////////// -->
<!-- /////////////////////////////////////// -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'Accomodations',

  data:() => ({
    search: '',
  }),

  props: {
    accomodations: Array
  },

  computed: {
    searchAccomodation(){
      return this.accomodations.filter(post => {
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

    async switchAvailability(activity, id) {
      const facility = {
        id: id,
        availability: !activity
      }

      try {
        await this.$store.dispatch('switchAvailability', facility)
      } catch {}

      this.$emit('refresh')
      this.$message({
        message: 'Доступность удобства изменена',
        type: 'success'
      })
    },

    addingAccomodation() {
      this.$emit('addingAccomodation')
    },

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