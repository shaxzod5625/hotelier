<template>
  <div class="con-page">

    <NewBlock
      v-if="addNewBlock"

      @closeNewBlock="closeNewBlock"
    />

    <EditBlock
      v-if="editBlockModal"

      @closeEditBlock="closeEditBlock"
      
      :type="type"
      :blockName="blockName"
      :floorsAmount="floorsAmount"
    />

    <DeletingBlock
      v-if="deleteBlockModal"

      @closeDeleteBlock="closeDeleteBlock"

      :blockName="blockName"
      :blockID="blockID"
    />

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings'}" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Номерной фонд</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="tabbar" style="flex-direction: row-reverse;">
      <button
        class="tabbar-btn"
        @click="addNewBlock = true"
      >
        Добавить
      </button>
    </div>

    <div class="list-card">
      <table class="list-table">
        <tr>
          <th>Корпус</th>
          <th>Количество этажей</th>
          <th>Тип корпуса</th>
          <th>Количество номеров</th>
        </tr>
        <tr
          class="content-list"
          v-for="(block, idx) in blocks"
          :key="idx"
        >
          <div class="td-list">
            <div class="list-divider"></div>
            <div class="list-content">
              <router-link class="category-link" :to="{name: 'Block Window', params: {id: block.blockID}}">
                <td
                  class="category-name"
                >
                  {{block.blockName}}
                </td>
              </router-link>
              <td>{{block.floors.length}}</td>
              <td>{{block.type}}</td>
              <td class="list-last-el">
                46
                <div class="list-icon-box">
                  <router-link
                    :to="{name: 'Block Window', params: {id: block.blockID}}"
                    style="align-items: center; display: flex;"
                  >
                    <img
                      class="icon-box"
                      src="@/assets/icons/Open.svg" alt=""
                    >
                  </router-link>
                  <img
                    @click="editBlock(block)"
                    class="icon-box"
                    src="@/assets/icons/Edit.svg" alt=""
                  >
                  <img
                    @click="deleteBlock(block)"
                    class="icon-box"
                    src="@/assets/icons/Delete.svg" alt=""
                  >
                </div>
              </td>
            </div>
          </div>
        </tr>
      </table>
    </div>


  </div>
</template>

<script>
import DeletingBlock from './blocksAndFloors/blockModals/DeletingBlock.vue'
import EditBlock from './blocksAndFloors/blockModals/EditBlock.vue'
import NewBlock from './blocksAndFloors/blockModals/NewBlock.vue'

export default {
  name: 'Blocks',

  components: {
    NewBlock, EditBlock, DeletingBlock
  },

  data: () => ({
    addNewBlock: false,
    editBlockModal: false,
    deleteBlockModal: false,

    type: '',
    blockName: '',
    blockID: '',
    floorsAmount: '',
  }),
  
  computed: {
    blocks() {
      return this.$store.state.blocks
    }
  },

  methods: {
    editBlock(block) {
      this.type = block.type
      this.blockName = block.blockName
      this. floorsAmount = block.floors.length

      this.editBlockModal = true
    },

    deleteBlock(block) {
      this.blockName = block.blockName
      this.blockID = block.blockID

      this.deleteBlockModal = true
    },

    closeNewBlock() {
      this.addNewBlock = false
    },

    closeEditBlock() {
      this.editBlockModal = false
    },

    closeDeleteBlock() {
      this.deleteBlockModal = false
    }
  }
}
</script>

<style>

</style>