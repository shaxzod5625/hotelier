<template>
  <div class="con-page">

    <AddingFacilities
      v-if="addingFacility"

      @closeAddingFacilityModal="closeAddingFacilityModal"
    />

    <AddingAccomodations
      v-if="addingAccomodation"

      @closeAddingAccomodationModal="closeAddingAccomodationModal"
    />

    <CreatingFacility
      v-if="creatingFacility"
      @closeCreatingFacilityModal="closeCreatingFacilityModal"
    />

    <CreatingAccomodation
      v-if="creatingAccomodation"
      @closeCreatingAccomodationModal="closeCreatingAccomodationModal"
    />

    <EditingFacility
      v-if="editingFacility"
      @closeEditingFacilityModal="closeEditingFacilityModal"

      :service="service"
    />

    <EditingAccomodation
      v-if="editingAccomodation"
      @closeEditingAccomodationModal="closeEditingAccomodationModal"

      :accomodation="accomodation"
    />

    <DeleteFacility
      v-if="deletingFacility"
      @closeDeleteFacilityModal="closeDeleteFacilityModal"

      :service="service"
    />

    <DeleteAccomodation
      v-if="deletingAccomodation"
      @closeDeleteAccomodationModal="closeDeleteAccomodationModal"

      :accomodation="accomodation"
    />

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

    <div
      v-if="selected === 'Услуги'"
      class="tab-conpage"
    >
      <Services
        @createFacility="creatingFacilityModal"
        @editFacility="editFacility"
        @deleteFacility="deleteFacility"
      />
    </div>

    <div
      v-if="selected === 'Удобства'"
      class="tab-conpage"
    >
      <Accomodations
        @createAccomodation="createAccomodation"
        @editAccomodation="editAccomodation"
        @deleteAccomodation="deleteAccomodation"
      />
    </div>


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

export default {
  name: 'Facilities',

  components: {
    TabBar, Tab, Services, Accomodations, AddingFacilities,
    AddingAccomodations, CreatingFacility, CreatingAccomodation,
    EditingFacility, EditingAccomodation, DeleteFacility, DeleteAccomodation
  },

  data:() => ({
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

  methods: {
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
    }
  }
}
</script>

<style>

</style>