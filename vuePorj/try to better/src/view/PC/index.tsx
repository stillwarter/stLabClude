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
