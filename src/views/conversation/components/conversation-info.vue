<template>
  <div class="info-wrapper">
    <div>
      <div style="display: flex; justify-content: center; padding: 20px">
        <slot name="head"></slot>
      </div>
      <div style="padding: 0 20px 20px 20px">
        <el-divider />
        <slot name="middle"></slot>
      </div>
    </div>
    <div style="padding: 20px; display: flex; flex-direction: column">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.info-wrapper {
  background-color: #337ecc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: white;
  width: 250px;
}
</style>
