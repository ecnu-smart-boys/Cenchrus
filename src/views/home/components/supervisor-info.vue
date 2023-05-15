<template>
  <el-card class="box-card" body-style="padding: 0;">
    <div class="card-wrapper">
      <img
        src="https://img1.baidu.com/it/u=4259218938,3459520686&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      />
      <div class="middle-wrapper">
        <div class="name-wrapper">
          <div class="name">咨询师</div>
          <el-button type="primary">咨询设置</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box-card {
  height: 220px;
  min-width: 326px;
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
      margin-right: 20px;

      .name-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        .name {
          font-size: 1.5em;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
