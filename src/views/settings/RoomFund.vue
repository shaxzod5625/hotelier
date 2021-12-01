<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <NewRoomCategory
        @closeNewCategory="closeNewCategory"
        @refresh="refresh"

        v-if="newCategory"
      />

      <DeleteCategory
        @closeDeleteCategory="closeDeleteCategory"
        @refresh="refresh"

        v-if="deleteCategoryModal"

        :category="categoryName"
      />
    </transition>

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
              <router-link class="category-link" :to="{name: 'Category Window', params: {id: roomCats.category}}">
                <td
                  class="category-name"
                >
                  {{catName(roomCats.category)}}
                </td>
              </router-link>
              <td>{{roomCats.rooms.length}}</td>
              <td class="list-last-el">
                {{categoryBeds(idx)}}
                <div class="list-icon-box">
                  <router-link
                    :to="{name: 'Category Window', params: {id: roomCats.category}}"
                    style="align-items: center; display: flex;"
                  >
                    <img
                      class="icon-box"
                      src="@/assets/icons/Open.svg" alt=""
                    >
                  </router-link>
                  <img
                    @click="deleteCategory(roomCats.category)"
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
import { computed } from 'vue-demi'


export default {
  name: 'RoomFund',

  components: {
    NewRoomCategory, DeleteCategory,
  },

  data: () => ({
    categoryName: '',
    categoryID: '',
    newCategory: false,
    editCategory: false,
    deleteCategoryModal: false,

    roomFund: JSON.parse(window.sessionStorage.allRoomCats).categories,
  }),

  computed: {
    allBeds() {
      const catsAmount = this.roomFund.length
      const loopResult = []

      for (let i=0; i<catsAmount; i++) {
        let roomLoop = this.roomFund[i].rooms
        loopResult.push(roomLoop.length)
      }
      return Object.values(loopResult).reduce((a, b) => a + b)
    },
  },

  methods: {
    getRoomFund() {
      this.roomFund =  JSON.parse(window.sessionStorage.allRoomCats).categories
    },

    deleteCategory(category) {
      this.categoryName = category
      this.deleteCategoryModal = true
    },

    closeNewCategory() {
      this.newCategory = false
    },

    closeDeleteCategory() {
      this.deleteCategoryModal = false
    },

    catName(category) {
      if(category === 'apartment') {return 'Апартаменты'}
      else if(category === 'bungalow') {return 'Бунгало'}
      else if(category === 'deluxe') {return 'Делюкс'}
      else if(category === 'honeymoonRoom') {return 'Для молодоженов'}
      else if(category === 'suite') {return 'Люкс'}
      else if(category === 'duplex') {return 'Дюплекс'}
      else if(category === 'cabana') {return 'Коттедж'}
      else if(category === 'juniorSuite') {return 'Полулюкс'}
      else if(category === 'residence') {return 'Резиденция'}
      else if(category === 'familyRoom') {return 'Семейная комната'}
      else if(category === 'standart') {return 'Стандарт'}
      else if(category === 'studio') {return 'Студия'}
      else if(category === 'chalet') {return 'Шале'}
      else if(category === 'economyClass') {return 'Эконом-класс'}
    },

    categoryBeds(idx) {
      let index = idx
      let amount = this.roomFund[index].rooms.length
      const loopResult = []

      for (let i=0; i<amount; i++) {
        let bedLoop = JSON.parse(this.roomFund[index].rooms[i])
        loopResult.push((bedLoop.mainBeds + bedLoop.additionalBeds))
      }
      return Object.values(loopResult).reduce((a, b) => a + b)
    },

    closeEdit() {
      this.editCategory = false
    },

    async refresh() {
      try{
        await this.$store.dispatch('getRoomsCount')
      } catch {}

      this.$forceUpdate(this.getRoomFund())
    }
  }
}
</script>

<style>

</style>