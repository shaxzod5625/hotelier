<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/employees'}" class="breadcrump">Сотрудники</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Администраторы</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="search-bar-empl">
      <div class="search-div">
        <input class="search-input" placeholder="Введите имя гостя или номер брони" v-model="search">
        <h4>Количество сотрудников: <span>{{searchEmployee.length}}</span></h4>
      </div>
      <div class="btn-div">
        <button
          class="sec-btn"
        >
          <img src="@/assets/icons/Settings-sm.svg" alt="">
          Добавить
        </button>
        <button
          class="prim-btn"
        >
          <img src="@/assets/icons/Add-person.svg" alt="">
          Добавить
        </button>
      </div>
    </div>

    <div class="con-page-grid5">
      <Employee-card
        v-for="(employee, idx) in searchEmployee" :key="idx"

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
import EmployeeCard from "./Employee-card.vue"

export default {
  name: 'Receptionists',

  components: {
    EmployeeCard
  },
  data: () => ({
    search: '',

    clerks: [
      {
        admin: '1',
        imageUrl: 'https://cdn2.momjunction.com/wp-content/uploads/2021/02/What-Is-A-Sigma-Male-And-Their-Common-Personality-Trait-910x1024.jpg',
        position: 'Старший',
        post: 'администратор',
        nfl: 'Aleksandrov Aleksandr Aleksandrovich',
        sex: 'male'
      },
      {
        admin: '2',
        imageUrl: '',
        position: 'Младший',
        post: 'администратор',
        nfl: 'Murzakov Ilya Ashkinaziyevich',
        sex: 'male'
      },
      {
        admin: '3',
        imageUrl: '',
        position: 'Дневной',
        post: 'администратор',
        nfl: 'Lebedeva Valeriya Ignatiyevna',
        sex: 'female'
      },
      {
        admin: '4',
        imageUrl: '',
        position: 'Ночной',
        post: 'администратор',
        nfl: 'Arutunyan Alina Nikolayevna',
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
}
</script>