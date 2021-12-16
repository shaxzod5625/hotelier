<template>
  <div class="modal">
    <div class="left-modal-div">

      <div class="gradient-back"/>

      <img
        v-if="user.imageUrl !== '' && user.imageUrl !== undefined && user.imageUrl !== null"
        :src="(user.imageUrl)"
        alt=""
        class="profile-pic"
      >

      <img
        v-else-if="user.gender === 'male'"
        src="@/assets/Male-employee.png"
        alt=""
        class="profile-pic"
      >

      <img
        v-else
        src="@/assets/Female-employee.png"
        alt=""
        class="profile-pic"
      >

      <div class="edit-profile-pic">
        <img src="@/assets/icons/Edit-pic.svg" alt="">
      </div>
      
      <div class="content-wrapper">
        <h1 class="profile-inicials">
          {{ user.lastName }} {{ user.name }}
        </h1>

        <div class="form-2" style="width: 100%">
          <h4>
            {{ subPositionLbl }} {{ positionLbl }}
          </h4>
        </div>

        <div class="form-2" style="width: 100%; margin-top: 48px">

          <h4>Начало сессии (смены):</h4>

          <h4 class="content-text">{{nowDate}}  --  {{nowTime}}</h4>

          <h4>Заехавших гостей:</h4>

          <h4 class="content-text">12</h4>

          <h4>Выехавших гостей:</h4>

          <h4 class="content-text">4</h4>

          <button
            class="sec-btn"
            style="margin-top: 16px"
          >
            <img src="@/assets/icons/Profile-sm.svg" alt="">
            Мой профиль
          </button>

        </div>


      </div>

      <div
        class="modal-btns"
        style="position: fixed; bottom: 40px;"
      >
        <button
          class="ghost-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="ghost-btn-danger"
          @click="logout"
        >
          <img src="@/assets/icons/Checkout-sm.svg" alt="">
          Выйти
        </button>
        
      </div>
    </div>

    <div
      class="modal-back"
      @click="closeModal"
    />
  </div>
</template>

<script>
export default {
  name: 'ProfileModal',

  data:() => ({

  }),

  computed: {
    user() {
      return JSON.parse(window.sessionStorage.currentUser).user
    },

    positionLbl() {
      if(this.user.position === 'managers'){
        return 'менеджер'
      } else if(this.user.position === 'receptionists') {
        return 'администратор'
      } else if(this.user.position === 'restaurantManagers') {
        return 'заведующий залом'
      } else if(this.user.position === 'maids' && this.user.gender === 'female') {
        return 'горничная'
      } else if(this.user.position === 'maids' && this.user.gender === 'male') {
        return 'горничный'
      } else if(this.user.position === 'waiters') {
        return 'официант'
      } else if(this.user.position === 'cooks') {
        return 'повар'
      }
    },

    subPositionLbl() {
      if(this.user.subPosition === 'main' && this.user.gender === 'male'){
        return 'Главный'
      } else if(this.user.subPosition === 'main' && this.user.gender === 'female') {
        return 'Главная'
      } else if(this.user.subPosition === 'senior' && this.user.gender === 'male') {
        return 'Старший'
      } else if(this.user.subPosition === 'senior' && this.user.gender === 'female') {
        return 'Старшая'
      } else if(this.user.subPosition === 'junior' && this.user.gender === 'male') {
        return 'Младший'
      } else if(this.user.subPosition === 'junior' && this.user.gender === 'female') {
        return 'Младшая'
      } else if(this.user.subPosition === 'dayshift' && this.user.gender === 'male') {
        return 'Дневной'
      } else if(this.user.subPosition === 'dayshift' && this.user.gender === 'female') {
        return 'Дневная'
      } else if(this.user.subPosition === 'nightshift' && this.user.gender === 'male') {
        return 'Ночной'
      } else if(this.user.subPosition === 'nightshift' && this.user.gender === 'female') {
        return 'Ночная'
      }
    },

    nowDate() {
      const current = new Date()
      const date = `${current.getDate()}.${current.getMonth()+1}.${current.getFullYear()}`
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
      this.$emit('closeProfileModal')
    },

    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>