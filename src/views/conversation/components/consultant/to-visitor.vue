<template>
  <div style="display: flex">
    <div>
      <conversation-info>
        <template #head>
          <img
            :src="allInfo?.consultationInfo.visitorAvatar"
            class="avatar"
            alt=""
            onerror="this.src='/defaultAvatar.jpg'"
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
        <template #bottom>
          <el-divider v-if="leftHelpBtnShown" />
          <el-button
            v-if="leftHelpBtnShown"
            size="large"
            :icon="User"
            style="margin: 0 20px; font-size: 20px"
            color="#337ecc"
            @click="handleHelp"
          >
            请求督导
          </el-button>
          <el-divider v-if="leftEndBtnShown" />
          <el-button
            v-if="leftEndBtnShown"
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
    <im-component
      :is-left="true"
      :to-id="<string>allInfo?.consultationInfo.visitorId"
      :is-end="leftIsEnd"
      :my-avatar="allInfo?.consultationInfo.consultantAvatar"
      :other-avatar="allInfo?.consultationInfo.visitorAvatar"
    >
    </im-component>
    <im-component
      v-if="rightHelpWrapperShown && !rightHelpIsEnd"
      :is-left="false"
      :to-id="<string>allInfo?.helpInfo?.supervisorId"
      :is-end="rightIsEnd"
      :my-avatar="allInfo?.consultationInfo.consultantAvatar"
      :other-avatar="allInfo?.helpInfo?.avatar"
    >
      <template #left>
        <supervisor-to-consultant
          :is-show-btn="rightHelpBtnShown"
          @on-stop="handleStopHelp"
        >
          <template #left>
            <img
              :src="allInfo?.helpInfo?.avatar"
              class="avatar"
              alt=""
              onerror="this.src='/defaultAvatar.jpg'"
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
    <div v-if="rightHelpWrapperShown && rightHelpIsEnd" class="chat-wrapper">
      <supervisor-to-consultant :is-show-btn="false">
        <template #left>
          <img
            :src="allInfo?.helpInfo?.avatar"
            class="avatar"
            alt=""
            onerror="this.src='/defaultAvatar.jpg'"
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
        <chat-area
          ref="rightChatArea"
          :current-message="
            (allMsg?.help ?? []).map((i) =>
              messageAdapter(i, <string>allInfo?.consultationInfo.consultantId)
            )
          "
          :has-revoke="false"
          :should-loop="true"
          :my-avatar="allInfo?.consultationInfo.consultantAvatar"
          :other-avatar="allInfo?.helpInfo?.avatar"
        />
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="选择督导" width="400px">
    <el-form :model="form" label-width="120px" label-position="top" status-icon>
      <el-form-item label="选择督导" prop="supervisor">
        <el-select v-model="form.supervisor" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="commentVisible"
    title="评价访客"
    width="400px"
    :show-close="false"
  >
    <el-form
      :model="commentForm"
      label-width="120px"
      label-position="top"
      status-icon
    >
      <el-form-item label="添加TAG" prop="name">
        <el-input v-model="commentForm.tag" maxlength="32" show-word-limit />
      </el-form-item>
      <el-form-item label="添加评论" prop="supervisor"
        ><el-input
          v-model="commentForm.comment"
          :autosize="{ minRows: 2, maxRows: 3 }"
          type="textarea"
          maxlength="255"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleComment"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import ChatArea from "@/imComponent/components/chatArea/index.vue";
import {
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  watchEffect
} from "vue";
import ImComponent from "@/imComponent/im-component.vue";
import SupervisorToConsultant from "@/views/conversation/components/supervisor-to-consultant.vue";
import { Check, User } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import {
  availableSupervisors,
  callHelp,
  consultantComment,
  endConsultation,
  endHelp,
  getOnlineConsultationInfo
} from "@/apis/conversation/conversation";
import { AllMsgListResp } from "@/apis/message/message-interface";
import { WebConversationInfoResp } from "@/apis/conversation/conversation-interface";
import { messageAdapter, mosaic, parseTime } from "@/utils";
import {
  EndConsultationNotification,
  EndHelpNotification,
  WebSocketResponse
} from "@/apis/schema";
import createStore from "@/store";
import { deleteConversation, setMessageRead } from "@/apis/im/im";
import useScroll from "@/hooks/useScroll";
import { getConsultantOwnConsultationMsg } from "@/apis/message/message";
import router from "@/router";
const store = createStore();
const route = useRoute();

let dialogVisible = ref(false);
let leftHelpBtnShown = ref(true);
let leftEndBtnShown = ref(true);
let rightHelpWrapperShown = ref(false);
let rightHelpIsEnd = ref(false);
let rightHelpBtnShown = ref(false);

let timer;
let helpTimer;
let currentTime = ref(new Date().getTime());
let currentHelpTime = ref(new Date().getTime());
let leftIsEnd = ref(false);
let rightIsEnd = ref(false);

const rightChatArea = ref(null);
const {
  isReachTop: isRightReachTop,
  clientHeight: rightClientHeight,
  scrollHeight: rightScrollHeight,
  reflow: rightReflow,
  setScrollTop: setRightScrollTop
} = useScroll(rightChatArea);

// 迭代器用于懒加载
let consultationIterator = ref(-1);
const getMsg = async () => {
  const data = await getConsultantOwnConsultationMsg({
    conversationId: (route.query as any).conversationId,
    consultationIterator: 0,
    helpIterator: consultationIterator.value,
    size: 15
  });
  if (data.help && data.help.length > 0) {
    consultationIterator.value = data.help[0].iterator;
  }
  return data;
};

const refreshData = async (isEnd = false) => {
  timer && clearInterval(timer);
  helpTimer && clearInterval(helpTimer);
  try {
    const data = await getOnlineConsultationInfo(
      (route.query as any).conversationId
    );
    allInfo.value = data;
    if (data.helpInfo != null) {
      rightHelpIsEnd.value = data.helpInfo.end;
      leftHelpBtnShown.value = false;
      rightHelpWrapperShown.value = true;
      if (!data.helpInfo.end) {
        // 求助还没结束
        rightHelpBtnShown.value = true;
      } else {
        // 结束了
        rightHelpBtnShown.value = false;
        currentHelpTime.value = <number>data.helpInfo?.endTime;
        if (allMsg.value) {
          const data = await getMsg();
          if (data.help && allMsg.value?.help) {
            (allMsg.value as AllMsgListResp).help?.push(...data.help);
          }
          (allMsg.value as AllMsgListResp).callHelp = data.callHelp;
        } else {
          allMsg.value = await getMsg();
        }
      }
    }
    if (data.consultationInfo.end) {
      // 结束了啥也不展示
      currentTime.value = data.consultationInfo.lastTime;
      currentHelpTime.value = <number>data.helpInfo?.endTime;
      leftIsEnd.value = true;
      rightIsEnd.value = true;
      leftEndBtnShown.value = false;
      leftHelpBtnShown.value = false;
    } else {
      if (isEnd) {
        return;
      }
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
    // 报错啥也不展示
    leftEndBtnShown.value = false;
    leftHelpBtnShown.value = false;
    leftIsEnd.value = true;
    rightIsEnd.value = true;
    currentTime.value = 0;
    currentHelpTime.value = 0;
  }
};

watchEffect(async () => {
  if (isRightReachTop.value && consultationIterator.value != 0) {
    // 触发懒加载
    const data = await getMsg();
    allMsg.value?.consultation.unshift(...data.consultation);
    // 保证滚动条还在同一位置
    await nextTick(() => {
      const oldScrollHeight = rightScrollHeight.value;
      rightReflow();
      setRightScrollTop(rightScrollHeight.value - oldScrollHeight);
    });
  }
});

// 添加督导相关
const form = reactive({
  supervisor: ""
});

let commentVisible = ref(false);

const commentForm = reactive({
  tag: "",
  comment: ""
});

const options = reactive([]);

const handleHelp = async () => {
  const data = await availableSupervisors();
  options.splice(0);
  data.forEach((i) => {
    options.push({
      value: i.id,
      label: i.name
    });
  });
  dialogVisible.value = true;
};

const handleSubmit = async () => {
  await callHelp({
    conversationId: (route.query as any).conversationId,
    toId: form.supervisor
  });
  await refreshData();
  dialogVisible.value = false;
  store.setRightId(
    <string>allInfo.value?.consultationInfo.consultantId,
    <string>allInfo.value?.helpInfo?.supervisorId
  );
};

const handleComment = async () => {
  try {
    await consultantComment({
      conversationId: (route.query as any).conversationId,
      tag: commentForm.tag,
      text: commentForm.comment
    });
    commentVisible.value = false;
    // 有comment说明已经结束了，直接跳转到detail中
    await router.push({
      path: "/conversation-detail",
      query: {
        conversationId: allInfo.value?.consultationInfo.consultationId,
        from: "consultant"
      }
    });
  } catch (e) {
    commentVisible.value = false;
  }
};

// 所有信息
let allInfo = ref<WebConversationInfoResp>();
let allMsg = ref<AllMsgListResp>();

const handleStop = async () => {
  timer && clearInterval(timer);
  helpTimer && clearInterval(helpTimer);
  await endConsultation({
    conversationId: (route.query as any).conversationId
  });
  // 剩下的收尾工作交给ws
};

const handleStopHelp = async () => {
  helpTimer && clearInterval(helpTimer);
  await endHelp({
    conversationId: <string>allInfo.value?.helpInfo?.helpId
  });
  // 剩下的收尾工作交给ws
};

watch(route, async () => {
  if (!(route.query as any).conversationId) return;
  if (route.path !== "/conversation") return;
  consultationIterator.value = -1;
  await refreshData();
  await setMessageRead(`C2C${allInfo.value?.consultationInfo.visitorId}`);
  if (allInfo.value?.helpInfo) {
    await setMessageRead(`C2C${<string>allInfo.value?.helpInfo?.supervisorId}`);
  }
});

onMounted(async () => {
  await refreshData();
  // 滑动到最底部
  await nextTick(() => {
    rightReflow();
    setRightScrollTop(rightScrollHeight.value - rightClientHeight.value);
  });
  await setMessageRead(`C2C${allInfo.value?.consultationInfo.visitorId}`);
  if (allInfo.value?.helpInfo) {
    await setMessageRead(`C2C${<string>allInfo.value?.helpInfo?.supervisorId}`);
  }
  store.setLeftId(
    <string>allInfo.value?.consultationInfo.consultantId,
    <string>allInfo.value?.consultationInfo.visitorId
  );
  if (allInfo.value?.helpInfo) {
    store.setRightId(
      <string>allInfo.value?.consultationInfo.consultantId,
      <string>allInfo.value?.helpInfo?.supervisorId
    );
  }
});

// ws相关
watchEffect(async () => {
  // 是对方结束会话
  if (store.websocketMessage != null) {
    const msg = store.websocketMessage as WebSocketResponse;
    if (msg.type === "endConsultation") {
      const content = msg.content as EndConsultationNotification;
      if (
        content.consultationId != allInfo.value?.consultationInfo.consultationId
      ) {
        return;
      }
      // 本地主动结束，删除会话
      try {
        await deleteConversation(
          `C2C${allInfo?.value?.consultationInfo.visitorId}`
        );
      } catch (e) {
        /* empty */
      }
      leftIsEnd.value = true;
      rightIsEnd.value = true;
      commentVisible.value = true;
      // 还不能跳转到detail，因为可能有commentDialog
      await refreshData();
    } else if (msg.type === "endHelp") {
      const content = msg.content as EndHelpNotification;
      if (content.helpId != allInfo.value?.helpInfo?.helpId) {
        return;
      }
      await refreshData();
      rightIsEnd.value = true;
      rightHelpBtnShown.value = false;
      // 删除会话
      try {
        await deleteConversation(
          `C2C${allInfo?.value?.helpInfo?.supervisorId}`
        );
      } catch (e) {
        /* empty */
      }
      store.setWebSocketMessage(null);
    } else if (msg.type === "comment") {
      // 现在还在评论状态，直接忽略
      if (commentVisible.value == true) return;
      const content = msg.content as string;
      if (content != allInfo.value?.consultationInfo?.consultationId) {
        return;
      }
      store.setWebSocketMessage(null);
      // 有comment说明已经结束了，直接跳转到detail中
      await router.push({
        path: "/conversation-detail",
        query: {
          conversationId: allInfo.value?.consultationInfo.consultationId,
          from: "consultant"
        }
      });
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
  background-color: white;
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
