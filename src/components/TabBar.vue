<template>
  <div>
    <ul class="tabbar-list">
      <li
        v-for="tab in tabs"
        :key="tab"
      >
        <a
          :class="{active: tab === selected}"
          @click="setTab(tab)"
        >
          {{ tab }}
        </a>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true
    }
  },
  methods: {
    setTab(tab) {
      this.$emit('selected', tab);
    }
  }
}
</script>