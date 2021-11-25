import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { VueFlow, Elements } from '@braks/vue-flow'

const initialElements: Elements = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref<Elements>(initialElements)
const nodeName = ref<string>('Node 1')
const nodeBg = ref<string>('#eee')
const nodeHidden = ref<boolean>(false)

const updateNode = () => {
  elements.value = elements.value.map((el) => {
    if (el.id === '1') {
      // it's important that you create a new object here in order to notify react flow about the change
      el.data = {
        ...el.data,
        label: nodeName.value,
      }
      el.style = { backgroundColor: nodeBg.value }
      el.isHidden = nodeHidden.value
    }

    return el
  })
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow v-model="elements" @load="updateNode" :default-zoom="1.5" :min-zoom="0.2" :max-zoom="4">
  <div class="updatenode__controls p-4 bg-gray-300 rounded-xl">
    <label>label:</label>
    <input v-model="nodeName" />

    <label class="updatenode__bglabel">background:</label>
    <input v-model="nodeBg" type="color" />

    <div class="updatenode__checkboxwrapper">
      <label>hidden:</label>
      <input v-model="nodeHidden" type="checkbox" />
    </div>
  </div>
</VueFlow>
\`\`\`
`)

export { script, tmpl }
