<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Ценовая политика</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="input-grid">
      <h4>Сотрудники с доступом для редактирования цен в Фолио</h4>

      <div class="w-100">
        <label for="input">Сотрудники с высоким доступом</label>
        <el-select
          v-model="chosenEmployees"
          multiple
          collapse-tags
          placeholder="Выберите сотрудников"
        >
          <el-option
            v-for="(employee, idx) in employees"
            :key="idx"
            :value="employee.value"
            :label="employee.label"
          />
        </el-select>

        <div class="input-grid-btns">
          <router-link
            tag="button"
            class="sec-btn"
            :to="{ name: 'Settings'}"
          >
            Отмена
          </router-link>

          <button
            class="prim-btn"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PricePolicy',

  data:() => ({
    chosenEmployees: '',

    employees: [
      {label: 'Sadullayev Sanjar', value: '00123456'},
      {label: 'Abduraxmonov Boxodir', value: '00123457'},
      {label: 'Egamberdiyev Akobir', value: '00123458'},
      {label: 'Abdullayev Abdulla', value: '00123459'},
      {label: 'Aleksandrov Aleksandr', value: '00123460'},
      {label: 'Aleksandrova Aleksandra', value: '00123461'},
      {label: 'Murzakov Ilya', value: '00123462'},
      {label: 'Alekseyev Valeriy', value: '00123463'},
      {label: 'O`tkirov Dilshod', value: '00123464'},
      {label: 'Kim Valeriya', value: '00123465'},
      {label: 'Jo`rayev Toxir', value: '00123466'},
      {label: 'Kerimov Timur', value: '00123467'},
    ]
  }),
}
</script>

<style>

</style>