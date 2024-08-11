import { defineComponent } from "vue";
import StIcon from "@/components/Common/StIcon/StIcon";
import { nighticon } from "@/assets/svg/tt.ts";
import "md-editor-v3/lib/style.css";
import { MdEditor } from "md-editor-v3";
import { postImages } from "@/api/edit";
export default defineComponent({
  name: "PCindex",
  setup() {
    const tt = (data) => {
      console.log(data);
      postImages(data[0]);
    };
    return () => (
      <>
        this is index
        <StIcon SvgCtx={nighticon} Size={20} />
        {/* <MdPreview editorId="tt" modelValue="123" /> */}
        <MdEditor ref="mdeditor" onUploadImg={(data) => tt(data)} />
      </>
    );
  },
});

// ec981fb5b02c194720e25b3b977b4923ecf3e417f322b6c419361d7573cc1832a67363bbc99717c60e7bca8bf0366a6f78868700bc60d6c18949b60a7e039afcc249f8adf4ffec36a45b4dc287a8d38ad5735399e667d21c5cc4c6ce663a3763
