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
          <el-select v-model="subPosition" placeholder="Выберите позицию">
            <el-option
              v-for="(subPosition, idx) in subPositions"
              :key="idx"
              :label="subPosition.label"
              :value="subPosition.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div
        class="form-3"
        style="margin: 0;"
      >
        <div class="w-100">
          <label for="input">Фамилия</label>
          <el-input placeholder="Введите фамилию" v-model="lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Имя</label>
          <el-input placeholder="Введите имя" v-model="name">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Отчество</label>
          <el-input placeholder="Введите отчество" v-model="familyName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Пол</label>
          <el-select v-model="gender" placeholder="Выберите пол">
            <el-option
              v-for="(gender, idx) in genders"
              :key="idx"
              :label="gender.label"
              :value="gender.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Номер телефона</label>
          <el-input
            placeholder="Введите номер телефона"
            v-model="phoneNumber"
            v-mask="'+### (##) ###-##-##'"
          />
        </div>

        <div class="w-100">
          <label for="input">E-mail адрес</label>
          <el-input
            placeholder="Введите e-mail адрес"
            v-model="email"
          />
        </div>

        <div class="w-100">
          <label for="input">Логин</label>
          <el-input :placeholder="placeholder" v-model="login">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Пароль</label>
          <el-input placeholder="Придумайте пароль" v-model="password">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Подтверждение пароля</label>
          <el-input placeholder="Введите пароль повторно" v-model="passwordConfirmation">
          </el-input>
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
          >
            <el-option
              v-for="(language, idx) in languagesList"
              :key="idx"
              :label="language.label"
              :value="language.value">
            </el-option>
          </el-select>
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
export default {
  name: 'NewEmployee',

  data:() => ({
    hotelName: '',

    subPosition: '',
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

  props: {
    position: Object
  },

  computed: {
    loginHotelName() {
      this.hotelName = JSON.parse(window.sessionStorage.currentUser).user.hotel
    },

    placeholder() {
      return `Задайте логин, например (login@${this.hotelName})`
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
    },

    async newEmployee() {
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

      await this.$store.dispatch('newEmployee', employee)

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

      this.$message({
        message: "Новый сотрудник добавлен",
        type: 'success'
      })

      this.$emit('refresh')
      this.$emit('close')
    },

  }
}
</script>

<style>

</style>