import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  isEdge,
  MiniMap,
  Controls,
  Node,
  FlowInstance,
  Elements,
  ConnectionMode,
  Position,
} from '@braks/vue-flow'
import ColorPickerNode from '~/components/ColorPickerNode.vue'

const elements = ref<Elements>([])

// we save the color selected by the color picker here
const bgColor = ref('#1A192B')

const connectionLineStyle = { stroke: '#fff' }

/**
 * define the node types by passing a string identifier
 * it will either be resolved to a globally available component or a dynamic slot with the node-type name
 * in this example we use the dynamic slot name
 */
const nodeTypes = ['selectorNode']

// fit to the view after vue flow has loaded
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView()
  console.log('flow loaded:', flowInstance)
}
const nodeStroke = (n: Node): string => {
  if (n.type === 'input') return '#0041d0'
  if (n.type === 'selectorNode') return bgColor.value
  if (n.type === 'output') return '#ff0072'
  return '#eee'
}
const nodeColor = (n: Node): string => {
  if (n.type === 'selectorNode') return bgColor.value
  return '#fff'
}

const onChange = (event: Event) => {
  elements.value = elements.value.map((e) => {
    if (isEdge(e) || e.id !== '2') {
      return e
    }
    const color = (event.target as HTMLInputElement).value
    bgColor.value = color

    return {
      ...e,
      data: {
        ...e.data,
        color,
      },
    }
  })
}

elements.value = [
  {
    id: '1',
    type: 'input',
    data: { label: 'An input node' },
    position: { x: 0, y: 50 },
    sourcePosition: Position.Right,
  },
  {
    id: '2',
    type: 'selectorNode',
    data: { onChange, color: bgColor.value },
    style: { border: '1px solid #777', padding: '10px' },
    position: { x: 250, y: 50 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output A' },
    position: { x: 650, y: 25 },
    targetPosition: Position.Left,
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Output B' },
    position: { x: 650, y: 100 },
    targetPosition: Position.Left,
  },

  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fff' } },
  { id: 'e2a-3', source: '2', sourceHandle: 'a', target: '3', animated: true, style: { stroke: '#fff' } },
  { id: 'e2b-4', source: '2', sourceHandle: 'b', target: '4', animated: true, style: { stroke: '#fff' } },
]
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow
  v-model="elements"
  :style="\`background: \${bgColor}\`"
  :node-types="nodeTypes"
  :connection-mode="ConnectionMode.Loose"
  :connection-line-style="connectionLineStyle"
  :default-zoom="1.5"
  @load="onLoad"
>
  <template #node-selectorNode="props">
    <ColorPickerNode v-bind="props" />
  </template>
  <MiniMap :node-stroke-color="nodeStroke" :node-color="nodeColor" />
  <Controls />
</VueFlow>
\`\`\`
`)

export { script, tmpl }
