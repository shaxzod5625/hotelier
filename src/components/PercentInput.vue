<template>
  <div class="percent-input">
    <money
      v-model="value"
      :placeholder="options.placeholder"
      v-bind="money"
    />
  </div>
</template>

<script>
import {Money} from 'v-money'
export default {
  name: 'PercentInput',

  components: {Money},

  data:() => ({
    money: {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '%',
      precision: 0,
      masked: false
    }
  }),

  props: {
    options: Object,
    value: String,
  },

  computed: {
  },

  methods: {
  }
}
</script>

<style>

</style>