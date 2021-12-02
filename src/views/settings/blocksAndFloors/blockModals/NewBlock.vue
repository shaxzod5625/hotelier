<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Добавление корпуса</h3>
      <div class="divider"></div>

      <div
        class="w-100"
        style="width: calc(100% - 48px);"
      >
        <label for="select">Тип корпуса</label>
        <el-select
          style="width: 100%"
          v-model="type"
          filterable
          placeholder="Выберите тип корпуса"
          :class="{invalid: ($v.type.$dirty && !$v.type.required)}"
        >
          <el-option
            v-for="type in types"
            :key="type.idx"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
        <span v-if="$v.type.$dirty && !$v.type.required" class="validation-error">Пожалуйста, выберите тип корпуса</span>
      </div>

      <div
        class="w-100"
        style="width: calc(100% - 48px);"
      >
        <label for="select">Название корпуса</label>
        <el-input
          v-model="blockName"
          filterable
          placeholder="Введите название корпуса"
          :class="{invalid: ($v.blockName.$dirty && !$v.blockName.required)}"
        />
        <span v-if="$v.blockName.$dirty && !$v.blockName.required" class="validation-error">Пожалуйста, введите название корпуса</span>
      </div>

      <div
        class="w-100"
        style="width: calc(100% - 48px);"
      >
        <label for="select">Количество этажей</label>
        <el-input
          v-mask="'##'"
          v-model="floorsAmount"
          filterable
          placeholder="Введите количество этажей"
          :class="{invalid: ($v.floorsAmount.$dirty && !$v.floorsAmount.required)}"
        />
        <span v-if="$v.floorsAmount.$dirty && !$v.floorsAmount.required" class="validation-error">Пожалуйста, введите количество этажей</span>
      </div>
      
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="newBlock"
        >
          <span>Добавить</span>
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
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'NewBlock',

  data: () => ({
    type: '',
    blockName: '',
    floorsAmount: '',

    types: [
      {label: 'Основной', value: 'main'},
      {label: 'Дополнительный', value: 'additional'}
    ]
  }),

  validations: {
    type: {required},
    blockName: {required},
    floorsAmount: {required}
  },

  methods: {
    closeModal() {
      this.$emit('closeNewBlock')
    },

    async newBlock() {

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      sessionStorage.removeItem('status')

      const block = {
        name: this.blockName,
        typeOfBlock: this.type,
        amountOfFloor: this.floorsAmount
      }

      try {
        await this.$store.dispatch('newBlock', block)
      } catch {}

      try {
        await this.$store.dispatch('getBlocksInfo')
      } catch(err) {
        if(err === undefined || err === null || err === '') {
          console.log(err);
        }
      }
    
      this.$emit('refresh')
      this.$emit('closeNewBlock')
      this.$message({
        message: "Новый корпус добавлен",
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>