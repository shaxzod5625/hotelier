<template>
  <label class="wrapper flex items-center">
    {{label}}
    <input class="checkbox" type="radio" :checked="isChecked" :value="value" @change="$emit('change', $event.target.value)" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: 'RadioButton',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    "label": { type: String, default: ""},
    "modelValue": { default: "" },
    "value": { type: String, default: undefined }
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value
    }
  }
}
</script>

<style lang="postcss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

.wrapper {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 6px;
  cursor: pointer;
  user-select: none;
}

.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #6B96F3;
}

.wrapper:hover input ~ .checkmark {
  background-color: #fff;
}

.wrapper input:checked ~ .checkmark {
  border: 2px solid #2161ED;
  background-color: #fff;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.wrapper input:checked ~ .checkmark:after {
  display: block;
}

.wrapper .checkmark:after {
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2161ED;
}
</style>