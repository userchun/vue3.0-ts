<template>
  <div>
    <button @click="btn">按钮</button>
    <HelloWord :name="text" />
    <button>{{ plusOne }}</button>
    <div class="test" ref="root"></div>
    <div
      class="rooy"
      v-for="(item, i) in arr"
      :key="item"
      :ref="
        (el) => {
          divs[i] = el
        }
      "
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, reactive, toRef } from 'vue'

import HelloWord from '../../components/HelloWord'
export default {
  name: 'home',
  components: {
    HelloWord,
  },
  setup(props: object, context: any) {
    const text = ref(10)
    const arr = reactive([1, 2, 3, 4, 5, 6, 8])
    const btn = (): void => {
      text.value++
    }

    const count = ref(19)
    const root = ref(null)
    const divs = ref([])
    const state = reactive({
      foo: 1,
      bar: '777',
    })
    const fooRef = toRef(state, 'foo')
    fooRef.value++

    onMounted(() => {})

    const plusOne = computed({
      get: () => count.value + 19,
      set: (val) => {
        count.value = val - 100
      },
    })

    return { text, btn, plusOne, root, arr, divs }
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
