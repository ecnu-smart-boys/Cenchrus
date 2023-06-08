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
      <el-table-column fixed prop="consultantName" label="咨询师" width="400" />
      <el-table-column prop="duration" label="咨询时长" width="400" />
      <el-table-column prop="date" label="咨询日期" width="400" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            style="margin: 10px 0"
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
import { getSupervisorHelpRecords } from "@/apis/conversation/conversation";
import { parseTime, parseTimestamp } from "@/utils";

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
  const data = await getSupervisorHelpRecords({
    current: currentPage.value,
    size: pageSize.value,
    name: searchName.value,
    timestamp: timeStamp.value
  });
  tableData.splice(0);
  totalPage.value = data.total;
  data.records.forEach((i) => {
    tableData.push({
      consultantName: i.consultantName,
      duration: parseTime((i.endTime - i.startTime) / 1000),
      date: parseTimestamp(i.startTime)
    });
  });
};
onMounted(async () => {
  await refreshData();
});
</script>

<style scoped lang="scss"></style>
