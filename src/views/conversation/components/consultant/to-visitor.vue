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
            正在咨询中
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
        <template #bottom>
          <el-button
            size="large"
            :icon="User"
            style="margin: 0 20px; font-size: 20px"
            color="#337ecc"
            @click="handleHelp"
          >
            请求督导
          </el-button>
          <el-divider />
          <el-button
            size="large"
            :icon="Check"
            style="margin: 0 20px; font-size: 20px"
            color="#337ecc"
            @click="handleStop"
          >
            结束咨询
          </el-button>
        </template>
      </conversation-info>
    </div>
    <im-component :is-left="true" to-id="2_1" :is-end="leftIsEnd">
    </im-component>
    <im-component :is-left="false" to-id="3_1" :is-end="rightIsEnd">
      <template #left>
        <supervisor-to-consultant :is-show-btn="true">
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
              <div style="font-size: 25px">督导A</div>
              <div>正在求助中</div>
              <div style="font-size: 30px">00:13:13</div>
            </div>
          </template>
        </supervisor-to-consultant>
      </template>
    </im-component>
  </div>
</template>

<script lang="ts" setup>
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import { onMounted, ref, watchEffect } from "vue";
import ImComponent from "@/imComponent/im-component.vue";
import SupervisorToConsultant from "@/views/conversation/components/supervisor/supervisor-to-consultant.vue";
import { Check, User } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import {
  endConsultation,
  getOnlineConsultationInfo
} from "@/apis/conversation/conversation";
import { AllMsgListResp } from "@/apis/message/message-interface";
import { WebConversationInfoResp } from "@/apis/conversation/conversation-interface";
import { mosaic, parseTime } from "@/utils";
import { WebSocketResponse } from "@/apis/schema";
import createStore from "@/store";
const store = createStore();
let isHelping = ref(false);
const route = useRoute();

const conversationId = route.query.conversationId as string;
const userId = route.query.userId as string;
const handleHelp = () => {
  isHelping.value = !isHelping.value;
};
// 所有信息
let allInfo = ref<WebConversationInfoResp>();
let allMsg = ref<AllMsgListResp>();
let currentTime = ref(new Date().getTime());

let leftIsEnd = ref(false);
let rightIsEnd = ref(false);
let timer;
const handleStop = async () => {
  await endConsultation({
    conversationId: conversationId,
    myId: userId
  });
  leftIsEnd.value = true;
  rightIsEnd.value = true;
  clearInterval(timer);
};
onMounted(async () => {
  allInfo.value = await getOnlineConsultationInfo(conversationId);
  timer = setInterval(() => {
    currentTime.value = new Date().getTime();
  }, 1000);
});

watchEffect(async () => {
  // 是对方结束会话
  if (store.websocketMessage != null) {
    const msg = store.websocketMessage as WebSocketResponse;
    if (msg.type === "endConsultation") {
      leftIsEnd.value = true;
      rightIsEnd.value = true;
      clearInterval(timer);
    }
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
