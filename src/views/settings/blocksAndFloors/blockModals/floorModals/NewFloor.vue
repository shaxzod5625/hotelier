<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Новый этаж</h3>
      <div class="divider"></div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Название этажа</label>
          <el-input
            v-model="floorName"
            placeholder="Введите название этажа"
            :class="{invalid: ($v.floorName.$dirty && !$v.floorName.required)}"
          />
          <span v-if="$v.floorName.$dirty && !$v.floorName.required" class="validation-error">Пожалуйста, введите название этажа</span>
        </div>

        <div class="w-100">
          <label for="input">Категория номеров</label>
          <el-select
            v-model="roomCategory"
            placeholder="Выберите категорию"
          >
            <el-option
              v-for="(category, idx) in allRooms"
              :key="idx"
              :value="category.category"
              :label="categoryLabel(category.category)"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="divider" style="margin-top: 24px"/>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'apartment'"
      >
        <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll.apartment" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.apartment" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.apartment" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'bungalow'"
      >
        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll.bungalow" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.bungalow" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.bungalow" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'deluxe'"
      >
        <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll.deluxe" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.deluxe" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.deluxe" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'honeymoonRoom'"
      >
        <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAll.honeymoonRoom" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.honeymoonRoom" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.honeymoonRoom" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'duplex'"
      >
        <el-checkbox :indeterminate="isIndeterminate5" v-model="checkAll.duplex" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.duplex" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.duplex" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'suite'"
      >
        <el-checkbox :indeterminate="isIndeterminate6" v-model="checkAll.suite" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.suite" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.suite" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'cabana'"
      >
        <el-checkbox :indeterminate="isIndeterminate7" v-model="checkAll.cabana" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.cabana" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.cabana" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'juniorSuite'"
      >
        <el-checkbox :indeterminate="isIndeterminate8" v-model="checkAll.juniorSuite" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.juniorSuite" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.juniorSuite" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'residence'"
      >
        <el-checkbox :indeterminate="isIndeterminate9" v-model="checkAll.residence" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.residence" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.residence" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'familyRoom'"
      >
        <el-checkbox :indeterminate="isIndeterminate10" v-model="checkAll.familyRoom" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.familyRoom" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.familyRoom" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'standart'"
      >
        <el-checkbox :indeterminate="isIndeterminate11" v-model="checkAll.standart" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.standart" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.standart" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'studio'"
      >
        <el-checkbox :indeterminate="isIndeterminate12" v-model="checkAll.studio" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.studio" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.studio" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'chalet'"
      >
        <el-checkbox :indeterminate="isIndeterminate13" v-model="checkAll.chalet" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.chalet" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.chalet" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>

      <div
        class="checkbox-group-div"
        v-show="this.roomCategory === 'economyClass'"
      >
        <el-checkbox :indeterminate="isIndeterminate14" v-model="checkAll.economyClass" @change="handleCheckAllChange"><h3 class="checkbox-label">{{categoryLabel(roomCategory)}}</h3></el-checkbox>
        <el-checkbox-group v-model="checkedRooms.economyClass" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="(room, idx) in constantSortRooms.economyClass" :label="room" :key="idx"><h4>№ {{room.roomNumber}}</h4></el-checkbox>
        </el-checkbox-group>
      </div>


<!-- /////////////////////////////////////////////// -->
      <h4 style="display: none">{{sortRooms}}</h4>
      <h4 style="display: none">{{sortingRooms}}</h4>
<!-- /////////////////////////////////////////////// -->

      <div class="input-grid-btns">
        <button
          @click="closeModal"
          class="sec-btn"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="newFloor"
        >
          Добавить
        </button>
      </div>
    </div>

    <div
      @click="closeModal"
      class="modal-back"
    >
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'NewFloor',

  data:() => ({
    roomCategory: '',
    floorName: '',
    allRooms: JSON.parse(window.sessionStorage.allRoomCats).categories,

    checkAll: {
      apartment: false,
      bungalow: false,
      deluxe: false,
      honeymoonRoom: false,
      duplex: false,
      suite: false,
      cabana: false,
      juniorSuite: false,
      residence: false,
      familyRoom: false,
      standart: false,
      studio: false,
      chalet: false,
      economyClass: false,
    },
    checkedRooms: {
      apartment: [],
      bungalow: [],
      deluxe: [],
      honeymoonRoom: [],
      duplex: [],
      suite: [],
      cabana: [],
      juniorSuite: [],
      residence: [],
      familyRoom: [],
      standart: [],
      studio: [],
      chalet: [],
      economyClass: [],
    },

    isIndeterminate1: false,
    isIndeterminate2: false,
    isIndeterminate3: false,
    isIndeterminate4: false,
    isIndeterminate5: false,
    isIndeterminate6: false,
    isIndeterminate7: false,
    isIndeterminate8: false,
    isIndeterminate9: false,
    isIndeterminate10: false,
    isIndeterminate11: false,
    isIndeterminate12: false,
    isIndeterminate13: false,
    isIndeterminate14: false,
    
    sortRooms: {
      apartment: [],
      bungalow: [],
      deluxe: [],
      honeymoonRoom: [],
      duplex: [],
      suite: [],
      cabana: [],
      juniorSuite: [],
      residence: [],
      familyRoom: [],
      standart: [],
      studio: [],
      chalet: [],
      economyClass: [],
    },
    constantSortRooms: {
      apartment: [],
      bungalow: [],
      deluxe: [],
      honeymoonRoom: [],
      duplex: [],
      suite: [],
      cabana: [],
      juniorSuite: [],
      residence: [],
      familyRoom: [],
      standart: [],
      studio: [],
      chalet: [],
      economyClass: [],
    },

      apartmentChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'apartment'),
      bungalowChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'bungalow'),
      deluxeChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'deluxe'),
      honeymoonRoomChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'honeymoonRoom'),
      duplexChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'duplex'),
      suiteChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'suite'),
      cabanaChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'cabana'),
      juniorSuiteChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'juniorSuite'),
      residenceChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'residence'),
      familyRoomChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'familyRoom'),
      standartChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'standart'),
      studioChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'studio'),
      chaletChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'chalet'),
      economyClassChosen: JSON.parse(window.sessionStorage.allRoomCats).categories.find(category => category.category === 'economyClass'),

      apartmentRooms: [],
      bungalowRooms: [],
      deluxeRooms: [],
      honeymoonRoomRooms: [],
      duplexRooms: [],
      suiteRooms: [],
      cabanaRooms: [],
      juniorSuiteRooms: [],
      residenceRooms: [],
      familyRoomRooms: [],
      standartRooms: [],
      studioRooms: [],
      chaletRooms: [],
      economyClassRooms: [],
    
      apartmentLength: '',
      bungalowLength: '',
      deluxeLength: '',
      honeymoonRoomLength: '',
      duplexLength: '',
      suiteLength: '',
      cabanaLength: '',
      juniorSuiteLength: '',
      residenceLength: '',
      familyRoomLength: '',
      standartLength: '',
      studioLength: '',
      chaletLength: '',
      economyClassLength: '',
  }),

  validations: {
    floorName: {required}
  },

  props: {
    blockID: String
  },

  computed: {
    sortingRooms() {
      if(this.apartmentChosen === undefined || this.apartmentChosen === '' || this.apartmentChosen === null) {
        this.apartmentLength = 0
      } else {this.apartmentLength = this.apartmentChosen.rooms.length}

      if(this.bungalowChosen === undefined || this.bungalowChosen === '' || this.bungalowChosen === null) {
        this.bungalowLength = 0
      } else {this.bungalowLength = this.bungalowChosen.rooms.length}

      if(this.deluxeChosen === undefined || this.deluxeChosen === '' || this.deluxeChosen === null) {
        this.deluxeLength = 0
      } else {this.deluxeLength = this.deluxeChosen.rooms.length}

      if(this.honeymoonRoomChosen === undefined || this.honeymoonRoomChosen === '' || this.honeymoonRoomChosen === null) {
        this.honeymoonRoomLength = 0
      } else {this.honeymoonRoomLength = this.honeymoonRoomChosen.rooms.length}

      if(this.duplexChosen === undefined || this.duplexChosen === '' || this.duplexChosen === null) {
        this.duplexLength = 0
      } else {this.duplexLength = this.duplexChosen.rooms.length}

      if(this.suiteChosen === undefined || this.suiteChosen === '' || this.suiteChosen === null) {
        this.suiteLength = 0
      } else {this.suiteLength = this.suiteChosen.rooms.length}

      if(this.cabanaChosen === undefined || this.cabanaChosen === '' || this.cabanaChosen === null) {
        this.cabanaLength = 0
      } else {this.cabanaLength = this.cabanaChosen.rooms.length}

      if(this.juniorSuiteChosen === undefined || this.juniorSuiteChosen === '' || this.juniorSuiteChosen === null) {
        this.juniorSuiteLength = 0
      } else {this.juniorSuiteLength = this.juniorSuiteChosen.rooms.length}

      if(this.residenceChosen === undefined || this.residenceChosen === '' || this.residenceChosen === null) {
        this.residenceLength = 0
      } else {this.residenceLength = this.residenceChosen.rooms.length}

      if(this.familyRoomChosen === undefined || this.familyRoomChosen === '' || this.familyRoomChosen === null) {
        this.familyRoomLength = 0
      } else {this.familyRoomLength = this.familyRoomChosen.rooms.length}

      if(this.standartChosen === undefined || this.standartChosen === '' || this.standartChosen === null) {
        this.standartLength = 0
      } else {this.standartLength = this.standartChosen.rooms.length}

      if(this.studioChosen === undefined || this.studioChosen === '' || this.studioChosen === null) {
        this.studioLength = 0
      } else {this.studioLength = this.studioChosen.rooms.length}

      if(this.chaletChosen === undefined || this.chaletChosen === '' || this.chaletChosen === null) {
        this.chaletLength = 0
      } else {this.chaletLength = this.chaletChosen.rooms.length}

      if(this.economyClassChosen === undefined || this.economyClassChosen === '' || this.economyClassChosen === null) {
        this.economyClassLength = 0
      } else {this.economyClassLength = this.economyClassChosen.rooms.length}



      for (let i=0; i<this.apartmentLength; i++) {
        let sorting1 = JSON.parse(this.apartmentChosen.rooms[i])
        this.apartmentRooms.push(sorting1)
      }

      for (let i=0; i<this.bungalowLength; i++) {
        let sorting2 = JSON.parse(this.bungalowChosen.rooms[i])
        this.bungalowRooms.push(sorting2)
      }

      for (let i=0; i<this.deluxeLength; i++) {
        let sorting3 = JSON.parse(this.deluxeChosen.rooms[i])
        this.deluxeRooms.push(sorting3)
      }

      for (let i=0; i<this.honeymoonRoomLength; i++) {
        let sorting4 = JSON.parse(this.honeymoonRoomChosen.rooms[i])
        this.honeymoonRoomRooms.push(sorting4)
      }

      for (let i=0; i<this.duplexLength; i++) {
        let sorting5 = JSON.parse(this.duplexChosen.rooms[i])
        this.duplexRooms.push(sorting5)
      }

      for (let i=0; i<this.suiteLength; i++) {
        let sorting6 = JSON.parse(this.suiteChosen.rooms[i])
        this.suiteRooms.push(sorting6)
      }

      for (let i=0; i<this.cabanaLength; i++) {
        let sorting7 = JSON.parse(this.cabanaChosen.rooms[i])
        this.cabanaRooms.push(sorting7)
      }

      for (let i=0; i<this.juniorSuiteLength; i++) {
        let sorting8 = JSON.parse(this.juniorSuiteChosen.rooms[i])
        this.juniorSuiteRooms.push(sorting8)
      }

      for (let i=0; i<this.residenceLength; i++) {
        let sorting9 = JSON.parse(this.residenceChosen.rooms[i])
        residenceRooms.push(sorting9)
      }

      for (let i=0; i<this.familyRoomLength; i++) {
        let sorting10 = JSON.parse(this.familyRoomChosen.rooms[i])
        this.familyRoomRooms.push(sorting10)
      }

      for (let i=0; i<this.standartLength; i++) {
        let sorting11 = JSON.parse(this.standartChosen.rooms[i])
        this.standartRooms.push(sorting11)
      }

      for (let i=0; i<this.studioLength; i++) {
        let sorting12 = JSON.parse(this.studioChosen.rooms[i])
        this.studioRooms.push(sorting12)
      }

      for (let i=0; i<this.chaletLength; i++) {
        let sorting13 = JSON.parse(this.chaletChosen.rooms[i])
        this.chaletRooms.push(sorting13)
      }

      for (let i=0; i<this.economyClassLength; i++) {
        let sorting14 = JSON.parse(this.economyClassChosen.rooms[i])
        this.economyClassRooms.push(sorting14)
      }

      const apartmentSorted = this.apartmentRooms.filter(obj => obj.floor === null)
      const bungalowSorted = this.bungalowRooms.filter(obj => obj.floor === null)
      const deluxeSorted = this.deluxeRooms.filter(obj => obj.floor === null)
      const honeymoonRoomSorted = this.honeymoonRoomRooms.filter(obj => obj.floor === null)
      const duplexSorted = this.duplexRooms.filter(obj => obj.floor === null)
      const suiteSorted = this.suiteRooms.filter(obj => obj.floor === null)
      const cabanaSorted = this.cabanaRooms.filter(obj => obj.floor === null)
      const juniorSuiteSorted = this.juniorSuiteRooms.filter(obj => obj.floor === null)
      const residenceSorted = this.residenceRooms.filter(obj => obj.floor === null)
      const familyRoomSorted = this.familyRoomRooms.filter(obj => obj.floor === null)
      const standartSorted = this.standartRooms.filter(obj => obj.floor === null)
      const studioSorted = this.studioRooms.filter(obj => obj.floor === null)
      const chaletSorted = this.chaletRooms.filter(obj => obj.floor === null)
      const economyClassSorted = this.economyClassRooms.filter(obj => obj.floor === null)


      if(this.apartmentChosen === '' && this.apartmentChosen === undefined && this.apartmentChosen === null) {
        this.sortRooms.apartment = []
        this.constantSortRooms.apartment = []
        this.apartmentLength = 0
      } else {
        this.sortRooms.apartment = apartmentSorted
        this.constantSortRooms.apartment = apartmentSorted
      }

      if(this.bungalowChosen === '' && this.bungalowChosen === undefined && this.bungalowChosen === null) {
        this.sortRooms.bungalow = []
        this.constantSortRooms.bungalow = []
        this.bungalowLength = 0
      } else {
        this.sortRooms.bungalow = bungalowSorted
        this.constantSortRooms.bungalow = bungalowSorted
      }

      if(this.deluxeChosen === '' && this.deluxeChosen === undefined && this.deluxeChosen === null) {
        this.sortRooms.deluxe = []
        this.constantSortRooms.deluxe = []
        this.deluxeLength = 0
      } else {
        this.sortRooms.deluxe = deluxeSorted
        this.constantSortRooms.deluxe = deluxeSorted
      }

      if(this.honeymoonRoomChosen === '' && this.honeymoonRoomChosen === undefined && this.honeymoonRoomChosen === null) {
        this.sortRooms.honeymoonRoom = []
        this.constantSortRooms.honeymoonRoom = []
        this.honeymoonRoomLength = 0
      } else {
        this.sortRooms.honeymoonRoom = honeymoonRoomSorted
        this.constantSortRooms.honeymoonRoom = honeymoonRoomSorted
      }

      if(this.duplexChosen === '' && this.duplexChosen === undefined && this.duplexChosen === null) {
        this.sortRooms.duplex = []
        this.constantSortRooms.duplex = []
        this.duplexLength = 0
      } else {
        this.sortRooms.duplex = duplexSorted
        this.constantSortRooms.duplex = duplexSorted
      }

      if(this.suiteChosen === '' && this.suiteChosen === undefined && this.suiteChosen === null) {
        this.sortRooms.suite = []
        this.constantSortRooms.suite = []
        this.suiteLength = 0
      } else {
        this.sortRooms.suite = suiteSorted
        this.constantSortRooms.suite = suiteSorted
      }

      if(this.cabanaChosen === '' && this.cabanaChosen === undefined && this.cabanaChosen === null) {
        this.sortRooms.cabana = []
        this.constantSortRooms.cabana = []
        this.cabanaLength = 0
      } else {
        this.sortRooms.cabana = cabanaSorted
        this.constantSortRooms.cabana = cabanaSorted
      }

      if(this.juniorSuiteChosen === '' && this.juniorSuiteChosen === undefined && this.juniorSuiteChosen === null) {
        this.sortRooms.juniorSuite = []
        this.constantSortRooms.juniorSuite = []
        this.juniorSuiteLength = 0
      } else {
        this.sortRooms.juniorSuite = juniorSuiteSorted
        this.constantSortRooms.juniorSuite = juniorSuiteSorted
      }

      if(this.residenceChosen === '' && this.residenceChosen === undefined && this.residenceChosen === null) {
        this.sortRooms.residence = []
        this.constantSortRooms.residence = []
        this.residenceLength = 0
      } else {
        this.sortRooms.residence = residenceSorted
        this.constantSortRooms.residence = residenceSorted
      }

      if(this.familyRoomChosen === '' && this.familyRoomChosen === undefined && this.familyRoomChosen === null) {
        this.sortRooms.familyRoom = []
        this.constantSortRooms.familyRoom = []
        this.familyRoomLength = 0
      } else {
        this.sortRooms.familyRoom = familyRoomSorted
        this.constantSortRooms.familyRoom = familyRoomSorted
      }

      if(this.standartChosen === '' && this.standartChosen === undefined && this.standartChosen === null) {
        this.sortRooms.standart = []
        this.constantSortRooms.standart = []
        this.standartLength = 0
      } else {
        this.sortRooms.standart = standartSorted
        this.constantSortRooms.standart = standartSorted
      }

      if(this.studioChosen === '' && this.studioChosen === undefined && this.studioChosen === null) {
        this.sortRooms.studio = []
        this.constantSortRooms.studio = []
        this.studioLength = 0
      } else {
        this.sortRooms.studio = studioSorted
        this.constantSortRooms.studio = studioSorted
      }

      if(this.chaletChosen === '' && this.chaletChosen === undefined && this.chaletChosen === null) {
        this.sortRooms.chalet = []
        this.constantSortRooms.chalet = []
        this.chaletLength = 0
      } else {
        this.sortRooms.chalet = chaletSorted
        this.constantSortRooms.chalet = chaletSorted
      }

      if(this.economyClassChosen === '' && this.economyClassChosen === undefined && this.economyClassChosen === null) {
        this.sortRooms.economyClass = []
        this.constantSortRooms.economyClass = []
        this.economyClassLength = 0
      } else {
        this.sortRooms.economyClass = economyClassSorted
        this.constantSortRooms.economyClass = economyClassSorted
      }

      return {
        apartmentSorted,
        bungalowSorted,
        deluxeSorted,
        honeymoonRoomSorted,
        duplexSorted,
        suiteSorted,
        cabanaSorted,
        juniorSuiteSorted,
        residenceSorted,
        familyRoomSorted,
        standartSorted,
        studioSorted,
        chaletSorted,
        economyClassSorted,
      }
      
    },
  },

  methods: {
    categoryLabel(catValue) {
      if(catValue === 'apartment') {return 'Апартаменты'}
      else if(catValue === 'bungalow') {return 'Бунгало'}
      else if(catValue === 'deluxe') {return 'Делюкс'}
      else if(catValue === 'honeymoonRoom') {return 'Для молодоженов'}
      else if(catValue === 'duplex') {return 'Дюплекс'}
      else if(catValue === 'suite') {return 'Люкс'}
      else if(catValue === 'cabana') {return 'Коттедж'}
      else if(catValue === 'juniorSuite') {return 'Полулюкс'}
      else if(catValue === 'residence') {return 'Резиденция'}
      else if(catValue === 'familyRoom') {return 'Семейная комната'}
      else if(catValue === 'standart') {return 'Стандарт'}
      else if(catValue === 'studio') {return 'Студия'}
      else if(catValue === 'chalet') {return 'Шале'}
      else if(catValue === 'economyClass') {return 'Эконом-класс'}
    },

    closeModal() {
      this.$emit('closeNewFloor')
    },

    handleCheckAllChange(val) {
      if(this.roomCategory === 'apartment') {
        this.checkedRooms.apartment = val ? this.sortRooms.apartment : [];
        this.isIndeterminate1 = false;
      } else if(this.roomCategory === 'bungalow') {
        this.checkedRooms.bungalow = val ? this.sortRooms.bungalow : [];
        this.isIndeterminate2 = false;
      } else if(this.roomCategory === 'deluxe') {
        this.checkedRooms.deluxe = val ? this.sortRooms.deluxe : [];
        this.isIndeterminate3 = false;
      } else if(this.roomCategory === 'honeymoonRoom') {
        this.checkedRooms.honeymoonRoom = val ? this.sortRooms.honeymoonRoom : [];
        this.isIndeterminate4 = false;
      } else if(this.roomCategory === 'duplex') {
        this.checkedRooms.duplex = val ? this.sortRooms.duplex : [];
        this.isIndeterminate5 = false;
      } else if(this.roomCategory === 'suite') {
        this.checkedRooms.suite = val ? this.sortRooms.suite : [];
        this.isIndeterminate6 = false;
      } else if(this.roomCategory === 'cabana') {
        this.checkedRooms.cabana = val ? this.sortRooms.cabana : [];
        this.isIndeterminate7 = false;
      } else if(this.roomCategory === 'juniorSuite') {
        this.checkedRooms.juniorSuite = val ? this.sortRooms.juniorSuite : [];
        this.isIndeterminate8 = false;
      } else if(this.roomCategory === 'residence') {
        this.checkedRooms.residence = val ? this.sortRooms.residence : [];
        this.isIndeterminate9 = false;
      } else if(this.roomCategory === 'familyRoom') {
        this.checkedRooms.familyRoom = val ? this.sortRooms.familyRoom : [];
        this.isIndeterminate10 = false;
      } else if(this.roomCategory === 'standart') {
        this.checkedRooms.standart = val ? this.sortRooms.standart : [];
        this.isIndeterminate11 = false;
      } else if(this.roomCategory === 'studio') {
        this.checkedRooms.studio = val ? this.sortRooms.studio : [];
        this.isIndeterminate12 = false;
      } else if(this.roomCategory === 'chalet') {
        this.checkedRooms.chalet = val ? this.sortRooms.chalet : [];
        this.isIndeterminate13 = false;
      } else if(this.roomCategory === 'economyClass') {
        this.checkedRooms.economyClass = val ? this.sortRooms.economyClass : [];
        this.isIndeterminate14 = false;
      }
    },

    handleCheckedCitiesChange(value) {
      if(this.roomCategory === 'apartment') {
        let checkedCount1 = value.length;
        this.checkAll.apartment = checkedCount1 === this.constantSortRooms.apartment.length;
        this.isIndeterminate1 = checkedCount1 > 0 && checkedCount1 < this.constantSortRooms.apartment.length;
      } else if(this.roomCategory === 'bungalow') {
        let checkedCount2 = value.length;
        this.checkAll.bungalow = checkedCount2 === this.constantSortRooms.bungalow.length;
        this.isIndeterminate2 = checkedCount2 > 0 && checkedCount2 < this.constantSortRooms.bungalow.length;
      } else if(this.roomCategory === 'deluxe') {
        let checkedCount3 = value.length;
        this.checkAll.deluxe = checkedCount3 === this.constantSortRooms.deluxe.length;
        this.isIndeterminate3 = checkedCount3 > 0 && checkedCount3 < this.constantSortRooms.deluxe.length;
      } else if(this.roomCategory === 'honeymoonRoom') {
        let checkedCount4 = value.length;
        this.checkAll.honeymoonRoom = checkedCount4 === this.constantSortRooms.honeymoonRoom.length;
        this.isIndeterminate4 = checkedCount4 > 0 && checkedCount4 < this.constantSortRooms.honeymoonRoom.length;
      } else if(this.roomCategory === 'duplex') {
        let checkedCount5 = value.length;
        this.checkAll.duplex = checkedCount5 === this.constantSortRooms.duplex.length;
        this.isIndeterminate5 = checkedCount5 > 0 && checkedCount5 < this.constantSortRooms.duplex.length;
      } else if(this.roomCategory === 'suite') {
        let checkedCount6 = value.length;
        this.checkAll.suite = checkedCount6 === this.constantSortRooms.suite.length;
        this.isIndeterminate6 = checkedCount6 > 0 && checkedCount6 < this.constantSortRooms.suite.length;
      } else if(this.roomCategory === 'cabana') {
        let checkedCount7 = value.length;
        this.checkAll.cabana = checkedCount7 === this.constantSortRooms.cabana.length;
        this.isIndeterminate7 = checkedCount7 > 0 && checkedCount7 < this.constantSortRooms.cabana.length;
      } else if(this.roomCategory === 'juniorSuite') {
        let checkedCount8 = value.length;
        this.checkAll.juniorSuite = checkedCount8 === this.constantSortRooms.juniorSuite.length;
        this.isIndeterminate8 = checkedCount8 > 0 && checkedCount8 < this.constantSortRooms.juniorSuite.length;
      } else if(this.roomCategory === 'residence') {
        let checkedCount9 = value.length;
        this.checkAll.residence = checkedCount9 === this.constantSortRooms.residence.length;
        this.isIndeterminate9 = checkedCount9 > 0 && checkedCount9 < this.constantSortRooms.residence.length;
      } else if(this.roomCategory === 'familyRoom') {
        let checkedCount10 = value.length;
        this.checkAll.familyRoom = checkedCount10 === this.constantSortRooms.familyRoom.length;
        this.isIndeterminate10 = checkedCount10 > 0 && checkedCount10 < this.constantSortRooms.familyRoom.length;
      } else if(this.roomCategory === 'standart') {
        let checkedCount11 = value.length;
        this.checkAll.standart = checkedCount11 === this.constantSortRooms.standart.length;
        this.isIndeterminate11 = checkedCount11 > 0 && checkedCount11 < this.constantSortRooms.standart.length;
      } else if(this.roomCategory === 'studio') {
        let checkedCount12 = value.length;
        this.checkAll.studio = checkedCount12 === this.constantSortRooms.studio.length;
        this.isIndeterminate12 = checkedCount12 > 0 && checkedCount12 < this.constantSortRooms.studio.length;
      } else if(this.roomCategory === 'chalet') {
        let checkedCount13 = value.length;
        this.checkAll.chalet = checkedCount13 === this.constantSortRooms.chalet.length;
        this.isIndeterminate13 = checkedCount13 > 0 && checkedCount13 < this.constantSortRooms.chalet.length;
      } else if(this.roomCategory === 'economyClass') {
        let checkedCount14 = value.length;
        this.checkAll.economyClass = checkedCount14 === this.constantSortRooms.economyClass.length;
        this.isIndeterminate14 = checkedCount14 > 0 && checkedCount14 < this.constantSortRooms.economyClass.length;
      }
      
    },

    async newFloor() {

      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const floor = {
        blockID: this.blockID,
        name: this.floorName
      }

      console.log(floor);

      // try {
      //   await this.$store.dispatch('newFloor', floor)
      // } catch {}

      // try {
      //   await this.$store.dispatch('getBlocksInfo')
      // } catch(err) {
      //   if(err === undefined || err === null || err === '') {
      //     console.log(err);
      //   }
      // }

      // this.$emit('refresh')
      // this.$emit('closeEditFloor')
      // this.$message({
      //   message: 'Cool! Floor is added',
      //   type: 'success'
      // })
    }
  }
}
</script>

<style>

</style>