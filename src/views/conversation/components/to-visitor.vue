<template>
  <div
    style="display: flex; flex-direction: column; height: calc(100vh - 100px)"
  >
    <div ref="chatListWrapper" class="chat-list-wrapper">
      <ChatArea />
    </div>
    <div class="chat-input-wrapper">
      <ChatInput />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatArea from "@/im/components/chatArea/index.vue";
import ChatInput from "@/im/components/ChatInput.vue";
</script>

<style scoped lang="scss">
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
</style>
