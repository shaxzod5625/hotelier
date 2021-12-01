<template>
  <div class="con-page">
    
    <transition name="component-fade" mode="out-in">
      <CreateNewRoom
        @closeCreateRoom="closeCreateRoom"
        @refresh="refresh"

        v-if="createRoom"

        :currentCategory="currentCategory"
      />

      <DeleteRoom
        @closeDeleteRoom="closeDeleteRoom"
        @refresh="refresh"

        v-if="deleteRoomModal"

        :deletingRoomInfo="this.deletingRoomInfo"
      />

      <EditRoom
        v-if="editRoomModal"
        @refresh="refresh"

        @closeEditRoom="closeEditRoom"

        :editingRoomInfo="this.editingRoomInfo"
        :currentNumber="this.currentNumber"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/room-fund'}" class="breadcrump">Номерной фонд</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">{{catName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar">
      <div class="info-h3">
        <h3>Количество номеров:</h3>
        <h3 class="info-value">{{currentCategory.rooms.length}}</h3>
      </div>
      <div class="btns">
        <button
          @click="creatingNewRoom"
          class="tabbar-btn"
        >
          Добавить
        </button>
      </div>
    </div>

    <div class="list-card">
      <table class="list-table">
        <tr>
          <th>Номер комнаты</th>
          <th>Вместимость (основной + дополнительный)</th>
          <th>Номер для курящих</th>
        </tr>
        <tr
          class="content-list"
          v-for="(room, idx) in currentCategory.rooms"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
              <td
                class="room-list-element"
                @click="editRoom(JSON.parse(room))"
              >
                № {{JSON.parse(room).roomNumber}}
              </td>
              <td>{{JSON.parse(room).mainBeds}} + {{JSON.parse(room).additionalBeds}}</td>
              <td class="list-last-el">
                <h3 v-if="JSON.parse(room).forSmokers">Да</h3>
                <h3 v-else>Нет</h3>
                <div class="list-icon-box">
                  <img
                    class="icon-box" 
                    src="@/assets/icons/Edit.svg" alt=""
                    @click="editRoom(JSON.parse(room))"
                  >
                  <img
                    @click="deleteRoom(JSON.parse(room).roomNumber)"
                    class="icon-box" 
                    src="@/assets/icons/Delete.svg" alt=""
                  >
                </div>
              </td>
            </div>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import DeleteRoom from './category/DeleteRoom.vue'
import CreateNewRoom from './category/CreateNewRoom.vue'
import EditRoom from './category/EditRoom.vue'


export default {
  name: 'CategoryWindow',
  allBeds: '13',

  data: () => ({
    createRoom: false,
    deleteRoomModal: false,
    editRoomModal: false,

    deletingRoomInfo: '',
    editingRoomInfo: '',
    currentNumber: '',

    roomFund: JSON.parse(window.sessionStorage.allRoomCats).categories,

    editRoomNumber: '',
    editBedType: '',
    editMainBeds: '',
    editAdditionalBedsBeds: '',
    editBathroom: '',
    editRoomArea: '',
    editForSmokers: '',

    roomNumber: '',
    categoryID: '',
  }),

  components: {
    DeleteRoom, CreateNewRoom, EditRoom
  },

  computed: {
    currentCategory() {
      return this.roomFund.find(cat => cat.category == this.$route.params.id)
    },

    catName() {
      if(this.currentCategory.category === 'apartment') {return 'Апартаменты'}
      else if(this.currentCategory.category === 'bungalow') {return 'Бунгало'}
      else if(this.currentCategory.category === 'deluxe') {return 'Делюкс'}
      else if(this.currentCategory.category === 'honeymoonRoom') {return 'Для молодоженов'}
      else if(this.currentCategory.category === 'suite') {return 'Люкс'}
      else if(this.currentCategory.category === 'duplex') {return 'Дюплекс'}
      else if(this.currentCategory.category === 'cabana') {return 'Коттедж'}
      else if(this.currentCategory.category === 'juniorSuite') {return 'Полулюкс'}
      else if(this.currentCategory.category === 'residence') {return 'Резиденция'}
      else if(this.currentCategory.category === 'familyRoom') {return 'Семейная комната'}
      else if(this.currentCategory.category === 'standart') {return 'Стандарт'}
      else if(this.currentCategory.category === 'studio') {return 'Студия'}
      else if(this.currentCategory.category === 'chalet') {return 'Шале'}
      else if(this.currentCategory.category === 'economyClass') {return 'Эконом-класс'}
    },
  },

  methods: {
    getRoomFund() {
      this.roomFund = JSON.parse(window.sessionStorage.allRoomCats).categories
    },

    creatingNewRoom() {
      this.createRoom = true
    },

    editRoom(room) {
      this.editingRoomInfo = {
        category: this.currentCategory.category,
        room: room
      }

      this.currentNumber = room.roomNumber

      this.editRoomModal = true
    },

    deleteRoom(roomNumber) {
      this.deletingRoomInfo = {
        category: this.currentCategory.category,
        roomNumber: roomNumber
      }

      this.deleteRoomModal = true
    },

    closeDeleteRoom() {
      this.deleteRoomModal = false
    },

    closeCreateRoom() {
      this.createRoom = false
    },

    closeEditRoom() {
      this.editRoomModal = false
    },

    async refresh() {
      try{
        await this.$store.dispatch('getRoomsCount')
      } catch {}
      
      this.$forceUpdate(this.currentCategory)
      this.$forceUpdate(this.getRoomFund())
    }
  }
}
</script>

<style>

</style>