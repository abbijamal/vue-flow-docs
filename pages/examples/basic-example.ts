import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
// BasicExample.vue setup function
import {
  VueFlow,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Elements,
  FlowInstance,
  addEdge,
  isNode,
  removeElements,
} from '@braks/vue-flow'
import initialElements from './initial-elements'

// your elements - the graph mainly reacts to changes in the elements array
const elements = ref<Elements>(initialElements)

// save the instance for later use, initialize with null (instance is provided with the onLoad event)
const vueFlowInstance = ref<FlowInstance | null>(null)

// basic event handler examples
const onNodeDragStop = ({ node }) => console.log('drag stop', node)
const onElementClick = ({ node }) => console.log('click', node)
// use the removeElements helper function to safely remove elements (i.e. remove edges for nodes that have been removed etc.)
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
// use the addEdge helper function to safely add a connection between nodes
const onConnect = (params: Edge | Connection) => (elements.value = addEdge(params, elements.value))
// triggered after the zoom pane has actual dimensions and the elements have been parsed into nodes and edges
const onLoad = (flowInstance: FlowInstance) => {
  flowInstance.fitView({ padding: 0.1 })
  vueFlowInstance.value = flowInstance
}

// randomize positions by creating a new arr of elements with new positions
const updatePos = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
    return el
  })
}

// log a FlowExportsObject (can be used to save and restore nodes)
const logToObject = () => console.log(vueFlowInstance.value?.toObject())
// reset zoom
const resetTransform = () => vueFlowInstance.value?.setTransform({ x: 0, y: 0, zoom: 1 })

//  toggle node class names by creating a new arr of elements with the new class name attached
const toggleClassnames = () => {
  elements.value = elements.value.map((el) => {
    if (isNode(el)) el.class = el.class === 'dark' ? 'light' : 'dark'
    return el
  })
}
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<!-- BasicExample.vue template -->
<VueFlow
    v-model="elements"
    :default-zoom="1.5"
    :min-zoom="0.2"
    :max-zoom="4"
    @elements-remove="onElementsRemove"
    @connect="onConnect"
    @node-drag-stop="onNodeDragStop"
    @node-click="onElementClick"
    @elementClick="onElementClick"
    @load="onLoad"
  >
    <MiniMap />
    <Controls />
    <Background color="#aaa" :gap="8" />
    <div style="position: absolute; right: 10px; top: 10px; z-index: 4;">
      <button class="button" @click="resetTransform">reset transform</button>
      <button class="button" @click="updatePos">change pos</button>
      <button class="button" @click="toggleClassnames">toggle classnames</button>
      <button class="button" @click="logToObject">toObject</button>
    </div>
</VueFlow>
\`\`\`
`)

const initElements = useMd.render(`
\`\`\`typescript
// initial-elements.ts

/**
 * each item of an elements array has to be of either type Node or of type Edge
 * A Node has at least a id and position values for x and y.
 * An Edge has at least a id and a source and target node-id.
 */
export default [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]
\`\`\`
`)

export { script, tmpl, initElements }
