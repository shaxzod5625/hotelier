<template>
  <div class="modal">
    <div class="modal-div">
      <h3>Создание услуги</h3>
      <div class="divider"/>

      <div class="form-3">
        <div class="w-100">
          <label for="input">Категория услуги</label>
          <el-select
            v-model="category"
            placeholder="Выберите категорию услуг"
            :class="{invalid: ($v.category.$dirty && !$v.category.required)}"
          >
            <el-option
              v-for="(cat, idx) in categories"
              :key="idx"
              :label="(setCatLabel(cat.category))"
              :value="cat.category"
            />
          </el-select>
          <span v-if="$v.category.$dirty && !$v.category.required" class="validation-error">Пожалуйста, выберите категорию услуг</span>
        </div>

        <div class="w-100">
          <label for="input">Название услуги</label>
          <el-input
            v-model="name"
            placeholder="Введите название услуги"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
          />
          <span v-if="$v.name.$dirty && !$v.name.required" class="validation-error">Пожалуйста, введите название услуги</span>
        </div>

        <div class="w-100">
          <label for="input">Единица измерения</label>
          <el-select
            v-model="measurementUnit"
            placeholder="Выберите единицу измерения"
            :class="{invalid: ($v.measurementUnit.$dirty && !$v.measurementUnit.required)}"
          >
            <el-option
              v-for="(type, idx) in measurementUnitTypes"
              :key="idx"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
          <span v-if="$v.measurementUnit.$dirty && !$v.measurementUnit.required" class="validation-error">Пожалуйста, выберите единицу измерения</span>
        </div>
      </div>

      <div class="form-2">
        <div class="w-100">
          <label for="input">Бесплатно для категорий номеров</label>
          <el-select
            v-model="payFreeRoomCats"
            placeholder="Выберите категории номеров"
            multiple
            collapse-tags
          >
            <el-option
              v-for="(category, idx) in allRooms"
              :key="idx"
              :value="category.category"
              :label="categoryLabel(category.category)"
            />
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Стоимость (услуга будет считаться бесплатной при цене 0 UZS)</label>
          <money
            v-model="cost"
            class="money-input"
            placeholder="Введите стоимость услуги (SUM)"
            v-bind="money"
          />
        </div>
      </div>


      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          Отмена
        </button>

        <button
          class="prim-btn"
          @click="createFacility"
        >
          Добавить
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
  name: 'CreatingFacility',

  data:() => ({
    category: '',
    name: '',
    measurementUnit: '',
    payFreeRoomCats: [],
    cost: '',
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

  validations: {
    category: {required},
    name: {required},
    measurementUnit: {required}
  },

  computed: {
    setServiceCategories() {
      const services = this.$store.state.services
      const length = services.length
      const sorted = []
      
      for (let i = 0; i < length; i ++) {
        sorted.push({
          category: services[i].category
        })
      }

      return sorted
    },

    categories() {
      var result = this.setServiceCategories.reduce((unique, o) => {
        if(!unique.some(obj => obj.category === o.category)) {
          unique.push(o);
        }
        return unique;
      },[]);

      return result.sort(function(a, b){
        let x = a.category.toLowerCase();
        let y = b.category.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
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
    setCatLabel(category) {
      if(category === 'main'){return 'Основные'}
      else if(category === 'additional'){return 'Дополнительные'}
      else if(category === 'extra'){return 'Экстра'}
    },

    closeModal() {
      this.$emit('closeCreatingFacilityModal')
    },

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

    async createFacility() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$emit('closeCreatingFacilityModal')
      this.$emit('on')

      const newFacility = {
        category: this.category,
        name: this.name,
        measurementUnit: this.measurementUnit,
        payFreeRoomCats: this.payFreeRoomCats,
        cost: this.cost
      }

      console.log(newFacility);

      // try {
      //   await this.$store.dispatch('createFacility', newFacility)
      // } catch {}

      // this.$emit('refresh')
      this.$message({
        message: 'Новая услуга отправлена на обработку. В скорейшем времени услуга появится в списке добавления',
        type: 'success'
      })
      this.$emit('off')
    }
  }
}
</script>

<style>

</style>