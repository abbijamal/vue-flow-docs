import useMd from '~/utils/md'

const script = useMd.render(`
\`\`\`typescript
// ComposableFlow.vue
import {
  VueFlow,
  Controls,
  FlowInstance,
  Elements,
  useVueFlow,
} from '@braks/vue-flow'
import Sidebar from './components/ProviderSidebar.vue'

// we create a new instance of the vue flow store, it will be available as an injection to the current component tree
const store = useVueFlow({
 // pass in props as options to create a pre-defined state
})

const onLoad = (flowInstance: FlowInstance) => console.log('flow loaded:', flowInstance)

const initialElements: Elements = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]
\`\`\`
`)

const tmpl = useMd.render(`
\`\`\`markup
<!-- ComposableFlow.vue template -->
<div class="providerflow">
  <Sidebar />
  <div class="vue-flow-wrapper">
    <VueFlow v-model="elements" @load="onLoad">
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

// the injected store is now available in the Sidebar component. Alternatively you can just pass it down as prop
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
    <!-- node.__vf is an internal data field used by Vue Flow to store position and dimensions of a node -->
    Node {{ node.id }} - x: {{ node.__vf.position.x.toFixed(2) }}, y: {{ node.__vf.position.y.toFixed(2) }}
  </div>

  <div class="selectall">
    <button class="button" @click="selectAll">select all nodes</button>
  </div>
</aside>
\`\`\`
`)

export { script, tmpl, sidebarScript, sidebarTmpl }
