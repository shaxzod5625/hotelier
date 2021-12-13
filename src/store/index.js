import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: [],
    chartOptions: [],
    logoutInfo: [],
    preloader: true,

    countries: [
      {value: 'afghanistan', label: 'Афганистан'},
      {value: 'albania', label: 'Албания'},
      {value: 'algeria', label: 'Алжир'},
      {value: 'andorra', label: 'Андорра'},
      {value: 'angola', label: 'Ангола'},
      {value: 'antiguaAndBarbuda', label: 'Антигуа и Барбуда'},
      {value: 'argentina', label: 'Аргентина'},
      {value: 'armenia', label: 'Армения'},
      {value: 'australia', label: 'Австралия'},
      {value: 'austria', label: 'Австрия'},
      {value: 'azerbaijan', label: 'Азербайджан'},
      {value: 'bahamas', label: 'Багамы'},
      {value: 'bahrain', label: 'Бахрейн'},
      {value: 'bangladesh', label: 'Бангладеш'},
      {value: 'barbados', label: 'Барбадос'},
      {value: 'belarus', label: 'Беларусь'},
      {value: 'belgium', label: 'Бельгия'},
      {value: 'belize', label: 'Белиз'},
      {value: 'benin', label: 'Бенин'},
      {value: 'bhutan', label: 'Бутан'},
      {value: 'bolivia', label: 'Боливия'},
      {value: 'bosniaAndHerzegovina', label: 'Босния и Герцеговина'},
      {value: 'botswana', label: 'Ботсвана'},
      {value: 'brazil', label: 'Бразилия'},
      {value: 'brunei', label: 'Бруней'},
      {value: 'bulgaria', label: 'Болгария'},
      {value: 'burkinaFaso', label: 'Буркина-Фасо'},
      {value: 'burundi', label: 'Бурунди'},
      {value: 'coteDIvoire', label: 'Кот-д`Ивуар'},
      {value: 'caboVerde', label: 'Кабо-Верде'},
      {value: 'cambodia', label: 'Камбоджа'},
      {value: 'cameroon', label: 'Камерун'},
      {value: 'canada', label: 'Канада'},
      {value: 'centralAfricanRepublic', label: 'Центрально-Африканская Республика'},
      {value: 'chad', label: 'Чад'},
      {value: 'chile', label: 'Чили'},
      {value: 'china', label: 'Китай'},
      {value: 'colombia', label: 'Колумбия'},
      {value: 'comoros', label: 'Коморские острова'},
      {value: 'congoBrazzaville)', label: 'Конго (Конго-Браззавиль)'},
      {value: 'costaRica', label: 'Коста-Рика'},
      {value: 'croatia', label: 'Хорватия'},
      {value: 'cuba', label: 'Куба'},
      {value: 'cyprus', label: 'Кипр'},
      {value: 'czechRepublic', label: 'Чехия'},
      {value: 'democraticRepublicOfTheCongo', label: 'Демократическая Республика Конго'},
      {value: 'denmark', label: 'Дания'},
      {value: 'djibouti', label: 'Джибути'},
      {value: 'dominica', label: 'Доминика'},
      {value: 'dominicanRepublic', label: 'Доминиканская Республика'},
      {value: 'ecuador', label: 'Эквадор'},
      {value: 'egypt', label: 'Египет'},
      {value: 'elSalvador', label: 'Сальвадор'},
      {value: 'equatorialGuinea', label: 'Экваториальная Гвинея'},
      {value: 'eritrea', label: 'Эритрея'},
      {value: 'estonia', label: 'Эстония'},
      {value: 'eswatini', label: 'Эсватини'},
      {value: 'ethiopia', label: 'Эфиопия'},
      {value: 'fiji', label: 'Фиджи'},
      {value: 'finland', label: 'Финляндия'},
      {value: 'france', label: 'Франция'},
      {value: 'gabon', label: 'Габон'},
      {value: 'gambia', label: 'Гамбия'},
      {value: 'georgia', label: 'Грузия'},
      {value: 'germany', label: 'Германия'},
      {value: 'ghana', label: 'Гана'},
      {value: 'greece', label: 'Греция'},
      {value: 'grenada', label: 'Гренада'},
      {value: 'guatemala', label: 'Гватемала'},
      {value: 'guinea', label: 'Гвинея'},
      {value: 'guineaBissau', label: 'Гвинея-Бисау'},
      {value: 'guyana', label: 'Гайана'},
      {value: 'haiti', label: 'Гаити'},
      {value: 'holySee', label: 'Святой Престол'},
      {value: 'honduras', label: 'Гондурас'},
      {value: 'hungary', label: 'Венгрия'},
      {value: 'iceland', label: 'Исландия'},
      {value: 'india', label: 'Индия'},
      {value: 'indonesia', label: 'Индонезия'},
      {value: 'iran', label: 'Иран'},
      {value: 'iraq', label: 'Ирак'},
      {value: 'ireland', label: 'Ирландия'},
      {value: 'israel', label: 'Израиль'},
      {value: 'italy', label: 'Италия'},
      {value: 'jamaica', label: 'Ямайка'},
      {value: 'japan', label: 'Япония'},
      {value: 'jordan', label: 'Иордания'},
      {value: 'kazakhstan', label: 'Казахстан'},
      {value: 'kenya', label: 'Кения'},
      {value: 'kiribati', label: 'Кирибати'},
      {value: 'kuwait', label: 'Кувейт'},
      {value: 'kyrgyzstan', label: 'Кыргызстан'},
      {value: 'laos', label: 'Лаос'},
      {value: 'latvia', label: 'Латвия'},
      {value: 'lebanon', label: 'Ливан'},
      {value: 'lesotho', label: 'Лесото'},
      {value: 'liberia', label: 'Либерия'},
      {value: 'libya', label: 'Ливия'},
      {value: 'liechtenstein', label: 'Лихтенштейн'},
      {value: 'lithuania', label: 'Литва'},
      {value: 'luxembourg', label: 'Люксембург'},
      {value: 'madagascar', label: 'Мадагаскар'},
      {value: 'malawi', label: 'Малави'},
      {value: 'malaysia', label: 'Малайзия'},
      {value: 'maldives', label: 'Мальдивы'},
      {value: 'mali', label: 'Мали'},
      {value: 'malta', label: 'Мальта'},
      {value: 'marshallIslands', label: 'Маршалловы острова'},
      {value: 'mauritania', label: 'Мавритания'},
      {value: 'mauritius', label: 'Маврикий'},
      {value: 'mexico', label: 'Мексика'},
      {value: 'micronesia', label: 'Микронезия'},
      {value: 'moldova', label: 'Молдова'},
      {value: 'monaco', label: 'Монако'},
      {value: 'mongolia', label: 'Монголия'},
      {value: 'montenegro', label: 'Черногория'},
      {value: 'morocco', label: 'Марокко'},
      {value: 'mozambique', label: 'Мозамбик'},
      {value: 'myanmar', label: 'Мьянма (ранее Бирма)'},
      {value: 'Namibia', label: 'Намибия'},
      {value: 'nauru', label: 'Науру'},
      {value: 'nepal', label: 'Непал'},
      {value: 'netherlands', label: 'Нидерланды'},
      {value: 'newZealand', label: 'Новая Зеландия'},
      {value: 'nicaragua', label: 'Никарагуа'},
      {value: 'niger', label: 'Нигер'},
      {value: 'nigeria', label: 'Нигерия'},
      {value: 'northKorea', label: 'Северная Корея'},
      {value: 'northMacedonia', label: 'Северная Македония'},
      {value: 'norway', label: 'Норвегия'},
      {value: 'oman', label: 'Оман'},
      {value: 'pakistan', label: 'Пакистан'},
      {value: 'palau', label: 'Палау'},
      {value: 'palestineState', label: 'Государство Палестина'},
      {value: 'panama', label: 'Панама'},
      {value: 'papuaNewGuinea', label: 'Папуа - Новая Гвинея'},
      {value: 'paraguay', label: 'Парагвай'},
      {value: 'peru', label: 'Перу'},
      {value: 'philippines', label: 'Филиппины'},
      {value: 'poland', label: 'Польша'},
      {value: 'portugal', label: 'Португалия'},
      {value: 'qatar', label: 'Катар'},
      {value: 'romania', label: 'Румыния'},
      {value: 'russia', label: 'Российская Федерация'},
      {value: 'rwanda', label: 'Руанда'},
      {value: 'saintKittsAndNevis', label: 'Сент-Китс и Невис'},
      {value: 'saintLucia', label: 'Санкт-Люсия'},
      {value: 'saintVincentAndTheGrenadines', label: 'Святой Винсент и Гренадины'},
      {value: 'samoa', label: 'Самоа'},
      {value: 'sanMarino', label: 'Сан-Марино'},
      {value: 'saoTomeAndPrincipe', label: 'Сан-Томе и Принсипи'},
      {value: 'saudiArabia', label: 'Саудовская Аравия'},
      {value: 'senegal', label: 'Сенегал'},
      {value: 'serbia', label: 'Сербия'},
      {value: 'seychelles', label: 'Сейшельские острова'},
      {value: 'sierraLeone', label: 'Сьерра-Леоне'},
      {value: 'singapore', label: 'Сингапур'},
      {value: 'slovakia', label: 'Словакия'},
      {value: 'slovenia', label: 'Словения'},
      {value: 'solomonIslands', label: 'Соломоновы острова'},
      {value: 'somalia', label: 'Сомали'},
      {value: 'southAfrica', label: 'Южная Африка'},
      {value: 'southKorea', label: 'Южная Корея'},
      {value: 'southSudan', label: 'Южный Судан'},
      {value: 'spain', label: 'Испания'},
      {value: 'sriLanka', label: 'Шри-Ланка'},
      {value: 'sudan', label: 'Судан'},
      {value: 'suriname', label: 'Суринам'},
      {value: 'sweden', label: 'Швеция'},
      {value: 'switzerland', label: 'Швейцария'},
      {value: 'syria', label: 'Сирия'},
      {value: 'tajikistan', label: 'Таджикистан'},
      {value: 'tanzania', label: 'Танзания'},
      {value: 'thailand', label: 'Таиланд'},
      {value: 'timorLeste', label: 'Тимор-Лешти'},
      {value: 'togo', label: 'Того'},
      {value: 'tonga', label: 'Тонга'},
      {value: 'trinidadAndTobago', label: 'Тринидад и Тобаго'},
      {value: 'tunisia', label: 'Тунис'},
      {value: 'turkey', label: 'Турция'},
      {value: 'turkmenistan', label: 'Туркменистан'},
      {value: 'tuvalu', label: 'Тувалу'},
      {value: 'uganda', label: 'Уганда'},
      {value: 'ukraine', label: 'Украина'},
      {value: 'unitedArabEmirates', label: 'Объединенные Арабские Эмираты'},
      {value: 'unitedKingdom', label: 'Объединенное Королевство'},
      {value: 'unitedStatesOfAmerica', label: 'Соединенные Штаты Америки'},
      {value: 'uruguay', label: 'Уругвай'},
      {value: 'uzbekistan', label: 'Узбекистан'},
      {value: 'vanuatu', label: 'Вануату'},
      {value: 'venezuela', label: 'Венесуэла'},
      {value: 'vietnam', label: 'Вьетнам'},
      {value: 'yemen', label: 'Йемен'},
      {value: 'zambia', label: 'Замбия'},
      {value: 'zimbabwe', label: 'Зимбабве'}
    ],

    services: [
      {label: 'Услуга “Будильник”', value: 'wakeUpCall', category: 'main'},
      {label: 'Доставка цветов', value: 'floverDelivery', category: 'main'},
      {label: 'Wi-Fi', cost: 'free', value: 'wifi', category: 'main'},
      {label: 'Аренда планшета', value: 'tabletRent', category: 'additional'},
      {label: 'Бассейн', value: 'swimmingPool', category: 'main'},
      {label: 'Глажка', value: 'ironing', cost: '15000', category: 'extra'},
      {label: 'Хим-чистка', value: 'dryCleaning', category: 'main'},
      {label: 'Услуги трансфера', value: 'transfer', category: 'main'},
      {label: 'Услуга “NETFLIX”', value: 'netflix', category: 'main'},
      {label: 'Аренда ноутбука', value: 'laptopRent', category: 'main'},
    ],

    accomodations: [
      {label: 'Гладильная доска', value: 'ironingBoard', category: 'main'},
      {label: 'LCD телевизор', value: 'lcdTv', category: 'main'},
      {label: 'Диван', value: 'sofa', category: 'main'},
      {label: 'Видео-проигрыватель', value: 'videoPlayer', category: 'main'},
      {label: 'Компьютер', value: 'computer', category: 'main'},
      {label: 'Вентиляция', value: 'ventilation', category: 'main'},
      {label: 'Вид на озеро', value: 'lakeView', category: 'main'},
      {label: 'Вид на лес', value: 'forestView', category: 'main'},
      {label: 'Вид на город', value: 'cityView', category: 'main'},
      {label: 'Туалетные принадлежности', value: 'toiletries', category: 'main'},
    ],

    servicesCategories: [
      {label: 'Основные', value: 'main'},
      {label: 'Дополнительные', value: 'additional'},
    ],

    accomodationsCategories: [
      {label: 'Основные', value: 'main'},
      {label: 'Дополнительные', value: 'additional'},
      {label: 'Вид', value: 'view'},
      {label: 'Комнатные принадлежности', value: 'roomAccessories'},
    ],

    measurementUnitTypes: [
      {label: 'Разовая стоимость', value: 'oneTime'},
      {label: 'За один день', value: 'perDay'},
      {label: 'За каждую вещь', value: 'perUnit'},
      {label: 'За все время проживания', value: 'perSettlement'},
      {label: 'За штуку', value: 'perPiece'},
      {label: 'За порцию', value: 'perPortion'},
    ],

    activeTariffs: [
      {name: 'Основной', type: 'main', discount: {availability: false, discountType: undefined, discountAmount: undefined}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'pending'},
      {name: 'Тариф “Весенний”', type: 'discount', discount: {availability: true, discountType: 'percent', discountAmount: '20'}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'active'},
      {name: 'Тариф “Новогодние скидки”', type: 'discount', discount: {availability: true, discountType: 'UZS', discountAmount: '100000'}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'notActive'},
      {name: 'Тариф “Летние скидки”', type: 'discount', discount: {availability: true, discountType: 'individual', discountAmount: undefined}, startTerm: '01/01/2021', stopTerm: '31/12/2021', activity: 'notActive'},
    ],

    servicesList: [
      {label: 'Услуга “Будильник”', value: 'wakeUpCall', cost: '15000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: true},
      {label: 'Доставка цветов', value: 'floverDelivery', cost: '22000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: false},
      {label: 'Wi-Fi', cost: 'free', value: 'wifi', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За один день', availability: true},
      {label: 'Аренда планшета', value: 'tabletRent', cost: '50000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'За один день', availability: false},
      {label: 'Бассейн', value: 'swimmingPool', cost: '35000', payFreeRoomCats: [], category: 'cat3', measurementUnit: 'За один день', availability: false},
      {label: 'Глажка', value: 'ironing', cost: '15000', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За каждую вещь', availability: true},
      {label: 'Хим-чистка', value: 'dryCleaning', cost: '40000', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За каждую вещь', availability: true},
      {label: 'Услуги трансфера', value: 'transfer', cost: '110000', payFreeRoomCats: [], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: false},
      {label: 'Услуга “NETFLIX”', value: 'netflix', cost: '10000', payFreeRoomCats: ['Люкс', 'Семейная комната', 'Апартаменты'], category: 'cat2', measurementUnit: 'За один день', availability: true},
      {label: 'Аренда ноутбука', value: 'laptopRent', cost: '75000', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За один день', availability: false},
    ],

    facilitiesList: [
      {label: 'Гладильная доска', value: 'ironingBoard', cost: '40000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'Разовая стоимость', availability: true},
      {label: 'LCD телевизор', value: 'lcdTv', cost: 'free', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'За все время проживания', availability: false},
      {label: 'Диван', value: 'sofa', cost: 'free', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За все время проживания', availability: true},
      {label: 'Видео-проигрыватель', value: 'videoPlayer', cost: '25000', payFreeRoomCats: ['Люкс', 'Апартаменты'], category: 'cat1', measurementUnit: 'За один день', availability: false},
      {label: 'Компьютер', value: 'computer', cost: '70000', payFreeRoomCats: [], category: 'cat3', measurementUnit: 'За один день', availability: false},
      {label: 'Вентиляция', value: 'ventilation', cost: 'free', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За все время проживания', availability: true},
      {label: 'Вид на озеро', value: 'lakeView', cost: 'free', payFreeRoomCats: [], category: 'cat4', measurementUnit: 'За все время проживания', availability: true},
      {label: 'Вид на лес', value: 'forestView', cost: 'free', payFreeRoomCats: [], category: 'cat1', measurementUnit: 'За все время проживания', availability: false},
      {label: 'Вид на город', value: 'cityView', cost: 'free', payFreeRoomCats: ['Люкс', 'Семейная комната', 'Апартаменты'], category: 'cat2', measurementUnit: 'За все время проживания', availability: true},
      {label: 'Туалетные принадлежности', value: 'toiletries', cost: 'free', payFreeRoomCats: [], category: 'cat2', measurementUnit: 'За все время проживания', availability: false},
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
    PRELOADER_ON(state) {
      state.preloader = true
    },

    PRELOADER_OFF(state) {
      state.preloader = false
    },

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

    SET_RESPONSE_STATUS2(state, responseStatus2) {
      state.status2 = responseStatus2
      window.sessionStorage.status2 = JSON.stringify(responseStatus2)
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

//////////////// Setting up partners ////////////

    SET_MY_PARTNERS(state, partners) {
      state.partners = partners
      window.sessionStorage.partners = JSON.stringify(partners)
    },
//////////////////////////////////////

//////////////// Booking Rules /////////////////

    SET_BOOKING_RULES(state, rules) {
      state.rules = rules
      window.sessionStorage.rules = JSON.stringify(rules)
    },
////////////////////////////////////////////////


////////////// Document forms settings ////////

    SET_MY_DOC_FORMS_SETTINGS(state, documentFormsSettings) {
      state.documentFormsSettings = documentFormsSettings
      window.sessionStorage.documentFormsSettings = JSON.stringify(documentFormsSettings)
    },
//////////////////////////////////////////////



///////////// Facilities /////////////////////

    SET_FACILITIES(state, facilities) {
      state.facilities = facilities
      window.sessionStorage.facilities = JSON.stringify(facilities)
    },

    SET_MY_FACILITIES_LIST(state, facilitiesList) {
      state.facilitiesList = facilitiesList
      window.sessionStorage.facilitiesList = JSON.stringify(facilitiesList)
    },

    SET_MY_SERVICES_LIST(state, servicesList) {
      state.servicesList = servicesList
      window.sessionStorage.servicesList = JSON.stringify(servicesList)
    },
/////////////////////////////////////////////



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
    async loginUser({commit}, logInfo) {
      try {
        let response = await Api().post('/api/login', logInfo)
        let user = response.data

        commit('SET_CURRENT_USER', user)
      } catch(err) {
        console.log(err)
        
        commit('SET_RESPONSE_STATUS', err)
      };

      try {
        if(JSON.parse(window.sessionStorage.currentUser).user != undefined && JSON.parse(window.sessionStorage.currentUser) != null) {
          let settingsResponse = await Api().get('/api/settings')
          let filling = settingsResponse.data
          commit('SET_SETTINGS_FILLING', filling)
        } else {}
      } catch(er) {console.log(er)}
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

    async newFloor({commit}, floor) {
      const id = floor.blockID
      const floorLevel = floor.level

      try {
        let response = await Api().post(`/api/settings/blocks/${id}/new`, floor)
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
    },

//////////////////////////////////////////////////

/////////////////// Partners //////////////
    async getPartnersInfo({commit}) {
      try {
        let response = await Api().get('/api/settings/partner')
        let partners = response.data

        commit('SET_MY_PARTNERS', partners)
      } catch {}
    },

    async newPartner({commit}, partner) {
      const type = partner.type
      try {
        let response = await Api().post(`/api/settings/partner/${type}/new`, partner)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async editPartner({commit}, chosenPartner) {
      const partnerType = chosenPartner.type
      const partnerId = chosenPartner.id

      try {
        let response = await Api().put(`/api/settings/partner/${partnerType}/${partnerId}`, chosenPartner)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async deletePartner({commit}, chosenPartner) {
      const type = chosenPartner.type
      const id = chosenPartner.id

      try {
        let response = await Api().delete(`/api/settings/partner/${type}/${id}`)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },

    async newContract({commit}, contract) {
      const type = contract.type
      const id = contract.id

      try {
        let response = await Api().post(`/api/settings/partner/${type}/${id}`, contract)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch {}
    },
////////////////////////////////////////////

//////////// Booking Rules /////////////////

    async getBookingRulesInfo({commit}) {
      try {
        let response = await Api().get('/api/settings/rules')
        let rules = response.data

        commit('SET_BOOKING_RULES', rules)
      } catch {}
    },

    async newBookingRules({commit}, rules) {
      if(
        JSON.parse(window.sessionStorage.rules).guarantedBooking.period === []
        || JSON.parse(window.sessionStorage.rules).guarantedBooking.period === undefined
        || JSON.parse(window.sessionStorage.rules).guarantedBooking.period === null
      ) {
        try {
          let response = await Api().post('/api/settings/rules/guaranted', rules)
          let responseStatus = response.data

          commit('SET_RESPONSE_STATUS', responseStatus)
        } catch {}
      } else {
        try {
          let response = await Api().put('/api/settings/rules/guaranted', rules)
          let responseStatus = response.data

          commit('SET_RESPONSE_STATUS', responseStatus)
        } catch {}
      }
    },

    async newNotGuaranteedBookingRules({commit}, rules) {
      if(
        JSON.parse(window.sessionStorage.rules).unguarantedBooking.day === ''
        || JSON.parse(window.sessionStorage.rules).unguarantedBooking.day === undefined
        || JSON.parse(window.sessionStorage.rules).unguarantedBooking.day === null
      ) {
        try {
          let response = await Api().post('/api/settings/rules/unguaranted', rules)
          let responseStatus = response.data

          commit('SET_RESPONSE_STATUS', responseStatus)
        } catch {}
      } else {
        try {
          let response = await Api().put('/api/settings/rules/unguaranted', rules)
          let responseStatus = response.data

          commit('SET_RESPONSE_STATUS', responseStatus)
        } catch {}
      }
    },
///////////////////////////////////////////////////

////////////// Document forms settings ////////////

    async getDocFormsInfo({commit}) {
      try {
        let response = await Api().get('/api/settings/documents')
        let documentFormsSettings = response.data

        commit('SET_MY_DOC_FORMS_SETTINGS', documentFormsSettings)
      } catch {}
    },

    async docFormsGeneralSettings({commit}, docFormsSettings) {
      try {
        let formData = new FormData()
        formData.append('file', docFormsSettings.myLogo)
        formData.append('text', JSON.stringify(docFormsSettings))
        
        let response = await Api().put('/api/settings/documents/general', formData)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(error) {console.log(error)}
    },

    async invoiceFormSettingsEdit({commit}, invoiceFormSettings) {
      try {
        let response = await Api().put('/api/settings/documents/invoice', invoiceFormSettings)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },

    async boolingConfirmationFormSettingsEdit({commit}, boolingConfirmationFormSettings) {
      try {
        let response = await Api().put('/api/settings/documents/confirmation', boolingConfirmationFormSettings)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },

    async bookingCancellationFormSettingsEdit({commit}, bookingCancellationFormSettings) {
      try {
        let response = await Api().put('/api/settings/documents/cancellation', bookingCancellationFormSettings)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },

    async internalRulesFormSettingsEdit({commit}, internalRulesFormSettings) {
      try {
        let response = await Api().put('/api/settings/documents/interal', internalRulesFormSettings)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },

    async checkInRulesFormSettingsEdit({commit}, checkInRulesFormSettings) {
      try {
        let response = await Api().put('/api/settings/documents/checkin', checkInRulesFormSettings)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },

    async reportsFormSettingsEdit({commit}, reportsFormSettings) {
      try {
        let response = await Api().put('/api/settings/documents/report', reportsFormSettings)
        let responseStatus = response.data

        console.log(reportsFormSettings)

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },

    async tariffsFormSettingsEdit({commit}, tariffsFormSettings) {
      try {
        let response = await Api().put('/api/settings/documents/tariffs', tariffsFormSettings)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },
////////////////////////////////////////////////////////

////////////////// Facilities //////////////////////////

    async getFacilitiesInfo({commit}) {
      try {
        let response = await Api().get('/api/settings/facilities')
        let facilities = response.data

        commit('SET_FACILITIES', facilities)
      } catch(e) {console.log(e)}
    },

    async getFacilitiesList({commit}) {
      try {
        let response = await Api().get('/api/settings/accomodations/add')
        let facilitiesList = response.data

        commit('SET_MY_FACILITIES_LIST', facilitiesList)
      } catch(e) {console.log(e)}
    },

    async getServicesList({commit}) {
      try {
        let response = await Api().get('/api/settings/services/add')
        let servicesList = response.data

        commit('SET_MY_SERVICES_LIST', servicesList)
      } catch(e) {console.log(e)}
    },

    async addAccomodations({commit}, array) {
      try {
        let response = await Api().post('/api/settings/accomodations/add', array)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },
    
    async addServices({commit}, array) {
      try {
        let response = await Api().post('/api/settings/services/add', array)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },

    async createFacility({commit}, newFacility) {
      try {
        let response = await Api().post('/api/settings/services/new', newFacility)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}
    },

    async createAccomodation({commit}, newAccomodation) {
      try {
        let response = await Api().post('/api/settings/accomodations/new', newAccomodation)
        let responseStatus = response.data

        commit('SET_RESPONSE_STATUS', responseStatus)
      } catch(e) {console.log(e)}

      commit('PRELOADER_OFF')
    },

    async editAccomodation({commit}, accomodation) {
      try {
        let response = await Api().put('/api/settings/accomodations/edit', accomodation)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },

    async editService({commit}, service) {
      try {
        let response = await Api().put('/api/settings/services/edit', service)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },

    async switchAvailability({commit}, facility) {
      try {
        let response = await Api().post('/api/settings/accomodations/active', facility)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },

    async switchServiceAvailability({commit}, facility) {
      try {
        let response = await Api().post('/api/settings/services/active', facility)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },

    async deleteFacility({commit}, id) {
      try {
        let response = await Api().delete(`/api/settings/accomodations/delete/${id}`)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },

    async deleteService({commit}, id) {
      try {
        let response = await Api().delete(`/api/settings/services/delete/${id}`)
        let resStatus = response.data

        commit('SET_RESPONSE_STATUS', resStatus)
      } catch(e) {console.log(e)}
    },

  },

  modules: {
  }
})
