import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";
import { logout } from "@/apis/auth/auth";
import { imLogout } from "@/apis/im/im";
import router, { hasRoles } from "@/router";
import createStore from "@/store/index";
const { clearToken, clearUserInfo } = createStore();
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
tim.on(TIM.EVENT.SDK_READY, function (event) {
  // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
  // event.name - TIM.EVENT.SDK_READY
});

tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (event) {
  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
  // event.name - TIM.EVENT.MESSAGE_RECEIVED
  // event.data - 存储 Message 对象的数组 - [Message]
});

tim.on(TIM.EVENT.MESSAGE_MODIFIED, function (event) {
  // 收到消息被第三方回调修改的通知，消息发送方可通过遍历 event.data 获取消息列表数据并更新页面上同 ID 消息的内容（v2.12.1起支持）
  // event.name - TIM.EVENT.MESSAGE_MODIFIED
  // event.data - 存储被第三方回调修改过的 Message 对象的数组 - [Message]
});

tim.on(TIM.EVENT.MESSAGE_REVOKED, function (event) {
  // 收到消息被撤回的通知。使用前需要将SDK版本升级至v2.4.0或更高版本
  // event.name - TIM.EVENT.MESSAGE_REVOKED
  // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
});

tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function (event) {
  // SDK 收到对端已读消息的通知，即已读回执。使用前需要将SDK版本升级至v2.7.0或更高版本。仅支持单聊会话
  // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
  // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
});

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function (event) {
  // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
  // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
  // event.data - 存储 Conversation 对象的数组 - [Conversation]
});

tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function (event) {
  // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
  // event.name - TIM.EVENT.GROUP_LIST_UPDATED
  // event.data - 存储 Group 对象的数组 - [Group]
});

tim.on(TIM.EVENT.ERROR, function (event) {
  // 收到 SDK 发生错误通知，可以获取错误码和错误信息
  // event.name - TIM.EVENT.ERROR
  // event.data.code - 错误码
  // event.data.message - 错误信息
});

tim.on(TIM.EVENT.SDK_NOT_READY, function (event) {
  // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
  // event.name - TIM.EVENT.SDK_NOT_READY
});

tim.on(TIM.EVENT.KICKED_OUT, async (event: any) => {
  console.log(event.name);
  clearUserInfo();
  clearToken();
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
      message: "成功接入腾讯IM",
      type: "success"
    });
  }
});

export default tim;
