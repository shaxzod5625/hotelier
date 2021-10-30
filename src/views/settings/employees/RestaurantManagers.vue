<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/employees'}" class="breadcrump">Сотрудники</el-breadcrumb-item>
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
        :nfl="employee.nfl"
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

    clerks: [
      {
        admin: '1',
        imageUrl: 'https://cdn2.momjunction.com/wp-content/uploads/2021/02/What-Is-A-Sigma-Male-And-Their-Common-Personality-Trait-910x1024.jpg',
        position: 'Старший',
        post: 'зав-залом',
        nfl: 'Aleksandrov Aleksandr Aleksandrovich',
        sex: 'male'
      },
      {
        admin: '2',
        imageUrl: '',
        position: 'Младший',
        post: 'зав-залом',
        nfl: 'Murzakov Ilya Ashkinaziyevich',
        sex: 'male'
      },
      {
        admin: '3',
        imageUrl: '',
        position: 'Дневной',
        post: 'зав-залом',
        nfl: 'Lebedeva Valeriya Ignatiyevna',
        sex: 'female'
      },
      {
        admin: '4',
        imageUrl: '',
        position: 'Ночной',
        post: 'зав-залом',
        nfl: 'Arutunyan Alina Nikolayevna',
        sex: 'female'
      },
      {
        admin: '5',
        imageUrl: '',
        position: 'Главный',
        post: 'зав-залом',
        nfl: 'Saveleva Yekaterina Pavlovna',
        sex: 'female'
      },
    ]
  }),

  computed: {
    searchEmployee(){
      return this.clerks.filter(post => {
        return post.nfl.toLowerCase().includes(this.search.toLowerCase())
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

    editEmployee() {
      this.edit = true
    },

    deleteEmployee() {
      this.deleteEmpl = true
    }
  }
}
</script>