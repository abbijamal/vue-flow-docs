import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { VueFlow, addEdge, Connection, Node, Edge, Elements, FlowInstance, removeElements } from '@braks/vue-flow'
import Controls from './components/SaveControls.vue'

const initialElements: Elements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
  { id: 'e1-2', source: '1', target: '2' },
]

const elements = ref(initialElements)
const flowInstance = ref()

const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onLoad = (instance: FlowInstance) => (flowInstance.value = instance)
const onRestore = (els: Elements) => (elements.value = els)
const onAdd = (el: Node) => (elements.value = elements.value.concat(el))
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<VueFlow :elements="elements" @elements-remove="onElementsRemove" @connect="onConnect" @load="onLoad">
  <Controls :flow-instance="flowInstance" @restore="onRestore" @add="onAdd" />
</VueFlow>
\`\`\`
`)

const controlsScript = useMd.render(`
\`\`\`typescript
// SaveControls.vue
import localforage from 'localforage'
import { useZoomPanHelper, FlowInstance, FlowExportObject, Node } from '@braks/vue-flow'

localforage.config({
  name: 'vue-flow',
  storeName: 'flows',
})

const flowKey = 'example-flow'

const getNodeId = () => \`randomnode_\${+new Date()}\`

const { transform } = useZoomPanHelper()

type ControlsProps = {
  flowInstance?: FlowInstance
}

const props = defineProps<ControlsProps>()
const emit = defineEmits(['restore', 'add'])

const onSave = () => {
  if (props.flowInstance) {
    const flow = props.flowInstance.toObject()
    localforage.setItem(flowKey, flow)
  }
}

const onRestore = () => {
  const restoreFlow = async () => {
    const flow: FlowExportObject | null = await localforage.getItem(flowKey)

    if (flow) {
      const [x = 0, y = 0] = flow.position
      emit('restore', flow.elements ?? [])
      transform({ x, y, zoom: flow.zoom || 0 })
    }
  }

  restoreFlow()
}

const onAdd = () => {
  const newNode = {
    id: \`random_node-\${getNodeId()}\`,
    data: { label: 'Added node' },
    position: { x: Math.random() * window.innerWidth - 100, y: Math.random() * window.innerHeight },
  } as Node
  emit('add', newNode)
}
\`\`\`
`)

const controlsTmpl = useMd.render(`
\`\`\`markup
<!-- SaveControls.vue -->
<div class="save__controls">
  <button class="button" @click="onSave">save</button>
  <button class="button" @click="onRestore">restore</button>
  <button class="button" @click="onAdd">add node</button>
</div>
\`\`\`
`)

export { script, tmpl, controlsTmpl, controlsScript }
