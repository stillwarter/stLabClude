import { defineComponent, ref } from "vue";
import "./less/markList.less";
import { getMarkList, delMarkByName, synchronousToFishpi } from "@/api/mark";
import { useRouter } from "vue-router";
import axios from "axios";
// 样式后面调整

export default defineComponent({
  name: "PCMarkList",
  setup() {
    const listRef: any = ref([]);
    const Router = useRouter();
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

    /* 同步到鱼排 */
    const syToFish = (v) => {
      synchronousToFishpi().then((res: any) => {
        const imgbuffer = res.data.data;
        const blob = new Blob([imgbuffer], {
          type: "application/octet-stream",
        });
        // console.log(blob);
        const params = {
          file: [blob],
        };
        axios
          .post("https://fishpi.cn/upload", params, {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=----WebKitFormBoundary4BQ9nNARLGP1Jg5w",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error("发生错误：", error);
          });
      });
    };

    /* 同步到vitepress */
    const syToVitepress = (v) => {};

    return () => (
      <>
        <h1>记录列表</h1>
        <div class="markListBox">
          {/* <MarkItemCard data={"12"} />
          <MarkItemCard data={"12"} /> */}
          {listRef.value.map((item) => (
            <>
              <p>{item.mouth}月</p>
              <GetIndexes data={item} />
            </>
          ))}
        </div>
      </>
    );

    /*  */
    function GetIndexes({ data }) {
      return (
        <>
          {data.indexes.map((item) => (
            <div>
              <p style={{ marginLeft: "20px" }}>{item.name}</p>
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
      return <div class="markItemCard">121</div>;
    }
  },
});
