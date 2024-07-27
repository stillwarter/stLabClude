/**
 * mark文件预览
 */
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { MdPreview, MdCatalog } from "md-editor-v3";
import { getMarkByName } from "@/api/mark";
import "md-editor-v3/lib/preview.css";

export default defineComponent({
  name: "PCPreMark",
  setup() {
    /* 路由参数 */
    const Route = useRoute();
    const marknameRef = ref(Route.query);
    const text = ref("## 编辑记录 or 日志 or 随笔(请编辑标题)");

    const scrollElement = document.documentElement;
    const scrollElementRef = ref(scrollElement);
    /* 获取ctx */
    getMarkByName({
      markname: marknameRef.value.markname,
      marktime: marknameRef.value.time,
    }).then((res: any) => {
      if (res.data.code == 200) {
        text.value = res.data.data;
      }
    });

    return () => (
      <div
        style={{
          display: "flex",
          position: "relative",
          left: "-20px",
          height: "100vh",
        }}
      >
        <MdPreview
          editorId={"preview-only"}
          modelValue={text.value}
          theme="dark"
        />
        <MdCatalog
          editorId={"preview-only"}
          scrollElement={scrollElementRef.value}
          theme="dark"
        />
      </div>
    );
  },
});
