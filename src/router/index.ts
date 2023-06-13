import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import useStore from "@/store";

let routes = [
  { path: "/login", component: () => import("@/views/login/index.vue") },
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/views/404/index.vue")
  }
];

const supervisorRoutes = [
  {
    path: "/",
    name: "supervisor",
    component: () => import("@/views/index/index.vue"),
    redirect: "/supervisor",
    children: [
      {
        path: "supervisor",
        component: () => import("@/views/home/supervisor.vue")
      },
      {
        path: "consult-record",
        component: () => import("@/views/consultRecord/index.vue")
      },
      {
        path: "help-record",
        component: () => import("@/views/helpRecord/index.vue")
      },
      {
        path: "conversation",
        component: () => import("@/views/conversation/index.vue")
      },
      {
        path: "conversation-detail",
        component: () => import("@/views/conversationDetail/index.vue")
      }
    ]
  }
];
const consultantRoutes = [
  {
    path: "/",
    name: "consultant",
    component: () => import("@/views/index/index.vue"),
    redirect: "/consultant",
    children: [
      {
        path: "consultant",
        component: () => import("@/views/home/consultant.vue")
      },
      {
        path: "consult-record",
        component: () => import("@/views/consultRecord/index.vue")
      },
      {
        path: "conversation",
        component: () => import("@/views/conversation/index.vue")
      },
      {
        path: "conversation-detail",
        component: () => import("@/views/conversationDetail/index.vue")
      }
    ]
  }
];
const adminRoutes = [
  {
    path: "/",
    name: "admin",
    component: () => import("@/views/index/index.vue"),
    redirect: "/administrator",
    children: [
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
      },
      {
        path: "conversation-detail",
        component: () => import("@/views/conversationDetail/index.vue")
      },
      {
        path: "conversation",
        component: () => import("@/views/conversation/index.vue")
      }
    ]
  }
];

if (process.env.VUE_APP_ENV === "development") {
  routes = [...routes, ...adminRoutes];
}
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const whiteList = ["/login"];
export const hasRoles = { hasRoles: true };
router.beforeEach((to, from, next) => {
  if (process.env.VUE_APP_ENV === "development") {
    next();
    return;
  }
  const { token, role } = useStore();
  NProgress.start();
  if (token.length !== 0) {
    if (to.path === "/login") {
      const routes = router.getRoutes();
      let flag = true;
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path == "/") {
          flag = false;
          next({ path: "/" });
          NProgress.done();
        }
      }
      if (flag) {
        next();
        NProgress.done();
      }
    } else {
      if (hasRoles.hasRoles) {
        switch (role) {
          case "admin":
            adminRoutes.forEach((i) => {
              router.addRoute(i);
            });
            break;
          case "supervisor":
            supervisorRoutes.forEach((i) => {
              router.addRoute(i);
            });
            break;
          case "consultant":
            consultantRoutes.forEach((i) => {
              router.addRoute(i);
            });
            break;
        }
        hasRoles.hasRoles = false;
        next({ ...to, replace: true });
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
