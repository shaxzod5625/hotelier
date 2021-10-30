<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Добавление категории</h3>
      <div class="divider"></div>
      <div class="form-2">
        <div class="w-100">
          <label for="select">Категория номера</label>
          <el-select v-model="catName" :value-key="catID" placeholder="Выберите категорию">
            <el-option
              v-for="(category, idx) in roomCats"
              :key="idx"
              :label="category.label"
              :value="category.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="roomCount">Количество комнат</label>
          <el-input
            placeholder="Введите количество комнат"
            v-model="roomNumber"
            v-mask="'###'"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Тип кровати</label>
          <el-select v-model="bedType" placeholder="Выберите тип кровати">
            <el-option
              v-for="(bed, idx) in bedTypes"
              :key="idx"
              :label="bed.label"
              :value="bed.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Количесво основных коек</label>
          <el-input placeholder="Введите количество основных коек" v-mask="'#'" v-model="mainBeds">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Количесво дополнительных коек</label>
          <el-input placeholder="Введите количесво дополнительных коек" v-mask="'#'" v-model="additionalBeds">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Санузел</label>
          <el-select v-model="bathroom" placeholder="Выберите тип санузла">
            <el-option
              v-for="(bthrm, idx) in bathroomTypes"
              :key="idx"
              :label="bthrm.label"
              :value="bthrm.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Площадь</label>
          <el-input placeholder="Введите площадь комнаты в м²" v-mask="'## м²'" v-model="roomArea">
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Курение</label>
          <el-select v-model="forSmokers" default-first-option>
            <el-option
              v-for="(smkng, idx) in smokingType"
              :key="idx"
              :value="smkng.value"
              :label="smkng.label"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          @click="createNewCategory"
          class="prim-btn"
        >
          <span>Добавить</span>
        </button>
      </div>
    </div>
    <div class="modal-back"
      @click="closeModal"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewRoomCategory',

  data: () => ({
    roomNumber: '',
    catName: '',
    bedType: '',
    mainBeds: '',
    additionalBeds: '',
    bathroom: '',
    roomArea: '',
    forSmokers: false,
    catID: '',

    bedTypes: [{label: 'Standart Single', value: 'Standart Single'}, {label: 'Standart Double', value: 'Standart Double'}, {label: 'Standart Triple', value: 'Standart Triple'}],
    bathroomTypes: [{label: 'United', value: 'United'}, {label: 'Separated', value: 'Separated'}, {label: 'Joint', value: 'Joint'}],
    smokingType: [{label: 'Комната не для курящих', value: false}, {label: 'Комната для курящих', value: true}],
    roomCats: [
      {label: 'Эконом-класс', value: 'economy-сlass'},
      {label: 'Стандарт', value: 'standart'},
      {label: 'Семейная комната', value: 'family-room'},
      {label: 'Джуниор суит', value: 'junior-suite'},
      {label: 'Люкс', value: 'lux'},
      {label: 'Апартаменты', value: 'apartments'}
    ]
  }),

  methods: {
    closeModal() {
      this.$emit('closeNewCategory')
    },

    createNewCategory() {
      this.$store.dispatch('createNewCategory', this.addingRooms())
      this.$emit('closeNewCategory')
    },

    addingRooms() {
      const newCategory = [
          {catName: this.currentCatName.label,},
          {catID: this.currentCatName.value,}
      ]
      const newRooms = []
      const roomAmount = Number(this.roomNumber)

      for (let i=0; i<roomAmount; i++) {
        newRooms.push({
          roomNumber: i + 1,
          mainBeds: Number(this.mainBeds),
          additionalBeds: Number(this.additionalBeds),
          bathroom: this.bathroom,
          bedType: this.bedType,
          forSmokers: this.forSmokers,
          roomArea: this.roomArea
          })
      }
      return newCategory.concat({rooms:newRooms})
    }
  },

  computed: {
    currentCatName() {
      return this.roomCats.find(category => category.value == this.catName)
    }
  },
}
</script>

<style>

</style>