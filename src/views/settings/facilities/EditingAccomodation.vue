<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Редактирование удобства</h3>
      <div class="divider"/>

      <div class="form-3">
        <div class="w-100">
          <label for="input">Категория удобства</label>
          <el-select
            v-model="accomodation.category"
            placeholder="Выберите категорию удобства"
          >
            <el-option>

            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Название удобства</label>
          <el-input
            v-model="accomodation.name"
            placeholder="Введите название удобства"
          ></el-input>
        </div>

        <div class="w-100">
          <label for="input">Единица измерения</label>
          <el-select
            v-model="accomodation.measurementUnit"
            placeholder="Выберите единицу измерения"
          >
            <el-option>
              
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="form-2">
        <div class="w-100">
          <label for="input">Бесплатно для категорий номеров</label>
          <el-select
            v-model="accomodation.payFreeRoomCats"
            multiple
            collapse-tags
            placeholder="Выберите категории номеров"
          >
            <el-option
              v-for="(category, idx) in categories"
              :key="idx"
              :value="category.value"
              :label="category.label"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Стоимость</label>
          <CurrencyInput
            v-model="accomodation.cost"
            placeholder="Введите стоимость удобства (SUM)"
            :options="{ currency: 'UZS' }"
          />
        </div>
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
import CurrencyInput from '@/components/CurrencyInput.vue'

export default {
  name: 'EditingAccomodation',

  components: {
    CurrencyInput
  },

  data:() => ({
    categories: [
      {label: 'Стандарт', value: 'standart'},
      {label: 'Люкс', value: 'lux'},
      {label: 'Семейная комната', value: 'family-room'},
      {label: 'Эконом-класс', value: 'economy-class'},
    ]
  }),

  props: {
    accomodation: Object
  },

  methods: {
    closeModal() {
      this.$emit('closeEditingAccomodationModal')
    }
  }
}
</script>

<style>

</style>