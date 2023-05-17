<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>最近完成的咨询</span>
        <el-button class="button" text>查看全部 ></el-button>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="visitor" label="咨询人" width="140" />
      <el-table-column prop="duration" label="咨询时长" width="140" />
      <el-table-column prop="date" label="咨询日期" width="200" />
      <el-table-column prop="rate" label="咨询评级" width="180">
        <template #default="scope">
          <el-rate v-model="scope.row.rate" size="large" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="咨询评价" width="400" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default>
          <el-button link type="primary" size="small">查看详情</el-button>
          <el-button link type="primary" size="small">导出记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
const tableData = [
  {
    visitor: "Tom",
    duration: "00:12:39",
    date: "2016-05-03 12:00:39",
    rate: 3,
    comment: "好好好"
  },
  {
    visitor: "Tom",
    duration: "00:12:39",
    date: "2016-05-03 12:00:39",
    rate: 3,
    comment: "好好好"
  },
  {
    visitor: "Tom",
    duration: "00:12:39",
    date: "2016-05-03 12:00:39",
    rate: 3,
    comment: "好好好"
  }
];
</script>

<style scoped lang="scss">
.box-card {
  width: 100%;
  min-width: 1110px;
  margin-right: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
