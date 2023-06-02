import { defineStore } from "pinia";
import { LoginResp } from "@/apis/auth/auth-interface";
const useStore = defineStore("main", {
  state() {
    return {
      token: localStorage.getItem("token") || "",
      userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
      isLogin: false,
      isTimReady: false
    };
  },
  getters: {
    role(state) {
      return state.userInfo.role;
    }
  },
  actions: {
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
