<template>
  <div class="login-page">
    <div class="blur-back">
      <form class="login-form" @submit.prevent="nothing">

        <div class="greetings">
          <h3>Добро пожаловать в Hotelier PMS</h3>
        </div>

        <div class="login-inputs">
          <div class="w-100">
            <el-input
              type="text"
              placeholder="Введите логин"
              v-model.trim="loginInfo.login"
              class="login-input"
              :class="{invalid: ($v.loginInfo.login.$dirty && !$v.loginInfo.login.required) || ($v.loginInfo.login.$dirty && !$v.loginInfo.login.email)}"
            >
            </el-input>
            <span
              class="validation-error"
              v-if="$v.loginInfo.login.$dirty && !$v.loginInfo.login.required"
            >
              Пожалуйста, введите логин
            </span>
            <span
              class="validation-error"
              v-else-if="$v.loginInfo.login.$dirty && !$v.loginInfo.login.email"
            >
              Пожалуйста, введите корректный логин
            </span>
          </div>
          
          <div
            class="w-100"
            @keyup.enter="loginUser"
          >
            <el-input
              type="password"
              placeholder="Введите пароль"
              v-model.trim="loginInfo.password"
              class="password-input"
              :class="{invalid: ($v.loginInfo.password.$dirty && !$v.loginInfo.password.required) || ($v.loginInfo.password.$dirty && !$v.loginInfo.password.minLength)}"
            >
            </el-input>
            <span
              class="validation-error"
              v-if="$v.loginInfo.password.$dirty && !$v.loginInfo.password.required"
            >
              Пожалуйста, введите пароль
            </span>

            <span
              class="validation-error"
              v-else-if="$v.loginInfo.password.$dirty && !$v.loginInfo.password.minLength"
            >
              Длина пароли должен быть {{$v.loginInfo.password.$params.minLength.min}} символов
            </span>
          </div>
        </div>

        <div class="modal-btns">
          <button class="ghost-btn">
            <span>Забыли пароль?</span>
          </button>

          <button
            class="prim-btn"
            type="submit"
            @click.prevent="loginUser"
          >
            <span>Войти</span>
          </button>

        </div>
      </form>
    </div>
    <img src="@/assets/loginpageback.png" alt="">
  </div>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'LoginPage',

  validations: {
    loginInfo: {
      login: {required, email},
      password: {required, minLength: minLength(8)}
    }
  },
  
  data: () => ({
    loginInfo: {
      login: '',
      password: ''
    }
  }),

  methods: {
    async loginUser() {

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('loginUser', this.loginInfo)
        this.$router.push('/dashboard')
        let uid = await JSON.parse(window.localStorage.currentUser)
        this.$message({
        message: "Добро пожаловать в Hotelier, " + uid.user.firstName,
        type: 'success'})
      } catch {
        return {error}
        // this.$message.error('Oops, this is a error message.');
      }
    },
    
    nothing() {

    }
  }
}
</script> 