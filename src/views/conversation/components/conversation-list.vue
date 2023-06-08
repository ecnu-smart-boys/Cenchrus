<template>
  <div
    v-for="(conversation, index) in conversationData"
    :key="conversation.userId"
    @click="handleClick(index)"
  >
    <div class="list-wrapper">
      <img src="/src/assets/defaultAvatar.jpg" class="avatar" alt="" />
      <div class="right-wrapper">
        <div>{{ conversation.name }}</div>
        <div v-if="conversation.unRead != 0" class="bubble">
          {{ conversation.unRead > 99 ? "99+" : conversation.unRead }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import router from "@/router";

const conversationData = reactive<
  {
    avatar: string;
    name: string;
    userId: string;
    unRead: number;
  }[]
>([]);

const getConversationData = () => {
  conversationData.push({
    avatar: "",
    name: "张先生",
    userId: "2_1",
    unRead: 20
  });
  conversationData.push({
    avatar: "",
    name: "张先生",
    userId: "2_2",
    unRead: 20
  });
  conversationData.push({
    avatar: "",
    name: "张先生",
    userId: "2_2",
    unRead: 20
  });
};

getConversationData();

const handleClick = (index: any) => {
  router.push({
    path: "/conversation",
    query: { userId: conversationData[index].userId }
  });
  conversationData[index].unRead = 0;
};
</script>

<style scoped>
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
</style>
