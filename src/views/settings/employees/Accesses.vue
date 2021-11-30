<template>
  <div class="modal">
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


  <!-- Menu permissions checkboxes -->
      <div
        class="form-5"
        v-if="subPosition === 'main'"
      >
        <el-checkbox
          label="Панель графиков"
          v-model="main.dashboard"
        />
        <el-checkbox
          label="Фронтдеск"
          v-model="main.frontDesk"
        />
        <el-checkbox
          label="Касса"
          v-model="main.cashier"
        />
        <el-checkbox
          label="Фолио"
          v-model="main.folio"
        />
        <el-checkbox
          label="Шахматка"
          v-model="main.chess"
        />
        <el-checkbox
          label="Статистика"
          v-model="main.stats"
        />
        <el-checkbox
          label="Отчеты"
          v-model="main.reports"
        />
        <el-checkbox
          label="Панель номеров"
          v-model="main.roomBoard"
        />
        <el-checkbox
          label="Менеджер каналов"
          v-model="main.channelManager"
        />
        <el-checkbox
          label="Настройки"
          v-model="main.settings"
        />
      </div>

      <div
        class="form-5"
        v-if="subPosition === 'senior'"
      >
        <el-checkbox
          label="Панель графиков"
          v-model="senior.dashboard"
        />
        <el-checkbox
          label="Фронтдеск"
          v-model="senior.frontDesk"
        />
        <el-checkbox
          label="Касса"
          v-model="senior.cashier"
        />
        <el-checkbox
          label="Фолио"
          v-model="senior.folio"
        />
        <el-checkbox
          label="Шахматка"
          v-model="senior.chess"
        />
        <el-checkbox
          label="Статистика"
          v-model="senior.stats"
        />
        <el-checkbox
          label="Отчеты"
          v-model="senior.reports"
        />
        <el-checkbox
          label="Панель номеров"
          v-model="senior.roomBoard"
        />
        <el-checkbox
          label="Менеджер каналов"
          v-model="senior.channelManager"
        />
        <el-checkbox
          label="Настройки"
          v-model="senior.settings"
        />
      </div>

      <div
        class="form-5"
        v-if="subPosition === 'junior'"
      >
        <el-checkbox
          label="Панель графиков"
          v-model="junior.dashboard"
        />
        <el-checkbox
          label="Фронтдеск"
          v-model="junior.frontDesk"
        />
        <el-checkbox
          label="Касса"
          v-model="junior.cashier"
        />
        <el-checkbox
          label="Фолио"
          v-model="junior.folio"
        />
        <el-checkbox
          label="Шахматка"
          v-model="junior.chess"
        />
        <el-checkbox
          label="Статистика"
          v-model="junior.stats"
        />
        <el-checkbox
          label="Отчеты"
          v-model="junior.reports"
        />
        <el-checkbox
          label="Панель номеров"
          v-model="junior.roomBoard"
        />
        <el-checkbox
          label="Менеджер каналов"
          v-model="junior.channelManager"
        />
        <el-checkbox
          label="Настройки"
          v-model="junior.settings"
        />
      </div>

      <div
        class="form-5"
        v-if="subPosition === 'dayshift'"
      >
        <el-checkbox
          label="Панель графиков"
          v-model="dayshift.dashboard"
        />
        <el-checkbox
          label="Фронтдеск"
          v-model="dayshift.frontDesk"
        />
        <el-checkbox
          label="Касса"
          v-model="dayshift.cashier"
        />
        <el-checkbox
          label="Фолио"
          v-model="dayshift.folio"
        />
        <el-checkbox
          label="Шахматка"
          v-model="dayshift.chess"
        />
        <el-checkbox
          label="Статистика"
          v-model="dayshift.stats"
        />
        <el-checkbox
          label="Отчеты"
          v-model="dayshift.reports"
        />
        <el-checkbox
          label="Панель номеров"
          v-model="dayshift.roomBoard"
        />
        <el-checkbox
          label="Менеджер каналов"
          v-model="dayshift.channelManager"
        />
        <el-checkbox
          label="Настройки"
          v-model="dayshift.settings"
        />
      </div>

      <div
        class="form-5"
        v-if="subPosition === 'nightshift'"
      >
        <el-checkbox
          label="Панель графиков"
          v-model="nightshift.dashboard"
        />
        <el-checkbox
          label="Фронтдеск"
          v-model="nightshift.frontDesk"
        />
        <el-checkbox
          label="Касса"
          v-model="nightshift.cashier"
        />
        <el-checkbox
          label="Фолио"
          v-model="nightshift.folio"
        />
        <el-checkbox
          label="Шахматка"
          v-model="nightshift.chess"
        />
        <el-checkbox
          label="Статистика"
          v-model="nightshift.stats"
        />
        <el-checkbox
          label="Отчеты"
          v-model="nightshift.reports"
        />
        <el-checkbox
          label="Панель номеров"
          v-model="nightshift.roomBoard"
        />
        <el-checkbox
          label="Менеджер каналов"
          v-model="nightshift.channelManager"
        />
        <el-checkbox
          label="Настройки"
          v-model="nightshift.settings"
        />
      </div>
    <!-- ////// -->


      <div class="divider"/>
      <h4>Разрешения</h4>


  <!-- Permitted functions of Hotelier -->
      <div
        class="form-4"
        v-if="subPosition === 'main'"
      >
        <div class="w-100">
          <label for="input">Панель графиков</label>
          <el-select
            v-model="main.dashVal"
            :disabled="!main.dashboard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in dashPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фронтдеск</label>
          <el-select
            v-model="main.frontVal"
            :disabled="!main.frontDesk"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in frontPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Касса</label>
          <el-select
            v-model="main.cashierVal"
            :disabled="!main.cashier"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in cashierPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фолио</label>
          <el-select
            v-model="main.folioVal"
            :disabled="!main.folio"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in folioPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Шахматка</label>
          <el-select
            v-model="main.chessVal"
            :disabled="!main.chess"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in chessPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Статистика</label>
          <el-select
            v-model="main.statsVal"
            :disabled="!main.stats"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in statsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Отчеты</label>
          <el-select
            v-model="main.reportsVal"
            :disabled="!main.reports"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in reportsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Панель номеров</label>
          <el-select
            v-model="main.roomboardVal"
            :disabled="!main.roomBoard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in roomboardPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Менеджер каналов</label>
          <el-select
            v-model="main.channelManagerVal"
            :disabled="!main.channelManager"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in channelManagerPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Настройки</label>
          <el-select
            v-model="main.settingsVal"
            :disabled="!main.settings"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in settingsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div
        class="form-4"
        v-if="subPosition === 'senior'"
      >
        <div class="w-100">
          <label for="input">Панель графиков</label>
          <el-select
            v-model="senior.dashVal"
            :disabled="!senior.dashboard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in dashPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фронтдеск</label>
          <el-select
            v-model="senior.frontVal"
            :disabled="!senior.frontDesk"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in frontPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Касса</label>
          <el-select
            v-model="senior.cashierVal"
            :disabled="!senior.cashier"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in cashierPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фолио</label>
          <el-select
            v-model="senior.folioVal"
            :disabled="!senior.folio"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in folioPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Шахматка</label>
          <el-select
            v-model="senior.chessVal"
            :disabled="!senior.chess"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in chessPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Статистика</label>
          <el-select
            v-model="senior.statsVal"
            :disabled="!senior.stats"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in statsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Отчеты</label>
          <el-select
            v-model="senior.reportsVal"
            :disabled="!senior.reports"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in reportsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Панель номеров</label>
          <el-select
            v-model="senior.roomboardVal"
            :disabled="!senior.roomBoard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in roomboardPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Менеджер каналов</label>
          <el-select
            v-model="senior.channelManagerVal"
            :disabled="!senior.channelManager"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in channelManagerPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Настройки</label>
          <el-select
            v-model="senior.settingsVal"
            :disabled="!senior.settings"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in settingsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div
        class="form-4"
        v-if="subPosition === 'junior'"
      >
        <div class="w-100">
          <label for="input">Панель графиков</label>
          <el-select
            v-model="junior.dashVal"
            :disabled="!junior.dashboard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in dashPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фронтдеск</label>
          <el-select
            v-model="junior.frontVal"
            :disabled="!junior.frontDesk"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in frontPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Касса</label>
          <el-select
            v-model="junior.cashierVal"
            :disabled="!junior.cashier"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in cashierPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фолио</label>
          <el-select
            v-model="junior.folioVal"
            :disabled="!junior.folio"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in folioPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Шахматка</label>
          <el-select
            v-model="junior.chessVal"
            :disabled="!junior.chess"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in chessPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Статистика</label>
          <el-select
            v-model="junior.statsVal"
            :disabled="!junior.stats"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in statsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Отчеты</label>
          <el-select
            v-model="junior.reportsVal"
            :disabled="!junior.reports"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in reportsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Панель номеров</label>
          <el-select
            v-model="junior.roomboardVal"
            :disabled="!junior.roomBoard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in roomboardPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Менеджер каналов</label>
          <el-select
            v-model="junior.channelManagerVal"
            :disabled="!junior.channelManager"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in channelManagerPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Настройки</label>
          <el-select
            v-model="junior.settingsVal"
            :disabled="!junior.settings"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in settingsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div
        class="form-4"
        v-if="subPosition === 'dayshift'"
      >
        <div class="w-100">
          <label for="input">Панель графиков</label>
          <el-select
            v-model="dayshift.dashVal"
            :disabled="!dayshift.dashboard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in dashPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фронтдеск</label>
          <el-select
            v-model="dayshift.frontVal"
            :disabled="!dayshift.frontDesk"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in frontPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Касса</label>
          <el-select
            v-model="dayshift.cashierVal"
            :disabled="!dayshift.cashier"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in cashierPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фолио</label>
          <el-select
            v-model="dayshift.folioVal"
            :disabled="!dayshift.folio"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in folioPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Шахматка</label>
          <el-select
            v-model="dayshift.chessVal"
            :disabled="!dayshift.chess"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in chessPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Статистика</label>
          <el-select
            v-model="dayshift.statsVal"
            :disabled="!dayshift.stats"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in statsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Отчеты</label>
          <el-select
            v-model="dayshift.reportsVal"
            :disabled="!dayshift.reports"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in reportsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Панель номеров</label>
          <el-select
            v-model="dayshift.roomboardVal"
            :disabled="!dayshift.roomBoard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in roomboardPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Менеджер каналов</label>
          <el-select
            v-model="dayshift.channelManagerVal"
            :disabled="!dayshift.channelManager"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in channelManagerPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Настройки</label>
          <el-select
            v-model="dayshift.settingsVal"
            :disabled="!dayshift.settings"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in settingsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div
        class="form-4"
        v-if="subPosition === 'nightshift'"
      >
        <div class="w-100">
          <label for="input">Панель графиков</label>
          <el-select
            v-model="nightshift.dashVal"
            :disabled="!nightshift.dashboard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in dashPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фронтдеск</label>
          <el-select
            v-model="nightshift.frontVal"
            :disabled="!nightshift.frontDesk"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in frontPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Касса</label>
          <el-select
            v-model="nightshift.cashierVal"
            :disabled="!nightshift.cashier"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in cashierPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Фолио</label>
          <el-select
            v-model="nightshift.folioVal"
            :disabled="!nightshift.folio"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in folioPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Шахматка</label>
          <el-select
            v-model="nightshift.chessVal"
            :disabled="!nightshift.chess"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in chessPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Статистика</label>
          <el-select
            v-model="nightshift.statsVal"
            :disabled="!nightshift.stats"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in statsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Отчеты</label>
          <el-select
            v-model="nightshift.reportsVal"
            :disabled="!nightshift.reports"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in reportsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Панель номеров</label>
          <el-select
            v-model="nightshift.roomboardVal"
            :disabled="!nightshift.roomBoard"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in roomboardPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Менеджер каналов</label>
          <el-select
            v-model="nightshift.channelManagerVal"
            :disabled="!nightshift.channelManager"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in channelManagerPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>

        <div class="w-100">
          <label for="input">Настройки</label>
          <el-select
            v-model="nightshift.settingsVal"
            :disabled="!nightshift.settings"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="Не выбраны разрешения"
          >
            <el-option
              v-for="(permission, idx) in settingsPermissionsList"
              :key="idx"
              :label="permission.label"
              :value="permission.value">
            </el-option>
          </el-select>
        </div>
      </div>
  <!-- /////// -->
      <h4
        style="display: none"
      >
        {{dashPermissions}} {{frontPermissions}} {{cashierPermissions}}
        {{folioPermissions}} {{chessPermissions}} {{statsPermissions}}
        {{reportsPermissions}} {{roomboardPermissions}} {{channelManagerPermissions}}
        {{settingsPermissions}}
      </h4>


      <div class="input-grid-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="editPermissions"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </div>
    <div
      class="modal-back"
      @click="closeModal"
    />
  </div>
</template>

<script>
export default {
  name: 'Accesses',

  data: () => ({
    subPosition: 'main',

    main: {
      dashboard: '',
      frontDesk: '',
      cashier: '',
      folio: '',
      chess: '',
      stats: '',
      reports: '',
      roomBoard: '',
      channelManager: '',
      settings: '',
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
    },

    senior: {
      dashboard: '',
      frontDesk: '',
      cashier: '',
      folio: '',
      chess: '',
      stats: '',
      reports: '',
      roomBoard: '',
      channelManager: '',
      settings: '',
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
    },

    junior: {
      dashboard: '',
      frontDesk: '',
      cashier: '',
      folio: '',
      chess: '',
      stats: '',
      reports: '',
      roomBoard: '',
      channelManager: '',
      settings: '',
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
    },

    dayshift: {
      dashboard: '',
      frontDesk: '',
      cashier: '',
      folio: '',
      chess: '',
      stats: '',
      reports: '',
      roomBoard: '',
      channelManager: '',
      settings: '',
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
    },

    nightshift: {
      dashboard: '',
      frontDesk: '',
      cashier: '',
      folio: '',
      chess: '',
      stats: '',
      reports: '',
      roomBoard: '',
      channelManager: '',
      settings: '',
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
    },


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

    dashPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    frontPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    cashierPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    folioPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    chessPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    statsPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    reportsPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    roomboardPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    channelManagerPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],

    settingsPermissionsList: [
      {label: 'Расчеты', value: 'calculating'},
      {label: 'Заезд', value: 'checkIn'},
      {label: 'Выезд', value: 'checkOut'},
      {label: 'Профиль гостя', value: 'guestProfile'},
    ],
  }),

  props: {
    position: String,
  },

  computed: {
    parsedSubPosition() {
      if(this.position === 'manager') {
        return JSON.parse(window.sessionStorage.managerAccesses).isAccess
      } else if(this.position === 'receptionist') {
        return JSON.parse(window.sessionStorage.receptionistAccesses).isAccess
      } else if(this.position === 'restaurantManager') {
        return JSON.parse(window.sessionStorage.restaurantManagerAccesses).isAccess
      } else if(this.position === 'maid') {
        return JSON.parse(window.sessionStorage.maidAccesses).isAccess
      } else if(this.position === 'waiter') {
        return JSON.parse(window.sessionStorage.waiterAccesses).isAccess
      } else if(this.position === 'cook') {
        return JSON.parse(window.sessionStorage.cookAccesses).isAccess
      }
    },

    dashPermissions() {
      this.main.dashboard = JSON.parse(this.parsedSubPosition.main).dashPermission.accessible
      this.main.dashVal = JSON.parse(this.parsedSubPosition.main).dashPermission.permissions

      this.senior.dashboard = JSON.parse(this.parsedSubPosition.senior).dashPermission.accessible
      this.senior.dashVal = JSON.parse(this.parsedSubPosition.senior).dashPermission.permissions

      this.junior.dashboard = JSON.parse(this.parsedSubPosition.junior).dashPermission.accessible
      this.junior.dashVal = JSON.parse(this.parsedSubPosition.junior).dashPermission.permissions

      this.dayshift.dashboard = JSON.parse(this.parsedSubPosition.dayshift).dashPermission.accessible
      this.dayshift.dashVal = JSON.parse(this.parsedSubPosition.dayshift).dashPermission.permissions

      this.nightshift.dashboard = JSON.parse(this.parsedSubPosition.nightshift).dashPermission.accessible
      this.nightshift.dashVal = JSON.parse(this.parsedSubPosition.nightshift).dashPermission.permissions
    },

    frontPermissions() {
      this.main.frontDesk = JSON.parse(this.parsedSubPosition.main).frontPermission.accessible
      this.main.frontVal = JSON.parse(this.parsedSubPosition.main).frontPermission.permissions

      this.senior.frontDesk = JSON.parse(this.parsedSubPosition.senior).frontPermission.accessible
      this.senior.frontVal = JSON.parse(this.parsedSubPosition.senior).frontPermission.permissions

      this.junior.frontDesk = JSON.parse(this.parsedSubPosition.junior).frontPermission.accessible
      this.junior.frontVal = JSON.parse(this.parsedSubPosition.junior).frontPermission.permissions

      this.dayshift.frontDesk = JSON.parse(this.parsedSubPosition.dayshift).frontPermission.accessible
      this.dayshift.frontVal = JSON.parse(this.parsedSubPosition.dayshift).frontPermission.permissions

      this.nightshift.frontDesk = JSON.parse(this.parsedSubPosition.nightshift).frontPermission.accessible
      this.nightshift.frontVal = JSON.parse(this.parsedSubPosition.nightshift).frontPermission.permissions
    },

    cashierPermissions() {
      this.main.cashier = JSON.parse(this.parsedSubPosition.main).cashierPermission.accessible
      this.main.cashierVal = JSON.parse(this.parsedSubPosition.main).cashierPermission.permissions

      this.senior.cashier = JSON.parse(this.parsedSubPosition.senior).cashierPermission.accessible
      this.senior.cashierVal = JSON.parse(this.parsedSubPosition.senior).cashierPermission.permissions

      this.junior.cashier = JSON.parse(this.parsedSubPosition.junior).cashierPermission.accessible
      this.junior.cashierVal = JSON.parse(this.parsedSubPosition.junior).cashierPermission.permissions

      this.dayshift.cashier = JSON.parse(this.parsedSubPosition.dayshift).cashierPermission.accessible
      this.dayshift.cashierVal = JSON.parse(this.parsedSubPosition.dayshift).cashierPermission.permissions

      this.nightshift.cashier = JSON.parse(this.parsedSubPosition.nightshift).cashierPermission.accessible
      this.nightshift.cashierVal = JSON.parse(this.parsedSubPosition.nightshift).cashierPermission.permissions
    },

    folioPermissions() {
      this.main.folio = JSON.parse(this.parsedSubPosition.main).folioPermission.accessible
      this.main.folioVal = JSON.parse(this.parsedSubPosition.main).folioPermission.permissions

      this.senior.folio = JSON.parse(this.parsedSubPosition.senior).folioPermission.accessible
      this.senior.folioVal = JSON.parse(this.parsedSubPosition.senior).folioPermission.permissions

      this.junior.folio = JSON.parse(this.parsedSubPosition.junior).folioPermission.accessible
      this.junior.folioVal = JSON.parse(this.parsedSubPosition.junior).folioPermission.permissions

      this.dayshift.folio = JSON.parse(this.parsedSubPosition.dayshift).folioPermission.accessible
      this.dayshift.folioVal = JSON.parse(this.parsedSubPosition.dayshift).folioPermission.permissions

      this.nightshift.folio = JSON.parse(this.parsedSubPosition.nightshift).folioPermission.accessible
      this.nightshift.folioVal = JSON.parse(this.parsedSubPosition.nightshift).folioPermission.permissions
    },

    chessPermissions() {
      this.main.chess = JSON.parse(this.parsedSubPosition.main).chessPermission.accessible
      this.main.chessVal = JSON.parse(this.parsedSubPosition.main).chessPermission.permissions

      this.senior.chess = JSON.parse(this.parsedSubPosition.senior).chessPermission.accessible
      this.senior.chessVal = JSON.parse(this.parsedSubPosition.senior).chessPermission.permissions

      this.junior.chess = JSON.parse(this.parsedSubPosition.junior).chessPermission.accessible
      this.junior.chessVal = JSON.parse(this.parsedSubPosition.junior).chessPermission.permissions

      this.dayshift.chess = JSON.parse(this.parsedSubPosition.dayshift).chessPermission.accessible
      this.dayshift.chessVal = JSON.parse(this.parsedSubPosition.dayshift).chessPermission.permissions

      this.nightshift.chess = JSON.parse(this.parsedSubPosition.nightshift).chessPermission.accessible
      this.nightshift.chessVal = JSON.parse(this.parsedSubPosition.nightshift).chessPermission.permissions
    },

    statsPermissions() {
      this.main.stats = JSON.parse(this.parsedSubPosition.main).statsPermission.accessible
      this.main.statsVal = JSON.parse(this.parsedSubPosition.main).statsPermission.permissions

      this.senior.stats = JSON.parse(this.parsedSubPosition.senior).statsPermission.accessible
      this.senior.statsVal = JSON.parse(this.parsedSubPosition.senior).statsPermission.permissions

      this.junior.stats = JSON.parse(this.parsedSubPosition.junior).statsPermission.accessible
      this.junior.statsVal = JSON.parse(this.parsedSubPosition.junior).statsPermission.permissions

      this.dayshift.stats = JSON.parse(this.parsedSubPosition.dayshift).statsPermission.accessible
      this.dayshift.statsVal = JSON.parse(this.parsedSubPosition.dayshift).statsPermission.permissions

      this.nightshift.stats = JSON.parse(this.parsedSubPosition.nightshift).statsPermission.accessible
      this.nightshift.statsVal = JSON.parse(this.parsedSubPosition.nightshift).statsPermission.permissions
    },

    reportsPermissions() {
      this.main.reports = JSON.parse(this.parsedSubPosition.main).reportsPermission.accessible
      this.main.reportsVal = JSON.parse(this.parsedSubPosition.main).reportsPermission.permissions

      this.senior.reports = JSON.parse(this.parsedSubPosition.senior).reportsPermission.accessible
      this.senior.reportsVal = JSON.parse(this.parsedSubPosition.senior).reportsPermission.permissions

      this.junior.reports = JSON.parse(this.parsedSubPosition.junior).reportsPermission.accessible
      this.junior.reportsVal = JSON.parse(this.parsedSubPosition.junior).reportsPermission.permissions

      this.dayshift.reports = JSON.parse(this.parsedSubPosition.dayshift).reportsPermission.accessible
      this.dayshift.reportsVal = JSON.parse(this.parsedSubPosition.dayshift).reportsPermission.permissions

      this.nightshift.reports = JSON.parse(this.parsedSubPosition.nightshift).reportsPermission.accessible
      this.nightshift.reportsVal = JSON.parse(this.parsedSubPosition.nightshift).reportsPermission.permissions
    },

    roomboardPermissions() {
      this.main.roomBoard = JSON.parse(this.parsedSubPosition.main).roomboardPermission.accessible
      this.main.roomboardVal = JSON.parse(this.parsedSubPosition.main).roomboardPermission.permissions

      this.senior.roomBoard = JSON.parse(this.parsedSubPosition.senior).roomboardPermission.accessible
      this.senior.roomboardVal = JSON.parse(this.parsedSubPosition.senior).roomboardPermission.permissions

      this.junior.roomBoard = JSON.parse(this.parsedSubPosition.junior).roomboardPermission.accessible
      this.junior.roomboardVal = JSON.parse(this.parsedSubPosition.junior).roomboardPermission.permissions

      this.dayshift.roomBoard = JSON.parse(this.parsedSubPosition.dayshift).roomboardPermission.accessible
      this.dayshift.roomboardVal = JSON.parse(this.parsedSubPosition.dayshift).roomboardPermission.permissions

      this.nightshift.roomBoard = JSON.parse(this.parsedSubPosition.nightshift).roomboardPermission.accessible
      this.nightshift.roomboardVal = JSON.parse(this.parsedSubPosition.nightshift).roomboardPermission.permissions
    },

    channelManagerPermissions() {
      this.main.channelManager = JSON.parse(this.parsedSubPosition.main).channelManagerPermission.accessible
      this.main.channelManagerVal = JSON.parse(this.parsedSubPosition.main).channelManagerPermission.permissions

      this.senior.channelManager = JSON.parse(this.parsedSubPosition.senior).channelManagerPermission.accessible
      this.senior.channelManagerVal = JSON.parse(this.parsedSubPosition.senior).channelManagerPermission.permissions

      this.junior.channelManager = JSON.parse(this.parsedSubPosition.junior).channelManagerPermission.accessible
      this.junior.channelManagerVal = JSON.parse(this.parsedSubPosition.junior).channelManagerPermission.permissions

      this.dayshift.channelManager = JSON.parse(this.parsedSubPosition.dayshift).channelManagerPermission.accessible
      this.dayshift.channelManagerVal = JSON.parse(this.parsedSubPosition.dayshift).channelManagerPermission.permissions

      this.nightshift.channelManager = JSON.parse(this.parsedSubPosition.nightshift).channelManagerPermission.accessible
      this.nightshift.channelManagerVal = JSON.parse(this.parsedSubPosition.nightshift).channelManagerPermission.permissions
    },

    settingsPermissions() {
      this.main.settings = JSON.parse(this.parsedSubPosition.main).settingsPermission.accessible
      this.main.settingsVal = JSON.parse(this.parsedSubPosition.main).settingsPermission.permissions

      this.senior.settings = JSON.parse(this.parsedSubPosition.senior).settingsPermission.accessible
      this.senior.settingsVal = JSON.parse(this.parsedSubPosition.senior).settingsPermission.permissions

      this.junior.settings = JSON.parse(this.parsedSubPosition.junior).settingsPermission.accessible
      this.junior.settingsVal = JSON.parse(this.parsedSubPosition.junior).settingsPermission.permissions

      this.dayshift.settings = JSON.parse(this.parsedSubPosition.dayshift).settingsPermission.accessible
      this.dayshift.settingsVal = JSON.parse(this.parsedSubPosition.dayshift).settingsPermission.permissions

      this.nightshift.settings = JSON.parse(this.parsedSubPosition.nightshift).settingsPermission.accessible
      this.nightshift.settingsVal = JSON.parse(this.parsedSubPosition.nightshift).settingsPermission.permissions
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeAccess')
    },

    async editPermissions() {
      const name = this.position+'s'

      const access = {
        position: this.position,
        
        main: {
          dashPermission: {accessible: this.main.dashboard, permissions: this.main.dashVal},
          frontPermission: {accessible: this.main.frontDesk, permissions: this.main.frontVal},
          cashierPermission: {accessible: this.main.cashier, permissions: this.main.cashierVal},
          folioPermission: {accessible: this.main.folio, permissions: this.main.folioVal},
          chessPermission: {accessible: this.main.chess, permissions: this.main.chessVal},
          statsPermission: {accessible: this.main.stats, permissions: this.main.statsVal},
          reportsPermission: {accessible: this.main.reports, permissions: this.main.reportsVal},
          roomboardPermission: {accessible: this.main.roomBoard, permissions: this.main.roomboardVal},
          channelManagerPermission: {accessible: this.main.channelManager, permissions: this.main.channelManagerVal},
          settingsPermission: {accessible: this.main.settings, permissions: this.main.settingsVal},
        },

        senior: {
          dashPermission: {accessible: this.senior.dashboard, permissions: this.senior.dashVal},
          frontPermission: {accessible: this.senior.frontDesk, permissions: this.senior.frontVal},
          cashierPermission: {accessible: this.senior.cashier, permissions: this.senior.cashierVal},
          folioPermission: {accessible: this.senior.folio, permissions: this.senior.folioVal},
          chessPermission: {accessible: this.senior.chess, permissions: this.senior.chessVal},
          statsPermission: {accessible: this.senior.stats, permissions: this.senior.statsVal},
          reportsPermission: {accessible: this.senior.reports, permissions: this.senior.reportsVal},
          roomboardPermission: {accessible: this.senior.roomBoard, permissions: this.senior.roomboardVal},
          channelManagerPermission: {accessible: this.senior.channelManager, permissions: this.senior.channelManagerVal},
          settingsPermission: {accessible: this.senior.settings, permissions: this.senior.settingsVal},
        },

        junior: {
          dashPermission: {accessible: this.junior.dashboard, permissions: this.junior.dashVal},
          frontPermission: {accessible: this.junior.frontDesk, permissions: this.junior.frontVal},
          cashierPermission: {accessible: this.junior.cashier, permissions: this.junior.cashierVal},
          folioPermission: {accessible: this.junior.folio, permissions: this.junior.folioVal},
          chessPermission: {accessible: this.junior.chess, permissions: this.junior.chessVal},
          statsPermission: {accessible: this.junior.stats, permissions: this.junior.statsVal},
          reportsPermission: {accessible: this.junior.reports, permissions: this.junior.reportsVal},
          roomboardPermission: {accessible: this.junior.roomBoard, permissions: this.junior.roomboardVal},
          channelManagerPermission: {accessible: this.junior.channelManager, permissions: this.junior.channelManagerVal},
          settingsPermission: {accessible: this.junior.settings, permissions: this.junior.settingsVal},
        },

        dayshift: {
          dashPermission: {accessible: this.dayshift.dashboard, permissions: this.dayshift.dashVal},
          frontPermission: {accessible: this.dayshift.frontDesk, permissions: this.dayshift.frontVal},
          cashierPermission: {accessible: this.dayshift.cashier, permissions: this.dayshift.cashierVal},
          folioPermission: {accessible: this.dayshift.folio, permissions: this.dayshift.folioVal},
          chessPermission: {accessible: this.dayshift.chess, permissions: this.dayshift.chessVal},
          statsPermission: {accessible: this.dayshift.stats, permissions: this.dayshift.statsVal},
          reportsPermission: {accessible: this.dayshift.reports, permissions: this.dayshift.reportsVal},
          roomboardPermission: {accessible: this.dayshift.roomBoard, permissions: this.dayshift.roomboardVal},
          channelManagerPermission: {accessible: this.dayshift.channelManager, permissions: this.dayshift.channelManagerVal},
          settingsPermission: {accessible: this.dayshift.settings, permissions: this.dayshift.settingsVal},
        },

        nightshift: {
          dashPermission: {accessible: this.nightshift.dashboard, permissions: this.nightshift.dashVal},
          frontPermission: {accessible: this.nightshift.frontDesk, permissions: this.nightshift.frontVal},
          cashierPermission: {accessible: this.nightshift.cashier, permissions: this.nightshift.cashierVal},
          folioPermission: {accessible: this.nightshift.folio, permissions: this.nightshift.folioVal},
          chessPermission: {accessible: this.nightshift.chess, permissions: this.nightshift.chessVal},
          statsPermission: {accessible: this.nightshift.stats, permissions: this.nightshift.statsVal},
          reportsPermission: {accessible: this.nightshift.reports, permissions: this.nightshift.reportsVal},
          roomboardPermission: {accessible: this.nightshift.roomBoard, permissions: this.nightshift.roomboardVal},
          channelManagerPermission: {accessible: this.nightshift.channelManager, permissions: this.nightshift.channelManagerVal},
          settingsPermission: {accessible: this.nightshift.settings, permissions: this.nightshift.settingsVal},
        },
      }

      await this.$store.dispatch('editAccesses', access)

      if(name === 'managers') {
        await this.$store.dispatch('getAccessesManagers', name)
      } else if(name === 'receptionists') {
        await this.$store.dispatch('getAccessesReceptionists', name)
      } else if(name === 'restaurantManagers') {
        await this.$store.dispatch('getAccessesRestaurantManagers', name)
      } else if(name === 'maids') {
        await this.$store.dispatch('getAccessesMaids', name)
      } else if(name === 'waiters') {
        await this.$store.dispatch('getAccessesWaiters', name)
      } else if(name === 'cooks') {
        await this.$store.dispatch('getAccessesCooks', name)
      }


      this.$emit('closeAccess')
      this.$message({
        message: "Изменения сохранены",
        type: 'success'
      })

    },

  }
}
</script>

<style>

</style>