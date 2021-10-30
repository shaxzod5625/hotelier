import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: [],
    chartOptions: [],
    logoutInfo: [],

    roomFund: [
      {catName: 'Стандарт',
      catID: 'standart',
        rooms: [
          {roomNumber: '112', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
          {roomNumber: '113', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
          {roomNumber: '114', mainBeds: 2, additionalBeds: 0, bathroom: 'United', bedType: 'Standart Double', forSmokers: true, roomArea: 48},
          {roomNumber: '115', mainBeds: 2, additionalBeds: 1, bathroom: 'Separated', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
          {roomNumber: '116', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Triple', forSmokers: false, roomArea: 48},
          {roomNumber: '117', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Double', forSmokers: false, roomArea: 48}
        ]},
      {catName: 'Семейная комната',
      catID: 'family-room',
        rooms: [
          {roomNumber: '112', mainBeds: 2, additionalBeds: 1, bathroom: 'Separated', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
          {roomNumber: '113', mainBeds: 2, additionalBeds: 0, bathroom: 'United', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
          {roomNumber: '114', mainBeds: 2, additionalBeds: 0, bathroom: 'Separated', bedType: 'Standart Double', forSmokers: true, roomArea: 48},
          {roomNumber: '115', mainBeds: 2, additionalBeds: 1, bathroom: 'Separated', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
          {roomNumber: '116', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
          {roomNumber: '117', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Triple', forSmokers: true, roomArea: 48},
          {roomNumber: '118', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
          {roomNumber: '119', mainBeds: 2, additionalBeds: 0, bathroom: 'Separated', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
        ]},
      {catName: 'Люкс',
      catID: 'lux',
        rooms: [
          {roomNumber: '112', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
          {roomNumber: '113', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Double', forSmokers: true, roomArea: 48},
          {roomNumber: '114', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
          {roomNumber: '115', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
          {roomNumber: '116', mainBeds: 2, additionalBeds: 1, bathroom: 'Separated', bedType: 'Standart Double', forSmokers: true, roomArea: 48},
          {roomNumber: '117', mainBeds: 2, additionalBeds: 0, bathroom: 'Separated', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
          {roomNumber: '118', mainBeds: 2, additionalBeds: 1, bathroom: 'Joint', bedType: 'Standart Triple', forSmokers: false, roomArea: 48},
          {roomNumber: '119', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Triple', forSmokers: true, roomArea: 48},
          {roomNumber: '120', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
          {roomNumber: '121', mainBeds: 2, additionalBeds: 0, bathroom: 'United', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
        ]},
      {catName: 'Апартаменты',
      catID: 'apartments',
        rooms: [
          {roomNumber: '112', mainBeds: 2, additionalBeds: 1, bathroom: 'Joint', bedType: 'Standart Double', forSmokers: true, roomArea: 48},
          {roomNumber: '113', mainBeds: 2, additionalBeds: 0, bathroom: 'Separated', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
          {roomNumber: '114', mainBeds: 2, additionalBeds: 0, bathroom: 'United', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
          {roomNumber: '115', mainBeds: 2, additionalBeds: 1, bathroom: 'Separated', bedType: 'Standart Triple', forSmokers: false, roomArea: 48},
          {roomNumber: '116', mainBeds: 2, additionalBeds: 1, bathroom: 'Joint', bedType: 'Standart Triple', forSmokers: true, roomArea: 48},
          {roomNumber: '117', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
          {roomNumber: '118', mainBeds: 2, additionalBeds: 1, bathroom: 'Separated', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
          {roomNumber: '119', mainBeds: 2, additionalBeds: 0, bathroom: 'Separated', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
          {roomNumber: '120', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Double', forSmokers: false, roomArea: 48},
          {roomNumber: '121', mainBeds: 2, additionalBeds: 0, bathroom: 'Separated', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
          {roomNumber: '122', mainBeds: 2, additionalBeds: 1, bathroom: 'Joint', bedType: 'Standart Triple', forSmokers: false, roomArea: 48},
          {roomNumber: '123', mainBeds: 2, additionalBeds: 0, bathroom: 'Separated', bedType: 'Standart Double', forSmokers: true, roomArea: 48},
        ]},
    ],

    employees: [
      
    ],

    dashPermission: [
      {value: '1', label: 'HTML'}, {value: '2', label: 'CSS'}, {value: '3', label: 'JavaScript'}
    ],

    frontPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    cashierPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    folioPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    chessPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    statsPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    reportsPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    roomboardPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    channelManagerPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    settingsPermission: [
      {value: 'HTML', label: 'HTML'}, {value: 'CSS', label: 'CSS'}, {value: 'JavaScript', label: 'JavaScript'}
    ],

    reside: [
      {
        id: 123456,
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
        paymentstatus: 'Не оплачен',
        checked: false
      },

      {
        id: 123457,
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
        paymentstatus: 'Оплачен',
        checked: false
      },
      {
        id: 123458,
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
        paymentstatus: 'Оплачен',
        checked: false
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
      window.sessionStorage.currentUser = JSON.stringify(user)
    },

    SET_CHARTS_OPTIONS(state, chartOption) {
      state.chartOptions = chartOption
      window.localStorage.chartOptions = JSON.stringify(chartOption)
    },

    SET_USER_LOGOUT(state, logoutInfo) {
      state.logoutInfo = logoutInfo
      window.localStorage.logoutInfo = JSON.stringify(logoutInfo)
    },

    ADD_NEW_CATEGORY(state, newCategory) {
      let addingCat = newCategory.reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});
      let roomFund = state.roomFund.concat(addingCat)
      state.roomFund = roomFund
    },

    ADD_NEW_ROOM(state, newRoomInfo) {
      const newRoom = newRoomInfo[0]

      const ID = newRoomInfo[1]
      const rf = state.roomFund
      const rooms = rf.find(cat => cat.catID == ID)
      let addingNewRoom = rooms.rooms.concat(newRoom)
      const editedCat = [
        {catID: ID,
          catName: rooms.catName,
          rooms: addingNewRoom
      }]

      let newRoomFund =  state.roomFund.map(obj => editedCat.find(o => o.catID == obj.catID) || obj);
      state.roomFund = newRoomFund
    }
  },


  actions: {
    async loginUser({commit}, loginInfo) {
      try {
        let response = await Api().post('/api/login', loginInfo)
        let user = response.data
        commit('SET_CURRENT_USER', user)
      } catch {
      };
    },
    async getCharts({commit}) {
      let response = await Api().post('/user/charts')
      let chartOption = response.data
      commit('SET_CHARTS_OPTIONS', chartOption)
    },

    async logout({}) {
      await Api().get('api/logout')
    },

    async isAuthenticated() {
      try {
        await Api().get('api/authenticated')
      } catch {
        return {error: 'woops!'}
      }
    },

    async createNewCategory({commit}, newCategory) {
      commit('ADD_NEW_CATEGORY', newCategory)
    },

    async createNewRoom({commit}, newRoomInfo) {
      commit('ADD_NEW_ROOM', newRoomInfo)
    }
  },
  modules: {
  }
})
