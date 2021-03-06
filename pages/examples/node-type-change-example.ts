import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { VueFlow, addEdge, Connection, Edge, Elements, isEdge, FlowInstance, Position } from '@braks/vue-flow'

const initialElements: Elements = [
  {
    id: '1',
    sourcePosition: Position.Right,
    type: 'input',
    data: { label: 'Input' },
    position: { x: 0, y: 80 },
  },
  {
    id: '2',
    type: 'output',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: 'A Node' },
    position: { x: 250, y: 0 },
  },
  { id: 'e1-2', source: '1', type: 'smoothstep', target: '2', animated: true },
]

const elements = ref<Elements>(initialElements)

const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()

const changeType = () => {
  elements.value = elements.value.map((el) => {
    if (isEdge(el) || el.type === 'input') return el

    return {
      ...el,
      type: el.type === 'default' ? 'output' : 'default',
    }
  })
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow v-model="elements" @load="onLoad">
  <button class="button mt-2" :style="{ position: 'absolute', right: 10, top: 30, zIndex: 4 }" @click="changeType">change type</button>
</VueFlow>
\`\`\`
`)

export { script, tmpl }
