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
        path: "administrator",
        component: () => import("@/views/home/administrator.vue")
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
      },
      {
        path: "schedule",
        component: () => import("@/views/schedule/index.vue")
      }
    ]
  },
  { path: "/login", component: () => import("@/views/login/index.vue") }
];

export default createRouter({
  history: createWebHashHistory(),
  routes
});
