<template>
  <div class="layout-wrapper">
    <el-container>
      <el-header
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="0">心理学院热线咨询</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">欢迎你！咨询师！</el-menu-item>
        </el-menu></el-header
      >
      <el-container>
        <el-aside width="250px">
          <el-menu default-active="1" @select="handleSelect">
            <el-menu-item index="1">
              <el-icon><location /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>咨询记录</span>
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
        </el-aside>
        <el-main body-style="padding: 0;"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location } from "@element-plus/icons-vue";
import { ref } from "vue";
import router from "@/router";
import createStore from "@/store/index";
const { role } = createStore();
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
  }
};

const activeIndex = ref("1");
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}
</style>
<style>
.el-aside {
  overflow-y: hidden;
}
</style>
