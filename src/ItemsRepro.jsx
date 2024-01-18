import { useSortable } from "@vueuse/integrations/useSortable";
import { computed, defineComponent, ref } from "vue";

export const ItemsRepro = defineComponent({
  name: "ItemsRepro",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    let el = ref(null);

    const items = computed(() => [...props.items]);

    useSortable(el, items.value);

    return () => (
      <div>
        <h1>Reproduction:</h1>
        <ol>
          <li>Drag "11111" to the last position, after "44444"</li>
          <li>Click "Append item 5" button at the bottom</li>
          <li>Observe that </li>
        </ol>
        <h1>Drag us:</h1>
        <ul ref={el}>
          {items.value.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  },
});
