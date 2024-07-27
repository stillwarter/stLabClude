import { RouteRecordRaw } from "vue-router";

export const MarkRoutes: Array<RouteRecordRaw> = [
  {
    path: "/Mark",
    name: "Mark",
    props: {
      isShow: true,
    },
    children: [
      {
        path: "addMark",
        name: "addmark",
        component: () =>
          import(/* webpackChunkName: "PCAddMark" */ "@/view/PC/Mark/addMark"),
        props: {
          isShow: true,
        },
      },
      {
        path: "markList",
        name: "markList",
        component: () =>
          import(/* webpackChunkName: "PCAddMark" */ "@/view/PC/Mark/markList"),
        props: {
          isShow: true,
        },
      },
      {
        path: "markItem",
        name: "markItem",
        component: () =>
          import(/* webpackChunkName: "PCAddMark" */ "@/view/PC/Mark/preMark"),
        props: {
          isShow: false,
        },
      },
    ],
  },
];
