<template>
  <img
    :width="
      props.payload.imageInfoArray[0].width > 300
        ? 300
        : props.payload.imageInfoArray[0].width
    "
    :height="
      props.payload.imageInfoArray[0].width > 300
        ? (300 * props.payload.imageInfoArray[0].height) /
          props.payload.imageInfoArray[0].width
        : props.payload.imageInfoArray[0].height
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
<style lang="scss" scoped></style>
