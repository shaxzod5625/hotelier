<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление корпуса</h3>
      <div class="divider"></div>
      <h3 class="title-strong">{{blockName}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данный корпус безвозвратно. Удалить корпус?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="deleteBlock"
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
  name: 'DeleteBlock',

  props: {
    blockName: String,
    blockID: String
  },

  computed: {
    chosenRoom() {
      const currentRoom = this.$store.state.roomFund.find(cat => cat.catID == this.categoryID)
      return currentRoom.rooms.find(room => room.roomNumber == this.roomNumber)
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeDeleteBlock')
    },

    async deleteBlock() {
      const block = {
        _id: this.blockID,
        name: this.blockName
      }

      try {
        await this.$store.dispatch('deleteBlock', block)
      } catch {}

      try {
        await this.$store.dispatch('getBlocksInfo')
      } catch(err) {
        if(err === undefined || err === null || err === '') {
          console.log(err);
        }
      }

      this.$emit('refresh')
      this.$emit('closeDeleteBlock')
      this.$message({
        message: "Корпус удалён",
        type: "success"
      })
    }
  }
}
</script>