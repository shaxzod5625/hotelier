<template>
  <div class="con-page" style="gap: 24px">
    <div class="guest-card"
      v-for="item in guestprofile"
      :key="item"
    >
      <div class="card-header">
        <div class="nfl">
          <h3>{{item.nfl}}</h3>
        </div>
        <div class="r-n">
          <img style="width: 48px;" class="card-online" src="@/assets/icons/Online-rect.svg" alt=""
              v-if="item.residentnow === true"
            >
        </div>
        <div class="l-ic">
            <img class="card-label" src="@/assets/icons/VIP.svg" alt=""
              v-if="item.vip === true"
            >
          <div class="iconblc">
            <img src="@/assets/icons/Open.svg" alt="">
            <img src="@/assets/icons/Checkin.svg" alt="">
          </div>
        </div>
      </div>
      <table>
        <tr>
          <th class="pad-l-24">Гражданство</th>
          <th>Пол</th>
          <th>Дата рождения</th>
          <th>Количество посещений</th>
          <th>Количество дней</th>
          <th class="pad-r-24">Последний заезд</th>
        </tr>
        <tr>
          <td class="pad-l-24">{{item.citizenship}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.birthdate}}</td>
          <td>{{item.residecounts}}</td>
          <td>{{item.daycounts}}</td>
          <td class="pad-r-24">{{item.lastreside}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Reside',
    data: () => ({
      guestprofile:
        [
          {nfl: 'ABDULLAYEV ABDULLA ABDULLAYEVICH',
          vip: true,
          sex: 'Мужчина',
          citizenship: 'TAJIKISTAN',
          birthdate: '01/01/1970',
          residecounts: '23',
          daycounts: '155',
          lastreside: '01/01/2021 14:00',
          residentnow: true

          },
          {nfl: 'TOXIROV TOXIR TOXIROVICH',
          vip: false,
          sex: 'Мужчина',
          citizenship: 'UZBEKISTAN',
          birthdate: '01/01/1970',
          residecounts: '5',
          daycounts: '124',
          lastreside: '01/01/2021 14:00',
          residentnow: false

          },
          {nfl: 'THOMAS FRANCIS MCDONNEL',
          vip: true,
          sex: 'Мужчина',
          citizenship: 'GREAT BRITAIN',
          birthdate: '01/01/1970',
          residecounts: '17',
          daycounts: '253',
          lastreside: '01/01/2021 14:00',
          residentnow: true

          },
        ]
    })
}
</script>