<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Номерной фонд</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <div class="roomFund-tabbar">
        <h2>Количество номеров: <span>{{ totalRooms }}</span></h2>
        <button class="prim-btn" @click="openModal">Добавить</button>
      </div>
    </div>
    <table class="roomFund-table">
      <tr>
        <th>Категория номеров</th>
        <th>Количество комнат</th>
        <th>Количество коек</th>
        <th></th>
      </tr>
      <tr v-for="obj in objfund" :key="obj">
        <router-link :to="obj.path" tag="td">{{ obj.categoryName }}</router-link>
        <td>{{ obj.roomAmount }}</td>
        <td>{{ obj.bedsRoom }}</td>
        <td>
          <button><img src="@/assets/icons/roomFund-folder_icon.svg" alt=""></button>
          <button><img src="@/assets/icons/roomFund-pen_icon.svg" alt=""></button>
          <button><img src="@/assets/icons/roomFund-trash_icon.svg" alt=""></button>
        </td>
      </tr>
    </table>
     <!-- modal -->
    <div class="modal roomFund-form" v-if="addCategory">
        <form class="form-filter" action="" @submit.prevent="submitHandler">
          <h3>Добавление категории</h3>
          <div class="divider" />
          <label for="select">Категория номера</label>
          <el-select v-model="Category" placeholder="Выберите категорию">
            <el-option
              v-for="item in filcats"
              :key="item.Category"
              :label="item.Category"
              :value="item.Category">
            </el-option>
          </el-select>
          <label for="">Количество комнат</label>
          <el-input style="width: 398px;" placeholder="Введите количество комнат" v-model="roomCount" type="number"></el-input>
          <div class="modal-btns">
          <button
            class="sec-btn"
            @click="addCategory = false"
          >
            <span>Отмена</span>
          </button>
          <button class="prim-btn">
            <span>OK</span>
          </button>
        </div>
        </form>
      <div class="modal-back" @click="closeModal"/>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    objfund: [
      {
        categoryName: 'Стандарт',
        roomAmount: 12,
        bedsRoom: 34,
        path: './room-fund/standart'
      },
      {
        categoryName: 'Семейная комната',
        roomAmount: 12,
        bedsRoom: 34,
        path: './room-fund/familyroom'
      },
      {
        categoryName: 'Люкс',
        roomAmount: 12,
        bedsRoom: 34,
        path: './room-fund/luxury'
      },
      {
        categoryName: 'Апартаменты',
        roomAmount: 12,
        bedsRoom: 34,
        path: './room-fund/appartament'
      },
      {
        categoryName: 'Эконом-класс',
        roomAmount: 12,
        bedsRoom: 34,
        path: './room-fund/economyclass'
      },
      {
        categoryName: 'Джуниор суит',
        roomAmount: 12,
        bedsRoom: 34,
        path: './room-fund/juniorsuit'
      }
    ],
    filcats: [{
        Category: 'Стандарт',
      }, {
        Category: 'Семейная комната',
      }, {
        Category: 'Люкс',
      }, {
        Category: 'Апартаменты',
      }, {
        Category: 'Эконом-класс',
      }, {
        Category: 'Джуниор суит'
      }],
    totalRooms: 68,
    Category: '',
    roomCount: 0,
    addCategory: false,
  }),
  validations: {
    Category: {type: String, required: true},
    roomAmount: {type: Number, required: true}
  },
  methods: {
    openModal() {
      this.addCategory = true
    },
    closeModal() {
      this.addCategory = false
    }
  }
}
</script>