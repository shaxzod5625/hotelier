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
        @on="preloaderOn"
        @offPreLoader="preloaderOff"
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
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
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
        @createFacility="creatingFacilityModal"
        @editFacility="editFacility"
        @deleteFacility="deleteFacility"
        @preloaderOn="preloaderOn"
      />

    
      <Accomodations
        v-if="selected === 'Удобства'"
        @createAccomodation="createAccomodation"
        @editAccomodation="editAccomodation"
        @deleteAccomodation="deleteAccomodation"
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


    service: {},
  }),

  computed: {
    
  },

  methods: {
    setPreLoaderOff() {
      this.preLoader = false
    },

    getFacilities() {

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

    refresh() {
      this.$forceUpdate(this.getFacilities())
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