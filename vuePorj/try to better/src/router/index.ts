import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
// 项目其他页面路由（推荐使用）
// import Practice from "../router/practiceFolder/practice";

import { LogerRoutes } from "./Module/loger";
import { MarkRoutes } from "./Module/mark";
// vue项目自带路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/view/PC/index"),
    props:{
      isShow:true
    }
  },
  ...LogerRoutes,
  ...MarkRoutes,
];

// const routers = [...routes, ...Practice];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
