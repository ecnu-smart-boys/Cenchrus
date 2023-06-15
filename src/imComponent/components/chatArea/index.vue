<template>
  <ul id="chat_list_wrapper" ref="UL">
    <li v-for="item in currentMessage" :key="item.ID" class="clearfix">
      <div class="timestamp">{{ parseTimestamp(item.clientTime * 1000) }}</div>
      <div
        v-if="!item.isRevoked"
        :class="item.flow == MSG_FLOW.OUT ? 'textRight' : 'textLeft'"
      >
        <div v-if="item.flow == MSG_FLOW.IN" class="headImage">
          <img
            width="40"
            height="40"
            src="/src/assets/defaultAvatar.jpg"
            alt=""
            style="border-radius: 50%"
          />
        </div>
        <div
          class="chat-wrapper"
          :style="
            item.flow == MSG_FLOW.OUT
              ? 'margin-right: 10px;'
              : 'margin-left: 10px;'
          "
          @contextmenu.prevent="handleContextMenu($event, item)"
        >
          <TextContent
            v-if="item.type === MSG_ELEMENT_TYPE.TEXT"
            :text="item.payload.text"
          />
          <ImageContent
            v-if="item.type === MSG_ELEMENT_TYPE.IMAGE"
            v-viewer="{ movable: false }"
            :payload="item.payload"
          />
          <AudioContent
            v-if="item.type === MSG_ELEMENT_TYPE.AUDIO"
            :payload="item.payload"
          />
          <CustomContent
            v-if="item.type === MSG_ELEMENT_TYPE.CUSTOM"
            :payload="item.payload"
            :should-loop="shouldLoop"
          />
        </div>

        <div v-if="item.flow == MSG_FLOW.OUT" class="headImage">
          <img
            width="40"
            height="40"
            src="/src/assets/defaultAvatar.jpg"
            alt=""
            style="border-radius: 50%"
          />
        </div>
      </div>
      <div v-else class="timestamp">
        {{ item.flow == MSG_FLOW.OUT ? "您" : "对方" }}撤回了一条消息
      </div>
    </li>
  </ul>
  <div
    v-show="rightMenuVisible"
    :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: rightMenuVisible ? 'block' : 'none'
    }"
    class="contextmenu"
  >
    <div class="item" @click="handleRevoke">撤回</div>
  </div>
</template>

<script setup lang="ts">
import TextContent from "@/imComponent/components/chatArea/TextContent.vue";
import ImageContent from "@/imComponent/components/chatArea/ImageContent.vue";
import AudioContent from "@/imComponent/components/chatArea/AudioContent.vue";
import { parseTimestamp } from "@/utils";
import useRightClick from "@/hooks/userRightClick";
import { MessageList } from "@/apis/im/im-interface";
import { imRevokeMessage } from "@/apis/im/im";
import { ElMessage } from "element-plus";
import {
  MSG_ELEMENT_TYPE,
  MSG_FLOW
} from "@/imComponent/components/SendJSONData";
import CustomContent from "@/imComponent/components/chatArea/CustomContent.vue";
const { rightMenuVisible, position, rightClickItem, openMenu } =
  useRightClick();
const props = defineProps<{
  currentMessage: MessageList[];
  hasRevoke: boolean;
  shouldLoop: boolean;
}>();
const handleRevoke = async () => {
  try {
    await imRevokeMessage(rightClickItem.value);
  } catch (e) {
    ElMessage({
      message: "撤回失败",
      type: "error",
      duration: 5 * 1000
    });
  }
};

const handleContextMenu = (e: any, item: any) => {
  if (!props.hasRevoke) return;
  if (item.flow == MSG_FLOW.OUT) {
    openMenu(e, item);
  }
};
</script>

<style scoped lang="scss">
ul {
  padding: 10px;
  margin: 0;
}
li {
  padding: 5px;
  margin-bottom: 10px;
  list-style: none;
  .textLeft {
    float: left;
    display: flex;
    .chat-wrapper {
      background-color: #eee;
    }
    .chat-wrapper:before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-right: 6px solid #eee;
      position: absolute;
      top: 8px;
      left: -12px;
    }
  }
  .textRight {
    float: right;
    display: flex;
    .chat-wrapper:after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-left: 6px solid #a6e860;
      position: absolute;
      top: 8px;
      right: -12px;
    }
  }
  .chat-wrapper {
    position: relative;
    border-radius: 7px;
    background-color: #a6e860;
    padding: 8px 10px 8px 10px;
    display: inline-block;
    font-size: 12px;
    color: #333;
    line-height: 28px;
    text-align: right;
  }
}
.clearfix:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.timestamp {
  text-align: center;
  font-size: 12px;
  color: #9a9a9a;
  margin: 3px 0;
}

.contextmenu {
  width: 100px;
  background: #fff;
  z-index: 3000;
  position: fixed;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  .item {
    box-sizing: border-box;
    padding-left: 15px;
    height: 35px;
    width: 100%;
    line-height: 35px;
    color: rgb(29, 33, 41);
    cursor: pointer;
  }
  .item:hover {
    background: rgb(229, 230, 235);
  }
}
</style>
<style>
::-webkit-scrollbar {
  width: 8px;
  background-color: #ffffff;
}
::-webkit-scrollbar-track {
  background-color: #f3f3f3;
}
::-webkit-scrollbar-thumb {
  border-radius: 30px;
  background-color: #615b5b49;
}
</style>
