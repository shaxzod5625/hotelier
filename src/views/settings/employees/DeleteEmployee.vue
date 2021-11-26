<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление профиля сотрудника</h3>
      <div class="divider"></div>
      <h3 class="title-strong">{{employee.lastName}} {{employee.name}} {{employee.familyName}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить профиль данного сотрудника безвозвратно. Удалить профиль сотрудника?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="deleteEmployee"
        >
          <span>Удалить</span>
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
  name: 'DeleteEmployee',

  data:() => ({
  }),

  props: {
    employee: Object
  },

  computed: {
  },

  methods: {
    closeModal() {
      this.$emit('closeDelete')
    },

    async deleteEmployee() {
      const employee = this.employee

      await this.$store.dispatch('deleteEmployee', employee)

      if(this.employee.position === 'managers') {
        await this.$store.dispatch('getMyEmployeesManagers')
      } else if (this.employee.position === 'receptionists') {
        await this.$store.dispatch('getMyEmployeesReceptionists')
      } else if (this.employee.position === 'restaurant-managers') {
        await this.$store.dispatch('getMyEmployeesRestaurantManagers')
      } else if (this.employee.position === 'cooks') {
        await this.$store.dispatch('getMyEmployeesCooks')
      } else if (this.employee.position === 'maids') {
        await this.$store.dispatch('getMyEmployeesMaids')
      } else if (this.employee.position === 'waiters') {
        await this.$store.dispatch('getMyEmployeesWaiters')
      }

      this.$message({
        message: "Профиль сотрудника удален",
        type: 'success'
      })

      this.$emit('refresh')
      this.$emit('closeDelete')
    }
  }
}
</script>

<style>

</style>