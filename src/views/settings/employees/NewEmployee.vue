<template>
  <div class="modal"
  >
    <div class="modal-div">
      <h3>Новый сотрудник</h3>
      <div class="divider"/>
      <div class="form-2">
        <div class="w-100">
          <label for="input">Должность</label>
          <el-select v-model="pstn">
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
          <el-select v-model="pstn">
            <el-option
              v-for="(position, idx) in positions"
              :key="idx"
              :label="position.label"
              :value="position.value"
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
          <el-input placeholder="Введите имя" v-model="lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Отчество</label>
          <el-input placeholder="Введите отчество" v-model="lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Пол</label>
          <el-select v-model="pstn">
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
          <label for="input">Номер телефона</label>
          <el-input placeholder="Введите номер телефона" v-model="lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">E-mail адрес</label>
          <el-input placeholder="Введите e-mail адрес" v-model="lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Логин</label>
          <el-input placeholder="Задайте логин, например (login@hotelname.uz)" v-model="lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Пароль</label>
          <el-input placeholder="Придумайте пароль" v-model="lastName">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Подтверждение пароля</label>
          <el-input placeholder="Введите пароль повторно" v-model="lastName">
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
            v-model="dashVal"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Выберите языки"
          >
            <el-option
              v-for="(perms, idx) in dashPermission"
              :key="idx"
              :label="perms.label"
              :value="perms.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="input-grid-btns">
        <button class="sec-btn" @click="closeModal">
          <span>Отмена</span>
        </button>

        <button class="prim-btn" type="submit">
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

  methods: {
    closeModal() {
      this.$emit('close', this.addEmployee = false)
    },
  }
}
</script>

<style>

</style>