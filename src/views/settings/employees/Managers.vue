<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/employees'}" class="breadcrump">Сотрудники</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Менеджеры</el-breadcrumb-item>
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
      <div
        class="modal"
        v-if="accesses"
      >
        <Accesses
          @closeAccess="closeAccess"

          :position="'manager'"
        />
        <div class="modal-back"
          @click="accesses = false"
        >
        </div>
      </div>


      <NewEmployee
        v-if="addEmployee"
        :position="position"

        @close="close"
        @refresh="getManagers"
      />

      <EditingEmployee
        v-if="edit"
        @closeEdit="closeEdit"
        @refresh="getManagers"

        :employee="employee"
      />

      <DeleteEmployee
        v-if="deleteEmpl"
        @closeDelete="closeDelete"
        @refresh="getManagers"

        :employee="employee"
      />
    </transition>
    
    <div class="con-page-grid5">
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
  name: 'Managers',

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
    position: {label: 'Менеджер', value: 'manager'},
    managers: JSON.parse(window.sessionStorage.managers).employee,


    positions: [
      {
      value: 'Senior',
      label: 'Старший менеджер'
      },
      {
      value: 'Junior',
      label: 'Младший менеджер'
      },
      {
      value: 'Day',
      label: 'Дневной менеджер'
      },
      {
      value: 'Night',
      label: 'Ночной менеджер'
      },
      {
      value: 'Main',
      label: 'Главный менеджер'
      }
    ],
  }),

  computed: {
    searchEmployee(){
      return this.managers.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
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

    getManagers() {
      this.managers = JSON.parse(window.sessionStorage.managers).employee
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
      this.$forceUpdate(this.getManagers)
    }
  }
}
</script>