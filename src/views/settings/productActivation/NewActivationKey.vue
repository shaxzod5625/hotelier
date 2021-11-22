<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Новый ключ продукта</h3>
      <div class="divider"/>

      <div class="form-5">
        <div class="w-100">
          <label for="input">Введите код продукта</label>
          <el-input
            placeholder="xxxxx"
            v-model="key1"
            maxlength="5"
          />
        </div>

        <div class="w-100">
          <label style="opacity: 0" for="input">Label</label>
          <el-input
            placeholder="xxxxx"
            v-model="key2"
            maxlength="5"
          />
        </div>

        <div class="w-100">
          <label style="opacity: 0" for="input">Label</label>
          <el-input
            placeholder="xxxxx"
            v-model="key3"
            maxlength="5"
          />
        </div>

        <div class="w-100">
          <label style="opacity: 0" for="input">Label</label>
          <el-input
            placeholder="xxxxx"
            v-model="key4"
            maxlength="5"
          />
        </div>

        <div class="w-100">
          <label style="opacity: 0" for="input">Label</label>
          <el-input
            placeholder="xxxxx"
            v-model="key5"
            maxlength="5"
          />
        </div>
      </div>

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
        >
          Подтвердить
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
  name: 'NewActivationKey',

  data:() => ({
    key1: '',
    key2: '',
    key3: '',
    key4: '',
    key5: '',
  }),

  methods: {
    closeModal() {
      this.$emit('closeNewActivationKey')
    }
  }
}
</script>

<style>

</style>