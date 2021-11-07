<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Редактирование партнера</h3>
      <div class="divider"></div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Краткое название партнера</label>
          <el-input
            v-model="partnerName"
            placeholder="Введите краткое название партнера"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Юридическое название партнера</label>
          <el-input
            v-model="partnerLegalName"
            placeholder="Введите юридическое название партнера"
          >
          </el-input>
        </div>
      </div>

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Страна</label>
          <el-select v-model="country" filterable placeholder="Выберите страну партнера">
            <el-option
              v-for="(country, idx) in countries"
              :key="idx"
              :label="country.label"
              :value="country.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Номер телефона</label>
          <el-input
            v-model="mainPhoneNumber"
            v-mask="'+998 (##) ###-##-##'"
            placeholder="Введите номер телефона"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Дополнительный номер телефона</label>
          <el-input
            v-model="additionalPhoneNumber"
            v-mask="'+998 (##) ###-##-##'"
            placeholder="Введите дополнительный номер телефона"
          >
          </el-input>
        </div>
      </div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Факс</label>
          <el-input
            v-model="fax"
            v-mask="'+998 (##) ###-##-##'"
            placeholder="Введите номер факса партнера"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">E-mail</label>
          <el-input
            v-model="email"
            placeholder="Введите e-mail партнера"
          >
          </el-input>
        </div>
      </div>

      <div class="input-grid-btns">
        <button
          @click="closeModal"
          class="sec-btn"
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
      @click="closeModal"
      class="modal-back"
    />
  </div>
</template>

<script>
export default {
  name: 'EditingPartner',

  data:() => ({

    countries: [
      {value: 'Uzbekistan', label: 'Узбекистан'},
      {value: 'Tajikistan', label: 'Таджикистан'},
      {value: 'Kazakhstan', label: 'Казахстан'},
      {value: 'Russian Federation', label: 'Российская Федерация'},
      {value: 'Japan', label: 'Япония'},
      {value: 'Great Britain', label: 'Великобритания'},
      {value: 'USA', label: 'США'},
      {value: 'Ukraine', label: 'Украина'},
      {value: 'Georgia', label: 'Грузия'},
      {value: 'Azerbaijan', label: 'Азербайджан'},
      {value: 'Australia', label: 'Австралия'},
      {value: 'Indonesia', label: 'Индонезия'},
      {value: 'Turkmenistan', label: 'Туркменистан'},
    ]
  }),

  props: {
    mainPhoneNumber: String,
    additionalPhoneNumber: String,
    partnerName: String,
    partnerLegalName: String,
    country: String,
    fax: String,
    email: String,
  },

  methods: {
    closeModal() {
      this.$emit('closeEditingPartner')
    }
  }
}
</script>

<style>

</style>