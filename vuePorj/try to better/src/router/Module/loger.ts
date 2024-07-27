import { RouteRecordRaw } from "vue-router";

export const LogerRoutes: Array<RouteRecordRaw> = [
  {
    path: "/Loger",
    name: "Loger",
    component: () =>
      import(/* webpackChunkName: "test" */ "@/view/PC/Loger/base"),
    props: {
      isShow: true,
    },
  },
];
