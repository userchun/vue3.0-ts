import { defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Login',
  props: {},
  setup() {
    return () => (
      <>
        <div class="login">login</div>
      </>
    )
  },
})
