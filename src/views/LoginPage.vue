<template>
  <div class="login-page">

    <transition name="component-fade" mode="out-in">
      <PreLoader
      style="z-index: 1000"
      v-if="preLoader"
      />
    </transition>

    <div class="blur-back">
      <div class="login-form">

        <div class="greetings">
          <h3>Добро пожаловать в Hotelier PMS</h3>
        </div>

        <div
          class="login-inputs"
          @keyup.enter="loginUser"
        >
          <div class="w-100">
            <el-input
              type="text"
              placeholder="Введите логин"
              v-model.trim="login"
              class="login-input"
              :class="{invalid: ($v.login.$dirty && !$v.login.required) || ($v.login.$dirty && !$v.login.email)}"
            />
            <span
              class="validation-error"
              v-if="$v.$dirty && !$v.login.required"
            >
              Пожалуйста, введите логин
            </span>
            <span
              class="validation-error"
              v-else-if="$v.login.$dirty && !$v.login.email"
            >
              Пожалуйста, введите корректный логин
            </span>
          </div>
          
          <div class="w-100">
            <el-input
              type="password"
              placeholder="Введите пароль"
              v-model.trim="password"
              class="password-input"
              :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
            />
            <span
              class="validation-error"
              v-if="$v.password.$dirty && !$v.password.required"
            >
              Пожалуйста, введите пароль
            </span>

            <span
              class="validation-error"
              v-else-if="$v.password.$dirty && !$v.password.minLength"
            >
              Длина пароли должен быть {{$v.password.$params.minLength.min}} символов
            </span>
          </div>
        </div>

        <div class="modal-btns">
          <button
            class="ghost-btn"
          >
            <span>Забыли пароль?</span>
          </button>

          <button
            class="prim-btn"
            @click="loginUser"
          >
            <span>Войти</span>
          </button>

        </div>
      </div>
    </div>
    <img src="@/assets/loginpageback.png" alt="">
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import PreLoader from '@/components/PreLoader.vue'

export default {
  name: 'LoginPage',

  components: {
    PreLoader
  },

  validations: {
    login: {required, email},
    password: {required, minLength: minLength(8)}
  },
  
  data: () => ({
    preLoader: false,
    login: '',
    password: '',
    link: 'http://mnogo.uz'
  }),

  computed: {
    
  },

  methods: {
    async loginUser() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.preLoader = true

      const logInfo = {
        login: this.login,
        password: this.password
      }

      try {
        await this.$store.dispatch('loginUser', logInfo)
      } catch(e) {console.log(e);}

      if(JSON.parse(window.sessionStorage.currentUser) === 'Invalid Credentials') {
        this.$message.error('Не верный логин. Проверьте, пожалуйста, логин')
        this.preLoader = false
        return
      } else if(JSON.parse(window.sessionStorage.currentUser).error === "invalid password") {
        this.$message.error('Не верный пароль. Проверьте, пожалуйста, пароль')
        this.preLoader = false
        return
      } else if(JSON.parse(window.sessionStorage.currentUser) === "All input is required") {
        this.$message.error('Что-то пошло не так. Повторите попытку через пару минут, пожалуйста')
        this.preLoader = false
        return
      } else {

        this.$router.push('/dashboard').catch(err => {
          if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
          ) {}
        });

        this.preLoader = false

        this.$message({
        message: "Добро пожаловать в Hotelier, " + JSON.parse(window.sessionStorage.currentUser).user.firstName,
        type: 'success'
        })
      }
    },

    // forgotPassword() {
    //   let route = this.$router.resolve('http://mnogo.uz');
    //   window.open(route.href, '_blank');
    // }
  }
}
</script> 