<template>
  <div class="con-page">

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/document-forms'}" class="breadcrump">Шаблоны документов</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Общие</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="input-grid">
      <h4>Применить настройки к следующим документам:</h4>

      <div class="checkbox-group-div">
        <el-checkbox-group v-model="checkedForms">
          <el-checkbox v-for="form in forms" :label="form.value" :key="form.value">{{form.label}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="divider" style="margin-left: -24px; width: calc(100% + 48px)"/>

      <h4>Слоган компании</h4>

      <div class="w-100">
        <label for="input">На узбекском</label>
        <el-input
          type="textarea"
          autosize
          maxlength="200"
          v-model="slogan.uzb"
          placeholder="Введите слоган на узбекском"
        >
        </el-input>
      </div>

      <div class="w-100" style="margin-top: 24px">
        <label for="input">На русском</label>
        <el-input
          type="textarea"
          autosize
          maxlength="200"
          v-model="slogan.rus"
          placeholder="Введите слоган на русском"
        >
        </el-input>
      </div>

      <div class="w-100" style="margin-top: 24px; margin-bottom: 24px">
        <label for="input">На английском</label>
        <el-input
          type="textarea"
          autosize
          maxlength="200"
          v-model="slogan.eng"
          placeholder="Введите слоган на английском"
        >
        </el-input>
      </div>

      <div class="divider" style="margin-left: -24px; width: calc(100% + 48px)"/>

      <h4>Логотип компании</h4>

      <div class="file-input">
        <img class="logo" v-if="myLogo !== null" :src="logoLink" alt="">
        <input v-else class="shown-input">
        <input
          class="hidden-input"
          type="file"
          name=""
          id=""
          @change="handleFileUpload"
          accept=" .png, .gif, .jpeg, .jpg, .svg"
        >
        <h4 v-if="JSON.parse(docForms).myLogo === null" class="shown-input-placeholder">Загрузить фото</h4>

        <div class="warning-text">
          <img src="@/assets/icons/Warning-red-sm.svg" alt="">
          <h3>Максимальный размер файла 5 МБ. Поддерживаются форматы SVG, PNG и JPEG.</h3>
        </div>
      </div>

<!-- ///////// Hidden computed ///////////// -->
      <h4 style="display: none">{{setInfo}}</h4>
<!-- /////////////////////////////////////// -->

      <div class="input-grid-btns">
        <router-link
          class="sec-btn"
          :to="{ name: 'Document Forms'}"
          tag="button"
        >
          Отмена
        </router-link>

        <button
          class="prim-btn"
          @click="docFormsGeneralSettings"
        >
          Сохранить
        </button>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'DocFormsSettings',

  data:() => ({
    docForms: JSON.parse(window.sessionStorage.documentFormsSettings).documentFormat.general,
    checkedForms: ['invoice',
      'bookingConfirmation',
      'residingRules',
      'bookingCancellation'
    ],
    forms: [
      {label: 'Инвойс', value: 'invoice'},
      {label: 'Подтверждение брони', value: 'bookingConfirmation'},
      {label: 'Аннуляция брони', value: 'bookingCancellation'},
      {label: 'Внутренние правила', value: 'residingRules'},
      {label: 'Правила заезда', value: 'checkInRules'},
      {label: 'Отчёты', value: 'reports'},
      {label: 'Реестр кассы', value: 'cashierBoxReestr'},
      {label: 'Тарифы и цены', value: 'tariffs'}
    ],

    slogan: {
      uzb: '',
      rus: '',
      eng: '',
    },

    myLogo: ''
  }),

  computed: {
    setInfo() {
      this.checkedForms = JSON.parse(this.docForms).checkedForms,
      this.slogan = JSON.parse(this.docForms).slogan,
      this.myLogo = JSON.parse(this.docForms).myLogo
    },

    logoLink() {
      const logo = JSON.parse(this.docForms).myLogo
      return `http://hotelier.uz:3000/logos/${logo}`
    }
  },

  methods: {
    async docFormsGeneralSettings() {
      const docFormsSettings = {
        slogan: this.slogan,
        checkedForms: this.checkedForms,
        myLogo: this.myLogo
      }

      try {
        await this.$store.dispatch('docFormsGeneralSettings', docFormsSettings)
      } catch {}

      try {
        await this.$store.dispatch('getDocFormsInfo')
      } catch {}

      this.$router.push({ path: '/settings/document-forms' })
      this.$message({
        message: 'Изменения в общих настройках сохранены',
        type: 'success'
      })
    },

    handleFileUpload(event) {
      this.myLogo = event.target.files[0]
    }
  }
}
</script>

<style>
  
</style>>
  