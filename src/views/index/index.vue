<template>
  <div class="layout-wrapper">
    <el-container>
      <el-header
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="0">心理学院热线咨询</el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">欢迎你！咨询师！</el-menu-item>
        </el-menu></el-header
      >
      <el-container>
        <el-aside width="250px">
          <el-menu default-active="1" @open="handleOpen">
            <el-menu-item index="1">
              <el-icon><location /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>咨询记录</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><icon-menu /></el-icon>
              <span>排班表</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><icon-menu /></el-icon>
              <span>咨询师管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon><icon-menu /></el-icon>
              <span>督导管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <el-icon><icon-menu /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
          </el-menu>
          <conversation-list />
        </el-aside>
        <el-main body-style="padding: 0;"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location } from "@element-plus/icons-vue";
import { ref } from "vue";
import ConversationList from "@/views/conversation/components/conversation-list.vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const activeIndex = ref("1");
const handleSelect = (key: string) => {
  console.log(key);
};
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
