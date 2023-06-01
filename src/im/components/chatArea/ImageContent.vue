<template>
  <img width="300" :src="props.imagesOptions.image.url" alt="" />
</template>
<script lang="ts" setup>
const props = defineProps<{
  imagesOptions: object;
}>();
</script>
<style lang="less" scoped></style>
