import { defineComponent, ref } from "vue";
import "./less/markList.less";
import { getMarkList, delMarkByName, synchronousToFishpi } from "@/api/mark";
import { useRouter } from "vue-router";
import axios from "axios";
import Toastify from "toastify-js";
import md5 from "js-md5";
import { getfishkey, postLocalMd } from "@/api/fishapi";
import { getMarkByName, postmdValue } from "@/api/mark";
// 样式后面调整

export default defineComponent({
  name: "PCMarkList",
  setup() {
    const listRef: any = ref([]);
    const Router = useRouter();
    // const fishkey = sessionStorage.getItem("fishkey");
    const fishkeyref = ref(null);
    /* 获取marklist */
    const getMarkAllList = () => {
      // 获取之前先清空当前list
      listRef.value = [];
      getMarkList({
        year: null,
      }).then((res) => {
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
    const sysMdData: any = ref(null);
    const syToFish = (v) => {
      sysMdData.value = v;
      if (!fishkeyref.value) {
        openDialog();
      } else {
        // post2FishLocalMd();
        openFormDialog();
      }
    };

    /* 上传本地md到鱼排 */
    // 默认不匿名可评论不通知关注者
    const mdtypetext = ref("");
    const post2FishLocalMd = async () => {
      const typev = document.getElementById("mdtype").value;
      mdtypetext.value = typev.replaceAll("，", ",");
      const {
        markname,
        postime,
        markimages,
        fileissysfishpi,
      } = sysMdData.value.data;
      if (fileissysfishpi) {
        Toastify({
          text: "该文章已同步",
          className: "toastifyinfo",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            duration: 10000,
          },
        }).showToast();
        return;
      }

      const res = await getMarkByName({
        markname,
        marktime: postime,
      });

      if (res.data.code == 200) {
        const pres = await postLocalMd({
          apiKey: fishkeyref.value,
          articleContent: res.data.data,
          articleTitle: markname,
          ...sySetForm,
        });

        if (pres.data.code == 0) {
          Toastify({
            text: "同步成功",
            className: "toastifyinfo",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              duration: 10000,
            },
          }).showToast();
          closeFormDialog();
          postMardMd2({
            filename: markname,
            filetype: "md",
            filecontent: res.data.data,
            filelocalimages: markimages,
            fileissysfishpi: true,
            fileissysvitepress: false,
          });
        } else {
          Toastify({
            text: "同步失败" + `${pres.data.msg}`,
            className: "toastifyinfo",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              duration: 10000,
            },
          }).showToast();
        }
      }
    };

    /* 同步到vitepress */
    const syToVitepress = (v) => {};

    /* myDialog控制 */
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

    /* 同步form默认值 */
    const sySetForm = {
      articleAnonymous: false, // 文章匿名
      articleCommentable: true, // 文章可评论
      articleNotifyFollowers: false, // 文章通知关注者
      articleShowInList: 0, // 文章展示到公共列表
      articleTags: mdtypetext.value,
      articleType: 0,
      isGoodArticle: "no",
    };
    const sySetFormRef = ref(sySetForm);

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
        closeDialog();
        setTimeout(() => {
          openFormDialog();
        }, 100);
      }
    };

    /* formdialog控制 */
    function openFormDialog() {
      document.getElementById("sySetDialog").showModal();
    }

    function closeFormDialog() {
      document.getElementById("sySetDialog").close();
    }

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

        <dialog id="sySetDialog">
          <h2>鱼排同步设置</h2>
          <span> 文章标签： </span>
          <input type="text" id="mdtype" />
          <br />
          <br />
          <button
            onclick={(e) => post2FishLocalMd(e)}
            style={{ marginRight: "10px" }}
          >
            确认
          </button>
          <button onclick={closeFormDialog}> 取消 </button>
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
