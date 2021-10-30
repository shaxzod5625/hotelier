<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/employees'}" class="breadcrump">Сотрудники</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Повара</el-breadcrumb-item>
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

    <div
      class="modal"
      v-if="accesses"
    >
      <Accesses
        @closeAccess="closeAccess"

        :pstn="pstn"
        :positions="positions"
        :value="positions.value"
        :label="positions.label"

        :dashVal.sync="dashValue"
        :frontVal.sync="frontValue"
        :cashierVal.sync="cashierValue"
        :folioVal.sync="folioValue"
        :chessVal.sync="chessValue"
        :statsVal.sync="statsValue"
        :reportsVal.sync="reportsValue"
        :roomboardVal.sync="roomboardValue"
        :channelManagerVal.sync="channelManagerValue"
        :settingsVal.sync="settingsValue"
      />
      <div class="modal-back"
        @click="accesses = false"
      >
      </div>
    </div>

    <NewEmployee
      v-if="addEmployee"
      @close="close"
    />
    
    <EditingEmployee
      v-if="edit"
      @closeEdit="closeEdit"

      :lastName="lastName"
      :name="name"
      :familyName="familyName" 
      :position="position"
      :post="post"
      :sex="sex"
      :phoneNumber="phoneNumber"
      :email="email"
      :login="login"
      :langs="langs"
    />

    <DeleteEmployee
      v-if="deleteEmpl"
      @closeDelete="closeDelete"
    />

    <div class="con-page-grid5">
      <Employee-card
        @edit="editEmployee"
        @deleteEmployee="deleteEmployee"
        v-for="(employee, idx) in searchEmployee"
        :key="idx"

        :imageUrl="employee.imageUrl"
        :position="employee.position"
        :post="employee.post"
        :name="employee.name"
        :lastName="employee.lastName"
        :familyName="employee.familyName"
        :sex="employee.sex"
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


    positions: [
      {
      value: 'Senior',
      label: 'Старший повар'
      },
      {
      value: 'Junior',
      label: 'Младший повар'
      },
      {
      value: 'Day',
      label: 'Дневной повар'
      },
      {
      value: 'Night',
      label: 'Ночной повар'
      },
      {
      value: 'Main',
      label: 'Главный повар'
      }
    ],

    employees: [
      {
        emplId: '001',
        imageUrl: 'https://cdn2.momjunction.com/wp-content/uploads/2021/02/What-Is-A-Sigma-Male-And-Their-Common-Personality-Trait-910x1024.jpg',
        position: 'Старший',
        post: 'повар',
        name: 'Aleksandr',
        lastName: 'Aleksandrov',
        familyName: 'Aleksandrovich',
        sex: 'male'
      },
      {
        emplId: '002',
        imageUrl: '',
        position: 'Младший',
        post: 'повар',
        name: 'Ilya',
        lastName: 'Murzakov',
        familyName: 'Ashkinaziyevich',
        sex: 'male'
      },
      {
        emplId: '003',
        imageUrl: '',
        position: 'Дневной',
        post: 'повар',
        name: 'Valeriya',
        lastName: 'Lebedeva',
        familyName: 'Ignatiyevna',
        sex: 'female'
      },
      {
        emplId: '004',
        imageUrl: '',
        position: 'Ночной',
        post: 'повар',
        name: 'Alina',
        lastName: 'Arutunyan',
        familyName: 'Nikolayevna',
        sex: 'female'
      },
      {
        emplId: '005',
        imageUrl: '',
        position: 'Главный',
        post: 'повар',
        name: 'Yekaterina',
        lastName: 'Saveleva',
        familyName: 'Pavlovna',
        sex: 'female'
      },
    ]
  }),

  computed: {
    searchEmployee(){
      return this.employees.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
        && post.lastName.toLowerCase().includes(this.search.toLowerCase())
        && post.familyName.toLowerCase().includes(this.search.toLowerCase())
      })
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

    editEmployee(emplId) {
      this.edit = true
    },

    deleteEmployee() {
      this.deleteEmpl = true
    }
  }
}
</script>