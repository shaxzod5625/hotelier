<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Редактирование услуги</h3>
      <div class="divider"/>

      <div class="form-3">
        <div class="w-100">
          <label for="input">Категория услуги</label>
          <el-select
            v-model="category"
            disabled
            placeholder="Выберите категорию услуг"
          >
            <el-option
              v-for="(type, idx) in categories"
              :key="idx"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Название услуги</label>
          <el-input
            v-model="name"
            placeholder="Введите название услуги"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          />
          <span v-if="$v.name.$dirty && !$v.name.required" class="validation-error">Пожалуйста, выберите категорию удобства</span>
        </div>

        <div class="w-100">
          <label for="input">Единица измерения</label>
          <el-select
            v-model="measurementUnit"
            placeholder="Выберите единицу измерения"
          >
            <el-option
              v-for="(type, idx) in measurementUnitTypes"
              :key="idx"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
        </div>
      </div>

      <div class="form-2">
        <div class="w-100">
          <label for="input">Бесплатно для категорий номеров</label>
          <el-select
            v-model="payFreeRoomCats"
            multiple
            collapse-tags
            placeholder="Выберите категории номеров"
          >
            <el-option
              v-for="(type, idx) in roomCategories"
              :key="idx"
              :label="categoryLabel(type.label)"
              :value="type.value"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Стоимость</label>
          <money
            class="money-input"
            v-model="service.cost"
            v-bind="money"
            placeholder="Введите стоимость услуги (SUM)"
          />
        </div>
      </div>

<!-- //////////// Hidden computed /////////////// -->

      <h4 style="display: none">{{setInfo}}</h4>

<!-- //////////////////////////////////////////// -->

      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="editService"
        >
          Сохранить
        </button>
      </div>
    </div>

    <div
        class="modal-back"
        @click="closeModal"
      />
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'EditingFacility',

  data:() => ({
    category: '',
    name: '',
    measurementUnit: '',
    payFreeRoomCats: [],
    allRooms: JSON.parse(window.sessionStorage.allRoomCats).categories,

    money: {
      decimal: '',
      thousands: ' ',
      prefix: '',
      suffix: ' UZS',
      precision: 0,
      masked: true
    }
  }),

  props: {
    service: Object
  },

  validations: {
    name: {required},
    measurementUnit: {required}
  },

  computed: {
    roomCategories() {
      const allRooms = this.allRooms
      const length = allRooms.length
      const roomCats = []

      for (let i=0; i<length; i++) {
        roomCats.push({label: allRooms[i].category, value: allRooms[i].category})
      }
      return roomCats
    },

    categories() {
      const types = this.$store.state.servicesCategories

      return types.sort(function(a, b){
        let x = a.label.toLowerCase();
        let y = b.label.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    },
    
    setInfo() {
      this.category = this.service.category
      this.name = this.service.name
      this.measurementUnit = this.service.measurementUnit
      this.payFreeRoomCats = this.service.payFreeRoomCats
    },

    measurementUnitTypes() {
      const types = this.$store.state.measurementUnitTypes

      return types.sort(function(a, b){
        let x = a.label.toLowerCase();
        let y = b.label.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    }
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
      this.$emit('closeEditingFacilityModal')
    },

    async editService() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const service = {
        id: this.service.id,
        category: this.category,
        name: this.name,
        measurementUnit: this.measurementUnit,
        payFreeRoomCats: this.payFreeRoomCats,
        cost: this.service.cost
      }

      try {
        await this.$store.dispatch('editService',service)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeEditingFacilityModal')
      this.$message({
        message: `Изменения в информации удобства "${this.service.name}" сохранены`,
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>