<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Новый партнер</h3>
      <div class="divider"></div>

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Имя</label>
          <el-input
            v-model="partnerName"
            placeholder="Введите имя партнера"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Фамилия</label>
          <el-input
            v-model="partnerLastName"
            placeholder="Введите фамилию партнера"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Отчество</label>
          <el-input
            v-model="partnerFamilyName"
            placeholder="Введите отчество партнера"
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

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Номер договора</label>
          <el-input
            v-model="contractNumber"
            placeholder="Введите номер договора"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Дата заключения договора</label>
          <el-date-picker
            class="calendar-100"
            v-model="contractStartDate"
            type="date"
            placeholder="Введите дату заключения договора"
            format="dd/MM/yyyy"
          >
          </el-date-picker>
        </div>

        <div class="w-100">
          <label for="input">Дата окончания срока договора</label>
          <el-date-picker
            class="calendar-100"
            v-model="contractStopDate"
            type="date"
            placeholder="Введите дату окончания срока договора"
            format="dd/MM/yyyy"
          >
          </el-date-picker>
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
          Добавить
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
  name: 'NewAgentPartner',

  data:() => ({
    partnerName: '',
    partnerLegalName: '',
    country: '',
    mainPhoneNumber: '',
    additionalPhoneNumber: '',
    fax: '',
    email: '',
    contractNumber: '',
    contractStartDate: '',
    contractStopDate: '',

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

  methods: {
    closeModal() {
      this.$emit('closeAddPartner')
    }
  }
}
</script>

<style>

</style>