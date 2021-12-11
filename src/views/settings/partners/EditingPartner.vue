<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Редактирование партнера</h3>
      <div class="divider"></div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Краткое название партнера</label>
          <el-input
            v-model="name"
            placeholder="Введите краткое название партнера"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          />
          <span v-if="$v.name.$dirty && !$v.name.required" class="validation-error">Пожалуйста, введите краткое название партнера</span>
        </div>

        <div class="w-100">
          <label for="input">Юридическое название партнера</label>
          <el-input
            v-model="legalName"
            placeholder="Введите юридическое название партнера"
            :class="{invalid: ($v.legalName.$dirty && !$v.legalName.required)}"
          />
          <span v-if="$v.legalName.$dirty && !$v.legalName.required" class="validation-error">Пожалуйста, введите юридическое название партнера</span>
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
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          />
          <span
            v-if="($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)"
            class="validation-error"
          >
            Пожалуйста, введите e-mail партнера
          </span>
        </div>
      </div>

<!-- //////////////Hidden computed////////////// -->
      <h4 style="display: none">{{setInfo}}</h4>
<!-- /////////////////////////////////////////// -->

      <div class="input-grid-btns">
        <button
          @click="closeModal"
          class="sec-btn"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="editPartner"
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
import {required, email, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'EditingPartner',

  data:() => ({
    name: '',
    legalName: '',
    country: '',
    mainPhoneNumber: '',
    additionalPhoneNumber: '',
    fax: '',
    email: '',
  }),

  props: {
    partner: Object,
    type: String
  },

  validations: {
    name: {required},
    legalName: {required},
    country: {required},
    mainPhoneNumber: {required, minLength: minLength(19)},
    email: {required, email}
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

    setInfo() {
      this.name = this.partner.shortName,
      this.legalName = this.partner.legalName,
      this.country = this.partner.country,
      this.mainPhoneNumber = this.partner.phoneNumber,
      this.additionalPhoneNumber = this.partner.extraNumber,
      this.fax = this.partner.fax,
      this.email = this.partner.email
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeEditingPartner')
    },
    
    async editPartner() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const chosenPartner = {
        type: this.type,
        id: this.partner._id,
        shortName: this.name,
        legalName: this.legalName,
        country: this.country,
        phoneNumber: this.mainPhoneNumber,
        extraNumber: this.additionalPhoneNumber,
        fax: this.fax,
        email: this.email,
      }

      try{
        await this.$store.dispatch('editPartner', chosenPartner)
      } catch {}

      try {
        await this.$store.dispatch('getPartnersInfo')
      } catch {}

      this.$emit('refresh')
      this.$emit('closeEditingPartner')
      this.$message({
        message: 'Изменная информация партнера сохранена',
        type: 'success'
      })
    },

  },
}
</script>

<style>

</style>