import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  define: {
    "process.env": {
      VUE_APP_API_BASE_URL: "http://192.168.31.62:5508",
      VUE_APP_WS_BASE_URL: "ws://192.168.31.62:5508"
    }
  }
});
