<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление партнера</h3>
      <div class="divider"></div>
      <h3 class="title-strong">{{partnerName}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данного партнера безвозвратно. Удалить партнера?</h3>
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
  name: 'DeletingPartner',

  props: {
    partnerName: String,
    partnerID: Number
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
    }
  }
}
</script>