<template>
  <div class="modal"
  >
    <div class="form-filter">
      <h3>Переселение гостя</h3>
      <div class="divider"></div>
      <h3 class="cardsectitle">{{nfl}}</h3>
      <h3 class="cardcount">Переселяется из № {{room}}</h3>

      <label for="select">Корпус</label>
      <el-select v-model="block" filterable placeholder="Выберите корпус">
        <el-option
          v-for="item in block"
          :key="item.block"
          :label="item.block"
          :value="item.block">
        </el-option>
      </el-select>

      <label for="select">Комната</label>
      <el-select v-model="room" filterable placeholder="Выберите комнату">
        <el-option
          v-for="item in room"
          :key="item.room"
          :label="item.room"
          :value="item.room">
        </el-option>
      </el-select>

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button class="prim-btn">
          <span>OK</span>
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
  name: 'ResidingModal',

  data: () => ({
    block: '',
    broom: ''
  }),

  props: {
    room: String,
    nfl: String
  },

  methods: {
    closeModal() {
      this.$emit('close', this.residing = false)
    },
  }
}
</script>

<style>

</style>