<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Редактирование корпуса</h3>
      <div class="divider"></div>

      <label for="select">Тип корпуса</label>
      <el-select v-model="type" filterable placeholder="Выберите тип корпуса">
        <el-option
          v-for="type in types"
          :key="type.idx"
          :label="type.label"
          :value="type.value">
        </el-option>
      </el-select>

      <label for="select">Название корпуса</label>
      <el-input style="width: calc(100% - 48px);" v-model="blockName" placeholder="Введите название корпуса">
      </el-input>

      <label for="select">Количество этажей</label>
      <el-input v-mask="'##'" style="width: calc(100% - 48px);" v-model="floorsAmount" placeholder="Введите количество этажей">
      </el-input>

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button class="prim-btn">
          <span>Сохранить</span>
        </button>
      </div>
    </div>
    <div class="modal-back"
      @click="closeModal"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditBlock',

  data: () => ({
    types: [
      {label: 'Основной', value: 'main'},
      {label: 'Дополнительный', value: 'additional'}
    ]
  }),

  props: {
    type: String,
    blockName: String,
    floorsAmount: Number
  },


  methods: {
    closeModal() {
      this.$emit('closeEditBlock')
    }
  }
}
</script>

<style>

</style>