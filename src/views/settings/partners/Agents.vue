<template>
  <div class="con-page">

    <NewAgentPartner
      v-if="addPartnerModal"

      @closeAddPartner="closeAddPartner"
    />

    <ContractProlongation
      v-if="prolongContractModal"
      @closeProlongationModal="closeProlongationModal"
    />

    <EditingAgentPartner
      v-if="editPartnerModal"

      @closeEditingPartner="closeEditingPartner"

      :mainPhoneNumber="mainPhoneNumber"
      :additionalPhoneNumber="additionalPhoneNumber"
      :partnerName="partnerName"
      :country="country"
      :fax="fax"
      :email="email"
    />

    <DeletingAgentPartner
      v-if="deletePartnerModal"

      @closeDeletePartner="closeDeletePartner"

      :partnerName="partnerName"
    />

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/partners'}" class="breadcrump">Партнеры</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Агенты</el-breadcrumb-item>
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
                  {{partner.name.lastName}} {{partner.name.name}} {{partner.name.familyName}}
                </td>
              <td>{{partner.contract}}</td>
              <td>{{partner.contractTerm.startDate}} - {{partner.contractTerm.stopDate}}</td>
              <td class="list-last-el">
                <h3
                  v-if="partner.activity"
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
                    @click="prolongContractModal = true"
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
import NewAgentPartner from './NewAgentPartner.vue'
import ContractProlongation from './ContractProlongation.vue'
import EditingAgentPartner from './EditingAgentPartner.vue'
import DeletingAgentPartner from './DeletingAgentPartner.vue'

export default {
  name: 'Agents',

  components: {
    NewAgentPartner, ContractProlongation, EditingAgentPartner, DeletingAgentPartner
  },

  data:() => ({
    addPartnerModal: false,
    prolongContractModal: false,
    editPartnerModal: false,
    deletePartnerModal: false,


    partners: [
      {partnerType: 'agent', name: {name: 'Toxir', lastName: 'Toxirov', familyName: 'Toxirovich'}, country: 'Узбекистан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'dolores@biz.uz', contract: '№17 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: true},
      {partnerType: 'agent', name: {name: 'Toxir', lastName: 'Toxirov', familyName: 'Toxirovich'}, country: 'Казахстан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'advantour@biz.uz', contract: '№17 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: true},
      {partnerType: 'agent', name: {name: 'Toxir', lastName: 'Toxirov', familyName: 'Toxirovich'}, country: 'Узбекистан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'bcd@biz.uz', contract: '№18 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: false},
      {partnerType: 'agent', name: {name: 'Toxir', lastName: 'Toxirov', familyName: 'Toxirovich'}, country: 'Российская Федерация', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'travelornament@biz.uz', contract: '№19 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: true},
      {partnerType: 'agent', name: {name: 'Toxir', lastName: 'Toxirov', familyName: 'Toxirovich'}, country: 'Узбекистан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'novotours@biz.uz', contract: '№20 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: false},
    ]
  }),

  methods: {
    editPartner(partner) {
      this.mainPhoneNumber = partner.mainPhoneNumber
      this.additionalPhoneNumber = partner.additionalPhoneNumber
      this.partnerName = partner.name
      this.country = partner.country
      this.fax = partner.fax
      this.email = partner.email

      this.editPartnerModal = true
    },

    deletePartner(partner) {
      this.partnerName = partner.name

      this.deletePartnerModal = true
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
    }
  },
}
</script>

<style>

</style>