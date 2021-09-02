<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="breadcrump">Фронтдеск</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="tabbar">
      <TabBar
        :tabs="['Проживают', 'Заезжают', 'Выехали', 'Брони', 'Профили гостей']"
        :selected="selected"
        @selected="setSelected"
      >
      </TabBar>

      <button class="tabbar-btn"
        v-if="selected === 'Проживают'"
      >
        Разместить
      </button>

      <button class="tabbar-btn"
        v-if="selected === 'Заезжают'"
      >
        Разместить
      </button>

      <button class="tabbar-btn"
        v-if="selected === 'Выехали'"
      >
        Разместить
      </button>
      
      <button class="tabbar-btn"
        v-if="selected === 'Брони'"
      >
        Создать бронь
      </button>

    </div>

    <div
      v-if="selected === 'Проживают'"
      class="tab-conpage"
    >
      <Reside/>
    </div>

    <div
      v-if="selected === 'Заезжают'"
      class="tab-conpage"
    >
      <Checkingin/>
    </div>

    <div
      v-if="selected === 'Выехали'"
      class="tab-conpage"
    >
      <Checkedout/>
    </div>

    <div
      v-if="selected === 'Брони'"
      class="tab-conpage"
    >
      <Bookings/>
    </div>

    <div
      v-if="selected === 'Профили гостей'"
      class="tab-conpage"
    >
      <Guestprofile/>
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import Tab from '@/components/Tab.vue'
import Reside from '@/views/frontdesk/Reside.vue'
import Checkingin from './frontdesk/Checkingin.vue'
import Checkedout from './frontdesk/Checkedout.vue'
import Bookings from './frontdesk/Bookings.vue'
import Guestprofile from './frontdesk/Guestprofile.vue'



export default {
  name: 'Frontdesk',
  
  components: {
    TabBar, Tab, Reside, Checkingin, Checkedout, Bookings, Guestprofile
  },

  data() {
    return {
      selected: 'Проживают'
    }
  },

  methods: {
    setSelected(tab) {
      this.selected = tab;
    }
  }
}
</script>