import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import { createPinia } from "pinia";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

createApp(App)
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(router)
  .use(createPinia())
  .mount("#app");
