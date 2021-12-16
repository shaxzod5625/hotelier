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
          :class="{invalid: ($v.zeroHour.$dirty && !$v.zeroHour.required)}"
          v-mask="'##:##'"
        />
        <span v-if="$v.zeroHour.$dirty && !$v.zeroHour.required" class="validation-error">Пожалуйста, введите время</span>
      </div>

<!-- //////// Hidden computed //////////// -->
<h4 style="display: none">{{setZeroHour}}</h4>
<!-- ///////////////////////////////////// -->

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="editZeroHour"
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
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'ZeroHour',

  data:() => ({
    zeroHour: ''
  }),

  validations: {
    zeroHour: {required}
  },

  computed: {
    setZeroHour() {
      this.zeroHour = JSON.parse(window.sessionStorage.tariffConfigs).configuration.zeroHour
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeZeroHour')
    },

    async editZeroHour() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const zeroHour = this.zeroHour

      console.log(zeroHour);

      // try {
      //   await this.$store.dispatch('editZeroHour')
      // } catch {}

      // this.$emit('refresh')
      // this.$emit('closeZeroHour')
      this.$message({
        message: 'Расчетный час изменен',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>