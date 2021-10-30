<template>
  <div class="con-page" style="gap: 24px">

<!-- filtering modal -->
    <div class="modal"
      v-if="filtering"
    >
      <form @submit.prevent="" class="form-filter">
        <h3>Фильтрация</h3>
        <div class="divider"></div>
        <label for="select">Статус гостя</label>
        <el-select v-model="guestStatus" placeholder="Выберите категорию">
          <el-option
            v-for="item in filgstatus"
            :key="item.guestStatus"
            :label="item.guestStatus"
            :value="item.guestStatus">
          </el-option>
        </el-select>

        <label for="select">Гражданство гостя</label>
        <el-select v-model="Citizenship" filterable placeholder="Выберите гражданство">
          <el-option
            v-for="item in filcitizenship"
            :key="item.Citizenship"
            :label="item.Citizenship"
            :value="item.Citizenship">
          </el-option>
        </el-select>

        <label for="select">Статус проживания</label>
        <el-select v-model="resideStatus" placeholder="Выберите статус оплаты">
          <el-option
            v-for="item in filrstatus"
            :key="item.resideStatus"
            :label="item.resideStatus"
            :value="item.resideStatus">
          </el-option>
        </el-select>

        <div class="modal-btns">
          <button
            class="sec-btn"
            @click="reset"
          >
            <span>Сбросить</span>
          </button>

          <button
            class="prim-btn"
            @click="filtering = false"
          >
            <span>OK</span>
          </button>
        </div>
      </form>
      <div class="modal-back"
        @click="filtering = false"
      >
      </div>
    </div>

    <div class="filter-block">
      <div class="search-bar">
        <input type="text" placeholder="Введите имя гостя или серию и номер паспорта" v-model="search">
        <h3>Сортировка: 
          <span v-if="guestStatus === '' && Citizenship === '' && resideStatus === ''">Все</span>
          <span v-else>{{guestStatus}}</span>
          <span>{{Citizenship}}</span>
          <span>{{resideStatus}}</span>
          <img v-if="guestStatus != '' || Citizenship != '' || resideStatus != ''" class="reset-icon" @click="reset" src="@/assets/icons/X-sm.svg" alt="">
        </h3>
      </div>
      <div class="button-bar">
        <div class="btns">
          <button class="sec-btn" @click="filtering = true">
            <img src="@/assets/icons/Filter-sm.svg" alt="">
            <span>Фильтр</span>
          </button>
        </div>
        <h3>
          Вид:
          <span>Карточки</span>
          <img src="@/assets/icons/Arrow-dwn.svg" alt="">
        </h3>
      </div>
    </div>

    <div v-if="filterGuestProfiles != ''">
      <div class="guest-card"
        v-for="(id, idx) in filterGuestProfiles"
        :key="idx"
      >
        <div class="card-header">
          <div class="nfl">
            <h3>{{id.nfl}}</h3>
          </div>
          <div class="r-n">
            <img style="width: 48px;" class="card-online" src="@/assets/icons/Online-rect.svg" alt=""
                v-if="id.residentnow === 'Проживает'"
              >
          </div>
          <div class="l-ic">
              <img class="card-label" src="@/assets/icons/VIP.svg" alt=""
                v-if="id.vip === 'VIP гость'"
              >
            <div class="iconblc">
              <img class="icon-box" src="@/assets/icons/Open.svg" alt="">
              <img class="icon-box" src="@/assets/icons/Checkin.svg" alt="">
            </div>
          </div>
        </div>
        <table>
          <tr>
            <th class="pad-l-24">Гражданство</th>
            <th>Пол</th>
            <th>Дата рождения</th>
            <th>Серия и № паспорта</th>
            <th>Количество посещений</th>
            <th>Количество дней</th>
            <th class="pad-r-24">Последний заезд</th>
          </tr>
          <tr>
            <td class="pad-l-24">{{id.citizenship}}</td>
            <td>{{id.sex}}</td>
            <td>{{id.birthdate}}</td>
            <td>{{id.passportSeries}}</td>
            <td>{{id.residecounts}}</td>
            <td>{{id.daycounts}}</td>
            <td class="pad-r-24">{{id.lastreside}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div
      v-else
      class="no-reults"
    >
      <h3>Результатов по поиску <span>"{{search}}"</span> среди гостей не найдено</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reside',
  data: () => ({
    search: '',
    filtering: false,
    checkingIn: false,
    guestStatus: '',
    Citizenship: '',
    resideStatus: '',


    filgstatus: [{
      guestStatus: 'VIP гость',
    }, {
      guestStatus: 'Гость',
    }],

    filcitizenship: [{
      Citizenship: 'Uzbekistan'
    }, {
      Citizenship: 'Ukraine'
    }, {
      Citizenship: 'Kazakhstan'
    }, {
      Citizenship: 'Japan'
    }, {
      Citizenship: 'Tajikistan'
    }, {
      Citizenship: 'Great Britain'
    }, {
      Citizenship: 'USA'
    }],

    filrstatus: [{
      resideStatus: 'Проживает',
    }, {
      resideStatus: 'Не проживает',
    }],
  }),

  computed: {
    searchGuestProfiles(){
      return this.$store.state.guestprofile.filter(post => {
        return post.nfl.toLowerCase().includes(this.search.toLowerCase())
        || post.passportSeries.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filterGuestProfiles(){
      return this.searchGuestProfiles.filter(post => {
        return post.vip.toLowerCase().includes(this.guestStatus.toLowerCase())
        && post.citizenship.toLowerCase().includes(this.Citizenship.toLowerCase())
        && post.residentnow.toLowerCase().includes(this.resideStatus.toLowerCase())
      })
    }
  },

  methods: {
    reset() {
      this.guestStatus = ''
      this.Citizenship = ''
      this.resideStatus = ''
    }
  }
}
</script>