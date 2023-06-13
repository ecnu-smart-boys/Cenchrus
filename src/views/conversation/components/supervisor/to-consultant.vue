<template>
  <div style="display: flex">
    <div>
      <conversation-info>
        <template #head>
          <img
            :src="allInfo?.consultationInfo.visitorAvatar"
            class="avatar"
            alt=""
            onerror="this.src='/src/assets/defaultAvatar.jpg'"
          />
          <div
            style="
              margin-left: 20px;
              display: flex;
              flex-direction: column;
              justify-content: center;
            "
          >
            <div style="font-size: 25px">
              {{ allInfo?.consultationInfo.visitorName }}
            </div>
            <div>{{ mosaic(allInfo?.consultationInfo.phone) }}</div>
          </div>
        </template>
        <template #middle>
          <div style="margin: 10px 0; font-size: 20px; font-weight: bold">
            {{ allInfo?.consultationInfo.end ? "咨询已完成" : "正在咨询中" }}
          </div>
          <div style="margin: 10px 0; font-size: 20px">已咨询时间</div>
          <div style="margin: 10px 0; font-size: 40px">
            {{
              parseTime(
                (currentTime - allInfo?.consultationInfo.startTime) / 1000
              )
            }}
          </div>
        </template>
      </conversation-info>
    </div>
    <im-component :is-left="true" :is-end="leftIsEnd">
      <template #left>
        <supervisor-to-consultant
          :is-show-btn="leftHelpBtnShown"
          @on-stop="handleStopHelp"
        >
          <template #left>
            <img
              :src="allInfo?.helpInfo?.avatar"
              class="avatar"
              alt=""
              onerror="this.src='/src/assets/defaultAvatar.jpg'"
            />
            <div
              style="
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <div style="font-size: 25px">
                {{ allInfo?.consultationInfo.consultantName }}
              </div>
              <div>
                {{ allInfo?.helpInfo?.end ? "求助已完成" : "正在求助中" }}
              </div>
              <div style="font-size: 30px">
                {{
                  parseTime(
                    (currentHelpTime - allInfo?.helpInfo?.startTime) / 1000
                  )
                }}
              </div>
            </div>
          </template>
        </supervisor-to-consultant>
      </template>
    </im-component>
    <div class="chat-wrapper">
      <div class="chat-list-wrapper">
        <chat-area
          :current-message="consultantSupervisorData"
          :has-revoke="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatArea from "@/imComponent/components/chatArea/index.vue";
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import SupervisorToConsultant from "@/views/conversation/components/supervisor/supervisor-to-consultant.vue";
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import ImComponent from "@/imComponent/im-component.vue";
import { mosaic, parseTime } from "@/utils";
import { WebConversationInfoResp } from "@/apis/conversation/conversation-interface";
import { endHelp, getOnlineHelpInfo } from "@/apis/conversation/conversation";
import { AllMsgListResp } from "@/apis/message/message-interface";
import { useRoute } from "vue-router";
import { WebSocketResponse } from "@/apis/schema";
import createStore from "@/store";
const consultantSupervisorData = ref([]);
const route = useRoute();
const store = createStore();

let leftHelpBtnShown = ref(false);

let timer;
let helpTimer;
let leftIsEnd = ref(false);

// 所有信息
let allInfo = ref<WebConversationInfoResp>();
let allMsg = ref<AllMsgListResp>();
let currentTime = ref(new Date().getTime());
let currentHelpTime = ref(new Date().getTime());

const refreshData = async () => {
  timer && clearInterval(timer);
  helpTimer && clearInterval(helpTimer);
  try {
    const data = await getOnlineHelpInfo((route.query as any).conversationId);
    allInfo.value = data;
    if (data.helpInfo != null) {
      if (!data.helpInfo.end) {
        leftHelpBtnShown.value = true;
      }
    }
    if (data.consultationInfo.end) {
      // 结束了啥也不展示
      currentTime.value = data.consultationInfo.lastTime;
      currentHelpTime.value = <number>data.helpInfo?.endTime;
      leftIsEnd.value = true;
    } else {
      timer = setInterval(() => {
        currentTime.value = new Date().getTime();
      }, 1000);
      if (!data.helpInfo?.end) {
        helpTimer = setInterval(() => {
          currentHelpTime.value = new Date().getTime();
        }, 1000);
      }
    }
  } catch (e) {
    leftIsEnd.value = true;
    currentTime.value = 0;
    currentHelpTime.value = 0;
  }
};

onMounted(async () => {
  await refreshData();
});

const handleStopHelp = async () => {
  helpTimer && clearInterval(helpTimer);
  await endHelp({
    conversationId: <string>allInfo.value?.helpInfo?.helpId
  });
  await refreshData();
  leftIsEnd.value = true;
  leftHelpBtnShown.value = false;
};

watchEffect(async () => {
  // 是对方结束会话
  if (store.websocketMessage != null) {
    const msg = store.websocketMessage as WebSocketResponse;
    if (msg.type === "endConsultation") {
      await refreshData();
      leftIsEnd.value = true;
    } else if (msg.type === "endHelp") {
      await refreshData();
      leftIsEnd.value = true;
      leftHelpBtnShown.value = false;
      store.setWebSocketMessage(null);
    }
  }
});

onUnmounted(() => {
  timer && clearInterval(timer);
  helpTimer && clearInterval(helpTimer);
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
