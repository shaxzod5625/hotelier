<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление профиля сотрудника</h3>
      <div class="divider"></div>
      <h3 class="title-strong">Aleksandrov Aleksandr Aleksandrovich</h3>
      <h3 class="danger-msg">Вы собираетесь удалить профиль данного сотрудника безвозвратно. Удалить профиль сотрудника?</h3>
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
    <div class="modal-back"
      @click="closeModal"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteEmployee',

  methods: {
    closeModal() {
      this.$emit('closeDelete')
    }
  }
}
</script>

<style>

</style>