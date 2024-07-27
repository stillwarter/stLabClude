/* 根据状态码返回不同的server 响应 */
export const resBackBySCode = (code, res, message = null) => {
  if (code === 411) code411(res);

  if (code === 505) code505(res);

  if (code === 506) code506(res);

  if (code === 200) code200(res);

  if (code === 201) code200WithMessage(res, message);
};

/* 请求方式不为post处理 */
const code411 = (res) => {
  res.statusCode = 411;
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.end("requsetmethod not support \n 暂时只支持post请求");
};

/* 请求方式不为post处理 */
const code506 = (res) => {
  res.statusCode = 506;
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.end("requsethandle not found \n 未发现处理函数");
};

/* api未检测到配置处理 */
const code505 = (res) => {
  res.statusCode = 505;
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.end("routerconfig not found 请配置routerconfig");
};

/* api 响应成功 */
const code200 = (res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.end(
    JSON.stringify({
      code: 200,
      message: "server success 请求成功",
    })
  );
};

/* api响应成功 内容自定义 */
const code200WithMessage = (res, message) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain;charset=utf-8");
  res.end(JSON.stringify(message));
};
