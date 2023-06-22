import axios, { InternalAxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { BaseResponse } from "@/apis/schema";
import createStore from "@/store/index";
import router, { hasRoles } from "@/router/index";
import { logout } from "@/apis/auth/auth";
import { imLogout } from "@/apis/im/im";

const pendingMap = new Map();

/**
 * 生成每个请求唯一的键
 * @param {*} config
 * @returns string
 */
function getPendingKey(config: InternalAxiosRequestConfig<any>) {
  // eslint-disable-next-line prefer-const
  let { url, method, params, data } = config;
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}

/**
 * 储存每个请求唯一值, 也就是cancel()方法, 用于取消请求
 * @param {*} config
 */
function addPending(config: InternalAxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config: InternalAxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000
});

request.interceptors.request.use(
  (config) => {
    const store = createStore();
    // 删除重复的请求
    removePending(config);
    // 如果repeatRequest不配置，那么该请求则不能多次请求
    !(config as any).repeatRequest &&
      config.method != "get" &&
      addPending(config);

    if (store.token !== "") {
      config.headers["x-freud"] = store.token;
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async (response) => {
    const store = createStore();
    const currentToken = response.headers["x-freud"];
    if (
      currentToken &&
      (store.token.length == 0 || store.token != currentToken)
    ) {
      store.setToken(currentToken);
    }
    const res = response.data as BaseResponse;
    // 处理异常的情况
    if (res.status !== 200) {
      ElMessage({
        message: res.message,
        type: "error",
        duration: 5 * 1000
      });
      if (res.status == 403 || res.status == 401) {
        try {
          await logout();
          await imLogout();
        } catch (e) {
          console.log(e);
        }
        store.clearUserInfo();
        store.clearToken();
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
      }
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  async (error) => {
    console.log(error);
    let message = error.response?.data?.message || error.message;
    if (error.name == "CanceledError") {
      message = "取消请求";
    }
    ElMessage({
      message,
      type: "error",
      duration: 5 * 1000
    });
    if (error.request.status == 401 || error.request.status == 403) {
      const store = createStore();
      try {
        await logout();
        await imLogout();
      } catch (e) {
        console.log(e);
      }
      store.clearUserInfo();
      store.clearToken();
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
    }
    return Promise.reject(error);
  }
);

export default request;
