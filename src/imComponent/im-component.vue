<template>
  <div class="chat-wrapper">
    <slot name="left"></slot>
    <div ref="ChatAreaWrapper" class="chat-list-wrapper">
      <chat-area
        ref="ChatAreaRef"
        :current-message="consultantSupervisorData"
        :has-revoke="true"
      />
    </div>
    <div class="chat-input-wrapper">
      <el-check-tag
        v-show="hasNewMessage"
        checked
        style="position: absolute; top: -40px; right: 20px; z-index: 99"
        @change="handleDown"
        >有新消息↓
      </el-check-tag>
      <chat-input v-if="!isEnd" :to-id="toId" @on-send="handleSend" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatInput from "@/imComponent/components/ChatInput.vue";
import ChatArea from "@/imComponent/components/chatArea/index.vue";
import { nextTick, ref, watchEffect } from "vue";
import { imGetMessageList } from "@/apis/im/im";
import createStore from "@/store/index";
import useScroll from "@/hooks/useScroll";

const store = createStore();

const props = defineProps<{
  isLeft: boolean;
  toId: string;
  isEnd: boolean;
}>();

const ChatAreaRef: any = ref(null);
const ChatAreaWrapper: any = ref(null);
const {
  isReachTop,
  isReachBottom,
  clientHeight,
  scrollHeight,
  reflow,
  setScrollTop
} = useScroll(ChatAreaWrapper);
const consultantSupervisorData = ref([]);
let hasNewMessage = ref(false);

let nextReqMessageID = "";
watchEffect(async () => {
  if (isReachTop.value && nextReqMessageID !== "") {
    // 触发懒加载
    const data = await imGetMessageList(props.toId, nextReqMessageID);
    nextReqMessageID = data.data.nextReqMessageID;
    if (props.isLeft) {
      store.leftMessageListCallback((list: any[]) => {
        list.unshift(...data.data.messageList);
      });
    } else {
      store.rightMessageListCallback((list: any[]) => {
        list.unshift(...data.data.messageList);
      });
    }
    // 保证滚动条还在同一位置
    await nextTick(() => {
      const oldScrollHeight = scrollHeight.value;
      reflow();
      setScrollTop(scrollHeight.value - oldScrollHeight);
    });
  }
});

watchEffect(() => {
  if (props.isLeft) {
    hasNewMessage.value = store.leftMessage.leftHasNewMessage;
  } else {
    hasNewMessage.value = store.rightMessage.rightHasNewMessage;
  }
});

watchEffect(() => {
  // 有新消息
  if (props.isLeft) {
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
  } else {
    if (store.rightMessage.rightHasNewMessage) {
      // 已经在最底部的话则一直保持最底部
      if (isReachBottom.value) {
        // 新消息已读
        store.setRightHasNewMessage(false);
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
      store.rightMessage.rightMessageList.length
    ) {
      consultantSupervisorData.value = store.rightMessage.rightMessageList;
    }
    if (isReachBottom.value) {
      store.setRightHasNewMessage(false);
    }
  }
});

watchEffect(async () => {
  if (store.isTimReady) {
    if (props.isLeft) {
      const data = await imGetMessageList(props.toId);
      nextReqMessageID = data.data.nextReqMessageID;
      store.leftMessageListCallback((list: any[]) => {
        list.splice(0);
        list.push(...data.data.messageList);
      });
    } else {
      await Promise.resolve();
      const data = await imGetMessageList(props.toId);
      nextReqMessageID = data.data.nextReqMessageID;
      store.rightMessageListCallback((list: any[]) => {
        list.splice(0);
        list.push(...data.data.messageList);
      });
    }

    // 滑动到最底部
    await nextTick(() => {
      reflow();
      setScrollTop(scrollHeight.value - clientHeight.value);
    });
  }
});

const handleSend = (data) => {
  if (props.isLeft) {
    store.leftMessageListCallback((list: any[]) => {
      list.push(data.data.message);
    });
  } else {
    store.rightMessageListCallback((list: any[]) => {
      list.push(data.data.message);
    });
  }
  nextTick(() => {
    reflow();
    ChatAreaWrapper.value.scrollTop = scrollHeight.value - clientHeight.value;
  });
};

const handleDown = () => {
  if (props.isLeft) {
    store.setLeftHasNewMessage(false);
  } else {
    store.setRightHasNewMessage(false);
  }
  ChatAreaWrapper.value.scrollTop = scrollHeight.value - clientHeight.value;
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
  background-color: white;
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
