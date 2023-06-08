<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>最近完成的咨询</span>
        <el-button class="button" text @click="handleAll">查看全部 ></el-button>
      </div>
    </template>
    <el-table :data="recent" style="width: 100%">
      <el-table-column fixed prop="visitorName" label="咨询人" width="140" />
      <el-table-column prop="duration" label="咨询时长" width="140" />
      <el-table-column prop="date" label="咨询日期" width="200" />
      <el-table-column prop="score" label="咨询评级" width="180">
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
  </el-card>
</template>

<script setup lang="ts">
import { ConsultRecordsResp } from "@/apis/conversation/conversation-interface";
import router from "@/router";
import { reactive, watchEffect } from "vue";
import { parseTime, parseTimestamp } from "@/utils";

const props = defineProps<{
  consultRecords: ConsultRecordsResp | undefined;
}>();

const recent = reactive([]);
watchEffect(() => {
  recent.splice(0);
  if (typeof props.consultRecords !== "undefined") {
    props.consultRecords.records.forEach((i) => {
      recent.push({
        visitorName: i.visitorName,
        duration: parseTime((i.endTime - i.startTime) / 1000),
        date: parseTimestamp(i.startTime),
        score: i.score,
        helper: i.helper,
        comment: i.comment
      });
    });
  }
});

const handleAll = () => {
  router.push({ path: "/consult-record" });
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
