<template>
  <div class="wrapper" @click="handleClick">
    <div style="font-size: 20px">历史消息</div>
    <div>{{ excerpt }}</div>
  </div>

  <el-dialog v-model="dialogTableVisible" title="历史消息">
    <chat-area
      :current-message="(allMsg ?? []).map((i) => messageAdapter(i, ''))"
      :has-revoke="false"
    />
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { MessageInfo } from "@/apis/message/message-interface";
import { MessageBackend, TextElem } from "@/apis/im/im-backend-interface";
import { messageAdapter } from "@/utils";
import ChatArea from "@/imComponent/components/chatArea/index.vue";

const props = defineProps<{
  payload: {
    data: string; // MessageInfo[]的JSON字符串
    description: string;
    extension: string;
  };
  shouldLoop: boolean;
}>();

const allMsg = reactive<MessageInfo[]>([]);
const excerpt = ref("");
const dialogTableVisible = ref(false);

onMounted(() => {
  allMsg.splice(0);
  allMsg.push(...JSON.parse(props.payload.data));
  allMsg.forEach((i) => {
    const data = JSON.parse(i.msgBody) as MessageBackend;
    if (data.MsgType === "TIMTextElem") {
      const payload = data.MsgContent as TextElem;
      excerpt.value += `${i.fromId}: ${payload.Text}\n`;
    } else if (data.MsgType === "TIMImageElem") {
      excerpt.value += `${i.fromId}: [图片]\n`;
    } else if (data.MsgType === "TIMSoundElem") {
      excerpt.value += `${i.fromId}: [语音]\n`;
    } else if (data.MsgType === "TIMCustomElem") {
      excerpt.value += `${i.fromId}: [转发消息]\n`;
    }
  });
});

const handleClick = () => {
  dialogTableVisible.value = true;
};
</script>
<style lang="scss" scoped>
.wrapper {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
