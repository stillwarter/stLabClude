import { ref, defineComponent } from "vue";
import { setId, setParentId, getOneArr, getOneObj } from "@/tool/routerTree";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "TestTemp",
  props: ["mainViewRef"],
  setup(props) {
    const Router = useRouter();

    /* ref init routerarr */
    const routerArr = setParentId(setId(Router.options.routes, 0), null);
    const routerArref = ref(routerArr);

    /* ref init routerobj */
    const routerObj = getOneObj(getOneArr(routerArr, []), {});
    const routerobjref = ref(routerObj);

    /* ref init selectrouterItem */
    const routerSelect = ref(null);
    const roterChose = (id) => {
      routerSelect.value = id;
    };

    /* router expand or collapse */
    const ExpandorCollapse = (item) => {
      const state = routerobjref.value[item.id].isExpand;
      routerobjref.value[item.id].isExpand = !state;
      toRouter(routerobjref.value[item.id]);
    };

    /* goto router url and chose routeritem and view animation*/
    const toRouter = (data) => {
      if (data.component) {
        roterChose(data.id);

        // before
        // console.log(props.mainViewRef.value);
        props.mainViewRef.value.setAttribute(
          "style",
          "animation: MainViewRefRight 0.5s ease-in forwards;"
        );

        setTimeout(() => {
          Router.push({ name: data.name });
          props.mainViewRef.value.setAttribute(
            "style",
            "animation: MainViewRefLeft 0.5s ease-out forwards;"
          );
        }, 600);
        // Router.push({ name: data.name });
      }
    };

    function GetCh({ data }: any) {
      if (data.children) {
        return (
          <div>
            {data.children.map((item) => {

              if (item.props.isShow) {
                return (
                  <div>
                    <GetCh
                      data={item}
                      style={
                        data.isExpand
                          ? { display: "block", paddingLeft: "20px" }
                          : { display: "none" }
                      }
                    />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        );
      } else {
        return (
          <p
            class="routerChindex"
            onclick={() => toRouter(data)}
            style={data.id == routerSelect.value ? { color: "red" } : null}
          >
            {data.name}
          </p>
        );
      }
    }

    return () =>
      routerArref.value.map((item) => {
        if (item.children) {
          return (
            <div>
              <p class="routerChindex" onclick={() => ExpandorCollapse(item)}>
                {item.name}
              </p>
              <GetCh data={item} />
            </div>
          );
        } else {
          return (
            <p
              class="routerChindex"
              key={item.id}
              onclick={() => toRouter(item)}
              style={item.id == routerSelect.value ? { color: "red" } : null}
            >
              {item.name}
            </p>
          );
        }
      });
  },
});
