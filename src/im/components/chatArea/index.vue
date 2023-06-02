<template>
  <ul id="chat_list_wrapper" ref="UL">
    <li v-for="item in currentMessage" :key="item.ID" class="clearfix">
      <div :class="item.flow == MSG_FLOW.OUT ? 'textRight' : 'textLeft'">
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
        >
          <TextContent
            v-if="item.type === MSG_ELEMENT_TYPE.TEXT"
            :text="item.payload.text"
          ></TextContent>
          <ImageContent
            v-if="item.type === MSG_ELEMENT_TYPE.IMAGE"
            v-viewer="{ movable: false }"
            :payload="item.payload"
          >
          </ImageContent>
          <AudioContent
            v-if="item.type === MSG_ELEMENT_TYPE.AUDIO"
            :payload="item.payload"
          >
          </AudioContent>
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
    </li>
  </ul>
</template>

<script setup lang="ts">
import TextContent from "@/im/components/chatArea/TextContent.vue";
import ImageContent from "@/im/components/chatArea/ImageContent.vue";
import AudioContent from "@/im/components/chatArea/AudioContent.vue";

const props = defineProps<{
  currentMessage: any;
}>();

const MSG_ELEMENT_TYPE = {
  TEXT: "TIMTextElem",
  IMAGE: "TIMImageElem",
  CUSTOM: 1 << 3,
  AUDIO: "TIMSoundElem"
};

const MSG_FLOW = {
  IN: "in",
  OUT: "out"
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
    z-index: 1;
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
