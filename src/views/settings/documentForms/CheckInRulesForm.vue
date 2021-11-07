<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Форма правил заезда</h3>
      <div class="divider"/>

      <div class="form-1">
        <div class="w-100">
          <label for="input">Языки</label>
          <el-select
            v-model="formLangs"
            multiple
            collapse-tags
            placeholder="Выберите языки"
          >
            <el-option
              v-for="(formLanguage, idx) in formLanguages"
              :key="idx"
              :value="formLanguage.value"
              :label="formLanguage.label"
            />
          </el-select>
        </div>
      </div>

      <div class="divider"/>
      <h4>Правила</h4>

      <div
        class="form-1"
        v-for="(ruleInputs, idx) in rules"
        :key="idx"
      >
        <div
          class="w-100"
          v-show="formLangs.includes('uzb')"
        >
          <label for="input">Правило на узбекском</label>
          <el-input
            v-model="ruleInputs.ruleUzb"
            type="textarea"
            placeholder="Введите правило проживания на узбекском"
          >
          </el-input>
        </div>

        <div
          class="w-100"
          v-show="formLangs.includes('rus')"
        >
          <label for="input">Правило на русском</label>
          <el-input
            v-model="ruleInputs.ruleRus"
            type="textarea"
            placeholder="Введите правило проживания на русском"
          >
          </el-input>
        </div>

        <div
          class="w-100"
          v-show="formLangs.includes('eng')"
        >
          <label for="input">Правило на английском</label>
          <el-input
            v-model="ruleInputs.ruleEng"
            type="textarea"
            placeholder="Введите правило проживания на английском"
          >
          </el-input>
        </div>

        <div class="input-grid-btns">
          <button
            class="ghost-btn-danger"
            @click="removeRules(idx)"
            v-show="idx || ( !idx && rules.length > 1)"
          >
            <img src="@/assets/icons/Minus-sm.svg" alt="">
            <span>Удалить</span>
          </button>

          <button
            class="ghost-btn"
            @click="addRules(idx)"
            v-show="idx == rules.length-1"
          >
            <img src="@/assets/icons/Add-sm.svg" alt="">
            Добавить
          </button>
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
export default {
  name: 'CheckInRulesForm',

  data:() => ({
    formLangs: ['rus'],

    rules: [{
      ruleUzb: '',
      ruleRus: '',
      ruleEng: ''
    }],
    formLanguages: [
      {label: 'Узбекский', value: 'uzb'},
      {label: 'Русский', value: 'rus'},
      {label: 'Английский', value: 'eng'},
    ]
  }),

  methods: {
    closeModal() {
      this.$emit('closeCheckInRulesFormModal')
    },

    addRules () {
      this.rules.push({
        ruleUzb: '',
        ruleRus: '',
        ruleEng: ''
      })
    },

    removeRules (idx) {
      this.rules.splice(idx, 1)
    },
  }
}
</script>

<style>

</style>