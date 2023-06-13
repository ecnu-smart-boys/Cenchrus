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
    <im-component :is-left="true" to-id="2_1" :is-end="leftIsEnd">
    </im-component>
    <im-component
      v-if="rightHelpWrapperShown"
      :is-left="false"
      to-id="3_1"
      :is-end="rightIsEnd"
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
</template>

<script lang="ts" setup>
import ConversationInfo from "@/views/conversation/components/conversation-info.vue";
import { onMounted, onUnmounted, reactive, ref, watch, watchEffect } from "vue";
import ImComponent from "@/imComponent/im-component.vue";
import SupervisorToConsultant from "@/views/conversation/components/supervisor/supervisor-to-consultant.vue";
import { Check, User } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import {
  availableSupervisors,
  callHelp,
  endConsultation,
  endHelp,
  getOnlineConsultationInfo
} from "@/apis/conversation/conversation";
import { AllMsgListResp } from "@/apis/message/message-interface";
import { WebConversationInfoResp } from "@/apis/conversation/conversation-interface";
import { mosaic, parseTime } from "@/utils";
import { WebSocketResponse } from "@/apis/schema";
import createStore from "@/store";
const store = createStore();
const route = useRoute();

let dialogVisible = ref(false);
let leftHelpBtnShown = ref(true);
let leftEndBtnShown = ref(true);
let rightHelpWrapperShown = ref(false);
let rightHelpBtnShown = ref(false);

let timer;
let helpTimer;
let currentTime = ref(new Date().getTime());
let currentHelpTime = ref(new Date().getTime());
let leftIsEnd = ref(false);
let rightIsEnd = ref(false);

const refreshData = async () => {
  timer && clearInterval(timer);
  helpTimer && clearInterval(helpTimer);
  try {
    const data = await getOnlineConsultationInfo(
      (route.query as any).conversationId
    );
    allInfo.value = data;
    if (data.helpInfo != null) {
      leftHelpBtnShown.value = false;
      rightHelpWrapperShown.value = true;
      if (!data.helpInfo.end) {
        rightHelpBtnShown.value = true;
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

// 添加督导相关
const form = reactive({
  supervisor: ""
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
  leftIsEnd.value = true;
  rightIsEnd.value = true;
  leftEndBtnShown.value = false;
};

const handleStopHelp = async () => {
  helpTimer && clearInterval(helpTimer);
  await endHelp({
    conversationId: <string>allInfo.value?.helpInfo?.helpId
  });
  await refreshData();
  rightIsEnd.value = true;
  rightHelpBtnShown.value = false;
};

onMounted(async () => {
  await refreshData();
});

watchEffect(async () => {
  // 是对方结束会话
  if (store.websocketMessage != null) {
    const msg = store.websocketMessage as WebSocketResponse;
    if (msg.type === "endConsultation") {
      await refreshData();
      leftIsEnd.value = true;
      rightIsEnd.value = true;
    } else if (msg.type === "endHelp") {
      await refreshData();
      rightIsEnd.value = true;
      rightHelpBtnShown.value = false;
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
