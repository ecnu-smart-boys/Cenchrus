<template>
  <img
    width="300"
    :height="
      (300 * props.payload.imageInfoArray[0].width) /
      props.payload.imageInfoArray[0].height
    "
    :src="props.payload.imageInfoArray[0].url"
    alt=""
  />
</template>
<script lang="ts" setup>
const props = defineProps<{
  payload: {
    imageInfoArray: {
      height: number;
      imageUrl: string;
      instanceID: number;
      size: number;
      sizeType: number;
      type: number;
      url: string;
      width: number;
    };
  };
}>();
</script>
<style lang="less" scoped></style>
