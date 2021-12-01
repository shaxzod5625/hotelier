<template>
  <div class="modal"
  >
    <div class="modal-div">
      <h3>Редактирвание</h3>
      <div class="divider"/>
      <div class="form-2">
        <div class="w-100">
          <label for="input">Должность</label>
          <el-select
            v-model="employee.position"
            :class="{invalid: ($v.employee.position.$dirty && !$v.employee.position.required)}"
          >
            <el-option
              v-for="(type, idx) in positions"
              :key="idx"
              :label="type.label"
              :value="type.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.employee.position.$dirty && !$v.employee.position.required" class="validation-error">Пожалуйста, выберите должность</span>
        </div>

        <div class="w-100">
          <label for="input">Позиция</label>
          <el-select
            v-model="employee.subPosition"
            :class="{invalid: ($v.employee.subPosition.$dirty && !$v.employee.subPosition.required)}"
          >
            <el-option
              v-for="(sub, idx) in subPositions"
              :key="idx"
              :label="sub.label"
              :value="sub.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.employee.subPosition.$dirty && !$v.employee.subPosition.required" class="validation-error">Пожалуйста, выберите позицию</span>
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
            v-model="employee.lastName"
            :class="{invalid: ($v.employee.lastName.$dirty && !$v.employee.lastName.required)}"
          />
          <span v-if="$v.employee.lastName.$dirty && !$v.employee.lastName.required" class="validation-error">Пожалуйста, введите фамилию</span>
        </div>

        <div class="w-100">
          <label for="input">Имя</label>
          <el-input
            placeholder="Введите имя"
            v-model="employee.name"
            :class="{invalid: ($v.employee.name.$dirty && !$v.employee.name.required)}"
          />
          <span v-if="$v.employee.name.$dirty && !$v.employee.name.required" class="validation-error">Пожалуйста, введите имя</span>
        </div>

        <div class="w-100">
          <label for="input">Отчество</label>
          <el-input
            placeholder="Введите отчество"
            v-model="employee.familyName"
            :class="{invalid: ($v.employee.familyName.$dirty && !$v.employee.familyName.required)}"
          />
          <span v-if="$v.employee.familyName.$dirty && !$v.employee.familyName.required" class="validation-error">Пожалуйста, введите отчество</span>
        </div>

        <div class="w-100">
          <label for="input">Пол</label>
          <el-select
            v-model="employee.gender"
            :class="{invalid: ($v.employee.gender.$dirty && !$v.employee.gender.required)}"
          >
            <el-option
              v-for="(type, idx) in genders"
              :key="idx"
              :label="type.label"
              :value="type.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.employee.gender.$dirty && !$v.employee.gender.required" class="validation-error">Пожалуйста, выберите пол</span>
        </div>

        <div class="w-100">
          <label for="input">Номер телефона</label>
          <el-input
            placeholder="Введите номер телефона"
            v-model="employee.phoneNumber"
            v-mask="'+### (##) ###-##-##'"
            :class="{invalid: ($v.employee.phoneNumber.$dirty && !$v.employee.phoneNumber.required) || ($v.employee.phoneNumber.$dirty && !$v.employee.phoneNumber.minLength)}"
          />
          <span v-if="$v.employee.phoneNumber.$dirty && !$v.employee.phoneNumber.required" class="validation-error">Пожалуйста, введите номер телефона</span>
          <span v-else-if="$v.employee.phoneNumber.$dirty && !$v.employee.phoneNumber.minLength" class="validation-error">Пожалуйста, введите правильный формат номера телефона</span>
        </div>

        <div class="w-100">
          <label for="input">E-mail адрес</label>
          <el-input
            placeholder="Введите e-mail адрес"
            v-model="employee.email"
            :class="{invalid: ($v.employee.email.$dirty && !$v.employee.email.required) || ($v.employee.email.$dirty && !$v.employee.email.email)}"
          />
          <span v-if="$v.employee.email.$dirty && !$v.employee.email.required" class="validation-error">Пожалуйста, введите e-mail адрес</span>
          <span v-else-if="$v.employee.email.$dirty && !$v.employee.email.email" class="validation-error">Пожалуйста, введите правильный формат e-mail адреса</span>
        </div>

        <div class="w-100">
          <label for="input">Логин</label>
          <el-input
            placeholder="Задайте логин"
            v-model="employee.login"
            :class="{invalid: ($v.employee.login.$dirty && !$v.employee.login.required) || loginExist}"
          />
          <span v-if="$v.employee.login.$dirty && !$v.employee.login.required" class="validation-error">Пожалуйста, задайте логин</span>
          <span v-if="loginExist" class="validation-error">Логин уже занятю Пожалуйста, придумайте другой логин</span>
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
            v-model="employee.languages"
            multiple
            style="margin-left: 20px;"
            placeholder="Выберите языки"
            :class="{invalid: ($v.employee.languages.$dirty && !$v.employee.languages.required)}"
          >
            <el-option
              v-for="(language, idx) in languagesList"
              :key="idx"
              :label="language.label"
              :value="language.value">
            </el-option>
          </el-select>
          <span v-if="$v.employee.languages.$dirty && !$v.employee.languages.required" class="validation-error">Пожалуйста, выберите языки</span>
        </div>
      </div>

      <div class="input-grid-btns">
        <button class="sec-btn" @click="closeModal">
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="editEmployee"
        >
          <span>Сохранить</span>
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
  name: 'EditingEmployee',

  data: () => ({
    password: '',
    passwordConfirmation: '',

    loginExist: false,

    subPositions: [
      {label: 'Главный', value: 'main'},
      {label: 'Старший', value: 'senior'},
      {label: 'Младший', value: 'junior'},
      {label: 'Дневной', value: 'dayshift'},
      {label: 'Ночной', value: 'nightshift'}
    ],
    
    positions: [
      {label: 'Менеджер', value: 'managers'},
      {label: 'Администратор', value: 'receptionists'},
      {label: 'Заведующий залом', value: 'restaurantManagers'},
      {label: 'Горничная', value: 'maids'},
      {label: 'Официант', value: 'waiters'},
      {label: 'Повар', value: 'cooks'}
    ],

    genders: [
      {label: 'Мужчина', value: 'male'},
      {label: 'Женщина', value: 'female'},
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
    employee: {
      position: {required},
      subPosition: {required},
      lastName: {required},
      name: {required},
      familyName: {required},
      gender: {required},
      phoneNumber: {required, minLength: minLength(19)},
      email: {required, email},
      login: {required},
      languages: {required},
    },
      password: {required, minLength: minLength(8)},
      passwordConfirmation: {required},
  },

  props: {
    employee: Object,
  },

  computed: {
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
      this.$emit('closeEdit')
    },

    async editEmployee() {

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const employee = {
        position: this.employee.position,
        subPosition: this.employee.subPosition,
        lastName: this.employee.lastName,
        name: this.employee.name,
        familyName: this.employee.familyName,
        gender: this.employee.gender,
        phoneNumber: this.employee.phoneNumber,
        email: this.employee.email,
        login: this.employee.login,
        password: this.password,
        languages: this.employee.languages,
        id: this.employee._id,
      }

      
      try {
        await this.$store.dispatch('editEmployee', employee)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeEdit')
      this.$message({
        message: "Изменения сохранены",
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>