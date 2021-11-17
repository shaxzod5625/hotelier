<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Распечатать тарифы</h3>
      <div class="divider"/>
      
      <h4
        class="cardsectitle"
      >
        Количество выбранных тарифов:
      </h4>

      <h4
        class="cardcount"
      >
        {{tariffs.length}}
      </h4>

      <h4
        class="cardquest"
      >
        Распечатать выбранные тарифы?
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
          ОК
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
  name: 'PrintingOutTariffs',

  data:() => ({

  }),

  props: {
    tariffs: Array
  },

  methods: {
    closeModal() {
      this.$emit('closePrintingOutTariffs')
    }
  }
}
</script>

<style>

</style>