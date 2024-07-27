import { resBackBySCode } from "../../../Utils/res/resUtils.js";

export const testRouterConfig = {
  "/api/test": {
    name: "test",
    info: "test",
    handle: testhandle,
  },
};

function testhandle(req, res) {
  resBackBySCode(200, res);
}
