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
            咨询记录
          </div>
          <div style="margin: 10px 0; font-size: 20px">总共用时</div>
          <div style="margin: 10px 0; font-size: 30px">
            {{
              parseTime(
                (allInfo?.consultationInfo.lastTime -
                  allInfo?.consultationInfo.startTime) /
                  1000
              )
            }}
          </div>
          <div style="margin: 10px 0; font-size: 20px">咨询者评价</div>
          <el-rate
            v-model="rate"
            size="large"
            disabled
            style="transform: scale(1.5) translateX(18px)"
          />
          <div style="margin: 10px 0; font-size: 15px; color: #d7d7d7">
            {{ allInfo?.visitorText }}
          </div>
          <div style="margin: 10px 0; font-size: 20px">咨询师评价</div>
          <el-tag v-if="allInfo?.tag.length > 0" type="info">{{
            allInfo?.tag
          }}</el-tag>
          <div style="margin: 10px 0; font-size: 15px; color: #d7d7d7">
            {{ allInfo?.consultantText }}
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
        <ChatArea
          ref="leftChatArea"
          :current-message="
            (allMsg?.consultation ?? []).map((i) =>
              messageAdapter(i, query.userId)
            )
          "
          :has-revoke="false"
        />
      </div>
    </div>
    <div v-if="allInfo?.helpInfo !== null" class="chat-wrapper">
      <supervisor-to-consultant :is-show-btn="false">
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
              {{ allInfo?.helpInfo?.supervisorName }}
            </div>
            <div>求助记录</div>
            <div style="font-size: 30px">
              {{
                parseTime(
                  (allInfo?.helpInfo?.endTime - allInfo?.helpInfo?.startTime) /
                    1000
                )
              }}
            </div>
          </div>
        </template>
      </supervisor-to-consultant>
      <div ref="rightChatAreaWrapper" class="chat-list-wrapper">
        <ChatArea
          ref="rightChatArea"
          :current-message="
            (allMsg?.help ?? []).map((i) =>
              messageAdapter(i, allInfo?.helpInfo?.supervisorId ?? '')
            )
          "
          :has-revoke="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SupervisorToConsultant from "@/views/conversation/components/supervisor/supervisor-to-consultant.vue";
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import ChatArea from "@/imComponent/components/chatArea/index.vue";
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from "vue";
import { Back, Collection } from "@element-plus/icons-vue";
import router from "@/router";
import {
  getAdminConsultationInfo,
  getBoundConsultantsInfo,
  getConsultantOwnConsultationInfo,
  getSupervisorOwnHelpInfo
} from "@/apis/conversation/conversation";
import { useRoute } from "vue-router";
import createStore from "@/store";
import { WebConversationInfoResp } from "@/apis/conversation/conversation-interface";
import { messageAdapter, mosaic, parseTime } from "@/utils";
import {
  AllMessageReq,
  AllMsgListResp
} from "@/apis/message/message-interface";
import {
  getAdminConsultationMsg,
  getBoundConsultantsMsg,
  getConsultantOwnConsultationMsg,
  getSupervisorOwnHelpMsg
} from "@/apis/message/message";
import useScroll from "@/hooks/useScroll";

const route = useRoute();
const store = createStore();

const query: any = route.query;

const leftChatAreaWrapper: any = ref(null);
const rightChatAreaWrapper: any = ref(null);
const {
  isReachTop: isLeftReachTop,
  scrollHeight: leftScrollHeight,
  reflow: leftReflow,
  setScrollTop: setLeftScrollTop
} = useScroll(leftChatAreaWrapper);
const {
  isReachTop: isRightReachTop,
  scrollHeight: rightScrollHeight,
  reflow: rightReflow,
  setScrollTop: setRightScrollTop
} = useScroll(rightChatAreaWrapper);

watchEffect(async () => {
  if (isLeftReachTop.value && !isConsultationCompleted.value) {
    // 触发懒加载
    const data = await getMsg(true, false);
    data.consultation.forEach((i) => {
      allMsg.value?.consultation.unshift(i);
    });
    // 保证滚动条还在同一位置
    await nextTick(() => {
      const oldScrollHeight = leftScrollHeight.value;
      leftReflow();
      setLeftScrollTop(leftScrollHeight.value - oldScrollHeight);
    });
  }
});

watchEffect(async () => {
  if (isRightReachTop.value && !isHelpCompleted.value) {
    // 触发懒加载
    const data = await getMsg(false, true);
    data.help?.forEach((i) => {
      allMsg.value?.help?.unshift(i);
    });
    // 保证滚动条还在同一位置
    await nextTick(() => {
      const oldScrollHeight = rightScrollHeight.value;
      rightReflow();
      setRightScrollTop(rightScrollHeight.value - oldScrollHeight);
    });
  }
});

// 所有信息
let allInfo = ref<WebConversationInfoResp>();
let allMsg = ref<AllMsgListResp>();

const rate = ref(0);
watchEffect(() => {
  if (allInfo.value) {
    const value = allInfo.value as WebConversationInfoResp;
    rate.value = value.visitorScore;
  }
});
const handleExport = () => {
  // TODO
};
const handleBack = () => {
  router.go(-1);
};

const consultationCurrent = ref(1);
const helpCurrent = ref(1);
const pageSize = 15;

const isConsultationCompleted = computed(() => {
  return (
    consultationCurrent.value * pageSize >= allMsg.value?.consultationTotal
  );
});

const isHelpCompleted = computed(() => {
  return helpCurrent.value * pageSize >= allMsg.value?.helpTotal;
});

const getInfo = async () => {
  let conversationInfo: WebConversationInfoResp;
  if (query.from === "help") {
    conversationInfo = await getBoundConsultantsInfo(query.conversationId);
  } else {
    if (store.role === "supervisor") {
      conversationInfo = await getSupervisorOwnHelpInfo(query.conversationId);
    } else if (store.role === "consultant") {
      conversationInfo = await getConsultantOwnConsultationInfo(
        query.conversationId
      );
    } else if (store.role === "admin") {
      conversationInfo = await getAdminConsultationInfo(query.conversationId);
    }
  }
  allInfo.value = conversationInfo;
};

const getMsg = async (
  hasLeft: boolean,
  hasRight: boolean
): Promise<AllMsgListResp> => {
  let allMsgList: AllMsgListResp;
  const allMsgReq: AllMessageReq = {
    conversationId: query.conversationId,
    consultationCurrent: consultationCurrent.value,
    consultationSize: pageSize,
    helpCurrent: helpCurrent.value,
    helpSize: pageSize
  };
  if (query.from === "help") {
    allMsgList = await getBoundConsultantsMsg(allMsgReq);
  } else {
    if (store.role === "supervisor") {
      allMsgList = await getSupervisorOwnHelpMsg(allMsgReq);
    } else if (store.role === "consultant") {
      allMsgList = await getConsultantOwnConsultationMsg(allMsgReq);
    } else if (store.role === "admin") {
      allMsgList = await getAdminConsultationMsg(allMsgReq);
    }
  }
  if (hasLeft) {
    consultationCurrent.value++;
  }
  if (hasRight) {
    helpCurrent.value++;
  }
  return allMsgList;
};

onMounted(async () => {
  await getInfo();
  const data = await getMsg(true, true);
  data.consultation?.reverse();
  data.help?.reverse();
  allMsg.value = data;
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
