import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  addEdge,
  Handle,
  Connection,
  Position,
  Elements,
  Edge,
  OnConnectStartParams,
  NodeProps,
  FlowInstance,
  NodeType,
} from '@braks/vue-flow'
import CustomInput from './components/ValidationCustomInput.vue'
import CustomNode from './components/ValidationCustomNode.vue'

const initialElements: Elements = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 } },
  { id: 'A', type: 'customnode', position: { x: 250, y: 0 } },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 } },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 } },
]

const onLoad = (reactFlowInstance: FlowInstance) => reactFlowInstance.fitView()
const onConnectStart = ({ nodeId, handleType }: OnConnectStartParams) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event: MouseEvent) => console.log('on connect stop', event)
const onConnectEnd = (event: MouseEvent) => console.log('on connect end', event)

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => {
  console.log('on connect', params)
  elements.value = addEdge(params, elements.value)
}
const nodeTypes: Record<string, NodeType> = {
  custominput: CustomInput as NodeType,
  customnode: CustomNode as NodeType,
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow
  :elements="elements"
  :select-nodes-on-drag="false"
  class="validationflow"
  :node-types="nodeTypes"
  @connect="onConnect"
  @oad="onLoad"
  @connect-start="onConnectStart"
  @connect-stop="onConnectStop"
  @connect-end="onConnectEnd"
/>
\`\`\`
`)

const customNodeScript = useMd.render(`
\`\`\`typescript
// ValidationCustomNode
import { Position, Handle, Connection, NodeProps } from '@braks/vue-flow'

interface CustomNodeProps extends NodeProps {
  id: string
}

const props = defineProps<CustomNodeProps>()

const isValidConnection = (connection: Connection) => connection.target === 'B'
\`\`\`
`)

const customNodeTmpl = useMd.render(`
\`\`\`markup
<!-- ValidationCustomNode.vue -->
<Handle type="target" :position="Position.Left" :is-valid-connection="isValidConnection" />
<div>{{ props.id }}</div>
<Handle type="source" :position="Position.Right" :is-valid-connection="isValidConnection" />
\`\`\`
`)

const customInputScript = useMd.render(`
\`\`\`typescript
// ValidationCustomInput.vue
import { Position, Handle, Connection } from '@braks/vue-flow'

const isValidConnection = (connection: Connection) => connection.target === 'B'
\`\`\`
`)

const customInputTmpl = useMd.render(`
\`\`\`markup
<!-- ValidationCustomInput.vue -->
<div>Only connectable with B</div>
<Handle type="source" :position="Position.Right" :is-valid-connection="isValidConnection" />
\`\`\`
`)

export { script, tmpl, customNodeScript, customNodeTmpl, customInputScript, customInputTmpl }
