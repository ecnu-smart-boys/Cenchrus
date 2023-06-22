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
import {
  HelpRecordsResp,
  WebConversationInfoResp
} from "@/apis/conversation/conversation-interface";
import router from "@/router";
import { reactive, watchEffect } from "vue";
import { parseTime, parseTimestamp, preExport } from "@/utils";
import {
  AllMessageReq,
  AllMsgListResp
} from "@/apis/message/message-interface";
import { getSupervisorOwnHelpMsg } from "@/apis/message/message";
import { getSupervisorOwnHelpInfo } from "@/apis/conversation/conversation";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { ElMessageBox } from "element-plus";
import { p } from "@/utils/data";

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
        date: parseTimestamp(i.startTime),
        id: i.id
      });
    });
  }
});

const handleAll = () => {
  router.push({ path: "/help-record" });
};

const handleDetail = (row) => {
  router.push({
    path: "/conversation-detail",
    query: {
      conversationId: row.id,
      from: "help"
    }
  });
};

const handleExport = async (row) => {
  await ElMessageBox.confirm(p, "同意数据保密使用协议", {
    confirmButtonText: "同意",
    cancelButtonText: "不同意",
    type: "warning"
  });
  let conversationInfo: WebConversationInfoResp;
  let allMsgList: AllMsgListResp;
  const allMsgReq: AllMessageReq = {
    conversationId: row.id,
    consultationIterator: -1,
    helpIterator: -1,
    size: 100000
  };
  allMsgList = await getSupervisorOwnHelpMsg(allMsgReq);
  conversationInfo = await getSupervisorOwnHelpInfo(row.id);
  const data = preExport(conversationInfo, allMsgList);
  const zip = new JSZip();
  zip.file(
    `${conversationInfo.consultationInfo.consultantName}-${conversationInfo.consultationInfo.visitorName}.txt`,
    data[0]
  );
  if (data.length > 1) {
    zip.file(
      `${conversationInfo.consultationInfo.consultantName}-${conversationInfo.helpInfo?.supervisorName}.txt`,
      data[1]
    );
  }
  zip.generateAsync({ type: "blob" }).then((content) => {
    FileSaver(content, `${new Date().getTime()}.zip`);
  });
};
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
