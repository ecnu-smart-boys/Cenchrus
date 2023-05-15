<template>
  <div>
    <div style="display: flex">
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 20px;
        "
      >
        <div style="margin-bottom: 10px">搜索姓名</div>
        <el-input
          v-model="input2"
          placeholder="输入姓名进行搜索"
          :prefix-icon="Search"
        />
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 20px;
        "
      >
        <div style="margin-bottom: 10px">搜索日期</div>
        <el-date-picker
          v-model="default"
          type="date"
          placeholder="请选择日期"
        />
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="visitor" label="咨询人" width="140" />
      <el-table-column prop="duration" label="咨询时长" width="140" />
      <el-table-column prop="date" label="咨询日期" width="180" />
      <el-table-column prop="rate" label="咨询评级" width="180">
        <template #default="scope">
          <el-rate v-model="scope.row.rate" size="large" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="咨询评价" width="300" />
      <el-table-column prop="help" label="督导求助" width="180" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default>
          <el-button link type="primary" size="small">查看详情</el-button>
          <el-button link type="primary" size="small">导出记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage3"
      v-model:page-size="pageSize3"
      style="float: right; margin: 20px"
      background
      layout="prev, pager, next, jumper"
      :total="20"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";

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

<style scoped lang="scss"></style>
