<template>
  <div class="modal">
    <div class="modal-div">
      <h3>№ {{editingRoomInfo.room.roomNumber}}</h3>
      <div class="divider"></div>

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Номер комнаты</label>
          <el-input
            v-model="editingRoomInfo.room.roomNumber"
            placeholder="Введите номер комнаты"
            :class="{invalid: (($v.editingRoomInfo.room.roomNumber.$dirty && !$v.editingRoomInfo.room.roomNumber.required) || (roomNumberChecking))}"
          />
          <span v-if="$v.editingRoomInfo.room.roomNumber.$dirty && !$v.editingRoomInfo.room.roomNumber.required" class="validation-error">Пожалуйста, введите номер комнаты</span>
          <span v-if="roomNumberChecking" class="validation-error">Комната с таким номером существует. Введите другой номер, пожалуйста</span>
        </div>

        <div class="w-100">
          <label for="input">Тип кровати</label>
          <el-select
            v-model="editingRoomInfo.room.bedType"
            placeholder="Выберите тип кровати"
            :class="{invalid: ($v.editingRoomInfo.room.bedType.$dirty && !$v.editingRoomInfo.room.bedType.required)}"
          >
            <el-option
              v-for="(type, idx) in bedTypes"
              :key="idx"
              :label="type.label"
              :value="type.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.editingRoomInfo.room.bedType.$dirty && !$v.editingRoomInfo.room.bedType.required" class="validation-error">Пожалуйста, выберите тип кровати</span>
        </div>

        <div class="w-100">
          <label for="input">Количесво основных коек</label>
          <el-input
            v-model="editingRoomInfo.room.mainBeds"
            placeholder="Введите количество основных коек"
            v-mask="'#'"
            :class="{invalid: ($v.editingRoomInfo.room.mainBeds.$dirty && !$v.editingRoomInfo.room.mainBeds.required)}"
          />
          <span v-if="$v.editingRoomInfo.room.mainBeds.$dirty && !$v.editingRoomInfo.room.mainBeds.required" class="validation-error">Пожалуйста, введите количество основных коек</span>
        </div>
      </div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Количесво дополнительных коек</label>
          <el-input
            v-model="editingRoomInfo.room.additionalBeds"
            placeholder="Введите количесво дополнительных коек"
            v-mask="'#'"
            :class="{invalid: ($v.editingRoomInfo.room.additionalBeds.$dirty && !$v.editingRoomInfo.room.additionalBeds.required)}"
          />
          <span v-if="$v.editingRoomInfo.room.additionalBeds.$dirty && !$v.editingRoomInfo.room.additionalBeds.required" class="validation-error">Пожалуйста, введите количество дополнительных коек</span>
        </div>

        <div class="w-100">
          <label for="input">Санузел</label>
          <el-select
            v-model="editingRoomInfo.room.bathroom"
            placeholder="Выберите тип санузла"
            :class="{invalid: ($v.editingRoomInfo.room.bathroom.$dirty && !$v.editingRoomInfo.room.bathroom.required)}"
          >
            <el-option
              v-for="(bthrm, idx) in bathroomTypes"
              :key="idx"
              :label="bthrm.label"
              :value="bthrm.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.editingRoomInfo.room.bathroom.$dirty && !$v.editingRoomInfo.room.bathroom.required" class="validation-error">Пожалуйста, выберите тип санузла</span>
        </div>

        <div class="w-100">
          <label for="input">Площадь</label>
          <el-input
            v-model="editingRoomInfo.room.roomArea"
            placeholder="Введите площадь комнаты в м²"
            v-mask="'## м²'"
            :class="{invalid: ($v.editingRoomInfo.room.roomArea.$dirty && !$v.editingRoomInfo.room.roomArea.required)}"
          />
          <span v-if="$v.editingRoomInfo.room.roomArea.$dirty && !$v.editingRoomInfo.room.roomArea.required" class="validation-error">Пожалуйста, введите площадь комнаты</span>
        </div>

        <div class="w-100">
          <label for="input">Курение</label>
          <el-select
            v-model="editingRoomInfo.room.forSmokers"
            default-first-option
            :class="{invalid: ($v.editingRoomInfo.room.forSmokers.$dirty && !$v.editingRoomInfo.room.forSmokers.required)}"
          >
            <el-option
              v-for="(smkng, idx) in smokingType"
              :key="idx"
              :label="smkng.label"
              :value="smkng.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.editingRoomInfo.room.forSmokers.$dirty && !$v.editingRoomInfo.room.forSmokers.required" class="validation-error">Пожалуйста, выберите тип разрешения</span>
        </div>
      </div>

      <div class="input-grid-btns">
        <button
        @click="closeModal"
          class="sec-btn"
        >
          Отмена
        </button>

        <button
          @click.prevent="editRoom"
          class="prim-btn"
        >
          Сохранить
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
  name: 'CreateNewRoom',

  data: () => ({
    roomNumberChecking: false,

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
    ],

    bedTypes: [
      {label: 'Одноместная', value: 'single'},
      {label: 'Двухместная', value: 'double'},
      {label: 'Трёхместная', value: 'triple'},
      {label: 'Четырёхместная', value: 'quad'},
      {label: 'Королевская (Queen)', value: 'queenSize'},
      {label: 'Королевская (King)', value: 'kingSize'},
      {label: 'Двойная одноместная', value: 'twin'},
      {label: 'Двойная двухместная', value: 'doubleDouble'}
    ]
  }),

  validations: {
    editingRoomInfo: {
      room: {
        roomNumber: {required},
        bedType: {required},
        mainBeds: {required},
        additionalBeds: {required},
        bathroom: {required},
        roomArea: {required},
        forSmokers: {required},
      }
    }
  },

  props: {
    editingRoomInfo: Object,
    currentNumber: String
  },

  methods: {
    closeModal() {
      this.$emit('closeEditRoom')
    },

    bedTypeName() {

    },

    async editRoom() {

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const editingroomInfo = {
        category: this.editingRoomInfo.category,
        room: {
          roomNumber: this.editingRoomInfo.room.roomNumber.toString(),
          bedType: this.editingRoomInfo.room.bedType,
          mainBeds: this.editingRoomInfo.room.mainBeds,
          additionalBeds: this.editingRoomInfo.room.additionalBeds,
          bathroom: this.editingRoomInfo.room.bathroom,
          roomArea: this.editingRoomInfo.room.roomArea,
          forSmokers: this.editingRoomInfo.room.forSmokers,
        },
        currentNumber: this.currentNumber
      }
      
      const currentCategory = JSON.parse(window.sessionStorage.allRoomCats).categories.find(cat => cat.category == this.editingRoomInfo.category)
      const currentRooms = currentCategory.rooms
      const roomsAmount = currentRooms.length
      const allRoomNumbers = []

      for(let i=0; i<roomsAmount; i++) {
        let roomNums = JSON.parse(currentRooms[i]).roomNumber
        allRoomNumbers.push((String(roomNums)))
      }
      const checkRoomNumber = this.editingRoomInfo.room.roomNumber

      if(allRoomNumbers.includes(checkRoomNumber) && checkRoomNumber !== this.currentNumber) {
        this.roomNumberChecking = true

        return
      } else {

        try {
          await this.$store.dispatch('editRoom', editingroomInfo)
        } catch {}

        this.$emit('refresh')
        this.$emit('closeEditRoom')
        this.$message({
          message: "Изменения в номере сохранены",
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>

</style>