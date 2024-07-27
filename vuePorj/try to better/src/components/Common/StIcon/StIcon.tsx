/**
 * 通用icon组件
 */
import { defineComponent, ref } from "vue";
import "./StIcon.less";
export default defineComponent({
  name: "StIcon",
  props: ["SvgCtx", "Size", "Color", "isChose", "Handle"],
  setup(props) {
    const ischose: any = ref(props.isChose ? props.isChose : false);

    const ck = () => {
      ischose.value = !ischose.value;
      handleSvgCode.value = svgCtxChcekandHandle(
        props.SvgCtx,
        ischose.value ? "red" : null
      );
      if (props.Handle) {
        props.Handle.map((item) => item());
      }
    };

    const handleSvgCode = ref(
      svgCtxChcekandHandle(props.SvgCtx, ischose.value ? "red" : null)
    );

    if (handleSvgCode) {
      return () => (
        <div
          v-html={handleSvgCode.value}
          class="St-icon"
          style={{ width: props.Size + "px", height: props.Size + "px" }}
          onclick={() => ck()}
        />
      );
    } else {
      return <div style={{ display: "none" }}></div>;
    }
  },
});

/* svgcode pre check and handle */
function svgCtxChcekandHandle(svgstr, fillcolor) {
  const str = svgstr.replace(/\s+/, "").trim();

  if (!(str.startsWith("<svg") && str.endsWith("</svg>"))) {
    return false;
  } else {
    return str
      .replace(/width="\d+"\s*/g, "")
      .replace(/height="\d+"\s*/g, "")
      .replace(/fill="([^"]*)"/, `fill=${fillcolor}`);
  }
}
