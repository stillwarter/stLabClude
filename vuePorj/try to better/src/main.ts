import { createApp } from "vue";
import App from "./App";
import router from "./router";

import "./style/global.css";
import "./style/font.css";
import { initState } from "./state/base";
//
initState();


// 作者：Undo_03
// 链接：https://juejin.cn/post/6883719958337945607
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
// import
const app = createApp(App);
app.use(router);
app.mount("#app");
