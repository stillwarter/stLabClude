import StIcon from "@/components/Common/StIcon/StIcon";
import { expandOrcollpeIcon2 } from "@/assets/svg/head/main.js";

const tipList = ["永恒燃烧的火焰，带我脱离凡间的沉沦！"];

const StHeader = () => {
  /* 关闭左侧栏 */
  const closeslider = () => {
    const state = localStorage.getItem("sliderState");
    // console.log(state);

    state == "true"
      ? localStorage.setItem("sliderState", "false")
      : localStorage.setItem("sliderState", "true");
  };

  return (
    <div class="StHeader">
      <StIcon
        SvgCtx={expandOrcollpeIcon2}
        Size={20}
        Handle={[closeslider]}
        isChose={true}
      />
      <p class="tipWords">{tipList[0]}</p>
    </div>
  );
};

export default StHeader;
