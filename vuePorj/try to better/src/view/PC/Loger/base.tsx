import { defineComponent, ref } from "vue";
import { readAllLog } from "@/api/loger";
import "./loger.less";

export default defineComponent({
  name: "PCLoger",
  setup() {
    /* logerlist init and to ref */
    const logerListRef: any = ref(null);
    const getLogerList = () => {
      readAllLog().then((res) => {
        // console.log(JSON.parse(res.data.data));
        logerListRef.value = res.data.data.reverse();
      });
    };

    getLogerList();

    return () => (
      <>
        <h1>请求日志</h1>
        {logerListRef.value &&
          logerListRef.value.map((item) => {
            return <MountCtx data={item} />;
          })}
      </>
    );

    /* 日志内容（月份） */
    function MountCtx({ data }) {
      return (
        <div class="Loger-Box">
          <p class="LogerMounth">{data.mounth}月</p>
          {data.data
            .filter((item) => item.url != "/getAllLoger")
            .map((item: any) => {
              return (
                <div class="LogerItem">
                  <span>请求时间：{item.time}</span>
                  <span>请求路径：{item.url}</span>
                  <span>请求源：{item.header.origin}</span>
                </div>
              );
            })}
        </div>
      );
    }
  },
});
