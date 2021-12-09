<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <DeleteFloor
        v-if="deleteFloorModal"

        @closeDeleteFloor="closeDeleteFloor"
        @refresh="refresh"

        :floorLevel="level"
        :floorName="floorName"
        :blockID="currentBlock._id"
      />

      <EditFloor
        v-if="editFloorModal"

        @closeEditFloor="closeEditFloor"
        @refresh="refresh"

        :floorName="floorName"
        :floorLevel="level"
        :blockID="currentBlock._id"
      />

      <NewFloor
        v-if="createFloor"

        @closeNewFloor="closeNewFloor"
        @refresh="refresh"

        :blockID="currentBlock._id"
        :amountOfFloors="currentBlock.floors.length"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/blocks'}" class="breadcrump">Корпусы и этажи</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">{{currentBlock.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar" style="flex-direction: row-reverse">

      <div class="btns">
        <button
          @click="createFloor = true"
          class="tabbar-btn"
        >
          Добавить
        </button>
      </div>
    </div>

    <div class="list-card">
      <table class="list-table">
        <tr>
          <th>Этаж</th>
          <th>Этажность</th>
          <th>Количество номеров</th>
        </tr>
        <tr
          class="content-list"
          v-for="(floor, idx) in currentBlock.floors"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
              <td
                class="room-list-element"
                @click="editChosenFloor(JSON.parse(floor))"
              >
                {{JSON.parse(floor).name}}
              </td>
              <td>
                {{JSON.parse(floor).numberFloor}}
              </td>
              <td class="list-last-el">
                <h3>{{JSON.parse(floor).amountOfRoom}}</h3>
                <div class="list-icon-box">
                  <img
                    @click="editChosenFloor(JSON.parse(floor))"
                    class="icon-box" 
                    src="@/assets/icons/Edit.svg" alt=""
                  >
                  <img
                    @click="deleteChosenFloor(JSON.parse(floor))"
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
import DeleteFloor from './blockModals/floorModals/DeleteFloor.vue'
import EditFloor from './blockModals/floorModals/EditFloor.vue'
import NewFloor from './blockModals/floorModals/NewFloor.vue'

export default {
  name: 'BlockWindow',
  allBeds: '13',

  components: {
    DeleteFloor, EditFloor, NewFloor
  },

  data: () => ({
    createFloor: false,
    deleteFloorModal: false,
    editFloorModal: false,

    allBlocks: JSON.parse(window.sessionStorage.allBlocks).blocks,

    level: '',
    floorName: '',
  }),

  computed: {
    currentBlock() {
      return this.allBlocks.find(block => block.name == this.$route.params.id)
    },
  },

  methods: {
    getAllBlocks() {
      this.allBlocks = JSON.parse(window.sessionStorage.allBlocks).blocks
    },

    creatingNewFloor() {
      this.createRoom = true
    },

    editChosenFloor(floor) {
      this.level = floor.numberFloor
      this.floorName = floor.name

      this.editFloorModal = true
    },

    deleteChosenFloor(floors) {
      this.level = floors.numberFloor
      this.floorName = floors.name

      this.deleteFloorModal = true
    },

    closeDeleteFloor() {
      this.deleteFloorModal = false
    },

    closeEditFloor() {
      this.editFloorModal = false
    },

    closeNewFloor() {
      this.createFloor = false
    },

    async refresh() {
      this.$forceUpdate(this.getAllBlocks())
    }
  }
}
</script>

<style>

</style>