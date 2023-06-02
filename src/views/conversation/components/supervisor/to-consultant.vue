<template>
  <div style="display: flex">
    <div>
      <conversation-info @on-help="handleHelp" />
    </div>
    <div class="chat-wrapper">
      <supervisor-to-consultant />
      <div class="chat-list-wrapper">
        <ChatArea :current-message="consultantSupervisorData" />
      </div>
      <div class="chat-input-wrapper">
        <ChatInput />
      </div>
    </div>
    <div class="chat-wrapper">
      <div class="chat-list-wrapper">
        <ChatArea :current-message="consultantSupervisorData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatArea from "@/im/components/chatArea/index.vue";
import ChatInput from "@/im/components/ChatInput.vue";
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import SupervisorToConsultant from "@/views/conversation/components/supervisor/supervisor-to-consultant.vue";
import { ref, watchEffect } from "vue";
import { imGetMessageList } from "@/apis/im/im";
import createStore from "@/store/index";
const store = createStore();

const consultantSupervisorData = ref({});
watchEffect(async () => {
  if (store.isTimReady) {
    const data = await imGetMessageList("2_1");
    consultantSupervisorData.value = data.data.messageList;
    console.log(consultantSupervisorData.value);
  }
});
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
}
.chat-input-wrapper {
  flex: 1;
  min-height: 150px;
  border-top: 1px solid #eee;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
