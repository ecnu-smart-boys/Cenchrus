<template>
  <div class="wrapper">
    <div style="display: flex; justify-content: center; padding: 20px">
      <slot name="left"></slot>
    </div>
    <template v-if="isShowBtn">
      <el-divider direction="vertical" style="height: 70%" />
      <el-button
        size="large"
        :icon="Check"
        style="margin: 0 20px; font-size: 20px"
        color="#1e5a96"
      >
        结束求助
      </el-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Check } from "@element-plus/icons-vue";
const props = defineProps<{
  isShowBtn: boolean;
}>();
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
