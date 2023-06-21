<template>
  <span ref="audioContent" class="TextContent" @click="handlePlay">
    <img src="/voice.png" class="icon" alt="" />&nbsp;&nbsp;
    {{ parseSecond(payload.second) }}
    <audio ref="audioRef">
      <source :src="payload.url" />
    </audio>
  </span>
</template>
<script lang="ts" setup>
import { parseSecond } from "@/utils";
import { onMounted, ref } from "vue";

const audioRef: any = ref(null);
const props = defineProps<{
  payload: {
    downloadFlag: number;
    remoteAudioUrl: string;
    second: number;
    size: number;
    url: string;
    uuid: string;
  };
}>();
const audioContent: any = ref(null);
onMounted(() => {
  const duration = props.payload.second;
  let length = duration > 60 ? 150 : (3 / 4) * duration + 70;
  audioContent.value.style.width = `${length}px`;
});
const handlePlay = () => {
  if (audioRef.value.paused) {
    audioRef.value.play();
  } else {
    audioRef.value.pause();
    audioRef.value.currentTime = 0;
  }
};
</script>
<style lang="scss" scoped>
.TextContent {
  max-width: 150px;
  word-wrap: break-word;
  text-align: left;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.icon {
  width: 20px;
  height: 20px;
}
</style>
