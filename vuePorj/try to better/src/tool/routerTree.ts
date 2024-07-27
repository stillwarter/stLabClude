/**
 * 解析tree类型的数据
 *
 * 我希望得到一个非常便于维护的路由数组，没有层级结构
 * 我该如何处理？
 *
 * 一维化
 * 然后呢？如何处理应该有的层级关系？
 */

export function routerAys(tree) {
  let routerlist: any = [];

  // TODO-lzq 函数组合待优化
  routerlist = setParentId(setId(tree, 0), null);
  routerlist = getOneArr(routerlist, []);
  routerlist = getOneObj(routerlist, {});
  return routerlist;
}

/* 给list数据设置id和show */
export function setId(arr, id) {
  arr.map((item) => {
    item.id = id;
    id++;
    if (item.children) {
      setId(item.children, id);
      item.isExpand=false
    }
  });
  return arr;
}

/* 设置parentID */
export function setParentId(arr, parentId) {
  arr.map((item) => {
    item.parentId = parentId;
    if (item.children) {
      setParentId(item.children, item.id);
    }
  });
  return arr;
}

/* tree一维化(通用) */
export function getOneArr(arr, oneList) {
  arr.map((item) => {
    oneList.push(item);
    if (item.children) {
      getOneArr(item.children, oneList);
    }
  });
  return oneList;
}

/* arr父子结构化 */
function getParentAndChildTree(arr, tree) {
  arr.map((item) => {
    if (!item.parentId) {
      tree.push(item);
    }
  });

  arr.map((item) => {
    if (item.parentId) {
      // console.log(tree,item.parentId);

      tree[item.parentId].children = item;
    }
  });
  return tree;
}

/* 一维对象代理 */
export function getOneObj(arr, obj) {
  arr.map((item) => {
    obj[item.id] = item;
  });
  return obj;
}


export function convertToTree(obj) {
  const tree = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const item = obj[key];
      if (!item.parentId) {
        tree[item.id] = item;
      } else {
        if (!tree[item.parentId]) {
          tree[item.parentId] = { children: [] };
        }
        tree[item.parentId].children.push(item);
      }
    }
  }

  return tree;
}