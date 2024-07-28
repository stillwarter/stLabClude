import { defineComponent, ref, watch } from "vue";
import "md-editor-v3/lib/style.css";
import { MdEditor } from "md-editor-v3";
import "./less/addMark.less";
import { postImages } from "@/api/edit";
import { postMardMd, postMardMd2, getMarkByName } from "@/api/mark";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "PCAddMark",
  setup() {
    const mdeditor: any = ref(null);
    const text = ref("## 编辑记录 or 日志 or 随笔(请编辑标题)");

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

    /* 上传 */
    const postmdValue = () => {
      //   console.log(text.value);
      const title = getMdTitle(text.value);

      postMardMd2({
        filename: title,
        filetype: "md",
        filecontent: text.value,
      });
    };

    /* 图片上传 */
    const addImages = (data) => {
      data.map((item) => {
        postImages(item).then((res: any) => {
          const imginfo = res.data;
          // const imginfo: any = null;
          // console.log(decodeURIComponent(imginfo.url));
          console.log(
            `\n\n ![${Date.now()}](${encodeURI(
              imginfo.url.replace(/\\/g, "/")
            )})`
          );

          mdeditor.value.insert(() => {
            return {
              targetValue: `\n\n ![${Date.now()}](${imginfo.url
                .replace(/\\/g, "/")
                .replace(/localhost/g, "http://127.0.0.1")})`,
              select: true,
              deviationStart: 0,
              deviationEnd: 0,
            };
          });
        });
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
