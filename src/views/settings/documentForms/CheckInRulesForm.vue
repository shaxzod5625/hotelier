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
        :set="v = $v.rules.$each[idx]"
      >
        <div
          class="w-100"
          v-show="formLangs.includes('uzb')"
        >
          <label for="input">Правило на узбекском</label>
          <el-input
            v-model="ruleInputs.ruleUzb"
            type="textarea"
            placeholder="Введите правило заезда на узбекском"
            :class="{invalid: (v.ruleUzb.$dirty && !v.ruleUzb.required)}"
          />
          <span v-if="v.ruleUzb.$dirty && !v.ruleUzb.required" class="validation-error">Пожалуйста, введите правило заезда на узбекском</span>
        </div>

        <div
          class="w-100"
          v-show="formLangs.includes('rus')"
        >
          <label for="input">Правило на русском</label>
          <el-input
            v-model="ruleInputs.ruleRus"
            type="textarea"
            placeholder="Введите правило заезда на русском"
            :class="{invalid: (v.ruleRus.$dirty && !v.ruleRus.required)}"
          />
          <span v-if="v.ruleRus.$dirty && !v.ruleRus.required" class="validation-error">Пожалуйста, введите правило заезда на русском</span>
        </div>

        <div
          class="w-100"
          v-show="formLangs.includes('eng')"
        >
          <label for="input">Правило на английском</label>
          <el-input
            v-model="ruleInputs.ruleEng"
            type="textarea"
            placeholder="Введите правило заезда на английском"
            :class="{invalid: (v.ruleEng.$dirty && !v.ruleEng.required)}"
          />
          <span v-if="v.ruleEng.$dirty && !v.ruleEng.required" class="validation-error">Пожалуйста, введите правило заезда на английском</span>
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

<!-- //////////// Hidden computed //////////// -->
      <h4 style="display: none">{{setInfo}}</h4>
      <h4 style="display: none">{{uzbRequired}}</h4>
      <h4 style="display: none">{{rusRequired}}</h4>
      <h4 style="display: none">{{engRequired}}</h4>
<!-- ///////////////////////////////////////// -->

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="checkInRulesFormSettingsEdit"
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
  name: 'CheckInRulesForm',

  data:() => ({
    checkInRulesForm: JSON.parse(window.sessionStorage.documentFormsSettings).documentFormat.checkInRules,
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

  validations() {
    return {
      formLangs: {required},
      rules: {
        $each: {
          ruleUzb: this.uzbRequired,
          ruleRus: this.rusRequired,
          ruleEng: this.engRequired
        }
      }
    }
  },

  computed: {
    setInfo() {
      this.formLangs = JSON.parse(this.checkInRulesForm).formLangs,
      this.rules = JSON.parse(this.checkInRulesForm).rules
    },

    uzbRequired() {
      if(this.formLangs.includes('uzb')) {
        return {required}
      } else {
        return ''
      }
    },

    rusRequired() {
      if(this.formLangs.includes('rus')) {
        return {required}
      } else {
        return ''
      }
    },

    engRequired() {
      if(this.formLangs.includes('eng')) {
        return {required}
      } else {
        return ''
      }
    },
  },

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

    async checkInRulesFormSettingsEdit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const checkInRulesFormSettings = {
        formLangs: this.formLangs,
        rules: this.rules
      }

      try {
        await this.$store.dispatch('checkInRulesFormSettingsEdit', checkInRulesFormSettings)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeCheckInRulesFormModal')
      this.$message({
        message: 'Изменения в настройках формы правил заезда сохранены',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>