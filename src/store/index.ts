import { defineStore } from "pinia";
const useStore = defineStore("main", {
  state() {
    return {
      token: localStorage.getItem("token") || ""
    };
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    clearToken(): Promise<void> {
      return new Promise((resolve) => {
        this.token = "";
        localStorage.removeItem("token");
        resolve();
      });
    }
  }
});

export default useStore;
