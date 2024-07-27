import { defineComponent, ref, watch, onMounted } from "vue";
import { RouterView, useRouter } from "vue-router";
import { isMobile } from "@/tool/system";
import StRouterSlider from "./TSX/StRouterSlider";
import StHeader from "./TSX/StHeader";
import StFooter from "./TSX/StFooter";
import "./layout.less";

export default defineComponent({
  name: "Layoutbase",
  setup() {
    /* 右侧路由栏展开状态 */
    const sliderStateRef: any = ref("true");
    /* 移动端状态 */
    const webMobielorPC = ref(false);

    /* page 状态改变 */
    const getMedia = () => {
      if (isMobile()) {
        webMobielorPC.value = true;
      } else {
        webMobielorPC.value = false;
      }
    };

    /* 路由改变监听 */
    const router = useRouter();
    const mainViewRef: any = ref(null);

    /* onMounted 执行 */
    onMounted(() => {
      window.addEventListener("setItemEvent", function (e: any) {
        if (e.key == "sliderState") {
          sliderStateRef.value = e.newValue;
        }
      });
      window.addEventListener("resize", getMedia);
    });

    return () => (
      <div>
        <div
          class="StBaseLayout"
          style={
            webMobielorPC.value ? { display: "none" } : { display: "block" }
          }
        >
          <div class="StHeader">
            <StHeader />
          </div>
          <div class="StMain">
            <div
              class="StRouterSlider"
              style={sliderStateRef.value == "true" ? null : { width: "0px" }}
            >
              <StRouterSlider mainViewRef={mainViewRef} />
            </div>
            <div class="Strouter" ref={mainViewRef}>
              <RouterView />
            </div>
          </div>

          <div class="StFooter">
            <StFooter />
          </div>
        </div>
        <div
          style={
            webMobielorPC.value ? { display: "block" } : { display: "none" }
          }
        >
          暂时不支持移动端
        </div>
      </div>
    );
  },
});
