<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <NewPartner
        v-if="addPartnerModal"

        @closeAddPartner="closeAddPartner"
      />

      <ContractProlongation
        v-if="prolongContractModal"
        @closeProlongationModal="closeProlongationModal"
      />

      <EditingPartner
        v-if="editPartnerModal"

        @closeEditingPartner="closeEditingPartner"

        :mainPhoneNumber="mainPhoneNumber"
        :additionalPhoneNumber="additionalPhoneNumber"
        :partnerName="partnerName"
        :partnerLegalName="partnerLegalName"
        :country="country"
        :fax="fax"
        :email="email"
      />

      <DeletingPartner
        v-if="deletePartnerModal"

        @closeDeletePartner="closeDeletePartner"

        :partnerName="partnerName"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/partners'}" class="breadcrump">Партнеры</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Туристические агентства</el-breadcrumb-item>
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
                  {{partner.name}}
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
import NewPartner from './NewPartner.vue'
import ContractProlongation from './ContractProlongation.vue'
import EditingPartner from './EditingPartner.vue'
import DeletingPartner from './DeletingPartner.vue'

export default {
  name: 'TourAgencies',

  components: {
    NewPartner, ContractProlongation, EditingPartner, DeletingPartner
  },

  data:() => ({
    addPartnerModal: false,
    prolongContractModal: false,
    editPartnerModal: false,
    deletePartnerModal: false,


    partners: [
      {partnerType: 'tourCompany', name: 'Dolores Travel Services', legalName: 'OOO "Dolores Travel Services"', country: 'Узбекистан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'dolores@biz.uz', contract: '№17 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: true},
      {partnerType: 'tourCompany', name: 'Advantour', legalName: 'OOO "Advantour"', country: 'Казахстан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'advantour@biz.uz', contract: '№17 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: true},
      {partnerType: 'tourCompany', name: 'BCD Travel', legalName: 'OOO "BCD Travel"', country: 'Узбекистан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'bcd@biz.uz', contract: '№18 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: false},
      {partnerType: 'tourCompany', name: 'Travel Ornament', legalName: 'OOO "Travel Ornament"', country: 'Российская Федерация', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'travelornament@biz.uz', contract: '№19 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: true},
      {partnerType: 'tourCompany', name: 'Novotours', legalName: 'OOO "Novotours"', country: 'Узбекистан', mainPhoneNumber: '+998 (90) 987-65-43', additionalPhoneNumber: '+998 (90) 987-65-43', fax: '+998 (90) 987-65-43', email: 'novotours@biz.uz', contract: '№20 - 09/2021', contractTerm: {startDate: '01/01/2021', stopDate: '31/12/2021'}, activity: false},
    ]
  }),

  methods: {
    editPartner(partner) {
      this.mainPhoneNumber = partner.mainPhoneNumber
      this.additionalPhoneNumber = partner.additionalPhoneNumber
      this.partnerName = partner.name
      this.partnerLegalName = partner.legalName
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