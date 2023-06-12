import { defineStore } from "pinia";
import { LoginResp } from "@/apis/auth/auth-interface";
const useStore = defineStore("main", {
  state() {
    return {
      token: localStorage.getItem("token") || "",
      userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
      isLogin: false,
      // TIM是否进入READY-STATE（只有READY-STATE才可以进行sendMessage等鉴权操作）
      isTimReady: false,
      // 左侧消息
      leftMessage: {
        leftMessageList: [],
        leftHasNewMessage: false
      },
      // 右侧消息
      rightMessage: {
        rightMessageList: [],
        rightHasNewMessage: false
      },
      // 全局websocket 相关
      websocketMessage: null
    };
  },
  getters: {
    role(state) {
      return state.userInfo.role;
    }
  },
  actions: {
    setWebSocketMessage(newMessage: any) {
      this.websocketMessage = newMessage;
    },
    setLeftMessage(o: { leftMessageList: any[]; leftHasNewMessage: boolean }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.leftMessage = o;
    },
    setLeftHasNewMessage(b: boolean) {
      this.leftMessage.leftHasNewMessage = b;
    },
    leftMessageListCallback(fn: (list: any[]) => void) {
      fn.call(this, this.leftMessage.leftMessageList);
    },
    setRightMessage(o: {
      rightMessageList: any[];
      rightHasNewMessage: boolean;
    }) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.rightMessage = o;
    },
    setRightHasNewMessage(b: boolean) {
      this.rightMessage.rightHasNewMessage = b;
    },
    rightMessageListCallback(fn: (list: any[]) => void) {
      fn.call(this, this.rightMessage.rightMessageList);
    },
    setIsLogin() {
      this.isLogin = true;
    },
    setIsTimReady() {
      this.isTimReady = true;
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    clearToken() {
      this.token = "";
      localStorage.removeItem("token");
    },
    setUserInfo(userInfo: LoginResp) {
      this.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    clearUserInfo() {
      this.userInfo = {};
      localStorage.removeItem("userInfo");
    }
  }
});

export default useStore;
