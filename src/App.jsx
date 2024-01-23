import { computed, defineComponent, ref } from "vue";
import { ItemsRepro } from "./ItemsRepro";

export const App = defineComponent({
  name: "App",
  setup() {
    const serverItems = ref(["11111", "22222", "33333", "44444"]);
    const items = computed(() => serverItems.value);

    const appendItem5 = () => {
      setTimeout(() => {
        serverItems.value.push("55555");
      }, 1000);
    };

    return () => (
      <div>
        <ItemsRepro
          items={items.value}
          onUpdate:items={(newItems) => {
            // Do not update value optimistically

            // Instead, update value after server responds (simulating server response with timeout)
            setTimeout(() => {
              serverItems.value = newItems;
            }, 3000);
          }}
        />
        <hr />
        <div>Current items: {JSON.stringify(items.value, null, 2)}</div>
        <div>
          Current server items: {JSON.stringify(serverItems.value, null, 2)}
        </div>
        <button onClick={appendItem5}>Append item 5</button>
      </div>
    );
  },
});
