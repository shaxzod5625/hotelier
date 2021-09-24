<template>
  <div id="app">
    <LoginPage v-if="login === true" />
    <MainLayout v-else/>
  </div>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue'
import LoginPage from './layouts/LoginPage.vue'

export default {
  name: 'app',

  components: {
    MainLayout, LoginPage
  },

  data: () => ({
    login: false
  })
}
</script>
