<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <DeleteFloor
        v-if="deleteFloorModal"

        @closeDeleteFloor="closeDeleteFloor"

        :floorLevel="level"
        :floorName="floorName"
      />

      <EditFloor
        v-if="editFloorModal"

        @closeEditFloor="closeEditFloor"

        :floorName="floorName"
        :floorLevel="level"
      />

      <NewFloor
        v-if="createFloor"

        @closeNewFloor="closeNewFloor"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/blocks'}" class="breadcrump">Корпусы и этажи</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">{{currentBlock.blockName}}</el-breadcrumb-item>
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
          <th class="tbl-col-2">Этаж</th>
          <th class="tbl-col-2">Количество номеров</th>
        </tr>
        <tr
          class="content-list"
          v-for="(floors, idx) in currentBlock.floors"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
              <td
                class="room-list-element tbl-col-2"
                @click="editChosenFloor(floors)"
              >
                {{floors.floorName}}
              </td>
              <td class="list-last-el tbl-col-2">
                <h3>{{floors.rooms.length}}</h3>
                <div class="list-icon-box">
                  <img
                    @click="editChosenFloor(floors)"
                    class="icon-box" 
                    src="@/assets/icons/Edit.svg" alt=""
                  >
                  <img
                    @click="deleteChosenFloor(floors)"
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

    level: '',
    floorName: '',
  }),

  computed: {
    currentBlock() {
      return this.$store.state.blocks.find(block => block.blockID == this.$route.params.id)
    }
  },

  methods: {
    creatingNewFloor() {
      this.createRoom = true
    },

    editChosenFloor(floors) {
      this.level = floors.level
      this.floorName = floors.floorName

      this.editFloorModal = true
    },

    deleteChosenFloor(floors) {
      this.level = floors.level
      this.floorName = floors.floorName

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
  }
}
</script>

<style>

</style>