<template>
  <div class="modal"
  >
    <div class="modal-div">
      <h3>Редактирвание</h3>
      <div class="divider"/>
      <div class="form-2">
        <div class="w-100">
          <label for="input">Должность</label>
          <el-select v-model="employee.position">
            <el-option
              v-for="(position, idx) in positions"
              :key="idx"
              :label="position.label"
              :value="position.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Позиция</label>
          <el-select v-model="employee.subPosition">
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
          <el-input placeholder="Введите фамилию" v-model="employee.lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Имя</label>
          <el-input placeholder="Введите имя" v-model="employee.name">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Отчество</label>
          <el-input placeholder="Введите отчество" v-model="employee.familyName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Пол</label>
          <el-select v-model="employee.gender">
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
            v-model="employee.phoneNumber"
            v-mask="'+### (##) ###-##-##'"
          />
        </div>

        <div class="w-100">
          <label for="input">E-mail адрес</label>
          <el-input placeholder="Введите e-mail адрес" v-model="employee.email">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Логин</label>
          <el-input type="email" placeholder="Задайте логин, например (login@hotelname.uz)" v-model="employee.login">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Пароль</label>
          <el-input
            placeholder="Придумайте пароль"
            v-model="password"
          />
        </div>

        <div class="w-100">
          <label for="input">Подтверждение пароля</label>
          <el-input
            placeholder="Введите пароль повторно"
            v-model="passwordConfirmation"
          />
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
export default {
  name: 'EditingEmployee',

  data: () => ({
    password: '',
    passwordConfirmation: '',

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

  props: {
    employee: Object,
  },

  methods: {
    closeModal() {
      this.$emit('closeEdit')
    },

    async editEmployee() {
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

      await this.$store.dispatch('editEmployee', employee)

      await this.$store.dispatch('getMyEmployeesManagers')
      await this.$store.dispatch('getMyEmployeesRestaurantManagers')
      await this.$store.dispatch('getMyEmployeesReceptionists')
      await this.$store.dispatch('getMyEmployeesWaiters')
      await this.$store.dispatch('getMyEmployeesMaids')
      await this.$store.dispatch('getMyEmployeesCooks')

      this.$message({
        message: "Изменения сохранены",
        type: 'success'
      })

      this.$emit('closeEdit')
      this.$emit('refresh')
    }
  }
}
</script>

<style>

</style>