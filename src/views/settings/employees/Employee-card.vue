<template>
  <div>
    <div class="img-cards">
      <div class="card-btns">
        <button
          class="icn-btn-opcty"
          @click="editEmployee"
        >
          <img src="@/assets/icons/Edit-prim.svg" alt="">
        </button>
        <button
          class="icn-btn-opcty"
          @click="deleteEmployee"
        >
          <img src="@/assets/icons/Delete.svg" alt="">
        </button>
      </div>
      <img v-if="imageUrl != ''" :src="(imageUrl)" alt="">
      <img v-else-if="sex === 'male'" src="@/assets/Male-employee.png" alt="">
      <img v-else src="@/assets/Female-employee.png" alt="">
      <div class="empl-info">
        <span>{{position}} {{post}}</span>
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
    post: String,
    name: String,
    lastName: String,
    familyName: String,
    sex: String
  },

  methods: {
    editEmployee() {
      let emplId = this.emplId
      this.$emit('edit', emplId)
    },

    deleteEmployee() {
      this.$emit('deleteEmployee')
    }
  }
}
</script>

<style>

</style>