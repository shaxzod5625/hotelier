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
          <el-input type="text" placeholder="Введите банковский счёт" :class="{invalid: ($v.BankAccount.$dirty && !$v.BankAccount.required)}" v-model="BankAccount"></el-input>
          <span v-if="$v.BankAccount.$dirty && !$v.BankAccount.required" class="validation-error">Пожалуйста, введите банковский счёт</span>
        </div>

        <div class="w-33">
          <label for="input">МФО</label>
          <el-input type="text" placeholder="Введите МФО" :class="{invalid: ($v.mfo.$dirty && !$v.mfo.required)}" v-model="mfo"></el-input>
          <span v-if="$v.mfo.$dirty && !$v.mfo.required" class="validation-error">Пожалуйста, введите МФО</span>
        </div>

        <div class="w-33">
          <label for="input">ИНН</label>
          <el-input type="text" placeholder="Введите ИНН" :class="{invalid: ($v.inn.$dirty && !$v.inn.required)}" v-model="inn"></el-input>
          <span v-if="$v.inn.$dirty && !$v.inn.required" class="validation-error">Пожалуйста, введите ИНН</span>
        </div>
      </div>

      <div class="col-3">
        <div class="w-33">
          <label for="input">ОКЭД</label>
          <el-input type="text" placeholder="Введите ОКЭД" :class="{invalid: ($v.oked.$dirty && !$v.oked.required)}" v-model="oked"></el-input>
          <span v-if="$v.oked.$dirty && !$v.oked.required" class="validation-error">Пожалуйста, введите ОКЭД</span>
        </div>

        <div class="w-33">
          <label for="input">Код плательщика НДС</label>
          <el-input type="text" placeholder="Введите код плательщика НДС" :class="{invalid: ($v.nds.$dirty && !$v.nds.required)}" v-model="nds"></el-input>
          <span v-if="$v.nds.$dirty && !$v.nds.required" class="validation-error">Пожалуйста, введите код плательщика НДС</span>
        </div>

        <div class="w-33">
          <label for="input">SWIFT</label>
          <el-input type="text" placeholder="Введите код SWIFT" :class="{invalid: ($v.swift.$dirty && !$v.swift.required)}" v-model="swift"></el-input>
          <span v-if="$v.swift.$dirty && !$v.swift.required" class="validation-error">Пожалуйста, введите код SWIFT</span>
        </div>
      </div>

      <div class="input-grid-btns">
        <button class="sec-btn" @click.prevent="onCancel">
          <span>Отмена</span>
        </button>

        <button class="prim-btn" type="submit">
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

  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$router.push('/settings')
    },

    onCancel(){
        this.show = false;
        this.$router.push('/settings');
    }
  }
}
</script>