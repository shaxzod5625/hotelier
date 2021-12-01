<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление комнаты</h3>
      <div class="divider"></div>
      <h3 class="title-strong">№ {{deletingRoomInfo.roomNumber}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данную комнату безвозвратно. Это приведет к сбою нескольких функций Hotelier PMS. Удалить комнату?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="deleteRoom"
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
  name: 'DeleteCategory',

  props: {
    deletingRoomInfo: Object,
  },

  computed: {
    chosenRoom() {
      const currentRoom = this.$store.state.roomFund.find(cat => cat.catID == this.categoryID)
      return currentRoom.rooms.find(room => room.roomNumber == this.roomNumber)
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeDeleteRoom')
    },

    async deleteRoom() {

      try {
        await this.$store.dispatch('deleteRoom', this.deletingRoomInfo)
      } catch {}
      
      this.$emit('refresh')
      this.$emit('closeDeleteRoom')

      this.$message({
        message: "Номер удалён",
        type: 'success'
      })
    }
  }
}
</script>