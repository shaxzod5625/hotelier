import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: [],
    chartOptions: [],
    logoutInfo: [],


    blocks: [{
      blockID: 1,
      blockName: 'Основной',
      type: 'Основной',
      floors: [
        {
          level: 1,
          floorName: 'Этаж “Лобби”',
          rooms: ['101', '102', '103', '104', '105', '106']
        },
        {
          level: 2,
          floorName: 'Служебный этаж',
          rooms: ['201', '202', '203', '204', '205', '206']
        },
        {
          level: 3,
          floorName: '3й этаж',
          rooms: ['301', '302', '303', '304', '305', '306']
        },
        {
          level: 4,
          floorName: '4й этаж',
          rooms: ['401', '402', '403', '444', '405']
        },
        {
          level: 5,
          floorName: '5й этаж',
          rooms: ['501', '502', '503', '504', '505', '506']
        },]
    }],

    activeTariffs: [
      {name: 'Основной', type: 'main', discount: {availability: false, discountType: undefined, discountAmount: undefined}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'pending'},
      {name: 'Тариф “Весенний”', type: 'discount', discount: {availability: true, discountType: 'percent', discountAmount: '20'}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'active'},
      {name: 'Тариф “Новогодние скидки”', type: 'discount', discount: {availability: true, discountType: 'UZS', discountAmount: '100000'}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'notActive'},
      {name: 'Тариф “Летние скидки”', type: 'discount', discount: {availability: true, discountType: 'individual', discountAmount: undefined}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'notActive'},
    ],

    servicesList: [
      {name: 'Услуга “Будильник”', cost: '15000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: true},
      {name: 'Доставка цветов', cost: '22000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: false},
      {name: 'Wi-Fi', cost: 'free', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За один день', availability: true},
      {name: 'Аренда планшета', cost: '50000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'За один день', availability: false},
      {name: 'Бассейн', cost: '35000', payFreeRoomCats: [], category: 'cat3', measurementUnit: 'За один день', availability: false},
      {name: 'Глажка', cost: '15000', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За каждую вещь', availability: true},
      {name: 'Хим-чистка', cost: '40000', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За каждую вещь', availability: true},
      {name: 'Услуги трансфера', cost: '110000', payFreeRoomCats: [], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: false},
      {name: 'Услуга “NETFLIX”', cost: '10000', payFreeRoomCats: ['Люкс', 'Семейная комната', 'Апартаменты'], category: 'cat2', measurementUnit: 'За один день', availability: true},
      {name: 'Аренда ноутбука', cost: '75000', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За один день', availability: false},
    ],

    facilitiesList: [
      {name: 'Гладильная доска', cost: '40000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: true},
      {name: 'LCD телевизор', cost: 'free', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'За все время проживания', availability: false},
      {name: 'Диван', cost: 'free', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За все время проживания', availability: true},
      {name: 'Видео-проигрыватель', cost: '25000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'За один день', availability: false},
      {name: 'Компьютер', cost: '70000', payFreeRoomCats: [], category: 'cat3', measurementUnit: 'За один день', availability: false},
      {name: 'Вентиляция', cost: 'free', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За все время проживания', availability: true},
      {name: 'Вид на озеро', cost: 'free', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За все время проживания', availability: true},
      {name: 'Вид на лес', cost: 'free', payFreeRoomCats: [], category: 'cat1', measurementUnit: 'За все время проживания', availability: false},
      {name: 'Вид на город', cost: 'free', payFreeRoomCats: ['Люкс', 'Семейная комната', 'Апартаменты'], category: 'cat2', measurementUnit: 'За все время проживания', availability: true},
      {name: 'Туалетные принадлежности', cost: 'free', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За все время проживания', availability: false},
    ],

    roomFund: [{
      catName: 'Стандарт',
      catID: 'standart',
      rooms: [
        {roomNumber: '112', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Single', forSmokers: true, roomArea: 48},
        {roomNumber: '113', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
        {roomNumber: '114', mainBeds: 2, additionalBeds: 0, bathroom: 'United', bedType: 'Standart Double', forSmokers: true, roomArea: 48},
        {roomNumber: '115', mainBeds: 2, additionalBeds: 1, bathroom: 'Separated', bedType: 'Standart Single', forSmokers: false, roomArea: 48},
        {roomNumber: '116', mainBeds: 2, additionalBeds: 1, bathroom: 'United', bedType: 'Standart Triple', forSmokers: false, roomArea: 48},
        {roomNumber: '117', mainBeds: 2, additionalBeds: 0, bathroom: 'Joint', bedType: 'Standart Double', forSmokers: false, roomArea: 48}
      ]},
      {
      catName: 'Семейная комната',
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
      {
      catName: 'Люкс',
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
      {
      catName: 'Апартаменты',
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
    },
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
    },
  },
  modules: {
  }
})
