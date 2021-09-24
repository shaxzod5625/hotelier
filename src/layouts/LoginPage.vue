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

          <div v-for="message in messages" :key="message.id"><span>{{message}}</span></div>

        </div>
      </form>
    </div>
    <img src="@/assets/loginpageback.png" alt="">
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  
  data: () => ({
    login: '',
    password: '',
  }),

  mounted() {
    this.$store.dispatch('loadMessages')
  },

  computed: {
    messages() {
      return this.$store.state.messages
    }
  },

  
  
}
</script>