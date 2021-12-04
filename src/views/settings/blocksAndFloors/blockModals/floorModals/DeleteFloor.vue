<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление этажа</h3>
      <div class="divider"></div>
      <h3 class="title-strong">{{floorName}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данный этаж безвозвратно. Удалить этаж?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="deleteFloor"
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
  name: 'DeleteFloor',

  props: {
    floorName: String,
    floorLevel: Number,
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
      this.$emit('closeDeleteFloor')
    },

    deleteFloor() {
      const floor = {
        blockID: this.blockID,
        name: this.floorName,
        level: this.floorLevel
      }
      console.log(floor);
      // try {
      //   await this.$store.dispatch('deleteFloor', floor)
      // } catch {}

      // try {
      //   await this.$store.dispatch('getBlocksInfo')
      // } catch(err) {
      //   if(err === undefined || err === null || err === '') {
      //     console.log(err);
      //   }
      // }

      // this.$emit('refresh')
      // this.$emit('closeEditFloor')
      // this.$message({
      //   message: 'Cool! Floor is deleted',
      //   type: 'success'
      // })
    }
  }
}
</script>