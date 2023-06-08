<template>
  <div style="display: flex">
    <div>
      <conversation-info>
        <template #middle>
          <div style="margin: 10px 0; font-size: 20px; font-weight: bold">
            咨询记录
          </div>
          <div style="margin: 10px 0; font-size: 20px">总共用时</div>
          <div style="margin: 10px 0; font-size: 30px">00:13:13</div>
          <div style="margin: 10px 0; font-size: 20px">咨询者评价</div>
          <el-rate
            v-model="testRate"
            size="large"
            disabled
            style="transform: scale(1.5) translateX(18px)"
          />
          <div style="margin: 10px 0; font-size: 15px; color: #d7d7d7">
            本次咨询评价本次咨询本次咨询评价本次咨询本次咨询评价本次咨询
          </div>
          <div style="margin: 10px 0; font-size: 20px">咨询师评价</div>
          <div style="margin: 10px 0; font-size: 15px; color: #d7d7d7">
            本次咨询评价本次咨询本次咨询评价本次咨询本次咨询评价本次咨询
          </div>
        </template>
        <template #bottom>
          <el-button
            size="large"
            :icon="Collection"
            style="margin: 0 20px; font-size: 20px"
            color="#337ecc"
            @click="handleExport"
          >
            导出记录
          </el-button>
          <el-divider />
          <el-button
            size="large"
            :icon="Back"
            style="margin: 0 20px; font-size: 20px"
            color="#337ecc"
            @click="handleBack"
          >
            返回列表
          </el-button>
        </template>
      </conversation-info>
    </div>
    <div class="chat-wrapper">
      <div ref="leftChatAreaWrapper" class="chat-list-wrapper">
        <ChatArea ref="leftChatArea" :current-message="leftData" />
      </div>
    </div>
    <div class="chat-wrapper">
      <supervisor-to-consultant :is-show-btn="false">
        <template #left>
          <div style="font-size: 25px">督导A</div>
          <div>求助记录</div>
          <div style="font-size: 30px">00:13:13</div>
        </template>
      </supervisor-to-consultant>
      <div class="chat-list-wrapper">
        <ChatArea :current-message="rightData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SupervisorToConsultant from "@/views/conversation/components/supervisor/supervisor-to-consultant.vue";
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import ChatArea from "@/im/components/chatArea/index.vue";
import { reactive } from "vue";
import { Back, Collection } from "@element-plus/icons-vue";

const leftData = reactive([]);
const rightData = reactive([]);
const testRate = 5;
const handleExport = () => {
  // TODO
};
const handleBack = () => {
  // TODO
};
</script>

<style scoped lang="scss">
.chat-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 100px);
  border-right: 1px #e7e7e7 solid;
}
.chat-list-wrapper {
  flex: 8;
  overflow: auto;
  height: 500px;
  min-width: 300px;
  transition: all 1s;
  position: relative;
}
.chat-input-wrapper {
  flex: 1;
  min-height: 150px;
  position: relative;
  border-top: 1px solid #eee;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
