<template>
  <div class="modal"
  >
    <div class="modal-div">
      <h3>Новый сотрудник</h3>
      <div class="divider"/>
      <div class="form-2">
        <div class="w-100">
          <label for="input">Должность</label>
          <el-input
            v-model="position.label"
            disabled
          />
        </div>

        <div class="w-100">
          <label for="input">Позиция</label>
          <el-select
            v-model="subPosition"
            placeholder="Выберите позицию"
            default-first-option
            :class="{invalid: ($v.subPosition.$dirty && !$v.subPosition.required)}"
          >
            <el-option
              v-for="(type, idx) in subPositions"
              :key="idx"
              :label="type.label"
              :value="type.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.subPosition.$dirty && !$v.subPosition.required" class="validation-error">Пожалуйста, выберите позицию</span>
        </div>
      </div>

      <div
        class="form-3"
        style="margin: 0;"
      >
        <div class="w-100">
          <label for="input">Фамилия</label>
          <el-input
            placeholder="Введите фамилию"
            v-model="lastName"
            :class="{invalid: ($v.lastName.$dirty && !$v.lastName.required)}"
          />
          <span v-if="$v.lastName.$dirty && !$v.lastName.required" class="validation-error">Пожалуйста, введите фамилию</span>
        </div>

        <div class="w-100">
          <label for="input">Имя</label>
          <el-input
            placeholder="Введите имя"
            v-model="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          />
          <span v-if="$v.name.$dirty && !$v.name.required" class="validation-error">Пожалуйста, введите имя</span>
        </div>

        <div class="w-100">
          <label for="input">Отчество</label>
          <el-input
            placeholder="Введите отчество"
            v-model="familyName"
            :class="{invalid: ($v.familyName.$dirty && !$v.familyName.required)}"
          />
          <span v-if="$v.familyName.$dirty && !$v.familyName.required" class="validation-error">Пожалуйста, введите отчество</span>
        </div>

        <div class="w-100">
          <label for="input">Пол</label>
          <el-select
            v-model="gender"
            placeholder="Выберите пол"
            :class="{invalid: ($v.gender.$dirty && !$v.gender.required)}"
          >
            <el-option
              v-for="(type, idx) in genders"
              :key="idx"
              :label="type.label"
              :value="type.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.gender.$dirty && !$v.gender.required" class="validation-error">Пожалуйста, выберите пол</span>
        </div>

        <div class="w-100">
          <label for="input">Номер телефона</label>
          <el-input
            placeholder="Введите номер телефона"
            v-model="phoneNumber"
            v-mask="'+### (##) ###-##-##'"
            :class="{invalid: ($v.phoneNumber.$dirty && !$v.phoneNumber.required) || ($v.phoneNumber.$dirty && !$v.phoneNumber.minLength)}"
          />
          <span v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" class="validation-error">Пожалуйста, введите номер телефона</span>
          <span v-else-if="$v.phoneNumber.$dirty && !$v.phoneNumber.minLength" class="validation-error">Пожалуйста, введите правильный формат номера телефона</span>
        </div>

        <div class="w-100">
          <label for="input">E-mail адрес</label>
          <el-input
            placeholder="Введите e-mail адрес"
            v-model="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) || emailExists}"
          />
          <span v-if="$v.email.$dirty && !$v.email.required" class="validation-error">Пожалуйста, введите e-mail адрес</span>
          <span v-else-if="$v.email.$dirty && !$v.email.email" class="validation-error">Пожалуйста, введите правильный формат e-mail адреса</span>
          <span v-if="emailExists" class="validation-error">Профиль с таким e-mail адресом уже существует</span>
        </div>

        <div class="w-100">
          <label for="input">Логин</label>
          <el-input
            :placeholder="placeholder"
            v-model="login"
            :class="{invalid: ($v.login.$dirty && !$v.login.required)}"
          />
          <span v-if="$v.login.$dirty && !$v.login.required" class="validation-error">Пожалуйста, введите логин</span>
        </div>

        <div class="w-100">
          <label for="input">Пароль</label>
          <el-input
            placeholder="Придумайте пароль"
            v-model="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          />
          <span v-if="$v.password.$dirty && !$v.password.required" class="validation-error">Пожалуйста, придумайте пароль</span>
          <span v-else-if="$v.password.$dirty && !$v.password.minLength" class="validation-error">Пароль должен состоять из {{$v.password.$params.minLength.min}} символов минимум</span>
        </div>

        <div class="w-100">
          <label for="input">Подтверждение пароля</label>
          <el-input
            placeholder="Введите пароль повторно"
            v-model="passwordConfirmation"
            :class="{invalid: ($v.passwordConfirmation.$dirty && !$v.passwordConfirmation.required) || !checkPasswordSimilarity}"
          />
          <span v-if="$v.passwordConfirmation.$dirty && !$v.passwordConfirmation.required" class="validation-error">Пожалуйста, введите пароль повторно</span>
          <span v-else-if="!checkPasswordSimilarity" class="validation-error">Пароли не совпадают. Проверьте пожалуйста, пароль</span>
        </div>
      </div>

      <div
        class="form-1"
        style="margin-bottom: 0px;"
      >
        <div class="w-100">
          <label for="input">Знание языков</label>
          <el-select
            v-model="languages"
            multiple
            style="margin-left: 20px;"
            placeholder="Выберите языки"
            :class="{invalid: ($v.languages.$dirty && !$v.languages.required)}"
          >
            <el-option
              v-for="(language, idx) in languagesList"
              :key="idx"
              :label="language.label"
              :value="language.value">
            </el-option>
          </el-select>
          <span v-if="$v.languages.$dirty && !$v.languages.required" class="validation-error">Пожалуйста, выберите языки</span>
        </div>
      </div>

      <h3>{{loginHotelName}}</h3>

      <div class="input-grid-btns">
        <button class="sec-btn" @click="closeModal">
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="newEmployee"
        >
          <span>Добавить</span>
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
import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'NewEmployee',

  data:() => ({
    hotelName: '',

    emailExists: false,

    subPosition: 'main',
    lastName: '',
    name: '',
    familyName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    login: '',
    password: '',
    passwordConfirmation: '',
    languages: [],


    genders: [
      {label: 'Мужчина', value: 'male'},
      {label: 'Женщина', value: 'female'}
    ],
    subPositions: [
      {label: 'Главный', value: 'main'},
      {label: 'Старший', value: 'senior'},
      {label: 'Младший', value: 'junior'},
      {label: 'Дневной', value: 'dayshift'},
      {label: 'Ночной', value: 'nightshift'}
    ],
    languagesList: [
      {label: 'Английский', value: 'english'},
      {label: 'Казахский', value: 'kazakh'},
      {label: 'Киргизский', value: 'kyrgyz'},
      {label: 'Русский', value: 'russian'},
      {label: 'Украинский', value: 'ukrainian'},
      {label: 'Узбекский', value: 'uzbek'},
    ]
  }),

  validations: {
    subPosition: {required},
    lastName: {required},
    name: {required},
    familyName: {required},
    gender: {required},
    phoneNumber: {required, minLength: minLength(19)},
    email: {required, email},
    login: {required},
    password: {required, minLength: minLength(8)},
    passwordConfirmation: {required},
    languages: {required},
  },

  props: {
    position: Object
  },

  computed: {
    loginHotelName() {
      this.hotelName = JSON.parse(window.sessionStorage.currentUser).user.hotel
    },

    placeholder() {
      return `Задайте логин, например (login@${this.hotelName})`
    },

    checkPasswordSimilarity() {
      if(this.password === this.passwordConfirmation) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
    },

    async newEmployee() {

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const employee = {
        position: this.position,
        subPosition: this.subPosition,
        lastName: this.lastName,
        name: this.name,
        familyName: this.familyName,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
        email: this.email,
        login: this.login,
        password: this.password,
        languages: this.languages,
      }

      try {
        await this.$store.dispatch('newEmployee', employee)
      } catch {}

      if(this.position.value === 'manager') {
        await this.$store.dispatch('getMyEmployeesManagers')
      } else if (this.position.value === 'receptionist') {
        await this.$store.dispatch('getMyEmployeesReceptionists')
      } else if (this.position.value === 'restaurant-manager') {
        await this.$store.dispatch('getMyEmployeesRestaurantManagers')
      } else if (this.position.value === 'cook') {
        await this.$store.dispatch('getMyEmployeesCooks')
      } else if (this.position.value === 'maid') {
        await this.$store.dispatch('getMyEmployeesMaids')
      } else if (this.position.value === 'waiter') {
        await this.$store.dispatch('getMyEmployeesWaiters')
      }

      this.$emit('refresh')
      this.$emit('close')
      this.$message({
        message: "Новый сотрудник добавлен",
        type: 'success'
      })
    },

  }
}
</script>

<style>

</style>