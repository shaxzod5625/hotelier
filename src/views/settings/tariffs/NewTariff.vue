<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Новый тариф</h3>
      <div class="divider"/>

      <div class="pad-24">
        <label for="input">Название тарифа</label>
        <el-input
          v-model="name"
          placeholder="Введите название тарифа"
          :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        />
        <span v-if="$v.name.$dirty && !$v.name.required" class="validation-error">Пожалуйста, введите название тарифа</span>
      </div>

      <div class="pad-24">
        <label for="input">Тип тарифа</label>
        <el-select
          v-model="type"
          placeholder="Выберите тип тарифа"
          :class="{invalid: ($v.type.$dirty && !$v.type.required)}"
        >
          <el-option
            v-for="(tType, idx) in tariffTypes"
            :key="idx"
            :value="tType.value"
            :label="tType.label"
          />
        </el-select>
        <span v-if="$v.type.$dirty && !$v.type.required" class="validation-error">Пожалуйста, выберите тип тарифа</span>
      </div>

<!-- //////// Hidden computed ////////// -->
<h4 style="display: none">{{stockForInputs}}</h4>
<!-- /////////////////////////////////// -->

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Cancel
        </button>

        <button
          class="prim-btn"
          @click="newTariff"
        >
          Save
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
  name: 'NewTariff',

  data:() => ({
    name: '',
    type: 'main',

    tariffTypes: [
      {label: 'Основной', value: 'main'},
      {label: 'Скидочный', value: 'discount'}
    ]
  }),

  validations: {
    name: {required},
    type: {required}
  },

  computed: {
    stockForInputs() {
      const rooms = JSON.parse(window.sessionStorage.allRoomCats).categories
      const roomsLength = rooms.length
      const rawLooped = []

      for (let i=0; i<roomsLength; i++) {
        rawLooped.push({
          category: rooms[i].category,
          main: Math.max(...rooms[i].rooms.map(room => JSON.parse(room).mainBeds)),
          additional: Math.max(...rooms[i].rooms.map(room => JSON.parse(room).additionalBeds))
        })
      }

      const newLength = rawLooped.length
      const looped = []

      for (let idx=0; idx<newLength; idx++) {
        looped.push({
          category: rawLooped[idx].category,
          settlement: new Array(rawLooped[idx].main).fill({
            type: idx+1,
            residents: '',
            foreigners: '',
            combined: '',
            additionalBed: {
              amount: rawLooped[idx].additional,
              residents: {value: '', string: ''},
              foreigners: '',
              combined: ''
            }
          }) 
        })
      }

      return looped
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeNewTariff')
    },

    async newTariff() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const tariff = {
        name: this.name,
        type: this.type,
        rack: this.stockForInputs
      }

      console.log(tariff);

      // try {
      //   await this.$store.dispatch('newTariff', tariff)
      // } catch {}

      // this.$emit('refresh')
      // this.$emit('closeNewTariff')
      this.$message({
        message: 'Новый тариф добавлен',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>