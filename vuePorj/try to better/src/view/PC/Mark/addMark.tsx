import { defineComponent, ref, watch } from "vue";
import "md-editor-v3/lib/style.css";
import { MdEditor } from "md-editor-v3";
import "./less/addMark.less";
import { postImages } from "@/api/edit";
import {
  postMardMd,
  postMardMd2,
  getMarkByName,
  getFileJsonInfo,
} from "@/api/mark";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "PCAddMark",
  setup() {
    const mdeditor: any = ref(null);
    const text = ref("## 编辑记录 or 日志 or 随笔(请编辑标题)");
    const localImages = ref([]);

    /* 路由参数 */
    const Route = useRoute();
    const marknameRef = ref(Route.query);
    watch(
      marknameRef,
      () => {
        marknameRef.value
          ? marknameRef.value.markname
            ? getMarkByName({
                markname: marknameRef.value.markname,
                marktime: marknameRef.value.time,
              }).then((res: any) => {
                if (res.data.code == 200) {
                  text.value = res.data.data;
                  getFileJson({
                    markname: marknameRef.value.markname,
                    marktime: marknameRef.value.time,
                  });
                }
              })
            : (text.value = "## 编辑记录 or 日志 or 随笔(请编辑标题)")
          : (text.value = "## 编辑记录 or 日志 or 随笔(请编辑标题)");
      },
      {
        immediate: true,
      }
    );

    // /* 根据mark名字获取数据 */
    // const getMarkCtxByName = () => {
    //   getMarkByName({
    //     markname: marknameRef.value,
    //   });
    // };
    /* 根据mark名字获取对应json内容 */
    const getFileJson = async (markname, marktime) => {
      const res = await getFileJsonInfo({ markname, marktime });
      res.status == 200 ? (localImages.value = res.data.markimages) : [];
      console.log(localImages.value);
    };

    /* md上传 */
    const postmdValue = () => {
      const title = getMdTitle(text.value);
      postMardMd2({
        filename: title,
        filetype: "md",
        filecontent: text.value,
        filelocalimages: localImages.value,
        fileissysfishpi:false,
        fileissysvitepress:false
      });
    };

    /* 图片上传 */
    const addImages = (data) => {
      data.map((item) => {
        addImages2Fish(item);
        localImages2Local(item);
      });
    };

    /* 本地图片上传 */
    const localImages2Local = (v) => {
      postImages(v).then((res: any) => {
        const imginfo = res.data;
        const itemurl = imginfo.url
          .replace(/\\/g, "/")
          .replace(/localhost/g, "http://127.0.0.1");
        localImages.value.push(itemurl);
        console.log(localImages.value);
      });
    };

    /* 鱼排图片上传 */
    const addImages2Fish = (v) => {
      axios
        .post(
          "/fishapi/upload",
          {
            file: [v],
          },
          {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=----WebKitFormBoundary",
            },
          }
        )
        .then((response) => {
          // fishiImage.value.push(response.data.data.succMap);
          console.log(response.data.data.succMap);
          const urlobj = response.data.data.succMap;
          const name = Object.keys(urlobj);
          const url = Object.values(urlobj);

          mdeditor.value.insert(() => {
            return {
              // 本地写法
              // targetValue: `\n\n ![${Date.now()}](${imginfo.url
              //   .replace(/\\/g, "/")
              //   .replace(/localhost/g, "http://127.0.0.1")})`,
              // fishpi
              targetValue: `\n\n ![${name}](${url})`,
              select: true,
              deviationStart: 0,
              deviationEnd: 0,
            };
          });
        })
        .catch((error) => {
          console.error("发生错误：", error);
        });
    };

    /* 同步到鱼排（暂时） */
    const syfishpi = (v) => {
      axios
        .post(
          "/fishapi/upload",
          {
            file: [v],
          },
          {
            headers: {
              "Content-Type":
                "multipart/form-data; boundary=----WebKitFormBoundary",
            },
          }
        )
        .then((response) => {
          fishiImage.value.push(response.data.data.succMap);
        })
        .catch((error) => {
          console.error("发生错误：", error);
        });
    };

    return (): any => (
      <div class="addMark">
        <h1>Mark一下</h1>
        <div class="mdeditorbox">
          <MdEditor
            theme="dark"
            v-model={text.value}
            style={{ minHeight: "80vh" }}
            ref={mdeditor}
            onUploadImg={(data) => addImages(data)}
            onSave={() => postmdValue()}
          />
        </div>
      </div>
    );
  },
});

/* 获取md第一行内容 */
function getMdTitle(data) {
  return data.split("\n")[0].replace(/#/g, "").replace(/\s+/g, "");
}
