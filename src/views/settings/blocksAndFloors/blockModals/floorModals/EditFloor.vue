<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Редактирование этажа</h3>
      <div class="divider"></div>

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Название этажа</label>
          <el-input
            v-model="floorName"
            placeholder="Введите название этажа"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Этажность</label>
          <el-input
            v-model="floorLevel"
            v-mask="'##'"
            placeholder="Введите номер этажа"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Категория номеров</label>
          <el-select v-model="roomCategory">
            <el-option
              v-for="(category, idx) in roomCategories"
              :key="idx"
              :label="category.label"
              :value="category.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="divider" style="margin-top: 24px"/>

      <div class="checkbox-group-div">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"><h3 class="checkbox-label">Номера этажа</h3></el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="input-grid-btns">
        <button
          @click="closeModal"
          class="sec-btn"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
        >
          Сохранить
        </button>
      </div>
    </div>

    <div
      @click="closeModal"
      class="modal-back"
    >
    </div>
  </div>
</template>

<script>
const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'ShitCity', 'ChinaSucks', 'HongKongSuper']

export default {
  name: 'EditFloor',

  data:() => ({
    roomCategory: 'standart',

    checkAll: false,
    checkedCities: ['Shanghai', 'Beijing'],
    cities: cityOptions,
    isIndeterminate: true,
    roomCategories: [
      {label: 'standart', value: 'std'},
      {label: 'lux', value: 'lux'},
      {label: 'family room', value: 'fam'},
      {label: 'apartment', value: 'apt'},
    ]
  }),

  props: {
    floorName: String,
    floorLevel: Number,
  },

  methods: {
    closeModal() {
      this.$emit('closeEditFloor')
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll === checkedCount === this.cities.length;
      this.isIndeterminate === checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style>

</style>