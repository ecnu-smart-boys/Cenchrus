<template>
  <div style="display: flex">
    <div>
      <conversation-info>
        <template #middle>
          <div style="margin: 10px 0; font-size: 20px; font-weight: bold">
            正在咨询中
          </div>
          <div style="margin: 10px 0; font-size: 20px">已咨询时间</div>
          <div style="margin: 10px 0; font-size: 40px">00:13:13</div>
        </template>
        <template #bottom>
          <el-button
            size="large"
            :icon="User"
            style="margin: 0 20px; font-size: 20px"
            color="#337ecc"
            @click="askHelp"
          >
            请求督导
          </el-button>
          <el-divider />
          <el-button
            size="large"
            :icon="Check"
            style="margin: 0 20px; font-size: 20px"
            color="#337ecc"
            @click="stopConversion"
          >
            结束咨询
          </el-button>
        </template>
      </conversation-info>
    </div>
    <im-component :is-left="true">
      <template #left>
        <supervisor-to-consultant :is-show-btn="true">
          <template #left>
            <div style="font-size: 25px">督导A</div>
            <div>正在求助中</div>
            <div style="font-size: 30px">00:13:13</div>
          </template>
        </supervisor-to-consultant>
      </template>
    </im-component>
    <div class="chat-wrapper">
      <div class="chat-list-wrapper">
        <chat-area :current-message="consultantSupervisorData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatArea from "@/imComponent/components/chatArea/index.vue";
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import SupervisorToConsultant from "@/views/conversation/components/supervisor/supervisor-to-consultant.vue";
import { ref } from "vue";
import { Check, User } from "@element-plus/icons-vue";
import ImComponent from "@/imComponent/im-component.vue";
const consultantSupervisorData = ref([]);
const askHelp = () => {};
const stopConversion = () => {};
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
