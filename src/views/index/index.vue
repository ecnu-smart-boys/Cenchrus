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
          <el-menu :default-active="activeIndexUnder" @select="handleSelect">
            <el-menu-item index="/">
              <el-icon><location /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="consult-record">
              <el-icon><icon-menu /></el-icon>
              <span>咨询记录</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'supervisor'" index="help-record">
              <el-icon><icon-menu /></el-icon>
              <span>求助记录</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="schedule">
              <el-icon><icon-menu /></el-icon>
              <span>排班表</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="consultant-manager">
              <el-icon><icon-menu /></el-icon>
              <span>咨询师管理</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="supervisor-manager">
              <el-icon><icon-menu /></el-icon>
              <span>督导管理</span>
            </el-menu-item>
            <el-menu-item v-if="role == 'admin'" index="visitor-manager">
              <el-icon><icon-menu /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
          </el-menu>
          <conversation-list v-if="role !== 'admin'" />
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
import { onMounted, ref } from "vue";
import router, { hasRoles } from "@/router";
import createStore from "@/store/index";
const { role, clearToken, clearUserInfo } = createStore();
import { logout } from "@/apis/auth/auth";
import { imLogout } from "@/apis/im/im";
import ConversationList from "@/views/conversation/components/conversation-list.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const handleSelect = (key: string) => {
  router.push(key);
};
const handleUpperSelect = async (key: string) => {
  if (key == "1") {
    try {
      await logout();
      await imLogout();
    } catch (e) {
      console.log(e);
    }
    clearUserInfo();
    clearToken();
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

const activeIndexUnder = ref("");
onMounted(() => {
  const reg = /#\/([\w-]*)\??.*/;
  reg.test(location.hash);
  if (
    RegExp.$1 == "consultant" ||
    RegExp.$1 == "administrator" ||
    RegExp.$1 == "supervisor"
  ) {
    activeIndexUnder.value = "/";
  } else {
    activeIndexUnder.value = RegExp.$1;
  }
});
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}
</style>
