<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <InvoiceForm
      v-if="invoiceForm"

        @closeInvoiceFormModal="closeInvoiceFormModal"
        @refresh="refresh"
      />

      <BookingConfirmationForm
        v-if="bookingConfForm"

        @closeBookingConfFormModal="closeBookingConfFormModal"
        @refresh="refresh"
      />

      <BookingCancellationForm
        v-if="bookingCancelForm"

        @closeBookingCancelFormModal="closeBookingCancelFormModal"
        @refresh="refresh"
      />

      <InternalRulesForm
        v-if="internalRulesForm"

        @closeInternalRulesFormModal="closeInternalRulesFormModal"
        @refresh="refresh"
      />

      <CheckInRulesForm
        v-if="checkInRulesForm"

        @closeCheckInRulesFormModal="closeCheckInRulesFormModal"
        @refresh="refresh"
      />

      <ReportsForm
        v-if="reportsForm"

        @closeReportsFormModal="closeReportsFormModal"
        @refresh="refresh"
      />
      
      <TariffsForm
        v-if="tariffsForm"

        @closeTariffsFormModal="closeTariffsFormModal"
        @refresh="refresh"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Шаблоны документов</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar" style="flex-direction: row-reverse;">
      <router-link
        class="prim-btn"
        tag="button"
        @click="addNewBlock = true"
        :to="{ name: 'Document Forms Settings'}"
      >
        <img src="@/assets/icons/Settings-sm-white.svg" alt="">
        Общие
      </router-link>
    </div>

    <div class="con-page-grid">
      <div
        class="doc-card"
      >
        <div class="big-icon">
          <img src="@/assets/icons/Big-dollar.svg" alt="">
        </div>

        <div class="div-card-body">
          <div class="card-icons">
            <img
              class="icon-box"
              src="@/assets/icons/Edit.svg"
              alt=""
              @click="invoiceForm = true"
            >
            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
          <div class="card-body-title">
            <h3>Инвойс</h3>
          </div>
        </div>
        
      </div>

      <div
        class="doc-card"
      >
        <div class="big-icon">
          <img src="@/assets/icons/Big-lock.svg" alt="">
        </div>

        <div class="div-card-body">
          <div class="card-icons">
            <img
              class="icon-box"
              src="@/assets/icons/Edit.svg"
              alt=""

              @click="bookingConfForm = true"
            >
            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
          <div class="card-body-title">
            <h3>Подтверждение брони</h3>
          </div>
        </div>
        
      </div>

      <div
        class="doc-card"
      >
        <div class="big-icon">
          <img src="@/assets/icons/Big-lock-cancelled.svg" alt="">
        </div>

        <div class="div-card-body">
          <div class="card-icons">
            <img
              class="icon-box"
              src="@/assets/icons/Edit.svg"
              alt=""

              @click="bookingCancelForm = true"
            >
            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
          <div class="card-body-title">
            <h3>Аннуляция брони</h3>
          </div>
        </div>
        
      </div>

      <div
        class="doc-card"
      >
        <div class="big-icon">
          <img src="@/assets/icons/Big-doc.svg" alt="">
        </div>

        <div class="div-card-body">
          <div class="card-icons">
            <img
              class="icon-box"
              src="@/assets/icons/Edit.svg"
              alt=""
              @click="internalRulesForm = true"
            >
            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
          <div class="card-body-title">
            <h3>Внутренние правила</h3>
          </div>
        </div>
        
      </div>

      <div
        class="doc-card"
      >
        <div class="big-icon">
          <img src="@/assets/icons/Big-checkin.svg" alt="">
        </div>

        <div class="div-card-body">
          <div class="card-icons">
            <img
              class="icon-box"
              src="@/assets/icons/Edit.svg"
              alt=""

              @click="checkInRulesForm = true"
            >
            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
          <div class="card-body-title">
            <h3>Правила заезда</h3>
          </div>
        </div>
        
      </div>

      <div
        class="doc-card"
      >
        <div class="big-icon">
          <img src="@/assets/icons/Big-reports.svg" alt="">
        </div>

        <div class="div-card-body">
          <div class="card-icons">
            <img
              class="icon-box"
              src="@/assets/icons/Edit.svg"
              alt=""
              @click="reportsForm = true"
            >
            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
          <div class="card-body-title">
            <h3>Отчёты</h3>
          </div>
        </div>
        
      </div>

      <div
        class="doc-card"
      >
        <div class="big-icon">
          <img src="@/assets/icons/Big-tariffs.svg" alt="">
        </div>

        <div class="div-card-body">
          <div class="card-icons">
            <img
              class="icon-box"
              src="@/assets/icons/Edit.svg"
              alt=""
              @click="tariffsForm = true"
            >
            <img class="icon-box" src="@/assets/icons/Print.svg" alt="">
          </div>
          <div class="card-body-title">
            <h3>Тарифы и цены</h3>
          </div>
        </div>
        
      </div>

    </div>

  </div>
</template>

<script>
import BookingConfirmationForm from './documentForms/BookingConfirmationForm.vue'
import BookingCancellationForm from './documentForms/BookingCancellationForm.vue'
import CheckInRulesForm from './documentForms/CheckInRulesForm.vue'
import InternalRulesForm from './documentForms/InternalRulesForm.vue'
import InvoiceForm from './documentForms/InvoiceForm.vue'
import ReportsForm from './documentForms/ReportsForm.vue'
import TariffsForm from './documentForms/TariffsForm.vue'

export default {
  name: 'DocumentForms',

  components: {
    BookingConfirmationForm, BookingCancellationForm, CheckInRulesForm, InternalRulesForm, InvoiceForm, ReportsForm, TariffsForm
  },

  data:() => ({
    bookingConfForm: false,
    bookingCancelForm: false,
    checkInRulesForm: false,
    internalRulesForm: false,
    invoiceForm: false,
    reportsForm: false,
    tariffsForm: false
  }),

  computed: {
  },

  methods: {
    async getDocFormsInfo() {
      try {
        await this.$store.dispatch('getDocFormsInfo')
      } catch {}
    },

    closeBookingConfFormModal() {
      this.bookingConfForm = false
    },

    closeBookingCancelFormModal() {
      this.bookingCancelForm = false
    },

    closeCheckInRulesFormModal() {
      this.checkInRulesForm = false
    },

    closeInternalRulesFormModal() {
      this.internalRulesForm = false
    },

    closeInvoiceFormModal() {
      this.invoiceForm = false
    },

    closeReportsFormModal() {
      this.reportsForm = false
    },

    closeTariffsFormModal() {
      this.tariffsForm = false
    },

    refresh() {
      this.$forceUpdate(this.getDocFormsInfo())
    }
  }
}
</script>

<style>

</style>