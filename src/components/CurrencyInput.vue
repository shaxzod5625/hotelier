<template>
  <div>
    <el-input 
      ref="inputRef"
      :placeholder="options.placeholder"
      type="text"
      :value="formattedValue"
      :disabled="options.disabled"
    >
    </el-input>
  </div>
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',

  props: {
    value: String,
    options: Object
  },

  methods: {
  },

  setup (props) {
    const { formattedValue, inputRef } = useCurrencyInput(props.options)

    return { inputRef, formattedValue }
  }
}
</script>