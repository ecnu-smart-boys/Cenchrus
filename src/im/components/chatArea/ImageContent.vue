<template>
  <img width="300" :src="props.payload.imageInfoArray[0].url" alt="" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  payload: any;
}>();
</script>
<style lang="less" scoped></style>
