<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/settings/room-fund'}" class="breadcrump">Номерной фонд</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Стандарт</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="roomFund-tabbar">
        <h2>Количество номеров: <span>{{ totalRooms }}</span></h2>
        <div class="roomFund-tabbar__btns">
          <button class="ghost-btn" @click="openSettings"><img src="@/assets/icons/roomFund-pen_icon.svg" alt="">Настройки</button>
          <button class="prim-btn" @click="openAddRoom">Добавить</button>
        </div>
      </div>
    </div>
    <table class="roomFund-table standart">
      <tr>
        <th>Номер комнаты</th>
        <th>Вместимость (основной + дополнительный)</th>
        <th>Номер для курящих</th>
        <th></th>
      </tr>
      <tr v-for="obj in objfund" :key="obj">
        <td>{{ obj.roomCount }}</td>
        <td>{{ obj.capacity }}</td>
        <td>{{ obj.smokingRoom ? 'Да' : 'Нет' }}</td>
        <td>
          <button><img src="@/assets/icons/roomFund-pen_icon.svg" alt=""></button>
          <button><img src="@/assets/icons/roomFund-trash_icon.svg" alt=""></button>
        </td>
      </tr>
    </table>
    <div class="modal" v-if="settings">
      <form class="modal-div standart-form" action="" @submit.prevent="submitHandler">
        <h3>Настройка номеров</h3>
        <div class="divider" />
        <div class="standart-form__content">
          <div class="standart-form__content_div">
            <label for="">Тип кровати</label>
            <el-select v-model="bad" :class="{invalid: ($v.bad.$dirty && !$v.bad.required)}" placeholder="Выберите тип кровати">
              <el-option
                v-for="item in bads"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <span v-if="$v.bad.$dirty && !$v.bad.required" class="validation-error">Пожалуйста, укажите тип кровати</span>
          </div>
          <div class="standart-form__content_div">
            <label for="">Количесво основных коек</label>
            <div class="el-input">
              <el-input placeholder="Введите количесво основных коек" v-model="badsNum" :class="{invalid: ($v.badsNum.$dirty && !$v.badsNum.required)}" type="number" />
              <span v-if="$v.badsNum.$dirty && !$v.badsNum.required" class="validation-error">Пожалуйста, укажите количесво основных коек</span>
            </div>
          </div>
          <div class="standart-form__content_div">
            <label for="">Количесво дополнительных коек</label>
            <div class="el-input">
              <el-input placeholder="Введите количесво дополнительных коек" v-model="otherBads" type="number" :class="{invalid: ($v.otherBads.$dirty && !$v.otherBads.required)}" />
              <span v-if="$v.otherBads.$dirty && !$v.otherBads.required" class="validation-error">Пожалуйста, укажите количесво дополнительных коек</span>
            </div>
          </div>
          <div class="standart-form__content_div">
            <label for="">Санузел</label>
            <el-select v-model="sanuzell" :class="{invalid: ($v.sanuzell.$dirty && !$v.sanuzell.required)}" placeholder="Выберите санузел">
              <el-option
                v-for="item in sanuzel"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <span v-if="$v.sanuzell.$dirty && !$v.sanuzell.required" class="validation-error">Пожалуйста, укажите санузел</span>
          </div>
          <div class="standart-form__content_div">
            <label for="">Площадь</label>
            <el-input placeholder="Введите площадь" v-model="roomCounttt" type="number" :class="{invalid: ($v.roomCounttt.$dirty && !$v.roomCounttt.required)}" />
            <span v-if="$v.roomCounttt.$dirty && !$v.roomCounttt.required" class="validation-error">Пожалуйста, укажите площадь</span>
          </div>
          <div class="standart-form__content_div">
            <label for="">Курение</label>
            <el-select v-model="smokingg" :class="{invalid: ($v.smokingg.$dirty && !$v.smokingg.required)}" placeholder="Выберите курение">
              <el-option
                v-for="item in smoking"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <span v-if="$v.smokingg.$dirty && !$v.smokingg.required" class="validation-error">Пожалуйста, укажите площадь</span>
          </div>
          <div class="roomFund-tabbar__btns standart-modal__btns">
            <button class="ghost-btn" @click.prevent="closeModal">Отмена</button>
            <button class="prim-btn">Сохранить</button>
          </div>
        </div>
      </form>
      <div class="modal-back" @click="closeModal"/>
    </div>
    <div class="modal" v-if="addRoom">
      <form class="modal-div standart-form" action="" @submit.prevent="submitHandler">
        <h3>Новый номер</h3>
        <div class="divider" />
        <div class="standart-form__content">
          <div class="standart-form__content_div w-33">
            <label for="">Номер комнаты</label>
            <el-input :class="{invalid: ($v.aRoomCount.$dirty && !$v.aRoomCount.required)}" v-model="aRoomCount" placeholder="Введите номер комнаты" />
            <span v-if="$v.aRoomCount.$dirty && !$v.aRoomCount.required" class="validation-error">Пожалуйста, укажите номер комнаты</span>
          </div>
          <div class="standart-form__content_div w-33">
            <label for="">Тип кровати</label>
            <el-select v-model="bad" :class="{invalid: ($v.bad.$dirty && !$v.bad.required)}" placeholder="Выберите тип кровати">
              <el-option
                v-for="item in bads"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <span v-if="$v.bad.$dirty && !$v.bad.required" class="validation-error">Пожалуйста, укажите тип кровати</span>
          </div>
          <div class="standart-form__content_div w-33">
            <label for="">Количесво основных коек</label>
            <div class="el-input">
              <el-input placeholder="Введите количесво основных коек" v-model="badsNum" :class="{invalid: ($v.badsNum.$dirty && !$v.badsNum.required)}" type="number" />
              <span v-if="$v.badsNum.$dirty && !$v.badsNum.required" class="validation-error">Пожалуйста, укажите количесво основных коек</span>
            </div>
          </div>
          <div class="standart-form__content_div">
            <label for="">Количесво дополнительных коек</label>
            <div class="el-input">
              <el-input placeholder="Введите количесво дополнительных коек" v-model="otherBads" type="number" :class="{invalid: ($v.otherBads.$dirty && !$v.otherBads.required)}" />
              <span v-if="$v.otherBads.$dirty && !$v.otherBads.required" class="validation-error">Пожалуйста, укажите количесво дополнительных коек</span>
            </div>
          </div>
          <div class="standart-form__content_div">
            <label for="">Санузел</label>
            <el-select v-model="sanuzell" :class="{invalid: ($v.sanuzell.$dirty && !$v.sanuzell.required)}" placeholder="Выберите санузел">
              <el-option
                v-for="item in sanuzel"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <span v-if="$v.sanuzell.$dirty && !$v.sanuzell.required" class="validation-error">Пожалуйста, укажите санузел</span>
          </div>
          <div class="standart-form__content_div">
            <label for="">Площадь</label>
            <el-input placeholder="Введите площадь" v-model="roomCounttt" type="number" :class="{invalid: ($v.roomCounttt.$dirty && !$v.roomCounttt.required)}" />
            <span v-if="$v.roomCounttt.$dirty && !$v.roomCounttt.required" class="validation-error">Пожалуйста, укажите площадь</span>
          </div>
          <div class="standart-form__content_div">
            <label for="">Курение</label>
            <el-select v-model="smokingg" :class="{invalid: ($v.smokingg.$dirty && !$v.smokingg.required)}" placeholder="Выберите курение">
              <el-option
                v-for="item in smoking"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            <span v-if="$v.smokingg.$dirty && !$v.smokingg.required" class="validation-error">Пожалуйста, укажите площадь</span>
          </div>
          <div class="roomFund-tabbar__btns standart-modal__btns">
            <button class="ghost-btn" @click.prevent="closeModal">Отмена</button>
            <button class="prim-btn">Сохранить</button>
          </div>
        </div>
      </form>
      <div class="modal-back" @click="closeModal"/>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Room-fund_standart',
  data: () => ({
    roomCounttt: '',
    bads: [
      {name: 'Wooden'},
      {name: 'Metal'},
      {name: 'Combined'},
      {name: 'MDF'}
    ],
    bad: '',
    badsNum: '',
    otherBads: '',
    sanuzel: [
      {name: 'Общий'},
      {name: 'Раздельный'}
    ],
    sanuzell: '',
    smoking: [
      {name: 'lorem1'},
      {name: 'lorem2'}
    ],
    smokingg: '',
    objfund: [
      {
        roomCount: '№'+101,
        capacity: '2+1',
        smokingRoom: true
      },
      {
        roomCount: '№'+102,
        capacity: '2+1',
        smokingRoom: false
      },
      {
        roomCount: '№'+103,
        capacity: '2+0',
        smokingRoom: true
      },
      {
        roomCount: '№'+104,
        capacity: '1+1',
        smokingRoom: false
      },
      {
        roomCount: '№'+105,
        capacity: '1+0',
        smokingRoom: false
      },
      {
        roomCount: '№'+106,
        capacity: '2+0',
        smokingRoom: true
      },
    ],
    settings: false,
    aRoomCount: '',
    addRoom: false
  }),
  validations: {
    bad: {required},
    badsNum: {required},
    otherBads: {required},
    sanuzell: {required},
    roomCounttt: {required},
    smokingg: {required},
    aRoomCount: {required}
  },
  methods: {
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$router.push('/settings/room-fund/standart')
    },
    openSettings() {
      this.settings = true
    },
    openAddRoom() {
      this.addRoom = true
    },
    closeModal() {
      this.settings = false
      this.addRoom = false
    }
  }
}
</script>
<style scoped>

</style>