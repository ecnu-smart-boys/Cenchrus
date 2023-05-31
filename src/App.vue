<template>
  <router-view />
</template>

<script setup lang="ts">
import { onUnmounted, watchEffect } from "vue";
import createStore from "@/store/index";
const store = createStore();
let timer;

let websocket;
let isOpen = false;
watchEffect(() => {
  if (store.token !== "" && !isOpen) {
    isOpen = true;
    websocket = new WebSocket(
      `${process.env.VUE_APP_WS_BASE_URL}/ws?x-freud=${store.token}`
    );
    timer = setInterval(() => {
      websocket.send("");
    }, 1000);
  }
  if (store.token == "" && isOpen) {
    isOpen = false;
    clearInterval(timer);
    websocket.close();
  }
});
onUnmounted(() => {
  if (isOpen) {
    clearInterval(timer);
    websocket.close();
  }
});
</script>

<style scoped lang="scss"></style>
