<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="breadcrump">Настройки</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <SettingsCard/>
  </div>
</template>



<script>
import SettingsCard from './settings/SettingsCard.vue'


export default {
  components: { SettingsCard },
  name: 'Settings',
}
</script>