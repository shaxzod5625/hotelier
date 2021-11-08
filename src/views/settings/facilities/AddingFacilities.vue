<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Услуги</h3>
      <div class="divider"/>

      <div class="form-1" style="justify-items: center">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Основные услуги</el-checkbox>
      </div>

      <div class="form-4">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
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
const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Urumchi', 'Shanghaib', 'Beijingas', 'Guangzhouqw', 'Shenzhenad', 'Urumchwi',];

export default {
  name: 'AddingFacilities',

  data:() => ({
    checkAll: false,
    checkedCities: ['Shanghai', 'Beijing'],
    cities: cityOptions,
    isIndeterminate: true
  }),

  methods: {
    closeModal() {
      this.$emit('closeAddingFacilityModal')
    },

    handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style>

</style>