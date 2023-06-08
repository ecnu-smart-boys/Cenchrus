<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>最近完成的会话</span>
        <el-button class="button" text @click="handleAll">查看全部 ></el-button>
      </div>
    </template>
    <el-table :data="recent" style="width: 100%">
      <el-table-column fixed prop="consultantName" label="咨询师" width="400" />
      <el-table-column prop="duration" label="咨询时长" width="400" />
      <el-table-column prop="date" label="咨询日期" width="400" />
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
  </el-card>
</template>

<script setup lang="ts">
import { HelpRecordsResp } from "@/apis/conversation/conversation-interface";
import router from "@/router";
import { reactive, watchEffect } from "vue";
import { parseTime, parseTimestamp } from "@/utils";

const props = defineProps<{
  helpRecords: HelpRecordsResp | undefined;
}>();

const recent = reactive([]);
watchEffect(() => {
  recent.splice(0);
  if (typeof props.helpRecords !== "undefined") {
    props.helpRecords.records.forEach((i) => {
      recent.push({
        consultantName: i.consultantName,
        duration: parseTime((i.endTime - i.startTime) / 1000),
        date: parseTimestamp(i.startTime)
      });
    });
  }
});

const handleAll = () => {
  router.push({ path: "/help-record" });
};

const handleDetail = (row) => {};

const handleExport = (row) => {};
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
