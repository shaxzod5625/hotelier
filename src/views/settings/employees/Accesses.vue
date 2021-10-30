<template>
  <div class="modal-div">
    <h3>Настройки профилей</h3>
    <div class="divider"/>
    <h4>Позиция</h4>
    <div class="form-4">
      <div class="w-100">
        <el-select v-model="pstn">
          <el-option
            v-for="(position, idx) in positions"
            :key="idx"
            :label="position.label"
            :value="position.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="divider"/>
    <h4>Разрешения</h4>

    <div class="form-4">
      <div class="w-100">
        <label for="input">Панель графиков</label>
        <el-select
          v-model="dashVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in dashPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Фронтдеск</label>
        <el-select
          v-model="frontVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in frontPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Касса</label>
        <el-select
          v-model="cashierVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in cashierPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Фолио</label>
        <el-select
          v-model="folioVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in folioPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Шахматка</label>
        <el-select
          v-model="chessVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in chessPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Статистика</label>
        <el-select
          v-model="statsVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in statsPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Отчеты</label>
        <el-select
          v-model="reportsVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in reportsPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Панель номеров</label>
        <el-select
          v-model="roomboardVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in roomboardPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Менеджер каналов</label>
        <el-select
          v-model="channelManagerVal"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in channelManagerPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Настройки</label>
        <el-select
          v-model="settingsPermission.label"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in settingsPermission"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="input-grid-btns">
      <button
        class="sec-btn"
        @click="closeModal"
      >
        <span>Отмена</span>
      </button>

      <button class="prim-btn" type="submit">
        <span>Сохранить</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accesses',

  data: () => ({
  }),

  props: {
    positions: Array,
    value: String,
    label: Object,

    pstn: String,
    dashVal: Array,
    frontVal: Array,
    cashierVal: Array,
    folioVal: Array,
    chessVal: Array,
    statsVal: Array,
    reportsVal: Array,
    roomboardVal: Array,
    channelManagerVal: Array,
    settingsVal: Array,
  },

  computed: {
    dashPermission() {
      return this.$store.state.dashPermission
    },
    frontPermission() {
      return this.$store.state.frontPermission
    },
    cashierPermission() {
      return this.$store.state.cashierPermission
    },
    folioPermission() {
      return this.$store.state.folioPermission
    },
    chessPermission() {
      return this.$store.state.chessPermission
    },
    statsPermission() {
      return this.$store.state.statsPermission
    },
    reportsPermission() {
      return this.$store.state.reportsPermission
    },
    roomboardPermission() {
      return this.$store.state.roomboardPermission
    },
    channelManagerPermission() {
      return this.$store.state.channelManagerPermission
    },
    settingsPermission() {
      return this.$store.state.settingsPermission
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeAccess')
    }
  }
}
</script>

<style>

</style>