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
              :class="{invalid: ($v.loginInfo.login.$dirty && !$v.loginInfo.login.required)}"
            >
            </el-input>
            <span class="validation-error">Пожалуйста, введите логин</span>
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
            >
            </el-input>
            <span class="validation-error">Пожалуйста, введите пароль</span>
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
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'LoginPage',

  validations: {
    loginInfo: {
      login: {required},
      password: {required}
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

      let user = await this.$store.dispatch('loginUser', this.loginInfo)
    
      if(user.error) {
        alert(user.error)
      } else {
        alert("You're signed in!" + user.name)
      }
    },
    nothing() {

    }
  }
}
</script> 