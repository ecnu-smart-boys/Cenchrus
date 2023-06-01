<template>
  <div class="SendFace">
    <el-popover placement="top" width="400" trigger="click">
      <div class="face-wrapper clearfix">
        <div
          v-for="item in FaceJSON"
          :key="item"
          class="face-item"
          @click="handleClick(item)"
        >
          {{ item }}
        </div>
      </div>
      <template #reference>
        <el-icon><CoffeeCup /></el-icon>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { SendFaceJSON } from "./SendJSONData.ts";
import { reactive } from "vue";
import { CoffeeCup } from "@element-plus/icons-vue";

const FaceJSON = reactive(SendFaceJSON);
const emits = defineEmits<{
  (event: "onFace", item: string): void;
}>();
const handleClick = (item) => {
  emits("onFace", item);
};
</script>
<style lang="scss" scoped>
.face-wrapper {
  width: 100%;
  overflow: auto;
  font-size: 20px;
  .face-item {
    width: 20px;
    height: 20px;
    padding: 10px;
    float: left;
    cursor: pointer;
  }
}
.clearfix:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>
