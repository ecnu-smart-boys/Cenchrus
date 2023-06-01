<template>
  <div class="SendImage">
    <div style="position: relative">
      <el-icon><Picture /></el-icon>
      <input
        ref="inputFileRef"
        type="file"
        style="
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        "
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Picture } from "@element-plus/icons-vue";
</script>
<style lang="scss" scoped></style>
