<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <NewActivationKey
        v-if="newKey"

        @closeNewActivationKey="closeNewActivationKey"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Активация продукта</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="input-grid-padless">
      <h4>Статус активации продукта</h4>

      <div class="col-2" style="margin-bottom: 12px">
        <div class="w-50-div">
          <div class="div-tbl">
            <p class="row-name">Статус активации:</p>
            <p class="row-content danger" v-if="currentStatus.status === 'activation needed'">Требуется активация</p>
            <p class="row-content success" v-if="currentStatus.status === 'activated'">Активирован</p>
            <p class="row-content warning" v-if="currentStatus.status === 'ending soon'">Скоро заканчивается срок активации</p>
          </div>

          <div class="div-tbl">
            <p class="row-name">Код активации:</p>
            <p class="row-content">{{currentStatus.key}}</p>
          </div>

          <div class="div-tbl">
            <p class="row-name">Дата деактивации:</p>
            <p class="row-content">{{currentStatus.deactivationDate}}</p>
          </div>
        </div>

        <div class="w-50-div">
          <div class="div-tbl-r">
            <p style="width: 100%; opacity: 0; text-align: end;">zeroOPacity</p>
          </div>

          <div
            class="div-tbl-r"
            @click="newKey = true"
          >
            <img src="@/assets/icons/keys-1.svg" alt="">
            <p>Изменить ключ продукта</p>
          </div>

          <div class="div-tbl-r">
            <p style="width: 100%; text-align: end;">Условия лицензионного соглашения на использование программного обеспечения</p>
          </div>
        </div>
      </div>

      <div class="divider"/>
      <h4>Архив ключей</h4>

      <div class="list-card" style="margin-top: 0">
        <table class="list-table">
          <tr>
            <th>Ключ</th>
            <th>Дата приобретения</th>
            <th>Дата активации</th>
            <th>Дата деактивации</th>
          </tr>
          <tr
            class="content-list"
            v-for="(key, idx) in activationKeys"
            :key="idx"
          >
            <div class="td-list">
              <div class="list-divider"></div>
              <div class="list-content">
                <td
                  class="list-first-el"
                >
                  {{key.key}}
                </td>
                <td>{{key.purchaseDate}}</td>
                <td>{{key.activationDate}}</td>
                <td class="list-last-el">
                  <h3>{{key.deactivationDate}}</h3>
                </td>
              </div>
            </div>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import NewActivationKey from './productActivation/NewActivationKey.vue'

export default {
  name: 'ProductActivation',

  components: {
    NewActivationKey
  },

  data:() => ({
    newKey: false,
    currentStatus: {status: 'activated', key: 'A67GD - ***** - ***** - ***** - JJS8D', deactivationDate: '31/12/2021'},

    activationKeys: [
      {key: 'KISD8 - ***** - ***** - ***** - LUW76', purchaseDate: '01.01.2021', activationDate: '01.02.2021', deactivationDate: '01.12.2021'},
      {key: 'DF923 - ***** - ***** - ***** - 5SDJ2', purchaseDate: '01.01.2021', activationDate: '01.02.2021', deactivationDate: '01.12.2021'},
      {key: '83LKE - ***** - ***** - ***** - JSD72', purchaseDate: '01.01.2021', activationDate: '01.02.2021', deactivationDate: '01.12.2021'},
      {key: '7NSD6 - ***** - ***** - ***** - OBS5N', purchaseDate: '01.01.2021', activationDate: '01.02.2021', deactivationDate: '01.12.2021'},
      {key: '2LYH3 - ***** - ***** - ***** - 1UUY7', purchaseDate: '01.01.2021', activationDate: '01.02.2021', deactivationDate: '01.12.2021'}
    ]
  }),

  methods: {
    closeNewActivationKey() {
      this.newKey = false
    }
  }
}
</script>

<style>

</style>