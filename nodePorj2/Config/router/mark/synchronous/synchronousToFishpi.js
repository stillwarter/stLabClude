export const synchronousToFishpi = (req, res) => {};

// const https = require('https');
import http from "http";

export function getImageData(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = [];

        res.on("data", (chunk) => {
          data.push(chunk);
        });

        res.on("end", () => {
          resolve(Buffer.concat(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// // 示例用法
// getImageData("http://127.0.0.1:3040/Static/image/2024/7/1722176179259.jpg")
//   .then((imageData) => {
//     // 这里得到的 imageData 就是图片的二进制数据
//     console.log(imageData);
//     const postData = imageData;
//   })
//   .catch((err) => {
//     console.error("获取图片数据时出错:", err);
//   });

// // 要发送的数据
// const postData = JSON.stringify({ key1: "value1", key2: "value2" });
