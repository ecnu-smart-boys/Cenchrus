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

tim.setLogLevel(1); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release级别，SDK 输出关键信息，生产环境时建议使用

// 注册腾讯云即时通信 IM 上传插件，即时通信 IM SDK 发送图片、语音、视频、文件等消息需要使用上传插件，将文件上传到腾讯云对象存储
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

// 注册腾讯云即时通信 IM 本地审核插件
tim.registerPlugin({ "tim-profanity-filter-plugin": TIMProfanityFilterPlugin });

// 监听事件，如：
tim.on(TIM.EVENT.SDK_READY, function (event: any) {
  createStore().setIsTimReady();
});

tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event: any) {
  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
  // event.name - TIM.EVENT.MESSAGE_RECEIVED
  // event.data - 存储 Message 对象的数组 - [Message]
  // TODO 目前仅仅考虑leftMessageList
  const store = createStore();

  store.setLeftMessage({
    leftMessageList: [...store.leftMessage.leftMessageList, ...event.data],
    leftHasNewMessage: true
  });
});

tim.on(TIM.EVENT.MESSAGE_MODIFIED, function (event: any) {
  // 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容（v2.12.1起支持）
  // event.name - TIM.EVENT.MESSAGE_MODIFIED
  // event.data - 存储被第三方回调修改过的 Message 对象的数组 - [Message]
});

tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event: any) {
  // 收到消息被撤回的通知。使用前需要将SDK版本升级至v2.4.0或更高版本
  // event.name - TIM.EVENT.MESSAGE_REVOKED
  // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
  console.log(event.name);
  console.log(event.data);
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
  store.clearUserInfo();
  store.clearToken();
  await logout();
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
      message: "当前网络不稳定",
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
