import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import { CSSProperties } from 'vue'
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  ElementId,
  Elements,
  FlowElement,
  Node,
  FlowInstance,
  addEdge,
  removeElements,
} from '@braks/vue-flow'

const elements = ref<Elements>([])
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))

const onLoad = (flowInstance: FlowInstance) => console.log('flow loaded:', flowInstance)
const onElementClick = (element: FlowElement) => console.log('click', element)
const onNodeDragStop = (node: Node) => console.log('drag stop', node)

const buttonStyle: CSSProperties = { position: 'absolute', left: '10px', top: '10px', zIndex: 4 }
const addRandomNode = () => {
  const nodeId: ElementId = (elements.value.length + 1).toString()
  const newNode: Node = {
    id: nodeId,
    data: { label: \`Node: \${nodeId}\` },
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
  } as Node
  elements.value = [...elements.value, newNode]
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
  <VueFlow
    :elements="elements"
    @load="onLoad"
    @element-click="onElementClick"
    @elements-remove="onElementsRemove"
    @connect="(p) => onConnect(p)"
    @node-drag-stop="onNodeDragStop"
  >
    <MiniMap />
    <Controls />
    <Background :variant="BackgroundVariant.Lines" />

    <button class="button" type="button" :style="buttonStyle" @click="addRandomNode">add node</button>
  </VueFlow>
\`\`\`
`)

export { script, tmpl }