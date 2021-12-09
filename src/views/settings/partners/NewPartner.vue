<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Новый партнер</h3>
      <div class="divider"></div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Краткое название партнера</label>
          <el-input
            v-model="partnerName"
            placeholder="Введите краткое название партнера"
            :class="{invalid: ($v.partnerName.$dirty && !$v.partnerName.required)}"
          />
          <span v-if="$v.partnerName.$dirty && !$v.partnerName.required" class="validation-error">Пожалуйста, введите краткое название партнера</span>
        </div>

        <div class="w-100">
          <label for="input">Юридическое название партнера</label>
          <el-input
            v-model="partnerLegalName"
            placeholder="Введите юридическое название партнера"
            :class="{invalid: ($v.partnerLegalName.$dirty && !$v.partnerLegalName.required)}"
          />
          <span v-if="$v.partnerLegalName.$dirty && !$v.partnerLegalName.required" class="validation-error">Пожалуйста, введите юридическое название партнера</span>
        </div>
      </div>

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Страна</label>
          <el-select
            v-model="country"
            filterable
            placeholder="Выберите страну партнера"
            :class="{invalid: ($v.country.$dirty && !$v.country.required)}"
          >
            <el-option
              v-for="(cntry, idx) in countries"
              :key="idx"
              :label="cntry.label"
              :value="cntry.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.country.$dirty && !$v.country.required" class="validation-error">Пожалуйста, выберите страну партнера</span>
        </div>

        <div class="w-100">
          <label for="input">Номер телефона</label>
          <el-input
            v-model="mainPhoneNumber"
            v-mask="'+998 (##) ###-##-##'"
            placeholder="Введите номер телефона"
            :class="{invalid: ($v.mainPhoneNumber.$dirty && !$v.mainPhoneNumber.required) || ($v.mainPhoneNumber.$dirty && !$v.mainPhoneNumber.minLength)}"
          />
          <span
            v-if="($v.mainPhoneNumber.$dirty && !$v.mainPhoneNumber.required) || ($v.mainPhoneNumber.$dirty && !$v.mainPhoneNumber.minLength)"
            class="validation-error"
          >
            Пожалуйста, введите номер телефона
          </span>
        </div>

        <div class="w-100">
          <label for="input">Дополнительный номер телефона</label>
          <el-input
            v-model="additionalPhoneNumber"
            v-mask="'+998 (##) ###-##-##'"
            placeholder="Введите дополнительный номер телефона"
          />
        </div>
      </div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Факс</label>
          <el-input
            v-model="fax"
            v-mask="'+998 (##) ###-##-##'"
            placeholder="Введите номер факса партнера"
          />
        </div>

        <div class="w-100">
          <label for="input">E-mail</label>
          <el-input
            v-model="email"
            placeholder="Введите e-mail партнера"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          />
          <span v-if="($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)" class="validation-error">Пожалуйста, введите e-mail партнера</span>
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
            v-mask="'##/##/####'"
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
            v-mask="'##/##/####'"
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
          @click="newPartner"
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
import {required, email, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'NewPartner',

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
  }),

  props: {
    type: String
  },

  validations: {
    partnerName: {required},
    partnerLegalName: {required},
    country: {required},
    mainPhoneNumber: {required, minLength: minLength(19)},
    email: {required, email},
  },

  computed: {
    countries() {
      const countryList = this.$store.state.countries

      return countryList.sort(function(a, b){
        let x = a.label.toLowerCase();
        let y = b.label.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeAddPartner')
    },

    async newPartner() {

      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const start = new Date(this.contractStartDate)
      const stop = new Date(this.contractStopDate)

      const partner = {
        type: this.type,
        shortName: this.partnerName,
        legalName: this.partnerLegalName,
        country: this.country,
        phoneNumber: this.mainPhoneNumber,
        extraNumber: this.additionalPhoneNumber,
        fax: this.fax,
        email: this.email,
        contractNumber: this.contractNumber,
        startedDate: start,
        finishedDate: stop
      }

      try {
        await this.$store.dispatch('newPartner', partner)
      } catch {}

      try {
        await this.$store.dispatch('getPartnersInfo')
      } catch {}

      this.$emit('refresh')
      this.$emit('closeAddPartner')
      this.$message({
        message: 'Новый партнер добавлен',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>