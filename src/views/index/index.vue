<template>
  <div class="layout-wrapper">
    <el-container>
      <el-header
        ><el-menu
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleUpperSelect"
        >
          <el-menu-item index="0">心理学院热线咨询</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">登出</el-menu-item>
        </el-menu></el-header
      >
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" @select="handleSelect">
            <el-menu-item index="1">
              <el-icon><location /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>咨询记录</span>
            </el-menu-item>
            <el-menu-item index="7">
              <el-icon><icon-menu /></el-icon>
              <span>求助记录</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="3">
              <el-icon><icon-menu /></el-icon>
              <span>排班表</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="4">
              <el-icon><icon-menu /></el-icon>
              <span>咨询师管理</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="5">
              <el-icon><icon-menu /></el-icon>
              <span>督导管理</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="6">
              <el-icon><icon-menu /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
          </el-menu>
          <conversation-list />
        </el-aside>
        <el-main body-style="padding: 0;">
          <router-view :key="`${route.path}${route.query?.userId}`" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location } from "@element-plus/icons-vue";
import { ref } from "vue";
import router, { hasRoles } from "@/router";
import createStore from "@/store/index";
const { role, clearToken, clearUserInfo } = createStore();
import { logout } from "@/apis/auth/auth";
import { imLogout } from "@/apis/im/im";
import ConversationList from "@/views/conversation/components/conversation-list.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const handleSelect = (key: string) => {
  switch (key) {
    case "1":
      router.push("/");
      break;
    case "2":
      router.push("consult-record");
      break;
    case "3":
      router.push("schedule");
      break;
    case "4":
      router.push("consultant-manager");
      break;
    case "5":
      router.push("supervisor-manager");
      break;
    case "6":
      router.push("visitor-manager");
      break;
    case "7":
      router.push("help-record");
      break;
  }
};
const handleUpperSelect = async (key: string) => {
  if (key == "1") {
    clearUserInfo();
    clearToken();
    await logout();
    await imLogout();
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
  }
};

const activeIndex = ref("1");
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}
</style>
