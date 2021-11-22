<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Расчетный час</h3>
      <div class="divider"/>

      <div
        class="pad-24"
        style="margin-top: 12px"
      >
        <label for="input">Расчетный час</label>
        <el-time-select
          v-model="zeroHour"
          placeholder="Введите время"
          :picker-options="{
            start: '00:00',
            step: '00:01',
            end: '23:59'
          }"
          v-mask="'##:##'"
        />
      </div>

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
        >
          Сохранить
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
  name: 'ZeroHour',

  data:() => ({
    zeroHour: ''
  }),

  methods: {
    closeModal() {
      this.$emit('closeZeroHour')
    }
  }
}
</script>

<style>

</style>