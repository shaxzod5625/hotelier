<template>
  <div class="modal">
    <div class="modal-div-2">
      <h3>Форма тарифов и цен</h3>
      <div class="divider"/>

      <div class="form-2">
        <div
          class="radio-btn-div"
          @click="selectedOrientation = 'bookOrientation'"
        >
          <div class="img-div">
            <img src="@/assets/Afour-book.svg" alt="">
          </div>
          <label class="radiobtn-label" for="input">1 экземпляр на лист А4</label>
          <RadioButton
            value="bookOrientation"
            v-model="selectedOrientation"
          />
        </div>

        <div
          class="radio-btn-div"
          @click="selectedOrientation = 'albumOrientation'"
        >
          <div class="img-div">
            <img src="@/assets/Afour-album.svg" alt="">
          </div>
          <label class="radiobtn-label" for="input">1 экземпляр на лист А4</label>
          <RadioButton
            value="albumOrientation"
            v-model="selectedOrientation"
          />
        </div>

        <div class="w-100">
          <el-checkbox
            v-model="showTariffsTerm"
          >
            Указать срок тарифа
          </el-checkbox>
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
import RadioButton from '@/components/RadioButton.vue'


export default {
  name: 'TariffsForm',

  components: {
    RadioButton
  },

  data:() => ({
    selectedOrientation: 'bookOrientation',
    showTariffsTerm: true,
  }),

  methods: {
    closeModal() {
      this.$emit('closeTariffsFormModal')
    }
  }
}
</script>

<style>

</style>