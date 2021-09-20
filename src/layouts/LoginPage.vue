<template>
  <div class="login-page">
    <div class="blur-back">
      <form class="login-form">

        <div class="greetings">
          <h3>Добро пожаловать в Hotelier PMS</h3>
        </div>

        <div class="login-inputs">
          <div class="w-100">
            <el-input type="text" placeholder="Введите логин" v-model.trim="login"></el-input>
            <span class="validation-error">Пожалуйста, введите логин</span>
          </div>
          
          <div class="w-100">
            <el-input type="password" placeholder="Введите пароль" v-model.trim="password"></el-input>
            <span class="validation-error">Пожалуйста, введите пароль</span>
          </div>
        </div>

        <div class="modal-btns">
          <button class="ghost-btn">
            <span>Забыли пароль?</span>
          </button>

          <button class="prim-btn" type="submit">
            <span>Войти</span>
          </button>

          <h3>{{user}}</h3>

        </div>
      </form>
    </div>
    <img src="@/assets/loginpageback.png" alt="">
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  name: 'LoginPage',

  data: () => ({
    login: '',
    password: ''
  }),

  computed: {
    ...mapState(['user'])
  },

  mounted() {
    this.$store.dispatch("loadUsers")
  }
}
</script>