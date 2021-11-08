<template>
  <div class="con-page">
    
    <CreateNewRoom
      @closeCreateRoom="closeCreateRoom"

      v-if="createRoom"
    />

    <DeleteRoom
      @closeDeleteRoom="closeDeleteRoom"

      v-if="deleteRoomModal"

      :roomNumber="roomNumber"
      :categoryID="categoryID"
    />

    <EditRoom
      v-if="editRoomModal"

      @closeEditRoom="closeEditRoom"

      :roomNumber="editRoomNumber"
      :bedType="editBedType"
      :mainBeds="editMainBeds"
      :additionalBeds="editAdditionalBeds"
      :bathroom="editBathroom"
      :roomArea="editRoomArea"
      :forSmokers="editForSmokers"
    />

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/room-fund'}" class="breadcrump">Номерной фонд</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">{{currentCategory.catName}}</el-breadcrumb-item>
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
          v-for="(rooms, idx) in currentCategory.rooms"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
              <td
                class="room-list-element"
                @click="editRoom(rooms)"
              >
                № {{rooms.roomNumber}}
              </td>
              <td>{{rooms.mainBeds}} + {{rooms.additionalBeds}}</td>
              <td class="list-last-el">
                <h3 v-if="rooms.forSmokers">Да</h3>
                <h3 v-else>Нет</h3>
                <div class="list-icon-box">
                  <img
                    class="icon-box" 
                    src="@/assets/icons/Edit.svg" alt=""
                    @click="editRoom(rooms)"
                  >
                  <img
                    @click="deleteChosenRoom(rooms.roomNumber)"
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
      return this.$store.state.roomFund.find(cat => cat.catID == this.$route.params.id)
    }
  },

  methods: {
    creatingNewRoom() {
      this.createRoom = true
    },

    editRoom(rooms) {
      this.editRoomNumber = rooms.roomNumber
      this.editBedType = rooms.bedType
      this.editMainBeds = rooms.mainBeds
      this.editAdditionalBeds = rooms.additionalBeds
      this.editBathroom = rooms.bathroom
      this.editRoomArea = rooms.roomArea
      this.editForSmokers = rooms.forSmokers

      this.editRoomModal = true
    },

    deleteChosenRoom(roomNumber) {
      this.deleteRoomModal = true

      const categoryID = this.$route.params.id
      this.categoryID = categoryID
      this.roomNumber = roomNumber
    },

    closeDeleteRoom() {
      this.deleteRoomModal = false
    },

    closeCreateRoom() {
      this.createRoom = false
    },

    closeEditRoom() {
      this.editRoomModal = false
    }
  }
}
</script>

<style>

</style>