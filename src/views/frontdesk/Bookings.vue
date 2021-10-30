<template>
  <div class="con-page" style="gap: 24px">
    <div class="guest-card"
      v-for="item in bookings"
      :key="item"
    >
      <div class="card-header">
        <div class="nfl">
          <h3>{{item.regnum}}</h3>
        </div>
        <div class="r-n">
          <h3 class="room-num">{{item.booker}}</h3>
        </div>
        <div class="l-ic">
            <img class="card-label" src="@/assets/icons/Guaranteed.svg" alt=""
              v-if="item.bookingtype === 'guaranteed'"
            >

            <img class="card-label" src="@/assets/icons/OTA.svg" alt=""
              v-if="item.bookingtype === 'OTA'"
            >
          <div class="iconblc">
            <img class="icon-box" src="@/assets/icons/Edit.svg" alt="">
            <img class="icon-box" src="@/assets/icons/Open.svg" alt="">
            <el-checkbox v-model="checked"></el-checkbox>
          </div>
        </div>
      </div>
      <table>
        <tr>
          <th class="pad-l-24">Количество номеров</th>
          <th>Количество гостей</th>
          <th>Заезд</th>
          <th>Выезд</th>
          <th>Сумма к оплате</th>
          <th>Статус оплаты</th>
          <th class="pad-r-24">Оплачивает</th>
        </tr>
        <tr>
          <td class="pad-l-24">{{item.roomcount}}</td>
          <td>{{item.guestcount}}</td>
          <td>{{item.checkin}}</td>
          <td>{{item.checkout}}</td>
          <td>{{item.amounttopay}}</td>
          <td>{{item.paymentstatus}}</td>
          <td class="pad-r-24">{{item.payingperson}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Reside',
    data: () => ({
      bookings:
        [
          {
            booker: 'ABDULLAYEV ABDULLA ABDULLAYEVICH',
            bookingtype: 'not guaranteed',
            roomcount: '12',
            guestcount: '16',
            bookingnum: '00132 - 01/01/2020',
            checkin: '01/01/2021 14:00',
            checkout: '15/01/2021 11:00',
            amounttopay: '7 250 000 UZS',
            paymentstatus: 'Не оплачен',
            payingperson: 'Гости'
          },

          {
            booker: 'DOLORES TRAVEL SERVICES',
            bookingtype: 'guaranteed',
            roomcount: '12',
            guestcount: '16',
            bookingnum: '00132 - 01/01/2020',
            checkin: '01/01/2021 14:00',
            checkout: '15/01/2021 11:00',
            amounttopay: '7 250 000 UZS',
            paymentstatus: 'Оплачен',
            payingperson: 'Гости'
          },

          {
            booker: 'ADVANTOUR',
            bookingtype: 'guaranteed',
            roomcount: '12',
            guestcount: '16',
            bookingnum: '00132 - 01/01/2020',
            checkin: '01/01/2021 14:00',
            checkout: '15/01/2021 11:00',
            amounttopay: '7 250 000 UZS',
            paymentstatus: 'Оплачен',
            payingperson: 'Гости'
          },

          {
            booker: 'VLADISLAVOV VLADISLAV VLADISLAVOVICH',
            bookingtype: 'OTA',
            roomcount: '12',
            guestcount: '16',
            bookingnum: '00132 - 01/01/2020',
            checkin: '01/01/2021 14:00',
            checkout: '15/01/2021 11:00',
            amounttopay: '7 250 000 UZS',
            paymentstatus: 'Оплачен',
            payingperson: 'Гости'
          },
        ]
    })
}
</script>