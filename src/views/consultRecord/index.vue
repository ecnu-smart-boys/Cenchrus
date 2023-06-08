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
          v-model="searchName"
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
          v-model="selectDate"
          type="date"
          placeholder="请选择日期"
        />
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="visitorName" label="咨询人" width="140" />
      <el-table-column prop="duration" label="咨询时长" width="140" />
      <el-table-column prop="date" label="咨询日期" width="200" />
      <el-table-column prop="rate" label="咨询评级" width="180">
        <template #default="scope">
          <el-rate v-model="scope.row.rate" size="large" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="helper" label="督导求助" width="200" />
      <el-table-column prop="comment" label="咨询评价" width="400" />
      <el-table-column fixed="right" label="操作" width="160">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDetail(scope.row)"
            >查看详情</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleExport(scope.row)"
            >导出记录</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      style="float: right; margin: 20px"
      background
      layout="prev, pager, next, jumper"
      :total="totalPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import createStore from "@/store/index";
import {
  getAllConsultations,
  getConsultantConsultations
} from "@/apis/conversation/conversation";
import { parseTime, parseTimestamp } from "@/utils";
const store = createStore();

let searchName = ref("");

let currentPage = ref(1);
let pageSize = ref(10);
let totalPage = ref(10);
const handleCurrentChange = async (val) => {
  currentPage.value = val;
};

const tableData = reactive<any[]>([]);

let selectDate = ref("");
let timeStamp = ref(0);

watchEffect(async () => {
  if (selectDate.value == null) {
    timeStamp.value = 0;
  } else if (selectDate.value instanceof Date) {
    timeStamp.value = selectDate.value.getTime();
  }
  currentPage.value = 1;
  await refreshData();
});

watch(
  () => searchName.value,
  async () => {
    currentPage.value = 1;
    await refreshData();
  }
);
const handleDetail = (row) => {};

const handleExport = (row) => {};

const refreshData = async () => {
  if (store.role == "admin") {
    const data = await getAllConsultations({
      current: currentPage.value,
      size: pageSize.value,
      name: searchName.value,
      timestamp: 0
    });
    tableData.splice(0);
    totalPage.value = data.total;
    data.records.forEach((i) => {
      tableData.push({
        visitorName: i.visitorName,
        duration: parseTime((i.endTime - i.startTime) / 1000),
        date: parseTimestamp(i.startTime),
        score: i.score,
        helper: i.helper,
        comment: i.comment
      });
    });
  } else if (store.role == "supervisor") {
    // TODO
  }
  // 目前先不分角色，因为有接口未实现
  const data = await getConsultantConsultations({
    current: currentPage.value,
    size: pageSize.value,
    name: searchName.value,
    timestamp: 0
  });
  tableData.splice(0);
  totalPage.value = data.total;
  data.records.forEach((i) => {
    tableData.push({
      visitorName: i.visitorName,
      duration: parseTime((i.endTime - i.startTime) / 1000),
      date: parseTimestamp(i.startTime),
      score: i.score,
      helper: i.helper,
      comment: i.comment
    });
  });
};
onMounted(async () => {
  await refreshData();
});
</script>

<style scoped lang="scss"></style>
