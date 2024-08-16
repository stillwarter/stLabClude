// import globby from "globby";
import { globby } from "globby";
import matter from "gray-matter";
import fs from "fs-extra";
import url from "node:url";
import dayjs from "dayjs";

export async function getPosts() {
  let paths = await getPostMDFilePaths();

  let posts = await Promise.all(
    paths.map(async (item) => {
      const filename = getLastPartWithoutSuffix(item);
      const content = await fs.readFile(item, "utf-8");
      const { data } = matter(content);
      data.date = _convertDate(data.date);
      const yearinfo = getYear(data.date);

      return {
        filename,
        yearinfo,
        frontMatter: data,
        regularPath: `/${item.replace(".md", ".html")}`,
      };
    })
  );
  posts.sort(_compareDate);
  return posts;
}

/* 获取md文件的名字 */
function getLastPartWithoutSuffix(urlString) {
  const parsedUrl = url.parse(urlString);
  const pathname: any = parsedUrl.pathname;
  const parts = pathname.split("/");
  const lastPart = parts[parts.length - 1];
  const withoutSuffix = lastPart.split(".")[0];
  return withoutSuffix;
}

/* 获取年份信息 */
function getYear(date) {
  return dayjs(date).year();
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON();
  return json_date.split("T")[0];
}

function _compareDate(obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

async function getPostMDFilePaths() {
  let paths = await globby(["**.md"], {
    ignore: ["node_modules", "README.md"],
  });
  return paths.filter((item) => item.includes("posts/"));
}

export async function getPostLength() {
  // getPostMDFilePath return type is object not array
  return [...(await getPostMDFilePaths())].length;
}
