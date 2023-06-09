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
import { createImageMessage } from "@/imComponent/utils/createMessage";
import { ElMessage } from "element-plus";

const props = defineProps<{
  toId: string;
}>();

const inputFileRef: any = ref(null);

const emits = defineEmits<{
  (event: "onSend", data: any): void;
}>();
const handleInput = async () => {
  try {
    const data = await imSendMessage(
      createImageMessage(props.toId, inputFileRef.value)
    );
    emits("onSend", data);
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
