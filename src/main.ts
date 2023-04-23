import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import { createPinia } from "pinia";

createApp(App).use(ElementPlus).use(createPinia()).mount("#app");
