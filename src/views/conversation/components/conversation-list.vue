<template>
  <div
    v-for="(conversation, index) in conversationData"
    :key="conversation.userId"
    @click="handleClick(index)"
    @contextmenu.prevent="handleContextMenu($event, conversation)"
  >
    <div :id="conversation.conversationId" class="list-wrapper">
      <img
        :src="conversation.avatar"
        class="avatar"
        alt=""
        onerror="this.src = '/defaultAvatar.jpg'"
      />
      <div class="right-wrapper">
        <div>{{ conversation.name }}</div>
        <div v-if="conversation.unRead != 0" class="bubble">
          {{ conversation.unRead > 99 ? "99+" : conversation.unRead }}
        </div>
      </div>
    </div>
  </div>
  <div
    v-show="rightMenuVisible"
    :style="{
      left: position.left + 'px',
      top: position.top + 'px',
      display: rightMenuVisible ? 'block' : 'none'
    }"
    class="contextmenu"
  >
    <div class="item" @click="handleDelete">删除</div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, watchEffect } from "vue";
import router from "@/router";
import useRightClick from "@/hooks/userRightClick";
import createStore from "@/store";
import {
  EndConsultationNotification,
  EndHelpNotification,
  OnlineConversation,
  WebSocketResponse
} from "@/apis/schema";
import {
  getOnlineConversationsList,
  removeConversation
} from "@/apis/conversation/conversation";
import { ElNotification } from "element-plus";
const store = createStore();
const { rightMenuVisible, position, rightClickItem, openMenu } =
  useRightClick();
const conversationData = reactive<
  {
    avatar: string;
    name: string;
    userId: string;
    conversationId: string;
    end: boolean;
    unRead: number;
  }[]
>([]);

const getConversationData = async () => {
  const data = await getOnlineConversationsList();
  conversationData.splice(0);
  data.forEach((i) => {
    conversationData.push({
      ...i,
      unRead: 0
    });
  });
};

onMounted(async () => {
  await getConversationData();
});

const handleClick = (index: any) => {
  if (conversationData[index].end) {
    router.push({
      path: "/conversation-detail",
      query: {
        conversationId: conversationData[index].conversationId,
        from: "list"
      }
    });
  } else {
    router.push({
      path: "/conversation",
      query: {
        conversationId: conversationData[index].conversationId,
        userId: conversationData[index].userId
      }
    });
    conversationData[index].unRead = 0;
  }
};

const handleDelete = async () => {
  await removeConversation(rightClickItem.value);
  await getConversationData();
};

const handleContextMenu = (e: any, item: any) => {
  openMenu(e, item);
};

watchEffect(async () => {
  if (store.websocketMessage != null) {
    const msg = store.websocketMessage as WebSocketResponse;
    let node;
    if (msg.type === "start") {
      const content = msg.content as OnlineConversation;
      conversationData.push({
        ...content,
        unRead: 0
      });
      ElNotification({
        title: "Info",
        message: "您有一个新会话",
        type: "info"
      });
      await nextTick(() => {
        const node = document.getElementById(`${content.conversationId}`);
        if (node) {
          node.style.background = "#ecf5ff";
          setTimeout(() => {
            node.style.background = "";
          }, 1500);
        }
      });
      store.setWebSocketMessage(null);
    } else if (msg.type === "endConsultation") {
      const content = msg.content as EndConsultationNotification;
      ElNotification({
        title: "Info",
        message: `与访客 ${content.visitorName} 的会话已结束`,
        type: "info"
      });
      if (store.role == "consultant") {
        node = document.getElementById(`${content.consultationId}`);
      } else if (store.role == "supervisor") {
        node = document.getElementById(`${content.helpId}`);
      }
      await getConversationData();
      store.setWebSocketMessage(null);
    } else if (msg.type === "startHelp") {
      const content = msg.content as OnlineConversation;
      conversationData.push({
        ...content,
        unRead: 0
      });
      ElNotification({
        title: "Info",
        message: "您有一个新求助",
        type: "info"
      });
      await nextTick(() => {
        const node = document.getElementById(`${content.conversationId}`);
        if (node) {
          node.style.background = "#ecf5ff";
          setTimeout(() => {
            node.style.background = "";
          }, 1500);
        }
      });
    } else if (msg.type === "endHelp") {
      const content = msg.content as EndHelpNotification;
      if (store.role === "supervisor") {
        ElNotification({
          title: "Info",
          message: `与咨询师 ${content.consultantName} 的求助已结束`,
          type: "info"
        });
        node = document.getElementById(`${content.helpId}`);
      } else if (store.role === "consultant") {
        ElNotification({
          title: "Info",
          message: `与督导 ${content.supervisorName} 的求助已结束`,
          type: "info"
        });
        node = document.getElementById(`${content.consultationId}`);
      }
    }
    if (node) {
      node.style.background = "#ecf5ff";
      setTimeout(() => {
        node.style.background = "";
      }, 1500);
    }
  }
});
</script>

<style scoped lang="scss">
.list-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.list-wrapper:hover {
  background-color: #ecf5ff;
}
.avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 20px;
}
.right-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.bubble {
  border-radius: 50%;
  color: white;
  background-color: #429eff;
  font-size: 10px;
  line-height: 25px;
  height: 25px;
  width: 25px;
  text-align: center;
  margin-right: 15px;
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
