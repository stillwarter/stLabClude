import { defineComponent } from "vue";
import "./StButton.less";
export default defineComponent({
  name: "StButton",
  props: ["Ctx", "Background", "Fontcolor", "Fontsize", "Width", "Height"],
  setup(props) {
    // stbutton props默认值
    const fontctx = props.Ctx ? props.Ctx : "按钮";
    const background = props.Background ? props.Background : "#f5";
    const fontcolor = props.Fontcolor ? props.Fontcolor : "#000";
    const fontsize = props.Fontsize ? props.Fontsize : "16px";
    const width = props.Width ? props.Width : "80px";
    const height = props.Height ? props.Height : "30px";
    return () => (
      <button
        class="StButton"
        style={{
          background: background,
          width,
          height,
        }}
      >
        <p
          style={{
            color: fontcolor,
            fontSize: fontsize,
          }}
        >
          {fontctx}
        </p>
      </button>
    );
  },
});
