import { defineComponent, ref } from "vue";
import "./less/markList.less";
import { getMarkList, delMarkByName, synchronousToFishpi } from "@/api/mark";
import { useRouter } from "vue-router";
import axios from "axios";
import Toastify from "toastify-js";
import md5 from "js-md5";
import { getfishkey, postLocalMd } from "@/api/fishapi";
// 样式后面调整

export default defineComponent({
  name: "PCMarkList",
  setup() {
    const listRef: any = ref([]);
    const Router = useRouter();
    // const fishkey = sessionStorage.getItem("fishkey");
    const fishkeyref = ref(
      "ec981fb5b02c194720e25b3b977b4923ecf3e417f322b6c419361d7573cc1832a67363bbc99717c60e7bca8bf0366a6f78868700bc60d6c18949b60a7e039afcc249f8adf4ffec36a45b4dc287a8d38ad5735399e667d21c5cc4c6ce663a3763"
    );
    // ec981fb5b02c194720e25b3b977b4923ecf3e417f322b6c419361d7573cc1832a67363bbc99717c60e7bca8bf0366a6f78868700bc60d6c18949b60a7e039afcc249f8adf4ffec36a45b4dc287a8d38ad5735399e667d21c5cc4c6ce663a3763
    /* 获取marklist */
    const getMarkAllList = () => {
      // 获取之前先清空当前list
      listRef.value = [];
      getMarkList({
        year: null,
      }).then((res) => {
        console.log(res.data.data);
        const listdata = res.data.data;
        for (const key in listdata) {
          const item = listdata[key];
          const itemobjdata = JSON.parse(item);
          const itemdata: any = [];
          for (const ckey in itemobjdata) {
            itemdata.push({
              name: ckey,
              data: itemobjdata[ckey],
            });
          }
          listRef.value.push({
            mouth: key,
            indexes: itemdata,
          });
        }
        // const arr = Object.keys(obj).map(key => [key, obj[key]]);
        // listRef.value = JSON.parse(res.data.data);
        // console.log(listRef.value);
      });
    };
    getMarkAllList();

    /* 编辑对应mark */
    const editMark = (v) => {
      Router.push({
        name: "addmark",
        query: {
          markname: v.name,
          time: v.data.postime,
        },
      });
    };

    /* 删除对应mark */
    const delMark = (v) => {
      delMarkByName({
        markname: v.name,
        time: v.data.postime,
      }).then((res) => {
        if (res.data.code == 200) {
          getMarkAllList();
        }
      });
    };

    /* 查看对应mark */
    const lookMark = (v) => {
      Router.push({
        name: "markItem",
        query: {
          markname: v.name,
          time: v.data.postime,
        },
      });
    };

    /* 同步 */
    const syToFish = (v) => {
      if (!fishkeyref.value) {
        openDialog();
      } else {
        post2FishLocalMd();
      }
    };

    /* 上传本地md到鱼排 */
    // 默认不匿名可评论不通知关注者
    const post2FishLocalMd = async () => {
      const res = await postLocalMd({
        apiKey: fishkeyref.value,
        articleAnonymous: false,
        articleCommentable: true,
        articleContent: "这是一篇文章",
        articleNotifyFollowers: false,
        articleQnAOfferPoint: 5,
        articleRewardContent: "谢谢老板",
        articleRewardPoint: "5",
        articleShowInList: 0,
        articleTags: "摸鱼派,minecraft,游戏,迷宫",
        articleTitle: "test startnode同步测试",
        articleType: 0,
        isGoodArticle: "no",
      });

      if (res.data.code == 0) {
        Toastify({
          text: "同步成功",
          className: "toastifyinfo",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            duration: 10000,
          },
        }).showToast();
      } else {
        Toastify({
          text: "同步失败",
          className: "toastifyinfo",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            duration: 10000,
          },
        }).showToast();
      }
    };

    /* 同步到vitepress */
    const syToVitepress = (v) => {};

    /* dialog控制 */
    function openDialog() {
      Toastify({
        text: "请输入密码",
        className: "toastifyinfo",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          duration: 10000,
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      document.getElementById("myDialog").showModal();
    }

    function closeDialog() {
      //  Toastify("11").show();
      document.getElementById("myDialog").close();
    }

    /* 获取fish key值 */
    const getFishKey = async (e) => {
      const v = document.getElementById("fishpwdinput").value;
      const psd = md5(v);
      const res = await getfishkey({
        mfaCode: "",
        nameOrEmail: "stillwarter",
        userPassword: psd,
      });

      Toastify({
        text: res.data.msg,
        className: "toastifyinfo",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          duration: 3000,
        },
      }).showToast();

      if (res.data.code == 0) {
        // sessionStorage.setItem("fishkey", res.data.key);
        fishkeyref.value = res.data.Key;
      }
    };

    return () => (
      <>
        <h1>记录列表 </h1>
        <div class="markListBox">
          {/* <MarkItemCard data={"12"} />
          <MarkItemCard data={"12"} /> */}
          {listRef.value.map((item) => (
            <>
              <p>{item.mouth}月 </p>
              <GetIndexes data={item} />
            </>
          ))}
        </div>

        <dialog id="myDialog">
          <h2>请输入fishpi密码 </h2>
          <input type="password" id="fishpwdinput" />
          <br />
          <br />
          <button
            onclick={(e) => getFishKey(e)}
            style={{ marginRight: "10px" }}
          >
            确认
          </button>
          <button onclick={closeDialog}> 取消 </button>
        </dialog>
      </>
    );

    /*  */
    function GetIndexes({ data }) {
      return (
        <>
          {data.indexes.map((item) => (
            <div>
              <p style={{ marginLeft: "20px" }}> {item.name} </p>
              <span
                style={{ marginLeft: "20px", fontSize: "12px", color: "#999" }}
                onclick={() => lookMark(item)}
              >
                查看
              </span>
              <span
                style={{ marginLeft: "12px", fontSize: "12px", color: "#999" }}
                onclick={() => editMark(item)}
              >
                编辑
              </span>
              <span
                style={{ fontSize: "12px", marginLeft: "12px", color: "#999" }}
                onclick={() => delMark(item)}
              >
                删除
              </span>

              <span
                style={{ fontSize: "12px", marginLeft: "12px", color: "#999" }}
                onclick={() => syToFish(item)}
              >
                同步到鱼排
              </span>

              <span
                style={{ fontSize: "12px", marginLeft: "12px", color: "#999" }}
                onclick={() => syToVitepress(item)}
              >
                同步到vitepress docs
              </span>
            </div>
          ))}
        </>
      );
    }

    /* todo */
    /* 记录卡片 */
    function MarkItemCard({ data }) {
      return <div class="markItemCard"> 121 </div>;
    }
  },
});
