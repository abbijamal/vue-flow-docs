import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
import {
  VueFlow,
  addEdge,
  removeElements,
  Controls,
  FlowInstance,
  FlowElement,
  Connection,
  Edge,
  Elements,
  ConnectionMode,
  useVueFlow,
} from '@braks/vue-flow'
import Sidebar from './components/ProviderSidebar.vue'

const onElementClick = (element: FlowElement) => console.log('click', element)
const onLoad = (flowInstance: FlowInstance) => console.log('flow loaded:', flowInstance)

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

useVueFlow()
const elements = ref<Elements>(initialElements)
const onConnect = (params: Connection | Edge) => (elements.value = addEdge(params, elements.value))
const onElementsRemove = (elementsToRemove: Elements) => (elements.value = removeElements(elementsToRemove, elements.value))
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<div class="providerflow">
  <Sidebar />
  <div class="vue-flow-wrapper">
    <VueFlow
      v-model="elements"
      :connection-mode="ConnectionMode.Loose"
      @element-click="onElementClick"
      @connect="onConnect"
      @elements-remove="onElementsRemove"
      @load="onLoad"
    >
      <Controls />
    </VueFlow>
  </div>
</div>
\`\`\`
`)

const sidebarScript = useMd.render(`
\`\`\`typescript
// Sidebar.vue
import { useVueFlow } from '@braks/vue-flow'
const store = useVueFlow()

const nodes = computed(() => store.nodes)
const transform = computed(() => store.transform)

const selectAll = () => {
  store.selectedElements = nodes.value
  store.unsetUserSelection()
}
\`\`\`
`)

const sidebarTmpl = useMd.render(`
\`\`\`markup
<!-- Sidebar.vue -->
<aside>
  <div class="description">This is an example of how you can access the internal state outside of the Vue Flow component.</div>
  <div class="title">Zoom & pan transform</div>
  <div class="transform">{{ [transform[0].toFixed(2), transform[1].toFixed(2), transform[2].toFixed(2)] }}</div>
  <div class="title">Nodes</div>
  <div v-for="node of nodes" :key="node.id">
    Node {{ node.id }} - x: {{ node.__rf.position.x.toFixed(2) }}, y: {{ node.__rf.position.y.toFixed(2) }}
  </div>

  <div class="selectall">
    <button class="button" @click="selectAll">select all nodes</button>
  </div>
</aside>
\`\`\`
`)

export { script, tmpl, sidebarScript, sidebarTmpl }
