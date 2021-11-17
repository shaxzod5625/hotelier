<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <NewTariff
        v-if="newTariff"

        @closeNewTariff="closeNewTariff"
      />

      <ArchivingTariffs
        v-if="archivingTariffs"

        @closeArchivingTariffs="closeArchivingTariffs"

        :tariffs="selectedTariffs"
      />

      <PrintingOutTariffs
        v-if="printingOutTariffs"

        @closePrintingOutTariffs="closePrintingOutTariffs"

        :tariffs="selectedTariffs"
      />

      <ExtendingTariffTerm
        v-if="extendTariffTerm"

        @closeExtendingTariffTerm="closeExtendingTariffTerm"

        :tariff="selectedTariff"
      />

      <DuplicatingTariff
        v-if="duplicateTariff"

        @closeDuplicatingTariff="closeDuplicatingTariff"

        :tariff="selectedTariff"
      />

      <UnarchivingTariff
        v-if="unarchiveTariff"

        @closeUnarchivingTariff="closeUnarchivingTariff"

        :tariff="selectedTariff"
      />

      <DeletingTariffs
        v-if="deleteTariffs"

        @closeDeletingTariffs="closeDeletingTariffs"

        :tariffs="selectedTariffs"
      />

    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Тарифы и цены</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar">
      <TabBar
        :tabs="['Тарифы', 'Архив тарифов']"
        :selected="selected"
        @selected="setSelected"
      >
      </TabBar>
      
      <div
        class="tabbar-btns"
      >
        <button
          class="sec-btn"
          @click="newTariff = true"
          v-if="selected === 'Тарифы'"
        >
          <img src="@/assets/icons/Add-sm.svg" alt="">
          Создать
        </button>

        <router-link
          tag="button"
          class="prim-btn"
          :to="{ name: 'Tariffs Settings'}"
        >
          <img src="@/assets/icons/Settings-sm-white.svg" alt="">
          Настройки
        </router-link>
      </div>
    </div>

    <ActiveTariffs
      v-if="selected === 'Тарифы'"

      @archiveTariff="archiveTariff"
      @printOutTariff="printOutTariff"
      @extendingTariffTerm="extendingTariffTerm"
    />

    <ArchivedTariffs
      v-if="selected === 'Архив тарифов'"

      @duplicatingTariff="duplicatingTariff"
      @printOutTariff="printOutTariff"
      @deletingTariffs="deletingTariffs"
      @unarchivingTariff="unarchivingTariff"
    />

  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue'
import Tab from '@/components/Tab.vue'
import ActiveTariffs from './tariffs/ActiveTariffs.vue'
import ArchivedTariffs from './tariffs/ArchivedTariffs.vue'
import NewTariff from './tariffs/NewTariff.vue'
import ArchivingTariffs from './tariffs/ArchivingTariffs.vue'
import PrintingOutTariffs from './tariffs/PrintingOutTariffs.vue'
import ExtendingTariffTerm from './tariffs/ExtendingTariffTerm.vue'
import DuplicatingTariff from './tariffs/DuplicatingTariff.vue'
import UnarchivingTariff from './tariffs/UnarchivingTariff.vue'
import DeletingTariffs from './tariffs/DeletingTariffs.vue'

export default {
  name: 'Tariffs',

  components: {
      TabBar, Tab, ActiveTariffs, NewTariff, ArchivingTariffs, PrintingOutTariffs, ExtendingTariffTerm, ArchivedTariffs, DuplicatingTariff,
      UnarchivingTariff, DeletingTariffs
    },

  data:() => ({
    selected: 'Тарифы',
    newTariff: false,
    archivingTariffs: false,
    printingOutTariffs: false,
    extendTariffTerm: false,
    duplicateTariff: false,
    unarchiveTariff: false,
    deleteTariffs: false,

    selectedTariffs: [],
    selectedTariff: {}


  }),

  methods: {
    setSelected(tab) {
      this.selected = tab;
    },

    archiveTariff(checkedTariffs) {
      this.archivingTariffs = true
      this.selectedTariffs = checkedTariffs
    },

    printOutTariff(checkedTariffs) {
      this.printingOutTariffs = true
      this.selectedTariffs = checkedTariffs
    },

    extendingTariffTerm(tariff) {
      this.extendTariffTerm = true
      this.selectedTariff = tariff
    },

    duplicatingTariff(tariff) {
      this.duplicateTariff = true
      this.selectedTariff = tariff
    },

    unarchivingTariff(tariff) {
      this.selectedTariff = tariff
      this.unarchiveTariff = true
    },

    deletingTariffs(checkedTariffs) {
      this.selectedTariffs = checkedTariffs
      this.deleteTariffs = true
    },

    closeNewTariff() {
      this.newTariff = false
    },

    closeArchivingTariffs() {
      this.archivingTariffs = false
    },

    closePrintingOutTariffs() {
      this.printingOutTariffs = false
    },

    closeExtendingTariffTerm() {
      this.extendTariffTerm = false
    },

    closeDuplicatingTariff() {
      this.duplicateTariff = false
    },

    closeUnarchivingTariff() {
      this.unarchiveTariff = false
    },

    closeDeletingTariffs() {
      this.deleteTariffs = false
    }
  }
}
</script>

<style>

</style>