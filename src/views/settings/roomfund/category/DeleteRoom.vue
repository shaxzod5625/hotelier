<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление комнаты</h3>
      <div class="divider"></div>
      <h3 class="title-strong">№ {{roomNumber}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данную комнату безвозвратно. Удалить комнату?</h3>
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
  name: 'DeleteCategory',

  props: {
    roomNumber: String,
    categoryID: String
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
    }
  }
}
</script>