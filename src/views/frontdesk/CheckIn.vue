<template>
  <div class="modal"
  >
    <div class="modal-div">
      <h3>Регистрация гостя</h3>
      <div class="divider"/>
      <h4>Основная информация</h4>
      <div class="form-3">
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
          <label for="input">Гражданство</label>
          <el-select v-model="value">
            <el-option
              v-for="(position, idx) in optiopns1"
              :key="idx"
              :label="position.label"
              :value="position.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Дата рождения</label>
          <el-date-picker
            style="width: 100% !important;"
            v-model="birthDate"
            type="date"
            placeholder="Введите дату рождения"
            format="dd/MM/yyyy"
          >
          </el-date-picker>
        </div>

        <div class="w-100">
          <label for="input">Пол</label>
          <el-select v-model="value">
            <el-option
              v-for="(position, idx) in optiopns1"
              :key="idx"
              :label="position.label"
              :value="position.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="divider"/>
      <h4>Заезд и выезд</h4>

      <div class="form-2">
        <div class="w-100">
          <label for="input">Дата и время заезда</label>
          <div class="w-100-r">
            <el-date-picker
              class="calendar"
              disabled
              v-model="nowDate"
              type="date"
              placeholder="Выберите дату"
              format="dd/MM/yyyy"
            >
            </el-date-picker>

            <el-time-select
              class="time"
              v-model="nowTime"
              disabled
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
              placeholder="--:--"
            >
            </el-time-select>
          </div>
        </div>

        <div class="w-100">
          <label for="input">Дата и время выезда</label>
          <div class="w-100-r">
            <el-date-picker
            class="calendar"
              v-model="coDate"
              type="date"
              placeholder="Выберите дату выезда"
              format="dd/MM/yyyy"
            >
            </el-date-picker>

            <el-time-select
              class="time"
              v-model="coTime"
              :picker-options="{
                start: '00:00',
                step: '00:01',
                end: '23:59'
              }"
              placeholder="--:--"
            >
            </el-time-select>
          </div>
        </div>
      </div>


      <div class="divider"/>
      <h4>Комната</h4>

      <div class="form-2">
        <div class="w-100">
          <label for="input">Категория номера</label>
          <el-select
            v-model="value"
            placeholder="Выберите категорию"
          >
            <el-option
              v-for="(perms, idx) in optiopns3"
              :key="idx"
              :label="perms.label"
              :value="perms.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Номер</label>
          <el-select
            v-model="value"
            placeholder="Выберите номер"
          >
            <el-option
              v-for="(perms, idx) in optiopns3"
              :key="idx"
              :label="perms.label"
              :value="perms.value">
            </el-option>
          </el-select>
        </div>
      </div>


<!-- Children inputs -->

      <div class="divider"/>
      <div class="title-div">
        <el-checkbox v-model="checked"><h4>Дети</h4></el-checkbox>
      </div>

      <div
        v-show="checked"
        v-for="(child, idx) in children" :key="idx"
        style="
          width: 100%; display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          justify-content: center;;"
      >
        <div class="form-3">
          <div class="w-100">
            <label for="input">Фамилия ребенка</label>
            <el-input placeholder="Введите фамилию ребенка" v-model="child.childLastName">
            </el-input>
          </div>

          <div class="w-100">
            <label for="input">Имя ребенка</label>
            <el-input placeholder="Введите имя ребенка" v-model="child.childName">
            </el-input>
          </div>

          <div class="w-100">
            <label for="input">Отчество ребенка</label>
            <el-input placeholder="Введите отчество ребенка" v-model="child.childFamilyName">
            </el-input>
          </div>
        </div>

        <div class="form-2">
          <div class="w-100">
            <label for="input">Пол ребенка</label>
            <el-select
              v-model="child.childSex"
              placeholder="Выберите пол ребенка"
            >
              <el-option
                v-for="(perms, idx) in optiopns3"
                :key="idx"
                :label="perms.label"
                :value="perms.value">
              </el-option>
            </el-select>
          </div>
          <div class="w-100">
            <label for="input">Дата рождения ребенка</label>
            <el-date-picker
            class="calendar"
              style="width: 100% !important;"
              v-model="child.childBirthDate"
              type="date"
              placeholder="Введите дату рождения ребенка"
              format="dd/MM/yyyy"
            >
            </el-date-picker>
          </div>
        </div>
        
        <div class="input-grid-btns">
          <button
            class="ghost-btn-danger"
            @click="removeChild(idx)"
            v-show="idx || ( !idx && children.length > 1)"
          >
            <img src="@/assets/icons/removePerson-sm.svg" alt="">
            <span>Удалить</span>
          </button>

          <button
            class="ghost-btn"
            @click="addChild(idx)"
            v-show="idx == children.length-1"
          >
            <img src="@/assets/icons/addPerson-sm.svg" alt="">
            <span>Добавить</span>
          </button>
        </div>
      </div>

      <div class="input-grid-btns">
        <button class="sec-btn" @click="closeModal">
          <span>Отмена</span>
        </button>

        <button class="prim-btn" type="submit">
          <span>Разместить</span>
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
  name: 'CheckIn',
  data: () => ({
    value1: '',
    optiopns1: '',
    optiopns2: '',
    optiopns3: '',
    optiopns4: '',
    optiopns5: '',
    optiopns6: '',
    optiopns7: '',
    optiopns8: '',
    optiopns9: '',
    optiopns10: '',
    optiopns11: '',
    optiopns12: '',
    lastName: '',
    name: '',
    familyName: '',
    birthDate: '',
    ciDate: "{{nowDate}}",
    ciTime: '',
    coDate: '',
    coTime: '',
    checked: false,

    children: [{
      childName: '',
      childLastName: '',
      childFamilyName: '',
      childSex: '',
      childBirthDate: '',
    }]
  }),

  computed: {
    nowDate() {
      const current = new Date()
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`
      return date
    },

    nowTime() {
      const current = new Date()
      const time = `${current.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
      return time
    },
  },

  methods: {
    closeModal() {
      this.$emit('close', this.checkIn = false)
    },

    addChild () {
      this.children.push({
        childName: '',
        childLastName: '',
        childFamilyName: '',
        childSex: '',
        childBirthDate: '',
      })
    },

    removeChild (index) {
      this.children.splice(index, 1)
    },

    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
  }
}
</script>

<style>

</style>