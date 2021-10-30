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
            :class="{invalid: (roomNumberChecking)}"
          >
          </el-input>
          <span v-if="roomNumberChecking" class="validation-error">Комната с таким номером существует. Введите другой номер, пожалуйста</span>
        </div>

        <div class="w-100">
          <label for="input">Тип кровати</label>
          <el-select v-model="bedType" placeholder="Выберите тип кровати">
            <el-option
              v-for="(bedType, idx) in bedTypes"
              :key="idx"
              :label="bedType.label"
              :value="bedType.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Количесво основных коек</label>
          <el-input
            v-model="mainBeds"
            placeholder="Введите количество основных коек"
            v-mask="'#'"
          >
          </el-input>
        </div>
      </div>

      <div class="form-2" style="margin-bottom: 0;">
        <div class="w-100">
          <label for="input">Количесво дополнительных коек</label>
          <el-input
            v-model="additionalBeds"
            placeholder="Введите количесво дополнительных коек"
            v-mask="'#'"
          >
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
          <el-input
            v-model="roomArea"
            placeholder="Введите площадь комнаты в м²"
            v-mask="'## м²'"
          >
          </el-input>
        </div>

        <div class="w-100">
          <label for="input">Курение</label>
          <el-select
            v-model="forSmokers"
            default-first-option
          >
            <el-option
              v-for="(smkng, idx) in smokingType"
              :key="idx"
              :label="smkng.label"
              :value="smkng.value"
            >
            </el-option>
          </el-select>
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

    bedTypes: [{label: 'Standart Single', value: 'Standart Single'}, {label: 'Standart Double', value: 'Standart Double'}, {label: 'Standart Triple', value: 'Standart Triple'}],
    bathroomTypes: [{label: 'United', value: 'United'}, {label: 'Separated', value: 'Separated'}, {label: 'Joint', value: 'Joint'}],
    smokingType: [{label: 'Комната не для курящих', value: false}, {label: 'Комната для курящих', value: true}],
  }),

  methods: {
    closeModal() {
      this.$emit('closeCreateRoom')
    },

    createNewRoom() {
      const thisCategory = this.$store.state.roomFund.find(cat => cat.catID == this.$route.params.id).rooms
      const rooms = thisCategory.map(a => a.roomNumber);
      const checkRoomNumber = this.roomNumber

      const newRoom = [
        {roomNumber: this.roomNumber,
        mainBeds: this.mainBeds,
        additionalBeds: this.additionalBeds,
        bathroom: this.bathroom,
        bedType: this.bedType,
        forSmokers: this.forSmokers,
        roomArea: this.roomArea,}
      ]

      if(rooms.includes(checkRoomNumber)) {
        this.roomNumberChecking = true
        return 
      } else {
        const ID = this.$route.params.id
        this.$store.dispatch('createNewRoom', [newRoom, ID])
        this.$emit('closeCreateRoom')
      }
    }
  }
}
</script>

<style>

</style>