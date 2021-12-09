<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <NewPartner
        v-if="addPartnerModal"

        @closeAddPartner="closeAddPartner"
        @refresh="refresh"
        
        :type="'company'"
      />

      <ContractProlongation
        v-if="prolongContractModal"

        @closeProlongationModal="closeProlongationModal"
        @refresh="refresh"

        :type="'company'"
        :id="chosenPartner._id"
      />

      <EditingPartner
        v-if="editPartnerModal"

        @closeEditingPartner="closeEditingPartner"
        @refresh="refresh"

        :partner="chosenPartner"
        :type="'company'"
      />

      <DeletingPartner
        v-if="deletePartnerModal"

        @closeDeletePartner="closeDeletePartner"
        @refresh="refresh"

        :partner="chosenPartner"
        :type="'company'"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/partners'}" class="breadcrump">Партнеры</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Компании - партнёры</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar" style="flex-direction: row-reverse;">
      <button
        class="tabbar-btn"
        @click="addPartnerModal = true"
      >
        Добавить
      </button>
    </div>

    <div class="list-card">
      <table class="list-table">
        <tr>
          <th>Партнер</th>
          <th>Номер договора</th>
          <th>Срок договора</th>
          <th>Активность</th>
        </tr>
        <tr
          class="content-list"
          v-for="(partner, idx) in partners"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
                <td
                  class="category-name-2"
                  @click="editPartner(partner)"
                >
                  {{partner.shortName}}
                </td>
              <td>{{partner.contract[0].contractNumber}}</td>
              <td>{{setDateFormat(partner.contract[0].startedDate)}} - {{setDateFormat(partner.contract[0].finishedDate)}}</td>
              <td class="list-last-el">
                <h3
                  v-if="setActivity(partner.contract[0]) === true"
                  class="true"
                >
                  ДА
                </h3>
                <h3
                  v-else
                  class="false"
                >
                  НЕТ
                </h3>
                <div class="list-icon-box">
                  <img
                    @click="newContract(partner)"
                    class="icon-box"
                    src="@/assets/icons/Prolongation.svg" alt=""
                  >
                  <img
                    @click="editPartner(partner)"
                    class="icon-box"
                    src="@/assets/icons/Edit.svg" alt=""
                  >
                  <img
                    @click="deletePartner(partner)"
                    class="icon-box"
                    src="@/assets/icons/Delete.svg" alt=""
                  >
                </div>
              </td>
            </div>
          </div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import NewPartner from './NewPartner.vue'
import ContractProlongation from './ContractProlongation.vue'
import EditingPartner from './EditingPartner.vue'
import DeletingPartner from './DeletingPartner.vue'

export default {
  name: 'PartnerCompanies',

  components: {
    NewPartner, ContractProlongation, EditingPartner, DeletingPartner
  },

  data:() => ({
    addPartnerModal: false,
    prolongContractModal: false,
    editPartnerModal: false,
    deletePartnerModal: false,

    chosenPartner: '',

    partners: JSON.parse(window.sessionStorage.partners).companyPartners
  }),

  methods: {
    setActivity(chosenDate) {
      const parsedStart = JSON.stringify(chosenDate.startedDate)
      const parsedStop = JSON.stringify(chosenDate.finishedDate)
      const start = parsedStart[1]+parsedStart[2]+parsedStart[3]+parsedStart[4]+'/'+parsedStart[6]+parsedStart[7]+'/'+parsedStart[9]+parsedStart[10]
      const stop = parsedStop[1]+parsedStop[2]+parsedStop[3]+parsedStop[4]+'/'+parsedStop[6]+parsedStop[7]+'/'+parsedStop[9]+parsedStop[10]
      const current = new Date()
      const startDate = new Date(start)
      const stopDate = new Date(stop)

      if(startDate < current && current < stopDate) {
        return true
      } else {
        return false
      }
    },

    setDateFormat(date) {
      const localdate = new Date(date)
      const formatted = `${('0'+localdate.getDate()).slice(-2)}/${(('0'+localdate.getMonth())+2).slice(-2)}/${localdate.getFullYear()}`
      return formatted
    },

    getPartners() {
      this.partners = JSON.parse(window.sessionStorage.partners).companyPartners
    },

    editPartner(partner) {
      this.chosenPartner = partner

      this.editPartnerModal = true
    },

    deletePartner(partner) {
      this.chosenPartner = partner

      this.deletePartnerModal = true
    },

    newContract(partner) {
      this.chosenPartner = partner

      this.prolongContractModal = true
    },

    closeAddPartner() {
      this.addPartnerModal = false
    },

    closeProlongationModal() {
      this.prolongContractModal = false
    },

    closeEditingPartner() {
      this.editPartnerModal = false
    },

    closeDeletePartner() {
      this.deletePartnerModal = false
    },

    refresh() {
      this.$forceUpdate(this.getPartners())
    }
  },
}
</script>

<style>

</style>