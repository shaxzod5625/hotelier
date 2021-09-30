<template>
  <div class="modal-div">
    <h3>Настройки порфилей администраторов</h3>
    <div class="divider"/>
    <h4>Позиция</h4>
    <div class="form-100">
      <div class="w-100">
        <el-select
          v-model="value"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="divider"/>
    <h4>Разрешения</h4>
  </div>
</template>

<script>
export default {
  name: 'Accesses',

  data: () => ({
    options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value: []
  }),
  
}
</script>

<style>

</style>