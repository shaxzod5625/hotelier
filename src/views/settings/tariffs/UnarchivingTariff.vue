<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Разархивация</h3>
      <div class="divider"/>

      <h4
        class="cardsectitle"
      >
        Выбранный тариф:
      </h4>

      <h4
        class="cardcount"
      >
        {{tariff.name}}
      </h4>

      <h4
        class="cardquest"
      >
        Разархивировать тариф?
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
  name: 'UnarchivingTariff',

  data:() => ({

  }),

  props: {
    tariff: Object
  },

  methods: {
    closeModal() {
      this.$emit('closeUnarchivingTariff')
    }
  }
}
</script>

<style>

</style>