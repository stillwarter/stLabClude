import { defineComponent } from "vue";
import Layoutbase from "@/layout/Base";
export default defineComponent({
  name: "app",
  setup() {
    return () => <Layoutbase />;
  },
});
