/* 路由配置表 */
import { imagesRouterConfig } from "./router/images/imagesrouter.js";
import { testRouterConfig } from "./router/test/testrouter.js";
import { markRouterConfig } from "./router/mark/markrouter.js";
export const routerListConfig = {
  ...testRouterConfig,
  ...imagesRouterConfig,
  ...markRouterConfig,
};
