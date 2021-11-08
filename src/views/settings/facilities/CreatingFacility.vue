<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Создание услуги</h3>
      <div class="divider"/>

      <div class="form-3">
        <div class="w-100">
          <label for="input">Категория услуги</label>
          <el-select
            v-model="category"
            placeholder="Выберите категорию услуг"
          >
            <el-options>

            </el-options>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Название услуги</label>
          <el-input
            v-model="name"
            placeholder="Введите название услуги"
          ></el-input>
        </div>

        <div class="w-100">
          <label for="input">Единица измерения</label>
          <el-select
            v-model="measurementUnit"
            placeholder="Выберите единицу измерения"
          >
            <el-options>
              
            </el-options>
          </el-select>
        </div>
      </div>

      <div class="form-2">
        <div class="w-100">
          <label for="input">Бесплатно для категорий номеров</label>
          <el-select
            v-model="payFreeRoomCats"
            placeholder="Выберите категории номеров"
          >
            <el-options>

            </el-options>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Стоимость</label>
          <el-input
            v-model="cost"
            placeholder="Введите стоимость услуги (SUM)"
          ></el-input>
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
export default {
  name: 'CreatingFacility',

  data:() => ({
    category: '',
    name: '',
    measurementUnit: '',
    payFreeRoomCats: '',
    cost: '',
  }),

  methods: {
    closeModal() {
      this.$emit('closeCreatingFacilityModal')
    }
  }
}
</script>

<style>

</style>