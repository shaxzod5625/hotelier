<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление удобства</h3>
      <div class="divider"/>
      <h3 class="title-strong">{{accomodation.name}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данное удобство безвозвратно. Удалить удобство?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button class="prim-btn">
          <span>Удалить</span>
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
  name: 'DeleteAccomodation',

  data:() => ({

  }),

  props: {
    accomodation: Object
  },

  methods: {
    closeModal() {
      this.$emit('closeDeleteAccomodationModal')
    }
  }
}
</script>

<style>

</style>