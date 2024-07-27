import fs from "node:fs";
/**
 * 控制索引文件函数
 *
 * 比如写入md文件的时候，我同时做一个索引文件，记录该md的写入时间，作者，类型等等信息；
 * 还可以方便我们获取不同分类，不同时段的md文件
 *
 * 所以这个索引文件是更新文件后的派生操作
 */

/* 添加索引文件-默认索引文件名都是indexes.json */
export async function addIndexFile(aimpath, filename, filecontent) {
  // 文件路径存在判断
  if (!fs.existsSync(aimpath)) {
    fs.mkdirSync(aimpath, { recursive: true });
  }
  // 文件存在判断
  if (fs.existsSync(filename)) {
    const oldctx = JSON.parse(fs.readFileSync(filename, "utf-8"));
    const newctx = JSON.parse(filecontent);
    const ctx = { ...oldctx, ...newctx };

    // const usectx = JSON.parse(oldctx);
    // usectx.push(JSON.parse(filecontent));
    // const addctx = JSON.stringify(usectx);
    fs.writeFile(filename, JSON.stringify(ctx), (err) => {
      if (err) {
        console.log("文件写入失败", err);
        return 0;
      }
    });
  } else {
    fs.writeFile(filename, filecontent, (err) => {
      if (err) {
        console.log("文件写入失败", err);
        return 0;
      }
    });
  }
}

/* 删除索引 */
export async function delIndexFile(path, indexname) {
  const jsoncrtx = await fs.readFileSync(path, "utf-8");
  const jsondata = JSON.parse(jsoncrtx);
  // console.log(jsondata);
  // console.log(jsondata[indexname]);
  delete jsondata[indexname];

  fs.writeFile(path, JSON.stringify(jsondata), (err) => {
    if (err) {
      console.log("文件写入失败", err);
      return 0;
    }
  });
}
