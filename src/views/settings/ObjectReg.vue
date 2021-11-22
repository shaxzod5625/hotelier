<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Объект размещения</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <form class="input-grid">
      <div class="col-3">
        <div class="w-33">
          <label for="select">Категория объекта размещения</label>
          <el-select v-model="catvalue" :class="{invalid: ($v.catvalue.$dirty && !$v.catvalue.required)}" type="text" placeholder="Выберите категорию объекта размещения">
            <el-option
              v-for="obj in objregistration"
              :key="obj.id"
              :label="obj"
              :value="obj">
            </el-option>
          </el-select>
          <span v-if="$v.catvalue.$dirty && !$v.catvalue.required" class="validation-error">Пожалуйста, выберите категорию</span>
        </div>

        <div class="w-33">
          <label for="input">Название объекта размещения</label>
          <el-input type="text" placeholder="Введите название объекта размещения" v-model="CompanyName" :class="{invalid: ($v.CompanyName.$dirty && !$v.CompanyName.required)}"></el-input>
          <span v-if="$v.CompanyName.$dirty && !$v.CompanyName.required" class="validation-error">Пожалуйста, введите название</span>
        </div>

        <div class="w-33">
          <label for="select">Количество звезд</label>
          <el-select type="text" v-model="starvalue" :class="{invalid: ($v.starvalue.$dirty && !$v.starvalue.required)}" placeholder="Выберите количество звезд">
            <el-option
              v-for="str in givenstars"
              :key="str.id"
              :label="str.stars"
              :value="str.starvalue"
            >
            </el-option>
          </el-select>
          <span v-if="$v.starvalue.$dirty && !$v.starvalue.required" class="validation-error">Пожалуйста, выберите количество звезд</span>
        </div>
      </div>

      <div class="col-2">
        <div class="w-100">
          <label for="input">Адрес объекта размещения</label>
          <el-input type="text" placeholder="Введите адрес объекта размещения" :class="{invalid: ($v.coordinates.$dirty && !$v.coordinates.required)}" v-model="coordinates"></el-input>
          <span v-if="$v.coordinates.$dirty && !$v.coordinates.required" class="validation-error">Пожалуйста, укажите адрес</span>
        </div>

        <div
          class="w-100"
          style="width: 48px"
        >
          <label style="opacity: 0" for="input">Label</label>
          <button
            class="sqr-btn-prim"
          >
            <img src="@/assets/icons/Location.svg" alt="">
          </button>
        </div>
      </div>


      <div class="col-3">
        <div class="w-33">
          <label for="input">Основной номер телефона</label>
          <el-input
            placeholder="Введите основной номер телефона"
            :class="{invalid: ($v.MainPhoneNumber.$dirty && !$v.MainPhoneNumber.required)}"
            v-model="MainPhoneNumber"
            v-mask="'+###(##) ###-##-##'"
          />
          <span v-if="$v.MainPhoneNumber.$dirty && !$v.MainPhoneNumber.required" class="validation-error">Пожалуйста, укажите номер</span>
        </div>

        <div class="w-33">
          <label for="input">Дополнительный номер телефона</label>
          <el-input
            placeholder="Введите дополнительный номер телефона"
            v-model="AdditPhoneNumber"
            v-mask="'+###(##) ###-##-##'"
          />
        </div>

        <div class="w-33">
          <label for="input">Номер факса</label>
          <el-input
            placeholder="Введите номер факса"
            v-model="FaxNumber"
            v-mask="'+###(##) ###-##-##'"
          />
        </div>
      </div>

      <div class="col-3">
        <div class="w-33">
          <label for="input">Основной e-mail адрес</label>
          <el-input type="email" placeholder="Введите основной e-mail адрес" :class="{invalid: ($v.MainEmail.$dirty && !$v.MainEmail.required)}" v-model="MainEmail"></el-input>
          <span v-if="$v.MainEmail.$dirty && !$v.MainEmail.required" class="validation-error">Пожалуйста, укажите e-mail адрес</span>
        </div>

        <div class="w-33">
          <label for="input">Дополнительный e-mail адрес</label>
          <el-input type="email" placeholder="Введите дополнительный e-mail адрес" v-model="AdditEmail"></el-input>
        </div>

        <div class="w-33">
          <label for="input">Почтовый индекс</label>
          <el-input
            placeholder="Введите почтовый индекс"
            v-model="MailIndex"
            v-mask="'######'"
          />
        </div>
      </div>

      <h3>{{myRegisteredObject}}</h3>

      <div class="input-grid-btns">
        <button class="sec-btn" @click.prevent="onCancel">
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="saveMyObject"  
        >
          <span>Сохранить</span>
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import {email, required} from 'vuelidate/lib/validators'

export default {
  name: 'Registration',

  data: () => ({

    objregistration: ['Hotel', 'Hostel', 'Motel', 'Guest-House', 'Sanatorium'],
    givenstars: [
      {stars: 'Нет',
        starvalue: '0'},
      {stars: '⭐',
        starvalue: '1'},
      {stars: '⭐⭐',
        starvalue: '2'},
      {stars: '⭐⭐⭐',
        starvalue: '3'},
      {stars: '⭐⭐⭐⭐',
        starvalue: '4'},
      {stars: '⭐⭐⭐⭐⭐',
        starvalue: '5'},
    ],

    catvalue: '',
    starvalue: '',
    CompanyName: '',
    coordinates: '',
    MainPhoneNumber: '',
    AdditPhoneNumber: '',
    FaxNumber: '',
    MainEmail: '',
    AdditEmail: '',
    MailIndex: '',
  }),

  validations: {
    catvalue: {required},
    starvalue: {required},
    CompanyName: {required},
    coordinates: {required},
    MainPhoneNumber: {required},
    MainEmail: {required, email}
  },

  methods: {
    async saveMyObject() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const myObject = {
        typeOfObject: this.catvalue,
        name: this.CompanyName,
        rating: this.starvalue,
        address: this.coordinates,
        mainPhone: this.MainPhoneNumber,
        emailAddress: this.MainEmail,
        extraPhone: this.AdditPhoneNumber,
        faks: this.FaxNumber,
        extraEmailAddress: this.AdditEmail,
        emailIndex: this.MailIndex
      }

      await this.$store.dispatch('objectReg', myObject)

      console.log(myObject);
    },

    onCancel(){
        this.show = false;
        this.$router.push('/settings');
    }
  },

  computed: {
    myRegisteredObject() {
      if(window.sessionStorage.myObject === null || window.sessionStorage.myObject === undefined) {
        return ''
      } else {
        this.catvalue = JSON.parse(window.sessionStorage.myObject).objectRegister.typeOfObject
        this.starvalue = String(JSON.parse(window.sessionStorage.myObject).objectRegister.rating)
        this.CompanyName = JSON.parse(window.sessionStorage.myObject).objectRegister.name
        this.coordinates = JSON.parse(window.sessionStorage.myObject).objectRegister.address
        this.MainPhoneNumber = JSON.parse(window.sessionStorage.myObject).objectRegister.mainPhone
        this.AdditPhoneNumber = JSON.parse(window.sessionStorage.myObject).objectRegister.extraPhone
        this.FaxNumber = JSON.parse(window.sessionStorage.myObject).objectRegister.faks
        this.MainEmail = JSON.parse(window.sessionStorage.myObject).objectRegister.emailAddress
        this.AdditEmail = JSON.parse(window.sessionStorage.myObject).objectRegister.extraEmailAddress
        this.MailIndex = JSON.parse(window.sessionStorage.myObject).objectRegister.emailIndex
      }
    }
  }
}
</script>