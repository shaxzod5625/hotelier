<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Форма внутренних правил</h3>
      <div class="divider"/>

      <div class="fixed-2">
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
      </div>

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
          />
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
          />
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
          />
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
          Cancel
        </button>

        <button
          class="prim-btn"
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
import RadioButton from '@/components/RadioButton.vue'

export default {
  name: 'InternalRulesForm',

  components: {
    RadioButton
  },

  data:() => ({
    formLangs: ['rus'],
    selectedOrientation: 'bookOrientation',

    rules: [{
      ruleUzb: '',
      ruleRus: '',
      ruleEng: ''
    }],
    formLanguages: [
      {label: 'Узбекский', value: 'uzb'},
      {label: 'Русский', value: 'rus'},
      {label: 'Английский', value: 'eng'},
    ],
  }),

  methods: {
    closeModal() {
      this.$emit('closeInternalRulesFormModal')
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