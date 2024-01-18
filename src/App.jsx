import { moveArrayElement } from "@vueuse/integrations/useSortable";
import { defineComponent, nextTick, ref } from "vue";
import { ItemsRepro } from "./ItemsRepro";
import { ItemsFixed } from "./ItemsFixed";

export const App = defineComponent({
  name: "App",
  setup() {
    const items = ref(["11111", "22222", "33333", "44444"]);

    const appendItem5 = () => {
      items.value.push("55555");
    };

    const onItemUpdate = (e) => {
      moveArrayElement(items.value, e.oldIndex, e.newIndex);
      nextTick(() => {
        console.log("Maybe send new order to the server:", items.value);
      });
    };

    return () => (
      <div>
        <ItemsRepro items={items.value} />
        <hr />
        <div>Current source: {JSON.stringify(items.value, null, 2)}</div>
        <button onClick={appendItem5}>Append item 5</button>
        <hr />
        <ItemsFixed items={items.value} onItemUpdate={onItemUpdate} />
      </div>
    );
  },
});
