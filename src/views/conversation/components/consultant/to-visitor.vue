<template>
  <div style="display: flex">
    <div>
      <conversation-info @on-help="handleHelp" />
    </div>
    <div class="chat-wrapper">
      <div class="chat-list-wrapper">
        <ChatArea />
      </div>
      <div class="chat-input-wrapper">
        <ChatInput />
      </div>
    </div>
    <div v-if="isHelping" class="chat-wrapper">
      <consultant-to-supervisor />
      <div class="chat-list-wrapper">
        <ChatArea />
      </div>
      <div class="chat-input-wrapper">
        <ChatInput />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatArea from "@/im/components/chatArea/index.vue";
import ChatInput from "@/im/components/ChatInput.vue";
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import { ref } from "vue";
import ConsultantToSupervisor from "@/views/conversation/components/consultant/consultant-to-supervisor.vue";
let isHelping = ref(false);

const handleHelp = () => {
  isHelping.value = !isHelping.value;
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
