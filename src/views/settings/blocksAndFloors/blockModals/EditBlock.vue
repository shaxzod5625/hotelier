<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Редактирование корпуса</h3>
      <div class="divider"></div>

      <div
        class="w-100"
        style="width: calc(100% - 48px);"
      >
        <label for="select">Тип корпуса</label>
        <el-select
          style="width: 100%"
          v-model="blockType"
          filterable
          placeholder="Выберите тип корпуса"
          :class="{invalid: ($v.blockType.$dirty && !$v.blockType.required)}"
        >
          <el-option
            v-for="type in types"
            :key="type.idx"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
        <span v-if="$v.blockType.$dirty && !$v.blockType.required" class="validation-error">Пожалуйста, выберите тип корпуса</span>
      </div>

      <div
        class="w-100"
        style="width: calc(100% - 48px);"
      >
        <label for="select">Название корпуса</label>
        <el-input
          v-model="blockTitle"
          placeholder="Введите название корпуса"
          :class="{invalid: ($v.blockTitle.$dirty && !$v.blockTitle.required)}"
        />
        <span v-if="$v.blockTitle.$dirty && !$v.blockTitle.required" class="validation-error">Пожалуйста, введите название корпуса</span>
      </div>

      <div
        class="w-100"
        style="width: calc(100% - 48px);"
      >
        <label for="select">Количество этажей</label>
        <el-input
          v-mask="'##'"
          v-model="floors"
          placeholder="Введите количество этажей"
          :class="{invalid: ($v.floors.$dirty && !$v.floors.required)}"
        />
        <span v-if="$v.floors.$dirty && !$v.floors.required" class="validation-error">Пожалуйста, введите количество этажей</span>
      </div>

      <h4 style="display: none">{{setInfo}}</h4>

      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="editBlock"
        >
          <span>Сохранить</span>
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
  name: 'EditBlock',

  data: () => ({
    blockType: '',
    blockTitle: '',
    floors: '',

    types: [
      {label: 'Основной', value: 'main'},
      {label: 'Дополнительный', value: 'additional'}
    ]
  }),

  validations: {
    blockType: {required},
    blockTitle: {required},
    floors: {required},
  },

  props: {
    type: String,
    blockName: String,
    floorsAmount: Number,
    blockID: String
  },

  computed: {
    setInfo() {
      this.blockType = this.type
      this.blockTitle = this.blockName
      this.floors = this.floorsAmount
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeEditBlock')
    },

    async editBlock() {
      
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const block = {
        _id: this.blockID,
        name: this.blockTitle,
        typeOfBlock: this.blockType,
        amountOfFloors: this.floors
      }
      
      try {
        await this.$store.dispatch('editBlock', block)
      } catch {}

      try {
        await this.$store.dispatch('getBlocksInfo')
      } catch(err) {
        if(err === undefined || err === null || err === '') {
          console.log(err);
        }
      }

      this.$emit('refresh')
      this.$emit('closeEditBlock')
      this.$message({
        message: "Информация корпуса обновлена",
        type: "success"
      })
    }
  }
}
</script>

<style>

</style>