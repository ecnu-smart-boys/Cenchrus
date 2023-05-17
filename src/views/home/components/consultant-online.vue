<template>
  <el-card class="box-card" body-style="padding: 0;">
    <template #header>
      <div class="card-header">
        <span>在线咨询师</span>
        <el-pagination background layout="prev, pager, next" :total="30" />
      </div>
    </template>
    <div style="display: flex">
      <div class="online-wrapper">
        <div class="online-row-wrapper">
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
        </div>
        <div class="online-row-wrapper">
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
        </div>
        <div class="online-row-wrapper">
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
          <div class="online-cell-wrapper">
            <div>咨询师</div>
            <el-tag>空闲</el-tag>
          </div>
        </div>
      </div>
      <div class="right-wrapper">
        <div style="font-size: 1.5em; margin: 10px">累计完成咨询</div>
        <div style="font-size: 2em">100</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box-card {
  height: 240px;
  min-width: 688px;
  margin: 0 10px 20px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.online-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex: 1;

  .online-row-wrapper {
    display: flex;
    width: 100%;
    flex: 1;

    .online-cell-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: 1;
    }
  }
}

.right-wrapper {
  display: flex;
  height: 172px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #409dfd;
  color: white;
  width: 300px;
}
</style>
