<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Архивация</h3>
      <div class="divider"/>
      <h4
        class="cardsectitle"
      >
        Выбранные тарифы:
      </h4>

      <h4
        class="cardcount"
        style="margin-bottom: 12px"
        v-for="(tariff, idx) in tariffs"
        :key="idx"
      >
        {{tariff.name}}
      </h4>

      <h4
        class="cardquest"
        style="margin-top: 12px"
      >
        Архивировать тарифы?
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
  name: 'ArchivingTariffs',

  data:() => ({

  }),

  props: {
    tariffs: Array
  },

  methods: {
    closeModal() {
      this.$emit('closeArchivingTariffs')
    }
  }
}
</script>

<style>

</style>