<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление услуги</h3>
      <div class="divider"/>
      <h3 class="title-strong">{{service.name}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данную услугу безвозвратно. Удалить услугу?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click="deleteService"
        >
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
  name: 'DeleteFacility',

  data:() => ({

  }),

  props: {
    service: Object
  },

  methods: {
    closeModal() {
      this.$emit('closeDeleteFacilityModal')
    },

    async deleteService() {
      const id = this.service.id

      try {
        await this.$store.dispatch('deleteService', id)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeDeleteFacilityModal')
      this.$message({
        message: `Услуга "${this.service.name}" удалена`,
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>