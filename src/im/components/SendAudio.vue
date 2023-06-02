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
import Recorder from "js-audio-recorder";
import { imSendMessage } from "@/apis/im/im";
import { createAudioMessage } from "@/im/utils/createMessage";
import { ElMessage } from "element-plus";
let isRecording = ref(false);
let recorder;
let startTs;
const sendUploadAudio = async () => {
  if (isRecording.value) {
    isRecording.value = false;
    recorder.stop();

    let duration = Date.now() - startTs; // 单位：ms
    let wavBlob = recorder.getWAVBlob();

    let audioFile = new File([wavBlob], "audio.wav", { type: "wav" });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    audioFile.duration = duration;

    try {
      await imSendMessage(createAudioMessage("2_1", audioFile));
    } catch (error) {
      ElMessage({
        message: error,
        type: "error",
        duration: 5 * 1000
      });
    }
  } else {
    isRecording.value = true;
    recorder = new Recorder({
      sampleBits: 16,
      sampleRate: 16000,
      numChannels: 1
    });

    await recorder.start();
    startTs = Date.now();
  }
};
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
