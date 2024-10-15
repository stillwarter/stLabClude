import { createRouter, createWebHashHistory } from "vue-router";
import mdEdit from "../view/mdEdit/mdEdit.vue";
import home from "../view/home/home.vue";
import noteMain from "../view/note/noteMain.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: noteMain,
    // component: mdEdit,
  },
  {
    path: "/mdEdit",
    name: "mdEdit",
    component: mdEdit,
  },
  {
    path: "/note",
    name: "note",
    component: noteMain,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
