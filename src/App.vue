<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import createStore from "@/store/index";
const { token } = createStore();
let timer;

let websocket;
onMounted(() => {
  websocket = new WebSocket(
    `${process.env.VUE_APP_WS_BASE_URL}/ws?x-freud=${token}`
  );
  timer = setTimeout(() => {
    websocket.send("");
  }, 1000);
});
onUnmounted(() => {
  clearTimeout(timer);
  websocket.close();
});
</script>

<style scoped lang="scss"></style>
