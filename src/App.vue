<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from "vue";
import createStore from "@/store/index";
import { imLogin, imLogout } from "@/apis/im/im";
import { genTestUserSig } from "@/debug";
import { logout } from "@/apis/auth/auth";
import router, { hasRoles } from "@/router";
import { ElMessage } from "element-plus";
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
      }, 1000);
    };
    websocket.onclose = async (e) => {
      ElMessage({
        message: "websocket断开，您已退出",
        type: "error",
        duration: 5 * 1000
      });
      const store = createStore();
      try {
        await logout();
        await imLogout();
      } catch (e) {
        console.log(e);
      }
      store.clearUserInfo();
      store.clearToken();
      if (router.hasRoute("supervisor")) {
        router.removeRoute("supervisor");
      }
      if (router.hasRoute("admin")) {
        router.removeRoute("admin");
      }
      if (router.hasRoute("consultant")) {
        router.removeRoute("consultant");
      }
      hasRoles.hasRoles = true;
      await router.push({ path: "/login" });
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
