import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";
import { logout } from "@/apis/auth/auth";
import router, { hasRoles } from "@/router";
import createStore from "@/store/index";
import { ElNotification } from "element-plus";

const options = {
  SDKAppID: 1400810468
};

const tim = TIM.create(options);

tim.setLogLevel(1);

tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

tim.registerPlugin({ "tim-profanity-filter-plugin": TIMProfanityFilterPlugin });

tim.on(TIM.EVENT.SDK_READY, function (event: any) {
  createStore().setIsTimReady();
});

let receiveId = "";
tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event: any) {
  if (receiveId == event.data[0].ID && event.data[0].flow == "in") return;
  if (event.data[0].flow == "in") {
    receiveId = event.data[0].ID;
  }
  const store = createStore();
  if (event.data && event.data.length > 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // 根据消息的from和to来判断是否是当前聊天页面，是否需要插入数据
    event.data.forEach((i: any) => {
      if (
        (i.from == store.leftMessage.fromId &&
          i.to == store.leftMessage.toId) ||
        (i.from == store.leftMessage.toId && i.to == store.leftMessage.fromId)
      ) {
        // 当前左侧有新消息
        store.setLeftMessage({
          leftMessageList: [...store.leftMessage.leftMessageList, i],
          leftHasNewMessage: true
        });
      } else if (
        (i.from == store.rightMessage.fromId &&
          i.to == store.rightMessage.toId) ||
        (i.from == store.rightMessage.toId && i.to == store.rightMessage.fromId)
      ) {
        // 当前右侧有新消息
        store.setRightMessage({
          rightMessageList: [...store.rightMessage.rightMessageList, i],
          rightHasNewMessage: true
        });
      }
    });
  }
});

tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event: any) {
  const store = createStore();
  if (event.data && event.data.length > 0) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // 根据消息的from和to来判断是否是当前聊天页面，是否需要改变
    event.data.forEach((i) => {
      if (
        (i.from == store.leftMessage.fromId &&
          i.to == store.leftMessage.toId) ||
        (i.from == store.leftMessage.toId && i.to == store.leftMessage.fromId)
      ) {
        // 当前左侧发生撤回
        for (const o of store.leftMessage.leftMessageList) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (o.ID == event.data[0].ID) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            o.isRevoked = true;
            break;
          }
        }
        store.setLeftMessage({
          leftMessageList: [...store.leftMessage.leftMessageList],
          leftHasNewMessage: true
        });
      } else if (
        (i.from == store.rightMessage.fromId &&
          i.to == store.rightMessage.toId) ||
        (i.from == store.rightMessage.toId && i.to == store.rightMessage.fromId)
      ) {
        // 当前右侧发生撤回
        for (const o of store.rightMessage.rightMessageList) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (o.ID == event.data[0].ID) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            o.isRevoked = true;
            break;
          }
        }
        store.setRightMessage({
          rightMessageList: [...store.rightMessage.rightMessageList],
          rightHasNewMessage: true
        });
      }
    });
  }
});

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event: any) {
  // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
  // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
  // event.data - 存储 Conversation 对象的数组 - [Conversation]
});

tim.on(TIM.EVENT.ERROR, function (event: any) {
  ElNotification({
    title: "Error",
    message: `IM发生错误\n${event.data.code}\n${event.data.message}`,
    type: "error"
  });
});

tim.on(TIM.EVENT.SDK_NOT_READY, function (event: any) {
  ElNotification({
    title: "Error",
    message: "IM不可用",
    type: "error"
  });
});

tim.on(TIM.EVENT.KICKED_OUT, async (event: any) => {
  const store = createStore();
  await logout();
  store.clearUserInfo();
  store.clearToken();
  let errorMsg;
  if (event.data.type === TIM.TYPES.KICKED_OUT_MULT_ACCOUNT) {
    errorMsg = "多实例登录被踢";
  } else if (event.data.type === TIM.TYPES.KICKED_OUT_MULT_DEVICE) {
    errorMsg = "多终端登录被踢";
  } else if (event.data.type === TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED) {
    errorMsg = "签名过期被踢";
  }
  ElNotification({
    title: "Error",
    message: errorMsg,
    type: "error"
  });
  if (router.hasRoute("supervisor")) {
    router.removeRoute("supervisor");
  }
  if (router.hasRoute("admin")) {
    router.removeRoute("admin");
  }
  if (router.hasRoute("consultant")) {
    router.removeRoute("consultant");
  }
  hasRoles.hasRoles = true;
  await router.push({ path: "/login" });
});

tim.on(TIM.EVENT.NET_STATE_CHANGE, (event: any) => {
  if (event.data.state === TIM.TYPES.NET_STATE_CONNECTING) {
    ElNotification({
      title: "Warning",
      message: "连接中......",
      type: "warning"
    });
  } else if (event.data.state === TIM.TYPES.NET_STATE_DISCONNECTED) {
    ElNotification({
      title: "Error",
      message: "当前网络不可用",
      type: "error"
    });
  } else if (event.data.state === TIM.TYPES.NET_STATE_CONNECTED) {
    ElNotification({
      title: "Success",
      message: "成功接入IM",
      type: "success"
    });
  }
});

export default tim;
