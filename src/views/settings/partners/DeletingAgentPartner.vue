<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление партнера</h3>
      <div class="divider"></div>
      <h3 class="title-strong">{{partner.lastName}} {{partner.firstName}} {{partner.surName}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данного партнера безвозвратно. Удалить партнера?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click="deletePartner"
        >
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
  name: 'DeletingAgentPartner',

  props: {
    partner: Object,
    type: Number
  },

  computed: {
    chosenPartner() {
      const currentPartner = this.$store.state.roomFund.find(cat => cat.catID == this.categoryID)
      return currentPartner.rooms.find(room => room.roomNumber == this.roomNumber)
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeDeletePartner')
    },

    async deletePartner() {
      const chosenPartner = {
        type: this.type,
        id: this.partner._id
      }
      
      try {
        await this.$store.dispatch('deletePartner', chosenPartner)
      } catch {}

      try {
        await this.$store.dispatch('getPartnersInfo')
      } catch {}

      this.$emit('refresh')
      this.$emit('closeDeletePartner')
      this.$message({
        message: 'Партнер удален',
        type: 'success'
      })
    }
  }
}
</script>