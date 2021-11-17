<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление тарифов</h3>
      <div class="divider"/>

      <h4
        class="cardsectitle"
      >
        Выбранные тарифы:
      </h4>

      <h4
        class="cardcount"
        style="margin-bottom: 12px"
        v-for="(tariff, idx) in  tariffs"
        :key="idx"
      >
        {{tariff.name}}
      </h4>

      <h4
        class="danger-msg"
      >
        Вы собираетесь удалить данные тарифы безвозвратно. Удалить тарифы?
      </h4>

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
        >
          Удалить
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
  name: 'DeletingTariffs',

  dat:() => ({

  }),

  props: {
    tariffs: Array
  },

  methods: {
    closeModal() {
      this.$emit('closeDeletingTariffs')
    }
  }
}
</script>

<style>

</style>