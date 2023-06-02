<template>
  <div class="SendImage">
    <div style="position: relative">
      <el-icon><Picture /></el-icon>
      <input
        ref="inputFileRef"
        type="file"
        accept="image/*"
        style="
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        "
        @input="handleInput"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Picture } from "@element-plus/icons-vue";
import { ref } from "vue";
import { imSendMessage } from "@/apis/im/im";
import { createImageMessage } from "@/im/utils/createMessage";
import { ElMessage } from "element-plus";
const inputFileRef: any = ref(null);

const handleInput = async () => {
  try {
    await imSendMessage(createImageMessage("2_1", inputFileRef.value));
  } catch (error) {
    ElMessage({
      message: error,
      type: "error",
      duration: 5 * 1000
    });
  }
};
</script>
<style lang="scss" scoped></style>
