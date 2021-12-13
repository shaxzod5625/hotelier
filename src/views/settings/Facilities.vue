<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <PreLoader
        v-if="preLoader === true"
      />

      <AddingFacilities
        v-if="addingFacility"

        @closeAddingFacilityModal="closeAddingFacilityModal"
        @refresh="refresh"
        @on="preloaderOn"
        @off="preloaderOff"
      />

      <AddingAccomodations
        v-if="addingAccomodation"

        @closeAddingAccomodationModal="closeAddingAccomodationModal"
        @refresh="refresh"
        @on="preloaderOn"
        @off="preloaderOff"
      />

      <CreatingFacility
        v-if="creatingFacility"

        @closeCreatingFacilityModal="closeCreatingFacilityModal"
        @refresh="refresh"
        @on="preloaderOn"
        @off="preloaderOff"
      />

      <CreatingAccomodation
        v-if="creatingAccomodation"

        @closeCreatingAccomodationModal="closeCreatingAccomodationModal"
        @refresh="refresh"
      />

      <EditingFacility
        v-if="editingFacility"

        @closeEditingFacilityModal="closeEditingFacilityModal"
        @refresh="refresh"
        @on="preloaderOn"
        @off="preloaderOff"

        :service="service"
      />

      <EditingAccomodation
        v-if="editingAccomodation"

        @closeEditingAccomodationModal="closeEditingAccomodationModal"
        @refresh="refresh"
        @on="preloaderOn"
        @off="preloaderOff"

        :accomodation="accomodation"
      />

      <DeleteFacility
        v-if="deletingFacility"

        @closeDeleteFacilityModal="closeDeleteFacilityModal"
        @refresh="refresh"
        @on="preloaderOn"
        @off="preloaderOff"

        :service="service"
      />

      <DeleteAccomodation
        v-if="deletingAccomodation"

        @closeDeleteAccomodationModal="closeDeleteAccomodationModal"
        @refresh="refresh"
        @on="preloaderOn"
        @off="preloaderOff"

        :accomodation="accomodation"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click.native="getSettingsFilling" :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Услуги и удобства</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar">
      <TabBar
        :tabs="['Услуги', 'Удобства']"
        :selected="selected"
        @selected="setSelected"
      >
      </TabBar>

      <button
        v-if="selected === 'Услуги'"
        class="tabbar-btn"
        @click="addingFacility = true"
      >
        Добавить
      </button>

      <button
        v-if="selected === 'Удобства'"
        class="tabbar-btn"
        @click="addingAccomodation = true"
      >
        Добавить
      </button>

    </div>


    <transition name="slide-fade" mode="out-in">

      <Services
        v-if="selected === 'Услуги'"

        :services.sync="services"

        @createFacility="creatingFacilityModal"
        @addingFacility="addingFacility = true"
        @editFacility="editFacility"
        @deleteFacility="deleteFacility"
        @refresh="refresh"
      />

    
      <Accomodations
        v-if="selected === 'Удобства'"
        
        :accomodations.sync="accomodations"

        @createAccomodation="createAccomodation"
        @addingAccomodation="addingAccomodation = true"
        @editAccomodation="editAccomodation"
        @deleteAccomodation="deleteAccomodation"
        @refresh="refresh"
      />

    </transition>


  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import Tab from '@/components/Tab.vue'
import Services from './facilities/Services.vue'
import Accomodations from './facilities/Accomodations.vue'
import AddingFacilities from './facilities/AddingFacilities.vue'
import AddingAccomodations from './facilities/AddingAccomodations.vue'
import CreatingFacility from './facilities/CreatingFacility.vue'
import CreatingAccomodation from './facilities/CreatingAccomodation.vue'
import EditingFacility from './facilities/EditingFacility.vue'
import EditingAccomodation from './facilities/EditingAccomodation.vue'
import DeleteFacility from './facilities/DeleteFacility.vue'
import DeleteAccomodation from './facilities/DeleteAccomodation.vue'
import PreLoader from '@/components/PreLoader.vue'

export default {
  name: 'Facilities',

  components: {
    TabBar, Tab, Services, Accomodations, AddingFacilities,
    AddingAccomodations, CreatingFacility, CreatingAccomodation,
    EditingFacility, EditingAccomodation, DeleteFacility, DeleteAccomodation, PreLoader
  },

  data:() => ({
    preLoader: false,
    selected: 'Услуги',
    addingFacility: false,
    addingAccomodation: false,
    creatingFacility: false,
    editingFacility: false,
    deletingFacility: false,
    editingAccomodation: false,
    creatingAccomodation: false,
    deletingAccomodation: false,

    allFacilities: JSON.parse(window.sessionStorage.facilities).accomodations,
    allServices: JSON.parse(window.sessionStorage.facilities).services,
  }),

  computed: {
    accomodations() {
      if(this.allFacilities !== null) {
        return this.allFacilities.accomodation
      } else return []
    },

    services() {
      if(this.allServices !== null) {
        return this.allServices.services
      } else return []
    }
  },

  methods: {
    getAllFacilities() {
      if(JSON.parse(window.sessionStorage.facilities).accomodations !== null) {
        this.allFacilities = JSON.parse(window.sessionStorage.facilities).accomodations
      } else this.allFacilities = []
    },

    getAllServices() {
      if(JSON.parse(window.sessionStorage.facilities).services !== null) {
        this.allServices = JSON.parse(window.sessionStorage.facilities).services
      } else this.allServices = []
    },

    setPreLoaderOff() {
      this.preLoader = false
    },

    setSelected(tab) {
      this.selected = tab;
    },

    editFacility(service) {
      this.editingFacility = true
      this.service = service
    },

    deleteFacility(service) {
      this.deletingFacility = true
      this.service = service
    },

    creatingFacilityModal() {
      this.creatingFacility = true
    },

    editAccomodation(accomodation) {
      this.editingAccomodation = true
      this.accomodation = accomodation
    },

    deleteAccomodation(accomodation) {
      this.deletingAccomodation = true
      this.accomodation = accomodation
    },

    createAccomodation() {
      this.creatingAccomodation = true
    },

    closeAddingFacilityModal() {
      this.addingFacility = false
    },

    closeAddingAccomodationModal() {
      this.addingAccomodation = false
    },

    closeCreatingFacilityModal() {
      this.creatingFacility = false
    },

    closeCreatingAccomodationModal() {
      this.creatingAccomodation = false
    },

    closeEditingFacilityModal() {
      this.editingFacility = false
    },

    closeEditingAccomodationModal() {
      this.editingAccomodation = false
    },

    closeDeleteFacilityModal() {
      this.deletingFacility = false
    },

    closeDeleteAccomodationModal() {
      this.deletingAccomodation = false
    },

    async getSettingsFilling() {
      await this.$store.dispatch('getSettingsFilling')
    },

    async refresh() {
      try {
        await this.$store.dispatch('getFacilitiesInfo')
        await this.$store.dispatch('getRoomsCount')
        await this.$store.dispatch('getFacilitiesList')
        await this.$store.dispatch('getServicesList')
      } catch {}

      this.$forceUpdate(this.getAllFacilities())
      this.$forceUpdate(this.getAllServices())
    },

    preloaderOn() {
      try {
          this.creatingAccomodation = false
        } catch {}
        
      this.preLoader = true
    },

    preloaderOff() {
      if(window.sessionStorage.preLoader === false) {
        this.$forceUpdate(this.setPreLoaderOff())

        this.preLoader = false
      }
    }
  }
}
</script>

<style>

</style>