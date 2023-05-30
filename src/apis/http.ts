import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { BaseResponse } from "@/apis/schema";
import useStore from "@/store";
const store = useStore();
const { token, clearToken } = store;

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
  baseURL: "http://192.168.31.62:5508/",
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
    const res = response.data as BaseResponse;
    // 处理异常的情况
    if (res.status !== 200) {
      ElMessage({
        message: res.message,
        type: "error",
        duration: 5 * 1000
      });
      // TODO
      // 403:非法的token; 50012:其他客户端登录了;  401:Token 过期了;
      if (res.status === 403 || res.status === 50012 || res.status === 401) {
        ElMessageBox.confirm("你已被登出，请重新登录", "确定登出", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          clearToken().then(() => {
            location.reload();
            // TODO
            // router.push("/login");
          });
        });
      }
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err" + error);
    ElMessage({
      message: error.response?.data?.message || error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default request;
