import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  Controls,
  updateEdge,
  addEdge,
  Elements,
  FlowInstance,
  Connection,
  Edge,
  removeElements,
  ConnectionMode,
} from '@braks/vue-flow'

const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Node <strong>A</strong>',
    },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: {
      label: 'Node <strong>B</strong>',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: {
      label: 'Node <strong>C</strong>',
    },
    position: { x: 400, y: 100 },
    style: { background: '#D6D5E6', color: '#333', border: '1px solid #222138', width: 180 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'Updateable edge' },
]

const elements = ref(initialElements)
const onLoad = (flowInstance: FlowInstance) => flowInstance.fitView()
const onEdgeUpdateStart = (edge: Edge) => console.log('start update', edge)
const onEdgeUpdateEnd = (edge: Edge) => console.log('end update', edge)
const onEdgeUpdate = ({ edge, connection }: { edge: Edge, connection: Connection }) =>
  (elements.value = updateEdge(edge, connection, elements.value))
const onConnect = (params: Connection | Edge) => addEdge(params, elements.value)
const onElementsRemove = (elementsToRemove: Elements) => removeElements(elementsToRemove, elements.value)
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow
  v-model="elements"
  :snap-to-grid="true"
  :connection-mode="ConnectionMode.Loose"
  :edges-updatable="true"
  @load="onLoad"
  @elements-remove="onElementsRemove"
  @connect="onConnect"
  @edge-update-start="onEdgeUpdateStart"
  @edge-update="onEdgeUpdate"
  @edge-update-end="onEdgeUpdateEnd"
>
  <Controls />
</VueFlow>
\`\`\`
`)

export { script, tmpl }
