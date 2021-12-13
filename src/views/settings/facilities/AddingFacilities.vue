<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Услуги</h3>
      <div class="divider"/>

      <div class="form-1" style="justify-items: center">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Основные услуги</el-checkbox>

        <el-checkbox-group v-model="checkedServices" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="service in allServices" :label="service" :key="service">{{service}}</el-checkbox>
        </el-checkbox-group>
      </div>



<!-- ////////// Hidden computed ///////////// -->
      <h4 style="display: none">{{servicesList}}</h4>
      <h4 style="display: none">{{setAllServices}}</h4>
      <h4 style="display: none">{{allServicesList}}</h4>
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
          @click="addServices"
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
  name: 'AddingFacilities',

  data:() => ({
    checkAll: false,
    checkedServices: [],
    isIndeterminate: false,

    allServices: [],
    constAllServices: []
  }),

  computed: {
    servicesList() {
      const servs = JSON.parse(window.sessionStorage.servicesList).services
      const length = servs.length
      const sorted = []

      for(let i=0; i<length; i++) {
        sorted.push(servs[i].name)
      }

      this.allServices = sorted
    },

    allServicesList() {
      const servs = JSON.parse(window.sessionStorage.servicesList).services
      const length = servs.length
      const sorted = []

      for(let i=0; i<length; i++) {
        sorted.push(servs[i].name)
      }

      this.constAllServices = sorted
    },

    setAllServices() {
      const servs = JSON.parse(window.sessionStorage.servicesList).services.filter(serv => serv.availability === true)
      const length = servs.length
      const sorted = []

      for (let i=0; i<length; i++) {
        sorted.push(servs[i].name)
      }

      this.checkedServices = sorted
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeAddingFacilityModal')
    },

    handleCheckAllChange(val) {
        this.checkedServices = val ? this.constAllServices : []
        this.isIndeterminate = false;
      },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allServices.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allServices.length;
    },

    async addServices() {
      const array = []
      const allServs = JSON.parse(window.sessionStorage.servicesList).services
      const checked = this.checkedServices
      const length = checked.length

      for (let i=0; i<length; i++) {
        array.push(allServs.find(serv => serv.name === checked[i]))
      }

      try {
        await this.$store.dispatch('addServices', array)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeAddingFacilityModal')
      this.$message({
        message: 'Изменения в списке услуг сохранены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>