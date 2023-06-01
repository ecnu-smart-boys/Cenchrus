<template>
  <div class="sendCustom">
    <el-popover placement="top" width="100" trigger="click">
      <div class="audio-wrapper">
        <div
          style="
            border-radius: 50%;
            background-color: #e8e8e8;
            background-image: url('/src/assets/microphone.png');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 60% 60%;
            width: 80px;
            height: 80px;
            line-height: 200px;
            text-align: center;
          "
          @click="sendUploadAudio"
        >
          {{ isRecording ? "停止录制" : "开始录制" }}
        </div>
      </div>
      <template #reference>
        <el-icon><Microphone /></el-icon>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { Microphone } from "@element-plus/icons-vue";
import { ref } from "vue";
let isRecording = ref(false);

const sendUploadAudio = () => {};
</script>
<style lang="scss" scoped>
.audio-wrapper {
  width: 100%;
  overflow: auto;
  height: 120px;
  display: flex;
  justify-content: center;
}
</style>
