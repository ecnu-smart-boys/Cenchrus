<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from "vue";
import createStore from "@/store/index";
import { imLogin } from "@/apis/im/im";
import { genTestUserSig } from "@/debug";
import { generateUserSig } from "@/apis/conversation/conversation";
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
    websocket.onerror = () => {
      console.log("error");
      clearInterval(timer);
    };
    websocket.onopen = () => {
      console.log("open");
      timer = setInterval(() => {
        websocket.send("");
      }, 1000);
    };
    websocket.onmessage = (e) => {
      if (e.data !== "") {
        try {
          const data = JSON.parse(e.data);
          store.setWebSocketMessage(data);
        } catch (ignored) {
          /* empty */
        }
      }
    };
  }
  if (store.token == "" && isOpen) {
    isOpen = false;
    clearInterval(timer);
    websocket.close();
  }
});
onMounted(async () => {
  if (store.token && store.userInfo && !store.isLogin) {
    const sig = await generateUserSig();
    await imLogin({
      userID: store.userInfo.id,
      userSig: sig.userSig
    });
    store.setIsLogin();
  }
});
onUnmounted(() => {
  if (isOpen) {
    clearInterval(timer);
    websocket.close();
  }
});
</script>

<style lang="scss"></style>
