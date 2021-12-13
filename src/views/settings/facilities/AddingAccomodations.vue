<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Удобства</h3>
      <div class="divider"/>

      <div class="form-1" style="justify-items: center">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Основные услуги</el-checkbox>

        <el-checkbox-group v-model="checkedAccomodations" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="accomodation in allAccomodations" :label="accomodation" :key="accomodation">{{accomodation}}</el-checkbox>
        </el-checkbox-group>
      </div>

        

<!-- ////////// Hidden computed ///////////// -->
      <h4 style="display: none">{{accomodationsList}}</h4>
      <h4 style="display: none">{{setAllAccomodations}}</h4>
      <h4 style="display: none">{{allAccomodationsList}}</h4>
<!-- //////////////////////////////////////// -->

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="addAccomodations"
        >
          Добавить
        </button>
      </div>
    </div>

    <div
      class="modal-back"
      @click="closeModal"
    />
  </div>
</template>

<script>
export default {
  name: 'AddingAccomodations',

  data:() => ({
    checkAll: false,
    checkedAccomodations: [],
    isIndeterminate: false,

    allAccomodations: [],
    constAllAccomodations: []
  }),

  computed: {
    accomodationsList() {
      const accoms = JSON.parse(window.sessionStorage.facilitiesList).accomadations
      const length = accoms.length
      const sorted = []

      for(let i=0; i<length; i++) {
        sorted.push(accoms[i].name)
      }

      this.allAccomodations = sorted
    },

    allAccomodationsList() {
      const accoms = JSON.parse(window.sessionStorage.facilitiesList).accomadations
      const length = accoms.length
      const sorted = []

      for(let i=0; i<length; i++) {
        sorted.push(accoms[i].name)
      }

      this.constAllAccomodations = sorted
    },

    setAllAccomodations() {
      const accoms = JSON.parse(window.sessionStorage.facilitiesList).accomadations.filter(accom => accom.availability === true)
      const length = accoms.length
      const sorted = []

      for (let i=0; i<length; i++) {
        sorted.push(accoms[i].name)
      }

      this.checkedAccomodations = sorted
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeAddingAccomodationModal')
    },

    handleCheckAllChange(val) {
        this.checkedAccomodations = val ? this.constAllAccomodations : []
        this.isIndeterminate = false;
      },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allAccomodations.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allAccomodations.length;
    },

    async addAccomodations() {
      const array = []
      const allAccoms = JSON.parse(window.sessionStorage.facilitiesList).accomadations
      const checked = this.checkedAccomodations
      const length = checked.length

      for (let i=0; i<length; i++) {
        array.push(allAccoms.find(accom => accom.name === checked[i]))
      }

      try {
        await this.$store.dispatch('addAccomodations', array)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeAddingAccomodationModal')
      this.$message({
        message: 'Изменения в списке удобств сохранены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>