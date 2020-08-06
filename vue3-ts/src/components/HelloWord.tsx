import { defineComponent, ref, watchEffect, onMounted } from 'vue'

export default defineComponent({
  name: 'hellow',
  props: {
    name: {
      type: String,
    },
  },
  setup(props, context) {
    const count = ref(0)
    const root = ref(null)
    watchEffect(() => {})
    onMounted(() => {})
    return () => (
      <>
        <h1>{props.name}</h1>
        <button
          onClick={() => {
            count.value++
          }}
        >
          <div class="aaaa" ref={root}></div>
          count: {count.value}
        </button>
      </>
    )
  },
})
