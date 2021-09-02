<template>
  <div class="con-page" style="gap: 24px">
    <div class="guest-card"
      v-for="item in reside"
      :key="item"
    >
      <div class="card-header">
        <div class="nfl">
          <h3>{{item.nfl}}</h3>
        </div>
        <div class="r-n">
          <h3 class="room-num">{{item.roomcat}} {{item.roomtype}} № {{item.roomnum}}</h3>
        </div>
        <div class="l-ic">
            <img class="card-label" src="@/assets/icons/VIP.svg" alt=""
              v-if="item.vip === true"
            >
          <div class="iconblc">
            <img src="@/assets/icons/Extend.svg" alt="">
            <img src="@/assets/icons/Relocate.svg" alt="">
            <el-checkbox v-model="checked"></el-checkbox>
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
          <td class="pad-l-24">{{item.regnum}}</td>
          <td>{{item.citizenship}}</td>
          <td class="bookingnum">{{item.bookingnum}}</td>
          <td>{{item.checkin}}</td>
          <td>{{item.checkout}}</td>
          <td>{{item.amounttopay}}</td>
          <td class="pad-r-24">{{item.paymentstatus}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Reside',
    data: () => ({
      reside:
        [
          {nfl: 'ABDULLAYEV ABDULLA ABDULLAYEVICH',
          vip: true,
          roomcat: 'Стандарт',
          roomtype: 'Одноместный',
          roomnum: '203',
          regnum: '12345-1234-2021',
          citizenship: 'TAJIKISTAN',
          bookingnum: '00132 - 01/01/2020',
          checkin: '01/01/2021 14:00',
          checkout: '15/01/2021 11:00',
          amounttopay: '7 250 000 UZS',
          paymentstatus: 'Не оплачен'

          },
          {nfl: 'TOXIROV TOXIR TOXIROVICH',
          vip: false,
          roomcat: 'Люкс',
          roomtype: 'Одноместный',
          roomnum: '311',
          regnum: '12346-1234-2021',
          citizenship: 'UZBEKISTAN',
          bookingnum: '00132 - 01/01/2020',
          checkin: '01/01/2021 14:00',
          checkout: '15/01/2021 11:00',
          amounttopay: '7 250 000 UZS',
          paymentstatus: 'Оплачен'

          },
          {nfl: 'THOMAS FRANCIS MCDONNEL',
          vip: true,
          roomcat: 'Апартаменты',
          roomtype: 'Двухместный',
          roomnum: '312',
          regnum: '12347-1234-2021',
          citizenship: 'GREAT BRITAIN',
          bookingnum: '00132 - 01/01/2020',
          checkin: '01/01/2021 14:00',
          checkout: '15/01/2021 11:00',
          amounttopay: '7 250 000 UZS',
          paymentstatus: 'Оплачен'

          },
        ]
    })
}
</script>