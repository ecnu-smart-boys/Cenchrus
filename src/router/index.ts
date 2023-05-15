import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/index/index.vue"),
    children: [
      {
        path: "consultant",
        component: () => import("@/views/home/consultant.vue")
      },
      {
        path: "supervisor",
        component: () => import("@/views/home/supervisor.vue")
      },
      {
        path: "consult-record",
        component: () => import("@/views/consultRecord/index.vue")
      },
      {
        path: "supervisor-manager",
        component: () => import("@/views/supervisorManager/index.vue")
      },
      {
        path: "consultant-manager",
        component: () => import("@/views/consultantManager/index.vue")
      },
      {
        path: "visitor-manager",
        component: () => import("@/views/visitorManager/index.vue")
      }
    ]
  },
  { path: "/login", component: () => import("@/views/login/index.vue") }
];

// 3. 创建路由实例并传递 `routes` 配置。
export default createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes // `routes: routes` 的缩写
});
