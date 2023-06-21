<template>
  <div class="wrapper" @click="handleClick">
    <div style="font-size: 15px">
      {{ "历史消息-" + info?.consultationInfo.consultantName }}
    </div>
    <div style="color: grey; white-space: pre-wrap">{{ excerpt }}</div>
  </div>

  <el-dialog v-model="dialogTableVisible" append-to-body>
    <chat-area
      :current-message="
        allMsg.map((i) =>
          messageAdapter(i, info?.consultationInfo.visitorId ?? '')
        )
      "
      :has-revoke="false"
      :should-loop="false"
    />
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { MessageInfo } from "@/apis/message/message-interface";
import { MessageBackend, TextElem } from "@/apis/im/im-backend-interface";
import { messageAdapter } from "@/utils";
import ChatArea from "@/imComponent/components/chatArea/index.vue";
import { ConsultationInfo } from "@/apis/conversation/conversation-interface";

const props = defineProps<{
  payload: {
    data: string; // MessageInfo[]的JSON字符串
    description: string;
    extension: string;
  };
  shouldLoop: boolean;
}>();

const info = ref<{
  consultationInfo: ConsultationInfo;
  messageInfo: MessageInfo[];
}>();
const allMsg = reactive<MessageInfo[]>([]);
const excerpt = ref("");
const dialogTableVisible = ref(false);

onMounted(async () => {
  allMsg.splice(0);
  const json: {
    consultationInfo: ConsultationInfo;
    messageInfo: MessageInfo[];
  } = JSON.parse(props.payload.data);
  info.value = json;

  allMsg.push(...json.messageInfo);
  allMsg.forEach((i) => {
    const fromName =
      i.fromId == json.consultationInfo.consultantId
        ? json.consultationInfo.consultantName
        : json.consultationInfo.visitorName;
    const data = JSON.parse(i.msgBody)[0] as MessageBackend;
    if (data.MsgType === "TIMTextElem") {
      const payload = data.MsgContent as TextElem;
      excerpt.value +=
        `${fromName}: ${payload.Text}`.replace(/\n/g, " ") + "\n";
    } else if (data.MsgType === "TIMImageElem") {
      excerpt.value += `${fromName}: [图片]\n`;
    } else if (data.MsgType === "TIMSoundElem") {
      excerpt.value += `${fromName}: [语音]\n`;
    } else if (data.MsgType === "TIMCustomElem") {
      excerpt.value += `${fromName}: [转发消息]\n`;
    }
  });
});

const handleClick = () => {
  if (!props.shouldLoop) return;
  dialogTableVisible.value = true;
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
