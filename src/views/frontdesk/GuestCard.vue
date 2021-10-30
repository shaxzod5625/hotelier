<template>
  <div class="guest-card">
    <div class="card-header">
      <div class="nfl">
        <h3>{{nfl}}</h3>
      </div>
      <div class="r-n">
        <h3 class="room-num">{{roomcat}} {{roomtype}} № {{roomnum}}</h3>
      </div>
      <div class="l-ic">
          <img class="card-label" src="@/assets/icons/VIP.svg" alt=""
            v-if="vip === true"
          >
        <div class="iconblc">
          <img
            class="icon-box"
            src="@/assets/icons/Extend.svg" alt=""
            @click="openExtendModal"
          >
          <img
            class="icon-box" 
            src="@/assets/icons/Relocate.svg" alt=""
            @click="openModal"
          >
          <el-checkbox
            :value="checked"
            @input="choosing"
          >
          </el-checkbox>
        </div>
      </div>
    </div>
    <table>
      <tr>
        <th class="pad-l-24">Регистрационный номер</th>
        <th>Гражданство</th>
        <th>Номер брони</th>
        <th>Заезд</th>
        <th>Выезд</th>
        <th>Сумма к оплате</th>
        <th class="pad-r-24">Статус оплаты</th>
      </tr>
      <tr>
        <td class="pad-l-24">{{regnum}}</td>
        <td>{{citizenship}}</td>
        <td class="bookingnum">{{bookingnum}}</td>
        <td>{{checkin}}</td>
        <td>{{checkout}}</td>
        <td>{{amounttopay}}</td>
        <td class="pad-r-24">{{paymentstatus}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'GuestCard',

  props: {
    idx: Number,
    id: Number,
    nfl: String,
    vip: Boolean,
    roomcat: String,
    roomtype: String,
    roomnum: String,
    regnum: String,
    citizenship: String,
    bookingnum: String,
    checkin: String,
    checkout: String,
    amounttopay: String,
    paymentstatus: String,
    checked: Boolean
  },

  methods: {
    openModal() {
      let roomnum = this.roomnum
      let nfl = this.nfl
      this.$emit('open', roomnum, nfl)
    },

    openExtendModal() {
      let mcheckout = this.checkout
      let nfl = this.nfl
      this.$emit('openExtend', nfl, mcheckout)
    },

    choosing(value) {
      let cbstatus = value
      let idex = this.id
      this.$emit('checkedBx', {cbstatus, idex})
      console.log(cbstatus, idex);
    }
  }
}
</script>

<style>

</style>