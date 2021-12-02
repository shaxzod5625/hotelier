<template>
  <div class="con-page">

    <transition name="component-fade" mode="out-in">
      <NewBlock
        v-if="addNewBlock"

        @closeNewBlock="closeNewBlock"
        @refresh="refresh"
      />

      <EditBlock
        v-if="editBlockModal"

        @closeEditBlock="closeEditBlock"
        @refresh="refresh"
        
        :type="type"
        :blockName="blockName"
        :floorsAmount="floorsAmount"
        :blockID="blockID"
      />

      <DeletingBlock
        v-if="deleteBlockModal"

        @closeDeleteBlock="closeDeleteBlock"
        @refresh="refresh"

        :blockName="blockName"
        :blockID="blockID"
      />
    </transition>

    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/settings' }" class="breadcrump">Настройки</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrump">Корпусы и этажи</el-breadcrumb-item>
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
              <router-link class="category-link" :to="{name: 'Block Window', params: {id: block.name}}">
                <td
                  class="category-name"
                >
                  {{block.name}}
                </td>
              </router-link>
              <td>{{block.floors.length}}</td>
              <td>{{blockType(block.typeOfBlock)}}</td>
              <td class="list-last-el">
                {{roomsAmount(block.floors)}}
                <div class="list-icon-box">
                  <router-link
                    :to="{name: 'Block Window', params: {id: block.name}}"
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

    blocks: JSON.parse(window.sessionStorage.allBlocks).blocks,

    type: '',
    blockName: '',
    blockID: '',
    floorsAmount: '',
  }),
  
  computed: {
    setNewBlocks() {
      this.blocks = JSON.parse(window.sessionStorage.allBlocks).blocks
    },
  },

  methods: {
    async getNewBlocks() {

      try {
        await this.$store.dispatch('getBlocksInfo')
      } catch(err) {
        if(err === undefined || err === null || err === '') {
          console.log(err);
        }
      }

      this.blocks = JSON.parse(window.sessionStorage.allBlocks).blocks
      this.$forceUpdate(this.setNewBlocks)
    },

    roomsAmount(floors) {
      const allFloors = floors
      const floorsCount = allFloors.length
      const amount = []

      for (let i=0; i<floorsCount; i++) {
        let rooms = JSON.parse(allFloors[i]).amountOfRoom

        amount.push(rooms)
      }

      return amount.reduce((a, b) => a + b)
    },

    blockType(type) {
      if(type === 'main') {
        return 'Основной'
      } else if(type === 'additional') {
        return 'Дополнительный'
      }
    },

    editBlock(block) {
      this.type = block.typeOfBlock
      this.blockName = block.name
      this.floorsAmount = block.floors.length
      this.blockID = block._id

      this.editBlockModal = true
    },

    deleteBlock(block) {
      this.blockName = block.name
      this.blockID = block._id

      this.deleteBlockModal = true
    },

    async closeNewBlock() {
      this.addNewBlock = false
    },

    closeEditBlock() {
      this.editBlockModal = false
    },

    closeDeleteBlock() {
      this.deleteBlockModal = false
    },

    async refresh() {
      this.$forceUpdate(this.getNewBlocks())
    }
  }
}
</script>

<style>

</style>