import axios, { InternalAxiosRequestConfig } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { BaseResponse } from "@/apis/schema";
import createStore from "@/store";
import router from "@/router/index";
const { token, clearToken, setToken } = createStore();

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
    // 删除重复的请求
    removePending(config);
    // 如果repeatRequest不配置，那么该请求则不能多次请求
    !(config as any).repeatRequest && addPending(config);

    if (token !== "") {
      config.headers["x-freud"] = token;
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
  (response) => {
    const currentToken = response.headers["x-freud"];
    if (currentToken && (token.length == 0 || token != currentToken)) {
      setToken(currentToken);
    }
    const res = response.data as BaseResponse;
    // 处理异常的情况
    if (res.status !== 200) {
      ElMessage({
        message: res.message,
        type: "error",
        duration: 5 * 1000
      });
      // TODO
      if (res.status === 403 || res.status === 401) {
        ElMessageBox.confirm("你已被登出，请重新登录", "确定登出", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          clearToken();
          router.push({ path: "/login" });
        });
      }
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err" + error);
    let message = error.response?.data?.message || error.message;
    if (error.name == "CanceledError") {
      message = "取消请求";
    }
    ElMessage({
      message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default request;
