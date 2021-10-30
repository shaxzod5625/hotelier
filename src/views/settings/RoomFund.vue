<template>
  <div class="con-page">

    <NewRoomCategory
      @closeNewCategory="closeNewCategory"

      v-if="newCategory"
    />

    <DeleteCategory
      @closeDeleteCategory="closeDeleteCategory"

      v-if="deleteCategoryModal"

      :catID="categoryID"
    />

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Номерной фонд</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar">
      <div class="info-h3">
        <h3>Количество номеров:</h3>
        <h3 class="info-value">{{allBeds}}</h3>
      </div>
      <button
        class="tabbar-btn"
        @click="newCategory = true"
      >
        Добавить
      </button>
    </div>

    <div class="list-card">
      <table class="list-table">
        <tr>
          <th>Категория номеров</th>
          <th>Количество комнат</th>
          <th>Количество коек</th>
        </tr>
        <tr
          class="content-list"
          v-for="(roomCats, idx) in roomFund"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
              <router-link class="category-link" :to="{name: 'Category Window', params: {id: roomCats.catID}}">
                <td
                  class="category-name"
                >
                  {{roomCats.catName}}
                </td>
              </router-link>
              <td>{{roomCats.rooms.length}}</td>
              <td class="list-last-el">
                {{categoryBeds(idx)}}
                <div class="list-icon-box">
                  <router-link
                    :to="{name: 'Category Window', params: {id: roomCats.catID}}"
                    style="align-items: center; display: flex;"
                  >
                    <img
                      class="icon-box"
                      src="@/assets/icons/Open.svg" alt=""
                    >
                  </router-link>
                  <img
                    @click="deleteCategory(roomCats.catID)"
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
import _ from 'lodash'
import NewRoomCategory from './roomfund/NewRoomCategory.vue'
import DeleteCategory from './roomfund/DeleteCategory.vue'


export default {
  name: 'RoomFund',

  components: {
    NewRoomCategory, DeleteCategory,
  },

  data: () => ({
    categoryID: '',
    newCategory: false,
    editCategory: false,
    deleteCategoryModal: false,
  }),

  computed: {
    roomFund() {
      return this.$store.state.roomFund
    },

    allBeds() {
      const loopResult = []

      for (let i=0; i<4; i++) {
        let roomLoop = this.roomFund[i].rooms
        loopResult.push(roomLoop.length)
      }
      return Object.values(loopResult).reduce((a, b) => a + b)
    },
  },

  methods: {
    deleteCategory(catID) {
      this.deleteCategoryModal = true
      this.categoryID = catID
    },

    closeNewCategory() {
      this.newCategory = false
    },

    closeDeleteCategory() {
      this.deleteCategoryModal = false
    },

    categoryBeds(idx) {
      let index = idx
      let amount = this.roomFund[index].rooms.length
      const loopResult = []

      for (let i=0; i<amount; i++) {
        let bedLoop = this.roomFund[index].rooms[i]
        loopResult.push((bedLoop.mainBeds + bedLoop.additionalBeds))
      }
      return Object.values(loopResult).reduce((a, b) => a + b)
    },

    closeEdit() {
      this.editCategory = false
    },
  }
}
</script>

<style>

</style>