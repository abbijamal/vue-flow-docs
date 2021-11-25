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
  { id: '0', type: 'custominput', position: { x: 0, y: 150 }, isValidTargetPos: (connection) => connection.target === 'B' },
  {
    id: 'A',
    type: 'customnode',
    position: { x: 250, y: 0 },
    isValidSourcePos: (connection) => connection.target === 'B',
  },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 }, isValidSourcePos: (connection) => connection.target === 'B' },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 }, isValidSourcePos: (connection) => connection.target === 'B' },
]

const onLoad = (instance: FlowInstance) => instance.fitView()
const onConnectStart = ({ nodeId, handleType }: OnConnectStartParams) => console.log('on connect start', { nodeId, handleType })
const onConnectStop = (event: MouseEvent) => console.log('on connect stop', event)
const onConnectEnd = (event: MouseEvent) => console.log('on connect end', event)

const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection) => {
  console.log('on connect', params)
  elements.value = addEdge(params, elements.value)
}
const nodeTypes = ['custominput', 'customnode']
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow
  v-model="elements"
  :select-nodes-on-drag="false"
  class="validationflow"
  :node-types="nodeTypes"
  @connect="onConnect"
  @oad="onLoad"
  @connect-start="onConnectStart"
  @connect-stop="onConnectStop"
  @connect-end="onConnectEnd"
>
  <template #node-custominput="props">
    <CustomInput v-bind="props" />
  </template>
  <template #node-customnode="props">
    <CustomNode v-bind="props" />
  </template>
</VueFlow>
\`\`\`
`)

const customNodeScript = useMd.render(`
\`\`\`typescript
// ValidationCustomNode
import { Position, Handle, NodeProps, ValidConnectionFunc } from '@braks/vue-flow'

interface CustomNodeProps extends NodeProps {
  id: string
  isValidSourcePos: ValidConnectionFunc
}

const props = defineProps<CustomNodeProps>()
\`\`\`
`)

const customNodeTmpl = useMd.render(`
\`\`\`markup
<!-- ValidationCustomNode.vue -->
<template>
  <Handle type="target" :position="Position.Left" :is-valid-connection="props.isValidSourcePos" />
  <div>{{ props.id }}</div>
</template>
\`\`\`
`)

const customInputScript = useMd.render(`
\`\`\`typescript
// ValidationCustomInput.vue
import { Position, Handle, ValidConnectionFunc } from '@braks/vue-flow'

interface CustomInputProps {
  isValidTargetPos: ValidConnectionFunc
}
const props = defineProps<CustomInputProps>()
\`\`\`
`)

const customInputTmpl = useMd.render(`
\`\`\`markup
<!-- ValidationCustomInput.vue -->
<template>
  <div>Only connectable with B</div>
  <Handle type="source" :position="Position.Right" :is-valid-connection="props.isValidTargetPos" />
</template>
\`\`\`
`)

export { script, tmpl, customNodeScript, customNodeTmpl, customInputScript, customInputTmpl }
