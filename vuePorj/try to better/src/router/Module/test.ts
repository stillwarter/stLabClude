import { RouteRecordRaw } from "vue-router";

export const TestRoutes: Array<RouteRecordRaw> = [
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "test" */ "@/view/PC/index"),
    props: {
      isShow: true,
    },
    children: [
      {
        path: "/ttsS",
        name: "ADSA",
        props: {
          isShow: true,
        },
        children: [
          {
            path: "tt",
            name: "asd",
            children: [
              {
                path: "tsts",
                name: "cc",
                component: () =>
                  import(/* webpackChunkName: "test" */ "@/view/PC/index"),
                props: {
                  isShow: true,
                },
              },
            ],
            props: {
              isShow: true,
            },
          },
        ],
      },
    ],
  },
];
