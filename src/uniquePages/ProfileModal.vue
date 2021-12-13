<template>
  <div class="modal">
    <div class="left-modal-div">
      <div
        class="modal-btns"
        style="position: fixed; bottom: 40px;"
      >
        <button
          class="ghost-btn"
          @click="closeModal"
        >
          Cancel
        </button>

        <button
          class="ghost-btn-danger"
          @click="logout"
        >
          <img src="@/assets/icons/Checkout-sm.svg" alt="">
          Logout
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
  name: 'ProfileModal',

  data:() => ({

  }),

  methods: {
    closeModal() {
      this.$emit('closeProfileModal')
    },

    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>