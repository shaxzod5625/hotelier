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
        <el-checkbox-group v-model="checkedForms" @change="checkedDocForms">
          <el-checkbox v-for="form in forms" :label="form" :key="form">{{form}}</el-checkbox>
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
        <input class="shown-input">
        <input class="hidden-input" type="file" name="" id="">
        <h4 class="shown-input-placeholder">Загрузить фото</h4>

        <div class="warning-text">
          <img src="@/assets/icons/Warning-red-sm.svg" alt="">
          <h3>Максимальный размер файла 5 МБ. Поддерживаются форматы SVG, PNG и JPEG.</h3>
        </div>
      </div>

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
        >
          Сохранить
        </button>
      </div>

    </div>
  </div>
</template>

<script>


const docForms = ['Инвойс', 'Подтверждение брони', 'Аннуляция брони', 'Внутренние правила', 'Правила заезда', 'Отчёты', 'Реестр кассы', 'Тарифы и цены']

export default {
  name: 'DocFormsSettings',

  data:() => ({
    checkedForms: ['Инвойс', 'Подтверждение брони', 'Внутренние правила'],
    forms: docForms,

    slogan: [
      {uzb: ''},
      {rus: ''},
      {eng: ''},
      ]
  }),

  methods: {
    checkedDocForms(value) {
      let checkedCount = value.length;
      this.checkAll === checkedCount === this.forms.length;
      this.isIndeterminate === checkedCount > 0 && checkedCount < this.forms.length;
    }
  }
}
</script>

<style>
  
</style>>
  