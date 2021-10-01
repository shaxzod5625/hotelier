import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: [],
    chartOptions: [],
    logoutInfo: [],

    uidtst: [
      {filling: 'filled'},
      {filling: 'notfilled'},
      {filling: 'particularly'},
      {filling: 'notfilled'},
      {filling: 'filled'},
      {filling: 'particularly'},
      {filling: 'filled'},
      {filling: 'notfilled'},
      {filling: 'particularly'},
      {filling: 'notfilled'},
      {filling: 'filled'},
      {filling: 'particularly'},
      {filling: 'filled'}
    ],

    reside: [
      {
        nfl: 'ABDULLAYEV ABDULLA ABDULLAYEVICH',
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

      {
        nfl: 'TOXIROV TOXIR TOXIROVICH',
        vip: false,
        roomcat: 'Люкс',
        roomtype: 'Одноместный',
        roomnum: '311',
        regnum: '12346-1234-2021',
        citizenship: 'UZBEKISTAN',
        bookingnum: '00133 - 01/01/2020',
        checkin: '01/01/2021 14:00',
        checkout: '15/01/2021 11:00',
        amounttopay: '7 250 000 UZS',
        paymentstatus: 'Оплачен'
      },
      {
        nfl: 'THOMAS FRANCIS MCDONNEL',
        vip: true,
        roomcat: 'Апартаменты',
        roomtype: 'Двухместный',
        roomnum: '312',
        regnum: '12347-1234-2021',
        citizenship: 'GREAT BRITAIN',
        bookingnum: '00134 - 01/01/2020',
        checkin: '01/01/2021 14:00',
        checkout: '15/01/2021 11:00',
        amounttopay: '7 250 000 UZS',
        paymentstatus: 'Оплачен'
      },
    ],

    guestprofile: [
      {nfl: 'ABDULLAYEV ABDULLA ABDULLAYEVICH',
      vip: 'VIP гость',
      sex: 'Мужчина',
      citizenship: 'TAJIKISTAN',
      birthdate: '01/01/1970',
      passportSeries: 'AA 1234567',
      residecounts: '23',
      daycounts: '155',
      lastreside: '01/01/2021 14:00',
      residentnow: 'Проживает'

      },
      {nfl: 'TOXIROV TOXIR TOXIROVICH',
      vip: 'Гость',
      sex: 'Мужчина',
      citizenship: 'UZBEKISTAN',
      birthdate: '01/01/1970',
      passportSeries: 'AB 5726578',
      residecounts: '5',
      daycounts: '124',
      lastreside: '01/01/2021 14:00',
      residentnow: 'Не проживает'

      },
      {nfl: 'THOMAS FRANCIS MCDONNEL',
      vip: 'VIP гость',
      sex: 'Мужчина',
      citizenship: 'GREAT BRITAIN',
      birthdate: '01/01/1970',
      passportSeries: 'UK 8649725',
      residecounts: '17',
      daycounts: '253',
      lastreside: '01/01/2021 14:00',
      residentnow: 'Проживает'

      },
    ],
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.currentUser = user
      window.localStorage.currentUser = JSON.stringify(user)
    },
    SET_CHARTS_OPTIONS(state, chartOption) {
      state.chartOptions = chartOption
      window.localStorage.chartOptions = JSON.stringify(chartOption)
    },
    SET_USER_LOGOUT(state, logoutInfo) {
      state.logoutInfo = logoutInfo
      window.localStorage.logoutInfo = JSON.stringify(logoutInfo)
    }
  },
  actions: {
    async loginUser({commit}, loginInfo) {
      try {
        let response = await Api().post('/user/login', loginInfo)
        let user = response.data
        commit('SET_CURRENT_USER', user)
      } catch (error) {
      };
    },
    async getCharts({commit}) {
      let response = await Api().post('/user/charts')
      let chartOption = response.data
      commit('SET_CHARTS_OPTIONS', chartOption)
    },

    async logout({}) {
      await Api().get('/logout')
    },

    async isAuthenticated() {
      try {
        await Api().get('/authenticated')
      } catch {
        return {error: 'woops!'}
      }
    }
  },
  modules: {
  }
})
