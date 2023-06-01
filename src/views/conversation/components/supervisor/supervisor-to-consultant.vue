<template>
  <div class="wrapper">
    <div style="display: flex; justify-content: center; padding: 20px">
      <img src="/src/assets/defaultAvatar.jpg" class="avatar" alt="" />
      <div
        style="
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <div style="font-size: 25px">督导A</div>
        <div>正在求助中</div>
        <div style="font-size: 30px">00:13:13</div>
      </div>
    </div>
    <el-divider direction="vertical" style="height: 70%" />
    <el-button
      size="large"
      :icon="Check"
      style="margin: 0 20px; font-size: 20px"
      color="#1e5a96"
    >
      结束求助
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { Check } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.wrapper {
  height: 150px;
  width: 100%;
  background-color: #1e5a96;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
