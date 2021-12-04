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

    SET_SETTINGS_FILLING(state, filling) {
      state.settingsFilling = filling
      window.sessionStorage.settingsFilling = JSON.stringify(filling)
    },

    SET_MY_OBJECT(state, myObject) {
      state.myObject = myObject
      window.sessionStorage.myObject = JSON.stringify(myObject)
    },

    SET_MY_REQUISITES(state, reqs) {
      state.requisites = reqs
      window.sessionStorage.requisites = JSON.stringify(reqs)
    },

    SET_MY_EMPLOYEES(state, emps) {
      state.employees = emps
      window.sessionStorage.employees = JSON.stringify(emps)
    },

    SET_ROOMS_COUNT(state, allCategories) {
      state.allRoomCats = allCategories
      window.sessionStorage.allRoomCats = JSON.stringify(allCategories)
    },

    SET_BLOCKS(state, allBlocks) {
      state.allBlocks = allBlocks
      window.sessionStorage.allBlocks = JSON.stringify(allBlocks)
    },


// Setting up Employees

    SET_MY_MANAGERS(state, myManagers) {
      state.managers = myManagers
      window.sessionStorage.managers = JSON.stringify(myManagers)
    },

    SET_MY_RESTAURANT_MANAGERS(state, myRestaurantManagers) {
      state.restaurantManagers = myRestaurantManagers
      window.sessionStorage.restaurantManagers = JSON.stringify(myRestaurantManagers)
    },

    SET_MY_RECEPTIONISTS(state, myReceptionists) {
      state.receptionists = myReceptionists
      window.sessionStorage.receptionists = JSON.stringify(myReceptionists)
    },

    SET_MY_COOKS(state, myCooks) {
      state.cooks = myCooks
      window.sessionStorage.cooks = JSON.stringify(myCooks)
    },

    SET_MY_MAIDS(state, myMaids) {
      state.maids = myMaids
      window.sessionStorage.maids = JSON.stringify(myMaids)
    },

    SET_MY_WAITERS(state, myWaiters) {
      state.waiters = myWaiters
      window.sessionStorage.waiters = JSON.stringify(myWaiters)
    },

//////////


    SET_RESPONSE_STATUS(state, responseStatus) {
      state.status = responseStatus
      window.sessionStorage.status = JSON.stringify(responseStatus)
    },


    
// Setting Accesses of Employees

    SET_ACCESSES_MANAGERS(state, accesses) {
      state.managerAccesses = accesses
      window.sessionStorage.managerAccesses = JSON.stringify(accesses)
    },

    SET_ACCESSES_RECEPTIONISTS(state, accesses) {
      state.receptionistAccesses = accesses
      window.sessionStorage.receptionistAccesses = JSON.stringify(accesses)
    },

    SET_ACCESSES_RESTAURANT_MANAGERS(state, accesses) {
      state.restaurantManagerAccesses = accesses
      window.sessionStorage.restaurantManagerAccesses = JSON.stringify(accesses)
    },

    SET_ACCESSES_MAIDS(state, accesses) {
      state.maidAccesses = accesses
      window.sessionStorage.maidAccesses = JSON.stringify(accesses)
    },

    SET_ACCESSES_WAITERS(state, accesses) {
      state.waiterAccesses = accesses
      window.sessionStorage.waiterAccesses = JSON.stringify(accesses)
    },

    SET_ACCESSES_COOKS(state, accesses) {
      state.cookAccesses = accesses
      window.sessionStorage.cookAccesses = JSON.stringify(accesses)
    },

///////////////////////////////////////




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

  },


  actions: {
    async loginUser({commit}, loginInfo) {
      try {
        let response = await Api().post('/api/login', loginInfo)
        let user = response.data
        commit('SET_CURRENT_USER', user)
        
        if(JSON.parse(window.sessionStorage.currentUser) != undefined && JSON.parse(window.sessionStorage.currentUser) != null) {
          let settingsResponse = await Api().get('/api/settings')
          let filling = settingsResponse.data
          commit('SET_SETTINGS_FILLING', filling)
        } else {}
      } catch {
      };
    },

    async getSettingsFilling({commit}) {
      try {
        let settingsResponse = await Api().get('/api/settings')
        let filling = settingsResponse.data
        commit('SET_SETTINGS_FILLING', filling)
      } catch {}
    },


// Getting Accesses of employees

    async getAccessesManagers({commit}, name) {
      const position = name

      try {
        let response = await Api().get(`api/settings/employee/access/${position}`)
        let accesses = response.data

        commit('SET_ACCESSES_MANAGERS', accesses)
      } catch {}
    },

    async getAccessesReceptionists({commit}, name) {
      const position = name

      try {
        let response = await Api().get(`api/settings/employee/access/${position}`)
        let accesses = response.data

        commit('SET_ACCESSES_RECEPTIONISTS', accesses)
      } catch {}
    },

    async getAccessesRestaurantManagers({commit}, name) {
      const position = name

      try {
        let response = await Api().get(`api/settings/employee/access/${position}`)
        let accesses = response.data

        commit('SET_ACCESSES_RESTAURANT_MANAGERS', accesses)
      } catch {}
    },

    async getAccessesMaids({commit}, name) {
      const position = name

      try {
        let response = await Api().get(`api/settings/employee/access/${position}`)
        let accesses = response.data

        commit('SET_ACCESSES_MAIDS', accesses)
      } catch {}
    },

    async getAccessesWaiters({commit}, name) {
      const position = name

      try {
        let response = await Api().get(`api/settings/employee/access/${position}`)
        let accesses = response.data

        commit('SET_ACCESSES_WAITERS', accesses)
      } catch {}
    },

    async getAccessesCooks({commit}, name) {
      const position = name

      try {
        let response = await Api().get(`api/settings/employee/access/${position}`)
        let accesses = response.data

        commit('SET_ACCESSES_COOKS', accesses)
      } catch {}
    },

///////////////



    async objectReg({commit}, myObject) {
      try {
        let myObj = JSON.parse(window.sessionStorage.myObject)

        if(myObj.objectRegister === undefined || myObj.objectRegister === null) {
          await Api().post('api/settings/object-registration', myObject)

          let response = await Api().get('/api/settings/object-registration')
          let object = response.data

          commit('SET_MY_OBJECT', object)

        } else {
          await Api().put('api/settings/object-registration', myObject)
          let response = await Api().get('/api/settings/object-registration')
          let object = response.data

          commit('SET_MY_OBJECT', object)
        }
      } catch {
      }
    },

    async requisite({commit}, myRequisites) {
      try {
        let requisit = JSON.parse(window.sessionStorage.requisites)

        if(requisit.requisite === undefined || requisit.requisite === null) {
          let responsee = await Api().post('/api/settings/requisite', myRequisites)
          console.log(responsee);

          let response = await Api().get('/api/settings/requisite')
          let reqs = response.data

          commit('SET_MY_REQUISITES', reqs)
        } else {
          let responsee = await Api().put('/api/settings/requisite', myRequisites)

          let response = await Api().get('/api/settings/requisite')
          let reqs = response.data

          commit('SET_MY_REQUISITES', reqs)
        }
      } catch {}
    },

    async editAccesses({commit}, access) {
      const position = access.position

      try {
        let response = await Api().put(`api/settings/employee/access/${position}s`, access)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async newRoomCategory({commit}, newCategory) {

      try {
        let response = await Api().post('/api/settings/rooms/news', newCategory)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },



// Getters

    async getMyObject({commit}) {
      try {
        let response = await Api().get('/api/settings/object-registration')
        let myObject = response.data

        commit('SET_MY_OBJECT', myObject)
      } catch {}
    },

    async getMyRequisites({commit}) {
      try {
        let response = await Api().get('/api/settings/requisite')
        let myRequisites = response.data

        commit('SET_MY_REQUISITES', myRequisites)
      } catch {}
    },

    async getMyEmployeesCount({commit}) {
      try {
        let response = await Api().get('/api/settings/employee')
        let myEmployees = response.data

        commit('SET_MY_EMPLOYEES', myEmployees)
      } catch {}
    },

    async getRoomsCount({commit}) {
      try {
        let response = await Api().get('/api/settings/rooms')
        let allCategories = response.data

        commit('SET_ROOMS_COUNT', allCategories)
      } catch {}
    },

    async getBlocksInfo({commit}) {
      try {
        let response = await Api().get('/api/settings/blocks')
        let allBlocks = response.data

        commit('SET_BLOCKS', allBlocks)
      } catch {}
    },

    async getMyEmployeesManagers({commit}) {
      try {
        let response = await Api().get('/api/settings/employee/managers')
        let myManagers = response.data

        commit('SET_MY_MANAGERS', myManagers)
      } catch {}
    },

    async getMyEmployeesRestaurantManagers({commit}) {
      try {
        let response = await Api().get('/api/settings/employee/restaurantManagers')
        let myRestaurantManagers = response.data

        commit('SET_MY_RESTAURANT_MANAGERS', myRestaurantManagers)
      } catch {}
    },

    async getMyEmployeesReceptionists({commit}) {
      try {
        let response = await Api().get('/api/settings/employee/receptionists')
        let myReceptionists = response.data

        commit('SET_MY_RECEPTIONISTS', myReceptionists)
      } catch {}
    },

    async getMyEmployeesCooks({commit}) {
      try {
        let response = await Api().get('/api/settings/employee/cooks')
        let myCooks = response.data

        commit('SET_MY_COOKS', myCooks)
      } catch {}
    },

    async getMyEmployeesMaids({commit}) {
      try {
        let response = await Api().get('/api/settings/employee/maids')
        let myMaids = response.data

        commit('SET_MY_MAIDS', myMaids)
      } catch {}
    },

    async getMyEmployeesWaiters({commit}) {
      try {
        let response = await Api().get('/api/settings/employee/waiters')
        let myWaiters = response.data

        commit('SET_MY_WAITERS', myWaiters)
      } catch {}
    },

/////////////////////////////////////



// Employees

    async newEmployee({commit}, employee) {
      const position = employee.position

      try {
        let response = await Api().post(`/api/settings/employee/${position.value}s`, employee)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async editEmployee({commit}, employee) {
      const position = employee.position
      const id = employee.id

      try {
        let response = await Api().put(`/api/settings/employee/${position}/${id}`, employee)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async deleteEmployee({commit}, employee) {
      const position = employee.position
      const id = employee._id

      try {
        let response = await Api().delete(`/api/settings/employee/${position}/${id}`)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },


//////////////////////////////////////
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

    async createNewRoom({commit}, creatingRoomInfo) {
      const category = creatingRoomInfo.category
      const newRoom = creatingRoomInfo.room

      let response = await Api().post(`/api/settings/rooms/${category}/new`, newRoom)
      let responseStatus = response.data

      commit('SET_RESPONSE_STATUS', responseStatus)
    },

    async deleteRoomCategory({commit}, category) {
      let response = await Api().delete(`/api/settings/rooms/${category}`)
      let responseStatus = response.data

      commit('SET_RESPONSE_STATUS', responseStatus)
    },

    async deleteRoom({commit}, deletingRoomInfo) {
      const category = deletingRoomInfo.category
      const roomNumber = deletingRoomInfo.roomNumber

      let response = await Api().delete(`/api/settings/rooms/${category}/${roomNumber}`)
      let responseStatus = response.data

      commit('SET_RESPONSE_STATUS', responseStatus)
    },

    async editRoom({commit}, editingroomInfo) {
      const category = editingroomInfo.category
      const roomNumber = editingroomInfo.currentNumber
      const room = editingroomInfo.room

      let response = await Api().put(`/api/settings/rooms/${category}/${roomNumber}`, room)
      let responseStatus = response.data

      commit('SET_RESPONSE_STATUS', responseStatus)
    },

    async newBlock({commit}, block) {
      try {
        let response = Api().post('/api/settings/blocks/new', block)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async editBlock({commit}, block) {
      const id = block._id

      try {
        let response = await Api().put(`/api/settings/blocks/${id}`, block)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async deleteBlock({commit}, block) {
      const id = block._id

      try {
        let response = await Api().delete(`/api/settings/blocks/${id}`)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async editFloor({commit}, floor) {
      const id = floor.blockID
      const floorLevel = floor.level

      try {
        let response = await Api().put(`/api/settings/blocks/${id}/${floorLevel}`, floor)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async deleteFloor({commit}, floor) {
      const id = floor.blockID
      const floorLevel = floor.level

      try {
        let response = await Api().delete(`/api/settings/blocks/${id}/${floorLevel}`)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    }
  },

  modules: {
  }
})
