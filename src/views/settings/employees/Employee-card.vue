<template>
  <div>
    <div class="img-cards">
      <div class="card-btns">
        <button
          class="icn-btn-opcty"
          @click="editEmployee(employee)"
        >
          <img src="@/assets/icons/Edit-prim.svg" alt="">
        </button>
        <button
          class="icn-btn-opcty"
          @click="deleteEmployee(employee)"
        >
          <img src="@/assets/icons/Delete.svg" alt="">
        </button>
      </div>
      <img v-if="imageUrl !== '' && imageUrl !== undefined && imageUrl !== null" :src="(imageUrl)" alt="">
      <img v-else-if="gender === 'male'" src="@/assets/Male-employee.png" alt="">
      <img v-else src="@/assets/Female-employee.png" alt="">
      <div class="empl-info">
        <span>{{subPositionLbl}} {{positionLbl}}</span>
        <h3>{{lastName}} {{name}} {{familyName}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Employee-card',
  data: () => ({
  }),
  props: {
    imageUrl: String,
    position: String,
    subPosition: String,
    name: String,
    lastName: String,
    familyName: String,
    gender: String,
    employee: Object
  },

  computed: {
    positionLbl() {
      if(this.position === 'managers'){
        return 'менеджер'
      } else if(this.position === 'receptionists') {
        return 'администратор'
      } else if(this.position === 'restaurantManagers') {
        return 'заведующий залом'
      } else if(this.position === 'maids' && this.gender === 'female') {
        return 'горничная'
      } else if(this.position === 'maids' && this.gender === 'male') {
        return 'горничный'
      } else if(this.position === 'waiters') {
        return 'официант'
      } else if(this.position === 'cooks') {
        return 'повар'
      }
    },

    subPositionLbl() {
      if(this.subPosition === 'main' && this.gender === 'male'){
        return 'Главный'
      } else if(this.subPosition === 'main' && this.gender === 'female') {
        return 'Главная'
      } else if(this.subPosition === 'senior' && this.gender === 'male') {
        return 'Старший'
      } else if(this.subPosition === 'senior' && this.gender === 'female') {
        return 'Старшая'
      } else if(this.subPosition === 'junior' && this.gender === 'male') {
        return 'Младший'
      } else if(this.subPosition === 'junior' && this.gender === 'female') {
        return 'Младшая'
      } else if(this.subPosition === 'dayshift' && this.gender === 'male') {
        return 'Дневной'
      } else if(this.subPosition === 'dayshift' && this.gender === 'female') {
        return 'Дневная'
      } else if(this.subPosition === 'nightshift' && this.gender === 'male') {
        return 'Ночной'
      } else if(this.subPosition === 'nightshift' && this.gender === 'female') {
        return 'Ночная'
      }
    }
  },

  methods: {
    editEmployee() {
      let emplId = this.emplId
      this.$emit('edit', emplId)
    },

    deleteEmployee(employee) {
      this.$emit('deleteEmployee', employee)
    },
  }
}
</script>

<style>

</style>