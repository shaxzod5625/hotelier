<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="getAccesses" :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item @click.native="getAccesses" :to="{ path: '/settings/employees'}" class="breadcrump">Сотрудники</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Заведующие залом</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="search-bar-empl">
      <div class="search-div">
        <input class="search-input" placeholder="Введите имя сотрудника" v-model="search">
        <h4>Количество сотрудников: <span>{{searchEmployee.length}}</span></h4>
      </div>
      <div class="btn-div">
        <button
          class="sec-btn"
          @click="accesses = true"
        >
          <img src="@/assets/icons/Settings-sm.svg" alt="">
          Доступы
        </button>
        <button
          class="prim-btn"
          @click="addEmployee = true"
        >
          <img src="@/assets/icons/Add-person.svg" alt="">
          Добавить
        </button>
      </div>
    </div>


    <transition name="component-fade" mode="out-in">
      <Accesses
        v-if="accesses"
        @closeAccess="closeAccess"

        :position="'restaurantManager'"
      />


      <NewEmployee
        v-if="addEmployee"
        :position="position"

        @close="close"
        @refresh="getRestaurantManagers"
      />

      <EditingEmployee
        v-if="edit"
        @closeEdit="closeEdit"
        @refresh="getRestaurantManagers"

        :employee="employee"
      />

      <DeleteEmployee
        v-if="deleteEmpl"
        @closeDelete="closeDelete"
        @refresh="getRestaurantManagers"

        :employee="employee"
      />
    </transition>

    <div class="con-page-grid6">
      <Employee-card
        ref="employeeCard"
        @edit="editEmployee(employee)"
        @deleteEmployee="deleteEmployee(employee)"
        v-for="(employee, idx) in searchEmployee"
        :key="idx"
        v-show="employee._id != id"

        :imageUrl="employee.imageUrl"
        :position="employee.position"
        :subPosition="employee.subPosition"
        :name="employee.name"
        :lastName="employee.lastName"
        :familyName="employee.familyName"
        :gender="employee.gender"
      />
    </div>
  </div>
</template>

<script>
import Accesses from './Accesses.vue'
import EmployeeCard from './Employee-card.vue'
import NewEmployee from './NewEmployee.vue'
import EditingEmployee from './EditingEmployee.vue'
import DeleteEmployee from './DeleteEmployee.vue'

export default {
  name: 'RestaurantManagers',

  components: {
    EmployeeCard, Accesses, NewEmployee, EditingEmployee, DeleteEmployee
  },
  data: () => ({
    search: '',
    accesses: false,
    pstn: 'Senior',
    dashValue: [],
    frontValue: [],
    cashierValue: [],
    folioValue: [],
    chessValue: [],
    statsValue: [],
    reportsValue: [],
    roomboardValue: [],
    channelManagerValue: [],
    settingsValue: [],
    addEmployee: false,
    edit: false,
    deleteEmpl: false,
    employee: {},
    position: {label: 'Заведующий залом', value: 'restaurantManager'},
    restaurantManagers: JSON.parse(window.sessionStorage.restaurantManagers).employee,


    positions: [
      {
      value: 'Senior',
      label: 'Старший зав-залом'
      },
      {
      value: 'Junior',
      label: 'Младший зав-залом'
      },
      {
      value: 'Day',
      label: 'Дневной зав-залом'
      },
      {
      value: 'Night',
      label: 'Ночной зав-залом'
      },
      {
      value: 'Main',
      label: 'Главный зав-залом'
      }
    ],
  }),

  computed: {
    searchEmployee(){
      return this.restaurantManagers.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
        || post.lastName.toLowerCase().includes(this.search.toLowerCase())
        || post.familyName.toLowerCase().includes(this.search.toLowerCase())
      })
    },

    id() {
      return JSON.parse(window.sessionStorage.currentUser).user._id
    }
  },

  methods: {
    closeAccess() {
      this.accesses = false
    },

    close() {
      this.addEmployee = false
    },

    closeEdit() {
      this.edit = false
    },

    closeDelete() {
      this.deleteEmpl = false
    },

    getRestaurantManagers() {
      this.restaurantManagers = JSON.parse(window.sessionStorage.restaurantManagers).employee
    },

    async getAccesses() {
      await this.$store.dispatch('getMyEmployeesCount')
    },

    editEmployee(employee) {
      this.employee = employee
      this.edit = true
    },

    deleteEmployee(employee) {
      this.employee = employee
      this.deleteEmpl = true
    },

    refresh() {
      this.$forceUpdate(this.getRestaurantManagers)
    }
  }
}
</script>