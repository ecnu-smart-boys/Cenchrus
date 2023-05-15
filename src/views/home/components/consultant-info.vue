<template>
  <el-card class="box-card" body-style="padding: 0;">
    <div class="card-wrapper">
      <img
        src="https://img1.baidu.com/it/u=4259218938,3459520686&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      />
      <div class="middle-wrapper">
        <div class="name-wrapper">
          <div style="display: flex; align-items: center">
            <div class="name">咨询师</div>
            <div class="dot"></div>
            <div style="color: #409dfd">在线</div>
          </div>
          <el-tag>空闲</el-tag>
        </div>
        <div style="margin: 20px 0">
          <div style="font-size: 1.2em">我的综合评价</div>
          <el-rate
            v-model="value"
            size="large"
            disabled
            style="transform: scale(1.8) translateX(25px)"
          />
        </div>
        <el-button type="primary">咨询设置</el-button>
      </div>
      <div class="right-wrapper">
        <div style="font-size: 1.5em; margin: 10px">累计完成咨询</div>
        <div style="font-size: 3em">100</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(new Date());
</script>

<style scoped lang="scss">
.box-card {
  height: 220px;
  min-width: 500px;
  margin: 0 10px 20px 0;

  .card-wrapper {
    display: flex;
    align-items: center;

    img {
      height: 180px;
      border-radius: 50%;
      margin: 20px;
    }

    .middle-wrapper {
      width: 100%;
      margin: 20px;

      .name-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        .dot {
          border-radius: 50%;
          background-color: #409dfd;
          width: 8px;
          height: 8px;
          margin: 5px;
        }

        .name {
          font-size: 1.5em;
          margin-right: 10px;
        }
      }
    }

    .right-wrapper {
      display: flex;
      height: 220px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #409dfd;
      color: white;
      width: 700px;
    }
  }
}
</style>
