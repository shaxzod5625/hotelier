<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import AdditionalLayout from './layouts/AdditionalLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

export default {
  name: 'app',

  components: {
    MainLayout, AdditionalLayout
  },

  computed: {
    layout() {
      return (this.$route.meta.layout || 'additional') + '-layout'
    }
  },
}
</script>
