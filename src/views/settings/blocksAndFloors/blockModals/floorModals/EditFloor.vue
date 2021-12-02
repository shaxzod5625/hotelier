<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Редактирование этажа</h3>
      <div class="divider"></div>

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Название этажа</label>
          <el-input
            v-model="floorsName"
            placeholder="Введите название этажа"
            :class="{invalid: ($v.floorsName.$dirty && !$v.floorsName.required)}"
          />
          <span v-if="$v.floorsName.$dirty && $v.floorsName.required" class="validation-error">Пожалуйста, введите название этажа</span>
        </div>

        <div class="w-100">
          <label for="input">Этажность</label>
          <el-input
            v-model="floorsLevel"
            v-mask="'##'"
            placeholder="Введите номер этажа"
            :class="{invalid: ($v.floorsLevel.$dirty && !$v.floorsLevel.required)}"
          />
          <span v-if="$v.floorsLevel.$dirty && $v.floorsLevel.required" class="validation-error">Пожалуйста, введите номер этажа</span>
        </div>

        <div class="w-100">
          <label for="input">Категория номеров</label>
          <el-select
            v-model="roomCategory"
          >
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

      <h4 style="display: none">{{setInfo}}</h4>

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
import {required} from 'vuelidate/lib/validators'

const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'ShitCity', 'ChinaSucks', 'HongKongSuper']

export default {
  name: 'EditFloor',

  data:() => ({
    roomCategory: 'standart',
    floorsName: '',
    floorsLevel: '',

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

  validations: {
    floorsName: {required},
    floorsLevel: {required},
  },

  props: {
    floorName: String,
    floorLevel: Number,
  },

  computed: {
    setInfo() {
      this.floorsName = this.floorName
      this.floorsLevel = this.floorLevel
    }
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