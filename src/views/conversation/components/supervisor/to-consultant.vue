<template>
  <div style="display: flex">
    <!--    <div>-->
    <!--      <conversation-info @on-help="handleHelp" />-->
    <!--    </div>-->
    <div class="chat-wrapper">
      <supervisor-to-consultant />
      <div ref="leftChatAreaWrapper" class="chat-list-wrapper">
        <ChatArea
          ref="leftChatArea"
          :current-message="consultantSupervisorData"
        />
      </div>
      <div class="chat-input-wrapper">
        <el-check-tag
          v-show="hasNewMessage"
          checked
          style="position: absolute; top: -40px; right: 20px; z-index: 99"
          @change="handleDown"
          >有新消息↓</el-check-tag
        >
        <ChatInput @on-send="handleSend" />
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
import { nextTick, ref, watchEffect } from "vue";
import { imGetMessageList } from "@/apis/im/im";
import createStore from "@/store/index";
import useScroll from "@/hooks/useScroll";
const store = createStore();

const leftChatArea: any = ref(null);
const leftChatAreaWrapper: any = ref(null);
const {
  isReachTop,
  isReachBottom,
  clientHeight,
  scrollHeight,
  reflow,
  setScrollTop
} = useScroll(leftChatAreaWrapper);
const consultantSupervisorData = ref([]);
let hasNewMessage = ref(false);

let nextReqMessageID = "";
watchEffect(async () => {
  if (isReachTop.value && nextReqMessageID !== "") {
    // 触发懒加载
    const data = await imGetMessageList("2_1", nextReqMessageID);
    nextReqMessageID = data.data.nextReqMessageID;
    store.leftMessageListCallback((list: any[]) => {
      list.unshift(...data.data.messageList);
    });
    // 保证滚动条还在同一位置
    await nextTick(() => {
      const oldScrollHeight = scrollHeight.value;
      reflow();
      setScrollTop(scrollHeight.value - oldScrollHeight);
    });
  }
});

watchEffect(() => {
  hasNewMessage.value = store.leftMessage.leftHasNewMessage;
});

watchEffect(() => {
  // 有新消息
  if (store.leftMessage.leftHasNewMessage) {
    // 已经在最底部的话则一直保持最底部
    if (isReachBottom.value) {
      // 新消息已读
      store.setLeftHasNewMessage(false);
      nextTick(() => {
        reflow();
        setScrollTop(scrollHeight.value - clientHeight.value);
      });
    } else {
      // 否则弹出气泡，提示有新消息
      nextTick(() => {
        reflow();
      });
    }
  }
  if (
    consultantSupervisorData.value.length !==
    store.leftMessage.leftMessageList.length
  ) {
    consultantSupervisorData.value = store.leftMessage.leftMessageList;
  }
  if (isReachBottom.value) {
    store.setLeftHasNewMessage(false);
  }
});

watchEffect(async () => {
  if (store.isTimReady) {
    const data = await imGetMessageList("2_1");
    nextReqMessageID = data.data.nextReqMessageID;
    store.leftMessageListCallback((list: any[]) => {
      list.splice(0);
      list.push(...data.data.messageList);
    });
    console.log(data.data.messageList);
    // 滑动到最底部
    await nextTick(() => {
      reflow();
      setScrollTop(scrollHeight.value - clientHeight.value);
    });
  }
});

const handleSend = (data) => {
  store.leftMessageListCallback((list: any[]) => {
    list.push(data.data.message);
  });
  nextTick(() => {
    reflow();
    leftChatAreaWrapper.value.scrollTop =
      scrollHeight.value - clientHeight.value;
  });
};

const handleDown = () => {
  store.setLeftHasNewMessage(false);
  leftChatAreaWrapper.value.scrollTop = scrollHeight.value - clientHeight.value;
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
