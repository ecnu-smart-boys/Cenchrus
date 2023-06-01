<template>
  <span ref="audioContent" class="TextContent">
    <img src="/src/assets/voice.png" class="icon" alt="" />&nbsp;&nbsp;
    {{ parseSecond(audiosOptions.audio.duration) }}
  </span>
</template>
<script lang="ts" setup>
import { parseSecond } from "@/utils";
import { onMounted, ref } from "vue";

const props = defineProps<{
  audiosOptions: object;
}>();

const audioContent: any = ref(null);
onMounted(() => {
  const duration = props.audiosOptions.audio.duration;
  let length = duration > 60 ? 150 : (3 / 4) * duration + 70;
  audioContent.value.style.width = `${length}px`;
});
</script>
<style lang="scss" scoped>
.TextContent {
  max-width: 150px;
  word-wrap: break-word;
  text-align: left;
  display: flex;
  align-items: center;
}
.icon {
  width: 20px;
  height: 20px;
}
</style>
