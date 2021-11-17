<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Новый тариф</h3>
      <div class="divider"/>

      <div class="pad-24">
        <label for="input">Название тарифа</label>
        <el-input
          v-model="name"
          placeholder="Введите название тарифа"
        />
      </div>

      <div class="pad-24">
        <label for="input">Тип тарифа</label>
        <el-select
          v-model="type"
          placeholder="Выберите тип тарифа"
        >
          <el-option
            v-for="(type, idx) in tariffTypes"
            :key="idx"
            :value="type.value"
            :label="type.label"
          />
        </el-select>
      </div>

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Cancel
        </button>

        <button
          class="prim-btn"
        >
          Save
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
  name: 'NewTariff',

  data:() => ({
    name: '',
    type: 'main',

    tariffTypes: [
      {label: 'Основной', value: 'main'},
      {label: 'Скидочный', value: 'discount'}
    ]
  }),

  methods: {
    closeModal() {
      this.$emit('closeNewTariff')
    }
  }
}
</script>

<style>

</style>