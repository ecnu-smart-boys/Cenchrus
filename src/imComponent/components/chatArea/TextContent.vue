<template>
  <span class="TextContent" style="white-space: pre-wrap" v-text="text"> </span>
</template>
<script lang="ts" setup>
const props = defineProps<{
  text: string;
}>();
</script>
<style lang="scss" scoped>
.TextContent {
  display: inline-block;
  max-width: 400px;
  word-wrap: break-word;
  text-align: left;
}
</style>
