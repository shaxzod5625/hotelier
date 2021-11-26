<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Реквизиты</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <form class="input-grid" @submit.prevent="submitHandler">

      <div class="col-1">
        <div class="w-100">
          <label for="input">Юридисечкое название компании</label>
          <el-input type="text" placeholder="Введите юридисечкое название компании" :class="{invalid: ($v.ComJurName.$dirty && !$v.ComJurName.required)}" v-model="ComJurName"></el-input>
          <span v-if="$v.ComJurName.$dirty && !$v.ComJurName.required" class="validation-error">Пожалуйста, укажите название</span>
        </div>
      </div>


      <div class="col-3">
        <div class="w-33">
          <label for="input">Банковский счёт</label>
          <el-input
            placeholder="Введите банковский счёт"
            :class="{invalid: ($v.BankAccount.$dirty && !$v.BankAccount.required)}"
            v-model="BankAccount"
            v-mask="'#### - #### - #### - #### - ####'"
          />
          <span v-if="$v.BankAccount.$dirty && !$v.BankAccount.required" class="validation-error">Пожалуйста, введите банковский счёт</span>
        </div>

        <div class="w-33">
          <label for="input">МФО</label>
          <el-input
            placeholder="Введите МФО"
            :class="{invalid: ($v.mfo.$dirty && !$v.mfo.required)}"
            v-model="mfo"
            v-mask="'#####'"
          />
          <span v-if="$v.mfo.$dirty && !$v.mfo.required" class="validation-error">Пожалуйста, введите МФО</span>
        </div>

        <div class="w-33">
          <label for="input">ИНН</label>
          <el-input
            placeholder="Введите ИНН"
            :class="{invalid: ($v.inn.$dirty && !$v.inn.required)}"
            v-model="inn"
            v-mask="'#########'"
          />
          <span v-if="$v.inn.$dirty && !$v.inn.required" class="validation-error">Пожалуйста, введите ИНН</span>
        </div>
      </div>

      <div class="col-3">
        <div class="w-33">
          <label for="input">ОКЭД</label>
          <el-input
            placeholder="Введите ОКЭД"
            :class="{invalid: ($v.oked.$dirty && !$v.oked.required)}"
            v-model="oked"
            v-mask="'#####'"
          />
          <span v-if="$v.oked.$dirty && !$v.oked.required" class="validation-error">Пожалуйста, введите ОКЭД</span>
        </div>

        <div class="w-33">
          <label for="input">Код плательщика НДС</label>
          <el-input
            placeholder="Введите код плательщика НДС"
            :class="{invalid: ($v.nds.$dirty && !$v.nds.required)}"
            v-model="nds"
            v-mask="'#### #### ####'"
          />
          <span v-if="$v.nds.$dirty && !$v.nds.required" class="validation-error">Пожалуйста, введите код плательщика НДС</span>
        </div>

        <div class="w-33">
          <label for="input">SWIFT</label>
          <el-input
            placeholder="Введите код SWIFT"
            :class="{invalid: ($v.swift.$dirty && !$v.swift.required)}"
            v-model="swift"
          />
          <span v-if="$v.swift.$dirty && !$v.swift.required" class="validation-error">Пожалуйста, введите код SWIFT</span>
        </div>
      </div>

      <h3 style="display: none">{{mySavedRequisites}}</h3>

      <div class="input-grid-btns">
        <button class="sec-btn" @click.prevent="onCancel">
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="saveMyRequisites"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import {required} from 'vuelidate/lib/validators'


export default {
  name: 'Requisites',

  data: () => ({
    ComJurName: '',
    BankAccount: '',
    mfo: '',
    inn: '',
    oked: '',
    nds: '',
    swift: ''
  }),

  validations: {
    ComJurName: {required},
    BankAccount: {required},
    mfo: {required},
    inn: {required},
    oked: {required},
    nds: {required},
    swift: {required}
  },

  computed: {
    mySavedRequisites() {
      if(window.sessionStorage.requisites === null || window.sessionStorage.requisites === undefined) {
        return ''
      } else {
        this.ComJurName = JSON.parse(window.sessionStorage.requisites).requisite.legalName
        this.BankAccount = JSON.parse(window.sessionStorage.requisites).requisite.accountNumber
        this.mfo = JSON.parse(window.sessionStorage.requisites).requisite.mfo
        this.inn = JSON.parse(window.sessionStorage.requisites).requisite.inn
        this.oked = JSON.parse(window.sessionStorage.requisites).requisite.oked
        this.nds = JSON.parse(window.sessionStorage.requisites).requisite.qqs
        this.swift = JSON.parse(window.sessionStorage.requisites).requisite.swift
      }
    }
  },

  methods: {
    async saveMyRequisites() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const myRequisites = {
        legalName: String(this.ComJurName),
        accountNumber: String(this.BankAccount),
        mfo: String(this.mfo),
        inn: String(this.inn),
        oked: String(this.oked),
        qqs: String(this.nds),
        swift: String(this.swift)
      }

      await this.$store.dispatch('requisite', myRequisites)
      await this.$store.dispatch('getSettingsFilling')

      console.log(window.sessionStorage.requisites);

      this.$message({
        message: "Изменения сохранены",
        type: 'success'})
    },

    onCancel(){
        this.show = false;
        this.$router.push('/settings');
    }
  }
}
</script>