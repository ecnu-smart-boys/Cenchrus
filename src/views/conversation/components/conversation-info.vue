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

      <div style="padding: 20px">
        <el-divider />
        <div style="margin: 10px 0; font-size: 20px; font-weight: bold">
          正在咨询中
        </div>
        <div style="margin: 10px 0; font-size: 20px">已咨询时间</div>
        <div style="margin: 10px 0; font-size: 40px">00:13:13</div>
      </div>
    </div>
    <div style="padding: 20px; display: flex; flex-direction: column">
      <el-divider />
      <el-button
        size="large"
        :icon="User"
        style="margin: 0 20px; font-size: 20px"
        color="#337ecc"
        @click="askHelp"
      >
        请求督导
      </el-button>
      <el-divider />
      <el-button
        size="large"
        :icon="Check"
        style="margin: 0 20px; font-size: 20px"
        color="#337ecc"
        @click="stopConversion"
      >
        结束咨询
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Check, User } from "@element-plus/icons-vue";
const emits = defineEmits<{
  (event: "onHelp"): void;
}>();
const askHelp = () => {
  emits("onHelp");
};

const stopConversion = () => {};
</script>

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
  min-width: 250px;
  height: 100%;
  color: white;
}
</style>
