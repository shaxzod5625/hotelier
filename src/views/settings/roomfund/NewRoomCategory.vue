<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Добавление категории</h3>
      <div class="divider"></div>
      <div class="form-2">
        <div class="w-100">
          <label for="select">Категория номера</label>
          <el-select
            v-model="catName"
            placeholder="Выберите категорию"
            :class="{invalid: (($v.catName.$dirty && !$v.catName.required) || (similarCategory))}"
          >
            <el-option
              v-for="(category, idx) in roomCats"
              :key="idx"
              :label="category.label"
              :value="category.value">
            </el-option>
          </el-select>
          <span v-if="$v.catName.$dirty && !$v.catName.required" class="validation-error">Пожалуйста, выберите категорию</span>
          <span v-if="similarCategory" class="validation-error">Данная категория уже существует. Вам необходимо всего лишь отредактировать категорию</span>
        </div>

        <div class="w-100">
          <label for="roomCount">Количество комнат</label>
          <el-input
            placeholder="Введите количество комнат"
            v-model="roomNumber"
            v-mask="'###'"
            :class="{invalid: ($v.roomNumber.$dirty && !$v.roomNumber.required)}"
          />
          <span v-if="$v.roomNumber.$dirty && !$v.roomNumber.required" class="validation-error">Пожалуйста, введите количество комнат</span>
        </div>

        <div class="w-100">
          <label for="input">Тип кровати</label>
          <el-select
            v-model="bedType"
            placeholder="Выберите тип кровати"
            :class="{invalid: ($v.bedType.$dirty && !$v.bedType.required)}"
          >
            <el-option
              v-for="(bed, idx) in bedTypes"
              :key="idx"
              :label="bed.label"
              :value="bed.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.bedType.$dirty && !$v.bedType.required" class="validation-error">Пожалуйста, выберите тип кровати</span>
        </div>

        <div class="w-100">
          <label for="input">Количесво основных коек</label>
          <el-input
            placeholder="Введите количество основных коек"
            v-mask="'#'"
            v-model="mainBeds"
            :class="{invalid: ($v.mainBeds.$dirty && !$v.mainBeds.required)}"
          />
          <span v-if="$v.mainBeds.$dirty && !$v.mainBeds.required" class="validation-error">Пожалуйста, введите количество основных коек</span>
        </div>

        <div class="w-100">
          <label for="input">Количесво дополнительных коек</label>
          <el-input
            placeholder="Введите количесво дополнительных коек"
            v-mask="'#'"
            v-model="additionalBeds"
            :class="{invalid: ($v.mainBeds.$dirty && !$v.mainBeds.required)}"
          />
          <span v-if="$v.additionalBeds.$dirty && !$v.additionalBeds.required" class="validation-error">Пожалуйста, введите количество дополнительных коек</span>
        </div>

        <div class="w-100">
          <label for="input">Санузел</label>
          <el-select
            v-model="bathroom"
            placeholder="Выберите тип санузла"
            :class="{invalid: ($v.bathroom.$dirty && !$v.bathroom.required)}"
          >
            <el-option
              v-for="(bthrm, idx) in bathroomTypes"
              :key="idx"
              :label="bthrm.label"
              :value="bthrm.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.bathroom.$dirty && !$v.bathroom.required" class="validation-error">Пожалуйста, выберите тип санузла</span>
        </div>

        <div class="w-100">
          <label for="input">Площадь</label>
          <el-input
            placeholder="Введите площадь комнаты в м²"
            v-mask="'## м²'"
            v-model="roomArea"
            :class="{invalid: ($v.roomArea.$dirty && !$v.roomArea.required)}"
          />
          <span v-if="$v.roomArea.$dirty && !$v.roomArea.required" class="validation-error">Пожалуйста, введите площадь комнаты</span>
        </div>

        <div class="w-100">
          <label for="input">Курение</label>
          <el-select
            v-model="forSmokers"
            default-first-option
            :class="{invalid: ($v.forSmokers.$dirty && !$v.forSmokers.required)}"
          >
            <el-option
              v-for="(smkng, idx) in smokingType"
              :key="idx"
              :value="smkng.value"
              :label="smkng.label"
            >
            </el-option>
          </el-select>
          <span v-if="$v.forSmokers.$dirty && !$v.forSmokers.required" class="validation-error">Пожалуйста, выберите тип разрешения</span>
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
          @click="newRoomCategory"
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
import {required} from 'vuelidate/lib/validators'

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

    similarCategory: false,

    bedTypes: [
      {label: 'Одноместная', value: 'single'},
      {label: 'Двухместная', value: 'double'},
      {label: 'Трёхместная', value: 'triple'},
      {label: 'Четырёхместная', value: 'quad'},
      {label: 'Королевская (Queen)', value: 'queenSize'},
      {label: 'Королевская (King)', value: 'kingSize'},
      {label: 'Двойная одноместная', value: 'twin'},
      {label: 'Двойная двухместная', value: 'doubleDouble'}
    ],

    bathroomTypes: [
      {label: 'Соединенный', value: 'united'},
      {label: 'Отдельный', value: 'separated'},
      {label: 'Совместный', value: 'joint'}
    ],

    smokingType: [
      {label: 'Комната не для курящих', value: false},
      {label: 'Комната для курящих', value: true}
    ],
    
    roomCats: [
      {label: 'Апартаменты', value: 'apartment'},
      {label: 'Бунгало', value: 'bungalow'},
      {label: 'Делюкс', value: 'deluxe'},
      {label: 'Для молодоженов', value: 'honeymoonRoom'},
      {label: 'Дюплекс ', value: 'duplex'},
      {label: 'Люкс', value: 'suite'},
      {label: 'Коттедж', value: 'cabana'},
      {label: 'Полулюкс', value: 'juniorSuite'},
      {label: 'Резиденция', value: 'residence'},
      {label: 'Семейная комната', value: 'familyRoom'},
      {label: 'Стандарт', value: 'standart'},
      {label: 'Студия', value: 'studio'},
      {label: 'Шале', value: 'chalet'},
      {label: 'Эконом-класс', value: 'economyClass'}
    ]
  }),

  validations: {
    roomNumber: {required},
    catName: {required},
    bedType: {required},
    mainBeds: {required},
    additionalBeds: {required},
    bathroom: {required},
    roomArea: {required},
    forSmokers: {required}
  },

  methods: {
    closeModal() {
      this.$emit('closeNewCategory')
    },

    async newRoomCategory() {
      
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const allCategories = JSON.parse(window.sessionStorage.allRoomCats).categories
      const length = allCategories.length
      const loopedCategoryNames = []
      const checkingRoomCategoryName = this.catName

      for(let i=0; i<length; i++) {
        let categoryNames = allCategories[i].category
        loopedCategoryNames.push(categoryNames)
      }

      if(loopedCategoryNames.includes(checkingRoomCategoryName)) {
        this.similarCategory = true

        return
      }

      const newCategory = this.addingRooms
      
      try {
        await this.$store.dispatch('newRoomCategory', newCategory)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeNewCategory')
      this.$message({
        message: "Новая категория номеров добавлена",
        type: 'success'
      })
    },

    
  },

  computed: {
    addingRooms() {
      
      const newRooms = []
      const roomAmount = Number(this.roomNumber)

      for (let i=0; i<roomAmount; i++) {
        newRooms.push({
          roomNumber: String(i + 1),
          mainBeds: Number(this.mainBeds),
          additionalBeds: Number(this.additionalBeds),
          bathroom: this.bathroom,
          bedType: this.bedType,
          forSmokers: this.forSmokers,
          roomArea: this.roomArea
          })
      }

      const newCategory = {
          category: this.catName,
          rooms: newRooms
      }

      return newCategory
    }
  },
}
</script>

<style>

</style>