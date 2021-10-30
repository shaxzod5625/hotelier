<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление категории номеров</h3>
      <div class="divider"></div>
      <h3 class="title-strong">{{category.catName}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данную категорию номеров безвозвратно. Удалить категорию номеров?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button class="prim-btn">
          <span>Удалить</span>
        </button>
      </div>
    </div>
    <div class="modal-back"
      @click="closeModal"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteCategory',

  props: {
    catID: String,
  },

  computed: {
    category() {
      return this.$store.state.roomFund.find(cat => cat.catID == this.catID)
    } 
  },

  methods: {
    closeModal() {
      this.$emit('closeDeleteCategory')
    }
  }
}
</script>