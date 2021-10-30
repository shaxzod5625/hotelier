<template>
  <div class="modal"
  >
    <div class="form-filter">
      <h3>Изменение времени выезда</h3>
      <div class="divider"></div>
      <h3 class="cardsectitle">{{nfl}}</h3>
      <h3 class="cardcount">Время выезда: {{checkoutDate}}</h3>

      <label for="select">Время выезда</label>

      <div class="w-3d1">
        <el-date-picker
          class="calendar"
          v-model="codate"
          type="date"
          placeholder="Выберите дату"
          format="dd/MM/yyyy"
        >
        </el-date-picker>

        <el-time-select
          class="time"
          v-model="cotime"
          :picker-options="{
            start: '00:00',
            step: '00:01',
            end: '23:59'
          }"
          placeholder="--:--"
        >
        </el-time-select>
      </div>

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
  name: 'ExtendingModal',

  data: () => ({
    codate: '',
    cotime: ''
  }),

  props: {
    nfl: String,
    checkoutDate: String
  },

  methods: {
    closeModal() {
      this.$emit('closeExtend', this.extending = false)
    },
  }
}
</script>

<style>

</style>