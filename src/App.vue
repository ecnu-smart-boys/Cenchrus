<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from "vue";
import createStore from "@/store/index";
import { imLogin, imLogout } from "@/apis/im/im";
import { generateUserSig } from "@/apis/conversation/conversation";
import { genTestUserSig } from "@/debug";
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
      clearInterval(timer);
    };
    websocket.onopen = () => {
      timer = setInterval(() => {
        websocket.send("");
      }, 15000);
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
    imLogin({
      userID: store.userInfo.id,
      userSig: genTestUserSig({
        SDKAppID: 1400810468,
        secretKey:
          "d14df58bc7f5f87424981ca2165867287e2c4ad3ba021709bfdd50edf37daaa0",
        userID: store.userInfo.id
      }).userSig
    }).then(() => {
      store.setIsLogin();
    });
  }
});
window.onbeforeunload = () => {
  if (isOpen) {
    isOpen = false;
    clearInterval(timer);
    websocket.close();
  }
  imLogout();
};
onUnmounted(async () => {
  if (isOpen) {
    isOpen = false;
    clearInterval(timer);
    websocket.close();
  }
  await imLogout();
});
</script>

<style lang="scss"></style>
