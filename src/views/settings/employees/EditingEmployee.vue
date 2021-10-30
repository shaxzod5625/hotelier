<template>
  <div class="modal"
  >
    <div class="modal-div">
      <h3>Редактирвание</h3>
      <div class="divider"/>
      <div class="form-2">
        <div class="w-100">
          <label for="input">Должность</label>
          <el-select v-model="post">
            <el-option
              v-for="(pst, idx) in posts"
              :key="idx"
              :label="pst.label"
              :value="pst.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Позиция</label>
          <el-select v-model="position">
            <el-option
              v-for="(pstn, idx) in positions"
              :key="idx"
              :label="pstn.label"
              :value="pstn.value"
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
          <el-select v-model="sex">
            <el-option
              v-for="(sx, idx) in sexes"
              :key="idx"
              :label="sx.label"
              :value="sx.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Номер телефона</label>
          <el-input placeholder="Введите номер телефона" v-model="phoneNumber">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">E-mail адрес</label>
          <el-input placeholder="Введите e-mail адрес" v-model="email">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Логин</label>
          <el-input type="email" placeholder="Задайте логин, например (login@hotelname.uz)" v-model="login">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Пароль</label>
          <el-input type="password" placeholder="Придумайте пароль" v-model="password">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Подтверждение пароля</label>
          <el-input type="password" placeholder="Введите пароль повторно" v-model="repeatPassword">
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
            v-model="langs"
            multiple
            style="margin-left: 20px;"
            placeholder="Выберите языки"
          >
            <el-option
              v-for="(lng, idx) in languages"
              :key="idx"
              :label="lng.label"
              :value="lng.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="input-grid-btns">
        <button class="sec-btn" @click="closeModal">
          <span>Отмена</span>
        </button>

        <button class="prim-btn" type="submit">
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
    
    posts: [
      {label: 'Менеджер', value: 'Менеджер'},
      {label: 'Администратор', value: 'Администратор'},
      {label: 'Заведующий залом', value: 'Заведующий залом'},
      {label: 'Горничная', value: 'Горничная'},
      {label: 'Официант', value: 'Официант'},
      {label: 'Повар', value: 'Повар'}
    ],
    positions: [
      {label: 'Старший', value: 'asd'},
      {label: 'Младший', value: 'asd1'},
      {label: 'Ночной', value: 'asd2'},
      {label: 'Дневной', value: 'asd3'},
      {label: 'Главный', value: 'asd4'}
    ],
    sexes: [
      {label: 'Мужчина', value: 'Мужчина'},
      {label: 'Женщина', value: 'Женщина'},
    ],
    languages: [
      {label: 'Russian', value: 'Russian'},
      {label: 'Uzbek', value: 'Uzbek'},
      {label: 'English', value: 'English'},
    ]
  }),

  props: {
    lastName: String,
    name: String,
    familyName: String,
    position: String,
    post: String,
    sex: String,
    phoneNumber: Number,
    email: String,
    login: String,
    password: String,
    repeatPassword: String,
    langs: Array,
  },

  methods: {
    closeModal() {
      this.$emit('closeEdit', this.editEmployee = false)
    },
  }
}
</script>

<style>

</style>