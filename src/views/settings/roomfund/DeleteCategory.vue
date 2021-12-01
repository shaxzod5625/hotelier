<template>
  <div class="modal">
    <div class="form-filter">
      <h3>Удаление категории номеров</h3>
      <div class="divider"></div>
      <h3 class="title-strong">{{catName}}</h3>
      <h3 class="danger-msg">Вы собираетесь удалить данную категорию номеров безвозвратно.Это приведет к сбою нескольких функций Hotelier PMS. Удалить категорию номеров?</h3>
      <div class="modal-btns">
        <button
          class="sec-btn"
          @click="closeModal"
        >
          <span>Отмена</span>
        </button>

        <button
          class="prim-btn"
          @click.prevent="deleteRoomCategory"
        >
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
    category: String,
  },

  computed: {
    catName() {
      if(this.category === 'apartment') {return 'Апартаменты'}
      else if(this.category === 'bungalow') {return 'Бунгало'}
      else if(this.category === 'deluxe') {return 'Делюкс'}
      else if(this.category === 'honeymoonRoom') {return 'Для молодоженов'}
      else if(this.category === 'suite') {return 'Люкс'}
      else if(this.category === 'duplex') {return 'Дюплекс'}
      else if(this.category === 'cabana') {return 'Коттедж'}
      else if(this.category === 'juniorSuite') {return 'Полулюкс'}
      else if(this.category === 'residence') {return 'Резиденция'}
      else if(this.category === 'familyRoom') {return 'Семейная комната'}
      else if(this.category === 'standart') {return 'Стандарт'}
      else if(this.category === 'studio') {return 'Студия'}
      else if(this.category === 'chalet') {return 'Шале'}
      else if(this.category === 'economyClass') {return 'Эконом-класс'}
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeDeleteCategory')
    },

    async deleteRoomCategory() {
      const category = this.category

      try {
        await this.$store.dispatch('deleteRoomCategory', category)
      } catch {}

      this.$emit('refresh')
      this.$emit('closeDeleteCategory')
      this.$message({
        message: "Категория номеров удалена",
        type: 'success'
      })
    },

    
  }
}
</script>