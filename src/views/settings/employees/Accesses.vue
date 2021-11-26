<template>
  <div class="modal-div">
    <h3>Настройки профилей</h3>
    <div class="divider"/>
    <h4>Позиция</h4>
    <div class="form-4">
      <div class="w-100">
        <el-select
          v-model="position"
          disabled
        >
          <el-option
            v-for="(position, idx) in positions"
            :key="idx"
            :label="position.label"
            :value="position.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <el-select v-model="subPosition">
          <el-option
            v-for="(subPosition, idx) in subPositions"
            :key="idx"
            :label="subPosition.label"
            :value="subPosition.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="divider"/>
    <h4>Доступы</h4>

    <div class="form-5">
      <el-checkbox
        label="Панель графиков"
        v-model="dashboard"
      />
      <el-checkbox
        label="Фронтдеск"
        v-model="frontDesk"
      />
      <el-checkbox
        label="Касса"
        v-model="cashier"
      />
      <el-checkbox
        label="Фолио"
        v-model="folio"
      />
      <el-checkbox
        label="Шахматка"
        v-model="chess"
      />
      <el-checkbox
        label="Статистика"
        v-model="stats"
      />
      <el-checkbox
        label="Отчеты"
        v-model="reports"
      />
      <el-checkbox
        label="Панель номеров"
        v-model="roomBoard"
      />
      <el-checkbox
        label="Менеджер каналов"
        v-model="channelManager"
      />
      <el-checkbox
        label="Настройки"
        v-model="settings"
      />
    </div>


    <div class="divider"/>
    <h4>Разрешения</h4>

    <div class="form-4">
      <div class="w-100">
        <label for="input">Панель графиков</label>
        <el-select
          v-model="dashVal"
          :disabled="!dashboard"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in dashPermissions"
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
          :disabled="!frontDesk"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in frontPermissions"
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
          :disabled="!cashier"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in cashierPermissions"
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
          :disabled="!folio"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in folioPermissions"
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
          :disabled="!chess"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in chessPermissions"
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
          :disabled="!stats"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in statsPermissions"
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
          :disabled="!reports"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in reportsPermissions"
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
          :disabled="!roomBoard"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in roomboardPermissions"
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
          :disabled="!channelManager"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in channelManagerPermissions"
            :key="idx"
            :label="perms.label"
            :value="perms.value">
          </el-option>
        </el-select>
      </div>

      <div class="w-100">
        <label for="input">Настройки</label>
        <el-select
          v-model="settingsVal"
          :disabled="!settings"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="Не выбраны разрешения"
        >
          <el-option
            v-for="(perms, idx) in settingsPermissions"
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
    subPosition: 'main',
    dashboard: false,
    frontDesk: true,
    cashier: true,
    folio: true,
    chess: false,
    stats: false,
    reports: false,
    roomBoard: true,
    channelManager: true,
    settings: false,

    dashVal: [],
    frontVal: [],
    cashierVal: [],
    folioVal: [],
    chessVal: [],
    statsVal: [],
    reportsVal: [],
    roomboardVal: [],
    channelManagerVal: [],
    settingsVal: [],


    subPositions: [
      {label: 'Главный', value: 'main'},
      {label: 'Старший', value: 'senior'},
      {label: 'Младший', value: 'junior'},
      {label: 'Дневной', value: 'dayshift'},
      {label: 'Ночной', value: 'nightshift'}
    ],

    positions: [
      {label: 'Менеджер', value: 'manager'},
      {label: 'Администратор', value: 'receptionist'},
      {label: 'Заведующий залом', value: 'restaurantManager'},
      {label: 'Горничная', value: 'maid'},
      {label: 'Официант', value: 'waiter'},
      {label: 'Повар', value: 'cook'}
    ],
  }),

  props: {
    position: String,
  },

  computed: {
    dashPermissions() {
      return this.$store.state.dashPermission
    },
    frontPermissions() {
      return this.$store.state.frontPermission
    },
    cashierPermissions() {
      return this.$store.state.cashierPermission
    },
    folioPermissions() {
      return this.$store.state.folioPermission
    },
    chessPermissions() {
      return this.$store.state.chessPermission
    },
    statsPermissions() {
      return this.$store.state.statsPermission
    },
    reportsPermissions() {
      return this.$store.state.reportsPermission
    },
    roomboardPermissions() {
      return this.$store.state.roomboardPermission
    },
    channelManagerPermissions() {
      return this.$store.state.channelManagerPermission
    },
    settingsPermissions() {
      return this.$store.state.settingsPermission
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeAccess')
    },

    async editAccesses() {
      const accesses = {
        position: this.position,
        subPosition: this.subPosition,
        dashboard: this.dashboard,
        frontDesk: this.frontDesk,
        cashier: this.cashier,
        folio: this.folio,
        chess: this.chess,
        stats: this.stats,
        reports: this.reports,
        roomBoard: this.roomBoard,
        channelManager: this.channelManager,
        settings: this.settings,

        dashVal: this.dashVal,
        frontVal: this.frontVal,
        cashierVal: this.cashierVal,
        folioVal: this.folioVal,
        chessVal: this.chessVal,
        statsVal: this.statsVal,
        reportsVal: this.reportsVal,
        roomboardVal: this.roomboardVal,
        channelManagerVal: this.channelManagerVal,
        settingsVal: this.settingsVal,
      }

      await this.$store.dispatch('editAccesses', accesses)
    }
  }
}
</script>

<style>

</style>