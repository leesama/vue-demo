<script setup>
import { ref } from "vue";
import CountDown from './components/CountDown.vue'
// const diffTime = ref(new Date("2023-05-10 17:24:04")- new Date("2023-05-09 17:54:04"))
const diffTime = ref(84600000)
const change = () => diffTime.value = diffTime.value - 300000

</script>

<template>
  <button @click="change">
    点击我查看效果，每次减少5分钟
  </button>
  <CountDown :diff-time="diffTime" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
