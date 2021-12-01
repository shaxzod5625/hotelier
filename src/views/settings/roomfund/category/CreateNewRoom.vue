<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Новый номер</h3>
      <div class="divider"></div>

      <div class="form-3" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Номер комнаты</label>
          <el-input
            v-model="roomNumber"
            placeholder="Введите номер комнаты"
            :class="{invalid: (($v.roomNumber.$dirty && !$v.roomNumber.required) || (roomNumberChecking))}"
          />
          <span v-if="$v.roomNumber.$dirty && !$v.roomNumber.required" class="validation-error">Пожалуйста, введите номер комнаты</span>
          <span v-if="roomNumberChecking" class="validation-error">Комната с таким номером существует. Введите другой номер, пожалуйста</span>
        </div>

        <div class="w-100">
          <label for="input">Тип кровати</label>
          <el-select
            v-model="bedType"
            placeholder="Выберите тип кровати"
            :class="{invalid: ($v.bedType.$dirty && !$v.bedType.required)}"
          >
            <el-option
              v-for="(type, idx) in bedTypes"
              :key="idx"
              :label="type.label"
              :value="type.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.bedType.$dirty && !$v.bedType.required" class="validation-error">Пожалуйста, выберите тип кровати</span>
        </div>

        <div class="w-100">
          <label for="input">Количесво основных коек</label>
          <el-input
            v-model="mainBeds"
            placeholder="Введите количество основных коек"
            v-mask="'#'"
            :class="{invalid: ($v.mainBeds.$dirty && !$v.mainBeds.required)}"
          />
          <span v-if="$v.mainBeds.$dirty && !$v.mainBeds.required" class="validation-error">Пожалуйста, введите количество основных коек</span>
        </div>
      </div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Количесво дополнительных коек</label>
          <el-input
            v-model="additionalBeds"
            placeholder="Введите количесво дополнительных коек"
            v-mask="'#'"
            :class="{invalid: ($v.additionalBeds.$dirty && !$v.additionalBeds.required)}"
          />
          <span v-if="$v.additionalBeds.$dirty && !$v.additionalBeds.required" class="validation-error">Пожалуйста, введите количесво дополнительных коек</span>
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
            v-model="roomArea"
            placeholder="Введите площадь комнаты в м²"
            v-mask="'## м²'"
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
              :label="smkng.label"
              :value="smkng.value"
            >
            </el-option>
          </el-select>
          <span v-if="$v.forSmokers.$dirty && !$v.forSmokers.required" class="validation-error">Пожалуйста, выберите тип разрешения</span>
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
          @click="createNewRoom"
          class="prim-btn"
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
  name: 'CreateNewRoom',

  data: () => ({
    roomNumberChecking: false,

    roomNumber: '',
    bedType: '',
    mainBeds: '',
    additionalBeds: '',
    bathroom: '',
    roomArea: '',
    forSmokers: false,

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
  }),

  validations: {
    roomNumber: {required},
    bedType: {required},
    mainBeds: {required},
    additionalBeds: {required},
    bathroom: {required},
    roomArea: {required},
    forSmokers: {required},
  },

  props: {
    currentCategory: Object
  },

  methods: {
    closeModal() {
      this.$emit('closeCreateRoom')
    },

    async createNewRoom() {
      
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const currentRooms = this.currentCategory.rooms
      const roomsAmount = currentRooms.length
      const allRoomNumbers = []

      for(let i=0; i<roomsAmount; i++) {
        let roomNums = JSON.parse(currentRooms[i]).roomNumber
        allRoomNumbers.push((String(roomNums)))
      }
      const checkRoomNumber = this.roomNumber

      const newRoom = {
        roomNumber: this.roomNumber.toString(),
        mainBeds: Number(this.mainBeds),
        additionalBeds: Number(this.additionalBeds),
        bathroom: this.bathroom,
        bedType: this.bedType,
        forSmokers: this.forSmokers,
        roomArea: this.roomArea
      }

      const creatingRoomInfo = {
        room: newRoom,
        category: this.currentCategory.category,
      }

      if(allRoomNumbers.includes(checkRoomNumber)) {
        this.roomNumberChecking = true

        return
      } else {

        try {
          console.log(creatingRoomInfo);
          await this.$store.dispatch('createNewRoom', creatingRoomInfo)
        } catch {}

        this.$emit('refresh')
        this.$emit('closeCreateRoom')
        this.$message({
          message: "Новый номер добавлен",
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>

</style>