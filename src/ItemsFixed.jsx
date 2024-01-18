import { useSortable } from "@vueuse/integrations/useSortable";
import { defineComponent, nextTick, ref, watch } from "vue";

export const ItemsFixed = defineComponent({
  name: "ItemsFixed",
  props: {
    items: {
      type: Array,
      required: true,
    },
    onItemUpdate: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    let el = ref(null);
    const key = ref(0);

    watch(props.items, () => key.value++, {
      immediate: true,
    });
    watch(
      key,
      () => {
        nextTick(() => {
          // Reinitialize useSortable with new ref
          useSortable(el, props.items, {
            onUpdate: (event) => {
              key.value++;
              props.onItemUpdate(event);
            },
          });
        });
      },
      {
        immediate: true,
      }
    );

    return () => (
      <div>
        <h1>"Fixed" version:</h1>
        <ul ref={el} key={key.value}>
          {props.items.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  },
});
