<template>
  <div class="info-wrapper">
    <div>
      <div style="display: flex; justify-content: center; padding: 20px">
        <img src="/src/assets/defaultAvatar.jpg" class="avatar" alt="" />
        <div
          style="
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
        >
          <div style="font-size: 25px">张先生</div>
          <div>15722***89</div>
        </div>
      </div>
      <div style="padding: 0 20px 20px 20px">
        <el-divider />
        <slot name="middle"></slot>
      </div>
    </div>
    <div style="padding: 20px; display: flex; flex-direction: column">
      <el-divider />
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

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
